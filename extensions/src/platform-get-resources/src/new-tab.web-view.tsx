import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { Plus } from 'lucide-react';
import { CardTitle, Label } from 'platform-bible-react';
import { isPlatformError } from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import { Home, HOME_STRING_KEYS } from './home.component';
import { useLocalProjects } from './use-local-projects.hook';

const defaultExcludePdpFactoryIds: string[] = [];

globalThis.webViewComponent = function NewTab({ id: webViewId }: WebViewProps) {
  const localizedStringsWithLoadingState = useLocalizedStrings(
    useMemo(() => {
      return [...Array.from(HOME_STRING_KEYS), '%new_tab_dialog_title%', '%resources_loading%'];
    }, []),
  );

  const [projectLoading, setProjectLoading] = useState<boolean>(false);

  const openResource = (projectId: string, isPublished: boolean) => {
    setProjectLoading(true);

    return papi.commands.sendCommand(
      isPublished
        ? 'platformScriptureEditor.openResourceViewer'
        : 'platformScriptureEditor.openScriptureEditor',
      projectId,
      undefined,
      webViewId,
    );
  };

  const [excludePdpFactoryIdsInHomePossiblyError] = useSetting(
    'platformGetResources.excludePdpFactoryIdsInHome',
    defaultExcludePdpFactoryIds,
  );

  const excludePdpFactoryIds = useMemo(() => {
    if (isPlatformError(excludePdpFactoryIdsInHomePossiblyError)) {
      logger.warn(
        'Failed to load setting: platformGetResources.excludePdpFactoryIdsInHome',
        excludePdpFactoryIdsInHomePossiblyError,
      );
      return defaultExcludePdpFactoryIds;
    }
    return excludePdpFactoryIdsInHomePossiblyError;
  }, [excludePdpFactoryIdsInHomePossiblyError]);

  const { localProjectsInfo, isLoadingLocalProjects } = useLocalProjects(excludePdpFactoryIds, {
    logLabel: 'New Tab',
  });

  const dialogTitleText: string = localizedStringsWithLoadingState[0]['%new_tab_dialog_title%'];
  const loadingText: string = localizedStringsWithLoadingState[0]['%resources_loading%'];

  return projectLoading ? (
    <div className="tw:p-8">
      <Label>{loadingText}</Label>
    </div>
  ) : (
    <Home
      localizedStringsWithLoadingState={localizedStringsWithLoadingState}
      localProjectsInfo={localProjectsInfo}
      isLoadingLocalProjects={isLoadingLocalProjects}
      onOpenProject={(projectId, isPublished) => openResource(projectId, isPublished)}
      showGetResourcesButton={false}
      headerContent={
        <>
          <Plus size={36} />
          <CardTitle>{dialogTitleText}</CardTitle>
        </>
      }
    />
  );
};
