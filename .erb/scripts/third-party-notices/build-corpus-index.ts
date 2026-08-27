/**
 * Regenerates `spdx-corpus/index.json` - the provenance record `corpus.ts` verifies canonical
 * license texts against before they are reproduced into `THIRD-PARTY-NOTICES.md`.
 *
 *     npm run build:third-party-notices:corpus
 *
 * The texts themselves live in the pinned `spdx-license-list` dependency rather than being
 * vendored: the full corpus is 10.47 MB for roughly 600 licenses. What is committed is the source,
 * the dependency version, and a sha256 per license, so provenance is mechanical and any drift or
 * substitution in the dependency is detected rather than silently reproduced.
 *
 * Indexed for exactly the identifiers the policy can reach a verdict on, and no others. Every
 * checksum here is a text this repository may have to reproduce; a checksum for an identifier no
 * verdict path can produce is never read, is re-hashed by `verifyCorpus` on every run, and - since
 * SPDX names licenses after the tools they cover - drags identifiers like `TermReadKey` and
 * `HIDAPI` in beside 64-char hex, which is a secret-scanner false positive waiting to be
 * allowlisted. `corpus-texts.test.ts` asserts this file equals what {@link reachableIds} derives, so
 * adding an `exceptions` entry that records a novel identifier fails until this is re-run.
 */

import * as fs from 'fs';
import * as path from 'path';
import spdxLicenseList from 'spdx-license-list/full';
import { parseDeclared } from './declared';
import { sha256 } from './lock';
import { loadPolicy } from './policy';
import { readJsonFile } from './read-json';
import type { Policy } from './types';

const DIR = path.join(__dirname, 'spdx-corpus');
const INDEX = path.join(DIR, 'index.json');
const POLICY = path.join(__dirname, 'notices-policy.json');
const SOURCE = 'spdx-license-list/full';

/** The identifiers named by one policy value, which may be a compound expression. */
function idsIn(expression: string | undefined): string[] {
  const parsed = parseDeclared(expression);
  return parsed.ok ? parsed.ids : [];
}

/**
 * Every identifier a verdict can resolve to, and therefore every text the document may reproduce.
 *
 * The two lists are the classification tables. The three instrument tables are what admits an
 * identifier that is on NEITHER list: an `exceptions` entry records the identifier a reviewer
 * determined a package's text actually is, an `elections` entry records the operand taken from a
 * disjunction, and an `overrides` entry records terms read from a nuspec's pre-SPDX `licenseUrl`.
 * An override marked `nonSpdx` names free text (a proprietary grant) that SPDX does not publish and
 * the corpus therefore cannot hold; its text comes from `licenseTexts` instead.
 */
export function reachableIds(policy: Policy): string[] {
  const ids = new Set<string>([...policy.allowed, ...policy.copyleft]);
  (policy.exceptions || []).forEach((entry) => idsIn(entry.spdx).forEach((id) => ids.add(id)));
  Object.values(policy.elections || {}).forEach((entry) =>
    idsIn(entry.elected).forEach((id) => ids.add(id)),
  );
  Object.values(policy.overrides || {})
    .filter((entry) => !entry.nonSpdx)
    .forEach((entry) => idsIn(entry.license).forEach((id) => ids.add(id)));
  return [...ids].sort();
}

export function main(): void {
  const policy = loadPolicy(POLICY);
  const ids = reachableIds(policy);

  // The version is read from the dependency's own manifest rather than from `package.json`, which
  // records a RANGE. What the index has to record is the version these checksums were taken from.
  const { version } = readJsonFile<{ version: string }>(
    require.resolve('spdx-license-list/package.json'),
    'the spdx-license-list package manifest',
  );

  // Refused rather than skipped. A reachable identifier with no canonical text renders an empty
  // license block - an obligation that looks discharged and is not - and silently dropping it here
  // is how that reaches the document.
  const missing = ids.filter((id) => !spdxLicenseList[id]?.licenseText);
  if (missing.length)
    throw new Error(
      `the notices policy can reach a verdict on ${missing.join(', ')}, and ${SOURCE} ` +
        `${version} publishes no text for ${missing.length === 1 ? 'it' : 'them'}. Either the ` +
        'identifier is misspelled in notices-policy.json, or the dependency has to supply the ' +
        'text before the policy can admit it.',
    );

  const checksums: Record<string, string> = {};
  ids.forEach((id) => {
    checksums[id] = sha256(spdxLicenseList[id].licenseText);
  });

  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(
    INDEX,
    `${JSON.stringify({ source: SOURCE, version, checksums }, undefined, 2)}\n`,
  );
  console.log(
    `Wrote ${path.relative(path.join(__dirname, '..', '..', '..'), INDEX)}: ${ids.length} licenses from ${SOURCE} ${version}.`,
  );
}

if (require.main === module) main();
