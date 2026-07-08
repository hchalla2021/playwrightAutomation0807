import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartLocators as L } from '../locators/cart.locators';

/**
 * CART PAGE OBJECT
 */
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(L.checkoutButton);
  }

  async getCartItemNames(): Promise<string[]> {
    const selector = await this.matchedSelector(L.cartItemName);
    return this.page.locator(selector).allTextContents();
  }

  async getCartItemCount(): Promise<number> {
    return this.getCount(L.cartItem);
  }

  async proceedToCheckout(): Promise<void> {
    await this.click(L.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.click(L.continueShoppingButton);
  }
}
