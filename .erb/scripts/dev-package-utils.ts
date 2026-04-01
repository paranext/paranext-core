import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const REPO_ROOT = path.resolve(__dirname, '..', '..');

// #region Types — keep in sync with dev-packages.schema.json (both must be updated together)

/** A package within a dev repo that can be published locally via yalc and linked into this repo. */
export type DevPackage = {
  /** The nx project name passed to `nx devpub <target>` to publish this package. */
  devpubTarget: string;
  /**
   * The npm script prefix in this repo used to link/unlink the package, e.g. `editor` maps to
   * `editor:link` and `editor:unlink`.
   */
  repoLinkScript: string;
};

/**
 * A development repository containing one or more packages that can be linked into this repo via
 * yalc.
 */
export type DevRepo = {
  /**
   * The directory name of the repo, used as both the clone destination under `dev-packages/` and
   * the sibling-directory fallback name.
   */
  folder: string;
  /** The git clone URL for the repo, used when the repo is not already present locally. */
  cloneUrl: string;
  /** The git revision (branch name, tag, or commit hash) to check out before building. */
  revision: string;
  /** The packages within this repo to publish and link. */
  devPackages: DevPackage[];
};

// #endregion

/** List of development repos loaded from `dev-packages.json` at the repository root. */
export const DEV_REPOS: DevRepo[] = JSON.parse(
  fs.readFileSync(path.resolve(REPO_ROOT, 'dev-packages.json'), 'utf8'),
).repos;

// Resolve a dev-package folder path. Prefer `dev-packages/<folder>` inside the
// repository workspace (used by CI), but fall back to a sibling directory
// `../<folder>` for developer checkouts where the repo lives next to this repo.
export function getDevPackagePath(folder: string): string {
  const inRepo = path.resolve(REPO_ROOT, 'dev-packages', folder);
  if (fs.existsSync(inRepo)) return inRepo;
  return path.resolve(REPO_ROOT, '..', folder);
}

export function devPackageExists(folder: string): boolean {
  return fs.existsSync(getDevPackagePath(folder));
}

export function cloneRepoIfNeeded(repo: DevRepo): void {
  if (devPackageExists(repo.folder)) return;

  const devPackagesDir = path.resolve(REPO_ROOT, 'dev-packages');
  if (!fs.existsSync(devPackagesDir)) {
    fs.mkdirSync(devPackagesDir, { recursive: true });
  }
  const clonePath = path.resolve(devPackagesDir, repo.folder);
  console.log(`Cloning ${repo.cloneUrl} into ${clonePath}...`);
  execSync(`git clone "${repo.cloneUrl}" "${clonePath}"`, { stdio: 'inherit' });
}

export function checkoutRevision(folder: string, revision: string): void {
  const repoPath = getDevPackagePath(folder);

  const status = execSync('git status --porcelain', { cwd: repoPath, encoding: 'utf8' });
  if (status.trim().length > 0) {
    throw new Error(
      `The ${folder} repo has working changes:\n${status}\nWe don't want to accidentally overwrite any changes. Please go handle your changes and try again when there are no more working changes.`,
    );
  }

  console.log(`Fetching latest in ${folder}...`);
  execSync('git fetch origin', { stdio: 'inherit', cwd: repoPath });
  console.log(`Checking out ${revision} in ${folder}...`);
  execSync(`git checkout "${revision}"`, { stdio: 'inherit', cwd: repoPath });
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
      `Detached HEAD in ${folder} (tag or commit hash). Skipping pull, using checked-out revision.`,
    );
  }
}

export function execInDevPackage(folder: string, cmd: string): void {
  const pathToUse = getDevPackagePath(folder);
  const env = {
    ...process.env,
    // Allow volta to run pnpm commands
    VOLTA_FEATURE_PNPM: '1',
    // Disable Nx Cloud completely since it is not configured and would cause errors
    NX_NO_CLOUD: 'true',
    // Disable npm registry authentication since it is not needed and would cause warnings
    NODE_AUTH_TOKEN: '',
  };
  execSync(cmd, { stdio: 'inherit', cwd: pathToUse, env });
}

export function execInRepo(cmd: string): void {
  execSync(cmd, { stdio: 'inherit', cwd: REPO_ROOT });
}

/**
 * Run a pnpm command in a dev package folder. Tries `pnpm` directly first (works in CI with
 * pnpm/action-setup or if pnpm is globally installed). Falls back to `volta run pnpm` for local
 * development with volta-managed pnpm.
 */
export function execPnpmInDevPackage(folder: string, args: string): void {
  try {
    execInDevPackage(folder, `pnpm ${args}`);
  } catch (err) {
    // Log the failure and retry via volta. This fallback is expected on some
    // developer machines where pnpm is managed by Volta.
    console.log(
      `pnpm invocation failed: ${err instanceof Error ? err.message : err}. This is not necessarily a problem. Retrying with 'volta run pnpm'...`,
    );
    // Use the shared helper so the fallback uses the same execution behavior
    // as other repo commands.
    execInDevPackage(folder, `volta run pnpm ${args}`);
  }
}
