import { Switch } from 'papi-components';
import { Typography } from '@mui/material';
import './extension-list.component.scss';
import ExtensionToggle from './extension-toggle.component';

export type Extension = {
  name: string;
  description: string;
};

export interface ExtensionToggleHandler {
  (extensionName: string): void;
}

type ExtensionListProps = {
  /**
   * Extensions to display Cards for
   */
  extensions: Extension[];
  /**
   * The array of toggled extension names is passed to control the isChecked flag on Switch
   */
  toggledExtensionNames: string[];
  /**
   * Handler to perform an action when the extension is toggled
   */
  handleExtensionToggle: ExtensionToggleHandler;

  /**
   * Optional label
   */
  label?: string;
};

/**
 * Extension List component that creates a series of ExtensionToggle's for a provided array of extensions.
 * @param ExtensionListProps
 * @returns <ExtensionList />
 */
export default function ExtensionList({
  extensions,
  toggledExtensionNames,
  handleExtensionToggle,
  label,
}: ExtensionListProps) {
  return (
    <div className="extension-list">
      <Typography fontWeight="fontWeightBold" className="extensions-label" variant="subtitle2">
        {label}
      </Typography>
      {extensions.map((ext) => (
        <ExtensionToggle extensionName={ext.name} extensionDescription={ext.description}>
          <div className="switch-container">
            <Switch
              isChecked={toggledExtensionNames.includes(ext.name)}
              onChange={() => handleExtensionToggle(ext.name)}
            />
          </div>
        </ExtensionToggle>
      ))}
    </div>
  );
}
