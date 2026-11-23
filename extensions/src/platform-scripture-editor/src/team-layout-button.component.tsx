import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
} from 'platform-bible-react';
import { useProjectDataProvider } from '@papi/frontend/react';
import { useCallback } from 'react';
import { PanelsTopLeft } from 'lucide-react';
import papi from '@papi/frontend';

const ARIA_LABEL_KEY = '%webView_platformScriptureEditor_teamLayout_ariaLabel%';

/**
 * Localization keys used by {@link TeamLayoutButton}. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const TEAM_LAYOUT_BUTTON_STRING_KEYS = Object.freeze([ARIA_LABEL_KEY] as const);

export type TeamLayoutButtonStringKey = (typeof TEAM_LAYOUT_BUTTON_STRING_KEYS)[number];

export type TeamLayoutButtonLocalizedStrings = {
  [key in TeamLayoutButtonStringKey]?: string;
};

const localize = (strings: TeamLayoutButtonLocalizedStrings, key: TeamLayoutButtonStringKey) =>
  strings[key] ?? key;

export type TeamLayoutButtonProps = {
  /** The project whose layout would be shared. */
  projectId: string | undefined;
  /** Localized strings for the tooltip and aria-label. Falls back to the key if not provided. */
  localizedStrings?: TeamLayoutButtonLocalizedStrings;
  /** CSS class name for the button. */
  className?: string;
};

/**
 * Toolbar button that opens the Team layout dialog for a project. Renders nothing for non-admins
 * and while the permission check is loading, since the project data provider's
 * `canUserWriteProjectTextConnectionSettings()` (project-admin authority) says non-admins cannot
 * use this action. The action lives on the toolbar rather than in the scripture editor's native
 * topMenu because that contribution model has no way to conditionally hide an item, and a toolbar
 * button can be gated by a permission check.
 */
export function TeamLayoutButton({
  projectId,
  localizedStrings = {},
  className,
}: TeamLayoutButtonProps) {
  const textConnectionsPdp = useProjectDataProvider(
    'platformScripture.textConnectionSettings',
    projectId,
  );

  // Same canUserWriteProjectTextConnectionSettings()-via-usePromise pattern as the identical check
  // in team-layout.dialog.tsx's admin gate.
  const [canEditTeamLayout, isLoading] = usePromise(
    useCallback(
      async () => textConnectionsPdp?.canUserWriteProjectTextConnectionSettings(),
      [textConnectionsPdp],
    ),
    undefined,
  );

  if (isLoading || canEditTeamLayout !== true) return undefined;

  const label = localize(localizedStrings, ARIA_LABEL_KEY);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label={label}
            className={className}
            size="icon"
            variant="ghost"
            onClick={() => {
              if (!projectId) return;
              papi.dialogs.showDialog('platform.shareLayoutDialog', { projectId, isModal: true });
            }}
          >
            <PanelsTopLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
