import { useMemo } from 'react';
import { SourceLanguageIndexedList, type IndexedListItem } from 'platform-bible-react';
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
  type VerseOccurrenceLink,
} from './dictionary-entry-detail.component';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_emptyState_noData%',
  '%enhancedResources_dictionary_emptyState_noMatch%',
  '%enhancedResources_dictionary_emptyState_wordNotInScope%',
  '%enhancedResources_dictionary_dictionaryLabel_sdbh%',
  '%enhancedResources_dictionary_dictionaryLabel_sdbg%',
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
  primaryText: entry.term,
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
  /** Whether the Translations column is shown in the row. */
  showTranslations?: boolean;
  /** Active dictionary - drives the dictionary label. */
  activeDictionary?: 'SDBH' | 'SDBG';
  /** Whether non-relevant senses are hidden in the detail panel. */
  hideNonRelevantSenses?: boolean;

  /** Selection callback - parent toggles drawer via this. */
  onSelectionChange?: (tokenId: string | undefined) => void;

  /** Per-row callbacks (forwarded to DictionaryDisplayItem + DictionaryEntryDetail). */
  onSourceTextClick?: (tokenId: string) => void;
  onOccurrenceCountClick?: (tokenId: string) => void;
  onSemanticDomainClick?: (domainId: string) => void;
  onRelatedLexemeClick?: (lemma: string) => void;
  onEncyclopediaLinkClick?: (articleId: string) => void;
  onVerseOccurrenceClick?: (verse: VerseOccurrenceLink) => void;
  onToggleHideNonRelevantSenses?: (hide: boolean) => void;
  onCopySurfaceForm?: (item: DictionaryDisplayItemData) => void;
  onCopyLemma?: (item: DictionaryDisplayItemData) => void;

  localizedStringsWithLoadingState?: [DictionaryTabLocalizedStrings, boolean];
};

/**
 * Pure presentational DictionaryTab. Renders a small dictionary-label header followed by a
 * `SourceLanguageIndexedList` (single-select with side-drawer detail). Each row uses
 * `DictionaryDisplayItem` via the `renderItem` slot; the right-side drawer uses
 * `DictionaryEntryDetail` via `renderDetailContent`.
 *
 * Note: We consume `SourceLanguageIndexedList` directly (not the `ErDictionaryList` wrapper)
 * because that wrapper unconditionally overrides `renderItem`, which would silently drop our custom
 * row (translations column, ContextMenu, click-routing).
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
  showTranslations = false,
  activeDictionary = 'SDBH',
  hideNonRelevantSenses = false,

  onSelectionChange = () => {},

  onSourceTextClick = () => {},
  onOccurrenceCountClick = () => {},
  onSemanticDomainClick = () => {},
  onRelatedLexemeClick = () => {},
  onEncyclopediaLinkClick = () => {},
  onVerseOccurrenceClick = () => {},
  onToggleHideNonRelevantSenses = () => {},
  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},

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

  return (
    <div
      className="tw-flex tw-h-full tw-min-h-0 tw-flex-col"
      data-testid="dictionary-tab"
      aria-label={dictionaryLabel}
    >
      <div className="tw-flex tw-shrink-0 tw-items-center tw-border-b tw-border-border tw-px-2 tw-py-1">
        <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
          {dictionaryLabel}
        </span>
      </div>
      <div className="tw-flex tw-min-h-0 tw-flex-1">
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
              showTranslations={showTranslations}
              onSourceTextClick={onSourceTextClick}
              onOccurrenceCountClick={onOccurrenceCountClick}
              onCopySurfaceForm={onCopySurfaceForm}
              onCopyLemma={onCopyLemma}
              localizedStringsWithLoadingState={childStrings}
            />
          )}
          renderDetailContent={(item, onClose) => (
            <DictionaryEntryDetail
              definition={item.definition}
              senses={item.senses}
              hideNonRelevantSenses={hideNonRelevantSenses}
              onToggleHideNonRelevantSenses={onToggleHideNonRelevantSenses}
              semanticDomains={item.semanticDomains}
              relatedLexemes={item.relatedLexemes}
              encyclopediaLinks={item.encyclopediaLinks}
              verseOccurrences={item.verseOccurrences}
              onSemanticDomainClick={onSemanticDomainClick}
              onRelatedLexemeClick={onRelatedLexemeClick}
              onEncyclopediaLinkClick={onEncyclopediaLinkClick}
              onVerseOccurrenceClick={onVerseOccurrenceClick}
              onClose={onClose}
              localizedStringsWithLoadingState={childStrings}
            />
          )}
          className="tw-h-full tw-w-full"
        />
      </div>
    </div>
  );
}

export default DictionaryTab;
