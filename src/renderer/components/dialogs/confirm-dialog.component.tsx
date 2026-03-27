import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import { DIALOG_BASE, DialogProps } from './dialog-base.data';
import {
  CONFIRM_DIALOG_TYPE,
  ConfirmDialogOptions,
  DialogDefinition,
} from './dialog-definition.model';

const FALLBACK_OK_LABEL = 'OK';
const FALLBACK_CANCEL_LABEL = 'Cancel';
const FALLBACK_TITLE = 'Confirm';

function ConfirmDialog({
  prompt,
  title,
  okLabel,
  cancelLabel,
  destructive,
  submitDialog,
  cancelDialog,
}: DialogProps<boolean> &
  Omit<ConfirmDialogOptions, 'prompt'> & { prompt?: ConfirmDialogOptions['prompt'] }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title ?? FALLBACK_TITLE}</DialogTitle>
      </DialogHeader>
      <DialogDescription>{prompt}</DialogDescription>
      <DialogFooter>
        <Button variant="outline" onClick={() => cancelDialog()}>
          {cancelLabel ?? FALLBACK_CANCEL_LABEL}
        </Button>
        <Button
          variant={destructive ? 'destructive' : 'default'}
          onClick={() => submitDialog(true)}
        >
          {okLabel ?? FALLBACK_OK_LABEL}
        </Button>
      </DialogFooter>
    </>
  );
}

export const CONFIRM_DIALOG: DialogDefinition<typeof CONFIRM_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: CONFIRM_DIALOG_TYPE,
  defaultTitle: 'Confirm',
  initialSize: { width: 400, height: 200 },
  dialogRole: 'alertdialog',
  Component: ConfirmDialog,
});
