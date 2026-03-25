import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from 'platform-bible-react';
import { PenLine, RefreshCw, HelpCircle, CircleUserRound } from 'lucide-react';
import { UserProfileDropdown } from '@renderer/components/user-profile-dropdown.component';

/**
 * Sidebar content for Simple Mode.
 *
 * Renders inside the shadcn `Sidebar` shell provided by `simple-mode-layout.component.tsx`.
 * Currently only implements the Study & Draft workflow. Sync and Help are visible but
 * non-functional placeholders.
 */
export function WorkflowSidebar() {
  return (
    <>
      <SidebarHeader className="tw-p-2">
        {/* Could hold a collapsed logo or brand mark in the future */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Study & Draft">
                <PenLine />
                <span>Study &amp; Draft</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sync" disabled>
                <RefreshCw />
                <span>Sync</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help" disabled>
              <HelpCircle />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <UserProfileDropdown
              trigger={
                <SidebarMenuButton tooltip="Profile">
                  <CircleUserRound />
                  <span>Profile</span>
                </SidebarMenuButton>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </>
  );
}

export default WorkflowSidebar;
