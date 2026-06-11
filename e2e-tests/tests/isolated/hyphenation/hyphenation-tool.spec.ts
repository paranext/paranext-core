/**
 * E2E tests for the Hyphenation tool (PT9 feature 5.6 port).
 *
 * ## Test approach
 *
 * A disposable copy of the bundled WEB project is created with a pre-seeded `hyphenatedWords.txt`
 * (PT9 file format). The tests open a scripture editor for the project, open the Hyphenation tool
 * from it, and exercise the main user flow: view entries, add a word with hyphenation, toggle
 * approval, and delete — asserting both the UI state and the on-disk `hyphenatedWords.txt`
 * round-trip (the file is the contract shared with PT9 and Publishing Assistant).
 *
 * ## Opening via command instead of menu
 *
 * The tool is opened with `command:platformScripture.openHyphenation` (passing the editor's
 * webViewId) rather than clicking through the editor's Tools menu. This mirrors the established
 * `openCommentList` pattern in comment-test-helpers.ts: dock/menu navigation across iframes is
 * flaky in CI, and the menu entry's wiring (menus.json → command) is verified by the live
 * verification evidence in the PR. The command is the exact handler the menu item invokes.
 *
 * ## Fixture reuse
 *
 * Reuses `comment.fixture` (worker-scoped isolated Electron app) and `createCommentTestProject`
 * (disposable WEB project copy). Despite the "comment" naming, both are generic: the fixture
 * launches a clean app instance and the helper clones the bundled WEB project with a fresh GUID.
 *
 * ## Running
 *
 * ```bash
 * npm run test:e2e:isolated -- e2e-tests/tests/isolated/hyphenation/
 * ```
 */

import fs from 'fs';
import path from 'path';
import { expect, type FrameLocator, type Page } from '@playwright/test';
import { test } from '../../../fixtures/comment.fixture';
import {
  sendPapiRequestOnce,
  waitForAppReady,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';
import {
  type CommentTestProject,
  createCommentTestProject,
  cleanupCommentTestProject,
} from '../../../fixtures/comment-test-helpers';

const DEFAULT_WEBSOCKET_PORT = 8876;

/**
 * PT9-format hyphenation file seeded into the test project: one approved (starred) entry and one
 * guess entry. Format matches ParatextData's HyphenationData.Write output.
 */
const SEED_HYPHENATION_FILE =
  '#Hyphenated Word List v2.0\r\n' +
  '#You may edit words and force them to stay as you edit them by putting an * in front of the line.\r\n' +
  '#Special equate lines used by Publishing Assistant\r\n' +
  'HardHyphen = "-"\r\n' +
  'SoftHyphen = "="\r\n' +
  'SoftHyphenOut = "­"\r\n' +
  'HyphenatedMarkers = "p q"\r\n' +
  '*hel=lo\r\n' +
  'world\r\n';

/** Reads the current content of the test project's hyphenatedWords.txt */
function readHyphenationFile(project: CommentTestProject): string {
  const filePath = path.join(project.projectDir, 'hyphenatedWords.txt');
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

/**
 * Opens a scripture editor for the project, then opens the Hyphenation tool anchored to it. Modeled
 * on `openCommentList` in comment-test-helpers.ts (see its TSDoc for the retry rationale).
 */
async function openHyphenationTool(mainPage: Page, project: CommentTestProject): Promise<void> {
  // Wait for the dock layout's initial loadLayout() to complete before opening any new webviews
  // (see openCommentList step 1 for the race explanation)
  await mainPage.waitForSelector('iframe', { state: 'attached', timeout: 30_000 });

  await waitForPapiMethodRegistered(
    'command:platformScriptureEditor.openResourceViewer',
    DEFAULT_WEBSOCKET_PORT,
    30_000,
  );
  await waitForPapiMethodRegistered(
    'command:platformScripture.openHyphenation',
    DEFAULT_WEBSOCKET_PORT,
    30_000,
  );

  // Sequential retry loop: each attempt must await PAPI responses and iframe appearance before
  // deciding whether to retry (transient dock-layout races), so awaits in the loop are intentional.
  /* eslint-disable no-await-in-loop, no-continue */
  for (let attempt = 0; attempt < 5; attempt++) {
    if (attempt > 0) {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1_000);
      });
    }

    // ── Phase A: open the editor and wait for its iframe ──────────────────────
    const editorId = await sendPapiRequestOnce<string | undefined>(
      'command:platformScriptureEditor.openResourceViewer',
      [project.projectId],
      DEFAULT_WEBSOCKET_PORT,
      60_000,
    );

    if (!editorId) {
      console.warn(
        `[openHyphenationTool] Attempt ${attempt + 1}: openResourceViewer returned no webViewId`,
      );
      continue;
    }

    const editorTimeout = attempt < 4 ? 8_000 : 20_000;
    const editorIframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${editorId}"]`)
      .waitFor({ state: 'attached', timeout: editorTimeout })
      .then(() => true)
      .catch(() => false);

    if (!editorIframeFound) {
      console.warn(
        `[openHyphenationTool] Attempt ${attempt + 1}: editor iframe did not appear within ` +
          `${editorTimeout}ms`,
      );
      continue;
    }

    // ── Phase B: open the Hyphenation tool and wait for its iframe ────────────
    const hyphenationWebViewId = await sendPapiRequestOnce<string | undefined>(
      'command:platformScripture.openHyphenation',
      [editorId],
      DEFAULT_WEBSOCKET_PORT,
      30_000,
    ).catch((e: unknown) => {
      console.warn(`[openHyphenationTool] Attempt ${attempt + 1}: openHyphenation threw: ${e}`);
      return undefined;
    });

    if (!hyphenationWebViewId) {
      console.warn(
        `[openHyphenationTool] Attempt ${attempt + 1}: openHyphenation returned no webViewId ` +
          `for editor ${editorId}`,
      );
      continue;
    }

    const toolTimeout = attempt < 4 ? 8_000 : 20_000;
    const iframeFound = await mainPage
      .locator(`iframe[data-web-view-id="${hyphenationWebViewId}"]`)
      .waitFor({ state: 'attached', timeout: toolTimeout })
      .then(() => true)
      .catch(() => false);

    if (!iframeFound) {
      console.warn(
        `[openHyphenationTool] Attempt ${attempt + 1}: hyphenation iframe did not appear within ` +
          `${toolTimeout}ms`,
      );
      continue;
    }

    await mainPage
      .frameLocator(`iframe[data-web-view-id="${hyphenationWebViewId}"]`)
      .locator('body')
      .waitFor({ timeout: 10_000 });
    return;
  }
  /* eslint-enable no-await-in-loop, no-continue */

  throw new Error(
    `Failed to open the Hyphenation tool after 5 attempts for project ${project.shortName}`,
  );
}

/** Returns the frame locator for the Hyphenation tool web view iframe. */
function getHyphenationFrame(mainPage: Page): FrameLocator {
  // The Hyphenation tool iframe title is "Hyphenation: {projectName}"
  return mainPage.frameLocator('iframe[title^="Hyphenation:"]');
}

/** Returns the table row containing the given word. */
function getRowForWord(frame: FrameLocator, word: string) {
  return frame.locator('tr', { has: frame.locator(`td:has-text("${word}")`).first() }).first();
}

test.describe('Hyphenation tool (PT9 feature 5.6)', () => {
  let project: CommentTestProject;

  test.beforeAll(async () => {
    // Create a disposable WEB project copy and seed a PT9-format hyphenation file before the app
    // reads it for the first time
    project = await createCommentTestProject([]);
    fs.writeFileSync(path.join(project.projectDir, 'hyphenatedWords.txt'), SEED_HYPHENATION_FILE);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  test('shows seeded PT9 entries, adds a word, toggles approval, and round-trips the file', async ({
    mainPage,
  }) => {
    test.setTimeout(180_000);
    await waitForAppReady(mainPage);

    await openHyphenationTool(mainPage, project);
    const frame = getHyphenationFrame(mainPage);

    // ── View: the seeded PT9 entries are listed with their approval state ──────
    await expect(frame.getByText('hel=lo')).toBeVisible({ timeout: 30_000 });
    await expect(frame.getByText('world').first()).toBeVisible();

    const helloRow = getRowForWord(frame, 'hello');
    const worldRow = getRowForWord(frame, 'world');
    await expect(helloRow.getByRole('checkbox')).toBeChecked();
    await expect(worldRow.getByRole('checkbox')).not.toBeChecked();

    // ── Add: a new word with hyphenation points via the Add dialog ────────────
    await frame.getByRole('button', { name: /Add word/i }).click();
    await expect(frame.getByRole('dialog')).toBeVisible();
    await frame.getByLabel('Word', { exact: true }).fill('Testword');
    await frame.getByLabel('Hyphenation', { exact: true }).fill('Test=word');
    await frame.getByRole('button', { name: 'Save' }).click();
    await expect(frame.getByRole('dialog')).not.toBeVisible();

    // The word is stored lowercase (PT9 behavior) and listed as approved
    await expect(frame.getByText('test=word')).toBeVisible({ timeout: 15_000 });
    const testwordRow = getRowForWord(frame, 'testword');
    await expect(testwordRow.getByRole('checkbox')).toBeChecked();

    // The on-disk file now contains the new entry as an approved (starred) line in PT9 format
    await expect(() => {
      const fileContent = readHyphenationFile(project);
      expect(fileContent).toContain('*test=word\r\n');
      expect(fileContent).toContain('#Hyphenated Word List v2.0');
    }).toPass({ timeout: 15_000 });

    // ── Toggle approval: unapprove "hello" (PT9: convert approved entry to guess) ──
    await helloRow.getByRole('checkbox').click();
    await expect(helloRow.getByRole('checkbox')).not.toBeChecked({ timeout: 15_000 });
    await expect(() => {
      const fileContent = readHyphenationFile(project);
      expect(fileContent).toContain('hel=lo\r\n');
      expect(fileContent).not.toContain('*hel=lo');
    }).toPass({ timeout: 15_000 });

    // ── Delete: remove "world" entirely (PT9: obliterate hyphenation) ─────────
    await worldRow.getByRole('button', { name: 'Delete' }).click();
    await expect(frame.getByText('world')).not.toBeVisible({ timeout: 15_000 });
    await expect(() => {
      expect(readHyphenationFile(project)).not.toContain('world');
    }).toPass({ timeout: 15_000 });
  });

  test('rejects an invalid hyphenation in the add dialog (PT9 validation rule)', async ({
    mainPage,
  }) => {
    test.setTimeout(120_000);
    await waitForAppReady(mainPage);

    await openHyphenationTool(mainPage, project);
    const frame = getHyphenationFrame(mainPage);

    await frame.getByRole('button', { name: /Add word/i }).click();
    await expect(frame.getByRole('dialog')).toBeVisible();
    await frame.getByLabel('Word', { exact: true }).fill('example');
    await frame.getByLabel('Hyphenation', { exact: true }).fill('ex=apmle');

    // PT9 message: "Hyphenation must be done with '=' character and match original word"
    await expect(frame.getByText(/Hyphenation must be done with/i)).toBeVisible();
    await expect(frame.getByRole('button', { name: 'Save' })).toBeDisabled();

    // Fix the hyphenation — the error clears and Save enables
    await frame.getByLabel('Hyphenation', { exact: true }).fill('ex=am=ple');
    await expect(frame.getByText(/Hyphenation must be done with/i)).not.toBeVisible();
    await expect(frame.getByRole('button', { name: 'Save' })).toBeEnabled();

    // Cancel without saving — no entry is added
    await frame.getByRole('button', { name: 'Cancel' }).click();
    await expect(frame.getByRole('dialog')).not.toBeVisible();
    await expect(frame.getByText('ex=am=ple')).not.toBeVisible();
  });
});
