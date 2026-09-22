import { test } from '../../src/fixtures/test-base';
import { attachNetworkLogger } from '../../src/utils/network-logger';

test('discover endpoints', async ({ page, credentials, profileFeature }) => {
  const logged = attachNetworkLogger(page);

  await profileFeature.run(credentials, 'test-data/MG_29_Churchill.jpg');

  console.log(JSON.stringify(logged, null, 2));
});