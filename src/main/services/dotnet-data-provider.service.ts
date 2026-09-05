import { ChildProcessWithoutNullStreams, SpawnOptionsWithoutStdio, spawn } from 'child_process';
import path from 'path';
import { logger } from '@shared/services/logger.service';
import { waitForDuration } from 'platform-bible-utils';
import { formatLog } from '@shared/utils/logger.utils';

/** Pretty name for the process this service manages. Used in logs */
const DOTNET_DATA_PROVIDER_NAME = '.net';

let dotnet: ChildProcessWithoutNullStreams | undefined;

let resolveClose: (value: void | PromiseLike<void>) => void;
const closePromise: Promise<void> = new Promise<void>((resolve) => {
  resolveClose = resolve;
});

// log functions for inside the data provider process
function logProcessError(message: unknown) {
  logger.error(formatLog(message?.toString() || '', DOTNET_DATA_PROVIDER_NAME));
}

const isWindows = process.platform.startsWith('win');
/**
 * Watch log that comes in that is likely a dotnet watch bug. Dotnet watch reports that it does not
 * watch these files, but it watches them anyway. Very annoying log clutter
 */
let buggyWatchLog =
  'dotnet watch ⌚ Files updated: .\\c-sharp\\obj\\project.assets.json, .\\c-sharp\\obj\\project.nuget.cache, .\\c-sharp\\obj\\ParanextDataProvider.csproj.nuget.dgspec.json';
if (!isWindows) buggyWatchLog = buggyWatchLog.replace(/\\/g, '/');
/** Possibly extraneous watch log. Should be ignored after buggyWatchLog */
let extraneousWatchLog = 'dotnet watch ⌚ No C# changes to apply.';
if (!isWindows) extraneousWatchLog = extraneousWatchLog.replace(/\\/g, '/');
/** Gets ready to ignore extraneous watch log if it comes after buggyWatchLog */
let ignoreNextWatchLog = false;
/**
 * Whole buggy watch log that should be ignored. No extraneous lines afterward. It sometimes comes
 * together as one log like this
 */
const buggyWatchLogWhole = `${buggyWatchLog}\n${extraneousWatchLog}`;
// For some reason, it seems to switch between \n and \r\n on Windows
const buggyWatchLogWhole2 = `${buggyWatchLog}\r\n${extraneousWatchLog}`;
// And there's another slightly different message that needs to be ignored
const buggyWatchLogWhole3 = `${buggyWatchLog}\ndotnet watch ⌚`;
const buggyWatchLogWhole4 = `${buggyWatchLog}\r\ndotnet watch ⌚`;
function logProcessInfo(messageObj: unknown) {
  const message = messageObj?.toString() || '';
  const messageTrimmed = message.trim();

  // Ignore likely bugged dotnet watch logs
  if (messageTrimmed === buggyWatchLog) {
    ignoreNextWatchLog = true;
    return;
  }
  if (
    (messageTrimmed === extraneousWatchLog && ignoreNextWatchLog) ||
    messageTrimmed === buggyWatchLogWhole ||
    messageTrimmed === buggyWatchLogWhole2 ||
    messageTrimmed === buggyWatchLogWhole3 ||
    messageTrimmed === buggyWatchLogWhole4
  ) {
    ignoreNextWatchLog = false;
    return;
  }

  ignoreNextWatchLog = false;
  logger.info(formatLog(message, DOTNET_DATA_PROVIDER_NAME));
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

  // `dotnet watch` restores and builds before the provider's `Main()` runs at all, which is the
  // single largest block of dev startup. Opting out (`npm run start:no-dotnet-watch`) runs the
  // already-built assembly instead, so that cost moves out of startup — at the price of hot reload
  // on C# edits: you must run `npm run build:data` yourself after changing C#, or the app keeps
  // running the previous build. Logged below, because a stale build is otherwise invisible: the app
  // starts and behaves normally, just against older C#.
  // `run --no-build` rather than the built assembly directly: the build output path is
  // runtime-identifier specific (e.g. `bin/Debug/net8.0/linux-x64/`), so letting MSBuild resolve it
  // keeps this working on every platform without hardcoding that layout.
  if (!globalThis.isPackaged && process.env.PT_DOTNET_NO_WATCH === 'true') {
    args = ['run', '--project', 'c-sharp/ParanextDataProvider.csproj', '--no-build'];
    logger.info(
      formatLog(
        'PT_DOTNET_NO_WATCH is set: running the prebuilt assembly with no watcher. C# changes will NOT be picked up until you run `npm run build:data`.',
        DOTNET_DATA_PROVIDER_NAME,
      ),
    );
  }

  if (globalThis.isPackaged) {
    let dotnetPath: string = path.join(process.resourcesPath, 'dotnet');
    if (process.platform === 'darwin')
      dotnetPath = path.join(dotnetPath, process.arch === 'arm64' ? 'osx-arm64' : 'osx-x64');

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
