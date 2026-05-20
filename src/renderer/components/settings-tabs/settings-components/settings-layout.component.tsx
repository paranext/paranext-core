import { PropsWithChildren, ReactNode, useCallback, useMemo } from 'react';
import {
  ComboBox,
  ComingSoonPanel,
  SettingsSidebarContentSearch,
  Z_INDEX_OVERLAY,
  type ProjectInfo,
  type SelectedSidebarEntry,
  type SettingsSidebarItem,
  type SettingsSidebarSection,
} from 'platform-bible-react';
import { ScrollText } from 'lucide-react';

/** Stable section ids used by the settings layout. Exported so containers can route selection. */
export const SETTINGS_PROJECT_SECTION_ID = 'project';
export const SETTINGS_GENERAL_SECTION_ID = 'general';
export const SETTINGS_EXTENSIONS_SECTION_ID = 'extensions';

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

export type SettingsLayoutProps = PropsWithChildren<{
  /** Optional id (for testing / story isolation). */
  id?: string;

  // ---- Project picker (renders as the header of the Project section) ----
  projectOptions: ReadonlyArray<ProjectInfo>;
  selectedProjectId: string | undefined;
  /** Called when the user picks a project from the project picker combo box. */
  onSelectProject: (projectId: string) => void;
  /** When true, the project picker is locked (e.g., dialog scoped to a single project). */
  isProjectLocked?: boolean;

  // ---- Sidebar entries (already localized & in display order) ----
  /**
   * Project-section items. Mark placeholder entries with `isComingSoon` to show the Coming Soon
   * panel.
   */
  projectSectionItems: ReadonlyArray<SettingsSidebarItem>;
  generalSectionItems: ReadonlyArray<SettingsSidebarItem>;
  extensionsSectionItems: ReadonlyArray<SettingsSidebarItem>;

  // ---- Selection ----
  selectedEntry: SelectedSidebarEntry | undefined;
  /** Called when the user selects a sidebar entry (in any section). */
  onSelectEntry: (entry: SelectedSidebarEntry) => void;

  // ---- Search ----
  searchValue: string;
  /** Called when the user types in the search bar; receives the new query string. */
  onSearch: (q: string) => void;

  // ---- Labels ----
  labels: SettingsLayoutLabels;

  /**
   * Right-panel content for the selected entry. When the selected entry is a coming-soon Project
   * item, the layout substitutes the Coming Soon panel and ignores this slot.
   */
  children?: ReactNode;
}>;

/**
 * Settings-specific presentational layout for the application Settings dialog. Applies the concrete
 * settings format on top of the generic, dynamic {@link SettingsSidebarContentSearch} shell:
 *
 * 1. A Project section whose header is a project-picker combo box.
 * 2. A General section and an Extensions section.
 * 3. Coming Soon substitution: when a coming-soon Project item is selected, the right panel shows
 *    {@link ComingSoonPanel} instead of `children`.
 *
 * Pure presentational — no PAPI, no services. All data and callbacks are passed in, so it can be
 * exercised in Storybook with sample data. The live PAPI wiring lives in the `SettingsTab`
 * container.
 */
export function SettingsLayout({
  id,
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
  const getProjectName = useCallback(
    (projectId: string) => {
      const project = projectOptions.find((option) => option.projectId === projectId);
      return project ? project.projectName : projectId;
    },
    [projectOptions],
  );

  const projectPickerHeader = useMemo<ReactNode>(
    () => (
      <ComboBox
        buttonVariant="ghost"
        buttonClassName="tw:w-full tw:bg-muted/50 tw:hover:bg-muted"
        popoverContentStyle={{ zIndex: Z_INDEX_OVERLAY }}
        options={projectOptions.map((option) => option.projectId)}
        getOptionLabel={getProjectName}
        buttonPlaceholder={labels.projectPickerPlaceholder}
        onChange={onSelectProject}
        value={selectedProjectId}
        icon={<ScrollText />}
        isDisabled={isProjectLocked}
      />
    ),
    [
      projectOptions,
      getProjectName,
      labels.projectPickerPlaceholder,
      onSelectProject,
      selectedProjectId,
      isProjectLocked,
    ],
  );

  const sections = useMemo<SettingsSidebarSection[]>(
    () => [
      {
        id: SETTINGS_PROJECT_SECTION_ID,
        label: labels.projectSection,
        header: projectPickerHeader,
        items: projectSectionItems,
      },
      {
        id: SETTINGS_GENERAL_SECTION_ID,
        label: labels.generalSection,
        items: generalSectionItems,
      },
      {
        id: SETTINGS_EXTENSIONS_SECTION_ID,
        label: labels.extensionsSection,
        items: extensionsSectionItems,
      },
    ],
    [
      labels.projectSection,
      labels.generalSection,
      labels.extensionsSection,
      projectPickerHeader,
      projectSectionItems,
      generalSectionItems,
      extensionsSectionItems,
    ],
  );

  const isSelectedComingSoon = useMemo(() => {
    if (!selectedEntry || selectedEntry.sectionId !== SETTINGS_PROJECT_SECTION_ID) return false;
    const found = projectSectionItems.find((item) => item.id === selectedEntry.itemId);
    return !!found?.isComingSoon;
  }, [selectedEntry, projectSectionItems]);

  return (
    <SettingsSidebarContentSearch
      id={id}
      sections={sections}
      selectedEntry={selectedEntry}
      onSelectEntry={onSelectEntry}
      searchValue={searchValue}
      onSearch={onSearch}
      searchPlaceholder={labels.searchPlaceholder}
    >
      {isSelectedComingSoon ? (
        <ComingSoonPanel title={labels.comingSoonTitle} body={labels.comingSoonBody} />
      ) : (
        children
      )}
    </SettingsSidebarContentSearch>
  );
}

export default SettingsLayout;
