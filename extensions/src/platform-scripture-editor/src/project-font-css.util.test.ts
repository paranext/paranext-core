import type { MarkerStyleInfo, StyleInfo } from '@eten-tech-foundation/platform-editor';
import { describe, expect, it } from 'vitest';
import { generateProjectFontCss } from './project-font-css.util';

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

  it('omits the size when it is 0 or missing', () => {
    const zero = generateProjectFontCss(styleInfo({ defaultFont: 'A', defaultFontSize: 0 }));
    const missing = generateProjectFontCss(
      styleInfo({ defaultFont: 'A', defaultFontSize: undefined }),
    );
    expect(zero).not.toContain('font-size');
    expect(missing).not.toContain('font-size');
  });

  it('emits only the size when there is no default font', () => {
    expect(generateProjectFontCss(styleInfo({ defaultFontSize: 12 }))).toBe(
      `${SCOPE} { font-size: 12pt; }`,
    );
  });

  it('escapes quotes and backslashes in font names', () => {
    expect(generateProjectFontCss(styleInfo({ defaultFont: 'A"B\\C' }))).toContain(
      'font-family: "A\\"B\\\\C", ',
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

  it('honours a custom container selector', () => {
    expect(
      generateProjectFontCss(styleInfo({ defaultFont: 'A' }), { containerSelector: '.root' }),
    ).toBe(`.root { font-family: "A", ${FALLBACK}; }`);
  });
});
