import {
  Button,
  cn,
  DrawerDescription,
  DrawerTitle,
  Separator,
  ToggleGroup,
  ToggleGroupItem,
  ListboxOption,
} from 'platform-bible-react';
import { ChevronUpIcon } from 'lucide-react';
import { Entry, Sense } from 'platform-lexical-tools';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatReplacementString, formatScrRef } from 'platform-bible-utils';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
  getDeduplicatedOccurrencesFromSenses,
  DictionaryOccurrenceView,
} from '../../utils/dictionary.utils';
import { DomainsDisplay } from './domains-display.component';
import { BackToListButton } from './back-to-list-button.component';

/** Props for the DictionaryEntryDisplay component */
export type DictionaryEntryDisplayProps = {
  /** Dictionary entry object to display */
  dictionaryEntry: Entry;
  /** Whether the display is in a drawer or just next to the list */
  isDrawer: boolean;
  /** Callback function to handle back button click, returning to the list view */
  handleBackToListButton?: (option: ListboxOption) => void;
  /** Scripture reference to filter occurrences by */
  scriptureReferenceToFilterBy?: SerializedVerseRef;
  /** Callback function to handle occurrence selection */
  onSelectOccurrence: (scrRefOfOccurrence: SerializedVerseRef) => void;
  /** Callback function to handle scroll to top */
  onClickScrollToTop: () => void;
};

/**
 * Renders a detailed view of a dictionary entry, displaying its key properties such as Hebrew text,
 * transliteration, Strong's number, part of speech, definition, and usage occurrences. Includes a
 * back button to navigate back to the list view.
 */
export function DictionaryEntryDisplay({
  dictionaryEntry,
  isDrawer,
  handleBackToListButton,
  scriptureReferenceToFilterBy,
  onSelectOccurrence,
  onClickScrollToTop,
}: DictionaryEntryDisplayProps) {
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  const [selectedSense, setSelectedSense] = useState<Sense | undefined>();
  const [selectedSenseIndex, setSelectedSenseIndex] = useState<number | undefined>();
  const [occurrenceView, setOccurrenceView] = useState<DictionaryOccurrenceView>('chapter');

  const formattedGlosses = useMemo(
    () =>
      getFormatGlossesStringFromDictionaryEntrySenses(
        dictionaryEntry,
        scriptureReferenceToFilterBy,
      ),
    [dictionaryEntry, scriptureReferenceToFilterBy],
  );

  const occurrencesLabel = useMemo(
    () =>
      selectedSenseIndex
        ? formatReplacementString(
            localizedStrings['%platformLexicalTools_dictionary_occurrencesForSenseLabel%'],
            { index: selectedSenseIndex.toString() },
          )
        : localizedStrings['%platformLexicalTools_dictionary_allOccurrencesLabel%'],
    [localizedStrings, selectedSenseIndex],
  );

  const sensesFilteredByScrRef = useMemo(() => {
    const result: { [uniqueSenseId: string]: Sense[] } = {};
    Object.values(dictionaryEntry.senses)
      .filter((sense) => {
        if (!sense?.occurrences) return false;
        if (
          scriptureReferenceToFilterBy &&
          !Object.values(sense.occurrences).some((occurrences) =>
            occurrences?.some(
              (occurrence) =>
                occurrence.verseRef.book === scriptureReferenceToFilterBy.book &&
                occurrence.verseRef.chapterNum === scriptureReferenceToFilterBy.chapterNum,
            ),
          )
        ) {
          return false;
        }
        return true;
      })
      .forEach((sense) => {
        if (!sense) return;
        const key = `${sense.lexicalReferenceTextId}-sense-${sense.id}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(sense);
      });
    return result;
  }, [dictionaryEntry.senses, scriptureReferenceToFilterBy]);

  const deduplicatedOccurrences = useMemo(() => {
    return selectedSense
      ? getDeduplicatedOccurrencesFromSenses(
          [selectedSense],
          occurrenceView === 'chapter' ? scriptureReferenceToFilterBy : undefined,
        )
      : getDeduplicatedOccurrencesFromSenses(
          Object.values(sensesFilteredByScrRef).flat(),
          occurrenceView === 'chapter' ? scriptureReferenceToFilterBy : undefined,
        );
  }, [selectedSense, occurrenceView, scriptureReferenceToFilterBy, sensesFilteredByScrRef]);

  // Cannot use Drawer components when there is no Drawer, if the screen is considered wide it will render Button and span here.
  const TitleComponent = isDrawer ? DrawerTitle : 'span';
  const DescriptionComponent = isDrawer ? DrawerDescription : 'span';

  // Automatically select the only sense if there is exactly one; otherwise clear selection
  useEffect(() => {
    const sensesFlat = Object.values(sensesFilteredByScrRef).flat();
    if (sensesFlat.length === 1) {
      setSelectedSense(sensesFlat[0]);
      setSelectedSenseIndex(1);
    } else {
      setSelectedSense(undefined);
      setSelectedSenseIndex(undefined);
    }
  }, [sensesFilteredByScrRef, dictionaryEntry]);

  const getOccurrenceCountsFromSenses = useCallback(
    (localOccurrenceView: DictionaryOccurrenceView) => {
      const senses = Object.values(sensesFilteredByScrRef).flat();

      return selectedSense
        ? getDeduplicatedOccurrencesFromSenses(
            [selectedSense],
            localOccurrenceView === 'chapter' ? scriptureReferenceToFilterBy : undefined,
          ).length
        : getDeduplicatedOccurrencesFromSenses(
            senses,
            localOccurrenceView === 'chapter' ? scriptureReferenceToFilterBy : undefined,
          ).length;
    },
    [scriptureReferenceToFilterBy, selectedSense, sensesFilteredByScrRef],
  );

  return (
    <>
      <BackToListButton
        dictionaryEntry={dictionaryEntry}
        isDrawer={isDrawer}
        localizedStrings={localizedStrings}
        handleBackToListButton={handleBackToListButton}
      />
      <div className="tw-mb-4">
        <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-2">
          <span className="tw-flex tw-flex-row tw-items-baseline tw-gap-2">
            <TitleComponent className="tw-text-2xl tw-font-normal scripture-font">
              {dictionaryEntry.lemma}
            </TitleComponent>
            <DescriptionComponent className="tw-text-lg tw-text-muted-foreground">
              {formattedGlosses}
            </DescriptionComponent>
          </span>
          <ul className="tw-flex tw-flex-row tw-gap-1">
            {dictionaryEntry.strongsCodes.map((strongsCode) => (
              <li
                key={strongsCode}
                className="tw-ml-auto tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-sm tw-accent-foreground"
              >
                {strongsCode}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className="tw-my-3" />

      <div className="tw-mb-4">
        <h3 className="tw-mb-1 tw-font-semibold">
          {localizedStrings['%platformLexicalTools_dictionary_sensesLabel%']}
        </h3>
        <ToggleGroup
          type="single"
          value={
            selectedSense ? `${selectedSense.lexicalReferenceTextId}-sense-${selectedSense.id}` : ''
          }
          onValueChange={(value) => {
            const sensesFlat = Object.values(sensesFilteredByScrRef).flat();
            const index = sensesFlat.findIndex(
              (sense) => `${sense.lexicalReferenceTextId}-sense-${sense.id}` === value,
            );
            setSelectedSenseIndex(index >= 0 ? index + 1 : undefined);
            setSelectedSense(index >= 0 ? sensesFlat[index] : undefined);
          }}
          className="tw-flex tw-flex-col tw-gap-3"
        >
          {Object.values(sensesFilteredByScrRef)
            .flat()
            .filter((sense) => sense !== undefined)
            .map((sense, senseIndex) => (
              <ToggleGroupItem
                key={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                value={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                className="tw-flex tw-w-full tw-h-fit tw-flex-col tw-items-start tw-border tw-rounded-lg tw-shadow-sm tw-p-4 tw-cursor-pointer data-[state=on]:tw-border-accent data-[state=on]:tw-shadow-md tw-transition-colors"
              >
                <div className="tw-flex tw-items-baseline tw-gap-2">
                  <span className="tw-font-bold tw-text-accent-foreground">{senseIndex + 1}</span>
                  <span className="tw-text-base">{sense.glosses.join(', ')}</span>
                </div>
                {sense.definition && (
                  <div className="tw-mt-1 tw-max-w-lg tw-text-start tw-text-sm tw-text-muted-foreground">
                    {sense.definition}
                  </div>
                )}
                <DomainsDisplay
                  domains={sense.domains}
                  domainText={
                    localizedStrings['%platformLexicalTools_dictionary_domainTaxonomyLabel%']
                  }
                />
              </ToggleGroupItem>
            ))}
        </ToggleGroup>
      </div>
      <div>
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
          <h3 className="tw-font-semibold">{occurrencesLabel}</h3>

          <div className="tw-flex tw-items-center tw-gap-2 tw-border tw-rounded-md">
            <button
              type="button"
              className={cn(
                'tw-text-xs tw-px-3 tw-py-1 tw-rounded-s-md',
                { 'tw-bg-accent': occurrenceView === 'chapter' },
                { 'hover:tw-bg-accent': occurrenceView !== 'chapter' },
              )}
              onClick={() => setOccurrenceView('chapter')}
            >
              {localizedStrings['%platformLexicalTools_dictionary_occurrencesToggleChapter%']} (
              {getOccurrenceCountsFromSenses('chapter')})
            </button>
            <button
              type="button"
              className={cn(
                'tw-text-xs tw-px-3 tw-py-1 tw-rounded-e-md',
                { 'tw-bg-accent': occurrenceView === 'all' },
                { 'hover:tw-bg-accent': occurrenceView !== 'all' },
              )}
              onClick={() => setOccurrenceView('all')}
            >
              {localizedStrings['%platformLexicalTools_dictionary_occurrencesToggleAll%']} (
              {getOccurrenceCountsFromSenses('all')})
            </button>
          </div>
        </div>
        <ul className="tw-list-disc tw-list-inside">
          {deduplicatedOccurrences.map((occurrence) => (
            <li
              key={`${occurrence.wordNum}-${formatScrRef(occurrence.verseRef, 'English')}`}
              className="tw-py-0.5"
            >
              <Button
                variant="link"
                className="tw-p-0 tw-h-auto"
                onClick={() => onSelectOccurrence(occurrence.verseRef)}
              >
                {formatScrRef(occurrence.verseRef, 'English')}
              </Button>
            </li>
          ))}
        </ul>
        {dictionaryEntry.lexicalReferenceTextId === 'SDBH' && (
          <div className="tw-max-w-xs tw-pt-3 tw-mt-auto">
            <p className="tw-text-xs tw-text-muted-foreground">
              {localizedStrings['%platformLexicalTools_dictionary_sdbhCopyright%']}
            </p>
          </div>
        )}
        {dictionaryEntry.lexicalReferenceTextId === 'SDBG' && (
          <div className="tw-max-w-xs tw-pt-3 tw-mt-auto">
            <p className="tw-text-xs tw-text-muted-foreground">
              {localizedStrings['%platformLexicalTools_dictionary_sdbgCopyright%']}
            </p>
          </div>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="tw-fixed tw-bottom-4 tw-right-4 tw-z-20"
          onClick={onClickScrollToTop}
        >
          <ChevronUpIcon />
        </Button>
      </div>
    </>
  );
}
