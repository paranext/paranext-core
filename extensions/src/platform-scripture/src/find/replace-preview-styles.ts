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

/** Maps invisible/whitespace code points to visible stand-in symbols */
const INVISIBLE_CHAR_SYMBOLS: Record<string, string> = {
  '\u0020': '·', // regular space → middle dot
  '\u00a0': '[Nbsp]', // non-breaking space — distinguished from regular space
  '\u200b': '​‹ZW›', // zero-width space
  '\u200c': '‹ZWN›', // zero-width non-joiner
  '\u200d': '‹ZWJ›', // zero-width joiner
  '\u200e': '‹LRM›', // left-to-right mark
  '\u200f': '‹RLM›', // right-to-left mark
  '\u2060': '‹WJ›', // word joiner
  '\u202f': '·', // narrow no-break space
  '\u2009': '·', // thin space
  '\u200a': '·', // hair space
  '\u2002': '·', // en space
  '\u2003': '·', // em space
  '\u3000': '·', // ideographic space
  // ~ is intentionally omitted here; it is added dynamically when allowInvisibleCharacters is false,
  // because in that mode ~ represents NBSP in USFM and should render as [Nbsp]. When
  // allowInvisibleCharacters is true, ~ is a literal tilde in the text and must not be substituted.
};

// The regex intentionally mixes regular spaces and Unicode zero-width/whitespace code points in one
// character class. ESLint flags this as "misleading" because some of these code points (e.g.
// \u200d ZERO WIDTH JOINER) are normally combiners that modify adjacent characters rather than
// standing alone, so grouping them with ordinary characters in `[...]` can look unintentional.
// Here it is intentional: we want a single pass that catches every invisible/whitespace variant.
/* eslint-disable no-misleading-character-class */
/** Matches all handled invisible/whitespace chars, including the USFM tilde NBSP escape. */
const INVISIBLE_CHAR_REGEX_WITH_TILDE =
  /[ \u00a0\u200b\u200c\u200d\u200e\u200f\u2060\u202f\u2009\u200a\u2002\u2003\u3000~]/g;
/** Matches all handled invisible/whitespace chars, excluding tilde (for AllowInvisibleChars=true). */
const INVISIBLE_CHAR_REGEX_WITHOUT_TILDE =
  /[ \u00a0\u200b\u200c\u200d\u200e\u200f\u2060\u202f\u2009\u200a\u2002\u2003\u3000]/g;
/* eslint-enable no-misleading-character-class */

/**
 * Replaces invisible/whitespace characters with visible stand-in symbols. Regular visible
 * characters pass through unchanged.
 *
 * @param text The text to process
 * @param allowInvisibleCharacters Whether the project has AllowInvisibleChars enabled. When `false`
 *   (the default), the USFM tilde `~` is treated as a NBSP escape and rendered as `[Nbsp]`. When
 *   `true`, `~` is a literal tilde in the project's USFM and is left unchanged.
 */
export function renderWithInvisibleChars(
  text: string,
  allowInvisibleCharacters: boolean = false,
): string {
  if (allowInvisibleCharacters) {
    return text.replace(
      INVISIBLE_CHAR_REGEX_WITHOUT_TILDE,
      (ch) => INVISIBLE_CHAR_SYMBOLS[ch] ?? ch,
    );
  }
  // In legacy mode ~ represents NBSP — render it the same as U+00A0
  return text.replace(INVISIBLE_CHAR_REGEX_WITH_TILDE, (ch) =>
    ch === '~' ? '[Nbsp]' : (INVISIBLE_CHAR_SYMBOLS[ch] ?? ch),
  );
}

/**
 * Replaces trailing spaces with non-breaking spaces so they receive background-color and
 * text-decoration styling inside the highlighted find span. Since `\u00a0` is in
 * {@link INVISIBLE_CHAR_SYMBOLS}, `renderWithInvisibleChars` will render it as `[Nbsp]` when
 * `showInvisible` is enabled. Note: trailing spaces that were originally U+0020 will appear as
 * `[Nbsp]` rather than `·` due to this substitution, which is acceptable since the key information
 * (the match ends in whitespace) is still conveyed.
 */
export function preserveTrailingSpaces(text: string): string {
  return text.replace(/ +$/, (spaces) => '\u00a0'.repeat(spaces.length));
}
