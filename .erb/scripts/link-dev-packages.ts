/**
 * Script to automatically link `@eten-tech-foundation/platform-editor` and
 * `@eten-tech-foundation/scripture-utilities` via yalc. If the scripture-editors repo is not
 * present next to this repo or in `dev-packages`, it will be cloned automatically.
 *
 * This script will, for each dev repo:
 *
 * 1. Clone the repo into `dev-packages` if it doesn't exist in either location
 * 2. Verify there are no working changes and check out the specified revision
 * 3. Run `pnpm install` in the repo
 * 4. Run devpub in the repo for each package
 * 5. Link the packages via yalc in this repo
 */

import {
  DEV_REPOS,
  cloneRepoIfNeeded,
  checkoutRevision,
  execPnpmInDevPackage,
  execInRepo,
} from './dev-package-utils';

function linkDevPackages(): void {
  console.log('Setting up dev packages via yalc...');

  try {
    DEV_REPOS.forEach((repo) => {
      cloneRepoIfNeeded(repo);
      checkoutRevision(repo.folder, repo.revision);

      console.log(`Running pnpm install in ${repo.folder}...`);
      execPnpmInDevPackage(repo.folder, 'install');

      repo.devPackages.forEach((p) => {
        console.log(`Running devpub for ${p.devpubTarget} in ${repo.folder}...`);
        execPnpmInDevPackage(repo.folder, `nx devpub ${p.devpubTarget}`);

        console.log(`Running ${p.repoLinkScript}:link in repo...`);
        execInRepo(`npm run ${p.repoLinkScript}:link`);
      });
    });

    console.log('Successfully linked dev packages via yalc');
  } catch (error) {
    console.error('Error: Failed to link dev packages via yalc.');
    // Log the error object for richer context, then the stack if available
    console.error('Error object:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

linkDevPackages();
