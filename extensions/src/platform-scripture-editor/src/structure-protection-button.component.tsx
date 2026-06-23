import {
  Button,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

export type StructureProtectionButtonViewProps = {
  /** Effective protection state — drives the icon and tooltip text. */
  isProtected: boolean;
  /** When `true` the button is disabled and the toggle (click + shortcut) is a no-op. */
  isDisabled: boolean;
  /** Invoked on click or Ctrl/Cmd+Shift+L when not disabled. */
  onToggle: () => void;
  /** Localized strings for the tooltip and aria-label. Falls back to the key if not provided. */
  localizedStrings?: StructureProtectionButtonLocalizedStrings;
  /** CSS class name for the button. */
  className?: string;
};

/**
 * Presentational lock/unlock button. Takes the effective protection state and a toggle handler as
 * props (no PAPI dependency), so it can be rendered in isolation — e.g. in Storybook and tests. The
 * connected {@link StructureProtectionButton} supplies the state from
 * {@link useStructureProtectionState}.
 *
 * Owns the view-only behavior: the controlled tooltip that auto-opens on a protection-state change,
 * the Ctrl/Cmd+Shift+L shortcut, and the OS-appropriate shortcut hint.
 */
export function StructureProtectionButtonView({
  isProtected,
  isDisabled,
  onToggle,
  localizedStrings = {},
  className,
}: StructureProtectionButtonViewProps) {
  // Render the Ctrl/Cmd+Shift+L shortcut hint with OS-appropriate symbols, matching the editor
  // web-view's `/Macintosh/i` detection. Not localized — these are keyboard key symbols.
  const isMac = useMemo(() => /Macintosh/i.test(navigator.userAgent), []);
  const shortcutHint = isMac ? '⇧⌘L' : 'Ctrl+Shift+L';

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

  // Ctrl/Cmd+Shift+L toggles protection. DOM-level listener is correct here — this is a UI toggle,
  // not a Lexical edit (enforcement uses KEY_DOWN_COMMAND in PT-4013/PT-4014).
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'l') {
        if (isDisabled) return;
        event.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle, isDisabled]);

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
            onClick={onToggle}
          >
            {isProtected ? <ShieldCheck /> : <ShieldOff />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="tw:flex tw:items-center tw:gap-2">
            <span>{tooltipText}</span>
            {/* Hidden when disabled: the shortcut is a no-op while the project is admin-locked. */}
            {!isDisabled && <Kbd>{shortcutHint}</Kbd>}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

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

  // PT-4013: coordinate the "admin locked structure mid-session" warning here.
  // Fires on a non-admin (!canAdminToggle) isAdminProtected false->true transition, guarded by a
  // useRef of the previous value so it does NOT fire on initial mount. Deferred from PT-4016 — needs
  // the real hook's live setting feed and must fire at the same moment as PT-4013's keyboard-
  // enforcement warning.

  return (
    <StructureProtectionButtonView
      isProtected={isProtected}
      isDisabled={isDisabled}
      onToggle={handleToggle}
      localizedStrings={localizedStrings}
      className={className}
    />
  );
}

export default StructureProtectionButton;
