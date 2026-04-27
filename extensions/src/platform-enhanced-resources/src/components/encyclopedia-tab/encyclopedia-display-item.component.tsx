import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  cn,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS = Object.freeze([
  '%enhancedResources_encyclopedia_copySurfaceForm%',
  '%enhancedResources_encyclopedia_copyLemma%',
  '%enhancedResources_encyclopedia_sourceTextTooltip%',
  '%enhancedResources_encyclopedia_articleTitleTooltip%',
  '%enhancedResources_encyclopedia_thumbnailLabel%',
] as const);

type EncyclopediaDisplayItemLocalizedStringKey =
  (typeof ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS)[number];
type EncyclopediaDisplayItemLocalizedStrings = {
  [key in EncyclopediaDisplayItemLocalizedStringKey]?: LocalizedStringValue;
};

/** Single encyclopedia article reference attached to a display item. */
export type EncyclopediaEntryRefData = {
  articleId: string;
  key: string;
  title: string;
  teaserText: string;
  formatVersion: 1 | 2;
  inlineImageIds?: string[];
};

/**
 * Display data for a single encyclopedia entry row. Mirrors data-contracts.md
 * EncyclopediaDisplayItem (post-3B reconciled shape).
 */
export type EncyclopediaDisplayItemData = {
  tokenId: string;
  /** Lemma in original Hebrew/Greek script. */
  lemma: string;
  /**
   * Source text rendered in the row (may be a comma-separated set when the lemma includes related
   * forms, e.g. beker, bikrah).
   */
  sourceText: string;
  /** Transliteration. */
  translit: string;
  /** Localized glosses for the lemma. */
  glosses: string[];
  /** Article references (may be multiple per lemma when SDBH/SDBG group articles together). */
  entries: EncyclopediaEntryRefData[];
  /** Image ids referenced by the article(s). */
  imageIds: string[];
  /** Collection identifier (FAUNA / FLORA / REALIA). */
  collection: string;
};

export type EncyclopediaDisplayItemProps = {
  /** Entry data to render. */
  item: EncyclopediaDisplayItemData;
  /**
   * Resolver for thumbnail URLs - production maps to `papi-er://images/{id}`; Storybook supplies a
   * placehold.co resolver per FN-009. When undefined thumbnails are not rendered.
   */
  thumbnailUrlResolver?: (imageId: string) => string;

  /** Click handlers (parent routes to MarbleForm / drawer). */
  onSourceTextClick?: (tokenId: string) => void;
  onArticleTitleClick?: (articleId: string) => void;

  /** Context menu handlers (BHV-353). */
  onCopySurfaceForm?: (item: EncyclopediaDisplayItemData) => void;
  onCopyLemma?: (item: EncyclopediaDisplayItemData) => void;

  localizedStringsWithLoadingState?: [EncyclopediaDisplayItemLocalizedStrings, boolean];
};

/**
 * Pure presentational entry-row body content used inside ResourceList. The parent ResourceList
 * supplies the expand chevron, hover background, and trailing badge slot - this component renders
 * the lemma block (column 1) plus article title + teaser + thumbnails (column 2).
 *
 * Per BHV-353, right-clicking the lemma exposes a context menu with Copy surface form / Copy lemma
 * actions; the actual clipboard operation is the parent's responsibility.
 *
 * Selectors:
 *
 * - `data-testid="encyclopedia-entry-{tokenId}"` (root)
 * - `role="link"` on the article title (per ui-spec-encyclopedia-tab.md test contract)
 */
export function EncyclopediaDisplayItem({
  item,
  thumbnailUrlResolver,

  onSourceTextClick = () => {},
  onArticleTitleClick = () => {},

  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},

  localizedStringsWithLoadingState = [{}, false],
}: EncyclopediaDisplayItemProps) {
  const getLocalizedString = (key: EncyclopediaDisplayItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const copySurfaceFormLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_copySurfaceForm%'),
  );
  const copyLemmaLabel = String(getLocalizedString('%enhancedResources_encyclopedia_copyLemma%'));
  const sourceTextTooltip = String(
    getLocalizedString('%enhancedResources_encyclopedia_sourceTextTooltip%'),
  );
  const articleTitleTooltip = String(
    getLocalizedString('%enhancedResources_encyclopedia_articleTitleTooltip%'),
  );
  const thumbnailLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_thumbnailLabel%'),
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          data-testid={`encyclopedia-entry-${item.tokenId}`}
          className={cn('tw-flex tw-w-full tw-flex-row tw-items-start tw-gap-3 tw-text-sm')}
        >
          <div className="tw-flex tw-w-[160px] tw-min-w-0 tw-shrink-0 tw-flex-col">
            <Button
              variant="link"
              className="tw-h-auto tw-justify-start tw-p-0 tw-text-start tw-text-sm"
              aria-label={sourceTextTooltip}
              onClick={() => onSourceTextClick(item.tokenId)}
            >
              <span className="tw-truncate tw-font-semibold">{item.translit}</span>
            </Button>
            <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
              <span>{item.sourceText}</span>{' '}
              <span className="tw-italic">{item.collection.toLowerCase()}</span>
            </span>
            {item.glosses.length > 0 && (
              <span className="tw-mt-0.5 tw-truncate tw-text-xs tw-text-muted-foreground">
                {item.glosses.join(', ')}
              </span>
            )}
          </div>
          <div className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col tw-gap-1">
            {item.entries.map((entry) => (
              <div key={entry.articleId} className="tw-flex tw-flex-col">
                <Button
                  variant="link"
                  role="link"
                  className="tw-h-auto tw-justify-start tw-p-0 tw-text-start tw-text-sm tw-font-medium"
                  aria-label={articleTitleTooltip}
                  onClick={() => onArticleTitleClick(entry.articleId)}
                >
                  <span className="tw-truncate">{entry.title}</span>
                </Button>
                <span className="tw-line-clamp-2 tw-text-xs tw-text-muted-foreground">
                  {entry.teaserText}
                </span>
              </div>
            ))}
            {thumbnailUrlResolver && item.imageIds.length > 0 && (
              <div aria-label={thumbnailLabel} className="tw-mt-1 tw-flex tw-flex-wrap tw-gap-1">
                {item.imageIds.map((imageId) => (
                  <img
                    key={imageId}
                    src={thumbnailUrlResolver(imageId)}
                    alt={`${thumbnailLabel}: ${imageId}`}
                    className="tw-h-9 tw-w-12 tw-rounded tw-border tw-border-border tw-object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onCopySurfaceForm(item)}>
          {copySurfaceFormLabel}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onCopyLemma(item)}>{copyLemmaLabel}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default EncyclopediaDisplayItem;
