// @vitest-environment node
import { readFileSync } from 'fs';
import path from 'path';
import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

// WCAG 2.2 non-text contrast minimum (SC 1.4.11). The selected-row bar is a UI indicator, not text.
const MIN_NON_TEXT_CONTRAST = 3;
// WCAG 2.2 text contrast minimum (SC 1.4.3). The selected marker glyph is text.
const MIN_TEXT_CONTRAST = 4.5;

type ThemeFile = Record<string, Record<string, { cssVariables: Record<string, string> }>>;

// The built-in themes as the app loads them (generated from platform-bible-react's index.css by
// its build-themes script). Read from disk so this extension test needs no import from that package.
const themesPath = path.resolve(__dirname, '../../../../src/shared/data/themes.data.json');
// JSON.parse returns `any`, which assigns to the known theme-file shape without a type assertion
const themeFile: ThemeFile = JSON.parse(readFileSync(themesPath, 'utf-8'));

/**
 * Every theme with real variables. The file also carries `user-*` placeholder families with empty
 * `cssVariables`; filtering on that rather than on names means a fifth real theme is swept
 * automatically.
 */
const realThemes = Object.entries(themeFile).flatMap(([familyId, family]) =>
  Object.entries(family)
    .filter(([, definition]) => Object.keys(definition.cssVariables).length > 0)
    .map(([themeType, definition]) => ({
      name: familyId ? `${familyId}-${themeType}` : themeType,
      cssVariables: definition.cssVariables,
    })),
);

const scss = readFileSync(path.resolve(__dirname, '_usj-nodes.scss'), 'utf-8').replace(
  /\/\*[\s\S]*?\*\//g,
  '',
);

/** The declarations of the rule with exactly this selector, or undefined if there is none. */
const block = (selector: string) =>
  scss.match(
    new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{([^}]*)\\}`),
  )?.[1];

// `--foreground` is the bar token because it is the one that clears the minimum everywhere:
// `--primary` and `--ring`, the obvious alternatives, each fall short in at least one built-in theme.
describe('selected paragraph marker bar contrast', () => {
  it('found real themes to check', () => {
    // Guards the sweep: a filter that excluded every theme would pass every check by running none.
    expect(realThemes.length).toBeGreaterThanOrEqual(4);
  });

  it('ties the sweep to the token the stylesheet actually paints the bar with', () => {
    // The bar is the second (lower) box-shadow layer; the fill `--accent` layer covers all of it but
    // the leading 4px. A change to another token there fails here instead of passing silently.
    const bar = /box-shadow:[^;]*var\(--accent\)\s*,[^;]*var\(--foreground\)\s*;/;
    expect(block('.psc-gutter-markers .psc-para-marker-selected')).toMatch(bar);
    expect(block(".psc-gutter-markers[dir='rtl'] .psc-para-marker-selected")).toMatch(bar);
  });

  // The bar sits over the fill's neighbour: the editor surface (`--background`) at its outer edge
  // and the row fill (`--accent`) at its inner edge. One theme passing proves nothing about the others.
  realThemes.forEach(({ name, cssVariables }) => {
    (['background', 'accent'] as const).forEach((surface) => {
      it(`clears ${MIN_NON_TEXT_CONTRAST}:1 against --${surface} in ${name}`, () => {
        const contrast = chroma.contrast(
          chroma(cssVariables.foreground),
          chroma(cssVariables[surface]),
        );
        expect(contrast).toBeGreaterThanOrEqual(MIN_NON_TEXT_CONTRAST);
      });
    });
  });
});

describe('selected paragraph marker glyph contrast', () => {
  it('ties the sweep to the token the stylesheet actually paints the glyph with', () => {
    expect(
      block(
        '.psc-gutter-markers .psc-para-marker-selected > .marker:not(.verse):not(.chapter):first-child',
      ),
    ).toMatch(/(?:^|[\s;])color:\s*var\(--accent-foreground\)\s*;/);
  });

  // The glyph sits on the row fill (`--accent`).
  realThemes.forEach(({ name, cssVariables }) => {
    it(`clears ${MIN_TEXT_CONTRAST}:1 against --accent in ${name}`, () => {
      const contrast = chroma.contrast(
        chroma(cssVariables['accent-foreground']),
        chroma(cssVariables.accent),
      );
      expect(contrast).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST);
    });
  });
});
