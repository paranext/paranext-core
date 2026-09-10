import { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from '@shared/data/platform.data';

/** Amount one zoom-in / zoom-out step changes a content zoom factor. */
export const ZOOM_STEP = 0.1;

/**
 * Kinds of web view whose content zoom is remembered per project. A view's kind decides the memory
 * key it uses; views of a kind that shows no project fall back to remembering per kind.
 *
 * @experimental This type is unstable and may change or disappear without notice
 */
export type ContentZoomKind = 'editor' | 'resource' | 'notes';

/** Clamps a zoom factor into `[MIN_ZOOM_FACTOR, MAX_ZOOM_FACTOR]`. */
export function clampZoom(factor: number): number {
  if (factor < MIN_ZOOM_FACTOR) return MIN_ZOOM_FACTOR;
  if (factor > MAX_ZOOM_FACTOR) return MAX_ZOOM_FACTOR;
  return factor;
}

/**
 * Rounds a zoom factor to one decimal place. Repeated `+ ZOOM_STEP` additions accumulate
 * binary-float error (1.1 + 0.1 = 1.2000000000000002); rounding keeps stored and compared factors
 * stable.
 */
export function roundZoom(factor: number): number {
  return Math.round(factor * 10) / 10;
}

/** Steps a factor by `deltaSteps * ZOOM_STEP`, then clamps and rounds. */
export function adjustZoomFactor(factor: number, deltaSteps: number): number {
  return roundZoom(clampZoom(factor + deltaSteps * ZOOM_STEP));
}

/** Narrow no-break space, placed between the number and `%` so the pair never wraps onto two lines. */
const NARROW_NO_BREAK_SPACE = '\u202f';

/** Formats a factor for display, e.g. `1.2` → `"120 %"` (narrow no-break space before `%`). */
export function formatZoomPercent(factor: number): string {
  return `${Math.round(factor * 100)}${NARROW_NO_BREAK_SPACE}%`;
}

/** `true` when `value` is a finite number inside the allowed zoom range. */
export function isValidZoomFactor(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= MIN_ZOOM_FACTOR &&
    value <= MAX_ZOOM_FACTOR
  );
}

/**
 * Id of the zoom area a view marks without naming one (an empty attribute value). Every adapted
 * view has at least this area.
 *
 * @experimental This constant is unstable and may change or disappear without notice
 */
export const MAIN_CONTENT_ZOOM_AREA = 'main';

const CONTENT_ZOOM_AREA_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

/**
 * `true` for a well-formed zoom area id: lower-case letters, digits and hyphens, starting with a
 * letter.
 */
export function isValidContentZoomAreaId(value: unknown): value is string {
  return typeof value === 'string' && CONTENT_ZOOM_AREA_ID_PATTERN.test(value);
}

function isContentZoomKind(value: string): value is ContentZoomKind {
  return value === 'editor' || value === 'resource' || value === 'notes';
}

/**
 * Key under which one area's level for a kind of view and an identity (project id, or the resource
 * id for views without a project) is remembered: `kind:identity:area`.
 */
export function buildContentZoomMemoryKey(
  kind: ContentZoomKind,
  identity: string,
  areaId: string,
): string {
  return `${kind}:${identity}:${areaId}`;
}

/**
 * Inverse of `buildContentZoomMemoryKey`; `undefined` for a malformed key. The identity may contain
 * colons.
 */
export function parseContentZoomMemoryKey(
  key: string,
): { kind: ContentZoomKind; identity: string; areaId: string } | undefined {
  const first = key.indexOf(':');
  const last = key.lastIndexOf(':');
  if (first <= 0 || last <= first + 1 || last === key.length - 1) return undefined;
  const kind = key.substring(0, first);
  const identity = key.substring(first + 1, last);
  const areaId = key.substring(last + 1);
  if (!isContentZoomKind(kind) || !isValidContentZoomAreaId(areaId)) return undefined;
  return { kind, identity, areaId };
}

export { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR };
