/**
 * Clamping, rounding and stepping for a content-zoom factor, plus the range and step those
 * operations enforce. Both the platform's own per-pane zoom and the Text Collection grid's
 * per-resource zoom scale within the same `[0.5, 3]` range in steps of `0.1`, so both read these
 * from here rather than keeping their own copy.
 */

/**
 * Smallest allowed zoom factor.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const MIN_ZOOM_FACTOR = 0.5;

/**
 * Largest allowed zoom factor.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const MAX_ZOOM_FACTOR = 3;

/**
 * Amount one zoom-in / zoom-out step changes a zoom factor.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const ZOOM_STEP = 0.1;

/**
 * Clamps a zoom factor into `[MIN_ZOOM_FACTOR, MAX_ZOOM_FACTOR]`.
 *
 * @param factor The zoom factor to clamp
 * @returns The factor bounded to the allowed range
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function clampZoom(factor: number): number {
  if (factor < MIN_ZOOM_FACTOR) return MIN_ZOOM_FACTOR;
  if (factor > MAX_ZOOM_FACTOR) return MAX_ZOOM_FACTOR;
  return factor;
}

/**
 * Rounds a zoom factor to one decimal place. CSS `zoom` and repeated `+ ZOOM_STEP` additions
 * accumulate binary-float error (e.g. 1.1 + 0.1 = 1.2000000000000002); rounding keeps stored and
 * compared factors stable.
 *
 * @param factor The zoom factor to round
 * @returns The factor rounded to one decimal place
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function roundZoom(factor: number): number {
  return Math.round(factor * 10) / 10;
}

/**
 * Steps a factor by `deltaSteps * ZOOM_STEP`, then clamps and rounds.
 *
 * @param factor The current zoom factor
 * @param deltaSteps Number of steps to apply (+1 = zoom in, −1 = zoom out)
 * @returns The new clamped, rounded zoom factor
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function adjustZoomFactor(factor: number, deltaSteps: number): number {
  return roundZoom(clampZoom(factor + deltaSteps * ZOOM_STEP));
}
