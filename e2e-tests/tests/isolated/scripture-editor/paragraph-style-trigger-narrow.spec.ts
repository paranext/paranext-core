/**
 * PT-4466 — the paragraph-style trigger must ellipsise its label rather than have its trailing
 * border sliced off when the editor column narrows.
 *
 * The reported failure was silent to every DOM-visibility check: the trigger stayed
 * `toBeVisible()`, its own `scrollWidth` equalled its `clientWidth`, and its text content was
 * complete — while a chunk of the button, border and chevron included, was simply not painted. The
 * button sits in a BLOCK wrapper, so it is not a flex item and the `shrink-0` in shadcn's button
 * base leaves it at its content width; the toolbar zone's `overflow-clip` then cuts whatever runs
 * past the zone edge. A child clipped by an ancestor's overflow reports no overflow of its own, so
 * the assertions here are geometric — the trigger's box against its zone's box — exactly as
 * `title-bar-narrow-width.spec.ts` does for the same class of bug.
 *
 * ONE test() per spec file (isolated-fixture / second-Electron-instance constraint — see
 * standard-default-power-mode.spec.ts). Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
  waitForHomeTab,
} from '../../../fixtures/scripture-editor-helpers';

test.use({
  interfaceMode: 'power',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/** Sub-pixel layout rounding shows up as a 1px excess that is not a real overrun. */
const ROUNDING_TOLERANCE_PX = 1;

/** Widths chosen to squeeze the editor column past the trigger's full-label width. */
const NARROW_VIEWPORT_WIDTHS_PX = [1100, 1000, 950];

test.describe('paragraph-style trigger at narrow editor widths', () => {
  test('keeps its whole box inside the toolbar zone instead of being clipped', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    await waitForHomeTab(mainPage);
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    const trigger = editorFrame.locator('[aria-label="Paragraph Selection"]');
    await expect(trigger).toBeVisible({ timeout: 60_000 });

    // The root cause, asserted directly. The geometric checks below can only bite while the style
    // name is long enough to overflow the column, which depends on where the cursor happens to sit
    // and on the sample project's marker descriptions. This one fails the moment the cap is
    // dropped, whatever the label says — the same belt-and-braces pairing
    // `title-bar-narrow-width.spec.ts` uses for its `min-width: 0` assertion.
    const maxWidth = await trigger.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(
      maxWidth,
      'The paragraph-style trigger must be capped at its wrapper width, or a long style name pushes its trailing border under the toolbar zone clip',
    ).toBe('100%');

    // One step per width rather than a loop: the widths are few and named, and a failure names the
    // width it happened at without the reader decoding an index.
    await NARROW_VIEWPORT_WIDTHS_PX.reduce(
      (previous, width) =>
        previous.then(() =>
          test.step(`the trigger stays inside its zone at ${width}px`, async () => {
            await mainPage.setViewportSize({ width, height: 900 });
            await expect(trigger).toBeVisible();

            const overrunPx = await trigger.evaluate((el) => {
              // The zone is the trigger's grandparent: the button sits inside the disabled-action
              // tooltip wrapper, which is the zone's own flex item.
              const zone = el.parentElement?.parentElement;
              if (!zone) return Number.NaN;
              return Math.round(
                el.getBoundingClientRect().right - zone.getBoundingClientRect().right,
              );
            });

            expect(
              overrunPx,
              `At a ${width}px window the paragraph-style trigger overruns its toolbar zone by ${overrunPx}px, so its trailing border and chevron are clipped instead of the label ellipsising`,
            ).toBeLessThanOrEqual(ROUNDING_TOLERANCE_PX);
          }),
        ),
      Promise.resolve(),
    );
  });
});
