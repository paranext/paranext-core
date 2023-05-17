/** Command-line argument that specifies extra individual extension folders */
export const ARG_EXTENSIONS = '--extensions';
/**
 * Command-line argument that specifies extra extension directories in which to check all contained
 * folders for extensions
 */
export const ARG_EXTENSION_DIRS = '--extensionDirs';

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
