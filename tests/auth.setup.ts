import { test as setup, expect } from '@playwright/test';
//import path from 'path';

const authFilePath = './e2e-tests/test-results/user.json'

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('/sign-in');
    await page.locator('[name=email]').fill('Chadrick.Cassin@gmail.com');
    await page.locator('[name=password]').fill('abcd1234F#');
    await page.getByRole('button', {name : 'Login'}).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  
    // End of authentication steps.
  
    await page.context().storageState({ path: authFilePath });
  });




