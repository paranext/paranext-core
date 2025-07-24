import { LocalizationData } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  cn,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Separator,
} from 'platform-bible-react';
import { Entry } from 'platform-lexical-tools';
import {
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
  /** Scripture reference to filter the occurrences by */
  scrRef: SerializedVerseRef;
  /** Callback function to handle click on the entry */
  onClick: () => void;
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
 * handle keyboard navigation of the list.
 */
export function DictionaryListItem({
  entry,
  isSelected,
  localizedStrings,
  scrRef,
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
        onClick={onClick}
        className={cn(
          'tw-flex tw-flex-col tw-p-2 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background',
          {
            'tw-bg-muted': isSelected,
            'hover:tw-bg-muted': !isSelected,
          },
        )}
        tabIndex={-1}
      >
        <div className="tw-flex tw-items-baseline tw-gap-2">
          <span className="tw-text-sm">{entry.lemma}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="tw-text-xs tw-bg-accent tw-px-1.5 tw-py-0.5 tw-rounded tw-ml-1 tw-cursor-help">
                  {getCombinedOccurrencesCountFromDictionaryEntrySenses(entry, scrRef)}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {localizedStrings['%platformLexicalTools_dictionary_occurrencesInChapterLabel%']}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2 tw-mt-0.5">
          <p className="tw-text-sm tw-text-muted-foreground tw-truncate">
            {getFormatGlossesStringFromDictionaryEntrySenses(entry, scrRef)}
          </p>
          {entry.strongsCodes.map((strongsCode) => (
            <TooltipProvider key={strongsCode}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="tw-text-xs tw-bg-accent tw-px-1.5 tw-py-0.5 tw-rounded tw-ml-1 tw-shrink-0 tw-cursor-help">
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
}
