import { Page } from '@playwright/test';

export interface LoggedRequest {
  method: string;
  url: string;
  status: number;
}

export function attachNetworkLogger(page: Page): LoggedRequest[] {
  const logged: LoggedRequest[] = [];

  page.on('response', (response) => {
    const request = response.request();
    if (['xhr', 'fetch'].includes(request.resourceType())) {
      logged.push({
        method: request.method(),
        url: response.url(),
        status: response.status(),
      });
    }
  });

  return logged;
}