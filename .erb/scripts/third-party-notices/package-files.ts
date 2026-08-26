/**
 * Reads what a package's own files say: the manifest's declared licence expression, the licence
 * text(s) it bundles, and any `NOTICE` shipped beside them.
 *
 * For npm, licence TEXT comes from licensee (`detect.rb`/`identify.ts`) rather than from this
 * module, because there it doubles as the second signal `policy.ts` reconciles against the
 * manifest. NuGet has no such second signal - `nuget-license` reports nuspec metadata only - so its
 * bundled text is read here purely to be REPRODUCED, never to classify.
 */

import * as fs from 'fs';
import * as path from 'path';
import { compareStrings } from './compare';
import type { NamedText } from './types';

/**
 * Matches an Apache-style `NOTICE` file.
 *
 * A NOTICE is not a licence and must not be reported as one, but Apache-2.0 section 4(d) requires
 * its attributions to travel with every redistribution - an obligation the licence text alone does
 * not discharge. Kept separate from licence files for that reason: several packages ship a NOTICE
 * and no licence file at all, and treating the NOTICE as their licence text would suppress the
 * canonical text they actually need.
 */
const NOTICE_FILE = /^NOTICE([._-].*)?$/i;

/** Matches a file whose contents are a licence grant to reproduce. */
const LICENSE_FILE = /^(LICEN[CS]E|COPYING)([._-].*)?$/i;

/**
 * Extensions a licence or notice file never has.
 *
 * A package root may hold `license.js` or `license.svg`; reproducing one of those verbatim inside a
 * legal document would be worse than reporting no text at all, and nothing about the filename says
 * it is not prose. Binary formats are excluded for a stronger reason than clutter: reading one as
 * UTF-8 yields replacement characters, and a fenced block of those corrupts the artifact.
 */
const NOT_LICENSE_TEXT =
  /\.(js|cjs|mjs|jsx|tsx?|mts|cts|map|json|svg|png|jpe?g|gif|ico|css|node|wasm|pdf|rtf|docx?|zip|gz|exe|dll|nupkg|snupkg|nuspec|sha512|p7s|pdb|targets|props|xml)$/i;

/**
 * Matches a licence file whose name does not begin with the word, which NuGet packages do and npm
 * packages essentially never do.
 *
 * `System.Net.Http` 4.3.4 ships its grant as `dotnet_library_license.txt` - 9,451 bytes opening
 * "MICROSOFT SOFTWARE LICENSE TERMS / MICROSOFT .NET LIBRARY", verbatim the licence its nuspec
 * `<licenseUrl>` points at. `LICENSE_FILE` does not match that name, so the document asserted that
 * the package bundles no licence file and reproduced nothing for it, while the text sat in the
 * restored package folder. Nineteen `Microsoft.*` packages use the same filename, and several use
 * `MIT-LICENSE.txt`.
 *
 * Applied to the STEM, so an extension can never be read as the word, and only alongside
 * `NOT_LICENSE_TEXT` - `nuget-license.nuspec` and `nuget-license.nupkg` both end in `-license`
 * before their extension and are emphatically not prose. Kept separate from `LICENSE_FILE` rather
 * than widening it, because it is only sound where a second signal already establishes what the
 * package is licensed under: NuGet resolves on nuspec metadata and reads files ONLY to reproduce
 * them, while for npm the file IS the signal `policy.ts` reconciles the manifest against, and
 * feeding a loosely-matched filename into that would weaken a verdict rather than enrich a
 * reproduction.
 */
const EMBEDDED_LICENSE_FILE = /(^|[._-])licen[cs]e($|[._-])/i;

/** Whether a file name (not a path) is one whose contents should be reproduced as licence text. */
export function isLicenseFileName(name: string): boolean {
  return LICENSE_FILE.test(name) && !NOT_LICENSE_TEXT.test(name);
}

/**
 * Whether a file name is one to reproduce as licence text for a NUGET package, which is a looser
 * question than for npm - see `EMBEDDED_LICENSE_FILE` for why the two differ.
 */
export function isNugetLicenseFileName(name: string): boolean {
  if (NOT_LICENSE_TEXT.test(name)) return false;
  return LICENSE_FILE.test(name) || EMBEDDED_LICENSE_FILE.test(name.replace(/\.[^.]*$/, ''));
}

/** Whether a file name (not a path) is an attribution notice to reproduce alongside the licence. */
export function isNoticeFileName(name: string): boolean {
  return NOTICE_FILE.test(name) && !NOT_LICENSE_TEXT.test(name);
}

/**
 * Normalizes reproduced text: LF line endings, no leading or trailing blank lines.
 *
 * Shared with `render.ts`, which normalizes the same texts again on the way into the document. The
 * two spelled it out separately, and they must not drift: the committed artifact is BYTE-COMPARED
 * against freshly generated output, so a difference between the normalisation applied when a text
 * is read and the one applied when it is written shows up as a permanent spurious diff with nothing
 * naming the cause.
 */
export function normalizeText(text: unknown): string {
  return String(text ?? '')
    .replace(/\r\n?/g, '\n')
    .trim();
}

/**
 * Reads a text file, or `undefined` when it cannot be read.
 *
 * Line endings are normalized to LF: some upstream files are CRLF, and git normalizes them on
 * commit. Without this the committed artifact would never match freshly generated output, so it
 * would show a spurious diff on every run.
 */
export function readTextFile(file: string): string | undefined {
  try {
    return normalizeText(fs.readFileSync(file, 'utf8'));
  } catch {
    return undefined;
  }
}

/**
 * Every file in `dir` whose name `matches`, as `{ name, text }`, in filename order so the committed
 * artifact stays byte-stable across runs and platforms.
 *
 * A symlink answers `false` to `isFile()`, and a package's top-level metadata file is a symlink
 * often enough (pnpm-style stores, workspace links) that filtering on `isFile()` alone silently
 * loses it.
 */
function readPackageFiles(
  dir: string | undefined,
  matches: (name: string) => boolean,
): NamedText[] {
  if (!dir) return [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return (
    entries
      .filter((entry) => entry.isFile() || entry.isSymbolicLink())
      .map((entry) => entry.name)
      .filter(matches)
      .sort(compareStrings)
      // `flatMap` rather than `.map().filter(...)`: `readTextFile` returns `string | undefined`
      // for a file it could not read, and filtering on truthiness does not narrow the element type.
      .flatMap((name) => {
        const text = readTextFile(path.join(dir, name));
        return text ? [{ name, text }] : [];
      })
  );
}

/** Every licence file a NuGet package ships, including one whose name does not begin with the word. */
export function readNugetLicenseFiles(dir: string | undefined): NamedText[] {
  return readPackageFiles(dir, isNugetLicenseFileName);
}

/** Every `NOTICE` a package ships. */
export function readPackageNotices(dir: string | undefined): NamedText[] {
  return readPackageFiles(dir, isNoticeFileName);
}

/**
 * The licence expression an npm manifest declares, normalizing the two legacy forms npm used before
 * SPDX strings.
 *
 * Returns `undefined` rather than a placeholder when the manifest declares nothing: `parseDeclared`
 * already reports that as "no license declared", and inventing a string here would make an absent
 * declaration indistinguishable from a package that literally declares the word UNKNOWN.
 */
export function declaredLicenseField(manifest: {
  license?: unknown;
  licenses?: unknown;
}): string | undefined {
  if (typeof manifest.license === 'string') return manifest.license;
  // `'type' in ...` before reading it: narrowing `unknown` with `typeof === 'object'` yields
  // `object`, which has no properties at all, and this repo bans the type assertion that would
  // otherwise be reached for here.
  if (
    manifest.license &&
    typeof manifest.license === 'object' &&
    'type' in manifest.license &&
    typeof manifest.license.type === 'string'
  )
    return manifest.license.type;
  // The legacy array form listed several licences to mean a choice between them, which is exactly
  // what an SPDX `OR` expression says.
  if (Array.isArray(manifest.licenses)) {
    const joined = manifest.licenses
      .map((entry) => (typeof entry === 'string' ? entry : entry?.type))
      .filter((entry) => typeof entry === 'string' && entry.length > 0)
      .join(' OR ');
    return joined || undefined;
  }
  return undefined;
}
