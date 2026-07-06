/**
 * E2E tests for PT-4068 / PT-4069: Comments tab in Column 3 of P10 Simple mode.
 *
 * Tests verify:
 *
 * - The "Comments" tab is present in Column 3 in Simple mode (English)
 * - Selecting the tab renders the comment-list panel
 * - When a project with comments is open, at least one comment is visible
 * - The Spanish tab label differs from English, is distinct from other Column 3 tabs, and uses
 *   sentence case
 * - When the active project changes, the Comments tab updates
 *
 * ## Tab overflow
 *
 * At the default test window width (1280 px) the Column 3 tab titles ("Bible Texts",
 * "Commentaries", "Comments", etc.) might not all fit in the visible portion of the tab bar.
 * rc-tabs renders ALL tab nodes in the DOM at all times, but clips the ones that fall outside the
 * scrollable container. Although this might not be the case when tabs are represented by icons, the
 * "Comments" tab is typically clipped.
 *
 * Consequently:
 *
 * - `toBeAttached()` succeeds for the Comments tab even when it is clipped.
 * - `toBeVisible()` fails for a clipped tab (Playwright detects the overflow-hidden clip).
 * - `toBeVisible()` / direct `.click()` works for Commentaries because it is always in the visible
 *   area (it is the second tab).
 *
 * `clickCommentsTab` handles both cases: it clicks the tab directly if visible, or opens the
 * rc-tabs overflow dropdown (.dock-nav-more) and activates the tab from there — rc-tabs then
 * scrolls the now-active tab into the visible area as a side-effect.
 *
 * This workaround is temporary: once tab titles are replaced by icons the tabs will fit comfortably
 * at any reasonable window width.
 */
import { test, expect } from '../../fixtures/comment.fixture';
import {
  waitForAppReady,
  waitForPapiMethodRegistered,
  sendPapiRequestOnce,
} from '../../fixtures/helpers';
import {
  type CommentTestProject,
  createCommentTestProject,
  cleanupCommentTestProject,
  createCommentThreads,
} from '../../fixtures/comment-test-helpers';

const SETTINGS_SET_METHOD = 'object:platform.settingsServiceDataProvider-data.set';
const DEFAULT_WEBSOCKET_PORT = 8876;
const SETTINGS_TIMEOUT_MS = 60_000;
const PAPI_REQUEST_TIMEOUT_MS = 30_000;
/**
 * `openResourceViewer` triggers `openOrUpdateRelatedPanels`, which sequentially awaits four PAPI
 * commands. Each command opens a panel and can take several seconds; the combined response can
 * exceed the default 30 s PAPI request timeout. On a fresh Electron (warm startup, no cached
 * layout) the four panels can collectively take 2+ minutes. Use a generous timeout.
 */
const OPEN_RESOURCE_VIEWER_TIMEOUT_MS = 150_000;

/**
 * Switch the app to English + Simple mode and wait for the dock to reload.
 *
 * Uses the Commentaries tab (expected to be one of the actually visible tabs) as the dock-reload
 * signal rather than the Comments tab, which may be clipped in the overflow area.
 */
async function switchToSimpleModeEnglish(mainPage: import('@playwright/test').Page): Promise<void> {
  await waitForPapiMethodRegistered(
    SETTINGS_SET_METHOD,
    DEFAULT_WEBSOCKET_PORT,
    SETTINGS_TIMEOUT_MS,
  );
  await sendPapiRequestOnce(
    SETTINGS_SET_METHOD,
    ['platform.interfaceLanguage', ['en']],
    DEFAULT_WEBSOCKET_PORT,
    PAPI_REQUEST_TIMEOUT_MS,
  );
  await sendPapiRequestOnce(
    SETTINGS_SET_METHOD,
    ['platform.interfaceMode', 'simple'],
    DEFAULT_WEBSOCKET_PORT,
    PAPI_REQUEST_TIMEOUT_MS,
  );
  // Commentaries is always one of the first two visible tabs — its appearance confirms the
  // dock has reloaded with the simple layout. Use a generous timeout: the simple layout may
  // not render until after the project-load overlay clears (up to ~90 s on a slow machine,
  // after a language switch from Spanish → English, or when transitioning between locales in
  // consecutive tests sharing the same Electron worker).
  await expect(mainPage.locator('.dock-tab', { hasText: /^Commentaries$/ })).toBeVisible({
    timeout: 120_000,
  });
  // Wait for any loading overlay to clear after the mode switch. waitForAppReady already cleared
  // the initial app overlay; this catches any brief re-appearance during the layout transition.
  await expect(mainPage.locator('.pr-twp [role="status"]')).not.toBeVisible({ timeout: 90_000 });
}

/** Column 3 tab bar, identified by the always-visible Commentaries tab as an anchor. */
function getCol3Bar(mainPage: import('@playwright/test').Page): import('@playwright/test').Locator {
  return mainPage.locator('.dock-bar').filter({
    has: mainPage.locator('.dock-tab', { hasText: /^Commentaries$/ }),
  });
}

/**
 * Click the Comments tab in Column 3.
 *
 * If the tab is scrolled outside the visible portion of the tab bar (clipped by the rc-tabs
 * overflow container), hover the `.dock-nav-more` overflow button to open the dropdown, then click
 * the Comments option. rc-tabs scrolls the newly-active tab into the visible bar area as a
 * side-effect of activating it via the dropdown.
 */
async function clickCommentsTab(
  mainPage: import('@playwright/test').Page,
  col3Bar: import('@playwright/test').Locator,
): Promise<void> {
  const tab = mainPage.locator('.dock-tab', { hasText: /^Comments$/ });
  if (await tab.isVisible()) {
    await tab.click();
    return;
  }
  // Tab is clipped outside the visible scroll area — open the overflow dropdown and activate it.
  await col3Bar.locator('.dock-nav-more').hover();
  await mainPage
    .locator('[role="listbox"] [role="option"]', { hasText: /^Comments$/ })
    .click({ timeout: 5_000 });
}

test.describe('Comments tab in P10 Simple mode (PT-4068 / PT-4069)', () => {
  // Test 5 (project changes) calls openResourceViewer twice with a 150 s budget each; on a
  // fresh-Electron retry the combined time can exceed 5 minutes. Use 7 minutes to cover the
  // worst case (two cold openResourceViewer calls + app startup + locale switch).
  test.setTimeout(420_000);
  let project: CommentTestProject;
  // projectA and projectB are used by the "project changes" test.  They are created here in
  // beforeAll — before the Electron worker fixture starts — so that ScrTextCollection finds them
  // when it initialises at app startup.  Creating them inside the test body (after startup) causes
  // a race condition where GetProjectDataProviderID throws "Project not found" because
  // ScrTextCollection hasn't scanned the new directories yet.
  let projectA: CommentTestProject;
  let projectB: CommentTestProject;

  test.beforeAll(async () => {
    // Create test projects before app starts (file system only, no WebSocket needed yet).
    // All three must be created here so ScrTextCollection can discover them at startup.
    project = await createCommentTestProject([]);
    projectA = await createCommentTestProject([]);
    projectB = await createCommentTestProject([]);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
    cleanupCommentTestProject(projectA);
    cleanupCommentTestProject(projectB);
  });

  test('Comments tab is visible in Column 3 in the English UI', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await switchToSimpleModeEnglish(mainPage);

    // The tab may be clipped in the rc-tabs overflow area at default window width, but it is
    // always present in the DOM as part of the Column 3 layout (see file-level TSDoc).
    await expect(mainPage.locator('.dock-tab', { hasText: /^Comments$/ })).toBeAttached();
  });

  test('selecting the Comments tab displays the panel', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await switchToSimpleModeEnglish(mainPage);

    await clickCommentsTab(mainPage, getCol3Bar(mainPage));

    // The Comments panel is an iframe; wait for its body to be attached
    const commentsFrame = mainPage.frameLocator('iframe[title="Comments"]');
    await commentsFrame.locator('body').waitFor({ state: 'attached', timeout: 15_000 });
  });

  test('when a project has comments, at least one is visible in the Comments tab', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, 180_000);
    await switchToSimpleModeEnglish(mainPage);

    // Seed one comment thread in the test project
    await createCommentThreads(project, ['GEN 1:1'], ['Visible comment for PT-4068 test']);

    // Open the project in the scripture editor (triggers openOrUpdateRelatedPanels in simple mode)
    await waitForPapiMethodRegistered(
      'command:platformScriptureEditor.openResourceViewer',
      DEFAULT_WEBSOCKET_PORT,
      SETTINGS_TIMEOUT_MS,
    );
    await sendPapiRequestOnce(
      'command:platformScriptureEditor.openResourceViewer',
      [project.projectId],
      DEFAULT_WEBSOCKET_PORT,
      OPEN_RESOURCE_VIEWER_TIMEOUT_MS,
    );

    // Click the Comments tab
    await clickCommentsTab(mainPage, getCol3Bar(mainPage));

    // Verify at least the seeded comment content is visible
    const commentsFrame = mainPage.frameLocator('iframe[title="Comments"]');
    await expect(commentsFrame.locator('body')).toContainText('Visible comment for PT-4068 test', {
      timeout: 20_000,
    });
  });

  test('Spanish tab label differs from English, is distinct from other Column 3 tabs, and uses sentence case', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, 180_000);
    await switchToSimpleModeEnglish(mainPage);

    // Switch to Spanish locale
    await sendPapiRequestOnce(
      SETTINGS_SET_METHOD,
      ['platform.interfaceLanguage', ['es']],
      DEFAULT_WEBSOCKET_PORT,
      PAPI_REQUEST_TIMEOUT_MS,
    );

    // Wait directly for the Spanish Commentaries label to appear. This is more robust than waiting
    // for the English label to disappear: on locale switch the dock may go through a full rebuild
    // ("Updating project view" overlay) that can take 2+ minutes when multiple WebViews are open
    // from prior tests sharing the same Electron worker (each WebView reload is sequential). A
    // fresh-Electron retry is faster. Use a 3-minute timeout to cover both cases.
    await expect(mainPage.locator('.dock-tab', { hasText: 'Comentarios bíblicos' })).toBeAttached({
      timeout: 180_000,
    });

    // Locate Column 3's tab bar using the Spanish Commentaries label as a stable anchor. The tab
    // is already attached (we just waited for it), so toBeVisible should pass quickly.
    const col3TabBar = mainPage.locator('.dock-bar').filter({
      has: mainPage.locator('.dock-tab', { hasText: 'Comentarios bíblicos' }),
    });
    await expect(col3TabBar).toBeVisible({ timeout: 15_000 });

    // Column 3 should now have 3 tabs (Bible Texts, Commentaries, Comments — all in Spanish).
    // All .dock-tab nodes are always in the DOM even if one or more is clipped by the overflow
    // container, so toHaveCount and allTextContents work regardless of scroll position.
    const col3Tabs = col3TabBar.locator('.dock-tab');
    await expect(col3Tabs).toHaveCount(3, { timeout: 10_000 });
    const tabTexts = await col3Tabs.allTextContents();
    const [text0, text1, text2] = tabTexts.map((t) => t.trim());

    // The 3rd tab (index 2) is our Comments tab in Spanish
    const spanishLabel = text2;

    // (a) Differs from the English label
    expect(spanishLabel).not.toBe('Comments');

    // (b) Distinct from all other Column 3 tab labels
    expect(spanishLabel).not.toBe(text0);
    expect(spanishLabel).not.toBe(text1);

    // (c) Sentence case: first character uppercase, remaining characters lowercase
    //     (Spanish sentence case: only the first word capitalised)
    expect(spanishLabel.charAt(0)).toMatch(/[A-ZÁÉÍÓÚÜÑ]/);
    expect(spanishLabel.slice(1)).toBe(spanishLabel.slice(1).toLowerCase());
  });

  test('Comments tab updates when the active project changes (PT-4069)', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await switchToSimpleModeEnglish(mainPage);

    // Seed each project with a distinct comment thread (requires WebSocket — done inside test body)
    await createCommentThreads(projectA, ['GEN 1:1'], ['Project A unique comment text']);
    await createCommentThreads(projectB, ['GEN 1:1'], ['Project B unique comment text']);

    await waitForPapiMethodRegistered(
      'command:platformScriptureEditor.openResourceViewer',
      DEFAULT_WEBSOCKET_PORT,
      SETTINGS_TIMEOUT_MS,
    );

    // Project A and B are opened via command rather than the active project dropdown in the title
    // bar since newly created test projects won't be in the recent list, so there will be no easy
    // and reliable UI path for project switching in this mode. The Home UI might also fail to
    // display them without a force refresh, but in any case that will eventually not be available
    // in Simple mode.
    // Open Project A — triggers openOrUpdateRelatedPanels(projectA.projectId)
    await sendPapiRequestOnce(
      'command:platformScriptureEditor.openResourceViewer',
      [projectA.projectId],
      DEFAULT_WEBSOCKET_PORT,
      OPEN_RESOURCE_VIEWER_TIMEOUT_MS,
    );

    // Click the Comments tab and verify Project A's comment is visible
    await clickCommentsTab(mainPage, getCol3Bar(mainPage));
    // Wait for the Comments iframe to exist before accessing its frame — reloadWebView (called by
    // openOrUpdateRelatedPanels) briefly removes and re-adds the iframe during content refresh.
    await expect(mainPage.locator('iframe[title="Comments"]')).toBeAttached({ timeout: 30_000 });
    const commentsFrame = mainPage.frameLocator('iframe[title="Comments"]');
    await expect(commentsFrame.locator('body')).toContainText('Project A unique comment text', {
      timeout: 20_000,
    });

    // Switch to Project B — triggers openOrUpdateRelatedPanels(projectB.projectId)
    await sendPapiRequestOnce(
      'command:platformScriptureEditor.openResourceViewer',
      [projectB.projectId],
      DEFAULT_WEBSOCKET_PORT,
      OPEN_RESOURCE_VIEWER_TIMEOUT_MS,
    );

    // Comments tab should now show Project B's comments
    await expect(commentsFrame.locator('body')).toContainText('Project B unique comment text', {
      timeout: 20_000,
    });
    // And no longer show Project A's
    await expect(commentsFrame.locator('body')).not.toContainText('Project A unique comment text');
  });
});
