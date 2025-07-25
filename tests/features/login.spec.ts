import { test, expect } from '@playwright/test';

test('Authentication should be successful.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
 
  await page.locator('[data-test="username"]').fill('standard_user');
 
  await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
 
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Verify URL
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Swag Labs logo should be visible
  await expect(page.getByText('Swag Labs')).toBeVisible();

  // Screenshot after successful login
  await page.screenshot({ path: 'test-screenshots/authentication-success.png', fullPage: true });
});