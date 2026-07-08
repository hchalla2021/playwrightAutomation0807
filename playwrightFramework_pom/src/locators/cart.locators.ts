import { HealableLocator } from '../core/SelfHealingEngine';

/**
 * CART PAGE — locator repository
 */
//added1
export const CartLocators: Record<string, HealableLocator> = {
  pageTitle: {
    name: 'Cart page title',
    primary: '[data-test="title"]',
    fallbacks: ['.title', 'span.title'],
  },
  cartItem: {
    name: 'Cart item row',
    primary: '[data-test="inventory-item"]',
    fallbacks: ['.cart_item', '.cart_list .cart_item'],
  },
  cartItemName: {
    name: 'Cart item name',
    primary: '[data-test="inventory-item-name"]',
    fallbacks: ['.inventory_item_name', '.cart_item_label a div'],
  },
  checkoutButton: {
    name: 'Checkout button',
    primary: '[data-test="checkout"]',
    fallbacks: ['#checkout', 'button[name="checkout"]', '.checkout_button'],
  },
  continueShoppingButton: {
    name: 'Continue shopping button',
    primary: '[data-test="continue-shopping"]',
    fallbacks: ['#continue-shopping', 'button[name="continue-shopping"]'],
  },
};
