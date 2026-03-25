/** Simple Mode sidebar — shows Study & Draft workflow indicator, Help, and User Profile trigger. */

import { PenLine, HelpCircle, CircleUser } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'platform-bible-react';

const TOOLTIP_DELAY = 300;

interface SidebarProps {
  onUserProfileClick: () => void;
}

export function Sidebar({ onUserProfileClick }: SidebarProps) {
  return (
    <div className="simple-mode-sidebar">
      {/* Study & Draft — active workflow */}
      <TooltipProvider delayDuration={TOOLTIP_DELAY}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="simple-mode-sidebar-btn simple-mode-sidebar-btn-active"
              aria-label="Study & Draft"
            >
              <PenLine className="tw-w-5 tw-h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="tw-font-light">Study &amp; Draft</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Spacer */}
      <div className="tw-flex-1" />

      {/* Help */}
      <TooltipProvider delayDuration={TOOLTIP_DELAY}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button" className="simple-mode-sidebar-btn" aria-label="Help">
              <HelpCircle className="tw-w-5 tw-h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="tw-font-light">Help</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* User Profile */}
      <TooltipProvider delayDuration={TOOLTIP_DELAY}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="simple-mode-sidebar-btn"
              onClick={onUserProfileClick}
              aria-label="User Profile"
            >
              <CircleUser className="tw-w-5 tw-h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="tw-font-light">User Profile</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
