import { Typography } from '@mui/material';
import { Button } from 'papi-components';
import './extension-list.component.scss';
import { PropsWithChildren, useMemo } from 'react';
import ExtensionToggle, { ExtensionToggleProps } from './extension-toggle.component';

export type Extension = {
  /**
   * The name of the extension
   */
  name: string;

  /**
   * The description of the extension
   */
  description: string;

  /**
   * Set if there is an update available, controls update button
   */
  hasUpdateAvailable: boolean;

  /**
   * Set if the extension is currently installed
   */
  isInstalled: boolean;

  /**
   * File path to the extensions icon
   */
  filePath?: string;
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

    /**
     * Optional flag to set the list as a gallery, square cards instead of wide cards
     */
    isGallery?: boolean;

    /**
     * Optional flag to set if you want an icon (Avatar) to appear for all the extensions in the list that have filePath set
     */
    hasIcons?: boolean;
  }>;

/**
 * Extension List component that creates a series of ExtensionToggle's for a provided array of extensions.
 * @param ExtensionListProps
 * @returns <ExtensionList />
 */
export default function ExtensionList({
  extensions,
  toggledExtensionNames,
  headerAction,
  handleExtensionToggle,
  label,
  hasIcons,
  isGallery,
  children,
}: ExtensionListProps) {
  const extensionToggleClassName = useMemo(() => (isGallery ? 'square' : 'wide'), [isGallery]);

  return (
    <div>
      <Typography fontWeight="fontWeightBold" className="extensions-label" variant="subtitle2">
        {label}
      </Typography>
      <div className="extension-list">
        {extensions.map((ext) => (
          <ExtensionToggle
            className={extensionToggleClassName}
            key={ext.name}
            iconFilePath={hasIcons ? ext.filePath : undefined}
            extensionName={ext.name}
            extensionDescription={ext.description}
            toggledExtensionNames={toggledExtensionNames}
            handleExtensionToggle={handleExtensionToggle}
            headerAction={headerAction}
          >
            {isGallery ? (
              <div className="action-buttons">
                <Button isDisabled={toggledExtensionNames.includes(ext.name)}>Remove</Button>
                <Button isDisabled={!ext.hasUpdateAvailable}>Update</Button>
              </div>
            ) : null}
            {children}
          </ExtensionToggle>
        ))}
      </div>
    </div>
  );
}
