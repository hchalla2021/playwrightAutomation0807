# Playwright + TypeScript POM Framework (SauceDemo)

Scalable Page Object Model framework with **self-healing locators**, **2-layer retry mechanism**, and **rich reporting**, designed against https://www.saucedemo.com.

## Folder structure

```
playwrightFramework_pom/
├── playwright.config.ts        # Config: retries, reporters, projects, env loading
├── env/
│   └── .env.qa                 # Environment-specific config (URL, credentials)
├── src/
│   ├── core/
│   │   └── SelfHealingEngine.ts   # Self-healing locator resolution engine
│   ├── locators/                  # Locator repositories (primary + fallbacks)
│   │   ├── login.locators.ts
│   │   ├── products.locators.ts
│   │   ├── cart.locators.ts
│   │   └── checkout.locators.ts
│   ├── pages/                     # Page objects (business actions only)
│   │   ├── BasePage.ts            # Parent: self-healing + retry on every action
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── fixtures/
│   │   └── pageFixtures.ts        # Auto-injected page objects + pre-login fixture
│   └── utils/
│       ├── Logger.ts              # Timestamped step logging
│       └── RetryHelper.ts         # Exponential-backoff action retry
├── test-data/                     # Test data separated from tests (JSON)
│   ├── login.data.json
│   ├── products.data.json
│   └── checkout.data.json
├── tests/                         # Test specs (no locators, no raw selectors)
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
└── reports/                       # Generated: html / json / junit + artifacts
```

## Key design principles

| Concern | Where it lives |
|---|---|
| Selectors | `src/locators/*` — never inside pages or tests |
| Business actions | `src/pages/*` — one class per page |
| Test data | `test-data/*.json` — data-driven, environment-agnostic |
| Test logic | `tests/*.spec.ts` — readable, assertion-focused |
| Cross-cutting resilience | `BasePage` + `SelfHealingEngine` + `RetryHelper` |

### Self-healing locators
Every element has a `primary` selector plus ordered `fallbacks`. If the DOM changes and the primary fails, the engine automatically tries fallbacks and logs a `[SELF-HEAL]` warning telling you which selector healed — so you can update the repository.

### Retry mechanism (2 layers)
1. **Action level** — every click/fill retries up to 3 times with exponential backoff (`RetryHelper`).
2. **Test level** — failed specs re-run automatically (`retries` in `playwright.config.ts`), with trace/video/screenshot captured on failure.

## Getting started

```bash
npm install
npx playwright install

# Run everything
npm test

# Targeted runs
npm run test:smoke          # @smoke tagged tests
npm run test:regression     # @regression tagged tests
npm run test:chrome         # chromium only
npm run test:headed         # watch the browser

# Open the HTML report
npm run report
```

## Reports
- **HTML**: `reports/html-report` (screenshots, traces, videos on failure)
- **JSON**: `reports/json-report/results.json`
- **JUnit**: `reports/junit-report/results.xml` (CI integration)

## Adding a new page (3 steps)
1. Create `src/locators/mypage.locators.ts` with primary + fallback selectors.
2. Create `src/pages/MyPage.ts` extending `BasePage` — business methods only.
3. Register it in `src/fixtures/pageFixtures.ts` and write specs in `tests/`.
