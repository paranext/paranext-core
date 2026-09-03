/**
 * Stages each package listed in `dev-packages.json` into `dev-packages/staging/<stagingFolder>` so
 * this repo can depend on it with a `file:` specifier.
 *
 * Those staged folders are the resolution targets for the `@eten-tech-foundation/*` entries in our
 * `package.json` files. npm reads each staged package's own manifest and installs its dependencies
 * into this repo's tree, so the editor is free to add, bump, or drop dependencies without any
 * consumer restating them.
 *
 * This runs as the root `preinstall` to keep the staged copies current on every install. It cannot
 * make the staged packages resolvable within the same run that first creates them — npm resolves
 * the dependency tree from the on-disk state it saw at startup — but nothing here needs to handle
 * that: `npm ci` installs the closure recorded in `package-lock.json` regardless, and for `npm
 * install` on a fresh clone the root postinstall (`postinstall.ts`) detects the gap and re-runs the
 * install once.
 *
 * The dev repos commit their built `dist/`, so staging is normally a copy: running this app needs
 * nothing from their toolchain — no pnpm, no nx, no build. A build happens only in `--local` mode
 * or when a checkout has no `dist/` to copy.
 *
 * Staging is skipped entirely when the staged output is already current — each staged folder
 * carries a `.staged-from` marker naming the source commit it came from. The marker is local state,
 * never committed (`dev-packages/` is gitignored); deleting it just makes the next run re-stage.
 *
 * Modes:
 *
 * - Default: fetch and check out the revision pinned in `dev-packages.json` (refusing to touch a
 *   checkout with uncommitted changes), then build and stage if the marker is stale.
 * - `--local`: build and stage whatever is currently checked out, working changes and all, skipping
 *   the origin/revision handling. Its output is marked so the next regular run always replaces it.
 *   This is the inner loop for editor development (`npm run build:editor`).
 * - `--skip-fetch` (or `PT_SKIP_DEV_PACKAGE_FETCH=1`): resolve the revision against the refs the
 *   checkout already has instead of fetching. `npm install` cannot pass a flag through to a
 *   lifecycle script, so the environment variable is the form that works there. Use it offline;
 *   what gets staged is whatever the checkout resolves the revision to, which may trail the
 *   remote.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT: string = path.resolve(__dirname, '..', '..');
const STAGING_ROOT: string = path.resolve(REPO_ROOT, 'dev-packages', 'staging');

/** File inside each staged folder recording the source commit the staged copy was built from. */
const STAGED_FROM_MARKER = '.staged-from';

/**
 * Bump whenever this script changes what a staged copy contains — which files are copied, or how
 * `prepareStagedManifest` shapes the manifest.
 *
 * The marker records only the source commit, so without this a staged copy stays "current" until
 * the pinned revision moves, and a fix to the staging logic would never reach anyone already
 * staged. CI never notices (its tree is always fresh); developer machines keep the old copy for as
 * long as the pin holds.
 */
const STAGING_FORMAT = 2;

/** Build from the current checkout state instead of the pinned revision; always rebuild. */
const isLocalMode: boolean = process.argv.includes('--local');

/**
 * Set when a checkout was left on a branch of its own rather than moved to the pinned revision, so
 * the staged copy is marked as not being the pinned build.
 */
let isStagingOffPin = false;

/** Resolve the pinned revision against the checkout's existing refs rather than fetching. */
const isFetchSkipped: boolean =
  process.argv.includes('--skip-fetch') || !!process.env.PT_SKIP_DEV_PACKAGE_FETCH;

// #region Types — keep in sync with dev-packages.schema.json (both must be updated together)

/** A package within a dev repo that gets staged for `file:` consumption by this repo. */
type DevPackage = {
  /** The nx project name, used to build the package and roll up its type declarations. */
  nxProject: string;
  /** The package's path within its repo, e.g. `packages/platform`. */
  packagePath: string;
  /**
   * The folder name under `dev-packages/staging/` to stage into. The `file:` specifiers in this
   * repo's `package.json` files point at this name, so changing it means changing them too.
   */
  stagingFolder: string;
};

/** A development repository containing one or more packages consumed by this repo. */
type DevRepo = {
  /**
   * The directory name of the repo, used as both the clone destination under `dev-packages/` and
   * the sibling-directory fallback name.
   */
  folder: string;
  /** The git clone URL for the repo, used when the repo is not already present locally. */
  cloneUrl: string;
  /** The git revision (branch name, tag, or commit hash) to check out before building. */
  revision: string;
  /** The packages within this repo to build and stage. */
  devPackages: DevPackage[];
};

// #endregion

const DEV_REPOS: DevRepo[] = JSON.parse(
  fs.readFileSync(path.resolve(REPO_ROOT, 'dev-packages.json'), 'utf8'),
).repos;

/**
 * Resolve a dev-package repo path. Prefers `dev-packages/<folder>` inside this repo, but falls back
 * to a sibling directory `../<folder>` so a developer's existing checkout next to this repo keeps
 * working. Only the staged output has to live inside this repo; the source can be either place.
 */
function getDevRepoPath(folder: string): string {
  const inRepo = path.resolve(REPO_ROOT, 'dev-packages', folder);
  if (fs.existsSync(inRepo)) return inRepo;
  return path.resolve(REPO_ROOT, '..', folder);
}

/** Environment for commands run inside a dev repo. */
function devRepoEnv(): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = {
    ...process.env,
    // Allow volta to run pnpm commands
    VOLTA_FEATURE_PNPM: '1',
    // Disable Nx Cloud completely since it is not configured and would cause errors
    NX_NO_CLOUD: 'true',
    // Disable npm registry authentication since it is not needed and would cause warnings
    NODE_AUTH_TOKEN: '',
  };

  // Volta sets this for anything it launches, so when npm itself runs through a Volta shim every
  // command here inherits it — and Volta's pnpm shim then refuses to resolve Node at all ("Node is
  // not available"). Dropping it lets pnpm run directly instead of falling back to `volta run`,
  // which would nest Volta inside Volta and crash the nx build outright.
  // Bracket access because the name is Volta's, not an identifier of ours — dot access trips
  // no-underscore-dangle, and there is no third spelling.
  // eslint-disable-next-line dot-notation
  delete env['_VOLTA_TOOL_RECURSION'];
  return env;
}

/** Runs a command in `cwd`, streaming its output. */
function run(cmd: string, cwd: string): void {
  execSync(cmd, { stdio: 'inherit', cwd, env: devRepoEnv() });
}

/** How pnpm can be launched here, worked out once and reused. */
let pnpmLauncher: string | undefined;

/**
 * Whether pnpm runs on its own (CI with pnpm/action-setup, or a global install) or has to go
 * through `volta run` (a volta-managed pnpm on a developer machine).
 *
 * Asked once, with a command that does nothing, rather than by letting a real command fail and
 * retrying it: a failing build and an unavailable pnpm are not distinguishable from an exit code
 * cross-platform, so retrying would run whole builds a second time under a launcher chosen because
 * of a compile error.
 */
function getPnpmLauncher(cwd: string): string {
  if (pnpmLauncher) return pnpmLauncher;
  try {
    execSync('pnpm --version', { cwd, env: devRepoEnv(), stdio: 'pipe' });
    pnpmLauncher = 'pnpm';
  } catch {
    console.log('`pnpm` did not run on its own; using `volta run pnpm`.');
    pnpmLauncher = 'volta run pnpm';
  }
  return pnpmLauncher;
}

/** Runs a pnpm command, letting any failure of that command surface as itself. */
function runPnpm(args: string, cwd: string): void {
  run(`${getPnpmLauncher(cwd)} ${args}`, cwd);
}

/** Clones the given dev repo into `dev-packages/<folder>` if it is not already present locally. */
function cloneRepoIfNeeded(repo: DevRepo): void {
  if (fs.existsSync(getDevRepoPath(repo.folder))) return;

  const devPackagesDir = path.resolve(REPO_ROOT, 'dev-packages');
  fs.mkdirSync(devPackagesDir, { recursive: true });
  const clonePath = path.resolve(devPackagesDir, repo.folder);
  console.log(`Cloning ${repo.cloneUrl} into ${clonePath}...`);
  execSync(`git clone "${repo.cloneUrl}" "${clonePath}"`, { stdio: 'inherit' });
}

/**
 * Throws if an existing checkout's `origin` is not the configured `cloneUrl`.
 *
 * A repo is only ever cloned when its folder is absent, so a checkout made before the clone URL
 * changed would keep fetching from the old remote and resolve the configured revision against it —
 * building the wrong source with no visible error.
 */
function verifyOrigin(repo: DevRepo, repoPath: string): void {
  const origin = execSync('git remote get-url origin', { cwd: repoPath, encoding: 'utf8' }).trim();
  // Reduce every URL form git accepts for one repo to `<host>/<path>` before comparing. Only the
  // repo identity matters here, not the transport: anyone who pushes to the dev repo has an SSH
  // remote (`git@github.com:org/repo.git`), which is the same repo as the HTTPS `cloneUrl` and must
  // not be reported as a move.
  const normalize = (url: string) =>
    url
      .trim()
      .replace(/\/+$/, '')
      .replace(/\.git$/, '')
      // Drop the scheme (`https://`, `ssh://`, `git+https://`) and any `user@` prefix, then turn
      // scp-style `host:org/repo` into `host/org/repo`.
      .replace(/^[a-z+]+:\/\//i, '')
      .replace(/^[^@/]+@/, '')
      .replace(/^([^/:]+):/, '$1/')
      .toLowerCase();
  if (normalize(origin) === normalize(repo.cloneUrl)) return;

  // Keep the previous URL under a remote named for its organization rather than overwriting it, so
  // the old location stays reachable and the change is trivially reversible.
  const previousRemoteName = /github\.com[:/]([^/]+)\//.exec(origin)?.[1] ?? 'previous-origin';

  throw new Error(
    `The ${repo.folder} repo at ${repoPath} has origin "${origin}", but dev-packages.json expects "${repo.cloneUrl}".\n\nThis is expected if the repo moved. Nothing here is destructive — the old URL is kept as a second remote, and you can undo it with \`git remote set-url origin "${origin}"\`:\n\n  git -C "${repoPath}" remote add ${previousRemoteName} "${origin}"\n  git -C "${repoPath}" remote set-url origin "${repo.cloneUrl}"\n  git -C "${repoPath}" fetch --all\n\nAlternatively, move this checkout aside and let this script clone a fresh one.\n`,
  );
}

/**
 * Brings a dev repo's checkout to the pinned revision, without ever discarding work.
 *
 * Refuses to touch a checkout with uncommitted changes at all. Otherwise it updates the checkout
 * only when it is somewhere nothing is being kept — detached, on `main`, or on the pinned branch
 * itself, which is force-pushed upstream by design. On any other branch it leaves the checkout
 * exactly as it is and stages that instead, saying so.
 */
function checkoutRevision(repo: DevRepo): void {
  const repoPath = getDevRepoPath(repo.folder);

  verifyOrigin(repo, repoPath);

  const status = execSync('git status --porcelain', { cwd: repoPath, encoding: 'utf8' });
  if (status.trim().length > 0) {
    throw new Error(
      `The ${repo.folder} repo has working changes:\n${status}\nWe don't want to accidentally overwrite any changes. Please go handle your changes and try again when there are no more working changes.\n\nIf you are actively developing ${repo.folder}, build your working state with \`npm run build:editor\` instead.`,
    );
  }

  if (isFetchSkipped) {
    console.log(`Skipping the fetch in ${repo.folder}; using the refs it already has.`);
  } else {
    console.log(`Fetching latest in ${repo.folder}...`);
    try {
      execSync('git fetch origin --tags', { stdio: 'inherit', cwd: repoPath });
    } catch (error) {
      throw new Error(
        `Could not fetch ${repo.cloneUrl} in ${repoPath}.\n\nIf you are offline and that checkout already has ${repo.revision}, stage what it has instead of fetching:\n\n  PT_SKIP_DEV_PACKAGE_FETCH=1 npm install\n\nWhatever the checkout resolves ${repo.revision} to is then what gets staged, which may be older than the remote.\n\nFetch failed with: ${error instanceof Error ? error.message : error}\n`,
      );
    }
  }
  // Prefer the remote-tracking ref when the revision names a branch. `platform-yalc` is routinely
  // force-pushed (it is rebased onto main), so the local branch of that name can be on a commit
  // that no longer exists upstream; `origin/<branch>` is always what the remote actually has.
  let isRemoteBranch: boolean;
  try {
    execSync(`git show-ref --verify --quiet "refs/remotes/origin/${repo.revision}"`, {
      stdio: 'pipe',
      cwd: repoPath,
    });
    isRemoteBranch = true;
  } catch {
    isRemoteBranch = false;
  }
  const target = isRemoteBranch ? `origin/${repo.revision}` : repo.revision;

  const resolve = (rev: string) =>
    execSync(`git rev-parse --verify --quiet "${rev}^{commit}"`, {
      cwd: repoPath,
      encoding: 'utf8',
    }).trim();

  let targetCommit: string;
  try {
    targetCommit = resolve(target);
  } catch {
    throw new Error(
      `${repoPath} has no revision "${repo.revision}"${
        isFetchSkipped ? ', and the fetch that would have brought it in was skipped' : ''
      }.\n`,
    );
  }

  if (resolve('HEAD') === targetCommit) {
    console.log(`${repo.folder} is already at ${repo.revision}.`);
    return;
  }

  // `git rev-parse --abbrev-ref HEAD` answers `HEAD` when the checkout is detached.
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
    cwd: repoPath,
    encoding: 'utf8',
  }).trim();

  // Only move a checkout that is not somewhere deliberate. A detached HEAD is where a previous run
  // left it, `main` is where a fresh clone starts, and the pinned branch is force-pushed upstream
  // by design — none of the three is work worth protecting. Any other branch is somebody's, and
  // this script has no business moving it, wherever the checkout lives.
  const isSomebodysBranch =
    currentBranch !== 'HEAD' && currentBranch !== 'main' && currentBranch !== repo.revision;

  if (isSomebodysBranch) {
    isStagingOffPin = true;
    console.warn(
      `\nWARNING: ${repoPath} is on "${currentBranch}", not the pinned "${repo.revision}".\n` +
        `Leaving it alone and staging what it has, so nothing you are working on is lost.\n` +
        `Whatever this app runs is built from that branch, not from the pinned revision.\n` +
        `To stage the pinned revision instead: git -C "${repoPath}" checkout ${repo.revision}\n`,
    );
    return;
  }

  if (isRemoteBranch) {
    // `-B` moves the local branch of that name onto the remote's tip and checks it out, so the
    // checkout ends up on a branch rather than detached. The local branch is disposable: this one
    // exists to track a branch that is rebased and force-pushed upstream as a matter of course.
    console.log(`Updating ${repo.folder} to ${target}...`);
    execSync(`git checkout -B "${repo.revision}" "${target}"`, { stdio: 'inherit', cwd: repoPath });
    return;
  }

  // A tag or a commit hash. There is no branch to be on, so this is the one case where a detached
  // HEAD is not a choice.
  console.log(`Checking out ${repo.revision} in ${repo.folder}...`);
  execSync(`git checkout --detach "${repo.revision}"`, { stdio: 'inherit', cwd: repoPath });
}

/**
 * Identifies what a staged copy would be built from right now: the source HEAD commit, with a
 * `-dirty` suffix when the working tree has uncommitted changes so a locally built copy never
 * passes as a clean one.
 */
function getSourceStamp(repoPath: string): string {
  const head = execSync('git rev-parse HEAD', { cwd: repoPath, encoding: 'utf8' }).trim();
  const status = execSync('git status --porcelain', { cwd: repoPath, encoding: 'utf8' });
  return status.trim().length > 0 ? `${head}-dirty` : head;
}

/** What a marker written by this version of the script, for this source state, would say. */
function getExpectedMarker(sourceStamp: string): string {
  const provisional = `${isLocalMode ? '-local' : ''}${isStagingOffPin ? '-offpin' : ''}`;
  return `${sourceStamp}${provisional} format=${STAGING_FORMAT}`;
}

/**
 * Whether every package of this repo is already staged from exactly the currently checked-out
 * commit, by a version of this script that produces what this one would. Neither a dirty source
 * tree nor a `--local` build ever matches, so both are always superseded by the next regular run.
 */
function isStagingCurrent(repo: DevRepo, sourceStamp: string): boolean {
  if (sourceStamp.endsWith('-dirty')) return false;
  const expected = getExpectedMarker(sourceStamp);
  return repo.devPackages.every((devPackage) => {
    const markerPath = path.resolve(STAGING_ROOT, devPackage.stagingFolder, STAGED_FROM_MARKER);
    return fs.existsSync(markerPath) && fs.readFileSync(markerPath, 'utf8').trim() === expected;
  });
}

/**
 * Asks npm which files it would publish for the package at `packageDir`. Using npm's own answer
 * keeps the staged copy faithful to the package's `files` allowlist without reimplementing its
 * include/exclude semantics here.
 */
function getPublishedFiles(packageDir: string): string[] {
  // npm exports its own flags to child processes as `npm_config_*`. `npm install -w <workspace>`
  // in this repo would therefore hand `npm pack` a workspace filter that means nothing in the dev
  // repo, and npm answers with an error object instead of a file list.
  const env = { ...process.env };
  delete env.npm_config_workspace;
  delete env.npm_config_workspaces;
  const output = execSync('npm pack --dry-run --json', {
    cwd: packageDir,
    encoding: 'utf8',
    env,
    // npm writes its human-readable tarball summary to stderr, so capture that separately to keep
    // stdout pure JSON. Captured rather than ignored so a failure still reports why.
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const parsed: { files?: { path: string }[] }[] = JSON.parse(output);
  const files = parsed[0]?.files;
  if (!files?.length) throw new Error(`npm reported no publishable files for ${packageDir}`);
  return files.map((file) => file.path);
}

/**
 * Shapes a staged package's manifest the way publishing would, and makes it installable by npm.
 *
 * The dev repo's own `prepublishOnly` does the first part, but running it requires that repo's
 * toolchain and a full build. Doing it here on the copy instead means a consumer never needs either
 * — and never mutates the source checkout, which `prepublishOnly` does (it rewrites `package.json`
 * in place and relies on a `postpublish` git restore).
 *
 * - The `development` conditional export points at raw TypeScript source that our bundlers cannot
 *   consume; publishing drops it, so we do too.
 * - `devDependencies` are irrelevant to a consumer and would be noise in its lockfile.
 * - Pnpm `workspace:` specifiers become `file:` paths at the sibling staged package. npm cannot parse
 *   the `workspace:` protocol at all, so this rewrite is what makes the copy installable. Pointing
 *   at the sibling staged copy — rather than at a published version, as a pnpm or yalc publish
 *   would — keeps the whole graph on the build we just staged, instead of pulling someone else's
 *   published artifact back in and risking a second copy of that package in the tree.
 */
function prepareStagedManifest(stagingDir: string, stagingFolderByName: Map<string, string>): void {
  const manifestPath = path.resolve(stagingDir, 'package.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  delete manifest.exports?.['.']?.development;
  delete manifest.devDependencies;
  // Volta pins the dev repo's toolchain; it means nothing in a consumer's tree.
  delete manifest.volta;

  ['dependencies', 'peerDependencies'].forEach((section) => {
    const deps: Record<string, string> | undefined = manifest[section];
    if (!deps) return;
    Object.entries(deps).forEach(([name, specifier]) => {
      if (!specifier.startsWith('workspace:')) return;
      const stagingFolder = stagingFolderByName.get(name);
      if (!stagingFolder)
        throw new Error(
          `${manifestPath} depends on "${name}" with specifier "${specifier}", but "${name}" is not staged. Add it to dev-packages.json so it can be resolved.`,
        );
      deps[name] = `file:../${stagingFolder}`;
    });
  });

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, undefined, 2)}\n`);
}

/**
 * Copies a package's publishable files into `dev-packages/staging/<stagingFolder>`, building first
 * only when there is nothing to copy.
 *
 * The dev repos commit their built `dist/`, so staging is normally just a copy: a consumer needs
 * none of their toolchain — no pnpm, no nx, no build — to run this app. Only someone changing a dev
 * package builds it, via `npm run build:editor`.
 *
 * The build fallback covers the two cases where a copy is not enough: `--local`, where the point is
 * to pick up uncommitted source edits, and a checkout whose `dist/` is missing (an older revision
 * from before the build was committed, or a partially cleaned tree).
 *
 * `mustBuild` is decided for the repo as a whole, and deliberately cannot be re-derived here from
 * `dist/` existing. Building one package also builds the workspace dependencies nx resolves for it,
 * which writes their `dist/` too — but with tsc's per-file declarations, never api-extractor's
 * rolled-up one. So a package inspected after a sibling built looks already-built while holding a
 * 13-line re-export stub where its API surface should be, and copying that stages a package whose
 * types resolve through to its own dependencies' globals. Staging each package immediately after
 * building it is the other half of this: it captures the rolled-up output before a later sibling's
 * build can overwrite it.
 */
function stagePackage(
  repo: DevRepo,
  devPackage: DevPackage,
  stagingFolderByName: Map<string, string>,
  sourceStamp: string,
  mustBuild: boolean,
): void {
  const packageDir = path.resolve(getDevRepoPath(repo.folder), devPackage.packagePath);
  const stagingDir = path.resolve(STAGING_ROOT, devPackage.stagingFolder);

  if (mustBuild) {
    console.log(
      `Building ${devPackage.nxProject}${isLocalMode ? '' : ' (no committed dist to copy)'}...`,
    );
    // --skip-nx-cache because the dev repos commit their `dist/`, and nx declares that directory as
    // a cached target output: a cache hit RESTORES nx's copy over the committed one, silently
    // deleting files the cache predates. A build here must reflect the source, not a cache.
    runPnpm(
      `exec nx extract-api ${devPackage.nxProject} --skip-nx-cache`,
      getDevRepoPath(repo.folder),
    );
  }

  console.log(`Staging ${devPackage.nxProject} into ${stagingDir}...`);
  // Replace rather than merge so a file deleted upstream does not linger in the staged copy.
  fs.rmSync(stagingDir, { recursive: true, force: true });
  getPublishedFiles(packageDir).forEach((file) => {
    const destination = path.resolve(stagingDir, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.resolve(packageDir, file), destination);
  });
  prepareStagedManifest(stagingDir, stagingFolderByName);
  // `--local` marks its output so it can never satisfy `isStagingCurrent`: a local build is a
  // developer's private state, and a clean checkout at the pinned commit would otherwise write a
  // stamp indistinguishable from a real staging run, leaving that build in place indefinitely.
  fs.writeFileSync(
    path.resolve(stagingDir, STAGED_FROM_MARKER),
    `${getExpectedMarker(sourceStamp)}\n`,
  );
}

function stageDevPackages(): void {
  console.log(`Staging dev packages for file: consumption${isLocalMode ? ' (local mode)' : ''}...`);

  try {
    DEV_REPOS.forEach((repo) => {
      if (isLocalMode) {
        if (!fs.existsSync(getDevRepoPath(repo.folder)))
          throw new Error(
            `--local requires an existing ${repo.folder} checkout (in dev-packages/ or as a sibling of this repo), but none was found. Run a regular install first to clone it.`,
          );
      } else {
        cloneRepoIfNeeded(repo);
        checkoutRevision(repo);
      }

      const repoPath = getDevRepoPath(repo.folder);
      const sourceStamp = getSourceStamp(repoPath);

      if (!isLocalMode && isStagingCurrent(repo, sourceStamp)) {
        console.log(`${repo.folder} is already staged from ${sourceStamp}; nothing to do.`);
        return;
      }

      // One decision for the whole repo, made while the checkout is still untouched: if any package
      // has to be built, build them all. Once a build runs, `dist/` no longer says whether a package
      // was built as itself or as somebody's dependency (see `stagePackage`), so a per-package
      // decision taken later reads a tree the earlier builds already rewrote.
      const mustBuild =
        isLocalMode ||
        repo.devPackages.some(
          (devPackage) => !fs.existsSync(path.resolve(repoPath, devPackage.packagePath, 'dist')),
        );

      // Only a build needs the dev repo's dependencies installed. Skipping this is the difference
      // between an install that needs pnpm and one that does not.
      if (mustBuild) {
        console.log(`Running pnpm install in ${repo.folder}...`);
        runPnpm('install', repoPath);
      }

      // Map every staged package's npm name to its staging folder so a package that depends on a
      // sibling in the same repo can be pointed at that sibling's staged copy.
      const stagingFolderByName = new Map<string, string>(
        repo.devPackages.map((devPackage) => {
          const manifestPath = path.resolve(repoPath, devPackage.packagePath, 'package.json');
          return [JSON.parse(fs.readFileSync(manifestPath, 'utf8')).name, devPackage.stagingFolder];
        }),
      );

      repo.devPackages.forEach((devPackage) =>
        stagePackage(repo, devPackage, stagingFolderByName, sourceStamp, mustBuild),
      );
    });

    console.log('Successfully staged dev packages');
  } catch (error) {
    console.error('Error: Failed to stage dev packages.');
    console.error('Error object:', error);
    if (error instanceof Error) console.error('Stack:', error.stack);
    process.exit(1);
  }
}

stageDevPackages();
