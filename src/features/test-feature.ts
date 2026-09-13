import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';
import { ProfilePage } from '../pages/ProfilePage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { LoginCredentials } from '../helpers/CsvReader';

export class ProfilePictureUpdateFeature {
  private readonly loginPage: LoginPage;
  private readonly menuPage: MenuPage;
  private readonly profilePage: ProfilePage;
  private readonly editProfilePage: EditProfilePage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.menuPage = new MenuPage(page);
    this.profilePage = new ProfilePage(page);
    this.editProfilePage = new EditProfilePage(page);
  }

  async loginToSite(credentials: LoginCredentials): Promise<void> {
    await this.loginPage.open();
    await this.loginPage.login(credentials.username, credentials.password);
  }

  async navigateToEditProfile(): Promise<void> {
    await this.menuPage.openMenu();
    await this.menuPage.goToMyProfile();
    await this.profilePage.clickEditProfile();
  }

  async updateProfilePicture(filePath: string): Promise<void> {
    await this.editProfilePage.uploadProfilePicture(filePath);
    await this.editProfilePage.saveChanges();
  }

  async getUpdatedProfilePictureSrc(): Promise<string | null> {
    return this.profilePage.getProfilePictureSrc();
  }

  async run(credentials: LoginCredentials, newPicturePath: string): Promise<string | null> {
    await this.loginToSite(credentials);
    await this.navigateToEditProfile();
    await this.updateProfilePicture(newPicturePath);
    return this.getUpdatedProfilePictureSrc();
  }
}