import { useMemo, useState } from 'react';
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Label,
  RadioGroup,
  RadioGroupItem,
  Switch,
  cn,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { ArrowLeft } from 'lucide-react';
import {
  DictionarySenseItem,
  DICTIONARY_SENSE_ITEM_STRING_KEYS,
  type DictionarySenseDisplay,
  type DictionarySenseDomain,
} from '../shared/dictionary-sense-item.component';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_ENTRY_DETAIL_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_sensesHeader%',
  '%enhancedResources_dictionary_hideLessRelevantToggle%',
  '%enhancedResources_dictionary_allOccurrencesLink%',
  '%enhancedResources_dictionary_emptyDetail%',
  '%enhancedResources_dictionary_backToList%',
  '%enhancedResources_dictionary_sourceTextTooltip%',
  '%enhancedResources_dictionary_wasThisHelpful%',
  '%enhancedResources_dictionary_helpful_yes%',
  '%enhancedResources_dictionary_helpful_no%',
  '%enhancedResources_dictionary_giveFeedback%',
  '%enhancedResources_dictionary_copySurfaceForm%',
  '%enhancedResources_dictionary_copyLemma%',
  '%enhancedResources_dictionary_copy_originalScript%',
  '%enhancedResources_dictionary_copy_transliteration%',
  '%enhancedResources_dictionary_findSense%',
  '%enhancedResources_dictionary_findLemma%',
  '%enhancedResources_dictionary_findText%',
  ...DICTIONARY_SENSE_ITEM_STRING_KEYS,
] as const);

type DictionaryEntryDetailLocalizedStringKey = (typeof DICTIONARY_ENTRY_DETAIL_STRING_KEYS)[number];
type DictionaryEntryDetailLocalizedStrings = {
  [key in DictionaryEntryDetailLocalizedStringKey]?: LocalizedStringValue;
};

/** Verse occurrence link payload (kept for parent typing parity at the call site). */
export type VerseOccurrenceLink = {
  book: number;
  chapter: number;
  verse: number;
  /** Display label, formatted by parent (e.g., "Gen 1:1"). */
  label: string;
};

/** Entry-level identity passed back through Find* / Copy* context-menu callbacks. */
export type DictionaryEntryRef = {
  /** Stable token id for the selected entry. */
  tokenId: string;
  /** Lemma in original Hebrew/Greek script. */
  sourceText: string;
  /** Transliteration (matches DictionaryDisplayItemData.translit). */
  translit: string;
};

export type DictionaryEntryDetailProps = {
  /** Token id of the displayed entry (passes through to context-menu callbacks). */
  tokenId: string;
  /** Source-language word (lemma in original script). Clickable - fires `onSourceTextClick`. */
  sourceText: string;
  /** Transliteration of `sourceText`. */
  transliteration?: string;
  /** Sense list (with relevance flags). */
  senses?: DictionarySenseDisplay[];
  /** When true, less-relevant senses are hidden entirely. */
  hideLessRelevantSenses?: boolean;
  /** Callback fired when the "hide less-relevant senses" switch is toggled. */
  onToggleHideLessRelevantSenses?: (hide: boolean) => void;
  /** Total occurrences in all books across the entire entry (used for the entry-wide link label). */
  totalOccurrencesInAllBooks?: number;

  /**
   * Click handler for the source-language word — parent routes to MarbleForm word filter. [Revised:
   * 2026-04-29 Theme 13]
   */
  onSourceTextClick?: (tokenId: string) => void;
  /** Click handler for the entry-level "Occurrences in all books" link. */
  onAllOccurrencesClick?: (tokenId: string) => void;
  /** Click handler for the per-sense "Occurrences in all books" link. */
  onSenseOccurrencesClick?: (senseId: string) => void;
  /**
   * FN-021 [UI-PKG-007]: Click handler for a Domain row inside a sense's definition table. When
   * provided, each Domain row renders as a clickable link. Parent typically dispatches a
   * SemanticDomainViewer-open with the full {@link DictionarySenseDomain} payload.
   */
  onSenseDomainClick?: (domain: DictionarySenseDomain) => void;

  /**
   * Helpfulness flow handlers [Revised: 2026-04-29 Theme 13b]. The component owns the local
   * "selected answer" state to gate the "Give feedback..." link visibility; parent receives the
   * answer via `onHelpfulnessAnswer` and a "Give feedback..." click via `onGiveFeedback`. Backend
   * wiring is FN-018 (forward-notes).
   */
  onHelpfulnessAnswer?: (answer: 'yes' | 'no') => void;
  onGiveFeedback?: () => void;

  /**
   * Context-menu callbacks [Revised: 2026-04-29 Theme 16]. Wrap the source-language word and each
   * sense's source-form. `findText` is a sense-scope action (per ui-spec-marble-form.md line
   * 99-104).
   */
  onCopySurfaceForm?: (entry: DictionaryEntryRef, variant: 'original' | 'transliteration') => void;
  onCopyLemma?: (entry: DictionaryEntryRef, variant: 'original' | 'transliteration') => void;
  onFindSense?: (entry: DictionaryEntryRef) => void;
  onFindLemma?: (entry: DictionaryEntryRef) => void;
  onFindText?: (entry: DictionaryEntryRef) => void;

  /** When provided, renders a "Back to list" button at the top that calls this. */
  onClose?: () => void;
  localizedStringsWithLoadingState?: [DictionaryEntryDetailLocalizedStrings, boolean];
};

/**
 * Pure presentational expanded-detail panel for a dictionary entry [Revised: 2026-04-29 Themes
 * 13/16]. Renders only the entry-level surface PT9 actually exposes:
 *
 * - Source-language word (clickable; routes to MarbleForm word filter)
 * - Senses list (delegates each sense to DictionarySenseItem)
 * - "Hide less relevant senses" toggle
 * - Entry-wide "Occurrences in all books" link
 * - "Was this helpful?" Yes/No prompt + optional "Give feedback..." link (Theme 13b; backend FN-018)
 *
 * The previously-rendered entry-level `description`, `semanticDomains`, `relatedLexemes`, and `See
 * also` (encyclopedia links) sections were dropped per the data-shape audit (#7a): those fields
 * have no L3 producer in PT9 and were invented by the design phase.
 *
 * Per Theme 16, the source-language word AND each sense's source-form carry a per-component
 * ContextMenu with copySurfaceForm/copyLemma (Original / Transliteration variants), findSense,
 * findLemma, and findText items. Menu items mirror those on `DictionaryDisplayItem`; when both
 * controls are present in the same view (collapsed row + expanded detail), reviewers see one
 * consistent menu pattern.
 */
export function DictionaryEntryDetail({
  tokenId,
  sourceText,
  transliteration,
  senses,
  hideLessRelevantSenses = false,
  onToggleHideLessRelevantSenses = () => {},
  totalOccurrencesInAllBooks,
  onSourceTextClick = () => {},
  onAllOccurrencesClick = () => {},
  onSenseOccurrencesClick = () => {},
  onSenseDomainClick,
  onHelpfulnessAnswer = () => {},
  onGiveFeedback = () => {},
  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},
  onFindSense = () => {},
  onFindLemma = () => {},
  onFindText = () => {},
  onClose,
  localizedStringsWithLoadingState = [{}, false],
}: DictionaryEntryDetailProps) {
  const getLocalizedString = (key: DictionaryEntryDetailLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const sensesHeader = String(getLocalizedString('%enhancedResources_dictionary_sensesHeader%'));
  const hideLessRelevantLabel = String(
    getLocalizedString('%enhancedResources_dictionary_hideLessRelevantToggle%'),
  );
  const allOccurrencesRawLabel = String(
    getLocalizedString('%enhancedResources_dictionary_allOccurrencesLink%'),
  );
  const emptyDetail = String(getLocalizedString('%enhancedResources_dictionary_emptyDetail%'));
  const backToListLabel = String(getLocalizedString('%enhancedResources_dictionary_backToList%'));
  const sourceTextTooltip = String(
    getLocalizedString('%enhancedResources_dictionary_sourceTextTooltip%'),
  );
  const wasThisHelpfulLabel = String(
    getLocalizedString('%enhancedResources_dictionary_wasThisHelpful%'),
  );
  const helpfulYesLabel = String(getLocalizedString('%enhancedResources_dictionary_helpful_yes%'));
  const helpfulNoLabel = String(getLocalizedString('%enhancedResources_dictionary_helpful_no%'));
  const giveFeedbackLabel = String(
    getLocalizedString('%enhancedResources_dictionary_giveFeedback%'),
  );
  const copySurfaceFormLabel = String(
    getLocalizedString('%enhancedResources_dictionary_copySurfaceForm%'),
  );
  const copyLemmaLabel = String(getLocalizedString('%enhancedResources_dictionary_copyLemma%'));
  const copyOriginalScriptLabel = String(
    getLocalizedString('%enhancedResources_dictionary_copy_originalScript%'),
  );
  const copyTransliterationLabel = String(
    getLocalizedString('%enhancedResources_dictionary_copy_transliteration%'),
  );
  const findSenseLabel = String(getLocalizedString('%enhancedResources_dictionary_findSense%'));
  const findLemmaLabel = String(getLocalizedString('%enhancedResources_dictionary_findLemma%'));
  const findTextLabel = String(getLocalizedString('%enhancedResources_dictionary_findText%'));

  const [helpfulAnswer, setHelpfulAnswer] = useState<'yes' | 'no' | undefined>(undefined);

  const entryRef: DictionaryEntryRef = {
    tokenId,
    sourceText,
    translit: transliteration ?? '',
  };

  const backButton = onClose ? (
    <Button
      data-back-to-list
      onClick={onClose}
      variant="ghost"
      size="sm"
      className="tw:mb-3 tw:self-start"
    >
      <ArrowLeft className="tw:mr-1 tw:h-4 tw:w-4" />
      {backToListLabel}
    </Button>
  ) : undefined;

  // Forward sense item localization (the sense item only reads its own keys via the typed
  // localized-strings forwarding pattern).
  const senseStrings: [DictionaryEntryDetailLocalizedStrings, boolean] =
    localizedStringsWithLoadingState;

  const hasAnyContent = Boolean(sourceText) || (senses && senses.length > 0);

  // D-015: API may return multiple senses sharing the same `sense.id`. We need each rendered
  // child to carry a unique React key, but we can't rely solely on the index (loses identity
  // across reorder + violates react/no-array-index-key). Build a stable per-id occurrence
  // suffix: first appearance of `id` keeps `id`; subsequent collisions become `id#2`, `id#3`,
  // and so on. The mapping is recomputed only when the senses array reference changes, so
  // reorder/replace within an entry payload still produces stable keys per (id, occurrence).
  const senseKeys: string[] = useMemo(() => {
    if (!senses) return [];
    const seen = new Map<string, number>();
    return senses.map((sense) => {
      const count = (seen.get(sense.id) ?? 0) + 1;
      seen.set(sense.id, count);
      return count === 1 ? sense.id : `${sense.id}#${count}`;
    });
  }, [senses]);

  if (!hasAnyContent) {
    return (
      <div className="tw:flex tw:flex-col">
        {backButton}
        <div role="status" className="tw:py-2 tw:text-xs tw:italic tw:text-muted-foreground">
          {emptyDetail}
        </div>
      </div>
    );
  }

  const allOccurrencesLabel =
    typeof totalOccurrencesInAllBooks === 'number'
      ? `${allOccurrencesRawLabel} (${totalOccurrencesInAllBooks})`
      : allOccurrencesRawLabel;

  const renderEntryContextMenuContent = () => (
    <ContextMenuContent>
      <ContextMenuSub>
        <ContextMenuSubTrigger>{copySurfaceFormLabel}</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => onCopySurfaceForm(entryRef, 'original')}>
            {copyOriginalScriptLabel}
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onCopySurfaceForm(entryRef, 'transliteration')}>
            {copyTransliterationLabel}
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSub>
        <ContextMenuSubTrigger>{copyLemmaLabel}</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => onCopyLemma(entryRef, 'original')}>
            {copyOriginalScriptLabel}
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onCopyLemma(entryRef, 'transliteration')}>
            {copyTransliterationLabel}
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuItem onClick={() => onFindSense(entryRef)}>{findSenseLabel}</ContextMenuItem>
      <ContextMenuItem onClick={() => onFindLemma(entryRef)}>{findLemmaLabel}</ContextMenuItem>
      <ContextMenuItem onClick={() => onFindText(entryRef)}>{findTextLabel}</ContextMenuItem>
    </ContextMenuContent>
  );

  const handleHelpfulnessChange = (value: string) => {
    if (value !== 'yes' && value !== 'no') return;
    setHelpfulAnswer(value);
    onHelpfulnessAnswer(value);
  };

  return (
    <div
      className="tw:flex tw:flex-col tw:gap-3 tw:pt-2"
      data-testid={`dictionary-entry-detail-${tokenId}`}
    >
      {backButton}

      {/* Source-language word + transliteration; clickable, with ContextMenu (Theme 16). */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="tw:flex tw:flex-wrap tw:items-baseline tw:gap-2">
            <Button
              variant="link"
              className={cn('tw:h-auto tw:p-0 tw:text-base tw:font-semibold')}
              aria-label={sourceTextTooltip}
              onClick={() => onSourceTextClick(tokenId)}
              data-testid={`dictionary-entry-detail-source-${tokenId}`}
            >
              <span>{sourceText}</span>
            </Button>
            {transliteration && (
              <span className="tw:text-sm tw:italic tw:text-muted-foreground">
                ({transliteration})
              </span>
            )}
          </div>
        </ContextMenuTrigger>
        {renderEntryContextMenuContent()}
      </ContextMenu>

      {/* Senses + hide-less-relevant toggle. */}
      {senses && senses.length > 0 && (
        <section aria-label={sensesHeader}>
          <div className="tw:mb-2 tw:flex tw:items-center tw:justify-between">
            <h4 className="tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
              {sensesHeader}
            </h4>
            <label className="tw:flex tw:items-center tw:gap-2 tw:text-xs">
              <Switch
                checked={hideLessRelevantSenses}
                onCheckedChange={onToggleHideLessRelevantSenses}
                aria-label={hideLessRelevantLabel}
              />
              <span>{hideLessRelevantLabel}</span>
            </label>
          </div>
          <div className="tw:flex tw:flex-col tw:gap-2">
            {senses.map((sense, idx) => (
              <DictionarySenseItem
                key={senseKeys[idx]}
                sense={sense}
                hideLessRelevant={hideLessRelevantSenses}
                onSenseOccurrencesClick={onSenseOccurrencesClick}
                onDomainClick={onSenseDomainClick}
                localizedStringsWithLoadingState={senseStrings}
              />
            ))}
          </div>
        </section>
      )}

      {/* Entry-level "Occurrences in all books" link. */}
      <div>
        <Button
          variant="link"
          className="tw:h-auto tw:p-0 tw:text-sm"
          onClick={() => onAllOccurrencesClick(tokenId)}
          data-testid={`dictionary-entry-detail-all-occurrences-${tokenId}`}
        >
          {allOccurrencesLabel}
        </Button>
      </div>

      {/* Was this helpful? prompt (Theme 13b). */}
      <section aria-label={wasThisHelpfulLabel} className="tw:mt-2 tw:flex tw:flex-col tw:gap-2">
        <span className="tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
          {wasThisHelpfulLabel}
        </span>
        <RadioGroup
          value={helpfulAnswer ?? ''}
          onValueChange={handleHelpfulnessChange}
          className="tw:flex tw:flex-row tw:gap-4"
          aria-label={wasThisHelpfulLabel}
        >
          <div className="tw:flex tw:items-center tw:gap-2">
            <RadioGroupItem value="yes" id={`dictionary-entry-detail-helpful-yes-${tokenId}`} />
            <Label htmlFor={`dictionary-entry-detail-helpful-yes-${tokenId}`}>
              {helpfulYesLabel}
            </Label>
          </div>
          <div className="tw:flex tw:items-center tw:gap-2">
            <RadioGroupItem value="no" id={`dictionary-entry-detail-helpful-no-${tokenId}`} />
            <Label htmlFor={`dictionary-entry-detail-helpful-no-${tokenId}`}>
              {helpfulNoLabel}
            </Label>
          </div>
        </RadioGroup>
        {helpfulAnswer && (
          <Button
            variant="link"
            className="tw:h-auto tw:self-start tw:p-0 tw:text-xs"
            onClick={onGiveFeedback}
            data-testid={`dictionary-entry-detail-give-feedback-${tokenId}`}
          >
            {giveFeedbackLabel}
          </Button>
        )}
      </section>
    </div>
  );
}

export default DictionaryEntryDetail;
