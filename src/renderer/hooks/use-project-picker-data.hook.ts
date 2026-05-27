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
import { type ProjectItem } from 'platform-bible-react';

const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

async function fetchProjectDetails(
  projectId: string,
): Promise<{ fullName: string; shortName: string; language?: string }> {
  const pdp = await papiFrontendProjectDataProviderService.get(
    PROJECT_INTERFACE_PLATFORM_BASE,
    projectId,
  );
  const [fullName, shortName, language] = await Promise.all([
    pdp.getSetting('platform.fullName'),
    pdp.getSetting('platform.name'),
    pdp.getSetting('platform.language'),
  ]);
  return { fullName, shortName, language };
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
        const details = await fetchProjectDetails(editorDef.projectId);
        return { id: editorDef.projectId, ...details };
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshCounter]),
    undefined,
  );

  const [recentProjects, isRecentProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(
      async () =>
        Promise.all(
          safeRecentIds.map(async (id) => {
            try {
              const details = await fetchProjectDetails(id);
              return { id, ...details };
            } catch (e) {
              logger.warn(
                `ProjectPicker: could not fetch name for project ${id}: ${getErrorMessage(e)}`,
              );
              return { id, fullName: id, shortName: id };
            }
          }),
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [safeRecentIds, refreshCounter],
    ),
    [],
  );

  const [allProjectsWithRecent, isAllProjectsLoading] = usePromise<ProjectItem[]>(
    useCallback(async () => {
      const metadata = await projectLookupService.getMetadataForAllProjects();
      return Promise.all(
        metadata.map(async (m) => {
          try {
            const details = await fetchProjectDetails(m.id);
            return { id: m.id, ...details };
          } catch (e) {
            logger.warn(
              `ProjectPicker: could not fetch name for project ${m.id}: ${getErrorMessage(e)}`,
            );
            return { id: m.id, fullName: m.id, shortName: m.id };
          }
        }),
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshCounter]),
    [],
  );

  const recentIdSet = useMemo(() => new Set(safeRecentIds), [safeRecentIds]);
  const allProjects = useMemo(
    () => allProjectsWithRecent.filter((p) => !recentIdSet.has(p.id)),
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
