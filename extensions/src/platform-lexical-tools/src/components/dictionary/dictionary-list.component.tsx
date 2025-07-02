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
import { useState } from 'react';
import { ListboxOption, useListbox } from '../../utils/listbox-keyboard-navigation.util';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
  getOccurrencesCountFromDictionaryEntrySenses,
  useIsWideScreen,
} from '../../utils/dictionary.util';

/** Props for the DictionaryList component */
export type DictionaryListBoxProps = {
  /** Array of dictionary entries */
  dictionaryData: Entry[];
};

/**
 * A list of dictionary entries.
 *
 * This component renders a listbox of dictionary entries.Each list item contains the lemma of the
 * dictionary entry, the number of occurrences in the chapter, and a list of Strong's codes. The
 * component also renders a drawer to the right of the list item that contains a detailed view of
 * the dictionary entry.
 *
 * The component uses the `useListbox` hook from the `listbox-keyboard-navigation.util` module to
 * handle keyboard navigation of the list.
 */
export function DictionaryList({ dictionaryData }: DictionaryListBoxProps) {
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
  });

  return (
    <div className={cn({ 'tw-flex': isWideScreen }, 'tw-absolute tw-inset-0 tw-overflow-hidden')}>
      <div
        className={cn(
          {
            'tw-w-1/2': isWideScreen && selectedEntryId,
            'tw-w-full': !selectedEntryId || !isWideScreen,
          },
          'tw-h-full tw-pt-20',
        )}
      >
        <ul
          id="dictionary-list"
          role="listbox"
          tabIndex={0}
          ref={listboxRef}
          aria-activedescendant={activeId ?? undefined}
          className="tw-h-full tw-overflow-y-auto tw-px-2 tw-pb-2 tw-pt-1 tw-flex tw-flex-col tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
          onKeyDown={handleKeyDown}
        >
          {dictionaryData.map((entry) => {
            const entryId = `${entry.lexicalReferenceTextId}-entry-${entry.id}`;
            const isSelected = selectedEntryId === entryId;

            return (
              <div key={entryId}>
                {isWideScreen ? (
                  <>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                    <li
                      role="option"
                      aria-selected={isSelected}
                      id={entryId}
                      onClick={() => setSelectedEntryId(entryId)}
                      // onKeyDown={handleKeyDown}
                      className="tw-flex tw-flex-col tw-p-2 hover:tw-bg-muted tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
                      tabIndex={-1}
                    >
                      <div className="tw-flex tw-items-baseline tw-gap-2">
                        <span className="tw-text-sm">{entry.lemma}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="tw-text-xs tw-bg-accent tw-px-1.5 tw-py-0.5 tw-rounded tw-ml-1 tw-cursor-help">
                                {getOccurrencesCountFromDictionaryEntrySenses(entry)}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {
                                  localizedStrings[
                                    '%platformLexicalTools_dictionary_occurrencesInChapterLabel%'
                                  ]
                                }
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <div className="tw-flex tw-items-center tw-gap-2 tw-mt-0.5">
                        <p className="tw-text-sm tw-text-muted-foreground tw-truncate">
                          {getFormatGlossesStringFromDictionaryEntrySenses(entry)}
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
                                <p>
                                  {
                                    localizedStrings[
                                      '%platformLexicalTools_dictionary_strongsCodeLabel%'
                                    ]
                                  }
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </li>
                  </>
                ) : (
                  <Drawer direction="right">
                    <DrawerTrigger asChild>
                      <li
                        role="option"
                        aria-selected={isSelected}
                        id={entryId}
                        className="tw-flex tw-flex-col tw-p-2 hover:tw-bg-muted tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
                        tabIndex={-1}
                      >
                        <div className="tw-flex tw-items-baseline tw-gap-2">
                          <span className="tw-text-sm">{entry.lemma}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="tw-text-xs tw-bg-accent tw-px-1.5 tw-py-0.5 tw-rounded tw-ml-1 tw-cursor-help">
                                  {getOccurrencesCountFromDictionaryEntrySenses(entry)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {
                                    localizedStrings[
                                      '%platformLexicalTools_dictionary_occurrencesInChapterLabel%'
                                    ]
                                  }
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <div className="tw-flex tw-items-center tw-gap-2 tw-mt-0.5">
                          <p className="tw-text-sm tw-text-muted-foreground tw-truncate">
                            {getFormatGlossesStringFromDictionaryEntrySenses(entry)}
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
                                  <p>
                                    {
                                      localizedStrings[
                                        '%platformLexicalTools_dictionary_strongsCodeLabel%'
                                      ]
                                    }
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </li>
                    </DrawerTrigger>
                    <DrawerContent className="tw-max-w-lg">
                      <DictionaryEntryDisplay
                        isDrawer
                        dictionaryEntry={entry}
                        handleBackToListButton={handleOptionSelect}
                      />
                    </DrawerContent>
                  </Drawer>
                )}
                <Separator />
              </div>
            );
          })}
        </ul>
      </div>

      {/* details pane */}
      {isWideScreen &&
        selectedEntryId &&
        (() => {
          const selectedEntry = dictionaryData.find(
            (entry) => `${entry.lexicalReferenceTextId}-entry-${entry.id}` === selectedEntryId,
          );
          return selectedEntry ? (
            <DictionaryEntryDisplay
              isDrawer={false}
              dictionaryEntry={selectedEntry}
              handleBackToListButton={handleOptionSelect}
            />
          ) : undefined;
        })()}
    </div>
  );
}
