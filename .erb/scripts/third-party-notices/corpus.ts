import * as crypto from 'crypto';
import * as path from 'path';
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
 * Read at MODULE LOAD, this defeated the pipeline's message-only error convention on every entry
 * point that imports this file - and `main.ts` imports it at the top level, so a corpus index that
 * was missing or truncated threw during `require`, before `main` and its `try`/`catch` existed. The
 * developer got a raw stack trace where every other failure in this pipeline prints one line and a
 * remedy. It is the same reason `licenseList` below is a lazy `require`, applied to the other thing
 * this module reads.
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
 * Canonical SPDX licence text for an identifier, verified against the committed checksum index.
 *
 * The texts live in the pinned `spdx-license-list` dependency rather than being vendored: the full
 * corpus is 10.47 MB for ~600 licences, of which this project uses about 13. What IS committed is
 * `index.json` - source, version, and a sha256 per licence - so provenance is mechanical and any
 * drift or substitution in the dependency is detected rather than silently reproduced. That was the
 * actual requirement; carrying 10 MB was not.
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

  const actual = crypto.createHash('sha256').update(entry.licenseText).digest('hex');
  if (actual !== expected)
    throw new Error(
      `canonical text for ${spdxId} does not match the committed checksum (expected ${expected}, ` +
        `got ${actual}). The spdx-license-list dependency has drifted; regenerate ` +
        'spdx-corpus/index.json deliberately and review the diff.',
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
