import { cn } from '@/utils/shadcn-ui.util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef, formatScrRefRange, FormatScrRefRangeOptions } from 'platform-bible-utils';
import { MouseEventHandler } from 'react';
import { Button } from '../shadcn-ui/button';

export type LocalizedBookNames = Map<string, string | { localizedId: string }>;

/** Props interface for the LinkedScrRefDisplay component */
export type LinkedScrRefDisplayProps = {
  /** Single reference or start reference of a range to display as part of the link */
  startRef: SerializedVerseRef;
  /** End reference of a range to display as part of the link */
  endRef?: SerializedVerseRef;
  /** Additional properties to format the scripture references */
  scrRefFormattingOptions?: FormatScrRefRangeOptions;
  /** Part of Scripture text to display after the scripture reference */
  scriptureTextPart?: string;
  /** Optional class name to style the button and text section */
  className?: string;
  /** OnClick handler to react on click or submit of the button */
  onClick?: MouseEventHandler | undefined;
  /** If to make the part of Scripture text part of the link or not */
  includeInLink?: 'allText' | 'onlyScrRef';
};

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
 * A function to retrieve the localized book name from a map, e.g. returned by papi function
 * useLocalizedStrings
 *
 * @param scrRef A SerializedVerseRef
 * @param localizedBookNames A map of localization key to string | localization key to an object
 *   with localizedId holding the localized book name
 * @returns The book name localized if found or the pure book name from the ref
 */
export function getLocalizedBookName(
  scrRef: SerializedVerseRef,
  localizedBookNames?: LocalizedBookNames,
) {
  const bookNameOrObject = localizedBookNames?.get(scrRef.book);
  return typeof bookNameOrObject === 'object' &&
    bookNameOrObject !== undefined &&
    'localizedId' in bookNameOrObject
    ? bookNameOrObject?.localizedId
    : bookNameOrObject;
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
  scrRefFormattingOptions: scrRefFormattingProps,
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
            ? formatScrRefRange(startRef, endRef, scrRefFormattingProps)
            : formatScrRef(
                startRef,
                scrRefFormattingProps?.optionOrLocalizedBookName,
                scrRefFormattingProps?.chapterVerseSeparator,
                scrRefFormattingProps?.bookChapterSeparator,
              )}
        </span>
        {includeInLink === 'allText' && scripturePartDisplay(scriptureTextPart, className)}
      </Button>

      {includeInLink === 'onlyScrRef' && scripturePartDisplay(scriptureTextPart, className)}
    </div>
  );
}

export default LinkedScrRefDisplay;
