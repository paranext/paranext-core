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
import { ExtensionInfo, getExtensions } from '../webpack/webpack.util';

/**
 * After a failed `git subtree pull` or `git merge`, attempts to auto-resolve any conflicts that are
 * solely unused workspace `package-lock.json` files, then commits if fully resolved.
 *
 * @param context Human-readable label for error messages (template name or extension name)
 * @param originalError The error thrown by the failed merge/pull
 * @returns `'resolved'` if all conflicts were resolved and committed, `'failed'` otherwise (errors
 *   already logged)
 */
async function handleConflicts(
  context: string,
  originalError: unknown,
): Promise<'resolved' | 'failed'> {
  const { resolved, remainingConflicts } = await resolvePackageLockConflicts();

  if (resolved > 0 && remainingConflicts.length === 0) {
    // MERGE_HEAD exists; git prepared a commit message. --no-edit reuses it.
    await execCommand('git commit --no-edit');
    console.log(
      `Auto-resolved ${resolved} package-lock.json conflict(s) in ${context} by deleting unused lock files. Continuing.`,
    );
    return 'resolved';
  }

  if (resolved > 0) {
    console.error(
      `Auto-resolved package-lock.json conflicts in ${context}, but other merge conflicts remain:\n  ${remainingConflicts.join('\n  ')}`,
    );
  } else if (remainingConflicts.length > 0) {
    // No package-lock.json conflicts resolved — other conflicts exist
    console.error(
      `Merge conflicts in ${context}:\n  ${remainingConflicts.join('\n  ')}\n\nOriginal error: ${originalError}`,
    );
  } else {
    // No conflict lines at all — error was something other than a merge conflict
    console.error(`Error in ${context}: ${originalError}`);
  }
  return 'failed';
}

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
      `git merge ${MULTI_TEMPLATE_NAME}/${MULTI_TEMPLATE_BRANCH} --allow-unrelated-histories`,
    );
  } catch (e) {
    if ((await handleConflicts('extensions root', e)) === 'failed') return 1;
    // Fall through — do not return 1
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
  // Subtree pulls must run one at a time: a merge conflict on one subtree leaves the repo in a
  // conflicted state that blocks any further subtree work until it is resolved or aborted.
  // eslint-disable-next-line no-restricted-syntax
  for (const ext of extensions) {
    try {
      // Intentional sequential await — one subtree pull must finish before the next begins
      // eslint-disable-next-line no-await-in-loop
      await execCommand(
        `git subtree pull --prefix ${ext.dirPathOSIndependent} ${SINGLE_TEMPLATE_NAME} ${SINGLE_TEMPLATE_BRANCH} --squash`,
      );

      // We successfully pulled this subtree, so it is based on the template
      extensionsBasedOnTemplate.push(ext);
    } catch (e) {
      if (
        e instanceof Error &&
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
        // You can only fix merge conflicts on one subtree at a time, so stop
        // if we hit an error like merge conflicts
        // Awaiting inside the loop is intentional — one subtree at a time
        // eslint-disable-next-line no-await-in-loop
        if ((await handleConflicts(ext.dirName, e)) === 'failed') return 1;
        extensionsBasedOnTemplate.push(ext);
      }
    }
  }

  // Now that pulling all subtrees is finished and we can have working changes, format all the
  // SINGLE_TEMPLATE_REMOTE_NAME-based extension folders to make sure they work properly as subfolders of this
  // repo. Also format the repo root (e.g. delete unused lock files) in the same pass.
  await Promise.all([
    formatExtensionsRoot(),
    ...extensionsBasedOnTemplate.map((ext) => formatExtensionFolder(ext.dirPathOSIndependent)),
  ]);

  // Check for working changes to see if formatting the extensions changed anything
  // Don't commit for them so they know what is going on
  if (await checkForWorkingChanges(true))
    console.log(
      `After updating extensions from ${SINGLE_TEMPLATE_NAME} and formatting them, there are working changes.\nThis is likely expected. Please commit the result.`,
    );

  return 0;
})();
