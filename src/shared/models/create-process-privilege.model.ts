import {
  ChildProcess,
  ChildProcessByStdio,
  // Needed for docs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fork,
  ForkOptions,
  // Needed for docs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  spawn,
  SpawnOptionsWithStdioTuple,
  StdioPipe,
} from 'child_process';
import { Readable, Writable } from 'stream';
import { ExtensionBasicData } from '@shared/models/extension-basic-data.model';

/**
 * Run {@link spawn} to create a child process. The platform will automatically kill all child
 * processes created this way in packaged builds. Child processes are not killed when running in
 * development.
 *
 * @example The following example assumes there are subdirectories in the extension's files for
 * win32, linux, and macOS that include appropriate executables.
 *
 * ```@typescript
 * export async function activate(context: ExecutionActivationContext) {
 *   const { executionToken } = context;
 *   const { createProcess } = context.elevatedPrivileges;
 *   if (!createProcess)
 *     throw new Error('Forgot to add "createProcess" to "elevatedPrivileges" in manifest.json');
 *   switch (createProcess.osData.platform) {
 *     case 'win32':
 *       createProcess.spawn(executionToken, 'win32/RunMe.exe', [], { stdio: [null, null, null] });
 *       break;
 *     case 'linux':
 *       createProcess.spawn(executionToken, 'linux/runMe', [], { stdio: [null, null, null] });
 *       break;
 *     case 'darwin':
 *       createProcess.spawn(executionToken, 'macOS/runMe', [], { stdio: [null, null, null] });
 *       break;
 *     default:
 *       throw new Error(`Unsupported platform: ${createProcess.osData.platform}`);
 *   }
 * ```
 *
 * @param executionToken ExecutionToken object provided when an extension was activated
 * @param command Command to run to start the process
 * @param args Arguments to pass to the command
 * @param options Options to pass to `spawn`. The `cwd` option will be overridden to the extension's
 *   root directory.
 * @returns A {@link ChildProcessByStdio} object representing the command
 */
export type PlatformSpawn = (
  executionToken: ExtensionBasicData,
  command: string,
  args: readonly string[],
  options: SpawnOptionsWithStdioTuple<StdioPipe, StdioPipe, StdioPipe>,
) => ChildProcessByStdio<Writable, Readable, Readable>;

/**
 * Run {@link fork} to create a child process. The platform will automatically kill all child
 * processes created this way in packaged builds. Child processes are not killed when running in
 * development.
 *
 * @example The following example assumes there is a file named `childProcess.js` in the extension's
 * `assets` subdirectory
 *
 * ```@typescript
 * export async function activate(context: ExecutionActivationContext) {
 *   const { executionToken } = context;
 *   const { createProcess } = context.elevatedPrivileges;
 *   if (!createProcess)
 *     throw new Error('Forgot to add "createProcess" to "elevatedPrivileges" in manifest.json');
 *   createProcess.fork(executionToken, 'assets/childProcess.js');
 * ```
 *
 * @param executionToken ExecutionToken object provided when an extension was activated
 * @param modulePath The module to run in the child
 * @param args Arguments to pass when creating the node process
 * @param options Options to pass to `fork`. The `cwd` option will be overridden to the extension's
 *   root directory.
 * @returns A {@link ChildProcess} object representing the process running the module
 */
export type PlatformFork = (
  executionToken: ExtensionBasicData,
  modulePath: string,
  args?: readonly string[],
  options?: ForkOptions,
) => ChildProcess;

/** Data about the operating system on which this process is running */
export type OperatingSystemData = {
  /** Value of `os.platform()` in Node */
  platform: string;
  /** Value of `os.type()` in Node */
  type: string;
  /** Value of `os.release()` in Node */
  release: string;
};

export type CreateProcess = {
  spawn: PlatformSpawn;
  fork: PlatformFork;
  osData: OperatingSystemData;
};
