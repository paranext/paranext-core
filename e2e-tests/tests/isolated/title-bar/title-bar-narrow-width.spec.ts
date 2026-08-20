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
import {
  preConfigureSettings,
  waitForAppReady,
  waitForPapiMethodRegistered,
} from '../../../fixtures/helpers';

/**
 * The Paratext project data provider factory. The project selector stays disabled until the C#
 * backend has finished enumerating projects, which happens well after `waitForAppReady` resolves —
 * without waiting for this, the selector is still showing its disabled placeholder.
 */
const PARATEXT_PDPF_METHOD = 'object:platform.Paratext-pdpf.getProjectDataProviderId';

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

/**
 * Closes the docked DevTools the dev-mode launch opens.
 *
 * Not cosmetic — this test is entirely geometric. Docked DevTools takes its width out of the
 * renderer's layout viewport (measured: a constant 555px), so an 800px window lays the title bar
 * out in 245px. Every control then genuinely overflows, and the test reports "clipped" for a bar
 * that is fine at the width a user would actually see.
 */
async function closeDevTools(electronApp: ElectronApplication): Promise<void> {
  await electronApp.evaluate(({ BrowserWindow }) => {
    BrowserWindow.getAllWindows().forEach((win) => {
      if (win.webContents.isDevToolsOpened()) win.webContents.closeDevTools();
    });
  });
}

/**
 * Resizes the window and waits until the renderer has actually laid out at the new width.
 *
 * Returns nothing useful to assert on by design — the point is the wait. Electron clamps the
 * request to `minWidth`, so the settled width is read back from the window rather than assumed, and
 * the poll compares against THAT. An earlier version polled for "content row narrower than the
 * roomy width", which was already true before the resize and so waited for nothing: the test then
 * sampled the row's box and the controls' boxes from two different layout passes and reported
 * phantom clipping.
 */
async function setWindowWidth(
  electronApp: ElectronApplication,
  mainPage: Page,
  width: number,
): Promise<void> {
  await closeDevTools(electronApp);

  const settledWidth = await electronApp.evaluate(({ BrowserWindow }, requestedWidth) => {
    const win = BrowserWindow.getAllWindows()[0];
    // Throw rather than returning a sentinel: a 0 here would send the poll below into its full
    // 20-second timeout and then fail with a width mismatch, hiding the actual cause.
    if (!win) throw new Error('No Electron window to resize');
    if (win.isMaximized()) win.unmaximize();

    const [outerWidth, height] = win.getSize();
    // Everything the target depends on is read BEFORE `setSize`, because `setSize` is asynchronous:
    // reading the size back immediately after it returns the width the window still has, not the
    // one it is moving to. The target is derived instead — the request clamped by the window's own
    // `minWidth` (main.ts), converted from outer to content width by the frame delta, since the
    // renderer's `innerWidth` measures the content box.
    const frameDelta = outerWidth - win.getContentSize()[0];
    const target = Math.max(requestedWidth, win.getMinimumSize()[0]) - frameDelta;

    win.setSize(requestedWidth, height);
    return target;
  }, width);

  await expect
    .poll(async () => Math.abs((await mainPage.evaluate(() => window.innerWidth)) - settledWidth), {
      timeout: 20_000,
    })
    .toBeLessThanOrEqual(ROUNDING_TOLERANCE_PX);
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

/**
 * Opens the first project in the title bar's project selector, if none is open yet.
 *
 * The tier-2 short-name swap can only be observed with a project open — otherwise the trigger shows
 * the "select a project" placeholder and there is no name to swap. No fixture seeds a current
 * project, so the test drives the same selector a user would.
 */
async function ensureProjectOpen(mainPage: Page): Promise<void> {
  await waitForPapiMethodRegistered(PARATEXT_PDPF_METHOD);

  const trigger = mainPage.locator('[data-testid="toolbar-project-selector"]');
  await expect(trigger).toBeEnabled({ timeout: 60_000 });

  // Radix marks the trigger with `data-placeholder` while no value is selected. Testing the
  // rendered text instead would be wrong: the placeholder ("Select project") is itself non-empty,
  // so a text check reports "a project is open" when none is.
  const isPlaceholder = async () => trigger.evaluate((el) => el.hasAttribute('data-placeholder'));
  if (!(await isPlaceholder())) return;

  await trigger.click();
  const firstProject = mainPage.locator('[role="option"]').first();
  await expect(firstProject).toBeVisible({ timeout: 15_000 });
  await firstProject.click();
  await expect.poll(isPlaceholder, { timeout: 60_000 }).toBe(false);
}

test.describe('Title bar at narrow window widths', () => {
  test('Simple-mode controls fit without clipping at the minimum window width', async ({
    electronApp,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await setWindowWidth(electronApp, mainPage, IMPOSSIBLY_NARROW_PX);

    const contentRow = mainPage.locator('[data-testid="toolbar-content-row"]');
    await expect(contentRow).toBeVisible();

    const overflow = await contentRow.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));

    expect(
      overflow.scrollWidth,
      `Title bar overflows by ${overflow.scrollWidth - overflow.clientWidth}px at the minimum window width — controls are being clipped`,
    ).toBeLessThanOrEqual(overflow.clientWidth + ROUNDING_TOLERANCE_PX);

    // The overflow assertion above cannot fail in a core build, and it is worth being explicit
    // about why rather than leaving a green test that proves less than it looks like it does.
    // Reproducing the reported clipping needs a CROWDED bar, and two of the controls that crowd it
    // — the marketing version badge and the sync button — do not render here: the badge is driven
    // by `marketingVersion`, which is empty in paranext-core (it is set in Paratext 10 Studio,
    // where this was reported), and send/receive is unavailable in the test environment. Without
    // them the content area is never squeezed at any width the window can actually reach, and at
    // widths narrow enough to squeeze it the bar overflows with or without the fix.
    //
    // So the root cause gets a direct assertion. `min-width: auto` is the flex default that floored
    // this area at its intrinsic width and made the row clip instead of shrink (PT-4218); computed
    // `0px` is the fix, and this fails the moment the class is dropped.
    const contentArea = mainPage.locator('[data-testid="toolbar-content-area"]');
    await expect(contentArea).toBeAttached();
    const contentAreaMinWidth = await contentArea.evaluate((el) => getComputedStyle(el).minWidth);
    expect(
      contentAreaMinWidth,
      'The toolbar content area must be able to shrink below its intrinsic width, or narrow windows clip the trailing controls',
    ).toBe('0px');

    // NOT asserted here: that the DOCUMENT does not scroll horizontally. The reporter's follow-up
    // on PT-4218 mentions "the scrollbar that appears because of the overflow", which reads like
    // the same bug — it is not. Measured at the 800px minimum, the document still overflows by
    // ~108px, and the source is the dock layout, not the title bar: `simple-layout.data.ts` locks
    // each of Simple mode's three columns to `panelLock: { minWidth: 300 }`, so rc-dock's
    // `dock-hbox` computes a 908px minimum width that no window narrow enough to hit `minWidth`
    // can satisfy. Nothing in the toolbar can fix that, and what Simple mode should do below 908px
    // (drop a column, or let the columns go under 300px) is the open design question in PT-2480.
    // Asserting it here would just wire this spec to a failure it does not own.
  });

  test('essential Simple-mode controls stay visible and in-bounds when narrow', async ({
    electronApp,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await setWindowWidth(electronApp, mainPage, IMPOSSIBLY_NARROW_PX);

    const contentRow = mainPage.locator('[data-testid="toolbar-content-row"]');
    await expect(contentRow).toBeVisible();

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

  test('the project name swaps to the short name only when the bar is narrow', async ({
    electronApp,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);

    // Its own test id, not `[role="combobox"]`: the BCV control is a combobox inside the same row,
    // so that selector matches two elements and picking this one would depend on DOM order.
    const projectSelector = mainPage.locator('[data-testid="toolbar-project-selector"]');
    await expect(projectSelector).toBeVisible();

    // `innerText`, never `textContent`: both the full-name and short-name spans are always in the
    // DOM and the ladder swaps them with `display: none`. `textContent` reports hidden text too, so
    // asserting on it would pass in BOTH states and quietly test nothing.
    const renderedName = async () => (await projectSelector.innerText()).trim();

    // A project has to be open for either span to render.
    await setWindowWidth(electronApp, mainPage, ROOMY_WIDTH_PX);
    await ensureProjectOpen(mainPage);

    // Roomy: the full `Full Name (SHORT)` form, which is the only one carrying parentheses.
    await expect.poll(renderedName).toMatch(/\(.+\)/);

    // Narrow: the short name alone. Asserting the parentheses are GONE is what makes this pair
    // falsifiable — if the container query never fired, or fired always, one of these two fails.
    await setWindowWidth(electronApp, mainPage, IMPOSSIBLY_NARROW_PX);
    await expect.poll(renderedName).not.toMatch(/\(.+\)/);
    await expect.poll(renderedName).not.toBe('');
  });
});
