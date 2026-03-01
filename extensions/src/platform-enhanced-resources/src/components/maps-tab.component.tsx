import { useCallback, useMemo } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';

/** Map metadata entry from backend */
interface MapMetadataEntry {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
}

/** Backend service interface for map metadata */
interface ERMapService {
  getImageMetadata: (input: {
    scopeFilter: string;
    collection: string;
    filteredLemma?: string;
  }) => Promise<{ images: MapMetadataEntry[] }>;
}

/** Fallback map entries when backend is unavailable */
const FALLBACK_MAPS: MapMetadataEntry[] = [
  {
    id: 'map-001',
    title: 'Ancient Near East',
    thumbnailUrl: '',
    description: 'Map of the Ancient Near East during the patriarchal period',
  },
];

/** Localized string keys */
const MAPS_LOCALIZED_KEYS = ['%platformEnhancedResources_maps_no_maps%'] as const;

/** Props for the MapsTab component */
interface MapsTabProps {
  /** Current scope filter value */
  scopeFilter?: string;
  /** Filtered lemma from linked word click */
  filteredLemma?: string;
  /** Callback when a thumbnail is clicked to open MediaViewer */
  onOpenMedia?: (imageId: string) => void;
}

/**
 * Maps tab content component. Shows map thumbnails from the Enhanced Resource maps collection.
 * Clicking a thumbnail opens the MediaViewer overlay.
 *
 * @param props - MapsTabProps
 * @returns Maps tab content with clickable thumbnails
 */
export default function MapsTab({
  scopeFilter = 'currentVerse',
  filteredLemma,
  onOpenMedia,
}: MapsTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...MAPS_LOCALIZED_KEYS], []));

  // Connect to backend service
  const [erService] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return (await papi.networkObjects.get('enhancedResources')) as ERMapService | undefined;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Load map metadata
  const [mapsFromBackend] = usePromise(
    useCallback(async () => {
      if (!erService) return undefined;
      try {
        const result = await erService.getImageMetadata({
          scopeFilter,
          collection: 'maps',
          filteredLemma,
        });
        return result.images;
      } catch {
        return undefined;
      }
    }, [erService, scopeFilter, filteredLemma]),
    undefined,
  );

  const maps = mapsFromBackend ?? FALLBACK_MAPS;

  const handleThumbnailClick = useCallback(
    (mapId: string) => {
      if (onOpenMedia) {
        onOpenMedia(mapId);
      }
    },
    [onOpenMedia],
  );

  const noMapsText =
    localizedStrings['%platformEnhancedResources_maps_no_maps%'] || 'No maps found';

  if (maps.length === 0) {
    return (
      <div data-testid="maps-tab-content" className="tw-p-4 tw-text-sm tw-text-muted-foreground">
        {noMapsText}
      </div>
    );
  }

  return (
    <div data-testid="maps-tab-content">
      <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-p-2" role="list" aria-label="Map images">
        {maps.map((mapEntry) => (
          <button
            key={mapEntry.id}
            type="button"
            data-testid="media-thumbnail"
            className="tw-flex tw-flex-col tw-items-center tw-gap-1 tw-p-2 tw-border tw-border-border tw-rounded tw-cursor-pointer hover:tw-bg-accent tw-transition-colors tw-text-left"
            onClick={() => handleThumbnailClick(mapEntry.id)}
            aria-label={mapEntry.title}
          >
            {mapEntry.thumbnailUrl ? (
              <img
                src={mapEntry.thumbnailUrl}
                alt={mapEntry.title}
                className="tw-w-full tw-h-20 tw-object-cover tw-rounded"
              />
            ) : (
              <div className="tw-w-full tw-h-20 tw-bg-muted tw-rounded tw-flex tw-items-center tw-justify-center tw-text-muted-foreground tw-text-xs">
                {mapEntry.title}
              </div>
            )}
            <span className="tw-text-xs tw-text-muted-foreground tw-truncate tw-w-full tw-text-center">
              {mapEntry.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
