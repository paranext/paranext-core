import type { DragEvent, KeyboardEvent } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { GridResource } from './grid-resources.utils';
import { ResourceCell } from './resource-cell.component';
import type { ZoomMenuLabels } from './resource-cell-view.component';
import { resourceZoomAreaOf } from './resource-zoom-area.utils';
import type { ResourceZoomController } from './use-resource-content-zoom.hook';
import type { ResourceCollectionViewMode } from '../resource-collection-options/resource-collection-options.types';

/**
 * Drag-and-keyboard reorder wiring for one column; omit to render a column that cannot move.
 *
 * The column is the drop target, but only its header is the drag source — see `headerDrag` on
 * `ResourceCellView` for why the whole column must not be draggable.
 */
export type ResourceColumnReorder = {
  /** True while a dragged column is hovering this one, which shows the drop-target ring. */
  isDropTarget: boolean;
  onDragStart: (event: DragEvent) => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  /** Accessible name for the grip (e.g. "Reorder Genesis"). */
  handleLabel?: string;
  /** Tooltip shown on grip hover/focus. */
  hint?: string;
  /** Arrow-key handler; the parent owns which direction moves which way. */
  onKeyDown: (event: KeyboardEvent) => void;
};

export type ResourceColumnProps = {
  resource: GridResource;
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
  /** Whether this web view is rendered; passed through to the cell's reference scroll. */
  isViewVisible: boolean;
  /** This column's position in the row; see `ResourceCell`'s `orderIndex`. */
  orderIndex?: number;
  /** How the cell renders its text: a whole chapter, or block verses the aligned grid can place. */
  cellViewMode: Exclude<ResourceCollectionViewMode, 'verse'>;
  /**
   * Sizing for this column, owned by the layout: a flex child in the chapter row, a grid track in
   * the aligned grid. The aligned grid's column must NOT be a flex box, or it stops passing the
   * grid's rows through to the verse blocks.
   */
  className: string;
  reorder?: ResourceColumnReorder;
  /** Whether this column is the one a reveal brought into view, which shows the outline. */
  isRevealed?: boolean;
  zoom?: ResourceZoomController;
  zoomMenuLabels?: ZoomMenuLabels;
};

/**
 * One resource as a full-height column: its own labeled region, the drag source and drop target for
 * reorder, and the cell that renders the text. Shared by the chapter row and the aligned grid,
 * which differ only in `className` and `cellViewMode`.
 */
export function ResourceColumn({
  resource,
  scrRef,
  setScrRef,
  isViewVisible,
  orderIndex,
  cellViewMode,
  className,
  reorder,
  isRevealed,
  zoom,
  zoomMenuLabels,
}: ResourceColumnProps) {
  const dropTargetRing = reorder?.isDropTarget ? ' tw:ring-2 tw:ring-inset tw:ring-primary' : '';
  // The drop-target ring wins when both apply. The reveal outline is drawn on an overlay rather than
  // as an inset ring on this element: an inset ring paints beneath the column's children, and the
  // editor area's opaque background (and, in the aligned view, the sticky header) covers it. The
  // overlay ignores the pointer, and its z-index sits above the aligned header's `z-index: 1`. The
  // ring is a box-shadow, which forced colors (Windows High Contrast) removes, so an outline in the
  // system `Highlight` color stands in for it there, as `LIST_ITEM_KEYBOARD_FOCUS_RING` does.
  const revealRing =
    isRevealed && !reorder?.isDropTarget
      ? ' tw:relative tw:after:pointer-events-none tw:after:absolute tw:after:inset-0 tw:after:z-2 tw:after:ring-2 tw:after:ring-inset tw:after:ring-ring' +
        ' tw:forced-colors:after:outline-2 tw:forced-colors:after:outline-[color:Highlight] tw:forced-colors:after:-outline-offset-2'
      : '';
  const zoomArea = resourceZoomAreaOf(resource.resourceId);

  return (
    <div
      role="region"
      aria-label={resource.label}
      data-project-id={resource.projectId}
      data-resource-id={resource.resourceId}
      // Spelled out because JSX cannot take a computed attribute name without spreading; this is the
      // value of TEXT_COLLECTION_CELL_ATTRIBUTE, which the reveal lookup searches for.
      data-text-collection-cell=""
      data-revealed={isRevealed ? 'true' : undefined}
      // The header band and padding are unscaled, so a click or the wheel there has no marked
      // text to resolve its zoom area from; the scope names this resource's area for them.
      data-platform-content-zoom-scope={zoomArea}
      // Only when the column IS one: the drop handlers and the ring below are gated on `reorder`
      // too, so the name never claims more than the element does.
      data-testid={reorder ? 'scripture-text-grid-column-drop-target' : undefined}
      // No onDragLeave — it fires on child elements; the parent clears on drop/dragEnd instead.
      onDragOver={reorder?.onDragOver}
      onDrop={reorder?.onDrop}
      className={`${className}${dropTargetRing}${revealRing}`}
    >
      <ResourceCell
        resourceRef={resource}
        scrRef={scrRef}
        setScrRef={setScrRef}
        isViewVisible={isViewVisible}
        orderIndex={orderIndex}
        viewMode={cellViewMode}
        zoomArea={zoomArea}
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
        showDragHandle={reorder ? true : undefined}
        reorderHandleLabel={reorder?.handleLabel}
        reorderHint={reorder?.hint}
        onReorderKeyDown={reorder?.onKeyDown}
        headerDrag={
          reorder ? { onDragStart: reorder.onDragStart, onDragEnd: reorder.onDragEnd } : undefined
        }
      />
    </div>
  );
}

export default ResourceColumn;
