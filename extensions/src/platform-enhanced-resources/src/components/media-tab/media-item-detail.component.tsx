import { ArrowLeft, Maximize2 } from 'lucide-react';
import { Badge, Button } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { MediaEntryRowData } from './media-entry-row.component';

/** Object containing all keys used for localization in this component. */
export const MEDIA_ITEM_DETAIL_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_backToList%',
  '%enhancedResources_media_maximize%',
  '%enhancedResources_media_thumbnailLabel%',
] as const);

type MediaItemDetailLocalizedStringKey = (typeof MEDIA_ITEM_DETAIL_STRING_KEYS)[number];
type MediaItemDetailLocalizedStrings = {
  [key in MediaItemDetailLocalizedStringKey]?: LocalizedStringValue;
};

export type MediaItemDetailProps = {
  /** The media entry whose preview is shown in the side drawer. */
  item: MediaEntryRowData;
  /**
   * FN-009 seam: production maps imageId -> `papi-er://images/{id}`; stories use placehold.co. When
   * undefined the preview slot is rendered without an image source.
   */
  thumbnailUrlResolver?: (imageId: string) => string;
  /** Close handler - the SourceLanguageIndexedList drawer supplies this from `renderDetailContent`. */
  onClose: () => void;
  /** Maximize handler - parent opens the MediaViewer Dialog (zoom + nav). */
  onMaximize: () => void;
  localizedStringsWithLoadingState?: [MediaItemDetailLocalizedStrings, boolean];
};

/**
 * Pure presentational detail body shown inside the SourceLanguageIndexedList drawer for both the
 * Media (Images) and Maps tabs. Renders the Back-to-list button, title + media-type badge, the
 * preview image with an overlay Maximize button, and the verse-range caption.
 *
 * The Maximize button fires `onMaximize` so the parent can route to the MediaViewer Dialog (zoom +
 * navigation). This component is intentionally agnostic of the dialog state.
 */
export function MediaItemDetail({
  item,
  thumbnailUrlResolver,
  onClose,
  onMaximize,
  localizedStringsWithLoadingState = [{}, false],
}: MediaItemDetailProps) {
  const getLocalizedString = (key: MediaItemDetailLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const backToListLabel = String(getLocalizedString('%enhancedResources_dictionary_backToList%'));
  const maximizeLabel = String(getLocalizedString('%enhancedResources_media_maximize%'));
  const thumbnailLabelTemplate = String(
    getLocalizedString('%enhancedResources_media_thumbnailLabel%'),
  );
  const thumbnailLabel = thumbnailLabelTemplate.replace('{title}', item.title);

  const previewUrl = thumbnailUrlResolver ? thumbnailUrlResolver(item.imageId) : undefined;

  return (
    <div data-testid={`media-item-detail-${item.imageId}`}>
      <Button
        data-back-to-list
        type="button"
        onClick={onClose}
        variant="ghost"
        size="sm"
        className="tw:mb-3"
      >
        <ArrowLeft className="tw:mr-1 tw:h-4 tw:w-4" />
        {backToListLabel}
      </Button>
      <div className="tw:mb-3 tw:flex tw:items-center tw:gap-2">
        <h2 className="tw:text-lg">{item.title}</h2>
        <Badge variant="outline">{item.mediaType}</Badge>
      </div>
      {previewUrl && (
        <div className="tw:relative tw:mb-3">
          <img
            src={previewUrl}
            alt={thumbnailLabel}
            className="tw:w-full tw:rounded tw:object-contain"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={onMaximize}
            aria-label={maximizeLabel}
            className="tw:absolute tw:right-2 tw:top-2 tw:h-8 tw:w-8 tw:bg-background/80 tw:shadow"
          >
            <Maximize2 className="tw:h-4 tw:w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
      {item.referenceLabel && (
        <p className="tw:text-sm tw:text-muted-foreground">{item.referenceLabel}</p>
      )}
    </div>
  );
}

export default MediaItemDetail;
