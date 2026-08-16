import papi, { logger } from '@papi/frontend';
import { useDataProvider, useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { CardTitle, useEvent, usePromise } from 'platform-bible-react';
import { Home as HomeIcon } from 'lucide-react';

import {
  getErrorMessage,
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutRegistryAuthFailure,
  isPlatformError,
  newGuid,
} from 'platform-bible-utils';
import type { SharedProjectsInfo } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Home, HOME_STRING_KEYS } from './home.component';
import { useLocalProjects } from './use-local-projects.hook';

const defaultInterfaceLanguages: string[] = ['en'];

// Bounded retries for the two send/receive-dependent calls below, sized to outlast the remaining
// extension activations (~1.5s in a Paratext 10 Studio build).
const SEND_RECEIVE_RETRY_COUNT = 3;
const SEND_RECEIVE_RETRY_MS = 2000;

globalThis.webViewComponent = function HomeWebView() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const localizedStringsWithLoadingState = useLocalizedStrings(
    useMemo(() => {
      return [...Array.from(HOME_STRING_KEYS), '%home_dialog_title%'];
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

  const [resourcesList] = usePromise(
    useCallback(
      async () => papi.commands.sendCommand('platformGetResources.getCachedResources'),
      [],
    ),
    undefined,
  );

  const openGetResources = useCallback(() => {
    papi.commands.sendCommand('platformGetResources.openGetResources');
  }, []);

  const openProject = (projectId: string, isPublished: boolean) =>
    papi.commands.sendCommand(
      isPublished
        ? 'platformScriptureEditor.openResourceViewer'
        : 'platformScriptureEditor.openScriptureEditor',
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

  const checkIfSendReceiveAvailable = useCallback(async (remainingRetries: number) => {
    try {
      const isAvailable = await papi.commands.sendCommand(
        'platformGetResources.isSendReceiveAvailable',
      );
      if (isMounted.current) {
        setIsSendReceiveAvailable(isAvailable);
      }
    } catch (e) {
      // A throw means the extension host couldn't answer yet, not that send/receive is missing.
      // Without a retry the answer stays unknown for the session — `platform.onDidReloadExtensions`,
      // the only other thing that re-checks, does not fire on a cold start.
      logger.warn(`Home web view could not determine send/receive availability: ${e}`);
      if (remainingRetries > 0 && isMounted.current)
        setTimeout(() => checkIfSendReceiveAvailable(remainingRetries - 1), SEND_RECEIVE_RETRY_MS);
    }
  }, []);

  useEffect(() => {
    checkIfSendReceiveAvailable(SEND_RECEIVE_RETRY_COUNT);
  }, [checkIfSendReceiveAvailable]);

  useEvent(
    papi.network.getNetworkEvent('platform.onDidReloadExtensions'),
    useCallback(
      () => checkIfSendReceiveAvailable(SEND_RECEIVE_RETRY_COUNT),
      [checkIfSendReceiveAvailable],
    ),
  );

  const [isSendReceiveInProgress, setIsSendReceiveInProgress] = useState<boolean>(false);
  const [activeSendReceiveProjects, setActiveSendReceiveProjects] = useState<string[]>([]);
  const [syncsCompletedCount, setSyncsCompletedCount] = useState<number>(0);

  useEvent(
    papi.network.getNetworkEvent('paratextBibleSendReceive.onSyncStateChanged'),
    useCallback(({ isSyncing }: { isSyncing: boolean }) => {
      if (!isSyncing) setSyncsCompletedCount((k) => k + 1);
    }, []),
  );

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
      logger.warn(`Home web view failed to send/receive project ${projectId}: ${e}`);
      if (isMounted.current) {
        setActiveSendReceiveProjects((prev) => prev.filter((id) => id !== projectId));
        setIsSendReceiveInProgress(false);
      }
      // Re-throw so Home's own "Sync failed" alert reports it. Swallowing here is what made a failed
      // send/receive look like nothing happened: Home already catches this callback's rejection and
      // renders the message, but only ever saw a resolved promise.
      throw e;
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
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;
    let remainingRetries = SEND_RECEIVE_RETRY_COUNT;
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
            message: '%data_loading_error_internetAccess_disabled_2%',
            clickCommandLabel: '%general_open%',
            clickCommand: 'paratextRegistration.showInternetSettings',
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
        } else if (remainingRetries > 0 && promiseIsCurrent && isMounted.current) {
          // Availability reports what shipped in this build, not what has finished activating
          // so an unclassified failure this early usually means send/receive hasn't
          // registered its commands yet. Without a retry the list stays empty until a sync completes
          // or extensions reload.
          remainingRetries -= 1;
          logger.warn(`Home web view failed to get shared projects; retrying: ${errorMessage}`);
          retryTimeout = setTimeout(getSharedProjects, SEND_RECEIVE_RETRY_MS);
          return;
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
      clearTimeout(retryTimeout);
    };
  }, [
    isSendReceiveAvailable,
    isSendReceiveInProgress,
    sharedProjectErrorNotificationId,
    syncsCompletedCount, // triggers a re-fetch each time a sync completes
  ]);

  const { localProjectsInfo, isLoadingLocalProjects } = useLocalProjects({
    logLabel: 'Home',
    // Pause fetching while a Send/Receive runs and resume when it finishes.
    enabled: !isSendReceiveInProgress,
    // Re-fetch when the cached resource list changes or a sync completes.
    refetchTriggers: [resourcesList, syncsCompletedCount],
  });

  const [interfaceLanguages] = useSetting('platform.interfaceLanguage', defaultInterfaceLanguages);

  const uiLocales = useMemo(() => {
    if (isPlatformError(interfaceLanguages)) {
      logger.warn('Failed to load setting: platform.interfaceLanguage', interfaceLanguages);
      return defaultInterfaceLanguages;
    }

    return interfaceLanguages;
  }, [interfaceLanguages]);

  const dialogTitleText: string = localizedStringsWithLoadingState[0]['%home_dialog_title%'];

  return (
    <Home
      localizedStringsWithLoadingState={localizedStringsWithLoadingState}
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
      headerContent={
        <>
          <HomeIcon size={36} />
          <CardTitle>{dialogTitleText}</CardTitle>
        </>
      }
    />
  );
};
