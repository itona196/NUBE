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
  { names: ["Clip"], estimate: "sur devis" },
  { names: ["Cover"], estimate: "50 CHF" },
  { names: ["Cover", "Clip"], estimate: "50 CHF + prestations sur devis, en supplément et non incluses" },
]) {
  test(`estimation copiée : ${entry.names.join(" + ")}`, async ({ page }) => {
    await captureCopy(page);
    await page.goto("/creation");
    await expect(page.getByRole("button", { name: /COPIER LE RÉCAPITULATIF/ })).toHaveCount(0);
    for (const name of entry.names) await page.locator("#configurateur label", { hasText: name }).click();
    const copied = await copiedSummary(page);
    expect(copied).toContain(`Estimation indicative : ${entry.estimate}.`);
    expect(copied).not.toMatch(/(?:^|\s)0 CHF/);
    expect(copied).not.toContain("enregistrement, mix & master");
    await expect(page.locator("#project-summary")).toContainText(`Estimation indicative : ${entry.estimate}.`);
  });
}

for (const entry of [
  { preset: "SINGLE", gross: 495, discount: 74, estimate: 421 },
  { preset: "EP", gross: 495, discount: 74, estimate: 421 },
  { preset: "ALBUM", gross: 715, discount: 107, estimate: 608 },
]) {
  test(`formule Studio et réduction : base ${entry.preset}`, async ({ page }) => {
    await captureCopy(page);
    await page.goto("/creation");
    await page.getByRole("button", { name: new RegExp(`BASE ${entry.preset}`) }).click();
    const summary = page.locator("#project-summary");
    await expect(summary).toContainText("Studio — enregistrement, mix & master : 1 son (175 CHF)");
    await expect(summary).toContainText(`${entry.gross} CHF`);
    await expect(summary).toContainText(`− ${entry.discount} CHF`);
    expect(await copiedSummary(page)).toContain(`Estimation indicative : ${entry.estimate} CHF.`);
    expect(await copiedSummary(page)).toContain("Studio — enregistrement, mix & master : 1 son (175 CHF)");
    await summary.getByRole("button", { name: "Retirer Studio", exact: true }).click();
    await expect(summary).not.toContainText("enregistrement, mix & master");
    expect(await copiedSummary(page)).not.toContain("enregistrement, mix & master");
  });
}

test("Studio seul inclut l’acompte sans réduction", async ({ page }) => {
  await captureCopy(page);
  await page.goto("/creation");
  await page.locator("#configurateur label").filter({ has: page.locator("strong", { hasText: /^Studio$/ }) }).click();
  expect(await copiedSummary(page)).toContain("Estimation indicative : 175 CHF.");
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
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem("nube-studio-project")!))).toMatchObject({ projectType: entry.type, selected: entry.ids });
    await expect(page.locator('#configurateur input[type="checkbox"]:checked')).toHaveCount(entry.ids.length);
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
    await expect(page.locator("#project-summary")).toContainText("50 CHF");
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

for (const entry of [{ songs: 1, price: 175 }, { songs: 2, price: 310 }, { songs: 3, price: 405 }, { songs: 4, price: 460 }]) {
  test(`formule ${entry.songs} sons et acompte inclus`, async ({ page }) => {
    await captureCopy(page);
    await page.goto("/creation");
    await page.locator('#configurateur label').filter({ has: page.locator('strong', { hasText: /^Studio$/ }) }).click();
    await page.getByRole('radio', { name: `${entry.songs} son${entry.songs > 1 ? 's' : ''} : ${entry.price} CHF`, exact: true }).check();
    expect(await copiedSummary(page)).toContain(`Estimation indicative : ${entry.price} CHF.`);
    expect(await copiedSummary(page)).toContain('100 CHF, compris dans la formule et déduit du solde');
    await expect(page.locator('#project-summary')).not.toContainText('Réduction de 15 % activée');
    await expect(page.locator('#project-summary')).toContainText('1 sur 3');
  });
}

test('suppléments exclus du seuil et de la réduction', async ({ page }) => {
  await captureCopy(page);
  await page.goto('/creation');
  const selectService = async (name: string) => page.locator('#configurateur label').filter({ has: page.locator('strong', { hasText: new RegExp(`^${name}$`) }) }).click();
  await selectService('Studio');
  for (const name of [/Featuring/, /PPP/, /Live :/]) await page.getByRole('checkbox', { name }).check();
  expect(await copiedSummary(page)).toContain('Estimation indicative : 285 CHF.');
  await expect(page.locator('#project-summary')).toContainText('1 sur 3');
  await selectService('Cover');
  expect(await copiedSummary(page)).toContain('Estimation indicative : 335 CHF.');
  await selectService('Direction artistique');
  expect(await copiedSummary(page)).toContain('Estimation indicative : 429 CHF.');
  await expect(page.locator('#project-summary')).toContainText('− 56 CHF');
  await expect(page.locator('#project-summary')).toContainText('Featuring : +50 CHF (hors réduction)');
  await page.getByRole('button', { name: 'Retirer Studio', exact: true }).click();
  expect(await copiedSummary(page)).toContain('Estimation indicative : 200 CHF.');
  expect(await copiedSummary(page)).not.toContain('Supplément');
  await expect(page.getByRole('checkbox', { name: /Featuring/ })).toBeDisabled();
});

test('les formats multiplient le tarif et comptent comme un service', async ({ page }) => {
  await captureCopy(page);
  await page.goto('/creation');
  await page.locator('#configurateur label', { hasText: 'Déclinaison visuelle' }).click();
  await page.getByRole('spinbutton', { name: 'Nombre de formats' }).fill('3');
  expect(await copiedSummary(page)).toContain('Estimation indicative : 90 CHF.');
  await expect(page.locator('#project-summary')).toContainText('1 sur 3');
  for (const name of ['Affiche', 'Visuel promotionnel']) await page.locator('#configurateur label').filter({ has: page.locator('strong', { hasText: new RegExp(`^${name}$`) }) }).click();
  expect(await copiedSummary(page)).toContain('Estimation indicative : 221 CHF.');
  expect(await copiedSummary(page)).toContain('3 formats à 30 CHF/format');
});

test('restauration des formules, formats et suppléments filtrés', async ({ page }) => {
  await captureCopy(page);
  await page.addInitScript(() => localStorage.setItem('nube-studio-project', JSON.stringify({ projectType: 'EP', selected: ['studio', 'visual-format', 'mix-master'], studioSongs: 4, visualFormats: 3, studioExtras: ['featuring', 'featuring', 'invalid', null] })));
  await page.goto('/creation');
  expect(await copiedSummary(page)).toContain('Estimation indicative : 600 CHF.');
  await expect(page.getByRole('radio', { name: '4 sons : 460 CHF', exact: true })).toBeChecked();
  await expect(page.getByRole('spinbutton', { name: 'Nombre de formats' })).toHaveValue('3');
  await expect(page.locator('#project-summary')).toContainText('2 sur 3');
});

test("les nouveaux tarifs Design, Musique et Visuel sont affichés", async ({ page }) => {
  await page.goto("/creation");
  for (const entry of [
    { name: "Direction artistique", price: "dès 150 CHF" },
    { name: "Identité visuelle", price: "200 CHF" },
    { name: "Cover", price: "50 CHF" },
    { name: "Affiche", price: "100 CHF" },
    { name: "Visuel promotionnel", price: "70 CHF" },
    { name: "Déclinaison visuelle", price: "30 CHF/format" },
    { name: "Production musicale", price: "dès 100 CHF" },
    { name: "Composition / arrangement", price: "30 CHF" },
    { name: "Accompagnement artistique", price: "30 CHF" },
    { name: "Shooting photo", price: "120 CHF" },
    { name: "Contenu promotionnel", price: "100 CHF" },
    { name: "Contenu vertical", price: "80 CHF" },
    { name: "Visualizer", price: "120 CHF" },
    { name: "Vidéo", price: "dès 150 CHF" },
    { name: "Captation live/performance", price: "dès 150 CHF" },
    { name: "Clip", price: "sur devis" },
  ]) {
    const row = page.locator("#configurateur label").filter({ has: page.locator("strong", { hasText: new RegExp(`^${entry.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`) }) });
    await expect(row).toHaveCount(1);
    await expect(row.locator("small")).toContainText(entry.price);
  }
});
