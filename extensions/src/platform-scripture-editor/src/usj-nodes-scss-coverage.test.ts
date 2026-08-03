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

/**
 * Collects all `.usfm_<marker>` names that appear in a `.psc-gutter-markers` rule block that SETS
 * `property` (a `${property}:` declaration, not a `var(--property)` read).
 */
function getGutterMarkers(property: string): Set<string> {
  const markers = new Set<string>();
  const ruleBlock = /([^{}]+)\{([^}]+)\}/g;
  for (let match = ruleBlock.exec(css); match; match = ruleBlock.exec(css)) {
    const [, selectors, declarations] = match;
    // `${property}:` matches a rule that SETS the custom property, not one that only reads it
    // via var(--property).
    if (selectors.includes('psc-gutter-markers') && declarations.includes(`${property}:`)) {
      const markerName = /\.usfm_([a-z0-9]+)/g;
      for (let m = markerName.exec(selectors); m; m = markerName.exec(selectors)) markers.add(m[1]);
    }
  }
  return markers;
}

// USFM standard LeftMargin values -> vw (formula: inches x 20).
// Source: https://github.com/ubsicap/usfm/blob/master/sty/usfm.sty
// Every marker here must have a --para-indent entry in .psc-gutter-markers.text-spacing.
const PARA_INDENT_MARKERS = new Set([
  // 0.25" -> 5vw
  'ipi',
  'imi',
  'pmo',
  'pm',
  'pmc',
  'pmr',
  'pi',
  'pi1',
  'mi',
  // 0.5" -> 10vw
  'io',
  'io1',
  'ili',
  'ili1',
  'li',
  'li1',
  'pi2',
  // 0.75" -> 15vw
  'q',
  'q1',
  'q2',
  'q3',
  'q4',
  'io2',
  'ili2',
  'li2',
  'lim',
  'lim1',
  'pi3',
  // 1.0" -> 20vw
  'qm',
  'qm1',
  'io3',
  'li3',
  'lim2',
  // 1.25" -> 25vw
  'io4',
  'li4',
  'lim3',
  // 1.5" -> 30vw
  'lim4',
]);

// Markers with a negative FirstLineIndent (hanging indent) -> --verse-text-start.
// Source: https://github.com/ubsicap/usfm/blob/master/sty/usfm.sty
const VERSE_TEXT_START_MARKERS = new Set([
  'q',
  'q1',
  'q2',
  'q3',
  'q4',
  'qm',
  'qm1',
  'qm2',
  'qm3',
  'iq',
  'iq1',
  'iq2',
  'iq3',
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
]);

describe('_usj-nodes.scss .psc-gutter-markers.text-spacing coverage', () => {
  it('every USFM indented marker has a --para-indent entry', () => {
    const covered = getGutterMarkers('--para-indent');
    // Guard against a silently-broken parser (no matches -> every marker would look "missing").
    expect(covered.size).toBeGreaterThan(0);
    // Any USFM indented marker lacking a --para-indent entry in .psc-gutter-markers.text-spacing;
    // the toEqual diff names them on failure.
    const missing = [...PARA_INDENT_MARKERS].filter((m) => !covered.has(m));
    expect(missing).toEqual([]);
  });

  it('every hanging-indent marker has a --verse-text-start entry', () => {
    const covered = getGutterMarkers('--verse-text-start');
    // Guard against a silently-broken parser (no matches -> every marker would look "missing").
    expect(covered.size).toBeGreaterThan(0);
    // Any hanging-indent marker lacking a --verse-text-start entry in .psc-gutter-markers.text-spacing;
    // the toEqual diff names them on failure.
    const missing = [...VERSE_TEXT_START_MARKERS].filter((m) => !covered.has(m));
    expect(missing).toEqual([]);
  });
});
