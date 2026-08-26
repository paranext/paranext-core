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
 * `src/renderer/services/scroll-group.service-host.ts`). The isolated fixture launches one Electron
 * per test, so every test starts from the same freshly seeded history: the scroll group's current
 * reference as the only entry, with both stacks empty. The seed reference is the app default (GEN
 * 1:1), because the launch fixture gives each instance its own user-data directory and the scroll
 * group's persisted reference lives in that directory's localStorage.
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
  preConfigureSettings,
  SAMPLE_WEB_PROJECT_ID,
  waitForAppReady,
  waitForAtLeastOneProjectMetadata,
} from '../../../fixtures/helpers';
import { openScriptureEditorForProject } from '../../../fixtures/scripture-editor-helpers';

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
  // Verifies the `platform.interfaceMode` pin below actually took effect. The pin merges
  // into a shared settings file, so it can silently fail and leave this suite driving the
  // other mode's layout.
  requiredInterfaceMode: 'power',
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
});

/**
 * Navigate the top toolbar BCV control to a typed reference (e.g. 'MRK 4').
 *
 * After typing, the control shows a "top match" CommandItem rendered with the book ID and
 * chapter:verse (e.g. typing "MRK 4" shows an item "MRK 4:1" — the full English book name only
 * appears on the trigger after committing). Commit with Enter, but only AFTER cmdk's highlighted
 * (`data-selected`) item is the top match: cmdk moves its highlight asynchronously after the input
 * changes, so an immediate Enter can race it and activate the previously-highlighted book instead
 * (observed flake). Mouse-clicking the item is also unreliable — the list auto-scrolls (deferred
 * `setTimeout(0)` + smooth scroll) on every input change, which can shift the layout under the
 * pointer between Playwright's stability check and the actual click (observed to hit the
 * next-chapter quick-nav button instead).
 *
 * @param expectedRef Display-text pattern of the committed reference on the trigger (e.g. /Mark
 *   4\b/i — word-boundary anchored so e.g. "Mark 40" cannot false-pass), asserted at the end to
 *   confirm the navigation landed.
 */
async function navigateToRef(mainPage: Page, refText: string, expectedRef: RegExp) {
  const trigger = mainPage.locator(BCV_TRIGGER);
  await expect(trigger).toBeVisible({ timeout: 10_000 });
  await trigger.click();
  const commandInput = mainPage.locator('[data-radix-popper-content-wrapper] input');
  await expect(commandInput).toBeVisible({ timeout: 5_000 });
  await commandInput.fill(refText);
  // Wait for cmdk to highlight the top match (its text starts with the typed reference, e.g.
  // "MRK 4" → "MRK 4:1"). Only then is Enter guaranteed to activate it. The `\b` anchor keeps a
  // wrong-chapter highlight from false-passing: "MRK 4\b" accepts "MRK 4:1" but rejects
  // "MRK 12:1" (and a hypothetical "MRK 40:1").
  const highlightedTopMatch = mainPage.locator(
    '[data-radix-popper-content-wrapper] [cmdk-item][data-selected="true"]',
    { hasText: new RegExp(`${refText}\\b`, 'i') },
  );
  await expect(highlightedTopMatch).toBeVisible({ timeout: 5_000 });
  await commandInput.press('Enter');
  await expect(commandInput).not.toBeVisible({ timeout: 5_000 });
  await expect(trigger).toContainText(expectedRef, { timeout: 10_000 });
}

test.describe('Reference history', () => {
  // Each test pays a full app startup (up to ~180 s worst case) before it navigates anything.
  test.setTimeout(300_000);

  let restoreSettings: (() => void) | undefined;

  test.beforeAll(() => {
    // Written before any launch and restored after the last test so the developer's own settings
    // survive the suite.
    //
    // - firstRunComplete: without it the app starts on the first-run wizard, a modal that
    //   aria-hides the rest of the app and swallows pointer events, so nothing below is reachable.
    // - interfaceLanguage: every selector here is English — the book names on the BCV trigger and
    //   the menus' "Back history"/"Forward history" accessible names. The "Genesis 1:1" labels
    //   inside the history menus do NOT depend on it: `ReferenceHistoryButtons` builds them with
    //   `formatScrRef(entry.scrRef, 'English')` and does not localize (see the TODO there).
    // - interfaceMode: the mode decides both what the toolbar renders around these buttons and how
    //   the dock treats an opened editor, so the suite declares the one it drives. Power mode is
    //   the choice because it opens each editor as its own dock tab.
    restoreSettings = preConfigureSettings({
      'platform.firstRunComplete': true,
      'platform.interfaceLanguage': ['en'],
      'platform.interfaceMode': 'power',
    });
  });

  test.afterAll(() => {
    restoreSettings?.();
  });

  // Setup, not reset: the isolated fixture hands every test a freshly launched app, so there is no
  // leftover layout or history to clear. What a test does need is something to navigate — the top
  // toolbar's BookChapterControl is disabled until the window resolves a scripture-navigable web
  // view (`useNavigationTargetWebView` in platform-bible-toolbar.tsx), and a fresh profile opens
  // none on its own.
  test.beforeEach(async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForAtLeastOneProjectMetadata(WEBSOCKET_PORT, 60_000);
    await openScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    // The open editor becomes the navigation target, so the control MUST enable. A hard
    // expectation, not a skip-if-disabled, so a regression fails loudly.
    await expect(mainPage.locator(BCV_TRIGGER)).toBeEnabled({ timeout: 30_000 });
  });

  test('back/forward buttons navigate the visited references', async ({ mainPage }) => {
    const backButton = mainPage.getByTestId('navigation-history-back-button');
    const forwardButton = mainPage.getByTestId('navigation-history-forward-button');
    const bcvTrigger = mainPage.locator(BCV_TRIGGER);

    // Falsifiability precondition: a freshly launched app has visited nothing, so there is nowhere
    // to go in either direction yet. Without it, the enabled/disabled assertions below could all
    // pass against buttons that were simply never disabled.
    await expect(backButton).toBeDisabled();
    await expect(forwardButton).toBeDisabled();

    await navigateToRef(mainPage, 'MRK 4', /Mark 4\b/i);
    await navigateToRef(mainPage, 'LUK 2', /Luke 2\b/i);

    await expect(backButton).toBeEnabled();
    await backButton.click();
    await expect(bcvTrigger).toContainText(/Mark 4\b/i, { timeout: 10_000 });

    await expect(forwardButton).toBeEnabled();
    await forwardButton.click();
    await expect(bcvTrigger).toContainText(/Luke 2\b/i, { timeout: 10_000 });
    await expect(forwardButton).toBeDisabled();
  });

  test('right-click history menu jumps multiple steps', async ({ mainPage }) => {
    const bcvTrigger = mainPage.locator(BCV_TRIGGER);

    // Three genuinely new chapters, so each visit pushes the previous location onto the back
    // stack. A move within the current book and chapter would instead replace the current entry
    // and record nothing (`recordNavigation` in src/renderer/services/reference-history.util.ts),
    // which is why none of these is the seeded GEN 1:1.
    await navigateToRef(mainPage, 'JHN 3', /John 3\b/i);
    await navigateToRef(mainPage, 'ACT 2', /Acts 2\b/i);
    await navigateToRef(mainPage, 'REV 1', /Revelation 1\b/i);

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
    await expect(bcvTrigger).toContainText(/John 3\b/i, { timeout: 10_000 });

    // Both entries the jump passed over are now on the forward stack, nearest-first — the
    // passed-over Acts 2:1 ahead of the Revelation 1:1 the jump started from.
    await mainPage.getByTestId('navigation-history-forward-button').click({ button: 'right' });
    await expect(
      mainPage.getByRole('menu', { name: FORWARD_MENU }).getByRole('menuitem'),
    ).toHaveText(['Acts 2:1', 'Revelation 1:1']);
    await mainPage.keyboard.press('Escape');
  });

  // SKIPPED — a harness limitation, not a product defect, and one that launch mode does NOT lift.
  // Alt+Left/Alt+Right are handled by Electron's main-process `before-input-event` listener
  // (src/main/main.ts), which fires in the browser process on native OS input before it reaches
  // the renderer. Playwright drives the keyboard through CDP's `Input.dispatchKeyEvent`, which
  // injects at the renderer level and never passes through that listener — equally true when
  // Playwright launches Electron and when it attaches to a running one, so a launch fixture
  // changes nothing here. The same limitation is documented for the verse navigation shortcuts,
  // whose spec runs in launch mode
  // (tests/isolated/verse-navigation/verse-navigation-shortcuts.spec.ts).
  //
  // The behaviour is covered where it can be driven: the key-to-command mapping by
  // src/main/reference-history-keyboard.util.test.ts, and the navigation the command performs by
  // the two tests above, which reach it through the buttons. Exercising the real key path needs
  // OS-level input injection (e.g. xdotool into the Xvfb display), which this harness does not
  // have. Do NOT delete the body — it documents the intended end-to-end behaviour and can be
  // re-enabled if OS-level injection becomes available.
  test.skip('keyboard shortcuts navigate back and forward', async ({ mainPage }) => {
    const bcvTrigger = mainPage.locator(BCV_TRIGGER);

    await navigateToRef(mainPage, 'MRK 4', /Mark 4\b/i);
    await navigateToRef(mainPage, 'LUK 2', /Luke 2\b/i);

    await mainPage.keyboard.press(BACK_KEY);
    await expect(bcvTrigger).toContainText(/Mark 4\b/i, { timeout: 10_000 });
    await mainPage.keyboard.press(FORWARD_KEY);
    await expect(bcvTrigger).toContainText(/Luke 2\b/i, { timeout: 10_000 });
  });
});
