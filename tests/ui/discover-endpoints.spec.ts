import path from 'path';
import { test } from '../../src/fixtures/test-base';

const NEW_PICTURE_PATH = path.resolve(__dirname, '../../test-data/MG_29_Churchill.jpg');

test('discover save/upload endpoint', async ({ page, credentials, profileFeature }) => {
  await profileFeature.loginToSite(credentials);
  await profileFeature.navigateToEditProfile();

  // Log EVERY request from here on.
  page.on('request', (request) => {
    console.log('REQUEST:', request.method(), request.url(), '| content-type:', request.headers()['content-type'] ?? '(none)');
  });

  // Capture the picture URL before doing anything.
  const pictureBefore = await page.locator('div[style*="profile-images"]').first().getAttribute('style');
  console.log('Picture BEFORE:', pictureBefore?.match(/url\(["']?(.*?)["']?\)/)?.[1]);

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByText(/📷 Choose Photo/i).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(NEW_PICTURE_PATH);

  await page.waitForTimeout(1000);

  // Screenshot right after selection, before Save.
  await page.screenshot({ path: 'test-results/after-filechooser-select.png', fullPage: true });

  await page.getByRole('button', { name: /💾 Save Changes/i }).click();
  await page.waitForTimeout(2000);

  const pictureAfter = await page.locator('div[style*="profile-images"]').first().getAttribute('style');
  console.log('Picture AFTER save:', pictureAfter?.match(/url\(["']?(.*?)["']?\)/)?.[1]);
});