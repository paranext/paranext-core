import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../../shadcn-ui/sidebar';

export type SettingsSidebarProps = {
  /** Optional id */
  id?: string;

  /** Extension labels to list in sidebar */
  extensionLabels: string[];

  /** Project labels to list in sidebar */
  // projectLabels: string[];

  handleSelectSidebarItem: (key: string, isProjectSetting: boolean) => void;
};

export default function SettingsSidebar({
  id,
  extensionLabels,
  // projectLabels,
  handleSelectSidebarItem,
}: SettingsSidebarProps) {
  const [selectedItem, setSelectedItem] = useState<string>();

  const handleSelectItem = (item: string, isProjectSetting: boolean) => {
    setSelectedItem(item);
    handleSelectSidebarItem(item, isProjectSetting);
  };

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
                    onClick={() => handleSelectItem(label, false)}
                    isActive={label === selectedItem}
                  >
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projectLabels.map((label) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    onClick={() => handleSelectItem(label)}
                    isActive={label === selectedItem}
                  >
                    {label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
}
