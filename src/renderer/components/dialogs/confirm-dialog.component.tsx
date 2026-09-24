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
  isDestructive,
  submitDialog,
}: DialogProps<boolean> &
  Omit<ConfirmDialogOptions, 'prompt'> & { prompt?: ConfirmDialogOptions['prompt'] }) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title ?? FALLBACK_TITLE}</DialogTitle>
      </DialogHeader>
      {/* Falls back to the title rather than rendering empty. `prompt` is optional, and this
          dialog suppresses the shell's fallback description, so an absent prompt would otherwise
          leave `aria-describedby` pointing at nothing. Same `prompt ?? title` rule the shell
          applies. */}
      <DialogDescription>{prompt ?? title ?? FALLBACK_TITLE}</DialogDescription>
      <DialogFooter>
        <Button variant="outline" onClick={() => submitDialog(false)}>
          {cancelLabel ?? FALLBACK_CANCEL_LABEL}
        </Button>
        <Button
          variant={isDestructive ? 'destructive' : 'default'}
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
  defaultTitle: '%overlay_dialog_title_confirm%',
  initialSize: { width: 400, height: 200 },
  // The component renders both halves itself, in every state — see the description fallback above.
  providesOwnTitle: true,
  providesOwnDescription: true,
  dialogRole: 'alertdialog',
  Component: ConfirmDialog,
});
