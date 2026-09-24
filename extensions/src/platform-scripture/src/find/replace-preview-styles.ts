import { ReplacePreviewColor, ReplacePreviewHighlightShape } from './replace-preview-types';

// Shape class lookup — all classes are complete literals so Tailwind content scanning picks them up.
// Bar uses box-shadow (via --tw-ring-color) instead of CSS borders because a global
// `* { border-color: hsl(var(--border)) }` rule in app.component.scss sits outside any CSS layer
// and therefore overrides all Tailwind border-color utilities. Ring/shadow is unaffected.
const SHAPE_CLASSES: Record<ReplacePreviewHighlightShape, string> = {
  bar: 'tw:shadow-[inset_0_2px_0_0_var(--tw-ring-color),inset_0_-2px_0_0_var(--tw-ring-color)]',
  rounded: 'tw:rounded-sm tw:ring-1 tw:ring-inset',
  plain: '',
};

// Positioned variants for inline layout where find and replace spans are directly adjacent.
// Only the outer corners are rounded so the two spans look like one unified rectangle.
const SHAPE_CLASSES_LEFT: Record<ReplacePreviewHighlightShape, string> = {
  bar: 'tw:shadow-[inset_0_2px_0_0_var(--tw-ring-color),inset_0_-2px_0_0_var(--tw-ring-color)]',
  rounded: 'tw:rounded-l-sm tw:ring-1 tw:ring-inset',
  plain: '',
};

const SHAPE_CLASSES_RIGHT: Record<ReplacePreviewHighlightShape, string> = {
  bar: 'tw:shadow-[inset_0_2px_0_0_var(--tw-ring-color),inset_0_-2px_0_0_var(--tw-ring-color)]',
  rounded: 'tw:rounded-r-sm tw:ring-1 tw:ring-inset',
  plain: '',
};

// Color class lookups — all classes are complete literals so Tailwind content scanning picks them
// up. Dark mode uses a near-black background so the highlights read as colored text on dark. The
// ring color classes set --tw-ring-color, which both the rounded ring and the bar shadow consume.
const FIND_COLOR_CLASSES: Record<ReplacePreviewColor, string> = {
  'red-cyan':
    'tw:bg-red-100 tw:text-red-700 tw:ring-red-300 tw:dark:bg-[#111111] tw:dark:text-red-300 tw:dark:ring-red-700',
  'red-green':
    'tw:bg-red-100 tw:text-red-700 tw:ring-red-300 tw:dark:bg-[#111111] tw:dark:text-red-300 tw:dark:ring-red-700',
  'grey-blue':
    'tw:bg-gray-200 tw:text-gray-700 tw:ring-gray-300 tw:dark:bg-[#111111] tw:dark:text-gray-100 tw:dark:ring-gray-700',
};

const REPLACE_COLOR_CLASSES: Record<ReplacePreviewColor, string> = {
  'red-cyan':
    'tw:bg-cyan-100 tw:text-sky-700 tw:ring-cyan-200 tw:dark:bg-[#111111] tw:dark:text-cyan-300 tw:dark:ring-cyan-900',
  'red-green':
    'tw:bg-green-100 tw:text-green-700 tw:ring-green-300 tw:dark:bg-[#111111] tw:dark:text-green-300 tw:dark:ring-green-800',
  'grey-blue':
    'tw:bg-blue-100 tw:text-blue-800 tw:ring-blue-200 tw:dark:bg-[#111111] tw:dark:text-blue-300 tw:dark:ring-blue-900',
};

// Text-only color classes for the REPLACE (new) highlight. Used with `tw:bg-current` to draw the
// deletion bar shown when replacing with an empty string.
const REPLACE_TEXT_COLOR_CLASSES: Record<ReplacePreviewColor, string> = {
  'red-cyan': 'tw:text-sky-700 tw:dark:text-cyan-300',
  'red-green': 'tw:text-green-700 tw:dark:text-green-300',
  'grey-blue': 'tw:text-blue-800 tw:dark:text-blue-300',
};

/** Lighter amber/gold color classes used for the find highlight in the verse text context area. */
const GOLD_FIND_COLOR = {
  bg: 'tw:bg-amber-100 tw:dark:bg-[#111111]',
  text: 'tw:text-amber-700 tw:dark:text-amber-300',
  // Sets --tw-ring-color used by both the bar shadow and the rounded ring
  border: 'tw:ring-amber-500 tw:dark:ring-amber-700',
};

/**
 * Returns Tailwind class string for the gold/amber find highlight used in the verse text context
 * area. Respects the current highlight shape but always uses the lighter amber/gold color scheme.
 *
 * @param shape The highlight shape to apply
 */
export function getGoldFindHighlightClasses(shape: ReplacePreviewHighlightShape): string {
  const shapeClass = SHAPE_CLASSES[shape];
  const borderClass = shape !== 'plain' ? GOLD_FIND_COLOR.border : '';
  // Bar uses top/bottom shadow lines with no side decoration, so no horizontal padding needed
  const paddingClass = shape === 'bar' ? '' : 'tw:px-0.5';
  return [
    'tw:inline tw:whitespace-pre-wrap',
    paddingClass,
    GOLD_FIND_COLOR.bg,
    GOLD_FIND_COLOR.text,
    shapeClass,
    borderClass,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Returns Tailwind class string for the FIND (old) highlight span. All class values are complete
 * static literals, including the `dark:` variants that handle dark mode colors.
 *
 * @param color The color scheme to use
 * @param shape The highlight shape to apply
 * @param showLineThrough Whether to include line-through styling. Pass false for find-only
 *   highlighting where strikethrough is not desired.
 * @param position When `'left'`, only the left corners are rounded so the span visually connects to
 *   an adjacent replace span on the right (inline layout).
 */
export function getFindHighlightClasses(
  color: ReplacePreviewColor,
  shape: ReplacePreviewHighlightShape,
  showLineThrough: boolean = true,
  position: 'standalone' | 'left' = 'standalone',
): string {
  const shapeClass = (position === 'left' ? SHAPE_CLASSES_LEFT : SHAPE_CLASSES)[shape];
  const decorationClass = showLineThrough ? 'tw:line-through' : '';
  const paddingClass = shape === 'bar' ? '' : 'tw:px-0.5';
  return [
    'tw:inline tw:whitespace-pre-wrap',
    paddingClass,
    decorationClass,
    FIND_COLOR_CLASSES[color],
    shapeClass,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Returns Tailwind class string for the REPLACE (new) highlight span. All class values are complete
 * static literals, including the `dark:` variants that handle dark mode colors.
 *
 * @param color The color scheme to use
 * @param shape The highlight shape to apply
 * @param position When `'right'`, only the right corners are rounded so the span visually connects
 *   to an adjacent find span on the left (inline layout).
 */
export function getReplaceHighlightClasses(
  color: ReplacePreviewColor,
  shape: ReplacePreviewHighlightShape,
  position: 'standalone' | 'right' = 'standalone',
): string {
  const shapeClass = (position === 'right' ? SHAPE_CLASSES_RIGHT : SHAPE_CLASSES)[shape];
  const paddingClass = shape === 'bar' ? '' : 'tw:px-0.5';
  return [
    'tw:inline tw:whitespace-pre-wrap',
    paddingClass,
    REPLACE_COLOR_CLASSES[color],
    shapeClass,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Returns Tailwind text color classes matching the REPLACE (new) highlight text color. Combine with
 * `tw:bg-current` to draw elements in the replace color (e.g. the deletion bar shown when replacing
 * with an empty string).
 *
 * @param color The color scheme to use
 */
export function getReplaceTextColorClasses(color: ReplacePreviewColor): string {
  return REPLACE_TEXT_COLOR_CLASSES[color];
}
