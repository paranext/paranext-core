import {
  NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE,
  WindowAggregatorServiceType,
  windowAggregatorServiceBase,
} from '@shared/services/window-aggregator.service-model';
import networkObjectService from '@shared/services/network-object.service';
import { logger } from '@shared/services/logger.service';

const windowAggregatorService = windowAggregatorServiceBase;

/**
 * Register the window aggregator service that coordinates communication between multiple browser
 * windows on the PAPI websocket.
 */
// eslint-disable-next-line import/prefer-default-export
export async function startWindowAggregatorService(): Promise<void> {
  await networkObjectService.set<WindowAggregatorServiceType>(
    NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE,
    windowAggregatorService,
  );
  logger.info('Window aggregator service registered');
}
