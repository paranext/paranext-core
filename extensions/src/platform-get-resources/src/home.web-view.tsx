import papi, { logger } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';

import {
  getErrorMessage,
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutRegistryAuthFailure,
  isPlatformError,
  newGuid,
} from 'platform-bible-utils';
import { SharedProjectsInfo } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Home, HOME_STRING_KEYS, LocalProjectInfo } from './home.component';

const defaultExcludePdpFactoryIds: string[] = [];
const defaultInterfaceLanguages: string[] = ['en'];

globalThis.webViewComponent = function HomeWebview() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(HOME_STRING_KEYS);
    }, []),
  );

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

  const [showGetResourcesButton, setShowGetResourcesButton] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchAvailability = async () => {
      if (dblResourcesProvider) {
        const isGetDblResourcesAvailable = await dblResourcesProvider.isGetDblResourcesAvailable();
        if (isMounted.current) {
          setShowGetResourcesButton(isGetDblResourcesAvailable);
        }
      } else {
        setShowGetResourcesButton(undefined);
      }
    };

    fetchAvailability();
  }, [dblResourcesProvider]);

  const [resourcesList] = useData('platformGetResources.dblResourcesProvider').DblResources(
    undefined,
    [],
  );

  const openGetResources = useCallback(() => {
    papi.commands.sendCommand('platformGetResources.openGetResources');
  }, []);

  const openProject = (projectId: string, isEditable: boolean) =>
    papi.commands.sendCommand(
      isEditable
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
    );

  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState<boolean | undefined>(
    undefined,
  );

  const getStarted = useCallback(() => {
    papi.commands.sendCommand(
      'platform.openWindow',
      'https://github.com/paranext/paranext/wiki/Getting-Started-with-Platform.Bible-and-Paratext-10-Studio',
    );
  }, []);

  const checkIfSendReceiveAvailable = useCallback(async () => {
    const isAvailable = await papi.commands.sendCommand(
      'platformGetResources.isSendReceiveAvailable',
    );
    if (isMounted.current) {
      setIsSendReceiveAvailable(isAvailable);
    }
  }, []);

  useEffect(() => {
    checkIfSendReceiveAvailable();
  }, [checkIfSendReceiveAvailable]);

  useEvent(
    papi.network.getNetworkEvent('platform.onDidReloadExtensions'),
    checkIfSendReceiveAvailable,
  );

  const [isSendReceiveInProgress, setIsSendReceiveInProgress] = useState<boolean>(false);
  const [activeSendReceiveProjects, setActiveSendReceiveProjects] = useState<string[]>([]);

  const sendReceiveProject = async (projectId: string) => {
    if (!isSendReceiveAvailable) return;

    try {
      setIsSendReceiveInProgress(true);
      setActiveSendReceiveProjects((prev) => [...prev, projectId]);

      await papi.commands.sendCommand('paratextBibleSendReceive.sendReceiveProjects', [projectId]);

      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setIsSendReceiveInProgress(false);
      }
    } catch (e) {
      logger.warn(
        `Home web view failed to reload after running S/R for project ${projectId}: ${e}`,
      );
      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setIsSendReceiveInProgress(false);
      }
    }
  };

  const [sharedProjectsInfo, setSharedProjectsInfo] = useState<SharedProjectsInfo>();
  const [isLoadingRemoteProjects, setIsLoadingRemoteProjects] = useState<boolean>(true);

  const sharedProjectErrorNotificationId = useMemo(() => newGuid(), []);

  useEffect(() => {
    if (!isSendReceiveAvailable) {
      setIsLoadingRemoteProjects(false);
      return;
    }

    let promiseIsCurrent = true;
    const getSharedProjects = async () => {
      try {
        const projectsInfo = await papi.commands.sendCommand(
          'paratextBibleSendReceive.getSharedProjects',
        );

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingRemoteProjects(false);
          setSharedProjectsInfo(projectsInfo);
        }
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        if (isErrorMessageAboutParatextBlockingInternetAccess(errorMessage)) {
          papi.notifications.send({
            severity: 'error',
            message: '%data_loading_error_paratextData_internet_disabled%',
            clickCommandLabel: '%general_open%',
            clickCommand: 'paratextRegistration.showParatextRegistration',
            notificationId: sharedProjectErrorNotificationId,
          });
        } else if (isErrorMessageAboutRegistryAuthFailure(errorMessage)) {
          papi.notifications.send({
            severity: 'error',
            message: '%data_loading_error_paratextData_auth_failure%',
            clickCommandLabel: '%general_open%',
            clickCommand: 'paratextRegistration.showParatextRegistration',
            notificationId: sharedProjectErrorNotificationId,
          });
        } else {
          logger.warn(`Home web view failed to get shared projects: ${errorMessage}`);
        }

        if (promiseIsCurrent && isMounted.current) {
          setIsLoadingRemoteProjects(false);
        }
      }
    };

    if (isSendReceiveInProgress) {
      return;
    }
    if (!isSendReceiveAvailable) {
      setIsLoadingRemoteProjects(false);
      return;
    }
    getSharedProjects();

    return () => {
      // Mark this promise as old and not to be used
      promiseIsCurrent = false;
    };
  }, [isSendReceiveAvailable, isSendReceiveInProgress, sharedProjectErrorNotificationId]);

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

    if (isSendReceiveInProgress) {
      return;
    }
    getLocalProjects();

    return () => {
      // Mark this promise as old and not to be used
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

  return (
    <Home
      localizedStrings={localizedStrings}
      uiLocales={uiLocales}
      onOpenGetResources={openGetResources}
      onOpenProject={openProject}
      onSendReceiveProject={sendReceiveProject}
      onGetStarted={getStarted}
      showGetResourcesButton={showGetResourcesButton}
      isSendReceiveInProgress={isSendReceiveInProgress}
      isLoadingLocalProjects={isLoadingLocalProjects}
      isLoadingRemoteProjects={isLoadingRemoteProjects}
      localProjectsInfo={localProjectsInfo}
      sharedProjectsInfo={sharedProjectsInfo}
      activeSendReceiveProjects={activeSendReceiveProjects}
    />
  );
};
