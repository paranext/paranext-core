/**
 * Handles setting up activation of and running of extensions
 */

import { IExtension } from '@extension-host/extension-types/IExtension';
import {
  EntryType,
  readDir,
  readFileText,
} from '@node/services/NodeFileSystemService';
import { getPathFromUri, joinUris } from '@node/util/util';
import { Uri } from '@shared/data/FileSystemTypes';
import { UnsubscriberAsync } from '@shared/util/PapiUtil';
import Module from 'module';
import * as papi from '@shared/services/papi';

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Extensions that are available to us */
let availableExtensions: ExtensionManifest[];

/** Map of extension name to extension that is currently active and running */
const activeExtensions = new Map<string, ActiveExtension>();

/** Information about an extension */
type ExtensionManifest = Readonly<{
  /** Uri to this extension's directory. Not provided in actual manifest, but added while parsing the manifest */
  dirUri: Uri;
  name: string;
  main: string;
  activationEvents: string[];
}>;

/** Information about an active extension */
type ActiveExtension = {
  name: string;
  deactivator: UnsubscriberAsync;
};

/** Get information for all the extensions present */
const getExtensions = async () => {
  const extensionFolders = (await readDir('extensions'))[EntryType.Directory];

  return Promise.all(
    extensionFolders.map(async (extensionFolder) => {
      const extensionManifestJson = await readFileText(
        joinUris(extensionFolder, 'manifest.json'),
      );
      return Object.freeze({
        ...(JSON.parse(extensionManifestJson) as ExtensionManifest),
        dirUri: extensionFolder,
      });
    }),
  );
};

/**
 * Loads an extension and runs its activate function
 * @param extension extension manifest for the extension to activate
 * @returns unsubscriber that deactivates the extension
 */
const activateExtension = async (
  extension: ExtensionManifest,
): Promise<ActiveExtension> => {
  const extensionFile = getPathFromUri(
    joinUris(extension.dirUri, extension.main),
  );

  // Shim out require so extensions can't use it
  const requireOriginal = Module.prototype.require;
  let hasExtensionBeenRequired = false;
  Module.prototype.require = ((fileName: string) => {
    if (!hasExtensionBeenRequired && fileName === extensionFile) {
      hasExtensionBeenRequired = true;
      return requireOriginal(fileName);
    }
    if (fileName === 'papi') return papi.default;

    const message = `Requiring other than papi is not allowed in extensions! Rejected require(${fileName})`;
    return {
      message,
    };
  }) as typeof Module.prototype.require;

  // Import the extension file
  const extensionModule = (await import(extensionFile)) as IExtension;

  // Put require back so we can use it again
  // TODO: this probably lets extensions wait and require code later. Security concern. Pls fix
  Module.prototype.require = requireOriginal;

  const extensionUnsubscriber = await extensionModule.activate();
  const activeExtension: ActiveExtension = {
    name: extension.name,
    deactivator: async () => {
      let unsubResult = await extensionUnsubscriber();
      if (extensionModule.deactivate)
        unsubResult = (await extensionModule.deactivate()) && unsubResult;
      activeExtensions.delete(activeExtension.name);
      return unsubResult;
    },
  };
  activeExtensions.set(activeExtension.name, activeExtension);
  return activeExtension;
};

/** Sets up the ExtensionService. Runs only once */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    // Get a list of extensions
    availableExtensions = await getExtensions();

    availableExtensions.forEach((extension) => activateExtension(extension));

    isInitialized = true;
  })();

  return initializePromise;
};

/** Get a list of names of all active extensions */
export const getActiveExtensions = () => {
  return [...activeExtensions.keys()];
};
