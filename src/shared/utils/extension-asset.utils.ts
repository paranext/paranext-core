import { stringLength } from 'platform-bible-utils';
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
  assetPath: string;
};

/**
 * Splits an extension asset uri into the extension name and asset path within the extension folder
 *
 * @param uri The uri to split
 * @returns The extension name and asset path relative to the extension's folder
 * @throws Error if the uri is not a valid extension asset uri
 */
export function getAssetPathInfoFromExtensionUri(uri: Uri): AssetPathInfo {
  // Make sure the uri is an extension uri. The `://` has to be part of what is checked, because it
  // is part of what is stripped below: checking only the scheme name would accept
  // `papi-extensionXXvictim/assets/secret.json` and then strip three characters too many, resolving
  // the request into a different extension's asset directory.
  if (!uri.startsWith(`${EXTENSION_ASSET_PROTOCOL_NAME}://`))
    throw new Error(
      `Invalid extension asset URI - needs to start with "${EXTENSION_ASSET_PROTOCOL_NAME}://"`,
    );

  // Remove "papi-extension://" from the front of the URL
  const uriNoScheme: string = uri.substring(`${EXTENSION_ASSET_PROTOCOL_NAME}://`.length);

  const slash = uriNoScheme.indexOf('/');
  // There have to be at least 2 parts to the URI divided by a slash
  if (slash < 0)
    throw new Error(
      "Invalid extension asset URI - needs to have a slash to be in an extension's assets folder",
    );

  let extensionName = uriNoScheme.substring(0, slash);
  let assetPath = uriNoScheme.substring(slash + 1);
  if (!extensionName || !assetPath)
    throw new Error(
      'Invalid extension asset URI - needs to have contents on both sides of the slash',
    );

  // It's possible the extension and/or asset were encoded because they have characters not
  // allowed in URLs. So let's decode both of them before passing them to the extension host.
  extensionName = decodeURIComponent(extensionName);
  assetPath = decodeURIComponent(assetPath);
  // Grapheme-aware on purpose, unlike the rest of this function: these two have just been through
  // decodeURIComponent and may hold non-ASCII, and the limit is expressed to the user in
  // "characters". Counting UTF-16 units instead would silently tighten the limit for non-Latin
  // scripts — an extension name of 60 characters could fail a 100-character rule.
  // A UTF-16 length is never less than a grapheme count, so a string short enough by code units is
  // already short enough by characters and needs no segmenting. These are attacker-supplied and
  // segmenting is the expensive step, so the guard is worth the extra comparison.
  if (
    (extensionName.length > 100 && stringLength(extensionName) > 100) ||
    (assetPath.length > 100 && stringLength(assetPath) > 100)
  )
    throw new Error(
      'Invalid extension asset URI - extension and asset strings must be less than 100 characters each',
    );

  if (!assetPath.startsWith('assets/') && !assetPath.startsWith('assets\\'))
    throw Error(
      'Invalid extension asset URI - Requests are limited to files in the "assets" directory',
    );

  return { extensionName, assetPath };
}
