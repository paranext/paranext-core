import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { cn } from '@/utils/shadcn-ui/utils';
import { PropsWithChildren } from 'react';
import { SearchBar } from '@/components/basics/search-bar.component';
import { SettingsSidebar, SettingsSidebarProps } from './settings-sidebar.component';

export type SettingsSidebarContentSearchProps = SettingsSidebarProps &
  PropsWithChildren & {
    /** The search query in the search bar */
    searchValue: string;

    /** Handler to run when the value of the search bar changes */
    onSearch: (searchQuery: string) => void;
  };

/**
 * A component that wraps a search bar and a settings sidebar, providing a way to search and
 * navigate to different settings pages.
 *
 * @param {SettingsSidebarContentSearchProps} props - The props for the component.
 * @param {string} props.id - The id of the sidebar.
 */
export function SettingsSidebarContentSearch({
  id,
  children,
  searchValue,
  onSearch,
  className,
  // Everything else on this type comes from `SettingsSidebarProps`, so forward it wholesale: a
  // prop added to the sidebar reaches it without a matching edit here. `id` is destructured out
  // because it belongs to the SidebarProvider below, not to the sidebar.
  ...sidebarProps
}: SettingsSidebarContentSearchProps) {
  return (
    <div className="tw:box-border tw:flex tw:h-full tw:flex-col">
      <div className="tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4">
        <SearchBar
          className="tw:w-9/12"
          value={searchValue}
          onSearch={onSearch}
          placeholder="Search app settings, extension settings, and project settings"
        />
      </div>
      <SidebarProvider
        id={id}
        className="tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t"
      >
        <SettingsSidebar
          className={cn('tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e', className)}
          {...sidebarProps}
        />
        <SidebarInset className="tw:min-w-[215px]">{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default SettingsSidebarContentSearch;
