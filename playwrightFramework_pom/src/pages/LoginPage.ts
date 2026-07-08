import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginLocators as L } from '../locators/login.locators';

/**
 * LOGIN PAGE OBJECT
 * Contains business actions only — locators live in login.locators.ts
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigateTo('/');
    await this.waitForVisible(L.loginLogo);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(L.usernameInput, username);
    await this.fill(L.passwordInput, password);
    await this.click(L.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(L.errorMessage);
  }

  async isErrorDisplayed(): Promise<boolean> {
    return this.isVisible(L.errorMessage);
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return this.isVisible(L.loginButton);
  }
}
