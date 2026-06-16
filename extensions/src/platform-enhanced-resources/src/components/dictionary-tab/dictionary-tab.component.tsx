import { useMemo } from 'react';
import { Button } from 'platform-bible-react';
import { SourceLanguageIndexedList, type IndexedListItem } from 'platform-bible-react/internal';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';
import {
  DictionaryDisplayItem,
  DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
  type DictionaryDisplayItemData,
} from './dictionary-display-item.component';
import {
  DictionaryEntryDetail,
  DICTIONARY_ENTRY_DETAIL_STRING_KEYS,
  type DictionaryEntryRef,
} from './dictionary-entry-detail.component';
import type { DictionarySenseDomain } from '../shared/dictionary-sense-item.component';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_emptyState_noData%',
  '%enhancedResources_dictionary_emptyState_noMatch%',
  '%enhancedResources_dictionary_emptyState_wordNotInScope%',
  '%enhancedResources_dictionary_dictionaryLabel_sdbh%',
  '%enhancedResources_dictionary_dictionaryLabel_sdbg%',
  '%enhancedResources_dictionary_browseSemanticDomains%',
  ...DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
  ...DICTIONARY_ENTRY_DETAIL_STRING_KEYS,
] as const);

type DictionaryTabLocalizedStringKey = (typeof DICTIONARY_TAB_STRING_KEYS)[number];
type DictionaryTabLocalizedStrings = {
  [key in DictionaryTabLocalizedStringKey]?: LocalizedStringValue;
};

export type DictionaryEmptyStateVariant = 'none' | 'no-data' | 'no-match' | 'word-not-in-scope';

/**
 * Adapter row item: combines our DictionaryDisplayItemData with the IndexedListItem shape required
 * by SourceLanguageIndexedList.
 */
type DictionaryRowItem = IndexedListItem & DictionaryDisplayItemData;

const toRowItem = (entry: DictionaryDisplayItemData): DictionaryRowItem => ({
  ...entry,
  id: entry.tokenId,
  primaryText: entry.sourceText,
  sourceLanguageText: entry.sourceText,
  transliteration: entry.translit,
});

export type DictionaryTabProps = {
  /** Dictionary entries to render. */
  items: DictionaryDisplayItemData[];
  /** Currently selected token id (controlled). */
  selectedTokenId?: string;
  /** Loading flag - shows skeleton rows. */
  isLoading?: boolean;
  /** Empty state variant when items.length === 0. */
  emptyState?: DictionaryEmptyStateVariant;
  /** Filter word for the no-match empty state ('{word}' replacement). */
  filterWord?: string;
  /** Scope label for empty state messages ('{scope}' replacement, already localized). */
  scopeLabel?: string;
  /** Active dictionary - drives the dictionary label. */
  activeDictionary?: 'SDBH' | 'SDBG';
  /** Whether less-relevant senses are hidden in the detail panel. */
  hideLessRelevantSenses?: boolean;

  /** Selection callback - parent toggles drawer via this. */
  onSelectionChange?: (tokenId: string | undefined) => void;

  /** Per-row callbacks (forwarded to DictionaryDisplayItem + DictionaryEntryDetail). */
  onSourceTextClick?: (tokenId: string) => void;
  /** Click on the entry-level "Occurrences in all books" link inside the detail panel. */
  onAllOccurrencesClick?: (tokenId: string) => void;
  /** Click on a sense's "Occurrences in all books" link inside the detail panel. */
  onSenseOccurrencesClick?: (senseId: string) => void;
  /**
   * FN-021 [UI-PKG-007]: click on a Domain row inside a sense definition table. When provided each
   * Domain row renders as a clickable link; parent dispatches a SemanticDomainViewer-open with the
   * full DomainLink payload.
   */
  onSenseDomainClick?: (domain: DictionarySenseDomain) => void;
  /**
   * UI-PKG-007 cold-entry: click on the "Browse semantic domains" button in the tab header. When
   * provided the button renders; otherwise the header omits it (component-only stories should leave
   * it undefined).
   */
  onBrowseSemanticDomainsClick?: () => void;
  onToggleHideLessRelevantSenses?: (hide: boolean) => void;

  /** Helpfulness flow (Theme 13b; backend FN-018). */
  onHelpfulnessAnswer?: (entryTokenId: string, answer: 'yes' | 'no') => void;
  onGiveFeedback?: (entryTokenId: string) => void;

  /** Context-menu callbacks (Theme 16) - shared between row + detail. */
  onCopySurfaceForm?: (
    entry: DictionaryDisplayItemData,
    variant: 'original' | 'transliteration',
  ) => void;
  onCopyLemma?: (entry: DictionaryDisplayItemData, variant: 'original' | 'transliteration') => void;
  onFindSense?: (entry: DictionaryDisplayItemData) => void;
  onFindLemma?: (entry: DictionaryDisplayItemData) => void;
  onFindText?: (entry: DictionaryDisplayItemData) => void;

  localizedStringsWithLoadingState?: [DictionaryTabLocalizedStrings, boolean];
};

/**
 * Pure presentational DictionaryTab [Revised: 2026-04-29 Themes 13/15/16]. Renders a small
 * dictionary-label header followed by a `SourceLanguageIndexedList` (single-select with
 * in-container detail panel). Each row uses `DictionaryDisplayItem` via the `renderItem` slot; the
 * detail panel uses `DictionaryEntryDetail` via `renderDetailContent`.
 *
 * Note: We consume `SourceLanguageIndexedList` directly (not the `ErDictionaryList` wrapper)
 * because that wrapper unconditionally overrides `renderItem`, which would silently drop our custom
 * row (ContextMenu, click-routing).
 *
 * Empty state handling (BHV-352):
 *
 * - `no-data` -> "No data found for current {scope}"
 * - `no-match` -> "{word} does not occur in {scope}"
 * - `word-not-in-scope` -> "{word} does not occur in {scope}"
 *
 * Layout follows the SourceLanguageIndexedList adoption design.
 */
export function DictionaryTab({
  items,
  selectedTokenId,
  isLoading = false,
  emptyState = 'none',
  filterWord,
  scopeLabel = '',
  activeDictionary = 'SDBH',
  hideLessRelevantSenses = false,

  onSelectionChange = () => {},

  onSourceTextClick = () => {},
  onAllOccurrencesClick = () => {},
  onSenseOccurrencesClick = () => {},
  onSenseDomainClick,
  onBrowseSemanticDomainsClick,
  onToggleHideLessRelevantSenses = () => {},

  onHelpfulnessAnswer = () => {},
  onGiveFeedback = () => {},

  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},
  onFindSense = () => {},
  onFindLemma = () => {},
  onFindText = () => {},

  localizedStringsWithLoadingState = [{}, false],
}: DictionaryTabProps) {
  const getLocalizedString = (key: DictionaryTabLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const dictionaryLabel = String(
    getLocalizedString(
      activeDictionary === 'SDBH'
        ? '%enhancedResources_dictionary_dictionaryLabel_sdbh%'
        : '%enhancedResources_dictionary_dictionaryLabel_sdbg%',
    ),
  );
  const browseSemanticDomainsLabel = String(
    getLocalizedString('%enhancedResources_dictionary_browseSemanticDomains%'),
  );

  const emptyMessageRaw = (() => {
    if (emptyState === 'no-data')
      return String(getLocalizedString('%enhancedResources_dictionary_emptyState_noData%'));
    if (emptyState === 'no-match')
      return String(getLocalizedString('%enhancedResources_dictionary_emptyState_noMatch%'));
    if (emptyState === 'word-not-in-scope')
      return String(getLocalizedString('%enhancedResources_dictionary_emptyState_wordNotInScope%'));
    return undefined;
  })();
  const emptyMessage = emptyMessageRaw
    ? formatReplacementString(emptyMessageRaw, { word: filterWord ?? '', scope: scopeLabel })
    : undefined;

  // Forward all child localization to row + detail
  const childStrings: [DictionaryTabLocalizedStrings, boolean] = localizedStringsWithLoadingState;

  const rowItems = useMemo(() => items.map(toRowItem), [items]);

  // Bridge the entry-detail's DictionaryEntryRef back to the original DictionaryDisplayItemData
  // when forwarding context-menu callbacks. Falls back to a synthesized item when the entry isn't
  // in the current items list (defensive - shouldn't happen because the detail is rendered for a
  // selected row).
  const findItemByTokenId = (tokenId: string): DictionaryDisplayItemData | undefined =>
    items.find((entry) => entry.tokenId === tokenId);

  const handleDetailCopySurfaceForm = (
    entry: DictionaryEntryRef,
    variant: 'original' | 'transliteration',
  ) => {
    const item = findItemByTokenId(entry.tokenId);
    if (item) onCopySurfaceForm(item, variant);
  };
  const handleDetailCopyLemma = (
    entry: DictionaryEntryRef,
    variant: 'original' | 'transliteration',
  ) => {
    const item = findItemByTokenId(entry.tokenId);
    if (item) onCopyLemma(item, variant);
  };
  const handleDetailFindSense = (entry: DictionaryEntryRef) => {
    const item = findItemByTokenId(entry.tokenId);
    if (item) onFindSense(item);
  };
  const handleDetailFindLemma = (entry: DictionaryEntryRef) => {
    const item = findItemByTokenId(entry.tokenId);
    if (item) onFindLemma(item);
  };
  const handleDetailFindText = (entry: DictionaryEntryRef) => {
    const item = findItemByTokenId(entry.tokenId);
    if (item) onFindText(item);
  };

  return (
    <div
      className="tw:flex tw:h-full tw:min-h-0 tw:flex-col"
      data-testid="dictionary-tab"
      aria-label={dictionaryLabel}
    >
      <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:border-border tw:px-2 tw:py-1">
        <span className="tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
          {dictionaryLabel}
        </span>
        {/*
         * UI-PKG-007 cold-entry trigger - "Browse semantic domains". Mounted in the dictionary
         * tab header because that is the only research surface where browsing the SDBH/SDBG
         * domain hierarchy makes sense (other tabs do not surface domain links). Hidden when
         * the parent does not supply a handler so the per-component story (which renders the
         * tab in isolation) does not gain a non-functional button.
         */}
        {onBrowseSemanticDomainsClick && (
          <Button
            variant="link"
            size="sm"
            className="tw:h-auto tw:p-0 tw:text-xs"
            onClick={onBrowseSemanticDomainsClick}
            data-testid="dictionary-browse-semantic-domains"
          >
            {browseSemanticDomainsLabel}
          </Button>
        )}
      </div>
      <div className="tw:flex tw:min-h-0 tw:flex-1">
        <SourceLanguageIndexedList
          items={rowItems}
          selectedItemId={selectedTokenId}
          onItemClick={(item) =>
            onSelectionChange(item.id === selectedTokenId ? undefined : item.id)
          }
          isLoading={isLoading}
          emptyStateMessage={emptyMessage}
          renderItem={(item) => (
            <DictionaryDisplayItem
              item={item}
              onSourceTextClick={onSourceTextClick}
              onCopySurfaceForm={onCopySurfaceForm}
              onCopyLemma={onCopyLemma}
              onFindSense={onFindSense}
              onFindLemma={onFindLemma}
              onFindText={onFindText}
              localizedStringsWithLoadingState={childStrings}
            />
          )}
          renderDetailContent={(item, onClose) => (
            <DictionaryEntryDetail
              tokenId={item.tokenId}
              sourceText={item.sourceText}
              transliteration={item.translit}
              senses={item.senses}
              totalOccurrencesInAllBooks={item.totalOccurrencesInAllBooks}
              hideLessRelevantSenses={hideLessRelevantSenses}
              onToggleHideLessRelevantSenses={onToggleHideLessRelevantSenses}
              onSourceTextClick={onSourceTextClick}
              onAllOccurrencesClick={onAllOccurrencesClick}
              onSenseOccurrencesClick={onSenseOccurrencesClick}
              onSenseDomainClick={onSenseDomainClick}
              onHelpfulnessAnswer={(answer) => onHelpfulnessAnswer(item.tokenId, answer)}
              onGiveFeedback={() => onGiveFeedback(item.tokenId)}
              onCopySurfaceForm={handleDetailCopySurfaceForm}
              onCopyLemma={handleDetailCopyLemma}
              onFindSense={handleDetailFindSense}
              onFindLemma={handleDetailFindLemma}
              onFindText={handleDetailFindText}
              onClose={onClose}
              localizedStringsWithLoadingState={childStrings}
            />
          )}
          className="tw:h-full tw:w-full"
        />
      </div>
    </div>
  );
}

export default DictionaryTab;
