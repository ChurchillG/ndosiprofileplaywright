import { Page } from '@playwright/test';
import { allure } from 'allure-playwright';

/**
 * Wraps a block of test logic in an Allure step, so the generated
 * report reads as a clear narrative (Login -> Navigate -> Upload ->
 * Verify) rather than a flat list of assertions.
 */
export async function step<T>(name: string, action: () => Promise<T>): Promise<T> {
  let result: T;
  await allure.step(name, async () => {
    result = await action();
  });
  return result!;
}

/**
 * Takes a screenshot and attaches it to the Allure report under the
 * given label. Use this for explicit "before" / "after" evidence
 * shots, in addition to Playwright's automatic failure screenshots.
 */
export async function attachScreenshot(page: Page, label: string): Promise<void> {
  const screenshot = await page.screenshot();
  await allure.attachment(label, screenshot, 'image/png');
}
