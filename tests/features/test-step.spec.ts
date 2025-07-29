// Session 12 test.step

import { test, expect } from "@playwright/test";

test.describe("Automation Exercise - Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://automationexercise.com/");
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // Our test should be able to run in isolation
  test("Should successfully visit product page", async ({ page }) => {
    // Step 1
    await test.step("Navigate to Products Page", async () => {
      await page.locator("a[href='/products']").click();
    });
    // Step 2
    await test.step("Verify URL and All Products label", async () => {
      await expect(page).toHaveURL("https://automationexercise.com/products");
      await expect(page.locator("h2.title.text-center")).toHaveText(
        "All Products"
      );
    });
  });

  test("Verify all Products label", async ({ page }) => {
    await page.locator("a[href='/products']").click();
    await expect(
      page.getByRole("heading", { name: "All Products" })
    ).toContainText(/All Products/);
  });
});
