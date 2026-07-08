import { HealableLocator } from '../core/SelfHealingEngine';

/**
 * PRODUCTS (INVENTORY) PAGE — locator repository
 */
export const ProductsLocators: Record<string, HealableLocator> = {
  pageTitle: {
    name: 'Products page title',
    primary: '[data-test="title"]',
    fallbacks: ['.title', 'span.title', '.header_secondary_container .title'],
  },
  inventoryList: {
    name: 'Inventory list',
    primary: '[data-test="inventory-list"]',
    fallbacks: ['.inventory_list', '#inventory_container .inventory_list'],
  },
  inventoryItem: {
    name: 'Inventory item card',
    primary: '[data-test="inventory-item"]',
    fallbacks: ['.inventory_item', '.inventory_list > div'],
  },
  itemName: {
    name: 'Inventory item name',
    primary: '[data-test="inventory-item-name"]',
    fallbacks: ['.inventory_item_name', '.inventory_item_label a div'],
  },
  itemPrice: {
    name: 'Inventory item price',
    primary: '[data-test="inventory-item-price"]',
    fallbacks: ['.inventory_item_price', '.pricebar .inventory_item_price'],
  },
  sortDropdown: {
    name: 'Sort dropdown',
    primary: '[data-test="product-sort-container"]',
    fallbacks: ['.product_sort_container', 'select.product_sort_container'],
  },
  cartBadge: {
    name: 'Cart badge',
    primary: '[data-test="shopping-cart-badge"]',
    fallbacks: ['.shopping_cart_badge', '#shopping_cart_container .shopping_cart_badge'],
  },
  cartLink: {
    name: 'Cart link',
    primary: '[data-test="shopping-cart-link"]',
    fallbacks: ['.shopping_cart_link', '#shopping_cart_container a'],
  },
  burgerMenu: {
    name: 'Burger menu button',
    primary: '#react-burger-menu-btn',
    fallbacks: ['button#react-burger-menu-btn', '.bm-burger-button button'],
  },
  logoutLink: {
    name: 'Logout link',
    primary: '#logout_sidebar_link',
    fallbacks: ['[data-test="logout-sidebar-link"]', 'a#logout_sidebar_link', '.bm-item-list a:nth-child(3)'],
  },
};

/** Dynamic locator builder: Add-to-cart button per product */
export const addToCartButtonFor = (productName: string): HealableLocator => {
  const slug = productName.toLowerCase().replace(/ /g, '-');
  return {
    name: `Add to cart — ${productName}`,
    primary: `[data-test="add-to-cart-${slug}"]`,
    fallbacks: [`#add-to-cart-${slug}`, `button[name="add-to-cart-${slug}"]`],
  };
};

/** Dynamic locator builder: Remove button per product */
export const removeButtonFor = (productName: string): HealableLocator => {
  const slug = productName.toLowerCase().replace(/ /g, '-');
  return {
    name: `Remove — ${productName}`,
    primary: `[data-test="remove-${slug}"]`,
    fallbacks: [`#remove-${slug}`, `button[name="remove-${slug}"]`],
  };
};
