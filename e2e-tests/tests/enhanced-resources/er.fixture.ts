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
import { test as cdpTest } from '../../fixtures/cdp.fixture';

export { expect } from '../../fixtures/cdp.fixture';

export const test = cdpTest.extend({
  requiredInterfaceMode: ['power', { option: true }],
});
