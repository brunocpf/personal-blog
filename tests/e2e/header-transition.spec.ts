import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`sticky header stays above a mid-navigation snapshot at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Latest posts" }),
    ).toBeVisible();
    await page.locator(".content-skeleton").waitFor({ state: "detached" });
    await page.evaluate(() => document.fonts.ready);

    // Pause the real navigation at a visible intermediate frame. Inspecting the
    // settled DOM alone misses the browser's separate transition stacking tree.
    await page.addStyleTag({
      content: `
      ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) {
        animation-duration: 10s !important;
      }
    `,
    });
    await page.evaluate(() =>
      window.scrollTo({ top: 260, behavior: "instant" }),
    );
    await page
      .getByRole("link", {
        name: "Mnemos: A Local-First AI-Powered App",
        exact: true,
      })
      .click();
    await expect(page).toHaveURL("/blog/mnemos-a-local-first-ai-powered-app");
    await page.waitForFunction(() =>
      document
        .getAnimations()
        .some((animation) =>
          (animation.effect as KeyframeEffect)?.pseudoElement?.startsWith(
            "::view-transition",
          ),
        ),
    );
    await page.evaluate(() => {
      for (const animation of document.getAnimations()) {
        if (
          (animation.effect as KeyframeEffect)?.pseudoElement?.startsWith(
            "::view-transition",
          )
        ) {
          animation.pause();
          animation.currentTime = 5000;
        }
      }
    });
    const state = await page.evaluate(() => {
      const root = document.documentElement;
      const group = getComputedStyle(
        root,
        "::view-transition-group(site-header)",
      );
      const old = getComputedStyle(root, "::view-transition-old(site-header)");
      const incoming = getComputedStyle(
        root,
        "::view-transition-new(site-header)",
      );
      const header = document.querySelector(".site-header")!;
      return {
        name: getComputedStyle(header).viewTransitionName,
        layer: group.zIndex,
        animation: group.animationName,
        oldDisplay: old.display,
        newAnimation: incoming.animationName,
        top: header.getBoundingClientRect().top,
        runningPageTransition: document
          .getAnimations()
          .some((animation) =>
            (animation.effect as KeyframeEffect)?.pseudoElement?.startsWith(
              "::view-transition",
            ),
          ),
      };
    });
    expect(state).toMatchObject({
      name: "site-header",
      layer: "100",
      animation: "none",
      oldDisplay: "none",
      newAnimation: "none",
      top: 0,
      runningPageTransition: true,
    });
    await page.screenshot({
      path: testInfo.outputPath(`header-transition-${width}.png`),
    });
    await page.evaluate(() =>
      document.getAnimations().forEach((animation) => animation.finish()),
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Mnemos: A Local-First AI-Powered App",
    );
  });
}
