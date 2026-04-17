/**
 * E2E tests for PT-3878: The "Assign to" dropdown in the comment editor should pre-select the last
 * user assigned in the same session.
 *
 * ## Test approach
 *
 * These tests exercise the behavior via the **comment list reply flow** (expanding a thread and
 * assigning a user) rather than the scripture editor text-selection flow. Both flows share the same
 * `lastAssignedUser` memory via `CommentList`, so testing via the comment list is sufficient to
 * verify the feature end-to-end without the complexity of scripture editor text selection.
 *
 * ## Worker-scoped Electron instance
 *
 * The `comment.fixture` uses a **worker-scoped** Electron app so all tests in a describe block
 * share one Electron instance. This avoids a known issue where the **second** Electron instance
 * launched against the webpack renderer dev server fails to render new dock tabs:
 * `openResourceViewer` returns a webview ID but the editor iframe never appears in the DOM (only
 * the Home tab renders). The root cause is outside the renderer — reloading the page with cleared
 * localStorage does not help — and appears related to the dev server's HMR WebSocket state after
 * the first instance is SIGKILL'd. Sharing one instance sidesteps the issue entirely.
 *
 * ## Prerequisites
 *
 * The test requires a project with **multiple assignable users** so the "Assign to" dropdown is
 * populated. `createCommentTestProject` in comment-test-helpers.ts writes a `ProjectUserAccess.xml`
 * into the temp project directory so Paratext Data returns the synthetic users from
 * `findAssignableUsers`.
 */

import { test, expect } from '../../../fixtures/comment.fixture';
import {
  waitForAppReady,
  waitForPapiMethodRegistered,
  sendPapiRequestOnce,
} from '../../../fixtures/helpers';
import {
  createCommentTestProject,
  cleanupCommentTestProject,
  createCommentThreads,
  CommentTestProject,
} from '../../../fixtures/comment-test-helpers';

const DEFAULT_WEBSOCKET_PORT = 8876;

// ─────────────────────────────────────────────────────────────────────────────
// Navigation helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Opens the comment list for a project using PAPI commands directly.
 *
 * This bypasses the slow Platform menu → Home view → editor UI navigation path. Instead it:
 *
 * 1. Waits for the dock layout's `loadLayout()` to complete (signalled by the first iframe — the Home
 *    webview — appearing). This prevents a race where `addWebViewToDock` runs before
 *    `loadLayout(testLayout)`, causing `loadLayout` to wipe the newly added editor tab.
 * 2. Calls `platformScriptureEditor.openResourceViewer` to open the scripture editor and get its
 *    webViewId, then immediately calls `legacyCommentManager.openCommentList` with that webViewId.
 *    Both calls are retried together up to 5 times.
 *
 *    We do NOT wait for the editor _iframe_ to appear before opening the comment list. The editor
 *    webview is in rc-dock's `tempLayout` as soon as `openWebView` returns its ID, so
 *    `openCommentList` can usually find the editor and anchor its right-panel there. When a timing
 *    race causes `loadLayout(testLayout)` to win (see file JSDoc), `openCommentList` throws
 *    "unknown target tab"; the catch block returns `undefined` and the loop retries immediately on
 *    the next attempt, which succeeds once the race is resolved.
 * 3. Waits for the comment list iframe to appear in the UI before returning.
 */
async function openCommentList(
  mainPage: Parameters<Parameters<typeof test>[1]>[0]['mainPage'],
  project: CommentTestProject,
): Promise<void> {
  // 1. Wait for the dock layout's initial loadLayout() to complete before opening any new webviews.
  //
  //    Why: `registerDockLayout` (called from the PlatformDockLayout `useEffect`) calls
  //    `loadLayout()` asynchronously. `loadLayout` calls `getDockLayout()` (an already-resolved
  //    promise), so its continuation is queued as a *microtask*. If `openResourceViewer` also
  //    resolves `getDockLayout()` around the same time — which happens when the PDP is cached and
  //    the extension-host round-trip is fast — `addWebViewToDock` can run *before* `loadLayout`'s
  //    `dockLayout.loadLayout(testLayout)` does. Then `loadLayout` wipes the newly added editor
  //    tab, leaving only the Home tab in the layout.
  //
  //    After `loadLayout` completes, at least one iframe (the Home webview) is attached to the DOM.
  //    Waiting for that iframe guarantees `loadLayout` has finished and won't overwrite our tab.
  await mainPage.waitForSelector('iframe', { state: 'attached', timeout: 30_000 });

  // 2. Pre-register both commands so individual PAPI calls don't time out while waiting.
  await waitForPapiMethodRegistered(
    'command:platformScriptureEditor.openResourceViewer',
    DEFAULT_WEBSOCKET_PORT,
    30_000,
  );
  await waitForPapiMethodRegistered(
    'command:legacyCommentManager.openCommentList',
    DEFAULT_WEBSOCKET_PORT,
    30_000,
  );

  // 3. Open the editor, wait for its iframe, then open the comment list.
  //
  //    Phase A — open editor, wait for editor iframe in DOM.
  //    Phase B — open comment list anchored to editor, wait for comment list iframe in DOM.
  //
  //    Retries both phases together; if the editor iframe doesn't appear, a fresh editor is
  //    requested. The main.ts cache-invalidation fix ensures each retry creates a fresh comment
  //    list webview when the previous one is gone.
  let finalEditorWebViewId: string | undefined;

  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt > 0) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1_000);
      });
    }

    // ── Phase A: open the editor and wait for its iframe ──────────────────────

    // eslint-disable-next-line no-await-in-loop
    const editorId = await sendPapiRequestOnce<string | undefined>(
      'command:platformScriptureEditor.openResourceViewer',
      [project.projectId],
      DEFAULT_WEBSOCKET_PORT,
      60_000,
    );

    if (!editorId) {
      console.warn(
        `[openCommentList] Attempt ${attempt + 1}: openResourceViewer returned no webViewId`,
      );
      continue;
    }

    finalEditorWebViewId = editorId;

    const editorTimeout = attempt < 4 ? 8_000 : 20_000;
    // eslint-disable-next-line no-await-in-loop
    const editorIframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${finalEditorWebViewId}"]`)
      .waitFor({ state: 'attached', timeout: editorTimeout })
      .then(() => true)
      .catch(() => false);

    if (!editorIframeFound) {
      // eslint-disable-next-line no-await-in-loop
      const allIframes = await mainPage.locator('iframe').evaluateAll((iframes) =>
        iframes.map((f) => ({
          id: f.getAttribute('data-web-view-id'),
          title: f.getAttribute('title'),
        })),
      );
      console.warn(
        `[openCommentList] Attempt ${attempt + 1}: editor iframe ` +
          `(data-web-view-id="${finalEditorWebViewId}") did not appear within ` +
          `${editorTimeout}ms. Iframes in DOM: ${JSON.stringify(allIframes)}`,
      );
      continue;
    }

    // ── Phase B: open the comment list and wait for its iframe ────────────────

    // eslint-disable-next-line no-await-in-loop
    const commentListWebViewId = await sendPapiRequestOnce<string | undefined>(
      'command:legacyCommentManager.openCommentList',
      [finalEditorWebViewId],
      DEFAULT_WEBSOCKET_PORT,
      30_000,
    ).catch((e: unknown) => {
      console.warn(`[openCommentList] Attempt ${attempt + 1}: openCommentList threw: ${e}`);
      return undefined;
    });

    if (!commentListWebViewId) {
      console.warn(
        `[openCommentList] Attempt ${attempt + 1}: openCommentList returned no webViewId for ` +
          `editor ${finalEditorWebViewId}`,
      );
      continue;
    }

    const clTimeout = attempt < 4 ? 8_000 : 20_000;
    // eslint-disable-next-line no-await-in-loop
    const iframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${commentListWebViewId}"]`)
      .waitFor({ state: 'attached', timeout: clTimeout })
      .then(() => true)
      .catch(() => false);

    if (!iframeFound) {
      // eslint-disable-next-line no-await-in-loop
      const allIframes = await mainPage.locator('iframe').evaluateAll((iframes) =>
        iframes.map((f) => ({
          id: f.getAttribute('data-web-view-id'),
          title: f.getAttribute('title'),
        })),
      );
      console.warn(
        `[openCommentList] Attempt ${attempt + 1}: comment list iframe ` +
          `(data-web-view-id="${commentListWebViewId}") did not appear within ${clTimeout}ms. ` +
          `Iframes in DOM: ${JSON.stringify(allIframes)}`,
      );
      continue;
    }

    // iframe found — now also wait for its body to be visible (fully loaded).
    // eslint-disable-next-line no-await-in-loop
    await mainPage
      .frameLocator(`iframe[data-web-view-id="${commentListWebViewId}"]`)
      .locator('body')
      .waitFor({ timeout: 10_000 });
    return;
  }

  throw new Error(`Failed to open comment list after 5 attempts for project ${project.shortName}`);
}

/** Returns the frame locator for the comment list web view iframe. */
function getCommentListFrame(mainPage: Parameters<Parameters<typeof test>[1]>[0]['mainPage']) {
  // The comment list iframe has title "Comments: {shortName}"; the scripture editor iframe has
  // title "{shortName} " (trailing space). Use title^="Comments:" to match only the comment list.
  return mainPage.frameLocator('iframe[title^="Comments:"]');
}

/** Expands (or collapses) a comment thread by clicking its container element. */
async function expandThread(
  frame: ReturnType<typeof getCommentListFrame>,
  threadId: string,
): Promise<void> {
  // Use role="option" to match the CommentThread Card, not the wrapper div (both share the id).
  await frame.locator(`[role="option"][id="${threadId}"]`).click();
}

/**
 * Asserts that the pending-assignment indicator for a thread shows the expected user name. The
 * component renders a `<span>` containing "Assigning to: {user}" when an assignee is pre-selected.
 */
async function expectAssigningTo(
  frame: ReturnType<typeof getCommentListFrame>,
  threadId: string,
  username: string,
): Promise<void> {
  // Use role="option" to match the CommentThread Card, not the wrapper div (both share the id).
  const threadLocator = frame.locator(`[role="option"][id="${threadId}"]`);
  // CommentThread renders <span>"Assigning to: {user}"</span> when pendingCommentAssignedUser is
  // set. The built-in retry in toContainText gives the React effect time to fire.
  const assignSpan = threadLocator.locator('span').filter({ hasText: /Assigning to:/i });
  await expect(assignSpan).toContainText(username);
}

/** Selects a user from the "Assign to" popover and submits the reply. */
async function assignUserAndSubmit(
  frame: ReturnType<typeof getCommentListFrame>,
  threadId: string,
  username: string,
): Promise<void> {
  // Use role="option" to match the CommentThread Card, not the wrapper div (both share the id).
  const threadLocator = frame.locator(`[role="option"][id="${threadId}"]`);

  // The assign button contains an AtSign SVG icon — locate by aria-label, not text content.
  const assignButton = threadLocator.locator('button[aria-label="Assign user"]');
  await assignButton.click();

  // Select the user from the command list popover. Use [cmdk-item] to avoid matching
  // CommentThread cards (which also have role="option" and may contain the username text
  // if the user was previously assigned to another thread).
  await frame.locator('[cmdk-item][role="option"]', { hasText: username }).click();

  // Wait for the "Assigning to:" span to appear — confirms setPendingCommentAssignedUser(user)
  // ran synchronously from the popover click. Without this, not.toBeVisible below passes
  // immediately (the span is conditionally rendered and may never have existed), which means
  // submit fires before the async PAPI call completes and setLastAssignedUser is never called.
  const assignSpan = threadLocator.locator('span').filter({ hasText: /Assigning to:/i });
  await expect(assignSpan).toBeVisible({ timeout: 5_000 });

  // Submit (assignment only — no comment text required).
  await threadLocator.locator('button[aria-label="Submit comment"]').click();

  // Wait for the "Assigning to:" span to disappear. This confirms that:
  // 1. handleAddCommentToThread (an async PAPI call) has completed.
  // 2. setPendingCommentAssignedUser(undefined) was called in CommentThread.
  // 3. setLastAssignedUser(assignedUser) was called in CommentList.
  // 4. All threads have re-rendered with the updated initialAssignedUser.
  // Without this wait, the next expandThread call races against the async submission
  // and the pre-selection effect may fire before lastAssignedUser is updated.
  await expect(assignSpan).not.toBeVisible({ timeout: 15_000 });
}

// ─────────────────────────────────────────────────────────────────────────────
// Test suite
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Comment last-assignee persistence (PT-3878)', () => {
  let project: CommentTestProject;

  const TEST_USERS = ['Alice', 'Bob', 'Charlie'];
  const VERSE_REFS = ['GEN 1:1', 'GEN 1:2', 'GEN 1:3'];

  test.beforeAll(async () => {
    // Create the project directory with test users before the app starts.
    // createCommentThreads is NOT called here — it requires the app's WebSocket server
    // (port 8876), which is only available after the isolated fixture launches Electron.
    project = await createCommentTestProject(TEST_USERS);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  test('pre-selects the last assigned user when opening the next comment thread', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Seed comment threads now that the app (and Paratext PDPF) is running.
    const threadIds = await createCommentThreads(project, VERSE_REFS, [
      'First comment thread',
      'Second comment thread',
      'Third comment thread',
    ]);

    await openCommentList(mainPage, project);

    const frame = getCommentListFrame(mainPage);

    // ── Thread 1: assign to Alice ───────────────────────────────────────
    await expandThread(frame, threadIds[0]);
    await assignUserAndSubmit(frame, threadIds[0], 'Alice');

    // ── Thread 2: verify Alice is pre-selected ──────────────────────────
    await expandThread(frame, threadIds[1]);
    await expectAssigningTo(frame, threadIds[1], 'Alice');

    // ── Thread 2: change to Bob and submit ─────────────────────────────
    await assignUserAndSubmit(frame, threadIds[1], 'Bob');

    // ── Thread 3: verify Bob is pre-selected ───────────────────────────
    await expandThread(frame, threadIds[2]);
    await expectAssigningTo(frame, threadIds[2], 'Bob');
  });

  test('resets to the last assignee when a thread is collapsed and re-expanded', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Seed comment threads now that the app is running.
    const threadIds = await createCommentThreads(project, VERSE_REFS, [
      'First comment thread',
      'Second comment thread',
      'Third comment thread',
    ]);

    await openCommentList(mainPage, project);

    const frame = getCommentListFrame(mainPage);

    // Assign Alice on thread 1.
    await expandThread(frame, threadIds[0]);
    await assignUserAndSubmit(frame, threadIds[0], 'Alice');

    // Open thread 2, collapse it, re-open it — should still pre-select Alice.
    await expandThread(frame, threadIds[1]);
    await expandThread(frame, threadIds[1]); // collapse
    await expandThread(frame, threadIds[1]); // re-open

    await expectAssigningTo(frame, threadIds[1], 'Alice');
  });
});
