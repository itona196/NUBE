import { expect, test } from "@playwright/test";

test("lecteur NUBE : lecture, progression, recherche et son", async ({ page }) => {
  await page.goto("/");
  const controls = page.getByRole("group", { name: "Commandes de l’aftermovie" });
  const centralPlay = page.getByRole("button", { name: "Lancer l’aftermovie" });
  await expect(centralPlay).toBeVisible();
  await centralPlay.click();
  await expect(centralPlay).toHaveCount(0);
  await expect(controls.getByRole("button", { name: "Mettre en pause" })).toBeVisible();
  const media = page.locator("video");
  await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  await controls.getByRole("button", { name: "Mettre en pause" }).click();
  await expect(centralPlay).toBeVisible();
  const seek = controls.getByRole("slider", { name: "Position dans la vidéo" });
  await expect(seek).toBeEnabled();
  await seek.focus();
  await seek.press("End");
  await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeCloseTo(146.2, 0);
  await expect(seek).toHaveAttribute("aria-valuetext", /2:26 sur 2:26/);
  await expect(seek).toHaveCSS("background-image", /rgb\(255, 102, 196\)/);
  await seek.focus();
  await seek.press("Home");
  await seek.press("ArrowRight");
  await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  await controls.getByRole("button", { name: "Couper le son" }).click();
  await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).muted)).toBe(true);
  await controls.getByRole("button", { name: "Activer le son" }).click();
  await expect.poll(() => media.evaluate(v => (v as HTMLVideoElement).muted)).toBe(false);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
});

test("lecteur natif disponible sans JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator("video")).toHaveAttribute("controls", "");
  await expect(page.getByRole("group", { name: "Commandes de l’aftermovie" })).toHaveCount(0);
  await context.close();
});

test("plein écran conserve les commandes NUBE", async ({ page }) => {
  await page.goto("/archives");
  const controls = page.getByRole("group", { name: "Commandes de l’aftermovie" });
  await controls.getByRole("button", { name: "Afficher en plein écran" }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.classList.contains("nube-aftermovie"))).toBe(true);
  await controls.getByRole("button", { name: "Quitter le plein écran" }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true);
});


test("Espace contrôle la lecture depuis le lecteur sans faire défiler la page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const player = page.getByRole("region", { name: "Lecteur de l’aftermovie" });
  await player.scrollIntoViewIfNeeded();
  await player.focus();
  await page.waitForTimeout(300);
  const scroll = await page.evaluate(() => scrollY);
  await player.press("Space");
  await expect(player.getByRole("button", { name: "Mettre en pause" })).toBeVisible();
  await player.press("Space");
  await expect(player.getByRole("button", { name: "Lancer l’aftermovie" })).toBeVisible();
  expect(Math.abs(await page.evaluate(() => scrollY) - scroll)).toBeLessThanOrEqual(3);
  const centralPlay = player.getByRole("button", { name: "Lancer l’aftermovie" });
  await centralPlay.focus();
  await centralPlay.press("Space");
  await expect(player.getByRole("button", { name: "Mettre en pause" })).toBeVisible();
  await page.locator("video").click();
  await expect(player).toBeFocused();
  await page.keyboard.press("Space");
  await expect(player.getByRole("button", { name: "Lancer l’aftermovie" })).toBeVisible();
});
