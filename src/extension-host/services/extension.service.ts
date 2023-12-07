/** Handles setting up activation of and running of extensions */

import chokidar from 'chokidar';
import JSZip from 'jszip';
import path from 'path';
import { IExtension } from '@extension-host/extension-types/extension.interface';
import * as nodeFS from '@node/services/node-file-system.service';
import { FILE_PROTOCOL, getPathFromUri, joinUriPaths } from '@node/utils/util';
import { Uri } from '@shared/data/file-system.model';
import {
  UnsubscriberAsync,
  deserialize,
  getModuleSimilarApiMessage,
} from '@shared/utils/papi-util';
import Module from 'module';
import * as SillsdevScripture from '@sillsdev/scripture';
import logger from '@shared/services/logger.service';
import {
  ARG_EXTENSION_DIRS,
  ARG_EXTENSIONS,
  getCommandLineArgumentsGroup,
} from '@node/utils/command-line.util';
import { setExtensionUris } from '@extension-host/services/extension-storage.service';
import papi, { fetch as papiFetch } from '@extension-host/services/papi-backend.service';
import executionTokenService from '@node/services/execution-token.service';
import UnsubscriberAsyncList from '@shared/utils/unsubscriber-async-list';
import { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';
import { debounce } from '@shared/utils/util';
import LogError from '@shared/log-error.model';
import { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';

/**
 * The way to use `require` directly - provided by webpack because they overwrite normal `require`.
 * https://webpack.js.org/api/module-variables/#**non_webpack_require**-webpack-specific
 */
// eslint-disable-next-line camelcase, no-underscore-dangle
declare const __non_webpack_require__: typeof require;

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
 * Name of the file describing the extension and its capabilities. Provided by the extension
 * developer
 */
const MANIFEST_FILE_NAME = 'manifest.json';

/** Save the original `require` function. */
const requireOriginal = Module.prototype.require;

// eslint-disable-next-line camelcase
const systemRequire = globalThis.isPackaged ? __non_webpack_require__ : require;

/** The location where installed extensions are stored. Created if it does not exist for ease of use */
const installedExtensionsUri: Uri = `app://installed-extensions`;
nodeFS.createDir(installedExtensionsUri);

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

/** Parse string extension manifest into an object and perform any transformations needed */
function parseManifest(extensionManifestJson: string): ExtensionManifest {
  const extensionManifest: ExtensionManifest = deserialize(extensionManifestJson);
  if (extensionManifest.name.includes('..'))
    throw new Error('Extension name must not include `..`!');
  // Replace ts with js so people can list their source code ts name but run the transpiled js
  if (extensionManifest.main && extensionManifest.main.toLowerCase().endsWith('.ts'))
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
  ...getCommandLineArgumentsGroup(ARG_EXTENSION_DIRS).map(
    (extensionDirPath) => `${FILE_PROTOCOL}${path.resolve(extensionDirPath)}`,
  ),
  installedExtensionsUri,
  `resources://extensions${globalThis.isPackaged ? '' : '/dist'}`,
];

/** Individual extension folders and/or zips to load as provided by command-line `--extensions` */
const commandLineExtensionDirectories: string[] = getCommandLineArgumentsGroup(ARG_EXTENSIONS).map(
  (extensionPath) => `${FILE_PROTOCOL}${path.resolve(extensionPath)}`,
);

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
    .filter((extensionFileUri) => extensionFileUri.toLowerCase().endsWith('.zip'));
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
      if (fileName.includes('..')) {
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
        if (providedDtsStats && providedDtsStats.isFile()) {
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
          await nodeFS.readDir(extensionInfo.dirUri, (entryName) => entryName.endsWith('.d.ts'))
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
            dtsInfo.base.startsWith(extensionInfo.name),
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
      if (extensionDtsInfo.base.startsWith(extensionInfo.name))
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
        extensionDtsBaseDestination.slice(0, -'.d.ts'.length),
        'index.d.ts',
      );

      // We found a dts file! Copy it to the appropriate destination
      logger.info(
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
      await reloadExtensions(shouldDeactivateExtensions);
    } catch (e) {
      throw new LogError(`Reload extensions from watching failed. Investigate: ${e}`);
    }
  });

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
 * Loads an extension and runs its activate function.
 *
 * WARNING: This does not shim functionality out of extensions! Do not run this alone. Only run
 * wrapped in activateExtensions().
 *
 * @param extension - Extension info for the extension to activate.
 * @returns Unsubscriber that deactivates the extension.
 */
async function activateExtension(extension: ExtensionInfo): Promise<ActiveExtension> {
  // Import the extension file. Tell webpack to ignore it because extension files are not in the
  // bundle and should not be looked up in the bundle. Assert a more ambiguous type.
  // DO NOT REMOVE THE webpackIgnore COMMENT. It is a webpack "Magic Comment" https://webpack.js.org/api/module-methods/#magic-comments
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const extensionModuleAmbiguous = systemRequire(
    /* webpackIgnore: true */ getPathFromUri(extension.dirUri),
  ) as AmbiguousExtensionModule;
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
    executionToken,
    registrations: new UnsubscriberAsyncList(extension.name),
  };
  Object.freeze(context);

  // Activate the extension
  await extensionModule.activate(context);

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
  // Assert the type has been filtered for undefined.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const extensionsActive = (
    await Promise.all(
      extensionsWithCheck.map((extensionWithCheck) =>
        activateExtension(extensionWithCheck.extension).catch((e) => {
          logger.error(
            `Extension '${extensionWithCheck.extension.name}' threw while activating! ${e}`,
          );
          return undefined;
        }),
      ),
    )
  ).filter((activeExtension) => activeExtension !== undefined) as ActiveExtension[];

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

  // Delete the extension module from Node's module cache if we previously loaded it.
  const moduleKey = systemRequire.resolve(getPathFromUri(extension.dirUri));
  if (!(moduleKey in systemRequire.cache)) {
    logger.warn(`Extension '${extension.name}' was not found in the module cache to be removed!`);
    return isUnsubscribed;
  }

  delete systemRequire.cache[moduleKey];

  return isUnsubscribed;
}

/**
 * Deactivate all given extensions.
 *
 * @param extensions - Extension info for the extensions we want to deactivate.
 * @returns An array of the deactivation results - `true`, `false`, or `undefined`.
 */
function deactivateExtensions(extensions: ExtensionInfo[]): Promise<(boolean | undefined)[]> {
  return Promise.all(
    extensions.map(async (extension) => {
      try {
        const isDeactivated = await deactivateExtension(extension);
        if (!isDeactivated) logger.error(`Extension '${extension.name}' failed to deactivate.`);
        return isDeactivated;
      } catch (e) {
        logger.error(`Extension '${extension.name}' threw while deactivating! ${e}`);
        return false;
      }
    }),
  );
}

async function reloadExtensions(shouldDeactivateExtensions: boolean): Promise<void> {
  if (shouldDeactivateExtensions && availableExtensions)
    await deactivateExtensions(availableExtensions);

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

  // And finally activate them
  await activateExtensions(availableExtensions);
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

    await reloadExtensions(false);

    watchForExtensionChanges();

    isInitialized = true;
  })();

  return initializePromise;
};

/** Get a list of names of all active extensions */
export const getActiveExtensions = () => {
  return [...activeExtensions.keys()];
};
