import { readFileSync } from 'fs';
import path from 'path';
import chroma from 'chroma-js';
import { describe, expect, it } from 'vitest';

// WCAG 2.2 non-text contrast minimum (SC 1.4.11). The active-comment bar is a UI indicator, not
// text, so 3:1 is the bar it has to clear.
const MIN_NON_TEXT_CONTRAST = 3;

// Every theme block in index.css, by the selector that scopes it.
const THEME_SELECTORS = ['.light,\n:root', '.dark', '.paratext-light', '.paratext-dark'] as const;

const cssPath = path.resolve(__dirname, '../../../index.css');
const css = readFileSync(cssPath, 'utf-8');

/** Pulls one theme block's body out of index.css by its selector. */
function readThemeBlock(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Theme block not found in index.css: ${selector}`);
  const end = css.indexOf('}', start);
  return css.slice(start, end);
}

/**
 * Reads one `--token: oklch(L C H)` declaration from a theme block. Parses the three components
 * rather than handing the CSS string to chroma, so this does not depend on chroma's CSS-level oklch
 * support.
 */
function readOklchToken(block: string, token: string): chroma.Color {
  const match = new RegExp(`--${token}:\\s*oklch\\(([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)\\)`).exec(
    block,
  );
  if (!match) throw new Error(`Token --${token} not found as a 3-component oklch() value`);
  return chroma.oklch(Number(match[1]), Number(match[2]), Number(match[3]));
}

describe('active-comment bar contrast', () => {
  // The bar sits on `card` normally and on `muted` when the active thread is also resolved. One
  // theme passing proves nothing about the others: --primary fails this in paratext-dark and
  // --ring fails it in paratext-light, in opposite directions.
  THEME_SELECTORS.forEach((selector) => {
    const block = readThemeBlock(selector);
    const bar = readOklchToken(block, 'foreground');

    (['card', 'muted'] as const).forEach((surface) => {
      it(`clears ${MIN_NON_TEXT_CONTRAST}:1 against --${surface} in ${selector.split('\n').pop()}`, () => {
        const contrast = chroma.contrast(bar, readOklchToken(block, surface));
        expect(contrast).toBeGreaterThanOrEqual(MIN_NON_TEXT_CONTRAST);
      });
    });
  });

  it('rejects --primary as the bar token, which is why --foreground is used', () => {
    // Guards the reasoning, not just the outcome: if a future theme edit makes --primary viable
    // everywhere, this test fails and the choice can be revisited deliberately.
    const paratextDark = readThemeBlock('.paratext-dark');
    const contrast = chroma.contrast(
      readOklchToken(paratextDark, 'primary'),
      readOklchToken(paratextDark, 'card'),
    );
    expect(contrast).toBeLessThan(MIN_NON_TEXT_CONTRAST);
  });
});
