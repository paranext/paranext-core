import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useData, useDataProvider, useLocalizedStrings } from '@papi/frontend/react';
import { FilterableResourceList, FILTERABLE_RESOURCE_LIST_STRING_KEYS } from 'platform-bible-react';

globalThis.webViewComponent = function GetResourcesDialog({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(FILTERABLE_RESOURCE_LIST_STRING_KEYS);

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

  const [dblResources, , isLoadingDblResources] = useData(
    'platformGetResources.dblResourcesProvider',
  ).DblResources(undefined, []);

  const [selectedTypes, setSelectedTypes] = useWebViewState<string[]>('typeFilter', [
    'DBLResource',
  ]);

  const [selectedLanguages, setSelectedLanguages] = useWebViewState<string[]>('languageFilter', []);

  const openResource = (projectId: string) =>
    papi.commands.sendCommand('platformScriptureEditor.openResourceViewer', projectId);

  return (
    <FilterableResourceList
      localizedStrings={localizedStrings}
      resources={dblResources}
      isLoadingResources={isLoadingDblResources}
      selectedTypes={selectedTypes}
      setSelectedTypes={setSelectedTypes}
      selectedLanguages={selectedLanguages}
      setSelectedLanguages={setSelectedLanguages}
      openResource={openResource}
      installResource={dblResourcesProvider?.installDblResource}
      uninstallResource={dblResourcesProvider?.uninstallDblResource}
    />
  );
};
