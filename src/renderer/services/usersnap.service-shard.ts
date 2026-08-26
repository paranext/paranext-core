/**
 * Usersnap service shard — the Usersnap feedback widget for THIS window. Registered as a network
 * object under a window-scoped name (e.g. "UsersnapService-1") so several windows can coexist; the
 * main process's `usersnap.service-router.ts` publishes the `platform.usersnap*` commands and
 * forwards each to the window the user is working in.
 *
 * The widget's state (the loaded space API, whether a form is open, the DOM observer) is module
 * state in `usersnap.service.ts` and stays there — this is only the entry point that lets the main
 * process reach it.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import {
  closeOpenUsersnapForm,
  isUsersnapFormCurrentlyOpen,
  openUsersnapForm,
  USERSNAP_PROJECT_REPORT_ISSUE_API_KEY,
  USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY,
} from '@renderer/services/usersnap.service';
import {
  getServiceShardAttributes,
  USERSNAP_SERVICE_SHARD_OBJECT_TYPE,
} from '@shared/models/service-shard.model';
import {
  IUsersnapServiceShard,
  USERSNAP_SERVICE_SHARD_NETWORK_OBJECT_NAME,
} from '@shared/models/usersnap.service-shard.model';
import { networkObjectService } from '@shared/services/network-object.service';

const usersnapServiceShard: IUsersnapServiceShard = {
  submitIdea: () => openUsersnapForm(USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY),
  reportIssue: () => openUsersnapForm(USERSNAP_PROJECT_REPORT_ISSUE_API_KEY),
  isFormCurrentlyOpen: async () => isUsersnapFormCurrentlyOpen(),
  closeOpenForm: () => closeOpenUsersnapForm(),
};

/**
 * Register the network object that backs this window's Usersnap feedback commands.
 *
 * Registered unconditionally, whether or not `initializeUsersnapApi` succeeded. Loading the widget
 * reaches an external server and can time out, and each of these methods already degrades to a
 * warning the user can see. Registering only on success would instead leave the router with nothing
 * to route to, turning an unavailable feedback form into a routing error on a menu item.
 */
export async function startUsersnapServiceShard(): Promise<void> {
  if (globalThis.windowId === undefined)
    throw new Error('Cannot start UsersnapService: windowId is not set');

  await networkObjectService.set<IUsersnapServiceShard>(
    `${USERSNAP_SERVICE_SHARD_NETWORK_OBJECT_NAME}-${globalThis.windowId}`,
    usersnapServiceShard,
    // How the main process's Usersnap service router finds this shard. The window-scoped name is an
    // internal detail of the registration; the object type and window id are the contract.
    USERSNAP_SERVICE_SHARD_OBJECT_TYPE,
    getServiceShardAttributes(globalThis.windowId),
    // Experimental at the object level, which fans out over every method: this is a window-scoped
    // name that only the main process's router is meant to call.
    { 'x-experimental': true },
  );
}
