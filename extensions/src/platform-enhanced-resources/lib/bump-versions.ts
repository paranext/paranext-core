import fs from 'fs';
import { checkForWorkingChanges, execCommand } from './git.util';

// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/lib/bump-versions.ts

// This script checks out a new branch, bumps the versions of all extensions in the repo,
// and then commits the changes. It is generally expected that you will be on `main` when you run
// this script.

// Provide the new version as a command line argument e.g. `npx ts-node ./lib/bump-versions.ts 1.2.3-alpha.0`
// Provide `--allow-working-changes` after the version to allow working changes to be part of making
// the new version (useful if you want to do other things related to versioning before running this)

const newVersion = process.argv[2];
const shouldAllowWorkingChanges = process.argv.includes('--allow-working-changes');

// #endregion

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/lib/bump-versions.ts and https://github.com/paranext/paranext/blob/main/lib/bump-versions.ts

(async () => {
  // Make sure there are not working changes so we don't interfere with normal edits
  if (!shouldAllowWorkingChanges && (await checkForWorkingChanges())) process.exit(1);

  const branchName = `bump-versions-${newVersion}`;

  // Checkout a new branch
  try {
    await execCommand(`git checkout -b ${branchName}`);
  } catch (e) {
    console.error(`Error on git checkout: ${e}`);
    process.exit(1);
  }

  const bumpVersionCommand = `npm version ${newVersion} --git-tag-version false`;

  // Bump the version at top level
  try {
    await execCommand(bumpVersionCommand);
  } catch (e) {
    console.error(`Error on bumping version: ${e}`);
    process.exit(1);
  }

  // #endregion

  // Bump the manifest version in the extension
  try {
    const manifestPath = 'manifest.json';
    const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
    const updatedManifest = { ...manifest, version: newVersion };
    // Write the updated manifest to the extension directory
    await fs.promises.writeFile(
      manifestPath,
      `${JSON.stringify(updatedManifest, undefined, 2)}\n`,
      'utf8',
    );
  } catch (e) {
    console.error(`Error on bumping manifest version: ${e}`);
    process.exit(1);
  }

  // #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/lib/bump-versions.ts and https://github.com/paranext/paranext/blob/main/lib/bump-versions.ts

  // Format the changes
  try {
    await execCommand(`npm run format`);
  } catch (e) {
    console.error(`Error on formatting changes: ${e}`);
    process.exit(1);
  }

  // Commit the changes
  try {
    await execCommand(`git commit -a -m "Bump versions to ${newVersion}"`);
  } catch (e) {
    console.error(`Error on committing changes: ${e}`);
    process.exit(1);
  }
  // Publish the branch and push the changes
  try {
    await execCommand(`git push -u origin HEAD`);
  } catch (e) {
    console.error(`Error on publishing branch and pushing changes: ${e}`);
    process.exit(1);
  }
  console.log(
    `Bumped versions to ${newVersion} and pushed to branch ${branchName}. Please create a pull request to merge this branch into main.`,
  );

  process.exit(0);
})();

// #endregion
