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
import { buildExtensionPathFromName } from '@extension-host/services/extension-storage.service';
import { getPathFromUri } from '@node/utils/util';
import { ExtensionBasicData } from '@shared/models/extension-basic-data.model';
import { executionTokenService } from '@node/services/execution-token.service';
import { ExecutionToken } from '@node/models/execution-token.model';

const childProcesses: ChildProcess[] = [];

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
  const extensionRootUri = buildExtensionPathFromName(executionToken.name, '/');
  const extensionRootPath = getPathFromUri(extensionRootUri);
  options.cwd = extensionRootPath;
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
  const extensionRootUri = buildExtensionPathFromName(executionToken.name, '/');
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
