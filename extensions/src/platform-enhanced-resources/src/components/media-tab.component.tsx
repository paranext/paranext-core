import { useCallback, useMemo } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';

/** Image metadata entry from backend */
interface ImageMetadataEntry {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
}

/** Backend service interface for image metadata */
interface ERImageService {
  getImageMetadata: (input: {
    scopeFilter: string;
    collection: string;
    filteredLemma?: string;
  }) => Promise<{ images: ImageMetadataEntry[] }>;
}

/** Fallback image metadata entries when backend is unavailable */
const FALLBACK_IMAGES: ImageMetadataEntry[] = [
  {
    id: 'img-001',
    title: 'Creation of the World',
    thumbnailUrl: '',
    description: 'Artistic depiction of the creation narrative',
  },
  {
    id: 'img-002',
    title: 'The Heavens',
    thumbnailUrl: '',
    description: 'Illustration of the sky and stars in the creation account',
  },
];

/** Localized string keys */
const MEDIA_LOCALIZED_KEYS = ['%platformEnhancedResources_media_no_images%'] as const;

/** Props for the MediaTab component */
interface MediaTabProps {
  /** Current scope filter value */
  scopeFilter?: string;
  /** Filtered lemma from linked word click */
  filteredLemma?: string;
  /** Callback when a thumbnail is clicked to open MediaViewer */
  onOpenMedia?: (imageId: string) => void;
}

/**
 * Media tab content component. Shows image thumbnails from the Enhanced Resource media collection.
 * Clicking a thumbnail opens the MediaViewer overlay.
 *
 * @param props - MediaTabProps
 * @returns Media tab content with clickable thumbnails
 */
export default function MediaTab({
  scopeFilter = 'currentVerse',
  filteredLemma,
  onOpenMedia,
}: MediaTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...MEDIA_LOCALIZED_KEYS], []));

  // Connect to backend service
  const [erService] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return (await papi.networkObjects.get('enhancedResources')) as ERImageService | undefined;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Load image metadata
  const [imagesFromBackend] = usePromise(
    useCallback(async () => {
      if (!erService) return undefined;
      try {
        const result = await erService.getImageMetadata({
          scopeFilter,
          collection: 'images',
          filteredLemma,
        });
        return result.images;
      } catch {
        return undefined;
      }
    }, [erService, scopeFilter, filteredLemma]),
    undefined,
  );

  const images = imagesFromBackend ?? FALLBACK_IMAGES;

  const handleThumbnailClick = useCallback(
    (imageId: string) => {
      if (onOpenMedia) {
        onOpenMedia(imageId);
      }
    },
    [onOpenMedia],
  );

  const noImagesText =
    localizedStrings['%platformEnhancedResources_media_no_images%'] || 'No images found';

  if (images.length === 0) {
    return (
      <div data-testid="media-tab-content" className="tw-p-4 tw-text-sm tw-text-muted-foreground">
        {noImagesText}
      </div>
    );
  }

  return (
    <div data-testid="media-tab-content">
      <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-p-2" role="list" aria-label="Media images">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            data-testid="media-thumbnail"
            className="tw-flex tw-flex-col tw-items-center tw-gap-1 tw-p-2 tw-border tw-border-border tw-rounded tw-cursor-pointer hover:tw-bg-accent tw-transition-colors tw-text-left"
            onClick={() => handleThumbnailClick(image.id)}
            aria-label={image.title}
          >
            {image.thumbnailUrl ? (
              <img
                src={image.thumbnailUrl}
                alt={image.title}
                className="tw-w-full tw-h-20 tw-object-cover tw-rounded"
              />
            ) : (
              <div className="tw-w-full tw-h-20 tw-bg-muted tw-rounded tw-flex tw-items-center tw-justify-center tw-text-muted-foreground tw-text-xs">
                {image.title}
              </div>
            )}
            <span className="tw-text-xs tw-text-muted-foreground tw-truncate tw-w-full tw-text-center">
              {image.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
