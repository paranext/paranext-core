import { Entry } from 'platform-lexical-tools';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  VisuallyHidden,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { useListbox } from '../../utils/listbox-keyboard-navigation.util';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
  getOccurrencesCountFromDictionaryEntrySenses,
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

  const options = dictionaryData.map((entry) => ({
    id: `entry-${entry.id}`,
    label: entry.lemma,
  }));

  const { listboxRef, activeId, handleKeyDown, selectedId } = useListbox({
    options,
    onOptionSelect: (option) => {
      const el = document.getElementById(option.id);
      if (el) {
        el.click();
      }
    },
  });

  return (
    <ul
      id="dictionary-list"
      role="listbox"
      tabIndex={0}
      ref={listboxRef}
      aria-activedescendant={activeId ?? undefined}
      className="tw-p-2 tw-flex tw-flex-col tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
      onKeyDown={handleKeyDown}
    >
      {dictionaryData.map((entry) => {
        const entryId = `entry-${entry.id}`;
        const isSelected = selectedId === entryId;

        return (
          <div key={entryId}>
            {/* TODO: Drawer dismissible or not? */}
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <li
                  role="option"
                  aria-selected={isSelected}
                  id={entryId}
                  className="tw-flex tw-flex-col tw-p-2 hover:tw-bg-muted tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background"
                  tabIndex={-1} // Removes ability to tab through each list item
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
              <DrawerContent className="tw-max-w-none tw-ml-0 md:tw-left-6 lg:tw-left-10 xl:tw-left-14">
                {/* TODO: Fix text or turn lemma and glosses into title and description in DictionaryEntryDisplay */}
                <VisuallyHidden>
                  <DrawerTitle>{`Dictionary Entry ${entry.lemma}`}</DrawerTitle>
                  <DrawerDescription>{`Dictionary Entry ${entry.lemma}`}</DrawerDescription>
                </VisuallyHidden>
                <DictionaryEntryDisplay dictionaryEntry={entry} />
              </DrawerContent>
            </Drawer>
            <Separator />
          </div>
        );
      })}
    </ul>
  );
}
