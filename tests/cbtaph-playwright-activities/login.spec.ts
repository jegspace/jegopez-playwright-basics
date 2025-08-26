// Login with valid credentials

import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
await page.goto('https://www.saucedemo.com/')
await page.locator('[data-test="username"]').fill('standard_user')
await page.locator('[data-test="password"]').fill('secret_sauce')
await page.locator('[data-test="login-button"]').click()
await expect(page.getByText('Swag Labs')).toBeVisible()
});

// Login with valid username and wrong password

test('Verify login fails with wrong password', async ({ page }) => {
await page.goto('https://www.saucedemo.com/')
await page.locator('[data-test="username"]').fill('standard_user')
await page.locator('[data-test="password"]').fill('wrong_password')
await page.locator('[data-test="login-button"]').click()
await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match')
});

// Login with wrong username and valid password

test('Verify login fails with wrong username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standarduser');  
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

// Login with empty username

test('Verify login fails with empty username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('')
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
});

// Login with empty password

test('Verify login fails with empty password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');
});

// Login with empty username and password

test('Verify login fails with empty username and password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('')
  await page.locator('[data-test="password"]').fill('');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
});

// Case sensitivity check with password

test('Verify login fails with incorrect password case', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('Secret_Sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

// Case sensitivity check with username

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('Standard_User');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});


// Multiple failed login attempts should lock account

test('Verify account locks after multiple failed login attempts', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')

  const username = 'standard_user'
  const wrongPassword = 'wrong_password'

  // Try 50 failed login attempts

  for (let i = 0; i < 50; i++) {
    await page.locator('[data-test="username"]').fill(username)
    await page.locator('[data-test="password"]').fill(wrongPassword)
    await page.locator('[data-test="login-button"]').click()

    // Check error still shows invalid credentials
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    )

    // Clear fields before next attempt (important, otherwise input might persist)
    await page.locator('[data-test="username"]').fill('')
    await page.locator('[data-test="password"]').fill('')
  }

  // 4th attempt should now trigger account lock (if implemented)
  await page.locator('[data-test="username"]').fill(username)
  await page.locator('[data-test="password"]').fill(wrongPassword)
  await page.locator('[data-test="login-button"]').click()

  // Expected lockout message (replace with actual message your app shows)
  await expect(page.locator('[data-test="error"]')).toContainText(
    'Your account has been locked'
  )
})

