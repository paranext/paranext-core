/**
 * Property key under which the library's `useDismissOnWindowBlur` marks the `pointerdown` it
 * dispatches for a window blur. It must equal the library's key; `window-blur-press.util.test.tsx`
 * fails if the two differ.
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const WINDOW_BLUR_PRESS_MARKER = Symbol.for('platform-bible-react.window-blur-press');

/**
 * Whether this event is the press `useDismissOnWindowBlur` dispatches for a window blur.
 *
 * @experimental This function is unstable and may change or disappear without notice
 */
export function isWindowBlurPress(event: Event): boolean {
  return Reflect.get(event, WINDOW_BLUR_PRESS_MARKER) === true;
}
