import { Info, X } from 'lucide-react';
import {
  Button,
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LanguageStrings } from 'platform-bible-utils';
import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';
import { CopyrightDetailsDialog } from './copyright-details-dialog.component';
import {
  getCopyrightNoticeMessageFormat,
  renderCopyrightNoticeMessage,
  type ShowableCopyrightNotice,
} from './copyright-notice-message.utils';

export type CopyrightNoticeBannerProps = {
  notice: ShowableCopyrightNotice;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
  onDismiss: () => void;
};

/**
 * A dismissible strip across the top of a pane showing a text's copyright notice: either the text's
 * own "Notification:" wording (as Paratext 9 shows for the ESV), or the notice that a traditionally
 * licensed Biblica text is for reference only and may not be used as the basis of a new
 * translation. "More info" opens the details.
 *
 * The message is clamped to two lines so it does not push the text far down a narrow pane; "Show
 * more" appears whenever it does not fit.
 */
export function CopyrightNoticeBanner({
  notice,
  localizedStrings,
  onDismiss,
}: CopyrightNoticeBannerProps) {
  const messageId = useId();
  // React's `ref` attribute takes a ref initialized with null
  // eslint-disable-next-line no-null/no-null
  const messageRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const messageFormat = getCopyrightNoticeMessageFormat(notice, localizedStrings);

  const measureOverflow = useCallback(() => {
    const message = messageRef.current;
    // Unclamped, the message always fits, so keep what was measured while it was clamped
    if (!message || isExpanded) return;
    setIsOverflowing(message.scrollHeight > message.clientHeight);
  }, [isExpanded]);

  // Hidden case: a tab that is not showing has no layout, so the message measures as fitting. The
  // observer reports the real size once the tab is shown, which brings "Show more" back if needed.
  // The observer only reports size changes, and the clamped box keeps its size when its wording
  // changes (the strings arriving, or another UI language), so a new wording is measured here.
  useLayoutEffect(() => {
    measureOverflow();
    const message = messageRef.current;
    if (!message) return undefined;
    const observer = new ResizeObserver(measureOverflow);
    observer.observe(message);
    return () => observer.disconnect();
  }, [measureOverflow, notice, messageFormat]);

  const dismissLabel = localizedStrings['%platformScripture_copyrightNotice_dismiss%'];

  return (
    <div
      role="note"
      className="pr-twp tw:flex tw:items-start tw:gap-2 tw:border-b tw:border-border tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm"
    >
      <Info className="tw:mt-0.5 tw:h-4 tw:w-4 tw:shrink-0" aria-hidden />
      <div className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-0.5">
        <p
          id={messageId}
          ref={messageRef}
          className={cn('tw:break-words', { 'tw:line-clamp-2': !isExpanded })}
        >
          {renderCopyrightNoticeMessage(notice, localizedStrings)}
        </p>
        <div className="tw:flex tw:flex-wrap tw:gap-x-3">
          {isOverflowing && (
            <Button
              variant="link"
              className="tw:h-auto tw:p-0 tw:text-sm"
              aria-expanded={isExpanded}
              aria-controls={messageId}
              onClick={() => setIsExpanded((wasExpanded) => !wasExpanded)}
            >
              {
                localizedStrings[
                  isExpanded
                    ? '%platformScripture_copyrightNotice_showLess%'
                    : '%platformScripture_copyrightNotice_showMore%'
                ]
              }
            </Button>
          )}
          <CopyrightDetailsDialog
            notice={notice}
            localizedStrings={localizedStrings}
            trigger={
              <Button variant="link" className="tw:h-auto tw:p-0 tw:text-sm">
                {localizedStrings['%platformScripture_copyrightNotice_moreInfo%']}
              </Button>
            }
          />
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="tw:h-6 tw:w-6 tw:shrink-0"
              aria-label={dismissLabel}
              onClick={onDismiss}
            >
              <X className="tw:h-4 tw:w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{dismissLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default CopyrightNoticeBanner;
