import * as nodeFS from '@node/services/node-file-system.service';
import { LanguageStrings, LocalizedStringDataContribution } from 'platform-bible-utils';
import { ExtensionIcon, FullExtensionData } from '@shared/models/full-extension-data.model';
import logger from '@shared/services/logger.service';
import path from 'path';
import { ExtensionManifest } from '@extension-host/extension-types/extension-manifest.model';
import { DisplayDataContribution } from '@extension-host/extension-types/display-data-contribution.model';
import JSZip from 'jszip';
import { ExtensionInfo } from '@extension-host/extension-types/extension-info.model';
import { joinUriPaths } from '@node/utils/util';
import { generateHashFromBuffer } from '@node/utils/crypto-util';
import { transformLocalizedStringDataToCanonicalLocales } from '@shared/utils/localized-strings-document-combiner';

/**
 * Name of the file describing the extension and its capabilities. Provided by the extension
 * developer
 */
export const EXTENSION_MANIFEST_FILE_NAME = 'manifest.json';

/**
 * Returns a URI we can use with `nodeFS` calls that is an expected filename given a base URI,
 * extension name, and extension version. This is not that useful for packaged extensions but is
 * important for all other extensions, both enabled and disabled.
 */
export function getExtensionUri(
  baseUri: string,
  extensionName: string,
  extensionVersion: string,
): string {
  return `${baseUri}/${extensionName}_${extensionVersion}.zip`;
}

async function parseExtensionData(
  displayData: DisplayDataContribution | undefined,
  localizedStrings: LocalizedStringDataContribution | undefined,
  icon: ExtensionIcon,
  description: LanguageStrings,
  manifest: ExtensionManifest,
  disabledExtensionsUri: string,
  installedExtensionsUri: string,
): Promise<FullExtensionData> {
  // Gets the file size and hash from the local zip file
  const disabledExtensionUri = getExtensionUri(
    disabledExtensionsUri,
    manifest.name,
    manifest.version,
  );
  const enabledExtensionUri = getExtensionUri(
    installedExtensionsUri,
    manifest.name,
    manifest.version,
  );
  // Find the file size of the installed extension zip file if found
  const disabledExtensionStats = await nodeFS.getStats(disabledExtensionUri);
  const enabledExtensionStats = await nodeFS.getStats(enabledExtensionUri);
  const fileSize = Number(disabledExtensionStats?.size ?? enabledExtensionStats?.size ?? -1);

  // Generate zip file hash if the zip file was found
  let extensionBuffer: Buffer | undefined;
  if (disabledExtensionStats !== undefined) {
    extensionBuffer = await nodeFS.readFileBinary(disabledExtensionUri);
  } else if (enabledExtensionStats !== undefined) {
    extensionBuffer = await nodeFS.readFileBinary(enabledExtensionUri);
  }
  const sha512Hashcode = extensionBuffer
    ? generateHashFromBuffer('sha512', 'base64', extensionBuffer)
    : '';

  // Creates an object whose keys are the language abbreviations (en, fr, es, ...)
  // and values are the display names in those languages
  let displayName: LanguageStrings = {};
  if (displayData !== undefined) {
    displayName = Object.fromEntries(
      Object.entries(displayData.localizedDisplayInfo).map(([locale, data]) => {
        return [locale, data.displayName];
      }),
    );
  }

  // Creates an object whose keys are the language abbreviations (en, fr, es, ...)
  // and values are the summaries in those languages
  let shortSummary: LanguageStrings = {};
  if (displayData !== undefined) {
    shortSummary = Object.fromEntries(
      Object.entries(displayData.localizedDisplayInfo).map(([locale, data]) => {
        return [locale, data.shortSummary];
      }),
    );
  }

  // Converts any two-digit locales to three-digit locales
  let locales: string[] = [];
  if (localizedStrings !== undefined) {
    // First transforms the localized strings struct to canonical locales
    const transformedLocalizedStrings =
      transformLocalizedStringDataToCanonicalLocales(localizedStrings);
    locales = Object.keys(transformedLocalizedStrings.localizedStrings ?? {});
  }

  // We can now create and return a struct containing the extracted data
  return {
    ...manifest,
    id: manifest.name,
    currentVersion: manifest.version,
    displayName,
    shortSummary,
    description,
    icon,
    locales,
    moreInfoUrl: displayData?.moreInfoUrl ?? '',
    supportUrl: displayData?.supportUrl ?? '',
    fileSize: fileSize ?? -1,
    hashcode: { sha512: sha512Hashcode },
  };
}

export async function readExtensionDataFromZip(
  extensionUri: string,
  disabledExtensionsUri: string,
  installedExtensionsUri: string,
): Promise<FullExtensionData | undefined> {
  let zip: JSZip;
  try {
    const extensionZipData: Buffer = await nodeFS.readFileBinary(extensionUri);
    zip = await JSZip.loadAsync(extensionZipData);
  } catch {
    return undefined;
  }

  const manifestFile = zip.file(EXTENSION_MANIFEST_FILE_NAME);
  // If the manifest file does not exist then returns undefined since can't really get any more info
  if (!manifestFile) {
    return undefined;
  }
  // Need to assert type to be ExtensionManifest for the manifest.json
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const manifest = JSON.parse(await manifestFile.async('string')) as ExtensionManifest;

  // Extract the localized strings of extension info, to determine supported languages.
  let localizedStrings: LocalizedStringDataContribution | undefined;
  if (manifest.localizedStrings) {
    const localizedStringsFile = zip.file(manifest.localizedStrings);
    if (localizedStringsFile) {
      try {
        // Type assertion to appropriate form of the localized strings
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        localizedStrings = JSON.parse(
          await localizedStringsFile.async('string'),
        ) as LocalizedStringDataContribution;
      } catch {
        logger.warn(
          `Could not read localized strings file '${manifest.localizedStrings}' for extension '${manifest.name}!'`,
        );
      }
    }
  }

  // Extract the localized display data, for description/display name/summary/etc.
  let displayData: DisplayDataContribution | undefined;
  if (manifest.displayData) {
    const displayDataFile = zip.file(manifest.displayData);
    if (displayDataFile) {
      try {
        // Type assertion to appropriate form of the localized display data
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        displayData = JSON.parse(await displayDataFile.async('string')) as DisplayDataContribution;
      } catch {
        logger.warn(
          `Could not read display data file '${manifest.displayData}' for extension '${manifest.name}!'`,
        );
      }
    }
  }

  // Creates an object whose keys are the language abbreviations (en, fr, es, ...)
  // and values are the contents of the files found in the locale's "description" field
  let description: LanguageStrings = {};
  if (displayData !== undefined) {
    const resolvedDescriptionEntries = await Promise.all(
      Object.entries(displayData.localizedDisplayInfo).map(async ([locale, data]) => {
        const descriptionFile = zip.file(data.description);
        if (descriptionFile) {
          // Now we can read that description to a string
          let descriptionString = '';
          try {
            descriptionString = await descriptionFile.async('string');
          } catch {
            logger.warn(
              `Could not read '${locale}' description file '${data.description}' for extension '${manifest.name}!'`,
            );
            return undefined;
          }
          // Now we can read that description to a string

          // And return the language key with its corresponding description
          return [locale, descriptionString];
          // Need to be able to return something so returns undefined filtered out in the later lines
          // eslint-disable-next-line no-else-return
        } else {
          return undefined;
        }
      }),
    );
    description = Object.fromEntries(resolvedDescriptionEntries.filter((value) => !!value));
  }

  // Retrieves the extension icon
  let icon: ExtensionIcon = { filepath: '', filetype: '', data: '', isUrl: false };
  if (displayData?.icon) {
    const isUrl = URL.canParse(displayData.icon);
    const iconFile = zip.file(displayData.icon);
    let iconData = '';
    if (!isUrl && iconFile) {
      try {
        iconData = await iconFile.async('base64');
      } catch {
        logger.warn(
          `Could not read icon file '${displayData.icon}' for extension '${manifest.name}!'`,
        );
      }
    }

    // Read the icon file into a buffer of bytes.
    icon = {
      filepath: displayData.icon,
      filetype: path.extname(displayData.icon).substring(1), // Remove the first `.` to just extract the file extension
      data: iconData,
      isUrl,
    };
  }

  return parseExtensionData(
    displayData,
    localizedStrings,
    icon,
    description,
    manifest,
    disabledExtensionsUri,
    installedExtensionsUri,
  );
}

export async function readExtensionDataFromFolder(
  extensionInfo: ExtensionInfo,
  disabledExtensionsUri: string,
  installedExtensionsUri: string,
): Promise<FullExtensionData> {
  const folderUri = extensionInfo.dirUri;
  // Extract the localized strings of extension info, to determine supported languages.
  let localizedStrings: LocalizedStringDataContribution | undefined;
  if (extensionInfo.localizedStrings) {
    try {
      // Type assertion to appropriate form of the localized strings
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      localizedStrings = JSON.parse(
        await nodeFS.readFileText(joinUriPaths(folderUri, extensionInfo.localizedStrings)),
      ) as LocalizedStringDataContribution;
    } catch {
      logger.warn(
        `Could not read localized strings file '${extensionInfo.localizedStrings}' for extension '${extensionInfo.name}!'`,
      );
    }
  }

  // Extract the localized display data, for description/display name/summary/etc.
  let displayData: DisplayDataContribution | undefined;
  if (extensionInfo.displayData) {
    try {
      // Type assertion to appropriate form of the localized display data
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      displayData = JSON.parse(
        await nodeFS.readFileText(joinUriPaths(folderUri, extensionInfo.displayData)),
      ) as DisplayDataContribution;
    } catch {
      logger.warn(
        `Could not read display data file '${extensionInfo.displayData}' for extension '${extensionInfo.name}!'`,
      );
    }
  }

  // Creates an object whose keys are the language abbreviations (en, fr, es, ...)
  // and values are the contents of the files found in the locale's "description" field
  let description: LanguageStrings = {};
  if (displayData !== undefined) {
    const resolvedDescriptionEntries = await Promise.all(
      Object.entries(displayData.localizedDisplayInfo).map(async ([locale, data]) => {
        // Construct the path to the description file
        const descriptionPath = joinUriPaths(folderUri, data.description);

        // Now we can read that description to a string
        let descriptionString = '';
        try {
          descriptionString = await nodeFS.readFileText(descriptionPath);
        } catch {
          logger.warn(
            `Could not read '${locale}' description file '${descriptionPath}' for extension '${extensionInfo.name}!'`,
          );
          return undefined;
        }

        // And return the language key with its corresponding description
        return [locale, descriptionString];
      }),
    );
    description = Object.fromEntries(resolvedDescriptionEntries.filter((value) => !!value));
  }

  // Retrieves the extension icon
  let icon: ExtensionIcon = { filepath: '', filetype: '', data: '', isUrl: false };
  if (displayData?.icon) {
    const isUrl = URL.canParse(displayData.icon);
    const fullIconFilepath = isUrl ? displayData.icon : joinUriPaths(folderUri, displayData.icon);
    let iconData = '';
    if (!isUrl) {
      try {
        iconData = await nodeFS.readFileText(fullIconFilepath, 'base64');
      } catch {
        logger.warn(
          `Could not read icon file '${fullIconFilepath}' for extension '${extensionInfo.name}!'`,
        );
      }
    }

    // Read the icon file into a buffer of bytes.
    icon = {
      filepath: displayData.icon,
      filetype: path.extname(fullIconFilepath).substring(1), // Remove the first `.` to just extract the file extension
      data: isUrl ? '' : iconData,
      isUrl,
    };
  }

  return parseExtensionData(
    displayData,
    localizedStrings,
    icon,
    description,
    extensionInfo,
    disabledExtensionsUri,
    installedExtensionsUri,
  );
}
