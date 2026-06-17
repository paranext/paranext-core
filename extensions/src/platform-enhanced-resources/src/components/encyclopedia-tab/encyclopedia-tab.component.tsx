import { useMemo } from 'react';
import { Button } from 'platform-bible-react';
import { SourceLanguageIndexedList, type IndexedListItem } from 'platform-bible-react/experimental';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';
import { ArrowLeft } from 'lucide-react';
import {
  EncyclopediaDisplayItem,
  ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS,
  type EncyclopediaDisplayItemData,
} from './encyclopedia-display-item.component';
import {
  EncyclopediaEntryDetail,
  ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS,
} from './encyclopedia-entry-detail.component';
import type { ArticleRendererData } from '../shared/article-renderer.component';

/** Object containing all keys used for localization in this component. */
export const ENCYCLOPEDIA_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_encyclopedia_emptyState_noData%',
  '%enhancedResources_encyclopedia_emptyState_noMatch%',
  '%enhancedResources_encyclopedia_emptyState_wordNotInScope%',
  '%enhancedResources_encyclopedia_tabLabel%',
  '%enhancedResources_dictionary_backToList%',
  ...ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS,
  ...ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS,
] as const);

type EncyclopediaTabLocalizedStringKey = (typeof ENCYCLOPEDIA_TAB_STRING_KEYS)[number];
type EncyclopediaTabLocalizedStrings = {
  [key in EncyclopediaTabLocalizedStringKey]?: LocalizedStringValue;
};

export type EncyclopediaEmptyStateVariant = 'none' | 'no-data' | 'no-match' | 'word-not-in-scope';

/**
 * Adapter row item: combines our EncyclopediaDisplayItemData with the IndexedListItem shape
 * required by SourceLanguageIndexedList.
 */
type EncyclopediaRowItem = IndexedListItem & EncyclopediaDisplayItemData;

const toRowItem = (entry: EncyclopediaDisplayItemData): EncyclopediaRowItem => ({
  ...entry,
  id: entry.tokenId,
  primaryText: entry.lemma,
  sourceLanguageText: entry.sourceText,
  transliteration: entry.translit,
});

export type EncyclopediaTabProps = {
  /** Encyclopedia entries to render. */
  items: EncyclopediaDisplayItemData[];
  /** Currently selected token id (controlled). */
  selectedTokenId?: string;
  /** Loading flag - shows skeleton rows. */
  isLoading?: boolean;
  /** Empty state variant when items.length === 0. */
  emptyState?: EncyclopediaEmptyStateVariant;
  /** Filter word for the no-match / word-not-in-scope empty states. */
  filterWord?: string;
  /** Scope label for empty state messages. */
  scopeLabel?: string;
  /**
   * Article data keyed by tokenId. When an entry is selected the tab looks up the article data for
   * its first entry from this map; if the entry has no article data yet (e.g., still loading) the
   * detail panel renders a skeleton.
   */
  articleDataMap?: Record<string, ArticleRendererData | undefined>;
  /** Number of preview paragraphs (default 2). */
  previewParagraphCount?: number;

  /** Selection callback - parent toggles drawer via this. */
  onSelectionChange?: (tokenId: string | undefined) => void;

  /** Per-row callbacks. */
  onSourceTextClick?: (tokenId: string) => void;
  onCopySurfaceForm?: (item: EncyclopediaDisplayItemData) => void;
  onCopyLemma?: (item: EncyclopediaDisplayItemData) => void;

  /**
   * Click handler for the "View article" link inside the entry detail panel. Surfaces the
   * ArticleViewer Dialog (UI-PKG-006). When omitted the link is hidden.
   */
  onArticleLinkClick?: (articleId: string) => void;

  localizedStringsWithLoadingState?: [EncyclopediaTabLocalizedStrings, boolean];
};

/**
 * Pure presentational EncyclopediaTab. Renders a small tab-label header followed by a
 * `SourceLanguageIndexedList` (single-select with side-drawer detail). Each row uses
 * `EncyclopediaDisplayItem` via the `renderItem` slot; the right-side drawer stacks one
 * `EncyclopediaEntryDetail` per article reference attached to the lemma, with a single "Back to
 * list" button at the top of the stack.
 *
 * [Revised: 2026-04-29] Theme 14: dropped `onViewFullArticle` / `onVerseLinkClick` /
 * `onCrossReferenceClick` / `onImageClick` / `imageUrlResolver` props since
 * `EncyclopediaEntryDetail` no longer renders interactive cross-references, verse links, inline
 * images, or a "View full article" footer. Article-side interactivity now lives only in
 * `ArticleViewer` (UI-PKG-006).
 *
 * Note: We consume `SourceLanguageIndexedList` directly (not the `ErEncyclopediaList` wrapper)
 * because that wrapper unconditionally overrides `renderItem`, which would silently drop our custom
 * row (ContextMenu, click-routing).
 *
 * Empty state handling (BHV-352):
 *
 * - `no-data` -> "No data found for {scope}"
 * - `no-match` -> "No data found for "{word}" in {scope}"
 * - `word-not-in-scope` -> "{word} does not occur in {scope}"
 *
 * Layout follows the SourceLanguageIndexedList adoption design.
 */
export function EncyclopediaTab({
  items,
  selectedTokenId,
  isLoading = false,
  emptyState = 'none',
  filterWord,
  scopeLabel = '',
  articleDataMap = {},
  previewParagraphCount = 2,

  onSelectionChange = () => {},

  onSourceTextClick = () => {},
  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},

  onArticleLinkClick,

  localizedStringsWithLoadingState = [{}, false],
}: EncyclopediaTabProps) {
  const getLocalizedString = (key: EncyclopediaTabLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const tabLabel = String(getLocalizedString('%enhancedResources_encyclopedia_tabLabel%'));
  const backToListLabel = String(getLocalizedString('%enhancedResources_dictionary_backToList%'));

  const emptyMessageRaw = (() => {
    if (emptyState === 'no-data')
      return String(getLocalizedString('%enhancedResources_encyclopedia_emptyState_noData%'));
    if (emptyState === 'no-match')
      return String(getLocalizedString('%enhancedResources_encyclopedia_emptyState_noMatch%'));
    if (emptyState === 'word-not-in-scope')
      return String(
        getLocalizedString('%enhancedResources_encyclopedia_emptyState_wordNotInScope%'),
      );
    return undefined;
  })();

  const emptyMessage = emptyMessageRaw
    ? formatReplacementString(emptyMessageRaw, {
        word: filterWord ?? '',
        scope: scopeLabel,
      })
    : undefined;

  const childStrings: [EncyclopediaTabLocalizedStrings, boolean] = localizedStringsWithLoadingState;

  const rowItems = useMemo(() => items.map(toRowItem), [items]);

  return (
    <div
      className="tw:flex tw:h-full tw:min-h-0 tw:flex-col"
      data-testid="encyclopedia-tab"
      aria-label={tabLabel}
    >
      <div className="tw:flex tw:shrink-0 tw:items-center tw:border-b tw:border-border tw:px-2 tw:py-1">
        <span className="tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
          {tabLabel}
        </span>
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
            <EncyclopediaDisplayItem
              item={item}
              onSourceTextClick={onSourceTextClick}
              onCopySurfaceForm={onCopySurfaceForm}
              onCopyLemma={onCopyLemma}
              localizedStringsWithLoadingState={childStrings}
            />
          )}
          renderDetailContent={(item, onClose) => (
            <div className="tw:flex tw:flex-col tw:gap-3">
              <Button onClick={onClose} variant="ghost" size="sm" className="tw:self-start">
                <ArrowLeft className="tw:mr-1 tw:h-4 tw:w-4" />
                {backToListLabel}
              </Button>
              {item.entries.map((entryRef) => (
                <EncyclopediaEntryDetail
                  key={entryRef.articleId}
                  entry={entryRef}
                  articleData={articleDataMap[item.tokenId]}
                  previewParagraphCount={previewParagraphCount}
                  onArticleLinkClick={onArticleLinkClick}
                  localizedStringsWithLoadingState={childStrings}
                />
              ))}
            </div>
          )}
          className="tw:h-full tw:w-full"
        />
      </div>
    </div>
  );
}

export default EncyclopediaTab;
