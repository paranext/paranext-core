import * as networkService from '@shared/services/network.service';

export default abstract class ExtensionAssetServiceCommon {
  isInitialized = false;

  // eslint-disable-next-line class-methods-use-this
  async getExtensionAsset(extensionName: string, assetName: string): Promise<string | undefined> {
    return networkService.request('getExtensionAsset', extensionName, assetName);
  }

  async initialize(): Promise<void> {
    this.isInitialized = true;
  }
}
