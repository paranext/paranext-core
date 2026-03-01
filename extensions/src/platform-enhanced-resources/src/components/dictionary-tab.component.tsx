import { useCallback, useEffect, useMemo, useState } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';
import TabListItem from './tab-list-item.component';
import SemanticDomainViewer from './semantic-domain-viewer.component';
import type { SemanticDomainViewerOutput } from './semantic-domain-viewer.component';

/** Dictionary entry data shape from backend */
interface DictionaryEntry {
  id: string;
  lemma: string;
  partOfSpeech: string;
  glosses: string;
  senses: Array<{ label: string; occurrences: number }>;
  semanticDomains: Array<{ id: string; name: string }>;
}

/** Backend service interface for dictionary operations */
interface ERDictionaryService {
  getDictionaryEntry: (input: {
    scopeFilter: string;
    filteredLemma?: string;
  }) => Promise<{ entries: DictionaryEntry[] }>;
}

/** Fallback dictionary entries when backend is unavailable */
const FALLBACK_ENTRIES: DictionaryEntry[] = [
  {
    id: 'dict-001',
    lemma: 'elohim',
    partOfSpeech: 'noun',
    glosses: 'God, gods, divine being',
    senses: [
      { label: 'the true God', occurrences: 3 },
      { label: 'divine beings, angels', occurrences: 1 },
    ],
    semanticDomains: [{ id: 'sd-12.1', name: '12.1 Supernatural Beings' }],
  },
  {
    id: 'dict-002',
    lemma: 'shamayim',
    partOfSpeech: 'noun',
    glosses: 'heavens, sky',
    senses: [
      { label: 'sky, firmament', occurrences: 2 },
      { label: 'dwelling of God', occurrences: 1 },
    ],
    semanticDomains: [{ id: 'sd-1.1', name: '1.1 Sky' }],
  },
  {
    id: 'dict-003',
    lemma: 'erets',
    partOfSpeech: 'noun',
    glosses: 'earth, land, ground',
    senses: [
      { label: 'earth, world', occurrences: 4 },
      { label: 'land, territory', occurrences: 2 },
    ],
    semanticDomains: [{ id: 'sd-1.2', name: '1.2 World' }],
  },
  {
    id: 'dict-004',
    lemma: 'ruach',
    partOfSpeech: 'noun',
    glosses: 'spirit, wind, breath',
    senses: [
      { label: 'Spirit of God', occurrences: 2 },
      { label: 'wind, breeze', occurrences: 1 },
    ],
    semanticDomains: [{ id: 'sd-12.4', name: '12.4 Spiritual' }],
  },
];

/** Localized string keys used by the dictionary tab */
const DICT_LOCALIZED_KEYS = [
  '%platformEnhancedResources_dict_glosses%',
  '%platformEnhancedResources_dict_pos%',
  '%platformEnhancedResources_dict_senses%',
  '%platformEnhancedResources_dict_domains%',
  '%platformEnhancedResources_dict_expand_all%',
  '%platformEnhancedResources_dict_collapse_all%',
] as const;

/** Props for the DictionaryTab component */
interface DictionaryTabProps {
  /** Current scope filter value */
  scopeFilter?: string;
  /** Filtered lemma from linked word click */
  filteredLemma?: string;
}

/**
 * Dictionary tab content component. Shows lexicon entries with lemma, POS, glosses, senses, and
 * semantic domain links. Supports expand/collapse per entry and expand all / collapse all.
 *
 * @param props - DictionaryTabProps
 * @returns Dictionary tab content with expandable entries
 */
export default function DictionaryTab({
  scopeFilter = 'currentVerse',
  filteredLemma,
}: DictionaryTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...DICT_LOCALIZED_KEYS], []));
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeDomainId, setActiveDomainId] = useState<string | undefined>(undefined);

  // Connect to backend service
  const [erService] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return (await papi.networkObjects.get('enhancedResources')) as
          | ERDictionaryService
          | undefined;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Load dictionary entries
  const [entriesFromBackend] = usePromise(
    useCallback(async () => {
      if (!erService) return undefined;
      try {
        const result = await erService.getDictionaryEntry({
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

  // Reset expanded state when entries change
  useEffect(() => {
    setExpandedIds(new Set());
  }, [scopeFilter, filteredLemma]);

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

  const handleExpandAll = useCallback(() => {
    setExpandedIds(new Set(entries.map((e) => e.id)));
  }, [entries]);

  const handleCollapseAll = useCallback(() => {
    setExpandedIds(new Set());
  }, []);

  const handleDomainLinkClick = useCallback((domainId: string) => {
    setActiveDomainId(domainId);
  }, []);

  const handleDomainViewerAction = useCallback((output: SemanticDomainViewerOutput) => {
    if (output.action === 'close') {
      setActiveDomainId(undefined);
    } else if (output.action === 'selectDomain') {
      // Close viewer and filter dictionary to the selected domain
      setActiveDomainId(undefined);
      // Domain filtering would be applied here when backend is available
    }
  }, []);

  // Localized labels with fallbacks
  const glossesLabel = localizedStrings['%platformEnhancedResources_dict_glosses%'] || 'Glosses';
  const posLabel = localizedStrings['%platformEnhancedResources_dict_pos%'] || 'Part of speech';
  const sensesLabel = localizedStrings['%platformEnhancedResources_dict_senses%'] || 'Senses';
  const domainsLabel =
    localizedStrings['%platformEnhancedResources_dict_domains%'] || 'Semantic domains';
  const expandAllLabel =
    localizedStrings['%platformEnhancedResources_dict_expand_all%'] || 'Expand all';
  const collapseAllLabel =
    localizedStrings['%platformEnhancedResources_dict_collapse_all%'] || 'Collapse all';

  // When domain viewer is active, show it as an overlay replacing the list
  if (activeDomainId !== undefined) {
    return (
      <div data-testid="dictionary-tab-content">
        <SemanticDomainViewer
          initialDomainId={activeDomainId}
          onAction={handleDomainViewerAction}
        />
      </div>
    );
  }

  return (
    <div data-testid="dictionary-tab-content">
      {/* Expand all / Collapse all controls (BHV-407) */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-border-b tw-border-border">
        <button
          type="button"
          data-testid="btn-expand-all"
          className="tw-text-xs tw-text-muted-foreground hover:tw-text-foreground tw-underline"
          onClick={handleExpandAll}
        >
          {expandAllLabel}
        </button>
        <span className="tw-text-muted-foreground">/</span>
        <button
          type="button"
          data-testid="btn-collapse-all"
          className="tw-text-xs tw-text-muted-foreground hover:tw-text-foreground tw-underline"
          onClick={handleCollapseAll}
        >
          {collapseAllLabel}
        </button>
      </div>

      {/* Dictionary entries list */}
      <div role="list" aria-label="Dictionary entries">
        {entries.map((entry) => (
          <div key={entry.id}>
            <TabListItem
              id={entry.id}
              testId="dict-entry"
              label={entry.lemma}
              subtitle={entry.partOfSpeech}
              description={entry.glosses}
              isExpanded={expandedIds.has(entry.id)}
              onToggle={handleToggle}
              detailTestId="dict-entry-detail"
              expandedContent={
                <div className="tw-space-y-2 tw-text-sm">
                  <div>
                    <span className="tw-font-medium">{glossesLabel}: </span>
                    <span>{entry.glosses}</span>
                  </div>
                  <div>
                    <span className="tw-font-medium">{posLabel}: </span>
                    <span>{entry.partOfSpeech}</span>
                  </div>
                  {entry.senses.length > 0 && (
                    <div>
                      <span className="tw-font-medium">{sensesLabel}:</span>
                      <ol className="tw-list-decimal tw-ml-5 tw-mt-1">
                        {entry.senses.map((sense) => (
                          <li key={sense.label}>
                            {sense.label} ({sense.occurrences} occ.)
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {entry.semanticDomains.length > 0 && (
                    <div>
                      <span className="tw-font-medium">{domainsLabel}:</span>
                      <ul className="tw-ml-5 tw-mt-1">
                        {entry.semanticDomains.map((domain) => (
                          <li key={domain.id}>
                            <button
                              type="button"
                              data-testid="dict-domain-link"
                              className="tw-text-primary tw-cursor-pointer hover:tw-underline tw-bg-transparent tw-border-none tw-p-0 tw-text-left"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDomainLinkClick(domain.id);
                              }}
                            >
                              {domain.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              }
            />
            {/* Domain links visible in collapsed state for quick access */}
            {entry.semanticDomains.length > 0 && !expandedIds.has(entry.id) && (
              <div className="tw-flex tw-gap-2 tw-px-3 tw-pb-1 tw-text-xs tw-flex-wrap">
                {entry.semanticDomains.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    data-testid="dict-domain-link"
                    className="tw-text-primary tw-cursor-pointer hover:tw-underline tw-bg-transparent tw-border-none tw-p-0 tw-text-xs"
                    onClick={() => handleDomainLinkClick(domain.id)}
                  >
                    {domain.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
