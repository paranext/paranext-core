import { readFileBinary } from '@node/services/node-file-system.service';
import { buildExtensionPathFromName } from '@extension-host/services/extension-storage.service';
import path from 'path';

export default async function getAsset(extensionName: string, assetName: string): Promise<Buffer> {
  const pathToAsset = buildExtensionPathFromName(extensionName, path.join('assets', assetName));
  return readFileBinary(pathToAsset);
}
