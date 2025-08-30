import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationexercise.com/');
});

     
  test("Should show products in grid", async ({ page }) => {

    // First product
    const firstProduct = page.locator('.features_items .product-image-wrapper').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.screenshot({ path: 'test-screenshots/firstProduct.png' });

 
    // Last product
    const lastProduct = page.locator('.features_items .product-image-wrapper').last();
    await expect(lastProduct).toBeVisible();
    await lastProduct.screenshot({ path: 'test-screenshots/lastProduct.png' });
   
    
    // 3rd product (nth = index)
    const thirdProduct = page.locator('.features_items .product-image-wrapper').nth(2);
    await expect(thirdProduct).toContainText(/Jeans|Dress|Saree/);
    await thirdProduct.screenshot({ path: 'test-screenshots/thirdProduct.png' });

    // Get product name and price
    const name = await thirdProduct.locator('.productinfo p').textContent();
    const price = await thirdProduct.locator('.productinfo h2').textContent();
    console.log(`3rd Product: ${name} | ${price}`);


  });

    test("Should add product to cart by product-id attribute", async ({ page }) => {
    // Locate by attribute
    const addToCartButton = page.locator('.productinfo a.add-to-cart[data-product-id="37"]');
    await addToCartButton.click();

    // Modal confirmation should appear
    await expect(page.locator('#cartModal')).toBeVisible();
    await expect(page.locator('#cartModal')).toContainText('Added!');
  });


  test("Should open product details via View Product link", async ({ page }) => {
    // Locate by href prefix
    const viewProduct = page.locator('a[href^="/product_details/40"]');
    await viewProduct.click();

    // Check product details page
    await expect(page.locator('.product-information')).toContainText('Rust Red Linen Saree');
    await expect(page.locator('.product-information')).toContainText('Rs. 3500');
  });
 