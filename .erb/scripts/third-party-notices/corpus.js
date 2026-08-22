const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'spdx-corpus');
const INDEX = JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'));

/**
 * Lazily required so a missing dependency surfaces as a clear error rather than a module-load
 * crash.
 */
function licenseList() {
  // Deferred so a missing `spdx-license-list` dependency fails here, naming itself, instead of
  // crashing this whole module at require time.
  // eslint-disable-next-line global-require
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
 * @param {string} spdxId
 * @returns {string | undefined} Undefined when the id is not in the corpus - never an empty string,
 *   which would render as a discharged obligation while discharging nothing.
 */
function canonicalText(spdxId) {
  const expected = Object.prototype.hasOwnProperty.call(INDEX.checksums, spdxId)
    ? INDEX.checksums[spdxId]
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

function corpusVersion() {
  return INDEX.version;
}

/** @returns {string[]} Ids whose text is missing from the dependency or fails its checksum. */
function verifyCorpus() {
  return Object.keys(INDEX.checksums)
    .filter((id) => {
      try {
        return canonicalText(id) === undefined;
      } catch {
        return true;
      }
    })
    .sort();
}

module.exports = { canonicalText, corpusVersion, verifyCorpus };
