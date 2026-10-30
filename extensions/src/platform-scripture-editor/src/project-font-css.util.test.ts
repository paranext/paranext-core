import { generateUsjCss } from '@eten-tech-foundation/platform-editor';
import type { MarkerStyleInfo, StyleInfo } from '@eten-tech-foundation/platform-editor';
import { describe, expect, it } from 'vitest';
import { FOOTNOTE_ROWS_SELECTOR, generateProjectFontCss } from './project-font-css.util';

const FALLBACK = 'var(--usj-font-fallback, serif)';
const SCOPE = '.editor-input.usfm';

function styleInfo(overrides: Partial<StyleInfo> = {}): StyleInfo {
  return { defaultFont: '', defaultFontSize: 0, markers: {}, ...overrides };
}

/** A character-style marker entry with the given extra fields. */
function marker(name: string, extra: Partial<MarkerStyleInfo> = {}): MarkerStyleInfo {
  return { marker: name, styleType: 'character', ...extra };
}

describe('generateProjectFontCss', () => {
  it('returns an empty string without style info', () => {
    expect(generateProjectFontCss(undefined)).toBe('');
  });

  it('returns an empty string when nothing font-related is set', () => {
    expect(generateProjectFontCss(styleInfo())).toBe('');
  });

  it('emits the default font ahead of the fallback stack, and the size in points', () => {
    expect(
      generateProjectFontCss(styleInfo({ defaultFont: 'Ezra SIL', defaultFontSize: 14 })),
    ).toBe(`${SCOPE} { font-family: "Ezra SIL", ${FALLBACK}; font-size: 14pt; }`);
  });

  it.each([0, -1, undefined, Number.NaN, Number.POSITIVE_INFINITY])(
    'omits the size when it is %s',
    (defaultFontSize) => {
      expect(
        generateProjectFontCss(styleInfo({ defaultFont: 'A', defaultFontSize })),
      ).not.toContain('font-size');
    },
  );

  it('emits only the size when there is no default font', () => {
    expect(generateProjectFontCss(styleInfo({ defaultFontSize: 12 }))).toBe(
      `${SCOPE} { font-size: 12pt; }`,
    );
  });

  it('scopes base and marker rules to a given container', () => {
    const css = generateProjectFontCss(
      styleInfo({
        defaultFont: 'Ezra SIL',
        defaultFontSize: 14,
        markers: { ft: marker('ft', { fontName: 'Noto', bold: true }) },
      }),
      { containerSelector: FOOTNOTE_ROWS_SELECTOR },
    );
    expect(css).toBe(
      `${FOOTNOTE_ROWS_SELECTOR} { font-family: "Ezra SIL", ${FALLBACK}; font-size: 14pt; }\n` +
        `${FOOTNOTE_ROWS_SELECTOR} .usfm_ft { font-family: "Noto", "Ezra SIL", ${FALLBACK}; }`,
    );
    expect(css).not.toContain('.editor-input');
    expect(css).not.toContain('bold');
  });

  it('escapes quotes and backslashes in font names', () => {
    expect(generateProjectFontCss(styleInfo({ defaultFont: 'A"B\\C' }))).toContain(
      'font-family: "A\\"B\\\\C", ',
    );
  });

  it('escapes angle brackets in font names so a name cannot close the style element', () => {
    expect(generateProjectFontCss(styleInfo({ defaultFont: 'A<B>C' }))).toContain(
      'font-family: "A\\3C B\\3E C", ',
    );
  });

  it('emits a rule only for markers with a font name, escaping the marker', () => {
    const css = generateProjectFontCss(
      styleInfo({
        markers: {
          nd: marker('nd', { fontName: 'Noto' }),
          'x.y': marker('x.y', { fontName: 'Dotted' }),
          bd: marker('bd', { bold: true }),
        },
      }),
    );
    expect(css).toBe(
      [
        `${SCOPE} .usfm_nd { font-family: "Noto", ${FALLBACK}; }`,
        `${SCOPE} .usfm_x\\.y { font-family: "Dotted", ${FALLBACK}; }`,
      ].join('\n'),
    );
  });

  it('skips a marker whose escaped name is empty', () => {
    expect(
      generateProjectFontCss(styleInfo({ markers: { '': marker('', { fontName: 'X' }) } })),
    ).toBe('');
  });

  it('emits no layout, weight or size declarations from marker entries', () => {
    const css = generateProjectFontCss(
      styleInfo({
        markers: { p: marker('p', { fontName: 'X', bold: true, leftMargin: 1, fontSize: 14 }) },
      }),
    );
    expect(css).toBe(`${SCOPE} .usfm_p { font-family: "X", ${FALLBACK}; }`);
  });

  it('follows a marker font with the project default font, then the fallback', () => {
    const css = generateProjectFontCss(
      styleInfo({ defaultFont: 'Ezra SIL', markers: { nd: marker('nd', { fontName: 'Noto' }) } }),
    );
    expect(css).toContain(`.usfm_nd { font-family: "Noto", "Ezra SIL", ${FALLBACK}; }`);
  });

  it('does not repeat the default font after a marker font equal to it', () => {
    const css = generateProjectFontCss(
      styleInfo({
        defaultFont: 'Ezra SIL',
        markers: { nd: marker('nd', { fontName: 'Ezra SIL' }) },
      }),
    );
    expect(css).toContain(`.usfm_nd { font-family: "Ezra SIL", ${FALLBACK}; }`);
  });

  it('escapes the default font inside a marker chain', () => {
    const css = generateProjectFontCss(
      styleInfo({ defaultFont: 'A"B', markers: { nd: marker('nd', { fontName: 'X' }) } }),
    );
    expect(css).toContain('.usfm_nd { font-family: "X", "A\\"B", ');
  });
});

describe('matches the editor package for font-only input', () => {
  const fixtures: [string, StyleInfo][] = [
    ['default font and size', styleInfo({ defaultFont: 'Ezra SIL', defaultFontSize: 14 })],
    [
      'marker font and a different default',
      styleInfo({
        defaultFont: 'Ezra SIL',
        defaultFontSize: 12,
        markers: { nd: marker('nd', { fontName: 'Noto' }) },
      }),
    ],
    [
      'marker font equal to the default',
      styleInfo({
        defaultFont: 'Ezra SIL',
        markers: { nd: marker('nd', { fontName: 'Ezra SIL' }) },
      }),
    ],
    ['marker font, no default', styleInfo({ markers: { nd: marker('nd', { fontName: 'Noto' }) } })],
    [
      'dotted marker name',
      styleInfo({
        defaultFont: 'Ezra SIL',
        markers: { 'x.y': marker('x.y', { fontName: 'Dotted' }) },
      }),
    ],
    [
      'quote, backslash and angle brackets as default and as marker font',
      styleInfo({
        defaultFont: 'A"B\\C<D>E',
        markers: { nd: marker('nd', { fontName: 'X"Y\\Z<W>V' }) },
      }),
    ],
    [
      'a marker with no font beside one with a font',
      styleInfo({
        defaultFont: 'Ezra SIL',
        markers: { bd: marker('bd'), nd: marker('nd', { fontName: 'Noto' }) },
      }),
    ],
    ['size only', styleInfo({ defaultFontSize: 12 })],
  ];

  it.each(fixtures)('%s', (_name, info) => {
    expect(generateProjectFontCss(info)).toBe(generateUsjCss(info));
  });
});
