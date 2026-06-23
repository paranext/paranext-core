import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useStructureProtectionState } from './use-structure-protection-state.hook';

const PROTECTED_KEY = '%webView_platformScriptureEditor_structureProtection_protected%';
const EDITABLE_KEY = '%webView_platformScriptureEditor_structureProtection_editable%';
const LOCKED_BY_ADMIN_KEY = '%webView_platformScriptureEditor_structureProtection_lockedByAdmin%';
const ARIA_LABEL_KEY = '%webView_platformScriptureEditor_structureProtection_ariaLabel%';

/**
 * Localization keys used by {@link StructureProtectionButton}. Spread these into the editor
 * web-view's localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const STRUCTURE_PROTECTION_BUTTON_STRING_KEYS = Object.freeze([
  PROTECTED_KEY,
  EDITABLE_KEY,
  LOCKED_BY_ADMIN_KEY,
  ARIA_LABEL_KEY,
] as const);

export type StructureProtectionButtonLocalizedStrings = {
  [key in (typeof STRUCTURE_PROTECTION_BUTTON_STRING_KEYS)[number]]?: string;
};

const localize = (
  strings: StructureProtectionButtonLocalizedStrings,
  key: keyof StructureProtectionButtonLocalizedStrings,
) => strings[key] ?? key;

export type StructureProtectionButtonProps = {
  /** The project whose structure-protection state this button controls. */
  projectId: string | undefined;
  /** Localized strings for the tooltip and aria-label. Falls back to the key if not provided. */
  localizedStrings?: StructureProtectionButtonLocalizedStrings;
  /** CSS class name for the button. */
  className?: string;
};

/**
 * Lock/unlock button shown in the editor tab header. Reflects the effective structure-protection
 * state and toggles either the team-wide project setting (admin) or the personal user setting
 * (non-admin). Disabled with a "locked by admin" tooltip for non-admins when the admin has locked
 * the project. Toggle is also bound to Ctrl/Cmd+Shift+L.
 */
export function StructureProtectionButton({
  projectId,
  localizedStrings = {},
  className,
}: StructureProtectionButtonProps) {
  const { isProtected, isAdminProtected, canAdminToggle, setAdminProtection, setUserProtection } =
    useStructureProtectionState(projectId);

  const isDisabled = !canAdminToggle && isAdminProtected;

  const handleToggle = useCallback(() => {
    if (canAdminToggle) {
      // Admin: set the team-wide project setting AND the admin's own user setting to the new state.
      // The hook does not bind an admin to the project lock, so isProtected (which drives the icon)
      // follows the user setting; writing both keeps them in sync and lets the admin's own icon flip
      // on click while still imposing the lock team-wide.
      const newIsProtected = !isProtected;
      setAdminProtection(newIsProtected);
      setUserProtection(newIsProtected);
    } else if (!isAdminProtected) {
      // Non-admin, project not locked: toggle the personal user setting.
      setUserProtection(!isProtected);
    }
    // Non-admin + project locked: disabled, no-op.
  }, [canAdminToggle, isAdminProtected, isProtected, setAdminProtection, setUserProtection]);

  // Auto-open the tooltip whenever the effective protection state changes, so the change is not
  // silent. Radix closes it again on the next outside interaction (click-away, scroll, blur, Escape)
  // via onOpenChange.
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const prevIsProtected = useRef(isProtected);
  useEffect(() => {
    if (prevIsProtected.current !== isProtected) {
      prevIsProtected.current = isProtected;
      setTooltipOpen(true);
    }
  }, [isProtected]);

  // PT-4013: coordinate the "admin locked structure mid-session" warning here.
  // Fires on a non-admin (!canAdminToggle) isAdminProtected false->true transition, guarded by a
  // useRef of the previous value so it does NOT fire on initial mount. Deferred from PT-4016 — needs
  // the real hook's live setting feed and must fire at the same moment as PT-4013's keyboard-
  // enforcement warning.

  // Ctrl/Cmd+Shift+L toggles protection. DOM-level listener is correct here — this is a UI toggle,
  // not a Lexical edit (enforcement uses KEY_DOWN_COMMAND in PT-4013/PT-4014).
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'l') {
        if (isDisabled) return;
        event.preventDefault();
        handleToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleToggle, isDisabled]);

  let tooltipText: string;
  if (isDisabled) tooltipText = localize(localizedStrings, LOCKED_BY_ADMIN_KEY);
  else if (isProtected) tooltipText = localize(localizedStrings, PROTECTED_KEY);
  else tooltipText = localize(localizedStrings, EDITABLE_KEY);

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>
          <Button
            aria-label={localize(localizedStrings, ARIA_LABEL_KEY)}
            className={className}
            size="icon"
            variant="ghost"
            disabled={isDisabled}
            onClick={handleToggle}
          >
            {isProtected ? <ShieldCheck /> : <ShieldOff />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default StructureProtectionButton;
