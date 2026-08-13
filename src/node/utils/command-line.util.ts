import { startsWith } from 'platform-bible-utils';

/** All command line arguments mapped from argument type to array of aliases for the argument */
type CommandLineArgumentAliases = {
  [argument in CommandLineArgs]: string[];
};

/**
 * Command-line arguments
 *
 * - Extensions - Command-line argument that specifies extra individual extension folders
 *
 *   - Note: when running in Snap on Linux, if an unzipped extension folder is provided this way, that
 *       extension will not be able to launch separate processes.
 * - ExtensionsDir - Command-line argument that specifies extra extension directories in which to
 *   check all contained folders for extensions
 *
 *   - Note: when running in Snap on Linux, if unzipped extension folders are provided this way, those
 *       extensions will not be able to launch separate processes.
 * - LogLevel - Command-line argument that specifies log level to use Options: 'error' | 'warn' |
 *   'info' | 'verbose' | 'debug'
 * - ResourcesPath - Command-line argument that specifies the path to the resources folder
 * - Packaged - Command-line switch that specifies if the application is packaged. Only on
 *   extension-host
 * - Portable - Command-line switch that specifies if the application is a windows portable app. Only
 *   on extension-host
 * - DidRestart - Command-line switch that specifies that the extension host was restarted and should
 *   act accordingly, e.g. it should announce that the extensions reloaded. Only on extension-host
 * - WindowSize - Command-line argument that specifies the initial window size as WIDTHxHEIGHT (e.g.
 *   1920x1080). Overrides the saved window state dimensions.
 * - Maximize - Command-line switch that specifies that the renderer should be maximized on launch.
 *   Only on main process
 * - SpikeParentWindow - PT-4276 spike only. Makes every window after the first a `parent:`-owned
 *   child of the first window so Q3 can be observed: does an owned window keep its own OS switcher
 *   entry? Not intended to ship. Only on main process
 * - SpikeAllowWindowOpen - PT-4276 spike only. Makes `setWindowOpenHandler` return 'allow' instead of
 *   denying and diverting to the default browser, so Q5 can be observed: does renderer-initiated
 *   window creation still crash on Electron 39.8.8? Not intended to ship — denying is a deliberate
 *   security posture. Only on main process
 * - SpikePanelWindow - PT-4314 spike only. Creates every window after the first with `type: 'panel'`
 *   (an NSPanel on macOS) so the panel candidate for pinning can be observed: does a panel float
 *   above the app's own windows without floating above other applications, and does it keep its
 *   Cmd+backtick entry? A window's type is fixed at creation, which is why this is a launch switch
 *   rather than a runtime toggle like the other PT-4314 candidates. Not intended to ship. Only on
 *   main process
 */
export enum CommandLineArgs {
  Extensions = 'extensions',
  ExtensionsDir = 'extensions_dir',
  LogLevel = 'log_level',
  ResourcesPath = 'resources_path',
  Packaged = 'packaged',
  Portable = 'portable',
  DidRestart = 'didRestart',
  WindowSize = 'window_size',
  Maximize = 'maximize',
  SpikeParentWindow = 'spike_parent_window',
  SpikeAllowWindowOpen = 'spike_allow_window_open',
  SpikePanelWindow = 'spike_panel_window',
}

/**
 * Aliases for each command line argument mapped from argument type to an array of aliases for that
 * argument type
 */
export const commandLineArgumentsAliases: CommandLineArgumentAliases = {
  [CommandLineArgs.Extensions]: ['--extensions', '--extension', '-e'],
  [CommandLineArgs.ExtensionsDir]: ['--extensionDirs', '--extensionDir', '-d'],
  [CommandLineArgs.LogLevel]: ['--logLevels', '--logLevel', '-l'],
  [CommandLineArgs.ResourcesPath]: ['--resourcesPath', '--resourcePath', '-r'],
  [CommandLineArgs.Packaged]: ['--packaged', '--isPackaged', '-p'],
  [CommandLineArgs.Portable]: ['--portable'],
  [CommandLineArgs.DidRestart]: ['--didRestart'],
  [CommandLineArgs.WindowSize]: ['--windowSize', '--window-size'],
  [CommandLineArgs.Maximize]: ['--maximize'],
  [CommandLineArgs.SpikeParentWindow]: ['--spikeParentWindow', '--spike-parent-window'],
  [CommandLineArgs.SpikeAllowWindowOpen]: ['--spikeAllowWindowOpen', '--spike-allow-window-open'],
  [CommandLineArgs.SpikePanelWindow]: ['--spikePanelWindow', '--spike-panel-window'],
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
  argName: CommandLineArgs,
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
export function getCommandLineArgument(argName: CommandLineArgs) {
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
export function getCommandLineSwitch(argName: CommandLineArgs) {
  const argNames: string[] = commandLineArgumentsAliases[argName];
  return argNames.some((alias) => process.argv.includes(alias));
}

/**
 * Strip a single matching pair of wrapping quote characters (`'...'` or `"..."`) from a raw
 * command-line argument.
 *
 * Some dev workflows use process managers (e.g., `concurrently` on Windows) that quote arguments
 * for a POSIX shell but then execute them via `cmd.exe`, which does not strip the quotes. The
 * literal quotes then end up as part of the value instead of being removed.
 *
 * @param rawArg Raw command-line argument value, possibly wrapped in a single matching pair of
 *   quote characters
 * @returns `rawArg` with a single matching pair of wrapping quotes removed, or `rawArg` unchanged
 *   if it is not wrapped in a matching pair of quotes
 *
 *   Ex: `stripWrappingQuotes('"C:\\foo"')` returns `'C:\\foo'`
 *
 *   Ex: `stripWrappingQuotes('C:\\foo')` returns `'C:\\foo'`
 */
export function stripWrappingQuotes(rawArg: string): string {
  if (rawArg.length < 2) return rawArg;
  const first = rawArg[0];
  if ((first === '"' || first === "'") && rawArg[rawArg.length - 1] === first)
    return rawArg.slice(1, -1);

  return rawArg;
}
