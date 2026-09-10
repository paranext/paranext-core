import { describe, expect, test } from 'vitest';
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  ensureBoundsVisibleOnSomeDisplay,
} from '@main/window-bounds.util';

const PRIMARY = { bounds: { x: 0, y: 0, width: 1920, height: 1080 } };
const SECONDARY = { bounds: { x: 1920, y: 0, width: 1280, height: 1024 } };

describe('ensureBoundsVisibleOnSomeDisplay', () => {
  test('leaves bounds fully inside a display untouched', () => {
    const savedState = {
      bounds: { x: 100, y: 50, width: 800, height: 600 },
      isMaximized: false,
      isFullScreen: false,
      displayBounds: { ...PRIMARY.bounds },
    };

    expect(ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY)).toEqual(
      savedState,
    );
  });

  test('leaves bounds fully inside a secondary display untouched', () => {
    const savedState = { bounds: { x: 2000, y: 100, width: 800, height: 600 } };

    expect(ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY)).toEqual(
      savedState,
    );
  });

  test('re-places bounds from a departed display onto the primary display at default size', () => {
    // The window was on SECONDARY, which is no longer connected
    const savedState = { bounds: { x: 2000, y: 100, width: 800, height: 600 } };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY], PRIMARY);

    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
    expect(result.displayBounds).toEqual(PRIMARY.bounds);
  });

  test('keeps a maximized window maximized while re-placing it off a departed display', () => {
    const savedState = {
      bounds: { x: 2000, y: 100, width: 800, height: 600 },
      isMaximized: true,
      isFullScreen: false,
      displayBounds: { ...SECONDARY.bounds },
    };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY], PRIMARY);

    expect(result.isMaximized).toBe(true);
    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
    expect(result.displayBounds).toEqual(PRIMARY.bounds);
  });

  test('re-places a partially offscreen window (containment must be within a single display)', () => {
    // Hangs off the bottom-right of the primary display; also straddling two displays counts as
    // not contained. Same containment rule as the previous window-state keeper.
    const savedState = { bounds: { x: 1500, y: 800, width: 800, height: 600 } };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY);

    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
  });

  test('gives a maximized state with no normal bounds a default placement, still maximized', () => {
    const savedState = { isMaximized: true };

    const result = ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY, SECONDARY], PRIMARY);

    expect(result.isMaximized).toBe(true);
    expect(result.bounds).toEqual({
      x: PRIMARY.bounds.x,
      y: PRIMARY.bounds.y,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
    });
  });

  test('does not mutate the saved state it is given', () => {
    const savedState = { bounds: { x: 9999, y: 9999, width: 800, height: 600 } };
    const original = JSON.parse(JSON.stringify(savedState));

    ensureBoundsVisibleOnSomeDisplay(savedState, [PRIMARY], PRIMARY);

    expect(savedState).toEqual(original);
  });
});
