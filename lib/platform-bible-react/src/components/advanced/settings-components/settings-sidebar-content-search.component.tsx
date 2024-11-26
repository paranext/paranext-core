import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { PropsWithChildren } from 'react';
import SearchBar from '@/components/basics/search-bar.component';
import SettingsSidebar, { SettingsSidebarProps } from './settings-sidebar.component';

export type SettingsSidebarContentSearchProps = SettingsSidebarProps &
  PropsWithChildren & {
    /** Optional id for testing */
    id?: string;

    /** Text direction ltr or rtl */
    direction?: 'ltr' | 'rtl';

    /** Handler to run when the value of the search bar changes */
    onSearch: (searchQuery: string) => void;
  };

export default function SettingsSidebarContentSearch({
  id,
  direction = 'ltr',
  extensionLabels,
  projectOptions,
  children,
  handleSelectSidebarItem,
  selectedSidebarItem,
  onSearch,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
}: SettingsSidebarContentSearchProps) {
  return (
    <div className="tw-flex tw-h-full tw-flex-col tw-p-3 tw-pb-2">
      <div className="tw-flex tw-items-center tw-justify-center tw-py-4">
        <SearchBar
          className="tw-w-9/12"
          onSearch={onSearch}
          placeholder="Search app settings, extension settings, and project settings"
        />
      </div>
      <SidebarProvider dir={direction} id={id} className="tw-h-full tw-flex-1 tw-gap-4">
        <SettingsSidebar
          extensionLabels={extensionLabels}
          projectOptions={projectOptions}
          handleSelectSidebarItem={handleSelectSidebarItem}
          selectedSidebarItem={selectedSidebarItem}
          extensionsSidebarGroupLabel={extensionsSidebarGroupLabel}
          projectsSidebarGroupLabel={projectsSidebarGroupLabel}
        />
        <SidebarInset className="tw-overflow-y-auto">{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
