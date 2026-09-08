import { SerializedVerseRef } from '@sillsdev/scripture';
import { useStylesheet } from 'platform-bible-react';
import { Children, useRef, type ReactNode } from 'react';
import { ALIGNED_GRID_CLASS, ALIGNED_GRID_STYLESHEET } from './aligned-grid.styles';
import { useAlignedReferenceScroll } from './use-aligned-reference-scroll.hook';

/** Narrowest a column may become before the grid scrolls sideways instead of shrinking further. */
const MIN_COLUMN_WIDTH = '16rem';

export type AlignedGridProps = {
  /** One `ResourceColumn` per resource, in display order; each becomes a column track. */
  children: ReactNode;
  /** The scroll-group reference this grid follows. */
  scrRef: SerializedVerseRef;
  /** Accessible name for the grid region. */
  ariaLabel?: string;
};

/**
 * The verse-aligned grid: verse N of every resource on one row.
 *
 * This root owns the row axis and is the view's only scroll port. A `display: contents` / subgrid
 * chain (see `aligned-grid.styles.ts`) carries that row axis down through each column to the verse
 * blocks, so a row is as tall as its tallest cell with nothing measuring anything — which is also
 * why the columns must hand their scrolling here (`contentOverflow="visible"`): a column that
 * scrolled on its own would both break the chain and drift out of alignment.
 */
export function AlignedGrid({ children, scrRef, ariaLabel }: AlignedGridProps) {
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const portRef = useRef<HTMLDivElement>(null);
  // Counted from the children rather than taken as a prop, so the track count cannot disagree with
  // the columns it is describing. `repeat()` rejects 0, which the web view can briefly pass while
  // its resource list loads.
  const columnCount = Math.max(Children.count(children), 1);

  // Only injected while this view is mounted; the rules are what make the layout work.
  useStylesheet(ALIGNED_GRID_STYLESHEET);
  useAlignedReferenceScroll(portRef, scrRef);

  return (
    <div
      ref={portRef}
      role="group"
      aria-label={ariaLabel}
      data-testid="scripture-text-grid-aligned"
      // Tracks are set here rather than in the stylesheet, which does not know the column count.
      // `minmax` floors each column, which is what makes the grid scroll sideways at high resource
      // counts instead of shrinking columns into unreadable slivers.
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(${MIN_COLUMN_WIDTH}, 1fr))`,
      }}
      className={`${ALIGNED_GRID_CLASS} tw:min-h-0 tw:flex-1`}
    >
      {children}
    </div>
  );
}

export default AlignedGrid;
