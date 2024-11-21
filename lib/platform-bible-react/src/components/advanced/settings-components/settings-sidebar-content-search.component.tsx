import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { PropsWithChildren } from 'react';
import SettingsSidebar, { SettingsSidebarProps } from './settings-sidebar.component';

export type SettingsSidebarContentSearchProps = SettingsSidebarProps &
  PropsWithChildren & {
    /** Optional id for testing */
    id?: string;

    /** Text direction ltr or rtl */
    direction?: 'ltr' | 'rtl';
  };

export default function SettingsSidebarContentSearch({
  id,
  direction = 'ltr',
  extensionLabels,
  projectOptions,
  children,
  handleSelectSidebarItem,
  selectedSidebarItem,
}: SettingsSidebarContentSearchProps) {
  return (
    <SidebarProvider dir={direction} id={id}>
      <SettingsSidebar
        extensionLabels={extensionLabels}
        projectOptions={projectOptions}
        handleSelectSidebarItem={handleSelectSidebarItem}
        selectedSidebarItem={selectedSidebarItem}
      />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
