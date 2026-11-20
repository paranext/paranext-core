import { Entry } from 'platform-lexical-tools';
import {
  cn,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  useListbox,
  type ListboxOption,
} from 'platform-bible-react';
import { Dispatch, RefObject, SetStateAction, useCallback, useRef } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { LanguageStrings } from 'platform-bible-utils';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';
import { useIsWideScreen, useScopeReference } from '../../utils/dictionary-ui.utils';
import { DictionaryOccurrenceView, DictionaryScope } from '../../utils/dictionary.utils';
import { DictionaryListItem } from './dictionary-list-item.component';
import { EntryLinkClickHandler } from './definition-text.component';

function getEntryId(entry: Entry): string {
  return `${entry.lexicalReferenceTextId}-entry-${entry.id}`;
}

/** Props for the DictionaryList component */
type DictionaryListProps = {
  /** Localized strings for the dictionary; resolve via `DICTIONARY_LOCALIZED_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
  /** Array of dictionary entries */
  dictionaryData: Entry[];
  /** Scripture reference to filter the dictionary entries by */
  scriptureReferenceToFilterBy: SerializedVerseRef;
  /** The current scope (chapter or verse) */
  scope: DictionaryScope;
  /** The currently selected entry (controlled) */
  selectedEntry: Entry | undefined;
  /** Callback function to handle occurrence selection */
  onSelectOccurrence: (scrRefOfOccurrence: SerializedVerseRef) => void;
  /** Callback function to handle character press */
  onCharacterPress?: (char: string) => void;
  /** Callback fired when the selected entry changes */
  onEntrySelected: (entry: Entry | undefined) => void;
  /**
   * Full (unfiltered) entry data for the currently selected entry. Used for displaying all
   * occurrences and such info in the entire Scripture for this entry, not just the occurrences that
   * match the current verse/chapter filter. This is optional because it requires an additional data
   * fetch, so if it's not provided, the entry details view will just use the filtered data for the
   * selected entry instead of the full data, without numbering its senses.
   */
  fullSelectedEntry?: Entry;
  /** Whether the selected entry's senses that do not occur in scope are hidden */
  areLessRelevantSensesHidden: boolean;
  /** Called when the reader hides or shows the less-relevant senses */
  onAreLessRelevantSensesHiddenChange: (areLessRelevantSensesHidden: boolean) => void;
  /** Whether the selected entry's occurrences are listed for the chapter or all of them */
  occurrenceView: DictionaryOccurrenceView;
  /** Called when the reader switches between the chapter's occurrences and all of them */
  onOccurrenceViewChange: (occurrenceView: DictionaryOccurrenceView) => void;
  /** The ID of the selected entry's selected sense, if any */
  selectedSenseId: string | undefined;
  /** Sets the selected sense; like a state setter, it takes the new ID or a function of it */
  onSelectedSenseIdChange: Dispatch<SetStateAction<string | undefined>>;
  /** Callback function to open an entry linked from a definition */
  onEntryLinkClick?: EntryLinkClickHandler;
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
  localizedStrings,
  dictionaryData,
  scriptureReferenceToFilterBy,
  scope,
  selectedEntry,
  onSelectOccurrence,
  onCharacterPress,
  onEntrySelected,
  fullSelectedEntry,
  areLessRelevantSensesHidden,
  onAreLessRelevantSensesHiddenChange,
  occurrenceView,
  onOccurrenceViewChange,
  selectedSenseId,
  onSelectedSenseIdChange,
  onEntryLinkClick,
}: DictionaryListProps) {
  const isWideScreen = useIsWideScreen();

  const selectedEntryId = selectedEntry ? getEntryId(selectedEntry) : undefined;

  const options: ListboxOption[] = dictionaryData.map((entry) => ({
    id: getEntryId(entry),
  }));

  const handleOptionSelect = (option: ListboxOption) => {
    const clickedEntry = dictionaryData.find((e) => getEntryId(e) === option.id);
    onEntrySelected(selectedEntryId === option.id ? undefined : clickedEntry);
  };

  // A click handler and reference that only change when they matter, so the memoized list items
  // are left alone by a verse move within the chapter
  const handleItemClick = useCallback(
    (entry: Entry) => onEntrySelected(selectedEntryId === getEntryId(entry) ? undefined : entry),
    [onEntrySelected, selectedEntryId],
  );
  const scopeReference = useScopeReference(scriptureReferenceToFilterBy, scope);

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
    <div className="tw:flex tw:flex-row tw:flex-1 tw:overflow-hidden">
      <div
        className={cn('tw:overflow-y-auto tw:px-2 tw:py-2', {
          'tw:w-1/2': isWideScreen && selectedEntryId,
          'tw:w-full': !isWideScreen || !selectedEntryId,
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
          className="tw:outline-hidden tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background"
          onKeyDown={handleKeyDown}
        >
          {dictionaryData.map((entry) => {
            const entryId = getEntryId(entry);
            const isSelected = selectedEntryId === entryId;
            return (
              <div key={entryId}>
                <DictionaryListItem
                  entry={entry}
                  isSelected={isSelected}
                  localizedStrings={localizedStrings}
                  scrRef={scopeReference}
                  scope={scope}
                  onClick={handleItemClick}
                />
              </div>
            );
          })}
        </ul>
      </div>
      {selectedEntry &&
        (isWideScreen ? (
          <div ref={dictionaryEntryRef} className="tw:w-1/2 tw:overflow-y-auto tw:p-4">
            <DictionaryEntryDisplay
              localizedStrings={localizedStrings}
              scriptureReferenceToFilterBy={scriptureReferenceToFilterBy}
              scope={scope}
              isDrawer={false}
              dictionaryEntry={fullSelectedEntry ?? selectedEntry}
              hasAllSenses={!!fullSelectedEntry}
              areLessRelevantSensesHidden={areLessRelevantSensesHidden}
              onAreLessRelevantSensesHiddenChange={onAreLessRelevantSensesHiddenChange}
              occurrenceView={occurrenceView}
              onOccurrenceViewChange={onOccurrenceViewChange}
              selectedSenseId={selectedSenseId}
              onSelectedSenseIdChange={onSelectedSenseIdChange}
              handleBackToListButton={handleOptionSelect}
              onSelectOccurrence={onSelectOccurrence}
              onClickScrollToTop={scrollToTop}
              onEntryLinkClick={onEntryLinkClick}
            />
          </div>
        ) : (
          // The Drawer is the entry pane's narrow layout, so its project text zooms like the wide
          // layout's; menus and tooltips still keep interface size.
          <Drawer
            direction="right"
            open={selectedEntry !== undefined}
            onOpenChange={() => onEntrySelected(undefined)}
          >
            <DrawerTrigger asChild>
              <div />
            </DrawerTrigger>
            <DrawerContent hideDrawerHandle className="tw:max-w-xl">
              <div ref={dictionaryEntryRef} className="tw:overflow-y-auto tw:p-4">
                <DictionaryEntryDisplay
                  localizedStrings={localizedStrings}
                  scriptureReferenceToFilterBy={scriptureReferenceToFilterBy}
                  scope={scope}
                  isDrawer
                  dictionaryEntry={fullSelectedEntry ?? selectedEntry}
                  hasAllSenses={!!fullSelectedEntry}
                  areLessRelevantSensesHidden={areLessRelevantSensesHidden}
                  onAreLessRelevantSensesHiddenChange={onAreLessRelevantSensesHiddenChange}
                  occurrenceView={occurrenceView}
                  onOccurrenceViewChange={onOccurrenceViewChange}
                  selectedSenseId={selectedSenseId}
                  onSelectedSenseIdChange={onSelectedSenseIdChange}
                  handleBackToListButton={() => onEntrySelected(undefined)}
                  onSelectOccurrence={onSelectOccurrence}
                  onClickScrollToTop={scrollToTop}
                  onEntryLinkClick={onEntryLinkClick}
                />
              </div>
            </DrawerContent>
          </Drawer>
        ))}
    </div>
  );
}
