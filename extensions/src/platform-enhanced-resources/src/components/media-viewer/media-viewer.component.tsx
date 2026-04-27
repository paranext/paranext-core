import type { KeyboardEvent, PointerEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from 'platform-bible-react';
import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';

/** Verse reference shape used for image reference ranges (BHV-612). */
export type MediaViewerVerseRef = {
  book: string;
  chapterNum: number;
  verseNum: number;
};

/** Image reference - mirrors ui-state-contracts.md MediaImageRef. */
export type MediaImageRef = {
  /** Image identifier - production wiring maps this to `papi-er://images/{id}`. */
  imageId: string;
  /** Image source identifier (production: same as imageId; can also be a resolved URL). */
  imageSource: string;
  /** Image title / caption. Used as alt text and visible caption. */
  title: string;
  /** Reference range this image covers (BHV-612). */
  referenceRange: { start: MediaViewerVerseRef; end: MediaViewerVerseRef };
};

/** Object containing all keys used for localization in this component. */
export const MEDIA_VIEWER_STRING_KEYS = Object.freeze([
  '%enhancedResources_mediaViewer_title%',
  '%enhancedResources_mediaViewer_close%',
  '%enhancedResources_mediaViewer_previous%',
  '%enhancedResources_mediaViewer_next%',
  '%enhancedResources_mediaViewer_zoomIn%',
  '%enhancedResources_mediaViewer_zoomOut%',
  '%enhancedResources_mediaViewer_loading%',
  '%enhancedResources_mediaViewer_imageAlt%',
  '%enhancedResources_mediaViewer_imageCounter%',
  '%enhancedResources_mediaViewer_zoomLevelAnnouncement%',
] as const);

type MediaViewerLocalizedStringKey = (typeof MEDIA_VIEWER_STRING_KEYS)[number];
type MediaViewerLocalizedStrings = {
  [key in MediaViewerLocalizedStringKey]?: LocalizedStringValue;
};

export type MediaViewerProps = {
  /** Whether the viewer is open (controlled by parent). */
  open: boolean;
  /** Pre-loaded image references in display order (BHV-452 grouping). */
  images: MediaImageRef[];
  /** Index of currently displayed image. */
  currentIndex: number;
  /** Current zoom level. 1.0 = fit-to-view. <= 1 disables zoom-out. */
  zoomLevel: number;
  /** Pan offset (CSS translate, not canvas) - applied when zoomLevel > 1. */
  panOffset?: { x: number; y: number };
  /** Loading state for the current image bytes. */
  isLoading?: boolean;
  /**
   * FN-009 seam: production maps imageId -> `papi-er://images/{id}`; stories use placehold.co. When
   * undefined the image slot renders a neutral placeholder.
   */
  imageUrlResolver?: (imageId: string) => string;
  /** Close handler - parent flips `open` to false and restores focus to trigger. */
  onClose?: () => void;
  /** Previous-image handler - parent decrements currentIndex. */
  onPrevious?: () => void;
  /** Next-image handler - parent increments currentIndex. */
  onNext?: () => void;
  /** Zoom-in handler - parent increases zoomLevel. */
  onZoomIn?: () => void;
  /** Zoom-out handler - parent decreases zoomLevel (only fired when zoomLevel > 1). */
  onZoomOut?: () => void;
  /** Pan handler fired during drag when zoomLevel > 1. */
  onPanChange?: (offset: { x: number; y: number }) => void;
  localizedStringsWithLoadingState?: [MediaViewerLocalizedStrings, boolean];
};

const ZERO_PAN = { x: 0, y: 0 };

/**
 * Pure presentational MediaViewer rendered as an in-tab Drawer (vaul + shadcn). Image-only per
 * DEF-UI-005 - no video markup. Implements BHV-452 (close/prev/next with index boundaries) and
 * BHV-612 reference-range data shape (passes through unchanged). Zoom is via CSS `transform:
 * scale() translate()` on the `<img>` - never canvas (per Theme 14 review consensus).
 *
 * Controlled API: parent owns `open`, `currentIndex`, `zoomLevel`, `panOffset` and reacts to the
 * callback props. The component reflects state into the DOM (disabled buttons, aria-live regions)
 * but never mutates parent state directly.
 *
 * Acceptance criteria (UI-PKG-005):
 *
 * - Close/Previous/Next buttons + handlers (BHV-452)
 * - Prev/Next hidden when single image (`images.length === 1`)
 * - Prev disabled at currentIndex === 0; Next disabled at currentIndex === images.length - 1
 * - Zoom-out disabled when zoomLevel <= 1
 * - Keyboard: ArrowLeft/ArrowRight nav; +/=, - zoom; Escape closes (handled by Drawer + Escape
 *   shortcut on root)
 * - Focus trap and focus return on close - provided by vaul Drawer
 * - Accessibility: alt text from title, aria-live counter for "Image X of Y", aria-live zoom level
 */
export function MediaViewer({
  open,
  images,
  currentIndex,
  zoomLevel,
  panOffset = ZERO_PAN,
  isLoading = false,
  imageUrlResolver,
  onClose = () => {},
  onPrevious = () => {},
  onNext = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
  onPanChange = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: MediaViewerProps) {
  const getLocalizedString = (key: MediaViewerLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleLabel = String(getLocalizedString('%enhancedResources_mediaViewer_title%'));
  const closeLabel = String(getLocalizedString('%enhancedResources_mediaViewer_close%'));
  const previousLabel = String(getLocalizedString('%enhancedResources_mediaViewer_previous%'));
  const nextLabel = String(getLocalizedString('%enhancedResources_mediaViewer_next%'));
  const zoomInLabel = String(getLocalizedString('%enhancedResources_mediaViewer_zoomIn%'));
  const zoomOutLabel = String(getLocalizedString('%enhancedResources_mediaViewer_zoomOut%'));
  const loadingLabel = String(getLocalizedString('%enhancedResources_mediaViewer_loading%'));
  const imageAltTemplate = String(getLocalizedString('%enhancedResources_mediaViewer_imageAlt%'));
  const counterTemplate = String(
    getLocalizedString('%enhancedResources_mediaViewer_imageCounter%'),
  );
  const zoomAnnouncementTemplate = String(
    getLocalizedString('%enhancedResources_mediaViewer_zoomLevelAnnouncement%'),
  );

  const imageCount = images.length;
  const safeIndex = Math.min(Math.max(currentIndex, 0), Math.max(imageCount - 1, 0));
  const currentImage: MediaImageRef | undefined = images[safeIndex];
  const isSingleImage = imageCount <= 1;
  const isAtStart = safeIndex <= 0;
  const isAtEnd = safeIndex >= imageCount - 1;
  const isZoomedOut = zoomLevel <= 1;

  const counterText = formatReplacementString(counterTemplate, {
    current: imageCount === 0 ? 0 : safeIndex + 1,
    total: imageCount,
  });

  const zoomPercent = Math.round(zoomLevel * 100);
  const zoomAnnouncement = formatReplacementString(zoomAnnouncementTemplate, {
    percent: zoomPercent,
  });

  const altText = currentImage
    ? formatReplacementString(imageAltTemplate, { title: currentImage.title })
    : '';

  const resolvedImageUrl = useMemo(() => {
    if (!currentImage) return undefined;
    if (imageUrlResolver) return imageUrlResolver(currentImage.imageId);
    return undefined;
  }, [currentImage, imageUrlResolver]);

  // Pan-drag tracking - drag origin lives in a ref so re-renders don't reset it. The actual pan
  // state is owned by the parent (we only emit deltas through onPanChange).
  type DragOrigin = {
    pointerId: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  };
  // useRef takes null (not undefined) per the React types contract.
  // eslint-disable-next-line no-null/no-null
  const dragOriginRef = useRef<DragOrigin | null>(null);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (isZoomedOut) return;
      dragOriginRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        baseX: panOffset.x,
        baseY: panOffset.y,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [isZoomedOut, panOffset.x, panOffset.y],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const origin = dragOriginRef.current;
      if (!origin || origin.pointerId !== event.pointerId) return;
      onPanChange({
        x: origin.baseX + (event.clientX - origin.startX),
        y: origin.baseY + (event.clientY - origin.startY),
      });
    },
    [onPanChange],
  );

  const handlePointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const origin = dragOriginRef.current;
    if (!origin || origin.pointerId !== event.pointerId) return;
    // ref.current expects null and not undefined when clearing the pointer tracker.
    // eslint-disable-next-line no-null/no-null
    dragOriginRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      // Escape is handled by Drawer's built-in focus management + the Drawer onOpenChange.
      switch (event.key) {
        case 'ArrowLeft':
          if (!isSingleImage && !isAtStart) {
            event.preventDefault();
            onPrevious();
          }
          break;
        case 'ArrowRight':
          if (!isSingleImage && !isAtEnd) {
            event.preventDefault();
            onNext();
          }
          break;
        case '+':
        case '=':
          event.preventDefault();
          onZoomIn();
          break;
        case '-':
        case '_':
          if (!isZoomedOut) {
            event.preventDefault();
            onZoomOut();
          }
          break;
        default:
          break;
      }
    },
    [isAtEnd, isAtStart, isSingleImage, isZoomedOut, onNext, onPrevious, onZoomIn, onZoomOut],
  );

  // Drawer onOpenChange: vaul fires this for Escape, click-outside, and the close button. We
  // surface it through onClose so the parent can restore focus and unset its `open` state.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) onClose();
    },
    [onClose],
  );

  // Reset the drag tracker if we close while a drag was in progress.
  useEffect(() => {
    if (!open) {
      // ref.current expects null and not undefined when clearing the pointer tracker.
      // eslint-disable-next-line no-null/no-null
      dragOriginRef.current = null;
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="bottom">
      <DrawerContent
        className="tw-h-[90vh] tw-max-h-[90vh]"
        data-testid="media-viewer"
        hideDrawerHandle
        onKeyDown={handleKeyDown}
      >
        <DrawerHeader className="tw-flex tw-flex-row tw-items-start tw-justify-between tw-gap-4 tw-border-b tw-border-border">
          <div className="tw-min-w-0 tw-flex-1 tw-text-start">
            <DrawerTitle className="tw-truncate">{titleLabel}</DrawerTitle>
            <DrawerDescription className="tw-truncate">
              {currentImage ? currentImage.title : titleLabel}
            </DrawerDescription>
          </div>
          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2">
            {!isSingleImage && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={previousLabel}
                  data-testid="media-viewer-previous"
                  disabled={isAtStart}
                  onClick={onPrevious}
                >
                  <ChevronLeft className="tw-h-5 tw-w-5" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={nextLabel}
                  data-testid="media-viewer-next"
                  disabled={isAtEnd}
                  onClick={onNext}
                >
                  <ChevronRight className="tw-h-5 tw-w-5" aria-hidden="true" />
                </Button>
              </>
            )}
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={closeLabel}
                data-testid="media-viewer-close"
              >
                <X className="tw-h-5 tw-w-5" aria-hidden="true" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="tw-relative tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-overflow-hidden tw-bg-muted">
          <div
            className="tw-relative tw-flex tw-min-h-0 tw-flex-1 tw-items-center tw-justify-center tw-overflow-hidden"
            data-testid="media-viewer-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              cursor: isZoomedOut ? 'default' : 'grab',
              touchAction: 'none',
            }}
          >
            {isLoading && (
              <div
                className="tw-absolute tw-inset-0 tw-z-10 tw-flex tw-items-center tw-justify-center tw-bg-background/60"
                role="status"
                aria-live="polite"
              >
                <span className="tw-text-sm tw-text-muted-foreground">{loadingLabel}</span>
              </div>
            )}
            {currentImage ? (
              <img
                src={resolvedImageUrl}
                alt={altText}
                draggable={false}
                data-testid="media-viewer-image"
                className="tw-max-h-full tw-max-w-full tw-select-none tw-object-contain tw-transition-transform tw-duration-150"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              />
            ) : (
              // No image - render an empty placeholder div so the viewer still renders.
              <div className="tw-h-full tw-w-full" data-testid="media-viewer-empty" />
            )}
          </div>

          <div className="tw-flex tw-flex-row tw-items-center tw-justify-between tw-border-t tw-border-border tw-bg-background tw-px-4 tw-py-2">
            <div className="tw-text-sm tw-text-muted-foreground" data-testid="media-viewer-title">
              {currentImage ? currentImage.title : ''}
            </div>
            <div className="tw-flex tw-items-center tw-gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={zoomOutLabel}
                data-testid="media-viewer-zoom-out"
                disabled={isZoomedOut}
                onClick={onZoomOut}
              >
                <Minus className="tw-h-4 tw-w-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={zoomInLabel}
                data-testid="media-viewer-zoom-in"
                onClick={onZoomIn}
              >
                <Plus className="tw-h-4 tw-w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/*
            ARIA live regions: announce navigation and zoom changes to screen readers without
            interrupting other speech (polite). Visually hidden but available to assistive tech.
          */}
          <div
            role="status"
            aria-live="polite"
            data-testid="media-viewer-counter"
            className="tw-sr-only"
          >
            {imageCount > 0 ? counterText : ''}
          </div>
          <div role="status" aria-live="polite" className="tw-sr-only">
            {zoomAnnouncement}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MediaViewer;
