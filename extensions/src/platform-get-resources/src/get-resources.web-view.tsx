import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { useRetryablePromise } from 'platform-bible-react';
import type { DblResourceData } from 'platform-bible-utils';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { shouldReportCatalogFailure } from './dbl-catalog.utils';
import {
  GetResources,
  GET_RESOURCES_STRING_KEYS,
  newResourceActionDidNotTakeEffectError,
  newResourceActionProviderNotReadyError,
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

  // Mirrors the list for the async action handlers, which cannot read a value captured at render.
  const resolvedResourcesRef = useRef(resolvedResources);
  useEffect(() => {
    resolvedResourcesRef.current = resolvedResources;
  }, [resolvedResources]);

  // The two unavailable reasons need opposite treatments. `notReady` means the provider has not
  // registered yet — transient, so a retry genuinely can work and it earns the error state (see
  // `shouldReportCatalogFailure`). `notConfigured` means this installation has no DBL credentials,
  // which no retry can change; it gets its own message rather than an unexplained empty list.
  const areDownloadsUnavailable =
    catalog?.status === 'unavailable' && catalog.reason === 'notConfigured';

  const isResourcesUnavailable = shouldReportCatalogFailure(
    catalog,
    isResourcesError,
    resolvedResources.length > 0,
  );

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

  // Actions waiting to see themselves in the list, by uid. An action is not finished when the data
  // provider returns: installing a resource already on disk succeeds as a no-op, and a removal can
  // fail to register, so the row's spinner — which stops only once the list agrees — would run for
  // the life of the dialog. Holding the action's promise until a newer list settles the question is
  // what turns that into an error the user can see and retry.
  const pendingActionsRef = useRef(
    new Map<
      string,
      {
        action: InstallInfo['action'];
        /** The list in hand when this action started waiting; only a later one can judge it. */
        listWhenRegistered: DblResourceData[];
        settle: (didTakeEffect: boolean) => void;
      }
    >(),
  );

  const installOrRemoveResource = useCallback(
    (dblEntryUid: string, action: ResourceAction): Promise<void> | void => {
      // Reject rather than returning a bare `undefined`. The component awaits this inside a
      // try/catch and surfaces a rejection in its error alert; awaiting `undefined` resolves, so a
      // click landing before the data provider resolves would produce no spinner, no error and no
      // log — the user cannot tell it from a click that did nothing at all. The rejection carries no
      // prose: the component holds the localized strings and maps it onto one of its own.
      if (!installResource || !uninstallResource)
        return Promise.reject(newResourceActionProviderNotReadyError());
      const newInstallInfo: InstallInfo = {
        dblEntryUid,
        action: action === 'install' ? 'installing' : 'removing',
      };

      setInstallInfo((prevInfo) => [...prevInfo, newInstallInfo]);

      const actionFunction = action === 'install' ? installResource : uninstallResource;

      return actionFunction(dblEntryUid)
        .then(async () => {
          // Let the derived flags catch up before refetching, or the refetch returns the pre-action
          // flags: an install that succeeded as a no-op leaves the row spinning, and an update keeps
          // offering "Update". A failure here is logged, not rethrown — the action itself succeeded,
          // and reaching the `.catch` below would report it to the user as failed.
          try {
            await papi.commands.sendCommand('platformGetResources.refreshResourceFlags');
          } catch (error) {
            logger.warn(
              `Could not refresh resource flags after ${action}: ${getErrorMessage(error)}`,
            );
          }
          // Registered before the refetch so the list it brings back cannot arrive unwatched.
          const listAgreed = new Promise<void>((resolve, reject) => {
            // Nothing should be able to act on a row while its action is in flight — the table
            // renders progress there instead of a button — but if one ever did, dropping the
            // displaced entry would leave its promise pending forever, and its row spinning.
            pendingActionsRef.current.get(dblEntryUid)?.settle(false);
            pendingActionsRef.current.set(dblEntryUid, {
              action: newInstallInfo.action,
              listWhenRegistered: resolvedResourcesRef.current,
              settle: (didTakeEffect) =>
                didTakeEffect ? resolve() : reject(newResourceActionDidNotTakeEffectError()),
            });
          });
          refetchResources();
          return listAgreed;
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

  // Correct the update badges once the list is up. `getCachedResources` answers one refresh behind,
  // and the background sync deliberately skips the backend round trip that `updateAvailable` needs
  // — every other consumer of the catalog discards that flag. So a resource updated outside this
  // dialog arrives here still offering "Update". This view is the only one that renders the flag,
  // which makes it the one that pays for refreshing it. Once per mount: the post-action refresh
  // covers anything the user does from here.
  const hasRefreshedUpdateFlags = useRef(false);
  useEffect(() => {
    if (!hasSettled || hasRefreshedUpdateFlags.current) return;
    hasRefreshedUpdateFlags.current = true;
    papi.commands
      .sendCommand('platformGetResources.refreshResourceFlags')
      .then(() => {
        refetchResources();
        return undefined;
      })
      // The list is already rendered; a failed refresh leaves the cached flags in place rather
      // than costing the user the dialog.
      .catch((e) =>
        logger.warn(`Could not refresh DBL resource update flags: ${getErrorMessage(e)}`),
      );
  }, [hasSettled, refetchResources]);

  /**
   * Settles each action waiting to see itself in the list.
   *
   * Two things can end the wait, and the failure one cannot be expressed as a change to the list.
   * `usePromise` keeps the previous value through a rejection, so a failed refetch leaves the list
   * at the same identity and the same contents — it will never agree with the action, and never
   * visibly disagree either. `isResourcesUnavailable` does not fill the gap: it is `false` whenever
   * there are rows to show, which there always are once a user has clicked one. So a failed fetch
   * is read from the fetch's own outcome instead, and an action that cannot be confirmed is
   * reported as one rather than left spinning for the life of the dialog.
   */
  useEffect(() => {
    if (pendingActionsRef.current.size === 0) return;

    // `hasSettled` is what distinguishes a fetch that failed from one still in flight: `refetch`
    // clears it, and the fetch sets it on both of its paths.
    const hasFetchFailed = hasSettled && isResourcesError;

    pendingActionsRef.current.forEach((pending, dblEntryUid) => {
      const hasLaterList = resolvedResources !== pending.listWhenRegistered;
      // Still waiting: no newer list yet, and no failure to report.
      if (!hasLaterList && !hasFetchFailed) return;

      const resource = resolvedResources.find((res) => res.dblEntryUid === dblEntryUid);
      // A fetch that failed cannot confirm anything, and a row that has dropped out of the catalog
      // cannot answer for its own resource either way.
      const didTakeEffect =
        !hasFetchFailed &&
        resource !== undefined &&
        (pending.action === 'installing' ? resource.installed : !resource.installed);

      pendingActionsRef.current.delete(dblEntryUid);
      pending.settle(didTakeEffect);
    });
  }, [resolvedResources, hasSettled, isResourcesError]);

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
      isResourcesError={isResourcesUnavailable}
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
