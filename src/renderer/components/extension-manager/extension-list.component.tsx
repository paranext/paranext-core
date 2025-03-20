import { Button, Label } from 'platform-bible-react';
import { PropsWithChildren, useMemo } from 'react';
import './extension-list.component.scss';
import { ExtensionToggle, ExtensionToggleProps } from './extension-toggle.component';

export type Extension = {
  /** The name of the extension */
  name: string;

  /** The description of the extension */
  description: string;

  /** Set if there is an update available, controls update button */
  hasUpdateAvailable: boolean;

  /** Set if the extension is currently installed */
  isInstalled: boolean;

  /** File path to the extensions icon */
  iconFilePath?: string;
};

type ExtensionListProps = Omit<ExtensionToggleProps, 'extensionName' | 'extensionDescription'> &
  PropsWithChildren<{
    /** Extensions to display Cards for */
    extensions: Extension[];

    /** Optional label */
    label?: string;

    /** Optional flag to set the list as a gallery, square cards instead of wide cards */
    isGallery?: boolean;

    /**
     * Optional flag to set if you want an icon (Avatar) to appear for all the extensions in the
     * list that have filePath set
     */
    hasIcons?: boolean;
  }>;

/**
 * Extension List component that creates a series of ExtensionToggle's for a provided array of
 * extensions.
 *
 * @param ExtensionListProps
 * @returns <ExtensionList />
 */
export function ExtensionList({
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
      <Label className="extensions-label">{label}</Label>
      <div className="extension-list">
        {extensions.map((ext) => (
          <ExtensionToggle
            className={extensionToggleClassName}
            key={ext.name}
            iconFilePath={hasIcons ? ext.iconFilePath : undefined}
            extensionName={ext.name}
            extensionDescription={ext.description}
            toggledExtensionNames={toggledExtensionNames}
            handleExtensionToggle={handleExtensionToggle}
            headerAction={headerAction}
          >
            {isGallery ? (
              <div className="action-buttons">
                <Button disabled={toggledExtensionNames.includes(ext.name)}>Remove</Button>
                <Button disabled={!ext.hasUpdateAvailable}>Update</Button>
              </div>
            ) : undefined}
            {children}
          </ExtensionToggle>
        ))}
      </div>
    </div>
  );
}

export default ExtensionList;
