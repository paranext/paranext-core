/**
 * Root postinstall: verifies that npm actually installed the staged dev packages' dependencies,
 * then runs the build chain (`postinstall:build`).
 *
 * Why this exists: npm resolves the dependency tree from the on-disk state it saw at startup. On a
 * fresh clone, `dev-packages/staging/` is only created during this same install (by `preinstall`),
 * so `npm install` links the staged packages but never reads their manifests — their dependencies
 * are silently missing from the tree, with exit code 0. (`npm ci` is immune: it installs the
 * closure recorded in `package-lock.json`.)
 *
 * The fix is to run the install again: staging now exists, so npm reads the manifests and installs
 * the closure. This script detects the incomplete tree and does that re-run itself, once, guarded
 * by an environment variable so a genuinely broken state fails instead of looping. The nested run
 * executes the full lifecycle — including this script and the build chain — so when it succeeds,
 * this outer run has nothing left to do and skips the chain.
 *
 * If the closure is missing but this repo's tree cannot fix it — the staged manifest declares a
 * dependency `package-lock.json` does not record — the re-run would not help: `npm install` would
 * update the lockfile locally, which is the right move for a developer but must be a committed
 * change, not a CI side effect. Under `npm ci`, in CI, or on the guarded second pass, this fails
 * with instructions instead.
 *
 * Plain Node importing only the standard library, like `stage-dev-packages.ts`: on the very install
 * this script exists to repair, devDependencies may be incomplete.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
// Explicit `.ts`: this runs under bare `node` with type stripping, where extensionless resolution
// of a TypeScript file does not work.
const { diffStagedAgainstLock, isEnvFlagEnabled } = require('./stage-dev-packages.util.ts');

const REPO_ROOT: string = path.resolve(__dirname, '..', '..');
const STAGING_ROOT: string = path.resolve(REPO_ROOT, 'dev-packages', 'staging');

/** Environment variable guarding the one-shot re-run so it can never recurse. */
const RERUN_GUARD = 'PT_DEV_PACKAGES_RERUN';

type Manifest = {
  name?: string;
  dependencies?: Record<string, string>;
};

/** The dependency sections of a staged manifest or lockfile entry that get compared. */
type DependencySections = Record<string, Record<string, unknown> | undefined>;

/** The staging folder names `dev-packages.json` declares, which are the only ones that count. */
function getDeclaredStagingFolders(): string[] {
  const config: { repos?: { devPackages?: { stagingFolder?: string }[] }[] } = JSON.parse(
    fs.readFileSync(path.resolve(REPO_ROOT, 'dev-packages.json'), 'utf8'),
  );
  return (config.repos ?? []).flatMap((repo) =>
    (repo.devPackages ?? [])
      .map((devPackage) => devPackage.stagingFolder)
      .filter((folder): folder is string => !!folder),
  );
}

/**
 * Returns the names of dependencies declared by staged packages that do not resolve in this repo's
 * `node_modules`. Only `dependencies` are checked: those are what npm installs for a `file:`
 * package. Peer dependencies are the host's responsibility and are declared in this repo's own
 * manifests already.
 *
 * Driven by `dev-packages.json` rather than by what is on disk. Nothing removes a staging folder
 * when a package is renamed or dropped, and reading a leftover one would report its dependencies —
 * which this repo has correctly stopped installing — as missing.
 */
function getMissingStagedDependencies(): string[] {
  if (!fs.existsSync(STAGING_ROOT)) return [];

  const missing = new Set<string>();
  getDeclaredStagingFolders().forEach((folder: string) => {
    const manifestPath = path.resolve(STAGING_ROOT, folder, 'package.json');
    if (!fs.existsSync(manifestPath)) return;
    const manifest: Manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    Object.keys(manifest.dependencies ?? {}).forEach((dependencyName) => {
      // `file:` specifiers point at sibling staged folders, which are linked, not installed.
      if (manifest.dependencies?.[dependencyName].startsWith('file:')) return;
      if (!fs.existsSync(path.resolve(REPO_ROOT, 'node_modules', dependencyName)))
        missing.add(dependencyName);
    });
  });
  return [...missing];
}

/**
 * Describes every place `package-lock.json`'s record of a staged package disagrees with the
 * manifest actually staged.
 *
 * Presence in `node_modules` is not enough on its own: npm builds its ideal tree from the on-disk
 * state it saw at startup, so a staged package whose dependency _range_ moved — `^0.43.0` to
 * `^0.44.0`, say — resolves to the already-installed version, reports "up to date", and leaves the
 * lockfile recording the old range. Every later `npm ci` then fails on the mismatch, in CI, for
 * everyone. Comparing the recorded sections against the staged manifest is what catches it while it
 * is still repairable.
 */
function getStagedLockMismatches(): string[] {
  const lockPath = path.resolve(REPO_ROOT, 'package-lock.json');
  if (!fs.existsSync(lockPath)) return [];
  const lock: { packages?: Record<string, DependencySections> } = JSON.parse(
    fs.readFileSync(lockPath, 'utf8'),
  );

  return getDeclaredStagingFolders().flatMap((folder: string) => {
    const manifestPath = path.resolve(STAGING_ROOT, folder, 'package.json');
    if (!fs.existsSync(manifestPath)) return [];
    return diffStagedAgainstLock(
      folder,
      JSON.parse(fs.readFileSync(manifestPath, 'utf8')),
      lock.packages?.[`dev-packages/staging/${folder}`],
    );
  });
}

function runBuildChain(): void {
  execSync('npm run postinstall:build', { stdio: 'inherit', cwd: REPO_ROOT });
}

function postinstall(): void {
  const missing = getMissingStagedDependencies();
  const mismatches = getStagedLockMismatches();

  if (missing.length === 0 && mismatches.length === 0) {
    runBuildChain();
    return;
  }

  const problems = [
    ...missing.map((name) => `${name} (declared by a staged package, not installed)`),
    ...mismatches,
  ];

  // `npm ci` cannot repair this: it installs the closure `package-lock.json` records and never
  // re-resolves, so a second pass would arrive here with the same missing dependencies. Only an
  // `npm install` — whose lockfile change has to be committed — can.
  if (
    isEnvFlagEnabled(process.env[RERUN_GUARD]) ||
    isEnvFlagEnabled(process.env.CI) ||
    process.env.npm_command === 'ci'
  ) {
    console.error(
      `\nThis repo's package-lock.json does not match the staged dev packages:\n\n  ${problems.join(
        '\n  ',
      )}\n\nThis means scripture-editors' dependencies changed but this repo's package-lock.json was\nnot updated to match. To fix: run \`npm install\` in this repo (with the scripture-editors\ncheckout present) and commit the package-lock.json change.\n`,
    );
    // Not `process.exit`: it tears down the process synchronously, dropping anything still
    // queued on a piped stderr (which is how npm runs lifecycle scripts) past the ~64KB buffer.
    // The explicit `return` is what keeps the re-run below from firing on the way past.
    process.exitCode = 1;
    return;
  }

  // Fresh-clone `npm install`: staging did not exist when npm resolved the tree, so the closure was
  // skipped. Staging exists now, so running the same install again resolves it properly. The nested
  // run executes the full lifecycle — preinstall re-stages (a fast no-op via its freshness marker),
  // and its own postinstall runs the build chain — so this outer run is done when it returns.
  console.log(
    '\nThe staged dev packages do not match what npm resolved this run — they were created or\nchanged after it had already built the dependency tree. Running the install again to pick them\nup...\n',
  );
  execSync('npm install', {
    stdio: 'inherit',
    cwd: REPO_ROOT,
    env: { ...process.env, [RERUN_GUARD]: '1' },
  });
}

postinstall();
