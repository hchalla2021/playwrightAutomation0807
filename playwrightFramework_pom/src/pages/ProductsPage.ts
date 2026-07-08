import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductsLocators as L, addToCartButtonFor, removeButtonFor } from '../locators/products.locators';

/**
 * PRODUCTS (INVENTORY) PAGE OBJECT
 */
export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isLoaded(): Promise<boolean> {
    return this.isVisible(L.inventoryList);
  }

  async getPageTitle(): Promise<string> {
    return this.getText(L.pageTitle);
  }

  async getProductCount(): Promise<number> {
    return this.getCount(L.inventoryItem);
  }

  async getAllProductNames(): Promise<string[]> {
    const selector = await this.matchedSelector(L.itemName);
    return this.page.locator(selector).allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const selector = await this.matchedSelector(L.itemPrice);
    const texts = await this.page.locator(selector).allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.click(addToCartButtonFor(productName));
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.click(removeButtonFor(productName));
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.selectOption(L.sortDropdown, value);
  }

  async getCartBadgeCount(): Promise<number> {
    if (!(await this.isVisible(L.cartBadge))) return 0;
    return parseInt(await this.getText(L.cartBadge), 10);
  }

  async goToCart(): Promise<void> {
    await this.click(L.cartLink);
  }

  async logout(): Promise<void> {
    await this.click(L.burgerMenu);
    await this.click(L.logoutLink);
  }
}
