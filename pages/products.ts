import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private page: Page;

    private product_button: Locator;
    private search_fields: Locator;
    private search_button: Locator;
    private search_result: Locator;


    constructor(page: Page) {
        this.page = page;

        //general
        this.product_button = page.getByRole('link', { name: ' Products' });
        this.search_fields = page.getByRole('textbox', { name: 'Search Product' });
        this.search_button = page.locator('#submit_search');
        this.search_result = page.getByRole('link', { name: ' View Product' });
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
}
