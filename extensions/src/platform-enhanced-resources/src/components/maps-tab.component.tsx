import { useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import MediaItem from './media-item.component';
import type { MediaDisplayItem, BibleImage, MediaGroupType } from './media-item.component';

// --- Types ---

/** Props for the MapsTab component */
export interface MapsTabProps {
  /** Maps display items to render (filtered by backend to Satellite Bible Atlas collection) */
  items: MediaDisplayItem[];
  /** Whether this tab is currently visible (for deferred loading) */
  isVisible: boolean;
  /** Set of expanded group IDs */
  expandedGroups: string[];
  /** Callback when a group header is toggled (expand/collapse) */
  onToggleGroup: (groupId: string) => void;
  /** Callback when a map thumbnail is clicked */
  onMapItemClick: (image: BibleImage) => void;
}

// --- Constants ---

const MAPS_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_emptyState%',
  '%enhancedResources_maps_wordLinkedGroup%',
  '%enhancedResources_maps_verseRangeGroup%',
  '%enhancedResources_maps_expandGroup%',
  '%enhancedResources_maps_collapseGroup%',
];

// --- Helper: Group items by group type ---

interface GroupedItems {
  wordLinked: MediaDisplayItem[];
  verseRange: MediaDisplayItem[];
}

function groupItemsByType(items: MediaDisplayItem[]): GroupedItems {
  return {
    wordLinked: items.filter((item) => item.groupType === 'word-linked'),
    verseRange: items.filter((item) => item.groupType === 'verse-range'),
  };
}

// --- Sub-component: Maps Group ---

interface MapsGroupProps {
  /** Group type label key */
  groupType: MediaGroupType;
  /** Items in this group */
  items: MediaDisplayItem[];
  /** Set of expanded group IDs */
  expandedGroups: string[];
  /** Callback when a group header is toggled */
  onToggleGroup: (groupId: string) => void;
  /** Callback when a map thumbnail is clicked */
  onMapItemClick: (image: BibleImage) => void;
  /** Localized strings */
  localizedStrings: LanguageStrings;
}

function MapsGroup({
  groupType,
  items,
  expandedGroups,
  onToggleGroup,
  onMapItemClick,
  localizedStrings,
}: MapsGroupProps) {
  if (items.length === 0) return undefined;

  const groupLabel =
    groupType === 'word-linked'
      ? localizedStrings['%enhancedResources_maps_wordLinkedGroup%']
      : localizedStrings['%enhancedResources_maps_verseRangeGroup%'];

  return (
    <div data-testid={`maps-group-${groupType}`} className="tw-mb-3">
      {/* Group type header */}
      <div className="tw-text-xs tw-font-semibold tw-text-muted-foreground tw-uppercase tw-tracking-wider tw-px-2 tw-py-1 tw-mb-1">
        {groupLabel}
      </div>

      {/* Individual display items within this group */}
      {items.map((displayItem) => {
        const isExpanded = expandedGroups.includes(displayItem.id);

        return (
          <div
            key={displayItem.id}
            data-testid={`maps-display-item-${displayItem.id}`}
            className="tw-border-b tw-border-border"
          >
            {/* Collapsible group header */}
            <button
              type="button"
              className="tw-flex tw-items-center tw-w-full tw-text-left tw-px-2 tw-py-1.5 hover:tw-bg-accent/50 tw-cursor-pointer tw-border-0 tw-bg-transparent"
              onClick={() => onToggleGroup(displayItem.id)}
              aria-expanded={isExpanded}
              aria-label={
                isExpanded
                  ? `${localizedStrings['%enhancedResources_maps_collapseGroup%']} ${displayItem.groupHeader}`
                  : `${localizedStrings['%enhancedResources_maps_expandGroup%']} ${displayItem.groupHeader}`
              }
            >
              <span className="tw-w-[22px] tw-shrink-0 tw-flex tw-items-center tw-justify-center">
                {isExpanded ? (
                  <ChevronDown className="tw-h-4 tw-w-4" />
                ) : (
                  <ChevronRight className="tw-h-4 tw-w-4" />
                )}
              </span>
              <span className="tw-text-sm tw-font-medium tw-flex-1">{displayItem.groupHeader}</span>
              <span className="tw-text-xs tw-text-muted-foreground tw-ml-2">
                {displayItem.images.length}
              </span>
            </button>

            {/* Expanded: thumbnail grid */}
            {isExpanded ? (
              <div className="tw-pl-[30px] tw-pr-2 tw-pb-3 tw-pt-2 tw-bg-accent/20">
                <div className="tw-flex tw-flex-wrap tw-gap-3">
                  {displayItem.images.map((image) => (
                    <MediaItem key={image.id} image={image} onImageClick={onMapItemClick} />
                  ))}
                </div>
              </div>
            ) : undefined}
          </div>
        );
      })}
    </div>
  );
}

// --- Component ---

/**
 * MapsTab renders the Maps research tab content. It displays map items from the "Satellite Bible
 * Atlas" collection, grouped by type (word-linked vs verse-range), with collapsible group headers
 * and thumbnail grids.
 *
 * The backend (platformEnhancedResources.loadMapsTab / CAP-012) filters items to only include
 * Satellite Bible Atlas collection per INV-012. This component receives the pre-filtered items and
 * renders them identically to MediaTab.
 *
 * Supports deferred loading via the `isVisible` prop -- content is only rendered when the tab is
 * visible to avoid unnecessary work.
 *
 * Reuses the MediaItem component from media-item.component.tsx for individual thumbnail rendering.
 *
 * This component is rendered within the ResearchPane's maps TabsContent area.
 */
export default function MapsTab({
  items,
  isVisible,
  expandedGroups,
  onToggleGroup,
  onMapItemClick,
}: MapsTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => MAPS_TAB_LOCALIZED_KEYS, []));

  const grouped = useMemo(() => groupItemsByType(items), [items]);

  // Deferred loading: only render content when tab is visible
  if (!isVisible) {
    return <div data-testid="maps-tab" className="tw-flex tw-flex-col tw-h-full tw-min-h-0" />;
  }

  return (
    <div data-testid="maps-tab" className="tw-flex tw-flex-col tw-h-full tw-min-h-0">
      {/* Scrollable content area */}
      <div className="tw-flex-1 tw-overflow-auto tw-min-h-0">
        {items.length === 0 ? (
          <div className="tw-p-4 tw-text-center">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_emptyState%']}
            </p>
          </div>
        ) : (
          <>
            {/* Word-linked group */}
            <MapsGroup
              groupType="word-linked"
              items={grouped.wordLinked}
              expandedGroups={expandedGroups}
              onToggleGroup={onToggleGroup}
              onMapItemClick={onMapItemClick}
              localizedStrings={localizedStrings}
            />

            {/* Verse-range group */}
            <MapsGroup
              groupType="verse-range"
              items={grouped.verseRange}
              expandedGroups={expandedGroups}
              onToggleGroup={onToggleGroup}
              onMapItemClick={onMapItemClick}
              localizedStrings={localizedStrings}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Re-export types that consumers of MapsTab will need
export type { MediaDisplayItem, BibleImage, MediaGroupType } from './media-item.component';
