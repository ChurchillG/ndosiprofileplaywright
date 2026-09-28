# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\discover-endpoints.spec.ts >> discover endpoints
- Location: tests\ui\discover-endpoints.spec.ts:4:5

# Error details

```
Error: locator.waitFor: Error: strict mode violation: locator('div[style*="profile-images"]') resolved to 2 elements:
    1) <div></div> aka locator('.profile-grid > div > div > div').first()
    2) <div></div> aka locator('div:nth-child(7) > div > div').first()

Call log:
  - waiting for locator('div[style*="profile-images"]') to be visible

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
        - button "🎯 My Learning ▼" [ref=e38] [cursor=pointer]:
          - generic [ref=e39]: 🎯
          - generic [ref=e40]: My Learning
          - generic [ref=e41]: ▼
      - button "Menu ▼" [ref=e44] [cursor=pointer]:
        - generic [ref=e46]: Menu
        - generic [ref=e47]: ▼
  - main [ref=e48]:
    - generic [ref=e49]:
      - heading "👤 My Profile" [level=2] [ref=e50]
      - generic [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e55]:
            - heading "gilbert test" [level=3] [ref=e56]
            - paragraph [ref=e57]: gilberttest@gmail.com
          - generic [ref=e58]:
            - generic [ref=e59]: First Name
            - generic [ref=e60]: gilbert
          - generic [ref=e61]:
            - generic [ref=e62]: Last Name
            - generic [ref=e63]: test
          - generic [ref=e64]:
            - generic [ref=e65]: Email
            - generic [ref=e66]: gilberttest@gmail.com
          - generic [ref=e67]:
            - heading "📞 Contact Details" [level=4] [ref=e68]
            - generic [ref=e69]:
              - generic [ref=e70]: Phone Number
              - generic [ref=e71]: Not provided
            - generic [ref=e72]:
              - generic [ref=e73]: GitHub Username
              - generic [ref=e74]: Not provided
            - generic [ref=e75]:
              - generic [ref=e76]: LinkedIn Profile
              - generic [ref=e77]: Not provided
          - generic [ref=e78]:
            - heading "🆘 Next of Kin" [level=4] [ref=e79]
            - generic [ref=e80]:
              - generic [ref=e81]: Phone Number
              - generic [ref=e82]: Not provided
          - generic [ref=e83]:
            - heading "🧪 Testing Experience" [level=4] [ref=e84]
            - generic [ref=e85]:
              - generic [ref=e86]: Years of Experience
              - generic [ref=e87]: Not specified
          - generic [ref=e88]:
            - heading "About Me" [level=4] [ref=e89]
            - generic [ref=e90]: Not provided
          - generic [ref=e91]:
            - button "✏️ Edit Profile" [ref=e92] [cursor=pointer]
            - button "🔒 Change Password" [ref=e93] [cursor=pointer]
        - generic [ref=e94]:
          - generic [ref=e95]:
            - heading "⭐ My Testimonials" [level=3] [ref=e96]
            - button "+ Add Review" [ref=e97] [cursor=pointer]
          - generic [ref=e98]:
            - paragraph [ref=e99]: You haven't submitted any testimonials yet.
            - paragraph [ref=e100]: Share your experience with others!
  - button "🧪 Test" [ref=e101] [cursor=pointer]
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
  15 |     await locator.waitFor({ state: 'visible' });
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
> 29 |     await locator.waitFor({ state: 'visible', timeout });
     |                   ^ Error: locator.waitFor: Error: strict mode violation: locator('div[style*="profile-images"]') resolved to 2 elements:
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