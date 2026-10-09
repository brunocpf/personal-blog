import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { test } from "node:test";

// Exercise APIs used by Sanity's CLI across the narrowly scoped security overrides.
for (const project of ["..", "../studio"]) {
  const require = createRequire(
    new URL(`${project}/package.json`, import.meta.url),
  );
  const federationRequire = createRequire(
    require.resolve("@module-federation/dts-plugin"),
  );
  const frameworkRequire = createRequire(require.resolve("@vercel/frameworks"));

  test(`${project}: TypeID UUID generation and round trips remain compatible`, () => {
    const { typeid, TypeID } = require("typeid-js");
    const ids = Array.from({ length: 1000 }, () => typeid("blog"));
    assert.equal(new Set(ids.map(String)).size, ids.length);
    for (const id of ids) {
      assert.match(id.toUUID(), /^[0-9a-f-]{14}7[0-9a-f-]{21}$/);
      assert.equal(
        TypeID.fromUUID("blog", id.toUUID()).toString(),
        id.toString(),
      );
      assert.equal(TypeID.fromString(id.toString()).toUUID(), id.toUUID());
    }
  });

  test(`${project}: ZIP creation and sync/async extraction preserve type files`, async () => {
    const AdmZip = federationRequire("adm-zip");
    const archive = new AdmZip();
    archive.addFile(
      "types/index.d.ts",
      Buffer.from("export type Blog = string;"),
    );
    const result = new AdmZip(archive.toBuffer());
    assert.equal(
      result.readAsText("types/index.d.ts"),
      "export type Blog = string;",
    );
    const content = await new Promise((resolve, reject) => {
      result
        .getEntry("types/index.d.ts")
        .getDataAsync((data, error) => (error ? reject(error) : resolve(data)));
    });
    assert.equal(content.toString(), "export type Blog = string;");
  });

  test(`${project}: framework YAML/TOML parsers retain their existing APIs`, () => {
    const yaml = frameworkRequire("js-yaml");
    const toml = frameworkRequire("smol-toml");
    assert.deepEqual(yaml.safeLoad("build:\n  command: npm run build\n"), {
      build: { command: "npm run build" },
    });
    assert.equal(
      toml.parse('[build]\ncommand = "npm run build"').build.command,
      "npm run build",
    );
  });

  test(`${project}: legacy YAML CLI works with dependency-free argparse 2`, () => {
    const cli = frameworkRequire.resolve("js-yaml/bin/js-yaml.js");
    for (const args of [[], ["--compact"], ["--to-json"]]) {
      const result = spawnSync(process.execPath, [cli, ...args], {
        input: "build:\n  command: npm run build\n",
        encoding: "utf8",
        timeout: 5000,
      });
      assert.equal(result.status, 0, result.stderr);
      assert.deepEqual(JSON.parse(result.stdout), {
        build: { command: "npm run build" },
      });
    }
    const help = spawnSync(process.execPath, [cli, "--help"], {
      encoding: "utf8",
      timeout: 5000,
    });
    assert.equal(help.status, 0, help.stderr);
    assert.match(help.stdout, /--compact/);
    const yamlRequire = createRequire(frameworkRequire.resolve("js-yaml"));
    assert.equal(yamlRequire("argparse/package.json").version, "2.0.1");
    assert.throws(() => yamlRequire.resolve("sprintf-js"), {
      code: "MODULE_NOT_FOUND",
    });
  });

  test(`${project}: federation HTTP requests work with the patched Undici`, async () => {
    const { MockAgent, request } = federationRequire("undici");
    const dispatcher = new MockAgent();
    dispatcher.disableNetConnect();
    dispatcher
      .get("https://types.example")
      .intercept({ path: "/types.zip" })
      .reply(200, "type archive");
    try {
      const response = await request("https://types.example/types.zip", {
        dispatcher,
      });
      assert.equal(response.statusCode, 200);
      assert.equal(await response.body.text(), "type archive");
      dispatcher.assertNoPendingInterceptors();
    } finally {
      await dispatcher.close();
    }
  });
}

test("indexed source maps reject excessive and nested section offsets", () => {
  const require = createRequire(import.meta.url);
  const { SourceMapConsumer } = require("source-map-js");
  const map = {
    version: 3,
    sources: ["input.js"],
    names: [],
    mappings: "AAAA",
  };
  const section = (line, inner = map) => ({
    version: 3,
    sections: [{ offset: { line, column: 0 }, map: inner }],
  });
  assert.throws(() => new SourceMapConsumer(section(1e9)), /offset line/);
  assert.throws(
    () => new SourceMapConsumer(section(6e6, section(6e6))),
    /nested sections/,
  );
  assert.deepEqual(
    new SourceMapConsumer(section(10)).originalPositionFor({
      line: 11,
      column: 1,
    }),
    { source: "input.js", line: 1, column: 0, name: null },
  );
});

test("typography's selector parser preserves complex selectors", () => {
  const require = createRequire(import.meta.url);
  const typographyRequire = createRequire(
    require.resolve("@tailwindcss/typography"),
  );
  const parser = typographyRequire("postcss-selector-parser");
  const selector = ':where(.prose) :is(h1, h2) > a[href^="https"]::before';
  assert.equal(parser().processSync(selector), selector);
  assert.equal(parser().astSync(selector).nodes.length, 1);
});
