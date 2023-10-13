import DIALOG_BASE from '@renderer/components/dialogs/dialog-base.data';
import { DialogDefinition } from '@renderer/components/dialogs/dialog.data';
import SelectProjectTab from '@renderer/components/dialogs/select-project.dialog';

const SELECT_PROJECT_DIALOG_TYPE = 'platform.selectProject';

const SELECT_PROJECT_DIALOG: DialogDefinition<typeof SELECT_PROJECT_DIALOG_TYPE> = {
  ...DIALOG_BASE,
  tabType: SELECT_PROJECT_DIALOG_TYPE,
  defaultTitle: 'Select Project',
  initialSize: {
    width: 500,
    height: 350,
  },
  Component: SelectProjectTab,
};

export default SELECT_PROJECT_DIALOG;
