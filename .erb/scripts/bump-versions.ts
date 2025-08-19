import fs from 'fs';
import path from 'path';
import { checkForWorkingChanges, execCommand } from '../../extensions/lib/git.util';
import webpackPaths from '../configs/webpack.paths';

// This script bumps the versions of core and then runs the `bump-versions` npm script in the
// extensions folder in the repo. This will create a new branch with the version changes. It is
// generally expected that you will be on `main` or `release-prep` when you run this script.

// Provide the new version as a command line argument e.g. `node bump-versions.js 1.2.3-alpha.0`
// Provide `--allow-working-changes` after the version to allow working changes to be part of making
// the new version (useful if you want to do other things related to versioning before running this)
// Provide `--marketing-version blah` after the version to set a marketing version
// Provide `--marketing-version-moniker blah2` after the version to set a marketing version moniker

const newVersion = process.argv[2];
const shouldAllowWorkingChanges = process.argv.includes('--allow-working-changes');

const newMarketingVersionIndex = process.argv.indexOf('--marketing-version');
const newMarketingVersion =
  newMarketingVersionIndex >= 0 && newMarketingVersionIndex < process.argv.length - 1
    ? process.argv[newMarketingVersionIndex + 1]
    : '';

const newMarketingVersionMonikerIndex = process.argv.indexOf('--marketing-version-moniker');
const newMarketingVersionMoniker =
  newMarketingVersionMonikerIndex >= 0 && newMarketingVersionMonikerIndex < process.argv.length - 1
    ? process.argv[newMarketingVersionMonikerIndex + 1]
    : '';

(async () => {
  // Make sure there are not working changes so we don't interfere with normal edits
  if (!shouldAllowWorkingChanges && (await checkForWorkingChanges())) process.exit(1);

  const bumpVersionCommand = `npm version ${newVersion} --git-tag-version false`;

  // Bump core's version
  try {
    await execCommand(bumpVersionCommand, {
      cwd: webpackPaths.appPath,
    });
  } catch (e) {
    console.error(`Error on bumping version: ${e}`);
    process.exit(1);
  }

  // Set marketing version and moniker in release/app/package.json
  if (newMarketingVersion || newMarketingVersionMoniker) {
    try {
      // Read the release/app/package.json
      const releasePackageJsonPath = path.resolve(webpackPaths.appPath, 'package.json');
      const releasePackage = JSON.parse(await fs.promises.readFile(releasePackageJsonPath, 'utf8'));

      const updatedReleasePackage = {
        ...releasePackage,
        marketingVersion: newMarketingVersion,
        marketingVersionMoniker: newMarketingVersionMoniker,
      };

      // Write the updated release/app/package.json
      await fs.promises.writeFile(
        releasePackageJsonPath,
        `${JSON.stringify(updatedReleasePackage, undefined, 2)}\n`,
        'utf8',
      );
    } catch (e) {
      console.error(`Error while updating marketing version and moniker: ${e}`);
      process.exit(1);
    }
  }

  // Lint fix the changes
  try {
    await execCommand(`npm run format`);
  } catch (e) {
    console.error(`Error on formatting changes: ${e}`);
    process.exit(1);
  }

  // Run extensions' bump-versions script
  try {
    await execCommand(`npm run bump-versions -- ${newVersion} --allow-working-changes`, {
      cwd: webpackPaths.extensionsPath,
    });
  } catch (e) {
    console.error(`Error on bumping version: ${e}`);
    process.exit(1);
  }

  console.log(
    `Bumped versions to ${newVersion}. Please create a pull request to merge the new branch into main.`,
  );

  process.exit(0);
})();

// #endregion
