/**
 * Handles setting up activation of and running of extensions
 */

import { IExtension } from '@extension-host/extension-types/extension.interface';
import { EntryType, readDir, readFileText } from '@node/services/node-file-system.service';
import { getPathFromUri, joinUriPaths } from '@node/utils/util';
import { Uri } from '@shared/data/file-system.model';
import { UnsubscriberAsync } from '@shared/utils/papi-util';
import Module from 'module';
import papi, { MODULE_SIMILAR_APIS } from '@shared/services/papi.service';
import { setExtensionUris } from '@extension-host/services/extension-storage.service';
import logger from '@shared/services/logger.service';
import executionTokenService from '@node/services/execution-token.service';
import { ExecutionActivationContext } from '@extension-host/extension-types/extension-activation-context.model';

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
  main: string;
  activationEvents: string[];
};

/** Information about an extension and extra metadata about it that we generate */
type ExtensionInfo = Readonly<
  ExtensionManifest & {
    /** Uri to this extension's directory. Not provided in actual manifest, but added while parsing the manifest */
    dirUri: Uri;
  }
>;

/** Information about an active extension */
type ActiveExtension = {
  info: ExtensionInfo;
  deactivator: UnsubscriberAsync;
};

/** Parse string extension manifest into an object and perform any transformations needed */
function parseManifest(extensionManifestJson: string) {
  const extensionManifest = JSON.parse(extensionManifestJson) as ExtensionManifest;
  // Replace ts with js so people can list their source code ts name but run the transpiled js
  if (extensionManifest.main.endsWith('.ts'))
    extensionManifest.main = `${extensionManifest.main.slice(0, -3)}.js`;

  return extensionManifest;
}

/**
 * Get information for all the extensions present
 * TODO: figure out if we can share this code with vite.config.ts
 */
const getExtensions = async (): Promise<ExtensionInfo[]> => {
  const extensionFolders = (
    await readDir(`resources://extensions${globalThis.isPackaged ? '' : '/dist'}`)
  )[EntryType.Directory];

  return Promise.all(
    extensionFolders.map(async (extensionFolder) => {
      const extensionManifestJson = await readFileText(
        joinUriPaths(extensionFolder, 'manifest.json'),
      );
      return Object.freeze({
        ...parseManifest(extensionManifestJson),
        dirUri: extensionFolder,
      });
    }),
  );
};

/**
 * Loads an extension and runs its activate function.
 *
 * WARNING: This does not shim functionality out of extensions! Do not run this alone. Only run wrapped in activateExtensions()
 * @param extension extension info for the extension to activate
 * @param extensionFilePath path to extension main file to import
 * @returns unsubscriber that deactivates the extension
 */
const activateExtension = async (
  extension: ExtensionInfo,
  extensionFilePath: string,
): Promise<ActiveExtension> => {
  // Import the extension file. Tell webpack to ignore it because extension files are not in the bundle and should not be looked up in the bundle
  // DO NOT REMOVE THE webpackIgnore COMMENT. It is a webpack "Magic Comment" https://webpack.js.org/api/module-methods/#magic-comments
  const extensionModule = (await import(/* webpackIgnore: true */ extensionFilePath)) as IExtension;

  // IMPORTANT: Only give the token to the extension when it is activated. Don't store it or its
  // nonce anywhere else. It is okay to give the token's getHash() value to something for purposes
  // of unregistering the extension later.
  const executionToken = executionTokenService.registerExtension(extension.name);
  const tokenName: string = executionToken.name;
  const tokenHash: string = executionToken.getHash();

  // Build up the context for this particular extension
  const context: ExecutionActivationContext = { executionToken };
  Object.freeze(context);

  // Activate the extension
  const extensionUnsubscriber = await extensionModule.activate(context);

  const activeExtension: ActiveExtension = {
    info: extension,
    deactivator: async () => {
      let unsubResult = await extensionUnsubscriber();
      if (extensionModule.deactivate) {
        unsubResult = (await extensionModule.deactivate()) && unsubResult;
      }
      unsubResult = executionTokenService.unregisterExtension(tokenName, tokenHash) && unsubResult;
      activeExtensions.delete(activeExtension.info.name);
      return unsubResult;
    },
  };
  activeExtensions.set(activeExtension.info.name, activeExtension);
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
  Module.prototype.require = ((fileName: string) => {
    // Allow the extension to import papi
    if (fileName === 'papi') return papi;

    // Figure out if we are doing the import for the extension file in activateExtension
    const extensionFile = extensionsWithFiles.find(
      (extensionFileToCheck) =>
        !extensionFileToCheck.hasBeenImported && extensionFileToCheck.filePath === fileName,
    );

    if (extensionFile) {
      // The file that is being imported is the extension file, so this hopefully means
      // we are importing the extension file in activateExtension. Allow this and mark the extension as imported.
      // TODO: an extension can probably import another extension's file and mess this up. Maybe try to find a better way
      extensionFile.hasBeenImported = true;
      return requireOriginal(fileName);
    }

    // Disallow any imports within the extension
    // Tell the extension dev if there is an api similar to what they want to import
    const similarApi = MODULE_SIMILAR_APIS[fileName] || MODULE_SIMILAR_APIS[`node:${fileName}`];
    const message = `Requiring other than papi is not allowed in extensions! Rejected require('${fileName}').${
      similarApi ? ` Try using papi.${similarApi}` : ''
    }`;
    throw new Error(message);
  }) as typeof Module.prototype.require;

  // Shim out internet access options in environments where they are defined so extensions can't use them
  const fetchOriginal: typeof fetch | undefined = globalThis.fetch;
  // eslint-disable-next-line no-global-assign
  globalThis.fetch = function fetchForbidden() {
    throw new Error('Cannot use fetch! Try using papi.fetch');
  };

  const xmlHttpRequestOriginal: typeof XMLHttpRequest | undefined = globalThis.XMLHttpRequest;
  // @ts-expect-error we want to remove XMLHttpRequest
  // eslint-disable-next-line no-global-assign
  globalThis.XMLHttpRequest = function XMLHttpRequestForbidden() {
    throw new Error('Cannot use XMLHttpRequest! Try using papi.fetch');
  };

  const webSocketOriginal: typeof WebSocket | undefined = globalThis.WebSocket;
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
            `Extension ${extensionWithFile.extension.name} threw while activating! ${e}`,
          );
          return null;
        }),
      ),
    )
  ).filter((activeExtension) => activeExtension !== null) as ActiveExtension[];

  // Put shimmed out modules and globals back so we can use them again
  // TODO: replacing the original modules and globals almost confidently lets extensions wait and use them later. Serious security concern. Pls fix
  Module.prototype.require = requireOriginal;
  // eslint-disable-next-line no-global-assign
  globalThis.fetch = fetchOriginal;
  // eslint-disable-next-line no-global-assign
  globalThis.XMLHttpRequest = xmlHttpRequestOriginal;
  // eslint-disable-next-line no-global-assign
  globalThis.WebSocket = webSocketOriginal;

  return extensionsActive;
};

/** Sets up the ExtensionService. Runs only once */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // Get a list of extensions
    availableExtensions = await getExtensions();

    // Store their base URIs in the extension file service
    const uriMap: Map<string, string> = new Map();
    availableExtensions.forEach((extensionInfo) => {
      uriMap.set(extensionInfo.name, extensionInfo.dirUri);
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
