// @vitest-environment node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// This repo carries two hand-maintained copies of scripture-editors'
// packages/platform/src/usj-nodes.css: the extension's `_usj-nodes.scss` (what Simple renders) and
// the platform-bible-react demo's `usj-nodes.css` (what the Storybook scripture-editor stories
// render). Both are checked here.
//
// In the gutter view (`.psc-gutter-markers`), each paragraph's marker glyph is absolutely positioned
// at `left: calc(-(gutter width) + 0.5em - var(--para-indent))`, so `--para-indent` must equal the
// paragraph's own text-spacing margin or the glyph lands inside the text. Likewise the active focus
// box starts at `var(--verse-text-start)`, which must equal a hanging-indent paragraph's negative
// `text-indent`. This test derives BOTH expectations from the base text-spacing rules in the same
// file, so a marker that gains a margin or hanging indent without matching gutter compensation fails
// here by construction. A hand-typed expected list cannot do that: it silently encodes whatever gap
// existed when it was written.
//
// Base values follow the USFM stylesheet's LeftMargin / FirstLineIndent (inches x 20 = vw):
// https://github.com/ubsicap/usfm/blob/master/sty/usfm.sty

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

type Block = { selectors: string; declarations: string };

/** Everything the coverage checks need to know about one stylesheet. */
type ParsedStylesheet = {
  /** The stylesheet text with all comments removed. */
  css: string;
  /** The stylesheet parsed as a flat list of `selector { declarations }` blocks. */
  blocks: Block[];
};

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
 * keyframes at-rule, or SCSS nesting), so a gutter rule wrapped in one could be mis-parsed and its
 * markers silently uncovered. `nestingProblems()` catches that by brace depth before the coverage
 * checks run.
 */
function parseStylesheet(path: string): ParsedStylesheet {
  const css = readFileSync(path, 'utf-8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|\s)\/\/.*$/gm, '$1');
  const blocks = [...css.matchAll(/([^{}]+)\{([^}]+)\}/g)].map(([, selectors, declarations]) => ({
    // Attribute quotes are normalised so `[dir="ltr"]` and `[dir='ltr']` compare equal: the two
    // copies here use single quotes, the upstream CSS double quotes.
    selectors: selectors.replace(/\s+/g, ' ').replace(/"/g, "'").trim(),
    declarations,
  }));
  return { css, blocks };
}

const MARKER_CLASS = /\.usfm_([a-z0-9]+)/g;

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
 * A block is a base text-spacing rule for a paragraph marker when it is scoped by `.text-spacing`
 * but is not a gutter rule. RTL blocks are excluded: the gutter variables are direction-agnostic
 * (the RTL glyph rule reads the same `--para-indent`), so the LTR/direction-agnostic margin is the
 * one the compensation must mirror.
 */
function isNonRtlBaseBlock(selectors: string): boolean {
  return (
    selectors.includes('text-spacing') &&
    !isGutterBlock(selectors) &&
    !selectors.includes("[dir='rtl']")
  );
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
      [...block.selectors.matchAll(MARKER_CLASS)].forEach(([, marker]) =>
        values.set(marker, value),
      );
    });
  return values;
}

/**
 * Maps each `.usfm_<marker>` to the value the BASE text-spacing rules give it for `property`,
 * keeping only values `accept` approves. When a marker has both a direction-agnostic rule
 * (`.text-spacing .usfm_x`) and an LTR rule (`.text-spacing[dir='ltr'] .usfm_x`) the LTR value
 * wins, matching the cascade for an LTR document.
 */
function getBaseMarkerValues(
  { blocks }: ParsedStylesheet,
  property: string,
  accept: (value: string) => boolean,
): Map<string, string> {
  const agnostic = new Map<string, string>();
  const ltr = new Map<string, string>();
  blocks
    .filter((block) => isNonRtlBaseBlock(block.selectors))
    .forEach((block) => {
      const value = declarationValue(block.declarations, property);
      if (value === undefined || !accept(value)) return;
      const target = block.selectors.includes("[dir='ltr']") ? ltr : agnostic;
      [...block.selectors.matchAll(MARKER_CLASS)].forEach(([, marker]) =>
        target.set(marker, value),
      );
    });
  return new Map([...agnostic, ...ltr]);
}

/** A length that moves the box: anything other than a zero (`0`, `0px`, `0vw`, `0in`, ...). */
function isNonZeroLength(value: string): boolean {
  return !/^-?0(\.0+)?[a-z%]*$/.test(value);
}

/** A negative length — the hanging indent that pulls the first line before the border edge. */
function isNegativeLength(value: string): boolean {
  return value.startsWith('-') && isNonZeroLength(value);
}

/** Reports each expected marker whose actual `property` value is missing or wrong. */
function valueMismatches(
  sheet: ParsedStylesheet,
  property: string,
  expected: Map<string, string>,
): string[] {
  const actual = getGutterMarkerValues(sheet, property);
  return [...expected]
    .filter(([marker, value]) => actual.get(marker) !== value)
    .map(
      ([marker, value]) =>
        `.usfm_${marker}: expected ${property}: ${value}, got ${actual.get(marker) ?? 'none'}`,
    );
}

/**
 * Reports gutter markers that set `property` but have no base rule calling for it — the reverse of
 * `valueMismatches`. This keeps the guard symmetric: a compensation the base rules don't need, or a
 * stale entry left behind after a marker loses its margin, is flagged rather than silently
 * passing.
 */
function unexpectedMarkers(
  sheet: ParsedStylesheet,
  property: string,
  expected: Map<string, string>,
): string[] {
  const actual = getGutterMarkerValues(sheet, property);
  return [...actual]
    .filter(([marker]) => !expected.has(marker))
    .map(
      ([marker, value]) =>
        `.usfm_${marker}: sets ${property}: ${value} but no base text-spacing rule calls for it`,
    );
}

/**
 * Reports gutter `property` rules qualified by writing direction (`[dir=…]`). Upstream keeps the
 * gutter --para-indent/--verse-text-start values identical for LTR and RTL, so a `[dir=…]`
 * qualifier would leave one direction with no indent compensation while the coverage filter — which
 * matches on the `psc-gutter-markers` and `text-spacing` substrings and ignores the qualifier —
 * still counted the marker as covered. This keeps that asymmetry from slipping back in silently.
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

describe.each(STYLESHEETS)('$name .psc-gutter-markers.text-spacing coverage', ({ path }) => {
  const sheet = parseStylesheet(path);

  // Every base text-spacing margin-left is a paragraph indent the gutter glyph must be pulled back by.
  const expectedParaIndent = getBaseMarkerValues(sheet, 'margin-left', isNonZeroLength);

  // Every base negative text-indent is a hanging indent the focus box must start at.
  const expectedVerseTextStart = getBaseMarkerValues(sheet, 'text-indent', isNegativeLength);

  it('derives a non-empty expectation from the base text-spacing rules', () => {
    // If the base parser ever reads nothing, both coverage checks below would pass vacuously.
    expect(expectedParaIndent.size).toBeGreaterThan(40);
    expect(expectedVerseTextStart.size).toBeGreaterThan(20);
    // Spot checks pinning the derivation to known USFM values, so a parser regression that reads
    // the wrong property or block shows up as a wrong number rather than a shorter list.
    expect(expectedParaIndent.get('li2')).toBe('15vw');
    expect(expectedParaIndent.get('qm2')).toBe('20vw');
    expect(expectedVerseTextStart.get('li2')).toBe('-7.5vw');
    expect(expectedVerseTextStart.get('iq1')).toBe('-15vw');
    expect(expectedVerseTextStart.has('p')).toBe(false);
  });

  it('every indented marker sets --para-indent equal to its text-spacing margin', () => {
    // Fails loudly if a gutter rule was nested where the flat parser can't see it.
    expect(nestingProblems(sheet, '--para-indent')).toEqual([]);
    // Fails loudly if a gutter --para-indent rule is direction-qualified (LTR/RTL must match).
    expect(directionQualifiedGutterRules(sheet, '--para-indent')).toEqual([]);
    // Names each marker whose --para-indent is missing or differs from its margin.
    expect(valueMismatches(sheet, '--para-indent', expectedParaIndent)).toEqual([]);
    // Names any gutter marker that sets --para-indent without a base margin calling for it.
    expect(unexpectedMarkers(sheet, '--para-indent', expectedParaIndent)).toEqual([]);
  });

  it('every hanging-indent marker sets --verse-text-start equal to its text-indent', () => {
    expect(nestingProblems(sheet, '--verse-text-start')).toEqual([]);
    expect(directionQualifiedGutterRules(sheet, '--verse-text-start')).toEqual([]);
    expect(valueMismatches(sheet, '--verse-text-start', expectedVerseTextStart)).toEqual([]);
    expect(unexpectedMarkers(sheet, '--verse-text-start', expectedVerseTextStart)).toEqual([]);
  });
});
