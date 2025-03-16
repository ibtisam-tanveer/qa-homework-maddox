import { test, expect } from '@playwright/test';

test('Counter functionality', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3000/login');
    await page.fill('#email-input', 'test@maddox123.ai');
    await page.fill('#password-input', 'supersecure');
    await page.click('button[type="submit"]');
    await page.waitForURL('http://localhost:3000/');

    // Locate counter value
    const counter = page.locator('p');

    // Initial value should be 0
    await expect(counter).toHaveText('0');

    // Click increment button and verify
    await page.click('button:has-text("+")');
    await expect(counter).toHaveText('1');

    // Click decrement button and verify
    await page.click('button:has-text("-")');
    await expect(counter).toHaveText('0');

    // Click reset button and verify
    await page.click('button:has-text("Reset")');
    await expect(counter).toHaveText('0');
});
