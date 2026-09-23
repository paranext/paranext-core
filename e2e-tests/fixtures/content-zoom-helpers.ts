/**
 * Helpers shared by the three content-zoom e2e specs that import this module —
 * `tests/isolated/notes-content-zoom/comment-list-content-zoom.spec.ts`,
 * `tests/isolated/notes-content-zoom/comments-panel-content-zoom.spec.ts`, and
 * `tests/isolated/scripture-editor/content-zoom.spec.ts`: the wheel gesture every one of them
 * drives, the memory-setting reader every one of them polls, and the indicator/zoom-area selectors
 * every one of them reads.
 */
import { type Frame, type Locator, type Page, expect } from '@playwright/test';
import { CONTENT_ZOOM_COMMANDS, readFactor, sendCommandWithId } from './scripture-editor-helpers';

/**
 * Setting key the memory-key-shape assertions read directly
 * (`src/renderer/services/web-view-content-zoom.service.ts`).
 */
export const CONTENT_ZOOM_MEMORY_SETTING = 'platform.webViewContentZoomMemory';

/**
 * The `id` the platform's zoom indicator badge is created with
 * (`web-view-content-zoom.bootstrap-script.ts`).
 */
export const INDICATOR_SELECTOR = '#platform-content-zoom-indicator';

/**
 * Ctrl+wheel over the centre of `box` (main-frame-relative coordinates, as {@link areaBox} returns).
 * `deltaY: -120` zooms in, `+120` zooms out (`web-view-content-zoom.bootstrap-script.ts`'s
 * `onWheel`: `e.deltaY < 0` is zoom-in). Does not itself wait for the effect — callers poll the
 * resulting factor, never a bare timeout, since geometry inside a zoomed frame moves and a fixed
 * wait would race the debounced write.
 */
export async function ctrlWheel(
  page: Page,
  box: { x: number; y: number; width: number; height: number },
  deltaY: number,
): Promise<void> {
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.keyboard.down('Control');
  await page.mouse.wheel(0, deltaY);
  await page.keyboard.up('Control');
}

/** Reads the `platform.webViewContentZoomMemory` setting straight from the renderer. */
export async function readContentZoomMemory(page: Page): Promise<Record<string, number>> {
  return page.evaluate((settingKey) => {
    // The renderer exposes `papi` on `globalThis`, untyped here (same pattern as
    // scripture-text-grid-zoom.spec.ts's afterEach cleanup).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const win = window as unknown as {
      papi: { settings: { get: (key: string) => Promise<Record<string, number>> } };
    };
    return win.papi.settings.get(settingKey);
  }, CONTENT_ZOOM_MEMORY_SETTING);
}

/** Indicator text with whitespace stripped, so the narrow no-break space before `%` doesn't matter. */
export async function readIndicatorText(frame: Frame): Promise<string | undefined> {
  const text = await frame.locator(INDICATOR_SELECTOR).textContent();
  return text?.replace(/\s/gu, '');
}

/** Bounding box (main-frame-relative) of one zoom area's marked root element. */
export async function areaBox(
  frame: Frame,
  areaId: string,
): Promise<{ x: number; y: number; width: number; height: number }> {
  const box = await frame.locator(`[data-platform-content-zoom-root="${areaId}"]`).boundingBox();
  if (!box) throw new Error(`Zoom area "${areaId}" has no bounding box`);
  return box;
}

/**
 * Steps one area to `target` through the zoom commands, polling the area's factor after each step
 * (a step lands after a debounced write, so a bare loop would race it). `areaId` is `'main'` or a
 * named area; `readFactor` takes `''` for `main`.
 */
export async function zoomAreaTo(
  page: Page,
  frame: Frame,
  webViewId: string,
  areaId: string,
  target: number,
): Promise<void> {
  const factorKey = areaId === 'main' ? '' : areaId;
  await sendCommandWithId(page, CONTENT_ZOOM_COMMANDS.reset, webViewId, areaId);
  await expect.poll(() => readFactor(frame, factorKey)).toBe(1);
  let current = 1;
  // Sequential zoom steps: each step's write must land (confirmed by the poll) before the next
  // command is sent, or the loop would race a debounced write.
  /* eslint-disable no-await-in-loop */
  while (Math.abs(current - target) > 0.001) {
    const stepIn = target > current;
    // Each command changes the level by exactly one 10 % step; see `adjustZoomFactor`.
    await sendCommandWithId(
      page,
      stepIn ? CONTENT_ZOOM_COMMANDS.in : CONTENT_ZOOM_COMMANDS.out,
      webViewId,
      areaId,
    );
    current = Math.round((current + (stepIn ? 0.1 : -0.1)) * 10) / 10;
    const expected = current;
    await expect.poll(() => readFactor(frame, factorKey)).toBe(expected);
  }
  /* eslint-enable no-await-in-loop */
}

/**
 * Waits until the finite animations on `popup` and its descendants have finished. A pop-up that has
 * just opened runs a short scale-in animation, and `boundingBox()` includes that transform, so a
 * box read before it ends is smaller than the settled one. Infinite animations (a spinner inside
 * the pop-up) never finish and are not waited for.
 */
export async function waitForPopupAnimations(popup: Locator): Promise<void> {
  await popup.evaluate(async (element) => {
    await Promise.all(
      element
        .getAnimations({ subtree: true })
        .filter((animation) => animation.effect?.getComputedTiming().endTime !== Infinity)
        // A cancelled animation rejects `finished`; it no longer transforms the box either.
        .map((animation) => animation.finished.catch(() => undefined)),
    );
  });
}

/** Largest gap, in pixels, between a pop-up and its trigger that still counts as "beside" it. */
const POPUP_TRIGGER_MAX_GAP_PX = 24;

/** A main-frame-relative box, as Playwright's `boundingBox()` returns it. */
export type PageBox = { x: number; y: number; width: number; height: number };

/** A frame's own box, main-frame-relative. Throws when the frame has none. */
export async function frameBox(frame: Frame): Promise<PageBox> {
  const box = await (await frame.frameElement()).boundingBox();
  if (!box) throw new Error('Frame has no box');
  return box;
}

/**
 * A pop-up trigger's main-frame box: the element's own box when `trigger` is a `Locator`, or the
 * box already given directly when it is no element of its own (a text caret or selection). Throws
 * when there is no box.
 */
export async function triggerBox(trigger: Locator | PageBox): Promise<PageBox> {
  const box = 'boundingBox' in trigger ? await trigger.boundingBox() : trigger;
  if (!box) throw new Error('Trigger has no box');
  return box;
}

/**
 * Asserts an open pop-up sits beside its trigger (touching or within
 * {@link POPUP_TRIGGER_MAX_GAP_PX} on one axis and overlapping on the other, without covering the
 * trigger), lies fully inside the web view's frame, and holds its content without overflowing.
 * `trigger` is an element, or a main-frame-relative box for a trigger that is no element of its own
 * (a text caret or selection). Waits for the pop-up's open animation first, so the boxes compared
 * are its settled ones.
 */
export async function expectPopupBesideTriggerAndInsideFrame(
  frame: Frame,
  popup: Locator,
  trigger: Locator | PageBox,
): Promise<void> {
  await waitForPopupAnimations(popup);
  const frameRect = await frameBox(frame);
  const popupBox = await popup.boundingBox();
  const triggerRect = await triggerBox(trigger);
  if (!popupBox) throw new Error('Pop-up has no box');
  const gapY = Math.max(
    popupBox.y - (triggerRect.y + triggerRect.height),
    triggerRect.y - (popupBox.y + popupBox.height),
  );
  const gapX = Math.max(
    popupBox.x - (triggerRect.x + triggerRect.width),
    triggerRect.x - (popupBox.x + popupBox.width),
  );
  const tolerance = 1;
  const boxes = `pop-up ${JSON.stringify(popupBox)}, trigger ${JSON.stringify(triggerRect)}, frame ${JSON.stringify(frameRect)}`;
  const separation = Math.max(gapX, gapY);
  // Beside = separated on at most one axis, by a small gap, and never covering the trigger.
  expect(Math.min(gapX, gapY), `separated on one axis only: ${boxes}`).toBeLessThanOrEqual(
    tolerance,
  );
  // Two boxes intersect exactly when both gaps are negative, so the larger gap must not be.
  expect(separation, `not covering the trigger: ${boxes}`).toBeGreaterThanOrEqual(-tolerance);
  expect(separation, `close to the trigger: ${boxes}`).toBeLessThanOrEqual(
    POPUP_TRIGGER_MAX_GAP_PX,
  );
  expect(popupBox.x, `inside the frame: ${boxes}`).toBeGreaterThanOrEqual(frameRect.x - tolerance);
  expect(popupBox.y, `inside the frame: ${boxes}`).toBeGreaterThanOrEqual(frameRect.y - tolerance);
  expect(popupBox.x + popupBox.width, `inside the frame: ${boxes}`).toBeLessThanOrEqual(
    frameRect.x + frameRect.width + tolerance,
  );
  expect(popupBox.y + popupBox.height, `inside the frame: ${boxes}`).toBeLessThanOrEqual(
    frameRect.y + frameRect.height + tolerance,
  );
  // The box alone is not enough: content that cannot shrink to a capped box paints past its edges
  // while the box itself looks fine. Its own scroll size must fit its client size (both in its own
  // CSS pixels, so the zoom factor cancels out). Never sideways; vertically only when the box is a
  // scroll box, where taller content scrolls inside it instead of painting past it.
  const overflow = await popup.evaluate((element) => ({
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
    scrollHeight: element.scrollHeight,
    clientHeight: element.clientHeight,
    scrollsVertically: ['auto', 'scroll'].includes(getComputedStyle(element).overflowY),
  }));
  expect(
    overflow.scrollWidth,
    `content fits sideways (scroll ${overflow.scrollWidth}, client ${overflow.clientWidth}): ${boxes}`,
  ).toBeLessThanOrEqual(overflow.clientWidth + tolerance);
  if (!overflow.scrollsVertically)
    expect(
      overflow.scrollHeight,
      `content fits vertically in a pop-up that does not scroll (scroll ${overflow.scrollHeight}, client ${overflow.clientHeight}): ${boxes}`,
    ).toBeLessThanOrEqual(overflow.clientHeight + tolerance);
}
