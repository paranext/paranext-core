import { PropsWithChildren, ReactNode, useCallback, useMemo } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/shadcn-ui/sidebar';
import { SearchBar } from '@/components/basics/search-bar.component';
import { ComboBox } from '@/components/basics/combo-box.component';
import { Z_INDEX_OVERLAY } from '@/components/z-index';
import { ScrollText } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  SettingsSidebar,
  type SettingsSidebarSection,
  type SettingsSidebarItem,
  type SelectedSidebarEntry,
} from './settings-sidebar.component';
import { ComingSoonPanel } from './coming-soon-panel.component';

export type SettingsLayoutSectionId = 'project' | 'general' | 'extensions';

/** A dynamic sidebar item whose right-panel content is rendered by the consumer. */
export type DynamicSettingsSidebarItem = {
  kind: 'dynamic';
  id: string;
  label: string;
};

/** A sidebar item with no real content yet; selecting it shows the Coming Soon panel. */
export type ComingSoonSettingsSidebarItem = {
  kind: 'coming-soon';
  id: string;
  label: string;
};

export type SettingsLayoutItem = DynamicSettingsSidebarItem | ComingSoonSettingsSidebarItem;

export type SettingsLayoutProjectInfo = { projectId: string; projectName: string };

export type SettingsLayoutLabels = {
  /** Group label for the Project section. */
  projectSection: string;
  /** Group label for the General section. */
  generalSection: string;
  /** Group label for the Extensions section. */
  extensionsSection: string;
  /** Title shown in the Coming Soon panel. */
  comingSoonTitle: string;
  /** Body shown in the Coming Soon panel. */
  comingSoonBody: string;
  /** Placeholder text for the search bar. */
  searchPlaceholder: string;
  /** Placeholder shown in the project picker when no project is selected. */
  projectPickerPlaceholder: string;
};

export type SettingsLayoutSelection = {
  section: SettingsLayoutSectionId;
  itemId: string;
};

export type SettingsLayoutProps = PropsWithChildren<{
  /** Optional id (for testing / story isolation). */
  id?: string;
  /** Additional className applied to the outer wrapper. */
  className?: string;

  // ---- Project picker (renders at the top of the Project section) ----
  projectOptions: ReadonlyArray<SettingsLayoutProjectInfo>;
  selectedProjectId: string | undefined;
  onSelectProject: (projectId: string) => void;
  /** When true, the project picker is locked (e.g., dialog scoped to a single project). */
  isProjectLocked?: boolean;

  // ---- Sidebar entries (already localized & in display order) ----
  projectSectionItems: ReadonlyArray<SettingsLayoutItem>;
  generalSectionItems: ReadonlyArray<DynamicSettingsSidebarItem>;
  extensionsSectionItems: ReadonlyArray<DynamicSettingsSidebarItem>;

  // ---- Selection ----
  selectedEntry: SettingsLayoutSelection | undefined;
  onSelectEntry: (entry: SettingsLayoutSelection) => void;

  // ---- Search ----
  searchValue: string;
  onSearch: (q: string) => void;

  // ---- Labels ----
  labels: SettingsLayoutLabels;

  /**
   * Right-panel content. The caller decides what to render based on the current selection. When the
   * selected entry is a Coming Soon item, the layout substitutes the ComingSoonPanel and ignores
   * this slot.
   */
  children?: ReactNode;
}>;

function toSidebarItem(item: SettingsLayoutItem): SettingsSidebarItem {
  return { id: item.id, label: item.label, isComingSoon: item.kind === 'coming-soon' };
}

function matchesSearch(label: string, query: string): boolean {
  if (!query) return true;
  return label.toLowerCase().includes(query.toLowerCase());
}

/**
 * Pure presentational shell for the application Settings dialog. Renders:
 *
 * 1. A top search bar.
 * 2. A sidebar with three sections: Project (with a project picker header), General, Extensions.
 * 3. A right-hand content panel that hosts either consumer-provided content (`children`) or a
 *    "Coming soon" placeholder when the selected sidebar item is hard-coded.
 *
 * No PAPI, no extension service, no project lookup — all data and callbacks are passed in. This
 * makes the component Storybook-testable in isolation.
 */
export function SettingsLayout({
  id,
  className,
  projectOptions,
  selectedProjectId,
  onSelectProject,
  isProjectLocked,
  projectSectionItems,
  generalSectionItems,
  extensionsSectionItems,
  selectedEntry,
  onSelectEntry,
  searchValue,
  onSearch,
  labels,
  children,
}: SettingsLayoutProps) {
  const filteredProjectItems = useMemo(
    () => projectSectionItems.filter((item) => matchesSearch(item.label, searchValue)),
    [projectSectionItems, searchValue],
  );
  const filteredGeneralItems = useMemo(
    () => generalSectionItems.filter((item) => matchesSearch(item.label, searchValue)),
    [generalSectionItems, searchValue],
  );
  const filteredExtensionsItems = useMemo(
    () => extensionsSectionItems.filter((item) => matchesSearch(item.label, searchValue)),
    [extensionsSectionItems, searchValue],
  );

  const getProjectName = useCallback(
    (projectId: string) => {
      const project = projectOptions.find((p) => p.projectId === projectId);
      return project ? project.projectName : projectId;
    },
    [projectOptions],
  );

  const projectPickerHeader = (
    <ComboBox
      buttonVariant="ghost"
      buttonClassName={cn('tw:w-full', {
        'tw:bg-sidebar-accent tw:text-sidebar-accent-foreground': !!selectedProjectId,
      })}
      popoverContentStyle={{ zIndex: Z_INDEX_OVERLAY }}
      options={projectOptions.map((p) => p.projectId)}
      getOptionLabel={getProjectName}
      buttonPlaceholder={labels.projectPickerPlaceholder}
      onChange={onSelectProject}
      value={selectedProjectId}
      icon={<ScrollText />}
      isDisabled={isProjectLocked}
    />
  );

  const sections: SettingsSidebarSection[] = [
    {
      id: 'project',
      label: labels.projectSection,
      header: projectPickerHeader,
      items: filteredProjectItems.map(toSidebarItem),
    },
    {
      id: 'general',
      label: labels.generalSection,
      items: filteredGeneralItems.map(toSidebarItem),
    },
    {
      id: 'extensions',
      label: labels.extensionsSection,
      items: filteredExtensionsItems.map(toSidebarItem),
    },
  ];

  const handleSelectEntry = useCallback(
    (entry: SelectedSidebarEntry) => {
      // Sidebar emits section IDs that match SettingsLayoutSectionId because we declared them here.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      onSelectEntry({ section: entry.sectionId as SettingsLayoutSectionId, itemId: entry.itemId });
    },
    [onSelectEntry],
  );

  const sidebarSelected: SelectedSidebarEntry | undefined = selectedEntry
    ? { sectionId: selectedEntry.section, itemId: selectedEntry.itemId }
    : undefined;

  const isSelectedComingSoon = useMemo(() => {
    if (!selectedEntry || selectedEntry.section !== 'project') return false;
    const found = projectSectionItems.find((i) => i.id === selectedEntry.itemId);
    return found?.kind === 'coming-soon';
  }, [selectedEntry, projectSectionItems]);

  return (
    <div className={cn('tw:box-border tw:flex tw:h-full tw:flex-col', className)}>
      <div className="tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4">
        <SearchBar
          className="tw:w-9/12"
          value={searchValue}
          onSearch={onSearch}
          placeholder={labels.searchPlaceholder}
        />
      </div>
      <SidebarProvider
        id={id}
        className="tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t"
      >
        <SettingsSidebar
          className="tw:w-1/2 tw:min-w-[140px] tw:max-w-[260px] tw:border-e"
          sections={sections}
          selectedEntry={sidebarSelected}
          onSelectEntry={handleSelectEntry}
        />
        <SidebarInset className="tw:min-w-[215px]">
          {isSelectedComingSoon ? (
            <ComingSoonPanel title={labels.comingSoonTitle} body={labels.comingSoonBody} />
          ) : (
            children
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default SettingsLayout;
