import { Locator, Page } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * =============================================================
 *  SELF-HEALING LOCATOR ENGINE
 * =============================================================
 * Every element is described by a PRIMARY selector plus an ordered
 * list of FALLBACK selectors. When the primary selector fails to
 * resolve (DOM changed, id renamed, etc.) the engine automatically
 * "heals" by walking through the fallbacks until one matches, and
 * logs which selector healed the element so the team can update
 * the primary selector later.
 */

export interface HealableLocator {
  /** Human readable element name — used in logs & reports */
  name: string;
  /** Preferred selector (most stable one you know) */
  primary: string;
  /** Ordered fallback selectors, tried top-to-bottom when primary fails */
  fallbacks: string[];
}

export class SelfHealingEngine {
  private static readonly HEAL_TIMEOUT = 3000;

  /**
   * Resolves a HealableLocator into a live Playwright Locator.
   * 1. Try the primary selector.
   * 2. If not present, iterate fallbacks until one is attached.
   * 3. Log the healing event (selector drift report).
   * 4. Throw a descriptive error when nothing matches.
   */
  static async resolve(page: Page, healable: HealableLocator): Promise<Locator> {
    const candidates = [healable.primary, ...healable.fallbacks];

    for (let i = 0; i < candidates.length; i++) {
      const selector = candidates[i];
      const locator = page.locator(selector).first();

      if (await this.exists(locator)) {
        if (i > 0) {
          Logger.warn(
            `[SELF-HEAL] '${healable.name}' primary selector '${healable.primary}' failed. ` +
              `Healed using fallback #${i}: '${selector}'. Consider updating the locator repository.`
          );
        }
        return locator;
      }
    }

    throw new Error(
      `[SELF-HEAL] Unable to locate '${healable.name}'. Tried ${candidates.length} selectors:\n` +
        candidates.map((s, i) => `  ${i === 0 ? 'primary ' : `fallback`} -> ${s}`).join('\n')
    );
  }

  /** Checks whether a locator resolves to an attached element within the heal timeout. */
  private static async exists(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'attached', timeout: this.HEAL_TIMEOUT });
      return true;
    } catch {
      return false;
    }
  }
}
