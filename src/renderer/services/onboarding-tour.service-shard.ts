/**
 * Onboarding tour service shard — the Simple-mode orientation tour for THIS window. Registered as a
 * network object under a window-scoped name (e.g. "OnboardingTourService-1") so several windows can
 * coexist; the main process's `onboarding-tour.service-router.ts` publishes the
 * `platform.showOnboardingTour` command and forwards it to the window the user is working in.
 *
 * Whether the tour can actually open — Simple mode, the first-run wizard finished, the dock layout
 * mounted — is decided by `OnboardingTour` itself, which is where that state lives. This shard only
 * carries the request across the process boundary.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { requestTourReplay } from '@renderer/components/onboarding-tour/onboarding-tour.store';
import {
  IOnboardingTourServiceShard,
  ONBOARDING_TOUR_SERVICE_SHARD_NETWORK_OBJECT_NAME,
} from '@shared/models/onboarding-tour.service-shard.model';
import {
  getServiceShardAttributes,
  ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE,
} from '@shared/models/service-shard.model';
import { networkObjectService } from '@shared/services/network-object.service';

const onboardingTourServiceShard: IOnboardingTourServiceShard = {
  show: async () => {
    requestTourReplay();
  },
};

/**
 * Register the network object that backs this window's onboarding tour command.
 *
 * Registered in every window, Power mode included. The menu item is hidden in Power mode, so
 * nothing routes here from there — but a window can switch modes without restarting, and a shard
 * that only existed in Simple mode would turn that switch into a routing error on a menu item.
 */
export async function startOnboardingTourServiceShard(): Promise<void> {
  if (!globalThis.windowId)
    throw new Error('Cannot start OnboardingTourService: windowId is not set');

  await networkObjectService.set<IOnboardingTourServiceShard>(
    `${ONBOARDING_TOUR_SERVICE_SHARD_NETWORK_OBJECT_NAME}-${globalThis.windowId}`,
    onboardingTourServiceShard,
    // How the main process's router finds this shard. The window-scoped name is an internal detail
    // of the registration; the object type and window id are the contract.
    ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE,
    getServiceShardAttributes(globalThis.windowId),
    // Experimental at the object level, which fans out over every method: this is a window-scoped
    // name that only the main process's router is meant to call.
    { 'x-experimental': true },
  );
}
