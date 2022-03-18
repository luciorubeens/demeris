import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.on('domcontentloaded', () => {
    page.evaluate('window.Cypress=true; window.chrome=true; window.keplr=true');
  });
  await page.goto('/welcome');
});

test.describe('Welcome page elements location and availibility', () => {
  test.only('Connect Keplr button', async ({ page }) => {
    const keplrBtn = await page.locator('button:has-text("Connect Keplr")');
    await expect(keplrBtn).toBeVisible();
  });
  test('Try the Demo button', async ({ page }) => {
    const demoBtn = await page.locator('[data-cy=tryTheDemoButtonConnect]', { hasText: 'Try the demo' });
    await expect(demoBtn).toBeVisible();
  });
});
