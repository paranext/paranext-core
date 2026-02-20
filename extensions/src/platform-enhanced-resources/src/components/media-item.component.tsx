import { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { Button } from 'platform-bible-react';
import { ImageIcon, VideoIcon } from 'lucide-react';

// --- Types ---

/** A single Bible image within a media display item */
export interface BibleImage {
  /** Unique image identifier */
  id: string;
  /** Image title */
  title: string;
  /** Image description */
  description: string;
  /** Image filename (for serving) */
  filename: string;
  /** Copyright information */
  copyright: string;
  /** Whether this is a video item */
  isVideo: boolean;
  /** Caption / alt text for the image */
  caption: string;
  /** Thumbnail URL or placeholder */
  thumbnailUrl: string;
}

/** Group type for media display items */
export type MediaGroupType = 'word-linked' | 'verse-range';

/** A media display item for the tab list */
export interface MediaDisplayItem {
  /** Unique identifier for this display item */
  id: string;
  /** Group type: word-linked or verse-range */
  groupType: MediaGroupType;
  /** Group header text (lemma for word-linked, reference for verse-range) */
  groupHeader: string;
  /** Bible images in this display item */
  images: BibleImage[];
}

/** Props for the MediaItem component */
export interface MediaItemProps {
  /** The Bible image data */
  image: BibleImage;
  /** Callback when thumbnail is clicked */
  onImageClick: (image: BibleImage) => void;
}

// --- Constants ---

const MEDIA_ITEM_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_media_viewImage%',
  '%enhancedResources_videoPlayback_notAvailable%',
  '%enhancedResources_media_imagePlaceholder%',
];

// --- Component ---

/**
 * MediaItem renders a single media thumbnail in the media tab grid. It shows a thumbnail image
 * placeholder (since image serving is deferred) and handles click to open the MediaViewer overlay.
 *
 * Video items show a placeholder message per DEF-UI-007.
 */
export default function MediaItem({ image, onImageClick }: MediaItemProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => MEDIA_ITEM_LOCALIZED_KEYS, []));

  const handleClick = useCallback(() => {
    onImageClick(image);
  }, [image, onImageClick]);

  return (
    <div data-testid={`media-item-${image.id}`} className="tw-flex tw-flex-col tw-items-center">
      <Button
        type="button"
        variant="ghost"
        className="tw-w-24 tw-h-24 tw-p-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-border tw-border-border tw-rounded-md hover:tw-bg-accent/50"
        onClick={handleClick}
        aria-label={`${localizedStrings['%enhancedResources_media_viewImage%']} - ${image.caption || image.title}`}
      >
        {image.isVideo ? (
          /* Video placeholder per DEF-UI-007 */
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full tw-gap-1">
            <VideoIcon className="tw-h-6 tw-w-6 tw-text-muted-foreground" />
            <span className="tw-text-[10px] tw-text-muted-foreground tw-text-center tw-leading-tight tw-px-1">
              {localizedStrings['%enhancedResources_videoPlayback_notAvailable%']}
            </span>
          </div>
        ) : (
          /* Image thumbnail placeholder */
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-full tw-gap-1 tw-bg-muted/30 tw-rounded">
            <ImageIcon className="tw-h-6 tw-w-6 tw-text-muted-foreground" />
            <span className="tw-text-[10px] tw-text-muted-foreground tw-text-center tw-leading-tight tw-px-1">
              {localizedStrings['%enhancedResources_media_imagePlaceholder%']}
            </span>
          </div>
        )}
      </Button>
      {/* Caption below thumbnail */}
      <span
        className="tw-text-xs tw-text-center tw-mt-1 tw-max-w-24 tw-truncate"
        title={image.caption || image.title}
      >
        {image.caption || image.title}
      </span>
    </div>
  );
}
