import {
  NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE,
  WindowAggregatorServiceType,
  windowAggregatorServiceBase,
} from '@shared/services/window-aggregator.service-model';
import networkObjectService from '@shared/services/network-object.service';

const windowAggregatorService = windowAggregatorServiceBase;

/**
 * Register the network object that mirrors the locally-run project lookup service exposed on the
 * PAPI websocket.
 *
 * This service runs fully locally from `project-lookup.service.ts`. This is here to provide
 * lookup-related services to other processes on the PAPI websocket
 */
// To use this service, you should use `project-lookup.service.ts`.
// This is not representative of this file. Maybe there will be a default export later that is more
// representative of the file
// eslint-disable-next-line import/prefer-default-export
export async function startWindowAggregatorService(): Promise<void> {
  await networkObjectService.set<WindowAggregatorServiceType>(
    NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE,
    windowAggregatorService,
  );
}
