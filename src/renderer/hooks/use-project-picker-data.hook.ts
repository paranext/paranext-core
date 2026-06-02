import { useData } from '@renderer/hooks/papi-hooks';
import { useEvent, usePromise } from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';
import { getNetworkEvent } from '@shared/services/network.service';
import { webViews } from '@renderer/services/papi-frontend.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';

const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

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

async function fetchProjectDetails(projectId: string): Promise<{
  fullName: string;
  shortName: string;
  language?: string;
  languageDisplayName?: string;
  isEditable: boolean;
}> {
  const pdp = await papiFrontendProjectDataProviderService.get(
    PROJECT_INTERFACE_PLATFORM_BASE,
    projectId,
  );
  const [fullName, shortName, language, languageTag, isEditable] = await Promise.all([
    pdp.getSetting('platform.fullName'),
    pdp.getSetting('platform.name'),
    pdp.getSetting('platform.language'),
    pdp.getSetting('platform.languageTag'),
    pdp.getSetting('platform.isEditable'),
  ]);
  const resolved = resolveLanguage(language, languageTag);
  return {
    fullName,
    shortName,
    language: resolved?.tag,
    languageDisplayName: resolved?.displayName,
    isEditable: !!isEditable,
  };
}

export type ProjectPickerData = {
  currentProject: ProjectItem | undefined;
  recentProjects: ProjectItem[];
  /** All projects, with recentProjects already excluded. */
  allProjects: ProjectItem[];
  isLoading: boolean;
};

export function useProjectPickerData(): ProjectPickerData {
  // Incrementing this triggers a refresh of usePromise calls
  const [refreshCounter, setRefreshCounter] = useState(0);
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
  ).RecentProjects(undefined, []);

  const safeRecentIds = useMemo(
    () => (isPlatformError(rawRecentIds) ? [] : (rawRecentIds ?? [])),
    [rawRecentIds],
  );

  const [currentProject, isCurrentProjectLoading] = usePromise<ProjectItem | undefined>(
    useCallback(async () => {
      const allDefs = await webViews.getAllOpenWebViewDefinitions();
      const editorDef = allDefs.find(
        (def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && def.projectId,
      );
      if (!editorDef?.projectId) return undefined;
      try {
        const { fullName, shortName, language, languageDisplayName } = await fetchProjectDetails(
          editorDef.projectId,
        );
        return { id: editorDef.projectId, fullName, shortName, language, languageDisplayName };
      } catch (e) {
        logger.warn(
          `ProjectPicker: could not fetch name for project ${editorDef.projectId}: ${getErrorMessage(e)}`,
        );
        return {
          id: editorDef.projectId,
          fullName: editorDef.projectId,
          shortName: editorDef.projectId,
        };
      }
      // Module-level imports are stable references; only refreshCounter needs to trigger a re-fetch
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshCounter]),
    undefined,
  );

  const [recentProjects, isRecentProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(
      async () => {
        const results = await Promise.all(
          safeRecentIds.map(async (id: string): Promise<ProjectItem | undefined> => {
            try {
              const { isEditable, ...details } = await fetchProjectDetails(id);
              if (!isEditable) return undefined;
              return { id, ...details };
            } catch (e) {
              logger.warn(
                `ProjectPicker: could not fetch name for project ${id}: ${getErrorMessage(e)}`,
              );
              return undefined;
            }
          }),
        );
        return results.filter((p: ProjectItem | undefined): p is ProjectItem => p !== undefined);
      },
      // Module-level imports are stable references; safeRecentIds and refreshCounter trigger re-fetches
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [safeRecentIds, refreshCounter],
    ),
    [],
  );

  const [allProjectsWithRecent, isAllProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      const metadata = await projectLookupService.getMetadataForAllProjects();
      const settled = await Promise.all(
        metadata.map(async (m) => {
          try {
            const pdp = await papiFrontendProjectDataProviderService.get(
              PROJECT_INTERFACE_PLATFORM_BASE,
              m.id,
            );
            const [fullName, shortName, language, languageTag, isEditable] = await Promise.all([
              pdp.getSetting('platform.fullName'),
              pdp.getSetting('platform.name'),
              pdp.getSetting('platform.language'),
              pdp.getSetting('platform.languageTag'),
              pdp.getSetting('platform.isEditable'),
            ]);
            if (!isEditable) return undefined;
            const resolved = resolveLanguage(language, languageTag);
            return {
              id: m.id,
              fullName,
              shortName,
              language: resolved?.tag,
              languageDisplayName: resolved?.displayName,
            };
          } catch (e) {
            logger.warn(
              `ProjectPicker: could not fetch details for project ${m.id}: ${getErrorMessage(e)}`,
            );
            return undefined;
          }
        }),
      );
      return settled.flatMap((p) => (p !== undefined ? [p] : []));
      // Module-level imports are stable references; only refreshCounter needs to trigger a re-fetch
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
    isLoading:
      isCurrentProjectLoading ||
      isRecentIdsLoading ||
      isRecentProjectsLoading ||
      isAllProjectsLoading,
  };
}

export default useProjectPickerData;
