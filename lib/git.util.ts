import { exec, ExecException, ExecOptions } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import replaceInFile from 'replace-in-file';

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

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/lib/git.util.ts

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

/**
 * Fetch latest from SINGLE_TEMPLATE_REMOTE_NAME
 *
 * @returns True if successful, false otherwise
 */
export async function fetchFromSingleTemplate() {
  // Fetch latest SINGLE_TEMPLATE_REMOTE_NAME branch
  try {
    await execCommand(`git fetch ${SINGLE_TEMPLATE_NAME} ${SINGLE_TEMPLATE_BRANCH}`);
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

/**
 * Converts kebab-case into camelCase. Assumes that the input is a valid kebab-case string
 *
 * Current implementation supports only UTF-16.
 */
function toCamelCaseFromKebab(input: string): string {
  if (!input) return '';

  // Split on common delimiters: hyphens, underscores, spaces, and dots
  const parts = input.split('-');

  // If there's only one part, return it as-is (already camelCase or single word)
  if (parts.length <= 1) {
    return input.charAt(0).toLocaleLowerCase() + input.slice(1);
  }

  // Convert first part to lowercase, then capitalize first letter of subsequent parts
  const camelCased = parts
    .map((part, index) => {
      if (!part) return '';

      if (index === 0) {
        return part.charAt(0).toLocaleLowerCase() + part.slice(1);
      }
      return part.charAt(0).toLocaleUpperCase() + part.slice(1);
    })
    .join('');

  return camelCased;
}

/**
 * Format an extension folder to make the extension template folder work as a subfolder of this repo
 *
 * This function may be called many times for one extension folder, so make sure all operations work
 * properly no matter how many times this function is called
 *
 * @param extensionFolderPath Path to the extension to format relative to root
 */
export async function formatExtensionFolder(extensionFolderPath: string) {
  // Get the basename of the extension folder for use in replacements
  const extensionName = path.basename(extensionFolderPath);
  const extensionNameCamelCase = toCamelCaseFromKebab(extensionName);

  // Replace ../paranext-core with ../../../paranext-core to fix ts-config and package.json and such
  const results = await replaceInFile({
    files: `${extensionFolderPath}/**/*`,
    ignore: [
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
    ],
    from: /([^/])\.\.\/paranext-core/g,
    to: '$1../../../paranext-core',
    countMatches: true,
    allowEmptyPaths: true,
  });

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

  // Rename types file
  const oldTypesFilePath = path.join(
    extensionFolderPath,
    'src',
    'types',
    'paranext-extension-template.d.ts',
  );
  const newTypesFilePath = path.join(extensionFolderPath, 'src', 'types', `${extensionName}.d.ts`);

  try {
    // Check if the old file exists before attempting to rename it
    await fs.access(oldTypesFilePath);

    // Check if the new file already exists to avoid errors
    try {
      await fs.access(newTypesFilePath);
      console.log(`Types file already renamed to ${extensionName}.d.ts, skipping rename operation`);
    } catch {
      // New file doesn't exist, proceed with rename
      await fs.rename(oldTypesFilePath, newTypesFilePath);
      console.log(`Renamed types file to ${extensionName}.d.ts`);
    }
  } catch (error) {
    // Old file doesn't exist, so no need to rename
    console.log(`Types file paranext-extension-template.d.ts not found, skipping rename operation`);
  }

  // Replace occurrences of 'paranext-extension-template' in the renamed types file
  try {
    await fs.access(newTypesFilePath);

    // Read the types file content
    let typesFileContent = await fs.readFile(newTypesFilePath, 'utf8');

    // Replace all occurrences of the template name
    typesFileContent = typesFileContent.replace(/paranext-extension-template/g, extensionName);

    // Write the updated content back to the file
    await fs.writeFile(newTypesFilePath, typesFileContent, 'utf8');

    console.log(`Updated module declaration and references in types file`);
  } catch (error) {
    console.error(`Could not update types file: ${error.message}`);
  }

  // Update README.md
  const readmePath = path.join(extensionFolderPath, 'README.md');
  try {
    // Check if README.md exists
    await fs.access(readmePath);

    const readmeContent = await fs.readFile(readmePath, 'utf8');
    const lines = readmeContent.split('\n');

    // Identify section boundaries
    const endOfTitle = lines.findIndex((line) => line.indexOf('## Template Info') >= 0);
    const summary = lines.findIndex((line, n) => n > endOfTitle && line.indexOf('# Summary') >= 0);
    const endOfSummary = lines.findIndex((line, n) => n > summary && line.startsWith('##'));

    if (endOfTitle < 0 || summary < 0 || endOfSummary < 0 || endOfTitle > summary) {
      console.error(
        `Error identifying Template Info in README.md, formatExtensionFolder outdated?`,
      );
      return;
    }

    // Split the README into sections to change, and sections to leave alone
    const titleSection = lines.slice(0, endOfTitle);
    const betweenTitleAndSummary = lines.slice(endOfTitle, summary);
    const summarySection = lines.slice(summary, endOfSummary);
    const after = lines.slice(endOfSummary);

    // Modify only the `titleSection` and `summarySection`
    const modifiedTitle = titleSection.map((line) =>
      line.replace(/paranext-extension-template/g, extensionName),
    );
    const modifiedSummary = summarySection.map((line) => {
      if (line.includes('https://github.com/paranext/paranext-extension-template/wiki'))
        return line;

      return line.replace(/paranext-extension-template/g, extensionName);
    });

    // Reconstruct the README
    const finalLines = [...modifiedTitle, ...betweenTitleAndSummary, ...modifiedSummary, ...after];

    await fs.writeFile(readmePath, finalLines.join('\n'), 'utf8');
    console.log(`Updated README.md: modified title and summary sections only`);
  } catch (error) {
    console.error(`Could not update README.md: ${error.message}`);
  }

  // Update manifest.json
  const manifestPath = path.join(extensionFolderPath, 'manifest.json');
  try {
    // Check if manifest.json exists
    await fs.access(manifestPath);

    let manifestContent = await fs.readFile(manifestPath, 'utf8');

    // Replace "paranextExtensionTemplate" with lowerCamelCase version of extension name
    manifestContent = manifestContent.replace(/paranextExtensionTemplate/g, extensionNameCamelCase);

    // Replace the type reference
    manifestContent = manifestContent.replace(
      /src\/types\/paranext-extension-template\.d\.ts/g,
      `src/types/${extensionName}.d.ts`,
    );

    await fs.writeFile(manifestPath, manifestContent, 'utf8');
    console.log(`Updated manifest.json with ${extensionName} information`);
  } catch (error) {
    console.error(`Could not update manifest.json: ${error.message}`);
  }

  // Update package.json
  const packagePath = path.join(extensionFolderPath, 'package.json');
  try {
    // Check if package.json exists
    await fs.access(packagePath);

    let packageContent = await fs.readFile(packagePath, 'utf8');

    // Replace all occurrences of "paranext-extension-template" with extensionName
    packageContent = packageContent.replace(/paranext-extension-template/g, extensionName);

    await fs.writeFile(packagePath, packageContent, 'utf8');
    console.log(`Updated package.json with ${extensionName} information`);
  } catch (error) {
    console.error(`Could not update package.json: ${error.message}`);
  }
}
