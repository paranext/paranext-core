import { Info } from 'lucide-react';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { formatReplacementString, LanguageStrings } from 'platform-bible-utils';
import { CopyrightDetailsDialog } from './copyright-details-dialog.component';
import {
  renderCopyrightNoticeMessage,
  type ShowableCopyrightNotice,
} from './copyright-notice-message.utils';
import { useCopyrightNotice } from './use-copyright-notice.hook';

export type CopyrightNoticeIndicatorViewProps = {
  notice: ShowableCopyrightNotice;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
};

/**
 * A small info button carrying a text's copyright notice, for places too small for the banner such
 * as a Text Collection cell. Its tooltip shows the notice, and clicking it opens the details the
 * banner's "More info…" opens. It cannot be dismissed, since it takes almost no space.
 */
export function CopyrightNoticeIndicatorView({
  notice,
  localizedStrings,
}: CopyrightNoticeIndicatorViewProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <CopyrightDetailsDialog
          notice={notice}
          localizedStrings={localizedStrings}
          trigger={
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={formatReplacementString(
                  localizedStrings['%platformScripture_copyrightNotice_indicator_label%'],
                  { name: notice.name },
                )}
                // A click must not reach the cell, whose click opens the chapter view
                onClick={(event) => event.stopPropagation()}
                className="tw:h-6 tw:w-6 tw:shrink-0 tw:text-muted-foreground"
              >
                <Info className="tw:h-4 tw:w-4" />
              </Button>
            </TooltipTrigger>
          }
        />
        <TooltipContent>
          <p>{renderCopyrightNoticeMessage(notice, localizedStrings)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export type CopyrightNoticeIndicatorProps = {
  /** The project whose text the cell shows */
  projectId: string | undefined;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
};

function IndicatorForProject({
  projectId,
  localizedStrings,
}: {
  projectId: string;
  localizedStrings: LanguageStrings;
}) {
  const notice = useCopyrightNotice(projectId);
  if (!notice) return undefined;
  return <CopyrightNoticeIndicatorView notice={notice} localizedStrings={localizedStrings} />;
}

/** {@link CopyrightNoticeIndicatorView} for a project's notice, if it needs one */
export function CopyrightNoticeIndicator({
  projectId,
  localizedStrings,
}: CopyrightNoticeIndicatorProps) {
  if (!projectId) return undefined;
  // Keyed so a newly shown text never shows the previous text's notice while its own is on its way
  return (
    <IndicatorForProject
      key={projectId}
      projectId={projectId}
      localizedStrings={localizedStrings}
    />
  );
}

export default CopyrightNoticeIndicator;
