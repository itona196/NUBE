import { expect, test, type Page } from "@playwright/test";

const pages = [
  { path: "/", heading: "NUBE" },
  { path: "/creation", heading: "NUBE" },
  { path: "/archives", heading: "NOS" },
  { path: "/festival", heading: "PAS SEULEMENT" },
  { path: "/artistes", heading: "SEPT ARTISTES" },
  { path: "/infos", heading: "TOUT SAVOIR" },
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

test("une adresse inconnue affiche la page 404 NUBE", async ({ page }) => {
  const response = await page.goto("/page-qui-nexiste-pas");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /HORS\s+SCÈNE/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "RETOUR À L’ACCUEIL", exact: true })).toBeVisible();
});

test("les en-têtes de sécurité sont envoyés", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();

  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
});

test("le référencement technique et les aperçus sociaux sont publiés", async ({ page, request }) => {
  await page.goto("/festival");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/festival$/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Le festival — NUBE");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);

  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  expect((await request.get("/opengraph-image")).ok()).toBeTruthy();
});

test("la police Open Sauce Sans est réellement chargée", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const typography = await page.evaluate(() => ({
    family: getComputedStyle(document.body).fontFamily,
    loaded: document.fonts.check('16px "Open Sauce Sans"'),
  }));

  expect(typography.family).toContain("Open Sauce Sans");
  expect(typography.loaded).toBeTruthy();
});

test("le lien d’évitement permet d’atteindre le contenu", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Aller au contenu" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await skipLink.click();
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator("#main-content")).toBeFocused();
});

test("les images visibles sont chargées", async ({ page }) => {
  await page.goto("/artistes");
  await page.locator("img").last().scrollIntoViewIfNeeded();

  const failedImages = await page.locator("img").evaluateAll((images) =>
    images
      .filter((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 0)
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

test("le résumé de l’accueil mène au guide pratique", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "OUVRIR LE GUIDE" }).click();

  await expect(page).toHaveURL(/\/infos$/);
  await expect(page.locator("#infos")).toBeInViewport();
});

test("la navigation entre les pages fonctionne", async ({ page }) => {
  await page.goto("/creation");
  await page.locator("header").getByRole("link", { name: "Retour à l’accueil NUBE", exact: true }).click();

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

test("le footer reprend exactement la navigation principale sur toutes les pages", async ({ page }) => {
  const labels = ["FESTIVAL", "ARTISTES", "ARCHIVES", "INFOS", "STUDIO"];

  for (const entry of pages) {
    await page.goto(entry.path);
    const footerNavigation = page.getByRole("navigation", { name: "Navigation de pied de page" });

    await footerNavigation.scrollIntoViewIfNeeded();
    await expect(footerNavigation.getByRole("link")).toHaveCount(labels.length);
    expect(await footerNavigation.getByRole("link").allTextContents()).toEqual(labels);
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

test("le contact propose Instagram et l’adresse e-mail NUBE", async ({ page }) => {
  for (const path of ["/festival", "/creation"]) {
    await page.goto(path);
    await expect(page.locator('a[href="mailto:contact@nubeexperience.ch"]')).toHaveCount(2);
    await expect(page.getByRole("link", { name: /INSTAGRAM/ }).first()).toHaveAttribute("href", "https://www.instagram.com/nube.experience/");
  }
});

test("le configurateur Studio calcule le parcours sélectionné", async ({ page }) => {
  await page.goto("/creation");

  const configurator = page.locator("#configurateur");
  await configurator.locator("label", { hasText: "Direction artistique" }).click();
  await configurator.locator("label", { hasText: "Cover" }).click();
  await configurator.locator("label", { hasText: "Studio" }).click();

  await expect(configurator.getByText("3 SÉLECTIONS")).toBeVisible();
  await expect(configurator.getByText("− 56 CHF")).toBeVisible();
  await expect(configurator.getByText("319 CHF", { exact: true })).toBeVisible();
});

test("le Studio utilise un seul flux de sélection sans imposer de durée", async ({ page }) => {
  await page.goto("/creation");
  const configurator = page.locator("#configurateur");

  await expect(page.locator("#carte button")).toHaveCount(0);
  await expect(configurator.getByLabel(/Direction artistique/)).toHaveCount(1);

  await configurator.locator("label", { hasText: "Direction artistique" }).click();
  await configurator.locator("label", { hasText: "Cover" }).click();
  await configurator.locator("label", { hasText: "Studio" }).click();
  await expect(configurator.locator("#studio-hours")).toHaveCount(0);

  await expect(configurator.getByText("375 CHF")).toBeVisible();
  await expect(configurator.getByText("− 56 CHF")).toBeVisible();
  await expect(configurator.getByText("319 CHF", { exact: true })).toBeVisible();
});

test("le résumé Studio mobile reste accessible pendant la sélection", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Le résumé fixe est réservé au mobile");
  await page.goto("/creation");
  const configurator = page.locator("#configurateur");

  await configurator.locator("label", { hasText: "Direction artistique" }).click();
  const summaryLink = page.getByRole("link", { name: "VOIR MON PROJET" });
  await expect(summaryLink).toBeVisible();
  await expect(summaryLink.locator("..").getByText("1 SÉLECTION", { exact: true })).toBeVisible();
  await summaryLink.click();
  await expect(page.locator("#project-summary")).toBeInViewport();
});

test("les plateformes indisponibles ne sont pas affichées", async ({ page }) => {
  await page.goto("/artistes");
  await expect(page.getByText(/BIENTÔT/)).toHaveCount(0);
});

test("le projet Studio est conservé puis peut être réinitialisé", async ({ page }) => {
  await page.goto("/creation");
  const configurator = page.locator("#configurateur");
  await configurator.getByRole("button", { name: "Album", exact: true }).click();
  await configurator.locator("label", { hasText: "Cover" }).click();
  await page.reload();

  await expect(configurator.getByRole("button", { name: /^Album/ })).toHaveAttribute("aria-pressed", "true");
  await expect(configurator.getByRole("checkbox", { name: /Cover/ })).toBeChecked();

  await configurator.getByRole("button", { name: "RÉINITIALISER MON PROJET" }).click();
  await expect(configurator.getByRole("checkbox", { name: /Cover/ })).not.toBeChecked();
  await page.reload();
  await expect(configurator.getByRole("checkbox", { name: /Cover/ })).not.toBeChecked();
});

test("le résumé Studio est copié avant l’ouverture d’Instagram", async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as Window & { __copied?: string; __opened?: string };
    Object.defineProperty(navigator, "clipboard", { value: { writeText: async (text: string) => { state.__copied = text; } } });
    window.open = ((url?: string | URL) => { state.__opened = String(url); return null; }) as typeof window.open;
  });
  await page.goto("/creation");
  const configurator = page.locator("#configurateur");
  await configurator.locator("label", { hasText: "Direction artistique" }).click();
  await configurator.getByRole("button", { name: "COPIER LE RÉCAPITULATIF ET OUVRIR INSTAGRAM" }).click();

  await expect(configurator.getByRole("status")).toContainText("Résumé copié");
  const transfer = await page.evaluate(() => {
    const state = window as Window & { __copied?: string; __opened?: string };
    return { copied: state.__copied, opened: state.__opened };
  });
  expect(transfer.copied).toContain("Direction artistique");
  expect(transfer.copied).toContain("150 CHF");
  expect(transfer.opened).toBe("https://www.instagram.com/nube.experience/");
});

test("la navigation Studio atteint les sections principales", async ({ page }) => {
  await page.goto("/creation");
  const studioNavigation = page.getByRole("navigation", { name: "Navigation Studio" });
  await studioNavigation.getByRole("link", { name: "MON PROJET" }).click();
  await expect(page).toHaveURL(/#configurateur$/);
  await expect(page.locator("#configurateur")).toBeInViewport();
});

test("les principales zones de navigation gardent une cible de 44 px", async ({ page }) => {
  await page.goto("/");

  const undersized = await page.locator("header nav a:visible, footer nav a:visible, a[class*='border-b']:visible").evaluateAll((links) =>
    links
      .map((link) => ({ text: link.textContent?.trim(), height: link.getBoundingClientRect().height }))
      .filter((link) => link.height < 43.5),
  );

  expect(undersized).toEqual([]);
});

test("Studio reste plus direct sur mobile", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mesure réservée au mobile");
  await page.goto("/creation");

  await expect(page.locator("#parcours")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /BASE SINGLE/ })).toBeVisible();
  await expect(page.locator("#configurateur label strong")).toHaveCount(17);
  await expect(page.getByRole("group", { name: "Formule Studio : nombre de sons" })).toBeVisible();
});

test("toutes les pages restent lisibles aux largeurs courantes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "La matrice contient déjà les formats mobiles");
  const viewports = [
    { width: 320, height: 700 },
    { width: 375, height: 760 },
    { width: 768, height: 900 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const entry of pages) {
      await page.goto(entry.path);
      const layout = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(layout.content, `${entry.path} déborde à ${viewport.width}px`).toBeLessThanOrEqual(layout.viewport + 1);

      const heading = page.locator("h1:visible").first();
      if (await heading.count()) {
        const box = await heading.boundingBox();
        expect(box?.x ?? 0, `${entry.path} masque son titre à ${viewport.width}px`).toBeGreaterThanOrEqual(-1);
        expect((box?.x ?? 0) + (box?.width ?? 0), `${entry.path} coupe son titre à ${viewport.width}px`).toBeLessThanOrEqual(viewport.width + 1);
      }
    }
  }
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

for (const errorName of ["SecurityError", "QuotaExceededError"]) {
  test(`le configurateur reste utilisable si la sauvegarde échoue : ${errorName}`, async ({ page }) => {
    const errors = captureBrowserErrors(page);
    await page.addInitScript((name) => {
      Storage.prototype.setItem = () => { throw new DOMException("Storage unavailable", name); };
    }, errorName);
    await page.goto("/creation");
    const configurator = page.locator("#configurateur");
    await configurator.locator("label", { hasText: "Cover" }).click();
    await expect(configurator.getByRole("checkbox", { name: /Cover/ })).toBeChecked();
    await expect(page.locator("#project-summary")).toContainText("50 CHF");
    await configurator.getByRole("button", { name: "RÉINITIALISER MON PROJET" }).click();
    await expect(configurator.getByRole("checkbox", { name: /Cover/ })).not.toBeChecked();
    expect(errors).toEqual([]);
  });
}

test("le rose du Studio s’adapte aux fonds clairs et sombres", async ({ page }) => {
  await page.goto("/creation");
  await expect(page.locator("#configurateur h2 em")).toHaveCSS("color", "rgb(168, 21, 104)");
  await expect(page.locator("#project-summary > div").first().locator("p").first()).toHaveCSS("color", "rgb(255, 102, 196)");
});
