import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';

test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);

    await page.goto('https://www.automationexercise.com/');
    await Login.clickConsent();
    await Login.clickLoginRegister();
})

test('successLogin', async ({ page }) => {
  const Login = new LoginPage(page);

  await Login.login('toto1@mailinator.com','qweqwe44');
  await expect(Login.getLoggedInText()).toBeVisible();
  await expect(Login.getLogoutLink()).toBeVisible();

});

test('failedLogin', async ({ page }) => {
  const Login = new LoginPage(page);

  await Login.login('faiididi@mailinator.com','qweqwe44');
  await expect(Login.getLoginErrorText()).toBeVisible();
});

test('logout', async ({page}) => {
  const Login = new LoginPage(page);

  await Login.login('toto1@mailinator.com','qweqwe44');
  await Login.clickLogout();
  await expect(Login.getLoginRegisterLink()).toBeVisible();
});
