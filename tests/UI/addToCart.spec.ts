import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { CartPage } from '../../pages/cart';
import { ProductPage } from '../../pages/products';
import { randomEmail,randomPhone } from '../../fixtures/random.spec';

test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);  
    
    //Login
    await page.goto('https://www.automationexercise.com/');
    await Login.clickConsent();
    await Login.clickLoginRegister();
    await Login.register('toto1', randomEmail());
    await Login.fillAccountForm(
    'toto',
    'lolo',
    '6 baker street',
    'New Zealand',
    'wellington',
    'new south wales',
    '1000',
    randomPhone(),
    'qweqwe44',
    '6',
    '6',
    '2012'
  );
  await Login.clickCreateAccount();
  await expect(Login.getAccountCreatedText()).toBeVisible();
  await Login.clickContinue();
  await Login.closePopup();
  
    //await Login.login('toto1@mailinator.com','qweqwe44');
});


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
    await expect (Cart.productInCart()).toBeVisible(); 
})

test('addSeveralToCart', async ({page}) => {
    const Cart = new CartPage(page);
    const Products = new ProductPage(page);
    const quantity = 4;

    //search a product
    await Products.goToProducts();
    await Products.closePopup();
    await Products.searchFunction('dress');
    await Products.viewProduct();

    //add a product
    await Products.typeQuantity(quantity);
    await Products.addProductFromDetails();
    await expect (Products.wellAddedMessage()).toBeVisible();
    await Products.viewCart();

    //check Cart
    await expect (Cart.productInCart()).toBeVisible(); 
    await expect(page.getByRole('button', { name: String(quantity) })).toBeVisible();    
})


