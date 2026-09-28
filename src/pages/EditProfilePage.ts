import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

/**
 * Represents the Edit Profile screen: choosing a new photo and saving
 * the change.
 *
 * The site compresses the chosen image client-side ("compressed below
 * 3MB before upload") and only then registers it in the app's state.
 * Clicking Save before that finishes submits without the new picture,
 * so we pause briefly after selecting the file.
 */
export class EditProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get choosePhotoLabel() {
    return this.page.locator('label[for="profilePicture"]');
  }

  private get saveChangesButton() {
    return this.page.getByRole('button', { name: /save changes/i });
  }

  async uploadProfilePicture(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.click(this.choosePhotoLabel);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);

    // Give the client-side compression time to finish before saving.
    await this.page.waitForTimeout(3000);
  }

  async clickSaveChanges(): Promise<void> {
    await this.click(this.saveChangesButton);
  }
}