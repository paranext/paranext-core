import { CSSProperties } from 'react';
import { ReplacePreviewColor, ReplacePreviewHighlightShape } from './replace-preview-types';

// Extends CSSProperties to allow CSS custom properties (e.g. --tw-ring-color) without type assertions.
type CSSWithVars = CSSProperties & Record<`--${string}`, string>;

// Shape class lookup — all classes are complete literals so Tailwind content scanning picks them up.
// Bar uses box-shadow (via --tw-ring-color) instead of CSS borders because a global
// `* { border-color: hsl(var(--border)) }` rule in app.component.scss sits outside any CSS layer
// and therefore overrides all Tailwind border-color utilities. Ring/shadow is unaffected.
const SHAPE_CLASSES: Record<ReplacePreviewHighlightShape, string> = {
  bar: 'tw-shadow-[inset_0_2px_0_0_var(--tw-ring-color),inset_0_-2px_0_0_var(--tw-ring-color)]',
  rounded: 'tw-rounded-sm tw-ring-1 tw-ring-inset',
  plain: '',
};

// Positioned variants for inline layout where find and replace spans are directly adjacent.
// Only the outer corners are rounded so the two spans look like one unified rectangle.
const SHAPE_CLASSES_LEFT: Record<ReplacePreviewHighlightShape, string> = {
  bar: 'tw-shadow-[inset_0_2px_0_0_var(--tw-ring-color),inset_0_-2px_0_0_var(--tw-ring-color)]',
  rounded: 'tw-rounded-l-sm tw-ring-1 tw-ring-inset',
  plain: '',
};

const SHAPE_CLASSES_RIGHT: Record<ReplacePreviewHighlightShape, string> = {
  bar: 'tw-shadow-[inset_0_2px_0_0_var(--tw-ring-color),inset_0_-2px_0_0_var(--tw-ring-color)]',
  rounded: 'tw-rounded-r-sm tw-ring-1 tw-ring-inset',
  plain: '',
};

// CSS custom properties for light/dark mode colors
const COLOR_STYLES: Record<
  ReplacePreviewColor,
  { light: Record<string, string>; dark: Record<string, string> }
> = {
  'red-cyan': {
    light: {
      '--find-bg': '#fee2e2', // red-100
      '--find-text': '#b91c1c', // red-700
      '--find-border': '#fca5a5', // red-300
      '--replace-bg': '#cffafe', // cyan-100
      '--replace-text': '#0369a1', // cyan-700
      '--replace-border': '#a5f3fc', // cyan-300
    },
    dark: {
      '--find-bg': '#111111', // near-black
      '--find-text': '#fca5a5', // red-300
      '--find-border': '#b91c1c', // red-700
      '--replace-bg': '#111111', // near-black
      '--replace-text': '#67e8f9', // cyan-300
      '--replace-border': '#164e63', // cyan-700
    },
  },
  'red-green': {
    light: {
      '--find-bg': '#fee2e2', // red-100
      '--find-text': '#b91c1c', // red-700
      '--find-border': '#fca5a5', // red-300
      '--replace-bg': '#dcfce7', // emerald-100
      '--replace-text': '#15803d', // emerald-700
      '--replace-border': '#86efac', // emerald-300
    },
    dark: {
      '--find-bg': '#111111', // near-black
      '--find-text': '#fca5a5', // red-300
      '--find-border': '#b91c1c', // red-700
      '--replace-bg': '#111111', // near-black
      '--replace-text': '#86efac', // emerald-300
      '--replace-border': '#166534', // emerald-700
    },
  },
  'grey-blue': {
    light: {
      '--find-bg': '#e5e7eb', // gray-200
      '--find-text': '#374151', // gray-700
      '--find-border': '#d1d5db', // gray-300
      '--replace-bg': '#dbeafe', // blue-100
      '--replace-text': '#1e40af', // blue-700
      '--replace-border': '#bfdbfe', // blue-300
    },
    dark: {
      '--find-bg': '#111111', // near-black
      '--find-text': '#f3f4f6', // gray-100
      '--find-border': '#374151', // gray-700
      '--replace-bg': '#111111', // near-black
      '--replace-text': '#93c5fd', // blue-300
      '--replace-border': '#1e3a8a', // blue-700
    },
  },
};

/** Lighter amber/gold color classes used for the find highlight in the verse text context area. */
const GOLD_FIND_COLOR = {
  bg: 'tw-bg-amber-100 dark:tw-bg-amber-950',
  text: 'tw-text-amber-700 dark:tw-text-amber-300',
  // Sets --tw-ring-color used by both the bar shadow and the rounded ring
  border: 'tw-ring-amber-600 dark:tw-ring-amber-400',
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
  const paddingClass = shape === 'bar' ? '' : 'tw-px-0.5';
  return [
    'tw-inline tw-whitespace-pre-wrap',
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
 * Returns inline style object for the gold/amber find highlight used in the verse text context
 * area. Handles dark mode colors since Tailwind's dark: prefix doesn't work with dynamically built
 * classes. TODO: When we upgrade Tailwind, switch to using its dark mode styles rather than this
 * manual approximation of what its styles do.
 */
export function getGoldFindHighlightStyle(): CSSProperties {
  const isDarkMode = document.body.classList.contains('dark');
  const style: CSSWithVars = {
    backgroundColor: isDarkMode ? '#111111' : '#fef3c7', // amber-100 light, near-black dark
    color: isDarkMode ? '#fcd34d' : '#b45309', // amber-300 dark, amber-700 light
    borderColor: isDarkMode ? '#b45309' : '#f59e0b', // amber-600 colors
    '--tw-ring-color': isDarkMode ? '#b45309' : '#f59e0b',
  };
  return style;
}

/**
 * Returns Tailwind class string and inline style for the FIND (old) highlight span. All class
 * values are complete static literals. Inline styles handle dark mode colors since they're built
 * dynamically.
 *
 * @param showLineThrough Whether to include line-through styling. Pass false for find-only
 *   highlighting where strikethrough is not desired.
 * @param position When `'left'`, only the left corners are rounded so the span visually connects to
 *   an adjacent replace span on the right (inline layout).
 */
export function getFindHighlightClasses(
  // Colors are applied via inline styles (getFindHighlightStyle), not Tailwind classes.
  // The parameter exists so callers can pass color and shape together for a consistent API.
  _color: ReplacePreviewColor,
  shape: ReplacePreviewHighlightShape,
  showLineThrough: boolean = true,
  position: 'standalone' | 'left' = 'standalone',
): string {
  const shapeClass = (position === 'left' ? SHAPE_CLASSES_LEFT : SHAPE_CLASSES)[shape];
  const decorationClass = showLineThrough ? 'tw-line-through' : '';
  const paddingClass = shape === 'bar' ? '' : 'tw-px-0.5';
  return ['tw-inline tw-whitespace-pre-wrap', paddingClass, decorationClass, shapeClass]
    .filter(Boolean)
    .join(' ');
}

/**
 * Returns inline style object for the FIND (old) highlight span to handle dark mode colors.
 *
 * @param color The color scheme to use
 */
export function getFindHighlightStyle(color: ReplacePreviewColor): CSSProperties {
  const isDarkMode = document.body.classList.contains('dark');
  const colorSet = COLOR_STYLES[color];
  const colors = isDarkMode ? colorSet.dark : colorSet.light;

  const style: CSSWithVars = {
    backgroundColor: colors['--find-bg'],
    color: colors['--find-text'],
    borderColor: colors['--find-border'],
    '--tw-ring-color': colors['--find-border'],
  };
  return style;
}

/**
 * Returns Tailwind class string and inline style for the REPLACE (new) highlight span. All class
 * values are complete static literals. Inline styles handle dark mode colors since they're built
 * dynamically.
 *
 * @param position When `'right'`, only the right corners are rounded so the span visually connects
 *   to an adjacent find span on the left (inline layout).
 */
export function getReplaceHighlightClasses(
  // Colors are applied via inline styles (getReplaceHighlightStyle), not Tailwind classes.
  // The parameter exists so callers can pass color and shape together for a consistent API.
  _color: ReplacePreviewColor,
  shape: ReplacePreviewHighlightShape,
  position: 'standalone' | 'right' = 'standalone',
): string {
  const shapeClass = (position === 'right' ? SHAPE_CLASSES_RIGHT : SHAPE_CLASSES)[shape];
  const paddingClass = shape === 'bar' ? '' : 'tw-px-0.5';
  return ['tw-inline tw-whitespace-pre-wrap', paddingClass, shapeClass].filter(Boolean).join(' ');
}

/**
 * Returns inline style object for the REPLACE (new) highlight span to handle dark mode colors.
 *
 * @param color The color scheme to use
 */
export function getReplaceHighlightStyle(color: ReplacePreviewColor): CSSProperties {
  const isDarkMode = document.body.classList.contains('dark');
  const colorSet = COLOR_STYLES[color];
  const colors = isDarkMode ? colorSet.dark : colorSet.light;

  const style: CSSWithVars = {
    backgroundColor: colors['--replace-bg'],
    color: colors['--replace-text'],
    borderColor: colors['--replace-border'],
    '--tw-ring-color': colors['--replace-border'],
  };
  return style;
}
