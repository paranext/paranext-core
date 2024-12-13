import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

export default function DialogExamples({ direction }: HasDirection) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show Dialog</Button>
      </DialogTrigger>
      <DialogContent className="tw-max-w-sm" dir={direction}>
        <DialogHeader>
          <DialogTitle>Clear filters</DialogTitle>
          <DialogDescription>Clear filters to show all results?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Show all results</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
