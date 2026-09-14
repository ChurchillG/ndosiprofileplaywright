import { test, expect } from '../../src/fixtures/test-base';
import { ENDPOINTS } from '../../src/api/endpoints';
import { step } from '../../src/utils/allure-helpers';

test.describe('Profile endpoints - status code validation', () => {
  test('login endpoint returns 200', async ({ apiClient, credentials }) => {
    const response = await step('POST login endpoint', async () =>
      apiClient.post(ENDPOINTS.login, {
        username: credentials.username,
        password: credentials.password,
      }),
    );

    expect(response.status()).toBe(200);
  });
  // ... two more tests, following the same pattern:
  // 1. log in via API to get a token
  // 2. call apiClient.setAuthToken(token)
  // 3. hit the protected endpoint
  // 4. assert on response.status()
});