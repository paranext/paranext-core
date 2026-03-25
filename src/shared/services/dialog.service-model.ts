import {
  ALERT_DIALOG_TYPE,
  CONFIRM_DIALOG_TYPE,
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
   * Shows an alert dialog
   *
   * @param dialogType The alert dialog type
   * @param options Options for the alert dialog including prompt text
   * @returns Returns `true` when the user acknowledges, or `undefined` if cancelled
   */
  showDialog(
    dialogType: typeof ALERT_DIALOG_TYPE,
    options: DialogTypes[typeof ALERT_DIALOG_TYPE]['options'],
  ): Promise<DialogTypes[typeof ALERT_DIALOG_TYPE]['responseType'] | undefined>;
  /**
   * Shows a confirm dialog
   *
   * @param dialogType The confirm dialog type
   * @param options Options for the confirm dialog including prompt text
   * @returns Returns `true` if confirmed, `false` if declined or cancelled
   */
  showDialog(
    dialogType: typeof CONFIRM_DIALOG_TYPE,
    options: DialogTypes[typeof CONFIRM_DIALOG_TYPE]['options'],
  ): Promise<DialogTypes[typeof CONFIRM_DIALOG_TYPE]['responseType'] | undefined>;
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
