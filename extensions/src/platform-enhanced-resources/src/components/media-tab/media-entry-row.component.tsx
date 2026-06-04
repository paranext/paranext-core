import { Badge, Skeleton, cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const MEDIA_ENTRY_ROW_STRING_KEYS = Object.freeze([
  '%enhancedResources_media_thumbnailLabel%',
  '%enhancedResources_media_thumbnailLoading%',
] as const);

type MediaEntryRowLocalizedStringKey = (typeof MEDIA_ENTRY_ROW_STRING_KEYS)[number];
type MediaEntryRowLocalizedStrings = {
  [key in MediaEntryRowLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Display data for a single media-tab entry. Mirrors data-contracts.md MediaDisplayItem (post-3B
 * reconciled shape) but without the index/source fields the UI does not need.
 *
 * Verse-ref-only entries (BHV-612): media items are keyed by verse range, not by lemma. The
 * `referenceLabel` is the parent-formatted label (e.g. "GEN 1:1" or "ACT 2:1-5:42").
 */
export type MediaEntryRowData = {
  imageId: string;
  title: string;
  /** Pre-formatted localized verse-range label (e.g., "GEN 1:1" or "ACT 2:1-5:42"). */
  referenceLabel: string;
  /** Collection name (e.g., "General", "Satellite Bible Atlas"). */
  collection: string;
  /** Type of media - drives the badge text shown next to the title. */
  mediaType: 'image' | 'map';
};

export type MediaEntryRowProps = {
  /** Entry data to render. */
  item: MediaEntryRowData;

  /**
   * Whether the thumbnail bytes have loaded yet. When `false`, a Skeleton placeholder is rendered
   * in place of the thumbnail image (BHV-359 deferred-loading: media tabs do not load thumbnail
   * bytes until the tab becomes visible).
   *
   * Defaults to `true` so the row is fully rendered when callers don't opt into the deferred state.
   */
  loaded?: boolean;

  /**
   * Resolver for thumbnail URLs - production maps to `papi-er://images/{id}` (FN-009 seam);
   * Storybook supplies a placehold.co resolver. When undefined the thumbnail slot is empty.
   */
  thumbnailUrlResolver?: (imageId: string) => string;

  localizedStringsWithLoadingState?: [MediaEntryRowLocalizedStrings, boolean];
};

/**
 * Pure presentational entry-row body for the Media / Maps tabs. Designed to be passed via the
 * `renderItem` slot of `SourceLanguageIndexedList` (variant=thumbnail). The list owns the
 * click-target, hover background, and selection styling - this component renders only the body.
 *
 * Layout (left-to-right):
 *
 *      [thumbnail (or skeleton)] [title + media-type badge (line 1) + reference (line 2)]
 *
 * Selectors:
 *
 * - `data-testid="media-entry-{imageId}"` (root)
 */
export function MediaEntryRow({
  item,
  loaded = true,
  thumbnailUrlResolver,
  localizedStringsWithLoadingState = [{}, false],
}: MediaEntryRowProps) {
  const getLocalizedString = (key: MediaEntryRowLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const thumbnailLabelTemplate = String(
    getLocalizedString('%enhancedResources_media_thumbnailLabel%'),
  );
  const thumbnailLoadingLabel = String(
    getLocalizedString('%enhancedResources_media_thumbnailLoading%'),
  );

  // Thumbnail label: include the entry title when available (alt text + ARIA).
  const thumbnailLabel = thumbnailLabelTemplate.replace('{title}', item.title);
  const thumbnailUrl = thumbnailUrlResolver ? thumbnailUrlResolver(item.imageId) : undefined;

  return (
    <div
      data-testid={`media-entry-${item.imageId}`}
      className={cn('tw:flex tw:w-full tw:items-center tw:gap-3')}
    >
      <div
        className={cn(
          'tw:flex tw:h-14 tw:w-14 tw:shrink-0 tw:items-center tw:justify-center',
          'tw:overflow-hidden tw:rounded tw:border tw:border-border tw:bg-muted/40',
        )}
      >
        {!loaded && (
          <Skeleton
            aria-busy="true"
            aria-label={thumbnailLoadingLabel}
            className="tw:h-full tw:w-full"
          />
        )}
        {loaded && thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={thumbnailLabel}
            className="tw:h-full tw:w-full tw:object-cover"
          />
        )}
        {loaded && !thumbnailUrl && (
          // No resolver supplied - render a neutral placeholder block so the layout stays stable.
          // (Storybook supplies a resolver; production wiring layer always supplies one too.)
          <span aria-hidden className="tw:text-xs tw:text-muted-foreground">
            {item.collection.slice(0, 3)}
          </span>
        )}
      </div>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-0.5 tw:overflow-hidden">
        <div className="tw:flex tw:items-baseline tw:gap-2">
          <span className="tw:truncate tw:text-sm tw:font-medium">{item.title}</span>
          <Badge variant="outline" className="tw:shrink-0 tw:text-xs">
            {item.mediaType}
          </Badge>
        </div>
        <span className="tw:truncate tw:text-xs tw:text-muted-foreground">
          {item.referenceLabel}
        </span>
      </div>
    </div>
  );
}

export default MediaEntryRow;
