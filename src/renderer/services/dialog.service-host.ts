import { DialogData } from '@shared/models/dialog-options.model';
import { CATEGORY_DIALOG, DialogService } from '@shared/services/dialog.service-model';
import * as networkService from '@shared/services/network.service';
import { aggregateUnsubscriberAsyncs, serializeRequestType } from '@shared/utils/papi-util';
import * as webViewService from '@shared/services/web-view.service';
import { newGuid } from '@shared/utils/util';
import logger from '@shared/services/logger.service';
import SELECT_PROJECT_DIALOG from '@renderer/components/dialogs/select-project.dialog';
import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
import { hookUpDialogService } from '@renderer/components/dialogs/dialog-base.data';

/** A live dialog request. Includes the dialog's id and the functions to run on receiving results */
// TODO: preserve requests between refreshes - save the request id or something?
type DialogRequest<DialogTabType extends DialogTabTypes> = {
  id: string;
  resolve: (
    value:
      | (DialogTypes[DialogTabType]['responseType'] | null)
      | PromiseLike<DialogTypes[DialogTabType]['responseType'] | null>,
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
 * @param id the dialog id to check for an existing unresolved request
 * @returns true if there is an unresolved dialog request for the specified dialog; false otherwise
 *
 * Internal function; not exposed on papi
 */
export function hasDialogRequest(id: string) {
  return dialogRequests.has(id);
}

/**
 * Resolve a dialog request. Synchronously resolves, then asynchronously closes the dialog
 *
 * @param id the id of the dialog whose request to reject
 * @param data the data to resolve the request with. Either the user's response to the dialog or
 * `null` if the user canceled
 * @param shouldCloseDialog whether we should close the dialog in this function. Should probably
 * only be `false` if the dialog is already being closed another way such as in
 * `platform-dock-layout.component.tsx`. Defaults to true
 *
 * Internal function; not exposed on papi
 */
export function resolveDialogRequest<TReturn>(
  id: string,
  data: TReturn | null,
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
        const didClose = await webViewService.removeTab(id);
        if (!didClose)
          logger.error(
            `DialogService error: dialog ${id} that was resolved with data ${JSON.stringify(
              data,
            )} was not found in the dock layout in order to close. Please investigate`,
          );
      } catch (e) {
        logger.error(
          `DialogService error: dialog ${id} that was resolved with data ${JSON.stringify(
            data,
          )} did not successfully close! Please investigate. Error: ${e}`,
        );
      }
    })();
  }

  // If we didn't find the request, throw
  if (!dialogRequest)
    throw new Error(
      `DialogService error: request ${id} not found to resolve. data: ${JSON.stringify(data)}`,
    );
}

/**
 * Reject a dialog request. Synchronously rejects, then asynchronously closes the dialog
 *
 * @param id the id of the dialog whose request to reject
 * @param message the error message for the rejected request
 *
 * Internal function; not exposed on papi
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
      const didClose = await webViewService.removeTab(id);
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

// on the dialogService - see `dialog.service-model.ts` for JSDoc
async function showDialog<DialogTabType extends DialogTabTypes>(
  dialogType: DialogTabType,
  options?: DialogTypes[DialogTabType]['options'],
): Promise<DialogTypes[DialogTabType]['responseType'] | null> {
  await initialize();

  // Set up a DialogRequest
  let dialogId = newGuid();
  // Dumbest way to make sure the guid is unique
  while (dialogRequests.has(dialogId)) dialogId = newGuid();

  let dialogRequest: DialogRequest<DialogTabType>;

  const dialogPromise = new Promise<DialogTypes[DialogTabType]['responseType'] | null>(
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
    await webViewService.addTab(
      {
        id: dialogId,
        tabType: dialogType,
        data: { ...options, isDialog: true } as DialogData,
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
async function selectProject(
  options?: DialogTypes[typeof SELECT_PROJECT_DIALOG.tabType]['options'],
): Promise<DialogTypes[typeof SELECT_PROJECT_DIALOG.tabType]['responseType'] | null> {
  return showDialog(SELECT_PROJECT_DIALOG.tabType, options);
}

const dialogService: DialogService = {
  showDialog,
  selectProject,
};

/**
 * Register the commands that back the PAPI dialog service
 */
export async function startDialogService(): Promise<void> {
  await initialize();

  // register functions as requests
  const unsubPromises = Object.entries(dialogService).map(([fnName, handler]) =>
    networkService.registerRequestHandler(serializeRequestType(CATEGORY_DIALOG, fnName), handler),
  );

  // Wait to successfully register all requests
  const unsubscribeRequests = aggregateUnsubscriberAsyncs(await Promise.all(unsubPromises));

  // On closing, try to remove request listeners
  // TODO: should do this on the server when the connection closes or when the server exits as well
  window.addEventListener('beforeunload', async () => {
    // TODO: preserve requests between refreshes - stop rejecting all remaining requests
    dialogRequests.forEach((request) => request.reject(`DialogService is shutting down`));
    await unsubscribeRequests();
  });
}

// Hook up the dialogs' resolve and reject functions immediately because this is only here
// to mitigate a dependency cycle
hookUpDialogService({ resolveDialogRequest, rejectDialogRequest });
