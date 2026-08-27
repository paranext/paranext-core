import * as crypto from 'crypto';
import * as fs from 'fs';
import { compareStrings, compareVersions } from './compare';
import { readJsonFile } from './read-json';
import type { Lock, ReportRow } from './types';

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
 */
export function buildLock(
  {
    verdicts,
    licenseeVersion,
    corpusVersion,
  }: {
    verdicts: ReportRow[];
    licenseeVersion: string;
    corpusVersion: string;
  },
  rendered: string,
): Lock {
  return {
    licenseeVersion,
    corpusVersion,
    documentSha256: sha256(rendered),
    packages: verdicts
      .map((v) => ({
        ecosystem: v.ecosystem,
        name: v.name,
        version: v.version,
        spdxId: v.spdxId,
        // 0 is what the lock already records for a row nothing was identified for - `npm:jszip`
        // is the live one - so an absent confidence and a zero confidence are the same fact here.
        confidence: v.confidence ?? 0,
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

/** Sha256 of a document's exact bytes, as `documentSha256` records them. */
export function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * Sha256 of bytes that are not text.
 *
 * A sibling of `sha256` rather than a widening of it: the string overload pins the encoding, and a
 * parameter that accepts either would let a caller hash a string whose encoding nothing states.
 */
export function sha256Bytes(bytes: Buffer): string {
  return crypto.createHash('sha256').update(bytes).digest('hex');
}

/**
 * Whether the committed document is the one the committed lock was written beside.
 *
 * The whole point of `documentSha256`: it lets a check that CANNOT re-render the document - no
 * Ruby, no dotnet, no network - still answer whether that document has been edited since it was
 * generated. `--verify-shipping-set` is that check, and it is the only notices gate the release
 * workflows run, so without this field the document itself is unverified on every path that
 * produces an installer.
 *
 * @returns Human-readable drift descriptions; empty means the pair agrees.
 */
export function diffDocument(lock: Lock, documentPath: string, documentText: string): string[] {
  if (!lock.documentSha256)
    return [
      `${documentPath} could not be checked: the committed lock records no documentSha256. ` +
        'Regenerate on Linux so the document and its lock are written as a pair again.',
    ];
  const actual = sha256(documentText);
  if (actual === lock.documentSha256) return [];
  return [
    `${documentPath} is not the document this lock was written beside (recorded ` +
      `${lock.documentSha256.slice(0, 12)}, found ${actual.slice(0, 12)}) - it was edited by ` +
      'hand, or the two were committed from different runs',
  ];
}

export function writeLock(file: string, lock: Lock): void {
  fs.writeFileSync(file, `${JSON.stringify(lock, undefined, 2)}\n`);
}

export function readLock(file: string): Lock {
  return readJsonFile<Lock>(file, 'the committed notices lock');
}

const keyOf = (p: { ecosystem: string; name: string; version: string }) =>
  `${p.ecosystem}:${p.name}@${p.version}`;

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
 * @returns Human-readable drift descriptions; empty means no drift
 */
export function diffLock(expected: Lock, actual: Lock): string[] {
  const out: string[] = [];

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
    // license change, but it IS a change to what the committed lock records, and reporting nothing
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
 * This is the cheap cross-platform check (`main.ts`'s `--verify-shipping-set`), and it exists to
 * answer exactly one question: does THIS platform's build ship the same npm packages the committed
 * document was generated from? License identification is platform-invariant - the same files,
 * matched by the same pinned licensee version, produce the same verdict everywhere - so re-deriving
 * it here would only repeat the Linux leg's answer, at the cost of a Ruby install this check exists
 * to avoid. The NuGet closure does not vary by platform either, because it is already the union of
 * all four published runtime identifiers, resolved from Linux (`nuget-set.ts`). The one thing that
 * genuinely varies is the npm closure: npm installs an optional dependency only where its
 * `os`/`cpu` constraints match, so a tree resolved on Windows or macOS can differ from the one
 * Linux resolved it from - and that is exactly, and only, what this compares.
 *
 * @returns Human-readable drift descriptions, naming the package(s); empty means no drift
 */
export function diffShippingSet(
  lock: Lock,
  currentNpmPackages: { name: string; version: string }[],
): string[] {
  const npmKey = (p: { name: string; version: string }) => `${p.name}@${p.version}`;
  const lockedNpm = lock.packages.filter((p) => p.ecosystem === 'npm');
  const before = new Set(lockedNpm.map(npmKey));
  const after = new Set(currentNpmPackages.map(npmKey));

  const out: string[] = [];
  currentNpmPackages.forEach((p) => {
    if (!before.has(npmKey(p))) out.push(`added: ${npmKey(p)}`);
  });
  lockedNpm.forEach((p) => {
    if (!after.has(npmKey(p))) out.push(`removed: ${npmKey(p)}`);
  });
  return out;
}
