import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

/**
 * The marker classes that scope a rule to Simple mode. `_simple-mode.scss` explains why the scoping
 * has to be done with classes rather than `[data-interface-mode='simple']`.
 */
const SIMPLE_SCOPE_PREFIXES = ['.editor-container-simple', '.scripture-editor-tab-nav-simple'];

const SIMPLE_MODE_SCSS_PATH = join(__dirname, '_simple-mode.scss');

/**
 * Every rule selector in a stylesheet: the text before each `{`, split on commas.
 *
 * Comments are stripped first so a selector-looking string inside a comment is not read as a rule.
 * This deliberately does NOT track nesting depth — a nested rule's or an at-rule's own head would
 * simply be reported as one more selector, which fails the assertion below. That is the safe
 * direction for a scope guard to fail in, and this file is flat today.
 */
function ruleSelectors(scss: string): string[] {
  const withoutComments = scss.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

  return [...withoutComments.matchAll(/([^{}]*)\{/g)].flatMap((match) =>
    match[1]
      .split(',')
      .map((selector) => selector.trim())
      .filter(Boolean),
  );
}

describe('_simple-mode.scss', () => {
  it('scopes every rule to a Simple-mode marker class', () => {
    // This is the one failure mode no runtime test can catch: a selector that escapes the Simple
    // scope narrows the text column for every POWER-mode user too, silently, for a control they
    // cannot see. `_usj-nodes.scss` styles the editor in both modes and this file is compiled into
    // every web view's CSS, so the marker-class prefix is the only thing keeping Power untouched.
    const selectors = ruleSelectors(readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8'));

    expect(selectors.length).toBeGreaterThan(0);
    const escaped = selectors.filter(
      (selector) => !SIMPLE_SCOPE_PREFIXES.some((prefix) => selector.startsWith(prefix)),
    );
    expect(escaped).toEqual([]);
  });

  it('reserves exactly 64px for the character-marker bar, in absolute units', () => {
    // Pinned because this single value is the whole text-column cost of the feature, and because the
    // bar container's inline `width` reads the same custom property — a change here silently resizes
    // both. 64px fits an icon-only trigger exactly, with no slack: the icon, chevron, `gap-1.5`,
    // padding, and border are ~56px, plus the toolbar's own 8px margin.
    const scss = readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8');

    expect(scss).toContain('--psc-character-marker-bar-width: 64px;');
    // The UNIT is the point, not just the number: every term in the 56px of chrome is a fixed pixel
    // amount, so a font-relative reservation under-reserves at any base font size below 16px and the
    // trigger spills inline-start over project text.
    expect(scss).not.toMatch(/--psc-character-marker-bar-width:\s*[\d.]+(em|rem|%|ch|ex)/);
  });

  it('gates the bar on the same two conditions the reservation selects on', () => {
    // The highest-coupling point in this feature, and the one failure it exists to prevent: a bar
    // that renders where this stylesheet does not match paints over project text. The two halves
    // live in different languages and different files, so nothing but this test can hold them
    // together — the CSS side cannot be broadened to `!isPowerMode` alone, because this stylesheet
    // is compiled into the resource-text and model-text panels too, and both apply
    // `editor-container-simple` unconditionally to an editor with no gutter markers.
    //
    // Deliberately a source scan, in the same spirit as the scope guard above: the mount site is
    // deep inside a web view that cannot be rendered in isolation, and a refactor that restates the
    // gate differently SHOULD fail here rather than pass quietly.
    const scss = readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8');
    const webView = readFileSync(join(__dirname, 'platform-scripture-editor.web-view.tsx'), 'utf8');

    // CSS side: both classes on one compound selector, so BOTH are required.
    expect(scss).toContain('.editor-container-simple .usfm.psc-gutter-markers {');
    // React side: the bar slot is empty unless the same two conditions hold.
    expect(webView).toContain('isPowerMode || !viewOptions.hasGutterParaMarkers ? undefined');
  });
});
