import {
  DialogTabTypes,
  DialogTypes,
  SelectProjectDialogOptions,
} from '@renderer/components/dialogs/dialog-definition.model';

/**
 * JSDOC SOURCE dialogService
 *
 * Prompt the user for responses with dialogs
 */
export interface DialogService {
  /**
   * Shows a dialog to the user and prompts the user to respond
   *
   * @type `TReturn` - The type of data the dialog responds with
   * @param dialogType The type of dialog to show the user
   * @param options Various options for configuring the dialog that shows
   * @returns Returns the user's response or `undefined` if the user cancels
   */
  showDialog<DialogTabType extends DialogTabTypes>(
    dialogType: DialogTabType,
    options?: DialogTypes[DialogTabType]['options'],
  ): Promise<DialogTypes[DialogTabType]['responseType'] | undefined>;
  /**
   * Shows a select project dialog to the user and prompts the user to select a project
   *
   * @param options Various options for configuring the dialog that shows
   * @returns Returns the user's selected project id or `undefined` if the user cancels
   */
  selectProject(options?: SelectProjectDialogOptions): Promise<string | undefined>;
  /** Shows the about dialog */
  showAboutDialog(): Promise<void>;
}

/** Prefix on requests that indicates that the request is related to dialog operations */
export const CATEGORY_DIALOG = 'dialog';

/**
 * Exhaustiveness gate. A `DialogService` method missing here is a compile error naming it, which is
 * what forces this list to keep up: without an entry the method gets no scoped registration and no
 * routing proxy, and the startup assertion cannot see the gap because it only iterates the list. A
 * method that is deliberately NOT renderer-hosted belongs here with a comment saying so, rather
 * than being left out silently.
 */
const RENDERER_HOSTED_DIALOG_REQUEST_NAME_SET = {
  showDialog: true,
  selectProject: true,
  showAboutDialog: true,
} as const satisfies Record<keyof DialogService, true>;

/**
 * Dialog requests served by the renderer process. A dialog belongs to the window the user is
 * working in, so each renderer registers these under window-scoped names and the main process
 * registers service routers under the generic names that forward to the focused window.
 *
 * @experimental
 */
// `Object.keys` widens to `string[]`; the `satisfies` above pins every key to a `DialogService`
// method, so this only restores what the compiler already proved
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const RENDERER_HOSTED_DIALOG_REQUEST_NAMES = Object.keys(
  RENDERER_HOSTED_DIALOG_REQUEST_NAME_SET,
) as (keyof typeof RENDERER_HOSTED_DIALOG_REQUEST_NAME_SET)[];
