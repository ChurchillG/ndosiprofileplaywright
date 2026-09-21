import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

/**
 * Represents the initial landing page of the Ndosi automation test
 * site — the page you see before you're on the actual login form.
 * It has its own "Login" button that navigates you to the login page.
 */
export class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: /🔑 Login/i});
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }
}