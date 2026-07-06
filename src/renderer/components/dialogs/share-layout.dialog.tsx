import { DialogHeader, DialogTitle, DialogFooter, Button } from 'platform-bible-react';
import { DIALOG_BASE, DialogProps } from '@renderer/components/dialogs/dialog-base.data';
import {
  DialogDefinition,
  ShareLayoutDialogOptions,
  SHARE_LAYOUT_DIALOG_TYPE,
} from '@renderer/components/dialogs/dialog-definition.model';

// This skeleton doesn't use `projectId` yet (Task 7 adds the real data-fetching wrapper that
// consumes it), so it's omitted here rather than destructured. Omitting it also keeps this
// Component's prop type assignable to `DialogDefinitionBase['Component']`'s generic
// `(props: DialogProps<unknown>) => ReactElement` signature, since `projectId` is required on
// `ShareLayoutDialogOptions`.
function ShareLayoutDialogComponent({
  submitDialog,
  cancelDialog,
}: DialogProps<boolean> & Omit<ShareLayoutDialogOptions, 'projectId'>) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>%shareLayoutDialog_title%</DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={cancelDialog}>
          Cancel
        </Button>
        <Button onClick={() => submitDialog(true)}>Share with team</Button>
      </DialogFooter>
    </>
  );
}

export const SHARE_LAYOUT_DIALOG: DialogDefinition<typeof SHARE_LAYOUT_DIALOG_TYPE> = Object.freeze(
  {
    ...DIALOG_BASE,
    tabType: SHARE_LAYOUT_DIALOG_TYPE,
    defaultTitle: '%shareLayoutDialog_title%',
    initialSize: { width: 640, height: 720 },
    Component: ShareLayoutDialogComponent,
  },
);

export default SHARE_LAYOUT_DIALOG;
