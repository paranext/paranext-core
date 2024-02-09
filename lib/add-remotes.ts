import {
  ERROR_STRINGS,
  MULTI_TEMPLATE_NAME,
  MULTI_TEMPLATE_URL,
  SINGLE_TEMPLATE_NAME,
  SINGLE_TEMPLATE_URL,
  execGitCommand,
} from './git.util';

(async () => {
  let exitCode = 0;
  // Try adding MULTI_TEMPLATE_REMOTE_NAME
  try {
    await execGitCommand(`git remote add ${MULTI_TEMPLATE_NAME} ${MULTI_TEMPLATE_URL}`);
  } catch (e) {
    if (e.toString().toLowerCase().includes(ERROR_STRINGS.multiRemoteExists.toLowerCase()))
      console.log(`Remote ${MULTI_TEMPLATE_NAME} already exists. This is likely not a problem.`);
    else {
      console.error(`Error on adding remote ${MULTI_TEMPLATE_NAME}: ${e}`);
      exitCode = 1;
    }
  }

  // Try adding SINGLE_TEMPLATE_REMOTE_NAME
  try {
    await execGitCommand(`git remote add ${SINGLE_TEMPLATE_NAME} ${SINGLE_TEMPLATE_URL}`);
  } catch (e) {
    if (e.toString().toLowerCase().includes(ERROR_STRINGS.singleRemoteExists.toLowerCase()))
      console.log(`Remote ${SINGLE_TEMPLATE_NAME} already exists. This is likely not a problem.`);
    else {
      console.error(`Error on adding remote ${SINGLE_TEMPLATE_NAME}: ${e}`);
      exitCode = 1;
    }
  }

  return exitCode;
})();
