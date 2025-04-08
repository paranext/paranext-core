import {
  ERROR_STRINGS,
  MULTI_TEMPLATE_NAME,
  MULTI_TEMPLATE_URL,
  SINGLE_TEMPLATE_NAME,
  SINGLE_TEMPLATE_URL,
  execCommand,
} from './git.util';

(async () => {
  let exitCode = 0;

  // Helper function to handle remote addition
  async function addRemote(name: string, url: string, errorString: string) {
    try {
      await execCommand(`git remote add ${name} ${url}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes(errorString.toLowerCase())) {
          console.log(`Remote ${name} already exists. This is likely not a problem.`);
        } else {
          console.error(`Error on adding remote ${name}: ${error.message}`);
          return 1;
        }
      } else {
        console.error(`An unknown error occurred while adding remote ${name}: ${error}`);
        return 1;
      }
    }
    return 0;
  }

  // Try adding MULTI_TEMPLATE_REMOTE_NAME
  exitCode = await addRemote(
    MULTI_TEMPLATE_NAME,
    MULTI_TEMPLATE_URL,
    ERROR_STRINGS.multiRemoteExists,
  );
  if (exitCode !== 0) return exitCode;

  // Try adding SINGLE_TEMPLATE_REMOTE_NAME
  exitCode = await addRemote(
    SINGLE_TEMPLATE_NAME,
    SINGLE_TEMPLATE_URL,
    ERROR_STRINGS.singleRemoteExists,
  );

  return exitCode;
})();
