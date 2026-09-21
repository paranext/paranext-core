/**
 * Enhanced Resources fixture — `cdp.fixture` with the interface mode this suite requires.
 *
 * "Open enhanced resource" is hidden in Simple mode, so every spec here needs an app running in
 * Power mode. Declaring it centrally makes a wrongly-started app fail with the fixture's explicit
 * mode message instead of a timeout on a menu item Simple never renders.
 *
 * Attach mode inherits whatever app was started and cannot change the mode itself, which is why
 * this asserts rather than seeds: start the app with `'platform.interfaceMode': 'power'` in
 * `dev-appdata/data/settings.json`.
 */
import { test as cdpTest } from './cdp.fixture';

export { expect } from './cdp.fixture';

// Supplied as a plain fixture value rather than `['power', { option: true }]`: `cdp.fixture`
// already declares `requiredInterfaceMode` as an option, and Playwright's types reject a derived
// test re-declaring one. A spec that needs a different mode imports `cdp.fixture` directly, the way
// `tests/enhanced-resources/text-collection-schema.spec.ts` does.
export const test = cdpTest.extend({
  requiredInterfaceMode: 'power',
});
