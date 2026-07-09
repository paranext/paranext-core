import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { Share2 } from 'lucide-react';
import papi from '@papi/frontend';
import { useCanShareLayoutWithTeam } from './use-can-share-layout-with-team.hook';

const ARIA_LABEL_KEY = '%webView_platformScriptureEditor_shareLayout_ariaLabel%';

/**
 * Localization keys used by {@link ShareLayoutButton}. Spread these into the editor web-view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const SHARE_LAYOUT_BUTTON_STRING_KEYS = Object.freeze([ARIA_LABEL_KEY] as const);

export type ShareLayoutButtonStringKey = (typeof SHARE_LAYOUT_BUTTON_STRING_KEYS)[number];

export type ShareLayoutButtonLocalizedStrings = {
  [key in ShareLayoutButtonStringKey]?: string;
};

const localize = (strings: ShareLayoutButtonLocalizedStrings, key: ShareLayoutButtonStringKey) =>
  strings[key] ?? key;

export type ShareLayoutButtonProps = {
  /** The project whose layout would be shared. */
  projectId: string | undefined;
  /** Localized strings for the tooltip and aria-label. Falls back to the key if not provided. */
  localizedStrings?: ShareLayoutButtonLocalizedStrings;
  /** CSS class name for the button. */
  className?: string;
};

/**
 * Toolbar button that opens the Share Layout with Team dialog for a project. Renders nothing for
 * non-admins and while the permission check is loading, since the project data provider's
 * `canUserWriteProjectTextConnectionSettings()` (project-admin authority) says non-admins cannot
 * use this action — mirrors `StructureProtectionButton`'s admin-only project lock button, which
 * hides the same way for the same reason. This button previously lived as a "Share Layout with
 * Team…" entry in the scripture editor's native topMenu, but that contribution model has no way to
 * conditionally hide an item, so the action moved here where a permission check can gate it.
 */
export function ShareLayoutButton({
  projectId,
  localizedStrings = {},
  className,
}: ShareLayoutButtonProps) {
  const { canShareLayout, isLoading } = useCanShareLayoutWithTeam(projectId);

  if (isLoading || !canShareLayout) return undefined;

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
            <Share2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
