// @vitest-environment node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

// `_usj-nodes.scss` is a hand-maintained copy of scripture-editors'
// packages/platform/src/usj-nodes.css. That upstream file has its own coverage test
// (usj-nodes.test.ts); this is the equivalent guard for the downstream copy that actually
// ships in Platform.Bible, so the two can't silently drift (which reintroduced the \li/\lim
// gutter overlap once already). Keep the marker lists below in sync with the upstream test.

const dir = dirname(fileURLToPath(import.meta.url));
// Strip CSS comments so their text can't be mistaken for selectors or declarations.
const css = readFileSync(resolve(dir, '_usj-nodes.scss'), 'utf-8').replace(/\/\*[\s\S]*?\*\//g, '');

// The stylesheet is parsed as a flat list of `selector { declarations }` blocks. This regex cannot
// reliably read a rule nested inside another block (an @media query, @keyframes, or SCSS nesting),
// so a gutter rule wrapped in one could be mis-parsed and its markers silently uncovered.
// `nestingProblems()` catches that by brace depth before the coverage checks run.
const RULE_BLOCK = /([^{}]+)\{([^}]+)\}/g;
const blocks = [...css.matchAll(RULE_BLOCK)].map(([, selectors, declarations]) => ({
  selectors,
  declarations,
}));

/** Brace nesting depth at a character offset: 1 inside a top-level rule, >1 inside a nested one. */
function braceDepthAt(index: number): number {
  const before = css.slice(0, index);
  return (before.match(/\{/g) ?? []).length - (before.match(/\}/g) ?? []).length;
}

/**
 * Reports `property` setters that sit deeper than one block — i.e. nested inside an at-rule/SCSS
 * block, where a browser would scope them away but the flat block parser below cannot reliably see
 * them. A setter declaration normally lives at depth 1 (inside its own rule); depth >1 means a rule
 * was nested and the coverage checks can no longer be trusted. (Unrelated pre-existing media-query
 * and keyframes at-rules don't contain these setters, so they don't trip this.)
 */
function nestingProblems(property: string): string[] {
  const setter = new RegExp(`${property}\\s*:`, 'g');
  const nested = [...css.matchAll(setter)].filter((match) => braceDepthAt(match.index ?? 0) > 1);
  return nested.length === 0
    ? []
    : [
        `${property}: ${nested.length} setter(s) are nested inside an @media/@keyframes/SCSS ` +
          `block; the flat parser below cannot reliably see them. Update the parser.`,
      ];
}

/**
 * Maps each `.usfm_<marker>` to the value it is given for `property`, but only within a rule whose
 * selector carries BOTH `.psc-gutter-markers` and `.text-spacing` — the exact scope where the real
 * indent overrides live. A `${property}:` setter (not a `var(--property)` read) is required.
 * Requiring `.text-spacing` means a marker whose setter was moved out of that group reads as
 * uncovered rather than silently passing.
 */
function getGutterMarkerValues(property: string): Map<string, string> {
  const declaration = new RegExp(`${property}\\s*:\\s*([^;]+)`);
  const values = new Map<string, string>();
  blocks
    .filter(
      (block) =>
        block.selectors.includes('psc-gutter-markers') && block.selectors.includes('text-spacing'),
    )
    .forEach((block) => {
      const match = declaration.exec(block.declarations);
      if (!match) return;
      const value = match[1].trim();
      [...block.selectors.matchAll(/\.usfm_([a-z0-9]+)/g)].forEach(([, marker]) =>
        values.set(marker, value),
      );
    });
  return values;
}

/** Flattens a `value -> markers` grouping into a `marker -> value` lookup. */
function markersByValue(grouped: Record<string, string[]>): Map<string, string> {
  const map = new Map<string, string>();
  Object.entries(grouped).forEach(([value, markers]) =>
    markers.forEach((marker) => map.set(marker, value)),
  );
  return map;
}

/** Reports each expected marker whose actual `property` value is missing or wrong. */
function valueMismatches(property: string, expected: Map<string, string>): string[] {
  const actual = getGutterMarkerValues(property);
  return [...expected]
    .filter(([marker, value]) => actual.get(marker) !== value)
    .map(
      ([marker, value]) =>
        `.usfm_${marker}: expected ${value}, got ${actual.get(marker) ?? 'none'}`,
    );
}

// USFM standard LeftMargin values -> vw (formula: inches x 20).
// Source: https://github.com/ubsicap/usfm/blob/master/sty/usfm.sty
// Every marker must set --para-indent to the listed value in .psc-gutter-markers.text-spacing.
const EXPECTED_PARA_INDENT = markersByValue({
  '5vw': ['ipi', 'imi', 'pmo', 'pm', 'pmc', 'pmr', 'pi', 'pi1', 'mi'], // 0.25"
  '10vw': ['io', 'io1', 'ili', 'ili1', 'li', 'li1', 'pi2'], // 0.5"
  '15vw': ['q', 'q1', 'q2', 'q3', 'q4', 'io2', 'ili2', 'li2', 'lim', 'lim1', 'pi3'], // 0.75"
  '20vw': ['qm', 'qm1', 'io3', 'li3', 'lim2'], // 1.0"
  '25vw': ['io4', 'li4', 'lim3'], // 1.25"
  '30vw': ['lim4'], // 1.5"
});

// Markers with a negative FirstLineIndent (hanging indent) -> --verse-text-start.
// Source: https://github.com/ubsicap/usfm/blob/master/sty/usfm.sty
const EXPECTED_VERSE_TEXT_START = markersByValue({
  '-15vw': ['qm', 'qm1', 'iq', 'iq1'],
  '-10vw': ['q', 'q1', 'qm2', 'iq2'],
  '-7.5vw': [
    'q2',
    'ili',
    'ili1',
    'ili2',
    'li',
    'li1',
    'li2',
    'li3',
    'li4',
    'lim',
    'lim1',
    'lim2',
    'lim3',
    'lim4',
  ],
  '-5vw': ['q3', 'qm3', 'iq3'],
  '-2.5vw': ['q4'],
});

describe('_usj-nodes.scss .psc-gutter-markers.text-spacing coverage', () => {
  it('every USFM indented marker sets the expected --para-indent', () => {
    // Fails loudly if a gutter rule was nested where the flat parser can't see it.
    expect(nestingProblems('--para-indent')).toEqual([]);
    // Names each marker whose --para-indent is missing or wrong (an empty actual map surfaces here
    // too, since every expected marker then reports "got none").
    expect(valueMismatches('--para-indent', EXPECTED_PARA_INDENT)).toEqual([]);
  });

  it('every hanging-indent marker sets the expected --verse-text-start', () => {
    expect(nestingProblems('--verse-text-start')).toEqual([]);
    expect(valueMismatches('--verse-text-start', EXPECTED_VERSE_TEXT_START)).toEqual([]);
  });
});
