import { DrawerClose, Separator, ToggleGroup, ToggleGroupItem } from 'platform-bible-react';
import { ArrowLeft } from 'lucide-react';
import { Entry, Occurrence } from 'platform-lexical-tools';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { formatReplacementString, formatScrRef } from 'platform-bible-utils';
import {
  DICTIONARY_LOCALIZED_STRING_KEYS,
  getFormatGlossesStringFromDictionaryEntrySenses,
} from '../../utils/dictionary.util';
import { DomainsDisplay } from './domains-display.component';

/** Props for the DictionaryEntryDisplay component */
export type DictionaryEntryDisplayProps = {
  /** Dictionary entry object to display */
  dictionaryEntry: Entry;
};

/**
 * Renders a detailed view of a dictionary entry, displaying its key properties such as Hebrew text,
 * transliteration, Strong's number, part of speech, definition, and usage occurrences. Includes a
 * back button to navigate back to the list view.
 */
export function DictionaryEntryDisplay({ dictionaryEntry }: DictionaryEntryDisplayProps) {
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  const [selectedSenseId, setSelectedSenseId] = useState<string | undefined>();
  const [selectedSenseIndex, setSelectedSenseIndex] = useState<number | undefined>();

  // TODO: Show occurrences for chapter vs all with toggle
  // const [occurrenceView, setOccurrenceView] = useState<OccurrenceView>('chapter');

  const formattedGlosses = useMemo(
    () => getFormatGlossesStringFromDictionaryEntrySenses(dictionaryEntry),
    [dictionaryEntry],
  );

  const getOccurrencesLabel = useCallback(
    (senseIndex?: number) =>
      senseIndex
        ? formatReplacementString(
            localizedStrings['%platformLexicalTools_dictionary_occurrencesForSenseLabel%'],
            { index: senseIndex.toString() },
          )
        : localizedStrings['%platformLexicalTools_dictionary_allOccurrencesLabel%'],
    [localizedStrings],
  );

  const getEntryOrSenseOccurrences = useCallback(() => {
    const occurrences = selectedSenseId
      ? Object.values(dictionaryEntry.senses[selectedSenseId]?.occurrences ?? {})
          .flat()
          .filter((occurrence): occurrence is Occurrence => occurrence !== undefined)
      : Object.values(dictionaryEntry.senses)
          .filter((sense) => sense !== undefined)
          .flatMap((sense) =>
            Object.values(sense.occurrences ?? {})
              .flat()
              .filter((occurrence): occurrence is Occurrence => occurrence !== undefined),
          );

    // De-duplicate by verseRef (assuming verseRef is unique per occurrence)
    const seen = new Set<string>();
    return occurrences.filter((occurrence) => {
      const key = formatScrRef(occurrence.verseRef, 'English');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [dictionaryEntry.senses, selectedSenseId]);

  // Automatically select the only sense if there is exactly one
  useEffect(() => {
    const senses = Object.values(dictionaryEntry.senses).filter((sense) => sense !== undefined);
    if (senses.length === 1) {
      setSelectedSenseId(senses[0].id);
      setSelectedSenseIndex(1);
    }
  }, [dictionaryEntry.senses]);

  return (
    <div className="tw-p-4">
      <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
        <DrawerClose className="tw-flex tw-items-center">
          <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
          {localizedStrings['%platformLexicalTools_dictionary_backToList%']}
        </DrawerClose>
      </div>

      <div className="tw-mb-4">
        <div className="tw-flex tw-items-baseline tw-justify-between tw-gap-2">
          <span className="tw-flex tw-flex-row tw-items-baseline tw-gap-2">
            <span className="tw-text-2xl tw-font-bold">{dictionaryEntry.lemma}</span>
            <span className="tw-text-lg tw-text-muted-foreground">{formattedGlosses}</span>
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
          value={selectedSenseId}
          onValueChange={(value) => {
            setSelectedSenseId(value);
            const index = Object.values(dictionaryEntry.senses)
              .filter((sense) => sense !== undefined)
              .findIndex((sense) => sense.id === value);
            setSelectedSenseIndex(index + 1);
          }}
          className="tw-flex tw-flex-col tw-gap-3"
        >
          {Object.values(dictionaryEntry.senses)
            .filter((sense) => sense !== undefined)
            .map((sense, senseIndex) => (
              <ToggleGroupItem
                key={sense.id}
                value={sense.id}
                className="tw-flex tw-w-full tw-h-fit tw-flex-col tw-items-start tw-border tw-rounded-lg tw-shadow-sm tw-p-4 tw-bg-white tw-cursor-pointer data-[state=on]:tw-border-blue-500 data-[state=on]:tw-shadow-md tw-transition-colors"
              >
                <div className="tw-flex tw-items-baseline tw-gap-2">
                  <span className="tw-font-bold tw-text-blue-600">{senseIndex + 1}</span>
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
        <h3 className="tw-mb-1 tw-font-semibold">{getOccurrencesLabel(selectedSenseIndex)}</h3>
        <ul className="tw-list-inside tw-list-disc">
          {getEntryOrSenseOccurrences().map((occurrence: Occurrence) => (
            <li
              key={`${dictionaryEntry.id}-${formatScrRef(occurrence.verseRef, 'English')}`}
              className="tw-py-0.5 tw-text-sm"
            >
              {formatScrRef(occurrence.verseRef, 'English')}
            </li>
          ))}
        </ul>
      </div>

      {/* TODO: Show occurrences for chapter vs all with toggle */}
      {/* <div>
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
        <h3 className="tw-font-semibold">Occurrences:</h3>
        <div className="tw-flex tw-items-center tw-gap-2 tw-border tw-rounded-md">
        <button
          className={cn('tw-text-xs tw-px-3 tw-py-1 tw-rounded-l-md hover:tw-bg-gray-100', {
          'tw-bg-blue-100': occurrenceView === 'chapter',
          })}
          onClick={() => setOccurrenceView("chapter")}
        >
          chapter ({selectedEntry.usage.length})
        </button>
        <button
          className={cn('tw-text-xs tw-px-3 tw-py-1 tw-rounded-r-md hover:tw-bg-gray-100', {
          'tw-bg-blue-100': occurrenceView === "all"
          })}
          onClick={() => setOccurrenceView("all")}
        >
          all ({selectedEntry.allUsageCount})
        </button>
        </div>
      </div>
      <ul className="tw-list-disc tw-list-inside">
        {occurrenceView === "chapter" ? (
        selectedEntry.usage.map((reference, index) => (
          <li key={index} className="tw-text-sm tw-py-0.5">
          {reference}
          </li>
        ))
        ) : (
        <>
          {selectedEntry.allUsage.map((reference, index) => (
          <li key={index} className="tw-text-sm tw-py-0.5">
            {reference}
          </li>
          ))}
          {selectedEntry.allUsageCount > 100 && (
          <li className="tw-text-sm tw-py-2 tw-text-muted-foreground tw-italic">
            Note: This prototype only shows the first 100 occurrences of a word.
          </li>
          )}
        </>
        )}
      </ul>
      </div>
    </div> */}
    </div>
  );
}
