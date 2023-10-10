import { DialogOptions } from '@shared/models/dialog-options.model';

/** JSDOC SOURCE dialogService
 * Prompt the user for responses with dialogs
 */
export interface DialogService {
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
