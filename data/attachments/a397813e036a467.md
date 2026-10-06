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
  - waiting for getByRole('menuitem', { name: /My Profile/i }).or(getByRole('link', { name: /My Profile/i })) to be visible

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
      - generic [ref=e43]:
        - button "Menu ▼" [active] [ref=e44] [cursor=pointer]:
          - generic [ref=e46]: Menu
          - generic [ref=e47]: ▼
        - generic [ref=e48]:
          - button "👤 My Profile" [ref=e49] [cursor=pointer]:
            - generic [ref=e50]: 👤
            - generic [ref=e51]: My Profile
          - button "✍️ Write Review" [ref=e52] [cursor=pointer]:
            - generic [ref=e53]: ✍️
            - generic [ref=e54]: Write Review
          - button "🚪 Logout" [ref=e56] [cursor=pointer]:
            - generic [ref=e57]: 🚪
            - generic [ref=e58]: Logout
  - main [ref=e59]:
    - generic [ref=e60]:
      - generic [ref=e61]:
        - generic [ref=e62]:
          - heading "Welcome back, gilbert 👋" [level=2] [ref=e63]:
            - generic [ref=e64]: Welcome
            - generic [ref=e65]: back,
            - generic [ref=e66]: gilbert
            - generic [ref=e67]: 👋
          - paragraph [ref=e68]: Here's an overview of your learning journey
        - generic [ref=e69]:
          - generic [ref=e70]: 📅
          - generic [ref=e71]:
            - generic [ref=e72]: Today
            - generic [ref=e73]: Tuesday, 22 September 2026
      - generic [ref=e74]:
        - generic [ref=e75]:
          - generic [ref=e76]: 📚
          - generic [ref=e77]:
            - generic [ref=e78]: "0"
            - generic [ref=e79]: Enrolled Courses
        - generic [ref=e80]:
          - generic [ref=e81]: ✅
          - generic [ref=e82]:
            - generic [ref=e83]: "0"
            - generic [ref=e84]: Completed
        - generic [ref=e85]:
          - generic [ref=e86]: 📋
          - generic [ref=e87]:
            - generic [ref=e88]: "0"
            - generic [ref=e89]: Pending Tasks
        - generic [ref=e90]:
          - generic [ref=e91]: 🏆
          - generic [ref=e92]:
            - generic [ref=e93]: 0%
            - generic [ref=e94]: Avg. Progress
      - generic [ref=e95]:
        - generic [ref=e96]:
          - generic [ref=e97]:
            - heading "Get to know Today's Instructors" [level=3] [ref=e98]
            - paragraph [ref=e99]: Tuesday, September 22, 2026
          - generic [ref=e100]: 0 sessions today
        - generic [ref=e101]:
          - generic [ref=e102]: 📅
          - paragraph [ref=e103]: No instructor session scheduled for today.
      - generic [ref=e104]:
        - generic [ref=e105]:
          - generic [ref=e106]:
            - generic [ref=e107]:
              - generic [ref=e108]: 📚
              - generic [ref=e109]:
                - heading "My Courses" [level=3] [ref=e110]
                - paragraph [ref=e111]: 0 courses enrolled
            - button "View All →" [ref=e112] [cursor=pointer]
          - generic [ref=e113]:
            - generic [ref=e114]: 📭
            - paragraph [ref=e115]: No courses yet
            - paragraph [ref=e116]: Start your learning journey today.
            - button "Browse Courses" [ref=e117] [cursor=pointer]
        - generic [ref=e118]:
          - generic [ref=e119]:
            - generic [ref=e120]:
              - generic [ref=e121]: 📋
              - generic [ref=e122]:
                - heading "My Tasks" [level=3] [ref=e123]
                - paragraph [ref=e124]: 0 pending · 0 done
            - button "🔄 Refresh" [ref=e125] [cursor=pointer]:
              - generic [ref=e126]: 🔄
              - text: Refresh
          - generic [ref=e127]:
            - button "⏳ Active 0" [ref=e128] [cursor=pointer]
            - button "✅ Completed 0" [ref=e129] [cursor=pointer]
          - generic [ref=e130]:
            - generic [ref=e131]: 🎉
            - paragraph [ref=e132]: No tasks assigned yet
            - paragraph [ref=e133]: Tasks will appear here as instructors assign them.
  - button "🧪 Test" [ref=e134] [cursor=pointer]
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