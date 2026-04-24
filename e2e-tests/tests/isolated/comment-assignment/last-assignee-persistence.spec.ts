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

import { test } from '../../../fixtures/comment.fixture';
import { waitForAppReady } from '../../../fixtures/helpers';
import {
  type CommentTestProject,
  createCommentTestProject,
  cleanupCommentTestProject,
  createCommentThreads,
  openCommentList,
  getCommentListFrame,
  expandThread,
  expectAssigningTo,
  assignUserAndSubmit,
} from '../../../fixtures/comment-test-helpers';

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
