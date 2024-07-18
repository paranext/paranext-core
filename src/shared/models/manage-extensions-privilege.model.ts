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
  /**
   * Extensions that are explicitly bundled to be part of the application. They cannot be disabled.
   * At runtime no extensions can be added or removed from the set of packaged extensions.
   */
  packaged: ExtensionIdentifier[];
  /**
   * Extensions that are running but can be dynamically disabled. At runtime extensions can be added
   * or removed from the set of enabled extensions.
   */
  enabled: ExtensionIdentifier[];
  /**
   * Extensions that are not running but can be dynamically enabled. At runtime extensions can be
   * added or removed from the set of disabled extensions.
   *
   * The only difference between a disabled extension and an extension that isn't installed is that
   * disabled extensions do not need to be downloaded again to run them.
   */
  disabled: ExtensionIdentifier[];
};

/**
 * Download an extension from a given URL and enable it
 *
 * @param extensionUrlToDownload URL to the extension ZIP file to download
 * @param fileSize Expected size of the file
 * @param fileHashes Hash value(s) of the file to download. Note that only one hash value may be
 *   validated, but multiple hash values may be provided so the installer can choose any of them for
 *   validation. For example, if you provide a sha256 hash value and a sha512 hash value, the
 *   installer may only use the sha512 hash value for validation.
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
