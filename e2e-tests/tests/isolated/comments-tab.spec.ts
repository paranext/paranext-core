/**
 * E2E tests for PT-4068 / PT-4069: Comments tab in Column 3 of P10 Simple mode.
 *
 * Tests verify:
 *
 * - The "Comments" tab is present in Column 3 in Simple mode
 * - Selecting the tab renders the comment-list panel
 * - When a project with comments is open, at least one is visible in the Comments tab
 * - When the active project changes, the Comments tab updates
 *
 * ## Stable selectors
 *
 * Tab buttons use `data-web-view-id` (added to `PlatformTabTitle`) so tests find them by the fixed
 * UUID from `simple-layout.data.ts`, not by localized text. This makes the tests locale-independent
 * and immune to translation changes.
 *
 * The Comment List Panel's fixed UUID in the simple layout is COMMENT_LIST_PANEL_UUID below.
 *
 * ## Tab overflow
 *
 * At the default test window width (1280 px) the Column 3 tab titles may not all fit in the visible
 * portion of the tab bar. (Once we replace named tabs with icon-identified tabs, this issue will
 * not be relevant at most reasonable window widths.) Our tab component, rc-tabs, renders ALL tab
 * nodes in the DOM at all times, but clips those that fall outside the scrollable container.
 *
 * - `toBeAttached()` / `data-web-view-id` queries succeed even for clipped tabs.
 * - `toBeVisible()` fails for a clipped tab (Playwright detects the overflow-hidden clip).
 *
 * `clickCommentsTab` handles both cases: it clicks the tab title directly if visible, or opens the
 * rc-tabs overflow dropdown (.dock-nav-more) and activates the tab from there.
 *
 * ## Locale / interface mode
 *
 * The comment fixture pre-configures `platform.interfaceLanguage: ['en']` and
 * `platform.interfaceMode: 'simple'` in the settings file BEFORE launching Electron. The app
 * therefore starts in the correct state without any mid-session locale reload (which would
 * sequentially reload every open WebView).
 */
import type { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/comment.fixture';
import {
  waitForAppReady,
  waitForOverlayGone,
  waitForPapiMethodRegistered,
  sendPapiRequestOnce,
} from '../../fixtures/helpers';
import {
  type CommentTestProject,
  createCommentTestProject,
  cleanupCommentTestProject,
  createCommentThreads,
} from '../../fixtures/comment-test-helpers';

const DEFAULT_WEBSOCKET_PORT = 8876;
const SETTINGS_TIMEOUT_MS = 60_000;
/**
 * `openScriptureEditor` triggers `openOrUpdateRelatedPanels`, which sequentially awaits four PAPI
 * commands. Each command opens a panel and can take several seconds; the combined response can
 * exceed the default 30 s PAPI request timeout. Use a generous timeout.
 */
const OPEN_EDITOR_TIMEOUT_MS = 150_000;

/**
 * Fixed UUID for the Comment List Panel tab in Column 3 of the simple layout. Source:
 * src/renderer/components/docking/simple-layout.data.ts
 */
const COMMENT_LIST_PANEL_UUID = 'c7e4a8b2-3d91-4f06-8e5a-1b2c9d0e7f83';

/**
 * Fixed UUID for the Column 2 scripture-editor slot in the simple layout. Source:
 * src/renderer/components/docking/simple-layout.data.ts
 *
 * `openScriptureEditor` replaces this slot with the project editor. It must be present in the dock
 * state before `openScriptureEditor` is called, otherwise the replace fails with "target tab not
 * found". Waiting for its tab title to be attached confirms the dock has fully processed the simple
 * layout — the slot is guaranteed to be in the dock state at that point.
 */
const SCRIPTURE_EDITOR_SLOT_UUID = '3cf575f0-2cc2-464b-8765-b588f216dfce';

/**
 * Wait for the simple layout to be ready with all Column 2 and Column 3 tabs present, and the
 * workspace-updating overlay cleared.
 *
 * Waits for:
 *
 * 1. The Comment List Panel tab title (UUID-based) — confirms legacyCommentManager activated.
 * 2. The scripture editor slot tab title — confirms the dock processed the Column 2 slot so that
 *    `openScriptureEditor` can replace it without a "target tab not found" error.
 * 3. The workspace-updating overlay to be gone — confirms no dock rebuild is in progress that would
 *    block clicks or iframe loading.
 */
async function waitForSimpleLayout(mainPage: Page): Promise<void> {
  await Promise.all([
    expect(
      mainPage.locator(`.platform-tab-title[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`),
    ).toBeAttached({ timeout: 120_000 }),
    expect(
      mainPage.locator(`.platform-tab-title[data-web-view-id="${SCRIPTURE_EDITOR_SLOT_UUID}"]`),
    ).toBeAttached({ timeout: 120_000 }),
  ]);
  // Wait for any workspace-updating overlay to clear. It can appear (and reappear) during dock
  // rebuilds triggered by extension activation.
  await waitForOverlayGone(mainPage, 90_000);
}

/**
 * Returns a FrameLocator for the comment-list-panel iframe.
 *
 * Uses the UUID-based `data-web-view-id` attribute on the iframe (set by `web-view.component.tsx`)
 * rather than `iframe[title="Comments"]`, which depends on the localization service having
 * initialized before the WebView's first `getWebView()` call. The UUID attribute is always present
 * regardless of whether the title resolved.
 */
function commentsFrameLocator(mainPage: Page) {
  return mainPage.frameLocator(`iframe[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`);
}

/**
 * Calls `openScriptureEditor` via PAPI to open the main (editable) project, retrying up to
 * `maxRetries` times if the dock throws "Replacing tab failed". That error is a known transient
 * race condition: `openOrUpdateRelatedPanels` can trigger a dock rebuild that briefly removes the
 * editor slot from the layout, causing the subsequent replace to fail. A short delay and retry
 * reliably succeeds once the dock settles.
 */
async function openScriptureEditor(
  projectId: string,
  port: number,
  timeout: number,
  maxRetries = 2,
): Promise<void> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0)
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2_000);
      });
    try {
      await sendPapiRequestOnce(
        'command:platformScriptureEditor.openScriptureEditor',
        [projectId],
        port,
        timeout,
      );
      return;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (attempt >= maxRetries || !msg.includes('Replacing tab failed')) throw e;
      // Otherwise fall through to the next loop iteration to retry after a short delay
    }
  }
}

/**
 * Click the Comments tab in Column 3.
 *
 * If the tab title is scrolled outside the visible portion of the tab bar (clipped by the rc-tabs
 * overflow container), hover the `.dock-nav-more` overflow button to open the dropdown, then click
 * the Comments option via its UUID attribute.
 *
 * `actionTimeoutMs` bounds the click/hover actions — pass a short value when calling inside a retry
 * loop so a blocked click (e.g. the workspace-updating overlay intercepting pointer events) fails
 * fast and the loop can retry, instead of burning the default 30 s action timeout.
 */
async function clickCommentsTab(mainPage: Page, actionTimeoutMs = 30_000): Promise<void> {
  const tabTitle = mainPage.locator(
    `.platform-tab-title[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`,
  );
  if (await tabTitle.isVisible()) {
    await tabTitle.click({ timeout: actionTimeoutMs });
    return;
  }
  // Tab is outside the visible scroll area — open the overflow dropdown and activate it.
  const dockBar = mainPage.locator('.dock-bar').filter({ has: tabTitle });
  await dockBar.locator('.dock-nav-more').hover({ timeout: actionTimeoutMs });
  // rc-tabs re-renders PlatformTabTitle (including our data-web-view-id) in the overflow popup.
  await mainPage
    .locator('[role="listbox"] [role="option"]')
    .filter({ has: mainPage.locator(`[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`) })
    .click({ timeout: 5_000 });
}

test.describe('Comments tab in P10 Simple mode (PT-4068 / PT-4069)', () => {
  // First 3 tests: app startup (up to 180 s) + waitForSimpleLayout (up to 120 s) + test actions.
  // "Project changes" test: two openScriptureEditor calls at 150 s each on top of startup.
  // 7 minutes covers all cases.
  test.setTimeout(420_000);
  let project: CommentTestProject;
  // projectA and projectB are used by the "project changes" test. Created here in beforeAll —
  // before the Electron worker fixture starts — so that ScrTextCollection discovers them at
  // startup. Creating them inside the test body (after startup) causes a race condition where
  // GetProjectDataProviderID throws "Project not found".
  let projectA: CommentTestProject;
  let projectB: CommentTestProject;
  let projectScroll: CommentTestProject;

  test.beforeAll(async () => {
    project = await createCommentTestProject([]);
    projectA = await createCommentTestProject([]);
    projectB = await createCommentTestProject([]);
    projectScroll = await createCommentTestProject([]);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
    cleanupCommentTestProject(projectA);
    cleanupCommentTestProject(projectB);
    cleanupCommentTestProject(projectScroll);
  });

  test('Comments tab is visible in Column 3 in the English UI', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);
    // The UUID-based locator confirms the tab is in the DOM regardless of scroll position.
    await expect(
      mainPage.locator(`.platform-tab-title[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`),
    ).toBeAttached();
  });

  test('selecting the Comments tab displays the panel', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);

    // Assert on rendered panel UI, not just the iframe body: the body is "attached" as soon as
    // the frame element exists, which would pass even for an empty or errored WebView. The panel
    // renders skeleton placeholders while loading (this test opens no project, so it stays in the
    // loading state) and the filter toolbar dropdowns once loaded — either proves the
    // CommentListPanel component actually rendered.
    //
    // Click and assert inside ONE retry loop: a workspace rebuild ("Updating project view"
    // overlay) can still fire after waitForSimpleLayout. It recreates the Column 3 tabs and resets
    // the active tab, unmounting the comments iframe — so a single click-then-assert sequence
    // flakes. Each attempt first waits out any in-progress rebuild (the overlay also intercepts
    // pointer events, so clicking during one always fails), then clicks and asserts with short
    // timeouts so the loop can retry promptly if another rebuild lands mid-attempt.
    const commentsFrame = commentsFrameLocator(mainPage);
    await expect(async () => {
      await waitForOverlayGone(mainPage, 60_000);
      await clickCommentsTab(mainPage, 5_000);
      await expect(
        commentsFrame.locator('[data-slot="skeleton"], [data-slot="select-trigger"]').first(),
      ).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 180_000 });
  });

  test('when a project has comments, at least one is visible in the Comments tab', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);

    await createCommentThreads(project, ['GEN 1:1'], ['Visible comment for PT-4068 test']);

    // Point the panel at the test project. We call openCommentListPanel directly rather than
    // going through openScriptureEditor/openOrUpdateRelatedPanels: the latter triggers three
    // concurrent dock rebuilds (model text + two resource text panels) that call getWebView for
    // the comment list panel while the sentinel is in flight, occasionally overwriting it with
    // the previously-open developer project. Calling directly here is safe because
    // waitForSimpleLayout already confirmed the dock is stable (overlay gone).
    await waitForPapiMethodRegistered(
      'command:legacyCommentManager.openCommentListPanel',
      DEFAULT_WEBSOCKET_PORT,
      SETTINGS_TIMEOUT_MS,
    );
    await sendPapiRequestOnce(
      'command:legacyCommentManager.openCommentListPanel',
      [project.projectId],
      DEFAULT_WEBSOCKET_PORT,
      OPEN_EDITOR_TIMEOUT_MS,
    );

    await clickCommentsTab(mainPage);

    const commentsFrame = commentsFrameLocator(mainPage);
    await expect(commentsFrame.locator('body')).toContainText('Visible comment for PT-4068 test', {
      timeout: 90_000,
    });
  });

  test('filter toolbar stays visible when the comment list is scrolled to the bottom (PT-4070)', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);

    // Seed enough threads to force the comment list to scroll. GEN 1 has 31 verses, so 30
    // distinct single-verse threads are all valid and comfortably overflow the panel height.
    const COMMENT_COUNT = 30;
    const verseRefs = Array.from({ length: COMMENT_COUNT }, (_, i) => `GEN 1:${i + 1}`);
    const contents = Array.from(
      { length: COMMENT_COUNT },
      (_, i) => `PT-4070 scroll comment ${i + 1}`,
    );
    await createCommentThreads(projectScroll, verseRefs, contents);

    // Point the Column 3 Comments tab at the seeded project (same direct-open path the
    // "has comments" test uses — see that test for why we avoid openScriptureEditor here).
    await waitForPapiMethodRegistered(
      'command:legacyCommentManager.openCommentListPanel',
      DEFAULT_WEBSOCKET_PORT,
      SETTINGS_TIMEOUT_MS,
    );
    await sendPapiRequestOnce(
      'command:legacyCommentManager.openCommentListPanel',
      [projectScroll.projectId],
      DEFAULT_WEBSOCKET_PORT,
      OPEN_EDITOR_TIMEOUT_MS,
    );

    await clickCommentsTab(mainPage);

    const commentsFrame = commentsFrameLocator(mainPage);
    // The filter dropdowns are the toolbar; the first one is the resolved-status filter. Its
    // visibility is a faithful proxy for "the filtering bar is visible" (PT-4070 DoD).
    const firstFilter = commentsFrame.locator('[data-slot="select-trigger"]').first();
    const threads = commentsFrame.locator('#comment-list [role="option"]');

    // Wait for the seeded threads to render, then confirm the toolbar starts out visible.
    await expect(threads.first()).toBeVisible({ timeout: 90_000 });
    await expect(firstFilter).toBeInViewport();

    // Scroll the iframe DOCUMENT explicitly, not "whichever container happens to scroll". In the
    // real web view nothing bounds html/body/#root, so the document is the scroll container and
    // tw:sticky is what pins the toolbar; targeting the document scroller directly keeps this test
    // load-bearing. If a future layout change (PT-4173) bounds the height so the inner list becomes
    // the scroller instead, the document won't move, the first-thread guard below fails, and the
    // test flags for review rather than converting into a false green.
    await commentsFrame.locator(':root').evaluate((root) => {
      const scroller = root.ownerDocument.scrollingElement ?? root;
      scroller.scrollTop = scroller.scrollHeight;
    });

    // Guard against a false green: after scrolling the document, the FIRST thread must be out of the
    // viewport, proving the document actually overflowed and scrolled. If this fails, raise
    // COMMENT_COUNT until it does (or the scroll model changed — see above).
    await expect(threads.first()).not.toBeInViewport();

    // The point of PT-4070: the sticky filter row must remain on-screen after scrolling to bottom.
    await expect(firstFilter).toBeInViewport();
  });

  // NOTE: The keyboard and scope-filter tests below MUST stay ahead of the PT-4069 test. That test
  // calls openScriptureEditor, which in Simple mode dispatches `replace-tab` and swaps the Column 2
  // scripture-editor slot (SCRIPTURE_EDITOR_SLOT_UUID) for a fresh GUID. Nothing re-applies the
  // simple layout in-session and the Electron app is worker-scoped, so any later test's
  // waitForSimpleLayout would block the full 120 s on a slot that no longer exists and fail its
  // first attempt (relying on Playwright's worker-relaunch retry to recover — a guaranteed slow
  // flake, and a hard failure under --retries=0).
  test('filter dropdowns are operable with the keyboard (PT-4070)', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);

    // The toolbar renders in the loaded state even with zero threads, but seed a few so the panel
    // never sits in the skeleton state when we go to interact (keeps the test self-sufficient when
    // run alone via -g).
    await createCommentThreads(
      projectScroll,
      ['GEN 2:1', 'GEN 2:2', 'GEN 2:3'],
      ['PT-4070 keyboard a11y 1', 'PT-4070 keyboard a11y 2', 'PT-4070 keyboard a11y 3'],
    );

    await waitForPapiMethodRegistered(
      'command:legacyCommentManager.openCommentListPanel',
      DEFAULT_WEBSOCKET_PORT,
      SETTINGS_TIMEOUT_MS,
    );
    await sendPapiRequestOnce(
      'command:legacyCommentManager.openCommentListPanel',
      [projectScroll.projectId],
      DEFAULT_WEBSOCKET_PORT,
      OPEN_EDITOR_TIMEOUT_MS,
    );

    await clickCommentsTab(mainPage);

    const commentsFrame = commentsFrameLocator(mainPage);
    const firstFilter = commentsFrame.locator('[data-slot="select-trigger"]').first();

    // Wait for the loaded toolbar, then drive the first filter entirely by keyboard.
    await expect(firstFilter).toBeVisible({ timeout: 90_000 });
    await firstFilter.focus();
    await expect(firstFilter).toBeFocused();

    // Open with the keyboard.
    await firstFilter.press('Enter');
    const dropdown = commentsFrame.locator('[data-slot="select-content"]');
    await expect(dropdown).toBeVisible({ timeout: 10_000 });

    // Navigate to the next option and commit it with the keyboard; the dropdown closes on select.
    await mainPage.keyboard.press('ArrowDown');
    await mainPage.keyboard.press('Enter');
    await expect(dropdown).toBeHidden({ timeout: 10_000 });

    // Assert the OUTCOME, not merely that the popover closed. The first filter is the resolved-status
    // axis, whose options are All / Unresolved / Resolved; ArrowDown from the selected "All resolved
    // statuses" lands on "Unresolved", so the trigger must now display it. This fails if Enter closed
    // the popover without committing a value, or re-selected the same value — cases a bare
    // toBeHidden() (satisfied even by the toolbar re-rendering) would pass.
    await expect(firstFilter).toContainText('Unresolved');
  });

  test('Comments tab scope filter offers "Current chapter" in Simple mode (PT-4070)', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);

    await createCommentThreads(projectScroll, ['GEN 3:1'], ['PT-4070 scope-option test']);

    await waitForPapiMethodRegistered(
      'command:legacyCommentManager.openCommentListPanel',
      DEFAULT_WEBSOCKET_PORT,
      SETTINGS_TIMEOUT_MS,
    );
    await sendPapiRequestOnce(
      'command:legacyCommentManager.openCommentListPanel',
      [projectScroll.projectId],
      DEFAULT_WEBSOCKET_PORT,
      OPEN_EDITOR_TIMEOUT_MS,
    );

    const commentsFrame = commentsFrameLocator(mainPage);
    // Find the scope dropdown by its stable data-testid rather than by trigger index — the index
    // holds only while the scope trigger stays the 5th of exactly five and no comment card renders a
    // Select, which is a coincidence rather than a contract. Click the tab inside a retry loop: a
    // "workspace updating" overlay can intercept pointer events during dock rebuilds, so wait it out
    // and retry (same pattern as the panel-display test).
    const scopeTrigger = commentsFrame.locator('[data-testid="comment-scope-filter"]');
    await expect(async () => {
      await waitForOverlayGone(mainPage, 60_000);
      await clickCommentsTab(mainPage, 5_000);
      await expect(scopeTrigger).toBeVisible({ timeout: 15_000 });
    }).toPass({ timeout: 180_000 });

    // With the overlay cleared, open the scope dropdown and confirm the Column 3 panel actually
    // offers the "Current chapter" option — the exact capability this fix adds. Before the fix the
    // option was gated on a wired editor (which the panel lacks even though it follows the active
    // project's scroll group), so only "All books" appeared. Assert on the localized labels rather
    // than the option count, so a future change that swapped in a different second scope value while
    // dropping current-chapter could not keep this test green.
    //
    // This overlay wait is NOT redundant with the one inside the retry loop above: the loop only
    // guarantees the overlay is gone at the moment the trigger becomes visible, but a fresh dock
    // rebuild can raise it again before the click below — which is a new pointer action. Keep it.
    await waitForOverlayGone(mainPage, 30_000);
    await scopeTrigger.click();
    const scopeOptions = commentsFrame.locator(
      '[data-slot="select-content"] [data-slot="select-item"]',
    );
    await expect(scopeOptions.filter({ hasText: 'Current chapter' })).toHaveCount(1, {
      timeout: 10_000,
    });
    await expect(scopeOptions.filter({ hasText: 'All books' })).toHaveCount(1);
  });

  test('Comments tab updates when the active project changes (PT-4069)', async ({ mainPage }) => {
    // Two openScriptureEditor calls on top of normal startup. 10 minutes is comfortable.
    test.setTimeout(600_000);
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);

    await createCommentThreads(projectA, ['GEN 1:1'], ['Project A unique comment text']);
    await createCommentThreads(projectB, ['GEN 1:1'], ['Project B unique comment text']);

    await waitForPapiMethodRegistered(
      'command:platformScriptureEditor.openScriptureEditor',
      DEFAULT_WEBSOCKET_PORT,
      SETTINGS_TIMEOUT_MS,
    );

    // Open Project A and wait for the dock rebuilds triggered by openOrUpdateRelatedPanels to
    // settle. The overlay intercepts pointer events while it is visible; clickCommentsTab fails
    // if called while a rebuild is in progress.
    await openScriptureEditor(projectA.projectId, DEFAULT_WEBSOCKET_PORT, OPEN_EDITOR_TIMEOUT_MS);
    await waitForOverlayGone(mainPage, 90_000);

    await clickCommentsTab(mainPage);
    await expect(
      mainPage.locator(`iframe[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`),
    ).toBeAttached({ timeout: 30_000 });
    const commentsFrame = commentsFrameLocator(mainPage);
    await expect(commentsFrame.locator('body')).toContainText('Project A unique comment text', {
      timeout: 90_000,
    });

    // Switch to Project B and wait for dock rebuilds to settle before asserting.
    await openScriptureEditor(projectB.projectId, DEFAULT_WEBSOCKET_PORT, OPEN_EDITOR_TIMEOUT_MS);
    await waitForOverlayGone(mainPage, 90_000);

    await expect(commentsFrame.locator('body')).toContainText('Project B unique comment text', {
      timeout: 90_000,
    });
    await expect(commentsFrame.locator('body')).not.toContainText('Project A unique comment text');
  });
});
