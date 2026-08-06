import { expect, test, type Page } from "@playwright/test";

const pages = [
  { path: "/", heading: "NUBE" },
  { path: "/creation", heading: "NUBE" },
  { path: "/archives", heading: "NOS" },
  { path: "/festival", heading: "PAS SEULEMENT" },
  { path: "/artistes", heading: "SEPT ARTISTES" },
  { path: "/infos", heading: "Informations pratiques" },
];

function captureBrowserErrors(page: Page) {
  const errors: string[] = [];

  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  return errors;
}

test.describe("pages principales", () => {
  for (const entry of pages) {
    test(`${entry.path} se charge sans erreur`, async ({ page }) => {
      const browserErrors = captureBrowserErrors(page);
      const response = await page.goto(entry.path);

      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("h1")).toContainText(entry.heading);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      expect(browserErrors).toEqual([]);
    });
  }
});

test("les images visibles sont chargées", async ({ page }) => {
  await page.goto("/artistes");
  await page.locator("img").last().scrollIntoViewIfNeeded();

  const failedImages = await page.locator("img").evaluateAll((images) =>
    images
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.getAttribute("src")),
  );

  expect(failedImages).toEqual([]);
});

test("la FAQ s’ouvre et expose sa réponse", async ({ page }) => {
  await page.goto("/infos");
  const firstQuestion = page.locator("#faq details").first();

  await firstQuestion.locator("summary").click();
  await expect(firstQuestion).toHaveAttribute("open", "");
  await expect(firstQuestion.locator("p")).toBeVisible();
});

test("les appels vers NUBE #2 atteignent la bonne section", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile-chromium") {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  }
  await page.locator('a[href="/festival#edition"]').filter({ visible: true }).first().click();

  await expect(page).toHaveURL(/#edition$/);
  await expect(page.locator("#edition")).toBeInViewport();
});

test("la navigation entre les pages fonctionne", async ({ page }) => {
  await page.goto("/creation");
  await page.getByRole("link", { name: "Retour à l’accueil NUBE", exact: true }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("h1")).toContainText("NUBE");
});

test("la navigation principale reste identique sur toutes les pages", async ({ page }, testInfo) => {
  const labels = ["FESTIVAL", "ARTISTES", "ARCHIVES", "INFOS", "STUDIO"];

  for (const entry of pages) {
    await page.goto(entry.path);

    if (testInfo.project.name === "mobile-chromium") {
      await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    }

    const navigation = testInfo.project.name === "mobile-chromium"
      ? page.locator("#mobile-navigation")
      : page.getByRole("navigation", { name: "Navigation principale", exact: true });

    for (const label of labels) {
      await expect(navigation.getByRole("link", { name: new RegExp(label) })).toBeVisible();
    }
  }
});

test("le logo ramène toujours en haut de l’accueil", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "OUVRIR LES ARCHIVES" }).scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page.getByRole("link", { name: "NUBE — accueil" }).click();

  await expect(page).toHaveURL(/#top$/);
  await expect(page.locator("#top")).toBeInViewport();
});

test("la mise en page ne déborde pas horizontalement", async ({ page }) => {
  await page.goto("/");

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport + 1);
});

test("le contact utilise Instagram et aucun lien e-mail", async ({ page }) => {
  for (const path of ["/festival", "/creation"]) {
    await page.goto(path);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.getByRole("link", { name: /INSTAGRAM/ }).first()).toHaveAttribute("href", "https://www.instagram.com/");
  }
});

test("le configurateur Studio calcule le parcours sélectionné", async ({ page }) => {
  await page.goto("/creation");

  const configurator = page.locator("#configurateur");
  await configurator.locator("label", { hasText: "Direction artistique" }).click();
  await configurator.locator("label", { hasText: "Cover" }).click();
  await configurator.locator("label", { hasText: "Studio" }).click();

  await expect(configurator.getByText("3 SÉLECTIONS")).toBeVisible();
  await expect(configurator.getByText("− 42 CHF")).toBeVisible();
  await expect(configurator.getByText("238 CHF")).toBeVisible();
});

test("le nuage du Studio reste entier et animé", async ({ page }) => {
  await page.goto("/creation");
  const cloud = page.locator("[data-studio-cloud]");
  await expect(cloud).toBeVisible();

  const bounds = await cloud.boundingBox();
  const viewport = page.viewportSize();
  expect(bounds).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport!.width + 1);
  expect(await cloud.evaluate((element) => getComputedStyle(element).animationName)).toBe("studioCloudFloat");
});

test("le menu mobile s’ouvre, navigue puis se ferme", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Test réservé au menu mobile");
  await page.goto("/");

  const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
  const mobileNavigation = page.locator("#mobile-navigation");

  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(mobileNavigation).toBeVisible();

  await mobileNavigation.getByRole("link", { name: /INFOS/ }).click();
  await expect(page).toHaveURL(/\/infos$/);
  await expect(page.locator("#infos")).toBeInViewport();
  await expect(mobileNavigation).toBeHidden();
});

test("le menu mobile se ferme avec Échap", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Test réservé au menu mobile");
  await page.goto("/");

  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await page.keyboard.press("Escape");

  await expect(page.locator("#mobile-navigation")).toBeHidden();
  await expect(page.getByRole("button", { name: "Ouvrir le menu" })).toHaveAttribute("aria-expanded", "false");
});
