import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const REPO_ROOT = path.resolve(__dirname, '..', '..');

export type DevPackage = {
  devpubTarget: string;
  repoLinkScript: string;
  folder: string;
};

// Driving data: list of development packages that can be published in the
// local scripture-editors checkout, and the corresponding npm script names in
// this repo used to link/unlink them.
export const DEV_PACKAGES: DevPackage[] = [
  { devpubTarget: 'platform-editor', repoLinkScript: 'editor', folder: 'scripture-editors' },
  { devpubTarget: 'utilities', repoLinkScript: 'utils', folder: 'scripture-editors' },
];

// Resolve a dev-package folder path. Prefer `dev-packages/<folder>` inside the
// repository workspace (used by CI), but fall back to a sibling directory
// `../<folder>` for developer checkouts where scripture-editors lives next to
// this repo.
export function getDevPackagePath(folder: string): string {
  const inRepo = path.resolve(REPO_ROOT, 'dev-packages', folder);
  if (fs.existsSync(inRepo)) return inRepo;
  return path.resolve(REPO_ROOT, '..', folder);
}

export function devPackageExists(folder: string): boolean {
  return fs.existsSync(getDevPackagePath(folder));
}

export function isAnyDevPackagePresent(): boolean {
  return DEV_PACKAGES.some((p) => devPackageExists(p.folder));
}

export function execInDevPackage(folder: string, cmd: string): void {
  const pathToUse = getDevPackagePath(folder);
  const env = { ...process.env, VOLTA_FEATURE_PNPM: '1' };
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
