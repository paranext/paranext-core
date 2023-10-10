import { DialogOptions } from '@shared/models/dialog-options.model';
import { CATEGORY_DIALOG, DialogService } from '@shared/services/dialog.service.model';
import * as networkService from '@shared/services/network.service';
import { aggregateUnsubscriberAsyncs, serializeRequestType } from '@shared/utils/papi-util';
import * as webViewService from '@shared/services/web-view.service';
import { newGuid } from '@shared/utils/util';
import logger from '@shared/services/logger.service';
import { TAB_TYPE_OPEN_PROJECT_DIALOG } from '@renderer/components/project-dialogs/open-project-tab.component';

/** A live dialog request. Includes its id and the functions to run on receiving results */
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
 * Resolve a dialog request
 *
 * Internal function; not exposed on papi
 */
export function resolveDialogRequest<TReturn>(id: string, data: TReturn) {
  const dialogRequest = dialogRequests.get(id);
  if (!dialogRequest) throw new Error(`DialogService error: request ${id} not found to resolve`);

  dialogRequests.delete(id);

  dialogRequest.resolve(data);
}

/**
 * Reject a dialog request
 *
 * Internal function; not exposed on papi
 */
export function rejectDialogRequest(id: string, message: string) {
  const dialogRequest = dialogRequests.get(id);
  if (!dialogRequest) throw new Error(`DialogService error: request ${id} not found to reject`);

  dialogRequests.delete(id);

  dialogRequest.reject(message);
}

async function getProject(prompt: string, options?: DialogOptions): Promise<string | undefined> {
  await initialize();

  // Set up a DialogRequest
  let dialogId = newGuid();
  // Dumbest way to make sure the guid is unique
  while (dialogRequests.has(dialogId)) dialogId = newGuid();

  let dialogRequest: DialogRequest<string> | undefined;

  try {
    const dialogPromise = new Promise<string>((resolve, reject) => {
      dialogRequest = {
        id: dialogId,
        resolve,
        reject,
      };
      dialogRequests.set(dialogId, dialogRequest);
    });

    // Open Select Project dialog
    await webViewService.addTab(
      {
        id: dialogId,
        tabType: TAB_TYPE_OPEN_PROJECT_DIALOG,
        data: { prompt, ...options },
      },
      {
        type: 'float',
        position: 'center',
      },
    );

    // TODO: preserve requests between refreshes - add keepalive messages to indicate to the
    // requestor if the dialog request is still alive

    // Return the DialogRequest's promise
    return dialogPromise;
  } catch (e) {
    // Something went wrong while setting up the dialog. Delete the request and throw to let the
    // requestor know
    dialogRequests.delete(dialogId);
    const message = `DialogService error: getProject did not initialize successfully! ${e}`;
    logger.error(message);
    if (dialogRequest?.reject) dialogRequest.reject(message);
    throw new Error(message);
  }
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
