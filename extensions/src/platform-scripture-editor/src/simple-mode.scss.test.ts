import { readFileSync } from 'fs';
import { join } from 'path';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';
import { CHARACTER_MARKER_INDICATORS_CLASS } from './platform-scripture-editor.utils';
import { parseWebViewSource, propExpressions } from './web-view-source.test-utils';

/**
 * The marker classes that scope a rule to Simple mode. `_simple-mode.scss` explains why the scoping
 * has to be done with classes rather than `[data-interface-mode='simple']`.
 */
const SIMPLE_SCOPE_PREFIXES = ['.editor-container-simple', '.scripture-editor-tab-nav-simple'];

const SIMPLE_MODE_SCSS_PATH = join(__dirname, '_simple-mode.scss');
const USJ_NODES_SCSS_PATH = join(__dirname, '_usj-nodes.scss');
/**
 * The standard USFM stylesheet the data provider ships; it says which markers are character
 * markers.
 */
const USFM_STY_PATH = join(__dirname, '../../../../c-sharp/assets/usfm.sty');

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
 * Every rule selector in a stylesheet: the text before each `{`, split on the commas that separate
 * selectors.
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

/** Every flat rule in a stylesheet whose selector starts with `selectorStart`. */
function rulesStartingWith(
  scss: string,
  selectorStart: string,
): { selector: string; body: string }[] {
  return [...stripComments(scss).matchAll(/([^{}]*)\{([^{}]*)\}/g)]
    .map(([, selector, body]) => ({ selector: selector.trim().replace(/\s+/g, ' '), body }))
    .filter(({ selector }) => selector.startsWith(selectorStart));
}

/** Declarations a character rule can carry without making its text look different. */
const NON_VISUAL_DECLARATIONS = new Set(['font-size: 100%']);

/**
 * Character markers in `usfm.sty` that the editor does not render as a character span: `\fig` is a
 * figure, and the table-cell markers (`\th1`, `\tcr2`, …) are real table cells.
 */
function isRenderedAsCharacterSpan(marker: string): boolean {
  return marker !== 'fig' && !/^t[hc][cr]?\d+$/.test(marker);
}

/**
 * Body-text character markers: `\StyleType Character` in `usfm.sty`, leaving out the footnote and
 * cross-reference markers (`\TextType NoteText`).
 */
function bodyTextCharacterMarkers(): string[] {
  const field = (block: string, name: string) =>
    block
      .split('\n')
      .find((line) => line.startsWith(`\\${name} `))
      ?.slice(name.length + 2)
      .trim();

  return readFileSync(USFM_STY_PATH, 'utf8')
    .replace(/\r/g, '')
    .split('\n\\Marker ')
    .slice(1)
    .filter(
      (block) =>
        field(block, 'StyleType')?.toLowerCase() === 'character' &&
        field(block, 'TextType') !== 'NoteText',
    )
    .map((block) => block.split('\n')[0].trim())
    .filter(isRenderedAsCharacterSpan);
}

/**
 * The body-text character markers whose `_usj-nodes.scss` styling changes nothing visible. That
 * file is all of Simple's character styling (the project stylesheet applies in Standard view only).
 * Every rule naming a marker counts, wherever it sits and however its selector is grouped.
 */
function markersWithNoVisibleStyle(): string[] {
  const declarationsByMarker = new Map<string, string[]>();
  postcss.parse(readFileSync(USJ_NODES_SCSS_PATH, 'utf8')).walkRules((rule) => {
    const declarations = rule.nodes.flatMap((node) =>
      node.type === 'decl' ? [`${node.prop}: ${node.value}`] : [],
    );
    rule.selectors.forEach((selector) => {
      [...selector.matchAll(/\.usfm_([\w-]+)/g)].forEach(([, marker]) => {
        declarationsByMarker.set(marker, [
          ...(declarationsByMarker.get(marker) ?? []),
          ...declarations,
        ]);
      });
    });
  });

  return bodyTextCharacterMarkers()
    .filter((marker) =>
      (declarationsByMarker.get(marker) ?? []).every((declaration) =>
        NON_VISUAL_DECLARATIONS.has(declaration),
      ),
    )
    .sort();
}

/** The `.usfm_*` markers named in a selector's `:is(…)` list. */
function markersInIsList(selector: string): string[] {
  const isList = /:is\(([^)]*)\)/.exec(selector);
  if (!isList) throw new Error(`${selector} has no :is(…) marker list`);
  return isList[1]
    .split(',')
    .map((marker) => marker.trim().replace(/^\.usfm_/, ''))
    .sort();
}

const MARKER_INDICATOR_SCOPE = `.editor-container-simple.${CHARACTER_MARKER_INDICATORS_CLASS}`;

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
    const indicatorRules = () =>
      rulesStartingWith(readFileSync(SIMPLE_MODE_SCSS_PATH, 'utf8'), MARKER_INDICATOR_SCOPE);
    const restingRule = () => indicatorRules().find(({ selector }) => !selector.endsWith(':hover'));
    const hoverRule = () => indicatorRules().find(({ selector }) => selector.endsWith(':hover'));

    it('finds the markers it is meant to find', () => {
      // Guards the derivation itself, so the equality check below cannot pass vacuously.
      const markers = markersWithNoVisibleStyle();

      expect(markers).toEqual(expect.arrayContaining(['w', 'wg', 'wh', 'wa', 'rb', 'ior']));
      ['bd', 'nd', 'wj', 'ft', 'xt', 'tc1', 'fig'].forEach((marker) =>
        expect(markers).not.toContain(marker),
      );
    });

    it('marks exactly the markers whose style is invisible, on hover too', () => {
      // A marker that gains a visible style in `_usj-nodes.scss` must leave the list, or bold or
      // underlined text picks up the tint; one that loses it must join, or users type inside it
      // unawares again.
      expect(indicatorRules()).toHaveLength(2);
      indicatorRules().forEach(({ selector }) =>
        expect(markersInIsList(selector)).toEqual(markersWithNoVisibleStyle()),
      );
    });

    it('tints them with plain --muted, so nested markers do not get darker', () => {
      expect(restingRule()?.body).toContain('background-color: var(--muted);');
    });

    it('draws the hover line only after a delay and starts removing it at once', () => {
      // The line is always drawn but transparent. Only the hover rule carries the delay, so the
      // line fades in late and starts fading out as soon as the pointer leaves.
      const resting = restingRule()?.body ?? '';
      const hovered = hoverRule()?.body ?? '';

      expect(resting).toMatch(/text-decoration-line: underline( overline)?;/);
      expect(resting).toContain('text-decoration-color: transparent;');
      expect(resting).not.toContain('transition-delay');
      expect(hovered).toContain('text-decoration-color: currentColor;');
      expect(hovered).toMatch(/transition-delay: \d+ms;/);
    });

    it('is switched on from the Scripture editor root only, not the read-only Simple panels', () => {
      // When the class applies is unit-tested on `getSimpleModeRootClassNames`; this checks the
      // editor root uses it and the panels do not.
      expect(
        propExpressions(parseWebViewSource(), 'div', 'className').some((expression) =>
          expression.includes('getSimpleModeRootClassNames('),
        ),
      ).toBe(true);
      ['model-text-panel.component.tsx', 'resource-text-panel.component.tsx'].forEach((panel) => {
        const source = readFileSync(join(__dirname, panel), 'utf8');
        expect(source).toContain('editor-container-simple');
        expect(source).not.toContain(CHARACTER_MARKER_INDICATORS_CLASS);
        expect(source).not.toContain('getSimpleModeRootClassNames');
      });
    });
  });
});
