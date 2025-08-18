import { checkForWorkingChanges, execCommand } from '../../extensions/lib/git.util';
import webpackPaths from '../configs/webpack.paths';

// This script bumps the versions of core and then runs the `bump-versions` npm script in the
// extensions folder in the repo. This will create a new branch with the version changes. It is
// generally expected that you will be on `main` or `release-prep` when you run this script.

// Provide the new version as a command line argument e.g. `node bump-versions.js 1.2.3-alpha.0`
// Provide `--allow-working-changes` after the version to allow working changes to be part of making
// the new version (useful if you want to do other things related to versioning before running this)

const newVersion = process.argv[2];
const shouldAllowWorkingChanges = process.argv.includes('--allow-working-changes');

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
