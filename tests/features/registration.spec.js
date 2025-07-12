import { test, expect } from '@playwright/test';

// Before each test, we will clean the database to ensure a fresh state
test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Admin Page' }).click();
    await page.getByRole('button', { name: 'Clean' }).click();
});

test('Verify that user is able to register account', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('[id="customer.firstName"]').fill('Regie');
  await page.locator('[id="customer.lastName"]').fill('Test');
  await page.locator('[id="customer.address.street"]').fill('123 Test St');
  await page.locator('[id="customer.address.city"]').fill('Test City');
  await page.locator('[id="customer.address.state"]').fill('Test State');
  await page.locator('[id="customer.address.zipCode"]').fill('3019');
  await page.locator('[id="customer.phoneNumber"]').fill('0912345678');
  await page.locator('[id="customer.ssn"]').fill('123456');
  await page.locator('[id="customer.username"]').fill('QWERTY123');
  await page.locator('[id="customer.password"]').fill('regietest');
  await page.locator('#repeatedPassword').fill('regietest');

  await page.getByRole('button', { name: 'Register' }).click();
  // ASSERT
  await expect(page.locator('h1.title')).toBeVisible();
  await expect(page.locator('h1.title')).toContainText(/Welcome/);
});