import { ChevronDown, Type } from 'lucide-react';
import {
  Button,
  MarkerMenu,
  MarkerMenuItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useIsPowerMode } from './use-is-power-mode.hook';

const ARIA_LABEL_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%';
const MIXED_KEY: LocalizeKey = '%webView_platformScriptureEditor_characterMarkerControl_mixed%';
const NONE_KEY: LocalizeKey = '%webView_platformScriptureEditor_characterMarkerControl_none%';
const NO_MARKERS_TOOLTIP_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_noMarkersTooltip%';
const SEARCH_PLACEHOLDER_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerMenu_searchPlaceholder%';
/** Reuses the shipped sync-blocked wording rather than adding a second phrasing of it. */
const SYNC_BLOCKED_KEY: LocalizeKey = '%webView_platformScriptureEditor_syncEditBlocked_banner%';

/**
 * Localize keys used by {@link CharacterMarkerControl}. Spread these into the editor web view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const CHARACTER_MARKER_CONTROL_STRING_KEYS = Object.freeze([
  ARIA_LABEL_KEY,
  MIXED_KEY,
  NONE_KEY,
  NO_MARKERS_TOOLTIP_KEY,
  SEARCH_PLACEHOLDER_KEY,
  SYNC_BLOCKED_KEY,
] as const);

/** Localized strings for the character-marker control. Falls back to the key when absent. */
export type CharacterMarkerControlLocalizedStrings = {
  [key: string]: string | undefined;
};

const localize = (strings: CharacterMarkerControlLocalizedStrings, key: LocalizeKey) =>
  strings[key] ?? key;

export type CharacterMarkerControlProps = {
  /** The character marker applied at the current selection, if any. */
  currentMarker?: string;
  /** The localized description of {@link CharacterMarkerControlProps.currentMarker}. */
  currentMarkerLabel?: string;
  /** `true` when the selection carries more than one character-marker state. */
  isMixed: boolean;
  /** `true` while an automatic Send/Receive has editing paused. Disables the control. */
  isSyncBlocked: boolean;
  /** The markers to offer, already filtered and carrying their selection states. */
  markerMenuItems: MarkerMenuItem[];
  /**
   * Called when the menu opens. The expensive coverage analysis belongs here — never on selection
   * change.
   */
  onOpen: () => void;
  /** Called when the menu closes. Wire this to refocusing the editor. */
  onClose: () => void;
  /** Localized strings for the trigger, tooltips, and menu search field. */
  localizedStrings: CharacterMarkerControlLocalizedStrings;
  /** CSS class name for the trigger button. */
  className?: string;
};

/**
 * The character-marker button: shows the marker at the caret and opens {@link MarkerMenu} in a
 * popover.
 *
 * Placement-agnostic by construction — it takes state and callbacks as props and renders no
 * positioning of its own, so the same component serves every placement wrapper. It is also
 * structure-protection-agnostic: character markers are deliberately exempt, so there is no input
 * that could disable it for that reason. The real guarantee is the ABSENCE of any
 * `isStructureProtected` prop or import on this component — verified by grep (`grep -n
 * "isStructureProtected" character-marker-control.component.tsx`) rather than by a runtime test,
 * since there is no prop to flip and a test asserting "stays enabled" would only cover the same
 * default-enabled path the other tests here already exercise.
 */
export function CharacterMarkerControl({
  currentMarker,
  currentMarkerLabel,
  isMixed,
  isSyncBlocked,
  markerMenuItems,
  onOpen,
  onClose,
  localizedStrings,
  className,
}: CharacterMarkerControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const searchRef = useRef<HTMLInputElement>(null);

  // Focus the search field whenever the menu opens, so it is usable by keyboard alone.
  useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  // `blockMarker === 'c'` legitimately yields no character markers, and the value can go stale.
  // Disable rather than unmount: a control that vanishes as the caret crosses a chapter number is
  // worse than one that greys out.
  const hasNoMarkers = markerMenuItems.length === 0;
  const isDisabled = isSyncBlocked || hasNoMarkers;

  let disabledTooltip: string | undefined;
  if (isSyncBlocked) disabledTooltip = localize(localizedStrings, SYNC_BLOCKED_KEY);
  else if (hasNoMarkers) disabledTooltip = localize(localizedStrings, NO_MARKERS_TOOLTIP_KEY);

  let label: string;
  if (isMixed) label = localize(localizedStrings, MIXED_KEY);
  else if (currentMarker)
    label = currentMarkerLabel ? `${currentMarker} - ${currentMarkerLabel}` : currentMarker;
  else label = localize(localizedStrings, NONE_KEY);

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
    if (nextOpen) onOpen();
    else onClose();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* When the button is disabled it is not focusable, so make the wrapper focusable and
              named while disabled to keep the explanatory tooltip reachable for keyboard and
              screen-reader users. */}
          <div
            role={isDisabled ? 'group' : undefined}
            // Disabled buttons cannot host their own tooltip; the wrapper must be focusable to
            // surface the explanation to keyboard and screen-reader users
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={isDisabled ? 0 : undefined}
            aria-label={isDisabled ? disabledTooltip : undefined}
          >
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  className={className}
                  // The accessible name includes the current value — a static "Character marker"
                  // would override the visible label and never let a screen-reader user hear it
                  // (WCAG 2.5.3, label-in-name); this is the control's only readout of the value.
                  aria-label={`${localize(localizedStrings, ARIA_LABEL_KEY)}: ${label}`}
                  disabled={isDisabled}
                  variant="outline"
                >
                  {/* Decorative only — the accessible name on the button already carries both the
                      "character marker" role and the current value, so the icon must not be
                      announced a second time. */}
                  <Type aria-hidden />
                  {label}
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="tw:p-0 tw:w-96">
                <MarkerMenu
                  localizedStrings={localizedStrings}
                  markerMenuItems={markerMenuItems}
                  searchRef={searchRef}
                  searchPlaceholder={localize(localizedStrings, SEARCH_PLACEHOLDER_KEY)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </TooltipTrigger>
        {isDisabled && (
          <TooltipContent>
            <p className="tw:max-w-xs tw:whitespace-pre-line">{disabledTooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export type CharacterMarkerToolbarProps = {
  /**
   * The controls to lay out. One today; footnote and comment buttons are expected to join them
   * without any change to this component.
   */
  children: ReactNode;
  /** CSS class name for the container. Placement belongs to the caller, never to this component. */
  className?: string;
};

/**
 * Slot-based container for the character-marker controls.
 *
 * Lays its children out in a row and decides nothing about where that row sits — the `className`
 * pass-through is how a placement wrapper positions it. Adding a second control means passing
 * another child, not editing this component.
 */
export function CharacterMarkerToolbar({ children, className }: CharacterMarkerToolbarProps) {
  const isPowerMode = useIsPowerMode();

  // The character-marker control is only available in 10 Simple right now. Later it will be made
  // available in 10 Power too.
  if (isPowerMode) return undefined;

  return (
    <div
      className={['tw:flex tw:flex-row tw:flex-nowrap tw:items-center tw:gap-1', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
