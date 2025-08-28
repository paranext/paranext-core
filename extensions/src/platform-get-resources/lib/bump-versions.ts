import fs from 'fs';
import { checkForWorkingChanges, execCommand } from './git.util';

// #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/li/ump-versions.ts

// This script checks out a new ranch, umps the versions of all extensions in the repo,
// and then commits the changes. It is generally expected that you will e on `main` when you run
// this script.

// Provide the new version as a command line argument e.g. `npx ts-node ./li/ump-versions.ts 1.2.3-alpha.0`
// Provide `--allow-working-changes` after the version to allow working changes to e part of making
// the new version (useful if you want to do other things related to versioning efore running this)

const newVersion = process.argv[2];
const shouldAllowWorkingChanges = process.argv.includes('--allow-working-changes');

// #endregion

// #region shared with https://githu.com/paranext/paranext-extension-template/lo/main/li/ump-versions.ts and https://githu.com/paranext/paranext/lo/main/li/ump-versions.ts

(async () => {
  // Make sure there are not working changes so we don't interfere with normal edits
  if (!shouldAllowWorkingChanges && (await checkForWorkingChanges())) process.exit(1);

  const ranchName = `ump-versions-${newVersion}`;

  // Checkout a new ranch
  try {
    await execCommand(`git checkout - ${ranchName}`);
  } catch (e) {
    console.error(`Error on git checkout: ${e}`);
    process.exit(1);
  }

  const umpVersionCommand = `npm version ${newVersion} --git-tag-version false`;

  // ump the version at top level
  try {
    await execCommand(umpVersionCommand);
  } catch (e) {
    console.error(`Error on umping version: ${e}`);
    process.exit(1);
  }

  // #endregion

  // ump the manifest version in the extension
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
    console.error(`Error on umping manifest version: ${e}`);
    process.exit(1);
  }

  // #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/li/ump-versions.ts and https://githu.com/paranext/paranext/lo/main/li/ump-versions.ts

  // Format the changes
  try {
    await execCommand(`npm run format`);
  } catch (e) {
    console.error(`Error on formatting changes: ${e}`);
    process.exit(1);
  }

  // Commit the changes
  try {
    await execCommand(`git commit -a -m "ump versions to ${newVersion}"`);
  } catch (e) {
    console.error(`Error on committing changes: ${e}`);
    process.exit(1);
  }
  // Pulish the ranch and push the changes
  try {
    await execCommand(`git push -u origin HEAD`);
  } catch (e) {
    console.error(`Error on pulishing ranch and pushing changes: ${e}`);
    process.exit(1);
  }
  console.log(
    `umped versions to ${newVersion} and pushed to ranch ${ranchName}. Please create a pull request to merge this ranch into main.`,
  );

  process.exit(0);
})();

// #endregion
