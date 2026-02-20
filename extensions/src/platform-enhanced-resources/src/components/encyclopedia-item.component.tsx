import React, { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { Button } from 'platform-bible-react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// --- Types ---

/** Full encyclopedia entry data */
export interface EncyclopediaEntry {
  /** Unique entry ID */
  id: string;
  /** Entry title */
  title: string;
  /** Full article HTML content */
  articleHtml: string;
  /** Scripture references associated with this entry */
  scriptureRefs: string[];
}

/** An encyclopedia display item for the tab list */
export interface EncyclopediaDisplayItem {
  /** Unique identifier for this entry */
  id: string;
  /** Display title */
  title: string;
  /** Source language text (Hebrew/Greek) */
  sourceText: string;
  /** Translations in target language */
  translations: string[];
  /** HTML teaser text (short preview) */
  teaserHtml: string;
  /** Whether this item is currently expanded */
  expanded: boolean;
  /** Cross-reference "see also" links */
  seeAlso: { id: string; title: string }[];
  /** The full encyclopedia entry data (for passing to ArticleViewer) */
  entry: EncyclopediaEntry;
}

/** Props for the EncyclopediaItem component */
export interface EncyclopediaItemProps {
  /** The encyclopedia display item data */
  item: EncyclopediaDisplayItem;
  /** Callback when expand/collapse is toggled */
  onToggleExpand: (id: string) => void;
  /** Callback when "Read full article" is clicked */
  onReadArticle: (entry: EncyclopediaEntry) => void;
}

// --- Constants ---

const ENCYCLOPEDIA_ITEM_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_enc_expandItem%',
  '%enhancedResources_enc_collapseItem%',
  '%enhancedResources_enc_readFullArticle%',
  '%enhancedResources_enc_translations%',
  '%enhancedResources_enc_sourceText%',
  '%enhancedResources_enc_seeAlso%',
];

// --- Component ---

/**
 * EncyclopediaItem renders a single encyclopedia entry row in the encyclopedia tab. It supports
 * expand/collapse, teaser HTML display, translations, source text, and a "Read full article" link.
 *
 * The expand/collapse pattern follows DictionaryItem (chevron icons, aria-expanded).
 */
export default function EncyclopediaItem({
  item,
  onToggleExpand,
  onReadArticle,
}: EncyclopediaItemProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => ENCYCLOPEDIA_ITEM_LOCALIZED_KEYS, []),
  );

  const handleToggle = useCallback(() => {
    onToggleExpand(item.id);
  }, [item.id, onToggleExpand]);

  const handleReadArticle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onReadArticle(item.entry);
    },
    [item.entry, onReadArticle],
  );

  return (
    <div data-testid={`encyclopedia-item-${item.id}`} className="tw-border-b tw-border-border">
      {/* Collapsed row: clickable to expand/collapse */}
      <button
        type="button"
        className="tw-flex tw-items-start tw-w-full tw-text-left tw-px-2 tw-py-2 hover:tw-bg-accent/50 tw-cursor-pointer tw-border-0 tw-bg-transparent"
        onClick={handleToggle}
        aria-expanded={item.expanded}
        aria-label={
          item.expanded
            ? `${localizedStrings['%enhancedResources_enc_collapseItem%']} ${item.title}`
            : `${localizedStrings['%enhancedResources_enc_expandItem%']} ${item.title}`
        }
      >
        {/* Expand/collapse icon */}
        <span className="tw-w-[22px] tw-shrink-0 tw-flex tw-items-center tw-justify-center tw-mt-0.5">
          {item.expanded ? (
            <ChevronDown className="tw-h-4 tw-w-4" />
          ) : (
            <ChevronRight className="tw-h-4 tw-w-4" />
          )}
        </span>

        {/* Title and teaser area */}
        <div className="tw-flex-1 tw-min-w-0">
          <span className="tw-text-sm tw-font-medium">{item.title}</span>
          {/* Teaser text shown in collapsed and expanded views */}
          {item.teaserHtml ? (
            <p className="tw-text-xs tw-text-muted-foreground tw-mt-0.5 tw-line-clamp-2 tw-m-0">
              {item.teaserHtml}
            </p>
          ) : undefined}
        </div>
      </button>

      {/* Expanded detail section */}
      {item.expanded ? (
        <div className="tw-pl-[30px] tw-pr-2 tw-pb-3 tw-pt-1 tw-bg-accent/20">
          {/* Source text */}
          {item.sourceText ? (
            <div className="tw-text-sm tw-mb-2">
              <span className="tw-font-medium">
                {localizedStrings['%enhancedResources_enc_sourceText%']}
              </span>{' '}
              <span dir="auto">{item.sourceText}</span>
            </div>
          ) : undefined}

          {/* Translations */}
          {item.translations.length > 0 ? (
            <div className="tw-text-sm tw-mb-2">
              <span className="tw-font-medium">
                {localizedStrings['%enhancedResources_enc_translations%']}
              </span>{' '}
              {item.translations.join(', ')}
            </div>
          ) : undefined}

          {/* See also cross-references */}
          {item.seeAlso.length > 0 ? (
            <div className="tw-text-sm tw-mb-2">
              <span className="tw-font-medium tw-text-muted-foreground">
                {localizedStrings['%enhancedResources_enc_seeAlso%']}
              </span>{' '}
              {item.seeAlso.map((ref, idx) => (
                <span key={ref.id}>
                  {idx > 0 ? ', ' : ''}
                  <span className="tw-text-blue-600">{ref.title}</span>
                </span>
              ))}
            </div>
          ) : undefined}

          {/* Read full article link */}
          <Button
            type="button"
            variant="link"
            size="sm"
            className="tw-h-auto tw-p-0 tw-text-sm tw-text-blue-600 hover:tw-text-blue-800"
            onClick={handleReadArticle}
            aria-label={`${localizedStrings['%enhancedResources_enc_readFullArticle%']} - ${item.title}`}
          >
            {localizedStrings['%enhancedResources_enc_readFullArticle%']}
          </Button>
        </div>
      ) : undefined}
    </div>
  );
}
