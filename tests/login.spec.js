const {test, expect} = require('@playwright/test');

test('Login Successuful with valid credentials', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.pause();

    // Enter Username value
    await page.locator('#user-name').fill('standard_user');

    // Enter Password value
    await page.locator('#password').fill("secret_sauce");

    // Click Login button
    await page.locator('#login-button').click();

    // Check that we in the login page
    await expect(page).toHaveURL(/inventory.html/);

    // Click menu
    await page.locator('#react-burger-menu-btn').click();

    // Click Logout button
    await page.locator('#logout_sidebar_link').click();

});

test('Login Failed with incorrect password', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await page.pause();

    // Enter Username value
    await page.locator('#user-name').fill('standard_user');

    // Enter incorrect value for password
    await page.locator('#password').fill("false_secret_sauce");

    // Click Login button
    await page.locator('#login-button').click();

    // Check the errorMessage 
    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

});

test('Login failed with inorrect username', async({page}) => {
    
    await page.goto('https://www.saucedemo.com/');
    await page.pause();

    // Enter incorrect value for username 
    await page.locator('#user-name').fill('standard_error_user');

    // Enter Password value
    await page.locator('#password').fill("secret_sauce");

    // Click Login button
    await page.locator('#login-button').click();

    // Check the errorMessage 
    const errorMessage = page.locator('[data-test="error"]');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

});