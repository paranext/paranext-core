import { ComboBox } from '@/components/basics/combo-box.component';
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
import { cn } from '@/utils/shadcn-ui.util';
import { ScrollText } from 'lucide-react';
import { useCallback } from 'react';

export type SelectedSettingsSidebarItem = {
  label: string;
  projectId?: string;
};

export type ProjectInfo = { projectId: string; projectName: string };

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

  const getIsActive: (label: string) => boolean = useCallback(
    (label: string) => !selectedSidebarItem.projectId && label === selectedSidebarItem.label,
    [selectedSidebarItem],
  );

  return (
    <Sidebar
      id={id}
      collapsible="none"
      variant="inset"
      className={cn('tw-w-96 tw-gap-2 tw-overflow-y-auto', className)}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tw-text-sm">
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
                    <span className="tw-pl-3">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="tw-text-sm">{projectsSidebarGroupLabel}</SidebarGroupLabel>
          <SidebarGroupContent className="tw-pl-3">
            <ComboBox
              buttonVariant="ghost"
              buttonClassName={cn('tw-w-full', {
                'tw-bg-sidebar-accent tw-text-sidebar-accent-foreground':
                  selectedSidebarItem?.projectId,
              })}
              popoverContentClassName="tw-z-[1000]"
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

export default SettingsSidebar;
