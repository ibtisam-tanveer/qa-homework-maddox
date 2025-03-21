import { test, expect } from "@playwright/test";
import { baseUrl, loginUrl } from "../constants/routes";
/**
 * This test is responsible for testing the counter functionality
 * Methods used:
 * 1. fill: fill the input fields based on the id
 * 2. waitForURL: wait until navigation happen to required page
 * 3. click: use to click button based on id type or text it have
 * 4. expect.thoHave: for assertion
 */
test("should allow me to increase or decrease counter value", async ({ page }) => {
  // make sure user is login 
  await page.goto(`${baseUrl}${loginUrl}`);
  await page.fill("#email-input", "test@maddox123.ai");
  await page.fill("#password-input", "supersecure");
  await page.click('button[type="submit"]');
  await page.waitForURL(baseUrl);

  // Locating the counter 
  const counter = page.locator("p");

  // checking for initial value to be zero
  await expect(counter).toHaveText("0");

  // Clicking increment button to check its response 
  await page.click('button:has-text("+")');
  await expect(counter).toHaveText("1");

  // Clicking decrement button and verify response
  await page.click('button:has-text("-")');
  await expect(counter).toHaveText("0");

  // Clicking reset button and verify response
  await page.click('button:has-text("Reset")');
  await expect(counter).toHaveText("0");
});


  // // Clicking increment button to check its response 
  // // await page.click('button:has-text("+")');
  // // await expect(counter).toHaveText("1");
  // for (let i = 1; i <= 3; i++) {
  //   await page.click('button:has-text("+")');
  //   await expect(counter).toHaveText(`${i}`);
  // }

  // // Clicking decrement button and verify response
  // // await page.click('button:has-text("-")');
  // // await expect(counter).toHaveText("0");
  // for (let i = 2; i >= 0; i--) {
  //   await page.click('button:has-text("-")');
  //   await expect(counter).toHaveText(`${i}`);
  // }
