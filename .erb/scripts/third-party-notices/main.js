/**
 * Generates `THIRD-PARTY-NOTICES.md` and its lock sidecar from what the packaged application
 * actually ships.
 *
 * Attribution obligations (MIT/BSD/ISC/Apache) attach to the DISTRIBUTED BINARY, so this describes
 * the binary, not the repository. Three sources feed it, plus one hand-written section:
 *
 * - **npm** - webpack's own module manifests (`.notices/modules/*.json`), the stylesheet leaf scan,
 *   and `release/app`'s unbundled closure. See `shipping-set.js` for why each is needed and why
 *   `npm ls --omit=dev` is not one of them.
 * - **NuGet** - the union of the restore closure for every published runtime identifier, narrowed to
 *   the packages that contribute a file to the publish output. See `nuget-set.js`.
 * - **Electron**, which ships its own notices inside the packaged app and so is described in prose.
 *
 * Every package resolves to exactly one verdict (`policy.js`). The document is written only when
 * every one of them cleared: a notices file is a legal claim, so it is never produced from an
 * incomplete set.
 *
 *     npm run build:third-party-notices                  # regenerate (Linux)
 *     npm run verify:third-party-notices                 # full check: licence + NuGet + npm (Linux)
 *     npm run verify:third-party-notices:shipping-set     # cheap check: npm shipping set only (Windows/macOS)
 *
 * `--verify` and `--verify-shipping-set` answer different questions and cost different amounts.
 * `--verify` re-derives every verdict (`buildReport`) and diffs the WHOLE lock - it needs Ruby
 * (`identify`) and four `dotnet restore` passes (`nuget-set.js`), so it only runs where those are
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

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

const { identify } = require('./identify');
const { classify, loadPolicy } = require('./policy');
const {
  ACCEPT_SHRINK_ENV,
  REQUIRED_BUNDLES,
  assertNpmFloor,
  assertNpmNotShrunk,
  collectShippedPackages,
} = require('./shipping-set');
const {
  collectNugetPackages,
  missingDirectReferences,
  readDirectPackageReferences,
  DOTNET_PROJECT,
} = require('./nuget-set');
const { corpusVersion, verifyCorpus } = require('./corpus');
const { buildLock, writeLock, readLock, diffLock, diffShippingSet } = require('./lock');
const { describeBlock, stalePolicyEntries } = require('./report');
const { render, joinTexts } = require('./render');
const { declaredLicenseField, readPackageNotices } = require('./package-files');

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
 *
 * @returns {number | undefined}
 */
function committedNpmCount() {
  try {
    return readLock(LOCK).packages.filter((entry) => entry.ecosystem === 'npm').length;
  } catch (err) {
    if (err.code === 'ENOENT') return undefined;
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
 * @param {{ devLinked?: boolean }[]} npmPackages
 * @returns {string[]} Lines to print, or none when the tree is linked or the repository declares no
 *   links.
 */
function unlinkedTreeNote(npmPackages) {
  let declared = 0;
  try {
    const config = JSON.parse(fs.readFileSync(DEV_PACKAGES, 'utf8'));
    declared = (config.repos || []).reduce(
      (total, repo) => total + (repo.devPackages || []).length,
      0,
    );
  } catch {
    return [];
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
 * The Ubuntu packages snapcraft stages inside the Linux `.snap`, read from the packaging config so
 * the notices cannot describe a different set than the one that ships. They are neither npm nor
 * NuGet packages, so nothing else in this pipeline can see them, but they ARE redistributed inside
 * the artifact - see the "Linux snap" section `render` writes from this list.
 */
function snapStagePackages() {
  const config = JSON5.parse(fs.readFileSync(ELECTRON_BUILDER, 'utf8'));
  return config.snap?.stagePackages ?? [];
}

/**
 * The licensee version detection ran against, recorded in the lock so a verdict that moved because
 * the matcher was upgraded stays distinguishable from one that moved because a licence changed.
 */
function licenseeVersion() {
  return execFileSync(
    'bundle',
    ['exec', 'ruby', '-e', 'require "licensee"; print Licensee::VERSION'],
    {
      cwd: REPO,
      encoding: 'utf8',
    },
  ).trim();
}

/**
 * Composes one npm package's verdict.
 *
 * A package marked `fromLock` (see `shipping-set.js`) is the one case where nothing here reads the
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
function npmVerdict(pkg, detection, policy) {
  const declaredField = pkg.fromLock
    ? pkg.declaredField
    : declaredLicenseField(JSON.parse(fs.readFileSync(path.join(pkg.dir, 'package.json'), 'utf8')));
  const files = detection.files || [];
  const verdict = classify({
    name: pkg.name,
    version: pkg.version,
    ecosystem: 'npm',
    declaredField,
    detection,
    policy,
  });
  const matched = files.find((file) => file.filename === verdict.matchedFile) || files[0];
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
    // An npm manifest has no copyright field, so the only notice available is one a human read from
    // the package's own LICENSE and recorded in the policy - see `loadPolicy`.
    copyright: (policy.copyrightNotices || {})[`npm:${pkg.name}`],
  };
}

/**
 * Composes one NuGet package's verdict.
 *
 * `nuget-license` reports nuspec metadata, not licence files, so `detection` is always empty here
 * and every NuGet package resolves on its declared expression - which is not a special case in
 * `policy.js`, just the no-licence-file path that any ecosystem can take.
 *
 * REPRODUCTION is a separate question from classification, and the two must not be conflated. Where
 * the package folder holds the package's own licence file(s), that text is what gets reproduced
 * (`nuget-set.js`'s `attachLicenseFiles`); the canonical SPDX text is the fallback for a package
 * that bundles none. Substituting canonical text for a bundled one loses the copyright notice the
 * bundled file carries, which is the notice MIT/BSD/ISC actually oblige to travel with copies.
 */
function nugetVerdict(pkg, policy) {
  const override = (policy.overrides || {})[`nuget:${pkg.name}`] || {};
  const ships = pkg.assemblies?.length ? `Ships ${pkg.assemblies.join(', ')}.` : '';
  return {
    ...pkg,
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
    text: joinTexts(pkg.licenseFiles),
    // Read by `nuget-set.js` from the restored package folder, the same place its licence files
    // come from. Without this `render.js`'s NOTICE section could never fire for a NuGet package.
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
function alwaysListedPackages(policy, collected, directReferences) {
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
      version: directReferences.find((reference) => reference.id === name)?.version || '—',
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

function buildReport() {
  const corruptTexts = verifyCorpus();
  if (corruptTexts.length)
    throw new Error(`vendored SPDX corpus is corrupt for: ${corruptTexts.join(', ')}`);

  const policy = loadPolicy(POLICY);
  // Returns `{ packages, unresolvedStylesheetSpecifiers }`, not a bare array. The second field is
  // load-bearing: a stylesheet specifier that resolves to no installed package is SKIPPED rather
  // than thrown (there are real false positives - a specifier inside a code comment, and Sass
  // load-path `@use` idioms), so it must be surfaced or a genuinely missing CSS-only package would
  // vanish without trace now that the old regex scan is gone.
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
  const acceptShrink = !!process.env[ACCEPT_SHRINK_ENV];
  if (acceptShrink)
    console.log(
      `  note: ${ACCEPT_SHRINK_ENV} is set, so a large drop against the committed lock is being ` +
        'accepted rather than refused. Check the removals in the diff before committing.',
    );
  const npmPackages = assertNpmNotShrunk(assertNpmFloor(packages), committedNpmCount(), {
    accepted: acceptShrink,
  });
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
    corpusVersion: corpusVersion(),
    licenseeVersion: licenseeVersion(),
    snapStagePackages: snapStagePackages(),
  };
}

/**
 * The cheap cross-platform check (`--verify-shipping-set`): does THIS platform's build ship the
 * same npm packages the committed notices document was generated from?
 *
 * Deliberately narrower than `buildReport` + `diffLock` - see the module docstring for why licence
 * identification and the NuGet closure do not need re-checking per platform. This calls only
 * `collectShippedPackages` (webpack's module manifests, the stylesheet leaf scan, and
 * `release/app`'s closure - `shipping-set.js`) and `diffShippingSet` against the committed lock's
 * npm entries: no `identify` (Ruby), no `nuget-set` (dotnet), no network.
 */
function verifyNpmShippingSet() {
  let npmPackages;
  let unresolvedStylesheetSpecifiers;
  let warmBundles;
  let committed;
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
      // against one. In CI that is a real anomaly - no workflow caches `node_modules/.cache/
      // webpack-*`, so every CI build is cold - and it fails. Locally it is the NORMAL state of any
      // tree that has been built twice, and failing there would block `npm run package` on a
      // condition that protects nothing CI does not already protect, so it says so and stops
      // instead. Writing the artifact still refuses outright either way; only this check skips.
      warmCache: process.env.CI ? 'throw' : 'report',
    }));
    assertNpmFloor(npmPackages);
    // Inside the try with everything else: a missing or truncated lock is exactly the kind of
    // failure whose remedy this script exists to print, and outside it the same condition escaped
    // as a raw ENOENT stack trace - the one shape the message-only convention here exists to avoid.
    committed = readLock(LOCK);
    assertNpmNotShrunk(npmPackages, committed.packages.filter((e) => e.ecosystem === 'npm').length);
  } catch (err) {
    console.error(`\nERROR: ${err.message}\n`);
    process.exitCode = 1;
    return;
  }

  if (warmBundles.length) {
    console.log(
      `Skipped: ${warmBundles.join(', ')} ${warmBundles.length === 1 ? 'was' : 'were'} built ` +
        'against a warm webpack filesystem cache, whose module list can be short, so this ' +
        "platform's npm shipping set cannot be compared against the committed lock.\n" +
        '  To run the check: rm -rf node_modules/.cache/webpack-* && npm run build\n' +
        '  CI builds are always cold, so this check runs there in full.',
    );
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
    `Verified ${npmPackages.length} npm packages against the committed lock's npm shipping set.`,
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
 * @param {NodeJS.ProcessEnv} env
 * @param {string} actual `process.platform`.
 * @returns {string}
 */
function effectivePlatform(env, actual) {
  const forced = env.NOTICES_FORCE_PLATFORM;
  return forced && forced !== 'linux' ? forced : actual;
}

function main() {
  const verifyOnly = process.argv.includes('--verify');
  const verifyShippingSetOnly = process.argv.includes('--verify-shipping-set');

  // The committed artifact describes the npm closure resolved on Linux. On any other platform this
  // refuses to write rather than overwriting the committed file with a legitimately different one.
  const platform = effectivePlatform(process.env, process.platform);
  if (platform !== 'linux' && !verifyOnly && !verifyShippingSetOnly) {
    console.error(
      `\nERROR: the notices artifact is generated on Linux, and this is ${platform}.\n` +
        'Run with --verify-shipping-set to check this platform against the committed lock instead.\n',
    );
    process.exitCode = 1;
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
    console.error(`\nERROR: ${err.message}\n`);
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

  const lock = buildLock(report);
  const rendered = render(report);

  if (verifyOnly) {
    let drift;
    try {
      drift = diffLock(readLock(LOCK), lock);
      // The lock carries metadata and hashes, never the rendered bytes, so without this comparison
      // `--verify` cannot see a hand-edited document at all: delete a copyleft row, or swap one
      // licence text for another, and every lock field stays identical while the check reports
      // success. Comparing the render is free (`render` is pure and already needed below).
      if (fs.readFileSync(OUT, 'utf8') !== rendered)
        drift.push(
          `${path.relative(REPO, OUT)} is not what this run renders - the committed file was ` +
            'edited by hand, or was generated from a different set',
        );
    } catch (err) {
      // A missing or truncated lock, or a missing document, reaches here rather than escaping as a
      // raw ENOENT stack trace - the shape this script's message-only convention exists to avoid.
      console.error(`\nERROR: ${err.message}\n`);
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

  // Both notes are printed BEFORE the write, not after it. They describe what this run could not
  // account for - a stylesheet specifier that resolved to no installed package is the one thing
  // that can quietly shorten the npm half - so they belong with the decision to write rather than
  // after it, where a failed write swallows them entirely.
  if (report.stalePolicyEntries.length)
    console.log(
      `  note: ${report.stalePolicyEntries.length} policy entr(ies) matched no package in this ` +
        `run, so nothing was decided by them:\n${report.stalePolicyEntries
          .map((entry) => `    ${entry}`)
          .join('\n')}`,
    );
  if (report.unresolvedStylesheetSpecifiers.length)
    console.log(
      `  note: ${report.unresolvedStylesheetSpecifiers.length} stylesheet specifier(s) resolve to ` +
        'no installed package, so nothing of theirs is reported: ' +
        `${report.unresolvedStylesheetSpecifiers.join(', ')}.`,
    );

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
          `${err.message}\n\n` +
          'The document and the lock now describe different runs. The lock matching the document ' +
          `just written is staged at\n    ${path.relative(REPO, lockTmp)}\n` +
          `Rename it over ${path.relative(REPO, LOCK)} to restore the pair, or re-run this ` +
          'command once the cause is cleared.\n',
      );
    } else {
      fs.rmSync(outTmp, { force: true });
      fs.rmSync(lockTmp, { force: true });
      console.error(`\nERROR: ${err.message}\n`);
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

module.exports = { buildReport, main };
