import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;

    private consent: Locator;
    private login_username_textbox: Locator;
    private login_password_textbox: Locator;
    private login_button: Locator;
    private register_username_textbox: Locator;
    private register_password_textbox: Locator;
    private register_button: Locator;
    private login_register: Locator;
    private logout_button: Locator;
    private logged_in_text: Locator;
    private login_error_text: Locator;
    private signup_error_text: Locator;
    private account_created_text: Locator;
    private continue_link: Locator;
    private mr_radio: Locator;
    private account_password: Locator;
    private days_dropdown: Locator;
    private months_dropdown: Locator;
    private years_dropdown: Locator;
    private first_name: Locator;
    private last_name: Locator;
    private address: Locator;
    private country_dropdown: Locator;
    private city: Locator;
    private state: Locator;
    private zipcode: Locator;
    private mobile_number: Locator;
    private create_account_button: Locator;
    

    constructor(page: Page) {
        this.page = page;

        //general
        this.consent = page.getByRole('button', { name: 'Consent' });        
        this.login_register = page.getByRole('link', { name: ' Signup / Login' });
        this.logout_button = page.getByRole('link', { name: ' Logout' });

        //login
        this.login_username_textbox = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.login_password_textbox = page.getByRole('textbox', { name: 'Password' });
        this.login_button = page.getByRole('button', { name: 'Login' });

        //register
        this.register_username_textbox = page.getByRole('textbox', { name: 'Name' });
        this.register_password_textbox = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.register_button = page.getByRole('button', { name: 'Signup' });

        //messages
        this.logged_in_text = page.getByText('Logged in as');
        this.login_error_text = page.getByText('Your email or password is');
        this.signup_error_text = page.getByText('Email Address already exist!');
        this.account_created_text = page.getByText('Account Created!');
        this.continue_link = page.getByRole('link', { name: 'Continue' });

        //account form
        this.mr_radio = page.getByRole('radio', { name: 'Mr.' });
        this.account_password = page.getByRole('textbox', { name: 'Password *' });
        this.days_dropdown = page.locator('#days');
        this.months_dropdown = page.locator('#months');
        this.years_dropdown = page.locator('#years');
        this.first_name = page.getByRole('textbox', { name: 'First name *' });
        this.last_name = page.getByRole('textbox', { name: 'Last name *' });
        this.address = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.country_dropdown = page.getByLabel('Country *');
        this.city = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.state = page.getByRole('textbox', { name: 'State *' });
        this.zipcode = page.locator('#zipcode');
        this.mobile_number = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.create_account_button = page.getByRole('button', { name: 'Create Account' });
    }

    async clickConsent(): Promise<void> {
        try {
            if (await this.consent.isVisible({ timeout: 1000 })) {
                await this.consent.click();
            }
        } catch {
            // Popup did not appear — continue the test
        }
    }
    
    async clickLoginRegister(): Promise<void> {
        await this.login_register.click();
    }

    async clickLogout(): Promise<void> {
        await this.logout_button.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.login_username_textbox.fill(username);
        await this.login_password_textbox.fill(password);
        await this.login_button.click();
    }

    async register(username: string, password: string): Promise<void> {
        await this.register_username_textbox.fill(username);
        await this.register_password_textbox.fill(password);
        await this.register_button.click();
    }

    async fillAccountForm(
        firstName: string,
        lastName: string,
        address: string,
        country: string,
        city: string,
        state: string,
        zipcode: string,
        mobile: string,
        password: string,
        day: string,
        month: string,
        year: string
    ): Promise<void> {
        await this.mr_radio.check();
        await this.account_password.fill(password);
        await this.days_dropdown.selectOption(day);
        await this.months_dropdown.selectOption(month);
        await this.years_dropdown.selectOption(year);
        await this.first_name.fill(firstName);
        await this.last_name.fill(lastName);
        await this.address.fill(address);
        await this.country_dropdown.selectOption(country);
        await this.city.fill(city);
        await this.state.fill(state);
        await this.zipcode.fill(zipcode);
        await this.mobile_number.fill(mobile);
    }

    async clickCreateAccount(): Promise<void> {
        await this.create_account_button.click();
    }

    async clickContinue(): Promise<void> {
        await this.continue_link.click();
    }

    getLoggedInText() {
        return this.logged_in_text;
    }

    getLoginErrorText() {
        return this.login_error_text;
    }

    getSignupErrorText() {
        return this.signup_error_text;
    }

    getAccountCreatedText() {
        return this.account_created_text;
    }

    getLogoutLink() {
        return this.logout_button;
    }

    getLoginRegisterLink() {
        return this.login_register;
    }

    async closePopup(): Promise<void> {
        const iframes = this.page.locator('iframe');

        for (let i = 0; i < await iframes.count(); i++) {
            const frame = iframes.nth(i).contentFrame();
    
            const closeButton = frame.getByRole('button', { name: 'Close ad' });
    
            if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
                await closeButton.click();
                return;
            }
        }
    }
}
