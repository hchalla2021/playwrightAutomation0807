import { test, expect } from '../src/fixtures/pageFixtures';
import loginData from '../test-data/login.data.json';

/**
 * LOGIN TEST SUITE
 * Test data is externalized in test-data/login.data.json
 */
test.describe('Login functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('should login successfully with valid credentials @smoke', async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    expect(await productsPage.isLoaded()).toBeTruthy();
    expect(await productsPage.getPageTitle()).toBe('Products');
  });

  test('should show error for locked out user @regression', async ({ loginPage }) => {
    await loginPage.login(loginData.lockedOutUser.username, loginData.lockedOutUser.password);
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toBe(loginData.lockedOutUser.expectedError);
  });

  test('should show error for invalid credentials @regression', async ({ loginPage }) => {
    await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
    expect(await loginPage.getErrorMessage()).toBe(loginData.invalidUser.expectedError);
  });

  test('should show error when username is empty @regression', async ({ loginPage }) => {
    await loginPage.login(loginData.emptyUsername.username, loginData.emptyUsername.password);
    expect(await loginPage.getErrorMessage()).toBe(loginData.emptyUsername.expectedError);
  });

  test('should show error when password is empty @regression', async ({ loginPage }) => {
    await loginPage.login(loginData.emptyPassword.username, loginData.emptyPassword.password);
    expect(await loginPage.getErrorMessage()).toBe(loginData.emptyPassword.expectedError);
  });

  test('should logout successfully @smoke', async ({ loginPage, productsPage }) => {
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    await productsPage.logout();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});
