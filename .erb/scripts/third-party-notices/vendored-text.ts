import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import type { NamedText, Policy, SnapStagePackage } from './types';

const DIR = path.join(__dirname, 'vendored-texts');

/**
 * The licence text this repository holds on behalf of a package that ships none of its own.
 *
 * A package whose nuspec carries only a pre-SPDX `<licenseUrl>` publishes its terms at a URL and
 * bundles nothing, so there is no text to reproduce and the document can only fall back to the
 * canonical SPDX text of whatever identifier a human recorded. That is right for a package whose
 * grant IS the unmodified standard text, and wrong for one whose own licence file carries more:
 * `Icu4c.Win.Min` ships `icudt59.dll`, and ICU's LICENSE lists five third-party notices - the
 * pre-58 IBM ICU grant, three word-break dictionaries, and the time zone database - for data that
 * is inside that DLL. SPDX's `Unicode-DFS-2016` text is the first section of that file and none of
 * the rest, so reproducing it alone discharges the primary grant and silently drops the others.
 *
 * CLASSIFICATION is still the recorded SPDX identifier and is unaffected by this: the override
 * decides which terms the package is under and is checked against the policy's lists, while this
 * decides what text is reproduced on its behalf. `nugetVerdict` keeps the two apart deliberately,
 * for the same reason a package that DOES bundle a licence file has its own copy reproduced rather
 * than the canonical one - a bundled file carries notices the canonical text cannot.
 *
 * Hash-pinned like a reviewed exception, and for the same reason: this is a legal text a human read
 * and checked in from a named source, so a copy that no longer hashes to what was reviewed is not
 * the text that was reviewed. Vendored rather than fetched, because a notices run opens no
 * sockets.
 */
export function vendoredLicenseText(
  policy: Policy,
  key: string,
  version: string,
): NamedText | undefined {
  const entry = (policy.licenseTexts || {})[key];
  if (!entry) return undefined;
  if (entry.version !== version)
    throw new Error(
      `the notices policy holds a licence text for "${key}" read from version ${entry.version}, ` +
        `and this is ${version}. A licence text is reproduced verbatim on the package's behalf, ` +
        'so it does not carry across a version change - re-read the terms at ' +
        `${entry.source} for this version and update the entry.`,
    );

  const file = path.join(DIR, entry.file);
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    throw new Error(
      `the notices policy holds a licence text for "${key}" in ${entry.file}, but that file is ` +
        `not in ${path.relative(process.cwd(), DIR)}. It is the only copy of the terms this ` +
        'package publishes, so the document cannot be written without it.',
    );
  }

  const sha256 = crypto.createHash('sha256').update(text).digest('hex');
  if (sha256 !== entry.sha256)
    throw new Error(
      `${entry.file} no longer hashes to what the notices policy records for "${key}" ` +
        `(recorded ${entry.sha256}, found ${sha256}). It is reproduced verbatim as this package's ` +
        `licence, so an edited copy is a changed legal claim - re-read ${entry.source} and update ` +
        'the entry, or restore the file.',
    );

  return { name: entry.file, text };
}

/**
 * The Ubuntu `copyright` file of one library staged inside the Linux snap.
 *
 * The snap redistributes these libraries, so their notices have to travel with it - and nothing in
 * the artifact carries one. electron-builder's snapcraft template excludes `usr/share` from the
 * `app` part's stage list, which is exactly where `usr/share/doc/<package>/copyright` lives, and
 * that list is only overridable wholesale. So the texts are checked in here and reproduced into
 * THIRD-PARTY-NOTICES.md, which `electron-builder.json5` packs into the snap as an `extraResources`
 * entry: the obligation is that the notice travels, not that it sits at a particular path.
 *
 * Verbatim and hash-pinned rather than summarised, for the reason `vendoredLicenseText` gives: a
 * Debian `copyright` file names per-file licences and copyright holders that no single SPDX
 * identifier reproduces. `libgtk-3-0`'s runs to 651 lines across LGPL-2+, LGPL-2.1+, Expat, SWL,
 * ZPL-2.1 and X11R5 stanzas.
 *
 * The terms are release-specific - the snap stages `core22`, so these were read from Ubuntu 22.04 -
 * which is why `source` records the release and not only the path.
 */
export function snapCopyrightText(pkg: string, entry: SnapStagePackage): NamedText {
  const { copyright } = entry;
  const file = path.join(DIR, 'snap', copyright.file);
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    throw new Error(
      `the notices policy pins ${copyright.file} as the copyright notice for the staged library ` +
        `"${pkg}", but that file is not in ${path.relative(process.cwd(), path.join(DIR, 'snap'))}. ` +
        "It is the only copy of that library's notice this repository carries, so the document " +
        'cannot be written without it.',
    );
  }

  const sha256 = crypto.createHash('sha256').update(text).digest('hex');
  if (sha256 !== copyright.sha256)
    throw new Error(
      `${copyright.file} no longer hashes to what the notices policy records for the staged ` +
        `library "${pkg}" (recorded ${copyright.sha256}, found ${sha256}). It is reproduced ` +
        `verbatim as that library's notice, so an edited copy is a changed legal claim - re-read ` +
        `${copyright.source} and update the entry, or restore the file.`,
    );

  return { name: `${pkg} \u2014 ${copyright.source}`, text };
}
