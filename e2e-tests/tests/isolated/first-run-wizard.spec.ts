/**
 * Smoke test for the first-run wizard overlay (PT-4219 / PT-4175).
 *
 * Verifies that a fresh user (no `platform.firstRunComplete` setting) who launches the app in
 * Simple mode sees the first-run overlay — either the loading spinner, the wizard, or the
 * registration-error screen. All three are valid first-run overlay states; any of them confirms
 * that the FirstRunOverlay component is rendering and gating access to the app.
 *
 * ## Why not use app.fixture
 *
 * `app.fixture` pre-seeds `platform.firstRunComplete: true` to bypass the wizard for smoke tests.
 * This test deliberately needs the wizard to appear, so it uses `isolated.fixture` which performs
 * no such pre-seeding, and seeds only `platform.interfaceMode: 'simple'` to keep the app in the
 * mode where first-run gating applies (power mode bypasses the gate).
 *
 * ## Why the dialog is always visible for a fresh profile
 *
 * `first-run-store.ts` → `computeInitialStatus()` checks localStorage for a cached
 * `firstRunComplete` flag. A fresh isolated user-data dir has no localStorage, so
 * `computeInitialStatus` returns `{ kind: 'loading' }` and the overlay renders immediately.
 * `resolveInternal` may subsequently transition to `wizard` or `error` depending on whether
 * Paratext registration is reachable. All three states (loading / wizard / error) are visible as a
 * `role="dialog"` element.
 */
import { test, expect } from '../../fixtures/isolated.fixture';
import { preConfigureSettings } from '../../fixtures/helpers';

test.describe('First-run wizard overlay', () => {
  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    // Write simple-mode setting to the shared dev-appdata settings file BEFORE launchElectronApp
    // runs (the isolated fixture's electronApp fixture calls launchElectronApp). Playwright runs
    // beforeAll before test-scoped fixture setup, so this write precedes the Electron launch.
    // We deliberately do NOT set 'platform.firstRunComplete' so the overlay gate stays active.
    restoreSettings = preConfigureSettings({ 'platform.interfaceMode': 'simple' });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('renders the first-run overlay for a fresh profile', async ({ mainPage }) => {
    // The first-run overlay is a non-dismissable Dialog (role="dialog"). It is present in one of
    // three states:
    //   • loading  — a spinner while settingsService resolves firstRunComplete
    //   • wizard   — the step-by-step onboarding flow
    //   • error    — registration backend unreachable (expected in E2E without a live Paratext install)
    //
    // Any of these states means the overlay is working. Power-mode bypass does not apply here
    // because the fresh isolated user-data dir has no localStorage cache, so
    // computeInitialStatus() returns { kind: 'loading' } and the overlay renders immediately.
    const dialog = mainPage.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 15_000 });
  });
});
