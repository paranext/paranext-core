/**
 * The paragraph-style trigger must keep its marker whole when the editor COLUMN is dragged to its
 * minimum width, however wide the window is.
 *
 * This is the half `paragraph-style-trigger-narrow.spec.ts` cannot reach. That spec shrinks the
 * WINDOW, which bottoms out at `WINDOW_MIN_WIDTH_PX`; a splitter drag takes the editor column down
 * to `SIMPLE_COLUMN_MIN_WIDTH_PX` (297) inside a full-screen window, which is narrower than any
 * window resize can make it. At that width the toolbar's start zone has less room than its controls
 * need, and the trigger — the only item there that shrinks — absorbed the whole deficit by cutting
 * into the marker, the one field with no shorter form. A one-character `p` loses a pixel, which is
 * why a window sweep missed it; a `q2` or `toc1` loses most of itself against the chevron.
 *
 * Three measurements, because each is blind to a failure the others catch. The marker's own
 * `scrollWidth`/`clientWidth` catches it being truncated — the trigger is capped at its wrapper and
 * so reports no overflow of its own while a field inside it is clipped. The marker's box against
 * the trigger's catches the opposite shape: a field with a width floor does not truncate when the
 * box around it is squeezed, it spills out and is painted over the trigger's border. And the
 * overrun check from the window spec is kept because the floor that keeps the marker whole must not
 * push the trigger back out past the zone edge it was clipped by before.
 *
 * ONE test() per spec file (isolated-fixture / second-Electron-instance constraint — see
 * standard-default-power-mode.spec.ts). Run: `npm run test:e2e:isolated scripture-editor`.
 */
import { test, expect } from '../../../fixtures/isolated.fixture';
import {
  makeSampleProjectEditable,
  navigateToolbarBcv,
  openEditableScriptureEditorForProject,
  SAMPLE_WEB_PROJECT_ID,
} from '../../../fixtures/scripture-editor-helpers';

// interfaceMode 'simple' is what puts the editor in a fixed 3-column layout with a per-column
// minimum width, which is the geometry this spec is about.
// DEV_NOISY=false: the noisy dev test layout replaces the normal layouts (see scroll-group-sync.spec.ts).
test.use({
  interfaceMode: 'simple',
  electronLaunchOptions: { isolatedProjectRoot: true, envOverrides: { DEV_NOISY: 'false' } },
});

/** Sub-pixel layout rounding shows up as a 1px excess that is not a real overrun. */
const ROUNDING_TOLERANCE_PX = 1;

/**
 * `SIMPLE_COLUMN_MIN_WIDTH_PX` from `simple-layout.data.ts`, plus room for the rounding the dock's
 * flex weights introduce. Asserted as an upper bound on the column, so the test states that the
 * drag really did reach the floor rather than stopping somewhere comfortable.
 */
const COLUMN_FLOOR_CEILING_PX = 310;

/** A block whose marker is more than one character, so a clipped marker is measurable. */
const MULTI_CHARACTER_MARKER = 'q2';

test.describe('paragraph-style trigger at the editor column floor', () => {
  test('keeps the marker whole when the column is dragged to its minimum width', async ({
    mainPage,
  }) => {
    // Heavy isolated test (own Electron instance + backend-readiness gates). 3x "slow" budget.
    test.slow();

    // No `waitForHomeTab`: simple mode loads the static simpleLayout, which has no Home tab.
    await makeSampleProjectEditable();
    const editorId = await openEditableScriptureEditorForProject(mainPage, SAMPLE_WEB_PROJECT_ID);
    const editorFrame = mainPage.frameLocator(`iframe[data-web-view-id="${editorId}"]`);
    await editorFrame.locator('.editor-container').waitFor({ timeout: 60_000 });

    // Genesis 3 is poetry from verse 14 on, so it carries `\q2` blocks.
    await navigateToolbarBcv(mainPage, 'Genesis 3:14');
    const poetryBlock = editorFrame.locator(`[data-marker="${MULTI_CHARACTER_MARKER}"]`).first();
    await poetryBlock.waitFor({ timeout: 60_000 });
    await poetryBlock.click();

    const trigger = editorFrame.locator('[aria-label="Paragraph style"]');
    await expect(trigger).toBeVisible({ timeout: 60_000 });
    // Positive control: everything below is vacuous if the caret never landed in a multi-character
    // marker, because a one-character marker cannot overflow by more than the rounding tolerance.
    await expect(trigger).toContainText(MULTI_CHARACTER_MARKER);

    await test.step('drag the editor/resources splitter to the column floor', async () => {
      // The second divider is the one between the editor column and the resources column.
      const divider = mainPage.locator('.dock-divider').nth(1);
      const dividerBox = await divider.boundingBox();
      expect(dividerBox).not.toBeNull();
      if (!dividerBox) return;

      const startX = dividerBox.x + dividerBox.width / 2;
      const y = dividerBox.y + dividerBox.height / 2;
      await mainPage.mouse.move(startX, y);
      await mainPage.mouse.down();
      // Stepped, and with a small first nudge: rc-dock's drag manager starts tracking on the first
      // move that differs from where the press landed, so a single jump to the target does nothing.
      // The target is far past the floor on purpose — the dock clamps at the floor, which is
      // exactly the state under test.
      const dragPath = [startX - 5];
      for (let x = startX - 5; x > 1; x -= 40) dragPath.push(Math.max(x - 40, 1));
      // Sequenced through a promise chain rather than an await-in-loop: the moves have to arrive in
      // order, and the same pattern is used in paragraph-style-trigger-narrow.spec.ts.
      await dragPath.reduce(
        (previous, x) => previous.then(() => mainPage.mouse.move(x, y)),
        Promise.resolve(),
      );
      await mainPage.mouse.up();

      const columnWidth = await mainPage
        .locator('.dock-panel')
        .nth(1)
        .evaluate((el) => el.getBoundingClientRect().width);
      expect(
        Math.round(columnWidth),
        'The drag did not reach the column floor, so the assertions below prove nothing',
      ).toBeLessThanOrEqual(COLUMN_FLOOR_CEILING_PX);
    });

    const geometry = await trigger.evaluate((el) => {
      // The marker sits in a monospace span inside the label's primary field; the field is what
      // clips, so measure the field.
      const primary = el.querySelectorAll('span')[1];
      // The zone is the trigger's grandparent: the button sits inside the disabled-action tooltip
      // wrapper, which is the zone's own flex item.
      const zone = el.parentElement?.parentElement;
      return {
        label: el.textContent,
        markerShownPx: primary?.clientWidth ?? Number.NaN,
        markerNeededPx: primary?.scrollWidth ?? Number.NaN,
        // How far the marker's own box escapes the button's. A floored field does not report
        // clipping when the box around it is squeezed — it keeps its width and spills out of the
        // button instead, painting over the border and then being cut by the zone. That reads
        // exactly like the reported bug and is invisible to both of the other measurements.
        markerSpillPx: primary
          ? Math.round(primary.getBoundingClientRect().right - el.getBoundingClientRect().right)
          : Number.NaN,
        overrunPx: zone
          ? Math.round(el.getBoundingClientRect().right - zone.getBoundingClientRect().right)
          : Number.NaN,
        hasChevron: !!el.querySelector('svg'),
      };
    });

    expect(
      geometry.markerShownPx,
      `At the column floor the marker "${geometry.label}" has ${geometry.markerShownPx}px of the ${geometry.markerNeededPx}px it needs, so it is sliced against the trigger's trailing edge`,
    ).toBeGreaterThanOrEqual(geometry.markerNeededPx);

    expect(
      geometry.markerSpillPx,
      `At the column floor the marker "${geometry.label}" extends ${geometry.markerSpillPx}px past the trigger's own box, so it is painted over the trigger's trailing border and cut by the toolbar zone`,
    ).toBeLessThanOrEqual(ROUNDING_TOLERANCE_PX);

    expect(
      geometry.overrunPx,
      `At the column floor the trigger overruns its toolbar zone by ${geometry.overrunPx}px, so its trailing border is clipped instead`,
    ).toBeLessThanOrEqual(ROUNDING_TOLERANCE_PX);

    // The room for the whole marker comes from dropping the chevron at this step. If it is back,
    // the trigger is only fitting because the marker happens to be short.
    expect(
      geometry.hasChevron,
      'The chevron is still rendered at the column floor, which is the width it gives way at',
    ).toBe(false);
  });
});
