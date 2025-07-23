import { Entry } from 'platform-lexical-tools';
import {
  cn,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  useListbox,
  type ListboxOption,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useState, useEffect, RefObject, useMemo, useRef } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';
import { DICTIONARY_LOCALIZED_STRING_KEYS, useIsWideScreen } from '../../utils/dictionary.utils';
import { DictionaryListItem } from './dictionary-list-item.component';

/** Props for the DictionaryList component */
type DictionaryListProps = {
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
}: DictionaryListProps) {
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  const isWideScreen = useIsWideScreen();
  const [selectedEntryId, setSelectedEntryId] = useState<string | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  useEffect(() => {
    if (selectedEntryId && !isWideScreen) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  }, [selectedEntryId, isWideScreen]);

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
                  localizedStrings={localizedStrings}
                  scrRef={scriptureReferenceToFilterBy}
                  onClick={() => setSelectedEntryId(entryId)}
                />
              </div>
            );
          })}
        </ul>
      </div>
      {selectedEntryId &&
        selectedEntry &&
        (isWideScreen ? (
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
        ) : (
          <Drawer
            direction="right"
            dismissible={false}
            open={drawerOpen}
            onOpenChange={() => setSelectedEntryId(undefined)}
          >
            <DrawerTrigger asChild>
              <div />
            </DrawerTrigger>
            <DrawerContent hideDrawerHandle className="tw-max-w-xl">
              <div ref={dictionaryEntryRef} className="tw-overflow-y-auto tw-p-4">
                <DictionaryEntryDisplay
                  scriptureReferenceToFilterBy={scriptureReferenceToFilterBy}
                  isDrawer
                  dictionaryEntry={selectedEntry}
                  handleBackToListButton={() => setSelectedEntryId(undefined)}
                  onSelectOccurrence={onSelectOccurrence}
                  onClickScrollToTop={scrollToTop}
                />
              </div>
            </DrawerContent>
          </Drawer>
        ))}
    </div>
  );
}
