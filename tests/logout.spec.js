import { test, expect } from "@playwright/test";
import { baseUrl,loginUrl } from "../constants/routes";
/**
 * This test is responsible for testing the logingout
 * Methods used:
 * 1. fill: fill the input fields based on the id
 * 2. waitForURL: wait until navigation happen to required page
 * 3. click: use to click button based on id type or text it have
 * 4. expect.thoHave: for assertion
 * 5. goto rediretct to certain page
 */
test("Logout functionality", async ({ page }) => {
  // Logining in to check
  await page.goto(`${baseUrl}${loginUrl}`);
  await page.fill("#email-input", "test@maddox123.ai");
  await page.fill("#password-input", "supersecure");
  await page.click('button[type="submit"]');
  await page.waitForURL(baseUrl);

  // Clicking logout button 
  await page.click('button:has-text("Logout")');

  // Verify redirection to login page on logout click
  await page.waitForURL(`${baseUrl}${loginUrl}`);
  await expect(page).toHaveURL(`${baseUrl}${loginUrl}`);

  // Try accessing home page
  await page.goto(baseUrl);
  await expect(page).toHaveURL(`${baseUrl}${loginUrl}`); 
});
