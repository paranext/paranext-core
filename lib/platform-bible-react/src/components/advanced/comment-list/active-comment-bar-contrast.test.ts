import { readFileSync } from 'fs';
import path from 'path';
import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';
import { parseCssThemes } from '../../../../scripts/build-themes';

// WCAG 2.2 non-text contrast minimum (SC 1.4.11). The active-comment bar is a UI indicator, not
// text, so 3:1 is the bar it has to clear.
const MIN_NON_TEXT_CONTRAST = 3;

const cssPath = path.resolve(__dirname, '../../../index.css');
const css = readFileSync(cssPath, 'utf-8');
const themes = parseCssThemes(css);

/**
 * Every theme actually defined in index.css, keyed by a readable name. `parseCssThemes` also
 * synthesizes `user-*` placeholder families with empty `cssVariables` (there's no CSS for them to
 * come from); filtering on that, rather than on the family name, means a fifth real theme lands
 * here automatically instead of needing this sweep updated to know about it.
 */
const realThemes = Object.entries(themes).flatMap(([familyId, family]) =>
  Object.entries(family)
    .filter(([, definition]) => Object.keys(definition.cssVariables).length > 0)
    .map(([themeType, definition]) => ({
      name: familyId ? `${familyId}-${themeType}` : themeType,
      cssVariables: definition.cssVariables,
    })),
);

describe('active-comment bar contrast', () => {
  it('found at least one real theme in index.css to check', () => {
    // Guards the sweep above: a filter that accidentally excluded every theme would leave the
    // `forEach` below with nothing to iterate, and every check would silently pass by never
    // running.
    expect(realThemes.length).toBeGreaterThan(0);
  });

  // The bar sits on `card` normally and on `muted` when the active thread is also resolved. One
  // theme passing proves nothing about the others: --primary fails this in paratext-dark and
  // --ring fails it in paratext-light, in opposite directions.
  realThemes.forEach(({ name, cssVariables }) => {
    const bar = chroma(cssVariables.foreground);

    (['card', 'muted'] as const).forEach((surface) => {
      it(`clears ${MIN_NON_TEXT_CONTRAST}:1 against --${surface} in ${name}`, () => {
        const contrast = chroma.contrast(bar, chroma(cssVariables[surface]));
        expect(contrast).toBeGreaterThanOrEqual(MIN_NON_TEXT_CONTRAST);
      });
    });
  });

  it('rejects --primary as the bar token, which is why --foreground is used', () => {
    // Guards the reasoning, not just the outcome: if a future theme edit makes --primary viable
    // everywhere, this test fails and the choice can be revisited deliberately.
    const paratextDark = realThemes.find((theme) => theme.name === 'paratext-dark');
    if (!paratextDark) throw new Error('paratext-dark theme not found in index.css');
    const contrast = chroma.contrast(
      chroma(paratextDark.cssVariables.primary),
      chroma(paratextDark.cssVariables.card),
    );
    expect(contrast).toBeLessThan(MIN_NON_TEXT_CONTRAST);
  });

  it('rejects --ring as the bar token, the other candidate the rationale excludes', () => {
    // --ring is the symmetric near-miss to --primary above: it fails in the opposite theme
    // (paratext-light rather than paratext-dark), which is why neither candidate is a fix here.
    const paratextLight = realThemes.find((theme) => theme.name === 'paratext-light');
    if (!paratextLight) throw new Error('paratext-light theme not found in index.css');
    const contrast = chroma.contrast(
      chroma(paratextLight.cssVariables.ring),
      chroma(paratextLight.cssVariables.card),
    );
    expect(contrast).toBeLessThan(MIN_NON_TEXT_CONTRAST);
  });
});
