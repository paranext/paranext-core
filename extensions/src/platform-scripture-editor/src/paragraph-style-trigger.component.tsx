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
import { ParagraphStyleLabel } from './paragraph-style-label.component';

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
export const PARAGRAPH_STYLE_TRIGGER_STRING_KEYS = Object.freeze([PROTECTED_TOOLTIP_KEY] as const);

export type ParagraphStyleTriggerStringKey = (typeof PARAGRAPH_STYLE_TRIGGER_STRING_KEYS)[number];

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
};

/**
 * The toolbar's paragraph-style control: a button showing the marker and style name of the block
 * the cursor is in, which opens the paragraph marker menu.
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
}: ParagraphStyleTriggerProps) {
  const shrinkStep = useShrinkStepValue();
  // Once the style name has been dropped the marker is the whole label, and a marker is a code with
  // no shorter form — so this is the width below which the control has nothing left to give and
  // must stop narrowing. Above this step the floor would do harm rather than good: while the style
  // name is still rendered it contributes its longest word to `min-content`, far more than the zone
  // can spare, so the trigger would refuse to shrink and have its trailing border clipped by the
  // zone's `overflow-clip` instead of ellipsising the name.
  const isFloored = shrinkStep >= SHRINK_STEP.MINIMUM;
  const widthFloor = isFloored ? 'tw:min-w-min' : 'tw:min-w-0';

  // Truthy, not just defined: an empty marker has nothing to put in the label, so the trigger would
  // render an empty box followed by a dangling " - " and the generic fallback description. No marker
  // and no block are the same state to a user, so they read the same way.
  if (!blockMarker) return undefined;

  return (
    <DisabledActionTooltip
      disabled={isStructureProtected}
      tooltipText={localizedStrings[PROTECTED_TOOLTIP_KEY] ?? PROTECTED_TOOLTIP_KEY}
      // This wrapper div — not the Button inside it — is the toolbar zone's flex item, so the floor
      // has to be set here as well as on the button. Without it the div stays pinned at min-content
      // and the button's own floor can never come into play, because the box around it never
      // narrows.
      className={widthFloor}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
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
            aria-label="Paragraph Selection"
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
        <PopoverContent className="tw:w-96 tw:max-w-(--radix-popover-content-available-width) tw:p-0">
          <MarkerMenu
            localizedStrings={localizedStrings}
            markerMenuItems={markerMenuItems}
            searchPlaceholder={localizedStrings[SEARCH_PLACEHOLDER_KEY]}
          />
        </PopoverContent>
      </Popover>
    </DisabledActionTooltip>
  );
}

export default ParagraphStyleTrigger;
