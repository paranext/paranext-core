/**
 * Service that runs the extension-host process from the main file
 */

import logger, { formatLog } from '@shared/services/logger.service';
import { waitForDuration } from '@shared/utils/util';
import { ChildProcess, ChildProcessByStdio, fork, spawn } from 'child_process';
import { app } from 'electron';
import path from 'path';
import { Readable } from 'stream';

/** Pretty name for the process this service manages. Used in logs */
const EXTENSION_HOST_NAME = 'extension host';

let extensionHost: ChildProcess | ChildProcessByStdio<null, Readable, Readable> | undefined;

let resolveClose: (value: void | PromiseLike<void>) => void;
const closePromise: Promise<void> = new Promise<void>((resolve) => {
  resolveClose = resolve;
});

// log functions for inside the extension host process
function logProcessError(message: unknown) {
  logger.error(formatLog(message?.toString() || '', EXTENSION_HOST_NAME, 'error'));
}
function logProcessInfo(message: unknown) {
  logger.info(formatLog(message?.toString() || '', EXTENSION_HOST_NAME));
}

async function waitForExtensionHost(maxWaitTimeInMS: number) {
  const didClose = await waitForDuration(async () => {
    await closePromise;
    return true;
  }, maxWaitTimeInMS);

  if (!didClose) killExtensionHost();
}

/**
 * Hard kills the extension host process.
 * TODO: add a more elegant shutdown to avoid this if we possibly can
 */
function killExtensionHost() {
  if (!extensionHost) return;

  if (extensionHost.kill()) {
    logger.info('killed extension host process');
  } else {
    logger.error('extension host process was not stopped! Investigate other .kill() options');
  }
  extensionHost = undefined;
}

/**
 * Starts the extension host process if it isn't already running.
 */
function startExtensionHost() {
  if (extensionHost) return;

  // In production, fork a new process for the extension host
  // In development, spawn nodemon to watch the extension-host
  const sharedArgs = ['--resourcesPath', globalThis.resourcesPath];
  extensionHost = app.isPackaged
    ? fork(
        path.join(__dirname, '../extension-host/extension-host.js'),
        ['--packaged', ...sharedArgs],
        {
          stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
        },
      )
    : spawn(
        'node',
        [
          'node_modules/nodemon/bin/nodemon.js',
          '--transpile-only',
          './src/extension-host/extension-host.ts',
          '--',
          ...sharedArgs,
        ],
        {
          stdio: ['ignore', 'pipe', 'pipe'],
          env: { ...process.env, NODE_ENV: 'development' },
        },
      );

  if (!extensionHost.stderr || !extensionHost.stdout)
    logger.error(
      "Could not connect to extension host's stderr or stdout! You will not see extension host console logs here.",
    );
  else {
    extensionHost.stderr.on('data', logProcessError);
    extensionHost.stdout.on('data', logProcessInfo);
  }

  extensionHost.on('close', (code, signal) => {
    if (signal) {
      logger.info(`'close' event: extension host process terminated with signal ${signal}`);
    } else {
      logger.info(`'close' event: extension host process exited with code ${code}`);
    }
    // TODO: listen for 'exit' event as well?
    // TODO: unsubscribe event listeners
    extensionHost = undefined;
    resolveClose();
  });
}

/**
 * Service that runs the extension-host process from the main file
 */
const extensionHostService = {
  start: startExtensionHost,
  kill: killExtensionHost,
  wait: waitForExtensionHost,
};

export default extensionHostService;
