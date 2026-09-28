import path from 'path';
import { test, expect } from '../../src/fixtures/test-base';
import { step, attachScreenshot } from '../../src/utils/allure-helpers';

const NEW_PICTURE_PATH = path.resolve(__dirname, '../../test-data/download.jpeg');

test.describe('Profile picture update', () => {
  test('user can log in, edit their profile, and upload a new picture', async ({
    page,
    credentials,
    profileFeature,
  }) => {
    await step('Log in to the Ndosi automation test site', async () => {
      await profileFeature.loginToSite(credentials);
    });

    await step('Navigate: menu -> my profile -> edit profile', async () => {
      await profileFeature.navigateToEditProfile();
    });

    await step('Capture screen before update', async () => {
      await attachScreenshot(page, 'Before update');
    });

    // Start listening BEFORE saving so the upload response can't be missed.
    const uploadResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/profile/image') && response.request().method() === 'POST',
    );

    await step('Choose new profile picture and save changes', async () => {
      await profileFeature.updateProfilePicture(NEW_PICTURE_PATH);
    });

    const uploadResponse = await step('Wait for the picture upload to complete', async () => {
      return uploadResponsePromise;
    });

    await step('Capture screen after update', async () => {
      await page.waitForTimeout(2000);
      await attachScreenshot(page, 'After update');
    });

    expect(uploadResponse.status()).toBe(200);
  });
});