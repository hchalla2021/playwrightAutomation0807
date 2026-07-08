import { test, expect } from '../src/fixtures/pageFixtures';
import productsData from '../test-data/products.data.json';

/**
 * CART TEST SUITE
 */
test.describe('Cart page', () => {
  test('should show added products in the cart @smoke', async ({
    loggedInProductsPage,
    cartPage,
  }) => {
    for (const product of productsData.productsToBuy) {
      await loggedInProductsPage.addProductToCart(product);
    }
    await loggedInProductsPage.goToCart();

    expect(await cartPage.isLoaded()).toBeTruthy();
    expect(await cartPage.getCartItemCount()).toBe(productsData.productsToBuy.length);
    expect(await cartPage.getCartItemNames()).toEqual(productsData.productsToBuy);
  });

  test('should return to products via continue shopping @regression', async ({
    loggedInProductsPage,
    cartPage,
  }) => {
    await loggedInProductsPage.goToCart();
    await cartPage.continueShopping();
    expect(await loggedInProductsPage.isLoaded()).toBeTruthy();
  });
});
