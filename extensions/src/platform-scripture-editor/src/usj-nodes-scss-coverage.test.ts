// @vitest-environment node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss, { type Root, type Rule } from 'postcss';
import postcssScss from 'postcss-scss';
import { describe, expect, it } from 'vitest';

// This repo carries two hand-maintained copies of scripture-editors'
// packages/platform/src/usj-nodes.css: the extension's `_usj-nodes.scss` (what Simple renders) and
// the platform-bible-react demo's `usj-nodes.css` (what the Storybook scripture-editor stories
// render). Both are checked here, and their gutter blocks are checked against each other.
//
// In the gutter view (`.psc-gutter-markers`), each paragraph's marker glyph is absolutely
// positioned at `left: calc(-(gutter width) + 0.5em - var(--para-indent))`, so `--para-indent` must
// equal the paragraph's own text-spacing margin or the glyph lands inside the text. The active
// focus box also reads `--verse-text-start`, a hanging-indent paragraph's negative `text-indent`,
// as a fallback start. Both expectations are derived from the base text-spacing rules in the same
// file, so a marker that gains a margin or hanging indent without matching compensation fails here.
//
// Known limits, each unreachable in today's stylesheets: a `calc()` value is reported as unreadable
// rather than evaluated, and a selector's direction is read from `[dir=…]` / `:dir(…)` only.

const dir = dirname(fileURLToPath(import.meta.url));

const STYLESHEETS = [
  {
    name: '_usj-nodes.scss (platform-scripture-editor)',
    path: resolve(dir, '_usj-nodes.scss'),
    syntax: postcssScss,
  },
  {
    name: 'usj-nodes.css (platform-bible-react demo)',
    path: resolve(
      dir,
      '../../../../lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css',
    ),
    syntax: postcss,
  },
];

/**
 * Markers whose base rules indent them but which must NOT have gutter compensation. A real table
 * row (`\tr`) is a `<tr>`, not a `.para`, so the glyph rule never matches it, and
 * `tools/pt9-css-converter` strips it from generated sheets for the same reason. The obsolete
 * `\tr1` and `\tr2` are not excluded: the converter matches `tr` exactly, so they become plain
 * paragraphs and need an entry like any other indented marker.
 */
const NOT_COMPENSATED = new Set(['tr']);

// Spot check against the USFM stylesheet (LeftMargin / FirstLineIndent in inches x 20 = vw):
// https://github.com/ubsicap/usfm/blob/master/sty/usfm.sty. One marker per distinct value. The
// derivation below guarantees base-to-gutter consistency, not base-to-spec; this catches a drift in
// one of these markers; a re-sync that changes any other marker's base value is not caught here.
const USFM_LEFT_MARGIN: Record<string, string> = {
  pi: '5vw', // 0.25"
  li1: '10vw', // 0.5"
  q1: '15vw', // 0.75"
  qm1: '20vw', // 1.0"
  li4: '25vw', // 1.25"
  lim4: '30vw', // 1.5"
};
const USFM_FIRST_LINE_INDENT: Record<string, string> = {
  qm1: '-15vw', // -0.75"
  q1: '-10vw', // -0.5"
  li1: '-7.5vw', // -0.375"
  q3: '-5vw', // -0.25"
  q4: '-2.5vw', // -0.125"
};

/** The properties this test derives from or checks; a nested or unreadable one of these fails. */
const TRACKED_PROPERTIES = new Set([
  'margin-left',
  'margin-right',
  'text-indent',
  '--para-indent',
  '--verse-text-start',
]);

/** Margin spellings the derivation cannot read; a marker rule using one must fail loudly. */
const UNREADABLE_MARGIN_PROPERTIES = new Set(['margin', 'margin-inline', 'margin-inline-start']);

// The parser and derivation helpers follow the suites. `sheets()` runs at collection time, after
// the module has loaded, so the stylesheet paths it reads are initialised by then.
describe('.psc-gutter-markers.text-spacing coverage', () => {
  const all = sheets();

  describe.each(all)('$name', (entry) => {
    const { sheet, expectedParaIndent, expectedVerseTextStart } = entry;

    it('can read every rule and value it derives from', () => {
      // Rules nested in an at-rule (a media query, keyframes, SCSS nesting) would be scoped away by
      // the browser; none of the tracked properties may be set there.
      expect(nestedTrackedRules(sheet)).toEqual([]);
      // A margin spelled as shorthand, a logical property, a keyword or a `calc()` cannot be
      // derived from, and a `!important` would win over the compensation's own rule.
      expect(unreadableDeclarations(sheet)).toEqual([]);
      // If the parser ever read nothing, the comparisons below would pass vacuously.
      expect(expectedParaIndent.size).toBeGreaterThan(0);
      expect(expectedVerseTextStart.size).toBeGreaterThan(0);
      // The gutter values are identical for LTR and RTL by design, so no gutter rule may be
      // direction-qualified: it would leave one direction uncompensated while counting as covered.
      expect(directionQualifiedGutterRules(sheet, '--para-indent')).toEqual([]);
      expect(directionQualifiedGutterRules(sheet, '--verse-text-start')).toEqual([]);
    });

    it('spot-checks base margins and hanging indents against the USFM stylesheet', () => {
      expect(pick(expectedParaIndent, Object.keys(USFM_LEFT_MARGIN))).toEqual(USFM_LEFT_MARGIN);
      expect(pick(expectedVerseTextStart, Object.keys(USFM_FIRST_LINE_INDENT))).toEqual(
        USFM_FIRST_LINE_INDENT,
      );
      // `p` has a positive first-line indent (2.5vw); only negative ones are hanging indents.
      expect(expectedVerseTextStart.has('p')).toBe(false);
      // The table-row exclusion is only meaningful while that marker still has a real margin.
      NOT_COMPENSATED.forEach((marker) =>
        expect(isNonZeroLength(entry.baseInlineStartMargin.get(marker) ?? '0')).toBe(true),
      );
    });

    it('every indented marker sets --para-indent equal to its text-spacing margin', () => {
      // One value serves both directions only if the base margins agree, including a margin set
      // in only one direction.
      expect(directionAsymmetries(sheet, 'margin-left', 'margin-right')).toEqual([]);
      expect(entry.actualParaIndent).toEqual(expectedParaIndent);
    });

    it('every hanging-indent marker sets --verse-text-start equal to its text-indent', () => {
      expect(directionAsymmetries(sheet, 'text-indent', 'text-indent')).toEqual([]);
      expect(entry.actualVerseTextStart).toEqual(expectedVerseTextStart);
      // The focus box takes min(--verse-text-start, -(gutter) - --para-indent). A hanging indent
      // on a marker with no margin would win that min() and start the box outside the editor.
      const hangingWithoutMargin = [...expectedVerseTextStart.keys()].filter(
        (marker) => !expectedParaIndent.has(marker),
      );
      expect(hangingWithoutMargin).toEqual([]);
    });
  });

  describe('the two copies agree on the gutter compensation block', () => {
    // Each copy above is checked against its own base rules; that alone would let the copies drift
    // in step (a value changed in both the base rule and the compensation of one copy only). The
    // gutter block is the part that must render identically in Simple and in Storybook, so it is
    // compared directly.
    const [shipping, demo] = all;

    it('sets the same --para-indent for the same markers', () => {
      expect(demo.actualParaIndent).toEqual(shipping.actualParaIndent);
    });

    it('sets the same --verse-text-start for the same markers', () => {
      expect(demo.actualVerseTextStart).toEqual(shipping.actualVerseTextStart);
    });
  });
});

type Direction = 'ltr' | 'rtl' | 'agnostic';

/** One selector of a rule, with its `.usfm_<marker>` and the writing direction it is scoped to. */
type MarkerSelector = { selector: string; marker: string; direction: Direction };

/** A top-level rule that names at least one `.usfm_<marker>`. */
type Block = { rule: Rule; markers: MarkerSelector[] };

/** Everything the coverage checks need to know about one stylesheet. */
type ParsedStylesheet = { root: Root; blocks: Block[] };

/**
 * The `.usfm_<marker>` class in a selector. Marker classes may carry hyphens and capitals
 * (`usfm_qt-s`, `usfm_xtSeeAlso`), so the match runs to the end of the class name; a `.usfm_` that
 * does not match whole is a parser gap and throws rather than attributing the rule to a shorter
 * marker.
 */
function markerOf(selector: string): string | undefined {
  if (!selector.includes('.usfm_')) return undefined;
  const match = /\.usfm_([A-Za-z0-9-]+)(?![A-Za-z0-9_-])/.exec(selector);
  if (!match) throw new Error(`Cannot read the marker class in "${selector}"`);
  return match[1];
}

/** Attribute quotes normalised so `[dir="ltr"]` and `[dir='ltr']` compare equal. */
function directionOf(selector: string): Direction {
  const normalised = selector.replace(/"/g, "'");
  if (normalised.includes("[dir='rtl']") || normalised.includes(':dir(rtl)')) return 'rtl';
  if (normalised.includes("[dir='ltr']") || normalised.includes(':dir(ltr)')) return 'ltr';
  return 'agnostic';
}

/** A gutter compensation selector carries both scoping classes. */
function isGutterSelector(selector: string): boolean {
  return selector.includes('psc-gutter-markers') && selector.includes('text-spacing');
}

/** A base text-spacing selector: scoped by `.text-spacing` but not a gutter selector. */
function isBaseSelector(selector: string): boolean {
  return selector.includes('text-spacing') && !isGutterSelector(selector);
}

/** The value a rule sets for `property`, whitespace-collapsed; the last declaration wins. */
function declarationValue(rule: Rule, property: string): string | undefined {
  let value: string | undefined;
  rule.each((node) => {
    if (node.type === 'decl' && node.prop === property) value = node.value.replace(/\s+/g, ' ');
  });
  return value;
}

/** Parses a stylesheet and collects its top-level rules that name a marker class. */
function parseStylesheet(path: string, syntax: { parse: typeof postcss.parse }): ParsedStylesheet {
  const root = syntax.parse(readFileSync(path, 'utf-8'));
  const blocks: Block[] = [];
  root.walkRules((rule) => {
    if (rule.parent?.type !== 'root') return;
    const markers = rule.selectors.flatMap((selector) => {
      const marker = markerOf(selector);
      return marker ? [{ selector, marker, direction: directionOf(selector) }] : [];
    });
    if (markers.length > 0) blocks.push({ rule, markers });
  });
  return { root, blocks };
}

/** Tracked properties set inside a nested rule, where the cascade would scope them away. */
function nestedTrackedRules({ root }: ParsedStylesheet): string[] {
  const found: string[] = [];
  root.walkDecls((decl) => {
    if (!TRACKED_PROPERTIES.has(decl.prop) && !UNREADABLE_MARGIN_PROPERTIES.has(decl.prop)) return;
    if (decl.parent?.type === 'rule' && decl.parent.parent?.type !== 'root')
      found.push(`${decl.prop} inside a nested rule: ${decl.parent.selector}`);
  });
  return found;
}

/**
 * Marker declarations the derivation cannot read: a `margin` shorthand or logical margin, a keyword
 * or `calc()` in place of a plain length, or `!important` on a tracked property.
 */
function unreadableDeclarations({ blocks }: ParsedStylesheet): string[] {
  const found: string[] = [];
  blocks.forEach(({ rule, markers }) => {
    if (!markers.some(({ selector }) => isBaseSelector(selector) || isGutterSelector(selector)))
      return;
    rule.each((node) => {
      if (node.type !== 'decl') return;
      if (UNREADABLE_MARGIN_PROPERTIES.has(node.prop))
        found.push(`${rule.selector}: ${node.prop} is not derivable; use margin-left/right`);
      if (!TRACKED_PROPERTIES.has(node.prop)) return;
      if (node.important) found.push(`${rule.selector}: ${node.prop} !important`);
      if (!/^-?\d*\.?\d+[a-z%]+$|^0$/.test(node.value.trim()))
        found.push(`${rule.selector}: ${node.prop}: ${node.value} is not a plain length`);
    });
  });
  return found;
}

/** Maps each marker to the value the gutter rules give it for `property`. */
function gutterValues({ blocks }: ParsedStylesheet, property: string): Map<string, string> {
  const values = new Map<string, string>();
  blocks.forEach(({ rule, markers }) => {
    const value = declarationValue(rule, property);
    if (value === undefined) return;
    markers.forEach(({ selector, marker }) => {
      if (isGutterSelector(selector)) values.set(marker, value);
    });
  });
  return values;
}

/**
 * Maps each marker to the value the BASE text-spacing rules resolve for `property` in the given
 * direction: a `[dir=…]` rule for that direction wins over a direction-agnostic one, matching the
 * cascade (the qualified selector is more specific). Zeros are kept: a `margin-left: 0` LTR
 * override must be allowed to beat an agnostic `5vw` before any filtering.
 */
function baseValues(
  { blocks }: ParsedStylesheet,
  property: string,
  direction: 'ltr' | 'rtl',
): Map<string, string> {
  const agnostic = new Map<string, string>();
  const directed = new Map<string, string>();
  blocks.forEach(({ rule, markers }) => {
    const value = declarationValue(rule, property);
    if (value === undefined) return;
    markers.forEach((entry) => {
      if (!isBaseSelector(entry.selector)) return;
      if (entry.direction === 'agnostic') agnostic.set(entry.marker, value);
      else if (entry.direction === direction) directed.set(entry.marker, value);
    });
  });
  return new Map([...agnostic, ...directed]);
}

/** A length that moves the box: anything other than a zero (`0`, `0px`, `0vw`, `0in`, ...). */
function isNonZeroLength(value: string): boolean {
  return !/^-?0(\.0+)?[a-z%]*$/i.test(value);
}

/** A negative length: the hanging indent that pulls the first line before the border edge. */
function isNegativeLength(value: string): boolean {
  return value.startsWith('-') && isNonZeroLength(value);
}

/** The `markers` entries of `values`, as an object, so a whole oracle can be compared in one go. */
function pick(
  values: Map<string, string>,
  markers: string[],
): { [marker: string]: string | undefined } {
  return Object.fromEntries(markers.map((marker) => [marker, values.get(marker)]));
}

/** Keeps the entries `accept` approves, minus the markers that must never be compensated. */
function needingCompensation(
  resolved: Map<string, string>,
  accept: (value: string) => boolean,
): Map<string, string> {
  return new Map(
    [...resolved].filter(([marker, value]) => accept(value) && !NOT_COMPENSATED.has(marker)),
  );
}

/**
 * Reports markers whose RTL value for `rtlProperty` differs from their LTR value for `ltrProperty`,
 * including a value set in only one direction. The same custom property feeds both directions, so
 * one value can only be right if the base rules agree.
 */
function directionAsymmetries(
  sheet: ParsedStylesheet,
  ltrProperty: string,
  rtlProperty: string,
): string[] {
  const ltr = baseValues(sheet, ltrProperty, 'ltr');
  const rtl = baseValues(sheet, rtlProperty, 'rtl');
  return [...new Set([...ltr.keys(), ...rtl.keys()])]
    .filter((marker) => (ltr.get(marker) ?? '0') !== (rtl.get(marker) ?? '0'))
    .map(
      (marker) =>
        `.usfm_${marker}: LTR ${ltrProperty} ${ltr.get(marker) ?? 'none'} but RTL ` +
        `${rtlProperty} ${rtl.get(marker) ?? 'none'}; one value cannot serve both directions`,
    );
}

/** Gutter rules for `property` qualified by writing direction, which the design forbids. */
function directionQualifiedGutterRules({ blocks }: ParsedStylesheet, property: string): string[] {
  return blocks
    .filter(
      ({ rule, markers }) =>
        declarationValue(rule, property) !== undefined &&
        markers.some(
          ({ selector, direction }) => isGutterSelector(selector) && direction !== 'agnostic',
        ),
    )
    .map(({ rule }) => `${property}: direction-qualified selector "${rule.selector}"`);
}

/** Parses every copy and derives what its gutter block must contain. */
function sheets() {
  return STYLESHEETS.map((entry) => {
    const sheet = parseStylesheet(entry.path, entry.syntax);
    // Each marker's inline-start margin: the LTR `margin-left`, else the RTL `margin-right`.
    const baseInlineStartMargin = new Map([
      ...baseValues(sheet, 'margin-right', 'rtl'),
      ...baseValues(sheet, 'margin-left', 'ltr'),
    ]);
    return {
      ...entry,
      sheet,
      baseInlineStartMargin,
      // Every base inline-start margin is a paragraph indent the glyph must be pulled back by.
      expectedParaIndent: needingCompensation(baseInlineStartMargin, isNonZeroLength),
      // Every base negative text-indent is a hanging indent the focus box can fall back to.
      expectedVerseTextStart: needingCompensation(
        baseValues(sheet, 'text-indent', 'ltr'),
        isNegativeLength,
      ),
      actualParaIndent: gutterValues(sheet, '--para-indent'),
      actualVerseTextStart: gutterValues(sheet, '--verse-text-start'),
    };
  });
}
