import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage centralizes generic page interactions (navigation, waiting,
 * clicking, typing) so every Page Object can extend it instead of
 * repeating Playwright boilerplate.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/'): Promise<void> {
    // 'domcontentloaded' instead of the default 'load', so one slow
    // image/font/third-party request can't stall the whole navigation.
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async uploadFile(locator: Locator, filePath: string): Promise<void> {
    await locator.setInputFiles(filePath);
  }

  async waitForVisible(locator: Locator, timeout = 10_000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async getText(locator: Locator): Promise<string> {
    await this.waitForVisible(locator);
    return (await locator.textContent())?.trim() ?? '';
  }

  async currentUrl(): Promise<string> {
    return this.page.url();
  }
}