import DIALOG_BASE from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  DialogTypes,
  INVENTORY_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';
import { DataTable } from 'platform-bible-react';

function SelectProjectDialog(props: DialogTypes[typeof INVENTORY_DIALOG_TYPE]['props']) {
  const { isDialog } = props;
  console.log(isDialog);
  return <DataTable columns={[]} data={[]} />;
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
