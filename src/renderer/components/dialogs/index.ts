import SELECT_PROJECT_DIALOG from '@renderer/components/dialogs/select-project.dialog.old';
import { DialogDefinition, DialogTabTypes } from './dialog.data';

/**
 * Map of all available dialog definitions used to create dialogs
 *
 * If you add a dialog here, you must also add it on {@link DialogTypes}
 */
const DIALOGS: { [DialogTabType in DialogTabTypes]: DialogDefinition<DialogTabType> } = {
  [SELECT_PROJECT_DIALOG.tabType]: SELECT_PROJECT_DIALOG,
};

/** All tab types for available dialogs */
export const DIALOG_TAB_TYPES = Object.keys(DIALOGS) as DialogTabTypes[];

export default DIALOGS;
