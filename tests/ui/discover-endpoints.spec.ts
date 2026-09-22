import path from 'path';
import { test } from '../../src/fixtures/test-base';

const NEW_PICTURE_PATH = path.resolve(__dirname, '../../test-data/MG_29_Churchill.jpg');

test('discover save/upload endpoint', async ({ page, credentials, profileFeature }) => {
  await profileFeature.loginToSite(credentials);
  await profileFeature.navigateToEditProfile();

  // Start waiting for any response whose URL contains "profile" BEFORE
  // triggering the upload+save, so we don't miss it even if it fires fast.
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('profile'),
    { timeout: 15_000 },
  );

  await profileFeature.updateProfilePicture(NEW_PICTURE_PATH);

  const response = await responsePromise;
  console.log('Save/upload response:', {
    method: response.request().method(),
    url: response.url(),
    status: response.status(),
  });
});