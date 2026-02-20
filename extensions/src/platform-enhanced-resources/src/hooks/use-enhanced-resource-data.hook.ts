/**
 * Custom hook that wires the Enhanced Resource web view to backend PAPI commands.
 *
 * This hook calls PAPI commands (registered by the C# EnhancedResourcesNetworkObject) to load
 * research tab content, scripture content, and available resources. It responds to verse reference
 * changes, scope filter changes, and word filter changes by re-fetching data from the backend.
 *
 * Commands called:
 *
 * - PlatformEnhancedResources.loadDictionaryTab
 * - PlatformEnhancedResources.loadEncyclopediaTab
 * - PlatformEnhancedResources.loadMediaTab
 * - PlatformEnhancedResources.loadMapsTab
 * - PlatformEnhancedResources.saveViewState
 * - PlatformEnhancedResources.loadViewState
 * - PlatformEnhancedResources.checkForResourceUpdates
 * - PlatformEnhancedResources.installResource
 *
 * NetworkObject functions accessed via papi.networkObjects.get:
 *
 * - PlatformEnhancedResources.enhancedResources.getAvailableResources
 * - PlatformEnhancedResources.enhancedResources.getScriptureContent
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type {
  DictionaryDisplayItem,
  TermRenderingStatusCode,
} from '../components/dictionary-item.component';
import type {
  EncyclopediaDisplayItem,
  EncyclopediaEntry,
} from '../components/encyclopedia-item.component';
import type { MediaDisplayItem } from '../components/media-item.component';
import type { TrackedProjectOption } from '../components/er-toolbar.component';
import type { WordFilterData } from '../components/scripture-pane.component';
import type { ScopeFilterValue, ResearchTab } from '../components/research-pane.component';

// --- Backend response types (from data-contracts.md) ---

/** VerseReference as used by the C# backend */
interface BackendVerseReference {
  book: number;
  chapter: number;
  verse: number;
}

/** DictionaryTabContent returned by loadDictionaryTab command */
interface DictionaryTabContent {
  items: BackendDictionaryDisplayItem[];
  headerHtml: string;
}

/** Backend DictionaryDisplayItem shape (from data-contracts.md) */
interface BackendDictionaryDisplayItem {
  id: string;
  lemma: string;
  transliteration: string;
  surfaceForm: string;
  sourceText: string;
  lexicalLinks: string;
  partOfSpeech: string;
  partOfSpeechShort: string;
  gloss: string;
  translations: string[];
  definitions: BackendDictionarySenseDefinition[];
  occurrenceCount: number;
  occurrenceReferences: BackendVerseReference[];
  renderingStatus: string;
  expanded: boolean;
}

/** Backend DictionarySenseDefinition */
interface BackendDictionarySenseDefinition {
  senseNumber: string;
  glossText: string;
  definitionHtml: string;
  isRelevantToContext: boolean;
  semanticDomain?: string;
  semanticDomainCode?: string;
}

/** EncyclopediaTabContent returned by loadEncyclopediaTab command */
interface EncyclopediaTabContent {
  items: BackendEncyclopediaDisplayItem[];
  headerHtml: string;
}

/** Backend EncyclopediaDisplayItem shape */
interface BackendEncyclopediaDisplayItem {
  id: string;
  title: string;
  transliteration: string;
  sourceText: string;
  teaserHtml: string;
  fullArticleHtml: string;
  scriptureReferences: BackendVerseReference[];
  hasImages: boolean;
  expanded: boolean;
}

/** MediaTabContent returned by loadMediaTab / loadMapsTab commands */
interface MediaTabContent {
  items: BackendMediaDisplayItem[];
  headerHtml: string;
}

/** Backend MediaDisplayItem shape */
interface BackendMediaDisplayItem {
  id: string;
  title: string;
  collectionName: string;
  caption: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  referenceRange: string;
  lemma?: string;
  imageCount: number;
  expanded: boolean;
}

/** ScriptureContent returned by getScriptureContent */
interface ScriptureContent {
  bodyHtml: string;
  footnoteHtml: string;
  tokens: unknown[];
  activeBanners: unknown[];
  copyrightHtml?: string;
}

/** EnhancedResourceInfo returned by getAvailableResources */
interface EnhancedResourceInfo {
  id: string;
  name: string;
  shortName: string;
  language: string;
  version: string;
  hasResearchData: boolean;
  isInstalled: boolean;
  hasUpdate: boolean;
}

/** Backend WordFilterSource enum values matching C# WordFilterSource */
type BackendWordFilterSource = 0 | 1;

/** Backend WordFilter for command parameters */
interface BackendWordFilter {
  lemma: string;
  lexicalLinks: string[];
  surfaceForm: string;
  sourcePane: BackendWordFilterSource;
}

/** Scope filter enum values matching C# ScopeFilter */
type BackendScopeFilter = 0 | 1 | 2 | 3;

/** Dictionary sort field enum values matching C# DictionarySortField */
type BackendDictionarySortField = 0 | 1 | 2 | 3 | 4;

// --- Network object name ---
const NETWORK_OBJECT_NAME = 'platformEnhancedResources.enhancedResources';

// --- Conversion helpers ---

/**
 * Convert a SerializedVerseRef (from scroll group) to backend VerseReference. SerializedVerseRef
 * uses { book: string, chapterNum, verseNum } Backend VerseReference uses { book: number, chapter,
 * verse }
 */
function toBackendVerseRef(scrRef: SerializedVerseRef): BackendVerseReference {
  // book in SerializedVerseRef is a 3-letter string like "GEN", "EXO", etc.
  // The backend expects a 1-based book number. Use a simple mapping.
  const bookNum = getBookNumber(scrRef.book);
  return {
    book: bookNum,
    chapter: scrRef.chapterNum,
    verse: scrRef.verseNum,
  };
}

/** Map 3-letter book code to 1-based book number */
function getBookNumber(bookCode: string): number {
  const BOOK_CODES: Record<string, number> = {
    GEN: 1,
    EXO: 2,
    LEV: 3,
    NUM: 4,
    DEU: 5,
    JOS: 6,
    JDG: 7,
    RUT: 8,
    '1SA': 9,
    '2SA': 10,
    '1KI': 11,
    '2KI': 12,
    '1CH': 13,
    '2CH': 14,
    EZR: 15,
    NEH: 16,
    EST: 17,
    JOB: 18,
    PSA: 19,
    PRO: 20,
    ECC: 21,
    SNG: 22,
    ISA: 23,
    JER: 24,
    LAM: 25,
    EZK: 26,
    DAN: 27,
    HOS: 28,
    JOL: 29,
    AMO: 30,
    OBA: 31,
    JON: 32,
    MIC: 33,
    NAM: 34,
    HAB: 35,
    ZEP: 36,
    HAG: 37,
    ZEC: 38,
    MAL: 39,
    MAT: 40,
    MRK: 41,
    LUK: 42,
    JHN: 43,
    ACT: 44,
    ROM: 45,
    '1CO': 46,
    '2CO': 47,
    GAL: 48,
    EPH: 49,
    PHP: 50,
    COL: 51,
    '1TH': 52,
    '2TH': 53,
    '1TI': 54,
    '2TI': 55,
    TIT: 56,
    PHM: 57,
    HEB: 58,
    JAS: 59,
    '1PE': 60,
    '2PE': 61,
    '1JN': 62,
    '2JN': 63,
    '3JN': 64,
    JUD: 65,
    REV: 66,
  };
  return BOOK_CODES[bookCode] ?? 1;
}

/** Convert frontend ScopeFilterValue to backend enum */
function toBackendScopeFilter(scope: ScopeFilterValue): BackendScopeFilter {
  const map: Record<ScopeFilterValue, BackendScopeFilter> = {
    'current-verse': 0,
    'current-section': 1,
    'current-chapter': 2,
    'current-sense': 3,
  };
  return map[scope] ?? 0;
}

/** Convert frontend DictionarySortField to backend enum */
function toBackendSortField(sort: string | undefined): BackendDictionarySortField {
  const map: Record<string, BackendDictionarySortField> = {
    translations: 2,
    source: 1,
    definition: 3,
    count: 4,
  };
  return sort ? (map[sort] ?? 0) : 0;
}

/** Convert frontend WordFilterData to backend WordFilter */
function toBackendWordFilter(wf: WordFilterData): BackendWordFilter {
  return {
    lemma: wf.lemma,
    lexicalLinks: wf.lexicalLinks,
    surfaceForm: wf.surfaceForm,
    sourcePane: wf.sourcePane === 'scripture' ? 0 : 1,
  };
}

/** Map backend rendering status string to frontend TermRenderingStatusCode */
function mapRenderingStatus(status: string): TermRenderingStatusCode {
  const statusMap: Record<string, TermRenderingStatusCode> = {
    AllFound: 'AllFound',
    SomeFound: 'SomeFound',
    NoneFound: 'NoneFound',
    AllGuessed: 'AllGuessed',
    SomeGuessed: 'SomeGuessed',
    AllMissing: 'AllMissing',
    AutoAssigned: 'AutoAssigned',
    Denied: 'Denied',
    NotInProject: 'NotInProject',
    NoRendering: 'NoRendering',
    NotMapped: 'NotMapped',
    Unknown: 'Unknown',
  };
  return statusMap[status] ?? 'Unknown';
}

/** Convert backend DictionaryDisplayItem to frontend component shape */
function mapDictionaryItem(item: BackendDictionaryDisplayItem): DictionaryDisplayItem {
  return {
    term: item.lemma,
    sourceText: item.sourceText,
    lexicalLinks: item.lexicalLinks,
    subItems: [
      {
        homographSubscript: 1,
        senses: item.definitions.map((def) => ({
          number: def.senseNumber,
          definition: def.definitionHtml || def.glossText,
          isRelevant: def.isRelevantToContext,
          partOfSpeech: item.partOfSpeech,
          semanticDomains: def.semanticDomainCode
            ? [{ number: def.semanticDomainCode, name: def.semanticDomain || '' }]
            : [],
        })),
      },
    ],
    foundStatus: mapRenderingStatus(item.renderingStatus),
    foundRenderings: item.translations,
    missingInVerses: [],
    occursInReferences: item.occurrenceReferences.map((ref) => ({
      book: String(ref.book),
      chapter: ref.chapter,
      verse: ref.verse,
    })),
    translations: item.translations,
    isGuess: false,
    multipleTokens: false,
    expanded: item.expanded,
  };
}

/** Convert backend EncyclopediaDisplayItem to frontend component shape */
function mapEncyclopediaItem(item: BackendEncyclopediaDisplayItem): EncyclopediaDisplayItem {
  const entry: EncyclopediaEntry = {
    id: item.id,
    title: item.title,
    articleHtml: item.fullArticleHtml,
    scriptureRefs: item.scriptureReferences.map((ref) => `${ref.book}:${ref.chapter}:${ref.verse}`),
  };
  return {
    id: item.id,
    title: item.title,
    sourceText: item.sourceText,
    translations: [],
    teaserHtml: item.teaserHtml,
    expanded: item.expanded,
    seeAlso: [],
    entry,
  };
}

/** Convert backend MediaDisplayItem to frontend component shape */
function mapMediaItem(item: BackendMediaDisplayItem): MediaDisplayItem {
  return {
    id: item.id,
    groupType: item.lemma ? 'word-linked' : 'verse-range',
    groupHeader: item.lemma || item.title,
    images: [
      {
        id: item.id,
        title: item.title,
        description: item.caption,
        filename: item.fullImageUrl,
        copyright: '',
        isVideo: false,
        caption: item.caption,
        thumbnailUrl: item.thumbnailUrl,
      },
    ],
  };
}

// --- Type guards for command results ---

/** Type guard: check if value is an object with an 'items' property */
function isTabContentWithItems(value: unknown): value is { items: unknown[] } {
  return typeof value === 'object' && value !== undefined && !!value && 'items' in value;
}

/** Type guard for DictionaryTabContent */
function isDictionaryTabContent(value: unknown): value is DictionaryTabContent {
  return isTabContentWithItems(value);
}

/** Type guard for EncyclopediaTabContent */
function isEncyclopediaTabContent(value: unknown): value is EncyclopediaTabContent {
  return isTabContentWithItems(value);
}

/** Type guard for MediaTabContent */
function isMediaTabContent(value: unknown): value is MediaTabContent {
  return isTabContentWithItems(value);
}

// --- Hook return type ---

/** Lightweight resource descriptor for the resource selector */
export interface AvailableResource {
  id: string;
  name: string;
}

export interface EnhancedResourceDataResult {
  /** Dictionary items for the research pane */
  dictionaryItems: DictionaryDisplayItem[];
  /** Encyclopedia items for the research pane */
  encyclopediaItems: EncyclopediaDisplayItem[];
  /** Media items for the media tab */
  mediaItems: MediaDisplayItem[];
  /** Maps items for the maps tab */
  mapsItems: MediaDisplayItem[];
  /** Scripture HTML content */
  scriptureHtml: string;
  /** Footnote HTML content */
  footnoteHtml: string;
  /** Available tracked projects */
  availableProjects: TrackedProjectOption[];
  /** Available enhanced resources with IDs (for resource selector) */
  availableResources: AvailableResource[];
  /** Whether data is currently loading */
  isLoading: boolean;
  /** Last error message, if any */
  lastError: string | undefined;
  /** Save the current view state to backend */
  saveViewState: (viewId: string) => Promise<void>;
  /** Check for resource updates */
  checkForUpdates: () => Promise<void>;
}

// --- The Hook ---

export default function useEnhancedResourceData(
  scrRef: SerializedVerseRef,
  scopeFilter: ScopeFilterValue,
  wordFilter: WordFilterData | undefined,
  activeTab: ResearchTab,
  dictionarySortColumn: string | undefined,
  dictionarySortAscending: boolean,
  resourceId: string | undefined,
): EnhancedResourceDataResult {
  // --- State ---
  const [dictionaryItems, setDictionaryItems] = useState<DictionaryDisplayItem[]>([]);
  const [encyclopediaItems, setEncyclopediaItems] = useState<EncyclopediaDisplayItem[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaDisplayItem[]>([]);
  const [mapsItems, setMapsItems] = useState<MediaDisplayItem[]>([]);
  const [scriptureHtml, setScriptureHtml] = useState<string>('');
  const [footnoteHtml, setFootnoteHtml] = useState<string>('');
  const [availableProjects, setAvailableProjects] = useState<TrackedProjectOption[]>([]);
  const [availableResources, setAvailableResources] = useState<AvailableResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastError, setLastError] = useState<string | undefined>(undefined);

  // Track the latest request to avoid stale updates
  const requestIdRef = useRef<number>(0);

  // --- Load available resources on mount ---
  useEffect(() => {
    let cancelled = false;

    async function loadAvailableResources() {
      try {
        const networkObj = await papi.networkObjects.get<{
          getAvailableResources: () => Promise<EnhancedResourceInfo[]>;
        }>(NETWORK_OBJECT_NAME);

        if (networkObj && !cancelled) {
          const resources = await networkObj.getAvailableResources();
          if (!cancelled) {
            setAvailableProjects(
              resources.map((r) => ({
                name: r.name,
                isNoProject: false,
              })),
            );
            setAvailableResources(
              resources.map((r) => ({
                id: r.id,
                name: r.name,
              })),
            );
          }
        }
      } catch (err) {
        logger.warn(`Failed to load available resources: ${err}`);
      }
    }

    loadAvailableResources();
    return () => {
      cancelled = true;
    };
  }, []);

  // --- Load scripture content when verse reference changes ---
  useEffect(() => {
    if (!resourceId) return undefined;
    const currentResourceId: string = resourceId;

    let cancelled = false;
    const verseRef = toBackendVerseRef(scrRef);

    async function loadScripture() {
      try {
        const networkObj = await papi.networkObjects.get<{
          getScriptureContent: (
            resId: string,
            vRef: BackendVerseReference,
            trackedProjectId: string | undefined,
            highlightFilter: number,
            showFootnotes: boolean,
            showFoundRenderings: boolean,
            showTranslations: boolean,
            sourceWordDisplay: number,
          ) => Promise<ScriptureContent>;
        }>(NETWORK_OBJECT_NAME);

        if (networkObj && !cancelled) {
          const content = await networkObj.getScriptureContent(
            currentResourceId,
            verseRef,
            undefined, // trackedProjectId
            0, // AllResearchTerms
            true, // showFootnotes
            true, // showFoundRenderings
            true, // showTranslations
            0, // Original
          );

          if (!cancelled) {
            setScriptureHtml(content.bodyHtml || '');
            setFootnoteHtml(content.footnoteHtml || '');
          }
        }
      } catch (err) {
        if (!cancelled) {
          logger.warn(`Failed to load scripture content: ${err}`);
        }
      }
    }

    loadScripture();
    return () => {
      cancelled = true;
    };
  }, [scrRef, resourceId]);

  // --- Load research tab content when verse/scope/wordFilter/tab changes ---
  useEffect(() => {
    if (!resourceId) return undefined;
    const currentResourceId: string = resourceId;

    let cancelled = false;
    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;

    const verseRef = toBackendVerseRef(scrRef);
    const backendScope = toBackendScopeFilter(scopeFilter);
    const backendWordFilter = wordFilter ? toBackendWordFilter(wordFilter) : undefined;

    async function loadResearchContent() {
      setIsLoading(true);
      setLastError(undefined);

      try {
        // Load content for the active tab (and pre-fetch others for responsiveness)
        const promises: Promise<void>[] = [];

        // Dictionary tab
        promises.push(
          (async () => {
            try {
              const result = await papi.commands.sendCommand(
                'platformEnhancedResources.loadDictionaryTab',
                currentResourceId,
                verseRef,
                backendScope,
                undefined, // linkType
                backendWordFilter,
                toBackendSortField(dictionarySortColumn),
                dictionarySortAscending,
              );
              if (!cancelled && currentRequestId === requestIdRef.current) {
                const tabContent = isDictionaryTabContent(result) ? result : undefined;
                if (tabContent?.items) {
                  setDictionaryItems(tabContent.items.map(mapDictionaryItem));
                }
              }
            } catch (err) {
              logger.warn(`Failed to load dictionary tab: ${err}`);
            }
          })(),
        );

        // Encyclopedia tab
        promises.push(
          (async () => {
            try {
              const result = await papi.commands.sendCommand(
                'platformEnhancedResources.loadEncyclopediaTab',
                currentResourceId,
                verseRef,
                backendScope,
                backendWordFilter,
              );
              if (!cancelled && currentRequestId === requestIdRef.current) {
                const tabContent = isEncyclopediaTabContent(result) ? result : undefined;
                if (tabContent?.items) {
                  setEncyclopediaItems(tabContent.items.map(mapEncyclopediaItem));
                }
              }
            } catch (err) {
              logger.warn(`Failed to load encyclopedia tab: ${err}`);
            }
          })(),
        );

        // Media tab
        promises.push(
          (async () => {
            try {
              const result = await papi.commands.sendCommand(
                'platformEnhancedResources.loadMediaTab',
                currentResourceId,
                verseRef,
                backendScope,
                backendWordFilter,
              );
              if (!cancelled && currentRequestId === requestIdRef.current) {
                const tabContent = isMediaTabContent(result) ? result : undefined;
                if (tabContent?.items) {
                  setMediaItems(tabContent.items.map(mapMediaItem));
                }
              }
            } catch (err) {
              logger.warn(`Failed to load media tab: ${err}`);
            }
          })(),
        );

        // Maps tab
        promises.push(
          (async () => {
            try {
              const result = await papi.commands.sendCommand(
                'platformEnhancedResources.loadMapsTab',
                currentResourceId,
                verseRef,
                backendScope,
                backendWordFilter,
              );
              if (!cancelled && currentRequestId === requestIdRef.current) {
                const tabContent = isMediaTabContent(result) ? result : undefined;
                if (tabContent?.items) {
                  setMapsItems(tabContent.items.map(mapMediaItem));
                }
              }
            } catch (err) {
              logger.warn(`Failed to load maps tab: ${err}`);
            }
          })(),
        );

        await Promise.allSettled(promises);
      } catch (err) {
        if (!cancelled && currentRequestId === requestIdRef.current) {
          const errorMsg = err instanceof Error ? err.message : String(err);
          setLastError(errorMsg);
          logger.error(`Failed to load research content: ${errorMsg}`);
        }
      } finally {
        if (!cancelled && currentRequestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    }

    loadResearchContent();
    return () => {
      cancelled = true;
    };
  }, [
    scrRef,
    scopeFilter,
    wordFilter,
    activeTab,
    resourceId,
    dictionarySortColumn,
    dictionarySortAscending,
  ]);

  // --- Save view state ---
  const saveViewState = useCallback(
    async (viewId: string) => {
      try {
        await papi.commands.sendCommand('platformEnhancedResources.saveViewState', viewId, {
          resourceId: resourceId || '',
          trackedProjectId: undefined,
          splitterPercentage: 50,
          scripturePaneZoom: 100,
          selectedTab: 0,
          scopeFilter: toBackendScopeFilter(scopeFilter),
          termHighlightFilter: 0,
          sortField: toBackendSortField(dictionarySortColumn),
          sortAscending: dictionarySortAscending,
          showFootnotes: true,
          showFoundRenderings: true,
          showTranslations: true,
          sourceWordDisplay: 0,
          lastSeenVersion: undefined,
          dismissedBanners: [],
        });
      } catch (err) {
        logger.warn(`Failed to save view state: ${err}`);
      }
    },
    [resourceId, scopeFilter, dictionarySortColumn, dictionarySortAscending],
  );

  // --- Check for resource updates ---
  const checkForUpdates = useCallback(async () => {
    try {
      await papi.commands.sendCommand('platformEnhancedResources.checkForResourceUpdates');
    } catch (err) {
      logger.warn(`Failed to check for resource updates: ${err}`);
    }
  }, []);

  return {
    dictionaryItems,
    encyclopediaItems,
    mediaItems,
    mapsItems,
    scriptureHtml,
    footnoteHtml,
    availableProjects,
    availableResources,
    isLoading,
    lastError,
    saveViewState,
    checkForUpdates,
  };
}
