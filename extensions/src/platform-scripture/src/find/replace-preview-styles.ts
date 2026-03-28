import { ReplacePreviewColor, ReplacePreviewHighlightShape } from './replace-preview-types';

// Shape class lookup — all classes are complete literals so Tailwind content scanning picks them up.
// Bar uses box-shadow (via --tw-ring-color) instead of CSS borders because a global
// `* { border-color: hsl(var(--border)) }` rule in app.component.scss sits outside any CSS layer
// and therefore overrides all Tailwind border-color utilities. Ring/shadow is unaffected.
const SHAPE_CLASSES: Record<ReplacePreviewHighlightShape, string> = {
  bar: 'tw-shadow-[inset_0_2px_0_0_var(--tw-ring-color),inset_0_-2px_0_0_var(--tw-ring-color)]',
  rounded: 'tw-rounded-sm tw-ring-1 tw-ring-inset',
  plain: '',
};

/** Lighter amber/gold color classes used for the find highlight in the verse text context area. */
const GOLD_FIND_COLOR = {
  bg: 'tw-bg-amber-100 dark:tw-bg-amber-900',
  text: 'tw-text-amber-700 dark:tw-text-amber-300',
  // Sets --tw-ring-color used by both the bar shadow and the rounded ring
  border: 'tw-ring-amber-600 dark:tw-ring-amber-400',
};

// Color classes for the FIND (old) highlight
const FIND_COLOR_CLASSES: Record<
  ReplacePreviewColor,
  { bg: string; text: string; border: string }
> = {
  'red-cyan': {
    bg: 'tw-bg-red-100 dark:tw-bg-red-950',
    text: 'tw-text-red-700 dark:tw-text-red-300',
    border: 'tw-border-red-400 dark:tw-border-red-600 tw-ring-red-400 dark:tw-ring-red-600',
  },
  'red-green': {
    bg: 'tw-bg-red-100 dark:tw-bg-red-950',
    text: 'tw-text-red-700 dark:tw-text-red-300',
    border: 'tw-border-red-400 dark:tw-border-red-600 tw-ring-red-400 dark:tw-ring-red-600',
  },
  'grey-blue': {
    bg: 'tw-bg-gray-100 dark:tw-bg-gray-800',
    text: 'tw-text-gray-600 dark:tw-text-gray-400',
    border: 'tw-border-gray-400 dark:tw-border-gray-500 tw-ring-gray-400 dark:tw-ring-gray-500',
  },
};

// Color classes for the REPLACE (new) highlight
const REPLACE_COLOR_CLASSES: Record<
  ReplacePreviewColor,
  { bg: string; text: string; border: string }
> = {
  'red-cyan': {
    bg: 'tw-bg-cyan-100 dark:tw-bg-cyan-950',
    text: 'tw-text-cyan-700 dark:tw-text-cyan-300',
    border: 'tw-border-cyan-400 dark:tw-border-cyan-600 tw-ring-cyan-400 dark:tw-ring-cyan-600',
  },
  'red-green': {
    bg: 'tw-bg-green-100 dark:tw-bg-green-950',
    text: 'tw-text-green-700 dark:tw-text-green-300',
    border: 'tw-border-green-400 dark:tw-border-green-600 tw-ring-green-400 dark:tw-ring-green-600',
  },
  'grey-blue': {
    bg: 'tw-bg-blue-100 dark:tw-bg-blue-950',
    text: 'tw-text-blue-700 dark:tw-text-blue-300',
    border: 'tw-border-blue-400 dark:tw-border-blue-600 tw-ring-blue-400 dark:tw-ring-blue-600',
  },
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
  return [
    'tw-inline tw-px-0.5 tw-whitespace-pre-wrap',
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
 * static literals.
 *
 * @param showLineThrough Whether to include line-through styling. Pass false for find-only
 *   highlighting where strikethrough is not desired.
 */
export function getFindHighlightClasses(
  color: ReplacePreviewColor,
  shape: ReplacePreviewHighlightShape,
  showLineThrough: boolean = true,
): string {
  const c = FIND_COLOR_CLASSES[color];
  const shapeClass = SHAPE_CLASSES[shape];
  const borderClass = shape !== 'plain' ? c.border : '';
  return [
    'tw-inline tw-px-0.5 tw-whitespace-pre-wrap',
    showLineThrough ? 'tw-line-through' : '',
    c.bg,
    c.text,
    shapeClass,
    borderClass,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Returns Tailwind class string for the REPLACE (new) highlight span. All class values are complete
 * static literals.
 */
export function getReplaceHighlightClasses(
  color: ReplacePreviewColor,
  shape: ReplacePreviewHighlightShape,
): string {
  const c = REPLACE_COLOR_CLASSES[color];
  const shapeClass = SHAPE_CLASSES[shape];
  const borderClass = shape !== 'plain' ? c.border : '';
  return ['tw-inline tw-px-0.5 tw-whitespace-pre-wrap', c.bg, c.text, shapeClass, borderClass]
    .filter(Boolean)
    .join(' ');
}

/** Maps invisible/whitespace code points to visible stand-in symbols */
const INVISIBLE_CHAR_SYMBOLS: Record<string, string> = {
  '\u0020': '·', // regular space → middle dot
  '\u00a0': '·', // non-breaking space
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
  '~': '·', // USFM non-breaking space tilde
};

// The regex intentionally mixes regular spaces and Unicode zero-width/whitespace code points in one
// character class. ESLint flags this as "misleading" because some of these code points (e.g.
// \u200d ZERO WIDTH JOINER) are normally combiners that modify adjacent characters rather than
// standing alone, so grouping them with ordinary characters in `[...]` can look unintentional.
// Here it is intentional: we want a single pass that catches every invisible/whitespace variant.
/* eslint-disable no-misleading-character-class */
const INVISIBLE_CHAR_REGEX =
  /[ \u00a0\u200b\u200c\u200d\u200e\u200f\u2060\u202f\u2009\u200a\u2002\u2003\u3000~]/g;
/* eslint-enable no-misleading-character-class */

/**
 * Replaces invisible/whitespace characters with visible stand-in symbols. Regular visible
 * characters pass through unchanged.
 */
export function renderWithInvisibleChars(text: string): string {
  return text.replace(INVISIBLE_CHAR_REGEX, (ch) => INVISIBLE_CHAR_SYMBOLS[ch] ?? ch);
}

/**
 * Replaces trailing spaces with non-breaking spaces so they receive background-color and
 * text-decoration styling inside the highlighted find span. Since `\u00a0` is in
 * {@link INVISIBLE_CHAR_SYMBOLS}, `renderWithInvisibleChars` will still render it as `·` when
 * `showInvisible` is enabled.
 */
export function preserveTrailingSpaces(text: string): string {
  return text.replace(/ +$/, (spaces) => '\u00a0'.repeat(spaces.length));
}
