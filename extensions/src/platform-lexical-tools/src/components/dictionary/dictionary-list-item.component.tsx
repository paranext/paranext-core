import type { LocalizationData } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  cn,
  ContentZoomRoot,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Separator,
} from 'platform-bible-react';
import { Entry } from 'platform-lexical-tools';
import { memo } from 'react';
import {
  DictionaryScope,
  getCombinedOccurrencesCountFromDictionaryEntrySenses,
  getFormatGlossesStringFromDictionaryEntrySenses,
} from '../../utils/dictionary.utils';

/** Props for the DictionaryListItem component */
type DictionaryListItemProps = {
  /** The dictionary entry to display */
  entry: Entry;
  /** Whether the dictionary entry is selected */
  isSelected: boolean;
  /** Localized strings for the dictionary */
  localizedStrings: LocalizationData;
  /**
   * Scripture reference to filter the occurrences by. Pass the reference from `useScopeReference`,
   * so a verse move within the chapter leaves the item alone.
   */
  scrRef: SerializedVerseRef | undefined;
  /** The current scope (chapter or verse) */
  scope: DictionaryScope;
  /** Called with this item's entry when it is clicked */
  onClick: (entry: Entry) => void;
};

/**
 * A list item for a dictionary entry.
 *
 * This component is used to display a dictionary entry in a list of dictionary entries.
 *
 * The component renders a list item with the lemma of the dictionary entry, the number of
 * occurrences in the chapter, and the Strong's codes for the dictionary entry. The component also
 * renders a tooltip that displays the number of occurrences in the chapter.
 *
 * The component uses the `useListbox` hook from the `listbox-keyboard-navigation.util` module to
 * handle keyboard navigation of the list. It is memoized, because each item re-reads its glosses'
 * markup and recounts its occurrences when it renders.
 */
export const DictionaryListItem = memo(function DictionaryListItem({
  entry,
  isSelected,
  localizedStrings,
  scrRef,
  scope,
  onClick,
}: DictionaryListItemProps) {
  return (
    <>
      {/* This component does have keyboard navigation, it is being handled through the useListbox hook */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <li
        role="option"
        aria-selected={isSelected}
        id={`${entry.lexicalReferenceTextId}-entry-${entry.id}`}
        onClick={() => onClick(entry)}
        className={cn(
          'tw:flex tw:flex-col tw:p-2 tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background',
          {
            'tw:bg-muted': isSelected,
            'tw:hover:bg-muted': !isSelected,
          },
        )}
        tabIndex={-1}
      >
        <div className="tw:flex tw:items-baseline tw:gap-2">
          {/* The lemma is resource text in its own font and zooms with the pane; the count and
              Strong's badges keep interface size. */}
          <ContentZoomRoot as="span" className="tw:text-sm scripture-font">
            {entry.lemma}
          </ContentZoomRoot>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="tw:text-xs tw:bg-accent tw:px-1.5 tw:py-0.5 tw:rounded tw:ml-1 tw:cursor-help">
                  {getCombinedOccurrencesCountFromDictionaryEntrySenses(entry, scrRef)}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {scope === 'verse'
                    ? localizedStrings['%platformLexicalTools_dictionary_occurrencesInVerseLabel%']
                    : localizedStrings[
                        '%platformLexicalTools_dictionary_occurrencesInChapterLabel%'
                      ]}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="tw:flex tw:items-center tw:gap-2 tw:mt-0.5 tw:overflow-hidden">
          <p className="tw:text-sm tw:text-muted-foreground tw:truncate">
            {getFormatGlossesStringFromDictionaryEntrySenses(entry, scrRef, scope)}
          </p>
          {entry.strongsCodes.map((strongsCode) => (
            <TooltipProvider key={strongsCode}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="tw:text-xs tw:bg-accent tw:px-1.5 tw:py-0.5 tw:rounded tw:ml-1 tw:shrink-0 tw:cursor-help">
                    {strongsCode}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{localizedStrings['%platformLexicalTools_dictionary_strongsCodeLabel%']}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </li>
      <Separator />
    </>
  );
});
