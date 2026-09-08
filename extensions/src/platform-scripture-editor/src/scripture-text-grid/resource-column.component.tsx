import type { DragEvent, KeyboardEvent } from 'react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ResourceCell, GridResource } from './resource-cell.component';
import type { ZoomMenuLabels } from './resource-cell-view.component';
import type { ResourceZoomController } from './use-resource-zoom.hook';

/**
 * Drag-and-keyboard reorder wiring for one column; omit to render a column that cannot move.
 *
 * The column is the drop target, but only its header is the drag source — see `headerDrag` on
 * `ResourceCellView` for why the whole column must not be draggable.
 */
export type ResourceColumnReorder = {
  /** True while a dragged column is hovering this one, which shows the drop-target ring. */
  isDropTarget: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: () => void;
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
  /** How the cell renders its text: a whole chapter, or block verses the aligned grid can place. */
  cellViewMode: 'chapter' | 'aligned';
  /**
   * Sizing for this column, owned by the layout: a flex child in the chapter row, a grid track in
   * the aligned grid. The aligned grid's column must NOT be a flex box, or it stops passing the
   * grid's rows through to the verse blocks.
   */
  className: string;
  reorder?: ResourceColumnReorder;
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
  cellViewMode,
  className,
  reorder,
  zoom,
  zoomMenuLabels,
}: ResourceColumnProps) {
  const dropTargetRing = reorder?.isDropTarget ? ' tw:ring-2 tw:ring-inset tw:ring-primary' : '';

  return (
    <div
      role="region"
      aria-label={resource.label}
      data-project-id={resource.projectId}
      data-resource-id={resource.resourceId}
      data-testid="scripture-text-grid-cell-draggable"
      // No onDragLeave — it fires on child elements; the parent clears on drop/dragEnd instead.
      onDragOver={reorder?.onDragOver}
      onDrop={reorder?.onDrop}
      className={`${className}${dropTargetRing}`}
    >
      <ResourceCell
        resourceRef={resource}
        scrRef={scrRef}
        setScrRef={setScrRef}
        viewMode={cellViewMode}
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
