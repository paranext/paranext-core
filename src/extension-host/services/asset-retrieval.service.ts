import { readFileBinary } from '@node/services/node-file-system.service';
import { buildExtensionUriFromName } from '@extension-host/services/extension-storage.service';
import { startsWith } from 'platform-bible-utils';
import { Uri } from '@shared/data/file-system.model';
import { getAssetPathInfoFromExtensionUri } from '@shared/utils/extension-asset.utils';

export type GetAsset = typeof getAsset;

export async function getAsset(extensionName: string, assetName: string): Promise<Buffer> {
  if (!startsWith(assetName, 'assets/') && !startsWith(assetName, 'assets\\')) {
    throw Error('Requests are limited to files in the "assets" directory');
  }
  const uriToAsset = buildExtensionUriFromName(extensionName, assetName);
  return readFileBinary(uriToAsset);
}

/**
 * Resolves the extension asset Uri to a {@link Uri}. Extension Uris are a special case for extension
 * assets that are not in the normal set of Uris, so this function converts from an extension asset
 * uri to a normal Uri. It will return the Uri to the extension asset. It is relatively safe to call
 * with Uris provided by extensions as it will not allow them to escape their area other than if
 * they somehow use symlinks.
 *
 * @param uri The uri to resolve
 * @returns Real path to the uri supplied or the original uri if it is not an extension uri
 * @throws Error if the uri is not a valid extension asset uri
 */
export function getUriFromExtensionUri(uri: string): Uri {
  const { extensionName, assetName } = getAssetPathInfoFromExtensionUri(uri);

  return buildExtensionUriFromName(extensionName, assetName);
}

export default getAsset;
