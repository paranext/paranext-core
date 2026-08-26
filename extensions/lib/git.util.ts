import { exec, ExecException, ExecOptions } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import replaceInFile from 'replace-in-file';
import { minimatch } from 'minimatch';
import { subtreeRootFolder } from '../webpack/webpack.util';

// #region shared with https://github.com/paranext/paranext-extension-template/blob/main/lib/git.util.ts

const execAsync = promisify(exec);

/** Absolute path to the repo root directory */
const repoRoot = path.resolve(path.join(__dirname, '..', '..'));

// #endregion

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

/** Cached npm workspaces list from root package.json, loaded once per process */
let cachedWorkspaces: string[] | undefined;

async function getWorkspaces(): Promise<string[]> {
  if (cachedWorkspaces !== undefined) return cachedWorkspaces;
  const content = await fs.readFile(path.join(repoRoot, 'package.json'), 'utf-8');
  // JSON.parse returns unknown; we expect a package.json shape
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const packageJson = JSON.parse(content) as { workspaces?: string[] };
  cachedWorkspaces = packageJson.workspaces ?? [];
  return cachedWorkspaces;
}

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
      cwd: repoRoot,
      ...execOptions,
    });
    if (!quiet && result.stdout) console.log(result.stdout);
    if (!quiet && result.stderr) console.log(result.stderr);
    return {
      stdout: result.stdout.toString(),
      stderr: result.stderr.toString(),
    };
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
 * Returns true if the given repo-root-relative path is a `package-lock.json` file whose parent
 * directory is an npm workspace under `extensions/`. Such files are unused (because the folder is a
 * workspace) and are safe to delete automatically.
 *
 * @param repoRootRelativePath Repo-root-relative path, e.g.
 *   `extensions/src/hello-rock3/package-lock.json`
 */
export async function isUnusedWorkspacePackageLock(repoRootRelativePath: string): Promise<boolean> {
  if (path.basename(repoRootRelativePath) !== 'package-lock.json') return false;
  const parentDir = path.dirname(repoRootRelativePath);

  // Must be the extensions root or somewhere inside it
  if (parentDir !== 'extensions' && !parentDir.startsWith('extensions/')) return false;

  // Must match a workspace pattern from the root package.json
  const workspaces = await getWorkspaces();
  return workspaces.some((pattern) => minimatch(parentDir, pattern));
}

/** Git status --porcelain v1 XY codes that indicate an unmerged (conflict) entry */
const CONFLICT_XY_CODES = new Set(['DD', 'AU', 'UD', 'UA', 'DU', 'AA', 'UU']);

/**
 * After a `git subtree pull` or `git merge` fails, call this to auto-resolve any conflicts that are
 * solely unused workspace `package-lock.json` files.
 *
 * Uses `git status --porcelain` (v1 format) — intentionally different from `checkForWorkingChanges`
 * which uses `--porcelain=v2`. V1 is simpler for conflict-code parsing.
 *
 * For each conflicted `package-lock.json` that passes {@link isUnusedWorkspacePackageLock}, runs
 * `git rm <path>` to delete and stage the file. Works for both:
 *
 * - `UU` (both modified): file is on disk with conflict markers
 * - `DU` (deleted by us, modified by them): git leaves their version on disk during the conflict
 *
 * @returns `resolved` — number of lock files removed and staged. `remainingConflicts` —
 *   repo-root-relative paths of all OTHER conflicted files.
 */
export async function resolvePackageLockConflicts(): Promise<{
  resolved: number;
  remainingConflicts: string[];
}> {
  const status = await execCommand('git status --porcelain', { quiet: true });

  const lines = status.stdout.split('\n').filter((line) => line.length > 0);
  const conflictLines = lines.filter((line) => CONFLICT_XY_CODES.has(line.slice(0, 2)));

  const packageLockPaths: string[] = [];
  const otherConflictPaths: string[] = [];

  // Push order is non-deterministic across concurrent promises, but order doesn't matter here:
  // all package-lock files get removed and remainingConflicts is only used for reporting.
  await Promise.all(
    conflictLines.map(async (line) => {
      const filePath = line.slice(3); // skip "XY "
      if (await isUnusedWorkspacePackageLock(filePath)) {
        packageLockPaths.push(filePath);
      } else {
        otherConflictPaths.push(filePath);
      }
    }),
  );

  // Remove and stage each conflicted package-lock.json sequentially: each `git rm` must finish
  // before the next to avoid interleaved git index updates.
  // eslint-disable-next-line no-restricted-syntax
  for (const filePath of packageLockPaths) {
    // Intentional sequential await — see comment above the loop
    // eslint-disable-next-line no-await-in-loop
    await execCommand(`git rm "${filePath}"`);
  }

  return { resolved: packageLockPaths.length, remainingConflicts: otherConflictPaths };
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
  // With npm workspaces, child workspace package-lock.json files are unused and are deleted
  // proactively by formatExtensionFolder and formatExtensionsRoot. Skip them here in case they
  // are present during a format pass before deletion runs.
  '**/package-lock.json',
];

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
 * Deletes a repo-root-relative path if it is an unused workspace `package-lock.json`. Silently
 * skips if the file is absent.
 *
 * @param repoRootRelativePath Repo-root-relative path, e.g.
 *   `extensions/src/hello-rock3/package-lock.json`
 */
async function deleteUnusedPackageLockIfPresent(repoRootRelativePath: string): Promise<void> {
  if (!(await isUnusedWorkspacePackageLock(repoRootRelativePath))) return;
  try {
    await fs.unlink(path.join(repoRoot, repoRootRelativePath));
    console.log(`Deleted unused ${repoRootRelativePath}`);
  } catch (error: unknown) {
    // File not present — nothing to delete
    if (!(error instanceof Error) || !('code' in error) || error.code !== 'ENOENT') throw error;
  }
}

/**
 * The license every extension bundled in this repository carries.
 *
 * The upstream templates are MIT, because an extension built from one and shipped by somebody else
 * should be free to choose its own terms. An extension bundled _here_ is part of Platform.Bible and
 * is AGPL-3.0-or-later along with the rest of the application — so the license is stamped as part
 * of adapting the template to this repository, alongside the path and type-name rewrites, rather
 * than left for whoever creates the extension to remember. See LICENSING.md and
 * `adr-licensing-boundary`.
 */
export const BUNDLED_EXTENSION_LICENSE = 'AGPL-3.0-or-later';

/**
 * The repository's own AGPL text, which is what every bundled extension's LICENSE is copied from.
 *
 * The REPO ROOT copy, deliberately, not `extensions/LICENSE`. `extensions/` is a git subtree of the
 * multi-extension template, and the template is MIT - so a template merge brings the template's own
 * `LICENSE` in with it, and reading the canonical text from inside the subtree meant a merge could
 * hand every extension the MIT text to be "corrected" to. The root `LICENSE` is outside the subtree
 * and no merge can reach it.
 */
const CANONICAL_LICENSE_PATH = 'LICENSE';

/** A line only the AGPL text carries, so the canonical copy is checked rather than assumed. */
const AGPL_TITLE = /GNU AFFERO GENERAL PUBLIC LICENSE/i;

/**
 * The AGPL text this repository stamps into extension folders.
 *
 * Verified rather than trusted. Everything below copies this over an extension's existing LICENSE
 * on the grounds that the extension DECLARES these terms, so reading the wrong file here does not
 * fail loudly - it writes the wrong licence text into twelve folders and logs that it restored the
 * right one.
 */
async function readCanonicalLicense(root: string = repoRoot): Promise<string> {
  const file = path.join(root, CANONICAL_LICENSE_PATH);
  const text = await fs.readFile(file, 'utf8');
  if (!AGPL_TITLE.test(text))
    throw new Error(
      `${CANONICAL_LICENSE_PATH} is not the ${BUNDLED_EXTENSION_LICENSE} text, so it cannot be ` +
        'copied into extension folders that declare it. Every bundled extension would be given a ' +
        'licence text that contradicts its own declaration.',
    );
  return text;
}

/** Sets `license` in a JSON file, keeping it beside `version` when the field is not there yet. */
async function stampLicenseInJson(
  repoRootRelativePath: string,
  root: string = repoRoot,
): Promise<boolean> {
  const file = path.join(root, repoRootRelativePath);
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (error: unknown) {
    // Not every extension folder has every file; nothing to stamp is not a failure.
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return false;
    throw error;
  }
  if (parsed.license === BUNDLED_EXTENSION_LICENSE) return false;
  // An extension that has deliberately been given other terms is left alone; only a template's own
  // value (or none) is overwritten.
  if (parsed.license !== undefined && parsed.license !== 'MIT') return false;

  const stamped: Record<string, unknown> = {};
  Object.entries(parsed).forEach(([key, value]) => {
    stamped[key] = key === 'license' ? BUNDLED_EXTENSION_LICENSE : value;
    if (key === 'version' && parsed.license === undefined)
      stamped.license = BUNDLED_EXTENSION_LICENSE;
  });
  if (stamped.license === undefined) stamped.license = BUNDLED_EXTENSION_LICENSE;

  await fs.writeFile(file, `${JSON.stringify(stamped, undefined, 2)}\n`, 'utf8');
  return true;
}

/**
 * The `license` an extension folder's JSON file declares, and whether the file is there at all.
 *
 * The two are different facts and the caller needs both: an ABSENT file says nothing about the
 * extension's terms, while a file present with no `license` field is one this repository may
 * stamp.
 */
async function readDeclaredLicense(
  repoRootRelativePath: string,
  root: string = repoRoot,
): Promise<DeclaredLicense> {
  try {
    const parsed = JSON.parse(await fs.readFile(path.join(root, repoRootRelativePath), 'utf8'));
    return { file: repoRootRelativePath, present: true, license: parsed.license };
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT')
      return { file: repoRootRelativePath, present: false, license: undefined };
    throw error;
  }
}

/** One extension JSON file's `license` declaration, as `readDeclaredLicense` reports it. */
export type DeclaredLicense = { file: string; present: boolean; license: unknown };

/**
 * Whether this repository may stamp its license onto an extension folder, from what its files say.
 *
 * Decided for the FOLDER, not per file. Per file, an extension declaring `Apache-2.0` in
 * `package.json` with no `license` in `manifest.json` had the manifest rewritten to AGPL while the
 * package.json kept its own terms: two files in one folder declaring different licences, and no
 * text copied for either.
 *
 * An ABSENT file says nothing - a manifest-only extension is stamped from its manifest alone - but
 * a folder with neither file is not an extension this can say anything about.
 */
export function decideLicenseStamp(declarations: DeclaredLicense[]): {
  stamp: boolean;
  reason?: string;
} {
  const present = declarations.filter((declaration) => declaration.present);
  if (!present.length) return { stamp: false };
  // Neither the template's value nor this repository's: somebody chose these terms on purpose, and
  // nothing here may overwrite the field or the text that goes with them.
  const chosen = present.find(
    ({ license }) =>
      license !== undefined && license !== 'MIT' && license !== BUNDLED_EXTENSION_LICENSE,
  );
  if (chosen)
    return {
      stamp: false,
      reason:
        `${chosen.file} declares "${String(chosen.license)}", which is neither the template's ` +
        "license nor this repository's.",
    };
  return { stamp: true };
}

/**
 * Gives an extension folder this repository's license: the `license` field in its `package.json`
 * and `manifest.json`, and a copy of the AGPL text beside them.
 *
 * The text is copied rather than referenced because each extension is redistributed as its own
 * folder, and a license field naming terms whose text is nowhere in the folder states an obligation
 * without discharging it.
 *
 * The text is compared, not merely tested for presence. Copying it only when NO file existed left
 * the one state that is worse than either: a merge from the MIT template reintroduces the
 * template's own `LICENSE`, the JSON fields above are corrected to AGPL, and the folder then
 * declares AGPL-3.0-or-later while shipping the text of a different licence.
 *
 * "An extension deliberately given other terms is left alone" is decided for the FOLDER, not per
 * file. Deciding it per file meant an extension declaring `Apache-2.0` in `package.json` with no
 * `license` in `manifest.json` had the manifest silently rewritten to AGPL while the package.json
 * kept its own terms - two files in one folder declaring different licences, and no text copied for
 * either.
 *
 * The declaration is read from whichever of the two files the folder HAS. Reading it from
 * `package.json` alone made `declared` permanently undefined for a manifest-only extension
 * (`extensions/src/c-sharp-provider-test/` is one), so its hand-placed LICENSE was never verified
 * against the terms it declares and never repaired.
 */
export async function stampExtensionLicense(
  extensionFolderPath: string,
  root: string = repoRoot,
): Promise<void> {
  const manifestFiles = [
    `${extensionFolderPath}/package.json`,
    `${extensionFolderPath}/manifest.json`,
  ];
  // Wrapped rather than passed as a bare reference: `Array.prototype.map` supplies the index as the
  // second argument, which is the `root` parameter here.
  const declarations = await Promise.all(
    manifestFiles.map((file) => readDeclaredLicense(file, root)),
  );
  const decision = decideLicenseStamp(declarations);
  if (!decision.stamp) {
    if (decision.reason) console.log(`Left ${extensionFolderPath} alone: ${decision.reason}`);
    return;
  }

  // Read BEFORE anything is written. `readCanonicalLicense` refuses a root `LICENSE` that is not
  // the AGPL text, and reading it only after the JSON fields had been stamped produced exactly the
  // state this function's docstring calls worse than either: the folder declares
  // AGPL-3.0-or-later while the text beside it is a different licence, or absent. Nor could a
  // re-run repair it - `stampLicenseInJson` returns early for a folder already declaring the
  // value, so the throw came back before any text was copied. Nothing is stamped unless the text
  // that has to accompany the declaration is in hand.
  const canonical = await readCanonicalLicense(root);

  const stamped = await Promise.all(manifestFiles.map((file) => stampLicenseInJson(file, root)));

  const licenseFile = path.join(root, extensionFolderPath, 'LICENSE');
  let current: string | undefined;
  try {
    current = await fs.readFile(licenseFile, 'utf8');
  } catch {
    current = undefined;
  }
  if (current !== canonical) {
    await fs.writeFile(licenseFile, canonical, 'utf8');
    console.log(
      current === undefined
        ? `Added ${BUNDLED_EXTENSION_LICENSE} LICENSE to ${extensionFolderPath}`
        : `Replaced the LICENSE in ${extensionFolderPath}: it did not match the ` +
            `${BUNDLED_EXTENSION_LICENSE} text this extension declares`,
    );
  }

  if (stamped.some(Boolean))
    console.log(`Set license to ${BUNDLED_EXTENSION_LICENSE} in ${extensionFolderPath}`);
}

/** Format the `extensions/` root folder after a merge from the multi-extension template. */
export async function formatExtensionsRoot() {
  // Delete `extensions/package-lock.json` if present — it is unused because `extensions/` is an npm
  // workspace
  await deleteUnusedPackageLockIfPresent(`${subtreeRootFolder}/package-lock.json`);

  // The subtree root's own LICENSE. It is inside the subtree, so a merge from the MIT
  // multi-extension template replaces it with the template's — and nothing restored it, while every
  // extension folder BELOW it was being corrected to AGPL. `extensions/` is part of this
  // application, so its license is this repository's.
  const canonical = await readCanonicalLicense();
  const licenseFile = path.join(repoRoot, subtreeRootFolder, 'LICENSE');
  let current: string | undefined;
  try {
    current = await fs.readFile(licenseFile, 'utf8');
  } catch {
    current = undefined;
  }
  if (current !== canonical) {
    await fs.writeFile(licenseFile, canonical, 'utf8');
    console.log(
      current === undefined
        ? `Added ${BUNDLED_EXTENSION_LICENSE} LICENSE to ${subtreeRootFolder}`
        : `Replaced the LICENSE in ${subtreeRootFolder}: it did not match the ` +
            `${BUNDLED_EXTENSION_LICENSE} text this repository is under`,
    );
  }
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

  // Delete package-lock.json if present — it is unused because this folder is an npm workspace
  await deleteUnusedPackageLockIfPresent(`${extensionFolderPath}/package-lock.json`);

  // Stamp this repository's license over the template's. Done on every format pass, not only on
  // creation, so a template merge that reintroduces the template's MIT value is corrected the same
  // way a reintroduced `../paranext-core` path is.
  await stampExtensionLicense(extensionFolderPath);

  // Get the basename of the extension folder for use in replacements
  const extensionName = path.basename(extensionFolderPath);
  const extensionNameCamelCase = toCamelCaseFromKebab(extensionName);

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

  // Rename types file
  const oldTypesFilePath = path.join(
    extensionFolderPathFromExtensions,
    'src',
    'types',
    'paranext-extension-template.d.ts',
  );
  const newTypesFilePath = path.join(
    extensionFolderPathFromExtensions,
    'src',
    'types',
    `${extensionName}.d.ts`,
  );

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
  } catch {
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
    if (error instanceof Error) {
      console.error(`Could not update types file: ${error.message}`);
    } else {
      console.error(`An unknown error occurred while updating types file: ${error}`);
    }
  }

  // Update README.md
  const readmePath = path.join(extensionFolderPathFromExtensions, 'README.md');
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
    if (error instanceof Error) {
      console.error(`Could not update README.md: ${error.message}`);
    } else {
      console.error(`An unknown error occurred while updating README.md: ${error}`);
    }
  }

  // Update manifest.json
  const manifestPath = path.join(extensionFolderPathFromExtensions, 'manifest.json');
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
    if (error instanceof Error) {
      console.error(`Could not update manifest.json: ${error.message}`);
    } else {
      console.error(`An unknown error occurred while updating manifest.json: ${error}`);
    }
  }

  // Update package.json
  const packagePath = path.join(extensionFolderPathFromExtensions, 'package.json');
  try {
    // Check if package.json exists
    await fs.access(packagePath);

    let packageContent = await fs.readFile(packagePath, 'utf8');

    // Replace all occurrences of "paranext-extension-template" with extensionName
    packageContent = packageContent.replace(/paranext-extension-template/g, extensionName);

    await fs.writeFile(packagePath, packageContent, 'utf8');
    console.log(`Updated package.json with ${extensionName} information`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Could not update package.json: ${error.message}`);
    } else {
      console.error(`An unknown error occurred while updating package.json: ${error}`);
    }
  }
}
