/** Command-line argument that specifies extra individual extension folders */
export const ARG_EXTENSIONS = '--extensions';
/**
 * Command-line argument that specifies extra extension directories in which to check all contained
 * folders for extensions
 */
export const ARG_EXTENSION_DIRS = '--extensionDirs';

/**
 * Command-line argument that specifies log level to use
 *
 * Options: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'
 *
 * @see module:electron-log#LogLevel for up-to-date options
 */
export const ARG_LOG_LEVEL = '--logLevel';

/** Command-line argument that specifies the path to the resources folder */
export const ARG_RESOURCES_PATH = '--resourcesPath';

/** Command-line switch that specifies if the application is packaged. Only on extension-host */
export const ARG_PACKAGED = '--packaged';

/** Get the index of the next command-line argument after the startIndex */
export function findNextCommandLineArgumentIndex(currentArgIndex: number) {
  let endOfExtensionsIndex = process.argv.length;
  for (let i = currentArgIndex + 1; i < process.argv.length; i++)
    if (process.argv[i].startsWith('-')) {
      endOfExtensionsIndex = i;
      break;
    }
  return endOfExtensionsIndex;
}

/**
 * Get a command-line argument's group of arguments. If no arguments are in its group, return nothing
 *
 * @param argName name of the command-line argument to search for
 * @param shouldIncludeArgName whether to include `argName` at the start of the returned array
 * @returns array of strings of the command-line args in this command-line argument group
 *
 * ex: '--things ben chuck jerry'
 *
 * - `getCommandLineArgumentsGroup('--things')` returns `['ben', 'chuck', 'jerry']`
 *
 * - `getCommandLineArgumentsGroup('--things', true)` returns `['--things', 'ben', 'chuck', 'jerry']`
 *
 *
 * ex: '--things --stuff ben chuck jerry'
 *
 * - `getCommandLineArgumentsGroup('--things')` returns `[]`
 *
 * - `getCommandLineArgumentsGroup('--things', true)` returns `['--things']`
 *
 *
 * ex: '--stuff ben chuck jerry'
 *
 * - `getCommandLineArgumentsGroup('--things')` returns `[]`
 *
 * - `getCommandLineArgumentsGroup('--things', true)` returns `[]`
 */
export function getCommandLineArgumentsGroup(argName: string, shouldIncludeArgName = false) {
  // TODO: If argName has two hyphens, check for single hyphen and first char + capitals if
  // two-hyphen version does not exist. eg --extensionDirs -> -ed
  const argIndex = process.argv.indexOf(argName);

  if (argIndex < 0) return [];

  const baseArray = shouldIncludeArgName ? [argName] : [];

  return process.argv.length > argIndex + 1
    ? [
        ...baseArray,
        ...process.argv.slice(argIndex + 1, findNextCommandLineArgumentIndex(argIndex)),
      ]
    : baseArray;
}

/**
 * Get a command-line argument's argument. If the argument is not present, return `undefined`
 *
 * @param argName name of the command-line argument to search for
 * @returns string of the command-line arg provided
 *
 * ex: '--thing ben'
 *
 * - `getCommandLineArgument('--thing')` returns `'ben'`
 */
export function getCommandLineArgument(argName: string) {
  // TODO: If argName has two hyphens, check for single hyphen and first char + capitals if
  // two-hyphen version does not exist. eg --extensionDirs -> -ed
  const argIndex = process.argv.indexOf(argName);

  if (
    // Not found
    argIndex < 0 ||
    // Last argument (the arg name was found, but there is no actual argument provided)
    argIndex >= process.argv.length - 1 ||
    // If the next word is also an arg name, there was no actual argument provided
    findNextCommandLineArgumentIndex(argIndex) === argIndex + 1
  )
    return undefined;

  return process.argv[argIndex + 1];
}

/**
 * Determine whether a command-line argument name is present
 *
 * (a switch is a command-line argument without a value - just a boolean)
 * @param argName name of the switch to look for
 * @returns true if present, false otherwise
 *
 * ex: '--thing --stuff bologna'
 *
 * - `getCommandLineSwitch('--thing')` returns `true`
 */
export function getCommandLineSwitch(argName: string) {
  return process.argv.includes(argName);
}
