import { Logger } from './Logger';

/**
 * =============================================================
 *  ACTION-LEVEL RETRY MECHANISM
 * =============================================================
 * Wraps any async action and retries it with exponential backoff.
 * This complements Playwright's test-level `retries` config:
 *   - Test level  : whole spec re-runs on failure (playwright.config.ts)
 *   - Action level: individual click/fill retried on transient errors
 */

export interface RetryOptions {
  /** Max attempts including the first one (default 3) */
  attempts?: number;
  /** Initial delay between attempts in ms (default 500, doubles each retry) */
  delayMs?: number;
  /** Label used in logs */
  label?: string;
}

export class RetryHelper {
  static async retry<T>(action: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
    const attempts = options.attempts ?? 3;
    const label = options.label ?? 'action';
    let delay = options.delayMs ?? 500;
    let lastError: unknown;

    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        return await action();
      } catch (error) {
        lastError = error;
        Logger.warn(
          `[RETRY] '${label}' failed on attempt ${attempt}/${attempts}: ${(error as Error).message}`
        );
        if (attempt < attempts) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // exponential backoff
        }
      }
    }

    Logger.error(`[RETRY] '${label}' exhausted all ${attempts} attempts.`);
    throw lastError;
  }
}
