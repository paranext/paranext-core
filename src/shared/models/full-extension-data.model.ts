import { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';
import { LanguageStrings } from 'platform-bible-utils';

/** Interface that stores extension icon information */
export interface ExtensionIcon {
  /** Path to the icon's file. Could be a URL */
  filepath: string;
  /** Icon file extension (png, svg, ...) */
  filetype: string;
  /** Raw binary data of the icon, intended to be encoded in a base64 string */
  data: string;
  /** True if this icon was submitted as a URL, else false. */
  isUrl: boolean;
}

/**
 * Full set of descriptive metadata for an extension including the extension manifest and
 * visualization data that is useful for the extension marketplace
 */
export type FullExtensionData = Readonly<
  ExtensionManifest & {
    /** Localized display name data used to visualize the extension name */
    displayName: LanguageStrings;
    /** Localized short summary for the extension which is used as a sort of subtitle for extensions */
    shortSummary: LanguageStrings;
    /** Localized descriptions for the extension to describe the functionality of the extension */
    description: LanguageStrings;
    /** Extension icon object used to visualize the extension icon */
    icon: ExtensionIcon;
    /** Locales that the extension supports which have been formatted to be in the BCP 47 format */
    locales: string[];
    /** Supplied URL to find more information about the extension */
    moreInfoUrl: string;
    /** Supplied URL to get support concerning the extension */
    supportUrl: string;
    /** File size of the extension ZIP file for extension file validation */
    fileSize: number;
    /** Generated hash codes for the extension ZIP file for extension file validation validation */
    hashcode: Record<string, string>;
  }
>;
