import path from 'path';
import { test, expect } from '../../src/fixtures/test-base';
import { step, attachScreenshot } from '../../src/utils/allure-helpers';
import { attachNetworkLogger } from '../../src/utils/network-logger';// ← ADD THIS IMPORT

const NEW_PICTURE_PATH = path.resolve(__dirname, '../../test-data/download.jpeg');

test.describe('Profile picture update', () => {
  test('user can log in, edit their profile, and upload a new picture', async ({
    page,
    credentials,
    profileFeature,
  }) => {
     const logged = attachNetworkLogger(page);// ← ADD THIS LINE (right at the start)

    await step('Log in to the Ndosi automation test site', async () => {
      await profileFeature.loginToSite(credentials);
    });

    await step('Navigate: menu -> my profile -> edit profile', async () => {
      await profileFeature.navigateToEditProfile();
    });

    await step('Capture profile picture before update', async () => {
      await attachScreenshot(page, 'Before update');
    });

    await step('Upload new profile picture and save', async () => {
      await profileFeature.updateProfilePicture(NEW_PICTURE_PATH);
    });

    const updatedSrc = await step('Verify profile picture was updated', async () => {
      await attachScreenshot(page, 'After update');
      return profileFeature.getUpdatedProfilePictureSrc();
    });

    expect(updatedSrc).toBeTruthy();

    console.log(JSON.stringify(logged, null, 2)); // ← ADD THIS LINE (right at the end)
  });
});