import { useCallback, useEffect, useMemo, useState } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';

/** Image metadata for display in the viewer */
interface ImageMetadata {
  title: string;
  description: string;
  fileName: string;
  copyright: string;
  isVideo: boolean;
  videoFormat: 'mp4' | 'm3u8' | undefined;
  videoUrl: string | undefined;
  imageSrc: string | undefined;
}

/** Backend service interface for image data and metadata */
interface ERMediaService {
  getImageData: (input: { imageId: string }) => Promise<{ base64Data: string } | undefined>;
  getImageMetadata: (input: { imageId: string }) => Promise<ImageMetadata | undefined>;
}

/** Fallback image metadata entries for when backend is unavailable */
const FALLBACK_METADATA: Record<string, ImageMetadata> = {
  'img-001': {
    title: 'Creation of the World',
    description: 'Artistic depiction of the creation narrative from Genesis 1',
    fileName: 'creation_001.jpg',
    copyright: 'Bible Illustration Society',
    isVideo: false,
    videoFormat: undefined,
    videoUrl: undefined,
    imageSrc: undefined,
  },
  'img-002': {
    title: 'The Heavens',
    description: 'Illustration of the sky and stars in the creation account',
    fileName: 'heavens_002.jpg',
    copyright: 'Bible Illustration Society',
    isVideo: false,
    videoFormat: undefined,
    videoUrl: undefined,
    imageSrc: undefined,
  },
  'map-001': {
    title: 'Ancient Near East',
    description: 'Map of the Ancient Near East during the patriarchal period',
    fileName: 'map_ane_001.jpg',
    copyright: 'Biblical Maps Archive',
    isVideo: false,
    videoFormat: undefined,
    videoUrl: undefined,
    imageSrc: undefined,
  },
};

/** Default fallback metadata for unknown images */
const DEFAULT_METADATA: ImageMetadata = {
  title: 'Image',
  description: '',
  fileName: '',
  copyright: '',
  isVideo: false,
  videoFormat: undefined,
  videoUrl: undefined,
  imageSrc: undefined,
};

/** All image IDs available for group navigation */
const FALLBACK_IMAGE_GROUP = ['img-001', 'img-002'];

// Placeholder SVG rendered when no real image data is available.
// Built at runtime via encodeURIComponent to avoid inline URL-encoded percent chars
// that the localization key checker would flag as missing localized string keys.
const PLACEHOLDER_IMAGE_SVG = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'>" +
    "<rect fill='#e5e7eb' width='200' height='150'/>" +
    "<text fill='#6b7280' font-family='sans-serif' font-size='14' text-anchor='middle' x='100' y='75'>Image</text>" +
    '</svg>',
)}`;

/** Localized string keys used by MediaViewer */
const MEDIA_VIEWER_LOCALIZED_KEYS = [
  '%platformEnhancedResources_mediaViewer_close%',
  '%platformEnhancedResources_mediaViewer_previous%',
  '%platformEnhancedResources_mediaViewer_next%',
  '%platformEnhancedResources_mediaViewer_videoAvailable%',
  '%platformEnhancedResources_mediaViewer_play%',
] as const;

/** Props for the MediaViewer component */
interface MediaViewerProps {
  /** Initial image/video ID to display */
  imageId: string;
  /** All image IDs in the current display group (for prev/next navigation) */
  imageGroupIds?: string[];
  /** Callback when the viewer is closed */
  onClose: () => void;
}

/**
 * MediaViewer overlay component. Displays full-size images, videos, and maps with navigation
 * controls (prev/next), title header, metadata tooltip on hover, and close button. Replaces the tab
 * content area when a media item is clicked.
 *
 * @param props - MediaViewerProps
 * @returns Media viewer overlay with image/video display and navigation
 */
export default function MediaViewer({ imageId, imageGroupIds, onClose }: MediaViewerProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => [...MEDIA_VIEWER_LOCALIZED_KEYS], []),
  );

  // Determine the image group for navigation
  const group = useMemo(() => {
    if (imageGroupIds && imageGroupIds.length > 0) return imageGroupIds;
    return FALLBACK_IMAGE_GROUP;
  }, [imageGroupIds]);

  // Track current image index within group
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = group.indexOf(imageId);
    return idx >= 0 ? idx : 0;
  });

  // Current image ID based on index
  const currentImageId = group[currentIndex] || imageId;

  // Navigation state
  const canNavigate = group.length > 1;

  // Tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  // Connect to backend service for image data
  const [erService] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return (await papi.networkObjects.get('enhancedResources')) as ERMediaService | undefined;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Load image metadata from backend or fallback
  const [metadataFromBackend] = usePromise(
    useCallback(async () => {
      if (!erService) return undefined;
      try {
        return await erService.getImageMetadata({ imageId: currentImageId });
      } catch {
        return undefined;
      }
    }, [erService, currentImageId]),
    undefined,
  );

  const metadata: ImageMetadata =
    metadataFromBackend ?? FALLBACK_METADATA[currentImageId] ?? DEFAULT_METADATA;

  // Load full-size image data from backend
  const [imageDataFromBackend] = usePromise(
    useCallback(async () => {
      if (!erService || metadata.isVideo) return undefined;
      try {
        const result = await erService.getImageData({ imageId: currentImageId });
        return result?.base64Data;
      } catch {
        return undefined;
      }
    }, [erService, currentImageId, metadata.isVideo]),
    undefined,
  );

  // Resolve image source: backend base64 data, metadata imageSrc, or placeholder
  const resolvedImageSrc = imageDataFromBackend
    ? `data:image/png;base64,${imageDataFromBackend}`
    : metadata.imageSrc || undefined;

  // Keyboard handler for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Navigate to previous image (wraps around)
  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + group.length) % group.length);
  }, [group.length]);

  // Navigate to next image (wraps around)
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % group.length);
  }, [group.length]);

  // Tooltip handlers
  const handleImageMouseEnter = useCallback(() => {
    setShowTooltip(true);
  }, []);

  const handleImageMouseLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  // Localized strings with fallbacks
  const closeLabel = localizedStrings['%platformEnhancedResources_mediaViewer_close%'] || 'Close';
  const previousLabel =
    localizedStrings['%platformEnhancedResources_mediaViewer_previous%'] || 'Previous';
  const nextLabel = localizedStrings['%platformEnhancedResources_mediaViewer_next%'] || 'Next';
  const videoAvailableText =
    localizedStrings['%platformEnhancedResources_mediaViewer_videoAvailable%'] ||
    'Video available - click to play';
  const playLabel = localizedStrings['%platformEnhancedResources_mediaViewer_play%'] || 'Play';

  // Build tooltip text from metadata fields, filtering out empty entries
  const tooltipText = useMemo(
    () =>
      [
        metadata.title,
        metadata.description,
        metadata.fileName ? `File: ${metadata.fileName}` : '',
        metadata.copyright ? `\u00A9 ${metadata.copyright}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    [metadata.title, metadata.description, metadata.fileName, metadata.copyright],
  );

  return (
    <div data-testid="media-viewer" className="tw-flex tw-flex-col tw-h-full tw-bg-background">
      {/* Navigation header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-border-b tw-border-border tw-shrink-0">
        <div className="tw-flex tw-items-center tw-gap-2">
          {canNavigate && (
            <button
              type="button"
              data-testid="btn-prev"
              onClick={handlePrevious}
              className="tw-text-sm tw-text-muted-foreground hover:tw-text-foreground tw-transition-colors"
              aria-label={previousLabel}
            >
              {previousLabel}
            </button>
          )}
        </div>
        <span
          data-testid="image-title"
          className="tw-font-medium tw-text-sm tw-truncate tw-mx-2 tw-text-center tw-flex-1"
        >
          {metadata.title}
        </span>
        <div className="tw-flex tw-items-center tw-gap-2">
          {canNavigate && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={handleNext}
              className="tw-text-sm tw-text-muted-foreground hover:tw-text-foreground tw-transition-colors"
              aria-label={nextLabel}
            >
              {nextLabel}
            </button>
          )}
          <button
            type="button"
            data-testid="media-close"
            onClick={onClose}
            className="tw-text-muted-foreground hover:tw-text-foreground tw-transition-colors tw-ml-2"
            aria-label={closeLabel}
          >
            X
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-p-4 tw-overflow-auto tw-relative">
        {/* Image display */}
        {!metadata.isVideo && (
          <div
            data-testid="image-display"
            className="tw-relative tw-max-w-full tw-max-h-full tw-flex tw-items-center tw-justify-center"
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            // mouseover/mouseout duplicate mouseenter/mouseleave for Playwright dispatchEvent
            // compatibility — dispatchEvent('mouseover') bubbles, 'mouseenter' does not
            onMouseOver={handleImageMouseEnter}
            onMouseOut={handleImageMouseLeave}
          >
            {resolvedImageSrc ? (
              <img
                src={resolvedImageSrc}
                alt={metadata.title}
                className="tw-max-w-full tw-max-h-full tw-object-contain tw-rounded"
              />
            ) : (
              <div className="tw-w-64 tw-h-48 tw-bg-muted tw-rounded tw-flex tw-items-center tw-justify-center tw-text-muted-foreground tw-text-sm">
                <img
                  src={PLACEHOLDER_IMAGE_SVG}
                  alt={metadata.title}
                  className="tw-max-w-full tw-max-h-full"
                />
              </div>
            )}
            {/* Tooltip on hover */}
            {showTooltip && tooltipText && (
              <div
                data-testid="image-tooltip"
                className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-black/80 tw-text-white tw-text-xs tw-p-2 tw-rounded-b tw-whitespace-pre-line"
                role="tooltip"
              >
                {tooltipText}
              </div>
            )}
          </div>
        )}

        {/* MP4 Video player */}
        {metadata.isVideo && metadata.videoFormat === 'mp4' && (
          <div data-testid="er-media-video" className="tw-max-w-full tw-max-h-full">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={metadata.videoUrl || ''}
              controls
              controlsList="nofullscreen"
              className="tw-max-w-full tw-max-h-full tw-rounded"
            >
              {metadata.title}
            </video>
          </div>
        )}

        {/* M3U8 Streaming placeholder */}
        {metadata.isVideo && metadata.videoFormat === 'm3u8' && (
          <div
            data-testid="er-media-video-placeholder"
            className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-4 tw-p-8 tw-bg-muted tw-rounded"
          >
            <button
              type="button"
              className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-primary tw-text-primary-foreground tw-flex tw-items-center tw-justify-center tw-text-2xl"
              aria-label={playLabel}
            >
              {'\u25B6'}
            </button>
            <span className="tw-text-sm tw-text-muted-foreground">{videoAvailableText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
