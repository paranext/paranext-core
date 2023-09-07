import { PropsWithChildren } from 'react';
import { Switch } from 'papi-components';
import ExtensionCard, { ExtensionCardProps } from './extension-card.component';
import './extension-toggle.component.scss';

export interface ExtensionToggleHandler {
  (extensionName: string): void;
}

export type ExtensionToggleProps = ExtensionCardProps &
  PropsWithChildren<{
    /**
     * The array of toggled extension names is passed to control the isChecked flag on Switch
     */
    toggledExtensionNames: string[];
    /**
     * Handler to perform an action when the extension is toggled
     */
    handleExtensionToggle: ExtensionToggleHandler;
  }>;

export default function ExtensionToggle({
  toggledExtensionNames,
  handleExtensionToggle,
  extensionName,
  extensionDescription,
  hasIcon,
  children,
}: ExtensionToggleProps) {
  return (
    <ExtensionCard
      hasIcon={hasIcon}
      extensionName={extensionName}
      extensionDescription={extensionDescription}
    >
      {children}
      <div className="switch-container">
        <Switch
          isChecked={toggledExtensionNames.includes(extensionName)}
          onChange={() => handleExtensionToggle(extensionName)}
        />
      </div>
    </ExtensionCard>
  );
}
