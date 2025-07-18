import { Entry } from 'platform-lexical-tools';
import {
  cn,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useListbox,
  type ListboxOption,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useState, useEffect, RefObject, useMemo, useRef } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { LocalizationData } from '@papi/core';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
  getCombinedOccurrencesCountFromDictionaryEntrySenses,
  useIsWideScreen,
} from '../../utils/dictionary.utils';

/** Props for the DictionaryListItem component */
type DictionaryListItemProps = {
  /** The dictionary entry to display */
  entry: Entry;
  /** Whether the dictionary entry is selected */
  isSelected: boolean;
  /** Whether the dictionary entry is in drawer mode */
  isDrawerMode: boolean;
  /** Localized strings for the dictionary */
  localizedStrings: LocalizationData;
  /** Scripture reference to filter the occurrences by */
  scrRef: SerializedVerseRef;
  /** Callback function to handle click on the entry */
  onClick: () => void;
  /** Callback function to handle occurrence selection */
  onSelectOccurrence: (scrRefOfOccurrence: SerializedVerseRef) => void;
};

function DictionaryListItem({
  entry,
  isSelected,
  isDrawerMode,
  localizedStrings,
  scrRef,
  onClick,
  onSelectOccurrence,
}: DictionaryListItemProps) {
  // ref.current expects null and not undefined when we pass it to the div
  // eslint-disable-next-line no-null/no-null
  const dictionaryEntryRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    dictionaryEntryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = (
    // This component does have keyboard navigation, it is being handled through the useListbox hook
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
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
  );

  const [open, setOpen] = useState(isSelected);

  useEffect(() => {
    setOpen(isSelected);
  }, [isSelected]);

  if (isDrawerMode && isSelected) {
    return (
      <Drawer direction="right" dismissible={false} open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{content}</DrawerTrigger>
        <DrawerContent className="tw-max-w-xl">
          <div ref={dictionaryEntryRef} className="tw-overflow-y-auto tw-p-4">
            <DictionaryEntryDisplay
              isDrawer
              dictionaryEntry={entry}
              handleBackToListButton={() => setOpen(false)}
              scriptureReferenceToFilterBy={scrRef}
              onSelectOccurrence={onSelectOccurrence}
              onClickScrollToTop={scrollToTop}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      {content}
      <Separator />
    </>
  );
}

/** Props for the DictionaryList component */
export type DictionaryListBoxProps = {
  /** Array of dictionary entries */
  dictionaryData: Entry[];
  /** Scripture reference to filter the dictionary entries by */
  scriptureReferenceToFilterBy: SerializedVerseRef;
  /** Callback function to handle occurrence selection */
  onSelectOccurrence: (scrRefOfOccurrence: SerializedVerseRef) => void;
  /** Callback function to handle character press */
  onCharacterPress?: (char: string) => void;
};

/**
 * A list of dictionary entries.
 *
 * This component renders a listbox of dictionary entries. Each list item contains the lemma of the
 * dictionary entry, the number of occurrences in the chapter, and a list of Strong's codes. The
 * component also renders a drawer to the right of the list item that contains a detailed view of
 * the dictionary entry.
 *
 * The component uses the `useListbox` hook from the `listbox-keyboard-navigation.util` module to
 * handle keyboard navigation of the list.
 */
export function DictionaryList({
  dictionaryData,
  scriptureReferenceToFilterBy,
  onSelectOccurrence,
  onCharacterPress,
}: DictionaryListBoxProps) {
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  const isWideScreen = useIsWideScreen();
  const [selectedEntryId, setSelectedEntryId] = useState<string | undefined>(undefined);

  const options: ListboxOption[] = dictionaryData.map((entry) => ({
    id: `${entry.lexicalReferenceTextId}-entry-${entry.id}`,
  }));

  const selectedEntry = useMemo(() => {
    return dictionaryData.find(
      (entry) => `${entry.lexicalReferenceTextId}-entry-${entry.id}` === selectedEntryId,
    );
  }, [dictionaryData, selectedEntryId]);

  const handleOptionSelect = (option: ListboxOption) => {
    setSelectedEntryId((prevId) => (prevId === option.id ? undefined : option.id));
  };

  const { listboxRef, activeId, handleKeyDown } = useListbox({
    options,
    onOptionSelect: handleOptionSelect,
    onCharacterPress,
  });

  // ref.current expects null and not undefined when we pass it to the div
  // eslint-disable-next-line no-null/no-null
  const dictionaryEntryRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    dictionaryEntryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tw-flex tw-flex-row tw-flex-1 tw-overflow-hidden">
      <div
        className={cn('tw-overflow-y-auto tw-px-2 tw-py-2', {
          'tw-w-1/2': isWideScreen && selectedEntryId,
          'tw-w-full': !isWideScreen || !selectedEntryId,
        })}
      >
        <ul
          id="dictionary-list"
          role="listbox"
          tabIndex={0}
          // The listboxRef is a HTMLElement so that the keyboard navigation can be used with multiple types of elements
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          ref={listboxRef as RefObject<HTMLUListElement>}
          aria-activedescendant={activeId ?? undefined}
          className="tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
          onKeyDown={handleKeyDown}
        >
          {dictionaryData.map((entry) => {
            const entryId = `${entry.lexicalReferenceTextId}-entry-${entry.id}`;
            const isSelected = selectedEntryId === entryId;
            return (
              <div key={entryId}>
                <DictionaryListItem
                  entry={entry}
                  isSelected={isSelected}
                  isDrawerMode={!isWideScreen}
                  localizedStrings={localizedStrings}
                  scrRef={scriptureReferenceToFilterBy}
                  onClick={() => setSelectedEntryId(entryId)}
                  onSelectOccurrence={onSelectOccurrence}
                />
              </div>
            );
          })}
        </ul>
      </div>
      {isWideScreen && selectedEntryId && selectedEntry && (
        <div ref={dictionaryEntryRef} className="tw-w-1/2 tw-overflow-y-auto tw-p-4">
          <DictionaryEntryDisplay
            scriptureReferenceToFilterBy={scriptureReferenceToFilterBy}
            isDrawer={false}
            dictionaryEntry={selectedEntry}
            handleBackToListButton={handleOptionSelect}
            onSelectOccurrence={onSelectOccurrence}
            onClickScrollToTop={scrollToTop}
          />
        </div>
      )}
    </div>
  );
}
