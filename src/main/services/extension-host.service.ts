/** Service that runs the extension-host process from the main file */

import {
  getCommandLineArgumentsGroup,
  CommandLineArgs,
  commandLineArgumentsAliases,
} from '@node/utils/command-line.util';
import { logger } from '@shared/services/logger.service';
import {
  AsyncVariable,
  debounce,
  getErrorMessage,
  PlatformEventEmitter,
  waitForDuration,
} from 'platform-bible-utils';
import { ChildProcess, ChildProcessByStdio, fork } from 'child_process';
import { app } from 'electron';
import { PathLike } from 'fs';
import { FileHandle, readFile } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import { watch as chokidarWatch, FSWatcher } from 'chokidar';
import {
  extensionHostStartedMessage,
  gracefulShutdownMessage,
} from '@node/models/interprocess-messages.model';
import { isAppShuttingDown } from '@main/services/shutdown-latch.service';
import { classifyExtensionHostExit } from '@main/services/extension-host-exit.util';
import {
  EXTENSION_HOST_RESTART_READY_TIMEOUT_MS,
  ExtensionHostStoppedEvent,
} from '@shared/models/extension-host-lifecycle.model';

let processInstanceCounter = 0;
// Resolves to the current process instance counter value for debug logging purposes
let processLifetimeVariable: AsyncVariable<number> | undefined;
let extensionHost: ChildProcess | ChildProcessByStdio<null, Readable, Readable> | undefined;
/** The watcher that restarts the extension host when files change. Only relevant in dev */
let extensionHostWatcher: FSWatcher | undefined;
/**
 * Set while main is deliberately stopping the extension host — a restart, or the dev-mode file
 * watcher — so the `exit` handler knows not to report that stop. Cleared when the next process is
 * forked.
 */
let isStopRequested = false;
/** Announces an exit main did not ask for. See {@link classifyExtensionHostExit}. */
const unexpectedStopEmitter = new PlatformEventEmitter<ExtensionHostStoppedEvent>();
/**
 * The most recent unexpected stop, kept until the next process is forked, so a window that was not
 * listening when it happened (opened later, or still starting) can ask for it.
 */
let lastUnexpectedStop: ExtensionHostStoppedEvent | undefined;

/**
 * The restart in flight, if any. It resolves once the new process is forked, but stays set until
 * that process says it has started (or stops unexpectedly, the restart fails, or
 * {@link EXTENSION_HOST_RESTART_READY_TIMEOUT_MS} passes), so a second request — another window's
 * Restart button — joins it instead of stopping a host that is still starting and forking yet
 * another.
 */
let restartInFlight: Promise<void> | undefined;
/** Ends {@link restartInFlight} after {@link EXTENSION_HOST_RESTART_READY_TIMEOUT_MS} */
let restartReadyTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Ends the restart in flight, but only if it is `run`: a late signal from an older restart (its
 * timer, its rejection) must not end a newer one.
 */
function clearRestartGuard(run: Promise<void> | undefined): void {
  if (!run || restartInFlight !== run) return;
  clearTimeout(restartReadyTimer);
  restartReadyTimer = undefined;
  restartInFlight = undefined;
}

/**
 * Starts `restart` and records it as the restart in flight, replacing any earlier one, until one of
 * the ends {@link restartInFlight} lists. Joining an earlier restart instead is the caller's
 * choice.
 *
 * @returns The running restart; it still rejects for its caller when `restart` fails
 */
function beginTrackedRestart(restart: () => Promise<void>): Promise<void> {
  const run = restart();
  clearTimeout(restartReadyTimer);
  restartInFlight = run;
  restartReadyTimer = setTimeout(
    () => clearRestartGuard(run),
    EXTENSION_HOST_RESTART_READY_TIMEOUT_MS,
  );
  // Handles the rejection only to end the guard; the caller still sees `run` reject.
  run.catch(() => clearRestartGuard(run));
  return run;
}

/** The current extension host says it has started, so the restart that forked it is over. */
function markExtensionHostStarted(): void {
  if (restartInFlight) logger.debug('Extension host started; the restart in flight is complete');
  clearRestartGuard(restartInFlight);
}

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
  isStopRequested = true;
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

/**
 * Stops the extension host and forks a new one. Resolves once the new process is forked, not once
 * it has started. A call while a restart is already in flight (see {@link restartInFlight}) joins
 * that restart and does not stop or fork anything itself.
 */
function restartExtensionHost(maxWaitTimeInMS: number): Promise<void> {
  if (restartInFlight) {
    logger.info('Extension host restart already in flight; joining it');
    return restartInFlight;
  }
  return beginTrackedRestart(async () => {
    await waitForExtensionHost(maxWaitTimeInMS);
    logger.debug('Extension host closed, restarting now');
    await startExtensionHost(maxWaitTimeInMS, true);
  });
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
    ...getCommandLineArgumentsGroup(CommandLineArgs.Extensions, true),
    ...getCommandLineArgumentsGroup(CommandLineArgs.ExtensionsDir, true),
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

  const child = extensionHost;
  child.on('message', (message) => {
    if (message !== extensionHostStartedMessage) return;
    // Only the start of the child a restart forked ends that restart. A child main has since
    // replaced, or the current child while main is stopping it (it can finish booting after being
    // told to shut down), says nothing about the one about to start.
    if (extensionHost !== child || isStopRequested) return;
    markExtensionHostStarted();
  });
  child.once('exit', (code, signal) => {
    // A child that is no longer the current one was hard-killed (`hardKillExtensionHost`, reached
    // through `kill()` or a requested stop that ran out of time), which drops the reference before
    // the exit arrives. Its exit belongs to a stop main asked for, however late it arrives, and the
    // requested-stop flag below need not describe it: `kill()` does not set that flag.
    const isCurrentChild = extensionHost === child;
    if (signal) {
      logger.info(`'exit' event: extension host process terminated with signal ${signal}`);
    } else {
      logger.info(`'exit' event: extension host process exited with code ${code}`);
    }
    extensionHost?.stderr?.removeListener('data', logProcessError);
    extensionHost?.stdout?.removeListener('data', logProcessInfo);
    extensionHost = undefined;
    resolveProcessLifetimeVariable();

    // The cleanup above is safe for a stale child too: no newer child can exist yet, because
    // `createNewProcessLifetimeVariable` refuses to fork until this exit has resolved the lifetime,
    // so clearing `extensionHost` and resolving the lifetime touch only this child's state.
    if (!isCurrentChild) return;
    const unexpectedStop = classifyExtensionHostExit({
      code,
      signal,
      isStopRequested,
      isAppShuttingDown: isAppShuttingDown(),
    });
    if (!unexpectedStop) return;
    logger.error(
      `Extension host stopped unexpectedly (${unexpectedStop.reason}); telling the windows so the user can restart it`,
    );
    lastUnexpectedStop = unexpectedStop;
    // The host a restart forked has died, so that restart is over: the user may restart at once.
    clearRestartGuard(restartInFlight);
    unexpectedStopEmitter.emit(unexpectedStop);
  });
}

/**
 * Reports a failed fork as an unexpected stop: the old process is gone (or given up on) and no new
 * one is running, so without this no window would offer a restart.
 *
 * The usual cause is a restart that hard-killed a stuck process whose exit has not arrived yet, so
 * its lifetime is unresolved and `createNewProcessLifetimeVariable` refuses to fork. That clears
 * once the late exit lands: the next restart forks normally. Two causes do not clear: a process
 * that never exits, and `fork()` itself throwing (the new lifetime is then never resolved). Either
 * leaves every later restart failing the same way until the app is restarted.
 */
function announceRefusedFork(error: unknown): void {
  // The restart that tried this fork is over, so a further request may try again.
  clearRestartGuard(restartInFlight);
  if (isAppShuttingDown()) return;
  logger.error(
    `Could not fork a new extension host; telling the windows it has stopped. ${getErrorMessage(error)}`,
  );
  lastUnexpectedStop = { reason: 'crashed' };
  unexpectedStopEmitter.emit(lastUnexpectedStop);
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
    commandLineArgumentsAliases[CommandLineArgs.ResourcesPath][0],
    globalThis.resourcesPath,
    commandLineArgumentsAliases[CommandLineArgs.LogLevel][0],
    globalThis.logLevel,
    ...getCommandLineArgumentsToForward(),
  ];
  if (isRestarting) sharedArgs.push(commandLineArgumentsAliases[CommandLineArgs.DidRestart][0]);

  function forkExtensionHostProcess() {
    // Throws, and so forks nothing, while the previous process is not cleaned up; the flags below
    // still describe that previous process until a new one is actually forked.
    createNewProcessLifetimeVariable();
    isStopRequested = false;
    lastUnexpectedStop = undefined;

    const extensionHostEntryPath = app.isPackaged
      ? path.join(__dirname, '../extension-host/extension-host.js')
      : path.join(globalThis.resourcesPath, 'src/extension-host/extension-host.ts');

    const extensionHostArgs = app.isPackaged
      ? [
          // Tell the extension host we're packaged
          commandLineArgumentsAliases[CommandLineArgs.Packaged][0],
          ...(process.env.PORTABLE_EXECUTABLE_FILE
            ? // Tell the extension host we're portable
              [commandLineArgumentsAliases[CommandLineArgs.Portable][0]]
            : []),
          ...sharedArgs,
        ]
      : sharedArgs;

    const extensionHostExecArgv = app.isPackaged
      ? process.execArgv
      : // Run the extension host's un-bundled TypeScript through tsx in dev. tsx transpiles with
        // esbuild and resolves the tsconfig `paths` aliases these imports rely on.
        [...process.execArgv, '--import', 'tsx'];

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
  }

  function startExtensionHostInternal() {
    // Only a failure to fork is a stop to announce, not any failure of `startExtensionHost`: once
    // forked (in dev it goes on to read nodemon.json, which can fail) a process is running, and its
    // own exit reports whatever happens to it.
    try {
      forkExtensionHostProcess();
    } catch (error) {
      announceRefusedFork(error);
      throw error;
    }
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
    // Recorded as the restart in flight, the same way `restartExtensionHost` records its own, so a
    // Restart button pressed meanwhile joins it. Unlike `restartExtensionHost`, the watcher never
    // joins a restart already in flight: a file change always restarts with the changed code, as
    // nodemon does, replacing that restart as the one in flight.
    const run = beginTrackedRestart(async () => {
      await waitForExtensionHost(maxWaitTimeInMS, false);

      // If we didn't already set the restarting flag, set it now
      if (!isRestarting)
        sharedArgs.push(commandLineArgumentsAliases[CommandLineArgs.DidRestart][0]);

      startExtensionHostInternal();
    });
    try {
      await run;
    } catch (error) {
      // Nothing awaits the watcher, so log rather than rethrow
      logger.error(`File watcher could not restart the extension host: ${getErrorMessage(error)}`);
    }
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
  /** Fires when the extension host exits without main asking it to. Not fired during app shutdown. */
  onDidStopUnexpectedly: unexpectedStopEmitter.event,
  /** The most recent unexpected stop, or `undefined` once a new process has been forked since */
  getLastUnexpectedStop: () => lastUnexpectedStop,
};

export default extensionHostService;
