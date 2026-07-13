/** Zoom factor where 1 = the resource's default text size. */
export const DEFAULT_ZOOM_FACTOR = 1;
/** Smallest allowed zoom factor. */
export const MIN_ZOOM_FACTOR = 0.5;
/** Largest allowed zoom factor. */
export const MAX_ZOOM_FACTOR = 3;
/** Amount one Zoom In / Zoom Out step changes the factor. */
export const ZOOM_STEP = 0.1;

/**
 * Clamps a zoom factor into `[MIN_ZOOM_FACTOR, MAX_ZOOM_FACTOR]`.
 *
 * @param factor - The zoom factor to clamp.
 * @returns The factor bounded to the allowed range.
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
 * @param factor - The zoom factor to round.
 * @returns The factor rounded to one decimal place.
 */
export function roundZoom(factor: number): number {
  return Math.round(factor * 10) / 10;
}

/**
 * Steps a factor by `deltaSteps * ZOOM_STEP`, then clamps and rounds.
 *
 * @param factor - The current zoom factor.
 * @param deltaSteps - Number of steps to apply (+1 = zoom in, −1 = zoom out).
 * @returns The new clamped, rounded zoom factor.
 */
export function adjustZoomFactor(factor: number, deltaSteps: number): number {
  return roundZoom(clampZoom(factor + deltaSteps * ZOOM_STEP));
}
