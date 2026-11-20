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
import { Dispatch, Fragment, SetStateAction, useCallback, useEffect, useId, useMemo } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { formatReplacementString, formatScrRef, LanguageStrings } from 'platform-bible-utils';
import {
  getFormatGlossesStringFromDictionaryEntrySenses,
  getDeduplicatedOccurrencesFromSenses,
  DictionaryOccurrenceView,
  DictionaryScope,
  isReferenceInScope,
  isSenseInScope as isSenseInScopeOfReference,
} from '../../utils/dictionary.utils';
import { useScopeReference } from '../../utils/dictionary-ui.utils';
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
   * Senses are dimmed, and numbered if there is more than one, only when it does, so their numbers
   * never change. Defaults to `true`.
   */
  hasAllSenses?: boolean;
  /**
   * Whether senses that do not occur in scope are hidden. It is the reader's choice, so it is kept
   * by the caller and lasts from entry to entry.
   */
  areLessRelevantSensesHidden: boolean;
  /** Called when the reader hides or shows the less-relevant senses */
  onAreLessRelevantSensesHiddenChange: (areLessRelevantSensesHidden: boolean) => void;
  /** Whether the occurrences listed are those in the chapter or all of them; kept by the caller */
  occurrenceView: DictionaryOccurrenceView;
  /** Called when the reader switches between the chapter's occurrences and all of them */
  onOccurrenceViewChange: (occurrenceView: DictionaryOccurrenceView) => void;
  /**
   * The ID of the selected sense, if any. It is kept by the caller, so it lasts while the list
   * reloads around the entry, and matched by ID, since a reloaded entry is a new object.
   */
  selectedSenseId: string | undefined;
  /**
   * Sets the selected sense. Like a state setter, it takes the new ID or a function of the current
   * one.
   */
  onSelectedSenseIdChange: Dispatch<SetStateAction<string | undefined>>;
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
  areLessRelevantSensesHidden,
  onAreLessRelevantSensesHiddenChange,
  occurrenceView,
  onOccurrenceViewChange,
  selectedSenseId,
  onSelectedSenseIdChange,
  onSelectOccurrence,
  onClickScrollToTop,
  onEntryLinkClick,
}: DictionaryEntryDisplayProps) {
  // Only what decides the scope, so a verse move within the chapter keeps the selected sense
  const scopeReference = useScopeReference(scriptureReferenceToFilterBy, scope);

  /** Every sense of the entry, in order; a sense's number is its position here */
  const allSenses = useMemo(
    () => Object.values(dictionaryEntry.senses).filter((sense) => sense !== undefined),
    [dictionaryEntry.senses],
  );

  // Like Paratext 9, senses that do not occur in scope are listed but dimmed, and can be hidden.
  // Without all of the entry's senses, which senses are less relevant is not known.
  const isSenseInScope = useCallback(
    (sense: Sense) => !hasAllSenses || isSenseInScopeOfReference(sense, scopeReference, scope),
    [hasAllSenses, scopeReference, scope],
  );

  const sensesInScope = useMemo(
    () => allSenses.filter(isSenseInScope),
    [allSenses, isSenseInScope],
  );
  const selectedSense = allSenses.find((sense) => sense.id === selectedSenseId);
  // An entry opened from a link may not occur in scope at all. Its senses are still dimmed, but
  // hiding them would leave none, so they are not hidden, and the header lists all of their glosses.
  const hasSensesInScope = sensesInScope.length > 0;
  const shouldHideLessRelevantSenses = areLessRelevantSensesHidden && hasSensesInScope;

  const formattedGlosses = useMemo(
    () =>
      getFormatGlossesStringFromDictionaryEntrySenses(
        dictionaryEntry,
        hasSensesInScope ? scopeReference : undefined,
        scope,
      ),
    [dictionaryEntry, hasSensesInScope, scopeReference, scope],
  );

  const sensesListId = useId();
  const lessRelevantSenseCount = allSenses.length - sensesInScope.length;
  // Like Paratext 9, senses are numbered only when there is more than one
  const areSensesNumbered = hasAllSenses && allSenses.length > 1;
  const getSenseNumber = (sense: Sense) => allSenses.indexOf(sense) + 1;
  const selectedSenseNumber =
    selectedSense && areSensesNumbered ? getSenseNumber(selectedSense) : undefined;

  const occurrencesLabel = selectedSenseNumber
    ? formatReplacementString(
        localizedStrings['%platformLexicalTools_dictionary_occurrencesForSenseLabel%'],
        { index: selectedSenseNumber.toString() },
      )
    : localizedStrings['%platformLexicalTools_dictionary_allOccurrencesLabel%'];

  // Like Paratext 9, with no sense selected the occurrences are those of every sense; the
  // "chapter" view limits them to the chapter itself. Each list is gathered once, since the
  // biggest entries have thousands of occurrences.
  const allOccurrences = useMemo(
    () => getDeduplicatedOccurrencesFromSenses(selectedSense ? [selectedSense] : allSenses),
    [allSenses, selectedSense],
  );
  const chapterOccurrences = useMemo(
    () =>
      scopeReference
        ? allOccurrences.filter(({ verseRef }) =>
            isReferenceInScope(verseRef, scopeReference, 'chapter'),
          )
        : allOccurrences,
    [allOccurrences, scopeReference],
  );
  const shownOccurrences = occurrenceView === 'chapter' ? chapterOccurrences : allOccurrences;

  // Cannot use Drawer components when there is no Drawer, if the screen is considered wide it will render Button and span here.
  const TitleComponent = isDrawer ? DrawerTitle : 'span';
  const DescriptionComponent = isDrawer ? DrawerDescription : 'span';

  // When what is in scope changes, a selected sense that is still in scope stays selected, such as
  // after going to one of its occurrences. Otherwise the only sense in scope, if there is just one,
  // is selected. The current selection is read through the update, not as a dependency, so
  // deselecting the only sense in scope does not select it again.
  useEffect(() => {
    onSelectedSenseIdChange((currentId) => {
      if (sensesInScope.some((sense) => sense.id === currentId)) return currentId;
      return sensesInScope.length === 1 ? sensesInScope[0].id : undefined;
    });
  }, [sensesInScope, onSelectedSenseIdChange]);

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
          {lessRelevantSenseCount > 0 && hasSensesInScope && (
            <Button
              variant="link"
              className="tw:h-auto tw:p-0 tw:text-xs"
              aria-expanded={!shouldHideLessRelevantSenses}
              aria-controls={sensesListId}
              onClick={() => {
                // A sense that is about to be hidden can no longer be deselected, so deselect it now
                if (
                  !shouldHideLessRelevantSenses &&
                  selectedSense &&
                  !isSenseInScope(selectedSense)
                )
                  onSelectedSenseIdChange(undefined);
                onAreLessRelevantSensesHiddenChange(!shouldHideLessRelevantSenses);
              }}
            >
              {formatReplacementString(
                localizedStrings[
                  shouldHideLessRelevantSenses
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
          id={sensesListId}
          type="single"
          value={
            selectedSense ? `${selectedSense.lexicalReferenceTextId}-sense-${selectedSense.id}` : ''
          }
          onValueChange={(value) =>
            onSelectedSenseIdChange(
              allSenses.find(
                (sense) => `${sense.lexicalReferenceTextId}-sense-${sense.id}` === value,
              )?.id,
            )
          }
          className="tw:flex tw:w-full tw:flex-col tw:gap-3"
        >
          {allSenses
            .filter((sense) => !shouldHideLessRelevantSenses || isSenseInScope(sense))
            .map((sense) => (
              <ToggleGroupItem
                key={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                value={`${sense.lexicalReferenceTextId}-sense-${sense.id}`}
                data-less-relevant={!isSenseInScope(sense)}
                className="tw:flex tw:w-full tw:h-fit tw:flex-col tw:items-start tw:whitespace-normal tw:text-start tw:border tw:rounded-lg tw:shadow-sm tw:p-4 tw:cursor-pointer tw:data-[state=on]:border-accent tw:data-[state=on]:shadow-md tw:transition-colors tw:data-[less-relevant=true]:opacity-60"
              >
                <div className="tw:flex tw:items-baseline tw:gap-2">
                  {areSensesNumbered && (
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
              onClick={() => onOccurrenceViewChange('chapter')}
            >
              {localizedStrings['%platformLexicalTools_dictionary_occurrencesToggleChapter%']} (
              {chapterOccurrences.length})
            </button>
            <button
              type="button"
              className={cn(
                'tw:text-xs tw:px-3 tw:py-1 tw:rounded-e-md',
                { 'tw:bg-accent': occurrenceView === 'all' },
                { 'tw:hover:bg-accent': occurrenceView !== 'all' },
              )}
              onClick={() => onOccurrenceViewChange('all')}
            >
              {localizedStrings['%platformLexicalTools_dictionary_occurrencesToggleAll%']} (
              {allOccurrences.length})
            </button>
          </div>
        </div>
        <ul className="tw:list-disc tw:list-inside">
          {shownOccurrences.map((occurrence) => (
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
