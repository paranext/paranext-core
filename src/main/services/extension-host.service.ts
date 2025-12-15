/** Service that runs the extension-host process from the main file */

import {
  getCommandLineArgumentsGroup,
  COMMAND_LINE_ARGS,
  commandLineArgumentsAliases,
} from '@node/utils/command-line.util';
import { logger } from '@shared/services/logger.service';
import { AsyncVariable, debounce, waitForDuration } from 'platform-bible-utils';
import { ChildProcess, ChildProcessByStdio, fork } from 'child_process';
import { app } from 'electron';
import { PathLike } from 'fs';
import { FileHandle, readFile } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import { watch as chokidarWatch, FSWatcher } from 'chokidar';
import { gracefulShutdownMessage } from '@node/models/interprocess-messages.model';

let processInstanceCounter = 0;
// Resolves to the current process instance counter value for debug logging purposes
let processLifetimeVariable: AsyncVariable<number> | undefined;
let extensionHost: ChildProcess | ChildProcessByStdio<null, Readable, Readable> | undefined;
/** The watcher that restarts the extension host when files change. Only relevant in dev */
let extensionHostWatcher: FSWatcher | undefined;

function createNewProcessLifetimeVariable(): void {
  if (processLifetimeVariable)
    throw new Error('Previous instance of the extension host process was not cleaned up');

  processInstanceCounter += 1;
  processLifetimeVariable = new AsyncVariable<number>(
    `extension host shutting down #${processInstanceCounter.toString()}`,
    -1,
  );
}

function resolveProcessLifetimeVariable(): void {
  if (!processLifetimeVariable)
    throw new Error('Extension host process tracking was not properly initialized');

  processLifetimeVariable.resolveToValue(processInstanceCounter);
  processLifetimeVariable = undefined;
}

// log functions for console logs inside the extension host process. We pipe logs through instead
// of inheriting the stdio because it opens a new command prompt (at least on Windows) if we inherit
function logProcessError(message: unknown) {
  // Extension host puts its own logs to file, so we just need to put the logs in the console
  // eslint-disable-next-line no-console
  console.log(message?.toString());
}

function logProcessInfo(message: unknown) {
  // Extension host puts its own logs to file, so we just need to put the logs in the console
  // eslint-disable-next-line no-console
  console.log(message?.toString());
}

/**
 * @param maxWaitTimeInMS
 * @param shouldCloseWatcher Whether to close the watcher and therefore not start the extension host
 *   anymore without further intervention
 */
async function waitForExtensionHost(maxWaitTimeInMS: number, shouldCloseWatcher = true) {
  if (shouldCloseWatcher) {
    extensionHostWatcher?.close();
    extensionHostWatcher = undefined;
  }

  // Try to shut down gracefully with 3/4 of the time budget first
  const gracefulShutdownTimeMs = (maxWaitTimeInMS * 3) / 4;

  let didExit = await waitForDuration(async () => {
    if (!processLifetimeVariable) {
      logger.warn('Extension host process lifetime variable was not initialized');
      return false;
    }
    extensionHost?.send(gracefulShutdownMessage, (error) => {
      if (error) logger.warn(`Error sending graceful shutdown message: ${error}`);
    });
    await processLifetimeVariable.promise;
    return true;
  }, gracefulShutdownTimeMs);

  // Didn't succeed in gracefully shutting down, so hard kill
  if (!didExit) hardKillExtensionHost();

  // Give the hard "kill" time to complete before returning so we don't restart too soon
  didExit = await waitForDuration(async () => {
    if (processLifetimeVariable) await processLifetimeVariable.promise;
    return true;
  }, maxWaitTimeInMS - gracefulShutdownTimeMs);

  if (!didExit) logger.warn(`Extension host did not exit within ${maxWaitTimeInMS.toString()} ms`);
}

async function restartExtensionHost(maxWaitTimeInMS: number) {
  await waitForExtensionHost(maxWaitTimeInMS);
  logger.debug('Extension host closed, restarting now');
  return startExtensionHost(maxWaitTimeInMS, true);
}

function hardKillExtensionHost() {
  extensionHostWatcher?.close();
  extensionHostWatcher = undefined;

  if (!extensionHost) return;

  // On POSIX systems, SIGKILL should immediately terminate the process by the OS.
  // On Windows the signal is ignored. Node.js tries to hard kill the process in some other way.
  if (extensionHost.kill('SIGKILL')) {
    logger.info('signal sent to kill extension host process');
  } else {
    logger.error('extension host process was not stopped! Investigate other .kill() options');
  }
  extensionHost?.stderr?.removeListener('data', logProcessError);
  extensionHost?.stdout?.removeListener('data', logProcessInfo);
  extensionHost = undefined;
}

/**
 * Returns an array of the command-line arguments to forward from main (when launching paranext) to
 * the extension host process.
 */
function getCommandLineArgumentsToForward() {
  // Pass through the relevant command-line arguments to the extension host
  return [
    ...getCommandLineArgumentsGroup(COMMAND_LINE_ARGS.Extensions, true),
    ...getCommandLineArgumentsGroup(COMMAND_LINE_ARGS.ExtensionsDir, true),
  ];
}

/**
 * Read the contents of a JSON file.
 *
 * @param filePath - A path to a file. If a URL is provided, it must use the file: protocol. If a
 *   FileHandle is provided, the underlying file will not be closed automatically.
 * @returns The JSON file contents.
 * @see https://stackoverflow.com/questions/70601733/dynamic-import-with-json-file-doesnt-work-typescript
 */
async function readJsonFile(filePath: PathLike | FileHandle) {
  const file = await readFile(filePath, 'utf8');
  return JSON.parse(file);
}

/** Set up event listeners and other things to the new extension host process once started */
function connectToExtensionHostProcess() {
  if (!extensionHost) throw new Error('Attempted to connect to extension host while not defined');
  if (!extensionHost.stderr || !extensionHost.stdout)
    logger.error(
      "Could not connect to extension host's stderr or stdout! You will not see extension host console logs here.",
    );
  else {
    extensionHost.stderr.on('data', logProcessError);
    extensionHost.stdout.on('data', logProcessInfo);
  }

  extensionHost.once('exit', (code, signal) => {
    if (signal) {
      logger.info(`'exit' event: extension host process terminated with signal ${signal}`);
    } else {
      logger.info(`'exit' event: extension host process exited with code ${code}`);
    }
    extensionHost?.stderr?.removeListener('data', logProcessError);
    extensionHost?.stdout?.removeListener('data', logProcessInfo);
    extensionHost = undefined;
    resolveProcessLifetimeVariable();
  });
}

/**
 * Starts the extension host process if it isn't already running.
 *
 * @param maxWaitTimeInMS How long to wait while closing the extension host after detecting source
 *   file changes before starting it again. Only relevant when running in dev
 * @param isRestarting Whether this run represents restarting the extension host or just starting
 *   the first time
 */
async function startExtensionHost(maxWaitTimeInMS: number, isRestarting = false) {
  if (extensionHost) return;

  // In production, fork a new process for the extension host
  // In development, fork a new process for the extension-host and watch for changes with chokidar
  /** Arguments that will be passed to the extension host no matter how we start the process */
  const sharedArgs = [
    commandLineArgumentsAliases[COMMAND_LINE_ARGS.ResourcesPath][0],
    globalThis.resourcesPath,
    commandLineArgumentsAliases[COMMAND_LINE_ARGS.LogLevel][0],
    globalThis.logLevel,
    ...getCommandLineArgumentsToForward(),
  ];
  if (isRestarting) sharedArgs.push(commandLineArgumentsAliases[COMMAND_LINE_ARGS.DidRestart][0]);

  function startExtensionHostInternal() {
    createNewProcessLifetimeVariable();

    const extensionHostEntryPath = app.isPackaged
      ? path.join(__dirname, '../extension-host/extension-host.js')
      : path.join(__dirname, '../../src/extension-host/extension-host.ts');

    const extensionHostArgs = app.isPackaged
      ? [
          // Tell the extension host we're packaged
          commandLineArgumentsAliases[COMMAND_LINE_ARGS.Packaged][0],
          ...(process.env.PORTABLE_EXECUTABLE_FILE
            ? // Tell the extension host we're portable
              [commandLineArgumentsAliases[COMMAND_LINE_ARGS.Portable][0]]
            : []),
          ...sharedArgs,
        ]
      : sharedArgs;

    const extensionHostExecArgv = app.isPackaged
      ? process.execArgv
      : // Set up ts-node in the extension host process so it can run un-bundled TypeScript source files in dev
        [...process.execArgv, '-r', 'ts-node/register/transpile-only'];

    const extensionHostEnv = app.isPackaged
      ? process.env
      : {
          ...process.env,
          // Make sure the extension host can find native modules since it doesn't use webpack in dev
          NODE_PATH: path.join(globalThis.resourcesPath, 'release', 'app', 'node_modules'),
        };

    extensionHost = fork(extensionHostEntryPath, extensionHostArgs, {
      stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
      env: extensionHostEnv,
      execArgv: extensionHostExecArgv,
    });
    connectToExtensionHostProcess();
  }

  logger.info('Starting extension host from main!');
  startExtensionHostInternal();

  if (app.isPackaged) return;

  // If we are in development, use chokidar to reload the extension host when its source files change
  // (extension files are watched in extension.service.ts)

  // We want to imitate nodemon as closely as possible to match `npm run start:extension-host`
  // Get the nodemon watch config so we can watch files at the specified paths with the specified
  // file extensions
  const nodemonConfig = await readJsonFile(path.join(globalThis.resourcesPath, 'nodemon.json'));
  const nodemonExtensions = nodemonConfig?.ext.split(',') ?? ['ts'];
  const nodemonWatchPaths: string[] = nodemonConfig?.watch
    ? nodemonConfig.watch.flatMap((pathFromResources: string) => {
        const fullGlob = path.resolve(globalThis.resourcesPath, pathFromResources);
        return [
          nodemonExtensions.map((extension: string) => `${fullGlob}${path.sep}*.${extension}`),
        ];
      })
    : [];

  const restartExtensionHostInternalDevDebounced = debounce(async () => {
    await waitForExtensionHost(maxWaitTimeInMS, false);

    // If we didn't already set the restarting flag, set it now
    if (!isRestarting)
      sharedArgs.push(commandLineArgumentsAliases[COMMAND_LINE_ARGS.DidRestart][0]);

    startExtensionHostInternal();
    // Debounce by the nodemon-configured amount
  }, nodemonConfig?.delay);

  extensionHostWatcher = chokidarWatch(nodemonWatchPaths, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  }).on('all', async (eventType) => {
    logger.info(
      `Chokidar watch detected change type ${eventType}. Debouncing restarting extension host`,
    );
    await restartExtensionHostInternalDevDebounced();
    logger.info(`Chokidar watch finished restarting extension host`);
  });
}

/** Service that runs the extension-host process from the main file */
export const extensionHostService = {
  start: startExtensionHost,
  kill: hardKillExtensionHost,
  waitForClose: waitForExtensionHost,
  restart: restartExtensionHost,
};

export default extensionHostService;
