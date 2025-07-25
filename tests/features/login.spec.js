// Session 11
// SPEC FILE = TEST FILE

import { test, expect } from '@playwright/test';
// TEST is a function that allows you to define a test case

test('Verify that user is able to login with valid credentials', async ({ page }) => {
    // ARRANGE & ACT
    // Test Step #1
  await page.goto('https://www.saucedemo.com/')

  // LOCATOR = a way to find an element on the page e.g. data-test = 'some_value'
  // FILL = a method to fill an input field with a value or text
  // TEST Step #2
  await page.locator('[data-test="username"]').fill('standard_user')
  // TEST Step #3
  await page.locator('[data-test="password"]').fill('secret_sauce')
  // TEST Step #4
  await page.locator('[data-test="login-button"]').click()
  // ASSERT
  // TEST Step #5
  await expect(page).toHaveURL(/inventory.html/)
  await expect(page.getByText('Swag Labs')).toBeVisible()
  await expect(page.getByText('Swag Labs')).toHaveText('Swag Labs')
  
});

// Login with invalid password

test('Verify login fails with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('invalid_password')
    await page.locator('[data-test="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service')
  });

