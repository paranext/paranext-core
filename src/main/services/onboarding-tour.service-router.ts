/**
 * Service router for the onboarding tour command. Claims the `platform.showOnboardingTour` name
 * consumers call and forwards it to the onboarding tour service shard of the window the user is
 * working in — the tour is a DOM overlay measured against one window's dock layout and toolbar, so
 * it has to open where the user is looking.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import {
  IOnboardingTourServiceShard,
  ONBOARDING_TOUR_SERVICE_SHARD_NETWORK_OBJECT_NAME,
} from '@shared/models/onboarding-tour.service-shard.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';

/**
 * The onboarding tour service shard each window registers, found by network object type and window
 * attribute rather than by rebuilding the window-scoped name the window registered under.
 */
const onboardingTourShards = createServiceShardIndex<IOnboardingTourServiceShard>({
  objectType: ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) =>
    networkObjectService.get<IOnboardingTourServiceShard>(networkObjectId),
});

/** Get the onboarding tour shard for the window the user is working in, throwing if there is none */
const getTargetOnboardingTourShard = createTargetShardResolver(
  ONBOARDING_TOUR_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  onboardingTourShards,
);

/** The command name this router claims */
type OnboardingTourCommandName = 'platform.showOnboardingTour';

/**
 * OpenRPC documentation for the generic command name, which is the one consumers call.
 *
 * Keyed by the exact name rather than by `string`, so a mistyped lookup below is a compile error
 * rather than a registration that publishes no documentation at all.
 */
const ONBOARDING_TOUR_COMMAND_DOCS: Record<OnboardingTourCommandName, SingleMethodDocumentation> = {
  'platform.showOnboardingTour': {
    method: {
      summary: 'Show the Simple-mode orientation tour again from its first stop',
      params: [],
      result: { name: 'return value', schema: { type: 'null' } },
      'x-experimental': true,
    },
  },
};

/**
 * Register the onboarding tour command under the generic name so it is claimed before any renderer
 * starts. Must be called during main process startup, before createWindow().
 */
export async function startOnboardingTourServiceRouter(): Promise<void> {
  assertCommandRoutingMatchesDocs('onboarding tour service router', [
    {
      commandName: 'platform.showOnboardingTour',
      docs: ONBOARDING_TOUR_COMMAND_DOCS['platform.showOnboardingTour'],
      routing: 'focus',
    },
  ]);

  await networkService.registerRequestHandler(
    serializeRequestType(CATEGORY_COMMAND, 'platform.showOnboardingTour'),
    async () => (await getTargetOnboardingTourShard()).show(),
    ONBOARDING_TOUR_COMMAND_DOCS['platform.showOnboardingTour'],
  );
  logger.info('Onboarding tour service router registered');
}
