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
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatReplacementString, formatScrRef, LanguageStrings } from 'platform-bible-utils';
import {
  getFormatGlossesStringFromDictionaryEntrySenses,
  getDeduplicatedOccurrencesFromSenses,
  DictionaryOccurrenceView,
  DictionaryScope,
  isSenseInScope as isSenseInScopeOfReference,
} from '../../utils/dictionary.utils';
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
  /**
   * Scope the dictionary list is filtered by. Senses that do not occur in it (the verse in verse
   * scope, the chapter otherwise) are dimmed. Defaults to `'chapter'`.
   */
  scope?: DictionaryScope;
  /**
   * Whether `dictionaryEntry` has all of the entry's senses, rather than only those in scope.
   * Senses are numbered and dimmed only when it does, so their numbers never change. Defaults to
   * `true`.
   */
  hasAllSenses?: boolean;
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
  scope = 'chapter',
  hasAllSenses = true,
  onSelectOccurrence,
  onClickScrollToTop,
  onEntryLinkClick,
}: DictionaryEntryDisplayProps) {
  const [selectedSense, setSelectedSense] = useState<Sense | undefined>();
  const [occurrenceView, setOccurrenceView] = useState<DictionaryOccurrenceView>('chapter');

  const formattedGlosses = useMemo(
    () =>
      getFormatGlossesStringFromDictionaryEntrySenses(
        dictionaryEntry,
        scriptureReferenceToFilterBy,
        scope,
      ),
    [dictionaryEntry, scriptureReferenceToFilterBy, scope],
  );

  /** Every sense of the entry, in order; a sense's number is its position here */
  const allSenses = useMemo(
    () => Object.values(dictionaryEntry.senses).filter((sense) => sense !== undefined),
    [dictionaryEntry.senses],
  );

  // Like Paratext 9, senses that do not occur in scope are listed but dimmed, and can be hidden.
  // Without all of the entry's senses, which senses are less relevant is not known.
  const isSenseInScope = useCallback(
    (sense: Sense) =>
      !hasAllSenses || isSenseInScopeOfReference(sense, scriptureReferenceToFilterBy, scope),
    [hasAllSenses, scriptureReferenceToFilterBy, scope],
  );
  const [areLessRelevantSensesHidden, setAreLessRelevantSensesHidden] = useState(false);
  const lessRelevantSenseCount = allSenses.filter((sense) => !isSenseInScope(sense)).length;
  const getSenseNumber = (sense: Sense) => allSenses.indexOf(sense) + 1;
  const selectedSenseNumber =
    selectedSense && hasAllSenses ? getSenseNumber(selectedSense) : undefined;

  const occurrencesLabel = selectedSenseNumber
    ? formatReplacementString(
        localizedStrings['%platformLexicalTools_dictionary_occurrencesForSenseLabel%'],
        { index: selectedSenseNumber.toString() },
      )
    : localizedStrings['%platformLexicalTools_dictionary_allOccurrencesLabel%'];

  const sensesInScope = useMemo(
    () => allSenses.filter(isSenseInScope),
    [allSenses, isSenseInScope],
  );

  // Like Paratext 9, with no sense selected the occurrences are those of every sense; the
  // "chapter" view limits them to the chapter itself
  const getOccurrences = useCallback(
    (localOccurrenceView: DictionaryOccurrenceView) =>
      getDeduplicatedOccurrencesFromSenses(
        selectedSense ? [selectedSense] : allSenses,
        localOccurrenceView === 'chapter' ? scriptureReferenceToFilterBy : undefined,
      ),
    [allSenses, scriptureReferenceToFilterBy, selectedSense],
  );

  const deduplicatedOccurrences = useMemo(
    () => getOccurrences(occurrenceView),
    [getOccurrences, occurrenceView],
  );

  // Cannot use Drawer components when there is no Drawer, if the screen is considered wide it will render Button and span here.
  const TitleComponent = isDrawer ? DrawerTitle : 'span';
  const DescriptionComponent = isDrawer ? DrawerDescription : 'span';

  // Automatically select the only sense in scope if there is exactly one; otherwise clear selection
  useEffect(() => {
    setSelectedSense(sensesInScope.length === 1 ? sensesInScope[0] : undefined);
  }, [sensesInScope, dictionaryEntry]);

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
                if (!areLessRelevantSensesHidden && selectedSense && !isSenseInScope(selectedSense))
                  setSelectedSense(undefined);
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
          onValueChange={(value) =>
            setSelectedSense(
              allSenses.find(
                (sense) => `${sense.lexicalReferenceTextId}-sense-${sense.id}` === value,
              ),
            )
          }
          className="tw:flex tw:w-full tw:flex-col tw:gap-3"
        >
          {allSenses
            .filter((sense) => !areLessRelevantSensesHidden || isSenseInScope(sense))
            .map((sense) => (
              <ToggleGroupItem
                key={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                value={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                data-less-relevant={!isSenseInScope(sense)}
                className="tw:flex tw:w-full tw:h-fit tw:flex-col tw:items-start tw:whitespace-normal tw:text-start tw:border tw:rounded-lg tw:shadow-sm tw:p-4 tw:cursor-pointer tw:data-[state=on]:border-accent tw:data-[state=on]:shadow-md tw:transition-colors tw:data-[less-relevant=true]:opacity-60"
              >
                <div className="tw:flex tw:items-baseline tw:gap-2">
                  {hasAllSenses && (
                    <span className="tw:font-bold tw:text-accent-foreground">
                      {getSenseNumber(sense)}
                    </span>
                  )}
                  <ContentZoomRoot as="span" className="tw:text-base">
                    {sense.glosses.map((gloss, glossIndex) => (
                      // Glosses come from one list that never reorders, so their index is a stable key
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={glossIndex}>
                        {glossIndex > 0 && ', '}
                        <DefinitionText
                          definition={gloss}
                          onEntryLinkClick={onEntryLinkClick}
                          onScriptureLinkClick={onSelectOccurrence}
                        />
                      </Fragment>
                    ))}
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
                      onScriptureLinkClick={onSelectOccurrence}
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
              {getOccurrences('chapter').length})
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
              {getOccurrences('all').length})
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
