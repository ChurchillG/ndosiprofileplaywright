import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

/**
 * Represents the actual login form (username, password, submit button)
 * that appears after clicking "Login" on the landing page.
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get usernameInput() {
    return this.page.locator('#login-email');
  }

  private get passwordInput() {
    return this.page.locator('#login-password');
  }

  private get loginButton() {
    return this.page.locator('#login-button');
  }

  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  /**
   * Convenience method combining the three steps above, for callers
   * that don't need to inspect each field individually.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}