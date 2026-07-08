import { Locator, Page, expect } from '@playwright/test';
import { HealableLocator, SelfHealingEngine } from '../core/SelfHealingEngine';
import { RetryHelper } from '../utils/RetryHelper';
import { Logger } from '../utils/Logger';

/**
 * =============================================================
 *  BASE PAGE — parent of every page object
 * =============================================================
 * All element interactions funnel through here so that EVERY
 * action automatically gets:
 *   1. Self-healing locator resolution
 *   2. Action-level retry with exponential backoff
 *   3. Step logging
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ---------------- Navigation ---------------- */

  async navigateTo(path: string = '/'): Promise<void> {
    Logger.step(`Navigate to '${path}'`);
    await RetryHelper.retry(() => this.page.goto(path, { waitUntil: 'domcontentloaded' }).then(() => {}), {
      label: `goto ${path}`,
    });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /* ---------------- Element resolution ---------------- */

  /** Resolve a healable locator into a live Playwright Locator. */
  protected async element(healable: HealableLocator): Promise<Locator> {
    return SelfHealingEngine.resolve(this.page, healable);
  }

  /* ---------------- Actions (self-healing + retry) ---------------- */

  protected async click(healable: HealableLocator): Promise<void> {
    Logger.step(`Click '${healable.name}'`);
    await RetryHelper.retry(
      async () => {
        const locator = await this.element(healable);
        await locator.click();
      },
      { label: `click ${healable.name}` }
    );
  }

  protected async fill(healable: HealableLocator, value: string): Promise<void> {
    Logger.step(`Fill '${healable.name}'`);
    await RetryHelper.retry(
      async () => {
        const locator = await this.element(healable);
        await locator.fill(value);
      },
      { label: `fill ${healable.name}` }
    );
  }

  protected async selectOption(healable: HealableLocator, value: string): Promise<void> {
    Logger.step(`Select '${value}' in '${healable.name}'`);
    await RetryHelper.retry(
      async () => {
        const locator = await this.element(healable);
        await locator.selectOption(value);
      },
      { label: `select ${healable.name}` }
    );
  }

  protected async getText(healable: HealableLocator): Promise<string> {
    const locator = await this.element(healable);
    return (await locator.textContent())?.trim() ?? '';
  }

  protected async isVisible(healable: HealableLocator): Promise<boolean> {
    try {
      const locator = await this.element(healable);
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  protected async waitForVisible(healable: HealableLocator, timeout = 10000): Promise<void> {
    const locator = await this.element(healable);
    await locator.waitFor({ state: 'visible', timeout });
  }

  protected async getCount(healable: HealableLocator): Promise<number> {
    const locator = await this.element(healable);
    // resolve() returns .first(); re-derive full set from the matched selector
    return this.page.locator(await this.matchedSelector(healable)).count();
  }

  /** Returns the first selector (primary or fallback) that currently matches. */
  protected async matchedSelector(healable: HealableLocator): Promise<string> {
    for (const selector of [healable.primary, ...healable.fallbacks]) {
      if ((await this.page.locator(selector).count()) > 0) return selector;
    }
    return healable.primary;
  }

  /* ---------------- Assertions ---------------- */

  protected async expectVisible(healable: HealableLocator): Promise<void> {
    const locator = await this.element(healable);
    await expect(locator).toBeVisible();
  }

  protected async expectText(healable: HealableLocator, text: string | RegExp): Promise<void> {
    const locator = await this.element(healable);
    await expect(locator).toHaveText(text);
  }
}
