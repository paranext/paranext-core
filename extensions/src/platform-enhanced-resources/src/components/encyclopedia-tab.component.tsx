import { useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import EncyclopediaItem from './encyclopedia-item.component';
import type { EncyclopediaDisplayItem, EncyclopediaEntry } from './encyclopedia-item.component';

// --- Types ---

/** Props for the EncyclopediaTab component */
export interface EncyclopediaTabProps {
  /** Encyclopedia items to display */
  items: EncyclopediaDisplayItem[];
  /** Callback when an item is expanded/collapsed */
  onToggleExpand: (id: string) => void;
  /** Callback when "Read full article" is clicked */
  onReadArticle: (entry: EncyclopediaEntry) => void;
}

// --- Constants ---

const ENCYCLOPEDIA_TAB_LOCALIZED_KEYS: LocalizeKey[] = ['%enhancedResources_emptyState%'];

// --- Component ---

/**
 * EncyclopediaTab renders the Encyclopedia research tab content. It displays an expandable list of
 * encyclopedia items with teaser text, translations, source text, and "Read full article" links.
 *
 * This component is rendered within the ResearchPane's encyclopedia TabsContent area.
 */
export default function EncyclopediaTab({
  items,
  onToggleExpand,
  onReadArticle,
}: EncyclopediaTabProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => ENCYCLOPEDIA_TAB_LOCALIZED_KEYS, []),
  );

  return (
    <div data-testid="encyclopedia-tab" className="tw-flex tw-flex-col tw-h-full tw-min-h-0">
      {/* Item list */}
      <div className="tw-flex-1 tw-overflow-auto tw-min-h-0">
        {items.length === 0 ? (
          <div className="tw-p-4 tw-text-center">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_emptyState%']}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <EncyclopediaItem
              key={item.id}
              item={item}
              onToggleExpand={onToggleExpand}
              onReadArticle={onReadArticle}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Re-export types that consumers of EncyclopediaTab will need
export type { EncyclopediaDisplayItem, EncyclopediaEntry } from './encyclopedia-item.component';
