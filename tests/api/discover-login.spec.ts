import { test } from '@playwright/test';

test('diagnose login 405', async ({ request }) => {
  const response = await request.post('https://www.ndosiautomation.co.za/APIDEV/login', {
    data: {
      username: 'gilberttest@gmail.com',
      password: '@12345678',
    },
  });

  console.log('Status:', response.status());
  console.log('Allow header:', response.headers()['allow'] ?? '(none)');
  console.log('All headers:', response.headers());
  console.log('Body:', await response.text());
});