import { startsWith } from 'platform-bible-utils';

/** All command line arguments mapped from argument type to array of aliases for the argument */
type CommandLineArgumentAliases = {
  [argument in COMMAND_LINE_ARGS]: string[];
};

/**
 * Command Line Arguments
 *
 * - Extensions - Command-line argument that specifies extra individual extension folders
 * - ExtensionsDir - Command-line argument that specifies extra extension directories in which to
 *   check all contained folders for extensions
 * - LogLevel - Command-line argument that specifies log level to use Options: 'error' | 'warn' |
 *   'info' | 'verbose' | 'debug'
 * - ResourcesPath - Command-line argument that specifies the path to the resources folder
 * - Packaged - Command-line switch that specifies if the application is packaged. Only on
 *   extension-host
 */
export enum COMMAND_LINE_ARGS {
  Extensions = 'extensions',
  ExtensionsDir = 'extensions_dir',
  LogLevel = 'log_level',
  ResourcesPath = 'resources_path',
  Packaged = 'packaged',
}

/**
 * Aliases for each command line argument mapped from argument type to an array of aliases for that
 * argument type
 */
export const commandLineArgumentsAliases: CommandLineArgumentAliases = {
  [COMMAND_LINE_ARGS.Extensions]: ['--extensions', '--extension', '-e'],
  [COMMAND_LINE_ARGS.ExtensionsDir]: ['--extensionDirs', '--extensionDir', '-d'],
  [COMMAND_LINE_ARGS.LogLevel]: ['--logLevels', '--logLevel', '-l'],
  [COMMAND_LINE_ARGS.ResourcesPath]: ['--resourcesPath', '--resourcePath', '-r'],
  [COMMAND_LINE_ARGS.Packaged]: ['--packaged', '--isPackaged', '-p'],
};

/** Get the index of the next command-line argument after the startIndex */
export function findNextCommandLineArgumentIndex(currentArgIndex: number) {
  let endOfExtensionsIndex = process.argv.length;
  for (let i = currentArgIndex + 1; i < process.argv.length; i++)
    if (startsWith(process.argv[i], '-')) {
      endOfExtensionsIndex = i;
      break;
    }
  return endOfExtensionsIndex;
}

/**
 * Get a command-line argument's group of arguments. If no arguments are in its group, return
 * nothing
 *
 * @param argName Name(s) of the command-line argument to search for
 * @param shouldIncludeArgName Whether to include `argName` at the start of the returned array
 * @returns Array of strings of the command-line args in this command-line argument group
 *
 *   Ex: '--things ben chuck jerry'
 *
 *   - `getCommandLineArgumentsGroup('--things')` returns `['ben', 'chuck', 'jerry']`
 *   - `getCommandLineArgumentsGroup('--things', true)` returns `['--things', 'ben', 'chuck', 'jerry']`
 *
 *   Ex: '--things --stuff ben chuck jerry'
 *
 *   - `getCommandLineArgumentsGroup('--things')` returns `[]`
 *   - `getCommandLineArgumentsGroup('--things', true)` returns `['--things']`
 *
 *   Ex: '--stuff ben chuck jerry'
 *
 *   - `getCommandLineArgumentsGroup('--things')` returns `[]`
 *   - `getCommandLineArgumentsGroup('--things', true)` returns `[]`
 */
export function getCommandLineArgumentsGroup(
  argName: COMMAND_LINE_ARGS,
  shouldIncludeArgName = false,
): string[] {
  const argNames: string[] = commandLineArgumentsAliases[argName];

  const argumentsGroup: string[] = [];
  argNames
    .filter((n) => process.argv.indexOf(n) >= 0)
    .forEach((arg) => {
      const argIndex = process.argv.indexOf(arg);
      const baseArray = shouldIncludeArgName ? [arg] : [];

      argumentsGroup.push(
        ...(process.argv.length > argIndex + 1
          ? [
              ...baseArray,
              ...process.argv.slice(argIndex + 1, findNextCommandLineArgumentIndex(argIndex)),
            ]
          : baseArray),
      );
    });

  return argumentsGroup;
}

/**
 * Get a command-line argument's argument. If the argument is not present, return `undefined`
 *
 * @param argName Name and aliases of the command-line argument to search for
 * @returns String of the command-line arg provided
 *
 *   Ex: '--thing ben'
 *
 *   - `getCommandLineArgument('--thing')` returns `'ben'`
 */
export function getCommandLineArgument(argName: COMMAND_LINE_ARGS) {
  // TODO: If argName has two hyphens, check for single hyphen and first char + capitals if
  // two-hyphen version does not exist. eg --extensionDirs -> -ed
  const argNames: string[] = commandLineArgumentsAliases[argName];
  const argIndices: number[] = argNames.map((name) => process.argv.indexOf(name));

  const argIndex = argIndices.find(
    (index) =>
      // Will be negative if not found
      index >= 0 &&
      //  Ensuring it is not the last argument (the arg name was found, but there is no actual argument provided)
      index < process.argv.length - 1 &&
      // If the next word is also an arg name, there was no actual argument provided
      findNextCommandLineArgumentIndex(index) !== index + 1,
  );

  if (argIndex === undefined) return undefined;

  return process.argv[argIndex + 1];
}

/**
 * Determine whether a command-line argument name is present
 *
 * (a switch is a command-line argument without a value - just a boolean)
 *
 * @param argName Name of the switch to look for
 * @returns True if present, false otherwise
 *
 *   Ex: '--thing --stuff bologna'
 *
 *   - `getCommandLineSwitch('--thing')` returns `true`
 */
export function getCommandLineSwitch(argName: COMMAND_LINE_ARGS) {
  const argNames: string[] = commandLineArgumentsAliases[argName];
  return argNames.some((alias) => process.argv.includes(alias));
}
