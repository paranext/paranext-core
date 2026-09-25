/**
 * E2E checks that each resource in the Scripture Text Grid (Text Collection) is its own content
 * zoom area: `resource-<id>` marks the resource's text in its verse row and in its chapter view,
 * and the resource's row or column carries a zoom scope with the same id.
 *
 * Covered:
 *
 * - Ctrl+wheel over one resource zooms that resource alone, and the badge names it.
 * - A resource's chapter panel shows its row's level, and zooming inside the panel moves the row.
 * - The right-click menu (Copy, Zoom in, Zoom out, Reset zoom) and the chapter view's "⋮" zoom one
 *   resource; Zoom in is disabled at 300 %.
 * - The zoom keys act on the resource last clicked (its name, anywhere in its column), and Ctrl+0
 *   resets only that resource.
 * - Zooming one resource grows its text while its reorder grip keeps interface size.
 * - Each resource's level survives closing and reopening the tab for the same project (the platform
 *   seeds the new tab from the same memory a restart reads).
 *
 * Not covered here: an app restart (on the live check list), and that a level stored under the
 * retired `scriptureTextGrid.zoomByResourceId` state key has no effect — the source contract test
 * `resource-panels-content-zoom.contract.test.ts` pins that no grid file reads that key.
 *
 * Runnability: local only, headless on WSL, attached over CDP to a running app
 * (`playwright-cdp.config.ts`). The tests need two installed resources, given as
 * `E2E_TEST_RESOURCE_IDS=id1,id2`; without them, and in CI, they skip. They write real project
 * settings and the shared zoom memory, and put both back after each test.
 */
import type { Frame, Locator, Page } from '@playwright/test';
import { test, expect } from '../../fixtures/enhanced-resources.fixture';
import { waitForAppReady, waitForOpenWebViewIdByType } from '../../fixtures/helpers';
import {
  closeDockTab,
  ctrlWheel,
  firstLineBoxHeight,
  onScreenBox,
  readIndicatorText,
} from '../../fixtures/content-zoom-helpers';
import {
  CONTENT_ZOOM_COMMANDS,
  getEditorFrame,
  readFactor,
  sendCommandWithId,
} from '../../fixtures/scripture-editor-helpers';
import { closeAllNonHomeDockTabs } from './test-helpers';
import {
  discoverAdminTextConnectionProject,
  flagResourcesAndOpenScriptureTextGrid,
  openCellContextMenu,
  openChapterViewZoomOptions,
  openScriptureTextGrid,
  readResourceZoomArea,
  readResourceZoomLabel,
  restoreScriptureTextGridProjectSettings,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
  type FlaggedResourceItem,
  type ScriptureTextGrid,
} from './scripture-text-grid.page';

const REAL_RESOURCE_IDS = (process.env.E2E_TEST_RESOURCE_IDS ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

/** The two installed resources to seed the Text Collection with. */
function twoResources(): [FlaggedResourceItem, FlaggedResourceItem] {
  return [
    { type: 'project', name: 'Zoom A', id: REAL_RESOURCE_IDS[0], isInTextCollection: true },
    { type: 'project', name: 'Zoom B', id: REAL_RESOURCE_IDS[1], isInTextCollection: true },
  ];
}

/**
 * The app-wide default zoom level (`platform.webViewContentZoom`) a resource with no level of its
 * own follows — read rather than assumed to be 1, since this suite attaches to an already-running
 * app whose Settings may not hold the factory default.
 */
async function readSettingsDefaultZoom(page: Page): Promise<number> {
  return page.evaluate(async () => {
    // The renderer exposes `papi` on `globalThis`, untyped here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { get: (key: string) => Promise<number> } };
    };
    return win.papi.settings.get('platform.webViewContentZoom');
  });
}

/**
 * The zoom area the pane's focused element sits in — the same lookup the in-iframe chord handler
 * runs on `document.activeElement` (`areaOf` in `web-view-content-zoom.bootstrap-script.ts`): the
 * closest marker, else the closest zoom scope.
 */
async function readFocusedAreaId(frame: Frame): Promise<string | undefined> {
  return frame.evaluate(() => {
    const focused = document.activeElement;
    const root = focused?.closest('[data-platform-content-zoom-root]');
    if (root) return root.getAttribute('data-platform-content-zoom-root') || 'main';
    const scope = focused?.closest('[data-platform-content-zoom-scope]');
    if (scope) return scope.getAttribute('data-platform-content-zoom-scope') || 'main';
    return undefined;
  });
}

/** The area the pane's bootstrap holds active — the one the chords and the tab menu act on. */
async function readActiveAreaId(frame: Frame): Promise<string | undefined> {
  return frame.evaluate(() => {
    // The bootstrap publishes this internal platform/pane contract on the window, untyped here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as { __platformContentZoom?: { activeArea?: string } };
    // Same internal platform/pane contract as above — the double underscore is the bootstrap's own name.
    // eslint-disable-next-line no-underscore-dangle
    return win.__platformContentZoom?.activeArea;
  });
}

/**
 * How many elements mark one area's text. A level is always read with `readFactor`: the platform
 * writes one CSS variable per reported area (`--platform-content-zoom-<area>`, in
 * `pushContentZoom`) and the injected rule scales every marker of that area by it, so two markers
 * of one area cannot render at different levels. What the chapter-panel step has to prove is that
 * the panel's text is marked with its row's area, which is this count.
 */
async function countAreaMarkers(frame: Frame, areaId: string): Promise<number> {
  return frame.evaluate(
    (selector) => document.querySelectorAll(selector).length,
    `[data-platform-content-zoom-root="${areaId}"]`,
  );
}

/** One decimal, the way the platform rounds a level after each step. */
function roundLevel(level: number): number {
  return Math.round(level * 10) / 10;
}

/** Steps one area up through the platform command until it reaches `target`, polling each step. */
async function stepAreaUpTo(
  page: Page,
  frame: Frame,
  webViewId: string,
  areaId: string,
  target: number,
): Promise<void> {
  let current = await readFactor(frame, areaId);
  // Sequential steps: each command's write must land (confirmed by the poll) before the next.
  /* eslint-disable no-await-in-loop */
  while (current < target - 0.001) {
    await sendCommandWithId(page, CONTENT_ZOOM_COMMANDS.in, webViewId, areaId);
    const expected = roundLevel(current + 0.1);
    await expect.poll(() => readFactor(frame, areaId)).toBeCloseTo(expected, 5);
    current = expected;
  }
  /* eslint-enable no-await-in-loop */
}

/** Areas this test zoomed, so `afterEach` can return them to the default whatever happened. */
let zoomedAreas: { webViewId: string; areaIds: string[] } | undefined;

/** Makes the non-closable grid tab closable, so a test or the shared sweep can close it. */
async function makeGridClosable(page: Page): Promise<void> {
  await page.evaluate(async (webViewType) => {
    // The renderer exposes `papi` and `updateWebViewDefinitionById` on `globalThis`, untyped here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: {
        webViews: {
          getAllOpenWebViewDefinitions: () => Promise<{ id: string; webViewType: string }[]>;
        };
      };
      updateWebViewDefinitionById: (id: string, update: { isClosable: boolean }) => unknown;
    };
    const defs = await win.papi.webViews.getAllOpenWebViewDefinitions();
    await Promise.all(
      defs
        .filter((d) => d.webViewType === webViewType)
        .map((d) => win.updateWebViewDefinitionById(d.id, { isClosable: true })),
    );
  }, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
}

type OpenedGrid = {
  projectId: string;
  stg: ScriptureTextGrid;
  webViewId: string;
  frame: Frame;
  settingsDefault: number;
  cellA: Locator;
  cellB: Locator;
  areaA: string;
  areaB: string;
  labelA: string;
  labelB: string;
};

/**
 * Seeds the Text Collection with the two resources, opens it in verse view, and returns both
 * resources' areas at the Settings default — a known baseline, since this suite attaches to an app
 * whose zoom memory an earlier run may have left behind.
 */
async function openGridWithTwoResources(mainPage: Page, projectId: string): Promise<OpenedGrid> {
  await flagResourcesAndOpenScriptureTextGrid(mainPage, projectId, twoResources());
  const stg = await openScriptureTextGrid(mainPage, projectId);
  const webViewId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
  const frame = await getEditorFrame(mainPage, webViewId);
  await expect(stg.cellDraggable).toHaveCount(2, { timeout: 15_000 });
  const cellA = stg.cellDraggable.nth(0);
  const cellB = stg.cellDraggable.nth(1);
  const areaA = await readResourceZoomArea(cellA);
  const areaB = await readResourceZoomArea(cellB);
  expect(areaA).not.toBe(areaB);
  zoomedAreas = { webViewId, areaIds: [areaA, areaB] };
  const settingsDefault = await readSettingsDefaultZoom(mainPage);
  await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, webViewId, areaA);
  await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, webViewId, areaB);
  await expect.poll(() => readFactor(frame, areaA)).toBe(settingsDefault);
  await expect.poll(() => readFactor(frame, areaB)).toBe(settingsDefault);
  return {
    projectId,
    stg,
    webViewId,
    frame,
    settingsDefault,
    cellA,
    cellB,
    areaA,
    areaB,
    labelA: await readResourceZoomLabel(cellA),
    labelB: await readResourceZoomLabel(cellB),
  };
}

test.describe('Scripture Text Grid — per-resource content zoom', () => {
  test.beforeEach(async ({ mainPage }) => {
    test.skip(!!process.env.CI, 'Mutates real project settings — local runs only');
    test.skip(
      REAL_RESOURCE_IDS.length < 2,
      'Needs two installed resources (E2E_TEST_RESOURCE_IDS=id1,id2)',
    );
    await closeAllNonHomeDockTabs(mainPage);
    await waitForAppReady(mainPage);
  });

  // Returns every zoomed area to the default so this run does not ratchet the shared
  // `platform.webViewContentZoomMemory` for the next one, then restores the project settings and
  // clears the dock. Best-effort — cleanup must not fail the test.
  test.afterEach(async ({ mainPage }) => {
    const zoomed = zoomedAreas;
    zoomedAreas = undefined;
    if (zoomed) {
      await Promise.all(
        zoomed.areaIds.map((areaId) =>
          sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.reset, zoomed.webViewId, areaId).catch(
            () => {},
          ),
        ),
      );
    }
    await makeGridClosable(mainPage).catch(() => {});
    await restoreScriptureTextGridProjectSettings(mainPage);
    await closeAllNonHomeDockTabs(mainPage);
  });

  test('Ctrl+wheel over one resource zooms it alone, and its chapter panel shows and moves the same level', async ({
    mainPage,
  }) => {
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');
    const { frame, settingsDefault, cellA, areaA, areaB, labelA, stg } =
      await openGridWithTwoResources(mainPage, projectId);

    await test.step('one notch over A raises A only, and the badge names A', async () => {
      const textA = cellA.locator(`[data-platform-content-zoom-root="${areaA}"]`);
      const box = await textA.boundingBox();
      if (!box) throw new Error('Resource A text has no bounding box');
      await ctrlWheel(mainPage, box, -120);
      const raised = roundLevel(settingsDefault + 0.1);
      await expect.poll(() => readFactor(frame, areaA)).toBeCloseTo(raised, 5);
      expect(await readFactor(frame, areaB)).toBe(settingsDefault);
      // `readIndicatorText` strips all whitespace, so the name loses its spaces too.
      await expect
        .poll(() => readIndicatorText(frame))
        .toBe(`${labelA.replace(/\s/gu, '')}·${Math.round(raised * 100)}%`);
    });

    await test.step('A’s chapter panel carries A’s area, so it shows A’s level', async () => {
      await cellA.click();
      const panel = stg.frame.getByTestId('scripture-text-grid-chapter-context');
      await expect(panel).toBeVisible();
      expect(await readResourceZoomArea(panel)).toBe(areaA);
      // The row's text and the panel's text are both marked with A's area.
      await expect(panel.locator(`[data-platform-content-zoom-root="${areaA}"]`)).toHaveCount(1);
      await expect(cellA.locator(`[data-platform-content-zoom-root="${areaA}"]`)).toHaveCount(1);
      await expect.poll(() => countAreaMarkers(frame, areaA)).toBe(2);
      expect(await readFactor(frame, areaA)).toBeCloseTo(roundLevel(settingsDefault + 0.1), 5);
    });

    await test.step('a notch inside the panel moves the row too', async () => {
      // The panel holds the whole chapter, so its text runs far below the pane: aim at the part
      // that is on screen.
      const box = await onScreenBox(
        frame,
        frame
          .getByTestId('scripture-text-grid-chapter-context')
          .locator(`[data-platform-content-zoom-root="${areaA}"]`),
        'Chapter panel text',
      );
      await ctrlWheel(mainPage, box, -120);
      const raisedTwice = roundLevel(settingsDefault + 0.2);
      await expect.poll(() => readFactor(frame, areaA)).toBeCloseTo(raisedTwice, 5);
      // The row's text still carries A's area, so the one variable just raised scales it as well.
      await expect(cellA.locator(`[data-platform-content-zoom-root="${areaA}"]`)).toHaveCount(1);
      expect(await readFactor(frame, areaB)).toBe(settingsDefault);
    });
  });

  test('the right-click menu and the chapter view’s ⋮ zoom one resource, and Zoom in stops at 300 %', async ({
    mainPage,
  }) => {
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');
    const { stg, frame, webViewId, settingsDefault, cellB, areaA, areaB, labelB } =
      await openGridWithTwoResources(mainPage, projectId);
    test.skip(settingsDefault > 2.8, 'The Settings default leaves no room to step up to 300 %');

    await test.step('Zoom in from B’s right-click menu raises B only', async () => {
      const menu = await openCellContextMenu(stg.frame, cellB);
      await expect(menu.getByRole('menuitem')).toHaveText([
        /^Copy$/,
        /^Zoom in$/,
        /^Zoom out$/,
        /^Reset zoom$/,
      ]);
      await menu.getByRole('menuitem', { name: 'Zoom in', exact: true }).click();
      await expect
        .poll(() => readFactor(frame, areaB))
        .toBeCloseTo(roundLevel(settingsDefault + 0.1), 5);
      expect(await readFactor(frame, areaA)).toBe(settingsDefault);
    });

    await test.step('at 300 % the menu’s Zoom in is disabled, Reset zoom is not', async () => {
      await stepAreaUpTo(mainPage, frame, webViewId, areaB, 3);
      const menu = await openCellContextMenu(stg.frame, cellB);
      await expect(menu.getByRole('menuitem', { name: 'Zoom in', exact: true })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
      await expect(
        menu.getByRole('menuitem', { name: 'Reset zoom', exact: true }),
      ).not.toHaveAttribute('aria-disabled', 'true');
      await mainPage.keyboard.press('Escape');
    });

    await test.step('Reset zoom from B’s ⋮ in the chapter view returns B to the default', async () => {
      await stg.switchToChapterView();
      const columnB = stg.cellDraggable.nth(1);
      expect(await readResourceZoomArea(columnB)).toBe(areaB);
      const menu = await openChapterViewZoomOptions(stg.frame, columnB, labelB);
      await expect(menu.getByRole('menuitem')).toHaveText([
        /^Zoom in$/,
        /^Zoom out$/,
        /^Reset zoom$/,
      ]);
      await menu.getByRole('menuitem', { name: 'Reset zoom', exact: true }).click();
      await expect.poll(() => readFactor(frame, areaB)).toBe(settingsDefault);
    });
  });

  test('the zoom keys act on the resource last clicked, and Ctrl+0 resets only that resource', async ({
    mainPage,
  }) => {
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');
    const { stg, frame, webViewId, settingsDefault, areaA, areaB, labelA, labelB } =
      await openGridWithTwoResources(mainPage, projectId);
    await stg.switchToChapterView();
    const columnA = stg.cellDraggable.nth(0);
    const columnB = stg.cellDraggable.nth(1);
    const bLevel = roundLevel(settingsDefault + 0.1);
    await sendCommandWithId(mainPage, CONTENT_ZOOM_COMMANDS.in, webViewId, areaB);
    await expect.poll(() => readFactor(frame, areaB)).toBeCloseTo(bLevel, 5);

    await test.step('a click on a resource’s name makes that resource active', async () => {
      await columnB.getByText(labelB, { exact: true }).click();
      await expect.poll(() => readActiveAreaId(frame)).toBe(areaB);
      await columnA.getByText(labelA, { exact: true }).click();
      await expect.poll(() => readActiveAreaId(frame)).toBe(areaA);
    });

    await test.step('Ctrl+= raises A, the resource last clicked, and leaves B alone', async () => {
      await mainPage.keyboard.press('Control+=');
      await expect
        .poll(() => readFactor(frame, areaA))
        .toBeCloseTo(roundLevel(settingsDefault + 0.1), 5);
      expect(await readFactor(frame, areaB)).toBeCloseTo(bLevel, 5);
    });

    await test.step('Ctrl+0 with focus on A’s grip resets A only', async () => {
      await columnA.locator('[data-reorder-handle-id]').focus();
      await expect.poll(() => readFocusedAreaId(frame)).toBe(areaA);
      await mainPage.keyboard.press('Control+0');
      await expect.poll(() => readFactor(frame, areaA)).toBe(settingsDefault);
      expect(await readFactor(frame, areaB)).toBeCloseTo(bLevel, 5);
    });

    await test.step('zooming A grows A’s text while A’s reorder grip keeps its size', async () => {
      test.skip(settingsDefault > 2.5, 'The Settings default leaves no room for five steps');
      const grip = columnA.locator('[data-reorder-handle-id]');
      const textA = columnA.locator(`[data-platform-content-zoom-root="${areaA}"]`);
      const gripBefore = await grip.boundingBox();
      if (!gripBefore) throw new Error('Grip missing');
      // One line box, not the text block: wrapped text grows by ~z² under CSS `zoom` z, a line by z.
      const lineBefore = await firstLineBoxHeight(textA);
      const target = roundLevel(settingsDefault + 0.5);
      await stepAreaUpTo(mainPage, frame, webViewId, areaA, target);
      const gripAfter = await grip.boundingBox();
      if (!gripAfter) throw new Error('Grip lost');
      const lineAfter = await firstLineBoxHeight(textA);
      expect(lineAfter / lineBefore).toBeCloseTo(target / settingsDefault, 1);
      expect(Math.abs(gripAfter.height - gripBefore.height)).toBeLessThanOrEqual(1);
    });
  });

  test('each resource keeps its own level when the tab is closed and reopened', async ({
    mainPage,
  }) => {
    const projectId = await discoverAdminTextConnectionProject(mainPage);
    test.skip(!projectId, 'No admin-writable text-connection project found locally');
    const { stg, webViewId, frame, settingsDefault, areaA, areaB } = await openGridWithTwoResources(
      mainPage,
      projectId,
    );
    const aLevel = roundLevel(settingsDefault + 0.2);
    const bLevel = roundLevel(settingsDefault + 0.1);
    await stepAreaUpTo(mainPage, frame, webViewId, areaA, aLevel);
    await stepAreaUpTo(mainPage, frame, webViewId, areaB, bLevel);

    await makeGridClosable(mainPage);
    await closeDockTab(mainPage, webViewId);
    await expect(stg.cellDraggable).toHaveCount(0);

    const reopened = await openScriptureTextGrid(mainPage, projectId);
    const reopenedId = await waitForOpenWebViewIdByType(mainPage, SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
    zoomedAreas = { webViewId: reopenedId, areaIds: [areaA, areaB] };
    const reopenedFrame = await getEditorFrame(mainPage, reopenedId);
    await expect(reopened.cellDraggable).toHaveCount(2, { timeout: 15_000 });
    await expect.poll(() => readFactor(reopenedFrame, areaA)).toBeCloseTo(aLevel, 5);
    await expect.poll(() => readFactor(reopenedFrame, areaB)).toBeCloseTo(bLevel, 5);
  });
});
