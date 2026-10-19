import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
test('renderiza 113 variantes e 20 ícones sem overflow em mobile', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const width of [320, 390, 430, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page
        .locator('.kb-icon')
        .first()
        .evaluate((el) => getComputedStyle(el).maskImage),
    ).not.toBe('none');
    await expect(page.locator('.component-section')).toHaveCount(50);
    await expect(page.locator('.specimen[data-component]')).toHaveCount(133);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test('modal prende foco, fecha com Escape e restaura o acionador', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Abrir confirmação' });
  await button.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(button).toBeFocused();
});
test('captura exemplos para revisão visual', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .locator('.kb-icon')
      .first()
      .evaluate((el) => getComputedStyle(el).maskImage),
  ).not.toBe('none');
  mkdirSync('test-results/visual', { recursive: true });
  await page.locator('#playground').screenshot({ path: 'test-results/visual/playground.png' });
  await page.locator('#Button').screenshot({ path: 'test-results/visual/buttons.png' });
  await page.locator('#Logo').screenshot({ path: 'test-results/visual/logos.png' });
  await page.locator('#PaymentCard').screenshot({ path: 'test-results/visual/cards.png' });
});
