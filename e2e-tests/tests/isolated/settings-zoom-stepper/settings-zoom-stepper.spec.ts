/**
 * E2E for the Settings page layout and its zoom steppers, driven through the rendered controls.
 *
 * - Every settings card fits its pane — General, an extension's group, and a project's settings — at
 *   the default width and after narrowing the pane, so no setting row is cut off on the right.
 * - The zoom stepper wraps into two rows (− and + over the percentage and reset) with nothing cut
 *   off; a typed percentage commits as a factor; Escape abandons an edit; Interface scaling is
 *   shown as a percentage and its + writes the next step.
 *
 * Settings opens as a floating dock panel, so the spec narrows it the way a user would: by dragging
 * the panel's right edge. Screenshots of each view at both widths are attached to the report for
 * the visual check.
 *
 * Runs against the real (non-isolated) project root because the project view uses a disposable
 * comment-test project: `./e2e-tests/run-e2e-wsl.sh --wrap npm run test:e2e:isolated
 * tests/isolated/settings-zoom-stepper/ -- --workers=1`.
 */
import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  type CommentTestProject,
  cleanupCommentTestProject,
  createCommentTestProject,
} from '../../../fixtures/comment-test-helpers';
import {
  openEditableScriptureEditorForProject,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

const CONTENT_ZOOM_SETTING = 'platform.webViewContentZoom';
const INTERFACE_SCALING_SETTING = 'platform.zoomFactor';

/**
 * Narrower than the sidebar (at most 220 px) plus a 600 px card, so a card that cannot shrink
 * overflows here; wide enough that the sidebar's inset keeps its own 215 px floor.
 */
const NARROW_PANEL_PX = 440;

/** Sub-pixel layout rounding shows up as a 1 px excess that is not a real overflow. */
const ROUNDING_TOLERANCE_PX = 1;

/** One narrowing drag; small enough that a wrap point is not jumped far past. */
const NARROWING_STEP_PX = 20;

/** Enough steps to take the 1000 px default panel well below any width this spec needs. */
const MAX_NARROWING_STEPS = 40;

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { envOverrides: { DEV_NOISY: 'false' } },
  seedSettings: {
    'platform.firstRunComplete': true,
    [CONTENT_ZOOM_SETTING]: 1,
    [INTERFACE_SCALING_SETTING]: 1,
  },
});

/** The renderer exposes `papi` on `globalThis`; this is the slice the spec uses. */
type RendererPapi = {
  papi: {
    commands: { sendCommand: (command: string, ...args: unknown[]) => Promise<unknown> };
    settings: {
      get: (key: string) => Promise<unknown>;
      set: (key: string, value: unknown) => Promise<unknown>;
    };
  };
};

/** Opens Settings; with a web-view id, that web view's project settings. */
async function openSettings(page: Page, webViewId?: string): Promise<void> {
  await page.evaluate(async (id) => {
    // The renderer exposes `papi` on `globalThis`, untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as RendererPapi;
    if (id) await win.papi.commands.sendCommand('platform.openSettings', id);
    else await win.papi.commands.sendCommand('platform.openSettings');
  }, webViewId);
}

async function readSetting(page: Page, key: string): Promise<unknown> {
  return page.evaluate((settingKey) => {
    // The renderer exposes `papi` on `globalThis`, untyped in the Playwright context.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as RendererPapi;
    return win.papi.settings.get(settingKey);
  }, key);
}

async function writeSetting(page: Page, key: string, value: unknown): Promise<void> {
  await page.evaluate(
    async ([settingKey, settingValue]) => {
      // The renderer exposes `papi` on `globalThis`, untyped in the Playwright context.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const win = window as unknown as RendererPapi;
      await win.papi.settings.set(String(settingKey), settingValue);
    },
    [key, value] as const,
  );
}

/** The floating dock panel whose tab is titled exactly `tabTitle`. */
function settingsPanel(page: Page, tabTitle: string): Locator {
  return page.locator('.dock-fbox .dock-panel', {
    has: page.locator('.dock-tab', { hasText: new RegExp(`^\\s*${tabTitle}\\s*$`, 'u') }),
  });
}

/** Drags a floating panel's right resize edge left by `distancePx`, in moves rc-dock tracks. */
async function dragPanelRightEdgeLeft(
  page: Page,
  panel: Locator,
  distancePx: number,
): Promise<void> {
  const handle = await panel.locator('.dock-panel-drag-size-r').boundingBox();
  if (!handle) throw new Error("The Settings panel's right resize edge has no layout box");
  const x = handle.x + handle.width / 2;
  const y = handle.y + handle.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  // rc-dock starts tracking on the first move that differs from the press point, so a single jump
  // to the target would do nothing.
  await page.mouse.move(x - 5, y);
  await page.mouse.move(x - distancePx, y);
  await page.mouse.up();
}

/** Narrows `panel` step by step until it is at most `maxWidthPx` wide. */
async function narrowPanelTo(
  page: Page,
  panel: Locator,
  maxWidthPx: number,
  stepsLeft = MAX_NARROWING_STEPS,
): Promise<void> {
  const box = await panel.boundingBox();
  if (!box) throw new Error('The Settings panel has no layout box');
  if (box.width <= maxWidthPx) return;
  if (stepsLeft === 0)
    throw new Error(
      `The Settings panel stopped narrowing at ${box.width}px, above ${maxWidthPx}px`,
    );
  await dragPanelRightEdgeLeft(page, panel, NARROWING_STEP_PX);
  await narrowPanelTo(page, panel, maxWidthPx, stepsLeft - 1);
}

/**
 * Asserts every settings card, and every setting row's control inside it, lies within the panel —
 * nothing cut off on the right and no card scrolling sideways.
 */
async function expectEveryCardInsidePanel(panel: Locator, view: string): Promise<void> {
  const panelBox = await panel.boundingBox();
  if (!panelBox) throw new Error('The Settings panel has no layout box');
  const panelRight = panelBox.x + panelBox.width;
  const cards = await panel.locator('.card').evaluateAll((elements) =>
    elements.map((card) => ({
      right: card.getBoundingClientRect().right,
      sidewaysOverflow: card.scrollWidth - card.clientWidth,
      controlRights: Array.from(card.querySelectorAll('.setting-container')).map(
        (control) => control.getBoundingClientRect().right,
      ),
    })),
  );
  expect(cards.length, `${view}: no settings cards rendered`).toBeGreaterThan(0);
  cards.forEach((card, index) => {
    expect(card.right, `${view}: card ${index} runs past the pane`).toBeLessThanOrEqual(
      panelRight + ROUNDING_TOLERANCE_PX,
    );
    expect(card.sidewaysOverflow, `${view}: card ${index} scrolls sideways`).toBeLessThanOrEqual(
      ROUNDING_TOLERANCE_PX,
    );
    card.controlRights.forEach((right, controlIndex) => {
      expect(
        right,
        `${view}: card ${index} control ${controlIndex} is cut off`,
      ).toBeLessThanOrEqual(card.right + ROUNDING_TOLERANCE_PX);
    });
  });
}

/** `true` once the stepper's percentage-and-reset group sits below its − and + group. */
async function isWrapped(stepper: Locator): Promise<boolean> {
  const groups = stepper.locator('[data-slot="button-group"]');
  const steps = await groups.nth(0).boundingBox();
  const field = await groups.nth(1).boundingBox();
  if (!steps || !field) throw new Error('A stepper button group has no layout box');
  return field.y >= steps.y + steps.height - ROUNDING_TOLERANCE_PX;
}

/** Narrows `panel` step by step until `stepper` wraps onto two rows. */
async function narrowUntilWrapped(
  page: Page,
  panel: Locator,
  stepper: Locator,
  stepsLeft = MAX_NARROWING_STEPS,
): Promise<void> {
  if (await isWrapped(stepper)) return;
  if (stepsLeft === 0) throw new Error('The zoom stepper never wrapped while narrowing the pane');
  await dragPanelRightEdgeLeft(page, panel, NARROWING_STEP_PX);
  await narrowUntilWrapped(page, panel, stepper, stepsLeft - 1);
}

/** Asserts `inner` lies horizontally within `outer`. */
async function expectInside(inner: Locator, outer: Locator, what: string): Promise<void> {
  const innerBox = await inner.boundingBox();
  const outerBox = await outer.boundingBox();
  if (!innerBox || !outerBox) throw new Error(`${what}: no layout box`);
  expect(innerBox.x, `${what} starts outside`).toBeGreaterThanOrEqual(
    outerBox.x - ROUNDING_TOLERANCE_PX,
  );
  expect(innerBox.x + innerBox.width, `${what} is cut off`).toBeLessThanOrEqual(
    outerBox.x + outerBox.width + ROUNDING_TOLERANCE_PX,
  );
}

test.describe('Settings layout and zoom steppers', () => {
  let project: CommentTestProject;

  test.beforeAll(async () => {
    project = await createCommentTestProject([], '_settings_layout');
  });

  test.afterAll(() => {
    cleanupCommentTestProject(project);
  });

  test.afterEach(async ({ mainPage }) => {
    // A failed step can leave either zoom changed; the seeded values are restored only on a clean
    // teardown, and a leftover Interface scaling rescales every later run in this worktree.
    await writeSetting(mainPage, CONTENT_ZOOM_SETTING, 1);
    await writeSetting(mainPage, INTERFACE_SCALING_SETTING, 1);
  });

  test('every Settings card fits the pane at normal and narrow widths', async ({
    mainPage,
  }, testInfo) => {
    test.slow();
    await waitForHomeTab(mainPage);
    // The narrow width is sized for unscaled layout; a scaled one moves every wrap point.
    expect(await readSetting(mainPage, INTERFACE_SCALING_SETTING)).toBe(1);
    expect(await readSetting(mainPage, CONTENT_ZOOM_SETTING)).toBe(1);

    await openSettings(mainPage);
    const general = settingsPanel(mainPage, 'Settings');
    await expect(general.getByText('Interface scaling', { exact: true })).toBeVisible({
      timeout: 30_000,
    });

    await test.step('General and an extension group fit at the default width', async () => {
      await expectEveryCardInsidePanel(general, 'General, default width');
      await testInfo.attach('general-default.png', {
        body: await general.screenshot(),
        contentType: 'image/png',
      });
      await general.getByRole('button', { name: 'Scripture Editor', exact: true }).click();
      await expectEveryCardInsidePanel(general, 'Scripture Editor, default width');
      await testInfo.attach('extension-default.png', {
        body: await general.screenshot(),
        contentType: 'image/png',
      });
    });

    await test.step('General and an extension group fit after narrowing the pane', async () => {
      await narrowPanelTo(mainPage, general, NARROW_PANEL_PX);
      await expectEveryCardInsidePanel(general, 'Scripture Editor, narrow');
      await testInfo.attach('extension-narrow.png', {
        body: await general.screenshot(),
        contentType: 'image/png',
      });
      await general.getByRole('button', { name: 'General', exact: true }).click();
      await expectEveryCardInsidePanel(general, 'General, narrow');
      await testInfo.attach('general-narrow.png', {
        body: await general.screenshot(),
        contentType: 'image/png',
      });
    });

    await test.step("a project's settings fit at both widths", async () => {
      await general.locator('.dock-tab-close-btn').dispatchEvent('click');
      await expect(general).toHaveCount(0);
      const editorId = await openEditableScriptureEditorForProject(mainPage, project.projectId);
      await openSettings(mainPage, editorId);
      const projectPanel = settingsPanel(mainPage, 'Project Settings');
      await expect(projectPanel.locator('.card').first()).toBeVisible({ timeout: 30_000 });
      // Project rows render a placeholder until their values arrive; measure the real controls.
      await expect(projectPanel.locator('.loading-label')).toHaveCount(0, { timeout: 30_000 });
      await expectEveryCardInsidePanel(projectPanel, 'Project settings, default width');
      await testInfo.attach('project-default.png', {
        body: await projectPanel.screenshot(),
        contentType: 'image/png',
      });
      await narrowPanelTo(mainPage, projectPanel, NARROW_PANEL_PX);
      await expectEveryCardInsidePanel(projectPanel, 'Project settings, narrow');
      await testInfo.attach('project-narrow.png', {
        body: await projectPanel.screenshot(),
        contentType: 'image/png',
      });
    });
  });

  test('the zoom stepper wraps, takes a typed percentage, and edits Interface scaling', async ({
    mainPage,
  }) => {
    test.slow();
    await waitForHomeTab(mainPage);
    await openSettings(mainPage);
    const panel = settingsPanel(mainPage, 'Settings');
    const contentZoom = panel.getByRole('group', { name: 'Tab content default zoom', exact: true });
    const interfaceScaling = panel.getByRole('group', { name: 'Interface scaling', exact: true });
    await expect(contentZoom).toBeVisible({ timeout: 30_000 });
    const contentZoomField = contentZoom.getByRole('textbox', { name: 'Percentage', exact: true });

    await test.step('a narrow pane wraps the stepper into two rows with nothing cut off', async () => {
      // Positive control: at the default width the two groups share one row.
      expect(await isWrapped(contentZoom)).toBe(false);
      await narrowUntilWrapped(mainPage, panel, contentZoom);
      // `has` resolves inside each card, so the inner locator must not carry the panel's own chain.
      const card = panel.locator('.card', {
        has: mainPage.getByRole('group', { name: 'Tab content default zoom', exact: true }),
      });
      const controls: [Locator, string][] = [
        [
          contentZoom.getByRole('button', { name: 'Decrease default zoom', exact: true }),
          'Decrease',
        ],
        [
          contentZoom.getByRole('button', { name: 'Increase default zoom', exact: true }),
          'Increase',
        ],
        [contentZoomField, 'Percentage field'],
        [contentZoom.getByRole('button', { name: 'Reset default zoom', exact: true }), 'Reset'],
      ];
      await Promise.all(
        controls.map(async ([control, what]) => {
          await expect(control).toBeVisible();
          await expectInside(control, card, `${what} (card)`);
          await expectInside(control, panel, `${what} (pane)`);
        }),
      );
    });

    await test.step('typing 137 and Enter stores 1.37', async () => {
      await contentZoomField.fill('137');
      await contentZoomField.press('Enter');
      await expect.poll(() => readSetting(mainPage, CONTENT_ZOOM_SETTING)).toBe(1.37);
      await expect(contentZoomField).toHaveValue(/^137\s%$/u);
    });

    await test.step('Escape abandons an edit', async () => {
      await contentZoomField.fill('250');
      await contentZoomField.press('Escape');
      await expect(contentZoomField).toHaveValue(/^137\s%$/u);
      // Stepping afterwards proves 250 was never committed: + steps from 137 % to the next 10 %
      // mark, 150 %, where a committed 250 % would have stepped to 260 %.
      await contentZoom.getByRole('button', { name: 'Increase default zoom', exact: true }).click();
      await expect.poll(() => readSetting(mainPage, CONTENT_ZOOM_SETTING)).toBe(1.5);
    });

    await test.step('Interface scaling shows 100 % and + writes 1.1', async () => {
      const scalingField = interfaceScaling.getByRole('textbox', {
        name: 'Percentage',
        exact: true,
      });
      await expect(scalingField).toHaveValue(/^100\s%$/u);
      await interfaceScaling
        .getByRole('button', { name: 'Increase interface scaling', exact: true })
        .click();
      await expect.poll(() => readSetting(mainPage, INTERFACE_SCALING_SETTING)).toBe(1.1);
      await expect(scalingField).toHaveValue(/^110\s%$/u);
      await interfaceScaling
        .getByRole('button', { name: 'Reset interface scaling', exact: true })
        .click();
      await expect.poll(() => readSetting(mainPage, INTERFACE_SCALING_SETTING)).toBe(1);
    });
  });
});
