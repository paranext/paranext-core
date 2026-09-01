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
 * Staging is skipped when the staged output is already current — each staged folder carries a
 * `.staged-from` marker naming the source commit it was built from — so repeat installs don't pay
 * for a pnpm install and build. The marker is local state, never committed (`dev-packages/` is
 * gitignored); deleting it just makes the next run rebuild.
 *
 * Modes:
 *
 * - Default: fetch and check out the revision pinned in `dev-packages.json` (refusing to touch a
 *   checkout with uncommitted changes), then build and stage if the marker is stale.
 * - `--local`: build and stage whatever is currently checked out, working changes and all, skipping
 *   the origin/revision handling and the freshness marker. This is the inner loop for editor
 *   development (`npm run build:editor`).
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT: string = path.resolve(__dirname, '..', '..');
const STAGING_ROOT: string = path.resolve(REPO_ROOT, 'dev-packages', 'staging');

/** File inside each staged folder recording the source commit the staged copy was built from. */
const STAGED_FROM_MARKER = '.staged-from';

/** Build from the current checkout state instead of the pinned revision; always rebuild. */
const isLocalMode: boolean = process.argv.includes('--local');

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
function devRepoEnv() {
  const env = {
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

/**
 * Runs a pnpm command. Tries `pnpm` directly first (works in CI with pnpm/action-setup or if pnpm
 * is globally installed). Falls back to `volta run pnpm` for local development with volta-managed
 * pnpm.
 */
function runPnpm(args: string, cwd: string): void {
  try {
    run(`pnpm ${args}`, cwd);
  } catch (err) {
    // Log the failure and retry via volta. This fallback is expected on some developer machines
    // where pnpm is managed by Volta.
    console.log(
      `pnpm invocation failed: ${err instanceof Error ? err.message : err}. This is not necessarily a problem. Retrying with 'volta run pnpm'...`,
    );
    run(`volta run pnpm ${args}`, cwd);
  }
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
  // Compare without the optional `.git` suffix or a trailing slash, which are not meaningful here.
  const normalize = (url: string) => url.replace(/\/+$/, '').replace(/\.git$/, '');
  if (normalize(origin) === normalize(repo.cloneUrl)) return;

  // Keep the previous URL under a remote named for its organization rather than overwriting it, so
  // the old location stays reachable and the change is trivially reversible.
  const previousRemoteName = /github\.com[:/]([^/]+)\//.exec(origin)?.[1] ?? 'previous-origin';

  throw new Error(
    `The ${repo.folder} repo at ${repoPath} has origin "${origin}", but dev-packages.json expects "${repo.cloneUrl}".\n\nThis is expected if the repo moved. Nothing here is destructive — the old URL is kept as a second remote, and you can undo it with \`git remote set-url origin "${origin}"\`:\n\n  git -C "${repoPath}" remote add ${previousRemoteName} "${origin}"\n  git -C "${repoPath}" remote set-url origin "${repo.cloneUrl}"\n  git -C "${repoPath}" fetch --all\n\nAlternatively, move this checkout aside and let this script clone a fresh one.\n`,
  );
}

/**
 * Checks out the configured revision in a dev repo. Fetches from origin first, then pulls if the
 * revision is a branch. Throws if the repo has uncommitted working changes.
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

  console.log(`Fetching latest in ${repo.folder}...`);
  execSync('git fetch origin --tags', { stdio: 'inherit', cwd: repoPath });
  console.log(`Checking out ${repo.revision} in ${repo.folder}...`);
  execSync(`git checkout "${repo.revision}"`, { stdio: 'inherit', cwd: repoPath });
  // Pull to get the latest commits if we're on a branch. Skip for detached HEADs (tags or commit hashes).
  let isOnBranch: boolean;
  try {
    execSync('git symbolic-ref --quiet HEAD', { stdio: 'pipe', cwd: repoPath });
    isOnBranch = true;
  } catch {
    isOnBranch = false;
  }
  if (isOnBranch) {
    execSync('git pull', { stdio: 'inherit', cwd: repoPath });
  } else {
    console.log(
      `Detached HEAD in ${repo.folder} (tag or commit hash). Skipping pull, using checked-out revision.`,
    );
  }
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

/**
 * Whether every package of this repo is already staged from exactly the currently checked-out
 * commit. A dirty source tree never matches, so `--local` builds are always superseded by the next
 * regular run.
 */
function isStagingCurrent(repo: DevRepo, sourceStamp: string): boolean {
  if (sourceStamp.endsWith('-dirty')) return false;
  return repo.devPackages.every((devPackage) => {
    const markerPath = path.resolve(STAGING_ROOT, devPackage.stagingFolder, STAGED_FROM_MARKER);
    return fs.existsSync(markerPath) && fs.readFileSync(markerPath, 'utf8').trim() === sourceStamp;
  });
}

/**
 * Asks npm which files it would publish for the package at `packageDir`. Using npm's own answer
 * keeps the staged copy faithful to the package's `files` allowlist without reimplementing its
 * include/exclude semantics here.
 */
function getPublishedFiles(packageDir: string): string[] {
  const output = execSync('npm pack --dry-run --json', {
    cwd: packageDir,
    encoding: 'utf8',
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
 * Rewrites pnpm `workspace:` specifiers in a staged manifest to `file:` paths pointing at the
 * sibling staged package. npm cannot parse the `workspace:` protocol at all, so this rewrite is
 * what makes the staged copy installable.
 *
 * Pointing at the sibling staged copy — rather than resolving to a published version, as a pnpm or
 * yalc publish would — keeps the whole graph on the build we just made. Otherwise a dev repo's
 * internal dependency on its own sibling package would resolve from the npm registry, which both
 * reintroduces a dependency on someone else's published artifact and risks a second copy of that
 * package in the tree.
 */
function resolveWorkspaceSpecifiers(
  stagingDir: string,
  stagingFolderByName: Map<string, string>,
): void {
  const manifestPath = path.resolve(stagingDir, 'package.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  let rewroteAny = false;
  ['dependencies', 'devDependencies', 'peerDependencies'].forEach((section) => {
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
      rewroteAny = true;
    });
  });

  if (rewroteAny) fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, undefined, 2)}\n`);
}

/**
 * Builds a package, rolls up its type declarations, and copies its publishable files into
 * `dev-packages/staging/<stagingFolder>`.
 *
 * The build runs through the package's own `prepublishOnly` script so the staged copy matches what
 * the package would publish. That script also rewrites the package's `package.json` in place — most
 * importantly dropping the `development` conditional export, which points at raw TypeScript source
 * that our bundlers cannot consume — so its exact prior content is restored afterward. A byte
 * snapshot rather than `git restore`, because in `--local` mode the developer may have their own
 * uncommitted edits to that manifest, which a git restore would wipe along with the script's.
 */
function stagePackage(
  repo: DevRepo,
  devPackage: DevPackage,
  stagingFolderByName: Map<string, string>,
  sourceStamp: string,
): void {
  const packageDir = path.resolve(getDevRepoPath(repo.folder), devPackage.packagePath);
  const stagingDir = path.resolve(STAGING_ROOT, devPackage.stagingFolder);
  const manifestPath = path.resolve(packageDir, 'package.json');
  const manifestSnapshot = fs.readFileSync(manifestPath);

  console.log(`Building ${devPackage.nxProject}...`);
  try {
    runPnpm('run prepublishOnly', packageDir);

    console.log(`Staging ${devPackage.nxProject} into ${stagingDir}...`);
    // Replace rather than merge so a file deleted upstream does not linger in the staged copy.
    fs.rmSync(stagingDir, { recursive: true, force: true });
    getPublishedFiles(packageDir).forEach((file) => {
      const destination = path.resolve(stagingDir, file);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.resolve(packageDir, file), destination);
    });
    resolveWorkspaceSpecifiers(stagingDir, stagingFolderByName);
    fs.writeFileSync(path.resolve(stagingDir, STAGED_FROM_MARKER), `${sourceStamp}\n`);
  } finally {
    // Restore the manifest `prepublishOnly` rewrote, whether or not staging succeeded, so the dev
    // repo is never left with stray changes (which would block the next run's checkout).
    fs.writeFileSync(manifestPath, manifestSnapshot);
  }
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
        console.log(`${repo.folder} is already staged from ${sourceStamp}; skipping build.`);
        return;
      }

      console.log(`Running pnpm install in ${repo.folder}...`);
      runPnpm('install', repoPath);

      // Map every staged package's npm name to its staging folder so a package that depends on a
      // sibling in the same repo can be pointed at that sibling's staged copy.
      const stagingFolderByName = new Map<string, string>(
        repo.devPackages.map((devPackage) => {
          const manifestPath = path.resolve(repoPath, devPackage.packagePath, 'package.json');
          return [JSON.parse(fs.readFileSync(manifestPath, 'utf8')).name, devPackage.stagingFolder];
        }),
      );

      repo.devPackages.forEach((devPackage) =>
        stagePackage(repo, devPackage, stagingFolderByName, sourceStamp),
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
