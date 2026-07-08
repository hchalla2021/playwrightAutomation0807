import { test, expect } from '../src/fixtures/pageFixtures';
import productsData from '../test-data/products.data.json';

/**
 * PRODUCTS TEST SUITE
 * Uses the `loggedInProductsPage` fixture — login happens automatically.
 */
test.describe('Products page', () => {
  test('should display all products @smoke', async ({ loggedInProductsPage }) => {
    expect(await loggedInProductsPage.isLoaded()).toBeTruthy();
    expect(await loggedInProductsPage.getProductCount()).toBe(productsData.expectedProductCount);
  });

  test('should sort products by name Z to A @regression', async ({ loggedInProductsPage }) => {
    await loggedInProductsPage.sortBy('za');
    const names = await loggedInProductsPage.getAllProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high @regression', async ({
    loggedInProductsPage,
  }) => {
    await loggedInProductsPage.sortBy('lohi');
    const prices = await loggedInProductsPage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should add product to cart and update badge @smoke', async ({
    loggedInProductsPage,
  }) => {
    await loggedInProductsPage.addProductToCart(productsData.singleProduct);
    expect(await loggedInProductsPage.getCartBadgeCount()).toBe(1);
  });

  test('should remove product from cart and clear badge @regression', async ({
    loggedInProductsPage,
  }) => {
    await loggedInProductsPage.addProductToCart(productsData.singleProduct);
    await loggedInProductsPage.removeProductFromCart(productsData.singleProduct);
    expect(await loggedInProductsPage.getCartBadgeCount()).toBe(0);
  });
});
