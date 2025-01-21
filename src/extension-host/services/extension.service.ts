/** Handles setting up activation of and running of extensions */

import chokidar from 'chokidar';
import JSZip from 'jszip';
import path from 'path';
import { IExtension } from '@extension-host/extension-types/extension.interface';
import * as nodeFS from '@node/services/node-file-system.service';
import { FILE_PROTOCOL, getPathFromUri, joinUriPaths } from '@node/utils/util';
import { Uri } from '@shared/data/file-system.model';
import { getModuleSimilarApiMessage } from '@shared/utils/util';
import Module from 'module';
import * as SillsdevScripture from '@sillsdev/scripture';
import * as platformBibleUtils from 'platform-bible-utils';
import logger from '@shared/services/logger.service';
import { getCommandLineArgumentsGroup, COMMAND_LINE_ARGS } from '@node/utils/command-line.util';
import { setExtensionUris } from '@extension-host/services/extension-storage.service';
import papi, { fetch as papiFetch } from '@extension-host/services/papi-backend.service';
import executionTokenService from '@node/services/execution-token.service';
import { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';
import {
  debounce,
  UnsubscriberAsync,
  UnsubscriberAsyncList,
  deserialize,
  endsWith,
  includes,
  stringLength,
  startsWith,
  slice,
} from 'platform-bible-utils';
import LogError from '@shared/log-error.model';
import { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';
import { APP_URI_SCHEME, PLATFORM_NAMESPACE } from '@shared/data/platform.data';
import {
  ElevatedPrivilegeNames,
  ElevatedPrivileges,
} from '@shared/models/elevated-privileges.model';
import { generateHashFromBuffer } from '@node/utils/crypto-util';
import {
  ExtensionIdentifier,
  HashValues,
  InstalledExtensions,
  ManageExtensions,
} from '@shared/models/manage-extensions-privilege.model';
import { CreateProcess } from '@shared/models/create-process-privilege.model';
import { wrappedFork, wrappedSpawn } from '@extension-host/services/create-process.service';
import os from 'os';
import { resyncContributions } from '@extension-host/services/contribution.service';
import {
  HandleUri,
  RegisterUriHandler,
  UriHandler,
} from '@shared/models/handle-uri-privilege.model';
import {
  createNetworkEventEmitter,
  registerRequestHandler,
} from '@shared/services/network.service';
import { HANDLE_URI_REQUEST_TYPE } from '@node/services/extension.service-model';

/**
 * The way to use `require` directly - provided by webpack because they overwrite normal `require`.
 * https://webpack.js.org/api/module-variables/#**non_webpack_require**-webpack-specific
 */
// eslint-disable-next-line camelcase, no-underscore-dangle
declare const __non_webpack_require__: typeof require;

/** These are names of extensions that should only be loaded if "noisy dev mode" is enabled */
const TEST_EXTENSION_NAMES = [
  'c-sharp-provider-test',
  'evil',
  'helloSomeone',
  'helloWorld',
  'quickVerse',
];

/**
 * Information about an extension and extra metadata about it that we generate
 *
 * This is a transformed and frozen version of the extension's {@link ExtensionManifest}
 */
type ExtensionInfo = Readonly<
  ExtensionManifest & {
    /**
     * Uri to this extension's directory. Not provided in actual manifest, but added while parsing
     * the manifest
     */
    dirUri: Uri;
  }
>;

/** Information about an active extension */
type ActiveExtension = {
  info: ExtensionInfo;
  registrations: UnsubscriberAsyncList;
};

/**
 * A dynamically imported extension module which could be an ES Module or a CommonJS module.
 *
 * Using webpack's 'commonjs-static' library type as we use in our extensions, the import is the
 * extension module with its exports directly in the object; there is no need to go into `default`.
 * However, it probably doesn't hurt to support multiple shapes of modules.
 */
type AmbiguousExtensionModule = IExtension | { default: IExtension };

/** Information about a DTS file needed for copying it properly */
type DtsInfo = {
  /** Uri to the `.d.ts` file */
  uri: Uri;
  /** File name including `.d.ts` */
  base: string;
};

/**
 * Key to uniquely identify an extension with some extra certainty that the extension is who it says
 * it is.
 *
 * Format: `<extension-publisher>.<extension-name>`
 */
type ExtensionKey = `${string}.${string}`;

/**
 * Name of the file describing the extension and its capabilities. Provided by the extension
 * developer
 */
const MANIFEST_FILE_NAME = 'manifest.json';

/** List of all forbidden extension names. Extensions with these names will not work */
const FORBIDDEN_EXTENSION_NAMES = ['', PLATFORM_NAMESPACE];

/**
 * Debounce time and time to wait to restart immediately after restarting if another restart was
 * requested
 */
const RESTART_DELAY_MS = 2000;

/** Save the original `require` function. */
const requireOriginal = Module.prototype.require;

// eslint-disable-next-line camelcase
const systemRequire = globalThis.isPackaged ? __non_webpack_require__ : require;

/** The location where installed extensions are stored. Created if it does not exist for ease of use */
const installedExtensionsUri: Uri = `app://installed-extensions`;
nodeFS.createDir(installedExtensionsUri);

/**
 * The location where installed extensions may be moved if they are disabled. Created if it does not
 * exist for ease of use
 */
const disabledExtensionsUri: Uri = `app://disabled-extensions`;
nodeFS.createDir(disabledExtensionsUri);

/** The location where we will store decompressed extension ZIP files */
const userUnzippedExtensionsCacheUri: Uri = 'cache://extensions';

/**
 * The location where we will copy extension type declaration files for extensions to use in
 * development
 */
const userExtensionTypesCacheUri: Uri = 'cache://extension-types';

/** Map of extension name to extension that is currently active and running */
const activeExtensions = new Map<string, ActiveExtension>();

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/**
 * Extensions that are available to us excluding extensions that do not have a JavaScript `main`
 * file to run
 */
let availableExtensions: ExtensionInfo[];

/**
 * Event emitter to tell any extension listening that the extensions finished reloading. The boolean
 * indicates whether it succeeded.
 */
let reloadFinishedEventEmitter: platformBibleUtils.PlatformEventEmitter<boolean>;

/** Whether we are currently reloading extensions */
let isReloading = false;
/** Whether we should reload extensions again once finished currently reloading */
let shouldReload = false;

/** Map of registered URI handlers for each extension keyed by the extension publisher name and name */
const uriHandlersByExtensionKey = new Map<ExtensionKey, UriHandler>();

/** Regex matching to spaces */
const spaceRegex = /\s/;

/** Parse string extension manifest into an object and perform any transformations needed */
function parseManifest(extensionManifestJson: string): ExtensionManifest {
  const extensionManifest: ExtensionManifest = deserialize(extensionManifestJson);

  if (includes(extensionManifest.name, '..'))
    throw new Error('Extension name must not include `..`!');
  if (FORBIDDEN_EXTENSION_NAMES.some((forbiddenName) => forbiddenName === extensionManifest.name))
    throw new Error(`Extension name '${extensionManifest.name}' forbidden!`);

  if (extensionManifest.main?.toLowerCase().endsWith('.ts'))
    // Replace ts with js so people can list their source code ts name but run the transpiled js
    extensionManifest.main = `${extensionManifest.main.slice(0, -3)}.js`;

  return extensionManifest;
}

/**
 * The directories we will search for extension directories and zips.
 *
 * Command-line-provided directories are given priority, so they are provided in this order:
 *
 * 1. `--extensionDirs`-provided directories
 * 2. Installed extensions directory
 *
 *    - In development: `paranext-core/dev-appdata/installed-extensions`
 *    - In production: `<user_home_directory>/.platform.bible/installed-extensions`
 * 3. Core extensions directory
 *
 *    - In development: `paranext-core/extensions/dist`
 *    - In production: `resources/extensions`
 */
const extensionRootDirectories: Uri[] = [
  ...getCommandLineArgumentsGroup(COMMAND_LINE_ARGS.ExtensionsDir).map(
    (extensionDirPath) => `${FILE_PROTOCOL}${path.resolve(extensionDirPath)}`,
  ),
  installedExtensionsUri,
  `resources://extensions${globalThis.isPackaged ? '' : '/dist'}`,
];

/** Individual extension folders and/or zips to load as provided by command-line `--extensions` */
const commandLineExtensionDirectories: string[] = getCommandLineArgumentsGroup(
  COMMAND_LINE_ARGS.Extensions,
).map((extensionPath) => `${FILE_PROTOCOL}${path.resolve(extensionPath)}`);

/**
 * Contents of `nodeFS.readDir()` for all parent folders of extensions. This is expected to be a
 * mixture of directories and ZIP files.
 *
 * Command-line-provided directories are given priority, so they are provided in this order:
 *
 * 1. `--extensionDirs`-provided directories
 * 2. Installed extensions directory
 *
 *    - In development: `paranext-core/dev-appdata/installed-extensions`
 *    - In production: `<user_home_directory>/.platform.bible/installed-extensions`
 * 3. Core extensions directory
 *
 *    - In development: `paranext-core/extensions/dist`
 *    - In production: `resources/extensions`
 */
async function getExtensionRootDirectoryContents() {
  return Promise.all(extensionRootDirectories.map((extensionUri) => nodeFS.readDir(extensionUri)));
}

/**
 * All of the URIs of ZIP files for extensions we want to load
 *
 * Command-line-provided extensions are given priority, so they are provided in this order:
 *
 * 1. `--extensions`-provided extensions
 * 2. Extensions in `--extensionDirs`-provided directories
 * 3. Extensions in installed extensions directory
 *
 *    - In development: `paranext-core/dev-appdata/installed-extensions`
 *    - In production: `<user_home_directory>/.platform.bible/installed-extensions`
 * 4. Extensions in core extensions directory
 *
 *    - In development: `paranext-core/extensions/dist`
 *    - In production: `resources/extensions`
 */
async function getExtensionZipUris(): Promise<Uri[]> {
  return commandLineExtensionDirectories
    .concat(
      (await getExtensionRootDirectoryContents())
        .flatMap((dirEntries) => dirEntries[nodeFS.EntryType.File])
        .filter((extensionFileUri) => extensionFileUri),
    )
    .filter((extensionFileUri) => endsWith(extensionFileUri.toLowerCase(), '.zip'));
}

/**
 * All of the URIs of extensions to load
 *
 * Command-line-provided extensions are given priority, so they are provided in this order:
 *
 * 1. `--extensions`-provided extensions
 * 2. Extensions in `--extensionDirs`-provided directories
 * 3. Extensions in installed extensions directory
 *
 *    - In development: `paranext-core/dev-appdata/installed-extensions`
 *    - In production: `<user_home_directory>/.platform.bible/installed-extensions`
 * 4. Extensions in core extensions directory
 *
 *    - In development: `paranext-core/extensions/dist`
 *    - In production: `resources/extensions`
 * 5. Unzipped extensions in the extension cache
 *
 * Note that all zips have lower priority than all directories instead of being lower than only the
 * directories within their categories. This means directory extensions will always be run instead
 * of zipped extensions of the same name.
 */
async function getExtensionUrisToLoad(): Promise<Uri[]> {
  // Get all subdirectories for command line ARG_EXTENSION_DIRS values and bundled extensions
  let extensionFolders: Uri[] = (await getExtensionRootDirectoryContents())
    .flatMap((dirEntries) => dirEntries[nodeFS.EntryType.Directory])
    .filter((extensionDirUri) => extensionDirUri);

  // Add in all directories explicitly provided by the ARG_EXTENSIONS command line arguments and
  // filter out files
  const extensionFolderPromises = commandLineExtensionDirectories
    .map((extensionDirPath) => {
      const extensionFolder = extensionDirPath.endsWith(MANIFEST_FILE_NAME)
        ? extensionDirPath.slice(0, -MANIFEST_FILE_NAME.length)
        : extensionDirPath;
      return extensionFolder;
    })
    .concat(extensionFolders)
    .map(async (extensionFolder) => {
      return (await nodeFS.getStats(extensionFolder))?.isFile() ? '' : extensionFolder;
    });

  // Remove any explicitly provided ARG_EXTENSIONS values that were files instead of directories
  extensionFolders = (await Promise.all(extensionFolderPromises)).filter(
    (extensionFolder) => extensionFolder,
  );

  // Now add in the cache directories for all ZIP files
  return extensionFolders.concat(
    (await getExtensionZipUris()).map((zipUri) =>
      joinUriPaths(userUnzippedExtensionsCacheUri, path.parse(zipUri).name),
    ),
  );
}

/**
 * Process all ZIP file extensions we can find. It might be nice to store unzipped extensions in
 * memory, but the ESM loader doesn't make that easy. Store them in the file system.
 */
async function unzipCompressedExtensionFiles(): Promise<void> {
  const zipUris = await getExtensionZipUris();
  await Promise.all(
    zipUris.map(async (zipUri) => {
      try {
        await unzipCompressedExtensionFile(zipUri);
      } catch (error) {
        logger.error(`Failed to unpack extension ZIP file "${zipUri}": ${error}`);
      }
    }),
  );
}

/** Unpack a single ZIP file into a known location so we can try to load an extension from it */
async function unzipCompressedExtensionFile(zipUri: Uri): Promise<void> {
  logger.info(`Unpacking zipped extension: ${zipUri}`);
  const parsedZipUri: path.ParsedPath = path.parse(zipUri);
  const zipData: Buffer = await nodeFS.readFileBinary(zipUri);
  const zip: JSZip = await JSZip.loadAsync(zipData);
  const zipEntries = Object.entries(zip.files).filter(([, zipObj]) => !zipObj.dir);

  // Make sure there is a manifest.json file present and nothing tries to walk up the directory tree
  let zipEntriesInProperDirectory: boolean = true;
  let foundManifestFile: boolean = false;
  await Promise.all(
    zipEntries.map(async ([fileName]) => {
      const parsedPath = path.parse(fileName);
      if (includes(fileName, '..')) {
        logger.warn(`Invalid extension ZIP file entry in "${zipUri}": ${fileName}`);
        zipEntriesInProperDirectory = false;
      }
      if (parsedPath.base === MANIFEST_FILE_NAME) foundManifestFile = true;
    }),
  );
  if (!zipEntriesInProperDirectory) return;
  if (!foundManifestFile) {
    logger.warn(`Ignoring extension ZIP file without a manifest: ${zipUri}`);
    return;
  }

  // Ensure all files from "abc.zip" match corresponding files under "/abc" in the output directory
  await Promise.all(
    zipEntries.map(async ([fileName, file]) => {
      const outputUri = joinUriPaths(userUnzippedExtensionsCacheUri, parsedZipUri.name, fileName);
      const outputFileStats = await nodeFS.getStats(outputUri);
      if (outputFileStats && BigInt(file.date.getTime()) === outputFileStats.mtimeMs) return;
      // The file modify timestamp is different, so just overwrite the file with the one in the ZIP
      // We could compare the file size first, but then we would need to hold a big buffer in memory
      await nodeFS.writeFile(outputUri, await file.async('nodebuffer'));
      await nodeFS.touch(outputUri, new Date(file.date.getTime()));
      logger.info(`Wrote extension file to ${outputUri}`);
    }),
  );
}

/**
 * Get information for all unique extensions present.
 *
 * Command-line-provided extensions are given priority, so they are provided in this order:
 *
 * 1. `--extensions`-provided extensions
 * 2. Extensions in `--extensionDirs`-provided directories
 * 3. Extensions in installed extensions directory
 *
 *    - In development: `paranext-core/dev-appdata/installed-extensions`
 *    - In production: `<user_home_directory>/.platform.bible/installed-extensions`
 * 4. Extensions in core extensions directory
 *
 *    - In development: `paranext-core/extensions/dist`
 *    - In production: `resources/extensions`
 * 5. Unzipped extensions in the extension cache
 *
 * Note that all zips have lower priority than all directories instead of being lower than only the
 * directories within their categories. This means directory extensions will always be run instead
 * of zipped extensions of the same name.
 */
// TODO: figure out if we can share this code with webpack.util.ts
async function getExtensions(): Promise<ExtensionInfo[]> {
  const extensionUris = await getExtensionUrisToLoad();
  const allExtensionInfos = (
    await Promise.allSettled(
      extensionUris.map(async (extensionUri) => {
        try {
          const extensionManifestJson = await nodeFS.readFileText(
            joinUriPaths(extensionUri, MANIFEST_FILE_NAME),
          );
          // Assert the return type after freeze.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return Object.freeze({
            ...parseManifest(extensionManifestJson),
            dirUri: extensionUri,
          }) as ExtensionInfo;
        } catch (e) {
          const error = new Error(`Extension folder ${extensionUri} failed to load. Reason: ${e}`);
          logger.warn(error);
          throw error;
        }
      }),
    )
  )
    .filter((settled) => {
      // Ignore failed to load manifest issues - already logged those issues
      if (settled.status !== 'fulfilled') return false;
      // Completely ignore extensions that do not have `main` at all as a hint to developers
      if (settled.value.main === undefined) {
        logger.error(
          `Extension ${settled.value.name} failed to load. Must provide property \`main\` in \`manifest.json\`. If you do not have JavaScript code to run, provide \`"main": ""\``,
        );
        return false;
      }
      if (!globalThis.isNoisyDevModeEnabled && TEST_EXTENSION_NAMES.includes(settled.value.name))
        return false;
      return true;
    })
    // Assert the fulfilled type since the unfulfilled ones have been filtered out.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    .map((fulfilled) => (fulfilled as PromiseFulfilledResult<ExtensionInfo>).value);

  // Filter out duplicate extensions. Only the first extension encountered in order is used
  const extensionInfos: ExtensionInfo[] = [];
  allExtensionInfos.forEach((extensionInfo) => {
    if (
      !extensionInfos.some((finalExtensionInfo) => finalExtensionInfo.name === extensionInfo.name)
    )
      extensionInfos.push(extensionInfo);
  });

  // TODO: Properly sort the order of extensions for activation based on their stated dependencies
  // All embedded extensions should probably also be given priority over others. If we want to be
  // "fancy" we could use a tree instead of a list and activate functions all on the same level
  // concurrently instead of sequentially. For now, manually prioritize some extensions.
  extensionInfos.sort((extA, extB) => {
    if (extA.name === 'platformScripture') return -1;
    if (extB.name === 'platformScripture') return 1;
    if (extA.name === 'platformScriptureEditor') return -1;
    if (extB.name === 'platformScriptureEditor') return 1;
    const extAIsPT = extA.name.startsWith('paratext');
    const extBIsPT = extB.name.startsWith('paratext');
    if (extAIsPT && !extBIsPT) return -1;
    if (extBIsPT && !extAIsPT) return 1;
    return extA.name < extB.name ? -1 : 1;
  });

  return extensionInfos;
}

/**
 * Creates a `DtsInfo` from a Uri
 *
 * @param declarationUri The uri to the dts file
 * @returns `DtsInfo` for the declaration file at the uri specified
 */
function createDtsInfoFromUri(declarationUri: Uri): DtsInfo {
  return {
    uri: declarationUri,
    base: path.parse(declarationUri).base,
  };
}

/**
 * Caches type declaration files for each extension. Gets the type declaration file from each
 * extension and copies it to `extension-types/<extension_type_file_name_without_.d.ts>/index.d.ts`
 * because that is the path that works. If the extension's type declaration file does not start with
 * `<extension_name>`, the folder created will be named `<extension_name>` instead of the name of
 * the extension type declaration file name.
 *
 * We look first at the location provided by the extension manifest's `types` property. If one is
 * not provided, we look for files according to the specification in the JSDoc for
 * {@link ExtensionManifest}'s `types` property order and copy over the first one found.
 *
 * @param extensionInfos Extension info for extensions whose types to cache
 */
async function cacheExtensionTypeDeclarations(extensionInfos: ExtensionInfo[]) {
  return Promise.all(
    extensionInfos.map(async (extensionInfo) => {
      /** The default assumed name for the dts file including `.d.ts` */
      const extensionDtsBaseDefault = `${extensionInfo.name}.d.ts`;
      /** The declaration file uri we are copying for this extension */
      let extensionDtsInfo: DtsInfo | undefined;
      /** The declaration file name we are creating for this extension including `.d.ts` */
      let extensionDtsBaseDestination = extensionDtsBaseDefault;

      // Try using the path to the type declaration file specified in the extension manifest
      if (extensionInfo.types) {
        const providedDtsUri = joinUriPaths(extensionInfo.dirUri, extensionInfo.types);
        const providedDtsStats = await nodeFS.getStats(providedDtsUri);
        if (providedDtsStats?.isFile()) {
          // The extension's specified dts exists, so use it
          extensionDtsInfo = createDtsInfoFromUri(providedDtsUri);
        } else
          logger.warn(
            `Extension ${extensionInfo.name} specified its type declaration file was at ${extensionInfo.types}, but this path does not seem to exist. Trying other options`,
          );
      }

      // If the extension manifest's specified types didn't work out for some reason, try to find a
      // dts file elsewhere
      if (!extensionDtsInfo) {
        // Get a list of all the dts files in the extension's root
        // Note: checking if the file exists before copying it is generally not great practice as
        // it can lead to problems with race conditions. If this ever becomes a problem, we can fix
        // this code.
        const dtsInfos = (
          await nodeFS.readDir(extensionInfo.dirUri, (entryName) => endsWith(entryName, '.d.ts'))
        )[nodeFS.EntryType.File].map(createDtsInfoFromUri);

        if (dtsInfos.length <= 0) {
          logger.debug(
            `Extension ${extensionInfo.name} does not seem to have any .d.ts files in its root`,
          );
          return;
        }

        // Try using a dts file whose name matches the name of the extension
        if (!extensionDtsInfo)
          extensionDtsInfo = dtsInfos.find((dtsInfo) => dtsInfo.base === extensionDtsBaseDefault);

        // Try using a dts file whose name starts with the name of the extension in case they suffixed
        // with version number or something
        if (!extensionDtsInfo)
          extensionDtsInfo = dtsInfos.find((dtsInfo) =>
            startsWith(dtsInfo.base, extensionInfo.name),
          );

        // Try using a dts file whose name is `index.d.ts`
        if (!extensionDtsInfo)
          extensionDtsInfo = dtsInfos.find((dtsInfo) => dtsInfo.base === 'index.d.ts');

        if (!extensionDtsInfo) {
          logger.debug(
            `Could not find a type declaration file for extension ${extensionInfo.name}. If you are trying to provide one, try specifying its path relative to your extension root folder in your \`manifest.json\`'s \`types\` or naming it \`${extensionInfo.name}.d.ts\` or \`index.d.ts\``,
          );
          return;
        }
      }

      // If the dts file has stuff after the extension name, we want to use it so they can suffix a
      // version number or something
      if (startsWith(extensionDtsInfo.base, extensionInfo.name))
        extensionDtsBaseDestination = extensionDtsInfo.base;

      // Put the extension's dts in the types cache in its own folder
      // Without being put in its own folder, it was being lazy loaded by Intellisense, so its types
      // weren't being discovered for some reason. So put it in its own folder whose name is the
      // same as the .d.ts file's name so the module name matches. And call it `index.d.ts` because
      // naming it something else makes TypeScript lose track of where it is without making a
      // package.json for each folder too
      const extensionDtsUriDestination = joinUriPaths(
        userExtensionTypesCacheUri,
        // Folder name must match module name which we are assuming is the same as the name of the
        // .d.ts file, so get the .d.ts file's name and use it as the folder name
        slice(extensionDtsBaseDestination, 0, -stringLength('.d.ts')),
        'index.d.ts',
      );

      // We found a dts file! Copy it to the appropriate destination
      logger.debug(
        `Copying Extension ${extensionInfo.name}'s type declaration file ${getPathFromUri(
          extensionDtsInfo.uri,
        )} to ${getPathFromUri(extensionDtsUriDestination)}`,
      );
      await nodeFS.copyFile(extensionDtsInfo.uri, extensionDtsUriDestination);
    }),
  );
}

/** Watch for changes in the extension directories */
function watchForExtensionChanges(): UnsubscriberAsync {
  const reloadExtensionsDebounced = debounce(async (shouldDeactivateExtensions) => {
    try {
      logger.debug('Reload extensions from watching');
      await reloadExtensions(shouldDeactivateExtensions, true);
    } catch (e) {
      throw new LogError(`Reload extensions from watching failed. Investigate: ${e}`);
    }
  }, RESTART_DELAY_MS);

  const watcher = chokidar
    .watch(
      extensionRootDirectories
        .concat(commandLineExtensionDirectories)
        .map((uri) => getPathFromUri(uri)),
      { ignoreInitial: true, awaitWriteFinish: true },
    )
    .on('all', async (eventType) => {
      let shouldDeactivateExtensions: boolean = true;
      if (eventType === 'add' || eventType === 'addDir') shouldDeactivateExtensions = false;
      reloadExtensionsDebounced(shouldDeactivateExtensions);
    });

  return async () => {
    watcher.close();
    return true;
  };
}

/**
 * Returns a URI we can use with `nodeFS` calls that is an expected filename given a base URI,
 * extension name, and extension version. This is not that useful for packaged extensions but is
 * important for all other extensions, both enabled and disabled.
 */
function getExtensionUri(baseUri: string, extensionName: string, extensionVersion: string): string {
  return `${baseUri}/${extensionName}_${extensionVersion}.zip`;
}

/**
 * Provides extension identifier information based on extension ZIP files names given the naming
 * convention used in {@link getExtensionUri}
 */
function extractExtensionDetailsFromFileNames(fileUris: string[]): ExtensionIdentifier[] {
  return fileUris.map((fileUri: string) => {
    // Splits by either a forward-slash or back-slash to support Windows as well
    const fileName = fileUri.split(path.sep).pop();
    if (!fileName?.endsWith('.zip')) throw new Error(`Not a ZIP file: ${fileName}`);
    const lastDashIndex = fileName.lastIndexOf('_');
    const extensionName = fileName.substring(0, lastDashIndex);
    const extensionVersion = fileName.substring(lastDashIndex + 1, fileName.length - 4);
    return { extensionName, extensionVersion };
  });
}

/** Extracts extension identifier information from a buffer containing an extension ZIP file */
async function extractExtensionDetailsFromZip(zipData: Buffer): Promise<ExtensionIdentifier> {
  const zip: JSZip = await JSZip.loadAsync(zipData);
  const zippedManifest = zip.file(MANIFEST_FILE_NAME);
  if (!zippedManifest) throw new Error('no manifest file found in ZIP data');
  // Assert the extracted manifest.json data as the associated type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const manifest = JSON.parse(await zippedManifest.async('string')) as ExtensionManifest;
  return { extensionName: manifest.name, extensionVersion: manifest.version };
}

/**
 * IMPORTANT: ONLY RUN THIS BEFORE EXTENSIONS ARE ACTIVATED
 *
 * Ensures extension file names match the extension names and versions in their manifest files. This
 * only looks at locations where downloaded extensions reside. Packaged extensions and those pointed
 * to directly from the command line are unaffected.
 */
async function normalizeExtensionFileNames(): Promise<void> {
  const enabledExtensionZipUris = (
    await nodeFS.readDir(installedExtensionsUri, (uri) => uri?.toLowerCase().endsWith('zip'))
  ).file;
  const enabledExtensionPromises = enabledExtensionZipUris.map(async (enabledZipUri) => {
    await normalizeExtensionFileName(installedExtensionsUri, enabledZipUri);
  });

  const disabledExtensionZipUris = (
    await nodeFS.readDir(disabledExtensionsUri, (uri) => uri?.toLowerCase().endsWith('zip'))
  ).file;
  const disabledExtensionPromises = disabledExtensionZipUris.map(async (disabledZipUri) => {
    await normalizeExtensionFileName(disabledExtensionsUri, disabledZipUri);
  });

  await Promise.all(enabledExtensionPromises.concat(disabledExtensionPromises));
}

async function normalizeExtensionFileName(baseUri: string, zipUri: string) {
  try {
    const zipBuffer = await nodeFS.readFileBinary(zipUri);
    const { extensionName, extensionVersion } = await extractExtensionDetailsFromZip(zipBuffer);
    const expectedUri = getExtensionUri(baseUri, extensionName, extensionVersion);
    if (zipUri !== expectedUri) {
      await nodeFS.moveFile(zipUri, expectedUri);
      logger.info(`Renamed '${extensionName}' ZIP file from ${zipUri} to ${expectedUri}`);
    }
  } catch (error) {
    logger.warn(`Failed to normalize extension file for ${zipUri}: ${error}`);
  }
}

// #region Extension management privileges

async function installExtension(
  extensionUrlToDownload: string,
  fileSize: number,
  fileHashes: HashValues,
): Promise<void> {
  // Make sure a supported hash value was provided
  let hashAlgo: string;
  let expectedHashValue: string;
  if (fileHashes.sha512) {
    hashAlgo = 'sha512';
    expectedHashValue = fileHashes.sha512;
  } else if (fileHashes.sha256) {
    hashAlgo = 'sha256';
    expectedHashValue = fileHashes.sha256;
  } else throw new Error(`Missing known hash algorithms from ${JSON.stringify(fileHashes)}`);

  // Download the file and make sure the size and hash values match
  const response = await fetch(extensionUrlToDownload);
  const extensionBuffer = Buffer.from(await response.arrayBuffer());
  if (extensionBuffer.byteLength !== fileSize)
    throw new Error(
      `file size mismatch, expected ${JSON.stringify(fileSize)}, actual ${JSON.stringify(extensionBuffer.byteLength)}`,
    );
  const hashValue = generateHashFromBuffer(hashAlgo, 'base64', extensionBuffer);
  if (expectedHashValue !== hashValue)
    throw new Error(`file hash mismatch, expected ${expectedHashValue}, actual ${hashValue}`);

  // Extract information needed from the extension
  const { extensionName, extensionVersion } = await extractExtensionDetailsFromZip(extensionBuffer);
  if (FORBIDDEN_EXTENSION_NAMES.find((forbiddenName) => extensionName === forbiddenName))
    throw new Error(`Forbidden extension name: ${extensionName}`);

  // Save the extension file in a location where it will be automatically installed
  const extensionUri = getExtensionUri(installedExtensionsUri, extensionName, extensionVersion);
  if (await nodeFS.getStats(extensionUri))
    logger.warn(`Attempting to overwrite extension ZIP file: ${extensionUri}`);
  await nodeFS.writeFile(extensionUri, extensionBuffer);
  logger.info(`Installed ${extensionName} ${extensionVersion} from ${extensionUrlToDownload}`);
}

async function enableExtension(extensionId: ExtensionIdentifier) {
  const { extensionName, extensionVersion } = extensionId;
  const sourceUri = getExtensionUri(disabledExtensionsUri, extensionName, extensionVersion);
  if (!(await nodeFS.getStats(sourceUri)))
    throw new Error(`'${extensionName} ${extensionVersion}' is not disabled`);
  const destinationUri = getExtensionUri(installedExtensionsUri, extensionName, extensionVersion);
  if (await nodeFS.getStats(destinationUri))
    throw new Error(`'${extensionName} ${extensionVersion}' is already enabled`);
  await nodeFS.moveFile(sourceUri, destinationUri);
  logger.info(`Enabled ${extensionName} ${extensionVersion}`);
}

async function disableExtension(extensionId: ExtensionIdentifier) {
  const { extensionName, extensionVersion } = extensionId;
  const sourceUri = getExtensionUri(installedExtensionsUri, extensionName, extensionVersion);
  if (!(await nodeFS.getStats(sourceUri)))
    throw new Error(`'${extensionName} ${extensionVersion}' does not exist or is not enabled`);
  const destinationUri = getExtensionUri(disabledExtensionsUri, extensionName, extensionVersion);
  if (await nodeFS.getStats(destinationUri))
    logger.warn(`Attempting to overwrite extension ZIP file: ${destinationUri}`);
  await nodeFS.moveFile(sourceUri, destinationUri);
  logger.info(`Disabled ${extensionName} ${extensionVersion}`);
}

async function getInstalledExtensions(): Promise<InstalledExtensions> {
  // "Enabled" extensions are all the ones in the "installed" directory
  const installedExtensionZips = (
    await nodeFS.readDir(installedExtensionsUri, (uri) => uri?.toLowerCase().endsWith('zip'))
  ).file;
  const enabled = extractExtensionDetailsFromFileNames(installedExtensionZips);

  // "Disabled" extensions are all the ones in the "disabled" directory that aren't also "enabled"
  const disabledExtensionZips = (
    await nodeFS.readDir(disabledExtensionsUri, (uri) => uri?.toLowerCase().endsWith('zip'))
  ).file;
  const disabled = extractExtensionDetailsFromFileNames(disabledExtensionZips).filter(
    (disabledId) =>
      !enabled.find((enabledId) => enabledId.extensionName === disabledId.extensionName),
  );

  // "Packaged" extensions are all the running extensions that aren't "enabled".
  // `undefined` items are filtered out so can assert here.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const packaged = [...activeExtensions.values()]
    .map((active) => {
      const packagedId: ExtensionIdentifier = {
        extensionName: active.info.name,
        extensionVersion: active.info.version,
      };

      return enabled.find((enabledId) => enabledId.extensionName === packagedId.extensionName)
        ? undefined
        : packagedId;
    })
    .filter((identifier) => !!identifier) as ExtensionIdentifier[];

  return {
    enabled,
    disabled,
    packaged,
  };
}

// #endregion

// #region Extension URI handling privileges

function getExtensionKey(manifest: ExtensionManifest): ExtensionKey {
  if (!manifest.publisher || spaceRegex.test(manifest.publisher))
    throw new Error('Extension publisher must not be empty string, undefined, or contain spaces');
  if (!manifest.name || spaceRegex.test(manifest.name))
    throw new Error('Extension name must not be empty string, undefined, or contain spaces');
  const extensionKey: ExtensionKey = `${manifest.publisher}.${manifest.name}`;
  return extensionKey;
}

function getRedirectUri(manifest: ExtensionManifest) {
  return `${APP_URI_SCHEME}://${getExtensionKey(manifest)}`;
}

function createRegisterUriHandlerFunction(manifest: ExtensionManifest): RegisterUriHandler {
  return (uriHandler) => {
    const extensionKey = getExtensionKey(manifest);
    if (uriHandlersByExtensionKey.has(extensionKey))
      throw new Error(
        `Extension ${extensionKey} already has a registered Uri handler. Cannot have multiple.`,
      );

    uriHandlersByExtensionKey.set(extensionKey, uriHandler);

    return () => uriHandlersByExtensionKey.delete(extensionKey);
  };
}

function handleExtensionUri(uri: string) {
  // need to use `new URL` instead of `URL.parse` because Node<22.1.0 doesn't have it. Can change
  // when we get there
  let url: URL;
  try {
    url = new URL(uri);
  } catch (e) {
    logger.warn(`Extension service received uri ${uri} but could not parse it. ${e}`);
    return;
  }
  if (url.protocol !== `${APP_URI_SCHEME}:`) {
    logger.warn(
      `Extension service received uri ${uri} but protocol does not match ${APP_URI_SCHEME}`,
    );
    return;
  }

  // Validating the map keys when setting in createRegisterUriHandlerFunction, so this won't match
  // to anything if it is not properly formatted. Implicitly validating as ExtensionKey
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const extensionKey = url?.hostname as ExtensionKey;
  const uriHandler = uriHandlersByExtensionKey.get(extensionKey);

  if (!uriHandler) {
    logger.warn(
      `Extension service received uri ${uri}, but there was not a registered URI handler for ${extensionKey}`,
    );
    return;
  }

  (async () => {
    try {
      logger.debug(`Extension service sending uri ${uri} to extension ${extensionKey} to handle`);
      await uriHandler(uri);
    } catch (e) {
      logger.warn(`Extension service ran uri handler for ${uri}, but it threw. ${e}`);
    }
  })();
}

// #endregion

function prepareElevatedPrivileges(manifest: ExtensionManifest): Readonly<ElevatedPrivileges> {
  const retVal: ElevatedPrivileges = {
    createProcess: undefined,
    manageExtensions: undefined,
    handleUri: undefined,
  };
  if (manifest.elevatedPrivileges?.find((p) => p === ElevatedPrivilegeNames.createProcess)) {
    const createProcess: CreateProcess = {
      fork: wrappedFork,
      spawn: wrappedSpawn,
      osData: {
        platform: os.platform(),
        type: os.type(),
        release: os.release(),
      },
    };
    Object.freeze(createProcess);
    retVal.createProcess = createProcess;
  }
  if (manifest.elevatedPrivileges?.find((p) => p === ElevatedPrivilegeNames.manageExtensions)) {
    const manageExtensions: ManageExtensions = {
      installExtension,
      enableExtension,
      disableExtension,
      getInstalledExtensions,
    };
    Object.freeze(manageExtensions);
    retVal.manageExtensions = manageExtensions;
  }
  if (manifest.elevatedPrivileges?.find((p) => p === ElevatedPrivilegeNames.handleUri)) {
    const handleUri: HandleUri = {
      redirectUri: getRedirectUri(manifest),
      registerUriHandler: createRegisterUriHandlerFunction(manifest),
    };
    Object.freeze(handleUri);
    retVal.handleUri = handleUri;
  }
  Object.freeze(retVal);
  return retVal;
}

/**
 * Loads an extension and runs its activate function.
 *
 * WARNING: This does not shim functionality out of extensions! Do not run this alone. Only run
 * wrapped in activateExtensions().
 *
 * @param extension - Extension info for the extension to activate.
 * @returns Unsubscriber that deactivates the extension.
 */
async function activateExtension(extension: ExtensionInfo): Promise<ActiveExtension> {
  logger.info(`extension.service: importing ${extension.name}`);
  // Import the extension file. Tell webpack to ignore it because extension files are not in the
  // bundle and should not be looked up in the bundle. Assert a more ambiguous type.
  // DO NOT REMOVE THE webpackIgnore COMMENT. It is a webpack "Magic Comment" https://webpack.js.org/api/module-methods/#magic-comments
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const extensionModuleAmbiguous = systemRequire(
    /* webpackIgnore: true */ getPathFromUri(extension.dirUri),
  ) as AmbiguousExtensionModule;
  logger.info(`extension.service: finished importing ${extension.name}`);
  // Some modules import with their exports directly on the module object, while others put their
  // exports in a `default` member on the module. Let's use the module object itself if `activate`
  // is on it, and let's go into `default` otherwise.
  const extensionModule =
    'activate' in extensionModuleAmbiguous
      ? extensionModuleAmbiguous
      : extensionModuleAmbiguous.default;

  // IMPORTANT: Only give the token to the extension when it is activated. Don't store it or its
  // nonce anywhere else. It is okay to give the token's getHash() value to something for purposes
  // of unregistering the extension later.
  const executionToken = executionTokenService.registerExtension(extension.name);
  const tokenName: string = executionToken.name;
  const tokenHash: string = executionToken.getHash();

  // Build up the context for this particular extension
  const context: ExecutionActivationContext = {
    name: extension.name,
    elevatedPrivileges: prepareElevatedPrivileges(extension),
    executionToken,
    registrations: new UnsubscriberAsyncList(extension.name),
  };
  Object.freeze(context);

  // Activate the extension
  logger.info(`extension.service: activating ${extension.name}`);
  await extensionModule.activate(context);
  logger.info(`extension.service: finished activating ${extension.name}`);

  // Add registrations that the extension didn't explicitly make itself
  if (extensionModule.deactivate) context.registrations.add(extensionModule.deactivate);
  context.registrations.add(() => executionTokenService.unregisterExtension(tokenName, tokenHash));
  context.registrations.add(() => activeExtensions.delete(extension.name));

  // Store information about our newly activated extension
  const activeExtension: ActiveExtension = {
    info: extension,
    registrations: context.registrations,
  };
  activeExtensions.set(extension.name, activeExtension);
  return activeExtension;
}

/**
 * Load extensions and runs their activate functions.
 *
 * @param extensions Extension info for the extensions we want to activate
 * @returns Unsubscriber that deactivates the extension
 */
async function activateExtensions(extensions: ExtensionInfo[]): Promise<ActiveExtension[]> {
  // Filter out the extensions that are already activated, so when new ones are added only the new extension is activated
  const extensionsToActivate =
    activeExtensions.size > 0
      ? extensions.filter((extension) => activeExtensions.get(extension.name) === undefined)
      : extensions;

  /** Include whether that extension has already been imported */
  const extensionsWithCheck = extensionsToActivate.map((extension) => ({
    extension,
    hasBeenImported: false,
  }));

  // Shim out require so extensions can use it only as prescribed.
  // Assert the specific type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  Module.prototype.require = ((moduleName: string) => {
    // Allow the extension to import papi and some other things
    if (moduleName === '@papi/backend') return papi;
    if (moduleName === '@sillsdev/scripture') return SillsdevScripture;
    if (moduleName === 'platform-bible-utils') return platformBibleUtils;

    // Figure out if we are doing the import for the extension file in activateExtension
    const extensionFile = extensionsWithCheck.find(
      (extensionToCheck) =>
        !extensionToCheck.hasBeenImported &&
        getPathFromUri(extensionToCheck.extension.dirUri) === moduleName,
    );

    if (extensionFile) {
      // The file that is being imported is the extension file, so this hopefully means we are
      // importing the extension file in activateExtension. Allow this and mark the extension as
      // imported.
      // TODO: an extension can probably import another extension's file and mess this up. Maybe try to find a better way
      extensionFile.hasBeenImported = true;
      return requireOriginal(moduleName);
    }

    // Disallow any imports within the extension
    // Tell the extension dev if there is an api similar to what they want to import
    const message = `Requiring other than papi is not allowed in extensions! ${getModuleSimilarApiMessage(
      moduleName,
    )}`;
    throw new Error(message);
  }) as typeof Module.prototype.require;

  // Delete ways to execute arbitrary code https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_eval_expressions
  // Note: node does not allow strings in setTimeout, setInterval, or setImmediate, so we don't need
  // to monkey-patch them https://nodejs.org/api/timers.html#scheduling-timers
  // @ts-expect-error we want to remove eval because it can create code from strings
  // eslint-disable-next-line no-eval
  delete globalThis.eval;
  // @ts-expect-error we want to remove Function because it can create code from strings
  delete globalThis.Function;

  // Replace fetch with papi.fetch.
  // eslint-disable-next-line no-global-assign
  globalThis.fetch = papiFetch;

  // @ts-expect-error we want to remove XMLHttpRequest
  // eslint-disable-next-line no-global-assign
  globalThis.XMLHttpRequest = function XMLHttpRequestForbidden() {
    throw new Error('Cannot use XMLHttpRequest! Try using papi.fetch');
  };

  // @ts-expect-error we want to remove WebSocket
  // eslint-disable-next-line no-global-assign
  globalThis.WebSocket = function WebSocketForbidden() {
    throw new Error('Cannot use WebSocket!');
  };

  // Import the extensions and run their activate() functions
  const extensionsActive: ActiveExtension[] = [];
  // This is a case where we want to run through the array in order sequentially
  // eslint-disable-next-line no-restricted-syntax
  for (const extensionWithCheck of extensionsWithCheck) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const extension = await activateExtension(extensionWithCheck.extension);
      extensionsActive.push(extension);
    } catch (e) {
      logger.error(`Extension '${extensionWithCheck.extension.name}' threw while activating! ${e}`);
    }
  }

  return extensionsActive;
}

/**
 * Deactivates an active extension.
 *
 * @param extensionName - Name of the extension.
 * @returns `true` if the extension deactivates, `false` if at least one deactivation fails,
 *   `undefined` otherwise, e.g. not active, not registered.
 */
async function deactivateExtension(extension: ExtensionInfo): Promise<boolean | undefined> {
  const activeExtension = activeExtensions.get(extension.name);

  if (!activeExtension) logger.error(`Extension '${extension.name}' has no active extension data.`);
  else if (!activeExtension.registrations)
    logger.error(
      `Extension '${extension.name}' does not have a registrations object to unregister.`,
    );

  const isUnsubscribed = await activeExtension?.registrations?.runAllUnsubscribers();
  if (!isUnsubscribed)
    logger.error(`Extension '${extension.name}' was not successfully unsubscribed!`);

  let extensionKey: ExtensionKey | undefined;
  try {
    extensionKey = getExtensionKey(extension);
  } catch (e) {
    logger.debug(
      `Could not get extension key for extension '${extension.name}'. Skipping attempting to delete uri handler.`,
    );
  }
  if (extensionKey) uriHandlersByExtensionKey.delete(extensionKey);

  // Delete the extension module from Node's module cache if we previously loaded it.
  const moduleKey = systemRequire.resolve(getPathFromUri(extension.dirUri));
  if (moduleKey in systemRequire.cache) delete systemRequire.cache[moduleKey];
  else logger.warn(`Extension '${extension.name}' not found in the module cache to be removed!`);

  return isUnsubscribed;
}

/**
 * Deactivate all given extensions.
 *
 * @param extensions - Extension info for the extensions we want to deactivate.
 * @returns An array of the deactivation results - `true`, `false`, or `undefined`.
 */
async function deactivateExtensions(extensions: ExtensionInfo[]): Promise<void> {
  // We want to deactivate extensions sequentially in opposite order of which they were activated
  // eslint-disable-next-line no-restricted-syntax
  for (const extension of [...extensions].reverse()) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const isDeactivated = await deactivateExtension(extension);
      if (!isDeactivated) logger.error(`Extension '${extension.name}' failed to deactivate.`);
    } catch (e) {
      logger.error(`Extension '${extension.name}' threw while deactivating! ${e}`);
    }
  }
}

async function reloadExtensions(
  shouldDeactivateExtensions: boolean,
  shouldEmitDidReloadEvent: boolean,
): Promise<void> {
  if (isReloading) {
    shouldReload = true;
    return;
  }
  isReloading = true;

  let errorMessage = '';

  try {
    if (shouldDeactivateExtensions && availableExtensions) {
      await deactivateExtensions(availableExtensions);
    }

    await unzipCompressedExtensionFiles();

    // Get a list of all extensions found
    const allExtensions = await getExtensions();

    // Cache type declarations in development
    if (!globalThis.isPackaged)
      try {
        await cacheExtensionTypeDeclarations(allExtensions);
      } catch (e) {
        logger.warn(`Could not cache extension type declarations: ${e}`);
      }

    // Save extensions that have JavaScript to run
    // If main is an empty string, having no JavaScript is intentional. Do not load this extension
    availableExtensions = allExtensions.filter((extension) => extension.main);

    // Store their base URIs in the extension storage service
    const uriMap: Map<string, string> = new Map();
    availableExtensions.forEach((extensionInfo) => {
      uriMap.set(extensionInfo.name, extensionInfo.dirUri);
      logger.info(`Extension ${extensionInfo.name} loaded from ${extensionInfo.dirUri}`);
    });
    setExtensionUris(uriMap);

    // Update the menus, settings, etc. - all json contributions the extensions make
    await resyncContributions(allExtensions);

    // Active the extensions
    await activateExtensions(availableExtensions);
  } catch (e) {
    errorMessage = platformBibleUtils.getErrorMessage(e);
  }

  if (shouldEmitDidReloadEvent) {
    reloadFinishedEventEmitter.emit(!errorMessage);
  }

  isReloading = false;
  if (shouldReload) {
    (async () => {
      try {
        await platformBibleUtils.wait(RESTART_DELAY_MS);
        shouldReload = false;
        await reloadExtensions(shouldDeactivateExtensions, shouldEmitDidReloadEvent);
      } catch (e) {
        logger.error(`Subsequent reload after initial reload extensions failed! ${e}`);
      }
    })();
  }

  if (errorMessage) throw new Error(errorMessage);
}

/**
 * Sets up the ExtensionService. Runs only once
 *
 * WARNING: import everything needed before this initialize as `require` becomes limited after.
 */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    reloadFinishedEventEmitter = createNetworkEventEmitter<boolean>(
      'platform.onDidReloadExtensions',
    );

    await registerRequestHandler(HANDLE_URI_REQUEST_TYPE, handleExtensionUri);

    await normalizeExtensionFileNames();

    await reloadExtensions(false, false);

    watchForExtensionChanges();

    isInitialized = true;
  })();

  return initializePromise;
};

/** Get a list of names of all active extensions */
export const getActiveExtensions = () => {
  return [...activeExtensions.keys()];
};
