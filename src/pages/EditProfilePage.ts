import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

/**
 * Represents the Edit Profile screen: choosing a new photo and saving
 * the change.
 */
export class EditProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get choosePhotoButton() {
    return this.page.getByRole('button', { name: /choose photo|upload photo/i });
  }

  private get fileInput() {
    return this.page.locator('input[type="file"]');
  }

  private get saveChangesButton() {
    return this.page.getByRole('button', { name: /save changes/i });
  }

  /**
   * On a real browser, clicking "Choose Photo" opens the OS's native
   * file picker dialog. Playwright cannot see or interact with that
   * OS-level window — it only automates the browser page itself.
   *
   * The workaround (and the standard Playwright pattern for file
   * uploads) is: you don't actually need to click the visible button
   * at all. Underneath it, the page always has a real
   * <input type="file"> element — normally hidden with CSS and
   * triggered by that button. Playwright can set a file directly on
   * that hidden input via setInputFiles(), which achieves the exact
   * same end result (the file becomes "selected") without ever
   * opening a dialog.
   *
   * uploadProfilePicture() below does that directly. This method is
   * kept only if you want to assert the button is visible/clickable
   * as part of the flow.
   */
  async clickChoosePhoto(): Promise<void> {
    await this.waitForVisible(this.choosePhotoButton);
  }

  async uploadProfilePicture(filePath: string): Promise<void> {
    await this.uploadFile(this.fileInput, filePath);
  }

  async clickSaveChanges(): Promise<void> {
    await this.click(this.saveChangesButton);
  }
}