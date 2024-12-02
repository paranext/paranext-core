import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { PropsWithChildren } from 'react';
import SearchBar from '@/components/basics/search-bar.component';
import SettingsSidebar, { SettingsSidebarProps } from './settings-sidebar.component';

export type SettingsSidebarContentSearchProps = SettingsSidebarProps &
  PropsWithChildren & {
    /** Optional id for testing */
    id?: string;

    /** Handler to run when the value of the search bar changes */
    onSearch: (searchQuery: string) => void;
  };

export default function SettingsSidebarContentSearch({
  id,
  extensionLabels,
  projectOptions,
  children,
  handleSelectSidebarItem,
  selectedSidebarItem,
  onSearch,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
  buttonPlaceholderText,
}: SettingsSidebarContentSearchProps) {
  return (
    <div className="tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3">
      <div className="tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4">
        <SearchBar
          className="tw-w-9/12"
          onSearch={onSearch}
          placeholder="Search app settings, extension settings, and project settings"
        />
      </div>
      <SidebarProvider id={id} className="tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto">
        <SettingsSidebar
          extensionLabels={extensionLabels}
          projectOptions={projectOptions}
          handleSelectSidebarItem={handleSelectSidebarItem}
          selectedSidebarItem={selectedSidebarItem}
          extensionsSidebarGroupLabel={extensionsSidebarGroupLabel}
          projectsSidebarGroupLabel={projectsSidebarGroupLabel}
          buttonPlaceholderText={buttonPlaceholderText}
        />
        <SidebarInset className="tw-overflow-y-auto">{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
