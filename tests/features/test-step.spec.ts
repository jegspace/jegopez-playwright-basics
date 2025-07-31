// Session 12 test.step
// Example use of annotation
// Example use of single tagging of test - > { tag: '@Happy-Path'},
// Example use of multiple tagging of test

import { test, expect } from "@playwright/test";

test.describe(
  "Automation Exercise - Navigation",
  {
    annotation: {
      type: "Functional Testing",
      description: "Annotate the Test Suite Test Step",
    },
  },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("https://automationexercise.com/");
    });

    // Our test should be able to run in isolation

    test(
      "Should successfully visit product page",
      { tag: "@Happy-Path" },
      async ({ page }) => {
        // Step 1
        await test.step("Navigate to Products Page", async () => {
          await page.locator("a[href='/products']").click();
        });
        // Step 2

        await test.step("Verify URL and All Products label", async () => {
          await expect(page).toHaveURL(
            "https://automationexercise.com/products"
          );
          await expect(page.locator("h2.title.text-center")).toHaveText(
            "All Products"
          );
        });
      }
    );

    test(
      "Should successfully Search Winter Top",
      {
        annotation: {
          type: "issue",
          description:
            "can't search the product - https://github.com/jegspace/jegopez-playwright-basics/issues/1#issue-3277441925",
        },
        tag: ["@Smoke", "@Regression", "@Happy-Path"],
      },
      async ({ page }) => {
        await page.locator("a[href='/products']").click();
        await page
          .getByRole("textbox", { name: "Search Product" })
          .fill("Winter Top");
        await page.getByRole("button", { name: "" }).click();
      }
    );

    // test.slow();
    test(
      "Should successfully Search Sleeveless Dress",
      {
        annotation: {
          type: "issue",
          description:
            "can't search the product - https://github.com/jegspace/jegopez-playwright-basics/issues/1#issue-3277441925",
        },
        tag: "@Functional-Testing",
      },

      async ({ page, browserName }) => {
        test.slow(
          browserName === "chromium",
          "This feature is slow in Chromium"
        );
        await page.locator("a[href='/products']").click();
        await page
          .getByRole("textbox", { name: "Search Product" })
          .fill("Sleeveless Dress");
        await page.getByRole("button", { name: "" }).click();
      }
    );

    // test.skip ; test.only ; test.fixme
    test.fixme(
      "To be fixed - Should successfully Search Blue Top",
      {
        annotation: {
          type: "issue",
          description:
            "can't search the product - https://github.com/jegspace/jegopez-playwright-basics/issues/1#issue-3277441925",
        },
        tag: "@Functional-Testing",
      },

      async ({ page, browserName }) => {
        test.slow(
          browserName === "chromium",
          "This feature is slow in Chromium"
        );
        await page.locator("a[href='/products']").click();
        await page.getByRole('textbox', { name: 'Search Product' }).fill('Blue Top');
        await page.getByRole('button', { name: '' }).click();
      }
    );

  });
