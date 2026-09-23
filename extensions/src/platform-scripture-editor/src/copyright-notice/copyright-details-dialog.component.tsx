import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
import { ReactNode } from 'react';

export type CopyrightDetailsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  /** The text's short name, for the title */
  name: string;
  /** What to show; see `renderCopyrightNoticeDetails` */
  children: ReactNode;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
};

/** The window a copyright notice's "More info…" opens */
export function CopyrightDetailsDialog({
  isOpen,
  onOpenChange,
  name,
  children,
  localizedStrings,
}: CopyrightDetailsDialogProps) {
  return (
    // Not modal, so closing it cannot leave the pane's body locked against pointer events
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={false}>
      {/* The copyright text is the whole content, so there is no separate description */}
      <DialogContent className="tw:max-w-2xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {formatReplacementString(
              localizedStrings['%platformScripture_copyrightNotice_details_title%'],
              { name },
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="tw:flex tw:max-h-[60vh] tw:flex-col tw:gap-3 tw:overflow-y-auto">
          {children}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {localizedStrings['%platformScripture_copyrightNotice_details_close%']}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CopyrightDetailsDialog;
