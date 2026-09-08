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
import { Page } from '@playwright/test';
import { test, expect } from '../../../fixtures/isolated.fixture';
import { setWindowWidth, waitForAppReady } from '../../../fixtures/helpers';

/**
 * A width no window can honor, so Electron clamps to the `minWidth` enforced in `main.ts`. Asking
 * for the clamp rather than hardcoding 800 keeps this test honest if that minimum ever changes —
 * whatever the app's narrowest permitted window is, the title bar has to fit in it.
 */
const IMPOSSIBLY_NARROW_PX = 1;

/** Sub-pixel layout rounding shows up as a 1px scrollWidth excess that is not a real overflow. */
const ROUNDING_TOLERANCE_PX = 1;

// Simple mode is the reported case, and it is the denser of the two bars: it carries the project
// selector that Power mode does not. firstRunComplete keeps the wizard from covering the bar.
// Seeded through the fixture's own options — a hand-rolled preConfigureSettings in a beforeEach
// would be silently overwritten by the fixture's later seeding pass (Playwright resolves a test's
// fixtures AFTER its beforeEach hooks run), flipping the spec to the fixture's Power-mode default.
test.use({
  interfaceMode: 'simple',
  seedSettings: { 'platform.firstRunComplete': true },
});

/**
 * Waits until the title bar's localized strings have resolved.
 *
 * Every assertion in this file is geometric, and an unresolved string is WIDER than the string it
 * stands for: the bar renders the raw key (`%product_shortName%`, `%mainMenu_help%`) until the
 * localization data provider answers. Measuring before then reports a bar that overflows by tens of
 * pixels and blames the layout for it.
 *
 * `waitForAppReady` does not cover this — it waits for the app's own readiness signal, which fires
 * before the strings arrive. The placeholder syntax is the honest thing to poll on, because it is
 * exactly what makes the measurement wrong.
 */
async function waitForLocalizedTitleBar(mainPage: Page): Promise<void> {
  await expect
    .poll(
      async () =>
        mainPage.locator('[data-testid="toolbar-content-row"]').evaluate((el) => {
          const text = el.textContent ?? '';
          return /%[A-Za-z0-9_]+%/.test(text);
        }),
      {
        timeout: 30_000,
        message:
          'Title bar still shows raw %localization_key% placeholders, so any width measured here is wrong',
      },
    )
    .toBe(false);
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
    await waitForLocalizedTitleBar(mainPage);
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

    // NOT asserted here: that the DOCUMENT does not scroll horizontally. That overflow is a
    // separate mechanism owned by the dock layout, not the title bar — rc-dock sums each Simple
    // mode column's `panelLock.minWidth` and adds a per-divider reserve, so the columns and the
    // window minimum have to be derived from each other or the dock demands more width than the
    // narrowest permitted window can give (see `simple-layout.data.ts` and
    // `adr-simple-mode-column-minimums`). Keeping that out of this spec is deliberate: it would wire
    // these toolbar assertions to a failure they do not own, and `simple-layout.data.test.ts`
    // already pins the column arithmetic directly.
  });

  test('essential Simple-mode controls stay visible and in-bounds when narrow', async ({
    electronApp,
    mainPage,
  }) => {
    await waitForAppReady(mainPage);
    await waitForLocalizedTitleBar(mainPage);
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
});
