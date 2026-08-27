/**
 * Proves `main.ts --verify-shipping-set` - the cheap cross-platform check the Windows and macOS CI
 * legs run (see the module docstring in `main.ts` and `adr-notices-derived-from-what-ships`) - does
 * what it exists to do:
 *
 * - Never touches Ruby (`identify`/`bundle exec ruby`) or NuGet (`nuget-set.ts`/`dotnet`), so it
 *   costs nothing on a platform that has neither installed;
 * - Passes when this platform's resolved npm packages match the npm half of the committed lock;
 * - Fails loudly, naming the package(s), on a genuine divergence in EITHER direction - a package this
 *   platform ships that the lock does not record, or one the lock records that this platform does
 *   not ship;
 * - Runs on a non-Linux platform at all, unlike the unqualified (write) path.
 *
 * Each case spawns the real `main.ts` in a child process, mirroring `degradation.test.ts`'s
 * approach: the assertion that actually matters is the process exit code CI reads, not that some
 * function throws. `bundle` and every `nuget-set.ts` export are stubbed to THROW rather than to
 * fake a value (the inverse of `degradation.test.ts`'s stubs) - if `--verify-shipping-set` ever
 * regresses into calling `buildReport`, these tests fail on that call, not just on a wrong
 * outcome.
 */

import { spawnSync } from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { alwaysListedPackages, inCi, withPlatformOnlyPackages } from './main';

/**
 * Registers tsx in the child, so it can `require` this pipeline's `.ts` modules.
 *
 * The same loader `npm run build:third-party-notices` runs the generator with, so what these cases
 * drive is the shipped entry point rather than a separately compiled copy of it.
 */
const TSX = ['--import', 'tsx'];

const DIR = __dirname;
const REPO = path.resolve(__dirname, '..', '..', '..');

type Run = { status: number; stdout: string; stderr: string };

/**
 * Runs the real `main.ts --verify-shipping-set` in a child process, with `setup` evaluated first.
 *
 * `setup` runs with `load`/`stub`/`TMP` in scope - see `degradation.test.ts` for why seeding
 * `require.cache` (rather than editing `main.ts`) is what keeps `main.ts` itself under test.
 *
 * `bundle` and every `nuget-set.ts` export throw unconditionally, before `setup` runs, so a test
 * cannot accidentally leave them working - proving Ruby and dotnet are not merely unused by the
 * fixtures below, but unreachable from this code path at all.
 */
function runVerifyShippingSet(
  setup: string,
  envOverrides: Record<string, string> = {},
  tmp = '',
): Run {
  const script = `
const path = require('path');
const DIR = ${JSON.stringify(DIR)};
const TMP = ${JSON.stringify(tmp)};

const childProcess = require('child_process');
childProcess.execFileSync = (file) => {
  throw new Error('--verify-shipping-set must never shell out to ' + file + ' (Ruby/licensee)');
};

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

// Proves the NuGet path (dotnet restore, nuget-license) is unreachable from
// --verify-shipping-set: any call into it fails the run loudly rather than silently doing nothing.
const throwing = (name) => () => {
  throw new Error('--verify-shipping-set must never call nuget-set.ts#' + name + ' (dotnet)');
};
stub('./nuget-set', {
  collectNugetPackages: throwing('collectNugetPackages'),
  missingDirectReferences: throwing('missingDirectReferences'),
  readDirectPackageReferences: throwing('readDirectPackageReferences'),
  assertFloor: throwing('assertFloor'),
  DOTNET_PROJECT: 'unused',
});
// Same proof for licence identification.
stub('./identify', {
  identify: throwing('identify'),
});

${setup}

process.argv = [process.argv[0], path.join(DIR, 'main.ts'), '--verify-shipping-set'];
load('main.ts').main();
`;
  const result = spawnSync(process.execPath, [...TSX, '-e', script], {
    encoding: 'utf8',
    cwd: REPO,
    env: { ...process.env, ...envOverrides },
  });
  return { status: result.status ?? -1, stdout: result.stdout ?? '', stderr: result.stderr ?? '' };
}

/** Seeds a fake `collectShippedPackages` returning exactly the given npm packages. */
function stubShippedPackages(packages: { name: string; version: string }[]) {
  return `
    stub('./shipping-set', {
      // These cases are about the lock DIFF, and they deliberately supply two-package sets - so the
      // plausibility floor the real call site applies is stubbed out rather than left to fire
      // first. The floor has its own falsifying cases in degradation.test.ts and shipping-set.test.ts.
      assertNpmFloor: (packages) => packages,
      // The real one reads the repository's own package-lock.json, which these
      // fixtures do not have and are not about.
      collectPlatformOnlyPackages: () => [],
      assertNpmNotShrunk: (packages) => packages,
      collectShippedPackages: () => ({
        packages: ${JSON.stringify(packages.map((p) => ({ ecosystem: 'npm', ...p, dir: '/x', reachedVia: ['main'] })))},
        unresolvedStylesheetSpecifiers: [],
        warmBundles: [],
      }),
    });
  `;
}

/** The sha256 of the committed notices document, which the child reads from the real repository. */
const committedDocumentSha256 = crypto
  .createHash('sha256')
  .update(fs.readFileSync(path.join(REPO, 'THIRD-PARTY-NOTICES.md'), 'utf8'), 'utf8')
  .digest('hex');

/**
 * Seeds a fake committed lock holding exactly the given npm packages.
 *
 * `documentSha256` is the REAL committed document's hash by default, because these cases are about
 * the shipping-set half and the document half runs first: a fixture that recorded no hash would
 * fail every one of them on the wrong check. Pass a different value to exercise the document half.
 */
function stubLock(
  packages: { name: string; version: string }[],
  documentSha256: string = committedDocumentSha256,
) {
  return `
    const realLock = load('lock.ts');
    stub('./lock', {
      ...realLock,
      readLock: () => ({
        licenseeVersion: '0.0.0-test',
        corpusVersion: '0.0.0-test',
        documentSha256: ${JSON.stringify(documentSha256)},
        packages: ${JSON.stringify(packages.map((p) => ({ ecosystem: 'npm', ...p })))},
      }),
    });
  `;
}

let tmp: string;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-shipping-set-'));
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe('--verify-shipping-set', () => {
  it('passes, and needs no Ruby or dotnet, when the npm sets match', () => {
    const packages = [
      { name: 'a', version: '1.0.0' },
      { name: 'b', version: '2.0.0' },
    ];
    const run = runVerifyShippingSet(stubShippedPackages(packages) + stubLock(packages));

    expect(run.status).toBe(0);
    expect(run.stdout).toMatch(
      /Verified THIRD-PARTY-NOTICES\.md against the hash its lock records/,
    );
    expect(run.stdout).toMatch(/2 npm packages/);
    expect(run.stderr).toBe('');
  });

  it('fails, naming the package, when this platform ships one the lock does not record', () => {
    const run = runVerifyShippingSet(
      stubShippedPackages([
        { name: 'a', version: '1.0.0' },
        { name: 'windows-only-optional-dep', version: '3.1.4' },
      ]) + stubLock([{ name: 'a', version: '1.0.0' }]),
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/does not match the committed lock/);
    expect(run.stderr).toMatch(/added: windows-only-optional-dep@3\.1\.4/);
  });

  it('fails, naming the package, when the lock records one this platform does not ship', () => {
    const run = runVerifyShippingSet(
      stubShippedPackages([{ name: 'a', version: '1.0.0' }]) +
        stubLock([
          { name: 'a', version: '1.0.0' },
          { name: 'linux-only-optional-dep', version: '2.7.1' },
        ]),
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/removed: linux-only-optional-dep@2\.7\.1/);
  });

  it('fails, naming both packages, on a two-sided divergence', () => {
    const run = runVerifyShippingSet(
      stubShippedPackages([{ name: 'only-on-this-platform', version: '1.0.0' }]) +
        stubLock([{ name: 'only-on-linux', version: '1.0.0' }]),
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/added: only-on-this-platform@1\.0\.0/);
    expect(run.stderr).toMatch(/removed: only-on-linux@1\.0\.0/);
  });

  // The two floors measure the DERIVED set, and a warm webpack cache is the one condition under
  // which that set is known to be possibly short - so the order between them and the warm-cache
  // skip decides whether this run reports a fact or a fabrication. Floors first turns "this run
  // cannot answer its question" into a confident failure on any twice-built tree, and the remedy
  // that failure prints is the one flag that commits the short set.
  it('reports a warm cache rather than a fabricated shrink', () => {
    // The REAL floors are left in place here, unlike every other case in this file: they are what
    // the ordering is about, and stubbing them out would make this pass whatever the order.
    const run = runVerifyShippingSet(`
      const realShipping = load('shipping-set.ts');
      stub('./shipping-set', {
        ...realShipping,
        collectPlatformOnlyPackages: () => [],
        collectShippedPackages: () => ({
          packages: [{ ecosystem: 'npm', name: 'a', version: '1.0.0', dir: '/x', reachedVia: ['main'] }],
          unresolvedStylesheetSpecifiers: [],
          warmBundles: ['renderer'],
        }),
      });
    `);

    expect(run.stdout).toContain('Skipped the npm shipping set: renderer');
    expect(run.stdout).toContain('rm -rf node_modules/.cache/webpack-*');
    // The DOCUMENT half still ran: it compares two committed files and reads no manifest, so a warm
    // cache says nothing about whether it can answer.
    expect(run.stdout).toContain('against the hash its lock records');
    // The floor would have said this, about a set it had no business trusting.
    expect(run.stderr).not.toContain('expected at least');
    expect(run.stderr).toBe('');
    expect(run.status).toBe(0);
  });

  it('fails on a hand-edited document, the half the release workflows had no check for', () => {
    // `--verify-shipping-set` is the ONLY notices gate `publish.yml` and `package-main.yml` run, and
    // it compared npm `name@version` and nothing else - so THIRD-PARTY-NOTICES.md, which
    // electron-builder packs into every installer, reached those artifacts unverified. Delete a
    // copyleft row or swap a licence text and every field the lock records stays identical.
    const packages = [{ name: 'a', version: '1.0.0' }];
    const run = runVerifyShippingSet(
      stubShippedPackages(packages) + stubLock(packages, 'f'.repeat(64)),
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toContain('THIRD-PARTY-NOTICES.md');
    expect(run.stderr).toContain('edited by hand');
    expect(run.stderr).toContain('npm run build:third-party-notices');
  });

  it('refuses a lock that records no document hash rather than reading silence as agreement', () => {
    const packages = [{ name: 'a', version: '1.0.0' }];
    const run = runVerifyShippingSet(
      stubShippedPackages(packages) +
        stubLock(packages).replace(/documentSha256: "[0-9a-f]+",/, ''),
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toContain('records no documentSha256');
  });

  // The `report` mode above exists for a LOCAL run, where a twice-built tree is the normal state.
  // In CI every workflow runs this immediately after the job's first build, so a warm stamp is a
  // real anomaly - and skipping there would turn the one leg that checks Windows and macOS into a
  // step that silently passes without comparing anything. Which mode is selected is therefore part
  // of the contract, and it was asserted nowhere: only the `report` branch had a case.
  it('asks for a refusal rather than a report when CI is set', () => {
    const run = runVerifyShippingSet(
      `
      const realShipping = load('shipping-set.ts');
      stub('./shipping-set', {
        ...realShipping,
        collectPlatformOnlyPackages: () => [],
        collectShippedPackages: (options) => {
          console.log('warmCache=' + options.warmCache);
          return {
            packages: [{ ecosystem: 'npm', name: 'a', version: '1.0.0', dir: '/x', reachedVia: ['main'] }],
            unresolvedStylesheetSpecifiers: [],
            warmBundles: [],
          };
        },
      });
    ${stubLock([{ name: 'a', version: '1.0.0' }])}`,
      { CI: '1' },
    );

    expect(run.stdout).toContain('warmCache=throw');
  });

  it('asks for a report rather than a refusal when CI is not set', () => {
    const run = runVerifyShippingSet(
      `
      const realShipping = load('shipping-set.ts');
      stub('./shipping-set', {
        ...realShipping,
        collectPlatformOnlyPackages: () => [],
        collectShippedPackages: (options) => {
          console.log('warmCache=' + options.warmCache);
          return {
            packages: [{ ecosystem: 'npm', name: 'a', version: '1.0.0', dir: '/x', reachedVia: ['main'] }],
            unresolvedStylesheetSpecifiers: [],
            warmBundles: [],
          };
        },
      });
    ${stubLock([{ name: 'a', version: '1.0.0' }])}`,
      { CI: '' },
    );

    expect(run.stdout).toContain('warmCache=report');
  });

  it('runs on a non-Linux platform, unlike the unqualified (write) path', () => {
    const packages = [{ name: 'a', version: '1.0.0' }];
    const run = runVerifyShippingSet(stubShippedPackages(packages) + stubLock(packages), {
      NOTICES_FORCE_PLATFORM: 'win32',
    });

    expect(run.status).toBe(0);
    expect(run.stderr).not.toMatch(/generated on Linux/);
  });

  it('fails closed when the module manifests are missing, the same as the full pipeline', () => {
    // A checkout that skipped `npm run build` looks like this. `--verify-shipping-set` reads the
    // real, un-stubbed collectShippedPackages here, against an empty manifest directory.
    const manifests = path.join(tmp, '.notices', 'modules');
    fs.mkdirSync(manifests, { recursive: true });

    const run = runVerifyShippingSet(
      `
      const real = load('shipping-set.ts');
      stub('./shipping-set', {
        ...real,
        collectShippedPackages: () =>
          real.collectShippedPackages({ manifestDir: path.join(TMP, '.notices', 'modules'), repo: TMP }),
      });
      `,
      {},
      tmp,
    );

    expect(run.status).not.toBe(0);
    expect(run.stderr).toMatch(/no module manifests/);
  });
});

describe('the platform-only union both sides of the check apply', () => {
  // The failure this closes, seen on the macOS CI leg: `fsevents` is a macOS-only optional
  // dependency of `chokidar`, which the `main` and `extension-host` bundles reach. npm installs it
  // only on macOS, so the Linux-generated lock did not record it, and macOS derived a set that had
  // it - `added: fsevents@2.3.3`, on every macOS run, with no way for a Linux regeneration to
  // resolve it. The document now lists it from `package-lock.json`, which means BOTH sides of the
  // comparison have to union the same way.
  const policy = { platformOnlyPackages: ['fsevents'] };
  const npm = (name: string, version: string, extra: object = {}) => ({
    ecosystem: 'npm',
    name,
    version,
    dir: `/x/${name}`,
    reachedVia: ['main'],
    ...extra,
  });

  it('adds the package on a platform that does not install it', () => {
    // The Linux and Windows case: nothing observed it, so the lockfile is the only source there is.
    const united = withPlatformOnlyPackages([npm('chokidar', '3.6.0')], policy);
    expect(united.map((pkg) => pkg.name).sort()).toEqual(['chokidar', 'fsevents']);
    expect(united.find((pkg) => pkg.name === 'fsevents')).toMatchObject({
      version: '2.3.3',
      platformOnly: true,
      inspected: false,
    });
  });

  it('adds no second row on the platform that DOES install it', () => {
    // The macOS case. The module graph already reported it, from a real directory whose licence
    // text was read; a second row from the policy would duplicate the package in the document and
    // in the lock.
    const observed = npm('fsevents', '2.3.3');
    const united = withPlatformOnlyPackages([npm('chokidar', '3.6.0'), observed], policy);
    expect(united.filter((pkg) => pkg.name === 'fsevents')).toEqual([observed]);
    expect(united.find((pkg) => pkg.name === 'fsevents')?.platformOnly).toBeUndefined();
  });

  it('is a no-op for a policy that lists none', () => {
    const packages = [npm('chokidar', '3.6.0')];
    expect(withPlatformOnlyPackages(packages, {})).toEqual(packages);
  });
});

describe('inCi', () => {
  // `warmCache: process.env.CI ? 'throw' : 'report'` is a truthiness test on a STRING, so `CI=false`
  // and `CI=0` - the two spellings somebody uses to say the opposite - both chose the CI branch and
  // hard-failed on a condition the check had explicitly decided not to fail on locally. The same
  // defect was fixed in `acceptShrinkFromEnv`; this pins the pipeline's other environment read.
  it.each([
    ['true', true],
    ['1', true],
    ['TRUE', true],
    ['yes', true],
    [undefined, false],
    ['', false],
    ['  ', false],
    ['false', false],
    ['0', false],
    ['off', false],
    ['no', false],
  ])('reads CI=%s as %s', (value, expected) => {
    expect(inCi(value === undefined ? {} : { CI: value })).toBe(expected);
  });
});

describe('alwaysListedPackages', () => {
  const policy = {
    allowed: [],
    copyleft: [],
    elections: {},
    exceptions: [],
    overrides: {
      'nuget:Microsoft.ICU.ICU4C.Runtime': {
        license: 'Unicode-DFS-2016',
        alwaysList: true,
        versionIndependent: true,
      },
    },
  };

  it('takes the version from the project file however either side spells the id', () => {
    // NuGet ids are case-insensitive, so a policy key and a csproj `Include` are two legal
    // spellings of one package - and every other id comparison in this pipeline lower-cases before
    // matching. This one did not, and the falsy `||` behind it wrote an em dash into the document
    // and the lock as the VERSION of a shipped Windows dependency, with the build green.
    const [listed] = alwaysListedPackages(
      policy,
      [],
      [{ id: 'microsoft.icu.icu4c.runtime', version: '72.1.0.3' }],
    );
    expect(listed).toMatchObject({ name: 'Microsoft.ICU.ICU4C.Runtime', version: '72.1.0.3' });
  });

  it('still records that no version was found when the project declares none', () => {
    // The permissiveness control: the fallback has to keep firing where it should.
    const [listed] = alwaysListedPackages(policy, [], [{ id: 'something.else', version: '1.0.0' }]);
    expect(listed.version).toBe('—');
  });

  it('lists nothing for a package the closure already contains', () => {
    expect(alwaysListedPackages(policy, [{ name: 'MICROSOFT.ICU.ICU4C.RUNTIME' }], [])).toEqual([]);
  });
});
