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
export const MEDIA_MAPS_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_media_maps_tabLabel%',
  '%enhancedResources_media_maps_emptyState_noData%',
  '%enhancedResources_media_maps_countLabel_singular%',
  '%enhancedResources_media_maps_countLabel_plural%',
  ...RESOURCE_LIST_STRING_KEYS,
  ...MEDIA_ENTRY_ROW_STRING_KEYS,
] as const);

type MediaMapsTabLocalizedStringKey = (typeof MEDIA_MAPS_TAB_STRING_KEYS)[number];
type MediaMapsTabLocalizedStrings = {
  [key in MediaMapsTabLocalizedStringKey]?: LocalizedStringValue;
};

export type MediaMapsTabProps = {
  /**
   * Pre-filtered map items. Per BHV-601 + TS-071 the parent is responsible for keeping only
   * Satellite Bible Atlas entries; the tab is presentational. Each item should satisfy
   * `item.collection === 'Satellite Bible Atlas'`.
   */
  items: MediaEntryRowData[];

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

  /** Click handler - parent routes to MediaViewer (UI-PKG-005). */
  onThumbnailClick?: (imageId: string, displayIndex: number) => void;

  /** Scroll handler forwarded to ResourceList. */
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;

  localizedStringsWithLoadingState?: [MediaMapsTabLocalizedStrings, boolean];
};

/**
 * Pure presentational MediaMapsTab. Mirrors MediaImagesTab but with maps-specific labels and
 * "Satellite Bible Atlas" filter convention (TS-071).
 *
 * The structural shape is intentionally similar to MediaImagesTab so the wiring layer can swap data
 * sources without re-implementing layout. The two tabs are not collapsed into one because the
 * empty-state copy and tab label differ, and Theme 14 keeps the Storybook hierarchy explicit for UX
 * review.
 */
export function MediaMapsTab({
  items,
  isLoading = false,
  loaded = true,
  scopeLabel = '',
  thumbnailUrlResolver,
  onThumbnailClick = () => {},
  onScroll,
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
    selectable: true,
    expanded: undefined,
    secondary: undefined,
  }));

  return (
    <div
      className="tw-flex tw-h-full tw-min-h-0 tw-flex-col"
      data-testid="media-maps-tab"
      aria-label={tabLabel}
    >
      <div className="tw-flex tw-shrink-0 tw-items-center tw-justify-between tw-border-b tw-border-border tw-px-2 tw-py-1">
        <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
          {tabLabel}
        </span>
        {items.length > 0 && (
          <span className="tw-text-xs tw-text-muted-foreground" data-testid="media-maps-count">
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
            <div data-testid="media-maps-empty-state" className="tw-text-sm">
              {emptyMessage}
            </div>
          }
          isLoading={isLoading}
          onScroll={onScroll}
          ariaLabel={tabLabel}
          testId="media-maps-list"
          localizedStringsWithLoadingState={childStrings}
        />
      </div>
    </div>
  );
}

export default MediaMapsTab;
