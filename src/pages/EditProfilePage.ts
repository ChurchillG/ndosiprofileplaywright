import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

export class EditProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get fileInput() {
    return this.page.locator('input[type="file"]');
  }

  private get saveButton() {
    return this.page.getByRole('button', { name: /save|update/i });
  }

  async uploadProfilePicture(filePath: string): Promise<void> {
    await this.uploadFile(this.fileInput, filePath);
  }

  async saveChanges(): Promise<void> {
    await this.click(this.saveButton);
  }
}