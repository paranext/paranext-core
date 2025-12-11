import { MouseEventHandler } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef } from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui.util';
import { Button } from '../shadcn-ui/button';

export type LocalizedBookNames = Map<string, string | { localizedId: string }>;

/**
 * Props interface for formatting a SerializedVerseRef. For defaults see platform-bible-utils >
 * scripture-utils.ts > `formatScrRefRange`
 */
export type ScrRefFormattingOptions = {
  /** Map of localized book names */
  localizedBookNames?: LocalizedBookNames;
  /** Separating character(s) between chapter and verse */
  chapterVerseSeparator?: string;
  /** Separating character(s) between book and chapter */
  bookChapterSeparator?: string;
  /** Separating character(s) between start and end reference */
  rangeSeparator?: string;
  /**
   * If or not to repeat the book and/or chapter for the end reference, when the range is inside the
   * same book or chapter. Example for false: `GEN 1 - 2`, example for true: `GEN 1 - GEN 2`
   */
  repeatBookAndChapterOnRange?: boolean;
};

/** Props interface for the LinkedScrRefDisplay component */
export type LinkedScrRefDisplayProps = {
  /* Single reference or start reference of a range to display as part of the link */
  startRef: SerializedVerseRef;
  /* End reference of a range to display as part of the link */
  endRef?: SerializedVerseRef;
  /* Additional properties to format the scripture references */
  scrRefFormattingProps?: ScrRefFormattingOptions;
  /* Part of Scripture text to display after the scripture reference */
  scriptureTextPart?: string;
  /* Optional class name to style the button and text section */
  className?: string;
  /* OnClick handler to react on click or submit of the button */
  onClick?: MouseEventHandler | undefined;
  /* If to make the part of Scripture text part of the link or not */
  includeInLink?: 'allText' | 'onlyScrRef';
};

function getLocalizedBookName(
  scrRef: SerializedVerseRef,
  scrRefFormattingProps: ScrRefFormattingOptions | undefined,
) {
  const bookNameOrObject = scrRefFormattingProps?.localizedBookNames?.get(scrRef.book);
  return typeof bookNameOrObject === 'object' &&
    bookNameOrObject !== undefined &&
    'localizedId' in bookNameOrObject
    ? bookNameOrObject?.localizedId
    : bookNameOrObject;
}

function formatScrRefWithOptions(
  scrRef: SerializedVerseRef,
  scrRefFormattingProps: ScrRefFormattingOptions | undefined,
) {
  return formatScrRef(
    scrRef,
    getLocalizedBookName(scrRef, scrRefFormattingProps),
    scrRefFormattingProps?.chapterVerseSeparator,
    scrRefFormattingProps?.bookChapterSeparator,
  );
}

function formatScrRangeWithOptions(
  startRef: SerializedVerseRef,
  _endRef: SerializedVerseRef, // TODO remove _
  scrRefFormattingProps: ScrRefFormattingOptions | undefined,
) {
  return formatScrRef(
    // TODO: switch to formatScrRefRange once implemented in pbu + use all available options
    startRef,
    // _endRef,
    getLocalizedBookName(startRef, scrRefFormattingProps),
    // getLocalizedBookName(_endRef, scrRefFormattingProps),
    scrRefFormattingProps?.chapterVerseSeparator,
    scrRefFormattingProps?.bookChapterSeparator,
    // scrRefFormattingProps?.rangeSeparator;
    // scrRefFormattingProps?.repeatBookAndChapterOnRange;
  );
}

function scripturePartDisplay(scriptureTextPart?: string, className?: string) {
  if (!scriptureTextPart) return undefined;
  return (
    <span
      className={cn(
        'tw-h-fit tw-truncate tw-whitespace-normal tw-text-start tw-text-xs tw-font-medium',
        className,
      )}
    >
      {scriptureTextPart ?? ''}
    </span>
  );
}

/**
 * LinkedScrRefDisplay is a component that renders a Scripture reference as formatted single
 * reference or range, together with some part of Scripture text. Choices are to use only the
 * Scripture reference or the whole display as a shadcn link button. Use cases include any rendering
 * of a scripture reference or occurrence, so that the link can be used to navigate to that location
 * in Scripture.
 */
export function LinkedScrRefDisplay({
  startRef,
  endRef,
  scriptureTextPart,
  className,
  onClick,
  scrRefFormattingProps,
  includeInLink = 'onlyScrRef',
}: LinkedScrRefDisplayProps) {
  return (
    <div className={cn('tw-overflow-hidden tw-truncate tw-p-1 tw-text-start tw-leading-none')}>
      <Button
        variant="link"
        aria-label="Submit reference change"
        onClick={onClick}
        className={cn('tw-me-2 tw-inline tw-h-4 tw-p-0 tw-text-start', className)}
      >
        <span className={cn({ 'tw-me-2': includeInLink === 'allText' })}>
          {endRef
            ? formatScrRangeWithOptions(startRef, endRef, scrRefFormattingProps)
            : formatScrRefWithOptions(startRef, scrRefFormattingProps)}
        </span>
        {includeInLink === 'allText' && scripturePartDisplay(scriptureTextPart, className)}
      </Button>

      {includeInLink === 'onlyScrRef' && scripturePartDisplay(scriptureTextPart, className)}
    </div>
  );
}

export default LinkedScrRefDisplay;
