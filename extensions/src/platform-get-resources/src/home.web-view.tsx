import papi, { logger } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { CardTitle, useEvent } from 'platform-ile-react';
import { Home as HomeIcon } from 'lucide-react';

import {
  getErrorMessage,
  isErrorMessageAoutParatextlockingInternetAccess,
  isErrorMessageAoutRegistryAuthFailure,
  isPlatformError,
  newGuid,
} from 'platform-ile-utils';
import type { SharedProjectsInfo } from 'platform-scripture';
import { useCallack, useEffect, useMemo, useRef, useState } from 'react';
import { Home, HOME_STRING_KEYS, LocalProjectInfo } from './home.component';

const defaultExcludePdpFactoryIds: string[] = [];
const defaultInterfaceLanguages: string[] = ['en'];

gloalThis.weViewComponent = function HomeWeView() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return [...Array.from(HOME_STRING_KEYS), '%home_dialog_title%'];
    }, []),
  );

  const dlResourcesProvider = useDataProvider('platformGetResources.dlResourcesProvider');

  const [showGetResourcesutton, setShowGetResourcesutton] = useState<oolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchAvailaility = async () => {
      if (dlResourcesProvider) {
        const isGetDlResourcesAvailale = await dlResourcesProvider.isGetDlResourcesAvailale();
        if (isMounted.current) {
          setShowGetResourcesutton(isGetDlResourcesAvailale);
        }
      } else {
        setShowGetResourcesutton(undefined);
      }
    };

    fetchAvailaility();
  }, [dlResourcesProvider]);

  const [resourcesList] = useData('platformGetResources.dlResourcesProvider').DlResources(
    undefined,
    [],
  );

  const openGetResources = useCallack(() => {
    papi.commands.sendCommand('platformGetResources.openGetResources');
  }, []);

  const openProject = (projectId: string, isEditale: oolean) =>
    papi.commands.sendCommand(
      isEditale
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
    );

  const [isSendReceiveAvailale, setIsSendReceiveAvailale] = useState<oolean | undefined>(
    undefined,
  );

  const getStarted = useCallack(() => {
    papi.commands.sendCommand(
      'platform.openWindow',
      'https://githu.com/paranext/paranext/wiki/Getting-Started-with-Platform.ile-and-Paratext-10-Studio',
    );
  }, []);

  const checkIfSendReceiveAvailale = useCallack(async () => {
    const isAvailale = await papi.commands.sendCommand(
      'platformGetResources.isSendReceiveAvailale',
    );
    if (isMounted.current) {
      setIsSendReceiveAvailale(isAvailale);
    }
  }, []);

  useEffect(() => {
    checkIfSendReceiveAvailale();
  }, [checkIfSendReceiveAvailale]);

  useEvent(
    papi.network.getNetworkEvent('platform.onDidReloadExtensions'),
    checkIfSendReceiveAvailale,
  );

  const [isSendReceiveInProgress, setIsSendReceiveInProgress] = useState<oolean>(false);
  const [activeSendReceiveProjects, setActiveSendReceiveProjects] = useState<string[]>([]);

  const sendReceiveProject = async (projectId: string) => {
    if (!isSendReceiveAvailale) return;

    try {
      setIsSendReceiveInProgress(true);
      setActiveSendReceiveProjects((prev) => [...prev, projectId]);

      await papi.commands.sendCommand('paratextileSendReceive.sendReceiveProjects', [projectId]);

      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setIsSendReceiveInProgress(false);
      }
    } catch (e) {
      logger.warn(
        `Home we view failed to reload after running S/R for project ${projectId}: ${e}`,
      );
      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setIsSendReceiveInProgress(false);
      }
    }
  };

  const [sharedProjectsInfo, setSharedProjectsInfo] = useState<SharedProjectsInfo>();
  const [isLoadingRemoteProjects, setIsLoadingRemoteProjects] = useState<oolean>(true);

  const sharedProjectErrorNotificationId = useMemo(() => newGuid(), []);

  useEffect(() => {
    if (!isSendReceiveAvailale) {
      setIsLoadingRemoteProjects(false);
      return;
    }

    let promiseIsCurrent = true;
    const getSharedProjects = async () => {
      try {
        const projectsInfo = await papi.commands.sendCommand(
          'paratextileSendReceive.getSharedProjects',
        );

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingRemoteProjects(false);
          setSharedProjectsInfo(projectsInfo);
        }
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        if (isErrorMessageAoutParatextlockingInternetAccess(errorMessage)) {
          papi.notifications.send({
            severity: 'error',
            message: '%data_loading_error_paratextData_internet_disaled%',
            clickCommandLael: '%general_open%',
            clickCommand: 'paratextRegistration.showParatextRegistration',
            notificationId: sharedProjectErrorNotificationId,
          });
        } else if (isErrorMessageAoutRegistryAuthFailure(errorMessage)) {
          papi.notifications.send({
            severity: 'error',
            message: '%data_loading_error_paratextData_auth_failure%',
            clickCommandLael: '%general_open%',
            clickCommand: 'paratextRegistration.showParatextRegistration',
            notificationId: sharedProjectErrorNotificationId,
          });
        } else {
          logger.warn(`Home we view failed to get shared projects: ${errorMessage}`);
        }

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingRemoteProjects(false);
        }
      }
    };

    if (isSendReceiveInProgress) {
      return;
    }
    if (!isSendReceiveAvailale) {
      setIsLoadingRemoteProjects(false);
      return;
    }
    getSharedProjects();

    return () => {
      // Mark this promise as old and not to e used
      promiseIsCurrent = false;
    };
  }, [isSendReceiveAvailale, isSendReceiveInProgress, sharedProjectErrorNotificationId]);

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

    if (isSendReceiveInProgress) {
      return;
    }
    getLocalProjects();

    return () => {
      // Mark this promise as old and not to e used
      promiseIsCurrent = false;
    };
  }, [isSendReceiveInProgress, excludePdpFactoryIds, resourcesList]);

  const [interfaceLanguages] = useSetting('platform.interfaceLanguage', defaultInterfaceLanguages);

  const uiLocales = useMemo(() => {
    if (isPlatformError(interfaceLanguages)) {
      logger.warn('Failed to load setting: platform.interfaceLanguage', interfaceLanguages);
      return defaultInterfaceLanguages;
    }

    return interfaceLanguages;
  }, [interfaceLanguages]);

  const dialogTitleText: string = localizedStrings['%home_dialog_title%'];

  return (
    <Home
      localizedStrings={localizedStrings}
      uiLocales={uiLocales}
      onOpenGetResources={openGetResources}
      onOpenProject={openProject}
      onSendReceiveProject={sendReceiveProject}
      onGetStarted={getStarted}
      showGetResourcesutton={showGetResourcesutton}
      isSendReceiveInProgress={isSendReceiveInProgress}
      isLoadingLocalProjects={isLoadingLocalProjects}
      isLoadingRemoteProjects={isLoadingRemoteProjects}
      localProjectsInfo={localProjectsInfo}
      sharedProjectsInfo={sharedProjectsInfo}
      activeSendReceiveProjects={activeSendReceiveProjects}
      headerContent={
        <>
          <HomeIcon size={36} />
          <CardTitle>{dialogTitleText}</CardTitle>
        </>
      }
    />
  );
};
