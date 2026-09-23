import fs from 'fs';
import path from 'path';
import { test, expect } from '../../src/fixtures/test-base';
import { ENDPOINTS } from '../../src/api/endpoints';
import { step } from '../../src/utils/allure-helpers';

/**
 * Validates the real endpoints discovered while running the UI flow.
 * NOTE: the API expects the login field to be named "email", not
 * "username" — confirmed via a 401 MISSING_CREDENTIALS response when
 * the wrong field name was sent (the CSV column is still called
 * "username" for readability; we map it to "email" here).
 */
test.describe('Profile endpoints - status code validation', () => {
  test('login endpoint returns 200', async ({ apiClient, credentials }) => {
    const response = await step('POST login endpoint', async () =>
      apiClient.post(ENDPOINTS.login, {
        email: credentials.username,
        password: credentials.password,
      }),
    );

    expect(response.status()).toBe(200);
  });

  test('get profile endpoint returns 200 when authenticated', async ({ apiClient, credentials }) => {
    const loginResponse = await apiClient.post(ENDPOINTS.login, {
      email: credentials.username,
      password: credentials.password,
    });
    const loginBody = await loginResponse.json();
    apiClient.setAuthToken(loginBody.data.token);

    const response = await step('GET profile endpoint', async () => apiClient.get(ENDPOINTS.getProfile));

    expect(response.status()).toBe(200);
  });

  test('update profile endpoint returns 200', async ({ apiClient, credentials }) => {
    const loginResponse = await apiClient.post(ENDPOINTS.login, {
      email: credentials.username,
      password: credentials.password,
    });
    const loginBody = await loginResponse.json();
    apiClient.setAuthToken(loginBody.data.token);

    const response = await step('PUT update profile endpoint', async () =>
      apiClient.put(ENDPOINTS.updateProfile, {
        firstName: 'gilbert',
        lastName: 'test',
        phone: '',
        phoneNumber: '',
        linkedIn: '',
        linkedin: '',
        linkedInUrl: '',
        yearsOfExperience: '',
      }),
    );

    expect(response.status()).toBe(200);
  });

  test('upload profile picture endpoint returns 200', async ({ apiClient, credentials }) => {
    const loginResponse = await apiClient.post(ENDPOINTS.login, {
      email: credentials.username,
      password: credentials.password,
    });
    const loginBody = await loginResponse.json();
    apiClient.setAuthToken(loginBody.data.token);

    const response = await step('POST upload profile picture endpoint', async () =>
      apiClient.postMultipart(ENDPOINTS.uploadProfilePicture, {
        image: {
          name: 'download.jpeg',
          mimeType: 'image/jpeg',
          buffer: fs.readFileSync(path.resolve(__dirname, '../../test-data/download.jpeg')),
        },
      }),
    );

    expect(response.status()).toBe(200);
  });
});