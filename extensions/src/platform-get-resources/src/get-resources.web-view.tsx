import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import type { ResourceType } from 'platform-bible-utils';
import { FilterableResourceList, FILTERABLE_RESOURCE_LIST_STRING_KEYS } from 'platform-bible-react';

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
