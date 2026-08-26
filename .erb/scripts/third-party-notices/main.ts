/**
 * Generates `THIRD-PARTY-NOTICES.md` and its lock sidecar from what the packaged application
 * actually ships.
 *
 * Attribution obligations (MIT/BSD/ISC/Apache) attach to the DISTRIBUTED BINARY, so this describes
 * the binary, not the repository. Three sources feed it, plus one hand-written section:
 *
 * - **npm** - webpack's own module manifests (`.notices/modules/*.json`), the stylesheet leaf scan,
 *   and `release/app`'s unbundled closure. See `shipping-set.ts` for why each is needed and why
 *   `npm ls --omit=dev` is not one of them.
 * - **NuGet** - the union of the restore closure for every published runtime identifier, narrowed to
 *   the packages that contribute a file to the publish output. See `nuget-set.ts`.
 * - **Electron**, which ships its own notices inside the packaged app and so is described in prose.
 *
 * Every package resolves to exactly one verdict (`policy.ts`). The document is written only when
 * every one of them cleared: a notices file is a legal claim, so it is never produced from an
 * incomplete set.
 *
 *     npm run build:third-party-notices                  # regenerate (Linux)
 *     npm run verify:third-party-notices                 # full check: licence + NuGet + npm (Linux)
 *     npm run verify:third-party-notices:shipping-set     # cheap check: npm shipping set only (Windows/macOS)
 *
 * `--verify` and `--verify-shipping-set` answer different questions and cost different amounts.
 * `--verify` re-derives every verdict (`buildReport`) and diffs the WHOLE lock - it needs Ruby
 * (`identify`) and four `dotnet restore` passes (`nuget-set.ts`), so it only runs where those are
 * installed. `--verify-shipping-set` (`verifyNpmShippingSet` below) skips both: licence
 * identification is platform-invariant - the same files, matched by the same pinned licensee
 * version, identify the same way everywhere - and the NuGet closure is already made
 * platform-complete FROM Linux by the four-RID union. The one thing that genuinely varies per
 * platform is the npm closure (an optional dependency installs only where its `os`/`cpu`
 * constraints match), so that is the one thing it checks: this platform's resolved npm packages, by
 * `name@version`, against the npm half of the committed lock. No Ruby, no dotnet, no network.
 *
 * The developer-facing procedure - Ruby setup, the cold-cache requirement, what to do when a real
 * removal shrinks the set - is in the README under "Third-party notices".
 */

import * as fs from 'fs';
import * as path from 'path';
import JSON5 from 'json5';

import { identify } from './identify';
import { copyrightNoticeIn } from './credit';
import { snapCopyrightText, vendoredLicenseText } from './vendored-text';
import { classify, loadPolicy } from './policy';
import {
  ACCEPT_SHRINK_ENV,
  REQUIRED_BUNDLES,
  acceptShrinkFromEnv,
  assertNpmFloor,
  assertNpmNotShrunk,
  collectPlatformOnlyPackages,
  collectShippedPackages,
  missingDirectDependencies,
  readDirectDependencies,
} from './shipping-set';
import {
  collectNugetPackages,
  missingDirectReferences,
  readDirectPackageReferences,
  DOTNET_PROJECT,
} from './nuget-set';
import { corpusVersion, verifyCorpus } from './corpus';
import { assertStaticAssetNoticesRecorded, staticAssetNoticeTexts } from './static-assets';
import { buildLock, writeLock, readLock, diffLock, diffDocument, diffShippingSet } from './lock';
import { describeBlock, openPolicyQuestions, stalePolicyEntries } from './report';
import { render, joinTexts } from './render';
import { declaredLicenseField, readPackageNotices, readTextFile } from './package-files';
import { messageOf, readJsonFile } from './read-json';
import type {
  Detection,
  Lock,
  MergedNugetPackage,
  Policy,
  ReportRow,
  ShippedPackage,
  SnapStagePackage,
} from './types';

const REPO = path.resolve(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'THIRD-PARTY-NOTICES.md');
const LOCK = path.join(REPO, 'THIRD-PARTY-NOTICES.lock.json');
const POLICY = path.join(__dirname, 'notices-policy.json');
const ELECTRON_BUILDER = path.join(REPO, 'electron-builder.json5');
const MANIFESTS = path.join(REPO, '.notices', 'modules');
const DEV_PACKAGES = path.join(REPO, 'dev-packages.json');

/**
 * The npm half of the committed lock, as a count, or `undefined` when there is no committed lock.
 *
 * Read for `assertNpmNotShrunk`, which needs a number that moves with the application rather than a
 * frozen literal. A lock that is absent is a repository that has never generated one; a lock that
 * is present but unreadable is a broken checkout, and that distinction is worth keeping, so only
 * ENOENT is treated as "nothing to compare against".
 */
function committedNpmCount(): number | undefined {
  try {
    return readLock(LOCK).packages.filter((entry) => entry.ecosystem === 'npm').length;
  } catch (err) {
    // A missing lock is the one condition this tolerates - there is simply nothing to compare
    // against yet. `code` is not on `Error`, and `unknown` is what a catch actually gives, so the
    // shape is checked rather than assumed.
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT') return undefined;
    throw err;
  }
}

/**
 * The note to print beside a drift report when this tree has no `yalc` dev links but the repository
 * declares some.
 *
 * `postinstall` links the packages `dev-packages.json` names, so the committed artifact is
 * generated from a LINKED tree - CI included. An unlinked tree resolves a different copy of any
 * package a link nests (see `correctLinkDistortedResolutions`), so its shipping set legitimately
 * differs, and the remedy every drift message prints - regenerate - would commit a set CI then
 * reports in reverse. Nothing here can tell those two causes apart, so this names the one a reader
 * would not think of rather than guessing which applies.
 *
 * @returns Lines to print, or none when the tree is linked or the repository declares no links.
 */
function unlinkedTreeNote(npmPackages: { devLinked?: boolean }[]): string[] {
  let declared = 0;
  try {
    // Narrowed to ENOENT, and read through `readJsonFile` like everything else here. A bare catch
    // swallowed a truncated or half-written `dev-packages.json` as "this repository declares no
    // links" - and the note exists precisely because REGENERATE, which is what every drift message
    // prints, is the wrong remedy for an unlinked tree. Losing it silently leaves the reader with
    // advice that commits the wrong set. `committedNpmCount` above already draws the line here.
    const parsed = readJsonFile<{ repos?: { devPackages?: unknown[] }[] }>(
      DEV_PACKAGES,
      'the dev-packages manifest',
    );
    declared = (parsed.repos || []).reduce(
      (total, repo) => total + (repo.devPackages || []).length,
      0,
    );
  } catch (err: unknown) {
    if (err instanceof Error && 'code' in err && err.code === 'ENOENT') return [];
    throw err;
  }
  if (!declared || npmPackages.some((pkg) => pkg.devLinked)) return [];
  return [
    '',
    `Note: nothing in this set resolves through a yalc dev link, but dev-packages.json declares ${declared}.`,
    'The committed artifact is generated from a linked tree (postinstall links them, on CI too), and',
    'an unlinked tree resolves a different copy of any package a link nests - so some of the drift',
    'above may be the missing links rather than a dependency change. Run npm ci (or npm run',
    'link-dev-packages) and check again before regenerating: regenerating from an unlinked tree',
    'commits a set CI reports in reverse.',
  ];
}

/**
 * How few staged libraries would mean the packaging config was not read as intended.
 *
 * A frozen floor, like `NPM_MIN_PACKAGES`: `config.snap?.stagePackages ?? []` answers `[]` for a
 * renamed key, a restructured `snap` block or a config this could not parse as expected, and an
 * empty list reads downstream as "the snap stages nothing" - a true-sounding claim that would be
 * written into the document with the build green. Every other collector in this pipeline has a
 * floor for exactly that reason.
 */
const SNAP_MIN_STAGE_PACKAGES = 8;

/**
 * The Ubuntu packages snapcraft stages inside the Linux `.snap`, read from the packaging config so
 * the notices cannot describe a different set than the one that ships. They are neither npm nor
 * NuGet packages, so nothing else in this pipeline can see them, but they ARE redistributed inside
 * the artifact - see the "Linux snap" section `render` writes from this list.
 */
function snapStagePackages(): string[] {
  const config: { snap?: { stagePackages?: string[] } } = JSON5.parse(
    fs.readFileSync(ELECTRON_BUILDER, 'utf8'),
  );
  const staged = config.snap?.stagePackages ?? [];
  if (staged.length < SNAP_MIN_STAGE_PACKAGES)
    throw new Error(
      `${path.relative(REPO, ELECTRON_BUILDER)} declares ${staged.length} snap stagePackages; ` +
        `expected at least ${SNAP_MIN_STAGE_PACKAGES}. Either the Linux artifact genuinely stages ` +
        'almost nothing - in which case lower this floor deliberately - or the key was renamed and ' +
        'this read nothing, which would put "the snap stages these" into the document about a list ' +
        'nobody supplied.',
    );
  return staged;
}

/** The classifications a `snapStagePackages` entry may record. */
const SNAP_CLASSIFICATIONS = new Set(['copyleft', 'permissive', 'not-established']);

/**
 * Refuses a staged Ubuntu library the policy does not classify, and an entry for one no longer
 * staged.
 *
 * The "Linux snap" section is GENERATED from this table, and a name in one and not the other stops
 * the build. That connection is the point: a hand-written sentence about which staged libraries are
 * copyleft can name some of them and omit others - GTK and libsecret are staged and redistributed
 * inside the artifact - and nothing about the prose would reveal which.
 *
 * `not-established` is a classification, not a gap in the table - it says a human looked and did
 * not settle the terms, which is what the document then reports. The unclassified case this refuses
 * is the one where nobody looked at all.
 */
export function assertSnapStagePackagesClassified(
  staged: string[],
  table: Record<string, SnapStagePackage | undefined>,
): void {
  const unpinned = staged.filter((pkg) => !table[pkg]?.copyright);
  if (unpinned.length)
    throw new Error(
      `electron-builder.json5 stages ${unpinned.join(', ')} inside the Linux .snap, but the ` +
        'notices policy pins no copyright file for them. The snap redistributes each staged ' +
        'library and carries no notice of its own, so this document is where that notice travels.' +
        '\nFor each: copy usr/share/doc/<package>/copyright from an Ubuntu 22.04 (core22) tree ' +
        'into .erb/scripts/third-party-notices/vendored-texts/snap/<package>-copyright.txt and ' +
        'record its "copyright" { file, sha256, source } in "snapStagePackages".',
    );

  const unclassified = staged.filter(
    // `?.` yields `undefined` for a name the table does not hold, which is precisely the
    // unclassified case - the Set membership test just has to accept being asked about it.
    (pkg) => {
      const classification = table[pkg]?.classification;
      return !classification || !SNAP_CLASSIFICATIONS.has(classification);
    },
  );
  if (unclassified.length)
    throw new Error(
      `electron-builder.json5 stages ${unclassified.join(', ')} inside the Linux .snap, but the ` +
        'notices policy does not classify them. Every staged library is redistributed inside the ' +
        'artifact, so the document has to say what its terms are.\n' +
        `Add each to "snapStagePackages" in the policy with a "classification" of ${[
          ...SNAP_CLASSIFICATIONS,
        ].join(', ')} - read it from the package's own usr/share/doc/<package>/copyright.`,
    );

  const stale = Object.keys(table).filter((pkg) => !staged.includes(pkg));
  if (stale.length)
    throw new Error(
      `the notices policy classifies ${stale.join(', ')} under "snapStagePackages", but ` +
        'electron-builder.json5 no longer stages them. A determination about a library that is ' +
        'not shipped would be reproduced in the document as though it were.',
    );
}

/**
 * The licensee version detection ran against, recorded in the lock so a verdict that moved because
 * the matcher was upgraded stays distinguishable from one that moved because a licence changed.
 *
 * Read from `Gemfile.lock` rather than by asking Ruby. This is not an inference: `detect.rb` runs
 * under `bundle exec`, and bundler resolves `require "licensee"` against this very lockfile or
 * refuses to run at all - so the pinned version IS the one that did the detecting. Asking Ruby
 * meant a second `bundle exec` boot (bundler's own startup, not just the interpreter's) on every
 * generation, to learn something the lockfile already states exactly.
 *
 * Fails loudly rather than recording nothing: the version is the field that makes a moved verdict
 * attributable, and a lock that records no matcher version cannot answer the question it exists
 * for.
 */
function licenseeVersion(): string {
  const gemfileLock = readTextFile(path.join(REPO, 'Gemfile.lock'));
  const pinned = gemfileLock && /^\s*licensee \((\d+\.\d+\.\d+[^)]*)\)\s*$/m.exec(gemfileLock);
  if (!pinned)
    throw new Error(
      'Gemfile.lock records no pinned licensee version, so the notices lock cannot record which ' +
        'matcher produced its verdicts.\nRun: bundle install',
    );
  return pinned[1];
}

/**
 * Composes one npm package's verdict.
 *
 * A package marked `fromLock` (see `shipping-set.ts`) is the one case where nothing here reads the
 * package directory: its version and declaration come from `package-lock.json`, and no text,
 * `NOTICE` or copyright is read from it. Two things carry that mark - a `yalc` dev link, which
 * points at a moving branch of another repository rather than at the release this repository pins,
 * and a package a link DISPLACED, whose directory holds a different copy than the one the lockfile
 * resolves. Either way the directory is not evidence about what ships, so it lands on `classify`'s
 * no-licence-file path and has the canonical text of its declared identifier reproduced on its
 * behalf, paired with whatever copyright notice `notices-policy.json` records for it. `inspected:
 * false` says the folder was never read, which is not the same as having read it and found no
 * notice.
 *
 * `text`, `matchedFile` and `textSha256` are kept COHERENT on purpose. `classify` decides which
 * detected file the verdict rests on, and that is the file whose confidence is reported and whose
 * hash the lock pins - so the reproduced text is selected the same way rather than being taken from
 * whichever file happened to sort first. Every detected licence file is still reproduced (see
 * `joinTexts`): a dual-licensed package ships one file per branch, and reproducing only the elected
 * one satisfies neither licence.
 */
function npmVerdict(pkg: ShippedPackage, detection: Detection, policy: Policy): ReportRow {
  const declaredField = pkg.fromLock
    ? pkg.declaredField
    : declaredLicenseField(
        readJsonFile<{ license?: unknown; licenses?: unknown }>(
          path.join(pkg.dir, 'package.json'),
          "an installed package's manifest",
        ),
      );
  const files = detection.files || [];
  const verdict = classify({
    name: pkg.name,
    version: pkg.version,
    ecosystem: 'npm',
    declaredField,
    detection,
    policy,
  });
  // Only the file the verdict actually rests on. `|| files[0]` reported an ARBITRARY file's
  // confidence whenever `matchedFile` was undefined - which is every blocked and every
  // text-less verdict - and `buildLock` pins that number beside a `matchedFile` of `undefined`.
  // `diffLock` then printed "the license file the verdict rests on changed from undefined (87%) to
  // undefined (91%)": a drift report about a file it cannot name, from two numbers that describe no
  // decision.
  const matched = verdict.matchedFile
    ? files.find((file) => file.filename === verdict.matchedFile)
    : undefined;
  return {
    ...pkg,
    ...verdict,
    confidence: matched ? matched.confidence : 0,
    text: joinTexts(files.map((file) => ({ name: file.filename, text: file.text }))),
    notices: pkg.fromLock ? [] : readPackageNotices(pkg.dir),
    inspected: !pkg.fromLock,
    // Carried for the RENDERER, not for the verdict: a package can be cleared by an exception and
    // still have a recorded election, and the table has to show both - see `displayLicense`.
    election: (policy.elections || {})[`npm:${pkg.name}`],
    // An npm manifest has no copyright field, so the notice has to come from the licence text.
    // The curated entry wins where there is one: it is a human's reading, and most of those entries
    // were read from the REPOSITORY licence of a package that publishes none in its tarball, which
    // nothing here can see. Reading the text this run already has covers the case the table was
    // never for - the package did ship its licence file, and the document was crediting it with "no
    // copyright notice" a few sections above reproducing the file that states one.
    copyright:
      (policy.copyrightNotices || {})[`npm:${pkg.name}`] ||
      copyrightNoticeIn(files.map((file) => file.text)),
  };
}

/**
 * Composes one NuGet package's verdict.
 *
 * `nuget-license` reports nuspec metadata, not licence files, so `detection` is always empty here
 * and every NuGet package resolves on its declared expression - which is not a special case in
 * `policy.ts`, just the no-licence-file path that any ecosystem can take.
 *
 * REPRODUCTION is a separate question from classification, and the two must not be conflated. Where
 * the package folder holds the package's own licence file(s), that text is what gets reproduced
 * (`nuget-set.ts`'s `attachLicenseFiles`); the canonical SPDX text is the fallback for a package
 * that bundles none. Substituting canonical text for a bundled one loses the copyright notice the
 * bundled file carries, which is the notice MIT/BSD/ISC actually oblige to travel with copies.
 *
 * A package that bundles nothing AND publishes its terms at a URL gets a third option before the
 * canonical fallback: a copy of that text checked into this repository, hash-pinned and pinned to
 * the version it was read from (`vendoredLicenseText`). The canonical text is only the right
 * substitute where a package's grant IS the unmodified standard text, and `Icu4c.Win.Min`'s is not
 *
 * - ICU's LICENSE carries five third-party notices for data inside the DLL this package ships.
 */
function nugetVerdict(pkg: MergedNugetPackage, policy: Policy): ReportRow {
  const override = (policy.overrides || {})[`nuget:${pkg.name}`] || {};
  const ships = pkg.assemblies?.length ? `Ships ${pkg.assemblies.join(', ')}.` : '';
  return {
    ...pkg,
    // A nuspec DOES have a copyright field, so unlike the npm side this is a real second source
    // rather than the only one - but a package that leaves it empty and ships a licence file
    // stating the notice plainly was still credited with "its nuspec declares no copyright notice"
    // beside the reproduced text. The nuspec wins; the file answers for it when it says nothing.
    copyright:
      pkg.copyright || copyrightNoticeIn((pkg.licenseFiles ?? []).map((file) => file.text)),
    ...classify({
      name: pkg.name,
      version: pkg.version,
      ecosystem: 'nuget',
      declaredField: pkg.declaredField,
      detection: { dir: '', files: [] },
      policy,
      validationErrors: pkg.validationErrors,
    }),
    confidence: 0,
    election: (policy.elections || {})[`nuget:${pkg.name}`],
    // A vendored text stands in ONLY where the package bundles none of its own: a real bundled file
    // is the package's own copy of its terms and always wins.
    text: joinTexts(
      pkg.licenseFiles?.length
        ? pkg.licenseFiles
        : [vendoredLicenseText(policy, `nuget:${pkg.name}`, pkg.version)].filter(
            (entry) => entry !== undefined,
          ),
    ),
    // Read by `nuget-set.ts` from the restored package folder, the same place its licence files
    // come from. Without this `render.ts`'s NOTICE section could never fire for a NuGet package.
    notices: pkg.notices,
    // A curated note replaces the nuspec copyright in the Notes column because it is the more
    // specific statement about that package; the copyright itself is kept in its own field, which
    // is what pairs with a canonical licence text.
    note: [ships, override.note || pkg.copyright].filter(Boolean).join(' '),
  };
}

/**
 * The `alwaysList` overrides that no restore on this machine can produce, as synthetic packages.
 *
 * `Microsoft.ICU.ICU4C.Runtime` is referenced under `Condition="$([MSBuild]::IsOsPlatform(
 * 'Windows'))"`, which MSBuild evaluates against the HOST OS rather than the target runtime
 * identifier - so `dotnet restore -r win-x64` on Linux still does not pull it in, and the four-RID
 * union does not surface it. This is the only thing that puts a genuinely shipped Windows
 * dependency into the document.
 *
 * `inspected: false` because nothing of this package was read from disk, which is not the same as
 * having read it and found no copyright notice.
 */
export function alwaysListedPackages(
  policy: Policy,
  collected: MergedNugetPackage[],
  directReferences: { id: string; version: string | undefined }[],
): MergedNugetPackage[] {
  const present = new Set(collected.map((pkg) => pkg.name.toLowerCase()));
  return Object.entries(policy.overrides || {})
    .filter(([key, override]) => override.alwaysList && key.startsWith('nuget:'))
    .map(([key]) => key.slice('nuget:'.length))
    .filter((name) => !present.has(name.toLowerCase()))
    .map((name) => ({
      ecosystem: 'nuget',
      name,
      // An MSBuild property reference is not a version, and `readDirectPackageReferences` already
      // reports one as undefined rather than putting a literal `$(…)` in a legal artifact.
      //
      // Matched case-INSENSITIVELY, like every other id comparison in this pipeline
      // (`missingDirectReferences`, `parseShippingSet`, `resolvePackageDir`, `mergeRidResults` and
      // the `present` set two lines above all lower-case first). NuGet ids are case-insensitive, so
      // a policy key spelled `nuget:Microsoft.Icu.Icu4c.Runtime` against a csproj spelling of
      // `Microsoft.ICU.ICU4C.Runtime` is two legal spellings of one package - and the falsy `||`
      // below would then have written an em dash into the document and the lock as the VERSION of a
      // shipped Windows dependency, with the build green.
      version:
        directReferences.find((reference) => reference.id.toLowerCase() === name.toLowerCase())
          ?.version || '—',
      declaredField: undefined,
      copyright: undefined,
      validationErrors: [],
      assemblies: [],
      rids: [],
      // No restore on this machine resolves it, so there is no package folder to read a licence
      // file from - the canonical text of the recorded determination is all there can be.
      licenseFiles: [],
      inspected: false,
    }));
}

/**
 * The npm shipping set plus the packages only another platform installs.
 *
 * Unioned by NAME, not by directory: on the platform that does install one, the module graph
 * already reports it - from a real directory, with its own licence text read - and the policy entry
 * must not add a second row for the same package. Everywhere else the lockfile is the only source
 * there is. Both callers union the same way, or the per-platform check would compare a set that
 * includes these against a lock that does not.
 */
export function withPlatformOnlyPackages(
  packages: ShippedPackage[],
  policy: Policy,
): ShippedPackage[] {
  const present = new Set(packages.map((pkg) => pkg.name.toLowerCase()));
  const extra = collectPlatformOnlyPackages(REPO, policy.platformOnlyPackages || []).filter(
    (pkg) => !present.has(pkg.name.toLowerCase()),
  );
  return [...packages, ...extra];
}

export function buildReport() {
  const corruptTexts = verifyCorpus();
  if (corruptTexts.length)
    throw new Error(`vendored SPDX corpus is corrupt for: ${corruptTexts.join(', ')}`);

  const policy = loadPolicy(POLICY);
  // Returns `{ packages, unresolvedStylesheetSpecifiers }`, not a bare array. The second field is
  // load-bearing: a stylesheet specifier that resolves to no installed package is SKIPPED rather
  // than thrown (there are real false positives - a specifier inside a code comment, and Sass
  // load-path `@use` idioms), so it must be surfaced or a genuinely missing CSS-only package would
  // vanish without trace: nothing else looks for a CSS-only package.
  const { packages, unresolvedStylesheetSpecifiers } = collectShippedPackages({
    manifestDir: MANIFESTS,
    repo: REPO,
    // Named here because this is the call that describes the real application: a manifest that is
    // simply absent makes the union quietly smaller, and nothing else would notice.
    requiredBundles: REQUIRED_BUNDLES,
    // Likewise: the real application always has a `release/app/package.json` - electron-builder
    // packs from it - so an absent one is a broken checkout, not an empty closure.
    requireUnbundledClosure: true,
  });
  // Likewise the floors: this is the call that knows the set describes Platform.Bible rather than a
  // three-package fixture. `assertNpmFloor` is the absolute backstop; `assertNpmNotShrunk` is the
  // sensitive one, measured against the npm half of the committed lock.
  // `!!process.env[...]` was true for `0`, `false`, `off` and `no` alike, so the one documented way
  // to turn this gate OFF also turned it off when spelled as an attempt to turn it ON - and
  // `assertNpmNotShrunk`'s own docstring calls the escape "impossible to do by accident". Below the
  // floors that remain, only `NPM_MIN_PACKAGES` (a frozen 120, against a closure of 218) would then
  // stand between a short set and the committed artifact. An unrecognised value is reported rather
  // than silently ignored: it is nearly always someone trying to reach the escape, and saying
  // nothing would leave them believing they had.
  const { accepted: acceptShrink, ignored } = acceptShrinkFromEnv(process.env);
  if (ignored !== undefined)
    console.warn(
      `  warning: ${ACCEPT_SHRINK_ENV} is set to "${ignored}", which does not acknowledge a ` +
        'shrink - the check is still being applied. Use ' +
        `${ACCEPT_SHRINK_ENV}=1 if you meant to accept one.`,
    );
  if (acceptShrink)
    console.log(
      `  note: ${ACCEPT_SHRINK_ENV} is set, so a large drop against the committed lock is being ` +
        'accepted rather than refused. Check the removals in the diff before committing.',
    );
  const npmPackages = assertNpmNotShrunk(
    assertNpmFloor(withPlatformOnlyPackages(packages, policy)),
    committedNpmCount(),
    { accepted: acceptShrink },
  );
  // The npm counterpart of `missingDirectReferences` below, and the only check here that reads a
  // second source rather than measuring the derived set against itself. Both assertions above are
  // measures of size, and size cannot see a package whose modules were never recorded: the set is
  // simply short by one, the document never gains the row, and no removal appears in any diff.
  const missingDependencies = missingDirectDependencies(
    npmPackages,
    readDirectDependencies(REPO),
    Object.keys(policy.unbundledDependencies || {}),
  );
  if (missingDependencies.length)
    throw new Error(
      `${missingDependencies.length} declared runtime dependenc(y|ies) reach no bundle and are ` +
        `recorded nowhere:\n${missingDependencies
          .map((dependency) => `  ${dependency.name} (declared in ${dependency.declaredIn})`)
          .join('\n')}\n` +
        'Either the module manifests are short - in which case the notices document would be ' +
        'missing a row and nothing else here would notice - or nothing imports these and that is ' +
        'deliberate. Rebuild first:\n' +
        '    rm -rf .notices && npm ci && npm run build\n' +
        'If they genuinely reach no bundle, record each one in notices-policy.json under ' +
        '"unbundledDependencies", e.g.:\n' +
        `${missingDependencies
          .map(
            (dependency) =>
              `    ${JSON.stringify(dependency.name)}: {\n` +
              '      "reason": "<why nothing this repository ships contains it - one sentence>"\n' +
              '    }',
          )
          .join(',\n')}`,
    );
  // Lockfile-described packages are excluded from detection entirely rather than having their
  // result discarded afterwards: licensee must never read a `.yalc` tree, because anything found
  // there would be another repository's branch content reaching a decision about this repository's
  // artifact - and it must not read a displaced package's directory either, because that holds a
  // different copy than the one the lockfile resolves and so a different licence text.
  const inspected = npmPackages.filter((pkg) => !pkg.fromLock);
  const detections = identify(inspected.map((pkg) => pkg.dir));
  // `detect.rb` answers once per directory it is given, so a directory it did not answer for means
  // the two sides disagree about what was asked - a path that did not round-trip byte-identically
  // (it strips each input line), or a truncated result. Without this the miss is INDISTINGUISHABLE
  // from the legitimate "this package ships no licence file" case that `|| { files: [] }` exists
  // for below, and the package would then resolve on its declared field alone: a package declaring
  // MIT while shipping a GPL LICENSE would come out `allowed MIT`, silently.
  const undetected = inspected.filter((pkg) => !detections.has(pkg.dir));
  if (undetected.length)
    throw new Error(
      `licensee returned no result for ${undetected.length} package director(ies) it was given, ` +
        'so nothing is known about the license files they ship - which is not the same as their ' +
        `shipping none:\n${undetected
          .slice(0, 10)
          .map((pkg) => `  ${pkg.name}@${pkg.version}: ${pkg.dir}`)
          .join('\n')}\n` +
        'Run: npm ci && npm run build',
    );
  const npmVerdicts = npmPackages.map((pkg) =>
    npmVerdict(pkg, detections.get(pkg.dir) || { dir: pkg.dir, files: [] }, policy),
  );

  const collected = collectNugetPackages();
  const directReferences = readDirectPackageReferences();
  const alwaysListed = alwaysListedPackages(policy, collected, directReferences);
  // The direct references are the one part of the closure that can be checked against a second
  // source. `assertFloor` cannot see this failure: losing the three SIL packages would take 88 to
  // 85, far above its plausibility floor and entirely silent.
  // Refused BEFORE the artifact is composed, like every other whole-set assertion here: a notice
  // file nobody recorded is a claim the document would omit, not a row it would get wrong.
  assertStaticAssetNoticesRecorded(REPO, policy);

  const missing = missingDirectReferences(
    [...collected, ...alwaysListed],
    directReferences,
    alwaysListed.map((pkg) => pkg.name),
  );
  if (missing.length)
    throw new Error(
      `the NuGet closure is missing direct PackageReference(s): ${missing.join(', ')}.\n` +
        `Run: dotnet restore ${DOTNET_PROJECT}`,
    );

  const nugetVerdicts = [...collected, ...alwaysListed].map((pkg) => nugetVerdict(pkg, policy));

  const verdicts = [...npmVerdicts, ...nugetVerdicts];
  // Refused here rather than at render time: the document is written from this table, so a staged
  // library it does not classify has to stop the run before anything is produced from it.
  const staged = snapStagePackages();
  assertSnapStagePackagesClassified(staged, policy.snapStagePackages || {});

  return {
    verdicts,
    // Carried for `describeBlock`, which reads the `copyleft` list alone so a block's printed
    // remedy cannot propose the allow-list route for an identifier the gate tests against copyleft
    // first - advice that could never clear the block it is printed under.
    policy,
    unresolvedStylesheetSpecifiers,
    // Computed here, where the policy and the full verdict set are both in hand, and printed by
    // `main` as a note - see `stalePolicyEntries`. Never a failure: a dead entry means a dependency
    // left, which is not a licensing problem.
    stalePolicyEntries: stalePolicyEntries(policy, verdicts),
    // Overrides that record a question nobody has answered - see `openPolicyQuestions`.
    // The pipeline had no state between "cleared" and "blocked", so a package the project
    // had explicitly NOT cleared went green with the only record of that in prose.
    openPolicyQuestions: openPolicyQuestions(policy),
    corpusVersion: corpusVersion(),
    licenseeVersion: licenseeVersion(),
    snapStagePackages: staged,
    snapStagePackageLicenses: policy.snapStagePackages || {},
    // Read here rather than in `render`, so a missing or edited copyright file stops the run before
    // anything is written - the same treatment every other reproduced legal text gets.
    snapCopyrightTexts: staged.map((pkg) =>
      snapCopyrightText(pkg, (policy.snapStagePackages || {})[pkg]),
    ),
    // The fourth thing redistributed that no module graph can see, beside the snap's staged
    // libraries: the files `copy-webpack-plugin` copies out of each extension's `assets/` and
    // `public/` trees. See `static-assets.ts` for why an inventory is the only gate available.
    staticAssetNotices: staticAssetNoticeTexts(REPO, policy),
  };
}

/**
 * Whether this run is in CI, from the conventional `CI` variable.
 *
 * `process.env.CI ? …` is a truthiness test on a STRING, so `CI=false` and `CI=0` - the two
 * spellings somebody uses to say the opposite - both selected the CI branch, and the check then
 * hard-failed on a condition it had explicitly decided not to fail on locally. The same defect was
 * fixed in `acceptShrinkFromEnv` (`shipping-set.ts`); this is the pipeline's other environment
 * read.
 */
export function inCi(env: typeof process.env = process.env): boolean {
  const raw = (env.CI || '').trim().toLowerCase();
  return raw !== '' && raw !== '0' && raw !== 'false' && raw !== 'off' && raw !== 'no';
}

/**
 * The cheapest check of all (`--verify-document`): is the committed `THIRD-PARTY-NOTICES.md` the
 * one the committed lock was written beside?
 *
 * Two committed files and a sha256 - no module manifests, no Ruby, no dotnet, no network, and no
 * build condition that can stop it answering. That last part is what it is for: `npm run package`
 * builds twice from one commit, so its webpack caches are warm by construction and the shipping-set
 * half REFUSES to answer there. The document half has no such limit, and the document is what
 * `electron-builder.json5` packs into the installer.
 *
 * @returns The committed lock when the pair agrees; `undefined` after reporting, with `exitCode`
 *   set, when it does not.
 */
function verifyCommittedDocument(): Lock | undefined {
  try {
    const committed = readLock(LOCK);
    const drift = diffDocument(committed, path.relative(REPO, OUT), fs.readFileSync(OUT, 'utf8'));
    if (!drift.length) return committed;

    console.error('\nERROR: the committed third-party notices are not intact:\n');
    drift.forEach((entry) => console.error(`  ${entry}`));
    console.error(
      `\n${path.relative(REPO, OUT)} is packaged into every installer, so it is a legal claim ` +
        'this build\nwould carry. It is generated, never edited by hand. On Linux, regenerate ' +
        'and commit both files:\n',
    );
    console.error(`    dotnet restore ${path.relative(REPO, DOTNET_PROJECT)}`);
    console.error('    npm run build:third-party-notices\n');
  } catch (err) {
    console.error(`\nERROR: ${messageOf(err)}\n`);
  }
  process.exitCode = 1;
  return undefined;
}

/**
 * The cheap cross-platform check (`--verify-shipping-set`): does THIS platform's build ship the
 * same npm packages the committed notices document was generated from?
 *
 * Deliberately narrower than `buildReport` + `diffLock` - see the module docstring for why licence
 * identification and the NuGet closure do not need re-checking per platform. This calls only
 * `collectShippedPackages` (webpack's module manifests, the stylesheet leaf scan, and
 * `release/app`'s closure - `shipping-set.ts`) and `diffShippingSet` against the committed lock's
 * npm entries: no `identify` (Ruby), no `nuget-set` (dotnet), no network.
 *
 * It ALSO checks the document itself against the hash the lock records. This is the only notices
 * gate `publish.yml` and `package-main.yml` run, and it compared npm `name@version` and nothing
 * else - so `THIRD-PARTY-NOTICES.md`, which `electron-builder.json5` packs into every installer,
 * reached those artifacts unverified. A hand-edited document with an untouched lock was caught only
 * by the full `--verify`, on test.yml's Linux leg alone.
 */
function verifyNpmShippingSet() {
  let npmPackages;
  let unresolvedStylesheetSpecifiers;
  let warmBundles;

  // FIRST, and deliberately outside the warm-cache skip below: this compares two committed files
  // and reads no module manifest, so no build condition can stop it answering. A warm cache makes
  // the npm shipping set untrustworthy; it says nothing about whether the document on disk is the
  // one its lock was written beside.
  const committed = verifyCommittedDocument();
  if (!committed) return;

  try {
    ({
      packages: npmPackages,
      unresolvedStylesheetSpecifiers,
      warmBundles,
    } = collectShippedPackages({
      manifestDir: MANIFESTS,
      repo: REPO,
      requiredBundles: REQUIRED_BUNDLES,
      requireUnbundledClosure: true,
      // A warm webpack cache can under-report modules, so this check cannot answer its question
      // against one. Every workflow runs it in the one position where the cache is cold -
      // immediately after the job's first build - so a warm stamp in CI is a real anomaly and
      // fails. Run by hand it meets the normal state of any tree that has been built twice, where
      // failing would report a difference it cannot trust, so it says so and stops instead.
      // Writing the artifact still refuses outright either way; only this check stops short.
      warmCache: inCi() ? 'throw' : 'report',
    }));
    // The same union `buildReport` applies - see `withPlatformOnlyPackages`. Without it this check
    // compares a set missing the other platforms' packages against a lock that records them, and
    // reports every one as `removed:` on the platform that does not install them.
    npmPackages = withPlatformOnlyPackages(npmPackages, loadPolicy(POLICY));

    // BEFORE the floors, which is the whole point of the `report` mode above. Both floors measure
    // the derived set, and a warm cache is the one condition under which that set is known to be
    // possibly short - so running them first turned "this run cannot answer its question" into a
    // confident, fabricated failure. On any tree built twice, `assertNpmNotShrunk` reported a drop
    // that is an artifact of the cache and then printed the remedy for a REAL removal, directing
    // the developer at `NOTICES_ACCEPT_SHRINK=1` - the one flag that would commit the short set the
    // warm cache produced. Only the SHIPPING SET half stops here: the document check above has
    // already run, because it rests on two committed files rather than on the manifests.
    if (warmBundles.length) {
      console.log(
        `Verified ${path.relative(REPO, OUT)} against the hash its lock records.\n` +
          `Skipped the npm shipping set: ${warmBundles.join(', ')} ` +
          `${warmBundles.length === 1 ? 'was' : 'were'} built against a warm webpack filesystem ` +
          "cache, whose module list can be short, so this platform's npm shipping set cannot be " +
          'compared against the committed lock.\n' +
          '  To run that half too: rm -rf node_modules/.cache/webpack-* && npm run build\n' +
          '  CI builds are always cold, so this check runs there in full.',
      );
      return;
    }

    assertNpmFloor(npmPackages);
    assertNpmNotShrunk(npmPackages, committed.packages.filter((e) => e.ecosystem === 'npm').length);
  } catch (err) {
    console.error(`\nERROR: ${messageOf(err)}\n`);
    process.exitCode = 1;
    return;
  }

  const drift = diffShippingSet(committed, npmPackages);
  if (drift.length) {
    console.error(`\nERROR: this platform's npm shipping set does not match the committed lock:\n`);
    drift.forEach((entry) => console.error(`  ${entry}`));
    console.error(
      '\nTHIRD-PARTY-NOTICES.md is shipped inside every platform installer, so its npm closure has',
    );
    console.error('to match what this platform actually ships. On Linux, regenerate and commit:\n');
    console.error(`    dotnet restore ${path.relative(REPO, DOTNET_PROJECT)}`);
    console.error('    npm run build:third-party-notices\n');
    unlinkedTreeNote(npmPackages).forEach((line) => console.error(line));
    process.exitCode = 1;
    return;
  }

  console.log(
    `Verified ${path.relative(REPO, OUT)} against the hash its lock records, and ` +
      `${npmPackages.length} npm packages against the committed lock's npm shipping set.`,
  );
  if (unresolvedStylesheetSpecifiers.length)
    console.log(
      `  note: ${unresolvedStylesheetSpecifiers.length} stylesheet specifier(s) resolve to no ` +
        'installed package, so nothing of theirs was checked: ' +
        `${unresolvedStylesheetSpecifiers.join(', ')}.`,
    );
}

/**
 * The platform the write refusal below is judged against.
 *
 * `NOTICES_FORCE_PLATFORM` exists ONLY so the degradation suite can exercise that refusal on a
 * Linux CI runner, which is the only machine the suite ever runs on - so it is a ONE-WAY override:
 * a value that is not `linux` turns the refusal on, and every other value (including `linux`
 * itself) leaves the real `process.platform` in charge. Accepting `linux` here would let an
 * environment variable disable the one guard standing between a macOS or Windows checkout and an
 * overwritten committed artifact, which is the opposite of what an override for a test is for. The
 * one-way shape is what makes "this override cannot weaken the check" true rather than merely
 * intended.
 *
 * @param actual `process.platform`.
 */
function effectivePlatform(env: typeof process.env, actual: string): string {
  const forced = env.NOTICES_FORCE_PLATFORM;
  return forced && forced !== 'linux' ? forced : actual;
}

/**
 * What this run could not account for, printed before it writes or verifies anything.
 *
 * Notes, not failures: each names something a reader has to weigh rather than something the gate
 * can decide. They go to stdout on both paths because the `--verify` run is the one CI performs,
 * and a note only the write path printed was a note CI never saw.
 */
function printRunNotes(report: {
  stalePolicyEntries: string[];
  openPolicyQuestions: string[];
  unresolvedStylesheetSpecifiers: string[];
}) {
  if (report.stalePolicyEntries.length)
    console.log(
      `  note: ${report.stalePolicyEntries.length} policy entr(ies) matched no package in this ` +
        `run, so nothing was decided by them:\n${report.stalePolicyEntries
          .map((entry) => `    ${entry}`)
          .join('\n')}`,
    );
  if (report.openPolicyQuestions.length)
    console.log(
      `  note: ${report.openPolicyQuestions.length} curated override(s) record a question that ` +
        `has not been answered. They are listed under "Open questions" in the document and they do ` +
        `not block, but they are not settled either:\n${report.openPolicyQuestions
          .map((entry) => `    ${entry}`)
          .join('\n')}`,
    );
  if (report.unresolvedStylesheetSpecifiers.length)
    console.log(
      `  note: ${report.unresolvedStylesheetSpecifiers.length} stylesheet specifier(s) resolve to ` +
        'no installed package, so nothing of theirs is reported: ' +
        `${report.unresolvedStylesheetSpecifiers.join(', ')}.`,
    );
}
export function main(): void {
  const verifyOnly = process.argv.includes('--verify');
  const verifyShippingSetOnly = process.argv.includes('--verify-shipping-set');
  const verifyDocumentOnly = process.argv.includes('--verify-document');

  // The committed artifact describes the npm closure resolved on Linux. On any other platform this
  // refuses to write rather than overwriting the committed file with a legitimately different one.
  const platform = effectivePlatform(process.env, process.platform);
  if (platform !== 'linux' && !verifyOnly && !verifyShippingSetOnly && !verifyDocumentOnly) {
    console.error(
      `\nERROR: the notices artifact is generated on Linux, and this is ${platform}.\n` +
        'Run with --verify-shipping-set to check this platform against the committed lock instead.\n',
    );
    process.exitCode = 1;
    return;
  }

  if (verifyDocumentOnly) {
    if (verifyCommittedDocument())
      console.log(`Verified ${path.relative(REPO, OUT)} against the hash its lock records.`);
    return;
  }

  if (verifyShippingSetOnly) {
    verifyNpmShippingSet();
    return;
  }

  let report;
  try {
    report = buildReport();
  } catch (err) {
    // A stack trace buries the one thing that matters here - what to run to fix it - so report the
    // message alone. The previous artifact is left untouched rather than replaced with a short one.
    console.error(`\nERROR: ${messageOf(err)}\n`);
    process.exitCode = 1;
    return;
  }

  // The block gate runs before EITHER outcome, not just before the write. The lock records
  // `spdxId` rather than `verdict`, so a blocked package is unrepresented in what `--verify`
  // compares: run the gate after the verify branch returns and the check that documents itself as
  // the full one passes on a set the generator would refuse to write, leaving its coverage a
  // property of CI's step ordering rather than of this function.
  const blocks = report.verdicts.filter((verdict) => verdict.verdict === 'blocked');
  if (blocks.length) {
    console.error(`\n${blocks.length} package(s) could not be cleared:\n`);
    blocks.forEach((verdict) => console.error(describeBlock(verdict, report.policy)));
    console.error(
      'Nothing was written. A notices document is a legal claim, so it is never produced from an\n' +
        'incomplete set - fix or record an exception for each package above.\n',
    );
    process.exitCode = 1;
    return;
  }

  // Inside the module's message-only convention, like every other failure here. `render` throws
  // deliberately in three places (an unknown ecosystem, a package named in a paragraph whose
  // canonical text was not reproduced, a NuGet row with no text) and `canonicalText` throws on a
  // corpus checksum mismatch - all of them findings this pipeline exists to make, and all of them
  // reaching the developer as a raw stack trace because these two calls sat outside any `try`.
  let lock;
  let rendered;
  try {
    // Rendered FIRST: the lock records a sha256 of the document it is written beside, so the
    // document has to exist before the lock describing it can.
    rendered = render(report);
    lock = buildLock(report, rendered);
  } catch (err) {
    console.error(`\nERROR: ${messageOf(err)}\n`);
    process.exitCode = 1;
    return;
  }

  // Printed on BOTH paths, and before either one acts. They describe what this run could not
  // account for - a stylesheet specifier that resolved to no installed package is the one thing
  // that can quietly shorten the npm half - so they belong with the decision to write rather than
  // after it, where a failed write swallows them entirely. Printing them only on the write path
  // meant CI, which runs `--verify` and nothing else, never saw one: the run that most needs to
  // surface an unaccounted-for specifier was the run that stayed silent about it.
  printRunNotes(report);

  if (verifyOnly) {
    let drift;
    try {
      const committedLock = readLock(LOCK);
      drift = diffLock(committedLock, lock);
      // The lock carries metadata and hashes, never the rendered bytes, so without this comparison
      // `--verify` cannot see a hand-edited document at all: delete a copyleft row, or swap one
      // licence text for another, and every lock field stays identical while the check reports
      // success. Comparing the render is free (`render` is pure and already needed below).
      const committedDocument = fs.readFileSync(OUT, 'utf8');
      if (committedDocument !== rendered)
        drift.push(
          `${path.relative(REPO, OUT)} is not what this run renders - the committed file was ` +
            'edited by hand, or was generated from a different set',
        );
      // And the recorded hash against the same bytes, so the field the cheap cross-platform check
      // rests on is proven on the one leg that can re-render. A `documentSha256` that had drifted
      // from the document beside it would leave every release-workflow run comparing against a
      // stale claim, and nothing else would ever look at it.
      drift.push(...diffDocument(committedLock, path.relative(REPO, OUT), committedDocument));
    } catch (err) {
      // A missing or truncated lock, or a missing document, reaches here rather than escaping as a
      // raw ENOENT stack trace - the shape this script's message-only convention exists to avoid.
      console.error(`\nERROR: ${messageOf(err)}\n`);
      process.exitCode = 1;
      return;
    }
    if (drift.length) {
      console.error(`\nERROR: the derived shipping set does not match the committed lock:\n`);
      drift.forEach((entry) => console.error(`  ${entry}`));
      // The remedy is spelled out because this is the step that fires on a legitimate dependency
      // bump, and what it is asking for is an ACKNOWLEDGEMENT: read the lines above, satisfy
      // yourself that each one is a change you meant, then regenerate. A licence text changing
      // under an unchanged name@version is the case this exists for - nobody re-reads a licence
      // they have already cleared - and it is reported HERE rather than left to the staleness
      // check, which can only say that some file changed.
      console.error(
        '\nTHIRD-PARTY-NOTICES.md is shipped inside every platform installer, so every line above',
      );
      console.error(
        'is a change to a legal claim. Check each one, then regenerate on Linux and commit both',
      );
      console.error('THIRD-PARTY-NOTICES.md and THIRD-PARTY-NOTICES.lock.json:\n');
      console.error(`    dotnet restore ${path.relative(REPO, DOTNET_PROJECT)}`);
      console.error('    npm run build:third-party-notices\n');
      // The npm verdicts carry `devLinked` through from the shipping set - see `npmVerdict`.
      unlinkedTreeNote(report.verdicts.filter((verdict) => verdict.ecosystem === 'npm')).forEach(
        (line) => console.error(line),
      );
      process.exitCode = 1;
    } else {
      console.log(`Verified ${lock.packages.length} packages against the committed lock.`);
    }
    return;
  }

  // The artifact and its lock are written as a PAIR - the lock is what `--verify` and the
  // per-platform check compare against, so a lock describing a different run than the document
  // beside it is worse than either being stale. Both are staged as temporary files first and then
  // renamed, so the only window in which they can disagree is between two renames on the same
  // directory rather than spanning a full render and serialize.
  const outTmp = `${OUT}.tmp`;
  const lockTmp = `${LOCK}.tmp`;
  let renamedDocument = false;
  try {
    fs.writeFileSync(outTmp, rendered);
    writeLock(lockTmp, lock);
    fs.renameSync(outTmp, OUT);
    renamedDocument = true;
    fs.renameSync(lockTmp, LOCK);
  } catch (err) {
    // Only the temporaries that are still temporaries are removed. An unconditional cleanup here
    // deleted the one thing worth keeping in the single case that matters: if the first rename
    // succeeded and the second did not (a watcher or scanner holding the lock file, a full disk),
    // the staged lock is the ONLY copy that matches the document just written, and removing it
    // leaves exactly the disagreeing pair the comment above calls worse than either being stale -
    // with nothing left to rename by hand.
    if (renamedDocument) {
      console.error(
        `\nERROR: ${path.relative(REPO, OUT)} was replaced but its lock could not be: ` +
          `${messageOf(err)}\n\n` +
          'The document and the lock now describe different runs. The lock matching the document ' +
          `just written is staged at\n    ${path.relative(REPO, lockTmp)}\n` +
          `Rename it over ${path.relative(REPO, LOCK)} to restore the pair, or re-run this ` +
          'command once the cause is cleared.\n',
      );
    } else {
      fs.rmSync(outTmp, { force: true });
      fs.rmSync(lockTmp, { force: true });
      console.error(`\nERROR: ${messageOf(err)}\n`);
    }
    process.exitCode = 1;
    return;
  }
  const npm = report.verdicts.filter((verdict) => verdict.ecosystem === 'npm').length;
  const nuget = report.verdicts.length - npm;
  console.log(`Wrote ${path.relative(REPO, OUT)}: ${npm} npm packages, ${nuget} NuGet packages.`);
}

// Guarded rather than called unconditionally so the report can be built without the side effects of
// a full run - writing the artifact, writing the lock, setting an exit code. That is what let the
// old and new generators' output be diffed side by side while the exceptions list was still empty
// and every run therefore ended at the block gate.
if (require.main === module) main();
