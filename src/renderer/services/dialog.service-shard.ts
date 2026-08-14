/**
 * Dialog service shard — the dialog service implementation for THIS window. Registered as a network
 * object under a window-scoped name (e.g. "DialogService-1") so several windows can coexist; the
 * main process's `dialog.service-router.ts` publishes the generic `dialog:*` request names and
 * forwards each request to the window that should show the dialog.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { ABOUT_DIALOG } from '@renderer/components/dialogs/about-dialog.component';
import { hookUpDialogService } from '@renderer/components/dialogs/dialog-base.data';
import { DIALOGS } from '@renderer/components/dialogs/index';
import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
import { showModalDialogOverlay } from '@renderer/services/overlays/overlay.service-host';
import {
  rejectAndRemoveOverlay,
  resolveAndRemoveOverlay,
} from '@renderer/services/overlays/overlay-store';
import { ReactElement } from 'react';
import { SELECT_PROJECT_DIALOG } from '@renderer/components/dialogs/select-project.dialog';
import * as webViewService from '@renderer/services/web-view.service-shard';
import {
  DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS,
  DialogData,
} from '@shared/models/dialog-options.model';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import {
  DIALOG_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  IDialogServiceShard,
} from '@shared/models/dialog.service-shard.model';
import {
  DIALOG_SERVICE_SHARD_OBJECT_TYPE,
  getServiceShardAttributes,
} from '@shared/models/service-shard.model';
import {
  isLocalizeKey,
  LocalizeKey,
  newGuid,
  newPlatformError,
  serialize,
} from 'platform-bible-utils';

/** A live dialog request. Includes the dialog's id and the functions to run on receiving results */
// TODO: preserve requests between refreshes - save the request id or something?
type DialogRequest<DialogTabType extends DialogTabTypes> = {
  id: string;
  resolve: (
    value:
      | (DialogTypes[DialogTabType]['responseType'] | undefined)
      | PromiseLike<DialogTypes[DialogTabType]['responseType'] | undefined>,
  ) => void;
  reject: (reason?: unknown) => void;
};

/** Map of all live dialog requests */
// Disabled no-explicit-any because assigning a DialogRequest with generic type to
// DialogRequest<unknown> gave error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dialogRequests = new Map<string, DialogRequest<any>>();

let initializationPromise: Promise<void>;
/** Sets up the dialog service. Runs only once */
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      await webViewService.initialize();
    })();
  }
  return initializationPromise;
}

/**
 * Determine whether there is an unresolved dialog request for a specified dialog id
 *
 * @param id The dialog id to check for an existing unresolved request
 * @returns True if there is an unresolved dialog request for the specified dialog; false otherwise
 * @internal function; not exposed on papi
 */
export function hasDialogRequest(id: string) {
  return dialogRequests.has(id);
}

/**
 * Resolve a dialog request. Synchronously resolves, then asynchronously closes the dialog
 *
 * @param id The id of the dialog whose request to reject
 * @param data The data to resolve the request with. Either the user's response to the dialog or
 *   `undefined` if the user canceled
 * @param shouldCloseDialog Whether we should close the dialog in this function. Should probably
 *   only be `false` if the dialog is already being closed another way such as in
 *   `platform-dock-layout.component.tsx`. Defaults to true
 * @internal function; not exposed on papi
 */
export function resolveDialogRequest<TReturn>(
  id: string,
  data: TReturn | undefined,
  shouldCloseDialog = true,
) {
  const dialogRequest = dialogRequests.get(id);
  if (dialogRequest) {
    dialogRequests.delete(id);
    dialogRequest.resolve(data);
  }

  // Clean up the dialog

  if (shouldCloseDialog) {
    // Close the dialog
    // We're not awaiting closing it. Doesn't really matter right now if we do or don't successfully close it
    (async () => {
      try {
        const didClose = await webViewService.closeTab(id);
        if (!didClose)
          logger.error(
            `DialogService error: dialog ${id} that was resolved with data ${serialize(
              data,
            )} was not found in the dock layout in order to close. Please investigate`,
          );
      } catch (e) {
        logger.error(
          `DialogService error: dialog ${id} that was resolved with data ${serialize(
            data,
          )} did not successfully close! Please investigate. Error: ${e}`,
        );
      }
    })();
  }

  // If we didn't find the request, throw
  if (!dialogRequest)
    throw new Error(
      `DialogService error: request ${id} not found to resolve. data: ${serialize(data)}`,
    );
}

/**
 * Reject a dialog request. Synchronously rejects, then asynchronously closes the dialog
 *
 * @param id The id of the dialog whose request to reject
 * @param message The error message for the rejected request
 * @internal function; not exposed on papi
 */
export function rejectDialogRequest(id: string, message: string) {
  const dialogRequest = dialogRequests.get(id);
  if (dialogRequest) {
    // We found the request. Reject it
    dialogRequests.delete(id);
    dialogRequest.reject(message);
  }

  // Clean up the dialog
  // Close the dialog
  // We're not awaiting closing it. Doesn't really matter right now if we do or don't successfully close it
  (async () => {
    try {
      const didClose = await webViewService.closeTab(id);
      if (!didClose)
        logger.error(
          `DialogService error: dialog ${id} that was rejected with error message ${message} was not found in the dock layout in order to close. Please investigate`,
        );
    } catch (e) {
      logger.error(
        `DialogService error: dialog ${id} that was rejected with error message ${message} did not successfully close! Please investigate. Error: ${e}`,
      );
    }
  })();

  // If we didn't find the request, throw
  if (!dialogRequest)
    throw new Error(`DialogService error: request ${id} not found to reject. Message: ${message}`);
}

async function localizeDialogOptions<T extends DialogTypes[keyof DialogTypes]['options']>(
  options?: T,
) {
  if (!options) return options;

  // Collect LocalizeKey values with their property names
  const keysToLocalize: { propName: string; key: LocalizeKey }[] = [];
  DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS.forEach((propName) => {
    // Access dynamically since okLabel/cancelLabel are on subtypes, not DialogOptions base
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const value = (options as Record<string, unknown>)[propName];
    if (value && typeof value === 'string' && isLocalizeKey(value)) {
      keysToLocalize.push({ propName, key: value });
    }
  });

  if (keysToLocalize.length === 0) return options;

  const localizedPropValues = await localizationService.getLocalizedStrings({
    localizeKeys: keysToLocalize.map((entry) => entry.key),
  });

  const localizedProps: Record<string, unknown> = {};
  keysToLocalize.forEach(({ propName, key }) => {
    const localized = localizedPropValues[key];
    if (localized) localizedProps[propName] = localized;
  });

  return { ...options, ...localizedProps };
}

// on the dialogService - see `dialog.service-model.ts` for JSDoc
async function showDialog<DialogTabType extends DialogTabTypes>(
  dialogType: DialogTabType,
  options?: DialogTypes[DialogTabType]['options'],
): Promise<DialogTypes[DialogTabType]['responseType'] | undefined> {
  await initialize();

  const localizedOptions = await localizeDialogOptions(options);

  // Routed to this window by the main process, the same as an open or a settings tab, so it needs
  // the same refusal: a dialog put in a window whose close is decided is destroyed with it moments
  // later, leaving the requestor awaiting an answer from a dialog the user never saw. A statement
  // about the window rather than about the dock, so it is asked before the routing below and holds
  // for both answers — and a modal has the least to fall back on of the two. Its promise lives in
  // the overlay and never in `dialogRequests`, so the unload rejection below does not reach it, and
  // the router lifts the request timeout for `showDialog`, so nothing else settles it either.
  webViewService.throwIfWindowIsClosing(`show dialog ${dialogType}`);

  // Route based on modal flag
  if (localizedOptions?.isModal) {
    // Look up the DialogDefinition for this dialog type
    const dialogDef = DIALOGS[dialogType];
    if (!dialogDef) {
      throw new Error(`No DialogDefinition found for dialog type: ${dialogType}`);
    }

    // Track the overlay ID so submitDialog/cancelDialog can dismiss the overlay.
    // The ID is assigned synchronously by showModalDialogOverlay before addOverlay.
    let modalOverlayId: string | undefined;

    const dialogProps = {
      ...localizedOptions,
      isDialog: true as const,
      role: dialogDef.dialogRole ?? 'dialog',
      initialSize: dialogDef.initialSize,
      submitDialog: (data: DialogTypes[DialogTabType]['responseType']) => {
        if (!modalOverlayId) {
          logger.error('submitDialog called before modal overlay ID was assigned');
          return;
        }
        resolveAndRemoveOverlay(modalOverlayId, 'modalDialog', data);
      },
      cancelDialog: () => {
        if (!modalOverlayId) {
          logger.error('cancelDialog called before modal overlay ID was assigned');
          return;
        }
        resolveAndRemoveOverlay(modalOverlayId, 'modalDialog', undefined);
      },
      rejectDialog: (errorMessage: string) => {
        logger.error(`Modal dialog rejected: ${errorMessage}`);
        if (!modalOverlayId) {
          logger.error('rejectDialog called before modal overlay ID was assigned');
          return;
        }
        rejectAndRemoveOverlay(modalOverlayId, newPlatformError(errorMessage));
      },
    };

    // showModalDialogOverlay returns a promise that resolves when the overlay is dismissed
    // (via submitDialog, cancelDialog, Escape, or click-outside). The onOverlayCreated callback
    // captures the overlay ID synchronously before the overlay is added to the store.
    return showModalDialogOverlay(
      // Dialog component type must be widened to generic props; specific dialog types can't unify without this cast
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      dialogDef.Component as unknown as (props: Record<string, unknown>) => ReactElement,
      // Dialog props must be widened to match the generic component signature above
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      dialogProps as unknown as Record<string, unknown>,
      (overlayId) => {
        modalOverlayId = overlayId;
      },
      'dialog-service',
    );
  }

  // Non-modal path: create rc-dock floating tab (existing behavior)

  // The dock's own hazard, which this path alone has: a layout load in flight replaces this dock
  // wholesale with what it read before this dialog existed. A dialog tab is not a web view, so it
  // is in none of the lists a load diffs — it goes with nothing reported anywhere, and the dialog
  // simply never appears. A modal is in no dock and so waits for none of this.
  await webViewService.waitForLayoutLoadToSettle();
  // The refusal again, because the wait above parks for as long as a load takes and this window's
  // close can be decided inside it: `isWindowToldToClose` latches whenever an emptiness report is
  // answered, which can be at any moment. The guard above spoke for the moment this request
  // arrived, not for this one. Still ahead of the request registration below, so the refusal
  // reaches the caller as a rejection rather than as a dialog that quietly never opens.
  webViewService.throwIfWindowIsClosing(`show dialog ${dialogType}`);

  let dialogId = newGuid();
  // Dumbest way to make sure the guid is unique
  while (dialogRequests.has(dialogId)) dialogId = newGuid();

  let dialogRequest: DialogRequest<DialogTabType>;

  const dialogPromise = new Promise<DialogTypes[DialogTabType]['responseType'] | undefined>(
    (resolve, reject) => {
      dialogRequest = {
        id: dialogId,
        resolve,
        reject,
      };
      dialogRequests.set(dialogId, dialogRequest);
    },
  );

  try {
    // Open dialog
    await webViewService.addTab<DialogData>(
      {
        id: dialogId,
        tabType: dialogType,
        data: { ...(localizedOptions ?? {}), isDialog: true },
      },
      {
        type: 'float',
        position: 'center',
      },
    );

    // TODO: preserve requests between refreshes - add keepalive messages to indicate to the
    // requestor if the dialog request is still alive
  } catch (e) {
    // Something went wrong while setting up the dialog. Delete the request and throw to let the
    // requestor know
    const message = `DialogService error: showDialog did not initialize successfully! ${e}`;
    logger.error(message);
    rejectDialogRequest(dialogId, message);
  }

  // Return the DialogRequest's promise so the request can be resolved or rejected appropriately
  return dialogPromise;
}

// on the dialogService - see `dialog.service-model.ts` for JSDoc
async function showAboutDialog(): Promise<void> {
  (async () => {
    try {
      return await showDialog(ABOUT_DIALOG.tabType);
    } catch (error) {
      logger.error(`Failed to show about dialog: ${error}`);
    }
  })();
}

// on the dialogService - see `dialog.service-model.ts` for JSDoc
async function selectProject(
  options?: DialogTypes[typeof SELECT_PROJECT_DIALOG.tabType]['options'],
): Promise<DialogTypes[typeof SELECT_PROJECT_DIALOG.tabType]['responseType'] | undefined> {
  return showDialog(SELECT_PROJECT_DIALOG.tabType, options);
}

/**
 * The dialog service implementation this window serves. Declared as the shard interface so a member
 * added to the dialog service cannot silently become a name this window does not answer for.
 */
const dialogServiceShard: IDialogServiceShard = {
  showDialog,
  selectProject,
  showAboutDialog,
};

/** Register the network object that backs the PAPI dialog service for this window */
export async function startDialogServiceShard(): Promise<void> {
  await initialize();
  if (!globalThis.windowId) throw new Error('Cannot start DialogService: windowId is not set');

  // Registered under this window's scoped name (e.g. `DialogService-1`) so every window can own its
  // own dialogs. The object type and window id are how the main process's dialog service router
  // finds this shard; the name it is registered under is nobody else's business.
  const dialogServiceNetworkObject = await networkObjectService.set<IDialogServiceShard>(
    `${DIALOG_SERVICE_SHARD_NETWORK_OBJECT_NAME}-${globalThis.windowId}`,
    dialogServiceShard,
    DIALOG_SERVICE_SHARD_OBJECT_TYPE,
    getServiceShardAttributes(globalThis.windowId),
    // Experimental at the object level, which fans out over every method: this is a window-scoped
    // name that only the main process's router is meant to call, and both the name and the split
    // between what a shard answers and what its router answers are still moving.
    { 'x-experimental': true },
  );

  // On closing, try to release the shard and fail the dialogs this window will never answer
  // TODO: should do this on the server when the connection closes or when the server exits as well
  window.addEventListener('beforeunload', async () => {
    // TODO: preserve requests between refreshes - stop rejecting all remaining requests
    dialogRequests.forEach((request) => request.reject(`DialogService is shutting down`));
    await dialogServiceNetworkObject.dispose();
  });
}

// Hook up the dialogs' resolve and reject functions immediately because this is only here
// to mitigate a dependency cycle
hookUpDialogService({ resolveDialogRequest, rejectDialogRequest });
