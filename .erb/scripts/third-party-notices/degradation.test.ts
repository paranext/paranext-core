/**
 * Proves the generator fails CLOSED rather than quietly producing a shorter legal document.
 *
 * Every case here degrades the generator's input the way a real environment does - a pruned
 * `node_modules`, a stale manifest, an empty one - and asserts that the run stops. Each of these is
 * a shape that otherwise warns (or says nothing), writes a document missing packages and licence
 * texts, and exits 0: a tree missing a handful of packages produces an artifact with 255 packages
 * instead of 262, four licence texts gone, every section renumbered, and a green build. A notices
 * file is a legal claim, so "less than the truth, silently" is the one outcome that must be
 * impossible.
 *
 * The assertion each case makes is therefore a NON-ZERO EXIT of the real `main.ts`, not merely that
 * some function throws: a documented intention does not survive a refactor, and the thing that
 * actually protects the artifact is the process exit code CI reads. Each run is a child process
 * with the ONE collaborator that supplies the degraded input replaced; the rest of the pipeline is
 * real, including the shipping-set walk, `classify`, the block gate, `diffLock` and the writer.
 *
 * Two stubs are unconditional, and neither weakens what is under test:
 *
 * - `bundle exec ruby` (licensee's version, read in `licenseeVersion`) is faked. The Windows and
 *   macOS CI legs install no Ruby, and none of these cases is about licensee.
 * - `nuget-set` is faked wherever the case is not about NuGet, because the real one shells out to
 *   `dotnet restore` four times.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { NPM_MIN_PACKAGES, assertNpmFloor, collectShippedPackages } from './shipping-set';
import { assertFloor, DOTNET_MIN_PACKAGES } from './nuget-set';
import { CONFIDENCE_THRESHOLD } from './policy';

/**
 * Registers tsx in the child, so it can `require` this pipeline's `.ts` modules.
 *
 * The same loader `npm run build:third-party-notices` runs the generator with, so what these cases
 * drive is the shipped entry point rather than a separately compiled copy of it.
 */
const TSX = ['--import', 'tsx'];

const DIR = __dirname;
const REPO = path.resolve(__dirname, '..', '..', '..');
const OUT = path.join(REPO, 'THIRD-PARTY-NOTICES.md');
const LOCK = path.join(REPO, 'THIRD-PARTY-NOTICES.lock.json');

type Run = { status: number; stdout: string; stderr: string };

/**
 * Runs the real `main.ts` in a child process, with `setup` evaluated first.
 *
 * `setup` runs with three helpers in scope:
 *
 * - `load(relative)` - require a module of this pipeline for real.
 * - `stub(relative, exports)` - seed `require.cache` so `main.ts`'s own `require` of that module
 *   returns `exports`. Seeding the cache rather than rewriting `main.ts` is what keeps `main.ts`
 *   itself unmodified and therefore actually under test.
 * - `TMP` - the per-test temporary directory, so a case can point real code at a degraded tree.
 *
 * `main()` sets `process.exitCode` rather than throwing, so the child exits with it naturally and
 * `status` is the value CI would see.
 */
function runGenerator(setup: string, argv: string[] = [], tmp = ''): Run {
  const script = `
const path = require('path');
const DIR = ${JSON.stringify(DIR)};
const TMP = ${JSON.stringify(tmp)};

// Every case here drives the WRITE path, which main.ts runs only on Linux (it refuses elsewhere
// rather than overwriting the committed artifact with a legitimately different closure - see
// \`effectivePlatform\`). What these cases are about is what the generator does with degraded INPUT,
// which is not platform-specific, so the child claims to be Linux and they run on all three legs.
// The refusal itself is covered by its own cases below, which set the platform the same way.
Object.defineProperty(process, 'platform', { value: 'linux' });

// licenseeVersion() shells out to Ruby, which the Windows and macOS CI legs do not have, and none
// of these cases is about licensee. Mutating the shared child_process module before main.ts is
// required means its own destructured reference picks this up.
const childProcess = require('child_process');
const realExecFileSync = childProcess.execFileSync;
childProcess.execFileSync = (file, args, options) =>
  file === 'bundle' ? '0.0.0-test' : realExecFileSync(file, args, options);

const load = (relative) => require(path.join(DIR, relative));
const stub = (relative, exports) => {
  const filename = require.resolve(path.join(DIR, relative));
  require.cache[filename] = {
    id: filename,
    filename,
    path: path.dirname(filename),
    loaded: true,
    children: [],
    paths: [],
    exports,
  };
};

// Every case that is not about NuGet gets an empty closure rather than four dotnet restores.
// readDirectPackageReferences stays REAL: it only reads the .csproj, and it is where the
// alwaysList overrides get the version they are listed at. Stubbing it out left them at the
// "no version" placeholder, which is not a state any real run reaches.
const emptyNuget = () => {
  const real = load('nuget-set.ts');
  stub('./nuget-set', {
    ...real,
    collectNugetPackages: () => [],
    missingDirectReferences: () => [],
  });
};

${setup}

process.argv = [process.argv[0], path.join(DIR, 'main.ts'), ...${JSON.stringify(argv)}];
load('main.ts').main();
`;
  const result = spawnSync(process.execPath, [...TSX, '-e', script], {
    encoding: 'utf8',
    cwd: REPO,
  });
  return { status: result.status ?? -1, stdout: result.stdout ?? '', stderr: result.stderr ?? '' };
}

/** Writes a minimal npm package on disk and returns its directory. */
function writePackage(root: string, name: string, manifest: object, files: object = {}) {
  const dir = path.join(root, 'node_modules', name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name, ...manifest }));
  Object.entries(files).forEach(([file, text]) => fs.writeFileSync(path.join(dir, file), text));
  return dir;
}

let tmp: string;
let committedArtifact: string;
let committedLock: string;

beforeAll(() => {
  // A bug that let one of these runs WRITE would corrupt the committed artifact for every later
  // test and for the developer's working tree. Snapshotting it is both the safety net and, in
  // `leavesTheCommittedArtifactUntouched`, the assertion.
  committedArtifact = fs.readFileSync(OUT, 'utf8');
  committedLock = fs.readFileSync(LOCK, 'utf8');
});

afterAll(() => {
  if (fs.readFileSync(OUT, 'utf8') !== committedArtifact) fs.writeFileSync(OUT, committedArtifact);
  if (fs.readFileSync(LOCK, 'utf8') !== committedLock) fs.writeFileSync(LOCK, committedLock);
});

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-degrade-'));
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

/** The committed artifact and its lock are byte-identical to what they were before the run. */
function leavesTheCommittedArtifactUntouched() {
  expect(fs.readFileSync(OUT, 'utf8')).toBe(committedArtifact);
  expect(fs.readFileSync(LOCK, 'utf8')).toBe(committedLock);
}

describe('a degraded environment fails closed', () => {
  it('exits non-zero when a bundled module has no package on disk', () => {
    // The verified regression: a degraded node_modules produced 255 packages instead of 262,
    // dropped four license texts, renumbered every section and exited 0.
    const manifests = path.join(tmp, '.notices', 'modules');
    fs.mkdirSync(manifests, { recursive: true });
    fs.mkdirSync(path.join(tmp, 'node_modules', 'ghost'), { recursive: true });
    fs.writeFileSync(
      path.join(manifests, 'main.json'),
      JSON.stringify({
        bundle: 'main',
        buildId: 'one-build',
        modules: [path.join(tmp, 'node_modules', 'ghost', 'index.js')],
      }),
    );

    const run = runGenerator(
      `
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        collectShippedPackages: () =>
          real.collectShippedPackages({
            manifestDir: path.join(TMP, '.notices', 'modules'),
            repo: TMP,
          }),
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/no readable package\.json/);
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when a bundled module has no package on disk UNDER A NESTED PATH', () => {
    // The case above catches only a TOP-LEVEL miss, where the walk runs out of path and returns
    // undefined. A nested miss instead walks to the nearest package.json ABOVE it and is credited
    // to the ENCLOSING package - a real directory, so the run resolves and exits 0 with the missing
    // package absent from the document entirely. The live shape: sixteen modules under
    // `.../scripture-utilities/node_modules/@xmldom/xmldom/` when a `yalc` refresh has taken that
    // directory off disk, all attributed to `scripture-utilities`. Scoped, because a boundary
    // computed for the unscoped case stops one segment too high.
    const manifests = path.join(tmp, '.notices', 'modules');
    fs.mkdirSync(manifests, { recursive: true });
    const outer = writePackage(tmp, 'outer', { version: '1.0.0', license: 'MIT' });
    fs.writeFileSync(
      path.join(manifests, 'main.json'),
      JSON.stringify({
        bundle: 'main',
        buildId: 'one-build',
        modules: [path.join(outer, 'node_modules', '@scope', 'gone', 'lib', 'index.js')],
      }),
    );

    const run = runGenerator(
      `
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        collectShippedPackages: () =>
          real.collectShippedPackages({
            manifestDir: path.join(TMP, '.notices', 'modules'),
            repo: TMP,
          }),
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/no readable package\.json/);
    // The enclosing package must not have absorbed it.
    expect(run.stderr).toMatch(/@scope[\\/]gone/);
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when the module manifests come from different builds', () => {
    // A stale manifest is a silent under-report, and the build id is the only thing that places a
    // manifest in a build: `prebuild` mints one per `npm run build` and every manifest carries it.
    const manifests = path.join(tmp, '.notices', 'modules');
    fs.mkdirSync(manifests, { recursive: true });
    const dep = writePackage(tmp, 'dep', { version: '1.0.0', license: 'MIT' });
    ['main', 'renderer'].forEach((bundle, index) =>
      fs.writeFileSync(
        path.join(manifests, `${bundle}.json`),
        JSON.stringify({
          bundle,
          buildId: `build-${index}`,
          modules: [path.join(dep, 'index.js')],
        }),
      ),
    );

    const run = runGenerator(
      `
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        collectShippedPackages: () =>
          real.collectShippedPackages({
            manifestDir: path.join(TMP, '.notices', 'modules'),
            repo: TMP,
          }),
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/different builds/);
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when there are no module manifests at all', () => {
    // An empty manifest directory is what a checkout that skipped `npm run build` looks like. The
    // npm half would come back empty, and an artifact describing only the .NET side would still
    // render, still say "Wrote THIRD-PARTY-NOTICES.md", and still exit 0.
    fs.mkdirSync(path.join(tmp, '.notices', 'modules'), { recursive: true });

    const run = runGenerator(
      `
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        collectShippedPackages: () =>
          real.collectShippedPackages({
            manifestDir: path.join(TMP, '.notices', 'modules'),
            repo: TMP,
          }),
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/no module manifests/);
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when the NuGet closure is truncated', () => {
    // A stale or partial restore yields a handful of packages rather than the real closure, and a
    // short .NET section is exactly the failure this generator exists to prevent.
    const run = runGenerator(`
      stub('./shipping-set', {
        collectShippedPackages: () => ({ packages: [], unresolvedStylesheetSpecifiers: [] }),
        // This case is about the .NET floor, and it supplies an empty npm set on purpose - so the
        // npm floor (exercised on its own below) is stubbed out rather than left to fire first.
        assertNpmFloor: (packages) => packages,
        // The real one reads the repository's own package-lock.json, which these
        // fixtures do not have and are not about.
        collectPlatformOnlyPackages: () => [],
        assertNpmNotShrunk: (packages) => packages,
        // Reads NOTICES_ACCEPT_SHRINK. No case here sets it and the shrink check above is stubbed
        // out anyway, so this only has to exist - it is listed because this stub is a whitelist of
        // what buildReport touches, not a partial overlay over the real module.
        acceptShrinkFromEnv: () => ({ accepted: false }),
        // The npm counterpart of missingDirectReferences, stubbed for the same reason it is:
        // these cases supply a deliberately small npm set, which the real cross-check would
        // report as dozens of unbundled declarations, drowning out what each case is about.
        readDirectDependencies: () => [],
        missingDirectDependencies: () => [],
      });
      const real = load('nuget-set.ts');
      stub('./nuget-set', {
        ...real,
        collectNugetPackages: () => real.assertFloor([{ name: 'OnlyOne', version: '1.0.0' }]),
        missingDirectReferences: () => [],
      });
    `);

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/expected at least 40/);
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when a license text matches below the confidence threshold', () => {
    // Sub-threshold is licensee saying "this resembles MIT but I will not stand behind it". Taking
    // it anyway would put an identifier in a legal document that nothing established.
    const dir = writePackage(tmp, 'sub-threshold', { version: '1.0.0', license: 'MIT' });

    const run = runGenerator(
      `
      emptyNuget();
      stub('./shipping-set', {
        // One package on purpose; the npm floor is exercised on its own below.
        assertNpmFloor: (packages) => packages,
        // The real one reads the repository's own package-lock.json, which these
        // fixtures do not have and are not about.
        collectPlatformOnlyPackages: () => [],
        assertNpmNotShrunk: (packages) => packages,
        // Reads NOTICES_ACCEPT_SHRINK. No case here sets it and the shrink check above is stubbed
        // out anyway, so this only has to exist - it is listed because this stub is a whitelist of
        // what buildReport touches, not a partial overlay over the real module.
        acceptShrinkFromEnv: () => ({ accepted: false }),
        // The npm counterpart of missingDirectReferences, stubbed for the same reason it is:
        // these cases supply a deliberately small npm set, which the real cross-check would
        // report as dozens of unbundled declarations, drowning out what each case is about.
        readDirectDependencies: () => [],
        missingDirectDependencies: () => [],
        collectShippedPackages: () => ({
          packages: [
            {
              ecosystem: 'npm',
              name: 'sub-threshold',
              version: '1.0.0',
              dir: ${JSON.stringify(dir)},
              reachedVia: ['main'],
            },
          ],
          unresolvedStylesheetSpecifiers: [],
          warmBundles: [],
        }),
      });
      stub('./identify', {
        identify: () =>
          new Map([
            [
              ${JSON.stringify(dir)},
              {
                dir: ${JSON.stringify(dir)},
                files: [
                  {
                    filename: 'LICENSE',
                    spdxId: 'MIT',
                    matcher: 'dice',
                    confidence: ${CONFIDENCE_THRESHOLD - 1},
                    sha256: 'a'.repeat(64),
                    text: 'almost the MIT license',
                  },
                ],
              },
            ],
          ]),
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/BLOCKED {2}npm:sub-threshold@1\.0\.0/);
    expect(run.stderr).toMatch(new RegExp(`${CONFIDENCE_THRESHOLD}% confidence`));
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when a license text no longer hashes to what the lock records', () => {
    // The quiet one: same package, same version, same identifier, different text. Nobody re-reads
    // a licence they have already cleared, so this is the drift a human would never catch.
    const dir = writePackage(
      tmp,
      'relicensed',
      { version: '1.0.0', license: 'MIT' },
      { LICENSE: 'MIT License\n\nCopyright (c) 2026 Somebody Else\n' },
    );

    const run = runGenerator(
      `
      emptyNuget();
      stub('./shipping-set', {
        // One package on purpose; the npm floor is exercised on its own below.
        assertNpmFloor: (packages) => packages,
        // The real one reads the repository's own package-lock.json, which these
        // fixtures do not have and are not about.
        collectPlatformOnlyPackages: () => [],
        assertNpmNotShrunk: (packages) => packages,
        // Reads NOTICES_ACCEPT_SHRINK. No case here sets it and the shrink check above is stubbed
        // out anyway, so this only has to exist - it is listed because this stub is a whitelist of
        // what buildReport touches, not a partial overlay over the real module.
        acceptShrinkFromEnv: () => ({ accepted: false }),
        // The npm counterpart of missingDirectReferences, stubbed for the same reason it is:
        // these cases supply a deliberately small npm set, which the real cross-check would
        // report as dozens of unbundled declarations, drowning out what each case is about.
        readDirectDependencies: () => [],
        missingDirectDependencies: () => [],
        collectShippedPackages: () => ({
          packages: [
            {
              ecosystem: 'npm',
              name: 'relicensed',
              version: '1.0.0',
              dir: ${JSON.stringify(dir)},
              reachedVia: ['main'],
            },
          ],
          unresolvedStylesheetSpecifiers: [],
          warmBundles: [],
        }),
      });
      stub('./identify', {
        identify: () =>
          new Map([
            [
              ${JSON.stringify(dir)},
              {
                dir: ${JSON.stringify(dir)},
                files: [
                  {
                    filename: 'LICENSE',
                    spdxId: 'MIT',
                    matcher: 'exact',
                    confidence: 100,
                    sha256: 'b'.repeat(64),
                    text: 'MIT License',
                  },
                ],
              },
            ],
          ]),
      });
      const realLock = load('lock.ts');
      stub('./lock', {
        ...realLock,
        readLock: () => ({
          licenseeVersion: '0.0.0-test',
          corpusVersion: load('corpus.ts').corpusVersion(),
          packages: [
            {
              ecosystem: 'npm',
              name: 'relicensed',
              version: '1.0.0',
              spdxId: 'MIT',
              confidence: 100,
              matchedFile: 'LICENSE',
              textSha256: 'c'.repeat(64),
            },
          ],
        }),
      });
      `,
      ['--verify'],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/license text changed under the same version and identifier/);
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when a required bundle has an EMPTY module list', () => {
    // Present-and-empty is the same silent under-report as absent, and the checks either side of
    // this one look only at the file's existence and its stamp: empty `modules` in
    // `.notices/modules/renderer.json` and the real command writes a 190-package artifact, exit 0.
    const manifests = path.join(tmp, '.notices', 'modules');
    fs.mkdirSync(manifests, { recursive: true });
    const dep = writePackage(tmp, 'dep', { version: '1.0.0', license: 'MIT' });
    fs.writeFileSync(
      path.join(manifests, 'main.json'),
      JSON.stringify({
        bundle: 'main',
        buildId: 'one-build',
        modules: [path.join(dep, 'index.js')],
      }),
    );
    fs.writeFileSync(
      path.join(manifests, 'renderer.json'),
      JSON.stringify({ bundle: 'renderer', buildId: 'one-build', modules: [] }),
    );

    const run = runGenerator(
      `
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        collectShippedPackages: () =>
          real.collectShippedPackages({
            manifestDir: path.join(TMP, '.notices', 'modules'),
            repo: TMP,
            requiredBundles: ['main', 'renderer'],
          }),
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/empty module list for renderer/);
    leavesTheCommittedArtifactUntouched();
  });

  it('exits non-zero when the npm shipping set is implausibly small', () => {
    // The npm mirror of the .NET floor above, and the case CI structurally cannot catch: all three
    // legs run the same webpack plugin, so a plugin regression produces short manifests everywhere,
    // Linux regenerates a correspondingly short document, `verify-changed-files` sees no diff, and
    // the per-platform shipping-set check compares short against short and passes.
    const dir = writePackage(tmp, 'lonely', { version: '1.0.0', license: 'MIT' });

    const run = runGenerator(
      `
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        // The real one reads the repository's own package-lock.json and would union its
        // platform-only packages into this fixture's set; this case is about the floor.
        collectPlatformOnlyPackages: () => [],
        collectShippedPackages: () => ({
          packages: [
            {
              ecosystem: 'npm',
              name: 'lonely',
              version: '1.0.0',
              dir: ${JSON.stringify(dir)},
              reachedVia: ['main'],
            },
          ],
          unresolvedStylesheetSpecifiers: [],
          warmBundles: [],
        }),
      });
      // One entry per directory asked about, which is detect.rb's contract: a package it did
      // not answer for is a package nothing is known about, and main.ts refuses that run rather
      // than treating it as a package that ships no licence file.
      stub('./identify', {
        identify: (dirs) => new Map(dirs.map((dir) => [dir, { dir, files: [] }])),
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/npm shipping set has 1 packages; expected at least/);
    leavesTheCommittedArtifactUntouched();
  });

  it('leaves the artifact untouched when writing the lock fails', () => {
    // The artifact and its lock are a PAIR: the lock is what `--verify` and the per-platform check
    // compare against, so a lock describing a different run than the document beside it is worse
    // than either being stale. Writing the document directly and the lock afterwards left a window
    // spanning a full render and serialize; both are staged and renamed now, so a failure between
    // them cannot leave a half-updated pair - and no `.tmp` file is left behind either.
    const dir = writePackage(tmp, 'fine', { version: '1.0.0', license: 'MIT' });

    const run = runGenerator(
      `
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        assertNpmFloor: (packages) => packages,
        // The real one reads the repository's own package-lock.json, which these
        // fixtures do not have and are not about.
        collectPlatformOnlyPackages: () => [],
        assertNpmNotShrunk: (packages) => packages,
        // Reads NOTICES_ACCEPT_SHRINK. No case here sets it and the shrink check above is stubbed
        // out anyway, so this only has to exist - it is listed because this stub is a whitelist of
        // what buildReport touches, not a partial overlay over the real module.
        acceptShrinkFromEnv: () => ({ accepted: false }),
        // The npm counterpart of missingDirectReferences, stubbed for the same reason it is:
        // these cases supply a deliberately small npm set, which the real cross-check would
        // report as dozens of unbundled declarations, drowning out what each case is about.
        readDirectDependencies: () => [],
        missingDirectDependencies: () => [],
        collectShippedPackages: () => ({
          packages: [
            {
              ecosystem: 'npm',
              name: 'fine',
              version: '1.0.0',
              dir: ${JSON.stringify(dir)},
              reachedVia: ['main'],
            },
          ],
          unresolvedStylesheetSpecifiers: [],
          warmBundles: [],
        }),
      });
      // One entry per directory asked about, which is detect.rb's contract: a package it did
      // not answer for is a package nothing is known about, and main.ts refuses that run rather
      // than treating it as a package that ships no licence file.
      stub('./identify', {
        identify: (dirs) => new Map(dirs.map((dir) => [dir, { dir, files: [] }])),
      });
      // A document that is recognisably NOT the committed one, so a write that lands is visible.
      stub('./render', { ...load('render.ts'), render: () => 'CLOBBERED\\n' });
      stub('./lock', {
        ...load('lock.ts'),
        writeLock: () => {
          throw new Error('disk full');
        },
      });
      `,
      [],
      tmp,
    );

    expect(run.status).not.toBe(0);
    // Pinned to the injected failure, like every other case in this file. Without it the three
    // assertions below hold for ANY non-zero exit taken before the writer is even reached - so the
    // atomicity this case is named for would go unexercised by the test that claims to prove it.
    expect(run.stderr).toMatch(/disk full/);
    leavesTheCommittedArtifactUntouched();
    expect(fs.existsSync(`${OUT}.tmp`)).toBe(false);
    expect(fs.existsSync(`${LOCK}.tmp`)).toBe(false);
  });

  it('keeps the staged lock when the document was renamed but the lock could not be', () => {
    // The one failure that cannot be undone: the document has already been replaced, so the pair on
    // disk now disagrees. Cleaning up unconditionally deleted the staged lock here - the ONLY copy
    // matching the document just written - which is the state the writer's own comment calls worse
    // than either being stale, with nothing left to rename by hand.
    //
    // `renameSync` is replaced with a no-op that throws on the SECOND call, so the run takes the
    // post-first-rename branch without the committed artifact ever being touched.
    const dir = writePackage(tmp, 'fine', { version: '1.0.0', license: 'MIT' });

    const run = runGenerator(
      `
      const fsModule = require('fs');
      let renames = 0;
      fsModule.renameSync = () => {
        renames += 1;
        if (renames === 2) throw new Error('lock is busy');
      };
      emptyNuget();
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        assertNpmFloor: (packages) => packages,
        // The real one reads the repository's own package-lock.json, which these
        // fixtures do not have and are not about.
        collectPlatformOnlyPackages: () => [],
        assertNpmNotShrunk: (packages) => packages,
        // Reads NOTICES_ACCEPT_SHRINK. No case here sets it and the shrink check above is stubbed
        // out anyway, so this only has to exist - it is listed because this stub is a whitelist of
        // what buildReport touches, not a partial overlay over the real module.
        acceptShrinkFromEnv: () => ({ accepted: false }),
        // The npm counterpart of missingDirectReferences, stubbed for the same reason it is:
        // these cases supply a deliberately small npm set, which the real cross-check would
        // report as dozens of unbundled declarations, drowning out what each case is about.
        readDirectDependencies: () => [],
        missingDirectDependencies: () => [],
        collectShippedPackages: () => ({
          packages: [
            {
              ecosystem: 'npm',
              name: 'fine',
              version: '1.0.0',
              dir: ${JSON.stringify(dir)},
              reachedVia: ['main'],
            },
          ],
          unresolvedStylesheetSpecifiers: [],
          warmBundles: [],
        }),
      });
      // One entry per directory asked about, which is detect.rb's contract: a package it did
      // not answer for is a package nothing is known about, and main.ts refuses that run rather
      // than treating it as a package that ships no licence file.
      stub('./identify', {
        identify: (dirs) => new Map(dirs.map((dir) => [dir, { dir, files: [] }])),
      });
      `,
      [],
      tmp,
    );

    try {
      expect(run.status).not.toBe(0);
      expect(run.stderr).toMatch(/was replaced but its lock could not be/);
      expect(run.stderr).toContain('THIRD-PARTY-NOTICES.lock.json.tmp');
      // The guarantee itself: the recovery copy the message points at is still on disk.
      expect(fs.existsSync(`${LOCK}.tmp`)).toBe(true);
      leavesTheCommittedArtifactUntouched();
    } finally {
      // The staged files are deliberately left behind by the run under test, so this case is the
      // one that has to remove them - an untracked file in the repository root fails CI's
      // changed-files check.
      fs.rmSync(`${OUT}.tmp`, { force: true });
      fs.rmSync(`${LOCK}.tmp`, { force: true });
    }
  });

  it('exits non-zero rather than writing the artifact on a non-Linux platform', () => {
    // Warning and overwriting would replace the committed artifact with a legitimately different
    // one: the npm closure a Windows or macOS install resolves is not the same closure.
    const result = spawnSync(process.execPath, [...TSX, path.join(DIR, 'main.ts')], {
      encoding: 'utf8',
      cwd: REPO,
      env: { ...process.env, NOTICES_FORCE_PLATFORM: 'win32' },
    });

    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/generated on Linux/);
    leavesTheCommittedArtifactUntouched();
  });
});

describe('NOTICES_FORCE_PLATFORM can only turn the write refusal ON', () => {
  // The override exists so this suite can exercise the non-Linux refusal on a Linux CI runner, and
  // its comment claimed it "cannot weaken the check". It could: setting it to `linux` on macOS or
  // Windows made the guard not fire and the generator overwrote the committed artifact. Proven the
  // only way it can be proven from Linux - by lying to the child about `process.platform`, which is
  // exactly what the environment variable was doing in the other direction.
  function runOnFakePlatform(actual: string, forced: string | undefined): Run {
    const script = `
      Object.defineProperty(process, 'platform', { value: ${JSON.stringify(actual)} });
      const path = require('path');
      process.argv = [process.argv[0], path.join(${JSON.stringify(DIR)}, 'main.ts')];
      require(path.join(${JSON.stringify(DIR)}, 'main.ts')).main();
    `;
    const env = { ...process.env };
    delete env.NOTICES_FORCE_PLATFORM;
    if (forced !== undefined) env.NOTICES_FORCE_PLATFORM = forced;
    const result = spawnSync(process.execPath, [...TSX, '-e', script], {
      encoding: 'utf8',
      cwd: REPO,
      env,
    });
    return {
      status: result.status ?? -1,
      stdout: result.stdout ?? '',
      stderr: result.stderr ?? '',
    };
  }

  it('still refuses on a non-Linux platform when the override names linux', () => {
    const run = runOnFakePlatform('win32', 'linux');
    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/generated on Linux/);
    expect(fs.readFileSync(OUT, 'utf8')).toBe(committedArtifact);
  });

  it('still turns the refusal ON, which is what the override is for', () => {
    const run = runOnFakePlatform('linux', 'darwin');
    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/this is darwin/);
    expect(fs.readFileSync(OUT, 'utf8')).toBe(committedArtifact);
  });
});

describe('the degraded conditions themselves', () => {
  // The exit codes above are what CI reads; these pin the messages a developer reads, which are
  // the part that says what to run next.
  it('names the incomplete tree and the command that repairs it', () => {
    const manifests = path.join(tmp, '.notices', 'modules');
    fs.mkdirSync(manifests, { recursive: true });
    fs.mkdirSync(path.join(tmp, 'node_modules', 'ghost'), { recursive: true });
    fs.writeFileSync(
      path.join(manifests, 'main.json'),
      JSON.stringify({
        bundle: 'main',
        buildId: 'one-build',
        modules: [path.join(tmp, 'node_modules', 'ghost', 'index.js')],
      }),
    );

    expect(() => collectShippedPackages({ manifestDir: manifests, repo: tmp })).toThrow(
      /npm ci && npm run build/,
    );
  });

  it('names the rebuild that repairs an empty manifest, and the bundle that is empty', () => {
    const manifests = path.join(tmp, '.notices', 'modules');
    fs.mkdirSync(manifests, { recursive: true });
    fs.writeFileSync(
      path.join(manifests, 'main.json'),
      JSON.stringify({ bundle: 'main', buildId: 'one-build', modules: [] }),
    );

    expect(() =>
      collectShippedPackages({ manifestDir: manifests, repo: tmp, requiredBundles: ['main'] }),
    ).toThrow(/empty module list for main/);
    expect(() =>
      collectShippedPackages({ manifestDir: manifests, repo: tmp, requiredBundles: ['main'] }),
    ).toThrow(/rm -rf \.notices && npm run build/);
  });

  it('names the reinstall that repairs an implausibly small npm set', () => {
    expect(() => assertNpmFloor([])).toThrow(/npm ci && npm run build/);
    expect(NPM_MIN_PACKAGES).toBeGreaterThan(20);
  });

  it('names the restore that repairs a truncated NuGet closure', () => {
    expect(() => assertFloor([])).toThrow(/dotnet restore/);
    expect(DOTNET_MIN_PACKAGES).toBeGreaterThan(8);
  });
});
