import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';

const ZOOM_MIN = 0.25;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.25;

/** Image item shown in the MediaViewer Dialog. Mirrors the shape used by MediaItemDetail. */
export type MediaViewerItem = {
  /** Image identifier - production wiring maps this to `papi-er://images/{id}`. */
  imageId: string;
  /** Image title / caption. Used as alt text and visible Dialog title. */
  title: string;
  /** Type of media (image | map) - reserved for future badge / styling parity with MediaEntryRow. */
  mediaType?: 'image' | 'map';
  /** Optional caption rendered beneath the image. */
  caption?: string;
};

/** Object containing all keys used for localization in this component. */
export const MEDIA_VIEWER_STRING_KEYS = Object.freeze([
  '%enhancedResources_mediaViewer_previous%',
  '%enhancedResources_mediaViewer_next%',
  '%enhancedResources_mediaViewer_zoomIn%',
  '%enhancedResources_mediaViewer_zoomOut%',
  '%enhancedResources_mediaViewer_imageAlt%',
  '%enhancedResources_mediaViewer_zoomLevelAnnouncement%',
] as const);

type MediaViewerLocalizedStringKey = (typeof MEDIA_VIEWER_STRING_KEYS)[number];
type MediaViewerLocalizedStrings = {
  [key in MediaViewerLocalizedStringKey]?: LocalizedStringValue;
};

export type MediaViewerProps = {
  /** Whether the viewer is open (controlled by parent). */
  open: boolean;
  /** Currently displayed item; undefined renders an empty Dialog body. */
  item?: MediaViewerItem;
  /**
   * FN-009 seam: production maps imageId -> `papi-er://images/{id}`; stories use placehold.co. When
   * undefined the image slot is empty.
   */
  imageUrlResolver?: (imageId: string) => string;
  /** Open-state change handler - mirrors shadcn Dialog's onOpenChange. */
  onOpenChange: (open: boolean) => void;
  /** Previous-image handler - undefined disables the Previous button. */
  onPrev?: () => void;
  /** Next-image handler - undefined disables the Next button. */
  onNext?: () => void;
  localizedStringsWithLoadingState?: [MediaViewerLocalizedStrings, boolean];
};

/**
 * Pure presentational MediaViewer rendered as a centered shadcn Dialog. Image-only per DEF-UI-005.
 *
 * Replaces the previous in-tab Drawer surface (PR-2209 review: maximize affordance moved to a
 * dialog so the image fills the viewport rather than the research-pane drawer). Zoom is via CSS
 * `transform: scale()` on the `<img>`. Navigation is parent-controlled - the parent supplies/omits
 * `onPrev` / `onNext` to enable or disable each direction.
 *
 * Acceptance criteria (UI-PKG-005):
 *
 * - Dialog open/close with focus management (provided by shadcn Dialog).
 * - Previous/Next buttons disabled when handler is omitted (parent expresses boundaries).
 * - Zoom-in disabled at ZOOM_MAX; zoom-out disabled at ZOOM_MIN.
 * - Zoom resets to 1.0 when the displayed item changes.
 * - Accessibility: alt text from title; aria-live zoom-level announcement.
 */
export function MediaViewer({
  open,
  item,
  imageUrlResolver,
  onOpenChange,
  onPrev,
  onNext,
  localizedStringsWithLoadingState = [{}, false],
}: MediaViewerProps) {
  const getLocalizedString = (key: MediaViewerLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const previousLabel = String(getLocalizedString('%enhancedResources_mediaViewer_previous%'));
  const nextLabel = String(getLocalizedString('%enhancedResources_mediaViewer_next%'));
  const zoomInLabel = String(getLocalizedString('%enhancedResources_mediaViewer_zoomIn%'));
  const zoomOutLabel = String(getLocalizedString('%enhancedResources_mediaViewer_zoomOut%'));
  const imageAltTemplate = String(getLocalizedString('%enhancedResources_mediaViewer_imageAlt%'));
  const zoomAnnouncementTemplate = String(
    getLocalizedString('%enhancedResources_mediaViewer_zoomLevelAnnouncement%'),
  );

  const [zoom, setZoom] = useState(1);

  // Reset zoom when navigating to a different item so the new image starts at fit-to-viewport.
  useEffect(() => {
    setZoom(1);
  }, [item?.imageId]);

  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN)), []);

  const altText = item ? formatReplacementString(imageAltTemplate, { title: item.title }) : '';
  const zoomPercent = Math.round(zoom * 100);
  const zoomAnnouncement = formatReplacementString(zoomAnnouncementTemplate, {
    percent: zoomPercent,
  });

  const resolvedImageUrl = useMemo(() => {
    if (!item) return undefined;
    if (imageUrlResolver) return imageUrlResolver(item.imageId);
    return undefined;
  }, [item, imageUrlResolver]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="media-viewer"
        className="tw-flex tw-max-h-[95vh] tw-w-[95vw] tw-max-w-[95vw] tw-flex-col tw-overflow-hidden tw-p-4"
      >
        <div className="tw-flex tw-items-center tw-gap-2">
          <DialogTitle className="tw-flex-1 tw-truncate">{item ? item.title : ''}</DialogTitle>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onPrev}
                  disabled={!onPrev}
                  aria-label={previousLabel}
                  data-testid="media-viewer-previous"
                  className="tw-h-8 tw-w-8"
                >
                  <ChevronLeft className="tw-h-4 tw-w-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{previousLabel}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  disabled={!onNext}
                  aria-label={nextLabel}
                  data-testid="media-viewer-next"
                  className="tw-h-8 tw-w-8"
                >
                  <ChevronRight className="tw-h-4 tw-w-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{nextLabel}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={zoomOut}
                  disabled={zoom <= ZOOM_MIN}
                  aria-label={zoomOutLabel}
                  data-testid="media-viewer-zoom-out"
                  className="tw-h-8 tw-w-8"
                >
                  <ZoomOut className="tw-h-4 tw-w-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{zoomOutLabel}</TooltipContent>
            </Tooltip>
            <span
              className="tw-w-12 tw-text-center tw-text-xs tw-tabular-nums tw-text-muted-foreground"
              data-testid="media-viewer-zoom-percent"
            >
              {zoomPercent}%
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={zoomIn}
                  disabled={zoom >= ZOOM_MAX}
                  aria-label={zoomInLabel}
                  data-testid="media-viewer-zoom-in"
                  className="tw-h-8 tw-w-8"
                >
                  <ZoomIn className="tw-h-4 tw-w-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{zoomInLabel}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Spacer to clear the built-in DialogContent close (X) button */}
          <div className="tw-w-8" />
        </div>
        <div className="tw-flex tw-flex-1 tw-items-center tw-justify-center tw-overflow-auto">
          {item && resolvedImageUrl && (
            <img
              src={resolvedImageUrl}
              alt={altText}
              data-testid="media-viewer-image"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
              className="tw-max-h-full tw-max-w-full tw-object-contain tw-transition-transform"
            />
          )}
        </div>
        {item?.caption && (
          <p className="tw-text-sm tw-text-muted-foreground" data-testid="media-viewer-caption">
            {item.caption}
          </p>
        )}
        {/* ARIA live region: announce zoom changes to screen readers without interrupting. */}
        <div role="status" aria-live="polite" className="tw-sr-only">
          {zoomAnnouncement}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MediaViewer;
