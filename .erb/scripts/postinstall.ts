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

const REPO_ROOT: string = path.resolve(__dirname, '..', '..');
const STAGING_ROOT: string = path.resolve(REPO_ROOT, 'dev-packages', 'staging');

/** Environment variable guarding the one-shot re-run so it can never recurse. */
const RERUN_GUARD = 'PT_DEV_PACKAGES_RERUN';

type Manifest = {
  name?: string;
  dependencies?: Record<string, string>;
};

/**
 * Returns the names of dependencies declared by staged packages that do not resolve in this repo's
 * `node_modules`. Only `dependencies` are checked: those are what npm installs for a `file:`
 * package. Peer dependencies are the host's responsibility and are declared in this repo's own
 * manifests already.
 */
function getMissingStagedDependencies(): string[] {
  if (!fs.existsSync(STAGING_ROOT)) return [];

  const missing = new Set<string>();
  fs.readdirSync(STAGING_ROOT).forEach((folder: string) => {
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

function runBuildChain(): void {
  execSync('npm run postinstall:build', { stdio: 'inherit', cwd: REPO_ROOT });
}

function postinstall(): void {
  const missing = getMissingStagedDependencies();

  if (missing.length === 0) {
    runBuildChain();
    return;
  }

  // `npm ci` cannot repair this: it installs the closure `package-lock.json` records and never
  // re-resolves, so a second pass would arrive here with the same missing dependencies. Only an
  // `npm install` — whose lockfile change has to be committed — can.
  if (process.env[RERUN_GUARD] || process.env.CI || process.env.npm_command === 'ci') {
    console.error(
      `\nThe staged dev packages declare dependencies that are not installed:\n\n  ${missing.join(
        '\n  ',
      )}\n\nThis means scripture-editors' dependencies changed but this repo's package-lock.json was\nnot updated to match. To fix: run \`npm install\` in this repo (with the scripture-editors\ncheckout present) and commit the package-lock.json change.\n`,
    );
    process.exit(1);
  }

  // Fresh-clone `npm install`: staging did not exist when npm resolved the tree, so the closure was
  // skipped. Staging exists now, so running the same install again resolves it properly. The nested
  // run executes the full lifecycle — preinstall re-stages (a fast no-op via its freshness marker),
  // and its own postinstall runs the build chain — so this outer run is done when it returns.
  console.log(
    '\nThe staged dev packages were created during this install, after npm had already resolved the\ndependency tree without them. Running the install again to pick them up...\n',
  );
  execSync('npm install', {
    stdio: 'inherit',
    cwd: REPO_ROOT,
    env: { ...process.env, [RERUN_GUARD]: '1' },
  });
}

postinstall();
