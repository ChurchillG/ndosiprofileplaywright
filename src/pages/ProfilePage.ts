import { Page } from '@playwright/test';
import { BasePage } from '../helpers/BasePage';

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get editProfileButton() {
    // Match on the words only. The button text also has an emoji, but
    // emoji in a regex can silently stop matching after a file re-save.
    return this.page.getByRole('button', { name: /edit profile/i });
  }

  private get profilePicture() {
    // The picture is a <div> with a CSS background-image (not an <img>).
    // It can appear twice on screen, so we take the first match.
    return this.page.locator('div[style*="profile-images"]').first();
  }

  async clickEditProfile(): Promise<void> {
    await this.click(this.editProfileButton);
  }

  async getProfilePictureSrc(): Promise<string | null> {
    await this.waitForVisible(this.profilePicture);
    const style = await this.profilePicture.getAttribute('style');
    if (!style) return null;

    const match = style.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : null;
  }
}