import { useMemo } from 'react';
import { SourceLanguageIndexedList, type IndexedListItem } from 'platform-bible-react/experimental';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';
import {
  MediaEntryRow,
  MEDIA_ENTRY_ROW_STRING_KEYS,
  type MediaEntryRowData,
} from './media-entry-row.component';
import { MediaItemDetail, MEDIA_ITEM_DETAIL_STRING_KEYS } from './media-item-detail.component';

/** Object containing all keys used for localization in this component. */
export const MEDIA_MAPS_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_media_maps_tabLabel%',
  '%enhancedResources_media_maps_emptyState_noData%',
  '%enhancedResources_media_maps_countLabel_singular%',
  '%enhancedResources_media_maps_countLabel_plural%',
  ...MEDIA_ENTRY_ROW_STRING_KEYS,
  ...MEDIA_ITEM_DETAIL_STRING_KEYS,
] as const);

type MediaMapsTabLocalizedStringKey = (typeof MEDIA_MAPS_TAB_STRING_KEYS)[number];
type MediaMapsTabLocalizedStrings = {
  [key in MediaMapsTabLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Adapter row item: combines our MediaEntryRowData with the IndexedListItem shape required by
 * SourceLanguageIndexedList.
 */
type MediaMapsRowItem = IndexedListItem & MediaEntryRowData;

const toRowItem = (entry: MediaEntryRowData): MediaMapsRowItem => ({
  ...entry,
  id: entry.imageId,
  primaryText: entry.title,
});

export type MediaMapsTabProps = {
  /**
   * Pre-filtered map items. Per BHV-601 + TS-071 the parent is responsible for keeping only
   * Satellite Bible Atlas entries; the tab is presentational.
   */
  items: MediaEntryRowData[];

  /** Currently selected map id (controlled). When set, the side drawer opens to that entry. */
  selectedItemId?: string;

  /** Selection callback - parent toggles drawer via this. */
  onSelectionChange?: (id: string | undefined) => void;

  /** Maximize callback - fired from the drawer's Maximize button. Parent opens the MediaViewer. */
  onMaximize?: (id: string) => void;

  /** Shell-level loading flag - shows skeleton rows for the entire list. */
  isLoading?: boolean;

  /**
   * Whether the thumbnail bytes are loaded. Per BHV-359 the Maps tab defers thumbnail loading until
   * the tab is visible.
   */
  loaded?: boolean;

  /** Localized scope label used in the empty-state message. */
  scopeLabel?: string;

  /** FN-009 seam: production papi-er://, stories placehold.co. */
  thumbnailUrlResolver?: (imageId: string) => string;

  localizedStringsWithLoadingState?: [MediaMapsTabLocalizedStrings, boolean];
};

/**
 * Pure presentational MediaMapsTab. Mirrors MediaImagesTab but with maps-specific labels and the
 * "Satellite Bible Atlas" filter convention (TS-071). Renders a `SourceLanguageIndexedList`
 * (variant=thumbnail) of `MediaEntryRow` bodies with a shared `MediaItemDetail` drawer.
 *
 * The two tabs are not collapsed into one because the empty-state copy and tab label differ, and
 * Theme 14 keeps the Storybook hierarchy explicit for UX review.
 */
export function MediaMapsTab({
  items,
  selectedItemId,
  onSelectionChange = () => {},
  onMaximize = () => {},
  isLoading = false,
  loaded = true,
  scopeLabel = '',
  thumbnailUrlResolver,
  localizedStringsWithLoadingState = [{}, false],
}: MediaMapsTabProps) {
  const getLocalizedString = (key: MediaMapsTabLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const tabLabel = String(getLocalizedString('%enhancedResources_media_maps_tabLabel%'));
  const emptyStateRaw = String(
    getLocalizedString('%enhancedResources_media_maps_emptyState_noData%'),
  );
  const countLabelSingular = String(
    getLocalizedString('%enhancedResources_media_maps_countLabel_singular%'),
  );
  const countLabelPlural = String(
    getLocalizedString('%enhancedResources_media_maps_countLabel_plural%'),
  );

  const emptyMessage = formatReplacementString(emptyStateRaw, { scope: scopeLabel });
  const countTemplate = items.length === 1 ? countLabelSingular : countLabelPlural;
  const countMessage = formatReplacementString(countTemplate, { count: items.length });

  const childStrings: [MediaMapsTabLocalizedStrings, boolean] = localizedStringsWithLoadingState;

  const rowItems = useMemo(() => items.map(toRowItem), [items]);

  return (
    <div
      className="tw:flex tw:h-full tw:min-h-0 tw:flex-col"
      data-testid="media-maps-tab"
      aria-label={tabLabel}
    >
      <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-between tw:border-b tw:border-border tw:px-2 tw:py-1">
        <span className="tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
          {tabLabel}
        </span>
        {items.length > 0 && (
          <span className="tw:text-xs tw:text-muted-foreground" data-testid="media-maps-count">
            {countMessage}
          </span>
        )}
      </div>
      <div className="tw:flex tw:min-h-0 tw:flex-1">
        <SourceLanguageIndexedList
          items={rowItems}
          selectedItemId={selectedItemId}
          onItemClick={(item) =>
            onSelectionChange(item.id === selectedItemId ? undefined : item.id)
          }
          isLoading={isLoading}
          emptyStateMessage={emptyMessage}
          variant="thumbnail"
          renderItem={(item) => (
            <MediaEntryRow
              item={item}
              loaded={loaded}
              thumbnailUrlResolver={thumbnailUrlResolver}
              localizedStringsWithLoadingState={childStrings}
            />
          )}
          renderDetailContent={(item, onClose) => (
            <MediaItemDetail
              item={item}
              thumbnailUrlResolver={thumbnailUrlResolver}
              onClose={onClose}
              onMaximize={() => onMaximize(item.id)}
              localizedStringsWithLoadingState={childStrings}
            />
          )}
          className="tw:h-full tw:w-full"
        />
      </div>
    </div>
  );
}

export default MediaMapsTab;
