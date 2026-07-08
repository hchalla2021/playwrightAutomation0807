/**
 * Lightweight timestamped console logger.
 * Keeps framework dependency-free; swap with winston/pino if needed.
 */
export class Logger {
  private static timestamp(): string {
    return new Date().toISOString();
  }

  static info(message: string): void {
    console.log(`[INFO]  ${this.timestamp()}  ${message}`);
  }

  static warn(message: string): void {
    console.warn(`[WARN]  ${this.timestamp()}  ${message}`);
  }

  static error(message: string): void {
    console.error(`[ERROR] ${this.timestamp()}  ${message}`);
  }

  static step(message: string): void {
    console.log(`[STEP]  ${this.timestamp()}  ${message}`);
  }
}
