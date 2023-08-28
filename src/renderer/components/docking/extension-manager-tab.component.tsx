import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { useState } from 'react';
import logger from '@shared/services/logger.service';
import { Button } from 'papi-components';
import ExtensionList, { Extension } from './extension-list.component';
import './extension-manager-tab.component.scss';

export const TAB_TYPE_EXTENSION_MANAGER = 'extension-manager-dialog';

export function fetchExtensions(): Extension[] {
  return [
    { name: 'Editor', description: 'Edit Scripture Text' } as Extension,
    { name: 'Resource Viewer', description: 'View Scripture resources' } as Extension,
    {
      name: 'Parallel Passages',
      description: 'Compare parallel passages of Scripture',
    } as Extension,
    {
      name: 'Psalms layer-by-layer',
      description: 'Provide resources on the Psalms from Cambridge Digital Bible Research',
    } as Extension,
  ];
}

export default function ExtensionManagerTab() {
  const installedExtensions = fetchExtensions();
  // Set the initial value to the extensions pulled so all toggles are checked
  const [toggledExtensions, setToggledExtensions] = useState<string[]>(
    installedExtensions.map((ext) => ext.name),
  );

  const handleExtensionToggle = (extName: string) => {
    setToggledExtensions((prevState) => {
      if (prevState.includes(extName)) {
        return prevState.filter((name) => name !== extName);
      }
      return [...prevState, extName];
    });
  };

  return (
    <span className="installed-extensions-list">
      <ExtensionList
        extensions={installedExtensions}
        toggledExtensionNames={toggledExtensions}
        handleExtensionToggle={handleExtensionToggle}
        label="Installed Extensions"
      />
      <Button
        className="close-extension-toggle"
        onClick={() => logger.info(`Installed extensions: ${toggledExtensions}`)}
      >
        Close
      </Button>
    </span>
  );
}

export const loadExtensionManagerTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Extension Manager',
    content: <ExtensionManagerTab />,
  };
};
