import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import path from 'path';
import logger from '@shared/util/logger';

let dotnet: ChildProcessWithoutNullStreams | undefined;

/**
 * Hard kills the Dotnet Data Provider.
 * TODO: add a more elegant shutdown to avoid this if we possibly can
 */
function killDotnetDataProvider() {
  if (!dotnet) return;

  if (dotnet.kill()) {
    logger.log('[dotnet data provider] was killed');
  } else {
    logger.error(
      '[dotnet data provider] was not stopped! Investigate other .kill() options',
    );
  }
  dotnet = undefined;
}

/**
 * Starts the Dotnet Data Provider if it isn't already running.
 */
function startDotnetDataProvider() {
  if (dotnet) return;

  // default values for development
  let command = process.platform.includes('win') ? 'npm.cmd' : 'npm';
  let args: string[] = ['run', 'start:data'];

  if (process.env.NODE_ENV === 'production') {
    if (process.platform === 'win32') {
      command = path.join(
        process.resourcesPath,
        'dotnet',
        'ParanextDataProvider.exe',
      );
      args = [];
    } else {
      command = path.join(
        process.resourcesPath,
        'dotnet',
        'ParanextDataProvider',
      );
      args = [];
    }
  }

  dotnet = spawn(command, args);

  dotnet.stdout.on('data', (data) => {
    logger.log(`[dotnet data provider] stdout: ${data}`);
  });

  dotnet.stderr.on('data', (data) => {
    logger.error(`[dotnet data provider] stderr: ${data}`);
  });

  dotnet.on('close', (code, signal) => {
    if (signal) {
      logger.log(`[dotnet data provider] terminated with signal ${signal}`);
    } else {
      logger.log(`[dotnet data provider] exited with code ${code}`);
    }
    // TODO: listen for 'exit' event as well?
    // TODO: unsubscribe event listeners
    dotnet = undefined;
  });
}

const dotnetDataProvider = {
  start: startDotnetDataProvider,
  kill: killDotnetDataProvider,
};
export default dotnetDataProvider;
