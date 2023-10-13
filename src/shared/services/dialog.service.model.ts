import { DialogTabTypes, DialogTypes } from '@renderer/components/dialogs/dialog.data';
import { DialogOptions } from '@shared/models/dialog-options.model';

/** JSDOC SOURCE dialogService
 * Prompt the user for responses with dialogs
 */
export interface DialogService {
  /**
   * Shows a dialog to the user and prompts the user to respond
   *
   * @param options various options for configuring the dialog that shows
   *
   * @returns returns the user's response
   * @throws if the user cancels
   *
   * @type `TReturn` - the type of data the dialog responds with
   */
  getFromUser<DialogTabType extends DialogTabTypes>(
    dialogType: DialogTabType,
    options?: DialogTypes[DialogTabType]['options'],
  ): Promise<DialogTypes[DialogTabType]['responseType']>;
  /**
   * Shows a select project dialog to the user and prompts the user to select a dialog
   *
   * @param options various options for configuring the dialog that shows
   *
   * @returns returns the user's selected project id
   * @throws if the user cancels
   */
  getProject(options?: DialogOptions): Promise<string>;
}

/** Prefix on requests that indicates that the request is related to dialog operations */
export const CATEGORY_DIALOG = 'dialog';
