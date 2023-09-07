import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { useMemo, useState } from 'react';
import logger from '@shared/services/logger.service';
import { Typography } from '@mui/material';
import { Button } from 'papi-components';
import ExtensionList, { Extension } from './extension-list.component';
import './extension-manager-tab.component.scss';

export const TAB_TYPE_EXTENSION_MANAGER = 'extension-manager-dialog';

export function fetchExtensions(): Extension[] {
  return [
    {
      name: 'Editor',
      description: 'Edit Scripture Text',
      hasUpdateAvailable: false,
      isInstalled: true,
    } as Extension,
    {
      name: 'Resource Viewer',
      description: 'View Scripture resources',
      hasUpdateAvailable: false,
      isInstalled: true,
    } as Extension,
    {
      name: 'Parallel Passages',
      description: 'Compare parallel passages of Scripture',
      hasUpdateAvailable: true,
      isInstalled: true,
    } as Extension,
    {
      name: 'Psalms layer-by-layer',
      description: 'Provide resources on the Psalms from Cambridge Digital Bible Research',
      hasUpdateAvailable: true,
      isInstalled: true,
    } as Extension,
    {
      name: 'Hello World',
      description: 'Example Bundled Extension',
      hasUpdateAvailable: false,
      isInstalled: true,
    } as Extension,
    {
      name: 'Hello Someone',
      description: 'Example Bundled Extension',
      hasUpdateAvailable: true,
      isInstalled: false,
    } as Extension,
    {
      name: 'Quick Verse',
      description: 'Example Bundled Extension',
      hasUpdateAvailable: false,
      isInstalled: false,
    } as Extension,
  ];
}

export default function ExtensionManagerTab() {
  const installedExtensions = useMemo(() => fetchExtensions(), []);
  // Set the initial value to the extensions fetched so all toggles are checked
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
    <div className="extension-manager-dialog">
      <div className="extension-manager-label">
        <Typography>Extension Toggle</Typography>
      </div>
      <div className="extension-manager-instance">
        <ExtensionList
          extensions={installedExtensions}
          toggledExtensionNames={toggledExtensions}
          handleExtensionToggle={handleExtensionToggle}
          label="Installed Extensions"
        />
      </div>
      <div className="extension-manager-actions">
        <Button onClick={() => logger.info(`Installed extensions: ${toggledExtensions}`)}>
          Close
        </Button>
      </div>
    </div>
  );
}

export const loadExtensionManagerTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Extension Manager',
    content: <ExtensionManagerTab />,
  };
};
