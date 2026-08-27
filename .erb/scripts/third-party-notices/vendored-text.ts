import * as fs from 'fs';
import * as path from 'path';
import { sha256 } from './lock';
import type { NamedText, Policy, SnapStagePackage } from './types';

const DIR = path.join(__dirname, 'vendored-texts');

/**
 * One hash-pinned text this repository carries on another party's behalf, read and checked.
 *
 * Both kinds of vendored text - a package's own license and a staged library's Debian `copyright`
 * file - are the same obligation: a legal text a human read from a named source, checked in, and
 * reproduced verbatim. So both fail the same two ways, and the wording of each failure is the only
 * thing that differs between them.
 *
 * @param file Name of the file as the policy records it, relative to `dir`. Named in every message,
 *   because it is what a reader has to go find.
 * @param pinnedAs What the policy pins and on whose behalf, completing "..., but that file is not
 *   in `<dir>`".
 * @param onlyCopyOf What this repository holds no second copy of, completing "..., so the document
 *   cannot be written without it".
 * @param recordedFor Which entry the hash is recorded against, completing "the notices policy
 *   records for ...".
 * @param reproducedAs What the text is reproduced as, completing "It is reproduced verbatim as
 *   ...".
 * @param source Where a human read the terms, printed as the remedy for a hash that no longer
 *   matches.
 * @param name `NamedText.name` for the returned text.
 */
function pinnedText({
  dir,
  file,
  pinnedAs,
  onlyCopyOf,
  recordedFor,
  reproducedAs,
  source,
  recordedSha256,
  name,
}: {
  dir: string;
  file: string;
  pinnedAs: string;
  onlyCopyOf: string;
  recordedFor: string;
  reproducedAs: string;
  source: string;
  recordedSha256: string;
  name: string;
}): NamedText {
  let text;
  try {
    text = fs.readFileSync(path.join(dir, file), 'utf8');
  } catch {
    throw new Error(
      `${pinnedAs}, but that file is not in ${path.relative(process.cwd(), dir)}. ` +
        `${onlyCopyOf}, so the document cannot be written without it.`,
    );
  }

  const actual = sha256(text);
  if (actual !== recordedSha256)
    throw new Error(
      `${file} no longer hashes to what the notices policy records for ${recordedFor} ` +
        `(recorded ${recordedSha256}, found ${actual}). It is reproduced verbatim as ` +
        `${reproducedAs}, so an edited copy is a changed legal claim - re-read ${source} and ` +
        'update the entry, or restore the file.',
    );

  return { name, text };
}

/**
 * The license text this repository holds on behalf of a package that ships none of its own.
 *
 * A package whose nuspec carries only a pre-SPDX `<licenseUrl>` publishes its terms at a URL and
 * bundles nothing, so there is no text to reproduce and the document can only fall back to the
 * canonical SPDX text of whatever identifier a human recorded. That is right for a package whose
 * grant IS the unmodified standard text, and wrong for one whose own license file carries more:
 * `Icu4c.Win.Min` ships `icudt59.dll`, and ICU's LICENSE lists five third-party notices - the
 * pre-58 IBM ICU grant, three word-break dictionaries, and the time zone database - for data that
 * is inside that DLL. SPDX's `Unicode-DFS-2016` text is the first section of that file and none of
 * the rest, so reproducing it alone discharges the primary grant and silently drops the others.
 *
 * CLASSIFICATION is still the recorded SPDX identifier and is unaffected by this: the override
 * decides which terms the package is under and is checked against the policy's lists, while this
 * decides what text is reproduced on its behalf. `nugetVerdict` keeps the two apart deliberately,
 * for the same reason a package that DOES bundle a license file has its own copy reproduced rather
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
      `the notices policy holds a license text for "${key}" read from version ${entry.version}, ` +
        `and this is ${version}. A license text is reproduced verbatim on the package's behalf, ` +
        'so it does not carry across a version change - re-read the terms at ' +
        `${entry.source} for this version and update the entry.`,
    );

  return pinnedText({
    dir: DIR,
    file: entry.file,
    pinnedAs: `the notices policy holds a license text for "${key}" in ${entry.file}`,
    onlyCopyOf: 'It is the only copy of the terms this package publishes',
    recordedFor: `"${key}"`,
    reproducedAs: "this package's license",
    source: entry.source,
    recordedSha256: entry.sha256,
    name: entry.file,
  });
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
 * Debian `copyright` file names per-file licenses and copyright holders that no single SPDX
 * identifier reproduces. `libgtk-3-0`'s runs to 651 lines across LGPL-2+, LGPL-2.1+, Expat, SWL,
 * ZPL-2.1 and X11R5 stanzas.
 *
 * The terms are release-specific - the snap stages `core22`, so these were read from Ubuntu 22.04 -
 * which is why `source` records the release and not only the path.
 */
export function snapCopyrightText(pkg: string, entry: SnapStagePackage): NamedText {
  const { copyright } = entry;
  return pinnedText({
    dir: path.join(DIR, 'snap'),
    file: copyright.file,
    pinnedAs:
      `the notices policy pins ${copyright.file} as the copyright notice for the staged library ` +
      `"${pkg}"`,
    onlyCopyOf: "It is the only copy of that library's notice this repository carries",
    recordedFor: `the staged library "${pkg}"`,
    reproducedAs: "that library's notice",
    source: copyright.source,
    recordedSha256: copyright.sha256,
    name: `${pkg} \u2014 ${copyright.source}`,
  });
}
