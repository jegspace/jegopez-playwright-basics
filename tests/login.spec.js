// Playwright Basics Activity 1


import { test, expect } from '@playwright/test';

// Happy path, login with valid credentials

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await expect(page.getByText('Swag Labs')).toBeVisible()
  
  // Screenshot after successful login
  await page.screenshot({ path: 'test-screenshots/login-success.png', fullPage: true });
});

// Login with incorrect password

test('Verify login fails with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('wrong_password')
  await page.locator('[data-test="login-button"]').click()
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service')
});

// Login with blank username

test('Verify login fails with blank username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
});

// Login with blank password

test('Verify login fails with blank password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');
});

// You can run this test via Headed or Headless mode
// Headed mode: npx playwright test tests/login.spec.js --headed
// Headless mode: npx playwright test tests/login.spec.js
// Run via --ui flag: npx playwright test tests/login.spec.js --ui
// Run in Chrome: npx playwright test tests/login.spec.js --project chromium