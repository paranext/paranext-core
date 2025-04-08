import { exec, ExecException, ExecOptions } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/lib/git.util.ts

/**
 * Executes a command from the repo root directory, logging both the command and the results.
 *
 * For some reason, git likes to use stderr to return things that are not errors, so we only throw
 * if the command throws
 *
 * @param command
 * @param options The options for the exec command. Add quiet to not log anything
 */
export async function execCommand(
  command: string,
  options: ExecOptions & { quiet?: boolean } = {},
): Promise<{ stdout: string; stderr: string }> {
  const { quiet, ...execOptions } = options;
  if (!quiet) console.log(`\n>${execOptions.cwd ? ` cd ${execOptions.cwd};` : ''} ${command}`);
  try {
    const result = await execAsync(command, {
      cwd: path.resolve(path.join(__dirname, '..')),
      ...execOptions,
    });
    if (!quiet && result.stdout) console.log(result.stdout);
    if (!quiet && result.stderr) console.log(result.stderr);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Use the more specific type for `exec`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const execError = error as ExecException;
      throw new Error(
        `ExecException while executing command ${command}! code ${execError.code}!${execError.stderr ? `\n${execError.stderr}` : ''}${
          execError.stdout ? `\n${execError.stdout}` : ''
        }`,
      );
    } else {
      throw new Error(`An unknown error occurred while executing command ${command}: ${error}`);
    }
  }
}

/**
 * Check the repo for working changes
 *
 * @param quiet Whether to log an error if there are working changes
 * @returns True if there were working changes, false otherwise
 */
export async function checkForWorkingChanges(quiet = false) {
  // Check the git status to make sure there are no working changes
  const status = await execCommand('git status --porcelain=v2', {
    quiet: true,
  });

  if (status.stderr || status.stdout) {
    if (!quiet)
      console.error(
        `Working changes detected! Please stash or commit your changes. git status output: ${JSON.stringify(
          status,
        )}`,
      );
    return true;
  }
  return false;
}

// #endregion
