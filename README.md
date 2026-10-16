# Playwright QA Demo (TypeScript)

![Playwright Tests](https://github.com/lrm22221-afk/playwright-qa-demo/actions/workflows/playwright.yml/badge.svg)

A small, working test-automation project that shows how I structure a Playwright suite.
It runs against **public practice targets**, not client systems:

- UI: [saucedemo.com](https://www.saucedemo.com), a demo shop built for test practice
- API: [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake REST API

## What it demonstrates
- **Page Object Model** (`pages/`) plus custom Playwright **fixtures** (`tests/ui/fixtures.ts`)
- **UI tests**: login (valid, locked-out, wrong password, empty field), product count, price sorting, cart badge, full checkout
- **API tests**: GET with schema checks, query filtering, POST (201), 404 handling
- Stable `data-test` locators, isolated parallel tests, separate `ui` / `api` projects
- **GitHub Actions CI**: runs on every push/PR and uploads the HTML report as an artifact (traces on retry, screenshots on failure)

## Run it
```bash
npm ci
npx playwright install chromium
npm test            # all 12 tests
npm run test:ui     # UI only
npm run test:api    # API only
npm run report      # open the HTML report
```

## Structure
```
pages/               Page objects: Login, Inventory, Checkout
tests/ui/            UI specs + fixtures
tests/api/           API specs
.github/workflows/   CI pipeline
```

## Latest local run
12 / 12 passed (Chromium, 4 workers, about 4 seconds).
