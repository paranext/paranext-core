import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { PropsWithChildren, useMemo } from 'react';
import { SearchBar } from '@/components/basics/search-bar.component';
import {
  SettingsSidebar,
  SettingsSidebarProps,
  type SettingsSidebarSection,
} from './settings-sidebar.component';

/** Default placeholder shown in the search bar when no `searchPlaceholder` is provided. */
const DEFAULT_SEARCH_PLACEHOLDER = 'Search app settings, extension settings, and project settings';

export type SettingsSidebarContentSearchProps = SettingsSidebarProps &
  PropsWithChildren & {
    /** The search query in the search bar */
    searchValue: string;

    /** Handler to run when the value of the search bar changes */
    onSearch: (searchQuery: string) => void;

    /**
     * Placeholder text for the search bar. Defaults to a generic settings-search prompt so existing
     * callers are unaffected.
     */
    searchPlaceholder?: string;
  };

/** Case-insensitive substring match used to filter sidebar items against the search query. */
function matchesSearch(label: string, query: string): boolean {
  if (!query) return true;
  return label.toLowerCase().includes(query.toLowerCase());
}

/**
 * A component that wraps a search bar and a settings sidebar, providing a way to search and
 * navigate to different settings pages.
 *
 * The sidebar layout is **dynamic**: when the generalized `sections` shape is used, the structure
 * is driven entirely by the caller. Any number of sections may be supplied, in any order, each with
 * its own label, an arbitrary list of items, and an optional `header` element (e.g., a project
 * picker). This component does not hard-code which sections or entries appear — callers compose the
 * layout they need. Each section's items are filtered against `searchValue` (case-insensitive label
 * substring match) before being forwarded to the sidebar.
 *
 * Two prop shapes are supported, mirroring {@link SettingsSidebar}:
 *
 * - The generalized shape (`sections` + `selectedEntry` + `onSelectEntry`) — the dynamic layout
 *   described above.
 * - The legacy shape (`extensionLabels` + `projectInfo` + ...) — forwarded unchanged; no filtering is
 *   applied (legacy callers handle their own filtering).
 *
 * The right-hand `SidebarInset` always renders `children`, so the caller supplies the content for
 * the selected entry.
 *
 * @param {SettingsSidebarContentSearchProps} props - The props for the component.
 */
export function SettingsSidebarContentSearch({
  id,
  sections,
  selectedEntry,
  onSelectEntry,
  extensionLabels,
  projectInfo,
  children,
  handleSelectSidebarItem,
  selectedSidebarItem,
  searchValue,
  onSearch,
  searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
  buttonPlaceholderText,
}: SettingsSidebarContentSearchProps) {
  const filteredSections = useMemo<ReadonlyArray<SettingsSidebarSection> | undefined>(() => {
    if (!sections) return undefined;
    return sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => matchesSearch(item.label, searchValue)),
    }));
  }, [sections, searchValue]);

  return (
    <div className="tw:box-border tw:flex tw:h-full tw:flex-col">
      <div className="tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4">
        <SearchBar
          className="tw:w-9/12"
          value={searchValue}
          onSearch={onSearch}
          placeholder={searchPlaceholder}
        />
      </div>
      <SidebarProvider
        id={id}
        className="tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t"
      >
        {filteredSections ? (
          <SettingsSidebar
            className="tw:w-1/2 tw:min-w-[140px] tw:max-w-[260px] tw:border-e"
            sections={filteredSections}
            selectedEntry={selectedEntry}
            onSelectEntry={onSelectEntry}
          />
        ) : (
          <SettingsSidebar
            className="tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e"
            extensionLabels={extensionLabels}
            projectInfo={projectInfo}
            handleSelectSidebarItem={handleSelectSidebarItem}
            selectedSidebarItem={selectedSidebarItem}
            extensionsSidebarGroupLabel={extensionsSidebarGroupLabel}
            projectsSidebarGroupLabel={projectsSidebarGroupLabel}
            buttonPlaceholderText={buttonPlaceholderText}
          />
        )}
        <SidebarInset className="tw:min-w-[215px]">{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default SettingsSidebarContentSearch;
