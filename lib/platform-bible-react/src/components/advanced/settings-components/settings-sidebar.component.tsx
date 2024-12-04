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
import { cn } from '@/utils/shadcn-ui.util';
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
  extensionLabels: string[];

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
};

export default function SettingsSidebar({
  id,
  extensionLabels,
  projectInfo,
  handleSelectSidebarItem,
  selectedSidebarItem,
  extensionsSidebarGroupLabel,
  projectsSidebarGroupLabel,
  buttonPlaceholderText,
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
      className="tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tw-text-sm tw-text-gray-400">
            {extensionsSidebarGroupLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {extensionLabels.map((label) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    className={cn(
                      'tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white',
                      { 'tw-bg-white tw-text-gray-900 tw-shadow-sm': getIsActive(label) },
                    )}
                    onClick={() => handleSelectItem(label)}
                    isActive={getIsActive(label)}
                  >
                    <span className="tw-pl-3">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="tw-text-sm tw-text-gray-400">
            {projectsSidebarGroupLabel}
          </SidebarGroupLabel>
          <SidebarGroupContent className="tw-pl-3">
            <ComboBox
              popoverContentClassName="tw-z-[1000]"
              options={projectInfo.flatMap((info) => info.projectId)}
              getOptionLabel={(projectId: ComboBoxOption) => {
                // This function expects a ComboBoxOption, but we know it is a string
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                return getProjectNameFromProjectId(projectId as string);
              }}
              buttonPlaceholder={buttonPlaceholderText}
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
