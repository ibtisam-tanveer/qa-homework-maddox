import { test, expect } from '@playwright/test';

test('Logout functionality', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3000/login');
    await page.fill('#email-input', 'test@maddox123.ai');
    await page.fill('#password-input', 'supersecure');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/');

    // Click logout
    await page.click('button:has-text("Logout")');

    // Verify redirection to login
    await page.waitForURL('http://localhost:3000/login');
    await expect(page).toHaveURL('http://localhost:3000/login');

    // Try accessing home page
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000/login'); // Should redirect to login
});
