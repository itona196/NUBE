import { expect, test, type Page } from "@playwright/test";

async function captureCopy(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { value: { writeText: async (text: string) => {
      (window as Window & { copied?: string }).copied = text;
    } } });
    window.open = () => null;
  });
}
async function copiedSummary(page: Page) {
  await page.getByRole("button", { name: "COPIER LE RÉCAPITULATIF ET OUVRIR INSTAGRAM" }).click();
  await expect(page.getByRole("status")).toContainText("Résumé copié");
  return page.evaluate(() => (window as Window & { copied?: string }).copied);
}

for (const entry of [
  { names: ["Clip", "Mix & master"], estimate: "sur devis" },
  { names: ["Cover"], estimate: "80 CHF" },
  { names: ["Cover", "Clip"], estimate: "80 CHF + prestations sur devis, en supplément et non incluses" },
]) {
  test(`estimation copiée : ${entry.names.join(" + ")}`, async ({ page }) => {
    await captureCopy(page);
    await page.goto("/creation");
    await expect(page.getByRole("button", { name: /COPIER LE RÉCAPITULATIF/ })).toHaveCount(0);
    for (const name of entry.names) await page.locator("#configurateur label", { hasText: name }).click();
    const copied = await copiedSummary(page);
    expect(copied).toContain(`Estimation indicative : ${entry.estimate}.`);
    expect(copied).not.toMatch(/(?:^|\s)0 CHF/);
    expect(copied).not.toContain("base d’une heure");
    await expect(page.locator("#project-summary")).toContainText(`Estimation indicative : ${entry.estimate}.`);
  });
}

for (const entry of [
  { preset: "SINGLE", gross: 430, discount: 65, estimate: 365 },
  { preset: "EP", gross: 430, discount: 65, estimate: 365 },
  { preset: "ALBUM", gross: 730, discount: 110, estimate: 620 },
]) {
  test(`hypothèse horaire et réduction : base ${entry.preset}`, async ({ page }) => {
    await captureCopy(page);
    await page.goto("/creation");
    await page.getByRole("button", { name: new RegExp(`BASE ${entry.preset}`) }).click();
    const summary = page.locator("#project-summary");
    await expect(summary).toContainText("Studio — base d’une heure à 50 CHF, durée à convenir");
    await expect(summary).toContainText(`${entry.gross} CHF`);
    await expect(summary).toContainText(`− ${entry.discount} CHF`);
    expect(await copiedSummary(page)).toContain(`Estimation indicative : ${entry.estimate} CHF.`);
    expect(await copiedSummary(page)).toContain("Studio — base d’une heure à 50 CHF, durée à convenir");
    await summary.getByRole("button", { name: "Retirer Studio", exact: true }).click();
    await expect(summary).not.toContainText("base d’une heure");
    expect(await copiedSummary(page)).not.toContain("base d’une heure");
  });
}

test("Studio seul estime une heure sans réduction", async ({ page }) => {
  await captureCopy(page);
  await page.goto("/creation");
  await page.locator("#configurateur label", { hasText: "Studio" }).click();
  expect(await copiedSummary(page)).toContain("Estimation indicative : 50 CHF.");
  await expect(page.locator("#project-summary")).not.toContainText("Réduction de 15 % activée");
});

for (const entry of [
  { label: "valide", raw: JSON.stringify({ projectType: "EP", selected: ["studio", "cover"] }), type: "EP", ids: ["studio", "cover"] },
  { label: "JSON malformé", raw: "{", type: "Single", ids: [] },
  { label: "type objet", raw: JSON.stringify({ projectType: { bad: true }, selected: ["cover"] }), type: "Single", ids: ["cover"] },
  { label: "type inconnu", raw: JSON.stringify({ projectType: "Mixtape", selected: ["clip"] }), type: "Single", ids: ["clip"] },
  { label: "sélection objet", raw: JSON.stringify({ projectType: "Album", selected: {} }), type: "Album", ids: [] },
  { label: "identifiants filtrés", raw: JSON.stringify({ projectType: "Autre", selected: ["cover", "cover", "unknown", 4, {}, null, "studio"] }), type: "Autre", ids: ["cover", "studio"] },
  { label: "tableau racine", raw: "[]", type: "Single", ids: [] },
  { label: "null", raw: "null", type: "Single", ids: [] },
  { label: "primitive", raw: '"Album"', type: "Single", ids: [] },
]) {
  test(`restauration : ${entry.label}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.addInitScript(raw => localStorage.setItem("nube-studio-project", raw), entry.raw);
    await page.goto("/creation");
    await expect(page.locator("#project-summary h3")).toHaveText(entry.type);
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("nube-studio-project")!))).toEqual({ projectType: entry.type, selected: entry.ids });
    await expect(page.locator("#configurateur input:checked")).toHaveCount(entry.ids.length);
    await page.getByRole("button", { name: "RÉINITIALISER MON PROJET" }).click();
    await page.locator("#configurateur label", { hasText: "Cover" }).click();
    await expect(page.getByRole("checkbox", { name: /Cover/ })).toBeChecked();
    expect(errors).toEqual([]);
  });
}

for (const mode of ["getItem", "property"] as const) {
  test(`lecture localStorage refusée : ${mode}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.addInitScript(mode => {
      const denied = () => { throw new DOMException("Access denied", "SecurityError"); };
      if (mode === "property") Object.defineProperty(window, "localStorage", { get: denied });
      else Storage.prototype.getItem = denied;
    }, mode);
    await page.goto("/creation");
    await page.locator("#configurateur label", { hasText: "Cover" }).click();
    await expect(page.locator("#project-summary")).toContainText("80 CHF");
    await page.getByRole("button", { name: "RÉINITIALISER MON PROJET" }).click();
    await expect(page.getByRole("checkbox", { name: /Cover/ })).not.toBeChecked();
    expect(errors).toEqual([]);
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

test("contrastes rendus sur rose et captures ciblées", async ({ page }, testInfo) => {
  for (const path of ["/", "/creation"]) {
    await page.goto(path);
    const title = page.locator("em", { hasText: path === "/" ? "TOUT UN MONDE." : "QUOI ENSEMBLE ?" });
    const surface = title.locator("xpath=ancestor::section");
    const background = await surface.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(background).toBe("rgb(255, 102, 196)");
    const color = await title.evaluate(el => getComputedStyle(el).color);
    expect(contrast(color, background)).toBeGreaterThanOrEqual(4.5);
    await surface.scrollIntoViewIfNeeded();
    await surface.screenshot({ path: testInfo.outputPath(`pink-${path === "/" ? "home" : "studio"}.png`) });
    if (path === "/creation") {
      for (const el of await page.locator("footer p, footer a").all()) {
        expect(contrast(await el.evaluate(el => getComputedStyle(el).color), background)).toBeGreaterThanOrEqual(4.5);
      }
      const link = page.locator("footer nav a").first();
      await link.hover();
      await expect(link).toHaveCSS("color", "rgb(10, 9, 11)");
      await link.focus();
      await expect(link).toHaveCSS("color", "rgb(10, 9, 11)");
      await page.getByRole("button", { name: /BASE SINGLE/ }).click();
      await page.locator("#project-summary").scrollIntoViewIfNeeded();
      await page.screenshot({ path: testInfo.outputPath("studio-summary.png") });
    }
  }
});

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

test("le focus clavier reste contrasté sur les surfaces claires, roses et sombres", async ({ page }, testInfo) => {
  await page.goto("/creation");
  await page.keyboard.press("Tab");
  const targets = [
    { name: "dark", target: page.getByRole("navigation", { name: "Navigation Studio" }).getByRole("link").first(), indicator: page.getByRole("navigation", { name: "Navigation Studio" }).getByRole("link").first(), surface: "rgb(9, 9, 11)" },
    { name: "light", target: page.getByRole("button", { name: /BASE SINGLE/ }), indicator: page.getByRole("button", { name: /BASE SINGLE/ }), surface: "rgb(241, 239, 233)" },
    { name: "pink", target: page.locator("footer nav a").first(), indicator: page.locator("footer nav a").first(), surface: "rgb(255, 102, 196)" },
    { name: "checkbox", target: page.getByRole("checkbox", { name: /Cover/ }), indicator: page.locator("#configurateur label", { hasText: "Cover" }), surface: "rgb(241, 239, 233)" },
  ];
  for (const entry of targets) {
    await entry.target.focus();
    await expect(entry.target).toBeFocused();
    expect(await entry.target.evaluate(el => el.matches(":focus-visible"))).toBeTruthy();
    const ring = await entry.indicator.evaluate(el => {
      const s = getComputedStyle(el);
      return { style: s.outlineStyle, width: parseFloat(s.outlineWidth), outline: s.outlineColor, halo: s.boxShadow.match(/rgba?\([^)]+\)/)?.[0] };
    });
    expect(ring.style).toBe("solid");
    expect(ring.width).toBeGreaterThanOrEqual(2);
    expect(ring.halo).toBeTruthy();
    expect(contrast(ring.outline, ring.halo!)).toBeGreaterThanOrEqual(3);
    expect(Math.max(contrast(ring.outline, entry.surface), contrast(ring.halo!, entry.surface))).toBeGreaterThanOrEqual(3);
    if (entry.name === "pink") await entry.indicator.screenshot({ path: testInfo.outputPath("pink-keyboard-focus.png") });
    if (entry.name === "checkbox") {
      await entry.target.press("Space");
      await expect(entry.target).toBeChecked();
      await entry.target.press("Space");
      await expect(entry.target).not.toBeChecked();
    }
  }
});
