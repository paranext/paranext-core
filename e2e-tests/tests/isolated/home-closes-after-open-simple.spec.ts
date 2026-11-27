/**
 * In Simple mode, Home closes once a project opened from it has opened: Simple shows one project at
 * a time, so leaving Home in front of it only hides what the user asked for.
 *
 * Home passes its own id to the editor's open command, and the editor closes it with
 * `papi.webViews.closeWebView` before its "Updating project view" cover lifts, so Home is never
 * seen in front of the project. Unit tests cover each half on its own; this spec covers the chain
 * end to end: Home's id reaching the editor, the close reaching the dock of the window Home is in,
 * and the order of that close and the cover lifting, as the user sees it.
 *
 * ## How to run
 *
 * `npm run test:e2e:isolated tests/isolated/home-closes-after-open-simple.spec.ts`
 */
import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../fixtures/isolated.fixture';
import {
  getOpenWebViewDefinitions,
  preConfigureRecentlyOpenedProjects,
  resolveWebViewFrame,
  sleep,
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

/** How long Home's document must stay the same before the spec clicks in it. */
const SETTLE_MS = 2_000;

/** Set on Home's root element to tell whether the document was replaced. */
const SETTLE_ATTRIBUTE = 'data-e2e-settle-marker';

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

/**
 * Waits until Home shows `project`'s Open button and its document has stayed the same for
 * {@link SETTLE_MS}. Home closes from the continuation of the click that started the open, so a
 * click that lands in a document about to be replaced (extensions reloading during startup, or a
 * reload of Home itself) leaves the new Home never learning that a project opened.
 */
async function waitForHomeToSettle(page: Page, homeId: string, openButton: Locator) {
  const iframe = page.locator(`iframe[data-web-view-id="${homeId}"]`);
  await expect(async () => {
    await expect(openButton).toBeVisible({ timeout: 1_000 });
    const frame = await resolveWebViewFrame(iframe, 'Home');
    const marker = `settle-${Date.now()}`;
    // The callbacks run in Home's document, so the attribute name travels as an argument.
    await frame.evaluate(
      ([attribute, value]) => {
        document.documentElement.setAttribute(attribute, value);
      },
      [SETTLE_ATTRIBUTE, marker] as const,
    );
    await sleep(SETTLE_MS);
    // Throws if the frame was detached; reads nothing if the iframe loaded a new document.
    const markerNow = await frame.evaluate(
      (attribute) => document.documentElement.getAttribute(attribute),
      SETTLE_ATTRIBUTE,
    );
    expect(markerNow).toBe(marker);
  }).toPass({ timeout: OPEN_TIMEOUT_MS });
}

/** What {@link watchCoverAndHome} saw, frame by frame, while it ran. */
type CoverAndHomeFrames = {
  /** Whether the "Updating project view" cover showed in any frame. */
  sawCover: boolean;
  /** Whether any frame after the cover had shown had no cover and Home's tab still in the dock. */
  sawHomeAfterCover: boolean;
};

/** The "Updating project view" cover's spinner, as `waitForOverlayGone` finds it. */
const COVER_SELECTOR = '.pr-twp [role="status"]';

/**
 * The sampler's state, kept as attributes on the main window's root element so the spec can read it
 * back without reaching into `window`. Each holds `'true'` once set.
 */
const SAMPLER_ATTRIBUTES = {
  sawCover: 'data-e2e-saw-cover',
  sawHomeAfterCover: 'data-e2e-saw-home-after-cover',
  stop: 'data-e2e-stop-sampling',
} as const;

/**
 * Starts sampling, on every animation frame of the main window, whether the cover shows and whether
 * Home's tab is still in the dock. Returns a function that stops sampling and reports what it saw.
 */
async function watchCoverAndHome(
  page: Page,
  homeId: string,
): Promise<() => Promise<CoverAndHomeFrames>> {
  const homeSelector = `.platform-tab-title[data-web-view-id="${homeId}"]`;
  await page.evaluate(
    ([coverSelector, homeTabSelector, attributes]) => {
      const root = document.documentElement;
      Object.values(attributes).forEach((attribute) => root.removeAttribute(attribute));
      const sample = () => {
        if (root.hasAttribute(attributes.stop)) return;
        if (document.querySelector(coverSelector)) root.setAttribute(attributes.sawCover, 'true');
        else if (root.hasAttribute(attributes.sawCover) && document.querySelector(homeTabSelector))
          root.setAttribute(attributes.sawHomeAfterCover, 'true');
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    },
    [COVER_SELECTOR, homeSelector, SAMPLER_ATTRIBUTES] as const,
  );
  return () =>
    page.evaluate((attributes) => {
      const root = document.documentElement;
      root.setAttribute(attributes.stop, 'true');
      return {
        sawCover: root.hasAttribute(attributes.sawCover),
        sawHomeAfterCover: root.hasAttribute(attributes.sawHomeAfterCover),
      };
    }, SAMPLER_ATTRIBUTES);
}

/**
 * Opens Home, clicks Open on `project`'s row, and waits for Home to close.
 *
 * @returns What the main window showed, frame by frame, from the click until Home had closed
 */
async function openFromHome(page: Page, project: CommentTestProject): Promise<CoverAndHomeFrames> {
  await sendPapiCommandWhenRegistered('platformGetResources.openHome');
  const homeId = await waitForOpenWebViewIdByType(page, HOME_WEBVIEW_TYPE);
  const openButton = webViewFrame(page, homeId)
    .getByRole('row')
    .filter({ hasText: project.shortName })
    .getByRole('button', { name: 'Open', exact: true });
  await waitForHomeToSettle(page, homeId, openButton);
  const stopWatching = await watchCoverAndHome(page, homeId);
  await openButton.click();

  await expect.poll(() => isHomeOpen(page), { timeout: OPEN_TIMEOUT_MS }).toBe(false);
  await expect(page.locator(`.platform-tab-title[data-web-view-id="${homeId}"]`)).toHaveCount(0);
  await waitForOverlayGone(page, OPEN_TIMEOUT_MS);
  return stopWatching();
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

    await test.step('opening another project closes Home before the project shows', async () => {
      const frames = await openFromHome(mainPage, secondProject);
      await expect
        .poll(() => projectInEditor(mainPage), { timeout: OPEN_TIMEOUT_MS })
        .toBe(secondProject.projectId.toUpperCase());
      // The switch did put the cover up, so the next check had a moment it could have failed in.
      expect(frames.sawCover).toBe(true);
      expect(frames.sawHomeAfterCover).toBe(false);
    });

    await test.step('opening the project already showing closes Home too', async () => {
      await openFromHome(mainPage, secondProject);
      expect(await projectInEditor(mainPage)).toBe(secondProject.projectId.toUpperCase());
    });
  });
});
