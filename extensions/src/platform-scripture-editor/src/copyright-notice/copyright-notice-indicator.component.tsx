import { Info } from 'lucide-react';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { useState } from 'react';
import { CopyrightDetailsDialog } from './copyright-details-dialog.component';
import {
  copyrightNoticeMessageText,
  renderCopyrightNoticeDetails,
  renderCopyrightNoticeMessage,
} from './copyright-notice-message.utils';
import { openExternalUrl } from './open-external-url.util';
import { useCopyrightNotice } from './use-copyright-notice.hook';

export type CopyrightNoticeIndicatorProps = {
  /** The project whose text the cell shows */
  projectId: string | undefined;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
};

/**
 * A small info button carrying a text's copyright notice, for places too small for the banner such
 * as a Text Collection cell. Its tooltip and accessible name are the notice; clicking it opens the
 * full copyright. It cannot be dismissed, since it takes almost no space.
 */
export function CopyrightNoticeIndicator({
  projectId,
  localizedStrings,
}: CopyrightNoticeIndicatorProps) {
  const { notice, name, fullName } = useCopyrightNotice(projectId);
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);

  if (!notice) return undefined;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={copyrightNoticeMessageText(notice, name, localizedStrings)}
              // A click must not reach the cell, whose click opens the chapter view
              onClick={(event) => {
                event.stopPropagation();
                setAreDetailsOpen(true);
              }}
              className="tw:h-6 tw:w-6 tw:shrink-0 tw:text-muted-foreground"
            >
              <Info className="tw:h-4 tw:w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="tw:max-w-xs">
            {renderCopyrightNoticeMessage(notice, name, localizedStrings)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CopyrightDetailsDialog
        isOpen={areDetailsOpen}
        onOpenChange={setAreDetailsOpen}
        name={name}
        localizedStrings={localizedStrings}
      >
        {renderCopyrightNoticeDetails(notice, name, fullName, localizedStrings, openExternalUrl)}
      </CopyrightDetailsDialog>
    </>
  );
}

export default CopyrightNoticeIndicator;
