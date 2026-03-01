import { useCallback, useMemo, useState } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';
import TabListItem from './tab-list-item.component';

/** Encyclopedia entry data shape from backend */
interface EncyclopediaEntry {
  id: string;
  title: string;
  summary: string;
}

/** Backend service interface for encyclopedia operations */
interface EREncyclopediaService {
  getEncyclopediaEntry: (input: {
    scopeFilter: string;
    filteredLemma?: string;
  }) => Promise<{ entries: EncyclopediaEntry[] }>;
}

/** Fallback encyclopedia entries when backend is unavailable */
const FALLBACK_ENTRIES: EncyclopediaEntry[] = [
  {
    id: 'encyc-001',
    title: 'Creation',
    summary: 'The biblical account of how God created the heavens and the earth.',
  },
  {
    id: 'encyc-002',
    title: 'Heaven',
    summary: 'The sky or firmament; the dwelling place of God.',
  },
  {
    id: 'encyc-003',
    title: 'Earth',
    summary: 'The world or land; the ground on which humanity lives.',
  },
];

/** Localized string keys */
const ENCYC_LOCALIZED_KEYS = ['%platformEnhancedResources_encyc_no_entries%'] as const;

/** Props for the EncyclopediaTab component */
interface EncyclopediaTabProps {
  /** Current scope filter value */
  scopeFilter?: string;
  /** Filtered lemma from linked word click */
  filteredLemma?: string;
  /** Callback when an entry is clicked to open ArticleViewer */
  onOpenArticle?: (entryId: string) => void;
}

/**
 * Encyclopedia tab content component. Shows encyclopedia article summaries. Clicking an entry opens
 * the ArticleViewer overlay.
 *
 * @param props - EncyclopediaTabProps
 * @returns Encyclopedia tab content with clickable entries
 */
export default function EncyclopediaTab({
  scopeFilter = 'currentVerse',
  filteredLemma,
  onOpenArticle,
}: EncyclopediaTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...ENCYC_LOCALIZED_KEYS], []));

  // Track expansion state for entries (used for visual expand/collapse if needed)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Connect to backend service
  const [erService] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return (await papi.networkObjects.get('enhancedResources')) as
          | EREncyclopediaService
          | undefined;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Load encyclopedia entries
  const [entriesFromBackend] = usePromise(
    useCallback(async () => {
      if (!erService) return undefined;
      try {
        const result = await erService.getEncyclopediaEntry({
          scopeFilter,
          filteredLemma,
        });
        return result.entries;
      } catch {
        return undefined;
      }
    }, [erService, scopeFilter, filteredLemma]),
    undefined,
  );

  const entries = entriesFromBackend ?? FALLBACK_ENTRIES;

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleAction = useCallback(
    (id: string) => {
      if (onOpenArticle) {
        onOpenArticle(id);
      }
    },
    [onOpenArticle],
  );

  const noEntriesText =
    localizedStrings['%platformEnhancedResources_encyc_no_entries%'] ||
    'No encyclopedia entries found';

  if (entries.length === 0) {
    return (
      <div
        data-testid="encyclopedia-tab-content"
        className="tw-p-4 tw-text-sm tw-text-muted-foreground"
      >
        {noEntriesText}
      </div>
    );
  }

  return (
    <div data-testid="encyclopedia-tab-content">
      <div role="list" aria-label="Encyclopedia entries">
        {entries.map((entry) => (
          <TabListItem
            key={entry.id}
            id={entry.id}
            testId="encyc-entry"
            label={entry.title}
            description={entry.summary}
            isExpanded={expandedIds.has(entry.id)}
            onToggle={handleToggle}
            onAction={handleAction}
          />
        ))}
      </div>
    </div>
  );
}
