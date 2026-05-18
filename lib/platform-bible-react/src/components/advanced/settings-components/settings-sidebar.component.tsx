import { ComboBox } from '@/components/basics/combo-box.component';
import { Z_INDEX_OVERLAY } from '@/components/z-index';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/shadcn-ui/sidebar';
import { cn } from '@/utils/shadcn-ui/utils';
import { ScrollText } from 'lucide-react';
import { ReactNode, useCallback } from 'react';

export type SelectedSettingsSidebarItem = {
  label: string;
  projectId?: string;
};

export type ProjectInfo = { projectId: string; projectName: string };

/** A single entry rendered inside a sidebar section. */
export type SettingsSidebarItem = {
  /** Stable identifier; unique within a section. */
  id: string;
  /** Display label (already localized by the caller). */
  label: string;
  /** Visually demote and label the item as a placeholder (e.g., "Coming soon"). */
  isComingSoon?: boolean;
};

/** A section in the generalized sidebar. */
export type SettingsSidebarSection = {
  /** Stable identifier for the section. Used as the `sectionId` of the selected entry. */
  id: string;
  /** Group label (already localized). */
  label: string;
  /** Optional element rendered above the items in the section (e.g., a project picker). */
  header?: ReactNode;
  /** Menu items in display order. */
  items: ReadonlyArray<SettingsSidebarItem>;
};

/** Identifies which item is currently selected. */
export type SelectedSidebarEntry = {
  sectionId: string;
  itemId: string;
};

export type SettingsSidebarProps = {
  /** Optional id for testing */
  id?: string;
  /** Additional css classes to help with unique styling of the sidebar */
  className?: string;

  // ---- Generalized API (preferred). When `sections` is provided, the legacy props below are
  // ignored.
  /** Sections to render in order. */
  sections?: ReadonlyArray<SettingsSidebarSection>;
  /** Currently selected entry (used with `sections`). */
  selectedEntry?: SelectedSidebarEntry;
  /** Called when the user clicks a menu item (used with `sections`). */
  onSelectEntry?: (entry: SelectedSidebarEntry) => void;

  // ---- Legacy API. Renders extension settings as menu items and project settings as a combo box.

  /** Extension labels from contribution */
  extensionLabels?: Record<string, string>;
  /** Project names and ids */
  projectInfo?: ProjectInfo[];
  /** Handler for selecting a sidebar item */
  handleSelectSidebarItem?: (key: string, projectId?: string) => void;
  /** The current selected value in the sidebar */
  selectedSidebarItem?: SelectedSettingsSidebarItem;
  /** Label for the group of extensions setting groups */
  extensionsSidebarGroupLabel?: string;
  /** Label for the group of projects settings */
  projectsSidebarGroupLabel?: string;
  /** Placeholder text for the button */
  buttonPlaceholderText?: string;
};

type GeneralizedSidebarProps = {
  id?: string;
  className?: string;
  sections: ReadonlyArray<SettingsSidebarSection>;
  selectedEntry: SelectedSidebarEntry | undefined;
  onSelectEntry: (entry: SelectedSidebarEntry) => void;
};

function GeneralizedSidebar({
  id,
  className,
  sections,
  selectedEntry,
  onSelectEntry,
}: GeneralizedSidebarProps) {
  const isActive = useCallback(
    (sectionId: string, itemId: string) =>
      selectedEntry?.sectionId === sectionId && selectedEntry?.itemId === itemId,
    [selectedEntry],
  );

  return (
    <Sidebar
      id={id}
      collapsible="none"
      variant="inset"
      className={cn('tw:w-96 tw:gap-2 tw:overflow-y-auto', className)}
    >
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.id}>
            <SidebarGroupLabel className="tw:text-sm">{section.label}</SidebarGroupLabel>
            {section.header && (
              <SidebarGroupContent className="tw:pl-3 tw:pb-1">
                {section.header}
              </SidebarGroupContent>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSelectEntry({ sectionId: section.id, itemId: item.id })}
                      isActive={isActive(section.id, item.id)}
                    >
                      <span
                        className={cn('tw:pl-3', {
                          'tw:text-muted-foreground tw:italic': item.isComingSoon,
                        })}
                      >
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

type LegacySidebarProps = {
  id?: string;
  className?: string;
  extensionLabels: Record<string, string>;
  projectInfo: ProjectInfo[];
  handleSelectSidebarItem: (key: string, projectId?: string) => void;
  selectedSidebarItem: SelectedSettingsSidebarItem;
  extensionsSidebarGroupLabel: string;
  projectsSidebarGroupLabel: string;
  buttonPlaceholderText: string;
};

function LegacySidebar({
  id,
  className,
  extensionLabels,
  projectInfo,
  handleSelectSidebarItem,
  selectedSidebarItem,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
  buttonPlaceholderText,
}: LegacySidebarProps) {
  const handleSelectItem = useCallback(
    (item: string, projectId?: string) => {
      handleSelectSidebarItem(item, projectId);
    },
    [handleSelectSidebarItem],
  );

  const getProjectNameFromProjectId = useCallback(
    (projectId: string) => {
      const project = projectInfo.find((info) => info.projectId === projectId);
      return project ? project.projectName : projectId;
    },
    [projectInfo],
  );

  const getIsActive = useCallback(
    (label: string) => !selectedSidebarItem.projectId && label === selectedSidebarItem.label,
    [selectedSidebarItem],
  );

  return (
    <Sidebar
      id={id}
      collapsible="none"
      variant="inset"
      className={cn('tw:w-96 tw:gap-2 tw:overflow-y-auto', className)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tw:text-sm">
            {extensionsSidebarGroupLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.entries(extensionLabels).map(([key, label]) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton
                    onClick={() => handleSelectItem(key)}
                    isActive={getIsActive(key)}
                  >
                    <span className="tw:pl-3">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="tw:text-sm">{projectsSidebarGroupLabel}</SidebarGroupLabel>
          <SidebarGroupContent className="tw:pl-3">
            <ComboBox
              buttonVariant="ghost"
              buttonClassName={cn('tw:w-full', {
                'tw:bg-sidebar-accent tw:text-sidebar-accent-foreground':
                  selectedSidebarItem?.projectId,
              })}
              // TODO: Check if this z-index override is necessary — the PopoverContent default
              // (Z_INDEX_ABOVE_DOCK = 250) may be sufficient since this dropdown portals to body
              popoverContentStyle={{ zIndex: Z_INDEX_OVERLAY }}
              options={projectInfo.flatMap((info) => info.projectId)}
              getOptionLabel={getProjectNameFromProjectId}
              buttonPlaceholder={buttonPlaceholderText}
              onChange={(projectId: string) => {
                const selectedProjectName = getProjectNameFromProjectId(projectId);
                handleSelectItem(selectedProjectName, projectId);
              }}
              value={selectedSidebarItem?.projectId ?? undefined}
              icon={<ScrollText />}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

/**
 * The SettingsSidebar component is a sidebar that displays setting navigation entries. Must be
 * wrapped in a SidebarProvider component otherwise produces errors.
 *
 * Two prop shapes are supported:
 *
 * - The generalized shape (`sections` + `selectedEntry` + `onSelectEntry`) accepts an arbitrary
 *   ordered list of sections, each optionally with a header element (e.g., a combo box) above its
 *   menu items.
 * - The legacy shape (`extensionLabels` + `projectInfo` + ...) renders exactly two groups:
 *   extensions as menu items and projects as a combo box. Existing consumers continue to work
 *   without changes.
 *
 * New code should prefer the generalized shape.
 */
export function SettingsSidebar(props: SettingsSidebarProps) {
  const {
    id,
    className,
    sections,
    selectedEntry,
    onSelectEntry,
    extensionLabels,
    projectInfo,
    handleSelectSidebarItem,
    selectedSidebarItem,
    extensionsSidebarGroupLabel,
    projectsSidebarGroupLabel,
    buttonPlaceholderText,
  } = props;

  if (sections) {
    if (!onSelectEntry) {
      throw new Error('SettingsSidebar: `onSelectEntry` is required when `sections` is provided.');
    }
    return (
      <GeneralizedSidebar
        id={id}
        className={className}
        sections={sections}
        selectedEntry={selectedEntry}
        onSelectEntry={onSelectEntry}
      />
    );
  }

  if (
    !extensionLabels ||
    !projectInfo ||
    !handleSelectSidebarItem ||
    !selectedSidebarItem ||
    extensionsSidebarGroupLabel === undefined ||
    projectsSidebarGroupLabel === undefined ||
    buttonPlaceholderText === undefined
  ) {
    throw new Error(
      'SettingsSidebar: pass either the generalized `sections` shape or all legacy props.',
    );
  }

  return (
    <LegacySidebar
      id={id}
      className={className}
      extensionLabels={extensionLabels}
      projectInfo={projectInfo}
      handleSelectSidebarItem={handleSelectSidebarItem}
      selectedSidebarItem={selectedSidebarItem}
      extensionsSidebarGroupLabel={extensionsSidebarGroupLabel}
      projectsSidebarGroupLabel={projectsSidebarGroupLabel}
      buttonPlaceholderText={buttonPlaceholderText}
    />
  );
}

export default SettingsSidebar;
