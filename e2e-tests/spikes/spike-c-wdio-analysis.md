# Spike C: WebdriverIO with Electron Service — Analysis

## Why Spike C Was Not Fully Executed

Both Playwright approaches (Spike A and B) achieved **100% pass rates** with minimal setup:

- Spike A (connectOverCDP): 11/11 pass, 2.3 seconds
- Spike B (electron.launch): 14/14 pass, 7 seconds (including app launch/shutdown)

WebdriverIO would require significantly more setup work:

### Setup Requirements

1. **Install 5+ new packages**:

   ```
   @wdio/cli @wdio/local-runner @wdio/mocha-framework
   @wdio/spec-reporter wdio-electron-service
   ```

2. **Modify application source code**:

   - `src/main/main.ts`: Add conditional `wdio-electron-service/main` import
   - Preload script: Add conditional `wdio-electron-service/preload` import
   - These modifications would need to be gated behind environment variables

3. **Create wdio.conf.ts** with Electron service configuration

4. **Different API**: WebdriverIO uses WebDriver protocol (not CDP), meaning:
   - Selectors: `$('*=Help')` instead of `getByRole('menuitem', { name: /Help/ })`
   - No Playwright's built-in auto-waiting on locators
   - Different assertion library

### Capability Comparison

| Capability          | Playwright               | WebdriverIO                  |
| ------------------- | ------------------------ | ---------------------------- |
| Main process access | `electronApp.evaluate()` | `browser.electron.execute()` |
| Locator API         | Role-based, auto-waiting | CSS/XPath, manual waits      |
| Screenshot          | Built-in                 | Built-in                     |
| iframe access       | `page.frames()`          | `browser.switchFrame()`      |
| Setup complexity    | Zero changes to app code | Must modify main + preload   |
| Already in project  | Yes (v1.58)              | No                           |
| Existing tests      | 3 E2E test files         | None                         |

### Decision

Given:

- Playwright is already a dependency and has working E2E tests
- Both `connectOverCDP` and `electron.launch()` work perfectly
- WebdriverIO requires app source modifications
- Playwright's locator API is superior (role-based, auto-waiting)

**Recommendation**: Skip full Spike C execution, proceed with Playwright.
