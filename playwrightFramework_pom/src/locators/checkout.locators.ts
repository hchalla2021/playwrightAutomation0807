import { HealableLocator } from '../core/SelfHealingEngine';

/**
 * CHECKOUT PAGES (step one, step two, complete) — locator repository
 */
export const CheckoutLocators: Record<string, HealableLocator> = {
  firstNameInput: {
    name: 'First name input',
    primary: '[data-test="firstName"]',
    fallbacks: ['#first-name', 'input[name="firstName"]', 'input[placeholder="First Name"]'],
  },
  lastNameInput: {
    name: 'Last name input',
    primary: '[data-test="lastName"]',
    fallbacks: ['#last-name', 'input[name="lastName"]', 'input[placeholder="Last Name"]'],
  },
  postalCodeInput: {
    name: 'Postal code input',
    primary: '[data-test="postalCode"]',
    fallbacks: ['#postal-code', 'input[name="postalCode"]', 'input[placeholder="Zip/Postal Code"]'],
  },
  continueButton: {
    name: 'Continue button',
    primary: '[data-test="continue"]',
    fallbacks: ['#continue', 'input[name="continue"]', '.submit-button'],
  },
  cancelButton: {
    name: 'Cancel button',
    primary: '[data-test="cancel"]',
    fallbacks: ['#cancel', 'button[name="cancel"]'],
  },
  finishButton: {
    name: 'Finish button',
    primary: '[data-test="finish"]',
    fallbacks: ['#finish', 'button[name="finish"]'],
  },
  summaryTotal: {
    name: 'Order total label',
    primary: '[data-test="total-label"]',
    fallbacks: ['.summary_total_label', '.summary_info .summary_total_label'],
  },
  completeHeader: {
    name: 'Order complete header',
    primary: '[data-test="complete-header"]',
    fallbacks: ['.complete-header', 'h2.complete-header'],
  },
  errorMessage: {
    name: 'Checkout error message',
    primary: '[data-test="error"]',
    fallbacks: ['h3[data-test="error"]', '.error-message-container'],
  },
  backHomeButton: {
    name: 'Back home button',
    primary: '[data-test="back-to-products"]',
    fallbacks: ['#back-to-products', 'button[name="back-to-products"]'],
  },
};
