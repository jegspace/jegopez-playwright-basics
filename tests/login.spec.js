// Playwright Basics Activity 1

import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await expect(page.getByText('Swag Labs')).toBeVisible()
});

test('Verify login fails with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('wrong_password')
  await page.locator('[data-test="login-button"]').click()
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match')
});

// You can run this test via Headed or Headless mode
// Headed mode: npx playwright test tests/login.spec.js --headed
// Headless mode: npx playwright test tests/login.spec.js
// Run via --ui flag: npx playwright test tests/login.spec.js --ui
// Run in Chrome: npx playwright test tests/login.spec.js --project chromium