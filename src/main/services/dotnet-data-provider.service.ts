import { ChildProcessWithoutNullStreams, SpawnOptionsWithoutStdio, spawn } from 'child_process';
import path from 'path';
import { formatLog, logger } from '@shared/services/logger.service';
import { waitForDuration } from 'platform-bible-utils';

/** Pretty name for the process this service manages. Used in logs */
const DOTNET_DATA_PROVIDER_NAME = 'dotnet data provider';

let dotnet: ChildProcessWithoutNullStreams | undefined;

let resolveClose: (value: void | PromiseLike<void>) => void;
const closePromise: Promise<void> = new Promise<void>((resolve) => {
  resolveClose = resolve;
});

// log functions for inside the data provider process
function logProcessError(message: unknown) {
  logger.error(formatLog(message?.toString() || '', DOTNET_DATA_PROVIDER_NAME, 'error'));
}
function logProcessInfo(message: unknown) {
  logger.info(formatLog(message?.toString() || '', DOTNET_DATA_PROVIDER_NAME));
}

/** Hard kills the Dotnet Data Provider. */
// TODO: add a more elegant shutdown to avoid this if we possibly can
function killDotnetDataProvider() {
  if (!dotnet) return;

  if (dotnet.kill()) {
    logger.info('killed dotnet data provider');
  } else {
    logger.error('dotnet data provider was not stopped! Investigate other .kill() options');
  }
  dotnet?.stderr?.removeListener('data', logProcessError);
  dotnet?.stdout?.removeListener('data', logProcessInfo);
  dotnet = undefined;
}

async function waitForDotnetDataProvider(maxWaitTimeInMS: number) {
  const didClose = await waitForDuration(async () => {
    await closePromise;
    return true;
  }, maxWaitTimeInMS);

  if (!didClose) killDotnetDataProvider();
}

/** Starts the Dotnet Data Provider if it isn't already running. */
function startDotnetDataProvider() {
  if (dotnet) return;

  // default values for development
  let command = 'dotnet';
  let args: string[] = ['watch', '--project', 'c-sharp/ParanextDataProvider.csproj'];
  let options: SpawnOptionsWithoutStdio | undefined;

  if (globalThis.isPackaged) {
    const dotnetPath: string = path.join(process.resourcesPath, 'dotnet');
    if (process.platform === 'win32') {
      command = path.join(dotnetPath, 'ParanextDataProvider.exe');
      args = [];
    } else {
      command = path.join(dotnetPath, 'ParanextDataProvider');
      args = [];
    }
    options = { cwd: dotnetPath };
  }

  dotnet = spawn(command, args, options);

  dotnet.stdout.on('data', logProcessInfo);
  dotnet.stderr.on('data', logProcessError);

  dotnet.once('exit', (code, signal) => {
    if (signal) {
      logger.info(`'exit' event: dotnet data provider terminated with signal ${signal}`);
    } else {
      logger.info(`'exit' event: dotnet data provider exited with code ${code}`);
    }
    dotnet?.stderr?.removeListener('data', logProcessError);
    dotnet?.stdout?.removeListener('data', logProcessInfo);
    dotnet = undefined;
    resolveClose();
  });

  dotnet.once('close', (code, signal) => {
    // In production, this handles the closing of the data provider. However, in development,
    // this is handling the closing of the dotnet watcher.
    if (signal) {
      logger.info(`'close' event: dotnet data provider terminated with signal ${signal}`);
    } else {
      logger.info(`'close' event: dotnet data provider exited with code ${code}`);
    }
    dotnet?.stderr?.removeListener('data', logProcessError);
    dotnet?.stdout?.removeListener('data', logProcessInfo);
    dotnet = undefined;
    resolveClose();
  });
}

export const dotnetDataProvider = {
  start: startDotnetDataProvider,
  kill: killDotnetDataProvider,
  waitForClose: waitForDotnetDataProvider,
};

export default dotnetDataProvider;
