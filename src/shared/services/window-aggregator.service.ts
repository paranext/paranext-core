import networkObjectService from '@shared/services/network-object.service';
import {
  NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE,
  windowAggregatorServiceBase,
  WindowAggregatorServiceType,
} from '@shared/services/window-aggregator.service-model';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import networkObjectStatusService from './network-object-status.service';

let networkObject: WindowAggregatorServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          await networkObjectStatusService.waitForNetworkObject(
            { id: NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE },
            // Wait 30 seconds for the web view service to appear
            30000,
          );

          const localWindowAggregatorService =
            await networkObjectService.get<WindowAggregatorServiceType>(
              NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE,
            );
          if (!localWindowAggregatorService)
            throw new Error(
              `${NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE} is not available as a network object`,
            );
          networkObject = localWindowAggregatorService;
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

const windowAggregatorService = createSyncProxyForAsyncObject<WindowAggregatorServiceType>(
  async () => {
    await initialize();
    return networkObject;
  },
  windowAggregatorServiceBase,
);

export default windowAggregatorService;
