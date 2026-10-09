import AxeBuilder from "@axe-core/playwright";
import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

const story = "Mnemos: A Local-First AI-Powered App";
const slug = "/blog/mnemos-a-local-first-ai-powered-app";

test("published stories navigate instantly to their cached reading view", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByText("This is a draft", { exact: false })).toHaveCount(
    0,
  );
  await instant(page, async () => {
    await page.getByRole("link", { name: story, exact: true }).click();
    await expect(page).toHaveURL(slug);
    await expect(
      page.getByRole("heading", { level: 1, name: story }),
    ).toBeVisible();
    await expect(page.getByText("11 min read")).toBeVisible();
  });
  await page
    .getByRole("button", { name: "Expand image", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(errors).toEqual([]);
});

test("category selection, pagination and missing content keep working", async ({
  page,
}) => {
  await page.goto("/blog");
  await page
    .getByRole("navigation", { name: "Filter writing by topic" })
    .getByRole("link", { name: "ai", exact: true })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ai");
  await expect(
    page
      .getByRole("navigation", { name: "Filter writing by topic" })
      .getByRole("link", { name: "ai", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await page.getByRole("link", { name: "All posts", exact: true }).click();
  await page.getByRole("link", { name: "Older posts" }).click();
  await expect(page).toHaveURL("/blog/pages/2");
  await expect(page.getByText("Page 2 of 3")).toBeVisible();
  await page.getByRole("link", { name: "Newer posts" }).click();
  await expect(page.getByText("Page 1 of 3")).toBeVisible();
  await page.goto("/blog/a-story-that-does-not-exist");
  // A streamed not-found response has HTTP 200 and an explicit noindex directive.
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
    "content",
    "noindex",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
});

test("mobile menu closes on navigation, themes persist, reduced motion stays still", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL("/about");
  await expect(
    page.getByRole("button", { name: "Open menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page
    .getByRole("button", { name: "Color theme: system. Switch to light." })
    .click();
  await page
    .getByRole("button", { name: "Color theme: light. Switch to dark." })
    .click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.goto("/");
  expect(
    await page
      .locator(".author-portrait")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
});

for (const theme of ["light", "dark"] as const) {
  for (const [name, route] of [
    ["home", "/"],
    ["archive", "/blog"],
    ["article", slug],
    ["about", "/about"],
    ["contact", "/contact"],
  ]) {
    test(`${name}: ${theme} responsive layout and accessibility`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ).toEqual([]);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `overflow at ${width}`,
        ).toBe(true);
      }
    });
  }
}

test("portraits cannot be dragged and scrollbar space remains stable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".author-portrait")).toHaveAttribute(
    "draggable",
    "false",
  );
  const before = await page.locator(".header-inner").boundingBox();
  await page.evaluate(() => {
    document.documentElement.style.overflow = "hidden";
  });
  const after = await page.locator(".header-inner").boundingBox();
  expect(after?.x).toBe(before?.x);
  expect(after?.width).toBe(before?.width);
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollbarGutter),
  ).toBe("stable");
  await page.goto("/about");
  await expect(page.locator(".about-portrait")).toHaveAttribute(
    "draggable",
    "false",
  );
});

test("writing and filtered lists are available from link prefetches", async ({
  page,
}) => {
  await page.goto("/");
  await instant(page, async () => {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Writing", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { level: 1, name: "Writing", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: story, exact: true }),
    ).toBeVisible();
  });
  await instant(page, async () => {
    await page
      .getByRole("navigation", { name: "Filter writing by topic" })
      .getByRole("link", { name: "ai", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { level: 1, name: "ai", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: story, exact: true }),
    ).toBeVisible();
  });
});
