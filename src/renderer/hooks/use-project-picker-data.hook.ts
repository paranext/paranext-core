import { useData } from '@renderer/hooks/papi-hooks';
import { useEvent, usePromise } from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';
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
 * Resolves a BCP-47 language tag to its localized display name. Returns undefined when the language
 * setting is unset (default placeholder value) or when the tag can't be resolved.
 */
function resolveLanguage(
  language: string,
  languageTag: string,
): { tag: string; displayName: string } | undefined {
  if (language.startsWith('%')) return undefined;
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
 * `ProjectMetadata`, so both fall back to the project id to guarantee non-empty, defined display
 * strings (and a safe sort key for callers that sort by `fullName`).
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

  const [currentProject, isCurrentProjectLoading] = usePromise<ProjectItem | undefined>(
    useCallback(async () => {
      // Referenced so this callback re-runs whenever refresh() is called
      // eslint-disable-next-line no-unused-expressions
      refreshCounter;
      const allDefs = await webViews.getAllOpenWebViewDefinitions();
      const editorDef = findFirstEditorWebViewDefinition(allDefs);
      if (!editorDef?.projectId) return undefined;
      try {
        const metadata = await projectLookupService.getMetadataForAllProjects({
          includeProjectIds: editorDef.projectId,
        });
        const m = metadata[0];
        if (!m) throw new Error(`No project metadata found for ${editorDef.projectId}`);
        setCurrentProjectError(undefined);
        return metadataToProjectItem(m);
      } catch (e) {
        logger.error(
          `ProjectPicker: could not fetch details for current project ${editorDef.projectId}: ${getErrorMessage(e)}`,
        );
        setCurrentProjectError('Unable to load current project details');
        return {
          id: editorDef.projectId,
          fullName: 'Unable to load current project details',
          shortName: '???',
        };
      }
    }, [refreshCounter]),
    undefined,
  );

  const [recentProjects, isRecentProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      // Referenced so this callback re-runs whenever refresh() is called
      // eslint-disable-next-line no-unused-expressions
      refreshCounter;
      if (safeRecentIds.length === 0) return [];
      try {
        const metadata = await projectLookupService.getMetadataForAllProjects({
          includeProjectIds: safeRecentIds,
        });
        // Project ids compare case-insensitively (C# canonicalizes to uppercase), so normalize
        // both the map keys and the lookup key to avoid dropping recent ids on case mismatch.
        const metadataById = new Map<string, ProjectMetadata>(
          metadata.map((m) => [m.id.toUpperCase(), m]),
        );
        // Preserve safeRecentIds' recency order; drop ids with no metadata (not found / errored)
        // and non-editable projects, matching the previous per-id fetch-and-skip behavior.
        return safeRecentIds
          .map((id: string) => metadataById.get(id.toUpperCase()))
          .filter((m: ProjectMetadata | undefined): m is ProjectMetadata => !!m?.isEditable)
          .map(metadataToProjectItem);
      } catch (e) {
        logger.warn(
          `ProjectPicker: could not fetch recent project metadata: ${getErrorMessage(e)}`,
        );
        return [];
      }
    }, [safeRecentIds, refreshCounter]),
    [],
  );

  const [allProjectsWithRecent, isAllProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      // Referenced so this callback re-runs whenever refresh() is called
      // eslint-disable-next-line no-unused-expressions
      refreshCounter;
      const metadata = await projectLookupService.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      });
      return metadata.filter((m) => m.isEditable).map(metadataToProjectItem);
    }, [refreshCounter]),
    [],
  );

  const recentIdSet = useMemo(() => new Set(safeRecentIds), [safeRecentIds]);
  const allProjects = useMemo(
    () =>
      allProjectsWithRecent
        .filter((p) => !recentIdSet.has(p.id))
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
