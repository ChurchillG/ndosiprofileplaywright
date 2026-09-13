import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get usernameInput() {
    return this.page.locator('input[name="username"]');
  }

  private get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: /log in|sign in/i });
  }

  async open(): Promise<void> {
    await this.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}