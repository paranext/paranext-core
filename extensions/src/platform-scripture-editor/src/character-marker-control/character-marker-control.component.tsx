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
  useTruncationTooltip,
} from 'platform-bible-react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DisabledTooltipWrapper } from '../disabled-tooltip-wrapper.component';

const ARIA_LABEL_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel%';
/**
 * The separators between a marker code and its description, and between the control's name and its
 * current value, live in the translated string rather than in code: neither the punctuation nor the
 * ordering is universal, and a Latin marker code sitting next to RTL text reorders around whatever
 * separator is used.
 */
const ARIA_LABEL_FORMAT_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_ariaLabel_format%';
const LABEL_FORMAT_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_label_format%';
const MIXED_KEY: LocalizeKey = '%webView_platformScriptureEditor_characterMarkerControl_mixed%';
const NONE_KEY: LocalizeKey = '%webView_platformScriptureEditor_characterMarkerControl_none%';
const NO_MARKERS_TOOLTIP_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerControl_noMarkersTooltip%';
/**
 * Lives in `platform-bible-react` beside its two siblings (`_insert`, `_paragraph`) rather than in
 * this extension: all three are placeholders for the same shared `MarkerMenu` search field, and the
 * editor web view already preloads `MARKER_MENU_STRING_KEYS`, so it needs no separate
 * registration.
 */
const SEARCH_PLACEHOLDER_KEY: LocalizeKey = '%markerMenu_searchPlaceholder_character%';
/** Reuses the shipped sync-blocked wording rather than adding a second phrasing of it. */
const SYNC_BLOCKED_KEY: LocalizeKey = '%webView_platformScriptureEditor_syncEditBlocked_banner%';

/**
 * Localize keys used by {@link CharacterMarkerControl}. Spread these into the editor web view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const CHARACTER_MARKER_CONTROL_STRING_KEYS = Object.freeze([
  ARIA_LABEL_KEY,
  ARIA_LABEL_FORMAT_KEY,
  LABEL_FORMAT_KEY,
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
   * Render the trigger as icon-only, with no visible label. The accessible name still carries the
   * current value, so this changes what is seen and not what is announced.
   *
   * A placement concern, deliberately passed in rather than decided here: a placement with room for
   * a label wants one, and a placement squeezed into a reserved gutter cannot fit one. Defaults to
   * `false` so every existing consumer renders exactly as it did.
   */
  isLabelHidden?: boolean;
  /**
   * Which edge of the trigger the menu's corresponding edge aligns to. `'start'` opens the menu
   * inline-end of the trigger; `'end'` opens it inline-start.
   *
   * A placement concern: a trigger with room inline-end of it wants `'start'`, and a trigger pinned
   * to the text column's trailing edge has no room there and wants `'end'`.
   *
   * `'start'`/`'end'` are LOGICAL only to the extent that
   * {@link CharacterMarkerControlProps.menuDirection} says so — see that prop. Without it they
   * resolve physically, because the popover content is portaled outside every element this app
   * gives a `dir`.
   */
  menuAlign?: 'start' | 'center' | 'end';
  /**
   * The text direction {@link CharacterMarkerControlProps.menuAlign} is resolved against.
   *
   * Must be passed explicitly for an RTL placement to mirror. floating-ui (under Radix) mirrors
   * `start`/`end` from the computed `direction` of the PORTALED content, and Radix's popover
   * portals to `document.body` — which in this app inherits no direction at all: nothing sets
   * `document.dir`, `readDirection()` in `dir-helper.util.ts` is localStorage-backed with no
   * writer, and the only `dir` in the editor web view is on an inner container the portal is not
   * inside. So with this omitted, `'end'` means "the physical right edge" even in an RTL project,
   * and a 200px menu pinned to the text column's trailing (left) edge runs off the iframe and gets
   * shifted back over the trigger by Radix's collision handling.
   *
   * Defaults to `undefined`, which leaves the popover's own `readDirection()` result in place — the
   * behavior every pre-existing consumer already had.
   */
  menuDirection?: 'ltr' | 'rtl';
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
  isLabelHidden = false,
  menuAlign = 'start',
  menuDirection,
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
    label = currentMarkerLabel
      ? formatReplacementString(localize(localizedStrings, LABEL_FORMAT_KEY), {
          marker: currentMarker,
          description: currentMarkerLabel,
        })
      : currentMarker;
  else label = localize(localizedStrings, NONE_KEY);

  // Two different jobs for one tooltip. While DISABLED it explains why (a disabled button cannot
  // host its own tooltip, hence the focusable wrapper below). While ENABLED and icon-only it is the
  // sighted user's only readout of the current marker, which the visible label used to provide.
  // Suppressed while the popover is open: a tooltip and a popover anchored to the same trigger
  // otherwise render on top of each other.
  // The visible label truncates rather than overflowing (the Responsiveness guideline's 300px
  // floor; `${marker} - ${description}` easily exceeds a gutter-width trigger), so the tooltip
  // gains a third job: revealing the clipped text. `useTruncationTooltip` measures the clipping so
  // it fires only when there is actually something hidden.
  //
  // Unlike `project-selector`, the Tooltip stays UNCONTROLLED and this only widens what content
  // there is to show. Project-selector had to control `open` because its trigger is a cmdk
  // `CommandItem`, which defeats Radix's pointer/focus auto-detection; this trigger is an ordinary
  // button, so controlling `open` would buy nothing and would cost the focus-driven tooltip that
  // the disabled wrapper depends on for keyboard users. The trade-off: keyboard focus alone does
  // not reveal a truncated label — acceptable because the full text is already the button's
  // accessible name, so no information is unreachable.
  const {
    ref: labelRef,
    open: isTruncatedLabelHovered,
    onPointerEnter: onLabelPointerEnter,
    onPointerLeave: onLabelPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  const tooltipText = isDisabled ? disabledTooltip : label;
  const isTooltipShown = !isOpen && (isDisabled || isLabelHidden || isTruncatedLabelHovered);

  const handleOpenChange = (nextOpen: boolean) => {
    // Ignore no-op transitions. Closing from an item selection already ran `onClose`, and the
    // editor refocus that `onClose` performs then reaches Radix as a focus-outside — which would
    // otherwise report the same close a second time and fire `onClose` twice.
    if (nextOpen === isOpen) return;
    setIsOpen(nextOpen);
    if (nextOpen) onOpen();
    else onClose();
  };

  // Only ever called from an item action, which can only fire while the menu is open, so this
  // needs no was-open guard.
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  // This is a single-select control, so picking a marker must close the menu — and closing is also
  // what returns focus to the editor, via `onClose`. `MarkerMenu` wires `onSelect` straight to
  // `item.action` and knows nothing about its host's open state, so the host wraps each action
  // rather than the menu closing itself.
  const closingMarkerMenuItems = useMemo(
    () =>
      markerMenuItems.map((item) => ({
        ...item,
        action: () => {
          item.action();
          closeMenu();
        },
      })),
    [markerMenuItems, closeMenu],
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* When the button is disabled it is not focusable, so the wrapper becomes focusable and
              named while disabled to keep the explanatory tooltip reachable for keyboard and
              screen-reader users. */}
          <DisabledTooltipWrapper
            // Lets the button shrink inside this wrapper, without which its truncation never
            // engages: a min-content floor here would keep the label at full width.
            className="tw:min-w-0"
            isDisabled={isDisabled}
            disabledExplanation={disabledTooltip}
          >
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  // `tw:min-w-0 tw:shrink` overrides `buttonVariants`' base `tw:shrink-0` so the
                  // label below can actually truncate; a shrink-0 button just overflows instead.
                  // The consumer's class comes last so it still wins on any conflict.
                  className={['tw:min-w-0 tw:shrink', className].filter(Boolean).join(' ')}
                  // The accessible name includes the current value. With a visible label, a static
                  // "Character marker" would override it and never let a screen-reader user hear
                  // the value (WCAG 2.5.3, label-in-name). With `isLabelHidden` there is no visible
                  // label for 2.5.3 to apply to, and this name becomes the ONLY readout of the
                  // value — so it is load-bearing in both states, for different reasons.
                  aria-label={formatReplacementString(
                    localize(localizedStrings, ARIA_LABEL_FORMAT_KEY),
                    { name: localize(localizedStrings, ARIA_LABEL_KEY), value: label },
                  )}
                  disabled={isDisabled}
                  variant="outline"
                >
                  {/* Decorative only — the accessible name on the button already carries both the
                      "character marker" role and the current value, so the icon must not be
                      announced a second time. */}
                  <Type aria-hidden />
                  {!isLabelHidden && (
                    <span
                      ref={labelRef}
                      onPointerEnter={onLabelPointerEnter}
                      onPointerLeave={onLabelPointerLeave}
                      className="tw:truncate"
                    >
                      {label}
                    </span>
                  )}
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align={menuAlign}
                // Overrides `PopoverContent`'s own `readDirection()` default (its `{...props}` spread
                // comes after its `dir`), which is what makes `align` logical rather than physical.
                // See `menuDirection`'s TSDoc for why the portaled content cannot inherit this.
                //
                // Spread conditionally rather than `dir={menuDirection}`: that same spread order means
                // an explicit `dir: undefined` would WIN and blank out the default, changing behavior
                // for every consumer that passes no direction.
                {...(menuDirection ? { dir: menuDirection } : {})}
                // The prototype's `mt-1.5`. Placement-independent, so a constant rather than a prop.
                sideOffset={6}
                // 200px and a 220px list are the prototype's `min-w-[200px]` / `max-h-[220px]`.
                // The list cap is a descendant override on THIS popover, not a prop on MarkerMenu:
                // MarkerMenu is shared with the `\` keydown menu and the footnote editor, both of
                // which render in Power mode, so it must stay untouched. `CommandList` already
                // emits `data-slot="command-list"`, so the selector is stable.
                className="tw:w-[200px] tw:p-0 tw:**:data-[slot=command-list]:max-h-[220px]"
              >
                <MarkerMenu
                  localizedStrings={localizedStrings}
                  markerMenuItems={closingMarkerMenuItems}
                  searchRef={searchRef}
                  searchPlaceholder={localize(localizedStrings, SEARCH_PLACEHOLDER_KEY)}
                />
              </PopoverContent>
            </Popover>
          </DisabledTooltipWrapper>
        </TooltipTrigger>
        {isTooltipShown && (
          <TooltipContent>
            {/* `aria-hidden`: the tooltip is the VISUAL channel only. Its text is already the
                accessible name of the thing it describes in both states — the button's `aria-label`
                while enabled, the wrapper's `aria-label` while disabled — and Radix renders the
                tooltip's children a second time inside a visually-hidden `role="tooltip"` node that
                it wires up as the trigger's `aria-describedby`, so without this a screen reader
                announces the same value twice. Hiding the tooltip text from the accessibility tree
                (rather than trimming the name) keeps the accessible name as the single readout. */}
            <p aria-hidden="true" className="tw:max-w-xs tw:whitespace-pre-line">
              {tooltipText}
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
