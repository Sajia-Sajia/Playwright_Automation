const {test, expect} = require('@playwright/test');

test('Remove item from cart', async({page}) => {

    await page.goto('https://www.saucedemo.com/');
    await page.pause();

    // Login Successuful with valid credentials
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/);

    // Add item "Sauce Labs Bike Light" to cart
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

    // Go to cart 
    await page.locator("#shopping_cart_container").click();

    // Check that this item is added to cart successuful
    const item0 = page.locator('#item_0_title_link');

    await expect(item0).toBeVisible();
    await expect(item0).toHaveText('Sauce Labs Bike Light');

    // Return back to shopping list
    await page.locator('#continue-shopping').click();

    // Remove item "Sauce Labs Bike Light" form cart
    await page.locator('#remove-sauce-labs-bike-light').click();

    // Go to cart
    await page.locator('#shopping_cart_container').click();

    // Check that this item is removed from cart
    const item0_removed = page.locator('#item_0_title_link');

    await expect(item0_removed).not.toBeVisible();
    await expect(page.locator('#item_0_title_link')).toHaveCount(0);

});