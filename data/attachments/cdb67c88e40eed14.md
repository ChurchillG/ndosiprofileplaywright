# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\discover-endpoints.spec.ts >> discover save/upload endpoint
- Location: tests\ui\discover-endpoints.spec.ts:6:5

# Error details

```
Error: ENOENT: no such file or directory, stat 'C:\Users\ADMIN\Desktop\Playwrightfinal\test-data\new-profile-picture.jpg'
```

```
Error: page.waitForResponse: Test ended.
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
            - generic [ref=e59]:
              - generic [ref=e60]: First Name
              - textbox [ref=e61]: gilbert
            - generic [ref=e62]:
              - generic [ref=e63]: Last Name
              - textbox [ref=e64]: test
            - generic [ref=e65]:
              - generic [ref=e66]: Email
              - textbox [ref=e67]: gilberttest@gmail.com
            - generic [ref=e68]:
              - heading "📞 Contact Details (Optional)" [level=4] [ref=e69]
              - generic [ref=e70]:
                - generic [ref=e71]: Phone Number
                - textbox "e.g., +27 123 456 7890" [ref=e72]
              - generic [ref=e73]:
                - generic [ref=e74]: GitHub Username
                - textbox "e.g., octocat" [ref=e75]
              - generic [ref=e76]:
                - generic [ref=e77]: LinkedIn Profile
                - textbox "e.g., linkedin.com/in/yourprofile" [ref=e78]
            - generic [ref=e79]:
              - heading "🆘 Next of Kin (Optional)" [level=4] [ref=e80]
              - generic [ref=e81]:
                - generic [ref=e82]: Phone Number
                - textbox "e.g., +27 123 456 7890" [ref=e83]
            - generic [ref=e84]:
              - heading "🧪 Testing Experience" [level=4] [ref=e85]
              - generic [ref=e86]:
                - generic [ref=e87]: Years of Experience in Testing
                - combobox [ref=e88]:
                  - option "Select experience level" [selected]
                  - option "1 year of experience"
                  - option "2 years of experience"
                  - option "3 years of experience"
                  - option "4 years of experience"
                  - option "5 years of experience"
                  - option "6 years of experience"
                  - option "7 years of experience"
                  - option "8 years of experience"
                  - option "9 years of experience"
                  - option "10 years of experience"
                  - option "11 years of experience"
                  - option "12 years of experience"
                  - option "13 years of experience"
                  - option "14 years of experience"
                  - option "15 years of experience"
                  - option "16 years of experience"
                  - option "17 years of experience"
                  - option "18 years of experience"
                  - option "19 years of experience"
                  - option "20 years of experience"
              - generic [ref=e89]:
                - generic [ref=e90]: About Me
                - textbox "Tell students a little about your teaching style and experience" [ref=e91]
                - generic [ref=e92]: 0/1000
            - generic [ref=e93]:
              - generic [ref=e94]: Profile Picture
              - generic [ref=e97]:
                - generic [ref=e98] [cursor=pointer]: 📷 Choose Photo
                - paragraph [ref=e99]: JPEG, PNG, GIF, or WEBP. Images are compressed below 3MB before upload.
            - generic [ref=e100]:
              - button "💾 Save Changes" [ref=e101] [cursor=pointer]
              - button "Cancel" [ref=e102] [cursor=pointer]
        - generic [ref=e103]:
          - generic [ref=e104]:
            - heading "⭐ My Testimonials" [level=3] [ref=e105]
            - button "+ Add Review" [ref=e106] [cursor=pointer]
          - generic [ref=e107]:
            - paragraph [ref=e108]: You haven't submitted any testimonials yet.
            - paragraph [ref=e109]: Share your experience with others!
  - button "🧪 Test" [ref=e110] [cursor=pointer]
```

# Test source

```ts
  1  | import path from 'path';
  2  | import { test } from '../../src/fixtures/test-base';
  3  | 
  4  | const NEW_PICTURE_PATH = path.resolve(__dirname, '../../test-data/new-profile-picture.jpg');
  5  | 
  6  | test('discover save/upload endpoint', async ({ page, credentials, profileFeature }) => {
  7  |   await profileFeature.loginToSite(credentials);
  8  |   await profileFeature.navigateToEditProfile();
  9  | 
  10 |   // Start waiting for any response whose URL contains "profile" BEFORE
  11 |   // triggering the upload+save, so we don't miss it even if it fires fast.
> 12 |   const responsePromise = page.waitForResponse(
     |                                ^ Error: page.waitForResponse: Test ended.
  13 |     (response) => response.url().includes('profile'),
  14 |     { timeout: 15_000 },
  15 |   );
  16 | 
  17 |   await profileFeature.updateProfilePicture(NEW_PICTURE_PATH);
  18 | 
  19 |   const response = await responsePromise;
  20 |   console.log('Save/upload response:', {
  21 |     method: response.request().method(),
  22 |     url: response.url(),
  23 |     status: response.status(),
  24 |   });
  25 | });
```