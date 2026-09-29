import { ExternalLink } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'platform-bible-react';
import {
  formatReplacementString,
  formatReplacementStringToArray,
  LanguageStrings,
} from 'platform-bible-utils';
import { ReactElement, useId } from 'react';
import { keyed, type ShowableCopyrightNotice } from './copyright-notice-message.utils';
import { BIBLICA_PERMISSIONS_URL } from './copyright-notice.const';
import { openInBrowser } from './open-in-browser.utils';

type CopyrightNoticeDetailsProps = {
  notice: ShowableCopyrightNotice;
  localizedStrings: LanguageStrings;
};

/**
 * For a restricted Biblica text, Biblica's terms for use outside Paratext with a link to its
 * permissions page; for a "Notification:" text, the rest of its own copyright, one paragraph per
 * line, as Paratext 9 shows it.
 */
function CopyrightNoticeDetails({ notice, localizedStrings }: CopyrightNoticeDetailsProps) {
  const opensInBrowserId = useId();

  if (notice.kind === 'notification')
    return notice.details
      .split('\n')
      .filter((paragraph) => paragraph.length > 0)
      .map((paragraph, index) => (
        // Paragraphs of one copyright never reorder, and two can have the same text
        // eslint-disable-next-line react/no-array-index-key
        <p key={index} dir="auto" className="tw:text-sm tw:leading-relaxed">
          {paragraph}
        </p>
      ));

  // This wording, "Outside of Paratext" included, is Biblica's own required license text: do not
  // reword it (e.g. to "Paratext 10") without Biblica's agreement
  const format = notice.copyrightYears
    ? localizedStrings['%platformScripture_copyrightNotice_restrictedLicense_details%']
    : localizedStrings['%platformScripture_copyrightNotice_restrictedLicense_details_noYears%'];
  return (
    <p className="tw:text-sm tw:leading-relaxed">
      {keyed(
        formatReplacementStringToArray(format, {
          name: <bdi>{notice.name}</bdi>,
          fullName: <bdi>{notice.fullName}</bdi>,
          years: notice.copyrightYears,
          permissionsLink: (
            <a
              href={BIBLICA_PERMISSIONS_URL}
              onClick={(event) => {
                event.preventDefault();
                openInBrowser(BIBLICA_PERMISSIONS_URL);
              }}
              aria-describedby={opensInBrowserId}
              className="tw:inline-flex tw:items-center tw:gap-1 tw:text-primary tw:underline-offset-4 tw:hover:underline"
            >
              {/* An address reads left to right even inside a right-to-left sentence */}
              <bdi dir="ltr">{BIBLICA_PERMISSIONS_URL}</bdi>
              <ExternalLink className="tw:h-3.5 tw:w-3.5 tw:shrink-0" aria-hidden />
              <span id={opensInBrowserId} hidden>
                {localizedStrings['%ariaLabel_opensInBrowser%']}
              </span>
            </a>
          ),
        }),
      )}
    </p>
  );
}

export type CopyrightDetailsDialogProps = {
  notice: ShowableCopyrightNotice;
  /**
   * The control that opens the dialog, which gets focus back when it closes. It must accept a ref
   * and pass its props on to a button, as `Button` and `TooltipTrigger` do.
   */
  trigger: ReactElement;
  /** Must include the keys in `COPYRIGHT_NOTICE_STRING_KEYS` */
  localizedStrings: LanguageStrings;
};

/** The window a copyright notice's "More info" opens, with the notice's full terms */
export function CopyrightDetailsDialog({
  notice,
  trigger,
  localizedStrings,
}: CopyrightDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {/* The footer's localized Close replaces the corner X, whose label is not localized */}
      <DialogContent className="tw:sm:max-w-2xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {formatReplacementString(
              localizedStrings['%platformScripture_copyrightNotice_details_title%'],
              { name: notice.name },
            )}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="tw:flex tw:max-h-[60vh] tw:flex-col tw:gap-3 tw:overflow-y-auto tw:text-popover-foreground">
            <CopyrightNoticeDetails notice={notice} localizedStrings={localizedStrings} />
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              {localizedStrings['%platformScripture_copyrightNotice_details_close%']}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CopyrightDetailsDialog;
