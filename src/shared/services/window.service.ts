import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
} from '@shared/services/window.service-model';

let dataProvider: IWindowService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          // In multi-window mode, each renderer registers a scoped data provider (e.g.
          // "platform.windowServiceDataProvider-1"). Use the scoped name when windowId is available.
          // In the extension host (no windowId), the window service is not available.
          if (!globalThis.windowId) {
            reject(
              new Error(
                'Window service is not available outside a renderer window (no windowId set)',
              ),
            );
            return;
          }
          const scopedName = `${windowServiceProviderName}-${globalThis.windowId}`;
          const provider = await dataProviderService.get(
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            scopedName as typeof windowServiceProviderName,
          );
          if (!provider) throw new Error('Window service undefined');
          dataProvider = provider;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

// Dynamic proxy target so dataProviderName returns the scoped name at access time (not at module
// load time, when windowId may not yet be set)
const windowServiceProxyTarget = {
  ...windowServiceObjectToProxy,
  get dataProviderName(): typeof windowServiceProviderName {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (
      globalThis.windowId
        ? `${windowServiceProviderName}-${globalThis.windowId}`
        : windowServiceProviderName
    ) as typeof windowServiceProviderName;
  },
};

export const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  return dataProvider;
}, windowServiceProxyTarget);
