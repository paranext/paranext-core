/**
 * Handles setting up activation of and running of extensions
 */

import * as os from 'os';
import JSZip from 'jszip';
import path from 'path';
import { IExtension } from '@extension-host/extension-types/extension.interface';
import * as nodeFS from '@node/services/node-file-system.service';
import { getPathFromUri, joinUriPaths } from '@node/utils/util';
import { Uri } from '@shared/data/file-system.model';
import { getModuleSimilarApiMessage } from '@shared/utils/papi-util';
import Module from 'module';
import * as SillsdevScripture from '@sillsdev/scripture';
import logger from '@shared/services/logger.service';
import {
  ARG_EXTENSION_DIRS,
  ARG_EXTENSIONS,
  getCommandLineArgumentsGroup,
} from '@node/utils/command-line.util';
import { setExtensionUris } from '@extension-host/services/extension-storage.service';
import papi from '@extension-host/services/papi-backend.service';
import executionTokenService from '@node/services/execution-token.service';
import UnsubscriberAsyncList from '@extension-host/extension-types/unsubscriber-async-list';
import { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';

/**
 * Name of the file describing the extension and its capabilities. Provided by the extension
 * developer
 */
const MANIFEST_FILE_NAME = 'manifest.json';

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Extensions that are available to us */
let availableExtensions: ExtensionInfo[];

/** Map of extension name to extension that is currently active and running */
const activeExtensions = new Map<string, ActiveExtension>();

/** Extension manifest before it is finalized and frozen */

/**
 * Information about an extension provided by the extension developer.
 * This will be transformed and frozen into an ExtensionInfo before use
 */
type ExtensionManifest = {
  name: string;
  version: string;
  /**
   * The JavaScript file to run in the extension host.
   *
   * Must be specified. Can be `null` if the extension does not have any JavaScript to run.
   */
  main: string | null;
  activationEvents: string[];
};

/** Information about an extension and extra metadata about it that we generate */
type ExtensionInfo = Readonly<
  ExtensionManifest & {
    /** We filtered out undefined and null in `getExtensions`, so this should now be defined */
    main: string;
    /** Uri to this extension's directory. Not provided in actual manifest, but added while parsing the manifest */
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

/** Parse string extension manifest into an object and perform any transformations needed */
function parseManifest(extensionManifestJson: string) {
  const extensionManifest = JSON.parse(extensionManifestJson) as ExtensionManifest;
  // Replace ts with js so people can list their source code ts name but run the transpiled js
  if (extensionManifest.main && extensionManifest.main.endsWith('.ts'))
    extensionManifest.main = `${extensionManifest.main.slice(0, -3)}.js`;

  return extensionManifest;
}

/** This is the location where we will store decompressed extension ZIP files */
const userUnzippedExtensionsCacheUri: string = `file://${path.join(
  os.homedir(),
  '.platform.bible/extensions',
)}`;

/** These are all the directories that might contain extension folders and/or ZIP files */
const extensionRootUris = [
  `resources://extensions${globalThis.isPackaged ? '' : '/dist'}`,
  userUnzippedExtensionsCacheUri,
  ...getCommandLineArgumentsGroup(ARG_EXTENSION_DIRS).map(
    (extensionDirPath) => `file://${extensionDirPath}`,
  ),
];

/** Process all ZIP file extensions we can find. It might be nice to store unzipped extensions
 *  in memory, but the ESM loader doesn't make that easy. Store them in the file system.
 */
async function unzipCompressedExtensionFiles(): Promise<void> {
  const zipUris: Uri[] = (
    await Promise.all(extensionRootUris.map((extensionDirUri) => nodeFS.readDir(extensionDirUri)))
  )
    .flatMap((dirEntries) => dirEntries[nodeFS.EntryType.File])
    .filter((extensionFileUri) => extensionFileUri)
    .filter((extensionFileUri) => extensionFileUri.toLowerCase().endsWith('.zip'))
    .concat(
      getCommandLineArgumentsGroup(ARG_EXTENSIONS)
        .filter((extensionUri) => extensionUri.toLowerCase().endsWith('.zip'))
        .map((extensionPath) => `file://${extensionPath}`),
    );

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
 * Get information for all the extensions present
 */
// TODO: figure out if we can share this code with webpack.util.ts
const getExtensions = async (): Promise<ExtensionInfo[]> => {
  const extensionFolders: Uri[] = (
    await Promise.all(extensionRootUris.map((extensionDirUri) => nodeFS.readDir(extensionDirUri)))
  )
    .flatMap((dirEntries) => dirEntries[nodeFS.EntryType.Directory])
    .filter((extensionDirUri) => extensionDirUri);

  return (
    await Promise.allSettled(
      extensionFolders
        .concat(
          getCommandLineArgumentsGroup(ARG_EXTENSIONS).map((extensionDirPath) => {
            const extensionFolder = extensionDirPath.endsWith(MANIFEST_FILE_NAME)
              ? extensionDirPath.slice(0, -MANIFEST_FILE_NAME.length)
              : extensionDirPath;
            return `file://${extensionFolder}`;
          }),
        )
        .map(async (extensionFolder) => {
          try {
            // Can't put this in a filter above because it's async
            if ((await nodeFS.getStats(extensionFolder))?.isFile()) return Promise.resolve();

            const extensionManifestJson = await nodeFS.readFileText(
              joinUriPaths(extensionFolder, MANIFEST_FILE_NAME),
            );
            return Object.freeze({
              ...parseManifest(extensionManifestJson),
              dirUri: extensionFolder,
            }) as ExtensionInfo;
          } catch (e) {
            const error = new Error(
              `Extension folder ${extensionFolder} failed to load. Reason: ${e}`,
            );
            logger.warn(error);
            throw error;
          }
        }),
    )
  )
    .filter((settled) => {
      // Ignore failed to load manifest issues - already logged those issues
      if (settled.status !== 'fulfilled' || !settled.value) return false;
      if ((settled.value.main as Partial<ExtensionManifest>) === undefined) {
        logger.warn(
          `Extension ${settled.value.name} failed to load. Must provide property \`main\` in \`manifest.json\`. If you do not have JavaScript code to run, provide \`"main": null\``,
        );
        return false;
      }
      // If main is null, having no JavaScript is intentional. Do not load this extension
      return settled.value.main !== null;
    })
    .map((fulfilled) => (fulfilled as PromiseFulfilledResult<ExtensionInfo>).value);
};

/**
 * Loads an extension and runs its activate function.
 *
 * WARNING: This does not shim functionality out of extensions! Do not run this alone. Only run
 *   wrapped in activateExtensions().
 * @param extension extension info for the extension to activate
 * @param extensionFilePath path to extension main file to import
 * @returns unsubscriber that deactivates the extension
 */
const activateExtension = async (
  extension: ExtensionInfo,
  extensionFilePath: string,
): Promise<ActiveExtension> => {
  // Import the extension file. Tell webpack to ignore it because extension files are not in the
  // bundle and should not be looked up in the bundle
  // DO NOT REMOVE THE webpackIgnore COMMENT. It is a webpack "Magic Comment" https://webpack.js.org/api/module-methods/#magic-comments
  const extensionModuleAmbiguous = (await import(
    /* webpackIgnore: true */ extensionFilePath
  )) as AmbiguousExtensionModule;
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
    registrations: new UnsubscriberAsyncList(),
  };
  Object.freeze(context);

  // Activate the extension
  await extensionModule.activate(context);

  // Add registrations that the extension didn't explicitly make itself
  if (extensionModule.deactivate) context.registrations.add(extensionModule.deactivate);
  context.registrations.add(async () =>
    executionTokenService.unregisterExtension(tokenName, tokenHash),
  );
  context.registrations.add(async () => activeExtensions.delete(context.name));

  // Store information about our newly activated extension
  const activeExtension: ActiveExtension = {
    info: extension,
    registrations: context.registrations,
  };
  activeExtensions.set(extension.name, activeExtension);
  return activeExtension;
};

/**
 * Load extensions and runs their activate functions.
 * @param extensions extension info for the extensions we want to activate
 * @returns unsubscriber that deactivates the extension
 */
const activateExtensions = async (extensions: ExtensionInfo[]): Promise<ActiveExtension[]> => {
  /** The path to each extension along with whether that extension has already been imported */
  const extensionsWithFiles = extensions.map((extension) => ({
    extension,
    // When packaged, we need to prefix absolute paths with file:// for some reason
    filePath: `${globalThis.isPackaged ? 'file://' : ''}${getPathFromUri(
      joinUriPaths(extension.dirUri, extension.main),
    )}`,
    hasBeenImported: false,
  }));

  // Shim out require so extensions can't use it
  const requireOriginal = Module.prototype.require;
  Module.prototype.require = ((moduleName: string) => {
    // Allow the extension to import papi and some other things
    if (moduleName === 'papi-backend') return papi;
    if (moduleName === '@sillsdev/scripture') return SillsdevScripture;

    // Figure out if we are doing the import for the extension file in activateExtension
    const extensionFile = extensionsWithFiles.find(
      (extensionFileToCheck) =>
        !extensionFileToCheck.hasBeenImported && extensionFileToCheck.filePath === moduleName,
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

  // Replace fetch with papi.fetch.
  // eslint-disable-next-line no-global-assign
  globalThis.fetch = papi.fetch;

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
  const extensionsActive = (
    await Promise.all(
      extensionsWithFiles.map((extensionWithFile) =>
        activateExtension(extensionWithFile.extension, extensionWithFile.filePath).catch((e) => {
          logger.error(
            `Extension '${extensionWithFile.extension.name}' threw while activating! ${e}`,
          );
          return null;
        }),
      ),
    )
  ).filter((activeExtension) => activeExtension !== null) as ActiveExtension[];

  return extensionsActive;
};

/**
 * Sets up the ExtensionService. Runs only once
 *
 * WARNING: import everything needed before this initialize as `require` becomes limited after.
 */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // Unzip any extension ZIPs
    await unzipCompressedExtensionFiles();

    // Get a list of extensions
    availableExtensions = await getExtensions();

    // Store their base URIs in the extension storage service
    const uriMap: Map<string, string> = new Map();
    availableExtensions.forEach((extensionInfo) => {
      uriMap.set(extensionInfo.name, extensionInfo.dirUri);
      logger.info(`Extension ${extensionInfo.name} loaded from ${extensionInfo.dirUri}`);
    });
    setExtensionUris(uriMap);

    // And finally activate them
    await activateExtensions(availableExtensions);

    isInitialized = true;
  })();

  return initializePromise;
};

/** Get a list of names of all active extensions */
export const getActiveExtensions = () => {
  return [...activeExtensions.keys()];
};
