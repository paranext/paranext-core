import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';

interface MoveTaskConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  basePlanName: string;
  onConfirm: () => void;
}

export function MoveTaskConfirmDialog({
  open,
  onOpenChange,
  basePlanName,
  onConfirm,
}: MoveTaskConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Nested above the full-screen plan dialog (Z_INDEX_MODAL = 500), so bump the content. */}
      <DialogContent style={{ zIndex: 650 }}>
        <DialogHeader>
          <DialogTitle>Move task to different stage: TPML</DialogTitle>
          <DialogDescription>
            Your Project Plan is currently based on &ldquo;{basePlanName}&rdquo;.
          </DialogDescription>
        </DialogHeader>
        <div className="tw:text-sm">
          <p>You are moving a task to a different stage. This has the following consequences:</p>
          <ul className="tw:mt-2 tw:list-disc tw:ps-6">
            <li>Recorded progress for this task will be lost.</li>
            <li>
              You will not be able to update to a new version of &ldquo;{basePlanName}&rdquo;.
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Move task to new stage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MoveTaskConfirmDialog;
