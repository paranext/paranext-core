import DIALOG_BASE from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  INVENTORY_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';

function SelectProjectDialog(props: DialogTypes[typeof INVENTORY_DIALOG_TYPE]['props']) {
  const { isDialog } = props;
  return <p>{isDialog}</p>;
}

const INVENTORY_DIALOG: DialogDefinition<typeof INVENTORY_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: INVENTORY_DIALOG_TYPE,
  defaultTitle: '<check name> inventory',
  initialSize: {
    width: 500,
    height: 350,
  },
  Component: SelectProjectDialog,
});

export default INVENTORY_DIALOG;
