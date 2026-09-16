/**
 * Helpers shared by the three content-zoom e2e specs that import this module —
 * `tests/isolated/notes-content-zoom/comment-list-content-zoom.spec.ts`,
 * `tests/isolated/notes-content-zoom/comments-panel-content-zoom.spec.ts`, and
 * `tests/isolated/scripture-editor/content-zoom.spec.ts`: the wheel gesture every one of them
 * drives, the memory-setting reader every one of them polls, and the indicator/zoom-area selectors
 * every one of them reads.
 */
import { type Frame, type Page } from '@playwright/test';

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
