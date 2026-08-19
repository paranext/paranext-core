/**
 * PT-4218 — the Simple-mode title bar must fit at the app's enforced minimum window width.
 *
 * The original bug was silent: the toolbar's content area had no `min-w-0`, so it could not shrink
 * below its intrinsic width and the trailing controls were clipped by the row's `overflow-hidden`.
 * Everything stayed DOM-visible the whole time, so a `toBeVisible()` check would have passed while
 * the user saw a chopped-off BCV control and project selector. The assertions here are therefore
 * geometric: no overflow on the clipping element, and every essential control's box inside it.
 *
 * Unlike `title-bar-reserved-space.spec.ts` (win32-only, because it reads the Windows
 * `navigator.windowControlsOverlay`), this runs everywhere: it compares against the toolbar's own
 * client rect rather than any OS-specific overlay.
 */
import { ElectronApplication, Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { preConfigureSettings, waitForAppReady } from '../../../fixtures/helpers';

/**
 * A width no window can honor, so Electron clamps to the `minWidth` enforced in `main.ts`. Asking
 * for the clamp rather than hardcoding 800 keeps this test honest if that minimum ever changes —
 * whatever the app's narrowest permitted window is, the title bar has to fit in it.
 */
const IMPOSSIBLY_NARROW_PX = 1;

/** Comfortably wider than every container-query threshold in the degradation ladder. */
const ROOMY_WIDTH_PX = 1600;

/** Sub-pixel layout rounding shows up as a 1px scrollWidth excess that is not a real overflow. */
const ROUNDING_TOLERANCE_PX = 1;

let restoreSettings: (() => void) | undefined;

test.beforeEach(() => {
  // Simple mode is the reported case, and it is the denser of the two bars: it carries the project
  // selector that Power mode does not. firstRunComplete keeps the wizard from covering the bar.
  restoreSettings = preConfigureSettings({
    'platform.interfaceMode': 'simple',
    'platform.firstRunComplete': true,
  });
});

test.afterEach(() => {
  restoreSettings?.();
});

async function setWindowWidth(electronApp: ElectronApplication, width: number): Promise<void> {
  await electronApp.evaluate(({ BrowserWindow }, requestedWidth) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (!win) return;
    if (win.isMaximized()) win.unmaximize();
    const [, height] = win.getSize();
    win.setSize(requestedWidth, height);
  }, width);
}

/**
 * Asserts one title bar control is both present and geometrically inside the bar. Written as a
 * helper called once per control rather than a loop over a control map, so each assertion keeps its
 * own stack frame in the failure output and no per-iteration lint suppressions are needed.
 */
async function expectControlWithinRow(
  mainPage: Page,
  rowBox: { x: number; width: number },
  name: string,
  selector: string,
): Promise<void> {
  const control = mainPage.locator(selector);
  await expect(control, `${name} disappeared at the minimum window width`).toBeVisible();

  const box = await control.boundingBox();
  expect(box, `${name} has no layout box`).not.toBeNull();
  if (!box) return;

  expect(box.x, `${name} is clipped off the start of the title bar`).toBeGreaterThanOrEqual(
    rowBox.x - ROUNDING_TOLERANCE_PX,
  );
  expect(box.x + box.width, `${name} is clipped off the end of the title bar`).toBeLessThanOrEqual(
    rowBox.x + rowBox.width + ROUNDING_TOLERANCE_PX,
  );
}

test.describe('Title bar at narrow window widths', () => {
  test('Simple-mode controls fit without clipping at the minimum window width', async ({
    electronApp,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await setWindowWidth(electronApp, IMPOSSIBLY_NARROW_PX);

    const contentRow = mainPage.locator('[data-testid="toolbar-content-row"]');
    await expect(contentRow).toBeVisible();

    // Wait for the resize to settle rather than asserting against a mid-resize layout.
    await expect
      .poll(async () => (await contentRow.boundingBox())?.width ?? 0)
      .toBeLessThan(ROOMY_WIDTH_PX);

    const overflow = await contentRow.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));

    expect(
      overflow.scrollWidth,
      `Title bar overflows by ${overflow.scrollWidth - overflow.clientWidth}px at the minimum window width — controls are being clipped`,
    ).toBeLessThanOrEqual(overflow.clientWidth + ROUNDING_TOLERANCE_PX);
  });

  test('essential Simple-mode controls stay visible and in-bounds when narrow', async ({
    electronApp,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await setWindowWidth(electronApp, IMPOSSIBLY_NARROW_PX);

    const contentRow = mainPage.locator('[data-testid="toolbar-content-row"]');
    await expect(contentRow).toBeVisible();
    await expect
      .poll(async () => (await contentRow.boundingBox())?.width ?? 0)
      .toBeLessThan(ROOMY_WIDTH_PX);

    const rowBox = await contentRow.boundingBox();
    expect(rowBox).not.toBeNull();
    if (!rowBox) return;

    // Guards against "fixing" the overflow by hiding the controls the ticket is about. Both are
    // named in the report as things the user could no longer reach.
    await expectControlWithinRow(
      mainPage,
      rowBox,
      'BCV control',
      '[aria-label="book-chapter-trigger"]',
    );
    await expectControlWithinRow(
      mainPage,
      rowBox,
      'profile button',
      '[data-testid="user-profile-popover-trigger"]',
    );
  });

  test('a roomy window still shows the full project name', async ({ electronApp, mainPage }) => {
    await waitForAppReady(mainPage);
    await setWindowWidth(electronApp, ROOMY_WIDTH_PX);

    // Falsifiability guard for the degradation ladder: if the short-name swap were stuck on (a
    // broken container query, or a threshold set too high), this would fail. Paired with the
    // narrow tests above, it proves the swap is genuinely width-driven.
    const projectSelector = mainPage
      .locator('[data-testid="toolbar-content-row"] [role="combobox"]')
      .first();
    await expect(projectSelector).toBeVisible();

    await expect
      .poll(async () => (await projectSelector.textContent())?.trim() ?? '')
      .toMatch(/\(.+\)/);
  });
});
