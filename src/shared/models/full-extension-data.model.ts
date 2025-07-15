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
  Omit<ExtensionManifest, 'name' | 'version'> & {
    id: string;
    currentVersion: string;
    displayName: LanguageStrings;
    shortSummary: LanguageStrings;
    description: LanguageStrings;
    icon: ExtensionIcon;
    locales: string[];
    moreInfoUrl: string;
    supportUrl: string;
    fileSize: number;
    hashcode: Record<string, string>;
  }
>;
