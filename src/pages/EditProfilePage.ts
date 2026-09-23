import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

/**
 * Represents the Edit Profile screen: choosing a new photo and saving
 * the change.
 *
 * KNOWN LIMITATION (documented after investigation): this site's file
 * input does not appear to update its internal application state when
 * a file is selected via Playwright automation — even using a real
 * click on the linked <label>, a genuine native filechooser event, and
 * manually dispatched input/change events. The "Save Changes" submit
 * always re-sends the previously stored picture path rather than the
 * newly selected file. This was confirmed not to be a timing, network,
 * or automation-locator issue (see README "Known Issues" section for
 * the full investigation). The interaction below still reflects the
 * correct, standard Playwright pattern for file uploads.
 */
export class EditProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get choosePhotoLabel() {
    return this.page.locator('label[for="profilePicture"]');
  }

  private get fileInput() {
    return this.page.locator('#profilePicture');
  }

  private get saveChangesButton() {
    return this.page.getByRole('button', { name: /save changes/i });
  }

  async uploadProfilePicture(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.click(this.choosePhotoLabel);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async clickSaveChanges(): Promise<void> {
    await this.click(this.saveChangesButton);
  }
}