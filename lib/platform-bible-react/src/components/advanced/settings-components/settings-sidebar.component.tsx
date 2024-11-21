import ComboBox, { ComboBoxOption } from '@/components/basics/combo-box.component';
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
import { useCallback } from 'react';

export type SelectedSettingsSidebarItem = {
  label: string;
  projectId?: string;
};

export type ProjectOptions = { projectId: string; projectName: string };

export type SettingsSidebarProps = {
  /** Optional id for testing */
  id?: string;

  /** Extension labels from contribution */
  extensionLabels: string[];

  /** Project names and ids */
  projectOptions: ProjectOptions[];

  /** Handler for selecting a sidebar item */
  handleSelectSidebarItem: (key: string, projectId?: string) => void;

  /** The current selected value in the sidebar */
  selectedSidebarItem: SelectedSettingsSidebarItem | undefined;
};

export default function SettingsSidebar({
  id,
  extensionLabels,
  projectOptions,
  handleSelectSidebarItem,
  selectedSidebarItem,
}: SettingsSidebarProps) {
  const handleSelectItem = useCallback(
    (item: string, projectId?: string) => {
      handleSelectSidebarItem(item, projectId);
    },
    [handleSelectSidebarItem],
  );

  const getProjectNameFromProjectId = useCallback(
    (projectId: string) => {
      const project = projectOptions.find((option) => option.projectId === projectId);
      return project ? project.projectName : projectId;
    },
    [projectOptions],
  );

  return (
    <Sidebar id={id} collapsible="offcanvas" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Extensions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {extensionLabels.map((label) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    onClick={() => handleSelectItem(label)}
                    isActive={
                      !selectedSidebarItem?.projectId && label === selectedSidebarItem?.label
                    }
                  >
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <ComboBox
              popoverContentClassName="tw-z-[1000]"
              options={projectOptions.flatMap((option) => option.projectId)}
              getOptionLabel={(projectId: ComboBoxOption) => {
                // This function expects a ComboBoxOption, but we know it is a string
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                return getProjectNameFromProjectId(projectId as string);
              }}
              buttonPlaceholder="Type or select project"
              onChange={(projectId: string) => {
                const selectedProjectName = getProjectNameFromProjectId(projectId);
                handleSelectItem(selectedProjectName, projectId);
              }}
              value={selectedSidebarItem?.projectId ?? undefined}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
