import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get editProfileButton() {
    return this.page.getByRole('button', { name: /✏️ Edit Profile/i });
  }

  private get profilePicture() {
    // The profile picture renders as a <div> with a CSS
    // background-image (not an <img> tag), and has no id/class/alt.
    // It can appear twice on screen at once (e.g. a summary card plus
    // the edit section), so we take the first match — both point at
    // the same image URL regardless.
    return this.page.locator('div[style*="profile-images"]').first();
  }

  async clickEditProfile(): Promise<void> {
    await this.click(this.editProfileButton);
  }

  async getProfilePictureSrc(): Promise<string | null> {
    await this.waitForVisible(this.profilePicture);
    const style = await this.profilePicture.getAttribute('style');
    if (!style) return null;

    // Pull the URL out of: background: url("...") center center / cover...
    const match = style.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : null;
  }
}