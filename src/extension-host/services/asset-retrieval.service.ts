import { readFileBinary } from '@node/services/node-file-system.service';
import { buildExtensionPathFromName } from '@extension-host/services/extension-storage.service';

export default async function getAsset(extensionName: string, assetName: string): Promise<Buffer> {
  const prefix = assetName.substring(0, 7).replace('\\', '/');
  if (prefix !== 'assets/') throw Error('Requests are limited to files in the "assets" directory');
  const pathToAsset = buildExtensionPathFromName(extensionName, assetName);
  return readFileBinary(pathToAsset);
}
