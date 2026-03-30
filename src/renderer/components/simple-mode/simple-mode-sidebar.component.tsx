import ProfileDropdown from '@renderer/components/profile-dropdown.component';
import { BookOpen, HelpCircle, RefreshCw } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';

/**
 * Simple mode sidebar with big icon buttons. Always collapsed to icon-only mode. Rendered below the
 * app title bar via the layout structure in SimpleModeLayout.
 */
export default function SimpleModeSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="tw-border-r !tw-h-full [&>div:first-child]:!tw-h-full [&>div:nth-child(2)]:!tw-h-full"
      style={
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        { '--sidebar-width-icon': '4rem' } as React.CSSProperties
      }
    >
      <SidebarContent className="tw-items-center tw-pt-2">
        <SidebarMenu className="tw-gap-3">
          <SidebarMenuItem className="tw-flex tw-justify-center">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    isActive
                    className="tw-h-10 tw-w-10 tw-p-0 tw-flex tw-items-center tw-justify-center"
                  >
                    <BookOpen className="!tw-h-6 !tw-w-6" />
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">Study and draft</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
          <SidebarMenuItem className="tw-flex tw-justify-center">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton className="tw-h-10 tw-w-10 tw-p-0 tw-flex tw-items-center tw-justify-center">
                    <RefreshCw className="!tw-h-6 !tw-w-6" />
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">Sync</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="tw-items-center tw-pb-2">
        <SidebarMenu className="tw-gap-3">
          <SidebarMenuItem className="tw-flex tw-justify-center">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton className="tw-h-10 tw-w-10 tw-p-0 tw-flex tw-items-center tw-justify-center">
                    <HelpCircle className="!tw-h-6 !tw-w-6" />
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">Help</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
          <SidebarMenuItem className="tw-flex tw-justify-center">
            <ProfileDropdown side="right" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
