import { ChevronDown } from 'lucide-react';
import {
  Button,
  DisabledActionTooltip,
  MarkerMenu,
  MarkerMenuItem,
  MarkerMenuLocalizedStrings,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SHRINK_STEP,
  useShrinkStepValue,
} from 'platform-bible-react';
import { useEffect, useMemo, useRef, type ElementRef, type KeyboardEvent } from 'react';
import { wrapMarkerMenuItemsWithClose } from './marker-menu.utils';
import { ParagraphStyleLabel } from './paragraph-style-label.component';

const ARIA_LABEL_KEY = '%webView_platformScriptureEditor_paragraphSelection_ariaLabel%';
const PROTECTED_TOOLTIP_KEY =
  '%webView_platformScriptureEditor_paragraphSelection_protectedTooltip%';
const SEARCH_PLACEHOLDER_KEY = '%markerMenu_searchPlaceholder_paragraph%';

/**
 * Localization keys used by {@link ParagraphStyleTrigger} that nothing else lists. Spread these into
 * the editor web-view's localized-strings list so the values are loaded and passed into
 * `localizedStrings`.
 *
 * {@link SEARCH_PLACEHOLDER_KEY} is deliberately absent: it is already one of
 * `MARKER_MENU_STRING_KEYS`, which the web view spreads for the menu this trigger opens.
 */
export const PARAGRAPH_STYLE_TRIGGER_STRING_KEYS = Object.freeze([
  ARIA_LABEL_KEY,
  PROTECTED_TOOLTIP_KEY,
] as const);

export type ParagraphStyleTriggerStringKey = (typeof PARAGRAPH_STYLE_TRIGGER_STRING_KEYS)[number];

/**
 * Falls back to the key itself when a string has not resolved, matching the rest of this
 * extension's toolbar controls. A visible key is a louder signal that a contribution is missing
 * than a silently unnamed control.
 */
const localize = (
  strings: { [key in ParagraphStyleTriggerStringKey]?: string },
  key: ParagraphStyleTriggerStringKey,
) => strings[key] ?? key;

/** Props for {@link ParagraphStyleTrigger}. */
export type ParagraphStyleTriggerProps = {
  /**
   * The USFM marker for the block the cursor is in. Undefined while the cursor is in no block at
   * all, which renders nothing.
   */
  blockMarker: string | undefined;
  /** Undefined until the localized strings resolve, and for any marker without a description. */
  styleName: string | undefined;
  /** Whether the project's structure is protected, which disables switching the paragraph style. */
  isStructureProtected: boolean;
  /** The paragraph markers offered by the menu this trigger opens. */
  markerMenuItems: MarkerMenuItem[];
  localizedStrings: MarkerMenuLocalizedStrings & {
    [key in ParagraphStyleTriggerStringKey]?: string;
  };
  /**
   * Whether the menu is open. Controlled by the caller so the editor can open it from the keyboard
   * (Enter or Alt+Down on a selected paragraph marker).
   */
  isMenuOpen: boolean;
  /**
   * Called with `true` when this button opens the menu, and with `false` when the user closes it:
   * by picking an item (this is a single-select control), Escape, clicking this button again, or
   * interacting outside the menu. Not called when the menu closes because `isStructureProtected`
   * turned on; the caller owns that state and closes it itself (`useParagraphMenuOpenState` does).
   */
  onMenuOpenChange: (isOpen: boolean) => void;
  /**
   * Puts keyboard focus back in the editor, so the user is back in the text and a selected
   * paragraph marker, which the editor keeps while focus is in the menu, is live again for the next
   * key. Called as the menu closes after a pick, and after any close of a menu the editor opened.
   * Not called when the user dismisses a menu this button opened (Escape, or clicking the button
   * again): focus goes back to the button, the opener. Not called either when the menu closed
   * because the user clicked or focused something else: focus belongs where they put it.
   */
  onReturnFocusToEditor: () => void;
};

/**
 * The toolbar's paragraph-style control: a button showing the marker and style name of the block
 * the cursor is in — or of the paragraph whose marker is selected — which opens the paragraph
 * marker menu. The menu is controlled by the caller so the editor can open it from the keyboard;
 * picking an item closes it and returns focus to the editor, and dismissing it returns focus to
 * whichever opened it.
 *
 * A component rather than inline JSX in the web view because it reads `ShrinkStepContext`, which
 * `TabToolbarContainer` publishes. `PlatformScriptureEditor` _renders_ the `TabToolbar`, so a hook
 * call there would sit above the provider and read the widest step forever. This renders as the
 * toolbar's descendant, so it sees the real value — and both of the rungs below need it.
 */
export function ParagraphStyleTrigger({
  blockMarker,
  styleName,
  isStructureProtected,
  markerMenuItems,
  localizedStrings,
  isMenuOpen,
  onMenuOpenChange,
  onReturnFocusToEditor,
}: ParagraphStyleTriggerProps) {
  const shrinkStep = useShrinkStepValue();
  // Once the style name has been dropped the marker is the whole label, and a marker is a code with
  // no shorter form — so this is the width below which the control has nothing left to give and
  // must stop narrowing. Above this step the floor would do harm rather than good: while the style
  // name is still rendered it contributes its longest word to `min-content`, far more than the zone
  // can spare, so the trigger would refuse to shrink and have its trailing border clipped by the
  // zone's `overflow-clip` instead of ellipsising the name.
  //
  // What the floor resolves to is the button's padding plus the WHOLE marker string, because the
  // primary field is nowrap and so contributes its full width to `min-content` — and `min-width`
  // beats `max-width`, so this is what decides whether the button's cap can hold at all.
  // `blockMarker` is read verbatim off the USJ para node at the caret, NOT from the switcher menu,
  // and isn't constrained to `selectableParagraphMarkers` (platform-scripture-editor.utils) or even to
  // `usfm.sty` — a project-custom marker, or one entered by mistake, can be any string at all. The
  // column-floor widths below were measured against `toc1` (4 characters), but some standard USFM
  // markers are longer than that, so the trigger already overruns its zone by a few pixels for
  // peripheral/front-matter material at the 297px Simple-mode column floor, before a nonstandard
  // marker is even considered. See `adr-narrow-toolbar-yields-padding-then-decoration` for the
  // specific markers and measurements, and what is left open there.
  const isFloored = shrinkStep >= SHRINK_STEP.MINIMUM;
  const widthFloor = isFloored ? 'tw:min-w-min' : 'tw:min-w-0';

  // How the current opening began and ended, read as the menu closes. Radix reports an opening
  // only when this button opens the menu; an opening it did not report came from the editor.
  const isButtonOpeningRef = useRef(false);
  const wasOpenedByButtonRef = useRef(false);
  const wasClosedByPickRef = useRef(false);
  const wasClosedByOutsideInteractionRef = useRef(false);
  useEffect(() => {
    if (!isMenuOpen) return;
    wasOpenedByButtonRef.current = isButtonOpeningRef.current;
    isButtonOpeningRef.current = false;
    wasClosedByPickRef.current = false;
    wasClosedByOutsideInteractionRef.current = false;
  }, [isMenuOpen]);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) isButtonOpeningRef.current = true;
    onMenuOpenChange(isOpen);
  };

  // Radix reports a pointer-down on the trigger itself as an outside interaction, since it lands
  // outside the popover content. Read against this ref so closing that way still counts as a normal
  // close, which returns focus to the opener rather than leaving it wherever it was.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const triggerRef = useRef<ElementRef<typeof Button>>(null);

  // This is a single-select control, so picking a marker must close the menu.
  const closingMarkerMenuItems = useMemo(
    () =>
      wrapMarkerMenuItemsWithClose(markerMenuItems, () => {
        wasClosedByPickRef.current = true;
        onMenuOpenChange(false);
      }),
    [markerMenuItems, onMenuOpenChange],
  );

  // Where focus goes as the menu closes; see `onReturnFocusToEditor` and
  // adr-marker-menu-close-focus-follows-the-opener. A pick acted on the text, so it goes back to the
  // text. A dismissal goes back to whoever opened the menu, unless that is a button that is now
  // disabled (protection turned on) or gone (the trigger unmounted), which cannot take focus.
  const handleCloseAutoFocus = (event: Event) => {
    if (wasClosedByOutsideInteractionRef.current) return;
    const trigger = triggerRef.current;
    const canReturnToButton =
      wasOpenedByButtonRef.current &&
      !wasClosedByPickRef.current &&
      !!trigger?.isConnected &&
      !trigger.disabled;
    event.preventDefault();
    // Explicit rather than Radix's own return to the trigger, which Radix skips after a pointer-down
    // on the trigger because it counts that as an outside interaction.
    if (canReturnToButton) trigger.focus();
    else onReturnFocusToEditor();
  };

  // The Enter that opens the menu from a selected paragraph marker auto-repeats when held, and the
  // repeats land in the menu, where Enter (and Space, in an empty search box) picks the highlighted
  // row. Only a fresh press may pick.
  const ignoreRepeatedPickKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!event.repeat) return;
    const isPickKey =
      event.key === 'Enter' ||
      (event.key === ' ' && event.target instanceof HTMLInputElement && !event.target.value);
    if (!isPickKey) return;
    event.preventDefault();
    event.stopPropagation();
  };

  // Truthy, not just defined: an empty marker has nothing to put in the label, so the trigger would
  // render an empty box followed by a dangling " - " and the generic fallback description. No marker
  // and no block are the same state to a user, so they read the same way.
  if (!blockMarker) return undefined;

  return (
    <DisabledActionTooltip
      disabled={isStructureProtected}
      tooltipText={localize(localizedStrings, PROTECTED_TOOLTIP_KEY)}
      // This wrapper div — not the Button inside it — is the toolbar zone's flex item, so the floor
      // has to be set here as well as on the button. Without it the div stays pinned at min-content
      // and the button's own floor can never come into play, because the box around it never
      // narrows.
      className={widthFloor}
    >
      <Popover
        // Structure protection disables the button, so it must also keep an editor request from
        // opening the menu around it.
        open={isMenuOpen && !isStructureProtected}
        onOpenChange={handleOpenChange}
      >
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            // `tw:max-w-full` is what keeps the label ellipsising instead of the button being cut
            // off mid-border. The wrapper around this is a block box, so the button is not a flex
            // item of it and the `shrink-0` in shadcn's button base cannot be shrunk past — the
            // button simply takes its content width, up to the label's 30-character ceiling, and
            // overruns the toolbar zone, whose `overflow-clip` then slices its trailing border.
            // Capping it at the wrapper's width puts the squeeze back on the label, which has the
            // `min-w-0` and `truncate` needed to absorb it. The floor is what stops that squeeze
            // once the label has nothing left to absorb it with. The width ceiling lives on the
            // label itself (30 characters) so it is expressed in the same units UX specified it in
            // — see ParagraphStyleLabel.
            className={`tw:h-8 tw:max-w-full ${widthFloor}`}
            aria-label={localize(localizedStrings, ARIA_LABEL_KEY)}
            // No native `title` here. The label inside raises its own tooltip whenever it is
            // abbreviated or clipped, and a native tooltip would open on top of it a beat later —
            // two overlapping bubbles for one control. `aria-label` still names the button for
            // assistive technology.
            disabled={isStructureProtected}
            variant="outline"
          >
            <ParagraphStyleLabel blockMarker={blockMarker} styleName={styleName} />
            {/* Dropped at the narrowest step rather than squeezed. The chevron is decoration on a
                control already reduced to a bordered code, and dropping it is what buys the room
                the marker needs at a column's minimum width; the button keeps its popover
                semantics either way, so nothing changes for keyboard or screen-reader users.
                `shrink-0` so that while it IS shown it is never the thing that gives way. */}
            {!isFloored && <ChevronDown className="tw:shrink-0" />}
          </Button>
        </PopoverTrigger>
        {/* 384px is the width this menu wants, not a width it can insist on. Simple mode gives the
            editor ~302px at the 900px window minimum, and a fixed 384px popover lays out at full
            width and is then clipped by the web view edge — taking roughly 80px of every row with
            it, including the ellipsis each row had correctly truncated to. The rows were degrading
            properly into space nobody could see. Radix measures the room actually available and
            publishes it, so cap against that and let the menu narrow instead. */}
        <PopoverContent
          className="tw:w-96 tw:max-w-(--radix-popover-content-available-width) tw:p-0"
          onInteractOutside={(event) => {
            // Clicking the trigger again to close is a normal close, not an outside interaction:
            // Radix only calls this because the pointer-down lands outside the popover CONTENT, and
            // the trigger is outside it too.
            if (event.target instanceof Node && triggerRef.current?.contains(event.target)) return;
            wasClosedByOutsideInteractionRef.current = true;
          }}
          onCloseAutoFocus={handleCloseAutoFocus}
          onKeyDownCapture={ignoreRepeatedPickKeys}
        >
          <MarkerMenu
            localizedStrings={localizedStrings}
            markerMenuItems={closingMarkerMenuItems}
            searchPlaceholder={localizedStrings[SEARCH_PLACEHOLDER_KEY]}
            // Opening on the paragraph's own marker makes a second Enter re-apply it, which changes
            // nothing, instead of picking whatever row sorts first.
            defaultHighlightedMarker={blockMarker}
          />
        </PopoverContent>
      </Popover>
    </DisabledActionTooltip>
  );
}

export default ParagraphStyleTrigger;
