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
 * Platform.Bible projects folder, gives it a unique random hex GUID, and adds synthetic test users
 * so the "Assign to" dropdown is populated. Call `cleanupCommentTestProject` in `afterAll` to
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
import { addUsersToProject, sendPapiRequestOnce, waitForPapiMethodRegistered } from './helpers';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Source WEB project bundled with the c-sharp assets */
const WEB_PROJECT_ASSETS_DIR = path.resolve(__dirname, '../../c-sharp/assets/WEB');

/** Platform.Bible's Paratext 9 projects root (matches LocalParatextProjects constructor) */
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
  /** 40-char hex GUID written into Settings.xml — used as the project ID in PAPI calls */
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
 * The copy receives a randomly generated 40-character hex GUID so Paratext Data can look it up via
 * `HexId.FromStr`. This avoids collisions with the real WEB project (or other test copies).
 *
 * @param users Usernames to add as project team members (e.g. ['Alice', 'Bob', 'Charlie'])
 * @returns Metadata about the created project
 */
export async function createCommentTestProject(users: string[]): Promise<CommentTestProject> {
  const shortName = `testComment_${Date.now()}`;
  const projectDir = path.join(PARATEXT_PROJECTS_ROOT, shortName);

  // 1. Copy the WEB project directory
  fs.cpSync(WEB_PROJECT_ASSETS_DIR, projectDir, { recursive: true });

  // 2. Generate a valid 40-char hex GUID so Paratext Data can look it up via HexId.FromStr.
  //    Using crypto.randomBytes(20) gives us 20 bytes → 40 hex chars, matching the SHA1-style
  //    format that Paratext projects use (e.g. "32664dc3288a28df2e2bb75ded887fc8f17a15fb").
  const projectId = crypto.randomBytes(20).toString('hex');

  // 3. Give the copy a unique short name and new GUID so it does not collide with existing projects
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

/** Removes a test project created by {@link createCommentTestProject}. Call this in `afterAll`. */
export function cleanupCommentTestProject(project: CommentTestProject): void {
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
