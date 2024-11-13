import { exec, ExecException, ExecOptions } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import replaceInFile from 'replace-in-file';
import { subtreeRootFolder } from '../webpack/webpack.util';

const execAsync = promisify(exec);

/** The name for the multi-extension template remote as used in the git scripts */
export const MULTI_TEMPLATE_NAME = 'paranext-multi-extension-template';
/** The url for the multi-extension template remote as used in the git scripts */
export const MULTI_TEMPLATE_URL = 'https://github.com/paranext/paranext-multi-extension-template';
/** The branch to use in pulling changes from `MULTI_TEMPLATE_REMOTE_NAME` in the git scripts */
export const MULTI_TEMPLATE_BRANCH = 'main';
/** The name for the single extension template remote as used in the git scripts */
export const SINGLE_TEMPLATE_NAME = 'paranext-extension-template';
/** The url for the single extension template remote as used in the git scripts */
export const SINGLE_TEMPLATE_URL = 'https://github.com/paranext/paranext-extension-template';
/** The branch to use in pulling changes from `SINGLE_TEMPLATE_REMOTE_NAME` in the git scripts */
export const SINGLE_TEMPLATE_BRANCH = 'main';

// #region localization

/**
 * Error strings to be checked for in git output for various reasons
 *
 * `{key}` is replaced where applicable with the equivalent value from `GIT_CONSTANTS[key]`
 */
const errorStringTemplates = {
  multiRemoteExists: 'remote {MULTI_TEMPLATE_NAME} already exists',
  singleRemoteExists: 'remote {SINGLE_TEMPLATE_NAME} already exists',
  /** `{0} is the subtree name aka the OS-independent extension directory path */
  subtreeNeverAdded: "can't squash-merge: '{0}' was never added.\n",
};

/** Object mapping const names for template replacing */
const GIT_CONSTANTS = Object.freeze({
  MULTI_TEMPLATE_NAME,
  MULTI_TEMPLATE_URL,
  MULTI_TEMPLATE_BRANCH,
  SINGLE_TEMPLATE_NAME,
  SINGLE_TEMPLATE_URL,
  SINGLE_TEMPLATE_BRANCH,
});

type GitConstantKeys = keyof typeof GIT_CONSTANTS;

/**
 * Formats a string, replacing `GIT_CONSTANTS` values in brackets like `{MULTI_TEMPLATE_NAME}` and
 * such with their equivalent actual values
 *
 * @param str String to format
 * @returns Formatted string
 */
function formatGitErrorTemplate(str: string): string {
  return str.replace(/{([^}]+)}/g, (match, key: GitConstantKeys) =>
    key in GIT_CONSTANTS ? GIT_CONSTANTS[key] : match,
  );
}

/** Error strings to be checked for in git output for various reasons */
// We are just mapping an object with strings to an object with strings. wah
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const ERROR_STRINGS = Object.fromEntries(
  Object.entries(errorStringTemplates).map(([key, value]) => [key, formatGitErrorTemplate(value)]),
) as typeof errorStringTemplates;

// #endregion

/**
 * Executes a git command from the repo root directory, logging both the command and the results.
 *
 * For some reason, git likes to use stderr to return things that are not errors, so we only throw
 * if the command throws
 *
 * @param command
 * @param options The options for the exec command. Add quiet to not log anything
 */
export async function execGitCommand(
  command: string,
  options: ExecOptions & { quiet?: boolean } = {},
): Promise<{ stdout: string; stderr: string }> {
  const { quiet, ...execOptions } = options;
  if (!quiet) console.log(`\n> ${command}`);
  try {
    const result = await execAsync(command, {
      cwd: path.resolve(path.join(__dirname, '..', '..')),
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
        `code ${execError.code}!${execError.stderr ? `\n${execError.stderr}` : ''}${
          execError.stdout ? `\n${execError.stdout}` : ''
        }`,
      );
    } else {
      throw new Error(`An unknown error occurred while executing git command: ${error}`);
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
  const status = await execGitCommand('git status --porcelain=v2', {
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

/**
 * Fetch latest from SINGLE_TEMPLATE_REMOTE_NAME
 *
 * @returns True if successful, false otherwise
 */
export async function fetchFromSingleTemplate() {
  // Fetch latest SINGLE_TEMPLATE_REMOTE_NAME branch
  try {
    await execGitCommand(`git fetch ${SINGLE_TEMPLATE_NAME} ${SINGLE_TEMPLATE_BRANCH}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error on git fetch on ${SINGLE_TEMPLATE_NAME}: ${error.message}`);
    } else {
      console.error(
        `An unknown error occurred while fetching from ${SINGLE_TEMPLATE_NAME}: ${error}`,
      );
    }
    return false;
  }
  return true;
}

/** Globs to ignore when replacing stuff while formatting extensions */
const replaceInFileIgnoreGlobs = [
  '**/node_modules/**/*',
  '**/temp-build/**/*',
  '**/logs/**/*',
  '**/*.log',
  '**/.eslintcache',
  '**/dist/**/*',
  '**/release/**/*',
  // With npm workspaces, child workspace package-lock.json files are not used. Let's not format
  // them so they can stay the same as how they were in the template to avoid merge conflicts
  '**/package-lock.json',
];

/**
 * Format an extension folder to make the extension template folder work as a subfolder of this repo
 *
 * This function may be called many times for one extension folder, so make sure all operations work
 * properly no matter how many times this function is called
 *
 * @param extensionFolderPath Path to the extension to format relative to root
 */
export async function formatExtensionFolder(extensionFolderPath: string) {
  /**
   * Path to the extension to format relative to the extensions folder (where the npm script is
   * running).
   *
   * We need to take out the path from root to where npm is running its script because replaceInFile
   * works relative to the npm folder. Setting `cwd` and `glob.cwd` did not work because
   * replaceInFile was not properly offsetting the path before passing to fs
   */
  const extensionFolderPathFromExtensions = extensionFolderPath.replace(
    `${subtreeRootFolder}/`,
    '',
  );
  const results =
    // Replace ../paranext-core with ../../../paranext-core to fix ts-config and package.json and such
    (
      await replaceInFile({
        files: `${extensionFolderPathFromExtensions}/**/*`,
        ignore: replaceInFileIgnoreGlobs,
        from: /([^/])\.\.\/paranext-core/g,
        to: '$1../../..',
        countMatches: true,
        allowEmptyPaths: true,
      })
    ).concat(
      // Remove the type reference to external extensions since bundled extensions shouldn't use them
      await replaceInFile({
        files: `${extensionFolderPathFromExtensions}/tsconfig.json`,
        ignore: replaceInFileIgnoreGlobs,
        from: /("src\/types"),\n\n[\w\W]+dev-appdata\/cache\/extension-types"/g,
        to: '$1',
        countMatches: true,
        allowEmptyPaths: true,
      }),
    );

  const replaceStats = results.reduce(
    (replacements, replaceResult) => ({
      totalReplacements: replacements.totalReplacements + (replaceResult.numReplacements ?? 0),
      filesChanged: replaceResult.hasChanged
        ? [...replacements.filesChanged, replaceResult.file]
        : [...replacements.filesChanged],
    }),
    // filesChanged starts as an empty array, so it can't tell it should contain strings without
    // type assertion
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    { totalReplacements: 0, filesChanged: [] as string[] },
  );
  if (replaceStats.totalReplacements > 0)
    console.log(
      `Formatting ${extensionFolderPath}: Successfully updated relative path to paranext-core ${
        replaceStats.totalReplacements
      } times in ${replaceStats.filesChanged.length} files:\n\t${replaceStats.filesChanged.join(
        '\n\t',
      )}\n`,
    );
}
