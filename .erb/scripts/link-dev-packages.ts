/**
 * Script to automatically link `@eten-tech-foundation/platform-editor` and
 * `@eten-tech-foundation/scripture-utilities` via yalc if the scripture-editors folder exists next
 * to this repo. This means those packages will be used from the local dev versions in
 * scripture-editors instead of the published versions.
 *
 * This script will:
 *
 * 1. Run devpub in scripture-editors for both packages
 * 2. Link the packages via yalc in this repo
 */

import {
  anyDevPackagePresent,
  devPackageExists,
  execInDevPackage,
  execInRepo,
  DEV_PACKAGES,
} from './dev-package-utils';

function linkDevPackages(): void {
  if (!anyDevPackagePresent()) {
    console.log('dev packages not found - skipping yalc linking');
    return;
  }

  console.log('dev packages found - linking via yalc');

  try {
    DEV_PACKAGES.forEach((p) => {
      if (!devPackageExists(p.folder)) {
        console.log(`Skipping ${p.devpubTarget} — folder not found for ${p.folder}`);
        return;
      }

      console.log(`Running devpub for ${p.devpubTarget} in ${p.folder}...`);
      execInDevPackage(p.folder, `volta run pnpm nx devpub ${p.devpubTarget}`);

      console.log(`Running ${p.repoLinkScript}:link in repo...`);
      execInRepo(`npm run ${p.repoLinkScript}:link`);
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
