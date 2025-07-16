/**
 * Interface for the contents of an extension's localized display data.
 *
 * This data is pulled from an extension's `displayData.json` file. The path of that file is
 * specified in the extension's `manifest.json` file.
 */
export interface DisplayDataContribution {
  /** Path to the extension's icon file. */
  icon: string;

  /** URL to access more information about the extension, such as developer's website. */
  moreInfoUrl: string;

  /** URL to access a support page for this extension. */
  supportUrl: string;

  /** Localized strings, indexed by locale. */
  localizedDisplayInfo: Record<string, LocalizedDisplayInfo>;
}

/** Interface for localized display data of an extension. */
export interface LocalizedDisplayInfo {
  /** Name of the extension to be displayed in user's language. */
  displayName: string;

  /** Short summary of the extension to be displayed in user's language. */
  shortSummary: string;

  /** Path to localized description file. */
  description: string;
}
