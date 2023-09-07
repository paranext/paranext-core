import { Typography } from '@mui/material';
import './extension-list.component.scss';
import { PropsWithChildren } from 'react';
import ExtensionToggle, { ExtensionToggleProps } from './extension-toggle.component';

export type Extension = {
  name: string;
  description: string;
  hasUpdateAvailable: boolean;
  isInstalled: boolean;
};

type ExtensionListProps = Omit<ExtensionToggleProps, 'extensionName' | 'extensionDescription'> &
  PropsWithChildren<{
    /**
     * Extensions to display Cards for
     */
    extensions: Extension[];

    /**
     * Optional label
     */
    label?: string;
  }>;

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
  hasIcon,
  children,
}: ExtensionListProps) {
  return (
    <div>
      <Typography fontWeight="fontWeightBold" className="extensions-label" variant="subtitle2">
        {label}
      </Typography>
      <div className="extension-list">
        {extensions.map((ext) => (
          <ExtensionToggle
            key={ext.name}
            hasIcon={hasIcon}
            extensionName={ext.name}
            extensionDescription={ext.description}
            toggledExtensionNames={toggledExtensionNames}
            handleExtensionToggle={handleExtensionToggle}
          >
            {children}
          </ExtensionToggle>
        ))}
      </div>
    </div>
  );
}
