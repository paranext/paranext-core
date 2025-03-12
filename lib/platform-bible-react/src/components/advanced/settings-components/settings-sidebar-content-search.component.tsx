import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { PropsWithChildren } from 'react';
import SearchBar from '@/components/basics/search-bar.component';
import SettingsSidebar, { SettingsSidebarProps } from './settings-sidebar.component';

export type SettingsSidebarContentSearchProps = SettingsSidebarProps &
  PropsWithChildren & {
    /** Optional id for testing */
    id?: string;

    /** The search query in the search bar */
    searchValue: string;

    /** Handler to run when the value of the search bar changes */
    onSearch: (searchQuery: string) => void;
  };

export default function SettingsSidebarContentSearch({
  id,
  extensionLabels,
  projectInfo,
  children,
  handleSelectSidebarItem,
  selectedSidebarItem,
  searchValue,
  onSearch,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
  buttonPlaceholderText,
}: SettingsSidebarContentSearchProps) {
  return (
    <div className="tw-box-border tw-flex tw-h-full tw-flex-col">
      <div className="tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4">
        <SearchBar
          className="tw-w-9/12"
          value={searchValue}
          onSearch={onSearch}
          placeholder="Search app settings, extension settings, and project settings"
        />
      </div>
      <SidebarProvider
        id={id}
        className="tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t-2 tw-border-muted"
      >
        <SettingsSidebar
          className="tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e-2 tw-border-muted"
          extensionLabels={extensionLabels}
          projectInfo={projectInfo}
          handleSelectSidebarItem={handleSelectSidebarItem}
          selectedSidebarItem={selectedSidebarItem}
          extensionsSidebarGroupLabel={extensionsSidebarGroupLabel}
          projectsSidebarGroupLabel={projectsSidebarGroupLabel}
          buttonPlaceholderText={buttonPlaceholderText}
        />
        <SidebarInset className="tw-min-w-[215px]">{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
