import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from 'platform-bible-react';
import { PenLine, RefreshCw, HelpCircle, CircleUserRound } from 'lucide-react';
import { UserProfileDropdown } from '@renderer/components/user-profile-dropdown.component';

const ICON_CLASS = 'tw-h-6 tw-w-6';

/**
 * Sidebar content for Simple Mode.
 *
 * Always collapsed to icon-only state with large icons. Rendered below the toolbar. Only Study &
 * Draft workflow is implemented. Sync and Help are non-functional placeholders.
 */
export function WorkflowSidebar() {
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Study & Draft" className="tw-h-10">
                <PenLine className={ICON_CLASS} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Sync" disabled className="tw-h-10">
                <RefreshCw className={ICON_CLASS} />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help" disabled className="tw-h-10">
              <HelpCircle className={ICON_CLASS} />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <UserProfileDropdown
              side="right"
              trigger={
                <SidebarMenuButton tooltip="Profile" className="tw-h-10">
                  <CircleUserRound className={ICON_CLASS} />
                </SidebarMenuButton>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

export default WorkflowSidebar;
