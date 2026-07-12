import { useData } from '@renderer/hooks/papi-hooks';
import { useEvent, usePromise } from 'platform-bible-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { getNetworkEvent } from '@shared/services/network.service';
import { webViews } from '@renderer/services/papi-frontend.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { type ProjectMetadata } from '@shared/models/project-metadata.model';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { findFirstEditorWebViewDefinition } from '@shared/models/web-view.model';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';

const EMPTY_RECENT_IDS: string[] = [];

/**
 * Resolves a project's language for display: the localized display name of the BCP-47 language tag
 * when it can be resolved, otherwise the raw language setting value for both fields. Returns
 * undefined when the project has neither a language nor a language tag.
 */
function resolveLanguage(
  language: string,
  languageTag: string,
): { tag: string; displayName: string } | undefined {
  if (!language && !languageTag) return undefined;
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
 * as-is - empty FullName is a real, deliberately-supported Paratext case, and the old
 * `getSetting`-based path returned it unchanged too.
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
  // Incrementing this triggers a refresh of usePromise calls
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [currentProjectError, setCurrentProjectError] = useState<string | undefined>(undefined);
  const refresh = useCallback(() => setRefreshCounter((n) => n + 1), []);

  const onDidOpenWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW), []);
  useEvent(onDidOpenWebView, refresh);
  const onDidUpdateWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW), []);
  useEvent(onDidUpdateWebView, refresh);
  const onDidCloseWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW), []);
  useEvent(onDidCloseWebView, refresh);
  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  useEvent(onDidReloadExtensions, refresh);

  // Recent project IDs from the service — reactive, updates when user opens projects
  const [rawRecentIds, , isRecentIdsLoading] = useData(
    'platformScripture.recentlyOpenedProjects',
  ).RecentProjects(undefined, EMPTY_RECENT_IDS);

  const safeRecentIds = useMemo(
    () => (isPlatformError(rawRecentIds) ? [] : (rawRecentIds ?? [])),
    [rawRecentIds],
  );

  // All three data sections below derive from ONE unfiltered metadata fetch per refresh. The
  // service applies id/interface filters client-side after contacting every PDP factory anyway,
  // so per-section filtered calls would repeat the same full fan-out three times per refresh.
  // The promise is created lazily inside whichever usePromise callback runs first and cached by
  // refresh generation, so the others await the same in-flight fetch. Each section still handles
  // its own errors, preserving the per-section failure behavior below.
  const metadataFetchRef = useRef<
    { counter: number; promise: Promise<ProjectMetadata[]> } | undefined
  >(undefined);
  const getAllMetadata = useCallback(() => {
    if (metadataFetchRef.current?.counter !== refreshCounter) {
      metadataFetchRef.current = {
        counter: refreshCounter,
        promise: projectLookupService.getMetadataForAllProjects(),
      };
    }
    return metadataFetchRef.current.promise;
  }, [refreshCounter]);

  const [currentProject, isCurrentProjectLoading] = usePromise<ProjectItem | undefined>(
    useCallback(async () => {
      const allDefs = await webViews.getAllOpenWebViewDefinitions();
      const editorDef = findFirstEditorWebViewDefinition(allDefs);
      const currentProjectId = editorDef?.projectId;
      if (!currentProjectId) return undefined;
      try {
        const metadata = await getAllMetadata();
        // Project ids compare case-insensitively (C# canonicalizes to uppercase)
        const m = metadata.find((md) => md.id.toUpperCase() === currentProjectId.toUpperCase());
        if (!m) throw new Error(`No project metadata found for ${currentProjectId}`);
        setCurrentProjectError(undefined);
        return metadataToProjectItem(m);
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
    }, [getAllMetadata]),
    undefined,
  );

  const [recentProjects, isRecentProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      if (safeRecentIds.length === 0) return [];
      try {
        const metadata = await getAllMetadata();
        // Project ids compare case-insensitively (C# canonicalizes to uppercase), so normalize
        // both the map keys and the lookup key to avoid dropping recent ids on case mismatch.
        const metadataById = new Map<string, ProjectMetadata>(
          metadata.map((m) => [m.id.toUpperCase(), m]),
        );
        // Preserve safeRecentIds' recency order; drop ids with no metadata (not found / errored)
        // and non-editable projects, matching the previous per-id fetch-and-skip behavior.
        // `isEditable` is optional on ProjectMetadata; a factory that omits it must be treated as
        // editable to match the registered default (true) that `getSetting('platform.isEditable')`
        // would have resolved.
        return safeRecentIds
          .map((id: string) => metadataById.get(id.toUpperCase()))
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
      const metadata = await getAllMetadata();
      return (
        metadata
          // Only projects that can be opened in the scripture editor belong in the picker -
          // previously expressed as the service-side `includeProjectInterfaces` filter.
          .filter((m) => m.projectInterfaces.includes('platformScripture.USJ_Chapter'))
          // Treat a missing `isEditable` as editable - the registered default is true (see the
          // recents filter above for the full reasoning).
          .filter((m) => m.isEditable !== false)
          .map(metadataToProjectItem)
      );
    }, [getAllMetadata]),
    [],
  );

  // Uppercased like the recents metadata lookup above - project ids compare case-insensitively
  const recentIdSet = useMemo(
    () => new Set(safeRecentIds.map((id: string) => id.toUpperCase())),
    [safeRecentIds],
  );
  const allProjects = useMemo(
    () =>
      allProjectsWithRecent
        .filter((p) => !recentIdSet.has(p.id.toUpperCase()))
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
