import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { CartPage } from '../../pages/cart';
import { ProductPage } from '../../pages/products';

test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);

    await page.goto('https://www.automationexercise.com/');
    await Login.clickConsent();
    await Login.clickLoginRegister();
    await Login.login('toto1@mailinator.com','qweqwe44');
})

test('emptyCart', async ({page}) => {
    const Cart = new CartPage(page);

     await Cart.goToCart();
     await expect(Cart.emptyCart()).toBeVisible();
})

test('addToCart', async ({page}) => {
    const Cart = new CartPage(page);
    const Products = new ProductPage(page);

    //search a product
    await Products.goToProducts();
    await Products.closePopup();
    await Products.searchFunction('polo');

    //add a product
    await Products.addProduct();
    await expect (Products.wellAddedMessage()).toBeVisible();
    await Products.viewCart();

    //check Cart
  //  await Cart.goToCart();
    await expect (Cart.productInCart()).toBeVisible(); 
})


test.afterEach(async ({ page }) => {
    const Cart = new CartPage(page);
    await Cart.deleteItem();
});

