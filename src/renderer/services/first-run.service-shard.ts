/**
 * First-run service shard — this window's part of the developer reset (`platform.resetFirstRun`).
 * Registered as a network object under a window-scoped name (e.g. "FirstRunService-1"); the main
 * process's `first-run.service-router.ts` publishes the command and calls into one window's shard
 * to clear the first-run progress that lives in the renderer's `localStorage`.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { resetTourDone } from '@renderer/components/onboarding-tour/onboarding-tour.store';
import { clearCachedInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { clearFirstRunLocalState } from '@renderer/services/first-run-store';
import {
  FIRST_RUN_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  IFirstRunServiceShard,
} from '@shared/models/first-run.service-shard.model';
import {
  FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE,
  getServiceShardAttributes,
} from '@shared/models/service-shard.model';
import { networkObjectService } from '@shared/services/network-object.service';

const firstRunServiceShard: IFirstRunServiceShard = {
  clearLocalState: async () => {
    clearFirstRunLocalState();
    resetTourDone();
    // A stale cached 'power' would show the app for a moment before the settings read routes the
    // reset profile into the wizard.
    clearCachedInterfaceMode();
  },
};

/** Register the network object that backs this window's part of `platform.resetFirstRun`. */
export async function startFirstRunServiceShard(): Promise<void> {
  if (!globalThis.windowId) throw new Error('Cannot start FirstRunService: windowId is not set');

  await networkObjectService.set<IFirstRunServiceShard>(
    `${FIRST_RUN_SERVICE_SHARD_NETWORK_OBJECT_NAME}-${globalThis.windowId}`,
    firstRunServiceShard,
    // How the main process's router finds this shard. The window-scoped name is an internal detail
    // of the registration; the object type and window id are the contract.
    FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE,
    getServiceShardAttributes(globalThis.windowId),
    // Experimental at the object level, which fans out over every method: this is a window-scoped
    // name that only the main process's router is meant to call.
    { 'x-experimental': true },
  );
}
