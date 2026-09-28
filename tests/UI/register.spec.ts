import { test, expect } from '@playwright/test';
import { randomEmail,randomPhone } from '../../fixtures/random.spec';
import { LoginPage } from '../../pages/login';

test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);

    await page.goto('https://www.automationexercise.com/');
    await Login.clickConsent();
    await Login.clickLoginRegister();
})

test('createUser', async ({ page }) => {
  const Login = new LoginPage(page);

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
  await expect(Login.getLoggedInText()).toBeVisible();
});

test('existingUser', async({page}) => {
    const Login = new LoginPage(page);

    await Login.register('toto', 'toto@mailinator.com');
    await expect(Login.getSignupErrorText()).toBeVisible();
});
