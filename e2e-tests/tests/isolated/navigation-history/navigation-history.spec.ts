/**
 * Reference-history e2e tests: the top toolbar's back/forward buttons and the right-click history
 * menus behind them.
 *
 * Runs against an isolated project root, so the only project is the bundled sample WEB (installed
 * by the C# backend into the empty root). Any developer can run this suite: `npm run
 * test:e2e:isolated navigation-history`. No machine-local projects are read or written.
 *
 * ## What each test starts from
 *
 * Reference history is per scroll group and lives in memory for the life of the app session — it is
 * session-only by design, matching Paratext 9 (see `referenceHistories` in
 * `src/main/services/scroll-group.service-host.ts`). The isolated fixture launches one Electron per
 * test, so a test starts from a freshly seeded history: the scroll group's current reference as the
 * only entry, with both stacks empty. The steps of the one test below share that app, so the step
 * that runs second jumps back to the seeded entry first: a new navigation then discards the forward
 * stack, which leaves the same history a fresh launch has. The seed reference is the app default
 * (GEN 1:1), because the launch fixture gives each instance its own user-data directory and the
 * scroll group's persisted reference lives in that directory's localStorage.
 *
 * ## Declared, not inherited
 *
 * Interface mode, interface language, and window size are pinned below rather than inherited from
 * the developer's checkout. `preConfigureSettings` MERGES into the shared dev-appdata settings
 * file, so anything left unpinned is whatever the last app session happened to leave there.
 */
import { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  SAMPLE_WEB_PROJECT_ID,
  waitForAppReady,
  waitForProjectMetadata,
} from '../../../fixtures/helpers';
import {
  navigateToolbarBcv,
  openScriptureEditorForProject,
} from '../../../fixtures/scripture-editor-helpers';

const WEBSOCKET_PORT = 8876;

/** The top toolbar's BookChapterControl trigger — the only one in the main frame. */
const BCV_TRIGGER = '[aria-label="book-chapter-trigger"]';

/** Accessible names of the two history menus (assets/localization/en.json). */
const BACK_MENU = 'Back history';
const FORWARD_MENU = 'Forward history';

const isMac = process.platform === 'darwin';
const BACK_KEY = isMac ? 'Meta+BracketLeft' : 'Alt+ArrowLeft';
const FORWARD_KEY = isMac ? 'Meta+BracketRight' : 'Alt+ArrowRight';

test.use({
  // The option fixture is named `electronLaunchOptions`, not `launchOptions` — see
  // e2e-tests/fixtures/isolated.fixture.ts.
  //
  // isolatedProjectRoot: the app must not read or write the developer's real projects; the C#
  // backend installs the bundled sample WEB into the empty temp root, so every machine navigates
  // the same books.
  //
  // DEV_NOISY=false: in noisy dev mode the renderer loads the test layout
  // (src/renderer/testing/test-layout.data.ts), which has no Home tab and opens test-extension web
  // views — any of which the toolbar could resolve as its navigation target instead of the editor
  // these tests open.
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
  // The toolbar lays the history buttons out beside the BCV trigger and the project picker; a
  // narrower window collapses that row. 1280x800 is what the other launch suites are written
  // against.
  windowSize: { width: 1280, height: 800 },
  // Seeded through the fixture rather than a preConfigureSettings call in a hook, which the fixture
  // would both override and then write back into the developer's shared settings.
  //
  // - interfaceMode: the mode decides both what the toolbar renders around these buttons and how
  //   the dock treats an opened editor, so the suite declares the one it drives. Power mode opens
  //   each editor as its own dock tab.
  // - firstRunComplete: without it the app starts on the first-run wizard, a modal that aria-hides
  //   the rest of the app and swallows pointer events, so nothing below is reachable.
  //
  // The English interface language every selector depends on — book names on the BCV trigger, the
  // "Back history"/"Forward history" accessible names — is seeded by the fixture itself. The
  // "Genesis 1:1" labels inside the history menus do NOT depend on it: `ReferenceHistoryButtons`
  // builds them with `formatScrRef(entry.scrRef, 'English')` and does not localize.
  interfaceMode: 'power',
  seedSettings: { 'platform.firstRunComplete': true },
});

/**
 * Navigates the top toolbar BCV control with the shared {@link navigateToolbarBcv} and confirms the
 * navigation landed: the trigger must show the expected reference afterwards.
 *
 * @param reference The reference as the control displays it (e.g. 'Mark 4'); the control renders
 *   the book NAME, so a book code never matches its own row.
 * @param expectedRef Display-text pattern the trigger must show afterwards (e.g. /Mark 4(?!\d)/i —
 *   anchored so e.g. "Mark 40" cannot false-pass).
 */
async function navigateToRef(mainPage: Page, reference: string, expectedRef: RegExp) {
  await navigateToolbarBcv(mainPage, reference);
  await expect(mainPage.locator(BCV_TRIGGER)).toContainText(expectedRef, { timeout: 10_000 });
}

test.describe('Reference history', () => {
  // The first step pays the full app startup (up to ~180 s worst case) before it navigates
  // anything; the second runs on the app it started.
  const COLD_START_TIMEOUT_MS = 300_000;
  /** The config's per-test default (`e2e-tests/playwright.config.ts`). */
  const WARM_STEP_TIMEOUT_MS = 120_000;

  // Setup, not reset: the isolated fixture hands every test a freshly launched app, so there is no
  // leftover layout or history to clear. What a test does need is something to navigate — the top
  // toolbar's BookChapterControl is disabled until the window resolves a scripture-navigable web
  // view (`useNavigationTargetWebView` in platform-bible-toolbar.tsx), and a fresh profile opens
  // none on its own.
  test.beforeEach(async ({ mainPage }) => {
    await waitForAppReady(mainPage, { timeout: 180_000 });
    await waitForProjectMetadata(
      (project) => project.id?.toLowerCase() === SAMPLE_WEB_PROJECT_ID,
      'the bundled sample WEB project',
      WEBSOCKET_PORT,
      60_000,
    );
    await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    // The open editor becomes the navigation target, so the control MUST enable. A hard
    // expectation, not a skip-if-disabled, so a regression fails loudly.
    await expect(mainPage.locator(BCV_TRIGGER)).toBeEnabled({ timeout: 30_000 });
  });

  test('reference history navigation', async ({ mainPage }) => {
    test.setTimeout(COLD_START_TIMEOUT_MS + WARM_STEP_TIMEOUT_MS);

    const backButton = mainPage.getByTestId('navigation-history-back-button');
    const forwardButton = mainPage.getByTestId('navigation-history-forward-button');
    const bcvTrigger = mainPage.locator(BCV_TRIGGER);

    await test.step('back/forward buttons navigate the visited references', async () => {
      // Falsifiability precondition: a freshly launched app has visited nothing, so there is nowhere
      // to go in either direction yet. Without it, the enabled/disabled assertions below could all
      // pass against buttons that were simply never disabled.
      await expect(backButton).toBeDisabled();
      await expect(forwardButton).toBeDisabled();

      await navigateToRef(mainPage, 'Mark 4', /Mark 4(?!\d)/i);
      await navigateToRef(mainPage, 'Luke 2', /Luke 2(?!\d)/i);

      await expect(backButton).toBeEnabled();
      await backButton.click();
      await expect(bcvTrigger).toContainText(/Mark 4(?!\d)/i, { timeout: 10_000 });

      await expect(forwardButton).toBeEnabled();
      await forwardButton.click();
      await expect(bcvTrigger).toContainText(/Luke 2(?!\d)/i, { timeout: 10_000 });
      await expect(forwardButton).toBeDisabled();

      // Back to the seeded entry, so the next step's exact back list starts from the same history a
      // fresh launch has: the jump leaves nothing on the back stack, and the first navigation after it
      // discards the forward stack.
      await mainPage.getByTestId('navigation-history-back-button').click({ button: 'right' });
      await mainPage
        .getByRole('menu', { name: BACK_MENU })
        .getByRole('menuitem', { name: 'Genesis 1:1' })
        .click();
      await expect(bcvTrigger).toContainText(/Genesis 1(?!\d)/i, { timeout: 10_000 });
      await expect(backButton).toBeDisabled();
    });

    await test.step('right-click history menu jumps multiple steps', async () => {
      // Three genuinely new chapters, so each visit pushes the previous location onto the back
      // stack. A move within the current book and chapter would instead replace the current entry
      // and record nothing (`recordNavigation` in src/renderer/services/reference-history.util.ts),
      // which is why none of these is the seeded GEN 1:1.
      await navigateToRef(mainPage, 'John 3', /John 3(?!\d)/i);
      await navigateToRef(mainPage, 'Acts 2', /Acts 2(?!\d)/i);
      await navigateToRef(mainPage, 'Revelation 1', /Revelation 1(?!\d)/i);

      // The back menu lists the whole back stack nearest-first: the two visits above, then the
      // seeded starting reference. Asserting the exact list (not just that one entry exists) is what
      // makes the jump below checkable — it pins which entry sits two steps back.
      await mainPage.getByTestId('navigation-history-back-button').click({ button: 'right' });
      const backMenu = mainPage.getByRole('menu', { name: BACK_MENU });
      await expect(backMenu.getByRole('menuitem')).toHaveText([
        'Acts 2:1',
        'John 3:1',
        'Genesis 1:1',
      ]);

      // Jump two steps back in one gesture.
      await backMenu.getByRole('menuitem', { name: 'John 3:1' }).click();
      await expect(bcvTrigger).toContainText(/John 3(?!\d)/i, { timeout: 10_000 });

      // Both entries the jump passed over are now on the forward stack, nearest-first — the
      // passed-over Acts 2:1 ahead of the Revelation 1:1 the jump started from.
      await mainPage.getByTestId('navigation-history-forward-button').click({ button: 'right' });
      await expect(
        mainPage.getByRole('menu', { name: FORWARD_MENU }).getByRole('menuitem'),
      ).toHaveText(['Acts 2:1', 'Revelation 1:1']);
      await mainPage.keyboard.press('Escape');
    });
  });

  // SKIPPED — a harness limitation, not a product defect, and one that launch mode does NOT lift.
  // Alt+Left/Alt+Right are handled by Electron's main-process `before-input-event` listener
  // (src/main/main.ts), which fires in the browser process on native OS input before it reaches
  // the renderer. Playwright drives the keyboard through CDP's `Input.dispatchKeyEvent`, which
  // injects at the renderer level and never passes through that listener — equally true when
  // Playwright launches Electron and when it attaches to a running one, so a launch fixture
  // changes nothing here. The same limitation applies to the verse navigation shortcuts (F8, F9,
  // Ctrl+Up/Down, Ctrl+B), whose key-to-command mapping is covered by
  // src/main/verse-navigation-shortcuts.util.test.ts.
  //
  // The behaviour is covered where it can be driven: the key-to-command mapping by
  // src/main/reference-history-keyboard.util.test.ts, and the navigation the command performs by
  // the two steps of the test above, which reach it through the buttons. Exercising the real key path needs
  // OS-level input injection (e.g. xdotool into the Xvfb display), which this harness does not
  // have. Do NOT delete the body — it documents the intended end-to-end behaviour and can be
  // re-enabled if OS-level injection becomes available.
  test.skip(
    'keyboard shortcuts navigate back and forward',
    {
      annotation: {
        type: 'skip',
        description:
          "Harness limitation: the main process's before-input-event handles these keys, and CDP key events never reach it",
      },
    },
    async ({ mainPage }) => {
      const bcvTrigger = mainPage.locator(BCV_TRIGGER);

      await navigateToRef(mainPage, 'Mark 4', /Mark 4(?!\d)/i);
      await navigateToRef(mainPage, 'Luke 2', /Luke 2(?!\d)/i);

      await mainPage.keyboard.press(BACK_KEY);
      await expect(bcvTrigger).toContainText(/Mark 4(?!\d)/i, { timeout: 10_000 });
      await mainPage.keyboard.press(FORWARD_KEY);
      await expect(bcvTrigger).toContainText(/Luke 2(?!\d)/i, { timeout: 10_000 });
    },
  );
});
