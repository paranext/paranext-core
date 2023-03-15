/**
 * Service that runs the extension-host process from the main file
 */

import logger, { formatLog } from '@shared/util/logger';
import { ChildProcess, ChildProcessByStdio, fork, spawn } from 'child_process';
import { app } from 'electron';
import path from 'path';
import { Readable } from 'stream';

let extensionHost:
  | ChildProcess
  | ChildProcessByStdio<null, Readable, Readable>
  | undefined;

// log functions for in the service but not in the spawned process
function logServiceError(message: string) {
  logger.error(formatLog(message, 'eh-service', 'err'));
}
function logServiceInfo(message: string) {
  logger.log(formatLog(message, 'eh-service'));
}

// log functions for inside the extension host process
function logProcessError(message: unknown) {
  logger.error(formatLog(message?.toString() || '', 'eh', 'err'));
}
function logProcessInfo(message: unknown) {
  logger.log(formatLog(message?.toString() || '', 'eh'));
}

/**
 * Hard kills the extension host process.
 * TODO: add a more elegant shutdown to avoid this if we possibly can
 */
function killExtensionHost() {
  if (!extensionHost) return;

  if (extensionHost.kill()) {
    logServiceInfo('killed extension host process');
  } else {
    logServiceError(
      'extension host process was not stopped! Investigate other .kill() options',
    );
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
        process.platform.includes('win') ? 'npm.cmd' : 'npm',
        ['run', 'start:extension-host', '--', ...sharedArgs],
        {
          stdio: ['ignore', 'pipe', 'pipe'],
        },
      );

  if (!extensionHost.stderr || !extensionHost.stdout)
    logServiceError(
      "Could not connect to extension host's stderr or stdout! You will not see extension host console logs here.",
    );
  else {
    extensionHost.stderr.on('data', logProcessError);
    extensionHost.stdout.on('data', logProcessInfo);
  }

  extensionHost.on('close', (code, signal) => {
    if (signal) {
      logServiceInfo(`['close' event] terminated with signal ${signal}`);
    } else {
      logServiceInfo(`['close' event] exited with code ${code}`);
    }
    // TODO: listen for 'exit' event as well?
    // TODO: unsubscribe event listeners
    extensionHost = undefined;
  });
}

/**
 * Service that runs the extension-host process from the main file
 */
const extensionHostService = {
  start: startExtensionHost,
  kill: killExtensionHost,
};

export default extensionHostService;
