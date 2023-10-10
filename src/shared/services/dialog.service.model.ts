import { DialogOptions } from '@shared/models/dialog-options.model';

/** JSDOC SOURCE dialogService
 * Prompt the user for responses with dialogs
 */
export interface DialogService {
  /**
   * Shows a select project dialog to the user and prompts the user to select a dialog
   *
   * @param prompt the message to show the user in the dialog
   * @param options various options for configuring the dialog that shows
   *
   * @returns If the user selects a project, returns that project's project id. If the user cancels,
   *   returns `undefined`
   */
  getProject(prompt: string, options?: DialogOptions): Promise<string | undefined>;
}

/** Prefix on requests that indicates that the request is related to dialog operations */
export const CATEGORY_DIALOG = 'dialog';
