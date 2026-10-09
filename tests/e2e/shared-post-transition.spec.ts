import { instant } from "@next/playwright";
import { expect, test } from "@playwright/test";

for (const [width, colorScheme] of [
  [1440, "light"],
  [390, "dark"],
] as const) {
  test(`post title, date, summary and background share both navigation directions at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ colorScheme, reducedMotion: "no-preference" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const title = "Mnemos: A Local-First AI-Powered App";
    // Warm the client cache so the experiment measures a shared transition,
    // not a separate loading boundary replacing the destination first.
    await instant(page, async () => {
      await page.getByRole("link", { name: title, exact: true }).click();
      await expect(
        page.getByRole("heading", { level: 1, name: title }),
      ).toBeVisible();
    });
    await page.waitForFunction(
      () => !document.documentElement.matches(":active-view-transition"),
    );
    await page.goBack();
    await expect(
      page.getByRole("heading", { name: "Latest posts" }),
    ).toBeVisible();
    await page.waitForFunction(
      () => !document.documentElement.matches(":active-view-transition"),
    );
    await page.addStyleTag({
      content: `
      ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) {
        animation-play-state: paused !important;
      }
    `,
    });
    for (const direction of ["open", "return"] as const) {
      if (direction === "open")
        await page.getByRole("link", { name: title, exact: true }).click();
      else
        await page
          .getByRole("link", { name: "Bruno Fernandes — home", exact: true })
          .click();
      await page.waitForFunction(() => {
        const pseudos = document
          .getAnimations()
          .map(
            (animation) => (animation.effect as KeyframeEffect)?.pseudoElement,
          );
        return ["surface", "title", "date", "summary"].every((part) =>
          pseudos.includes(
            `::view-transition-group(article-${part}-mnemos-a-local-first-ai-powered-app)`,
          ),
        );
      });
      const snapshots = await page.evaluate(() =>
        ["surface", "title", "date", "summary"].map((part) => {
          const name = `article-${part}-mnemos-a-local-first-ai-powered-app`;
          const root = document.documentElement;
          return {
            part,
            newAnimation: getComputedStyle(
              root,
              `::view-transition-new(${name})`,
            ).animationName,
            opacity: getComputedStyle(root, `::view-transition-new(${name})`)
              .opacity,
          };
        }),
      );
      for (const snapshot of snapshots)
        expect(snapshot).toMatchObject({
          newAnimation: "none",
          opacity: "1",
        });
      for (const time of [60, 160, 300]) {
        await page.evaluate(
          (time) =>
            document.getAnimations().forEach((animation) => {
              if (
                (animation.effect as KeyframeEffect)?.pseudoElement?.startsWith(
                  "::view-transition",
                )
              )
                animation.currentTime = time;
            }),
          time,
        );
        await page.screenshot({
          path: testInfo.outputPath(`${direction}-${time}.png`),
        });
      }
      await page.evaluate(() =>
        document.getAnimations().forEach((animation) => {
          if (
            (animation.effect as KeyframeEffect)?.pseudoElement?.startsWith(
              "::view-transition",
            )
          )
            animation.finish();
        }),
      );
      await page.waitForFunction(
        () => !document.documentElement.matches(":active-view-transition"),
      );
    }
  });
}
