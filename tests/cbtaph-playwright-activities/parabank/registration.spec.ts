

import { test, expect } from '@playwright/test';
// Before each test, we will clean the database to ensure a fresh state
test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Admin Page' }).click();
    await page.getByRole('button', { name: 'Clean' }).click();
});

// Happy Path na lang

test('Verify is a user is able to register an account.', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').fill('Jane');
  await page.locator('[id="customer.lastName"]').fill('Doe');
  await page.locator('[id="customer.address.street"]').fill('B1 L1');
  await page.locator('[id="customer.address.city"]').fill('Muntinlupa');
  await page.locator('[id="customer.address.state"]').fill('Muntinlupa');
  await page.locator('[id="customer.address.zipCode"]').fill('1773');
  await page.locator('[id="customer.phoneNumber"]').fill('09098880000');
  await page.locator('[id="customer.ssn"]').fill('999000999');
  await page.locator('[id="customer.username"]').fill('jane123');
  await page.locator('[id="customer.password"]').fill('doe123');
  await page.locator('#repeatedPassword').fill('doe123');

  await page.getByRole('button', { name: 'Register' }).click();

  // ASSERT
  await expect(page.locator('h1.title')).toBeVisible();
  await expect(page.locator('h1.title')).toContainText(/Welcome/);

});

// Register with empty mandatory field such as first name.

test('Verify registration fails with empty firstName field', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').fill('');
  await page.locator('[id="customer.lastName"]').fill('Doe');
  await page.locator('[id="customer.address.street"]').fill('B1 L1');
  await page.locator('[id="customer.address.city"]').fill('Muntinlupa');
  await page.locator('[id="customer.address.state"]').fill('Muntinlupa');
  await page.locator('[id="customer.address.zipCode"]').fill('1773');
  await page.locator('[id="customer.phoneNumber"]').fill('09098880000');
  await page.locator('[id="customer.ssn"]').fill('999000888');
  await page.locator('[id="customer.username"]').fill('jane123');
  await page.locator('[id="customer.password"]').fill('doe123');
  await page.locator('#repeatedPassword').fill('doe123');

  await page.getByRole('button', { name: 'Register' }).click();

  
  await expect(page.getByText('First name is required.')).toBeVisible();
  await expect(page.locator('[id="customer.firstName.errors"]')).toContainText('First name is required.');
});

// Register with mismatched password

test('Verify registration fails with mismatched password', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').fill('Jane');
  await page.locator('[id="customer.lastName"]').fill('Doe');
  await page.locator('[id="customer.address.street"]').fill('B1 L1');
  await page.locator('[id="customer.address.city"]').fill('Muntinlupa');
  await page.locator('[id="customer.address.state"]').fill('Muntinlupa');
  await page.locator('[id="customer.address.zipCode"]').fill('1773');
  await page.locator('[id="customer.phoneNumber"]').fill('09098880000');
  await page.locator('[id="customer.ssn"]').fill('999000888');
  await page.locator('[id="customer.username"]').fill('jane123');

  await page.locator('[id="customer.password"]').fill('doe123');
  await page.locator('#repeatedPassword').fill('Doe123');

  await page.getByRole('button', { name: 'Register' }).click();
  
  await expect(page.getByText('Passwords did not match.')).toBeVisible();
  await expect(page.locator('[id="repeatedPassword.errors"]')).toContainText('Passwords did not match.');
});