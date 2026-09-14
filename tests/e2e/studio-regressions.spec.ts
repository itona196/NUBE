import { expect, test } from "@playwright/test";

test("les tarifs à la carte et les conditions sont consultables directement", async ({ page }) => {
  await page.goto("/creation");
  const studio = page.locator("#prix-studio");
  for (const [name, price] of [["1 son", "175 CHF"], ["2 sons", "310 CHF"], ["3 sons", "405 CHF"], ["4 sons", "460 CHF"], ["Featuring", "+50 CHF"], ["PPP", "+50 CHF"], ["Live", "+10 CHF"]]) {
    const row = studio.locator("dl > div").filter({ has: page.getByText(name, { exact: true }) });
    await expect(row.locator("dd")).toHaveText(price);
  }
  await expect(studio).toContainText("100 CHF, compris dans la formule et déduit du solde");
  await expect(page.locator(".studio-discount")).toContainText("3 services internes éligibles");
  await expect(page.locator(".studio-discount")).toContainText("La formule Studio compte comme un seul service");
  await expect(page.locator(".studio-discount")).toContainText("Les suppléments et les prestations sur devis sont exclus");
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  await expect(page.getByRole("radio")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /BASE (SINGLE|EP|ALBUM)/ })).toHaveCount(0);
});

test("tous les prix sont disponibles sans JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, ignoreHTTPSErrors: true });
  try {
    const page = await context.newPage();
    await page.goto("/creation");
    await expect(page.locator("#tarifs dd")).toHaveCount(23);
    await expect(page.locator("#prix-design")).toContainText("30 CHF/format");
    await expect(page.locator("#prix-musique")).toContainText("100 CHF+");
    await expect(page.locator("#prix-visuel")).toContainText("Sur devis");
    await expect(page.locator("#contact").getByRole("link", { name: "contact@nubeexperience.ch" })).toHaveAttribute("href", "mailto:contact@nubeexperience.ch");
  } finally { await context.close(); }
});

test("les liens du Studio fonctionnent au clavier", async ({ page }) => {
  await page.goto("/creation");
  const nav = page.getByRole("navigation", { name: "Navigation Studio" });
  for (const [name, hash] of [["TARIFS", "tarifs"], ["SUIVI", "accompagnement"], ["CONTACT", "contact"]]) {
    const link = nav.getByRole("link", { name, exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#${hash}$`));
  }
});

for (const width of [320, 390, 1440]) {
  test(`les prestations et prix restent séparés à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/creation");
    await expect(page.locator("#tarifs dd")).toHaveCount(23);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    for (const row of await page.locator("#tarifs dl > div").all()) {
      const name = await row.locator("dt").boundingBox();
      const price = await row.locator("dd").boundingBox();
      expect(name!.x + name!.width).toBeLessThan(price!.x);
      expect(price!.x + price!.width).toBeLessThanOrEqual(width);
    }
  });
}

// Composite alpha foregrounds over the actual pink surface before WCAG luminance.
function contrast(foreground: string, background: string) {
  const fg = foreground.match(/[\d.]+/g)!.map(Number);
  const bg = background.match(/[\d.]+/g)!.map(Number);
  const alpha = fg[3] ?? 1;
  const luminance = (rgb: number[]) => rgb.slice(0, 3).map(v => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const a = luminance(fg.slice(0, 3).map((v, i) => v * alpha + bg[i] * (1 - alpha)));
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

test("les cinq textes secondaires sur fond clair respectent le contraste", async ({ page }) => {
  for (const entry of [
    { path: "/festival", texts: ["LE FESTIVAL · LAUSANNE", "NOTRE MANIÈRE DE FAIRE"] },
    { path: "/artistes", texts: ["NUBE #1 · 21.06.2026"] },
    { path: "/archives", texts: ["CHAPITRE 01 · 21.06.2026", "CHAPITRE 02"] },
  ]) {
    await page.goto(entry.path);
    for (const text of entry.texts) {
      const target = page.getByText(text, { exact: true });
      const colors = await target.evaluate(el => {
        const style = getComputedStyle(el);
        const rgb = style.color.match(/[\d.]+/g)!.map(Number);
        let surface: Element | null = el;
        let background = "rgba(0, 0, 0, 0)";
        while (surface) {
          background = getComputedStyle(surface).backgroundColor;
          const channels = background.match(/[\d.]+/g)!.map(Number);
          if ((channels[3] ?? 1) > 0) break;
          surface = surface.parentElement;
        }
        return {
          foreground: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(rgb[3] ?? 1) * Number(style.opacity)})`,
          background,
        };
      });
      expect(contrast(colors.foreground, colors.background), text).toBeGreaterThanOrEqual(4.5);
    }
  }
});
