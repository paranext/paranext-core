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
  scriptureEditorsExists,
  execInScriptureEditors,
  execInRepo,
  DEVPUB_TARGETS,
  REPO_LINK_SCRIPTS,
} from './dev-package-utils';

function linkDevPackages(): void {
  if (!scriptureEditorsExists()) {
    console.log('scripture-editors folder not found - skipping yalc linking');
    return;
  }

  console.log('scripture-editors folder found - linking via yalc');

  try {
    DEVPUB_TARGETS.forEach((t) => {
      console.log(`Running devpub for ${t} in scripture-editors...`);
      execInScriptureEditors(`volta run pnpm nx devpub ${t}`);
    });

    REPO_LINK_SCRIPTS.forEach((s) => {
      console.log(`Running ${s}:link in repo...`);
      execInRepo(`npm run ${s}:link`);
    });

    console.log('Successfully linked scripture-editors packages via yalc');
  } catch (error) {
    console.warn('Warning: Failed to link scripture-editors packages via yalc.');
    console.warn('Error:', error instanceof Error ? error.message : error);
  }
}

linkDevPackages();
