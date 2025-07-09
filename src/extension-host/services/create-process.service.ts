import { logger } from '@extension-host/services/papi-backend.service';
import { PlatformFork, PlatformSpawn } from '@shared/models/create-process-privilege.model';
import {
  ChildProcess,
  ChildProcessByStdio,
  fork,
  ForkOptions,
  spawn,
  SpawnOptionsWithStdioTuple,
  StdioPipe,
} from 'child_process';
import { Readable, Writable } from 'stream';
import { buildExtensionUriFromPath } from '@extension-host/services/extension-storage.service';
import { getPathFromUri } from '@node/utils/util';
import { ExtensionBasicData } from '@shared/models/extension-basic-data.model';
import { executionTokenService } from '@node/services/execution-token.service';
import { ExecutionToken } from '@node/models/execution-token.model';
import { getErrorMessage } from 'platform-bible-utils';
import { chmodSync, statSync } from 'fs';

const childProcesses: ChildProcess[] = [];

/**
 * Sets the executable bit on a file if it is not already set. Will not throw an error if it fails.
 * It is used to ensure that the command can be executed on POSIX systems.
 *
 * @param filePath The path to the file to set the executable bit on.
 */
function trySetExecutableSafe(filePath: string) {
  // On Windows, we don't need to set the executable bit, so we can just return.
  if (process.platform.startsWith('win')) return;

  try {
    // Bitwise here because this is standard procedure when handling file modes
    /* eslint-disable no-bitwise */

    // Get the current access permissions. Cut off the extra information that is not needed.
    const accessPermissions = statSync(filePath).mode & 0o777;
    // Set the executable bit on the file for user
    const executableAccessPermissions = accessPermissions | 0o100;

    // If the file already has the executable bit set, we don't need to do anything
    if (accessPermissions === executableAccessPermissions) return;

    chmodSync(filePath, executableAccessPermissions);
    logger.debug(
      `Successfully set executable bit for ${filePath} from ${accessPermissions.toString(8)} to ${executableAccessPermissions.toString(8)}`,
    );

    /* eslint-enable no-bitwise */
  } catch (error) {
    // Don't throw here. This path may be a command on the path like `bash`, which will be fine to
    // spawn Or if we don't have access to path to chmod, it will be thrown when we try to spawn it.
    logger.debug(`Failed to set executable bit for ${filePath} : ${getErrorMessage(error)}`);
  }
}

export const wrappedSpawn: PlatformSpawn = (
  executionToken: ExtensionBasicData,
  command: string,
  args: readonly string[],
  options: SpawnOptionsWithStdioTuple<StdioPipe, StdioPipe, StdioPipe>,
): ChildProcessByStdio<Writable, Readable, Readable> => {
  // Can't specify the argument as ExecutionToken because it would create cyclical type dependencies
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  if (!executionTokenService.tokenIsValid(executionToken as ExecutionToken))
    throw new Error('Invalid execution token');
  const extensionRootUri = buildExtensionUriFromPath(executionToken.name, '/');
  const extensionRootPath = getPathFromUri(extensionRootUri);
  options.cwd = extensionRootPath;

  // Need to set executable bit on the command so it can actually run
  trySetExecutableSafe(command);

  const childProcess = spawn(command, args, options);
  childProcesses.push(childProcess);
  return childProcess;
};

export const wrappedFork: PlatformFork = (
  executionToken: ExtensionBasicData,
  modulePath: string,
  args?: readonly string[],
  options?: ForkOptions,
): ChildProcess => {
  // Can't specify the argument as ExecutionToken because it would create cyclical type dependencies
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  if (!executionTokenService.tokenIsValid(executionToken as ExecutionToken))
    throw new Error('Invalid execution token');
  const extensionRootUri = buildExtensionUriFromPath(executionToken.name, '/');
  const extensionRootPath = getPathFromUri(extensionRootUri);
  if (options) options.cwd = extensionRootPath;
  const childProcess = fork(modulePath, args, options ?? { cwd: extensionRootPath });
  childProcesses.push(childProcess);
  return childProcess;
};

/** Hard kills all child processes that were created by {@link wrappedSpawn} and {@link wrappedFork} */
export const killChildProcessesFromExtensions = () => {
  childProcesses.forEach((process) => {
    // Need an explicit 'null' check here since non-null (including 0) has a different meaning
    // Non-null means the process is no longer running
    // eslint-disable-next-line no-null/no-null
    if (process.exitCode !== null) return;

    // On POSIX systems, SIGKILL should immediately terminate the process by the OS.
    // On Windows the signal is ignored. Node.js tries to hard kill the process in some other way.
    const processInfo = `child process '${process.spawnfile}' (PID ${process.pid})`;
    if (!process.kill('SIGKILL')) logger.warn(`Could not send kill signal to ${processInfo}`);
    else logger.info(`Sent kill signal to ${processInfo}`);
  });
};
