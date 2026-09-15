// @vitest-environment node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// This repo carries two hand-maintained copies of scripture-editors'
// packages/platform/src/usj-nodes.css: the extension's `_usj-nodes.scss` (what Simple renders) and
// the platform-bible-react demo's `usj-nodes.css` (what the Storybook scripture-editor stories
// render). Both are checked here, and their gutter blocks are checked against each other.
//
// In the gutter view (`.psc-gutter-markers`), each paragraph's marker glyph is absolutely
// positioned at `left: calc(-(gutter width) + 0.5em - var(--para-indent))`, so `--para-indent` must
// equal the paragraph's own text-spacing margin or the glyph lands inside the text. Likewise the
// active focus box starts at `var(--verse-text-start)`, which must equal a hanging-indent
// paragraph's negative `text-indent`. This test derives BOTH expectations from the base
// text-spacing rules in the same file, so a marker that gains a margin or hanging indent without
// matching gutter compensation fails here by construction. A hand-typed expected list cannot do
// that: it silently encodes whatever gap existed when it was written. A small independent oracle
// from the USFM stylesheet is kept alongside, so a base value that drifts from the spec is caught
// too rather than being "fixed" by updating its compensation to match.
//
// Scope: the invariant is about margins set in these files. Commentary stylesheets and
// project-stylesheet CSS load into the same web view later in source order and can move a marker's
// margin away from the compensated value; they are not covered here.

const dir = dirname(fileURLToPath(import.meta.url));

const STYLESHEETS = [
  { name: '_usj-nodes.scss (platform-scripture-editor)', path: resolve(dir, '_usj-nodes.scss') },
  {
    name: 'usj-nodes.css (platform-bible-react demo)',
    path: resolve(
      dir,
      '../../../../lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css',
    ),
  },
];

/**
 * Markers whose base rules indent them but which must NOT have gutter compensation. A real table
 * row is a `<tr>`, not a `.para`, so the glyph rule never matches it, and `tools/pt9-css-converter`
 * strips `\tr` from generated sheets for the same reason.
 */
const NOT_COMPENSATED = new Set(['tr', 'tr1', 'tr2']);

// USFM stylesheet oracle (LeftMargin / FirstLineIndent in inches x 20 = vw), independent of either
// file: https://github.com/ubsicap/usfm/blob/master/sty/usfm.sty. One marker per distinct value is
// enough to catch a base rule drifting from the spec; completeness comes from the derivation.
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

type Direction = 'ltr' | 'rtl' | 'agnostic';

/** One `.usfm_<marker>` selector from a rule, with the writing direction it is scoped to. */
type MarkerSelector = { marker: string; direction: Direction };

type Block = {
  /** The rule's selector list, whitespace-collapsed and attribute quotes normalised to `'`. */
  selectors: string;
  /** Each `.usfm_<marker>` in the selector list, classified per selector, not per list. */
  markers: MarkerSelector[];
  declarations: string;
};

/** Everything the coverage checks need to know about one stylesheet. */
type ParsedStylesheet = {
  /** The stylesheet text with all comments removed. */
  css: string;
  /** The stylesheet parsed as a flat list of `selector { declarations }` blocks. */
  blocks: Block[];
};

const MARKER_CLASS = /\.usfm_([a-z0-9]+)/;

/**
 * Classifies one selector (not a comma list) by the writing direction it is scoped to. Attribute
 * quotes are normalised so `[dir="ltr"]` and `[dir='ltr']` compare equal: the copies here use
 * single quotes, the upstream CSS double quotes.
 */
function directionOf(selector: string): Direction {
  if (selector.includes("[dir='rtl']")) return 'rtl';
  if (selector.includes("[dir='ltr']")) return 'ltr';
  return 'agnostic';
}

/**
 * Reads a stylesheet and parses it into flat rule blocks.
 *
 * Comments are stripped first so their text can't be mistaken for selectors or declarations: block
 * comments first (that also removes the `//` inside the header's URLs), then SCSS `//` line
 * comments — so a commented-out `// --para-indent: 10vw;` in a hand-edited SCSS block isn't read as
 * a live setter. The line-comment strip only fires at line start or after whitespace, so a `//`
 * inside a value (a future `url(https://…)` or protocol-relative `url(//…)`) is left intact rather
 * than deleting the rest of that declaration's line and silently shifting brace depth.
 *
 * The block regex cannot reliably read a rule nested inside another block (a media query, a
 * keyframes at-rule, or SCSS nesting), so a rule wrapped in one could be mis-parsed and its markers
 * silently uncovered. `nestingProblems()` catches that by brace depth before the coverage checks
 * run. Selector lists are split on commas and each selector classified on its own, so a group that
 * mixes directions cannot misfile the whole group.
 */
function parseStylesheet(path: string): ParsedStylesheet {
  const css = readFileSync(path, 'utf-8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|\s)\/\/.*$/gm, '$1');
  const blocks = [...css.matchAll(/([^{}]+)\{([^}]+)\}/g)].map(([, selectors, declarations]) => {
    const normalised = selectors.replace(/\s+/g, ' ').replace(/"/g, "'").trim();
    const markers = normalised
      .split(',')
      .map((selector) => selector.trim())
      .flatMap((selector) => {
        const marker = MARKER_CLASS.exec(selector)?.[1];
        return marker ? [{ marker, direction: directionOf(selector) }] : [];
      });
    return { selectors: normalised, markers, declarations };
  });
  return { css, blocks };
}

/** Brace nesting depth at a character offset: 1 inside a top-level rule, >1 inside a nested one. */
function braceDepthAt(css: string, index: number): number {
  const before = css.slice(0, index);
  return (before.match(/\{/g) ?? []).length - (before.match(/\}/g) ?? []).length;
}

/**
 * Reports `property` setters that sit deeper than one block — i.e. nested inside an at-rule/SCSS
 * block, where a browser would scope them away but the flat block parser cannot reliably see them.
 * A setter declaration normally lives at depth 1 (inside its own rule); depth >1 means a rule was
 * nested and the coverage checks can no longer be trusted. (Unrelated pre-existing media-query and
 * keyframes at-rules don't contain these setters, so they don't trip this.)
 */
function nestingProblems({ css }: ParsedStylesheet, property: string): string[] {
  const setter = new RegExp(`${property}\\s*:`, 'g');
  const nested = [...css.matchAll(setter)].filter(
    (match) => braceDepthAt(css, match.index ?? 0) > 1,
  );
  return nested.length === 0
    ? []
    : [
        `${property}: ${nested.length} setter(s) are nested inside an @media/@keyframes/SCSS ` +
          `block; the flat parser cannot reliably see them. Update the parser.`,
      ];
}

/**
 * Reads the value of one `property: value;` declaration out of a rule's declaration block.
 *
 * Only a setter of exactly that property counts: the property name must start the block or follow a
 * `;` or whitespace, so `margin-left` does not match inside `margin-left-foo` and a `var(--x)` read
 * of a custom property does not count as setting it.
 *
 * @param declarations The text between a rule's `{` and `}`.
 * @param property The property name to read, e.g. `margin-left` or `--para-indent`.
 * @returns The trimmed value, or `undefined` when the block does not set that property.
 */
function declarationValue(declarations: string, property: string): string | undefined {
  const match = new RegExp(`(?:^|;|\\s)${property}\\s*:\\s*([^;]+)`).exec(declarations);
  return match ? match[1].trim() : undefined;
}

/** A block is a gutter compensation rule when its selector carries both scoping classes. */
function isGutterBlock(selectors: string): boolean {
  return selectors.includes('psc-gutter-markers') && selectors.includes('text-spacing');
}

/**
 * A block is a base text-spacing rule when it is scoped by `.text-spacing` but is not a gutter
 * rule.
 */
function isBaseBlock(selectors: string): boolean {
  return selectors.includes('text-spacing') && !isGutterBlock(selectors);
}

/**
 * Maps each `.usfm_<marker>` to the value it is given for `property`, but only within a rule whose
 * selector carries BOTH `.psc-gutter-markers` and `.text-spacing` — the exact scope where the real
 * indent overrides live. A `${property}:` setter (not a `var(--property)` read) is required.
 * Requiring `.text-spacing` means a marker whose setter was moved out of that group reads as
 * uncovered rather than silently passing.
 */
function getGutterMarkerValues(
  { blocks }: ParsedStylesheet,
  property: string,
): Map<string, string> {
  const values = new Map<string, string>();
  blocks
    .filter((block) => isGutterBlock(block.selectors))
    .forEach((block) => {
      const value = declarationValue(block.declarations, property);
      if (value === undefined) return;
      block.markers.forEach(({ marker }) => values.set(marker, value));
    });
  return values;
}

/**
 * Maps each `.usfm_<marker>` to the value the BASE text-spacing rules resolve for `property` in the
 * given direction: a `[dir=…]` rule for that direction wins over a direction-agnostic one, matching
 * the cascade (the qualified selector is more specific). Every value is kept here, zero included —
 * a `margin-left: 0` LTR override must be allowed to beat an agnostic `5vw` before any filtering,
 * or the filter would discard the winner and enforce the loser.
 */
function resolveBaseValues(
  { blocks }: ParsedStylesheet,
  property: string,
  direction: 'ltr' | 'rtl',
): Map<string, string> {
  const agnostic = new Map<string, string>();
  const directed = new Map<string, string>();
  blocks
    .filter((block) => isBaseBlock(block.selectors))
    .forEach((block) => {
      const value = declarationValue(block.declarations, property);
      if (value === undefined) return;
      block.markers.forEach((entry) => {
        if (entry.direction === 'agnostic') agnostic.set(entry.marker, value);
        else if (entry.direction === direction) directed.set(entry.marker, value);
      });
    });
  return new Map([...agnostic, ...directed]);
}

/** A length that moves the box: anything other than a zero (`0`, `0px`, `0vw`, `0in`, ...). */
function isNonZeroLength(value: string): boolean {
  return !/^-?0(\.0+)?[a-z%]*$/.test(value);
}

/** A negative length — the hanging indent that pulls the first line before the border edge. */
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

/** Reports each expected marker whose actual `property` value is missing or wrong. */
function valueMismatches(
  actual: Map<string, string>,
  property: string,
  expected: Map<string, string>,
): string[] {
  return [...expected]
    .filter(([marker, value]) => actual.get(marker) !== value)
    .map(
      ([marker, value]) =>
        `.usfm_${marker}: expected ${property}: ${value}, got ${actual.get(marker) ?? 'none'}`,
    );
}

/**
 * Reports gutter markers that set `property` but have no base rule calling for it — the reverse of
 * `valueMismatches`. This keeps the guard symmetric: a compensation the base rules don't need, a
 * table-row entry, or a stale entry left behind after a marker loses its margin, is flagged rather
 * than silently passing.
 */
function unexpectedMarkers(
  actual: Map<string, string>,
  property: string,
  expected: Map<string, string>,
): string[] {
  return [...actual]
    .filter(([marker]) => !expected.has(marker))
    .map(
      ([marker, value]) =>
        `.usfm_${marker}: sets ${property}: ${value} but no base text-spacing rule calls for it`,
    );
}

/**
 * Reports gutter `property` rules qualified by writing direction (`[dir=…]`). The gutter values are
 * identical for LTR and RTL by design, so a qualifier would leave one direction with no indent
 * compensation while the coverage filter — which matches on the `psc-gutter-markers` and
 * `text-spacing` substrings and ignores the qualifier — still counted the marker as covered.
 */
function directionQualifiedGutterRules({ blocks }: ParsedStylesheet, property: string): string[] {
  const setter = new RegExp(`${property}\\s*:`);
  return blocks
    .filter(
      (block) =>
        isGutterBlock(block.selectors) &&
        setter.test(block.declarations) &&
        block.selectors.includes('[dir='),
    )
    .map((block) => `${property}: direction-qualified selector "${block.selectors}"`);
}

/**
 * Reports base marker rules that set a margin through a spelling `declarationValue` does not read
 * (the `margin` shorthand or a logical `margin-inline-*`). Such a rule would give a marker a margin
 * that neither side of the coverage check can see, so it must fail loudly rather than pass
 * silently.
 */
function unreadableMarginSpellings({ blocks }: ParsedStylesheet): string[] {
  return blocks
    .filter((block) => isBaseBlock(block.selectors) && block.markers.length > 0)
    .filter((block) =>
      /(?:^|;|\s)(?:margin|margin-inline(?:-start|-end)?)\s*:/.test(block.declarations),
    )
    .map(
      (block) =>
        `"${block.selectors}" sets a margin with a spelling this test does not read; use ` +
        `margin-left / margin-right so the gutter compensation can be derived`,
    );
}

/**
 * Reports markers whose RTL inline-start margin differs from their LTR one. The same
 * `--para-indent` feeds both the LTR `left` and the RTL `right` glyph calculation, so a marker
 * whose two margins disagree cannot be compensated correctly in both directions by one value.
 */
function directionAsymmetries(sheet: ParsedStylesheet, expected: Map<string, string>): string[] {
  const rtl = resolveBaseValues(sheet, 'margin-right', 'rtl');
  return [...expected]
    .filter(([marker, ltrValue]) => rtl.get(marker) !== ltrValue)
    .map(
      ([marker, ltrValue]) =>
        `.usfm_${marker}: LTR margin-left ${ltrValue} but RTL margin-right ` +
        `${rtl.get(marker) ?? 'none'}; one --para-indent cannot serve both directions`,
    );
}

const sheets = STYLESHEETS.map((entry) => {
  const sheet = parseStylesheet(entry.path);
  return {
    ...entry,
    sheet,
    // Every base text-spacing margin-left is a paragraph indent the glyph must be pulled back by.
    expectedParaIndent: needingCompensation(
      resolveBaseValues(sheet, 'margin-left', 'ltr'),
      isNonZeroLength,
    ),
    // Every base negative text-indent is a hanging indent the focus box must start at.
    expectedVerseTextStart: needingCompensation(
      resolveBaseValues(sheet, 'text-indent', 'ltr'),
      isNegativeLength,
    ),
    actualParaIndent: getGutterMarkerValues(sheet, '--para-indent'),
    actualVerseTextStart: getGutterMarkerValues(sheet, '--verse-text-start'),
  };
});

describe.each(sheets)('$name .psc-gutter-markers.text-spacing coverage', (entry) => {
  const { sheet, expectedParaIndent, expectedVerseTextStart } = entry;

  it('derives a non-empty expectation from the base text-spacing rules', () => {
    // If the base parser ever reads nothing, both coverage checks below would pass vacuously.
    expect(expectedParaIndent.size).toBeGreaterThan(40);
    expect(expectedVerseTextStart.size).toBeGreaterThan(20);
    // The parser must be able to see every margin it is asked to compensate.
    expect(unreadableMarginSpellings(sheet)).toEqual([]);
    expect(nestingProblems(sheet, 'margin-left')).toEqual([]);
    expect(nestingProblems(sheet, 'text-indent')).toEqual([]);
  });

  it('base margins and hanging indents match the USFM stylesheet', () => {
    // Independent oracle: the derivation alone would accept a base rule that drifted from the spec
    // as long as its compensation drifted with it.
    expect(pick(expectedParaIndent, Object.keys(USFM_LEFT_MARGIN))).toEqual(USFM_LEFT_MARGIN);
    expect(pick(expectedVerseTextStart, Object.keys(USFM_FIRST_LINE_INDENT))).toEqual(
      USFM_FIRST_LINE_INDENT,
    );
    expect(expectedVerseTextStart.has('p')).toBe(false);
    NOT_COMPENSATED.forEach((marker) => expect(expectedParaIndent.has(marker)).toBe(false));
  });

  it('every indented marker sets --para-indent equal to its text-spacing margin', () => {
    // Fails loudly if a gutter rule was nested where the flat parser can't see it.
    expect(nestingProblems(sheet, '--para-indent')).toEqual([]);
    // Fails loudly if a gutter --para-indent rule is direction-qualified (LTR/RTL must match).
    expect(directionQualifiedGutterRules(sheet, '--para-indent')).toEqual([]);
    // One value serves both directions only if the base margins agree.
    expect(directionAsymmetries(sheet, expectedParaIndent)).toEqual([]);
    // Names each marker whose --para-indent is missing or differs from its margin.
    expect(valueMismatches(entry.actualParaIndent, '--para-indent', expectedParaIndent)).toEqual(
      [],
    );
    // Names any gutter marker that sets --para-indent without a base margin calling for it.
    expect(unexpectedMarkers(entry.actualParaIndent, '--para-indent', expectedParaIndent)).toEqual(
      [],
    );
  });

  it('every hanging-indent marker sets --verse-text-start equal to its text-indent', () => {
    expect(nestingProblems(sheet, '--verse-text-start')).toEqual([]);
    expect(directionQualifiedGutterRules(sheet, '--verse-text-start')).toEqual([]);
    expect(
      valueMismatches(entry.actualVerseTextStart, '--verse-text-start', expectedVerseTextStart),
    ).toEqual([]);
    expect(
      unexpectedMarkers(entry.actualVerseTextStart, '--verse-text-start', expectedVerseTextStart),
    ).toEqual([]);
  });
});

describe('the two copies agree on the gutter compensation block', () => {
  // Each copy above is checked against its own base rules; that alone would let the copies drift
  // in step (a value changed in both the base rule and the compensation of one copy only). The
  // gutter block is the part that must render identically in Simple and in Storybook, so it is
  // compared directly.
  const [shipping, demo] = sheets;

  it('sets the same --para-indent for the same markers', () => {
    expect(Object.fromEntries(demo.actualParaIndent)).toEqual(
      Object.fromEntries(shipping.actualParaIndent),
    );
  });

  it('sets the same --verse-text-start for the same markers', () => {
    expect(Object.fromEntries(demo.actualVerseTextStart)).toEqual(
      Object.fromEntries(shipping.actualVerseTextStart),
    );
  });
});
