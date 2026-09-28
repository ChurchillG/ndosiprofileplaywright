# Ndosi Profile Picture Automation

End-to-end test automation for the **Ndosi automation test site**, covering both the **UI flow** and the **API endpoints** behind it, in a single **Playwright + TypeScript** framework. Results are published as an **Allure report** on GitHub Pages and the whole suite runs on a **GitHub Actions** pipeline every night at **00:00 SAST**.

**Live report:** `https://<your-username>.github.io/<repo-name>/`

---

## Table of contents

1. [What this project does](#1-what-this-project-does)
2. [Tech stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Folder structure](#4-folder-structure)
5. [How each class works](#5-how-each-class-works)
6. [The UI flow, step by step](#6-the-ui-flow-step-by-step)
7. [The API flow, step by step](#7-the-api-flow-step-by-step)
8. [Endpoint discovery](#8-endpoint-discovery)
9. [Setup](#9-setup)
10. [Running the tests](#10-running-the-tests)
11. [Reporting](#11-reporting)
12. [Screenshots](#12-screenshots)
13. [CI/CD pipeline](#13-cicd-pipeline)
14. [Findings and lessons learned](#14-findings-and-lessons-learned)
15. [Troubleshooting](#15-troubleshooting)
16. [Security notes](#16-security-notes)

---

## 1. What this project does

**UI test** (`tests/ui`) automates this user journey:

1. Launch the browser and open the site
2. Click the landing page's **Login** button (redirects to the login page)
3. Enter username and password, click **Login**
4. Click **Menu** (opens a dropdown)
5. Click **My Profile**
6. Click **Edit Profile**
7. Click **Choose Photo** and select an image file
8. Click **Save Changes**
9. Verify the picture upload completed successfully

**API test** (`tests/api`) validates every endpoint the UI flow touched: login, get profile, update profile, and upload profile picture. Each test asserts the response status code.

Both suites share the same config, credentials, helpers and reporting.

---

## 2. Tech stack

| Purpose | Tool |
|---|---|
| Test framework (UI + API) | Playwright Test |
| Language | TypeScript |
| Design pattern | Page Object Model + feature (flow) layer + custom fixtures |
| Test data | CSV file read by a `CsvReader` helper |
| Reporting | Allure (primary), Playwright HTML report (fallback) |
| CI/CD | GitHub Actions |
| Report hosting | GitHub Pages |

---

## 3. Architecture

```
GitHub Actions (cron: 00:00 SAST daily, also on push / manual run)
        |
        v
Playwright TypeScript project (one config, two projects: ui and api)
   |-- UI suite   -> Page Objects -> Feature layer -> Browser
   |-- API suite  -> ApiClient -> APIRequestContext -> REST API
        |
        v
Allure results (raw)  ->  Allure report (history merged)  ->  GitHub Pages
```

**The layers, from the bottom up:**

| Layer | Folder | Responsibility |
|---|---|---|
| Helpers | `src/helpers` | Generic building blocks: `BasePage` (shared browser actions) and `CsvReader` (reads test data) |
| Page Objects | `src/pages` | One class per screen. Each holds that screen's locators and actions |
| Features | `src/features` | Chains page objects into a business flow (login, navigate, upload) |
| API | `src/api` | `endpoints.ts` (paths) and `ApiClient` (HTTP wrapper with auth token) |
| Fixtures | `src/fixtures` | Injects ready-made objects (`credentials`, `apiClient`, `profileFeature`) into tests |
| Utils | `src/utils` | Allure step/screenshot helpers and a network logger used for discovery |
| Tests | `tests` | Thin specs that call the layers above and assert results |

---

## 4. Folder structure

```
.
├── .github/
│   └── workflows/
│       └── tests.yml                 # CI pipeline (nightly cron, Allure, Pages)
├── src/
│   ├── helpers/
│   │   ├── BasePage.ts               # shared browser actions
│   │   └── CsvReader.ts              # reads credentials from CSV
│   ├── pages/
│   │   ├── LandingPage.ts            # site home page + first Login button
│   │   ├── LoginPage.ts              # email, password, submit
│   │   ├── MenuPage.ts               # menu button + dropdown -> My Profile
│   │   ├── ProfilePage.ts            # Edit Profile button
│   │   └── EditProfilePage.ts        # choose photo + save changes
│   ├── features/
│   │   └── test-feature.ts           # full UI business flow
│   ├── api/
│   │   ├── endpoints.ts              # endpoint paths in one place
│   │   └── ApiClient.ts              # GET/POST/PUT/multipart + auth token
│   ├── fixtures/
│   │   └── test-base.ts              # credentials, apiClient, profileFeature
│   └── utils/
│       ├── allure-helpers.ts         # step() and attachScreenshot()
│       └── network-logger.ts         # records API calls (endpoint discovery)
├── tests/
│   ├── ui/
│   │   └── profile-picture-update.spec.ts
│   └── api/
│       └── profile-endpoints.spec.ts
├── test-data/
│   ├── login-credentials.csv         # real credentials (gitignored)
│   ├── login-credentials.example.csv # template (committed)
│   └── download.jpeg                 # image used for the upload (under 3MB)
├── screenshots/                      # images used in this README
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .env                              # local URLs (gitignored)
├── .env.example                      # template (committed)
└── README.md
```

Generated and gitignored: `allure-results/`, `allure-report/`, `reports/`, `test-results/`, `node_modules/`.

---

## 5. How each class works

### Helpers

**`BasePage`** is the parent class of every page object. It holds the Playwright `Page` and wraps common actions (`goto`, `click`, `fill`, `uploadFile`, `waitForVisible`, `getText`). Each action waits for the element to be visible before acting, so page objects don't repeat that code. `goto` waits for `domcontentloaded` instead of the full `load` event, so one slow image or font can't stall navigation.

**`CsvReader`** reads a CSV file and turns each row into an object using the header row as keys. `CsvReader.getLoginCredentials()` returns the first row of `test-data/login-credentials.csv` as `{ username, password }`. Credentials never appear in test code.

### Page Objects (all extend `BasePage`)

| Class | Screen | Actions |
|---|---|---|
| `LandingPage` | Home page | `open()`, `clickLoginButton()` |
| `LoginPage` | Login form | `enterUsername()`, `enterPassword()`, `clickLoginButton()`, `login()` |
| `MenuPage` | Menu dropdown | `openMenu()`, `clickMyProfile()` |
| `ProfilePage` | My Profile | `clickEditProfile()`, `getProfilePictureSrc()` |
| `EditProfilePage` | Edit Profile | `uploadProfilePicture()`, `clickSaveChanges()` |

Locators are private getters. Playwright locators are lazy, so a getter re-finds the element each time it is used, which avoids stale references when the page re-renders.

### Feature layer

**`ProfilePictureUpdateFeature`** (`src/features/test-feature.ts`) creates one instance of each page object and chains them into named business steps: `loginToSite()`, `navigateToEditProfile()`, `updateProfilePicture()`. Specs call these steps and never touch page objects directly.

### API layer

**`endpoints.ts`** keeps every endpoint path in one file.

**`ApiClient`** wraps Playwright's `APIRequestContext`. It stores an auth token and attaches `Authorization: Bearer <token>` to every request. Methods: `get`, `post`, `postMultipart`, `put`, `setAuthToken`.

### Fixtures

**`test-base.ts`** extends Playwright's `test` with three fixtures that any test can request by name:

| Fixture | What it provides |
|---|---|
| `credentials` | The login row read from the CSV |
| `apiClient` | A fresh `ApiClient` built on Playwright's request context |
| `profileFeature` | The UI feature flow, wired to the test's browser page |

### Utils

**`allure-helpers.ts`** provides `step(name, fn)`, which shows a block of code as a named step in the Allure report, and `attachScreenshot(page, label)`, which embeds a screenshot in the report.

**`network-logger.ts`** records every XHR/fetch call the browser makes. It was used once to discover the real API endpoints (see section 8).

---

## 6. The UI flow, step by step

```
profile-picture-update.spec.ts
   |
   |  fixtures inject: page, credentials (from CSV), profileFeature
   v
profileFeature.loginToSite(credentials)
   |-- LandingPage.open()                 -> goto '/'
   |-- LandingPage.clickLoginButton()     -> redirects to login page
   |-- LoginPage.login(email, password)   -> fill both fields, click Login
   v
profileFeature.navigateToEditProfile()
   |-- MenuPage.openMenu()                -> dropdown opens
   |-- MenuPage.clickMyProfile()
   |-- ProfilePage.clickEditProfile()
   v
attachScreenshot('Before update')
   v
start listening for POST /profile/image
   v
profileFeature.updateProfilePicture(test-data/download.jpeg)
   |-- EditProfilePage.uploadProfilePicture()
   |        click "Choose Photo" label -> intercept the native file chooser
   |        -> select the file -> wait 3s for client-side compression
   |-- EditProfilePage.clickSaveChanges()
   v
wait for POST /profile/image response
   v
attachScreenshot('After update')
   v
expect(uploadResponse.status()).toBe(200)
```

**Why the file chooser is intercepted:** clicking "Choose Photo" opens the operating system's file dialog, and Playwright cannot control OS windows. Playwright's `filechooser` event catches the dialog and hands it the file, which has the same effect as a person picking the file.

**Why the test waits 3 seconds after choosing the file:** the site compresses the image in the browser before it registers the file. Saving too early submits the form without the new picture.

---

## 7. The API flow, step by step

```
test.beforeAll
   |-- CsvReader.getLoginCredentials()
   |-- playwright.request.newContext({ baseURL })
   |-- POST login { email, password }     -> status + token, stored once
   v
Test 1: login returns 200            (asserts the status captured above)
Test 2: GET  profile                 (token set on apiClient) -> 200
Test 3: PUT  profile                 -> 200
Test 4: POST profile/image           (multipart, field "profileImage") -> 200
```

### Endpoints validated

| Endpoint | Method | Used during | Expected status |
|---|---|---|---|
| `/login` | POST | Login (field is `email`, not `username`) | 200 |
| `/profile` | GET | My Profile view, Edit Profile load | 200 |
| `/profile` | PUT | Save Changes (text fields) | 200 |
| `/profile/image` | POST | Picture upload (multipart field `profileImage`) | 200 |

**API host:** `https://www.ndosiautomation.co.za/APIDEV/` (a different host from the front end).

### Three API details that matter

1. **Log in only once.** The API allows one active session per user. A second login invalidates the first token, so the suite logs in once in `beforeAll` and reuses that token. The login test checks the status from that same call instead of logging in again.
2. **Endpoint paths have no leading slash, and the base URL ends with a slash.** With a leading slash, URL resolution drops `/APIDEV` and requests land on the website's HTML pages instead of the API.
3. **Field names come from the API, not the UI.** The login body needs `email` (not `username`) and the upload needs `profileImage`. The API's error messages (`MISSING_CREDENTIALS`, `MISSING_PROFILE_IMAGE`) revealed both.

---

## 8. Endpoint discovery

The endpoints in section 7 came from the real site, not guesses. A temporary test attached `network-logger.ts` to the page, ran the whole UI flow, and printed every XHR/fetch call. From that list the calls relevant to the profile flow were picked out:

- `POST /login`
- `GET /profile`
- `PUT /profile`
- `POST /profile/image`

Other calls fire on the dashboard (groups, enrollments, tasks, testimonials) but are unrelated to the profile flow, so they are not tested.

---

## 9. Setup

**Prerequisites:** Node.js 20 or newer, npm, Git. Java is only needed to build the Allure report locally.

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
npx playwright install --with-deps
```

**Create your local config files:**

`.env`
```
BASE_URL=https://ndosisimplifiedautomation.vercel.app
API_BASE_URL=https://www.ndosiautomation.co.za/APIDEV/
```
Keep the trailing slash on `API_BASE_URL`.

`test-data/login-credentials.csv`
```csv
username,password
your-email@example.com,your-password
```
The header row must stay exactly `username,password`. The value in the `username` column is sent to the API as `email`.

**Test image:** put a small image at `test-data/download.jpeg`. It must be **under 3 MB** (see section 14).

---

## 10. Running the tests

| Command | What it does |
|---|---|
| `npx playwright test` | Runs the UI and API suites |
| `npx playwright test --project=ui` | UI suite only |
| `npx playwright test --project=api` | API suite only |
| `npx playwright test --project=ui --headed` | UI suite with a visible browser |
| `npx tsc --noEmit` | Type-check the whole project |

Tests run with one worker, because the API suite shares a login token and the site allows only one active session per account.

---

## 11. Reporting

Two reports are produced on every run.

**Allure (primary).** Shows each test as a narrative of named steps, with before/after screenshots attached to the UI test, and keeps pass/fail history across daily runs.

```bash
npm run report:generate     # builds allure-report/ from allure-results/
npm run report:open         # opens it in the browser
```

These scripts need this block in `package.json`:

```json
"scripts": {
  "test": "playwright test",
  "test:ui": "playwright test --project=ui",
  "test:api": "playwright test --project=api",
  "report:generate": "allure generate allure-results -o allure-report --clean",
  "report:open": "allure open allure-report"
}
```

**Playwright HTML report (fallback).** Written to `reports/`. Open it with `npx playwright show-report reports`.

On failure, Playwright also saves a screenshot, video and trace under `test-results/`.

---

## 12. Screenshots

Add your screenshots to the `screenshots/` folder and link them here.

| Screenshot | File |
|---|---|
| Allure report overview | `screenshots/allure-overview.png` |
| UI test steps in Allure | `screenshots/allure-ui-steps.png` |
| Before update | `screenshots/before-update.png` |
| After update | `screenshots/after-update.png` |
| API tests passing | `screenshots/api-results.png` |
| GitHub Actions run | `screenshots/actions-run.png` |

```markdown
![Allure overview](screenshots/allure-overview.png)
```

---

## 13. CI/CD pipeline

Defined in `.github/workflows/tests.yml`.

**Triggers**

| Trigger | When |
|---|---|
| `schedule` | Every day at `0 22 * * *` UTC, which is **00:00 SAST** (South Africa is UTC+2 with no daylight saving) |
| `push` and `pull_request` | On `main` / `master` |
| `workflow_dispatch` | Manual run from the Actions tab |

Scheduled runs only work on the repository's default branch.

**Steps**

1. Check out the repository
2. Set up Node.js
3. `npm ci` (this needs `package-lock.json` committed)
4. `npx playwright install --with-deps`
5. Create `test-data/login-credentials.csv` from GitHub Secrets
6. `npx playwright test` (UI and API, with `BASE_URL` and `API_BASE_URL` from secrets)
7. Upload the Playwright HTML report as an artifact
8. Restore Allure history from the `gh-pages` branch
9. Generate the Allure report
10. Publish it to GitHub Pages

Steps 7 to 10 run even when tests fail (`if: ${{ !cancelled() }}`), so a failing night still produces a report.

**One-time setup**

1. Add these repository secrets under **Settings > Secrets and variables > Actions**:

| Secret | Value |
|---|---|
| `NDOSI_USERNAME` | Test account email |
| `NDOSI_PASSWORD` | Test account password |
| `BASE_URL` | `https://ndosisimplifiedautomation.vercel.app` |
| `API_BASE_URL` | `https://www.ndosiautomation.co.za/APIDEV/` (keep the trailing slash) |

2. Run the workflow once from **Actions > Run workflow**. This creates the `gh-pages` branch.
3. Under **Settings > Pages**, set the source to the `gh-pages` branch (root). The report link then appears on that page.

---

## 14. Findings and lessons learned

### Application defect: oversized images fail silently

The Edit Profile screen states that images are "compressed below 3MB before upload". While building the upload step, a photo of about **41 MB** was used. Selecting it attached the file to the page's file input correctly, but the app never registered it: "Save Changes" resubmitted the old picture, no error was shown, and no upload request was sent. Swapping in an image under 3 MB fixed it completely.

**Recommendation:** the app should check the file size and show a clear message (for example, "Image too large, please choose a file under 3MB") instead of failing silently.

### Other observations

- `GET /student/today` returns **404** every time the dashboard loads.
- The front end writes the login credentials to the browser console (`Login attempt with: {...}`), which is a security concern.

### Engineering lessons from building the suite

| Problem | Cause | Fix |
|---|---|---|
| API calls returned HTML instead of JSON | Leading `/` in endpoint paths dropped `/APIDEV` from the base URL | Paths without a leading slash, base URL with a trailing slash |
| Login returned `MISSING_CREDENTIALS` | API expects `email`, not `username` | Send `email` in the request body |
| `GET /profile` returned 401 after a passing login test | A second login invalidated the first token (one session per user) | Log in once in `beforeAll` and reuse the token |
| Upload returned 400 `MISSING_PROFILE_IMAGE` | Wrong multipart field name | Use `profileImage` |
| UI test intermittently timed out on the first page load | The default `load` event waits for every resource | Navigate with `domcontentloaded` |
| Profile picture locator matched two elements | The picture appears twice on the Edit Profile screen | Use `.first()` |
| Profile picture had no `<img>` tag | It is a `<div>` with a CSS `background-image` | Locate by `div[style*="profile-images"]` and read the URL from the `style` attribute |

---

## 15. Troubleshooting

| Symptom | Fix |
|---|---|
| `Cannot find module 'x'` | Run `npm install`. A listed dependency isn't installed yet |
| `Cannot find name 'process'` or `'fs'` | Run `npm install --save-dev @types/node` and check `"types": ["node"]` in `tsconfig.json` |
| `tsc` prints its help text | `tsconfig.json` is missing from the project root |
| TypeScript 7 error about `baseUrl` | Remove `baseUrl` and `paths` from `tsconfig.json`. TypeScript 7 no longer supports `baseUrl` |
| `No tests found` | Test files must be named `*.spec.ts` and sit inside `tests/ui` or `tests/api` |
| `Cannot navigate to invalid URL` | `BASE_URL` is missing or lacks `https://` |
| `ENOENT ... download.jpeg` | The test image is missing from `test-data/` |
| API returns 401 on a valid token | Another login (yours or another test run) invalidated it. Run one thing at a time |
| Emoji show as odd characters in PowerShell | Display issue only. The files are saved correctly |
| `npm run report:generate` fails | Check that the `scripts` block from section 11 is in `package.json`, and that Java is installed |

---

## 16. Security notes

- `.env` and `test-data/login-credentials.csv` are gitignored. Never commit them.
- Only the `.example` templates are committed.
- CI receives credentials from GitHub Secrets and writes the CSV at run time.
- If a credential is ever committed by mistake, change the password immediately. Deleting the file in a later commit does not remove it from Git history.