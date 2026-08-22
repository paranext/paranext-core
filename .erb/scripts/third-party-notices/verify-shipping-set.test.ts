/**
 * Proves `main.js --verify-shipping-set` - the cheap cross-platform check the Windows and macOS CI
 * legs run (see the module docstring in `main.js` and ADR-0024) - does what it exists to do:
 *
 * - Never touches Ruby (`identify`/`bundle exec ruby`) or NuGet (`nuget-set.js`/`dotnet`), so it
 *   costs nothing on a platform that has neither installed;
 * - Passes when this platform's resolved npm packages match the npm half of the committed lock;
 * - Fails loudly, naming the package(s), on a genuine divergence in EITHER direction - a package this
 *   platform ships that the lock does not record, or one the lock records that this platform does
 *   not ship;
 * - Runs on a non-Linux platform at all, unlike the unqualified (write) path.
 *
 * Each case spawns the real `main.js` in a child process, mirroring `degradation.test.ts`'s
 * approach: the assertion that actually matters is the process exit code CI reads, not that some
 * function throws. `bundle` and every `nuget-set.js` export are stubbed to THROW rather than to
 * fake a value (the inverse of `degradation.test.ts`'s stubs) - if `--verify-shipping-set` ever
 * regresses into calling `buildReport`, these tests fail on that call, not just on a wrong
 * outcome.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const DIR = __dirname;
const REPO = path.resolve(__dirname, '..', '..', '..');

type Run = { status: number; stdout: string; stderr: string };

/**
 * Runs the real `main.js --verify-shipping-set` in a child process, with `setup` evaluated first.
 *
 * `setup` runs with `load`/`stub`/`TMP` in scope - see `degradation.test.ts` for why seeding
 * `require.cache` (rather than editing `main.js`) is what keeps `main.js` itself under test.
 *
 * `bundle` and every `nuget-set.js` export throw unconditionally, before `setup` runs, so a test
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
  throw new Error('--verify-shipping-set must never call nuget-set.js#' + name + ' (dotnet)');
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
  identifyText: throwing('identifyText'),
});

${setup}

process.argv = [process.argv[0], path.join(DIR, 'main.js'), '--verify-shipping-set'];
load('main.js').main();
`;
  const result = spawnSync(process.execPath, ['-e', script], {
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
      assertNpmNotShrunk: (packages) => packages,
      collectShippedPackages: () => ({
        packages: ${JSON.stringify(packages.map((p) => ({ ecosystem: 'npm', ...p, dir: '/x', reachedVia: ['main'] })))},
        unresolvedStylesheetSpecifiers: [],
        warmBundles: [],
      }),
    });
  `;
}

/** Seeds a fake committed lock holding exactly the given npm packages. */
function stubLock(packages: { name: string; version: string }[]) {
  return `
    const realLock = load('lock.js');
    stub('./lock', {
      ...realLock,
      readLock: () => ({
        licenseeVersion: '0.0.0-test',
        corpusVersion: '0.0.0-test',
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
    expect(run.stdout).toMatch(/Verified 2 npm packages/);
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
      const real = load('shipping-set.js');
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
