/** Base64 encoded hash values */
export type HashValues = Partial<{
  sha256: string;
  sha512: string;
}>;

/** Represents an extension that can be enabled or disabled */
export type ExtensionIdentifier = {
  extensionName: string;
  extensionVersion: string;
};

/**
 * Represents all extensions that are installed. Note that packaged extensions cannot be disabled,
 * so they are implied to always be enabled.
 */
export type InstalledExtensions = {
  packaged: ExtensionIdentifier[];
  enabled: ExtensionIdentifier[];
  disabled: ExtensionIdentifier[];
};

/**
 * Download an extension from a given URL and enable it
 *
 * @param extensionUrlToDownload URL to the extension ZIP file to download
 * @param fileSize Expected size of the file
 * @param fileHashes Hash value(s) of the file to download
 * @returns Promise that resolves when the extension has been installed
 */
export type InstallExtensionFunction = (
  extensionUrlToDownload: string,
  fileSize: number,
  fileHashes: HashValues,
) => Promise<void>;

/**
 * Start running an extension that had been previously downloaded and disabled
 *
 * @param extensionIdentifier Details of the extension to enable
 * @returns Promise that resolves when the extension has been enabled, throws if enabling fails
 */
export type EnableExtensionFunction = (extensionIdentifier: ExtensionIdentifier) => Promise<void>;

/**
 * Stop running an extension that had been previously downloaded and enabled
 *
 * @param extensionIdentifier Details of the extension to disable
 * @returns Promise that resolves when the extension has been enabled, throws if enabling fails
 */
export type DisableExtensionFunction = (extensionIdentifier: ExtensionIdentifier) => Promise<void>;

/** Get extension identifiers of all extensions on the system */
export type GetInstalledExtensionsFunction = () => Promise<InstalledExtensions>;

/** Functions needed to manage extensions */
export type ManageExtensions = {
  /** Function to download an extension and enable it */
  installExtension: InstallExtensionFunction;
  /** Function to start running an extension that had been previously downloaded and disabled */
  enableExtension: EnableExtensionFunction;
  /** Function to stop running an extension that had been previously downloaded and enabled */
  disableExtension: DisableExtensionFunction;
  /** Function to retrieve details about all installed extensions */
  getInstalledExtensions: GetInstalledExtensionsFunction;
};
