import {
  Button,
  cn,
  ContentZoomRoot,
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
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatReplacementString, formatScrRef, LanguageStrings } from 'platform-bible-utils';
import {
  getFormatGlossesStringFromDictionaryEntrySenses,
  getDeduplicatedOccurrencesFromSenses,
  DictionaryOccurrenceView,
} from '../../utils/dictionary.utils';
import { collapseToLexicalSenses } from '../../utils/lexical-senses.utils';
import { DefinitionText, EntryLinkClickHandler } from './definition-text.component';
import { DomainsDisplay } from './domains-display.component';
import { BackToListButton } from './back-to-list-button.component';

/** Props for the DictionaryEntryDisplay component */
export type DictionaryEntryDisplayProps = {
  /** Localized strings for the dictionary; resolve via `DICTIONARY_LOCALIZED_STRING_KEYS`. */
  localizedStrings: LanguageStrings;
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
  /** Callback function to open an entry linked from a definition */
  onEntryLinkClick?: EntryLinkClickHandler;
};

/**
 * Renders a detailed view of a dictionary entry, displaying its key properties such as Hebrew text,
 * transliteration, Strong's number, part of speech, definition, and usage occurrences. Includes a
 * back button to navigate back to the list view.
 */
export function DictionaryEntryDisplay({
  localizedStrings,
  dictionaryEntry,
  isDrawer,
  handleBackToListButton,
  scriptureReferenceToFilterBy,
  onSelectOccurrence,
  onClickScrollToTop,
  onEntryLinkClick,
}: DictionaryEntryDisplayProps) {
  const [selectedSense, setSelectedSense] = useState<Sense | undefined>();
  const [selectedSenseIndex, setSelectedSenseIndex] = useState<number | undefined>();
  const [occurrenceView, setOccurrenceView] = useState<DictionaryOccurrenceView>('chapter');

  const lexicalEntry = useMemo(() => collapseToLexicalSenses(dictionaryEntry), [dictionaryEntry]);

  const formattedGlosses = useMemo(
    () =>
      getFormatGlossesStringFromDictionaryEntrySenses(lexicalEntry, scriptureReferenceToFilterBy),
    [lexicalEntry, scriptureReferenceToFilterBy],
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

  /** Every sense of the entry, in order; a sense's number is its position here */
  const allSenses = useMemo(
    () => Object.values(lexicalEntry.senses).filter((sense) => sense !== undefined),
    [lexicalEntry.senses],
  );

  const isSenseInChapter = useCallback(
    (sense: Sense) =>
      !scriptureReferenceToFilterBy ||
      Object.values(sense.occurrences ?? {}).some((occurrences) =>
        occurrences?.some(
          (occurrence) =>
            occurrence.verseRef.book === scriptureReferenceToFilterBy.book &&
            occurrence.verseRef.chapterNum === scriptureReferenceToFilterBy.chapterNum,
        ),
      ),
    [scriptureReferenceToFilterBy],
  );

  // Like Paratext 9, senses that do not occur in the chapter are listed but dimmed, and can be hidden
  const [areLessRelevantSensesHidden, setAreLessRelevantSensesHidden] = useState(false);
  const lessRelevantSenseCount = allSenses.filter((sense) => !isSenseInChapter(sense)).length;
  const getSenseNumber = (sense: Sense) => allSenses.indexOf(sense) + 1;

  const sensesFilteredByScrRef = useMemo(() => {
    const result: { [uniqueSenseId: string]: Sense[] } = {};
    allSenses
      .filter((sense) => sense.occurrences && isSenseInChapter(sense))
      .forEach((sense) => {
        if (!sense) return;
        const key = `${sense.lexicalReferenceTextId}-sense-${sense.id}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(sense);
      });
    return result;
  }, [allSenses, isSenseInChapter]);

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
      setSelectedSenseIndex(allSenses.indexOf(sensesFlat[0]) + 1);
    } else {
      setSelectedSense(undefined);
      setSelectedSenseIndex(undefined);
    }
  }, [sensesFilteredByScrRef, allSenses, dictionaryEntry]);

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
      <div className="tw:mb-4">
        <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-2">
          <span className="tw:flex tw:flex-row tw:items-baseline tw:gap-2">
            <TitleComponent className="tw:text-2xl tw:font-normal scripture-font">
              <ContentZoomRoot as="span">{dictionaryEntry.lemma}</ContentZoomRoot>
            </TitleComponent>
            <DescriptionComponent className="tw:text-lg tw:text-muted-foreground">
              <ContentZoomRoot as="span">{formattedGlosses}</ContentZoomRoot>
            </DescriptionComponent>
          </span>
          {/* Many Strong's codes wrap within this list, staying beside the lemma, rather than
              pushing the header wider than a narrow pane. */}
          <ul className="tw:flex tw:flex-row tw:flex-wrap tw:justify-end tw:gap-1">
            {dictionaryEntry.strongsCodes.map((strongsCode) => (
              <li
                key={strongsCode}
                className="tw:ml-auto tw:rounded tw:bg-accent tw:px-2 tw:py-0.5 tw:text-sm tw:text-accent-foreground"
              >
                {strongsCode}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className="tw:my-3" />

      <div className="tw:mb-4">
        <div className="tw:mb-1 tw:flex tw:items-baseline tw:justify-between tw:gap-2">
          <h3 className="tw:font-semibold">
            {localizedStrings['%platformLexicalTools_dictionary_sensesLabel%']}
          </h3>
          {lessRelevantSenseCount > 0 && (
            <Button
              variant="link"
              className="tw:h-auto tw:p-0 tw:text-xs"
              aria-expanded={!areLessRelevantSensesHidden}
              onClick={() => {
                // A sense that is about to be hidden can no longer be deselected, so deselect it now
                if (
                  !areLessRelevantSensesHidden &&
                  selectedSense &&
                  !isSenseInChapter(selectedSense)
                ) {
                  setSelectedSense(undefined);
                  setSelectedSenseIndex(undefined);
                }
                setAreLessRelevantSensesHidden(!areLessRelevantSensesHidden);
              }}
            >
              {formatReplacementString(
                localizedStrings[
                  areLessRelevantSensesHidden
                    ? '%platformLexicalTools_dictionary_showLessRelevantSenses%'
                    : '%platformLexicalTools_dictionary_hideLessRelevantSenses%'
                ],
                { count: lessRelevantSenseCount.toString() },
              )}
            </Button>
          )}
        </div>
        {/* Each sense's glosses and definition zoom with the pane; the sense card, its number and
            its domains keep interface size. The toggle primitives default to `w-fit` and
            `whitespace-nowrap`, which would size each card to its longest line and push a long
            definition past the pane's edge, so the group fills the pane and the cards wrap. Each
            card is a button, so its wrapped lines would center unless aligned to the start. */}
        <ToggleGroup
          type="single"
          value={
            selectedSense ? `${selectedSense.lexicalReferenceTextId}-sense-${selectedSense.id}` : ''
          }
          onValueChange={(value) => {
            const index = allSenses.findIndex(
              (sense) => `${sense.lexicalReferenceTextId}-sense-${sense.id}` === value,
            );
            setSelectedSenseIndex(index >= 0 ? index + 1 : undefined);
            setSelectedSense(index >= 0 ? allSenses[index] : undefined);
          }}
          className="tw:flex tw:w-full tw:flex-col tw:gap-3"
        >
          {allSenses
            .filter((sense) => !areLessRelevantSensesHidden || isSenseInChapter(sense))
            .map((sense) => (
              <ToggleGroupItem
                key={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                value={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                data-less-relevant={!isSenseInChapter(sense)}
                className="tw:flex tw:w-full tw:h-fit tw:flex-col tw:items-start tw:whitespace-normal tw:text-start tw:border tw:rounded-lg tw:shadow-sm tw:p-4 tw:cursor-pointer tw:data-[state=on]:border-accent tw:data-[state=on]:shadow-md tw:transition-colors tw:data-[less-relevant=true]:opacity-60"
              >
                <div className="tw:flex tw:items-baseline tw:gap-2">
                  <span className="tw:font-bold tw:text-accent-foreground">
                    {getSenseNumber(sense)}
                  </span>
                  <ContentZoomRoot as="span" className="tw:text-base">
                    {sense.glosses.join(', ')}
                  </ContentZoomRoot>
                </div>
                {sense.definition && (
                  <ContentZoomRoot
                    as="div"
                    className="tw:mt-1 tw:max-w-lg tw:text-start tw:text-sm tw:text-muted-foreground"
                  >
                    <DefinitionText
                      definition={sense.definition}
                      onEntryLinkClick={onEntryLinkClick}
                    />
                  </ContentZoomRoot>
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
        <div className="tw:flex tw:items-center tw:justify-between tw:mb-2">
          <h3 className="tw:font-semibold">{occurrencesLabel}</h3>

          <div className="tw:flex tw:items-center tw:gap-2 tw:border tw:rounded-md">
            <button
              type="button"
              className={cn(
                'tw:text-xs tw:px-3 tw:py-1 tw:rounded-s-md',
                { 'tw:bg-accent': occurrenceView === 'chapter' },
                { 'tw:hover:bg-accent': occurrenceView !== 'chapter' },
              )}
              onClick={() => setOccurrenceView('chapter')}
            >
              {localizedStrings['%platformLexicalTools_dictionary_occurrencesToggleChapter%']} (
              {getOccurrenceCountsFromSenses('chapter')})
            </button>
            <button
              type="button"
              className={cn(
                'tw:text-xs tw:px-3 tw:py-1 tw:rounded-e-md',
                { 'tw:bg-accent': occurrenceView === 'all' },
                { 'tw:hover:bg-accent': occurrenceView !== 'all' },
              )}
              onClick={() => setOccurrenceView('all')}
            >
              {localizedStrings['%platformLexicalTools_dictionary_occurrencesToggleAll%']} (
              {getOccurrenceCountsFromSenses('all')})
            </button>
          </div>
        </div>
        <ul className="tw:list-disc tw:list-inside">
          {deduplicatedOccurrences.map((occurrence) => (
            <li
              key={`${occurrence.wordNum}-${formatScrRef(occurrence.verseRef, 'English')}`}
              className="tw:py-0.5"
            >
              <Button
                variant="link"
                className="tw:p-0 tw:h-auto"
                onClick={() => onSelectOccurrence(occurrence.verseRef)}
              >
                {formatScrRef(occurrence.verseRef, 'English')}
              </Button>
            </li>
          ))}
        </ul>
        {dictionaryEntry.lexicalReferenceTextId === 'SDBH' && (
          <div className="tw:max-w-xs tw:pt-3 tw:mt-auto">
            <p className="tw:text-xs tw:text-muted-foreground">
              {localizedStrings['%platformLexicalTools_dictionary_sdbhCopyright%']}
            </p>
          </div>
        )}
        {dictionaryEntry.lexicalReferenceTextId === 'SDBG' && (
          <div className="tw:max-w-xs tw:pt-3 tw:mt-auto">
            <p className="tw:text-xs tw:text-muted-foreground">
              {localizedStrings['%platformLexicalTools_dictionary_sdbgCopyright%']}
            </p>
          </div>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="tw:fixed tw:bottom-4 tw:right-4 tw:z-20"
          onClick={onClickScrollToTop}
        >
          <ChevronUpIcon />
        </Button>
      </div>
    </>
  );
}
