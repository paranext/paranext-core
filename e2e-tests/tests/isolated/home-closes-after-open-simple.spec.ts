/**
 * In Simple mode, Home closes once a project opened from it has opened: Simple shows one project at
 * a time, so leaving Home in front of it only hides what the user asked for.
 *
 * PAPI cannot close a web view, so Home clicks its own tab's close button in the host page
 * (`closeOwnDockTab` in `extensions/src/platform-get-resources/src/close-own-dock-tab.util.ts`).
 * That depends on rc-dock's tab markup and the platform tab title's `data-web-view-id`, which no
 * unit test can see — this spec is what notices if either changes.
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated tests/isolated/home-closes-after-open-simple.spec.ts`
 */
import type { Page } from '@playwright/test';
import { expect, test } from '../../fixtures/isolated.fixture';
import {
  getOpenWebViewDefinitions,
  preConfigureRecentlyOpenedProjects,
  waitForAppReady,
  waitForOpenWebViewIdByType,
  waitForOverlayGone,
} from '../../fixtures/helpers';
import {
  cleanupCommentTestProject,
  createCommentTestProject,
  type CommentTestProject,
} from '../../fixtures/comment-test-helpers';
import { sendPapiCommandWhenRegistered } from '../../fixtures/scripture-editor-helpers';
import { SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE } from '../../fixtures/simple-mode-columns.page';
import { HOME_WEBVIEW_TYPE, webViewFrame } from '../../fixtures/web-view-frames';

/** Long enough for a Simple-mode project switch, which rebuilds Column 3 behind its overlay. */
const OPEN_TIMEOUT_MS = 90_000;

test.use({
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  interfaceMode: 'simple',
  // Past first run, so Simple mode starts in the app rather than the setup wizard.
  seedSettings: { 'platform.firstRunComplete': true },
});
test.setTimeout(420_000);

/**
 * The project the Simple-mode editor slot shows, upper-cased, or `undefined` if it shows none. The
 * id can come back in either case depending on how the project was opened.
 */
async function projectInEditor(page: Page): Promise<string | undefined> {
  const definitions = await getOpenWebViewDefinitions(page);
  return definitions
    .find((d) => d.webViewType === SCRIPTURE_EDITOR_SLOT_WEBVIEW_TYPE)
    ?.projectId?.toUpperCase();
}

/** Whether any web view of Home's type is open. */
async function isHomeOpen(page: Page): Promise<boolean> {
  const definitions = await getOpenWebViewDefinitions(page);
  return definitions.some((d) => d.webViewType === HOME_WEBVIEW_TYPE);
}

/** Opens Home, clicks Open on `project`'s row, and waits for Home to close. */
async function openFromHome(page: Page, project: CommentTestProject) {
  await sendPapiCommandWhenRegistered('platformGetResources.openHome');
  const homeId = await waitForOpenWebViewIdByType(page, HOME_WEBVIEW_TYPE);
  const openButton = webViewFrame(page, homeId)
    .getByRole('row')
    .filter({ hasText: project.shortName })
    .getByRole('button', { name: 'Open', exact: true });
  await openButton.click({ timeout: OPEN_TIMEOUT_MS });

  await expect.poll(() => isHomeOpen(page), { timeout: OPEN_TIMEOUT_MS }).toBe(false);
  await expect(page.locator(`.platform-tab-title[data-web-view-id="${homeId}"]`)).toHaveCount(0);
}

test.describe('Simple mode: Home closes after a project opens', () => {
  let firstProject: CommentTestProject;
  let secondProject: CommentTestProject;
  let restoreRecentProjects: (() => void) | undefined;

  test.beforeAll(async () => {
    // Two disposable copies of the bundled WEB project; the helper is comment-flavored only in name.
    firstProject = await createCommentTestProject([], '_homeFirst');
    secondProject = await createCommentTestProject([], '_homeSecond');
    // Simple mode auto-opens the most recent project into its editor slot, so the editor starts on
    // a known project and opening the other one from Home is a real switch.
    restoreRecentProjects = preConfigureRecentlyOpenedProjects([firstProject.projectId]);
  });

  test.afterAll(() => {
    // Each step on its own: a project folder Windows still holds open makes its delete throw, which
    // must skip neither the other delete nor the recent-projects restore.
    try {
      try {
        cleanupCommentTestProject(firstProject);
      } finally {
        cleanupCommentTestProject(secondProject);
      }
    } finally {
      restoreRecentProjects?.();
    }
  });

  test('closes Home after switching projects, and after opening the project already showing', async ({
    mainPage,
  }) => {
    await waitForAppReady(mainPage, { timeout: 180_000 });
    await expect
      .poll(() => projectInEditor(mainPage), { timeout: OPEN_TIMEOUT_MS })
      .toBe(firstProject.projectId.toUpperCase());
    // The "Updating project view" overlay intercepts pointer events.
    await waitForOverlayGone(mainPage, OPEN_TIMEOUT_MS);

    await test.step('opening another project closes Home and shows that project', async () => {
      await openFromHome(mainPage, secondProject);
      await expect
        .poll(() => projectInEditor(mainPage), { timeout: OPEN_TIMEOUT_MS })
        .toBe(secondProject.projectId.toUpperCase());
      await waitForOverlayGone(mainPage, OPEN_TIMEOUT_MS);
    });

    await test.step('opening the project already showing closes Home too', async () => {
      await openFromHome(mainPage, secondProject);
      expect(await projectInEditor(mainPage)).toBe(secondProject.projectId.toUpperCase());
    });
  });
});
