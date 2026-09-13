import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

export class MenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get menuButton() {
    return this.page.getByRole('button', { name: /menu/i });
  }

  private get myProfileLink() {
    return this.page.getByRole('link', { name: /my profile/i });
  }

  async openMenu(): Promise<void> {
    await this.click(this.menuButton);
  }

  async goToMyProfile(): Promise<void> {
    await this.click(this.myProfileLink);
  }
}