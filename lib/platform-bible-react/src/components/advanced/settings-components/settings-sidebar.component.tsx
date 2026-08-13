import {
  ProjectSelector,
  type ProjectSelectorProject,
} from '@/components/advanced/project-selector/project-selector.component';
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
import { useCallback, useMemo } from 'react';

export type SelectedSettingsSidebarItem = {
  label: string;
  projectId?: string;
};

export type ProjectInfo = {
  projectId: string;
  /**
   * Short project name — the trigger label for the `<ProjectSelector>` and the primary line of each
   * popover row. Sourced from the `platform.name` project setting.
   */
  projectName: string;
  /**
   * Optional full project name — rendered as the muted secondary line beneath `projectName` in the
   * popover rows. Sourced from the `platform.fullName` project setting. When absent or equal to
   * `projectName`, the row falls back to a single-line layout (matching the {@link ProjectSelector}
   * de-dup rule for `fullName === shortName`).
   */
  projectFullName?: string;
};

export type SettingsSidebarProps = {
  /** Optional id for testing */
  id?: string;

  /** Extension labels from contribution */
  extensionLabels: Record<string, string>;

  /** Project names and ids */
  projectInfo: ProjectInfo[];

  /** Handler for selecting a sidebar item */
  handleSelectSidebarItem: (key: string, projectId?: string) => void;

  /** The current selected value in the sidebar */
  selectedSidebarItem: SelectedSettingsSidebarItem;

  /** Label for the group of extensions setting groups */
  extensionsSidebarGroupLabel: string;

  /** Label for the group of projects settings */
  projectsSidebarGroupLabel: string;

  /** Placeholder text for the button */
  buttonPlaceholderText: string;

  /** Additional css classes to help with unique styling of the sidebar */
  className?: string;
};

/**
 * The SettingsSidebar component is a sidebar that displays a list of extension settings and project
 * settings. It can be used to navigate to different settings pages. Must be wrapped in a
 * SidebarProvider component otherwise produces errors.
 *
 * @param props - {@link SettingsSidebarProps} The props for the component.
 */
export function SettingsSidebar({
  id,
  extensionLabels,
  projectInfo,
  handleSelectSidebarItem,
  selectedSidebarItem,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
  buttonPlaceholderText,
  className,
}: SettingsSidebarProps) {
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

  // Adapt the public `ProjectInfo[]` shape to `ProjectSelectorProject[]` for the canonical
  // <ProjectSelector> trigger. `projectFullName` is optional — when the caller supplies it, each
  // row renders a two-line layout (short name over muted full name), matching how other project
  // selectors in the app (manage-books, checks side panel) display projects. When only the short
  // name is available, we mirror it into `fullName` so the selector's `fullName === shortName`
  // de-dup collapses the row to a single line.
  const projectSelectorProjects = useMemo<ProjectSelectorProject[]>(
    () =>
      projectInfo.map((info) => ({
        id: info.projectId,
        shortName: info.projectName,
        fullName: info.projectFullName ?? info.projectName,
      })),
    [projectInfo],
  );

  const getIsActive: (label: string) => boolean = useCallback(
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
            {/*
              Flex wrapper hosts the leading <ScrollText /> icon outside the ProjectSelector's
              trigger button. ProjectSelector has no built-in icon slot, and adding one solely for
              this consumer would expand its API. The icon was decorative on the prior ComboBox
              (no click handler), so keeping it adjacent to — rather than inside — the trigger
              preserves the visual affordance without bloating the canonical component.

              Open Tabs grouping isn't wired here because the platform-bible-react library is
              intentionally PAPI-free (see CLAUDE.md "Symlinked Directories" / lib boundaries).
              `useOpenProjectTabs` lives in the extension layer; passing `openTabs={[]}` makes the
              ProjectSelector fall back to a flat (non-grouped) list. If a future consumer needs
              the grouping, they can pass `openTabs` in via a new prop on this component.
            */}
            <div
              className={cn(
                'tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded-md tw:px-2 tw:py-1',
                {
                  'tw:bg-sidebar-accent tw:text-sidebar-accent-foreground':
                    selectedSidebarItem?.projectId,
                },
              )}
            >
              <ScrollText className="tw:h-4 tw:w-4 tw:shrink-0" />
              <ProjectSelector
                mode="project"
                projects={projectSelectorProjects}
                openTabs={[]}
                selection={{ projectId: selectedSidebarItem?.projectId ?? '' }}
                onChangeSelection={({ projectId: nextId }) => {
                  if (!nextId) return;
                  const selectedProjectName = getProjectNameFromProjectId(nextId);
                  handleSelectItem(selectedProjectName, nextId);
                }}
                buttonVariant="ghost"
                buttonClassName="tw:h-8 tw:w-full tw:flex-1 tw:justify-start tw:font-normal"
                buttonPlaceholder={buttonPlaceholderText}
                ariaLabel={projectsSidebarGroupLabel}
                triggerLabelFormat="shortNameAndFullName"
                // TODO: Check if this z-index override is necessary — the PopoverContent default
                // (Z_INDEX_ABOVE_DOCK = 250) may be sufficient since this dropdown portals to body
                popoverContentStyle={{ zIndex: Z_INDEX_OVERLAY }}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SettingsSidebar;
