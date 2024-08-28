import {
  ERROR_STRINGS,
  MULTI_TEMPLATE_BRANCH,
  MULTI_TEMPLATE_NAME,
  SINGLE_TEMPLATE_BRANCH,
  SINGLE_TEMPLATE_NAME,
  checkForWorkingChanges,
  execGitCommand,
  fetchFromSingleTemplate,
  formatExtensionFolder,
} from './git.util';
import { ExtensionInfo, getExtensions } from '../webpack/webpack.util';

(async () => {
  // Make sure there are not working changes as this will not work with working changes
  if (await checkForWorkingChanges()) return 1;

  // Fetch latest MULTI_TEMPLATE_REMOTE_NAME branch
  try {
    await execGitCommand(`git fetch ${MULTI_TEMPLATE_NAME} ${MULTI_TEMPLATE_BRANCH}`);
  } catch (e) {
    console.error(`Error on git fetch on ${MULTI_TEMPLATE_NAME}: ${e}`);
    return 1;
  }

  // Merge changes from MULTI_TEMPLATE_REMOTE_NAME into this repo
  try {
    await execGitCommand(
      `git merge ${MULTI_TEMPLATE_NAME}/${MULTI_TEMPLATE_BRANCH} --allow-unrelated-histories`,
    );
  } catch (e) {
    console.error(`Error merging from ${MULTI_TEMPLATE_NAME}: ${e}`);
    return 1;
  }

  // Fetch latest on SINGLE_TEMPLATE_REMOTE_NAME to make sure we're up to date
  if (!(await fetchFromSingleTemplate())) return 1;

  // Get list of extensions to update
  /** All extension folders in this repo */
  const extensions = await getExtensions();
  /**
   * Extensions in this repo that are git subtrees of SINGLE_TEMPLATE_REMOTE_NAME
   *
   * We will perform various updates on these extensions but not on ones that are not based on the
   * template.
   */
  const extensionsBasedOnTemplate: ExtensionInfo[] = [];

  // Merge changes from SINGLE_TEMPLATE_REMOTE_NAME into each extension one at a time
  // We intend to run these one at a time, so for/of works well here
  // eslint-disable-next-line no-restricted-syntax
  for (const ext of extensions) {
    try {
      // We intend to run these one at a time, so awaiting inside the loop works well here
      // eslint-disable-next-line no-await-in-loop
      await execGitCommand(
        `git subtree pull --prefix ${ext.dirPathOSIndependent} ${SINGLE_TEMPLATE_NAME} ${SINGLE_TEMPLATE_BRANCH} --squash`,
      );

      // We successfully pulled this subtree, so it is based on the template
      extensionsBasedOnTemplate.push(ext);
    } catch (e) {
      if (
        e
          .toString()
          .toLowerCase()
          .includes(
            ERROR_STRINGS.subtreeNeverAdded.replace('{0}', ext.dirPathOSIndependent).toLowerCase(),
          )
      )
        // If this folder isn't a subtree, it may be intentionally not based on the template. Continue
        console.warn(
          `${ext.dirName} was never added as a subtree of ${SINGLE_TEMPLATE_NAME}. Feel free to ignore this if this folder is not supposed to be based on ${SINGLE_TEMPLATE_NAME}.\nIf this folder is supposed to be based on ${SINGLE_TEMPLATE_NAME}, move the folder elsewhere, run \`npm run create-extension -- ${ext.dirName}\`, drop the folder back in, and evaluate all working changes before committing.\n`,
        );
      else {
        console.error(`Error pulling from ${SINGLE_TEMPLATE_NAME} to ${ext.dirName}: ${e}`);
        // You can only fix merge conflicts on one subtree at a time, so stop
        // if we hit an error like merge conflicts
        return 1;
      }
    }
  }

  // Now that pulling all subtrees is finished and we can have working changes, format all the
  // SINGLE_TEMPLATE_REMOTE_NAME-based extension folders to make sure they work properly as subfolders of this
  // repo
  await Promise.all(
    extensionsBasedOnTemplate.map((ext) => formatExtensionFolder(ext.dirPathOSIndependent)),
  );

  // Check for working changes to see if formatting the extensions changed anything
  // Don't commit for them so they know what is going on
  if (await checkForWorkingChanges(true))
    console.log(
      `After updating extensions from ${SINGLE_TEMPLATE_NAME} and formatting them, there are working changes.\nThis is likely expected. Please commit the result.`,
    );

  return 0;
})();
