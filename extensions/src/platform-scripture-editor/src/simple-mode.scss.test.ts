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
});
