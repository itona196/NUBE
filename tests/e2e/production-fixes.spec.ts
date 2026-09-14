import { expect, test } from "@playwright/test";

test("CSP unique, scripts autorisés et script injecté bloqué", async ({ page, request }) => {
  const first = await request.get("/");
  const second = await request.get("/");
  const policy = first.headers()["content-security-policy"];
  expect(policy).toContain("'strict-dynamic'");
  expect(policy).toContain("object-src 'none'");
  expect(policy).not.toContain("'unsafe-eval'");
  expect(policy.split(";").find(v => v.trim().startsWith("script-src"))).not.toContain("'unsafe-inline'");
  expect(policy).not.toBe(second.headers()["content-security-policy"]);
  expect(first.headers()["strict-transport-security"]).toBe("max-age=31536000");
  await page.route("**/festival", async route => {
    const response = await route.fetch();
    const html = await response.text();
    await route.fulfill({ response, body: html.replace("</body>", "<script>window.__untrustedExecuted = true</script></body>") });
  });
  await page.goto("/festival");
  expect(await page.locator('script[type="application/ld+json"]').evaluateAll(es => es.every(e => Boolean((e as HTMLScriptElement).nonce)))).toBe(true);
  expect(await page.evaluate(() => (window as Window & { __untrustedExecuted?: boolean }).__untrustedExecuted)).toBeUndefined();
  if (await page.getByRole("button", { name: "Ouvrir le menu" }).isVisible()) {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await page.getByRole("navigation", { name: "Navigation principale mobile" }).getByRole("link", { name: "STUDIO" }).click();
  } else {
    await page.getByRole("navigation", { name: "Navigation principale", exact: true }).getByRole("link", { name: "STUDIO" }).click();
  }
  await page.getByRole("button", { name: /BASE SINGLE/ }).click();
  await expect(page.locator("#project-summary")).toContainText("421 CHF");
});

test("WebP servi même quand le navigateur accepte AVIF", async ({ request }) => {
  const response = await request.get("/_next/image?url=%2Fartists%2Fsh4m.jpg&w=640&q=75", { headers: { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" }, timeout: 15000 });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/webp");
});

test("les six pages et le sitemap utilisent le domaine public", async ({ page, request }) => {
  for (const path of ["/", "/festival", "/artistes", "/archives", "/infos", "/creation"]) {
    await page.goto(path);
    await expect.poll(async () => new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).href).toBe(`https://nubeexperience.ch${path}`);
  }
  expect(await (await request.get("/sitemap.xml")).text()).not.toContain("localhost");
  expect(await (await request.get("/robots.txt")).text()).toContain("https://nubeexperience.ch/sitemap.xml");
});

test("menu paysage défilable et focus restauré après Échap", async ({ page }) => {
  await page.setViewportSize({ width: 568, height: 320 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
  await toggle.click();
  const menu = page.locator("#mobile-navigation");
  await expect(menu).toHaveCSS("overflow-y", "auto");
  expect((await menu.boundingBox())!.height).toBeLessThanOrEqual(243);
  const studio = menu.getByRole("link", { name: "STUDIO" });
  await studio.focus();
  await expect(studio).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Ouvrir le menu" })).toBeFocused();
});

test("la barre Studio disparaît pendant la lecture du récapitulatif", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/creation");
  await page.getByRole("button", { name: /BASE SINGLE/ }).click();
  await expect(page.locator("[data-studio-mobile-summary]")).toBeVisible();
  const copy = page.getByRole("button", { name: "COPIER LE RÉCAPITULATIF ET OUVRIR INSTAGRAM" });
  await copy.focus();
  await expect(page.locator("[data-studio-mobile-summary]")).toHaveCount(0);
  const box = (await copy.boundingBox())!;
  expect(box.y).toBeGreaterThanOrEqual(132);
  expect(box.y + box.height).toBeLessThanOrEqual(844);
});
