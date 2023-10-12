import DIALOG_BASE from '@renderer/components/dialogs/dialog-base.data';
import { DialogDefinition } from '@renderer/components/dialogs/dialog.data';
import SelectProjectTab from '@renderer/components/project-dialogs/select-project-tab.component';

const SELECT_PROJECT_DIALOG_TYPE = 'platform.selectProject';

const SELECT_PROJECT_DIALOG: DialogDefinition<typeof SELECT_PROJECT_DIALOG_TYPE> = {
  ...DIALOG_BASE,
  tabType: SELECT_PROJECT_DIALOG_TYPE,
  defaultTitle: 'Select Project',
  initialHeight: 1000,
  initialWidth: 1000,
  Component: SelectProjectTab,
};

export default SELECT_PROJECT_DIALOG;
