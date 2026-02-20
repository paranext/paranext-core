declare module 'platform-enhanced-resources' {
  // Add extension types exposed on the papi for other extensions to use here

  /** VerseReference as used by the C# backend */
  export interface VerseReference {
    book: number;
    chapter: number;
    verse: number;
  }

  /** Backend WordFilterSource enum: 0=Scripture (exact match), 1=Dictionary (partial match) */
  export type WordFilterSource = 0 | 1;

  /** Backend WordFilter for command parameters */
  export interface WordFilter {
    lemma: string;
    lexicalLinks: string[];
    surfaceForm: string;
    sourcePane: WordFilterSource;
  }

  /** View state for persistence */
  export interface EnhancedResourceViewState {
    resourceId: string;
    trackedProjectId?: string;
    splitterPercentage: number;
    scripturePaneZoom: number;
    selectedTab: number;
    scopeFilter: number;
    termHighlightFilter: number;
    sortField: number;
    sortAscending: boolean;
    showFootnotes: boolean;
    showFoundRenderings: boolean;
    showTranslations: boolean;
    sourceWordDisplay: number;
    lastSeenVersion?: string;
    dismissedBanners: string[];
  }

  /** Enhanced resource info from backend */
  export interface EnhancedResourceInfo {
    id: string;
    name: string;
    shortName: string;
    language: string;
    version: string;
    hasResearchData: boolean;
    isInstalled: boolean;
    hasUpdate: boolean;
  }

  /** Resource install request */
  export interface ResourceInstallRequest {
    resourceName: string;
    resourceType: string;
    version?: string;
    hasResearchData: boolean;
    sourceUrl?: string;
    localPath?: string;
  }

  /** Resource install result */
  export interface ResourceInstallResult {
    success: boolean;
    resourceName: string;
    errorMessage?: string;
    errorCode?: string;
  }
}

declare module 'papi-shared-types' {
  import type {
    VerseReference,
    WordFilter,
    EnhancedResourceViewState,
    EnhancedResourceInfo,
    ResourceInstallRequest,
    ResourceInstallResult,
  } from 'platform-enhanced-resources';

  export interface CommandHandlers {
    /**
     * Opens an Enhanced Resource viewer web view.
     *
     * @param webViewId Optional existing web view ID to reuse
     * @param resourceId Optional enhanced resource ID to display
     * @returns The web view ID of the opened Enhanced Resource viewer, or `undefined` if not opened
     */
    'platformEnhancedResources.openEnhancedResource': (
      webViewId: string | undefined,
      resourceId: string | undefined,
    ) => Promise<string | undefined>;

    /**
     * Opens the Enhanced Resources Getting Started guide.
     *
     * @param webViewId Optional existing web view ID
     * @returns The web view ID of the guide, or `undefined` if not opened
     */
    'platformEnhancedResources.openGuide': (
      webViewId: string | undefined,
    ) => Promise<string | undefined>;

    /**
     * Load dictionary tab content for the given resource, verse, scope, and filters.
     *
     * @param resourceId The enhanced resource ID
     * @param verseRef Current verse reference
     * @param scope Scope filter (0=verse, 1=section, 2=chapter, 3=sense)
     * @param linkType Optional link type filter
     * @param wordFilter Optional word filter
     * @param sortField Sort field enum (0=translit, 1=lemma, 2=translations, 3=gloss, 4=found)
     * @param sortAscending Sort direction
     * @returns Dictionary tab content with items and header HTML
     */
    'platformEnhancedResources.loadDictionaryTab': (
      resourceId: string,
      verseRef: VerseReference,
      scope: number,
      linkType: string | undefined,
      wordFilter: WordFilter | undefined,
      sortField: number,
      sortAscending: boolean,
    ) => Promise<unknown>;

    /**
     * Load encyclopedia tab content.
     *
     * @param resourceId The enhanced resource ID
     * @param verseRef Current verse reference
     * @param scope Scope filter enum
     * @param wordFilter Optional word filter
     * @returns Encyclopedia tab content with items and header HTML
     */
    'platformEnhancedResources.loadEncyclopediaTab': (
      resourceId: string,
      verseRef: VerseReference,
      scope: number,
      wordFilter: WordFilter | undefined,
    ) => Promise<unknown>;

    /**
     * Load media tab content.
     *
     * @param resourceId The enhanced resource ID
     * @param verseRef Current verse reference
     * @param scope Scope filter enum
     * @param wordFilter Optional word filter
     * @returns Media tab content with items and header HTML
     */
    'platformEnhancedResources.loadMediaTab': (
      resourceId: string,
      verseRef: VerseReference,
      scope: number,
      wordFilter: WordFilter | undefined,
    ) => Promise<unknown>;

    /**
     * Load maps tab content.
     *
     * @param resourceId The enhanced resource ID
     * @param verseRef Current verse reference
     * @param scope Scope filter enum
     * @param wordFilter Optional word filter
     * @returns Maps tab content with items and header HTML
     */
    'platformEnhancedResources.loadMapsTab': (
      resourceId: string,
      verseRef: VerseReference,
      scope: number,
      wordFilter: WordFilter | undefined,
    ) => Promise<unknown>;

    /**
     * Save the current view state for persistence.
     *
     * @param viewId The web view ID
     * @param viewState The view state to save
     */
    'platformEnhancedResources.saveViewState': (
      viewId: string,
      viewState: EnhancedResourceViewState,
    ) => Promise<void>;

    /**
     * Load a previously saved view state.
     *
     * @param viewId The web view ID
     * @returns The saved view state, or undefined if none exists
     */
    'platformEnhancedResources.loadViewState': (
      viewId: string,
    ) => Promise<EnhancedResourceViewState | undefined>;

    /**
     * Check for available resource updates.
     *
     * @returns List of resources with updates available
     */
    'platformEnhancedResources.checkForResourceUpdates': () => Promise<EnhancedResourceInfo[]>;

    /**
     * Install or update a resource.
     *
     * @param request The install request
     * @returns The install result
     */
    'platformEnhancedResources.installResource': (
      request: ResourceInstallRequest,
    ) => Promise<ResourceInstallResult>;
  }
}
