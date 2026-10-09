import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

// Use EXPOSE_TESTING_API=1 at build time. The production prerender includes
// these cached pages in full; holding request-time work must not hide that UI.
for (const [url, heading] of [
  ["/blog/pages/2", "Writing"],
  ["/about", "About"],
  ["/contact", "Contact"],
  [
    "/blog/mnemos-a-local-first-ai-powered-app",
    "Mnemos: A Local-First AI-Powered App",
  ],
] as const) {
  test(`${url} serves its cached content without a page skeleton`, async ({
    page,
    baseURL,
  }) => {
    await instant(
      page,
      async () => {
        await page.goto(url);
        await expect(
          page.getByRole("heading", { level: 1, name: heading, exact: true }),
        ).toBeVisible();
        await expect(page.locator(".skeleton-line")).toHaveCount(0);
        if (url === "/blog/pages/2") {
          await expect(page.getByText("Page 2 of 3")).toBeVisible();
          await expect(page.locator(".post-list h3")).toHaveCount(6);
        } else if (url === "/about") {
          await expect(
            page.getByRole("img", { name: "Bruno Fernandes" }),
          ).toBeVisible();
          await expect(page.locator(".about-copy")).not.toBeEmpty();
        } else if (url === "/contact") {
          await expect(
            page.getByRole("link", { name: "Email brunocpf@outlook.com" }),
          ).toBeVisible();
          await expect(
            page.getByRole("link", { name: "Steam View profile" }),
          ).toBeVisible();
          await expect(page.locator(".contact-copy:empty")).toHaveCount(0);
        } else {
          await expect(
            page
              .locator(".article-navigation")
              .getByRole("link", { name: "All posts" }),
          ).toBeVisible();
          await expect(page.locator(".article-content")).not.toBeEmpty();
        }
      },
      { baseURL },
    );
  });
}
