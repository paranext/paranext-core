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
 */
async function clickCommentsTab(mainPage: Page): Promise<void> {
  const tabTitle = mainPage.locator(
    `.platform-tab-title[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`,
  );
  if (await tabTitle.isVisible()) {
    await tabTitle.click();
    return;
  }
  // Tab is outside the visible scroll area — open the overflow dropdown and activate it.
  const dockBar = mainPage.locator('.dock-bar').filter({ has: tabTitle });
  await dockBar.locator('.dock-nav-more').hover();
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

  test.beforeAll(async () => {
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
    await waitForSimpleLayout(mainPage);
    // The UUID-based locator confirms the tab is in the DOM regardless of scroll position.
    await expect(
      mainPage.locator(`.platform-tab-title[data-web-view-id="${COMMENT_LIST_PANEL_UUID}"]`),
    ).toBeAttached();
  });

  test('selecting the Comments tab displays the panel', async ({ mainPage }) => {
    await waitForAppReady(mainPage, 180_000);
    await waitForSimpleLayout(mainPage);

    await clickCommentsTab(mainPage);

    const commentsFrame = commentsFrameLocator(mainPage);
    await commentsFrame.locator('body').waitFor({ state: 'attached', timeout: 15_000 });
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
