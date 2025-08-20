import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { Plus } from 'lucide-react';
import { CardTitle } from 'platform-bible-react';
import { isPlatformError } from 'platform-bible-utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Home, HOME_STRING_KEYS } from './home.component';

type LocalProjectInfo = {
  projectId: string;
  isEditable: boolean;
  fullName: string;
  name: string;
  language: string;
};

const defaultExcludePdpFactoryIds: string[] = [];

globalThis.webViewComponent = function NewTab({ id: webViewId }: WebViewProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return [...Array.from(HOME_STRING_KEYS), '%new_tab_dialog_title%'];
    }, []),
  );

  const openResource = (projectId: string, isEditable: boolean) =>
    papi.commands.sendCommand(
      isEditable
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
      undefined,
      webViewId,
    );

  const [localProjectsInfo, setLocalProjectsInfo] = useState<LocalProjectInfo[]>([]);
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<boolean>(true);

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

  useEffect(() => {
    let promiseIsCurrent = true;
    const getLocalProjects = async () => {
      const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
        excludePdpFactoryIds,
      });
      const projectInfo = await Promise.all(
        projectMetadata.map(async (data) => {
          const pdp = await papi.projectDataProviders.get('platform.base', data.id);
          return {
            projectId: data.id,
            isEditable: await pdp.getSetting('platform.isEditable'),
            fullName: await pdp.getSetting('platform.fullName'),
            name: await pdp.getSetting('platform.name'),
            language: await pdp.getSetting('platform.language'),
          };
        }),
      );

      if (promiseIsCurrent && isMounted.current) {
        setIsLoadingLocalProjects(false);
        setLocalProjectsInfo(projectInfo);
      }
    };

    getLocalProjects();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
    };
  }, [excludePdpFactoryIds]);

  const dialogTitleText: string = localizedStrings['%new_tab_dialog_title%'];

  return (
    <Home
      localizedStrings={localizedStrings}
      localProjectsInfo={localProjectsInfo}
      isLoadingLocalProjects={isLoadingLocalProjects}
      onOpenProject={(projectId, isEditable) => openResource(projectId, isEditable)}
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
