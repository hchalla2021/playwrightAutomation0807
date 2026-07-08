import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

/**
 * =============================================================
 *  CUSTOM FIXTURES
 * =============================================================
 * Page objects are injected into tests automatically — no manual
 * `new LoginPage(page)` boilerplate inside specs.
 *
 *   test('example', async ({ loginPage, productsPage }) => { ... })
 *
 * `loggedInProductsPage` performs login before the test starts,
 * useful for specs that don't need to test the login itself.
 */

type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedInProductsPage: ProductsPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  /** Pre-authenticated fixture: lands on Products page already logged in. */
  loggedInProductsPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(
      process.env.STANDARD_USER || 'standard_user',
      process.env.PASSWORD || 'secret_sauce'
    );
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});

export { expect } from '@playwright/test';
