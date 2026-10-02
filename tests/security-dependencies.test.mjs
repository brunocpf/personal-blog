import assert from "node:assert/strict";
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
