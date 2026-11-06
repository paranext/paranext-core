import { Popover, PopoverAnchor, PopoverContent } from 'platform-bible-react';
import { ComponentProps, ReactNode } from 'react';

/**
 * The footnote editor popover's minimum width: 500 px, yielding to the pane's available width so
 * the popover still fits a narrow pane. Until Radix has published the available width, the viewport
 * width stands in for it: the footnote editor locks its own width on its first layout, which
 * happens before that.
 *
 * Set inline rather than as a Tailwind arbitrary class: the web view's SCSS + PostCSS pipeline
 * drops a rule whose value is this `min()` expression, so the minimum is an inline style.
 */
const FOOTNOTE_POPOVER_MIN_WIDTH =
  'min(500px, var(--radix-popover-content-available-width, 100vw))';

export type FootnoteEditorPopoverProps = {
  /** Whether the popover is showing */
  open: boolean;
  /**
   * The live position in the text the popover sits beside (`useLivePopoverAnchor`'s `virtualRef`).
   * Re-measured as the text scrolls or reflows, so the popover follows it.
   */
  anchorRef: ComponentProps<typeof PopoverAnchor>['virtualRef'];
  /** The footnote editor */
  children: ReactNode;
};

/**
 * The popover the Scripture editor edits a footnote in, in a view that does not use the footnotes
 * pane note model. Rendered beside the editor rather than inside its text, so it stays at interface
 * scale while the text is zoomed.
 */
export function FootnoteEditorPopover({ open, anchorRef, children }: FootnoteEditorPopoverProps) {
  return (
    <Popover open={open}>
      <PopoverAnchor virtualRef={anchorRef} />
      <PopoverContent
        className="tw:w-max tw:p-[10px]"
        style={{ minWidth: FOOTNOTE_POPOVER_MIN_WIDTH }}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
