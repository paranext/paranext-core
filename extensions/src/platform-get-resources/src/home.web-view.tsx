import papi, { logger } from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { HomeDialog, useEvent, LocalProjectInfo, SharedProjectsInfo } from 'platform-bible-react';
import {
  getErrorMessage,
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutRegistryAuthFailure,
  isPlatformError,
  LocalizeKey,
  newGuid,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const HOME_STRING_KEYS: LocalizeKey[] = [
  '%resources_action%',
  '%resources_activity%',
  '%resources_clearSearch%',
  '%home_dialog_title%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_getResources%',
  '%resources_items%',
  '%resources_language%',
  '%resources_loading%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noSearchResults%',
  '%resources_open%',
  '%resources_searchedFor%',
  '%resources_sync%',
];

const defaultExcludePdpFactoryIds: string[] = [];
const defaultInterfaceLanguages: string[] = ['en'];

globalThis.webViewComponent = function HomeDialogWebView() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [localizedStrings] = useLocalizedStrings(HOME_STRING_KEYS);

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

  const [showGetResourcesButton, setShowGetResourcesButton] = useState<boolean | undefined>(
    undefined,
  );

  const [resourcesList] = useData('platformGetResources.dblResourcesProvider').DblResources(
    undefined,
    [],
  );

  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState<boolean | undefined>(
    undefined,
  );

  const openResourceOrProject = (projectId: string, isEditable: boolean) =>
    papi.commands.sendCommand(
      isEditable
        ? 'platformScriptureEditor.openScriptureEditor'
        : 'platformScriptureEditor.openResourceViewer',
      projectId,
    );

  const openGetResources = () => papi.commands.sendCommand('platformGetResources.openGetResources');

  const checkIfSendReceiveAvailable = useCallback(async () => {
    const isAvailable = await papi.commands.sendCommand(
      'platformGetResources.isSendReceiveAvailable',
    );
    if (isMounted.current) {
      setIsSendReceiveAvailable(isAvailable);
    }
  }, []);

  const [isSendReceiveInProgress, setIsSendReceiveInProgress] = useState<boolean>(false);
  const [activeSendReceiveProjects, setActiveSendReceiveProjects] = useState<string[]>([]);

  const [sharedProjectsInfo, setSharedProjectsInfo] = useState<SharedProjectsInfo>();
  const [isLoadingRemoteProjects, setIsLoadingRemoteProjects] = useState<boolean>(true);

  const sharedProjectErrorNotificationId = useMemo(() => newGuid(), []);

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

  useEffect(() => {
    checkIfSendReceiveAvailable();
  }, [checkIfSendReceiveAvailable]);

  useEvent(
    papi.network.getNetworkEvent('platform.onDidReloadExtensions'),
    checkIfSendReceiveAvailable,
  );

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

  const [localProjectResourceInfo, setLocalProjectsInfo] = useState<LocalProjectInfo[]>([]);
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
      const projectInfo: LocalProjectInfo[] = await Promise.all(
        projectMetadata.map(async (data) => {
          const pdp = await papi.projectDataProviders.get('platform.base', data.id);
          const isEditable = await pdp.getSetting('platform.isEditable');
          return {
            id: data.id,
            isEditable,
            fullName: await pdp.getSetting('platform.fullName'),
            name: await pdp.getSetting('platform.name'),
            language: await pdp.getSetting('platform.language'),
            // TODO: fix when the papi offers a way to distinguish between types
            type: isEditable ? 'project' : 'resource',
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
    // resourcesList is only used to trigger a re-fetch of installed resources when the list of resources changes
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
    <HomeDialog
      localizedStrings={localizedStrings}
      uiLocales={uiLocales}
      onOpenGetResources={openGetResources}
      onOpenResourceOrProject={openResourceOrProject}
      onSendReceiveProject={sendReceiveProject}
      showGetResourcesButton={showGetResourcesButton}
      isSendReceiveInProgress={isSendReceiveInProgress}
      isLoadingLocalProjects={isLoadingLocalProjects}
      isLoadingRemoteProjects={isLoadingRemoteProjects}
      localProjectResourceInfo={localProjectResourceInfo}
      sharedProjectsInfo={sharedProjectsInfo}
      activeSendReceiveProjects={activeSendReceiveProjects}
    />
  );
};
