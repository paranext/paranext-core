import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

/**
 * The marker classes that scope a rule to Simple mode. `_simple-mode.scss` explains why the scoping
 * has to be done with classes rather than `[data-interface-mode='simple']`.
 */
const SIMPLE_SCOPE_PREFIXES = ['.editor-container-simple', '.scripture-editor-tab-nav-simple'];

const SIMPLE_MODE_SCSS_PATH = join(__dirname, '_simple-mode.scss');
const USJ_NODES_SCSS_PATH = join(__dirname, '_usj-nodes.scss');

function stripComments(scss: string): string {
  return scss.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
}

/** Splits on the commas that separate selectors, not the ones inside `:is(…)` or `:not(…)`. */
function splitTopLevelCommas(selectorList: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  [...selectorList].forEach((character) => {
    if (character === '(') depth += 1;
    if (character === ')') depth -= 1;
    if (character === ',' && depth === 0) {
      parts.push(current);
      current = '';
    } else current += character;
  });
  parts.push(current);
  return parts;
}

/**
 * Every rule selector in a stylesheet: the text before each `{`, split on commas.
 *
 * Comments are stripped first so a selector-looking string inside a comment is not read as a rule.
 * This deliberately does NOT track nesting depth — a nested rule's or an at-rule's own head would
 * simply be reported as one more selector, which fails the assertion below. That is the safe
 * direction for a scope guard to fail in, and this file is flat today.
 */
function ruleSelectors(scss: string): string[] {
  return [...stripComments(scss).matchAll(/([^{}]*)\{/g)].flatMap((match) =>
    splitTopLevelCommas(match[1])
      .map((selector) => selector.trim())
      .filter(Boolean),
  );
}

/**
 * Declarations that a `_usj-nodes.scss` character rule can carry without making its text look any
 * different from the text around it.
 */
const NON_VISUAL_DECLARATIONS = new Set(['font-size: 100%']);

/**
 * Markers the vendored stylesheet lists under "CharNode" that the editor does not render as a
 * character span: `\pb` is a paragraph marker and `\fig` is a figure.
 */
const LISTED_AS_CHARACTER_BUT_NOT_RENDERED_AS_ONE = new Set(['pb', 'fig']);

/**
 * The body-text character markers whose static `_usj-nodes.scss` rule changes nothing visible —
 * Simple's whole character styling, since the project stylesheet is applied in Standard view only.
 * Read from the "CharNode" section, which ends where the footnote and cross-reference sections
 * begin.
 */
function markersWithNoVisibleStyle(): string[] {
  const usjNodes = readFileSync(USJ_NODES_SCSS_PATH, 'utf8');
  const start = usjNodes.indexOf('/* CharNode */');
  const end = usjNodes.indexOf('/* Footnote NoteNode */');
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);

  return [
    ...stripComments(usjNodes.slice(start, end)).matchAll(
      /\.formatted-font \.usfm_([\w-]+)\s*\{([^}]*)\}/g,
    ),
  ]
    .filter(([, , body]) =>
      body
        .split(';')
        .map((declaration) => declaration.trim().replace(/\s+/g, ' '))
        .filter(Boolean)
        .every((declaration) => NON_VISUAL_DECLARATIONS.has(declaration)),
    )
    .map(([, marker]) => marker)
    .filter((marker) => !LISTED_AS_CHARACTER_BUT_NOT_RENDERED_AS_ONE.has(marker))
    .sort();
}

/** The `.usfm_*` markers named in each `:is(…)` list of the rules that select on `selectorStart`. */
function markerListsOfRules(scss: string, selectorStart: string): string[][] {
  return ruleSelectors(scss)
    .filter((selector) => selector.startsWith(selectorStart))
    .map((selector) => {
      const isList = /:is\(([^)]*)\)/.exec(selector);
      if (!isList) throw new Error(`${selector} has no :is(…) marker list`);
      return isList[1]
        .split(',')
        .map((marker) => marker.trim().replace(/^\.usfm_/, ''))
        .sort();
    });
}

const MARKER_INDICATOR_SCOPE = '.editor-container-simple.scripture-editor-simple';

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

  it('reserves the gutter in unzoomed pixels, in both directions, so the fixed-size bar never overlaps zoomed text', () => {
    // The reservation is padding on `.usfm`, inside the editor's content-zoom area; the bar sits
    // outside that area at its own fixed 64px. Divided by the area's factor, the padding renders at
    // exactly the bar's width at every zoom level, instead of shrinking under it below 100 %.
    // Whitespace-insensitive, so the formatter's line breaks inside `calc(` cannot fail it.
    const scss = readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8')
      .replace(/\s+/g, ' ')
      .replace(/\( /g, '(')
      .replace(/ \)/g, ')');
    const reservation =
      'calc(var(--psc-character-marker-bar-width) / var(--platform-content-zoom-main, var(--platform-content-zoom-default, 1)))';

    expect(scss).toContain(`padding-inline-end: ${reservation};`);
    expect(scss).toContain(`padding-left: ${reservation};`);
    expect(scss).not.toMatch(
      /padding-(inline-end|left):\s*var\(--psc-character-marker-bar-width\);/,
    );
  });

  describe('character markers with no visible style', () => {
    it('finds the markers it is meant to find in the vendored stylesheet', () => {
      // Guards the derivation itself: if the section comments move, an empty list would make the
      // equality checks below pass vacuously.
      expect(markersWithNoVisibleStyle()).toEqual(
        expect.arrayContaining(['w', 'wg', 'wh', 'wa', 'rb']),
      );
      expect(markersWithNoVisibleStyle()).not.toContain('bd');
      expect(markersWithNoVisibleStyle()).not.toContain('nd');
    });

    it('marks exactly the markers whose static style is invisible, on hover too', () => {
      // A marker that gains a visible style in `_usj-nodes.scss` must leave this list, or bold or
      // underlined text picks up the tint; one that loses it must join, or users type inside it
      // unawares again.
      const scss = readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8');
      const lists = markerListsOfRules(scss, MARKER_INDICATOR_SCOPE);

      expect(lists).toHaveLength(2);
      lists.forEach((list) => expect(list).toEqual(markersWithNoVisibleStyle()));
    });

    it('tints them with plain --muted, so nested markers do not get darker', () => {
      const scss = readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8');

      expect(scss).toMatch(
        /\.editor-container-simple\.scripture-editor-simple\s+:is\([^)]*\) \{[^}]*background-color: var\(--muted\);/,
      );
      // A translucent tint would compound on every level of nesting.
      expect(scss).not.toMatch(/color-mix\([^)]*var\(--muted\)/);
    });

    it('draws the hover line only after a delay and starts removing it at once', () => {
      // CSS-only: the line is always there but transparent; hovering fades its colour in after the
      // delay, and leaving starts fading it out at once because the resting rule has no delay.
      const scss = readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8');
      const [resting, hovered] = [
        /:is\([^)]*\) \{([^}]*)\}/.exec(scss)?.[1] ?? '',
        /:is\([^)]*\):hover \{([^}]*)\}/.exec(scss)?.[1] ?? '',
      ];

      expect(resting).toMatch(/text-decoration-line: underline( overline)?;/);
      expect(resting).toContain('text-decoration-color: transparent;');
      expect(resting).not.toContain('transition-delay');
      expect(hovered).toContain('text-decoration-color: currentColor;');
      expect(hovered).toMatch(/transition-delay: \d+ms;/);
    });

    it('applies only to the Simple Scripture editor, not the read-only Simple panels', () => {
      // The panels' text cannot be typed into, which is the whole risk the indicator warns about.
      const webView = readFileSync(
        join(__dirname, 'platform-scripture-editor.web-view.tsx'),
        'utf8',
      );

      expect(webView).toContain(
        "isPowerMode ? '' : ' editor-container-simple scripture-editor-simple'",
      );
      ['model-text-panel.component.tsx', 'resource-text-panel.component.tsx'].forEach((panel) =>
        expect(readFileSync(join(__dirname, panel), 'utf8')).not.toContain(
          'scripture-editor-simple',
        ),
      );
    });
  });
});
