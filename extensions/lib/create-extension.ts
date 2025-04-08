import {
  SINGLE_TEMPLATE_BRANCH,
  SINGLE_TEMPLATE_NAME,
  checkForWorkingChanges,
  execCommand,
  fetchFromSingleTemplate,
  formatExtensionFolder,
} from './git.util';
import { getExtensionPath } from '../webpack/webpack.util';

const newExtensionName = process.argv[2];

(async () => {
  // Make sure there are not working changes as this will not work with working changes
  if (await checkForWorkingChanges()) return 1;

  // Fetch latest on SINGLE_TEMPLATE_REMOTE_NAME to make sure we're up to date
  if (!(await fetchFromSingleTemplate())) return 1;

  /**
   * Path to the extension to format relative to root
   *
   * WARNING: This does not use the operating system's path separator because it needs to be
   * consistent for use in git commands. If you need an OS-dependent path separator, make a new
   * path
   */
  const extensionPathOSIndependent = getExtensionPath(newExtensionName, true);

  // Try putting SINGLE_TEMPLATE_REMOTE_NAME into a new extension folder
  try {
    await execCommand(
      `git subtree add --prefix ${extensionPathOSIndependent} ${SINGLE_TEMPLATE_NAME} ${SINGLE_TEMPLATE_BRANCH} --squash`,
    );
  } catch (e) {
    console.error(`Error on adding extension ${newExtensionName}: ${e}`);
    return 1;
  }

  // Format the new extension folder to make sure it works properly as a subfolder of this repo
  await formatExtensionFolder(extensionPathOSIndependent);

  // Check for working changes to see if formatting the extension changed anything
  // Don't commit for them so they know what is going on
  if (await checkForWorkingChanges(true))
    console.log(
      `After creating the extension at ${extensionPathOSIndependent} from ${SINGLE_TEMPLATE_NAME} and formatting it, there are working changes.\nThis is likely expected. Please commit the result.`,
    );

  return 0;
})();
