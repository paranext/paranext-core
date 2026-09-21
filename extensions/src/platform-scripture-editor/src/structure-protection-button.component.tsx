import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  isMacOs,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { Lock, LockOpen } from 'lucide-react';
import { useStructureProtectionState } from './use-structure-protection-state.hook';

const LOCKED_BY_ADMIN_KEY = '%webView_platformScriptureEditor_structureProtection_lockedByAdmin%';
const ARIA_LABEL_KEY = '%webView_platformScriptureEditor_structureProtection_ariaLabel%';
const ERROR_LOADING_KEY = '%webView_platformScriptureEditor_structureProtection_errorLoading%';
const STATE_EDITABLE_KEY = '%webView_platformScriptureEditor_structureProtection_stateEditable%';
const STATE_PROTECTED_KEY = '%webView_platformScriptureEditor_structureProtection_stateProtected%';

/**
 * Localization keys used by {@link StructureProtectionButton}. Spread these into the editor
 * web-view's localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const STRUCTURE_PROTECTION_BUTTON_STRING_KEYS = Object.freeze([
  LOCKED_BY_ADMIN_KEY,
  ARIA_LABEL_KEY,
  ERROR_LOADING_KEY,
  STATE_EDITABLE_KEY,
  STATE_PROTECTED_KEY,
] as const);

export type StructureProtectionStringKey = (typeof STRUCTURE_PROTECTION_BUTTON_STRING_KEYS)[number];

export type StructureProtectionButtonLocalizedStrings = {
  [key in StructureProtectionStringKey]?: string;
};

const localize = (
  strings: StructureProtectionButtonLocalizedStrings,
  key: StructureProtectionStringKey,
) => strings[key] ?? key;

/**
 * How long a tooltip opened by a state change (rather than by hovering) stays up before dismissing
 * itself. Long enough to read a short state sentence plus its shortcut hint, short enough that a
 * tooltip nobody is pointing at does not outstay the change it is reporting.
 */
const AUTO_OPEN_TOOLTIP_DURATION_MS = 3000;

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
  /** Tooltip shown while unlocked — reports that state, rather than naming a click's action. */
  unlockedTooltipKey: StructureProtectionStringKey;
  /** Tooltip shown while locked — reports that state, rather than naming a click's action. */
  lockedTooltipKey: StructureProtectionStringKey;
  /** Tooltip shown while disabled, in place of the state tooltip. */
  disabledTooltipKey: StructureProtectionStringKey;
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
  unlockedTooltipKey,
  lockedTooltipKey,
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

  // Auto-open the tooltip whenever the visible state changes, so the change is never silent.
  // Radix closes it again on click-away and Escape via onOpenChange; scroll dismissal is handled by
  // the effect below, and the auto-dismiss timer covers the case where none of those ever fire.
  const [tooltipOpen, setTooltipOpen] = useState(false);
  // Distinguishes the two ways this controlled tooltip opens. Radix routes hover and focus opens
  // through `onOpenChange`; a programmatic `setTooltipOpen(true)` does not, so setting the ref in
  // the state-change effect and clearing it in `onOpenChange` tells the timer below which kind of
  // open it is looking at.
  const wasAutoOpenedRef = useRef(false);
  const prevDisplayState = useRef(displayState);
  useEffect(() => {
    if (prevDisplayState.current !== displayState) {
      prevDisplayState.current = displayState;
      wasAutoOpenedRef.current = true;
      setTooltipOpen(true);
    }
  }, [displayState]);

  // The effect above opens the tooltip without a hover, so there may be no pointer on the button
  // and no focus in it — and then NONE of Radix's dismissal paths can fire: no pointerleave, no
  // blur, and (while a modal covers this web view's iframe) no click-away or Escape either, since
  // the iframe stops receiving input entirely. Without this timer such a tooltip stays on screen
  // indefinitely, over whatever opened the modal. Hovering re-opens it, so it stays reachable.
  //
  // Scoped to auto-opens only. A hover-opened tooltip must stay up until the pointer leaves (WCAG
  // 1.4.13), and it could not come back if it did not: Radix gates its pointer-move open to once per
  // hover session, so a tooltip dismissed under a stationary pointer stays gone until the pointer
  // leaves and returns.
  useEffect(() => {
    if (!tooltipOpen || !wasAutoOpenedRef.current) return undefined;
    const timeoutId = setTimeout(() => setTooltipOpen(false), AUTO_OPEN_TOOLTIP_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [tooltipOpen]);

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
  if (isDisabled) tooltipKey = disabledTooltipKey;
  else tooltipKey = isLocked ? lockedTooltipKey : unlockedTooltipKey;

  // Unlocked + enabled is the "danger" state (structure is editable) — warn with the destructive
  // variant. Locked and disabled states stay ghost.
  const variant = !isLocked && !isDisabled ? 'destructive' : 'ghost';

  return (
    <TooltipProvider>
      <Tooltip
        open={tooltipOpen}
        onOpenChange={(open) => {
          // Only a hover or focus open reaches here, so this open is not an auto-open.
          wasAutoOpenedRef.current = false;
          setTooltipOpen(open);
        }}
      >
        <TooltipTrigger asChild>
          <Button
            aria-label={localize(localizedStrings, ariaLabelKey)}
            // The accessible name is a constant "Toggle structure protection", and the state lives
            // in a tooltip that is not a live region — so without this a screen-reader user pressing
            // the shortcut is told nothing about whether structure is now locked or editable.
            aria-pressed={isLocked}
            className={className}
            size="icon"
            variant={variant}
            disabled={isDisabled}
            onClick={onToggle}
          >
            {isLocked ? <Lock /> : <LockOpen />}
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
  /** CSS class name for the button. */
  className?: string;
};

/**
 * Personal structure-protection control shown in the editor tab header: toggles the user's own
 * preference (Ctrl/Cmd+Shift+L). Disabled with a "locked by admin" tooltip for non-admins when the
 * admin has locked the project for the whole team — that team-wide lock is set from the Team layout
 * dialog, not from here.
 */
export function StructureProtectionButton({
  projectId,
  localizedStrings = {},
  className,
}: StructureProtectionButtonProps) {
  const {
    isStructureProtected,
    isProtectedByAdmin,
    adminSettingError,
    canAdminToggle,
    isProtectionActive,
    setUserProtection,
  } = useStructureProtectionState(projectId);

  // OS-appropriate shortcut symbols.
  const isMac = isMacOs();

  // When the admin (project-level) setting failed to load, the protection values fall back to
  // treating the admin layer as unset, so we can't trust them. Disable the toggle and surface the
  // error via the tooltip rather than letting the user act on a possibly-wrong state.
  const hasAdminError = adminSettingError !== undefined;

  const personalDisabled = hasAdminError || (!canAdminToggle && isProtectedByAdmin);
  const personalDisabledTooltipKey = hasAdminError ? ERROR_LOADING_KEY : LOCKED_BY_ADMIN_KEY;

  const handlePersonalToggle = useCallback(() => {
    if (personalDisabled) return;
    setUserProtection(!isStructureProtected);
  }, [personalDisabled, isStructureProtected, setUserProtection]);

  // `!event.altKey` so a stray Alt does not fire the personal toggle.
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

  // The structure-protection feature applies in simple mode only; render nothing when inactive.
  if (!isProtectionActive) return undefined;

  return (
    <LockToggleButtonView
      isLocked={isStructureProtected}
      isDisabled={personalDisabled}
      onToggle={handlePersonalToggle}
      unlockedTooltipKey={STATE_EDITABLE_KEY}
      lockedTooltipKey={STATE_PROTECTED_KEY}
      disabledTooltipKey={personalDisabledTooltipKey}
      ariaLabelKey={ARIA_LABEL_KEY}
      shortcut={personalShortcut}
      localizedStrings={localizedStrings}
      className={className}
    />
  );
}
