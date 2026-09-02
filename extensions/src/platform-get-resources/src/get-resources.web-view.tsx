import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { useRetryablePromise } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  GetResources,
  GET_RESOURCES_STRING_KEYS,
  RESOURCE_ACTION_PROVIDER_NOT_READY,
  ResourceAction,
} from './get-resources.component';

type InstallInfo = {
  dblEntryUid: string;
  action: 'installing' | 'removing';
};

globalThis.webViewComponent = function GetResourcesDialog({ useWebViewState }: WebViewProps) {
  const localizedStringsWithLoadingState = useLocalizedStrings(
    useMemo(() => [...GET_RESOURCES_STRING_KEYS], []),
  );

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');
  const installResource = dblResourcesProvider?.installDblResource;
  const uninstallResource = dblResourcesProvider?.uninstallDblResource;

  const {
    data: catalog,
    isLoading,
    hasError: isResourcesError,
    hasSettled,
    refetch: refetchResources,
  } = useRetryablePromise(
    useCallback(
      async () => papi.commands.sendCommand('platformGetResources.getCachedResources'),
      [],
    ),
  );

  // `!hasSettled` counts as loading, not just `isLoading`. A retry clears the error synchronously
  // while `usePromise` only raises its loading flag in an effect, so the render in between would
  // otherwise report "no resources found" on the very click meant to disprove it.
  const isLoadingResources = isLoading || !hasSettled;

  const resolvedResources = useMemo(
    () => (catalog?.status === 'available' ? catalog.resources : []),
    [catalog],
  );

  // The two unavailable reasons need opposite treatments. `notReady` means the provider has not
  // registered yet — transient, so a retry genuinely can work and it earns the error state.
  // `notConfigured` means this installation has no DBL credentials, which no retry can change; it
  // gets its own message rather than an unexplained empty list.
  const isCatalogNotReady = catalog?.status === 'unavailable' && catalog.reason === 'notReady';
  const areDownloadsUnavailable =
    catalog?.status === 'unavailable' && catalog.reason === 'notConfigured';

  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [selectedTypes, setSelectedTypes] = useWebViewState<string[]>('typeFilter', [
    'ScriptureResource',
  ]);

  const [selectedLanguages, setSelectedLanguages] = useWebViewState<string[]>('languageFilter', []);

  const openResource = useCallback(
    (projectId: string) =>
      papi.commands.sendCommand('platformScriptureEditor.openResourceViewer', projectId),
    [],
  );

  // When no languages are selected on the first render of this component, set default selection to
  // languages that have resources installed
  useEffect(() => {
    if (isInitialized) return;
    if (selectedLanguages.length > 0) {
      setIsInitialized(true);
      return;
    }
    if (resolvedResources.length > 0 && selectedLanguages.length === 0) {
      setSelectedLanguages(
        Array.from(
          new Set(
            resolvedResources
              .filter((resource) => resource.installed === true)
              .map((resource) => resource.bestLanguageName),
          ),
        ),
      );
      setIsInitialized(true);
    }
  }, [
    selectedLanguages.length,
    setSelectedLanguages,
    isInitialized,
    setIsInitialized,
    resolvedResources,
  ]);

  const [installInfo, setInstallInfo] = useState<InstallInfo[]>([]);

  const installOrRemoveResource = useCallback(
    (dblEntryUid: string, action: ResourceAction): Promise<void> | void => {
      // Reject rather than returning a bare `undefined`. The component awaits this inside a
      // try/catch and surfaces a rejection in its error alert; awaiting `undefined` resolves, so a
      // click landing before the data provider resolves would produce no spinner, no error and no
      // log — the user cannot tell it from a click that did nothing at all. The sentinel carries no
      // prose: the component holds the localized strings and maps this onto one of its own.
      if (!installResource || !uninstallResource)
        return Promise.reject(new Error(RESOURCE_ACTION_PROVIDER_NOT_READY));
      const newInstallInfo: InstallInfo = {
        dblEntryUid,
        action: action === 'install' ? 'installing' : 'removing',
      };

      setInstallInfo((prevInfo) => [...prevInfo, newInstallInfo]);

      const actionFunction = action === 'install' ? installResource : uninstallResource;

      return actionFunction(dblEntryUid)
        .then(() => {
          // Trigger a refetch so the resource list reflects the new installed state.
          refetchResources();
          return undefined;
        })
        .catch((error) => {
          logger.debug(getErrorMessage(error));
          // The action failed, so clear its optimistic in-progress entry and re-throw so the
          // component can surface the error to the user.
          setInstallInfo((prevInfo) => prevInfo.filter((info) => info.dblEntryUid !== dblEntryUid));
          throw error;
        });
    },
    [installResource, uninstallResource, refetchResources],
  );

  /** Removes resources from array of resources that are currently being handled */
  useEffect(() => {
    setInstallInfo((currentInstallInfo) =>
      currentInstallInfo.filter((info) => {
        const resource = resolvedResources.find((res) => res.dblEntryUid === info.dblEntryUid);
        if (!resource) return true;

        if (info.action === 'installing' && resource.installed) return false;
        if (info.action === 'removing' && !resource.installed) return false;

        return true;
      }),
    );
  }, [resolvedResources]);

  const idsBeingHandled = useMemo(() => installInfo.map((info) => info.dblEntryUid), [installInfo]);

  return (
    <GetResources
      localizedStringsWithLoadingState={localizedStringsWithLoadingState}
      resources={resolvedResources}
      isLoadingResources={isLoadingResources}
      isResourcesError={isResourcesError || isCatalogNotReady}
      onRetryResources={refetchResources}
      areDownloadsUnavailable={areDownloadsUnavailable}
      idsBeingHandled={idsBeingHandled}
      selectedTypes={selectedTypes}
      selectedLanguages={selectedLanguages}
      onSelectedTypesChange={setSelectedTypes}
      onSelectedLanguagesChange={setSelectedLanguages}
      onInstallOrRemoveResource={installOrRemoveResource}
      onOpenResource={openResource}
    />
  );
};
