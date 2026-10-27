import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  isMacOs,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { ShortcutKeys } from 'platform-bible-react/experimental';
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
  /**
   * Whether the state above is still the pre-load default rather than the project's real state.
   * Transitions are not auto-announced while this is `true`, so opening the editor does not pop a
   * tooltip reporting a "change" that is only the settings arriving.
   */
  isStateLoading: boolean;
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
  isStateLoading,
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
  // through `onOpenChange`; a programmatic `setTooltipOpen(true)` does not, so setting this in the
  // state-change effect and clearing it in `onOpenChange` tells the timer below which kind of open
  // it is looking at.
  const wasAutoOpenedRef = useRef(false);
  // Bumped on every auto-open, including one that happens while the tooltip is ALREADY open. The
  // timer effect keys on this rather than on `tooltipOpen`, because `setTooltipOpen(true)` on an
  // already-`true` state is a no-op React bails out of — so two state changes a couple of seconds
  // apart would leave the second one sharing the first one's remaining time.
  const [autoOpenCount, setAutoOpenCount] = useState(0);
  const prevDisplayState = useRef(displayState);
  // Whether a settled value has been observed yet. `displayState` is seeded on the first render from
  // mode-aware DEFAULTS, and the load finishing and the real value arriving land in the SAME commit
  // — so comparing against the seed would report the settings merely arriving as a change the user
  // made, and every editor open would pop a tooltip at someone who did nothing. Adopt the first
  // settled value silently instead, and compare only from there on.
  const hasSettledOnceRef = useRef(false);
  useEffect(() => {
    if (isStateLoading) return;
    if (!hasSettledOnceRef.current) {
      hasSettledOnceRef.current = true;
      prevDisplayState.current = displayState;
      return;
    }
    if (prevDisplayState.current === displayState) return;
    prevDisplayState.current = displayState;
    wasAutoOpenedRef.current = true;
    setAutoOpenCount((count) => count + 1);
    setTooltipOpen(true);
  }, [displayState, isStateLoading]);

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
  }, [tooltipOpen, autoOpenCount]);

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
            {!isDisabled && <ShortcutKeys hint={shortcut.hint} />}
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
    isLoading: isStateLoading,
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
      isStateLoading={isStateLoading}
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
