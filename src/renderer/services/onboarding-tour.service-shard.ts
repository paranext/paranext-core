/**
 * Onboarding tour service shard — the Simple-mode orientation tour for THIS window. Registered as a
 * network object under a window-scoped name (e.g. "OnboardingTourService-1") so several windows can
 * coexist; the main process's `onboarding-tour.service-router.ts` publishes the
 * `platform.showOnboardingTour` command and forwards it to the window the user is working in.
 *
 * Transient readiness — the dock layout still mounting, localized strings still loading — is
 * `OnboardingTour`'s to wait out, and it does. What this shard decides is the one case that is not
 * transient: while the first-run wizard gates the app there is no tour to run and no bound on how
 * long that lasts. The replay request is a count nothing consumes, so accepting it here would not
 * discard it — it would sit until the wizard finished and then open the tour unprompted. Refuse at
 * the boundary instead, so "cannot show now" never turns into "shows at some arbitrary later
 * time".
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { requestTourReplay } from '@renderer/components/onboarding-tour/onboarding-tour.store';
import { getFirstRunStatus } from '@renderer/services/first-run-store';
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
    if (getFirstRunStatus().kind !== 'app') return;
    requestTourReplay();
  },
};

/**
 * Register the network object that backs this window's onboarding tour command.
 *
 * Registered in every window, in both interface modes: the Help menu item is offered in Power too,
 * where the tour keeps the one stop Power shares with Simple. A window can also switch modes
 * without restarting, so a shard that only existed in one mode would turn that switch into a
 * routing error.
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
