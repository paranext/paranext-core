import { readFileBinary } from '@node/services/node-file-system.service';
import { buildExtensionPathFromName } from '@extension-host/services/extension-storage.service';
import { startsWith } from 'platform-bible-utils';

export type GetAsset = typeof getAsset;

export async function getAsset(extensionName: string, assetName: string): Promise<Buffer> {
  if (!startsWith(assetName, 'assets/') && !startsWith(assetName, 'assets\\')) {
    throw Error('Requests are limited to files in the "assets" directory');
  }
  const pathToAsset = buildExtensionPathFromName(extensionName, assetName);
  return readFileBinary(pathToAsset);
}

export default getAsset;
