import { test, expect } from '@playwright/test';

test('Login flow - success and failure', async ({ page }) => {
    // Visit the login page
    await page.goto('http://localhost:3000/login');

    // Locate the email input and fill it
    await page.fill('#email-input', 'test@maddox123.ai'); 

    // Locate the password input and fill it
    await page.fill('#password-input', 'supersecure'); 

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for navigation to the home page
    await page.waitForURL('http://localhost:3000/');

    // Assert that we are on the home page
    await expect(page).toHaveURL('http://localhost:3000/');

    // Logout to test unsuccessful login
    await page.click('button:has-text("Logout")');
    await page.waitForURL('http://localhost:3000/login');

    // Test invalid login
    await page.fill('#email-input', 'invalid@example.com');
    await page.fill('#password-input', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Check for error message
    await expect(page.locator('p')).toHaveText('Invalid email or password. Try again.');
});
