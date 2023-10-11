import { DialogData, DialogOptions } from '@shared/models/dialog-options.model';
import { CATEGORY_DIALOG, DialogService } from '@shared/services/dialog.service.model';
import * as networkService from '@shared/services/network.service';
import { aggregateUnsubscriberAsyncs, serializeRequestType } from '@shared/utils/papi-util';
import * as webViewService from '@shared/services/web-view.service';
import { newGuid } from '@shared/utils/util';
import logger from '@shared/services/logger.service';

/** Tab type for the Select Project dialog */
export const TAB_TYPE_SELECT_PROJECT_DIALOG = 'select-project-dialog';

/** A live dialog request. Includes its id and the functions to run on receiving results */
// TODO: preserve requests between refreshes - save the request id or something?
type DialogRequest<TReturn = unknown> = {
  id: string;
  resolve: (value: TReturn | PromiseLike<TReturn>) => void;
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
 * List of dialogs that were resolved or rejected from outside the dock layout and have not yet been
 * closed and rejected from inside the dock layout. The second reject should do nothing as it is an
 * expected extra call.
 */
const dialogIdsExpectingSecondClose = new Set<string>();

/**
 * Resolve a dialog request
 *
 * Internal function; not exposed on papi
 */
export function resolveDialogRequest<TReturn>(id: string, data: TReturn) {
  const dialogRequest = dialogRequests.get(id);
  if (dialogRequest) {
    dialogRequests.delete(id);
    dialogRequest.resolve(data);
  }

  // Clean up the dialog
  // Mark that we will receive a reject when the dialog closes
  dialogIdsExpectingSecondClose.add(id);

  // Close the dialog
  // We're not awaiting closing it. Doesn't really matter right now if we do or don't successfully close it
  webViewService.removeTab(id);

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
 * @param isFromDockLayout whether this function is being called from the dock layout. If someone
 * calls this function from outside the dock layout, the dock layout will then call this again. If
 * this is called from the dock layout initially, it will not be called again
 *
 * Internal function; not exposed on papi
 */
export function rejectDialogRequest(id: string, message: string, isFromDockLayout = false) {
  if (isFromDockLayout && dialogIdsExpectingSecondClose.has(id)) {
    // If this reject was called from the dock layout and is the second reject for this dialog,
    // throw it out
    dialogIdsExpectingSecondClose.delete(id);
    return;
  }

  const dialogRequest = dialogRequests.get(id);
  if (dialogRequest) {
    // We found the request. Reject it
    dialogRequests.delete(id);
    dialogRequest.reject(message);
  }

  // Clean up the dialog
  // Mark that we will receive another reject when the dialog closes
  if (!isFromDockLayout) dialogIdsExpectingSecondClose.add(id);

  // Close the dialog
  // We're not awaiting closing it. Doesn't really matter right now if we do or don't successfully close it
  webViewService.removeTab(id);

  // If we didn't find the request, throw
  if (!dialogRequest)
    throw new Error(`DialogService error: request ${id} not found to reject. Message: ${message}`);
}

/**
 * Shows a dialog to the user and prompts the user to respond
 *
 * @param options various options for configuring the dialog that shows
 *
 * @returns returns the user's response
 * @throws if the user cancels
 *
 * @type `TReturn` - the type of data the dialog responds with
 *
 * Currently internal. Should this be exposed on the papi? Maybe one day if we have
 * extension-provided dialogs
 */
async function getFromUser<TReturn>(dialogType: string, options?: DialogOptions): Promise<TReturn> {
  await initialize();

  // Set up a DialogRequest
  let dialogId = newGuid();
  // Dumbest way to make sure the guid is unique
  while (dialogRequests.has(dialogId)) dialogId = newGuid();

  let dialogRequest: DialogRequest<TReturn>;

  const dialogPromise = new Promise<TReturn>((resolve, reject) => {
    dialogRequest = {
      id: dialogId,
      resolve,
      reject,
    };
    dialogRequests.set(dialogId, dialogRequest);
  });

  try {
    // Open Select Project dialog
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

    // Return the DialogRequest's promise so the request can be resolved or rejected appropriately
    return dialogPromise;
  } catch (e) {
    // Something went wrong while setting up the dialog. Delete the request and throw to let the
    // requestor know
    const message = `DialogService error: getProject did not initialize successfully! ${e}`;
    logger.error(message);
    rejectDialogRequest(dialogId, message);
    throw new Error(message);
  }
}

async function getProject(options?: DialogOptions): Promise<string> {
  return getFromUser<string>(TAB_TYPE_SELECT_PROJECT_DIALOG, options);
}

const dialogService: DialogService = {
  getProject,
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
