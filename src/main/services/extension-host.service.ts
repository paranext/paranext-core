/**
 * Service that runs the extension-host process from the main file
 */

import logger from '@shared/util/logger';
import { ChildProcess, ChildProcessByStdio, fork, spawn } from 'child_process';
import { app } from 'electron';
import path from 'path';
import { Readable } from 'stream';

let extensionHost:
  | ChildProcess
  | ChildProcessByStdio<null, Readable, Readable>
  | undefined;

/**
 * Hard kills the extension host process.
 * TODO: add a more elegant shutdown to avoid this if we possibly can
 */
function killExtensionHost() {
  if (!extensionHost) return;

  if (extensionHost.kill()) {
    logger.log('[extension host] was killed');
  } else {
    logger.error(
      '[extension host] was not stopped! Investigate other .kill() options',
    );
  }
  extensionHost = undefined;
}

const formatExtensionHostLog = (message: string, tag = '') => {
  const messageNoEndLine = message.trimEnd();
  const openTag = `{eh${tag ? ' ' : ''}${tag}}`;
  const closeTag = `{/eh${tag ? ' ' : ''}${tag}}`;
  if (messageNoEndLine.includes('\n'))
    // Multi-line
    return `${openTag}\n${messageNoEndLine}\n${closeTag}`;
  return `${openTag} ${messageNoEndLine} ${closeTag}`;
};

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
    logger.error(
      "[extension host] Could not connect to extension host's stderr or stdout! You will not see extension host console logs here.",
    );
  else if (process.env.IN_VSCODE !== 'true') {
    // When launched from VSCode, don't re-print the console stuff because it somehow shows it already
    extensionHost.stderr.on('data', (data) =>
      logger.error(formatExtensionHostLog(data.toString(), 'err')),
    );
    extensionHost.stdout.on('data', (data) =>
      logger.log(formatExtensionHostLog(data.toString())),
    );
  }

  extensionHost.on('close', (code, signal) => {
    if (signal) {
      logger.log(`[extension host 'close'] terminated with signal ${signal}`);
    } else {
      logger.log(`[extension host 'close'] exited with code ${code}`);
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
