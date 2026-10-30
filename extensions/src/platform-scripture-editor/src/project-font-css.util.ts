import type { StyleInfo } from '@eten-tech-foundation/platform-editor';

/**
 * Default scope, the one the project stylesheet package uses: the editor's content element carries
 * both classes.
 */
const CONTAINER_SELECTOR = '.editor-input.usfm';

/**
 * Scope for the footnotes pane's read-only rows: the rows of the pane's list, never the row being
 * edited (the editor in that row has its own project sheet) and never the main editor. It targets
 * each row's `<li>` because that element carries the platform's `scripture-font` family, which
 * would beat anything inherited from the list.
 */
export const FOOTNOTE_ROWS_SELECTOR =
  "[data-footnotes-pane] .formatted-font > li:not([data-state='editing'])";

/**
 * Font fallbacks after a project font. `--usj-font-fallback` is defined on `.usfm` in
 * `_usj-nodes.scss` as the platform's Scripture font stack (`--scripture-font-stack` in the
 * renderer's fonts.css: Gentium Plus, Charis SIL, ...), so a project font that is not installed
 * degrades to the same face the editor shows without a project font.
 */
const FONT_FALLBACK = 'var(--usj-font-fallback, serif)';

// TODO(PT-4974): Use the editor package's generateUsjFontCss({ containerSelector }) for both the
// editor scope and the footnote rows scope, and delete this file. Until then the parity tests in project-font-css.util.test.ts pin this output to generateUsjCss.

/** Escape a value for a double-quoted CSS string. */
function escapeCssString(value: string): string {
  return value.replace(/["\\\n\r\f<>]/g, (ch) => {
    if (ch === '\n') return '\\a ';
    if (ch === '\r') return '\\d ';
    if (ch === '\f') return '\\c ';
    if (ch === '<') return '\\3C ';
    if (ch === '>') return '\\3E ';
    return `\\${ch}`;
  });
}

/** Escape a marker for use after `usfm_` in a class selector (never at identifier start). */
function escapeCssIdentifier(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(value);
  return value.replace(/[^\w-]/g, (ch) => `\\${ch}`);
}

/**
 * A `font-family` declaration: the font, then the project's default font when it differs, then the
 * fallback stack.
 */
function fontFamilyDeclaration(fontName: string, projectDefaultFont?: string): string {
  const families = [fontName];
  if (projectDefaultFont && projectDefaultFont !== fontName) families.push(projectDefaultFont);
  const quoted = families.map((family) => `"${escapeCssString(family)}"`).join(', ');
  return `font-family: ${quoted}, ${FONT_FALLBACK}`;
}

/**
 * Builds CSS carrying only a project's fonts: the default font family and size, and the font family
 * of each marker that names one. Layout, weight, colour and size declarations of marker entries are
 * deliberately left out.
 *
 * @param styleInfo Project stylesheet info, or `undefined` when not loaded
 * @param options.containerSelector Selector every rule is scoped under; defaults to the editor's
 *   content element. Pass only module constants: the value is written into the sheet unescaped.
 * @returns CSS text, empty when there is nothing to emit
 */
export function generateProjectFontCss(
  styleInfo: StyleInfo | undefined,
  options?: { containerSelector?: string },
): string {
  if (!styleInfo) return '';
  const scope = options?.containerSelector ?? CONTAINER_SELECTOR;
  const rules: string[] = [];

  const baseDeclarations: string[] = [];
  if (styleInfo.defaultFont) baseDeclarations.push(fontFamilyDeclaration(styleInfo.defaultFont));
  const size = styleInfo.defaultFontSize;
  if (typeof size === 'number' && Number.isFinite(size) && size > 0)
    baseDeclarations.push(`font-size: ${size}pt`);
  if (baseDeclarations.length > 0) rules.push(`${scope} { ${baseDeclarations.join('; ')}; }`);

  Object.entries(styleInfo.markers ?? {}).forEach(([marker, entry]) => {
    const identifier = escapeCssIdentifier(marker);
    if (!identifier || !entry?.fontName) return;
    rules.push(
      `${scope} .usfm_${identifier} { ${fontFamilyDeclaration(entry.fontName, styleInfo.defaultFont)}; }`,
    );
  });

  return rules.join('\n');
}
