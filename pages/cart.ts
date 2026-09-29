import { Page, Locator } from '@playwright/test';

export class CartPage {
    private page: Page;

    private cart_button: Locator;
    private empty_cart: Locator;
    private first_product_name: Locator;
    private close_popup: Locator;
    private remove_item_button: Locator;
    


constructor(page: Page) {
        this.page = page;

        //general
        this.cart_button = page.getByRole('link', { name: ' Cart' });
        this.empty_cart = page.getByText('Cart is empty! Click here to');
        this.close_popup = page.locator('iframe[name="aswift_1"]').contentFrame().getByRole('button', { name: 'Close ad' });
        
        //cart content
        this.first_product_name = page.getByRole('heading', { name: 'Premium Polo T-Shirts' });
        this.remove_item_button = page.locator('.cart_quantity_delete');
    }

    goToCart() {
        return this.cart_button.click();
    }  

    emptyCart() {
        return this.empty_cart;
    }

    productInCart () {
        return this.first_product_name;
    }

    async deleteItem(): Promise<void> {    
        try {
            if (await this.remove_item_button.isVisible({ timeout: 1000 })) {
                await this.remove_item_button.click();
            }
        } catch {
            // Cart was already empty — continue the test
        }
    }
}