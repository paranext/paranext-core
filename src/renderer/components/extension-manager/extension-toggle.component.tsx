import { PropsWithChildren } from 'react';
import { Switch } from 'platform-bible-react';
import ExtensionCard, { ExtensionCardProps } from './extension-card.component';
import './extension-toggle.component.scss';

export interface ExtensionToggleHandler {
  (extensionName: string): void;
}

export type ExtensionToggleProps = ExtensionCardProps &
  PropsWithChildren<{
    /** The array of toggled extension names is passed to control the isChecked flag on Switch */
    toggledExtensionNames: string[];
    /** Handler to perform an action when the extension is toggled */
    handleExtensionToggle: ExtensionToggleHandler;
  }>;

export function ExtensionToggle({
  toggledExtensionNames,
  handleExtensionToggle,
  headerAction,
  extensionName,
  extensionDescription,
  iconFilePath,
  className,
  children,
}: ExtensionToggleProps) {
  return (
    <ExtensionCard
      className={className}
      iconFilePath={iconFilePath}
      extensionName={extensionName}
      extensionDescription={extensionDescription}
      headerAction={headerAction}
    >
      {children}
      <div className="switch-container">
        <Switch
          checked={toggledExtensionNames.includes(extensionName)}
          onCheckedChange={() => handleExtensionToggle(extensionName)}
        />
      </div>
    </ExtensionCard>
  );
}

export default ExtensionToggle;
