import { test as base } from '@playwright/test';
import { CsvReader, LoginCredentials } from '../helpers/CsvReader';
import { ApiClient } from '../api/ApiClient'; 
import { ProfilePictureUpdateFeature } from '../features/test-feature';

type Fixtures = {
  credentials: LoginCredentials;
  apiClient: ApiClient;
  profileFeature: ProfilePictureUpdateFeature;
};

export const test = base.extend<Fixtures>({
  credentials: async ({}, use) => {
    const credentials = CsvReader.getLoginCredentials();
    await use(credentials);
  },

  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request);
    await use(client);
  },

  profileFeature: async ({ page }, use) => {
    const feature = new ProfilePictureUpdateFeature(page);
    await use(feature);
  },
});

export { expect } from '@playwright/test';