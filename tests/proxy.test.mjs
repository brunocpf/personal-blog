import { NextRequest } from "next/server.js";
import assert from "node:assert/strict";
import { test } from "node:test";

import { proxy } from "../src/proxy.ts";

for (const [source, target] of [
  ["/blog", "/blog/pages/1"],
  ["/blog?page=2", "/blog/pages/2"],
  ["/blog?category=ai&page=2", "/blog/categories/ai/2"],
  ["/blog/categories/ai", "/blog/categories/ai/1"],
  ["/blog/categories/ai?page=2", "/blog/categories/ai/2"],
]) {
  test(`rewrite ${source} once to ${target}`, () => {
    const response = proxy(new NextRequest(`https://blog.example${source}`));
    assert.equal(
      response.headers.get("x-middleware-rewrite"),
      `https://blog.example${target}`,
    );
    const secondPass = proxy(new NextRequest(`https://blog.example${target}`));
    assert.equal(secondPass.headers.get("x-middleware-rewrite"), null);
    assert.equal(secondPass.headers.get("x-middleware-next"), "1");
  });
}

test("canonical category pagination stays on the requested page", () => {
  const response = proxy(
    new NextRequest("https://blog.example/blog/categories/ai/2"),
  );
  assert.equal(response.headers.get("x-middleware-next"), "1");
});
