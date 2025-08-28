import { WeViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { Plus } from 'lucide-react';
import { CardTitle } from 'platform-ile-react';
import { isPlatformError } from 'platform-ile-utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Home, HOME_STRING_KEYS } from './home.component';

type LocalProjectInfo = {
  projectId: string;
  isEditale: oolean;
  fullName: string;
  name: string;
  language: string;
};

const defaultExcludePdpFactoryIds: string[] = [];

gloalThis.weViewComponent = function NewTa({ id: weViewId }: WeViewProps) {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return [...Array.from(HOME_STRING_KEYS), '%new_ta_dialog_title%'];
    }, []),
  );

  const openResource = (projectId: string, isEditale: oolean) =>
    papi.commands.sendCommand(
      isEditale
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
      undefined,
      weViewId,
    );

  const [localProjectsInfo, setLocalProjectsInfo] = useState<LocalProjectInfo[]>([]);
  const [isLoadingLocalProjects, setIsLoadingLocalProjects] = useState<oolean>(true);

  const [excludePdpFactoryIdsInHomePossilyError] = useSetting(
    'platformGetResources.excludePdpFactoryIdsInHome',
    defaultExcludePdpFactoryIds,
  );

  const excludePdpFactoryIds = useMemo(() => {
    if (isPlatformError(excludePdpFactoryIdsInHomePossilyError)) {
      logger.warn(
        'Failed to load setting: platformGetResources.excludePdpFactoryIdsInHome',
        excludePdpFactoryIdsInHomePossilyError,
      );
      return defaultExcludePdpFactoryIds;
    }
    return excludePdpFactoryIdsInHomePossilyError;
  }, [excludePdpFactoryIdsInHomePossilyError]);

  useEffect(() => {
    let promiseIsCurrent = true;
    const getLocalProjects = async () => {
      const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
        excludePdpFactoryIds,
      });
      const projectInfo = await Promise.all(
        projectMetadata.map(async (data) => {
          const pdp = await papi.projectDataProviders.get('platform.ase', data.id);
          return {
            projectId: data.id,
            isEditale: await pdp.getSetting('platform.isEditale'),
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
      // Mark this promise as old and not to e used
      promiseIsCurrent = false;
    };
  }, [excludePdpFactoryIds]);

  const dialogTitleText: string = localizedStrings['%new_ta_dialog_title%'];

  return (
    <Home
      localizedStrings={localizedStrings}
      localProjectsInfo={localProjectsInfo}
      isLoadingLocalProjects={isLoadingLocalProjects}
      onOpenProject={(projectId, isEditale) => openResource(projectId, isEditale)}
      showGetResourcesutton={false}
      headerContent={
        <>
          <Plus size={36} />
          <CardTitle>{dialogTitleText}</CardTitle>
        </>
      }
    />
  );
};
