import { execFile, execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { PINNED_COMMIT_BRANCH } from './stage-dev-packages.util';

/**
 * Runs the real `stage-dev-packages.ts` against real git repositories: a bare "remote" on disk
 * standing in for the dev repo, and a stand-in for this repo holding only what the script reads.
 * `decideCheckout` is unit-tested on its own; this covers what the script does with the answer.
 */

const FOLDER = 'editor';
/** Staging one package runs `npm pack`, and each scenario stages several times. */
const TIMEOUT_MS = 120_000;

let root: string;
let remote: string;
/** Two commits on the remote's `main`, older first. */
let pinA: string;
let pinB: string;
/** A commit that only the tag `off-branch` holds: on no branch of the remote. */
let tagOnlyCommit: string;
let coreCount = 0;

function git(cwd: string, ...args: string[]): string {
  return execFileSync(
    'git',
    [
      '-c',
      'user.name=Test',
      '-c',
      'user.email=test@example.com',
      '-c',
      'commit.gpgsign=false',
    ].concat(args),
    { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
  ).trim();
}

function commit(cwd: string, message: string): string {
  fs.writeFileSync(path.join(cwd, 'pkg', 'dist', 'index.js'), `// ${message}\n`);
  git(cwd, 'add', '-A');
  git(cwd, 'commit', '-m', message);
  return git(cwd, 'rev-parse', 'HEAD');
}

/** A stand-in for this repo: the two scripts, and a `dev-packages.json` written per run. */
function makeCore(): { core: string; clone: string } {
  coreCount += 1;
  const core = path.join(root, `core-${coreCount}`, 'core');
  fs.mkdirSync(path.join(core, '.erb', 'scripts'), { recursive: true });
  ['stage-dev-packages.ts', 'stage-dev-packages.util.ts'].forEach((file) =>
    fs.copyFileSync(path.join(__dirname, file), path.join(core, '.erb', 'scripts', file)),
  );
  return { core, clone: path.join(core, 'dev-packages', FOLDER) };
}

type StageResult = { status: number; output: string };

/**
 * Pins `revision` and runs the staging script, as `npm install`'s `preinstall` does.
 *
 * Asynchronously: the script takes seconds per run on a slow runner, and a test file that blocks
 * its worker for a minute in total stops the worker answering the test runner at all.
 */
function stage(
  core: string,
  revision: string,
  formerPinBranches: string[] = [],
): Promise<StageResult> {
  fs.writeFileSync(
    path.join(core, 'dev-packages.json'),
    JSON.stringify({
      repos: [
        {
          folder: FOLDER,
          cloneUrl: remote,
          revision,
          formerPinBranches,
          devPackages: [{ nxProject: 'pkg', packagePath: 'pkg', stagingFolder: 'pkg' }],
        },
      ],
    }),
  );
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      ['.erb/scripts/stage-dev-packages.ts'],
      { cwd: core, encoding: 'utf8', timeout: 90_000 },
      (error, stdout, stderr) => {
        // A non-zero exit is a result the scenarios assert on; a child that was killed, or never
        // started, is not.
        if (error && typeof error.code !== 'number') {
          reject(error);
          return;
        }
        resolve({ status: error ? Number(error.code) : 0, output: `${stdout}\n${stderr}` });
      },
    );
  });
}

/** `stage`, for the steps that only set a scenario up: fails the test if staging did. */
async function stageOk(
  core: string,
  revision: string,
  formerPinBranches: string[] = [],
): Promise<void> {
  const result = await stage(core, revision, formerPinBranches);
  if (result.status !== 0) throw new Error(`staging ${revision} failed:\n${result.output}`);
}

function stagedFrom(core: string): string {
  return fs
    .readFileSync(path.join(core, 'dev-packages', 'staging', 'pkg', '.staged-from'), 'utf8')
    .split(' ')[0];
}

function head(clone: string): { commit: string; branch: string } {
  return {
    commit: git(clone, 'rev-parse', 'HEAD'),
    branch: git(clone, 'rev-parse', '--abbrev-ref', 'HEAD'),
  };
}

function rescueRefs(clone: string): string {
  return git(clone, 'for-each-ref', '--format=%(refname)', 'refs/stage-rescue');
}

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'stage-dev-packages-'));
  // Forward slashes on every platform: git stores a clone's origin that way on Windows, and the
  // script compares the stored origin with this string.
  remote = path.join(root, 'remote.git').replace(/\\/g, '/');
  git(root, 'init', '--bare', '--initial-branch=main', remote);

  const seed = path.join(root, 'seed');
  git(root, 'clone', remote, seed);
  fs.mkdirSync(path.join(seed, 'pkg', 'dist'), { recursive: true });
  fs.writeFileSync(
    path.join(seed, 'pkg', 'package.json'),
    JSON.stringify({ name: 'pkg', version: '1.0.0', main: 'dist/index.js', files: ['dist'] }),
  );
  git(seed, 'checkout', '-B', 'main');
  pinA = commit(seed, 'A');
  // A pinned branch that does not contain `main`'s later commit, as a release branch does not.
  git(seed, 'checkout', '-b', 'release');
  commit(seed, 'release only');
  git(seed, 'checkout', 'main');
  pinB = commit(seed, 'B');
  git(seed, 'tag', '-a', 'on-main', '-m', 'on main', pinA);
  git(seed, 'checkout', '--detach', pinA);
  tagOnlyCommit = commit(seed, 'held by a tag only');
  git(seed, 'tag', '-a', 'off-branch', '-m', 'off every branch');
  git(seed, 'push', 'origin', 'main', 'release', 'on-main', 'off-branch');
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
});

describe('stage-dev-packages checkout, against real git', () => {
  it(
    'follows a commit pin from A to B and back in the clone it made',
    async () => {
      const { core, clone } = makeCore();

      expect((await stage(core, pinA)).status).toBe(0);
      expect(head(clone)).toEqual({ commit: pinA, branch: PINNED_COMMIT_BRANCH });
      expect(stagedFrom(core)).toBe(pinA);

      expect((await stage(core, pinB)).status).toBe(0);
      expect(head(clone)).toEqual({ commit: pinB, branch: PINNED_COMMIT_BRANCH });
      expect(stagedFrom(core)).toBe(pinB);

      const back = await stage(core, pinA);
      expect(back.status).toBe(0);
      expect(head(clone)).toEqual({ commit: pinA, branch: PINNED_COMMIT_BRANCH });
      // B is on the remote, so moving the branch off it loses nothing and parks nothing.
      expect(rescueRefs(clone)).toBe('');
      expect(back.output).not.toContain('MOVED ASIDE');
    },
    TIMEOUT_MS,
  );

  it(
    'leaves a checkout a person detached where it is, install after install',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);
      git(clone, 'checkout', '--detach', pinA);

      // Twice: the first run stages from the detached commit and records it as staged, which must
      // not make the second run take the checkout for one staging placed.
      const first = await stage(core, pinB);
      expect(first.status).toBe(0);
      expect(first.output).toContain('Leaving it alone');
      expect(head(clone)).toEqual({ commit: pinA, branch: 'HEAD' });

      const second = await stage(core, pinB);
      expect(second.status).toBe(0);
      expect(second.output).toContain('Leaving it alone');
      expect(head(clone)).toEqual({ commit: pinA, branch: 'HEAD' });
    },
    TIMEOUT_MS,
  );

  it(
    "leaves a checkout on somebody's own branch where it is",
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);
      git(clone, 'checkout', '-b', 'my-editor-fix', pinA);

      const result = await stage(core, pinB);

      expect(result.status).toBe(0);

      expect(result.output).toContain('is on "my-editor-fix"');
      expect(head(clone)).toEqual({ commit: pinA, branch: 'my-editor-fix' });
    },
    TIMEOUT_MS,
  );

  it(
    'moves a checkout off a declared former pin branch, and not off an undeclared one',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, 'release');
      expect(head(clone).branch).toBe('release');

      expect((await stage(core, pinB)).output).toContain('is on "release"');
      expect(head(clone).branch).toBe('release');

      await stageOk(core, pinB, ['release']);
      expect(head(clone)).toEqual({ commit: pinB, branch: PINNED_COMMIT_BRANCH });
    },
    TIMEOUT_MS,
  );

  it(
    'parks a commit made on the branch staging owns before re-pointing that branch',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);
      await stageOk(core, pinA);
      const local = commit(clone, 'local work');

      const result = await stage(core, pinB);

      expect(result.status).toBe(0);

      expect(head(clone)).toEqual({ commit: pinB, branch: PINNED_COMMIT_BRANCH });
      expect(result.output).toContain('MOVED ASIDE');
      const parked = rescueRefs(clone);
      expect(parked).toContain(`refs/stage-rescue/${PINNED_COMMIT_BRANCH}/`);
      expect(git(clone, 'rev-parse', parked)).toBe(local);
    },
    TIMEOUT_MS,
  );

  it(
    'reports nothing as unpushed when the pin goes from a commit to a branch without that commit',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);
      await stageOk(core, pinA);
      await stageOk(core, pinB);
      expect(head(clone).branch).toBe(PINNED_COMMIT_BRANCH);

      const result = await stage(core, 'release');

      expect(result.status).toBe(0);

      // The control: the checkout did move, so a notice had its chance to appear.
      expect(head(clone).branch).toBe('release');
      expect(result.output).not.toContain('MOVED ASIDE');
      expect(rescueRefs(clone)).toBe('');
    },
    TIMEOUT_MS,
  );

  it(
    'parks a commit left on the local pinned branch when the pin names that branch again',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, 'release');
      const local = commit(clone, 'local work on the pinned branch');
      // The pin becomes a commit: staging moves the checkout off `release` and leaves that local
      // branch, with its commit, as it is.
      await stageOk(core, pinB, ['release']);
      expect(head(clone).branch).toBe(PINNED_COMMIT_BRANCH);
      expect(git(clone, 'rev-parse', 'refs/heads/release')).toBe(local);

      const result = await stage(core, 'release');

      expect(result.status).toBe(0);

      expect(head(clone).branch).toBe('release');
      expect(head(clone).commit).not.toBe(local);
      expect(result.output).toContain('MOVED ASIDE');
      expect(git(clone, 'rev-parse', rescueRefs(clone))).toBe(local);
    },
    TIMEOUT_MS,
  );

  it(
    'stages a tag pin on the branch staging owns',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);

      await stageOk(core, 'on-main');

      expect(head(clone)).toEqual({ commit: pinA, branch: PINNED_COMMIT_BRANCH });
      expect(stagedFrom(core)).toBe(pinA);
    },
    TIMEOUT_MS,
  );

  it(
    'treats a commit that only a pushed tag holds as pushed',
    async () => {
      const { core, clone } = makeCore();

      await stageOk(core, 'off-branch');

      expect(head(clone).commit).toBe(tagOnlyCommit);
      // Exactly the commit: an `-unpushed` suffix here blocks committing the lockfile.
      expect(stagedFrom(core)).toBe(tagOnlyCommit);
    },
    TIMEOUT_MS,
  );

  it(
    'does not judge whether the remote holds the pin when the fetch was skipped',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);
      git(clone, 'checkout', '-b', 'never-pushed');
      const unpushed = commit(clone, 'only on this machine');
      git(clone, 'checkout', 'main');

      process.env.PT_SKIP_DEV_PACKAGE_FETCH = '1';
      let result: StageResult;
      try {
        result = await stage(core, unpushed);
      } finally {
        delete process.env.PT_SKIP_DEV_PACKAGE_FETCH;
      }

      // Without a fetch the checkout's refs can be older than the remote, so they cannot show that
      // the remote lacks a commit.
      expect(result.output).toContain('Skipping the fetch');
      expect(result.status).toBe(0);
    },
    TIMEOUT_MS,
  );

  it(
    'keeps the record of commits an earlier run parked when a later run fails before parking any',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);
      await stageOk(core, pinA);
      commit(clone, 'local work');
      await stageOk(core, pinB);
      const record = path.join(core, 'dev-packages', '.stage-rescues.json');
      expect(fs.existsSync(record)).toBe(true);

      const failed = await stage(core, 'no-such-revision');

      expect(failed.status).toBe(1);
      expect(fs.existsSync(record)).toBe(true);
    },
    TIMEOUT_MS,
  );

  it(
    'refuses a commit pin that no branch or tag of the remote holds',
    async () => {
      const { core, clone } = makeCore();
      await stageOk(core, pinB);
      git(clone, 'checkout', '-b', 'never-pushed');
      const unpushed = commit(clone, 'only on this machine');
      git(clone, 'checkout', 'main');

      const result = await stage(core, unpushed);

      expect(result.status).toBe(1);
      expect(result.output).toContain('is not on any branch or tag of the remote');
      expect(head(clone).commit).toBe(pinB);
    },
    TIMEOUT_MS,
  );
});
