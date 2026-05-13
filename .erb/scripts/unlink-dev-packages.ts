import fs from 'fs';
import path from 'path';
import { DEV_REPOS, REPO_ROOT, execInRepo } from './dev-package-utils';

function fixYalcInLockFile(): void {
  const lockFilePath = path.resolve(REPO_ROOT, 'package-lock.json');
  const lockContent = fs.readFileSync(lockFilePath, 'utf8');

  if (!lockContent.includes('.yalc')) return;

  console.log('Detected .yalc entries in package-lock.json, cleaning up...');

  // Find all node_modules/* entries whose resolved path points into .yalc
  const lock: { packages?: Record<string, { resolved?: string }> } = JSON.parse(lockContent);
  const packagesToReinstall: string[] = Object.entries(lock.packages ?? {})
    .filter(
      ([key, value]) => key.startsWith('node_modules/') && value.resolved?.startsWith('.yalc'),
    )
    .map(([key]) => {
      const packageName = key.slice('node_modules/'.length);

      // Remove the symlink (or broken directory) from node_modules so npm re-downloads it
      const nodeModulesPath = path.resolve(REPO_ROOT, key);
      try {
        const stat = fs.lstatSync(nodeModulesPath);
        if (stat.isSymbolicLink()) {
          fs.unlinkSync(nodeModulesPath);
        } else {
          fs.rmSync(nodeModulesPath, { recursive: true, force: true });
        }
        console.log(`Removed ${nodeModulesPath}`);
      } catch {
        // Already gone — nothing to do
      }

      return packageName;
    });

  if (packagesToReinstall.length > 0) {
    console.log(`Re-installing from registry: ${packagesToReinstall.join(', ')}`);
    execInRepo(`npm install ${packagesToReinstall.join(' ')} --ignore-scripts`);
  }
}

function unlinkDevPackages(): void {
  try {
    DEV_REPOS.forEach((repo) => {
      repo.devPackages.forEach((p) => {
        console.log(`Running ${p.repoLinkScript}:unlink`);
        execInRepo(`npm run ${p.repoLinkScript}:unlink`);
      });
    });

    fixYalcInLockFile();

    console.log('Unlinked dev packages');
  } catch (err) {
    console.error('Error: Failed to unlink dev packages.');
    // Log the error object for richer context, then the stack if available
    console.error('Error object:', err);
    if (err instanceof Error) {
      console.error('Stack:', err.stack);
    }
    process.exit(1);
  }
}

unlinkDevPackages();
