import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

/**
 * Represents the menu button and its dropdown, which appears once
 * you're logged in.
 */
export class MenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get menuButton() {
    return this.page.getByRole('button', { name: /menu/i });
  }

  private get myProfileOption() {
    return this.page
      .getByRole('menuitem', { name: /my profile/i })
      .or(this.page.getByRole('link', { name: /my profile/i }));
  }

  async openMenu(): Promise<void> {
    await this.click(this.menuButton);
  }

  async clickMyProfile(): Promise<void> {
    await this.click(this.myProfileOption);
  }
}