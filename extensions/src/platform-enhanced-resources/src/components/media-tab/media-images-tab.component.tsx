import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';
import type { UIEvent } from 'react';
import {
  ResourceList,
  RESOURCE_LIST_STRING_KEYS,
  type ResourceListItem,
} from '../shared/resource-list.component';
import {
  MediaEntryRow,
  MEDIA_ENTRY_ROW_STRING_KEYS,
  type MediaEntryRowData,
} from './media-entry-row.component';

/** Object containing all keys used for localization in this component. */
export const MEDIA_IMAGES_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_media_images_tabLabel%',
  '%enhancedResources_media_images_emptyState_noData%',
  '%enhancedResources_media_images_countLabel_singular%',
  '%enhancedResources_media_images_countLabel_plural%',
  ...RESOURCE_LIST_STRING_KEYS,
  ...MEDIA_ENTRY_ROW_STRING_KEYS,
] as const);

type MediaImagesTabLocalizedStringKey = (typeof MEDIA_IMAGES_TAB_STRING_KEYS)[number];
type MediaImagesTabLocalizedStrings = {
  [key in MediaImagesTabLocalizedStringKey]?: LocalizedStringValue;
};

export type MediaImagesTabProps = {
  /**
   * Pre-filtered media items. Per BHV-601 + TS-071 the parent is responsible for filtering out
   * Satellite Bible Atlas entries; the tab is presentational. Each item must satisfy
   * `item.collection !== 'Satellite Bible Atlas'`.
   */
  items: MediaEntryRowData[];

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

  /** Click handler for a thumbnail / row body - parent routes to MediaViewer (UI-PKG-005). */
  onThumbnailClick?: (imageId: string, displayIndex: number) => void;

  /** Scroll handler forwarded to ResourceList for progressive loading. */
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;

  localizedStringsWithLoadingState?: [MediaImagesTabLocalizedStrings, boolean];
};

/**
 * Pure presentational MediaImagesTab. Renders a ResourceList (thumbnail variant) of MediaEntryRow
 * bodies. The Maps-tab counterpart (MediaMapsTab) shares this component's structure but filters the
 * opposite way - "Satellite Bible Atlas" only.
 *
 * Empty state (BHV-352):
 *
 * - Message: "No images for {scope}." rendered when `items.length === 0`.
 *
 * Deferred loading (BHV-359):
 *
 * - When `loaded === false` rows render with skeleton thumbnails. The wiring layer toggles `loaded`
 *   to `true` when the tab becomes visible and the thumbnail bytes have arrived.
 *
 * Click routing (BHV-354):
 *
 * - Clicking a row fires `onThumbnailClick(imageId, displayIndex)`; the parent opens the MediaViewer
 *   overlay (UI-PKG-005).
 */
export function MediaImagesTab({
  items,
  isLoading = false,
  loaded = true,
  scopeLabel = '',
  thumbnailUrlResolver,
  onThumbnailClick = () => {},
  onScroll,
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

  // Map media entries -> ResourceListItem (thumbnail variant). The display index is computed at
  // click time via items.findIndex (see onItemClick below); the wiring layer forwards it to
  // MediaViewer for next/prev navigation.
  const listItems: ResourceListItem[] = items.map((item) => ({
    id: item.imageId,
    primary: (
      <MediaEntryRow
        item={item}
        loaded={loaded}
        thumbnailUrlResolver={thumbnailUrlResolver}
        localizedStringsWithLoadingState={childStrings}
      />
    ),
    // Display-index closure is captured per row; ResourceList only forwards `id`, so we build
    // the full handler here.
    selectable: true,
    expanded: undefined,
    secondary: undefined,
  }));

  return (
    <div
      className="tw-flex tw-h-full tw-min-h-0 tw-flex-col"
      data-testid="media-images-tab"
      aria-label={tabLabel}
    >
      <div className="tw-flex tw-shrink-0 tw-items-center tw-justify-between tw-border-b tw-border-border tw-px-2 tw-py-1">
        <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
          {tabLabel}
        </span>
        {items.length > 0 && (
          <span className="tw-text-xs tw-text-muted-foreground" data-testid="media-images-count">
            {countMessage}
          </span>
        )}
      </div>
      <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col">
        <ResourceList
          items={listItems}
          variant="thumbnail"
          showSecondaryColumn={false}
          onItemClick={(id) => {
            const index = items.findIndex((it) => it.imageId === id);
            if (index >= 0) onThumbnailClick(id, index);
          }}
          emptyMessage={
            <div data-testid="media-images-empty-state" className="tw-text-sm">
              {emptyMessage}
            </div>
          }
          isLoading={isLoading}
          onScroll={onScroll}
          ariaLabel={tabLabel}
          testId="media-images-list"
          localizedStringsWithLoadingState={childStrings}
        />
      </div>
    </div>
  );
}

export default MediaImagesTab;
