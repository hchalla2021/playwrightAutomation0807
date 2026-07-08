import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutLocators as L } from '../locators/checkout.locators';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * CHECKOUT PAGE OBJECT — covers step one, overview and complete screens
 */
export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillCustomerInformation(info: CheckoutInfo): Promise<void> {
    await this.fill(L.firstNameInput, info.firstName);
    await this.fill(L.lastNameInput, info.lastName);
    await this.fill(L.postalCodeInput, info.postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.click(L.continueButton);
  }

  async getOrderTotalText(): Promise<string> {
    return this.getText(L.summaryTotal);
  }

  async finishOrder(): Promise<void> {
    await this.click(L.finishButton);
  }

  async getCompleteHeaderText(): Promise<string> {
    return this.getText(L.completeHeader);
  }

  async isOrderComplete(): Promise<boolean> {
    return this.isVisible(L.completeHeader);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(L.errorMessage);
  }

  async backToProducts(): Promise<void> {
    await this.click(L.backHomeButton);
  }
}
