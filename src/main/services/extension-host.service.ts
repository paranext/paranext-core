/** Service that runs the extension-host process from the main file */

import {
  getCommandLineArgumentsGroup,
  COMMAND_LINE_ARGS,
  commandLineArgumentsAliases,
} from '@node/utils/command-line.util';
import logger, { formatLog, WARN_TAG } from '@shared/services/logger.service';
import { AsyncVariable, includes, split, waitForDuration } from 'platform-bible-utils';
import { ChildProcess, ChildProcessByStdio, fork, spawn } from 'child_process';
import { app } from 'electron';
import { PathLike } from 'fs';
import { FileHandle, readFile } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import { gracefulShutdownMessage } from '@node/models/interprocess-messages.model';

/** Pretty name for the process this service manages. Used in logs */
const EXTENSION_HOST_NAME = 'extension host';

let processInstanceCounter = 0;
// Resolves to the current process instance counter value for debug logging purposes
let processLifetimeVariable: AsyncVariable<number> | undefined;
let extensionHost: ChildProcess | ChildProcessByStdio<null, Readable, Readable> | undefined;

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

// log functions for inside the extension host process
function logProcessError(message: unknown) {
  let msg = message?.toString() ?? '';
  if (includes(msg, WARN_TAG)) {
    msg = split(msg, WARN_TAG).join('');
    logger.warn(formatLog(msg, EXTENSION_HOST_NAME, 'warning'));
  } else logger.error(formatLog(msg, EXTENSION_HOST_NAME, 'error'));
}

function logProcessInfo(message: unknown) {
  logger.info(formatLog(message?.toString() ?? '', EXTENSION_HOST_NAME));
}

async function waitForExtensionHost(maxWaitTimeInMS: number) {
  let didExit = await waitForDuration(async () => {
    if (!processLifetimeVariable) {
      logger.warn('Extension host process lifetime variable was not initialized');
      return false;
    }
    // This does nothing in development because nodemon is in the way, but the hard kill will work
    extensionHost?.send(gracefulShutdownMessage, (error) => {
      if (error) logger.warn(`Error sending graceful shutdown message: ${error}`);
    });
    await processLifetimeVariable.promise;
    return true;
  }, maxWaitTimeInMS / 2);

  if (!didExit) hardKillExtensionHost();

  // Give the hard "kill" time to complete before returning so we don't restart too soon
  didExit = await waitForDuration(async () => {
    if (processLifetimeVariable) await processLifetimeVariable.promise;
    return true;
  }, maxWaitTimeInMS / 2);

  if (!didExit) logger.warn(`Extension host did not exit within ${maxWaitTimeInMS.toString()} ms`);
}

async function restartExtensionHost(maxWaitTimeInMS: number) {
  if (globalThis.isPackaged) {
    await waitForExtensionHost(maxWaitTimeInMS);
    logger.debug('Extension host closed, restarting now');
    return startExtensionHost();
  }
  // Tells nodemon to restart the process https://github.com/remy/nodemon/blob/HEAD/doc/events.md#using-nodemon-as-child-process
  extensionHost?.send('restart');
}

function hardKillExtensionHost() {
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

/** Starts the extension host process if it isn't already running. */
async function startExtensionHost() {
  if (extensionHost) return;

  createNewProcessLifetimeVariable();

  // In production, fork a new process for the extension host
  // In development, spawn nodemon to watch the extension-host
  /** Arguments that will be passed to the extension host no matter how we start the process */
  const sharedArgs = [
    commandLineArgumentsAliases[COMMAND_LINE_ARGS.ResourcesPath][0],
    globalThis.resourcesPath,
    commandLineArgumentsAliases[COMMAND_LINE_ARGS.LogLevel][0],
    globalThis.logLevel,
    ...getCommandLineArgumentsToForward(),
  ];

  if (app.isPackaged) {
    extensionHost = fork(
      path.join(__dirname, '../extension-host/extension-host.js'),
      [commandLineArgumentsAliases[COMMAND_LINE_ARGS.Packaged][0], ...sharedArgs],
      {
        stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
      },
    );
  } else {
    // If we are in development, get the nodemon watch config so we can pass it in along with the
    // external extension directories.
    // For this dev-only code, it is useful to be able to get the nodemon.json file.
    const nodemonConfig = await readJsonFile(path.join(globalThis.resourcesPath, 'nodemon.json'));
    const nodemonWatchPaths: string[] = nodemonConfig?.watch ? nodemonConfig.watch : [];

    extensionHost = spawn(
      'node',
      [
        'node_modules/nodemon/bin/nodemon.js',
        // Provide the nodemon config paths and command-line argument extension paths as watch
        // directories for nodemon
        ...nodemonWatchPaths.flatMap((watchPath) => ['--watch', watchPath]),
        '--transpile-only',
        './src/extension-host/extension-host.ts',
        '--',
        ...sharedArgs,
      ],
      {
        stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
        env: { ...process.env, NODE_ENV: 'development' },
      },
    );
  }

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

/** Service that runs the extension-host process from the main file */
const extensionHostService = {
  start: startExtensionHost,
  kill: hardKillExtensionHost,
  waitForClose: waitForExtensionHost,
  restart: restartExtensionHost,
};

export default extensionHostService;
