import { ABOUT_DIALOG } from './about-dialog.component';
import { ALERT_DIALOG } from './alert-dialog.component';
import { CONFIRM_DIALOG } from './confirm-dialog.component';
import { SELECT_MULTIPLE_PROJECTS_DIALOG } from './select-multiple-projects.dialog';
import { SELECT_PROJECT_DIALOG } from './select-project.dialog';
import { DialogDefinition, DialogTabTypes } from './dialog-definition.model';

/**
 * Map of all available dialog definitions used to create dialogs
 *
 * If you add a dialog here, you must also add it on {@link DialogTypes}
 */
export const DIALOGS: { [DialogTabType in DialogTabTypes]: DialogDefinition<DialogTabType> } = {
  [ABOUT_DIALOG.tabType]: ABOUT_DIALOG,
  [ALERT_DIALOG.tabType]: ALERT_DIALOG,
  [CONFIRM_DIALOG.tabType]: CONFIRM_DIALOG,
  [SELECT_PROJECT_DIALOG.tabType]: SELECT_PROJECT_DIALOG,
  [SELECT_MULTIPLE_PROJECTS_DIALOG.tabType]: SELECT_MULTIPLE_PROJECTS_DIALOG,
};

/** All tab types for available dialogs */
// Re-assert the type of keys.
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const DIALOG_TAB_TYPES = Object.keys(DIALOGS) as DialogTabTypes[];

export default DIALOGS;
