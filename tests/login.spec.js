import { test, expect } from "@playwright/test";
import { baseUrl, loginUrl } from "../constants/routes";
/**
 * This test is responsible for testing the login flow
 * Methods used:
 * 1. fill: fill the input fields based on the id
 * 2. waitForURL: wait until navigation happen to required page
 * 3. click: use to click button based on id type or text it have
 * 4. expect.thoHave: for assertion
 */
test("should allow me to login and give error message incase of wrong credentials", async ({
  page,
}) => {
  // Visiting the login page
  await page.goto(`${baseUrl}${loginUrl}`);

  // Locating  the email input and fill it
  await page.fill("#email-input", "test@maddox123.ai");

  // Locating the password field using id and filing it
  await page.fill("#password-input", "supersecure");

  // clicking the submitt button to send response
  await page.click('button[type="submit"]');

  // Waiting for navigation to the home page
  await page.waitForURL(baseUrl);

  // Asserting that we are on the home page
  await expect(page).toHaveURL(baseUrl);

  // performing logout to relogin using wrong credentials
  await page.click('button:has-text("Logout")');
  await page.waitForURL(`${baseUrl}${loginUrl}`);

  // Test invalid login
  await page.fill("#email-input", "test@test.com");
  await page.fill("#password-input", "fail_test");
  await page.click('button[type="submit"]');

  // Checking for error message to display
  await expect(page.locator("p")).toHaveText(
    "Invalid email or password. Try again."
  );
});
