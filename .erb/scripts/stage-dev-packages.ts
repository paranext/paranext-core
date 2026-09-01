/**
 * Stages each package listed in `dev-packages.json` into `dev-packages/staging/<stagingFolder>` so
 * this repo can depend on it with a `file:` specifier.
 *
 * Those staged folders are the resolution targets for the `@eten-tech-foundation/*` entries in our
 * `package.json` files. npm reads each staged package's own manifest and installs its dependencies
 * into this repo's tree, so the editor is free to add, bump, or drop dependencies without any
 * consumer restating them.
 *
 * **Run this before `npm install`, not only as its `preinstall` hook.** npm reads the `file:`
 * targets' manifests from the on-disk state it saw at startup, so folders this script creates
 * during `preinstall` come too late for that same run: workspace lifecycle scripts execute before
 * the links are in place, and `extensions`' `postinstall` fails resolving the editor through
 * `platform-bible-utils`. It is still wired to `preinstall` so an existing checkout re-stages on
 * every install; it just cannot bootstrap a fresh one in a single pass, and says so rather than
 * letting npm fail confusingly.
 *
 * A staged copy is required rather than a `file:` pointer straight at the source package: the
 * source lives in a pnpm workspace whose per-package `node_modules` holds its own `react`,
 * `react-dom`, and `lexical`. Node resolves a linked package through its real path, so pointing at
 * the source would bind the editor to those copies instead of ours — duplicate React (invalid hook
 * calls) and duplicate Lexical (every cross-boundary `instanceof` node check fails). The staged
 * copy contains only the files `npm pack` would publish, so it has no `node_modules` and resolves
 * up into this repo's tree.
 *
 * This file is plain Node — it uses `require` and imports nothing outside the standard library —
 * because `preinstall` runs before `node_modules` exists, so `ts-node`, `tsx`, and every other
 * devDependency are unavailable. Node strips the type annotations natively.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT: string = path.resolve(__dirname, '..', '..');
const STAGING_ROOT: string = path.resolve(REPO_ROOT, 'dev-packages', 'staging');

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
  delete env._VOLTA_TOOL_RECURSION;
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
      `The ${repo.folder} repo has working changes:\n${status}\nWe don't want to accidentally overwrite any changes. Please go handle your changes and try again when there are no more working changes.`,
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
 * that our bundlers cannot consume — so it is restored afterward, exactly as the package's own
 * `postpublish` script does.
 */
function stagePackage(
  repo: DevRepo,
  devPackage: DevPackage,
  stagingFolderByName: Map<string, string>,
): void {
  const packageDir = path.resolve(getDevRepoPath(repo.folder), devPackage.packagePath);
  const stagingDir = path.resolve(STAGING_ROOT, devPackage.stagingFolder);

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
  } finally {
    // Restore the manifest `prepublishOnly` rewrote, whether or not staging succeeded, so the dev
    // repo is never left with working changes (which would block the next run's checkout).
    execSync('git restore package.json', { stdio: 'inherit', cwd: packageDir });
  }
}

function stageDevPackages(): void {
  console.log('Staging dev packages for file: consumption...');

  // npm resolved its tree before this hook ran, so if the staged folders are only appearing now,
  // this install cannot use them — see the note at the top of this file.
  const bootstrapping = !fs.existsSync(STAGING_ROOT);

  try {
    DEV_REPOS.forEach((repo) => {
      cloneRepoIfNeeded(repo);
      checkoutRevision(repo);

      console.log(`Running pnpm install in ${repo.folder}...`);
      runPnpm('install', getDevRepoPath(repo.folder));

      // Map every staged package's npm name to its staging folder so a package that depends on a
      // sibling in the same repo can be pointed at that sibling's staged copy.
      const stagingFolderByName = new Map<string, string>(
        repo.devPackages.map((devPackage) => {
          const manifestPath = path.resolve(
            getDevRepoPath(repo.folder),
            devPackage.packagePath,
            'package.json',
          );
          return [JSON.parse(fs.readFileSync(manifestPath, 'utf8')).name, devPackage.stagingFolder];
        }),
      );

      repo.devPackages.forEach((devPackage) => stagePackage(repo, devPackage, stagingFolderByName));
    });

    console.log('Successfully staged dev packages');

    if (bootstrapping && process.env.npm_lifecycle_event === 'preinstall') {
      console.error(
        '\nThe dev packages were staged for the first time, but npm had already resolved its\ndependency tree without them, so this install cannot link them. Nothing is wrong —\njust run the same install command again and it will succeed.\n',
      );
      process.exit(1);
    }
  } catch (error) {
    console.error('Error: Failed to stage dev packages.');
    console.error('Error object:', error);
    if (error instanceof Error) console.error('Stack:', error.stack);
    process.exit(1);
  }
}

stageDevPackages();
