import { includes, indexOf, startsWith, stringLength, substring } from 'platform-bible-utils';
import { Uri } from '@shared/data/file-system.model';

/** Name of scheme for Uris that want to access extension assets */
export const EXTENSION_ASSET_PROTOCOL_NAME = 'papi-extension';

/**
 * Extension asset path broken down into the extension name and the path to the asset in that
 * extension folder
 */
export type AssetPathInfo = {
  /** Name of extension to get asset from */
  extensionName: string;
  /** Path to the asset in the extension folder */
  assetName: string;
};

/**
 * Splits an extension asset uri into the extension name and asset name
 *
 * @param uri The uri to split
 * @returns The extension name and asset name
 * @throws Error if the uri is not a valid extension asset uri
 */
export function getAssetPathInfoFromExtensionUri(uri: Uri): AssetPathInfo {
  // Make sure the uri is an extension uri
  if (!startsWith(uri, EXTENSION_ASSET_PROTOCOL_NAME))
    throw new Error(
      `Invalid extension asset URI - needs to start with "${EXTENSION_ASSET_PROTOCOL_NAME}://"`,
    );

  // Remove "papi-extension://" from the front of the URL
  const uriNoScheme: string = substring(uri, stringLength(`${EXTENSION_ASSET_PROTOCOL_NAME}://`));

  // There have to be at least 2 parts to the URI divided by a slash
  if (!includes(uriNoScheme, '/'))
    throw new Error(
      "Invalid extension asset URI - needs to have a slash to be in an extension's assets folder",
    );

  const slash = indexOf(uriNoScheme, '/');
  let extensionName = substring(uriNoScheme, 0, slash);
  let assetName = substring(uriNoScheme, slash + 1);
  if (!extensionName || !assetName)
    throw new Error(
      'Invalid extension asset URI - needs to have contents on both sides of the slash',
    );

  // It's possible the extension and/or asset were encoded because they have characters not
  // allowed in URLs. So let's decode both of them before passing them to the extension host.
  extensionName = decodeURIComponent(extensionName);
  assetName = decodeURIComponent(assetName);
  if (stringLength(extensionName) > 100 || stringLength(assetName) > 100)
    throw new Error(
      'Invalid extension asset URI - extension and asset strings must be less than 100 characters each',
    );

  if (!startsWith(assetName, 'assets/') && !startsWith(assetName, 'assets\\'))
    throw Error(
      'Invalid extension asset URI - Requests are limited to files in the "assets" directory',
    );

  return { extensionName, assetName };
}
