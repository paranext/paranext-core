/**
 * Secondary-window chrome e2e test (PT-4279).
 *
 * A secondary window is meant to be indistinguishable from the main window except for one thing: it
 * does not draw the top-level menu. Investigation brief §6 — "Secondary windows keep the full
 * toolbar and remove **only** the top-level menu."
 *
 * The removal is a withheld `menuData` prop in `platform-bible-toolbar.tsx`, driven by
 * `globalThis.isMainWindow`, which the main process sets as a URL search parameter on the first
 * window only. Nothing else pins that behaviour, so this spec is its regression guard — in both
 * directions:
 *
 * 1. The main window still HAS the menubar (a withheld prop must not remove it everywhere).
 * 2. The secondary window does NOT.
 * 3. The secondary window still has the toolbar and the app-menu-area logo, which is what makes this
 *    "removed only the menu" rather than "removed the app menu area".
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated multi-window`
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import { preConfigureSettings, waitForAppReady } from '../../../fixtures/helpers';
import { createSecondWindow, createStepLogger, getWindowIdOfPage } from './multi-window.util';

/** Radix's Menubar root, which the shared `Toolbar` renders only when it is given `menuData`. */
const MENUBAR = '[data-slot="menubar"]';
/** The toolbar wrapper `platform-bible-toolbar.tsx` always renders, menu or no menu. */
const TOOLBAR = '[data-testid="toolbar-reserved-space-wrapper"]';
/** The app-menu-area logo, which sits beside the menubar and must survive its removal. */
const APP_LOGO = 'img[alt="Application Logo"]';

/**
 * Give a menubar that should not exist time to appear before asserting it is absent. Menu data
 * arrives asynchronously from the extension host, so an immediate negative assertion would pass
 * even against a build that renders the menu a moment later.
 */
const MENU_SETTLE_MS = 3_000;

test.describe('secondary window chrome', () => {
  // One launch (up to ~180 s worst case) plus a second window.
  test.setTimeout(420_000);

  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  test('a secondary window keeps the toolbar and drops only the top-level menu', async ({
    electronApp,
    mainPage,
  }) => {
    const logStep = createStepLogger('secondary-window-chrome');
    await waitForAppReady(mainPage, 180_000);
    const window1Id = getWindowIdOfPage(mainPage);

    // ── The main window is the control ────────────────────────────────────────────────────────
    await expect(mainPage.locator(TOOLBAR)).toBeAttached({ timeout: 60_000 });
    await expect(mainPage.locator(MENUBAR)).toHaveCount(1, { timeout: 60_000 });
    logStep(`window ${window1Id} has the toolbar and the menubar`);

    // ── The secondary window keeps everything but the menu ────────────────────────────────────
    const page2 = await createSecondWindow(electronApp);
    const window2Id = getWindowIdOfPage(page2);
    await expect(page2.locator(TOOLBAR)).toBeAttached({ timeout: 60_000 });
    await expect(page2.locator(APP_LOGO)).toBeAttached({ timeout: 60_000 });
    logStep(`window ${window2Id} has the toolbar and the app-menu-area logo`);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, MENU_SETTLE_MS);
    });
    await expect(page2.locator(MENUBAR)).toHaveCount(0);
    // The main window keeps its menubar throughout — the flag is per window, not app-global.
    await expect(mainPage.locator(MENUBAR)).toHaveCount(1);
    logStep(`window ${window2Id} has no menubar; window ${window1Id} still does`);
  });
});
