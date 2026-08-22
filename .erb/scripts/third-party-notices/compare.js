/**
 * Ordering primitives shared by the notices pipeline.
 *
 * Both were moved here verbatim from the deleted
 * `.erb/scripts/generate-third-party-notices.util.js`. They live in their own file rather than
 * inside `render.js` because `nuget-set.js` needs `compareVersions` for its shared-framework
 * comparison, and a data-collection module importing the renderer to get a number comparison would
 * be a worse dependency than a two-function module.
 */

/**
 * Orders two dotted version strings by their numeric components.
 *
 * `localeCompare` and plain string order both get this wrong where it matters - `'10.0.0' <
 * '9.0.0'` as text - and NuGet versions run to four components (`9.5.0.22`).
 *
 * A TOTAL order, which matters for two different reasons:
 *
 * - It is the last term of the comparators `lock.js` and `render.js` sort committed bytes with, so
 *   two versions that compare equal fall back to whatever order they arrived in - ultimately
 *   `fs.readdirSync` order - in a pair of files whose whole premise is byte reproducibility.
 *   Dropping the pre-release suffix made `1.0.0-beta.1` and `1.0.0` exactly that pair, so the
 *   suffix is now ordered (semver's rule: a pre-release precedes its release) rather than
 *   discarded.
 * - Build metadata (`4.4.1+abc`) is stripped, and a non-numeric component is no longer coerced to
 *   `0`. `Number('1+abc')` is `NaN` and `NaN || 0` is `0`, so `4.4.1+abc` read as `4.4.0`: enough
 *   for `isFrameworkPackage('System.Buffers', '4.4.1+abc')` to compute `<= 4.4.0` and drop a
 *   genuinely shipping package before it ever reached the copyleft gate, which is the exact outcome
 *   that function's own docstring says it exists to prevent.
 *
 * @param {string} first
 * @param {string} second
 * @returns {number}
 */
function compareVersions(first, second) {
  const parse = (version) => {
    // Build metadata is not part of precedence (semver §10); the pre-release suffix is (§11).
    const [core, ...prerelease] = String(version ?? '')
      .trim()
      .split('+')[0]
      .split('-');
    return {
      // A component that is not a run of digits carries no numeric precedence, so it contributes
      // nothing rather than silently reading as zero.
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
 * Orders two strings by code unit.
 *
 * Deliberately not `localeCompare`: the artifact this pipeline writes is committed and CI compares
 * it byte for byte, so every ordering decision has to be a property of the data alone. ICU
 * collation depends on the machine's locale and on the ICU version Node was built against, and a
 * Node built `--without-intl` collates differently again - each of which reorders hundreds of rows
 * and fails the check with a diff the author cannot reproduce.
 *
 * @param {string} first
 * @param {string} second
 * @returns {number}
 */
function compareStrings(first, second) {
  if (first === second) return 0;
  return first < second ? -1 : 1;
}

/**
 * Orders two `{ name, version }` records by name, then by version.
 *
 * The one ordering every collector and the renderer sort their output with, written out at four
 * call sites before it lived here. It has to be the same comparison in all of them: two of those
 * sites order bytes that are committed and byte-compared by CI, and a fifth spelling of it that
 * drifted would show up as an unexplainable reordering of the artifact.
 *
 * @param {{ name: string; version: string }} first
 * @param {{ name: string; version: string }} second
 * @returns {number}
 */
function compareByNameThenVersion(first, second) {
  return compareStrings(first.name, second.name) || compareVersions(first.version, second.version);
}

module.exports = { compareByNameThenVersion, compareStrings, compareVersions };
