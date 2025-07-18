import { test, expect } from '@playwright/test';

test.describe('Pokemon Table Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://labs.tesautomationph.com/table'); 
  });

  test('Should show pokemon data in table', async ({ page }) => {
    const firstRow = page.locator('[data-testid^="pokemon-row-"]').first(); // ^ = starts with
    await firstRow.waitFor({ state: 'visible' });
    await expect(firstRow).toBeVisible();

    // Get the last row
    const lastRow = page.locator('[data-testid^="pokemon-row-"]').last();
    await lastRow.waitFor({ state: 'visible' });
    await expect(lastRow).toBeVisible();

    // Get the 5th row (nth(4) because counting starts at 0)
    // Chaining of Locators - fifthRow and cells variable
    const fifthRow = page.locator('[data-testid^="pokemon-row-"]').nth(4);
    await fifthRow.waitFor({ state: 'visible' });
    await expect(fifthRow).toBeVisible();
    
    const cells = await fifthRow.locator('td').allTextContents();
    const formattedOutput = cells.join(' | ');
    console.log('Row cells:', formattedOutput);
  });

  test('Should filter pokemon when searching', async ({ page }) => {
    // Find search box and type "pikachu"
    await page.locator('[data-testid="search-input"]').fill('pikachu');

    // Check only matching rows show
    const rows = page.locator('[data-testid^="pokemon-row-"]');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Pikachu');
  });
});
