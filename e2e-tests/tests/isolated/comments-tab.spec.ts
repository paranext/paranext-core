/**
 * E2E tests for PT-4068 / PT-4069: Comments tab in Column 3 of P10 Simple mode.
 *
 * Tests verify:
 *
 * - The "Comments" tab is visible in Column 3 in Simple mode (English)
 * - Selecting the tab renders the comment-list panel
 * - When a project with comments is open, at least one comment is visible
 * - The Spanish tab label differs from English, is distinct from other Column 3 tabs, and uses
 *   sentence case
 * - When the active project changes, the Comments tab updates
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

/** Switch the app to English + Simple mode and wait for the Comments tab to appear. */
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
  // Wait for the Comments tab to appear (confirms dock reloaded with simple layout)
  await expect(mainPage.locator('.dock-tab', { hasText: /^Comments$/ })).toBeVisible({
    timeout: 30_000,
  });
}

test.describe('Comments tab in P10 Simple mode (PT-4068 / PT-4069)', () => {
  let project: CommentTestProject;

  test.beforeAll(async () => {
    // Create test project before app starts (file system only, no WebSocket needed yet)
    project = await createCommentTestProject([]);
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  test('Comments tab is visible in Column 3 in the English UI', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await switchToSimpleModeEnglish(mainPage);

    await expect(mainPage.locator('.dock-tab', { hasText: /^Comments$/ })).toBeVisible();
  });

  test('selecting the Comments tab displays the panel', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    await switchToSimpleModeEnglish(mainPage);

    await mainPage.locator('.dock-tab', { hasText: /^Comments$/ }).click();

    // The Comments panel is an iframe; wait for its body to be attached
    const commentsFrame = mainPage.frameLocator('iframe[title="Comments"]');
    await commentsFrame.locator('body').waitFor({ state: 'attached', timeout: 15_000 });
  });

  test('when a project has comments, at least one is visible in the Comments tab', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
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
      PAPI_REQUEST_TIMEOUT_MS,
    );

    // Click the Comments tab
    await mainPage.locator('.dock-tab', { hasText: /^Comments$/ }).click();

    // Verify at least the seeded comment content is visible
    const commentsFrame = mainPage.frameLocator('iframe[title="Comments"]');
    await expect(commentsFrame.locator('body')).toContainText('Visible comment for PT-4068 test', {
      timeout: 20_000,
    });
  });

  test('Spanish tab label differs from English, is distinct from other Column 3 tabs, and uses sentence case', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await switchToSimpleModeEnglish(mainPage);

    // Switch to Spanish locale
    await sendPapiRequestOnce(
      SETTINGS_SET_METHOD,
      ['platform.interfaceLanguage', ['es']],
      DEFAULT_WEBSOCKET_PORT,
      PAPI_REQUEST_TIMEOUT_MS,
    );

    // Wait for the English "Comments" tab to disappear (dock has re-rendered in Spanish)
    await expect(mainPage.locator('.dock-tab', { hasText: /^Comments$/ })).not.toBeVisible({
      timeout: 15_000,
    });

    // Locate Column 3's tab bar using the known Spanish Commentaries label "Comentario bíblico"
    // as a stable anchor. This avoids hardcoding our new label.
    const col3TabBar = mainPage.locator('.dock-bar').filter({
      has: mainPage.locator('.dock-tab', { hasText: 'Comentario bíblico' }),
    });
    await expect(col3TabBar).toBeVisible({ timeout: 15_000 });

    // Column 3 should now have 3 tabs (Bible Texts, Commentaries, Comments — all in Spanish)
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
    await waitForAppReady(mainPage);
    await switchToSimpleModeEnglish(mainPage);

    // Create two independent projects, each with a distinct comment
    const projectA = await createCommentTestProject([]);
    const projectB = await createCommentTestProject([]);

    try {
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
        PAPI_REQUEST_TIMEOUT_MS,
      );

      // Click the Comments tab and verify Project A's comment is visible
      await mainPage.locator('.dock-tab', { hasText: /^Comments$/ }).click();
      const commentsFrame = mainPage.frameLocator('iframe[title="Comments"]');
      await expect(commentsFrame.locator('body')).toContainText('Project A unique comment text', {
        timeout: 20_000,
      });

      // Switch to Project B — triggers openOrUpdateRelatedPanels(projectB.projectId)
      await sendPapiRequestOnce(
        'command:platformScriptureEditor.openResourceViewer',
        [projectB.projectId],
        DEFAULT_WEBSOCKET_PORT,
        PAPI_REQUEST_TIMEOUT_MS,
      );

      // Comments tab should now show Project B's comments
      await expect(commentsFrame.locator('body')).toContainText('Project B unique comment text', {
        timeout: 20_000,
      });
      // And no longer show Project A's
      await expect(commentsFrame.locator('body')).not.toContainText(
        'Project A unique comment text',
      );
    } finally {
      cleanupCommentTestProject(projectA);
      cleanupCommentTestProject(projectB);
    }
  });
});
