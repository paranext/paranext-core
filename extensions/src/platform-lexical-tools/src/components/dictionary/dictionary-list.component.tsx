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
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useState, useEffect } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { LocalizationData } from '@papi/core';
import { ListboxOption, useListbox } from '../../utils/listbox-keyboard-navigation.util';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
  getCombinedOccurrencesCountFromDictionaryEntrySenses,
  useIsWideScreen,
} from '../../utils/dictionary.util';

// TODO: Fix padding top, need a better way to move content under the sticky header

function DictionaryListItem({
  entry,
  entryId,
  isSelected,
  isDrawerMode,
  localizedStrings,
  scrRef,
  onClick,
  onSelectOccurrence,
}: {
  entry: Entry;
  entryId: string;
  isSelected: boolean;
  isDrawerMode: boolean;
  localizedStrings: LocalizationData;
  scrRef: SerializedVerseRef;
  onClick: () => void;
  onSelectOccurrence: (scrRefOfOccurrence: SerializedVerseRef) => void;
}) {
  const content = (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      role="option"
      aria-selected={isSelected}
      id={entryId}
      onClick={onClick}
      className="tw-flex tw-flex-col tw-p-2 hover:tw-bg-muted tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
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

  return isDrawerMode ? (
    <Drawer direction="right" dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{content}</DrawerTrigger>
      <DrawerContent className="tw-max-w-lg">
        <DictionaryEntryDisplay
          isDrawer
          dictionaryEntry={entry}
          handleBackToListButton={() => setOpen(false)}
          scriptureReferenceToFilterBy={scrRef}
          onSelectOccurrence={onSelectOccurrence}
        />
      </DrawerContent>
    </Drawer>
  ) : (
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

  const handleOptionSelect = (option: ListboxOption) => {
    setSelectedEntryId((prevId) => (prevId === option.id ? undefined : option.id));
  };

  const { listboxRef, activeId, handleKeyDown } = useListbox({
    options,
    onOptionSelect: handleOptionSelect,
    onCharacterPress,
  });

  return (
    <div className="tw-absolute tw-left-0 tw-right-0 tw-top-14 tw-bottom-0">
      <div className="tw-flex tw-h-full">
        <div
          className={cn('tw-overflow-y-auto', {
            'tw-w-1/2': isWideScreen && selectedEntryId,
            'tw-w-full': !selectedEntryId || !isWideScreen,
          })}
        >
          <ul
            id="dictionary-list"
            role="listbox"
            tabIndex={0}
            ref={listboxRef}
            aria-activedescendant={activeId ?? undefined}
            className="tw-outline-none tw-px-2 tw-py-2 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
            onKeyDown={handleKeyDown}
          >
            {dictionaryData.map((entry) => {
              const entryId = `${entry.lexicalReferenceTextId}-entry-${entry.id}`;
              const isSelected = selectedEntryId === entryId;
              return (
                <div key={entryId}>
                  <DictionaryListItem
                    entry={entry}
                    entryId={entryId}
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
        {isWideScreen &&
          selectedEntryId &&
          (() => {
            const selectedEntry = dictionaryData.find(
              (entry) => `${entry.lexicalReferenceTextId}-entry-${entry.id}` === selectedEntryId,
            );
            return selectedEntry ? (
              <div className="tw-w-1/2 tw-h-full tw-overflow-auto">
                <DictionaryEntryDisplay
                  scriptureReferenceToFilterBy={scriptureReferenceToFilterBy}
                  isDrawer={false}
                  dictionaryEntry={selectedEntry}
                  handleBackToListButton={handleOptionSelect}
                  onSelectOccurrence={onSelectOccurrence}
                />
              </div>
            ) : undefined;
          })()}
      </div>
    </div>
  );
}
