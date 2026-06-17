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
export const MEDIA_IMAGES_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_media_images_tabLabel%',
  '%enhancedResources_media_images_emptyState_noData%',
  '%enhancedResources_media_images_countLabel_singular%',
  '%enhancedResources_media_images_countLabel_plural%',
  ...MEDIA_ENTRY_ROW_STRING_KEYS,
  ...MEDIA_ITEM_DETAIL_STRING_KEYS,
] as const);

type MediaImagesTabLocalizedStringKey = (typeof MEDIA_IMAGES_TAB_STRING_KEYS)[number];
type MediaImagesTabLocalizedStrings = {
  [key in MediaImagesTabLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Adapter row item: combines our MediaEntryRowData with the IndexedListItem shape required by
 * SourceLanguageIndexedList. The list expects `id` and `primaryText`; we map both from the entry.
 */
type MediaImagesRowItem = IndexedListItem & MediaEntryRowData;

const toRowItem = (entry: MediaEntryRowData): MediaImagesRowItem => ({
  ...entry,
  id: entry.imageId,
  primaryText: entry.title,
});

export type MediaImagesTabProps = {
  /**
   * Pre-filtered media items. Per BHV-601 + TS-071 the parent is responsible for filtering out
   * Satellite Bible Atlas entries; the tab is presentational.
   */
  items: MediaEntryRowData[];

  /** Currently selected image id (controlled). When set, the side drawer opens to that entry. */
  selectedItemId?: string;

  /** Selection callback - parent toggles drawer via this. */
  onSelectionChange?: (id: string | undefined) => void;

  /** Maximize callback - fired from the drawer's Maximize button. Parent opens the MediaViewer. */
  onMaximize?: (id: string) => void;

  /** Shell-level loading flag - shows skeleton rows for the entire list. */
  isLoading?: boolean;

  /**
   * Whether the thumbnail bytes are loaded. Per BHV-359 the Media tab defers thumbnail loading
   * until the tab is visible, so the wiring layer flips this from `false` -> `true` when the tab
   * becomes active. While `false`, the rows render but each thumbnail shows a Skeleton
   * placeholder.
   */
  loaded?: boolean;

  /** Localized scope label used in the empty-state message. */
  scopeLabel?: string;

  /**
   * FN-009 seam: production maps imageId -> `papi-er://images/{id}`; stories use placehold.co. When
   * undefined the thumbnail slot is rendered without an image source.
   */
  thumbnailUrlResolver?: (imageId: string) => string;

  localizedStringsWithLoadingState?: [MediaImagesTabLocalizedStrings, boolean];
};

/**
 * Pure presentational MediaImagesTab. Renders a `SourceLanguageIndexedList` (variant=thumbnail) of
 * `MediaEntryRow` bodies with a side-drawer detail. The drawer's Maximize button fires `onMaximize`
 * so the parent can open the MediaViewer Dialog.
 *
 * Note: We consume `SourceLanguageIndexedList` directly (not the `ErMediaList` wrapper) because
 * that wrapper unconditionally overrides `renderItem`, which would silently drop our custom row
 * (badge + verse-range label).
 *
 * Empty state (BHV-352):
 *
 * - Message: "No images for {scope}." rendered when `items.length === 0`.
 *
 * Deferred loading (BHV-359):
 *
 * - When `loaded === false` rows render with skeleton thumbnails. The wiring layer toggles `loaded`
 *   to `true` when the tab becomes visible and the thumbnail bytes have arrived.
 */
export function MediaImagesTab({
  items,
  selectedItemId,
  onSelectionChange = () => {},
  onMaximize = () => {},
  isLoading = false,
  loaded = true,
  scopeLabel = '',
  thumbnailUrlResolver,
  localizedStringsWithLoadingState = [{}, false],
}: MediaImagesTabProps) {
  const getLocalizedString = (key: MediaImagesTabLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const tabLabel = String(getLocalizedString('%enhancedResources_media_images_tabLabel%'));
  const emptyStateRaw = String(
    getLocalizedString('%enhancedResources_media_images_emptyState_noData%'),
  );
  const countLabelSingular = String(
    getLocalizedString('%enhancedResources_media_images_countLabel_singular%'),
  );
  const countLabelPlural = String(
    getLocalizedString('%enhancedResources_media_images_countLabel_plural%'),
  );

  const emptyMessage = formatReplacementString(emptyStateRaw, { scope: scopeLabel });
  const countTemplate = items.length === 1 ? countLabelSingular : countLabelPlural;
  const countMessage = formatReplacementString(countTemplate, { count: items.length });

  const childStrings: [MediaImagesTabLocalizedStrings, boolean] = localizedStringsWithLoadingState;

  const rowItems = useMemo(() => items.map(toRowItem), [items]);

  return (
    <div
      className="tw:flex tw:h-full tw:min-h-0 tw:flex-col"
      data-testid="media-images-tab"
      aria-label={tabLabel}
    >
      <div className="tw:flex tw:shrink-0 tw:items-center tw:justify-between tw:border-b tw:border-border tw:px-2 tw:py-1">
        <span className="tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
          {tabLabel}
        </span>
        {items.length > 0 && (
          <span className="tw:text-xs tw:text-muted-foreground" data-testid="media-images-count">
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

export default MediaImagesTab;
