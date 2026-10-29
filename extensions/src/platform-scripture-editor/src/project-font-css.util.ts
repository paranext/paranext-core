import type { StyleInfo } from '@eten-tech-foundation/platform-editor';

/** Scope the project stylesheet package uses: the editor's content element carries both classes. */
const DEFAULT_CONTAINER_SELECTOR = '.editor-input.usfm';

/**
 * Font fallbacks after a project font. `--usj-font-fallback` is defined on `.usfm` in
 * `_usj-nodes.scss` as the platform's Scripture font stack (`--scripture-font-stack` in the
 * renderer's fonts.css: Gentium Plus, Charis SIL, ...), so a project font that is not installed
 * degrades to the same face the editor shows without a project font.
 */
const FONT_FALLBACK = 'var(--usj-font-fallback, serif)';

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

function fontFamilyDeclaration(fontName: string): string {
  return `font-family: "${escapeCssString(fontName)}", ${FONT_FALLBACK}`;
}

/**
 * Builds CSS carrying only a project's fonts: the default font family and size, and the font family
 * of each marker that names one. Layout, weight, colour and size declarations of marker entries are
 * deliberately left out.
 *
 * @param styleInfo Project stylesheet info, or `undefined` when not loaded
 * @param options.containerSelector Scope the rules apply under
 * @returns CSS text, empty when there is nothing to emit
 */
export function generateProjectFontCss(
  styleInfo: StyleInfo | undefined,
  options: { containerSelector?: string } = {},
): string {
  if (!styleInfo) return '';
  const scope = options.containerSelector ?? DEFAULT_CONTAINER_SELECTOR;
  const rules: string[] = [];

  const baseDeclarations: string[] = [];
  if (styleInfo.defaultFont) baseDeclarations.push(fontFamilyDeclaration(styleInfo.defaultFont));
  if (typeof styleInfo.defaultFontSize === 'number' && styleInfo.defaultFontSize > 0)
    baseDeclarations.push(`font-size: ${styleInfo.defaultFontSize}pt`);
  if (baseDeclarations.length > 0) rules.push(`${scope} { ${baseDeclarations.join('; ')}; }`);

  Object.entries(styleInfo.markers ?? {}).forEach(([marker, entry]) => {
    const identifier = escapeCssIdentifier(marker);
    if (!identifier || !entry?.fontName) return;
    rules.push(`${scope} .usfm_${identifier} { ${fontFamilyDeclaration(entry.fontName)}; }`);
  });

  return rules.join('\n');
}
