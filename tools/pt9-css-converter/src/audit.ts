/**
 * Regression audit for the committed marker SCSS.
 *
 * The generated `marker-styles/<id>.scss` files are produced by {@link convert} from the committed
 * `data/pt9-css/<id>.css` snapshots. This module re-runs that conversion and checks the result
 * still matches what is committed — catching any hand-edit of the generated SCSS, or any converter
 * change that silently alters output, without needing PT9 Desktop or the C# extractor.
 *
 * The generated header records a `Generated at:` timestamp and a `Source:` path, both of which vary
 * per run. To compare byte-for-byte without false positives, {@link auditScss} re-derives those two
 * values from the committed file's own header and feeds them back into the conversion, so only a
 * genuine difference in the rendered rules (or the warning summary) shows up as drift.
 */
import { convert } from './convert';

/** Provenance values lifted back out of a generated SCSS header. */
export interface GeneratedHeader {
  /** The `Source:` path recorded in the header, if present. */
  source?: string;
  /** The `Generated at:` timestamp parsed back into a Date, if present and valid. */
  generatedAt?: Date;
}

/** Outcome of auditing one committed SCSS file against a fresh conversion of its source CSS. */
export interface AuditResult {
  /** True when the freshly converted SCSS is byte-for-byte identical to the committed SCSS. */
  inSync: boolean;
  /** The committed SCSS that was checked. */
  expected: string;
  /** The SCSS produced by re-running the converter over the source CSS. */
  actual: string;
}

const SOURCE_RE = /^\s*\*\s*Source:\s*(.+?)\s*$/m;
const GENERATED_AT_RE = /^\s*\*\s*Generated at:\s*(.+?)\s*$/m;

/** Reads the `Source:` and `Generated at:` lines out of a generated SCSS header. */
export function parseGeneratedHeader(scss: string): GeneratedHeader {
  const header: GeneratedHeader = {};

  const sourceMatch = scss.match(SOURCE_RE);
  if (sourceMatch) {
    const [, source] = sourceMatch;
    header.source = source;
  }

  const generatedAtMatch = scss.match(GENERATED_AT_RE);
  if (generatedAtMatch) {
    const [, isoTimestamp] = generatedAtMatch;
    const parsed = new Date(isoTimestamp);
    if (!Number.isNaN(parsed.getTime())) header.generatedAt = parsed;
  }

  return header;
}

/**
 * Re-converts `css` and checks it reproduces `committedScss` exactly.
 *
 * The header's source/timestamp are taken from `committedScss` so they cannot cause spurious drift;
 * anything else that differs is real drift between the committed SCSS and its source CSS.
 *
 * @param committedScss The SCSS currently committed in the repo.
 * @param css The source CSS the committed SCSS was generated from.
 * @param options Pass `baseScss` (the editor's `_usj-nodes.scss`) so base-overlap reporting matches
 *   how the file was originally generated.
 */
export function auditScss(
  committedScss: string,
  css: string,
  options: { baseScss?: string } = {},
): AuditResult {
  const { source, generatedAt } = parseGeneratedHeader(committedScss);
  const { scss } = convert(css, { source, generatedAt, baseScss: options.baseScss });
  return { inSync: scss === committedScss, expected: committedScss, actual: scss };
}

/**
 * Renders a human-readable description of the first line at which `expected` and `actual` differ,
 * so a drift report can point the operator at what changed without dumping the whole file. Assumes
 * the two strings are not equal (callers only invoke it on a known mismatch).
 */
export function firstDifference(expected: string, actual: string): string {
  // Enforce the documented precondition: the only caller invokes this on a known mismatch. If a
  // future caller passes equal strings, that's a bug in its inSync bookkeeping — fail loudly rather
  // than returning a polite "no difference" message that would hide it.
  if (expected === actual)
    throw new Error(
      'firstDifference called with identical inputs — caller inSync bookkeeping is wrong',
    );
  const expectedLines = expected.split('\n');
  const actualLines = actual.split('\n');
  const max = Math.max(expectedLines.length, actualLines.length);
  for (let i = 0; i < max; i += 1) {
    if (expectedLines[i] !== actualLines[i]) {
      return [
        `    first difference at line ${i + 1}:`,
        `      committed:  ${JSON.stringify(expectedLines[i])}`,
        `      regenerated:${JSON.stringify(actualLines[i])}`,
      ].join('\n');
    }
  }
  return '    (files differ only in length)';
}
