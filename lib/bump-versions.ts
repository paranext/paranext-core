import fs from 'fs';
import path from 'path';
import { getExtensions } from '../webpack/webpack.util';
import { checkForWorkingChanges, execCommand } from './git.util';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/lib/bump-versions.ts and https://github.com/paranext/paranext/blob/main/lib/bump-versions.ts

// This script checks out a new branch, bumps the versions of all extensions in the repo,
// and then commits the changes. It is generally expected that you will be on `main` when you run
// this script.

// Provide the new version as a command line argument e.g. `npx ts-node ./lib/bump-versions.ts 1.2.3-alpha.0`
// Provide `--allow-working-changes` after the version to allow working changes to be part of making
// the new version (useful if you want to do other things related to versioning before running this)

const newVersion = process.argv[2];
const shouldAllowWorkingChanges = process.argv.includes('--allow-working-changes');

(async () => {
  // Make sure there are not working changes so we don't interfere with normal edits
  if (!shouldAllowWorkingChanges && (await checkForWorkingChanges())) return 1;

  const branchName = `bump-versions-${newVersion}`;

  // Checkout a new branch
  try {
    await execCommand(`git checkout -b ${branchName}`);
  } catch (e) {
    console.error(`Error on git checkout: ${e}`);
    return 1;
  }

  const bumpVersionCommand = `npm version ${newVersion} --git-tag-version false`;

  // Bump the version at top level
  try {
    await execCommand(bumpVersionCommand);
  } catch (e) {
    console.error(`Error on bumping version: ${e}`);
    return 1;
  }

  // #endregion

  // Get list of extensions to update
  /** All extension folders in this repo */
  const extensions = await getExtensions();

  // Bump the version in each extension
  // We intend to run these one at a time, so for/of works well here
  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const ext of extensions) {
    // Bump the package version in the extension if the package.json exists
    let packageJsonExists = true;
    try {
      await fs.promises.access(path.resolve(ext.dirPath, 'package.json'));
    } catch (e) {
      console.log(
        `Error while accessing ${ext.name}'s package.json: ${e}. If the extension does not have a package.json, this is not a problem.`,
      );
      packageJsonExists = false;
    }

    if (packageJsonExists) {
      try {
        await execCommand(bumpVersionCommand, {
          cwd: ext.dirPath,
        });
      } catch (e) {
        console.error(`Error on bumping package version for extension ${ext.name}: ${e}`);
        return 1;
      }
    }

    // Bump the manifest version in the extension
    try {
      const updatedManifest = { ...ext.manifest, version: newVersion };
      // Write the updated manifest to the extension directory
      await fs.promises.writeFile(
        ext.manifestPath,
        `${JSON.stringify(updatedManifest, undefined, 2)}\n`,
        'utf8',
      );
    } catch (e) {
      console.error(`Error on bumping manifest version for extension ${ext.name}: ${e}`);
      return 1;
    }
  }
  /* eslint-enable no-restricted-syntax, no-await-in-loop */

  // #region shared with https://github.com/paranext/paranext-extension-template/blob/main/lib/bump-versions.ts and https://github.com/paranext/paranext/blob/main/lib/bump-versions.ts

  // Commit the changes
  try {
    await execCommand(`git commit -a -m "Bump versions to ${newVersion}"`);
  } catch (e) {
    console.error(`Error on committing changes: ${e}`);
    return 1;
  }
  // Publish the branch and push the changes
  try {
    await execCommand(`git push -u origin HEAD`);
  } catch (e) {
    console.error(`Error on publishing branch and pushing changes: ${e}`);
    return 1;
  }
  console.log(
    `Bumped versions to ${newVersion} and pushed to branch ${branchName}. Please create a pull request to merge this branch into main.`,
  );

  return 0;
})();

// #endregion
