# DOB Input Automation

Playwright test suite for the Date of Birth form, running on BrowserStack Automate (Samsung Galaxy S24 + iPhone 15).

## Prerequisites

- Node.js installed
- BrowserStack account with Automate access
- BrowserStack Local tunnel running (required for `http://127.0.0.1:5500/`)

## Setup

```bash
npm install
```

## Serve the local app

The DOB form test navigates to `http://127.0.0.1:5500/`. Start a local server before running:

```bash
npm run serve
```

Or use the VS Code Live Server extension (port 5500).

## Test cases

| Test                   | File                | Description                                                                                                                         |
| ---------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Geolocation Permission | `tests/dob.spec.ts` | Navigates to permission.site, clicks the Location button, grants geolocation permission on both Android and iOS, takes a screenshot |
| Date of Birth Input    | `tests/dob.spec.ts` | Opens the local DOB form, types `12/25/1990`, submits, and asserts "Submission Successful"                                          |

## Run on BrowserStack (Samsung Galaxy S24 + iPhone 15)

```bash
npm run test:bs
```

Run a specific test by name:

```bash
npm run test:bs -- --grep "Geolocation Permission"
npm run test:bs -- --grep "Date of Birth Input"
```

## Run locally (desktop browser)

```bash
npm test
```

## Configuration

| File                   | Purpose                                                 |
| ---------------------- | ------------------------------------------------------- |
| `browserstack.yml`     | BrowserStack credentials, platforms, project/build name |
| `playwright.config.ts` | Timeouts, retries, test directory                       |

### BrowserStack credentials (`browserstack.yml`)

```yaml
userName: <your-browserstack-username>
accessKey: <your-browserstack-access-key>
```

### Platforms configured

- Samsung Galaxy S24 — Android 14 — Chrome
- iPhone 15 — iOS 17 — Safari

## Notes

- `grantPermissions(['geolocation'])` is supported on both Android (Chrome) and iOS Safari on BrowserStack.
- BrowserStack iOS allows only one browser context per session. If two tests run back-to-back on iPhone 15, the second may be flaky on the first attempt — the built-in `retries: 1` in `playwright.config.ts` handles this automatically.
- `browserstackLocal: true` and `forceLocal: true` are set in `browserstack.yml` to tunnel traffic from BrowserStack cloud to your local server.# playwright-ios-tt
# playwright-ios-tt
