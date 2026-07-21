import { useData } from '@renderer/hooks/papi-hooks';
import { useEvent, usePromise } from 'platform-bible-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getNetworkEvent } from '@shared/services/network.service';
import { webViews } from '@renderer/services/papi-frontend.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { type ProjectMetadata } from '@shared/models/project-metadata.model';
import { type ProjectMetadataFilterOptions } from '@shared/models/project-data-provider-factory.interface';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { findFirstEditorWebViewDefinition } from '@shared/models/web-view.model';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';

/**
 * `projectInterface` a project must support to belong in the picker: it can be opened in the
 * scripture editor. This filter is applied service-side so the service's retry-until-non-empty
 * startup grace period keeps retrying until a factory that provides this interface has registered
 * (a bare unfiltered fetch settles as soon as any project - possibly a non-scripture one - appears,
 * before the layering PDPF that provides this interface registers). Published resources also carry
 * this interface via the Scripture Extender layering PDPF, so the current project and recent
 * projects (both always scripture or resource projects) resolve from the same filtered fetch.
 */
const PICKER_PROJECT_INTERFACE = 'platformScripture.USJ_Chapter';
const PICKER_METADATA_FILTER: ProjectMetadataFilterOptions = {
  includeProjectInterfaces: [PICKER_PROJECT_INTERFACE],
};

const EMPTY_RECENT_IDS: string[] = [];

/**
 * Resolves a project's language for display: the localized display name of the BCP-47 language tag
 * when it can be resolved, otherwise the raw language setting value for both fields. Returns
 * undefined when the project has no `language` setting, leaving the language column blank rather
 * than surfacing a `%project_language_missing%` placeholder. The guard is on `language`, NOT
 * `languageTag`: C# always populates a `languageTag` (coercing an unset writing system to 'en'), so
 * guarding on the tag would mislabel every language-less project as 'English'.
 */
function resolveLanguage(
  language: string,
  languageTag: string,
): { tag: string; displayName: string } | undefined {
  if (!language) return undefined;
  try {
    const displayName = new Intl.DisplayNames([navigator.language ?? 'en'], {
      type: 'language',
    }).of(languageTag);
    if (displayName) return { tag: languageTag, displayName };
  } catch {
    // fall through
  }
  return { tag: language, displayName: language };
}

/**
 * Converts cheap project metadata (already fetched via `projectLookupService`) into a `ProjectItem`
 * for display, without opening a project data provider. `fullName`/`name` are optional on
 * `ProjectMetadata`, so both fall back to the project id to guarantee defined display strings (and
 * a safe sort key for callers that sort by `fullName`). A present-but-empty value passes through
 * as-is - empty FullName is a real, deliberately-supported Paratext case.
 */
function metadataToProjectItem(m: ProjectMetadata): ProjectItem {
  const resolved = resolveLanguage(m.language ?? '', m.languageTag ?? '');
  return {
    id: m.id,
    fullName: m.fullName ?? m.name ?? m.id,
    shortName: m.name ?? m.id,
    language: resolved?.tag,
    languageDisplayName: resolved?.displayName,
  };
}

export type ProjectPickerData = {
  currentProject: ProjectItem | undefined;
  recentProjects: ProjectItem[];
  /** All projects, with recentProjects already excluded. */
  allProjects: ProjectItem[];
  /** Set when fetching details for the current project fails. */
  currentProjectError: string | undefined;
  isLoading: boolean;
};

export function useProjectPickerData(): ProjectPickerData {
  // Two independent refresh generations, so cheap "which project is active?" updates don't drag in
  // the expensive project-metadata fan-out:
  // - metadataRefreshCounter invalidates the shared metadata fetch. Bumped only by events that can
  //   change the SET of available projects (extensions reloading), plus a targeted bump when the
  //   active editor references a project our cached snapshot doesn't yet include (see below).
  // - webViewRefreshCounter re-derives the current project from the open web views. Bumped by web
  //   view open/update/close - frequent during startup tab restoration - which re-runs only the
  //   cheap getAllOpenWebViewDefinitions query and reuses the cached metadata.
  const [metadataRefreshCounter, setMetadataRefreshCounter] = useState(0);
  const [webViewRefreshCounter, setWebViewRefreshCounter] = useState(0);
  const [currentProjectError, setCurrentProjectError] = useState<string | undefined>(undefined);
  const refreshMetadata = useCallback(() => setMetadataRefreshCounter((n) => n + 1), []);
  const refreshActiveEditor = useCallback(() => setWebViewRefreshCounter((n) => n + 1), []);

  const onDidOpenWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW), []);
  useEvent(onDidOpenWebView, refreshActiveEditor);
  const onDidUpdateWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW), []);
  useEvent(onDidUpdateWebView, refreshActiveEditor);
  const onDidCloseWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW), []);
  useEvent(onDidCloseWebView, refreshActiveEditor);
  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  useEvent(onDidReloadExtensions, refreshMetadata);
  // C#-emitted (LocalParatextProjects.PROJECTS_CHANGED_EVENT_TYPE) when the project SET changes
  // (added/removed via S/R, DBL, etc.) or a project's display metadata changes. This is the precise
  // signal that onDidReloadExtensions only approximated; invalidate the metadata cache on it so all
  // three sections refetch.
  const onDidChangeProjects = useMemo(() => getNetworkEvent('platform.onDidChangeProjects'), []);
  useEvent(onDidChangeProjects, refreshMetadata);

  // Recent project IDs from the service — reactive, updates when user opens projects
  const [rawRecentIds, , isRecentIdsLoading] = useData(
    'platformScripture.recentlyOpenedProjects',
  ).RecentProjects(undefined, EMPTY_RECENT_IDS);

  const safeRecentIds = useMemo(
    () => (isPlatformError(rawRecentIds) ? [] : (rawRecentIds ?? [])),
    [rawRecentIds],
  );

  // All three data sections below derive from ONE service call per metadata refresh generation. The
  // call is filtered to the picker's `projectInterface` (see PICKER_METADATA_FILTER) so the
  // service's startup grace period retries until a matching factory registers. The promise is
  // created lazily inside whichever usePromise callback runs first and cached by generation, so the
  // others await the same in-flight fetch. A rejected fetch is dropped from the cache so a later
  // section (or refresh) issues a fresh call instead of awaiting the poisoned promise; each section
  // still catches its own errors, preserving the per-section failure behavior below.
  const metadataFetchRef = useRef<
    { counter: number; promise: Promise<ProjectMetadata[]> } | undefined
  >(undefined);
  const getAllMetadata = useCallback(() => {
    const cached = metadataFetchRef.current;
    if (cached?.counter === metadataRefreshCounter) return cached.promise;
    const entry = {
      counter: metadataRefreshCounter,
      promise: projectLookupService.getMetadataForAllProjects(PICKER_METADATA_FILTER),
    };
    // Invalidate this generation if its fetch rejects, but only if it's still the current entry so
    // a newer generation isn't clobbered.
    entry.promise.catch(() => {
      if (metadataFetchRef.current === entry) metadataFetchRef.current = undefined;
    });
    metadataFetchRef.current = entry;
    return entry.promise;
  }, [metadataRefreshCounter]);

  // The active editor's project id from the last miss-triggered metadata refresh. Guards against
  // refreshing metadata forever when the id is genuinely absent (vs. merely not-yet-fetched).
  const missRefreshedProjectIdRef = useRef<string | undefined>(undefined);

  const [currentProject, isCurrentProjectLoading] = usePromise<ProjectItem | undefined>(
    useCallback(async () => {
      // Referenced so this callback re-runs on web view events (open/update/close) to pick up the
      // active editor, without invalidating the metadata cache.
      // eslint-disable-next-line no-unused-expressions
      webViewRefreshCounter;
      const allDefs = await webViews.getAllOpenWebViewDefinitions();
      const editorDef = findFirstEditorWebViewDefinition(allDefs);
      const currentProjectId = editorDef?.projectId;
      if (!currentProjectId) {
        setCurrentProjectError(undefined);
        return undefined;
      }
      try {
        const metadata = await getAllMetadata();
        const key = normalizeProjectId(currentProjectId);
        const m = metadata.find((md) => normalizeProjectId(md.id) === key);
        if (m) {
          missRefreshedProjectIdRef.current = undefined;
          setCurrentProjectError(undefined);
          return metadataToProjectItem(m);
        }
        if (missRefreshedProjectIdRef.current !== key) {
          // The active editor references a project our cached metadata doesn't include - usually one
          // registered after the last fetch (web view events don't invalidate the metadata cache on
          // their own). Refresh metadata once for this id; the re-run resolves it. Stay neutral
          // meanwhile rather than flashing the error card.
          missRefreshedProjectIdRef.current = key;
          setCurrentProjectError(undefined);
          refreshMetadata();
          return undefined;
        }
        // Still absent after a targeted refresh: treat as a genuine lookup failure.
        throw new Error(`No project metadata found for ${currentProjectId}`);
      } catch (e) {
        logger.error(
          `ProjectPicker: could not fetch details for current project ${currentProjectId}: ${getErrorMessage(e)}`,
        );
        setCurrentProjectError('Unable to load current project details');
        return {
          id: currentProjectId,
          fullName: 'Unable to load current project details',
          shortName: '???',
        };
      }
    }, [getAllMetadata, refreshMetadata, webViewRefreshCounter]),
    undefined,
  );

  const [recentProjects, isRecentProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      if (safeRecentIds.length === 0) return [];
      try {
        const metadata = await getAllMetadata();
        const metadataById = new Map<string, ProjectMetadata>(
          metadata.map((m) => [normalizeProjectId(m.id), m]),
        );
        // Preserve safeRecentIds' recency order; drop ids with no metadata (not found / errored)
        // and non-editable projects.
        // `isEditable` is optional on ProjectMetadata; a factory that omits it must be treated as
        // editable to match the registered contribution default (true) for `platform.isEditable`.
        return safeRecentIds
          .map((id: string) => metadataById.get(normalizeProjectId(id)))
          .filter(
            (m: ProjectMetadata | undefined): m is ProjectMetadata => !!m && m.isEditable !== false,
          )
          .map(metadataToProjectItem);
      } catch (e) {
        logger.warn(
          `ProjectPicker: could not fetch recent project metadata: ${getErrorMessage(e)}`,
        );
        return [];
      }
    }, [safeRecentIds, getAllMetadata]),
    [],
  );

  const [allProjectsWithRecent, isAllProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      try {
        const metadata = await getAllMetadata();
        return (
          metadata
            // The service already filtered to PICKER_PROJECT_INTERFACE, so only the editability
            // filter is left. Treat a missing `isEditable` as editable - the registered default is
            // true (see the recents filter above for the full reasoning).
            .filter((m) => m.isEditable !== false)
            .map(metadataToProjectItem)
        );
      } catch (e) {
        logger.warn(`ProjectPicker: could not fetch project metadata: ${getErrorMessage(e)}`);
        return [];
      }
    }, [getAllMetadata]),
    [],
  );

  const recentIdSet = useMemo(
    () => new Set(safeRecentIds.map((id: string) => normalizeProjectId(id))),
    [safeRecentIds],
  );
  const allProjects = useMemo(
    () =>
      allProjectsWithRecent
        .filter((p) => !recentIdSet.has(normalizeProjectId(p.id)))
        .sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [allProjectsWithRecent, recentIdSet],
  );

  return {
    currentProject,
    recentProjects,
    allProjects,
    currentProjectError,
    isLoading:
      isCurrentProjectLoading ||
      isRecentIdsLoading ||
      isRecentProjectsLoading ||
      isAllProjectsLoading,
  };
}

export default useProjectPickerData;
