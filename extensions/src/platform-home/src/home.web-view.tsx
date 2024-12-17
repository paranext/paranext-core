import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import type { ResourceType } from 'platform-bible-utils';
import {
  FilterableResourceList,
  FILTERABLE_RESOURCE_LIST_STRING_KEYS,
  usePromise,
} from 'platform-bible-react';
import { useCallback } from 'react';

globalThis.webViewComponent = function GetResourcesDialog({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(FILTERABLE_RESOURCE_LIST_STRING_KEYS);

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

  const [dblResources, , isLoadingDblResources] = useData(
    'platformGetResources.dblResourcesProvider',
  ).DblResources(undefined, []);

  const [typeFilter, setTypeFilter] = useWebViewState<ResourceType[]>('typeFilter', [
    'DBLResource',
  ]);

  const [languageFilter, setLanguageFilter] = useWebViewState<string[]>('languageFilter', []);

  const openResource = (projectId: string) =>
    papi.commands.sendCommand('platformScriptureEditor.openResourceViewer', projectId);

  const [projects] = usePromise(
    useCallback(async () => {
      const projectMetadata = await papi.projectLookup.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      });
      const projectInfo = await Promise.all(
        projectMetadata.map(async (data) => {
          const pdp = await papi.projectDataProviders.get('platform.base', data.id);
          return {
            projectId: data.id,
            isEditable: await pdp.getSetting('platform.isEditable'),
            fullName: await pdp.getSetting('platform.fullName'),
          };
        }),
      );
      return projectInfo;
    }, []),
    undefined,
  );

  console.log('editable projs:', projects);

  // const [sharedProjectsInfo] = usePromise(
  //   useCallback(async () => {
  //     try {
  //       const projectsInfo = await papi.commands.sendCommand(
  //         'paratextBibleSendReceive.getSharedProjects',
  //       );
  //       return projectsInfo;
  //     } catch (e) {
  //       // setGetSharedProjectsError(getErrorMessage(e));
  //       return undefined;
  //     }
  //   }, []),
  //   undefined,
  // );

  // console.log('S/R projs:', sharedProjectsInfo);

  return (
    <FilterableResourceList
      localizedStrings={localizedStrings}
      dblResources={dblResources}
      isLoadingDblResources={isLoadingDblResources}
      typeFilter={typeFilter}
      setTypeFilter={setTypeFilter}
      languageFilter={languageFilter}
      setLanguageFilter={setLanguageFilter}
      openResource={openResource}
      installResource={dblResourcesProvider?.installDblResource}
      uninstallResource={dblResourcesProvider?.uninstallDblResource}
    />
  );
};
