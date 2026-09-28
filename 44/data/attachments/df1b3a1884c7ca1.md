# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\discover-endpoints.spec.ts >> discover endpoints
- Location: tests\ui\discover-endpoints.spec.ts:4:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /loginSubmit/i }) to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - img "NTA Logo" [ref=e7] [cursor=pointer]
      - generic [ref=e8]:
        - button "🏠 Home" [ref=e9] [cursor=pointer]:
          - generic [ref=e10]: 🏠
          - generic [ref=e11]: Home
        - button "📖 About Us" [ref=e12] [cursor=pointer]:
          - generic [ref=e13]: 📖
          - generic [ref=e14]: About Us
        - button "⭐ Testimonials" [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: ⭐
          - generic [ref=e17]: Testimonials
        - button "👨‍🏫 Mentors" [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: 👨‍🏫
          - generic [ref=e20]: Mentors
        - button "🎓 Graduates" [ref=e21] [cursor=pointer]:
          - generic [ref=e22]: 🎓
          - generic [ref=e23]: Graduates
        - button "📞 Contact Us" [ref=e24] [cursor=pointer]:
          - generic [ref=e25]: 📞
          - generic [ref=e26]: Contact Us
        - button "📚 Learn ▼" [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: 📚
          - generic [ref=e30]: Learn
          - generic [ref=e31]: ▼
        - button "🔗 Connect ▼" [ref=e33] [cursor=pointer]:
          - generic [ref=e34]: 🔗
          - generic [ref=e35]: Connect
          - generic [ref=e36]: ▼
  - main [ref=e37]:
    - generic [ref=e39]:
      - generic [ref=e40]: 🔒
      - heading "Login to Access Learning Materials" [level=2] [ref=e42]
      - textbox "Email" [ref=e43]: gilberttest@gmail.com
      - generic [ref=e44]:
        - textbox "Password" [active] [ref=e45]: "@12345678"
        - button "Show password" [ref=e46] [cursor=pointer]
      - button "Login" [ref=e50] [cursor=pointer]
      - button "Forgot Password?" [ref=e52] [cursor=pointer]
      - generic [ref=e53]:
        - text: Don't have an account?
        - button "Sign Up Here" [ref=e54] [cursor=pointer]
  - button "🧪 Test" [ref=e55] [cursor=pointer]
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | 
  3  | export class BasePage {
  4  |   readonly page: Page;
  5  | 
  6  |   constructor(page: Page) {
  7  |     this.page = page;
  8  |   }
  9  | 
  10 |   async goto(path: string = '/'): Promise<void> {
  11 |     await this.page.goto(path);
  12 |   }
  13 | 
  14 |   async click(locator: Locator): Promise<void> {
> 15 |     await locator.waitFor({ state: 'visible' });
     |                   ^ Error: locator.waitFor: Test timeout of 60000ms exceeded.
  16 |     await locator.click();
  17 |   }
  18 | 
  19 |   async fill(locator: Locator, value: string): Promise<void> {
  20 |     await locator.waitFor({ state: 'visible' });
  21 |     await locator.fill(value);
  22 |   }
  23 | 
  24 |   async uploadFile(locator: Locator, filePath: string): Promise<void> {
  25 |     await locator.setInputFiles(filePath);
  26 |   }
  27 | 
  28 |   async waitForVisible(locator: Locator, timeout = 10_000): Promise<void> {
  29 |     await locator.waitFor({ state: 'visible', timeout });
  30 |   }
  31 | 
  32 |   async expectVisible(locator: Locator): Promise<void> {
  33 |     await expect(locator).toBeVisible();
  34 |   }
  35 | 
  36 |   async getText(locator: Locator): Promise<string> {
  37 |     await this.waitForVisible(locator);
  38 |     return (await locator.textContent())?.trim() ?? '';
  39 |   }
  40 | 
  41 |   async currentUrl(): Promise<string> {
  42 |     return this.page.url();
  43 |   }
  44 | }
```