import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private page: Page;

    private product_button: Locator;
    private search_fields: Locator;
    private search_button: Locator;
    private search_result: Locator;
    private close_popup_button: Locator;
    private add_to_cart_button: Locator;
    private continue_shopping_button: Locator;
    private well_added_text: Locator;
    private view_cart_button: Locator;

    
    constructor(page: Page) {
        this.page = page;

        //general
        this.product_button = page.getByRole('link', { name: ' Products' });
        this.search_fields = page.getByRole('textbox', { name: 'Search Product' });
        this.search_button = page.locator('#submit_search');
        this.search_result = page.getByRole('link', { name: ' View Product' });
        this.close_popup_button = page.locator('iframe[name="aswift_3"]').contentFrame().getByRole('button', { name: 'Close ad' });

        //add to cart
        this.add_to_cart_button = page.getByText('Add to cart').first();
        this.well_added_text = page.getByText('Your product has been added');
        this.view_cart_button = page.getByRole('link', { name: 'View Cart' });
        this.continue_shopping_button = page.getByRole('button', { name: 'Continue Shopping' })
    }

    async searchFunction (searchProduct: string): Promise<void> {
        await this.search_fields.fill(searchProduct);
        await this.search_button.click();        
    }

    getSearchResult() {
        return this.search_result;
    }  

    goToProducts () {
        return this.product_button.click();
    }
    async closePopup(): Promise<void> {
        try {
            if (await this.close_popup_button.isVisible({ timeout: 1000 })) {
                await this.close_popup_button.click();
            }
        } catch {
            // Popup did not appear — continue the test
        }
    }

    addProduct () {
        return this.add_to_cart_button.click();
    }

    wellAddedMessage () {
        return this.well_added_text;
    }

    continueShopping () {
        return this.continue_shopping_button.click();
    }

    viewCart () {
        return this.view_cart_button.click();
    }
}    