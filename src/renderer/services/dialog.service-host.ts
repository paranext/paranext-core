import {
  DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS,
  DialogData,
} from '@shared/models/dialog-options.model';
import { CATEGORY_DIALOG } from '@shared/services/dialog.service-model';
import * as networkService from '@shared/services/network.service';
import {
  aggregateUnsubscriberAsyncs,
  isLocalizeKey,
  serialize,
  newGuid,
  LocalizeKey,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import * as webViewService from '@renderer/services/web-view.service-host';
import { serializeRequestType } from '@shared/utils/util';
import { logger } from '@shared/services/logger.service';
import { SELECT_PROJECT_DIALOG } from '@renderer/components/dialogs/select-project.dialog';
import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog-definition.model';
import * as DialogTypesValues from '@renderer/components/dialogs/dialog-definition.model';
import { hookUpDialogService } from '@renderer/components/dialogs/dialog-base.data';
import { localizationService } from '@shared/services/localization.service';

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

  // Get all the LocalizeKey values of props that can be localized
  // Filter doesn't realize we are getting rid of undefined and taking only LocalizeKeys
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const propValuesToLocalize = DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS.map(
    (localizableKey) => options[localizableKey],
  ).filter((optionPropValue) => optionPropValue && isLocalizeKey(optionPropValue)) as LocalizeKey[];

  // Get localized strings for the LocalizeKey prop values
  const localizedPropValues = await localizationService.getLocalizedStrings({
    localizeKeys: propValuesToLocalize,
  });

  // Reconnect the localized strings to the prop names via the LocalizeKeys
  const localizedProps: Partial<T> = {};
  Object.entries(localizedPropValues).forEach(([localizeKey, localizedString]) => {
    const optionPropName = DIALOG_OPTIONS_LOCALIZABLE_PROPERTY_KEYS.find(
      (localizableKey) => options[localizableKey] === localizeKey,
    );
    if (optionPropName) localizedProps[optionPropName] = localizedString;
  });

  return { ...options, ...localizedProps };
}

// on the dialogService - see `dialog.service-model.ts` for JSDoc
async function showDialog<DialogTabType extends DialogTabTypes>(
  dialogType: DialogTabType,
  options?: DialogTypes[DialogTabType]['options'],
): Promise<DialogTypes[DialogTabType]['responseType'] | undefined> {
  await initialize();

  const optionsLocalized = await localizeDialogOptions(options);

  // Set up a DialogRequest
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
        data: { ...optionsLocalized, isDialog: true },
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
): Promise<DialogTypes[typeof SELECT_PROJECT_DIALOG.tabType]['responseType'] | undefined> {
  return showDialog(SELECT_PROJECT_DIALOG.tabType, options);
}

/** Register the commands that back the PAPI dialog service */
export async function startDialogService(): Promise<void> {
  await initialize();
  const complexArrayDescription =
    'String representation of RegExp pattern(s) to match against projects’ projectInterfaces (using https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) to determine if they should be included. Each array entry is handled based on its type (at least one entry must match for this filter condition to pass). If the entry is a string, it will be matched against each projectInterface. If any match, the project will pass this filter condition. If the entry is an array of strings, each will be matched against each projectInterface. If every string matches against at least one projectInterface, the project will pass this filter condition. In other words, each entry in the first-level array is OR’ed together. Each entry in second-level arrays (arrays within the first-level array) are AND’ed together.';

  // register functions as requests
  const unsubPromises: Promise<UnsubscriberAsync>[] = [];
  unsubPromises.push(
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_DIALOG, 'showDialog'),
      showDialog,
      {
        method: {
          summary: 'Shows a dialog to the user and prompts the user to respond',
          params: [
            {
              name: 'dialogType',
              required: true,
              summary: 'The type of dialog to show the user',
              schema: {
                enum: Object.values(DialogTypesValues),
              },
            },
            {
              name: 'options',
              required: false,
              summary: 'Various options for configuring the dialog that shows',
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  iconUrl: { type: 'string' },
                  prompt: { type: 'string' },
                  includeProjectInterfaces: {
                    type: 'array',
                    items: {
                      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
                    },
                    description: complexArrayDescription,
                  },
                  excludeProjectInterfaces: {
                    type: 'array',
                    items: {
                      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
                    },
                    description: complexArrayDescription,
                  },
                  includePdpFactoryIds: { type: 'array', items: { type: 'string' } },
                  excludePdpFactoryIds: { type: 'array', items: { type: 'string' } },
                  includeProjectIds: { type: 'array', items: { type: 'string' } },
                  excludeProjectIds: { type: 'array', items: { type: 'string' } },
                  selectedProjectIds: { type: 'array', items: { type: 'string' } },
                  selectedBookIds: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          ],
          result: {
            name: 'return value',
            summary: 'Response from user',
            schema: {
              oneOf: [
                { type: 'string' },
                { type: 'array', items: { type: 'string' } },
                { type: 'null' },
              ],
            },
          },
        },
      },
    ),
  );
  unsubPromises.push(
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_DIALOG, 'selectProject'),
      selectProject,
      {
        method: {
          summary:
            'Shows a select project dialog to the user and prompts the user to select a project',
          params: [
            {
              name: 'options',
              summary: 'Various options for configuring the dialog that shows',
              required: false,
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  iconUrl: { type: 'string' },
                  prompt: { type: 'string' },
                  includeProjectInterfaces: {
                    type: 'array',
                    items: {
                      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
                    },
                    description: complexArrayDescription,
                  },
                  excludeProjectInterfaces: {
                    type: 'array',
                    items: {
                      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
                    },
                    description: complexArrayDescription,
                  },
                  includePdpFactoryIds: { type: 'array', items: { type: 'string' } },
                  excludePdpFactoryIds: { type: 'array', items: { type: 'string' } },
                  includeProjectIds: { type: 'array', items: { type: 'string' } },
                  excludeProjectIds: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          ],
          result: {
            name: 'return value',
            summary: "The user's selected project id or nothing if the user cancels",
            schema: {
              oneOf: [{ type: 'string' }, { type: 'null' }],
            },
          },
        },
      },
    ),
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
