import { Button } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import type { UIEvent } from 'react';
import {
  ResourceList,
  RESOURCE_LIST_STRING_KEYS,
  type ResourceListItem,
} from '../shared/resource-list.component';
import {
  EncyclopediaDisplayItem,
  ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS,
  type EncyclopediaDisplayItemData,
  type EncyclopediaEntryRefData,
} from './encyclopedia-display-item.component';
import {
  EncyclopediaEntryDetail,
  ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS,
} from './encyclopedia-entry-detail.component';
import type {
  ArticleCrossRefData,
  ArticleRendererData,
  ArticleVerseLinkData,
} from '../shared/article-renderer.component';

/** Object containing all keys used for localization in this component. */
export const ENCYCLOPEDIA_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_encyclopedia_columnHeader_sourceLanguage%',
  '%enhancedResources_encyclopedia_columnHeader_articles%',
  '%enhancedResources_encyclopedia_columnHeader_count%',
  '%enhancedResources_encyclopedia_expandAll%',
  '%enhancedResources_encyclopedia_collapseAll%',
  '%enhancedResources_encyclopedia_emptyState_noData%',
  '%enhancedResources_encyclopedia_emptyState_noMatch%',
  '%enhancedResources_encyclopedia_emptyState_wordNotInScope%',
  '%enhancedResources_encyclopedia_tabLabel%',
  ...RESOURCE_LIST_STRING_KEYS,
  ...ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS,
  ...ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS,
] as const);

type EncyclopediaTabLocalizedStringKey = (typeof ENCYCLOPEDIA_TAB_STRING_KEYS)[number];
type EncyclopediaTabLocalizedStrings = {
  [key in EncyclopediaTabLocalizedStringKey]?: LocalizedStringValue;
};

export type EncyclopediaEmptyStateVariant = 'none' | 'no-data' | 'no-match' | 'word-not-in-scope';

export type EncyclopediaTabProps = {
  /** Encyclopedia entries to render. */
  items: EncyclopediaDisplayItemData[];
  /** Set of expanded token ids (controlled). */
  expandedTokenIds?: Set<string>;
  /** Whether all entries are expanded (drives the expand/collapse-all button label). */
  allExpanded?: boolean;
  /** Loading flag - shows skeleton rows. */
  isLoading?: boolean;
  /** Empty state variant when items.length === 0. */
  emptyState?: EncyclopediaEmptyStateVariant;
  /** Filter word for the no-match / word-not-in-scope empty states. */
  filterWord?: string;
  /** Scope label for empty state messages. */
  scopeLabel?: string;
  /**
   * Article data keyed by tokenId. When an entry is expanded the tab looks up the article data for
   * its first entry from this map; if the entry has no article data yet (e.g., still loading) the
   * detail panel renders a skeleton.
   */
  articleDataMap?: Record<string, ArticleRendererData | undefined>;
  /** Image url resolver, forwarded to ArticleRenderer / EncyclopediaDisplayItem (FN-009). */
  imageUrlResolver?: (imageId: string) => string;
  /** Thumbnail url resolver, forwarded to EncyclopediaDisplayItem. */
  thumbnailUrlResolver?: (imageId: string) => string;
  /** Number of preview paragraphs (default 2). */
  previewParagraphCount?: number;

  /** Expansion / list callbacks. */
  onExpandToggle?: (tokenId: string) => void;
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;

  /** Per-row callbacks. */
  onSourceTextClick?: (tokenId: string) => void;
  onArticleTitleClick?: (articleId: string) => void;
  onCopySurfaceForm?: (item: EncyclopediaDisplayItemData) => void;
  onCopyLemma?: (item: EncyclopediaDisplayItemData) => void;

  /** Article-renderer callbacks (forwarded to EncyclopediaEntryDetail). */
  onVerseLinkClick?: (link: ArticleVerseLinkData) => void;
  onCrossReferenceClick?: (ref: ArticleCrossRefData) => void;
  onImageClick?: (imageId: string) => void;
  onViewFullArticle?: (entry: EncyclopediaEntryRefData) => void;

  localizedStringsWithLoadingState?: [EncyclopediaTabLocalizedStrings, boolean];
};

/**
 * Pure presentational EncyclopediaTab. Mirrors the DictionaryTab pattern - header with column
 * labels + expand-all / collapse-all controls, then a ResourceList of encyclopedia entries (text
 * variant). Each row renders a EncyclopediaDisplayItem; expanded rows render one or more
 * EncyclopediaEntryDetail panels (one per article reference attached to the lemma).
 *
 * Empty state handling (BHV-352):
 *
 * - `no-data` -> "No data found for {scope}"
 * - `no-match` -> "No data found for "{word}" in {scope}"
 * - `word-not-in-scope` -> "{word} does not occur in {scope}"
 *
 * Layout follows ui-spec-encyclopedia-tab.md wireframes (no Translations / Found columns).
 */
export function EncyclopediaTab({
  items,
  expandedTokenIds,
  allExpanded = false,
  isLoading = false,
  emptyState = 'none',
  filterWord,
  scopeLabel = '',
  articleDataMap = {},
  imageUrlResolver,
  thumbnailUrlResolver,
  previewParagraphCount = 2,

  onExpandToggle = () => {},
  onExpandAll = () => {},
  onCollapseAll = () => {},
  onScroll,

  onSourceTextClick = () => {},
  onArticleTitleClick = () => {},
  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},

  onVerseLinkClick = () => {},
  onCrossReferenceClick = () => {},
  onImageClick = () => {},
  onViewFullArticle = () => {},

  localizedStringsWithLoadingState = [{}, false],
}: EncyclopediaTabProps) {
  const getLocalizedString = (key: EncyclopediaTabLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const headerSource = String(
    getLocalizedString('%enhancedResources_encyclopedia_columnHeader_sourceLanguage%'),
  );
  const headerArticles = String(
    getLocalizedString('%enhancedResources_encyclopedia_columnHeader_articles%'),
  );
  const headerCount = String(
    getLocalizedString('%enhancedResources_encyclopedia_columnHeader_count%'),
  );
  const expandAllLabel = String(getLocalizedString('%enhancedResources_encyclopedia_expandAll%'));
  const collapseAllLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_collapseAll%'),
  );
  const tabLabel = String(getLocalizedString('%enhancedResources_encyclopedia_tabLabel%'));

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

  // Header row: source language column (160px) + articles (flex) + count (12).
  const header = (
    <div className="tw-flex tw-w-full tw-flex-row tw-items-center tw-gap-3 tw-text-xs tw-uppercase">
      <div className="tw-w-6" aria-hidden />
      <div className="tw-w-[160px] tw-shrink-0">{headerSource}</div>
      <div className="tw-flex-1">{headerArticles}</div>
      <div className="tw-w-12 tw-text-end">{headerCount}</div>
    </div>
  );

  // Map encyclopedia entries -> ResourceListItem
  const listItems: ResourceListItem[] = items.map((entry) => ({
    id: entry.tokenId,
    primary: (
      <EncyclopediaDisplayItem
        item={entry}
        thumbnailUrlResolver={thumbnailUrlResolver}
        onSourceTextClick={onSourceTextClick}
        onArticleTitleClick={onArticleTitleClick}
        onCopySurfaceForm={onCopySurfaceForm}
        onCopyLemma={onCopyLemma}
        localizedStringsWithLoadingState={childStrings}
      />
    ),
    // No secondary column for encyclopedia (the article list is part of the primary content); we
    // surface the entry count in the trailing slot instead, matching the wireframe.
    trailing:
      entry.entries.length > 0 ? (
        <span className="tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs">
          {entry.entries.length}
        </span>
      ) : undefined,
    expanded: (
      <div className="tw-flex tw-flex-col tw-gap-3">
        {entry.entries.map((entryRef) => (
          <EncyclopediaEntryDetail
            key={entryRef.articleId}
            entry={entryRef}
            articleData={articleDataMap[entry.tokenId]}
            imageUrlResolver={imageUrlResolver}
            previewParagraphCount={previewParagraphCount}
            onVerseLinkClick={onVerseLinkClick}
            onCrossReferenceClick={onCrossReferenceClick}
            onImageClick={onImageClick}
            onViewFullArticle={onViewFullArticle}
            localizedStringsWithLoadingState={childStrings}
          />
        ))}
      </div>
    ),
  }));

  return (
    <div
      className="tw-flex tw-h-full tw-min-h-0 tw-flex-col"
      data-testid="encyclopedia-tab"
      aria-label={tabLabel}
    >
      <div className="tw-flex tw-shrink-0 tw-items-center tw-justify-between tw-border-b tw-border-border tw-px-2 tw-py-1">
        <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
          {tabLabel}
        </span>
        <div className="tw-flex tw-gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={items.length === 0 || allExpanded}
            aria-label={expandAllLabel}
            onClick={onExpandAll}
            className="tw-h-7 tw-w-7"
          >
            <ChevronsUpDown className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={items.length === 0 || (!allExpanded && (expandedTokenIds?.size ?? 0) === 0)}
            aria-label={collapseAllLabel}
            onClick={onCollapseAll}
            className="tw-h-7 tw-w-7"
          >
            <ChevronsDownUp className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      </div>
      <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col">
        <ResourceList
          items={listItems}
          variant="text"
          showSecondaryColumn={false}
          expandedIds={expandedTokenIds}
          onExpandToggle={onExpandToggle}
          header={header}
          emptyMessage={
            emptyMessage ? (
              <div data-testid="encyclopedia-empty-state" className="tw-text-sm">
                {emptyMessage}
              </div>
            ) : undefined
          }
          isLoading={isLoading}
          onScroll={onScroll}
          ariaLabel={tabLabel}
          testId="encyclopedia-entry-list"
          localizedStringsWithLoadingState={childStrings}
        />
      </div>
    </div>
  );
}

export default EncyclopediaTab;
