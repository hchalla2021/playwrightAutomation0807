import { HealableLocator } from '../core/SelfHealingEngine';

/**
 * LOGIN PAGE — locator repository
 * Each locator carries a primary selector + self-healing fallbacks.
 * Keep the most stable selector (data-test / id) as primary.
 */
export const LoginLocators: Record<string, HealableLocator> = {
  usernameInput: {
    name: 'Username input',
    primary: '[data-test="username"]',
    fallbacks: ['#user-name', 'input[name="user-name"]', 'input[placeholder="Username"]'],
  },
  passwordInput: {
    name: 'Password input',
    primary: '[data-test="password"]',
    fallbacks: ['#password', 'input[name="password"]', 'input[placeholder="Password"]'],
  },
  loginButton: {
    name: 'Login button',
    primary: '[data-test="login-button"]',
    fallbacks: ['#login-button', 'input[type="submit"]', 'input[value="Login"]'],
  },
  errorMessage: {
    name: 'Login error message',
    primary: '[data-test="error"]',
    fallbacks: ['h3[data-test="error"]', '.error-message-container h3', '.error-message-container'],
  },
  loginLogo: {
    name: 'Login logo',
    primary: '.login_logo',
    fallbacks: ['div.login_logo', '#root .login_logo'],
  },
};
