import fs from 'fs';
import path from 'path';
import { test, expect } from '../../src/fixtures/test-base';
import { ENDPOINTS } from '../../src/api/endpoints';
import { step } from '../../src/utils/allure-helpers';
import { CsvReader } from '../../src/helpers/CsvReader';
import { ApiClient } from '../../src/api/ApiClient';

/**
 * Validates the real endpoints discovered while running the UI flow.
 *
 * Logs in ONCE for the whole file (test.beforeAll) and reuses the same
 * token across every test. The dedicated "login" test asserts on that
 * same beforeAll response rather than logging in again — the site
 * appears to enforce a single active session per user, so a second
 * login call invalidates the first token, breaking every test after it.
 */
test.describe('Profile endpoints - status code validation', () => {
  let sharedToken: string;
  let loginStatus: number;

  test.beforeAll(async ({ playwright }) => {
    const credentials = CsvReader.getLoginCredentials();
    const apiBase = process.env.API_BASE_URL ?? 'https://www.ndosiautomation.co.za/APIDEV/';

    const request = await playwright.request.newContext({ baseURL: apiBase });
    const loginClient = new ApiClient(request);

    const loginResponse = await loginClient.post(ENDPOINTS.login, {
      email: credentials.username,
      password: credentials.password,
    });

    loginStatus = loginResponse.status();
    const loginBody = await loginResponse.json();
    sharedToken = loginBody.data.token;

    await request.dispose();
  });

  test('login endpoint returns 200', async () => {
    // Asserts on the single login performed in beforeAll — does NOT
    // log in again, to avoid invalidating the shared session token
    // used by every other test in this file.
    expect(loginStatus).toBe(200);
  });

  test('get profile endpoint returns 200 when authenticated', async ({ apiClient }) => {
    apiClient.setAuthToken(sharedToken);

    const response = await step('GET profile endpoint', async () => apiClient.get(ENDPOINTS.getProfile));

    expect(response.status()).toBe(200);
  });

  test('update profile endpoint returns 200', async ({ apiClient }) => {
    apiClient.setAuthToken(sharedToken);

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

  test('upload profile picture endpoint returns 200', async ({ apiClient }) => {
    apiClient.setAuthToken(sharedToken);

    const response = await step('POST upload profile picture endpoint', async () =>
      apiClient.postMultipart(ENDPOINTS.uploadProfilePicture, {
        profileImage: {
          name: 'download.jpeg',
          mimeType: 'image/jpeg',
          buffer: fs.readFileSync(path.resolve(__dirname, '../../test-data/download.jpeg')),
        },
      }),
    );

    console.log('Upload response status:', response.status());
    console.log('Upload response body:', await response.text());

    expect(response.status()).toBe(200);
  });
});