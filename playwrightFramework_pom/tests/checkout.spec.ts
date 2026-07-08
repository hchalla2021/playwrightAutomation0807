import { test, expect } from '../src/fixtures/pageFixtures';
import productsData from '../test-data/products.data.json';
import checkoutData from '../test-data/checkout.data.json';

/**
 * END-TO-END CHECKOUT TEST SUITE
 */
test.describe('Checkout flow', () => {
  test('should complete an order end-to-end @smoke @e2e', async ({
    loggedInProductsPage,
    cartPage,
    checkoutPage,
  }) => {
    // Add products
    for (const product of productsData.productsToBuy) {
      await loggedInProductsPage.addProductToCart(product);
    }

    // Go to cart & checkout
    await loggedInProductsPage.goToCart();
    await cartPage.proceedToCheckout();

    // Fill customer info
    await checkoutPage.fillCustomerInformation(checkoutData.validCustomer);
    await checkoutPage.continueToOverview();

    // Verify total present, then finish
    expect(await checkoutPage.getOrderTotalText()).toContain('Total');
    await checkoutPage.finishOrder();

    // Verify completion
    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
    expect(await checkoutPage.getCompleteHeaderText()).toBe(
      checkoutData.expectedCompleteMessage
    );
  });

  test('should show error when first name is missing @regression', async ({
    loggedInProductsPage,
    cartPage,
    checkoutPage,
  }) => {
    await loggedInProductsPage.addProductToCart(productsData.singleProduct);
    await loggedInProductsPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInformation(checkoutData.missingFirstName);
    await checkoutPage.continueToOverview();

    expect(await checkoutPage.getErrorMessage()).toBe(
      checkoutData.missingFirstName.expectedError
    );
  });
});
