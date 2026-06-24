import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { Lock, LockOpen, Shield, ShieldOff } from 'lucide-react';
import { useStructureProtectionState } from './use-structure-protection-state.hook';

const LOCK_STRUCTURE_KEY = '%webView_platformScriptureEditor_structureProtection_lockStructure%';
const UNLOCK_STRUCTURE_KEY =
  '%webView_platformScriptureEditor_structureProtection_unlockStructure%';
const LOCKED_BY_ADMIN_KEY = '%webView_platformScriptureEditor_structureProtection_lockedByAdmin%';
const ARIA_LABEL_KEY = '%webView_platformScriptureEditor_structureProtection_ariaLabel%';
const LOCK_STRUCTURE_FOR_PROJECT_KEY =
  '%webView_platformScriptureEditor_structureProtection_lockStructureForProject%';
const UNLOCK_STRUCTURE_FOR_PROJECT_KEY =
  '%webView_platformScriptureEditor_structureProtection_unlockStructureForProject%';
const PROJECT_ARIA_LABEL_KEY =
  '%webView_platformScriptureEditor_structureProtection_projectAriaLabel%';

/**
 * Localization keys used by {@link StructureProtectionButton}. Spread these into the editor
 * web-view's localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const STRUCTURE_PROTECTION_BUTTON_STRING_KEYS = Object.freeze([
  LOCK_STRUCTURE_KEY,
  UNLOCK_STRUCTURE_KEY,
  LOCK_STRUCTURE_FOR_PROJECT_KEY,
  UNLOCK_STRUCTURE_FOR_PROJECT_KEY,
  LOCKED_BY_ADMIN_KEY,
  ARIA_LABEL_KEY,
  PROJECT_ARIA_LABEL_KEY,
] as const);

export type StructureProtectionStringKey = (typeof STRUCTURE_PROTECTION_BUTTON_STRING_KEYS)[number];

export type StructureProtectionButtonLocalizedStrings = {
  [key in StructureProtectionStringKey]?: string;
};

const localize = (
  strings: StructureProtectionButtonLocalizedStrings,
  key: StructureProtectionStringKey,
) => strings[key] ?? key;

/** A keyboard shortcut: a predicate over keydown events plus the OS-appropriate display hint. */
export type ShortcutSpec = {
  /** Returns `true` when the event matches this shortcut. */
  matches: (event: KeyboardEvent) => boolean;
  /** The hint shown in the tooltip (e.g. `⇧⌘L` or `Ctrl+Shift+L`). Not localized — key symbols. */
  hint: string;
};

export type LockToggleButtonViewProps = {
  /** `true` when the controlled thing is locked — drives the icon, variant, and tooltip action. */
  isLocked: boolean;
  /** When `true` the button is disabled and the toggle (click + shortcut) is a no-op. */
  isDisabled: boolean;
  /** Invoked on click or matching shortcut when not disabled. */
  onToggle: () => void;
  /** Icon shown while locked. */
  lockedIcon: ReactNode;
  /** Icon shown while unlocked. */
  unlockedIcon: ReactNode;
  /** Tooltip shown while unlocked — names the lock action a click performs. */
  lockTooltipKey: StructureProtectionStringKey;
  /** Tooltip shown while locked — names the unlock action a click performs. */
  unlockTooltipKey: StructureProtectionStringKey;
  /** Tooltip shown while disabled. Falls back to the lock/unlock tooltip if omitted. */
  disabledTooltipKey?: StructureProtectionStringKey;
  /** Localization key for the button's aria-label. */
  ariaLabelKey: StructureProtectionStringKey;
  /** The keyboard shortcut bound while enabled. */
  shortcut: ShortcutSpec;
  /** Localized strings for the tooltip and aria-label. Falls back to the key if not provided. */
  localizedStrings?: StructureProtectionButtonLocalizedStrings;
  /** CSS class name for the button. */
  className?: string;
};

/**
 * Presentational lock/unlock icon button. Takes the locked state, icon pair, tooltip keys, and a
 * shortcut as props (no PAPI dependency), so it can be rendered in isolation — e.g. in Storybook
 * and tests. The unlocked state uses the destructive button variant as a warning cue.
 *
 * Owns the view-only behavior: the controlled tooltip that auto-opens on a state change, the bound
 * keyboard shortcut, and the shortcut hint.
 */
export function LockToggleButtonView({
  isLocked,
  isDisabled,
  onToggle,
  lockedIcon,
  unlockedIcon,
  lockTooltipKey,
  unlockTooltipKey,
  disabledTooltipKey,
  ariaLabelKey,
  shortcut,
  localizedStrings = {},
  className,
}: LockToggleButtonViewProps) {
  // The visible state. Drives both the tooltip text and the auto-open trigger, so the two can never
  // disagree. 'disabled' takes precedence because the disabled button shows its own tooltip text
  // regardless of the underlying locked value.
  let displayState: 'disabled' | 'locked' | 'unlocked';
  if (isDisabled) displayState = 'disabled';
  else if (isLocked) displayState = 'locked';
  else displayState = 'unlocked';

  // Auto-open the tooltip whenever the visible state changes, so the change is not silent (NN6).
  // Radix closes it again on click-away and Escape via onOpenChange; scroll dismissal is handled by
  // the effect below.
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const prevDisplayState = useRef(displayState);
  useEffect(() => {
    if (prevDisplayState.current !== displayState) {
      prevDisplayState.current = displayState;
      setTooltipOpen(true);
    }
  }, [displayState]);

  // Close the tooltip on scroll. Radix closes the controlled tooltip on click-away and Escape, but
  // not on scroll, and this button sits in the toolbar while content scrolls in a separate
  // container. Capture phase catches scroll from any element (scroll events do not bubble).
  useEffect(() => {
    if (!tooltipOpen) return undefined;
    const close = () => setTooltipOpen(false);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [tooltipOpen]);

  // The shortcut toggles the lock. DOM-level listener is correct here — this is a UI toggle, not a
  // Lexical edit (enforcement uses KEY_DOWN_COMMAND in PT-4013/PT-4014).
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!shortcut.matches(event)) return;
      if (isDisabled) return;
      event.preventDefault();
      onToggle();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcut, onToggle, isDisabled]);

  let tooltipKey: StructureProtectionStringKey;
  if (isDisabled && disabledTooltipKey) tooltipKey = disabledTooltipKey;
  else tooltipKey = isLocked ? unlockTooltipKey : lockTooltipKey;

  // Unlocked + enabled is the "danger" state (structure is editable) — warn with the destructive
  // variant. Locked and disabled states stay ghost.
  const variant = !isLocked && !isDisabled ? 'destructive' : 'ghost';

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>
          <Button
            aria-label={localize(localizedStrings, ariaLabelKey)}
            className={className}
            size="icon"
            variant={variant}
            disabled={isDisabled}
            onClick={onToggle}
          >
            {isLocked ? lockedIcon : unlockedIcon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="tw:flex tw:items-center tw:gap-2">
            <span>{localize(localizedStrings, tooltipKey)}</span>
            {/* Hidden when disabled: the shortcut is a no-op while the button is disabled. */}
            {!isDisabled && <Kbd>{shortcut.hint}</Kbd>}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export type StructureProtectionButtonProps = {
  /** The project whose structure-protection state this button controls. */
  projectId: string | undefined;
  /** Localized strings for the tooltips and aria-labels. Falls back to the key if not provided. */
  localizedStrings?: StructureProtectionButtonLocalizedStrings;
  /** CSS class name applied to each button. */
  className?: string;
};

/**
 * Structure-protection controls shown in the editor tab header. Renders a personal lock button
 * (toggles the user's own preference, Ctrl/Cmd+Shift+L) for all users, plus an admin-only project
 * lock button to its right (toggles the team-wide setting, Ctrl/Cmd+Alt+Shift+L) when the user can
 * write project settings. The two are independent. The personal button is disabled with a "locked
 * by admin" tooltip for non-admins when the admin has locked the project.
 */
export function StructureProtectionButton({
  projectId,
  localizedStrings = {},
  className,
}: StructureProtectionButtonProps) {
  const {
    isStructureProtected,
    isAdminProtected,
    canAdminToggle,
    setAdminProtection,
    setUserProtection,
  } = useStructureProtectionState(projectId);

  // OS-appropriate shortcut symbols, matching the editor web-view's `/Macintosh/i` detection.
  const isMac = useMemo(() => /Macintosh/i.test(navigator.userAgent), []);

  const personalDisabled = !canAdminToggle && isAdminProtected;

  const handlePersonalToggle = useCallback(() => {
    if (personalDisabled) return;
    setUserProtection(!isStructureProtected);
  }, [personalDisabled, isStructureProtected, setUserProtection]);

  const handleProjectToggle = useCallback(() => {
    setAdminProtection(!isAdminProtected);
  }, [isAdminProtected, setAdminProtection]);

  // `!event.altKey` keeps the personal shortcut distinct from the admin combo below.
  const personalShortcut = useMemo<ShortcutSpec>(
    () => ({
      matches: (event) =>
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        !event.altKey &&
        event.key.toLowerCase() === 'l',
      hint: isMac ? '⇧⌘L' : 'Ctrl+Shift+L',
    }),
    [isMac],
  );

  const projectShortcut = useMemo<ShortcutSpec>(
    () => ({
      matches: (event) =>
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.altKey &&
        event.key.toLowerCase() === 'l',
      hint: isMac ? '⌥⇧⌘L' : 'Ctrl+Alt+Shift+L',
    }),
    [isMac],
  );

  return (
    <div className="tw:flex tw:flex-row tw:items-center tw:gap-1">
      <LockToggleButtonView
        isLocked={isStructureProtected}
        isDisabled={personalDisabled}
        onToggle={handlePersonalToggle}
        lockedIcon={<Lock />}
        unlockedIcon={<LockOpen />}
        lockTooltipKey={LOCK_STRUCTURE_KEY}
        unlockTooltipKey={UNLOCK_STRUCTURE_KEY}
        disabledTooltipKey={LOCKED_BY_ADMIN_KEY}
        ariaLabelKey={ARIA_LABEL_KEY}
        shortcut={personalShortcut}
        localizedStrings={localizedStrings}
        className={className}
      />
      {canAdminToggle && (
        <LockToggleButtonView
          isLocked={isAdminProtected}
          isDisabled={false}
          onToggle={handleProjectToggle}
          lockedIcon={<Shield />}
          unlockedIcon={<ShieldOff />}
          lockTooltipKey={LOCK_STRUCTURE_FOR_PROJECT_KEY}
          unlockTooltipKey={UNLOCK_STRUCTURE_FOR_PROJECT_KEY}
          ariaLabelKey={PROJECT_ARIA_LABEL_KEY}
          shortcut={projectShortcut}
          localizedStrings={localizedStrings}
          className={className}
        />
      )}
    </div>
  );
}

export default StructureProtectionButton;
