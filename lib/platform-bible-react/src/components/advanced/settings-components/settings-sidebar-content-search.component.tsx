import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
// import { ProjectSettingProperties, SettingProperties } from 'platform-bible-utils';
import { PropsWithChildren } from 'react';
import SettingsSidebar from './settings-sidebar.component';

export type SettingsSidebarContentSearchProps = {
  /** Text direction ltr or rtl */
  direction?: 'ltr' | 'rtl';

  extensionLabels: string[];
  // projectLabels: string[];
  handleSelectSidebarItem: (key: string, isProjectSetting: boolean) => void;
  // renderSettingsProperties: (extension: string) => SettingProperties;
  // renderProjectSettingsProperties: (project: string) => ProjectSettingProperties;
} & PropsWithChildren;

export default function SettingsSidebarContentSearch({
  direction = 'ltr',
  extensionLabels,
  // projectLabels,
  children,
  handleSelectSidebarItem,
  // renderSettingsProperties,
  // renderProjectSettingsProperties.
}: SettingsSidebarContentSearchProps) {
  return (
    <SidebarProvider dir={direction}>
      <SettingsSidebar
        extensionLabels={extensionLabels}
        // projectLabels={projectLabels}
        handleSelectSidebarItem={handleSelectSidebarItem}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
