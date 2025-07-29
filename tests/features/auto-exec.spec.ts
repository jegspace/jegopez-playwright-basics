// Session 12

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
    await page.locator("a[href='/products']").click();
    await expect(page).toHaveURL("https://automationexercise.com/products");
    await expect(page.locator("h2.title.text-center")).toHaveText(
      "All Products"
    );
  });

  test("The Header should contain the following Navigation Menu", async ({
    page,
  }) => {
    // await page.goto("https://www.automationexercise.com/");
    await expect(page.locator("#header")).toMatchAriaSnapshot(`
    - link "Website for automation practice":
      - /url: /
      - img "Website for automation practice"
    - list:
      - listitem:
        - link " Home":
          - /url: /
      - listitem:
        - link " Products":
          - /url: /products
      - listitem:
        - link " Cart":
          - /url: /view_cart
      - listitem:
        - link " Signup / Login":
          - /url: /login
      - listitem:
        - link " Test Cases":
          - /url: /test_cases
      - listitem:
        - link " API Testing":
          - /url: /api_list
      - listitem:
        - link " Video Tutorials":
          - /url: https://www.youtube.com/c/AutomationExercise
      - listitem:
        - link " Contact us":
          - /url: /contact_us
    `);
  });

  test("Verify all Products label", async ({ page }) => {
    await page.locator("a[href='/products']").click();
    await expect(
      page.getByRole("heading", { name: "All Products" })
    ).toContainText(/All Products/)
  });
});
