import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { ProductPage } from '../../pages/products';

test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);

    await page.goto('https://www.automationexercise.com/');
    await Login.clickConsent();
    await Login.clickLoginRegister();
    await Login.login('toto1@mailinator.com','qweqwe44');
})

test('successSearch', async ({ page }) => {
  const Products = new ProductPage(page);
  await Products.goToProducts();
    await Products.searchFunction('polo');
    await expect(Products.getSearchResult()).toBeVisible(); 
});

test('emptySearch', async ({ page }) => {
  const Products = new ProductPage(page);
  await Products.goToProducts();
    await Products.searchFunction('rqwerqwe');
    await expect(Products.getSearchResult()).not.toBeVisible(); 
});