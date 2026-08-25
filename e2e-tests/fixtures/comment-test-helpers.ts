/**
 * Reusable helpers for comment-related E2E tests.
 *
 * ## Running the tests that use these helpers
 *
 * ```bash
 * npm run test:e2e:isolated -- e2e-tests/tests/isolated/comment-assignment/
 * ```
 *
 * ## Test project setup
 *
 * `createCommentTestProject` copies the bundled WEB project into a temp directory under the
 * Platform.Bible projects folder, gives it a unique random hex "Guid", and adds synthetic test
 * users so the "Assign to" dropdown is populated. Call `cleanupCommentTestProject` in `afterAll` to
 * remove the copy.
 *
 * ## Seeding comment threads
 *
 * `createCommentThreads` requests the Paratext PDPF (`platform.Paratext-pdpf`) for the project's
 * PDP, then calls `createComment` on that PDP via WebSocket to seed threads before the UI test
 * runs.
 *
 * ## User management
 *
 * `addUsersToProject` is imported from `helpers.ts`. It writes a `ProjectUserAccess.xml` file into
 * the temp project directory so Paratext Data returns the synthetic users from
 * `findAssignableUsers`.
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { expect, type FrameLocator, type Page } from '@playwright/test';
import { addUsersToProject, sendPapiRequestOnce, waitForPapiMethodRegistered } from './helpers';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Source WEB project bundled with the c-sharp assets */
const WEB_PROJECT_ASSETS_DIR = path.resolve(__dirname, '../../c-sharp/assets/WEB');

/**
 * Platform.Bible's Paratext 9 projects root. Must match the folder the app scans at startup —
 * `LocalParatextProjects`'s constructor hardcodes `~/.platform.bible/projects/Paratext 9 Projects`
 * (c-sharp/Projects/LocalParatextProjects.cs), where `UserProfile` === `os.homedir()`. The app
 * scans this folder exactly once at startup (there is no on-demand rescan), so a test project
 * written here is discoverable only if it exists before the app launches.
 */
const PARATEXT_PROJECTS_ROOT = path.join(
  os.homedir(),
  '.platform.bible',
  'projects',
  'Paratext 9 Projects',
);

/** Network object name for the Paratext project data provider factory */
const PARATEXT_PDPF_METHOD = 'object:platform.Paratext-pdpf.getProjectDataProviderId';

const DEFAULT_WEBSOCKET_PORT = 8876;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CommentTestProject {
  /** Unique project short name (folder name under PARATEXT_PROJECTS_ROOT) */
  shortName: string;
  /** Absolute path to the copied project directory */
  projectDir: string;
  /** 40-char hex "Guid" written into Settings.xml — used as the project ID in PAPI calls */
  projectId: string;
  /** Usernames added as team members (used to re-write ProjectUserAccess.xml after app start) */
  users: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Project setup / teardown
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates a disposable copy of the WEB project in the Platform.Bible projects folder and adds the
 * given users as team members so they appear in the "Assign to" dropdown.
 *
 * The copy receives a randomly generated 40-character hex "Guid" so Paratext Data can look it up
 * via `HexId.FromStr`. This avoids collisions with the real WEB project (or other test copies).
 *
 * @param users Usernames to add as project team members (e.g. ['Alice', 'Bob', 'Charlie'])
 * @returns Metadata about the created project
 */
export async function createCommentTestProject(users: string[]): Promise<CommentTestProject> {
  const shortName = `testComment_${Date.now()}`;
  const projectDir = path.join(PARATEXT_PROJECTS_ROOT, shortName);

  // 1. Copy the WEB project directory
  fs.cpSync(WEB_PROJECT_ASSETS_DIR, projectDir, { recursive: true });

  // 2. Generate a valid 40-char hex "Guid" so Paratext Data can look it up via HexId.FromStr.
  //    Using crypto.randomBytes(20) gives us 20 bytes → 40 hex chars, matching the SHA1-style
  //    format that Paratext projects use (e.g. "32664dc3288a28df2e2bb75ded887fc8f17a15fb").
  const projectId = crypto.randomBytes(20).toString('hex');

  // 3. Give the copy a unique short name and new "Guid" so it does not collide with existing projects
  const settingsXml = fs.readFileSync(path.join(projectDir, 'Settings.xml'), 'utf8');
  const updatedSettings = settingsXml
    .replace(/<Name>[^<]*<\/Name>/, `<Name>${shortName}</Name>`)
    .replace(/<Guid>[^<]*<\/Guid>/, `<Guid>${projectId}</Guid>`);
  fs.writeFileSync(path.join(projectDir, 'Settings.xml'), updatedSettings);

  // 4. Add test users by writing ProjectUserAccess.xml before the data provider opens the project.
  //    Also include every name from localUsers.txt so the current Paratext user (whose ScrText
  //    permissions are loaded at app startup) passes the HaveRoleNotObserver check.
  //    localUsers.txt lives in the project root and is written by Paratext Data; it contains one
  //    username per line.
  const localUsersFile = path.join(PARATEXT_PROJECTS_ROOT, 'localUsers.txt');
  const localUserNames = fs.existsSync(localUsersFile)
    ? fs
        .readFileSync(localUsersFile, 'utf8')
        .split('\n')
        .map((u) => u.trim())
        .filter(Boolean)
    : [];

  const allUsers = [...new Set([...users, ...localUserNames])];
  if (allUsers.length > 0) {
    addUsersToProject(projectDir, allUsers);
  }

  return { shortName, projectDir, projectId, users };
}

/**
 * Removes a test project created by {@link createCommentTestProject}. Call this in `afterAll`.
 *
 * No-ops on a falsy argument so a teardown can safely clean up every project even when an earlier
 * one in the same `beforeAll` failed to create (leaving its variable `undefined`) — otherwise the
 * first undefined would throw and abort teardown, leaking the already-created project directories
 * under `~/.platform.bible` where `LocalParatextProjects` would rediscover them on every later
 * run.
 */
export function cleanupCommentTestProject(project: CommentTestProject | undefined): void {
  if (!project) return;
  if (fs.existsSync(project.projectDir)) {
    fs.rmSync(project.projectDir, { recursive: true, force: true });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Thread seeding
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Creates comment threads in a project by calling the Paratext project data provider's
 * `createComment` method via WebSocket.
 *
 * Flow:
 *
 * 1. Wait for `platform.Paratext-pdpf` to register its `getProjectDataProviderId` method.
 * 2. Call `getProjectDataProviderId` to obtain (and lazily create) the PDP for the project.
 * 3. Wait for the PDP's `createComment` method to be registered.
 * 4. Call `createComment` once per thread.
 *
 * @param project The test project (from {@link createCommentTestProject})
 * @param verseRefs Verse references for each thread (e.g. ['GEN 1:1', 'GEN 1:2'])
 * @param contents Comment content strings in HTML format (one per thread)
 * @param port Optional WebSocket port (default 8876)
 * @returns Array of created thread IDs
 */
export async function createCommentThreads(
  project: CommentTestProject,
  verseRefs: string[],
  contents: string[],
  port?: number,
): Promise<string[]> {
  if (verseRefs.length !== contents.length) {
    throw new Error('verseRefs and contents arrays must have the same length');
  }

  const { projectId } = project;
  const resolvedPort = port ?? DEFAULT_WEBSOCKET_PORT;

  // 1. Wait for the Paratext PDPF to register getProjectDataProviderId
  await waitForPapiMethodRegistered(PARATEXT_PDPF_METHOD, resolvedPort, 60_000);

  // 2. Get (or lazily create) the PDP for this project.
  //    The C# factory calls projectID.ToUpperInvariant() internally, so case doesn't matter.
  //    It returns a name like "{30-random-uppercase-chars}-data".
  const pdpId = await sendPapiRequestOnce<string>(
    PARATEXT_PDPF_METHOD,
    [projectId],
    resolvedPort,
    30_000,
  );

  // 3. Wait for the PDP's createComment method to appear in rpc.discover
  await waitForPapiMethodRegistered(`object:${pdpId}.createComment`, resolvedPort, 60_000);

  // 4. Create each thread sequentially (the PDP is not safe to hammer in parallel)
  const threadIds: string[] = [];

  for (let i = 0; i < verseRefs.length; i++) {
    // The C# CreateComment method takes a PlatformCommentWrapper deserialized from JSON.
    // Required field: `contents` (HTML string). Optional but useful: `verseRef`.
    const commentId = await sendPapiRequestOnce<string>(
      `object:${pdpId}.createComment`,
      [{ contents: contents[i], verseRef: verseRefs[i] }],
      resolvedPort,
      10_000,
    );

    // The returned ID is in "threadId/userName/date" format — extract the thread portion.
    const threadId = commentId.split('/')[0];
    threadIds.push(threadId);
  }

  return threadIds;
}

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
 * 2. Calls `platformScriptureEditor.openScriptureEditor` to open the scripture editor and get its
 *    webViewId, then immediately calls `legacyCommentManager.openCommentList` with that webViewId.
 *    Both calls are retried together up to 5 times.
 *
 *    We do NOT wait for the editor _iframe_ to appear before opening the comment list. The editor
 *    webview is in rc-dock's `tempLayout` as soon as `openWebView` returns its ID, so
 *    `openCommentList` can usually find the editor and anchor its right-panel there. When a timing
 *    race causes `loadLayout(testLayout)` to win (see file TSDoc), `openCommentList` throws
 *    "unknown target tab"; the catch block returns `undefined` and the loop retries immediately on
 *    the next attempt, which succeeds once the race is resolved.
 * 3. Waits for the comment list iframe to appear in the UI before returning.
 */
export async function openCommentList(mainPage: Page, project: CommentTestProject): Promise<void> {
  // 1. Wait for the dock layout's initial loadLayout() to complete before opening any new webviews.
  //
  //    Why: `registerDockLayout` (called from the PlatformDockLayout `useEffect`) calls
  //    `loadLayout()` asynchronously. `loadLayout` calls `getDockLayout()` (an already-resolved
  //    promise), so its continuation is queued as a *microtask*. If `openScriptureEditor` also
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
    'command:platformScriptureEditor.openScriptureEditor',
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

  // Sequential retry loop: each attempt must await PAPI responses and iframe appearance before
  // deciding whether to retry, so awaits in the loop body are intentional. `continue` skips to the
  // next retry attempt on transient failures (race conditions with dock layout, missing iframes).
  /* eslint-disable no-await-in-loop, no-continue */
  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt > 0) {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1_000);
      });
    }

    // ── Phase A: open the editor and wait for its iframe ──────────────────────

    const editorId = await sendPapiRequestOnce<string | undefined>(
      'command:platformScriptureEditor.openScriptureEditor',
      [project.projectId],
      DEFAULT_WEBSOCKET_PORT,
      60_000,
    );

    if (!editorId) {
      console.warn(
        `[openCommentList] Attempt ${attempt + 1}: openScriptureEditor returned no webViewId`,
      );
      continue;
    }

    finalEditorWebViewId = editorId;

    const editorTimeout = attempt < 4 ? 8_000 : 20_000;
    const editorIframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${finalEditorWebViewId}"]`)
      .waitFor({ state: 'attached', timeout: editorTimeout })
      .then(() => true)
      .catch(() => false);

    if (!editorIframeFound) {
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
    const iframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${commentListWebViewId}"]`)
      .waitFor({ state: 'attached', timeout: clTimeout })
      .then(() => true)
      .catch(() => false);

    if (!iframeFound) {
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
    await mainPage
      .frameLocator(`iframe[data-web-view-id="${commentListWebViewId}"]`)
      .locator('body')
      .waitFor({ timeout: 10_000 });
    return;
  }
  /* eslint-enable no-await-in-loop, no-continue */

  throw new Error(`Failed to open comment list after 5 attempts for project ${project.shortName}`);
}

/** Returns the frame locator for the comment list web view iframe. */
export function getCommentListFrame(mainPage: Page): FrameLocator {
  // The comment list iframe has title "Comments: {shortName}"; the scripture editor iframe has
  // title "{shortName} " (trailing space). Use title^="Comments:" to match only the comment list.
  return mainPage.frameLocator('iframe[title^="Comments:"]');
}

/** Expands (or collapses) a comment thread by clicking its container element. */
export async function expandThread(frame: FrameLocator, threadId: string): Promise<void> {
  // Use role="option" to match the CommentThread Card, not the wrapper div (both share the id).
  await frame.locator(`[role="option"][id="${threadId}"]`).click();
}

/**
 * Asserts that the pending-assignment indicator for a thread shows the expected user name. The
 * component renders a `<span>` containing "Assigning to: {user}" when an assignee is pre-selected.
 */
export async function expectAssigningTo(
  frame: FrameLocator,
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
export async function assignUserAndSubmit(
  frame: FrameLocator,
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
