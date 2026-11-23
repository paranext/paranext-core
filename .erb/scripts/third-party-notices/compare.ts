/**
 * Ordering primitives shared by the notices pipeline.
 *
 * They live in their own file rather than inside `render.ts` because `nuget-set.ts` needs
 * `compareVersions` for its shared-framework comparison, and a data-collection module importing the
 * renderer to get a number comparison would be a worse dependency than a two-function module.
 */

/**
 * Orders two dotted version strings by their numeric components.
 *
 * `localeCompare` and plain string order both get this wrong where it matters - `'10.0.0' <
 * '9.0.0'` as text - and NuGet versions run to four components (`9.5.0.22`).
 *
 * A TOTAL order, which matters for two different reasons:
 *
 * - It is the last term of the comparators `lock.ts` and `render.ts` sort committed bytes with, so
 *   two versions that compare equal fall back to whatever order they arrived in - ultimately
 *   `fs.readdirSync` order - in a pair of files whose whole premise is byte reproducibility.
 *   Dropping the pre-release suffix made `1.0.0-beta.1` and `1.0.0` exactly that pair, so the
 *   suffix is now ordered (semver's rule: a pre-release precedes its release) rather than
 *   discarded.
 * - Build metadata (`4.4.1+abc`) is stripped before the numeric components are read, rather than left
 *   for `Number` to turn into `NaN` and `NaN || 0` into `0` - which read `4.4.1+abc` as `4.4.0`.
 *
 * Being total has a price the callers have to know about: a component that is not a run of digits
 * is COERCED to `0`, so `4.4.x` and `4.4.0` compare equal. That is the right answer for ordering
 * rows and the wrong one for deciding anything, because it silently makes an unorderable version
 * look equal to a real one. A caller that turns this comparison into a decision must ask
 * `isNumericVersion` first; `isFrameworkPackage` is the one that does.
 */
export function compareVersions(first: string, second: string): number {
  const parse = (version: string) => {
    // Build metadata is not part of precedence (semver §10); the pre-release suffix is (§11).
    const [core, ...prerelease] = String(version ?? '')
      .trim()
      .split('+')[0]
      .split('-');
    return {
      // A component that is not a run of digits has no numeric precedence, and there is no value
      // that represents "no precedence" in a comparison that must return an ordering for every
      // input. It sorts as `0`; `isNumericVersion` is how a caller tells the two apart.
      numbers: core.split('.').map((part) => (/^\d+$/.test(part) ? Number(part) : 0)),
      prerelease: prerelease.join('-'),
    };
  };
  const left = parse(first);
  const right = parse(second);
  for (let index = 0; index < Math.max(left.numbers.length, right.numbers.length); index += 1) {
    const difference = (left.numbers[index] ?? 0) - (right.numbers[index] ?? 0);
    if (difference) return difference < 0 ? -1 : 1;
  }
  if (left.prerelease === right.prerelease) return 0;
  // A version with a pre-release suffix precedes the release it leads to; two pre-releases of the
  // same release are ordered by code unit, which is deterministic without claiming to implement
  // semver's dot-separated identifier comparison.
  if (!left.prerelease) return 1;
  if (!right.prerelease) return -1;
  return left.prerelease < right.prerelease ? -1 : 1;
}

/**
 * Whether every dotted component of a version's core is a run of digits.
 *
 * `compareVersions` has to return an ordering for every input, so it coerces a component it cannot
 * read to `0` - which makes `4.4.x` compare EQUAL to `4.4.0` rather than incomparable to it. Any
 * caller deriving a decision from a `<`/`<=`/`>` test therefore has to establish first that the
 * versions were comparable at all, or it reads a value it could not parse as one it could.
 *
 * Build metadata and the pre-release suffix are stripped the same way `compareVersions` strips
 * them, so the two agree about what "the numeric part" is.
 */
export function isNumericVersion(version: string): boolean {
  const core = String(version ?? '')
    .trim()
    .split('+')[0]
    .split('-')[0];
  const parts = core.split('.');
  return parts.length > 0 && parts.every((part) => /^\d+$/.test(part));
}

/**
 * Orders two strings by code unit.
 *
 * Deliberately not `localeCompare`: the artifact this pipeline writes is committed and CI compares
 * it byte for byte, so every ordering decision has to be a property of the data alone. ICU
 * collation depends on the machine's locale and on the ICU version Node was built against, and a
 * Node built `--without-intl` collates differently again - each of which reorders hundreds of rows
 * and fails the check with a diff the author cannot reproduce.
 */
export function compareStrings(first: string, second: string): number {
  if (first === second) return 0;
  return first < second ? -1 : 1;
}

/**
 * Orders two `{ name, version }` records by name, then by version.
 *
 * The one ordering every collector and the renderer sort their output with, written out at four
 * call sites. It has to be the same comparison in all of them: two of those sites order bytes that
 * are committed and byte-compared by CI, and a fifth spelling of it that drifted would show up as
 * an unexplainable reordering of the artifact.
 */
export function compareByNameThenVersion(
  first: { name: string; version: string },
  second: { name: string; version: string },
): number {
  return compareStrings(first.name, second.name) || compareVersions(first.version, second.version);
}
