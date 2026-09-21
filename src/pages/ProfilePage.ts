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
    return this.page.locator('[data-testid="profile-picture"], img.profile-picture');
  }

  async clickEditProfile(): Promise<void> {
    await this.click(this.editProfileButton);
  }

  async getProfilePictureSrc(): Promise<string | null> {
    await this.waitForVisible(this.profilePicture);
    return this.profilePicture.getAttribute('src');
  }
}