import { SHRINK_STEP, ToolbarCompoundLabel, useShrinkStepValue } from 'platform-bible-react';

/**
 * Separator between the marker and its style name. Shared by the rendered label and the tooltip's
 * full text so the two can never disagree about how the label reads.
 */
const MARKER_STYLE_SEPARATOR = ' - ';

/** Props for {@link ParagraphStyleLabel}. */
export type ParagraphStyleLabelProps = {
  /** The USFM marker for the block the cursor is in. */
  blockMarker: string;
  /** Undefined until the localized strings resolve, and for any marker without a description. */
  styleName: string | undefined;
};

/**
 * Label for the paragraph-style trigger: the marker code, then the style name.
 *
 * A separate component rather than inline JSX because it reads `ShrinkStepContext`, which
 * `TabToolbarContainer` publishes. `PlatformScriptureEditor` _renders_ the `TabToolbar`, so a hook
 * call there would sit above the provider and read the widest step forever. This renders as the
 * toolbar's descendant, so it sees the real value.
 */
export function ParagraphStyleLabel({ blockMarker, styleName }: ParagraphStyleLabelProps) {
  const shrinkStep = useShrinkStepValue();
  // With no style name there is nothing to put beside the marker, so the label is already at its
  // shortest form — and `fullText` must not advertise a name it cannot show.
  const isAtMinimum = shrinkStep >= SHRINK_STEP.MINIMUM || !styleName;

  return (
    <ToolbarCompoundLabel
      // A USFM marker is a code, so it reads as one — monospace, inheriting the row's foreground
      // rather than taking a marker colour.
      //
      // The slot is sized to the marker. A fixed slot wide enough for the longest marker in
      // ordinary use spends that width on every marker, so a one-character `p` renders followed by
      // a run of blank glyphs before the separator. The trigger does still change width as the
      // cursor moves between a `p` and a `toc1`, but only at the narrowest shrink step, where the
      // style name is dropped and the marker is all that is left: at every wider step the style
      // name beside it is already varying by far more than the marker does. Nothing follows this
      // label in the toolbar's start zone, so that residual movement is confined to the trigger's
      // own trailing edge and shifts no other control.
      primary={
        // `inline-flex` + `items-center`, not `inline-block`. The marker's monospace line box is
        // taller than the row's proportional one, and an `inline-block` puts its text at the top of
        // that taller box, so centring the box on the row still leaves the marker sitting visibly
        // high next to the style name. A flex container centres its own content instead, which
        // removes the offset at the source rather than compensating for it. The marker menu's rows
        // have no such box, which is why they never showed this.
        <span className="tw:inline-flex tw:items-center tw:font-mono">{blockMarker}</span>
      }
      secondary={styleName}
      separator={MARKER_STYLE_SEPARATOR}
      showSecondary={!isAtMinimum}
      isPartial={!!styleName && isAtMinimum}
      fullText={styleName ? `${blockMarker}${MARKER_STYLE_SEPARATOR}${styleName}` : blockMarker}
      // A ceiling, not a width: long style names stop the trigger growing without bound, but the
      // label still shrinks below this.
      className="tw:max-w-[30ch]"
    />
  );
}

export default ParagraphStyleLabel;
