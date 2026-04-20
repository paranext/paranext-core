import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import { type FormEvent } from 'react';
import { DIALOG_BASE, DialogProps } from './dialog-base.data';
import { ALERT_DIALOG_TYPE, AlertDialogOptions, DialogDefinition } from './dialog-definition.model';

const FALLBACK_OK_LABEL = 'OK';
const FALLBACK_TITLE = 'Alert';

function AlertDialog({
  prompt,
  title,
  okLabel,
  submitDialog,
}: DialogProps<true> &
  Omit<AlertDialogOptions, 'prompt'> & { prompt?: AlertDialogOptions['prompt'] }) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitDialog(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{title ?? FALLBACK_TITLE}</DialogTitle>
      </DialogHeader>
      <DialogDescription>{prompt}</DialogDescription>
      <DialogFooter>
        <Button type="submit">{okLabel ?? FALLBACK_OK_LABEL}</Button>
      </DialogFooter>
    </form>
  );
}

export const ALERT_DIALOG: DialogDefinition<typeof ALERT_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: ALERT_DIALOG_TYPE,
  defaultTitle: '%overlay_dialog_title_alert%',
  initialSize: { width: 400, height: 200 },
  dialogRole: 'alertdialog',
  Component: AlertDialog,
});
