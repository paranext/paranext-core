/**
 * Routes individual CSS declarations into the three view-mode buckets the editor toggles
 * independently, and mirrors directional declarations for RTL.
 *
 * The classifier knows a closed list of 20 CSS properties (see the Handbook Marker Styling design
 * doc §3.3 and this tool's README). Each property maps to exactly one bucket:
 *
 * - `typography` — font/color appearance (e.g. `color`, `font-size`).
 * - `non-directional` — layout that reads the same in LTR and RTL (e.g. `line-height`, `text-align`).
 * - `directional` — left/right layout that must flip for RTL (e.g. `margin-left`, `padding-right`).
 *
 * Anything outside the closed list falls through to `typography` and is flagged `unknown` so the
 * caller can surface it in the generated file's warning header.
 */

/** One of the three view-mode buckets a declaration can be routed into. */
export type Bucket = 'typography' | 'non-directional' | 'directional';

/** A single CSS declaration (one `property: value` pair). */
export interface Declaration {
  property: string;
  value: string;
}

/** The bucket a declaration was routed into, plus whether its property was outside the closed list. */
export interface ClassifyResult {
  bucket: Bucket;
  /** `true` when the property is not in the known list and was defaulted to `typography`. */
  unknown: boolean;
}

const TYPOGRAPHY_PROPS = new Set([
  'color',
  'font-family',
  'font-size',
  'font-style',
  'font-variant',
  'font-weight',
  'text-decoration',
  'vertical-align',
]);

const NON_DIRECTIONAL_LAYOUT_PROPS = new Set([
  'line-height',
  'margin-bottom',
  'margin-top',
  'padding-bottom',
  'padding-top',
  'text-align',
  'text-indent',
  'white-space',
]);

const DIRECTIONAL_PROPS = new Set(['margin-left', 'margin-right', 'padding-left', 'padding-right']);

/**
 * Routes a declaration to its view-mode bucket by property name (case-insensitive).
 *
 * Unknown properties default to `typography` with `unknown: true` so they are never silently
 * dropped — the caller decides how to report them.
 *
 * @param declaration Declaration to classify; only `property` is inspected.
 * @returns The chosen bucket and whether the property was outside the known list.
 */
export function classify({ property }: Declaration): ClassifyResult {
  const prop = property.toLowerCase();
  if (DIRECTIONAL_PROPS.has(prop)) return { bucket: 'directional', unknown: false };
  if (NON_DIRECTIONAL_LAYOUT_PROPS.has(prop)) return { bucket: 'non-directional', unknown: false };
  if (TYPOGRAPHY_PROPS.has(prop)) return { bucket: 'typography', unknown: false };
  return { bucket: 'typography', unknown: true };
}

const MIRROR_PROPERTY: { [property: string]: string } = {
  'margin-left': 'margin-right',
  'margin-right': 'margin-left',
  'padding-left': 'padding-right',
  'padding-right': 'padding-left',
};

/**
 * Mirrors a directional declaration for an RTL context by swapping `*-left` ↔ `*-right`.
 *
 * Non-directional properties are returned unchanged, so this is safe to map over any declaration
 * list. The value is never altered — only the property name flips.
 *
 * @param declaration Declaration to mirror.
 * @returns A new declaration with the mirrored property, or the original if it is not directional.
 */
export function mirrorRtl({ property, value }: Declaration): Declaration {
  const mirrored = MIRROR_PROPERTY[property.toLowerCase()];
  return mirrored ? { property: mirrored, value } : { property, value };
}
