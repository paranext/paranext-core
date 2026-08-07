/**
 * Service router for the dialog service. Claims the `dialog:*` request names consumers call and the
 * `platform.about` command, and forwards each to the dialog service shard of the window the user is
 * working in — so a dialog raised by a background task appears where the user is looking rather
 * than in whichever renderer happened to start first.
 *
 * Unlike the other routers, this one publishes request names rather than a network object: the
 * dialog service has always been reached by request name (`dialogService` in `dialog.service.ts`
 * calls them directly), and a network object under a generic name would be a second way to reach
 * the same thing.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import {
  DIALOG_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  IDialogServiceShard,
} from '@shared/models/dialog.service-shard.model';
import { NetworkMethodHandlerOptions } from '@shared/models/network.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { DIALOG_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { CATEGORY_DIALOG } from '@shared/services/dialog.service-model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { sharedStoreService } from '@shared/services/shared-store.service';
import { serializeRequestType } from '@shared/utils/util';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * The dialog service shard each window registers, found by network object type and window attribute
 * rather than by rebuilding the window-scoped name the window registered under.
 */
const dialogShards = createServiceShardIndex<IDialogServiceShard>({
  objectType: DIALOG_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) => networkObjectService.get<IDialogServiceShard>(networkObjectId),
});

/** Get the dialog service shard for the window the user is working in, throwing if there is none */
const getTargetDialogShard = createTargetShardResolver(
  DIALOG_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  dialogShards,
);

/**
 * A dialog waits for the user, so every route this module registers has to disable its timeout —
 * otherwise the request gives up while the dialog is still open.
 */
const DIALOG_HANDLER_OPTIONS: NetworkMethodHandlerOptions = { timeoutMilliseconds: 0 };

/** The shard methods that wait for the user, so a call to one must not time out */
const USER_ANSWERED_SHARD_METHODS = [
  'showDialog',
  'selectProject',
  'showAboutDialog',
] as const satisfies readonly (keyof IDialogServiceShard)[];

/**
 * Lift the request timeout on a window's dialog shard methods.
 *
 * Disabling the timeout on this router's own registrations covers only the inbound half. Calling
 * the shard is a request in its own right, and on the default timeout it gives up while the dialog
 * is still on screen — so the caller gets a timeout error for a dialog the user has not answered
 * yet, and answering it later resolves nothing.
 *
 * Set here rather than by the shard because the timeout lives in the shared store, whose entries
 * belong to the process that created them: a renderer that reloads comes back as a different
 * process and cannot rewrite its own keys, where main's process outlives every window. Re-setting
 * the same value is a no-op, so a window registering again costs nothing.
 */
function liftRequestTimeoutForWindowDialogs(windowId: number): void {
  USER_ANSWERED_SHARD_METHODS.forEach((methodName) => {
    const requestType = `object:${DIALOG_SERVICE_SHARD_NETWORK_OBJECT_NAME}-${windowId}.${methodName}`;
    try {
      sharedStoreService.set(`platform.customNetworkTimeoutMs.${requestType}`, 0);
    } catch (e) {
      // A dialog in this window would fail ~30s in rather than waiting for the user, which is worth
      // saying out loud — but it is not a reason to refuse to route to the window at all
      logger.warn(
        `Could not disable the request timeout for ${requestType}; dialogs in window ${windowId} may time out before the user answers them: ${getErrorMessage(e)}`,
      );
    }
  });
}

// A window's shard can register before or after this module starts, so both paths are covered: the
// event for windows that arrive later, and a reconcile below for any already indexed.
dialogShards.onDidAddShard(liftRequestTimeoutForWindowDialogs);

/**
 * OpenRPC documentation for the generic dialog request names, which are the ones consumers call.
 *
 * Summaries only. Full parameter documentation would have to describe `options` against the
 * dialog-type enum in `dialog-definition.model`, which is renderer-only and read at runtime rather
 * than as a type; relocating that model into `@shared` is what would let these names carry it.
 */
const DIALOG_REQUEST_DOCS: Record<string, SingleMethodDocumentation> = {
  showDialog: {
    method: {
      // Experimental: which window a dialog opens in is part of what the multi-window work is still
      // settling, and it is what this name now decides on the caller's behalf.
      'x-experimental': true,
      summary: 'Shows a dialog to the user in the window they are working in',
      params: [],
      result: { name: 'return value', summary: 'Response from user', schema: {} },
    },
  },
  selectProject: {
    method: {
      'x-experimental': true,
      summary:
        'Shows a select project dialog to the user in the window they are working in, and prompts them to select a project',
      params: [],
      result: {
        name: 'return value',
        summary: "The user's selected project id, or nothing if the user cancels",
        schema: {},
      },
    },
  },
  showAboutDialog: {
    method: {
      'x-experimental': true,
      summary:
        'Shows a dialog with essential information about the application in the window the user is working in',
      params: [],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
};

/** OpenRPC documentation for the `platform.about` command this router claims */
const ABOUT_COMMAND_DOCS: SingleMethodDocumentation = {
  method: {
    summary: 'Open a dialog that displays essential information about the application',
    params: [],
    result: { name: 'return value', schema: { type: 'null' } },
  },
};

/**
 * Register the dialog routes under the generic names so they are claimed before any renderer
 * starts. Must be called during main process startup, before createWindow().
 */
export async function startDialogServiceRouter(): Promise<void> {
  assertCommandRoutingMatchesDocs('dialog service router', [
    { commandName: 'platform.about', docs: ABOUT_COMMAND_DOCS, routing: 'focus' },
  ]);

  // onDidAddShard has no replay, so reconcile against what is already indexed — otherwise a window
  // that registered before this ran keeps the default timeout on its dialogs
  dialogShards.getShardWindowIds().forEach(liftRequestTimeoutForWindowDialogs);

  await Promise.all([
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_DIALOG, 'showDialog'),
      async (...args: Parameters<IDialogServiceShard['showDialog']>) =>
        (await getTargetDialogShard()).showDialog(...args),
      DIALOG_REQUEST_DOCS.showDialog,
      DIALOG_HANDLER_OPTIONS,
    ),
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_DIALOG, 'selectProject'),
      async (...args: Parameters<IDialogServiceShard['selectProject']>) =>
        (await getTargetDialogShard()).selectProject(...args),
      DIALOG_REQUEST_DOCS.selectProject,
      DIALOG_HANDLER_OPTIONS,
    ),
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_DIALOG, 'showAboutDialog'),
      async () => (await getTargetDialogShard()).showAboutDialog(),
      DIALOG_REQUEST_DOCS.showAboutDialog,
      DIALOG_HANDLER_OPTIONS,
    ),
    // The same implementation the `dialog:showAboutDialog` route reaches, not a second one. The
    // shard's `showAboutDialog` resolves as soon as the dialog is on screen rather than when the
    // user closes it, which is what lets a caller await this command.
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.about'),
      async () => (await getTargetDialogShard()).showAboutDialog(),
      ABOUT_COMMAND_DOCS,
      DIALOG_HANDLER_OPTIONS,
    ),
  ]);
  logger.info('Dialog service router registered');
}
