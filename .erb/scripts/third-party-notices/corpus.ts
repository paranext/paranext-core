import * as path from 'path';
import { sha256 } from './lock';
import { readJsonFile } from './read-json';

/** The committed provenance record for the canonical SPDX texts: source, version, sha256 per id. */
type CorpusIndex = {
  version: string;
  checksums: Record<string, string>;
};

const DIR = path.join(__dirname, 'spdx-corpus');

let cachedIndex: CorpusIndex | undefined;

/**
 * The committed checksum index, read on first use.
 *
 * Lazily, not at module load. `main.ts` imports this file at the top level, so reading the index
 * eagerly would put a missing or truncated one inside `require` - outside `main` and its
 * `try`/`catch`, and so outside this pipeline's convention that a failure prints one line and a
 * remedy rather than a stack trace. Same reason `licenseList` below is a lazy `require`.
 */
function corpusIndex(): CorpusIndex {
  if (!cachedIndex)
    cachedIndex = readJsonFile<CorpusIndex>(
      path.join(DIR, 'index.json'),
      'the vendored SPDX corpus index',
    );
  return cachedIndex;
}

/**
 * Lazily required so a missing dependency surfaces as a clear error rather than a module-load
 * crash.
 */
function licenseList(): Record<string, { licenseText: string }> {
  // Deferred so a missing `spdx-license-list` dependency fails here, naming itself, instead of
  // crashing this whole module at require time.
  // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports -- The laziness
  // IS the point; a static import would move the failure back to module load.
  return require('spdx-license-list/full');
}

/**
 * Canonical SPDX license text for an identifier, verified against the committed checksum index.
 *
 * The texts live in the pinned `spdx-license-list` dependency rather than being vendored: the full
 * corpus is 10.47 MB for roughly 600 licenses. What IS committed is `index.json` - source, version,
 * and a sha256 for each license a verdict can resolve to - so provenance is mechanical and any
 * drift or substitution in the dependency is detected rather than silently reproduced, without
 * carrying 10 MB to do it. `build-corpus-index.ts` writes that file and defines which identifiers
 * are in it.
 *
 * @returns Undefined when the id is not in the corpus - never an empty string, which would render
 *   as a discharged obligation while discharging nothing.
 */
export function canonicalText(spdxId: string): string | undefined {
  const { checksums } = corpusIndex();
  const expected = Object.prototype.hasOwnProperty.call(checksums, spdxId)
    ? checksums[spdxId]
    : undefined;
  if (!expected) return undefined;

  const entry = licenseList()[spdxId];
  if (!entry || !entry.licenseText) return undefined;

  const actual = sha256(entry.licenseText);
  if (actual !== expected)
    throw new Error(
      `canonical text for ${spdxId} does not match the committed checksum (expected ${expected}, ` +
        `got ${actual}). The spdx-license-list dependency has drifted. Regenerate the index ` +
        'deliberately and review the diff:\n' +
        '    npm run build:third-party-notices:corpus',
    );

  return entry.licenseText;
}

export function corpusVersion(): string {
  return corpusIndex().version;
}

/** @returns Ids whose text is missing from the dependency or fails its checksum. */
export function verifyCorpus(): string[] {
  return Object.keys(corpusIndex().checksums)
    .filter((id) => {
      try {
        return canonicalText(id) === undefined;
      } catch {
        return true;
      }
    })
    .sort();
}
