import { includes } from 'platform-bible-utils';
import {
  ERROR_STRINGS,
  MULTI_TEMPLATE_BRANCH,
  MULTI_TEMPLATE_NAME,
  SINGLE_TEMPLATE_BRANCH,
  SINGLE_TEMPLATE_NAME,
  checkForWorkingChanges,
  execCommand,
  fetchFromSingleTemplate,
  formatExtensionFolder,
  formatExtensionsRoot,
  resolvePackageLockConflicts,
} from './git.util';
import { ExtensionInfo, getExtensions, subtreeRootFolder } from '../webpack/webpack.util';

(async () => {
  // Make sure there are not working changes as this will not work with working changes
  if (await checkForWorkingChanges()) return 1;

  // Fetch latest MULTI_TEMPLATE_REMOTE_NAME branch
  try {
    await execCommand(`git fetch ${MULTI_TEMPLATE_NAME} ${MULTI_TEMPLATE_BRANCH}`);
  } catch (e) {
    console.error(`Error on git fetch on ${MULTI_TEMPLATE_NAME}: ${e}`);
    return 1;
  }

  // Merge changes from MULTI_TEMPLATE_REMOTE_NAME into this repo
  try {
    await execCommand(
      `git subtree pull --prefix ${subtreeRootFolder} ${MULTI_TEMPLATE_NAME} ${MULTI_TEMPLATE_BRANCH} --squash`,
    );
  } catch (e) {
    const { resolved, remainingConflicts } = await resolvePackageLockConflicts();

    if (resolved > 0 && remainingConflicts.length === 0) {
      // MERGE_HEAD exists; git prepared a squash-merge commit message. --no-edit reuses it.
      await execCommand('git commit --no-edit');
      console.log(
        `Auto-resolved ${resolved} package-lock.json conflict(s) by deleting unused lock files. Continuing.`,
      );
      // Fall through — do not return 1
    } else if (resolved > 0 && remainingConflicts.length > 0) {
      console.error(
        `Auto-resolved package-lock.json conflicts, but other merge conflicts remain:\n  ${remainingConflicts.join('\n  ')}`,
      );
      return 1;
    } else if (remainingConflicts.length > 0) {
      // No package-lock.json conflicts resolved — other conflicts exist
      console.error(
        `Merge conflicts remain:\n  ${remainingConflicts.join('\n  ')}\n\nOriginal error: ${e}`,
      );
      return 1;
    } else {
      // No conflict lines at all — error was something other than a merge conflict
      console.error(`Error merging from ${MULTI_TEMPLATE_NAME}: ${e}`);
      return 1;
    }
  }

  await formatExtensionsRoot();

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
      await execCommand(
        `git subtree pull --prefix ${ext.dirPathOSIndependent} ${SINGLE_TEMPLATE_NAME} ${SINGLE_TEMPLATE_BRANCH} --squash`,
      );

      // We successfully pulled this subtree, so it is based on the template
      extensionsBasedOnTemplate.push(ext);
    } catch (e) {
      if (
        e instanceof Error &&
        includes(
          e.toString().toLowerCase(),
          ERROR_STRINGS.subtreeNeverAdded.replace('{0}', ext.dirPathOSIndependent).toLowerCase(),
        )
      )
        // If this folder isn't a subtree, it may be intentionally not based on the template. Continue
        console.warn(
          `${ext.dirName} was never added as a subtree of ${SINGLE_TEMPLATE_NAME}. Feel free to ignore this if this folder is not supposed to be based on ${SINGLE_TEMPLATE_NAME}.\nIf this folder is supposed to be based on ${SINGLE_TEMPLATE_NAME}, move the folder elsewhere, run \`npm run create-extension -- ${ext.dirName}\`, drop the folder back in, and evaluate all working changes before committing.\n`,
        );
      else {
        // You can only fix merge conflicts on one subtree at a time, so stop
        // if we hit an error like merge conflicts
        // eslint-disable-next-line no-await-in-loop
        const { resolved, remainingConflicts } = await resolvePackageLockConflicts();

        if (resolved > 0 && remainingConflicts.length === 0) {
          // eslint-disable-next-line no-await-in-loop
          await execCommand('git commit --no-edit');
          console.log(
            `Auto-resolved ${resolved} package-lock.json conflict(s) in ${ext.dirName} by deleting unused lock files. Continuing.`,
          );
          extensionsBasedOnTemplate.push(ext);
        } else if (resolved > 0 && remainingConflicts.length > 0) {
          console.error(
            `Auto-resolved package-lock.json conflicts in ${ext.dirName}, but other merge conflicts remain:\n  ${remainingConflicts.join('\n  ')}`,
          );
          return 1;
        } else if (remainingConflicts.length > 0) {
          console.error(
            `Merge conflicts in ${ext.dirName}:\n  ${remainingConflicts.join('\n  ')}\n\nOriginal error: ${e}`,
          );
          return 1;
        } else {
          console.error(`Error pulling from ${SINGLE_TEMPLATE_NAME} to ${ext.dirName}: ${e}`);
          return 1;
        }
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
