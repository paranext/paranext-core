import { readFileBinary } from '@node/services/node-file-system.service';
import { buildExtensionPathFromName } from '@extension-host/services/extension-storage.service';

export type GetAsset = typeof getAsset;

export default async function getAsset(extensionName: string, assetName: string): Promise<Buffer> {
  if (!assetName.startsWith('assets/') && !assetName.startsWith('assets\\')) {
    throw Error('Requests are limited to files in the "assets" directory');
  }
  const pathToAsset = buildExtensionPathFromName(extensionName, assetName);
  return readFileBinary(pathToAsset);
}
