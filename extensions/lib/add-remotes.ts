import {
  ERROR_STRINGS,
  MULTI_TEMPLATE_NAME,
  MULTI_TEMPLATE_URL,
  SINGLE_TEMPLATE_NAME,
  SINGLE_TEMPLATE_URL,
  execCommand,
} from './git.util';

// This script runs as `extensions`' postinstall, which happens before the root's install scripts.
// Do not import `platform-bible-utils` (or anything that loads it) here: its entry point requires
// `@eten-tech-foundation/scripture-utilities`, whose staged folder may not exist yet on a fresh
// clone — the import would abort the whole install. `extensions`' own dependencies (via
// `./git.util`) are fine; only the staged dev packages are unavailable at this point.

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
