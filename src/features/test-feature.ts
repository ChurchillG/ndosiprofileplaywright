import { Page } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { ProfilePage } from '../pages/ProfilePage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { LoginCredentials } from '../helpers/CsvReader';

/**
 * Orchestrates the full end-to-end business flow, matching the exact
 * manual steps:
 *   1. Launch browser, go to the site
 *   2. Click the landing page's login button -> redirects to login form
 *   3. Enter username + password, click login
 *   4. Click menu -> dropdown appears
 *   5. Click My Profile
 *   6. Click Edit Profile
 *   7. Choose a new photo (set file on the underlying input)
 *   8. Click Save Changes
 *   9. Verify the profile picture actually changed
 */
export class ProfilePictureUpdateFeature {
  private readonly landingPage: LandingPage;
  private readonly loginPage: LoginPage;
  private readonly menuPage: MenuPage;
  private readonly profilePage: ProfilePage;
  private readonly editProfilePage: EditProfilePage;

  constructor(page: Page) {
    this.landingPage = new LandingPage(page);
    this.loginPage = new LoginPage(page);
    this.menuPage = new MenuPage(page);
    this.profilePage = new ProfilePage(page);
    this.editProfilePage = new EditProfilePage(page);
  }

  async loginToSite(credentials: LoginCredentials): Promise<void> {
    await this.landingPage.open();
    await this.landingPage.clickLoginButton();
    await this.loginPage.login(credentials.username, credentials.password);
  }

  async navigateToEditProfile(): Promise<void> {
    await this.menuPage.openMenu();
    await this.menuPage.clickMyProfile();
    await this.profilePage.clickEditProfile();
  }

  async updateProfilePicture(filePath: string): Promise<void> {
    await this.editProfilePage.uploadProfilePicture(filePath);
    await this.editProfilePage.clickSaveChanges();
  }

  async getUpdatedProfilePictureSrc(): Promise<string | null> {
    return this.profilePage.getProfilePictureSrc();
  }

  /**
   * Runs the entire flow end to end and returns the resulting profile
   * picture src, so the spec file can assert on it directly.
   */
  async run(credentials: LoginCredentials, newPicturePath: string): Promise<string | null> {
    await this.loginToSite(credentials);
    await this.navigateToEditProfile();
    await this.updateProfilePicture(newPicturePath);
    return this.getUpdatedProfilePictureSrc();
  }
}