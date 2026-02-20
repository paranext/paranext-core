import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { Button } from 'platform-bible-react';
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut, ImageIcon, VideoIcon } from 'lucide-react';
import type { BibleImage, MediaDisplayItem } from './media-item.component';

// --- Types ---

/** Input data for opening the media viewer */
export interface MediaViewerInput {
  /** Image ID to display */
  imageId: string;
  /** Display item index for navigation context */
  displayIndex: number;
  /** Whether to show prev/next controls */
  showControls: boolean;
  /** Parent tab type */
  parentTabType: 'media' | 'maps' | 'encyclopedia';
  /** All display items for navigation */
  displayItems: MediaDisplayItem[];
}

/** Props for the ImageViewer component */
export interface ImageViewerProps {
  /** The initial image ID to display */
  imageId: string;
  /** The initial display item index */
  displayIndex: number;
  /** Whether to show prev/next navigation controls */
  showControls: boolean;
  /** Parent tab type for context */
  parentTabType: 'media' | 'maps' | 'encyclopedia';
  /** All display items for prev/next navigation across boundaries */
  displayItems: MediaDisplayItem[];
  /** Callback when the overlay is closed */
  onClose: () => void;
}

// --- Constants ---

/** Zoom level bounds */
const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4.0;
const ZOOM_STEP = 0.25;
const DEFAULT_ZOOM = 1.0;

/** Localization keys used by the ImageViewer */
const IMAGE_VIEWER_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_imageViewer_close%',
  '%enhancedResources_imageViewer_prevImage%',
  '%enhancedResources_imageViewer_nextImage%',
  '%enhancedResources_imageViewer_zoomIn%',
  '%enhancedResources_imageViewer_zoomOut%',
  '%enhancedResources_imageViewer_title%',
  '%enhancedResources_videoPlayback_notAvailable%',
];

// --- Navigation helpers ---

/** Flat representation of an image in the navigation sequence */
interface FlatImageEntry {
  displayIndex: number;
  imageIndex: number;
  image: BibleImage;
}

/**
 * Flattens all display items into a single ordered list of images for prev/next navigation. This
 * enables navigation that crosses display item boundaries.
 */
function flattenDisplayItems(displayItems: MediaDisplayItem[]): FlatImageEntry[] {
  const entries: FlatImageEntry[] = [];
  displayItems.forEach((item, dIdx) => {
    item.images.forEach((image, iIdx) => {
      entries.push({ displayIndex: dIdx, imageIndex: iIdx, image });
    });
  });
  return entries;
}

/** Finds the index in the flat list for a given image ID. Falls back to searching by display index. */
function findFlatIndex(flatList: FlatImageEntry[], imgId: string, dIdx: number): number {
  // Try exact match by image ID first
  const byId = flatList.findIndex((entry) => entry.image.id === imgId);
  if (byId >= 0) return byId;

  // Fall back to first image at the display index
  const byDisplayIndex = flatList.findIndex((entry) => entry.displayIndex === dIdx);
  return byDisplayIndex >= 0 ? byDisplayIndex : 0;
}

/** Compute the cursor style for the image content area */
function getContentCursor(dragging: boolean, zoom: number): string {
  if (dragging) return 'grabbing';
  if (zoom > DEFAULT_ZOOM) return 'grab';
  return 'zoom-in';
}

// --- Component ---

/**
 * ImageViewer is an overlay component that displays a full-size image with zoom/pan controls and
 * prev/next navigation. It is launched from MediaTab or MapsTab thumbnail clicks.
 *
 * The overlay fills the parent content area and provides:
 *
 * - Full-size image display with zoom support (buttons, click, scroll wheel)
 * - Prev/next navigation that crosses display item boundaries
 * - Title with hover tooltip showing title, description, filename, and copyright
 * - Close button (X) or Escape key to return to the tab view
 * - Video content placeholder per DEF-UI-007
 * - Window resize recalculates image container dimensions
 * - Focus management: image container receives focus on open
 *
 * Since actual image file serving is deferred (images not yet available via PAPI), the image viewer
 * shows a graceful placeholder/broken-image state. Zoom/pan behavior still works structurally.
 */
export default function ImageViewer({
  imageId,
  displayIndex,
  showControls,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parentTabType: _parentTabType,
  displayItems,
  onClose,
}: ImageViewerProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => IMAGE_VIEWER_LOCALIZED_KEYS, []));

  // Flatten display items for navigation
  const flatList = useMemo(() => flattenDisplayItems(displayItems), [displayItems]);

  // Current position in the flat list
  const [currentFlatIndex, setCurrentFlatIndex] = useState<number>(() =>
    findFlatIndex(flatList, imageId, displayIndex),
  );

  // Zoom level
  const [zoomLevel, setZoomLevel] = useState<number>(DEFAULT_ZOOM);

  // Pan offset
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dragging state for pan
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Container ref for focus management and resize
  const containerRef = useRef<HTMLDivElement | undefined>(undefined);

  // Callback ref for the container
  const setContainerRef = useCallback((element: HTMLDivElement) => {
    containerRef.current = element;
  }, []);

  // Current image data
  const currentEntry = flatList[currentFlatIndex];
  const currentImage = currentEntry?.image;

  // Navigation state
  const isFirstImage = currentFlatIndex <= 0;
  const isLastImage = currentFlatIndex >= flatList.length - 1;

  // Whether this is a video item
  const isVideo = currentImage?.isVideo ?? false;

  // Tooltip text: title + description + filename + copyright
  const tooltipText = useMemo(() => {
    if (!currentImage) return '';
    const parts: string[] = [];
    if (currentImage.title) parts.push(currentImage.title);
    if (currentImage.description) parts.push(currentImage.description);
    if (currentImage.filename) parts.push(currentImage.filename);
    if (currentImage.copyright) parts.push(currentImage.copyright);
    return parts.join('\n');
  }, [currentImage]);

  // --- Navigation handlers ---

  const handlePrev = useCallback(() => {
    if (currentFlatIndex > 0) {
      setCurrentFlatIndex(currentFlatIndex - 1);
      setZoomLevel(DEFAULT_ZOOM);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [currentFlatIndex]);

  const handleNext = useCallback(() => {
    if (currentFlatIndex < flatList.length - 1) {
      setCurrentFlatIndex(currentFlatIndex + 1);
      setZoomLevel(DEFAULT_ZOOM);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [currentFlatIndex, flatList.length]);

  // --- Zoom handlers ---

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  // Click on image zooms in
  const handleImageClick = useCallback(() => {
    if (!isVideo) {
      setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
    }
  }, [isVideo]);

  // Scroll wheel zooms
  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      if (isVideo) return;
      event.preventDefault();
      if (event.deltaY < 0) {
        // Scroll up = zoom in
        setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
      } else {
        // Scroll down = zoom out
        setZoomLevel((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
      }
    },
    [isVideo],
  );

  // --- Pan handlers (mouse drag) ---

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (isVideo || zoomLevel <= DEFAULT_ZOOM) return;
      event.preventDefault();
      setIsDragging(true);
      dragStartRef.current = { x: event.clientX, y: event.clientY };
      panStartRef.current = { ...panOffset };
    },
    [isVideo, zoomLevel, panOffset],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = event.clientX - dragStartRef.current.x;
      const dy = event.clientY - dragStartRef.current.y;
      setPanOffset({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // --- Keyboard navigation ---

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // --- Focus management: focus the container when overlay opens or image changes ---

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [currentFlatIndex]);

  // --- Window resize: force re-render by updating a counter ---
  const [, setResizeCounter] = useState(0);

  useEffect(() => {
    function handleResize() {
      setResizeCounter((prev) => prev + 1);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render if no images
  if (!currentImage) return undefined;

  const contentCursor = getContentCursor(isDragging, zoomLevel);

  return (
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
    <div
      ref={setContainerRef}
      data-testid="image-viewer-overlay"
      className="tw-absolute tw-inset-0 tw-z-50 tw-flex tw-flex-col tw-bg-background tw-border tw-border-border tw-shadow-lg"
      role="dialog"
      aria-label={localizedStrings['%enhancedResources_imageViewer_title%']}
      aria-modal="true"
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header bar: title with tooltip */}
      <div
        className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-border-b tw-bg-muted/30 tw-shrink-0"
        title={tooltipText}
      >
        <span
          className="tw-flex-1 tw-text-sm tw-font-medium tw-truncate"
          data-testid="image-viewer-title"
        >
          {currentImage.title}
        </span>
      </div>

      {/* Main content area: navigation arrows + image/video */}
      <div className="tw-flex tw-flex-1 tw-items-center tw-min-h-0 tw-relative">
        {/* Previous button */}
        {showControls ? (
          <div className="tw-shrink-0 tw-p-2 tw-z-10">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="tw-h-8 tw-w-8 tw-p-0"
              onClick={handlePrev}
              disabled={isFirstImage}
              aria-label={localizedStrings['%enhancedResources_imageViewer_prevImage%']}
            >
              <ArrowLeft className="tw-h-5 tw-w-5" />
            </Button>
          </div>
        ) : undefined}

        {/* Image or video placeholder area */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-overflow-hidden tw-min-h-0 tw-h-full"
          data-testid="image-viewer-content"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onClick={!isDragging ? handleImageClick : undefined}
          style={{ cursor: contentCursor }}
        >
          {isVideo ? (
            /* Video placeholder per DEF-UI-007 */
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-p-8 tw-bg-muted/20 tw-rounded-lg tw-border tw-border-border">
              <VideoIcon className="tw-h-16 tw-w-16 tw-text-muted-foreground" />
              <p
                className="tw-text-muted-foreground tw-text-center tw-max-w-sm"
                data-testid="image-viewer-video-placeholder"
              >
                {localizedStrings['%enhancedResources_videoPlayback_notAvailable%']}
              </p>
            </div>
          ) : (
            /* Image display with zoom/pan transform */
            <div
              className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
            >
              {/* Image placeholder -- actual image serving is deferred */}
              <div
                className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-p-12 tw-bg-muted/10 tw-rounded-lg tw-border tw-border-dashed tw-border-border"
                data-testid="image-viewer-image-placeholder"
              >
                <ImageIcon className="tw-h-24 tw-w-24 tw-text-muted-foreground/50" />
                <span className="tw-text-sm tw-text-muted-foreground tw-text-center">
                  {currentImage.title}
                </span>
                {currentImage.description ? (
                  <span className="tw-text-xs tw-text-muted-foreground/70 tw-text-center tw-max-w-sm">
                    {currentImage.description}
                  </span>
                ) : undefined}
              </div>
            </div>
          )}
        </div>

        {/* Next button */}
        {showControls ? (
          <div className="tw-shrink-0 tw-p-2 tw-z-10">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="tw-h-8 tw-w-8 tw-p-0"
              onClick={handleNext}
              disabled={isLastImage}
              aria-label={localizedStrings['%enhancedResources_imageViewer_nextImage%']}
            >
              <ArrowRight className="tw-h-5 tw-w-5" />
            </Button>
          </div>
        ) : undefined}
      </div>

      {/* Footer bar: zoom controls + close */}
      <div className="tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-border-t tw-bg-muted/30 tw-shrink-0">
        {/* Zoom controls (hidden for video) */}
        {!isVideo ? (
          <div className="tw-flex tw-items-center tw-gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="tw-h-7 tw-w-7 tw-p-0"
              onClick={handleZoomOut}
              disabled={zoomLevel <= MIN_ZOOM}
              aria-label={localizedStrings['%enhancedResources_imageViewer_zoomOut%']}
            >
              <ZoomOut className="tw-h-4 tw-w-4" />
            </Button>
            <span className="tw-text-xs tw-text-muted-foreground tw-min-w-[3rem] tw-text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="tw-h-7 tw-w-7 tw-p-0"
              onClick={handleZoomIn}
              disabled={zoomLevel >= MAX_ZOOM}
              aria-label={localizedStrings['%enhancedResources_imageViewer_zoomIn%']}
            >
              <ZoomIn className="tw-h-4 tw-w-4" />
            </Button>
          </div>
        ) : (
          <div />
        )}

        {/* Close button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="tw-h-7 tw-w-7 tw-p-0"
          onClick={onClose}
          aria-label={localizedStrings['%enhancedResources_imageViewer_close%']}
        >
          <X className="tw-h-4 tw-w-4" />
        </Button>
      </div>
    </div>
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
  );
}
