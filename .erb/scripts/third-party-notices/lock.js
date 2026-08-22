const fs = require('fs');
const { compareStrings, compareVersions } = require('./compare');

/**
 * @typedef {{
 *   licenseeVersion: string;
 *   corpusVersion: string;
 *   packages: {
 *     ecosystem: string;
 *     name: string;
 *     version: string;
 *     spdxId: string | undefined;
 *     confidence: number;
 *     matchedFile: string | undefined;
 *     textSha256: string | undefined;
 *   }[];
 * }} Lock
 */

/**
 * Builds the committed lock sidecar.
 *
 * The module manifests cannot be committed - they change whenever anyone edits an import - so a
 * fully hermetic generator is unreachable. This is the alternative that buys the most drift
 * detection per committed byte: metadata and hashes only, no texts (the rendered document already
 * carries every text), in one reviewable file.
 *
 * `licenseeVersion` is recorded because a matcher upgrade changes detection, and therefore changes
 * verdicts. Without it, a verdict that shifted because the gem was upgraded is indistinguishable
 * from one that shifted because a license changed.
 *
 * `verdicts` here is the ORCHESTRATOR's composed shape (`{...pkg, ...classify(...), confidence}`),
 * not `classify`'s narrower return - `classify` alone never has `ecosystem`, `name`, `version`, or
 * `confidence`.
 *
 * @param {{
 *   verdicts: {
 *     ecosystem: string;
 *     name: string;
 *     version: string;
 *     spdxId: string | undefined;
 *     confidence: number;
 *     matchedFile: string | undefined;
 *     textSha256: string | undefined;
 *   }[];
 *   licenseeVersion: string;
 *   corpusVersion: string;
 * }} input
 * @returns {Lock}
 */
function buildLock({ verdicts, licenseeVersion, corpusVersion }) {
  return {
    licenseeVersion,
    corpusVersion,
    packages: verdicts
      .map((v) => ({
        ecosystem: v.ecosystem,
        name: v.name,
        version: v.version,
        spdxId: v.spdxId,
        confidence: v.confidence,
        matchedFile: v.matchedFile,
        textSha256: v.textSha256,
      }))
      // Deliberately not `localeCompare`: this file is committed and byte-compared, and ICU
      // collation depends on the machine's locale and on the ICU version Node was built against, so
      // the same packages could sort differently on two machines - the exact non-determinism this
      // lock exists to detect. `compareVersions` on the last term additionally orders `10.0.0` after
      // `9.0.0`, which text order does not.
      .sort(
        (a, b) =>
          compareStrings(a.ecosystem, b.ecosystem) ||
          compareStrings(a.name, b.name) ||
          compareVersions(a.version, b.version),
      ),
  };
}

/**
 * @param {string} file
 * @param {Lock} lock
 */
function writeLock(file, lock) {
  fs.writeFileSync(file, `${JSON.stringify(lock, undefined, 2)}\n`);
}

/**
 * @param {string} file
 * @returns {Lock}
 */
function readLock(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const keyOf = (p) => `${p.ecosystem}:${p.name}@${p.version}`;

/**
 * Compares two locks and describes the drift between them, if any.
 *
 * Order-independent by construction: both sides are read into a `Map` keyed on
 * `ecosystem:name@version` before any comparison happens, so `buildLock`'s sort (which exists for a
 * stable, reviewable diff of the committed file - not for this function's correctness) is never
 * relied on here.
 *
 * The most important case this function exists to catch is the subtle one: same package, same
 * version, same SPDX id, but a DIFFERENT `textSha256` - a license text changing under a version a
 * human would never think to re-check. That case gets its own message naming the file to inspect,
 * distinct from an SPDX id change (a different, usually louder, kind of drift) and distinct from a
 * `licenseeVersion`/`corpusVersion` change (whose remedy is reviewing a matcher upgrade's verdict
 * diff, not investigating a single package).
 *
 * @param {Lock} expected
 * @param {Lock} actual
 * @returns {string[]} Human-readable drift descriptions; empty means no drift
 */
function diffLock(expected, actual) {
  const out = [];

  if (expected.licenseeVersion !== actual.licenseeVersion)
    out.push(
      `licensee changed from ${expected.licenseeVersion} to ${actual.licenseeVersion}. A matcher ` +
        'upgrade can change detection results, so review the resulting verdict diff deliberately.',
    );
  if (expected.corpusVersion !== actual.corpusVersion)
    out.push(`SPDX corpus changed from ${expected.corpusVersion} to ${actual.corpusVersion}.`);

  const before = new Map(expected.packages.map((p) => [keyOf(p), p]));
  const after = new Map(actual.packages.map((p) => [keyOf(p), p]));

  after.forEach((p, key) => {
    if (!before.has(key)) out.push(`added: ${key} (${p.spdxId})`);
  });
  before.forEach((p, key) => {
    if (!after.has(key)) out.push(`removed: ${key} (${p.spdxId})`);
  });
  before.forEach((was, key) => {
    const now = after.get(key);
    if (!now) return;
    if (was.spdxId !== now.spdxId)
      // Deliberately swallows a concurrent textSha256 change here: a real scenario (a package
      // relicenses, and the new text naturally differs) still reports only this message, not both.
      // Accepted because the SPDX id change is the louder signal and already forces a full review
      // of this package - nothing is lost in practice. Do not "fix" this into double-reporting.
      out.push(`${key}: license changed from ${was.spdxId} to ${now.spdxId}`);
    else if (was.textSha256 !== now.textSha256)
      out.push(
        `${key}: license text changed under the same version and identifier ` +
          `(${was.textSha256} -> ${now.textSha256}). Inspect ${now.matchedFile} before accepting.`,
      );
    // Same identifier, same text, but a different file or a different confidence behind it - a
    // package renaming LICENSE to LICENSE.md, or a matcher scoring the same text differently. Not a
    // licence change, but it IS a change to what the committed lock records, and reporting nothing
    // for it meant `--verify` could report success on a lock the very next regeneration rewrites.
    else if (was.matchedFile !== now.matchedFile || was.confidence !== now.confidence)
      out.push(
        `${key}: the license file the verdict rests on changed from ` +
          `${was.matchedFile} (${was.confidence}%) to ${now.matchedFile} (${now.confidence}%). ` +
          'The text itself is unchanged.',
      );
  });

  return out;
}

/**
 * Compares the CURRENT npm shipping set against the npm half of the committed lock, by
 * `name@version` alone - no `spdxId`, `confidence`, `matchedFile` or `textSha256` involved.
 *
 * This is the cheap cross-platform check (`main.js`'s `--verify-shipping-set`), and it exists to
 * answer exactly one question: does THIS platform's build ship the same npm packages the committed
 * document was generated from? Licence identification is platform-invariant - the same files,
 * matched by the same pinned licensee version, produce the same verdict everywhere - so re-deriving
 * it here would only repeat the Linux leg's answer, at the cost of a Ruby install this check exists
 * to avoid. The NuGet closure does not vary by platform either, because it is already the union of
 * all four published runtime identifiers, resolved from Linux (`nuget-set.js`). The one thing that
 * genuinely varies is the npm closure: npm installs an optional dependency only where its
 * `os`/`cpu` constraints match, so a tree resolved on Windows or macOS can differ from the one
 * Linux resolved it from - and that is exactly, and only, what this compares.
 *
 * @param {Lock} lock
 * @param {{ name: string; version: string }[]} currentNpmPackages
 * @returns {string[]} Human-readable drift descriptions, naming the package(s); empty means no
 *   drift
 */
function diffShippingSet(lock, currentNpmPackages) {
  const npmKey = (p) => `${p.name}@${p.version}`;
  const lockedNpm = lock.packages.filter((p) => p.ecosystem === 'npm');
  const before = new Set(lockedNpm.map(npmKey));
  const after = new Set(currentNpmPackages.map(npmKey));

  const out = [];
  currentNpmPackages.forEach((p) => {
    if (!before.has(npmKey(p))) out.push(`added: ${npmKey(p)}`);
  });
  lockedNpm.forEach((p) => {
    if (!after.has(npmKey(p))) out.push(`removed: ${npmKey(p)}`);
  });
  return out;
}

module.exports = { buildLock, writeLock, readLock, diffLock, diffShippingSet };
