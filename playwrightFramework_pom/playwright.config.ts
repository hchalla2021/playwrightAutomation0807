import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Loads environment variables from env/.env.<ENV> file.
 * Run with:  ENV=qa npx playwright test   (defaults to 'qa')
 */
dotenv.config({ path: path.resolve(__dirname, `env/.env.${process.env.ENV || 'qa'}`) });

export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run */
  timeout: 60 * 1000,

  expect: {
    timeout: 10 * 1000,
  },

  /* Fail the build on CI if test.only is left in source */
  forbidOnly: !!process.env.CI,

  /* ---------- RETRY MECHANISM ----------
   * Failed tests are automatically retried.
   * 2 retries on CI, 1 locally. Combined with the
   * self-healing locator engine this gives 2 layers of resilience. */
  retries: process.env.CI ? 2 : 1,

  /* Parallel workers */
  workers: process.env.CI ? 2 : undefined,
  fullyParallel: true,

  /* ---------- REPORTING ---------- */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/json-report/results.json' }],
    ['junit', { outputFile: 'reports/junit-report/results.xml' }],
  ],

  outputDir: 'reports/test-artifacts',

  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

    /* Collect trace / screenshot / video ONLY on failure & retry — keeps runs fast */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,

    headless: true,
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
