import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { StagesTasksList } from '@/components/advanced/project-plan-dialog/stages-tasks-list.component';
import { TaskDetail } from '@/components/advanced/project-plan-dialog/task-detail.component';
import type {
  PlanStage,
  PlanTask,
  Selection,
} from '@/components/advanced/project-plan-dialog/types';

interface StagesTasksTabProps {
  stages: PlanStage[];
  selection: Selection;
  onSelectionChange: (next: Selection) => void;
  onStagesChange: (updater: (prev: PlanStage[]) => PlanStage[]) => void;
  onStageChange: (next: PlanStage) => void;
  onTaskChange: (next: PlanTask) => void;
}

export function StagesTasksTab({
  stages,
  selection,
  onSelectionChange,
  onStagesChange,
  onStageChange,
  onTaskChange,
}: StagesTasksTabProps) {
  const { selectedStage, selectedTask } = useMemo(() => {
    const stage = stages.find((s) => s.id === selection.stageId);
    const task = stage?.tasks.find((t) => t.id === selection.taskId);
    return { selectedStage: stage, selectedTask: task };
  }, [stages, selection]);

  // Position the flyout so it just barely stays vertically connected to the selected row.
  // The flyout's vertical extent must overlap the row's vertical extent by at least
  // MIN_OVERLAP_PX. If the previous offset already satisfies that, we don't move at all.
  // Only when a newly-selected row sits outside the flyout's current extent (plus the overlap
  // margin) do we shift the flyout the minimum amount needed to re-establish overlap.
  const gridRef = useRef<HTMLDivElement | null>(null);
  const leftPaneRef = useRef<HTMLDivElement | null>(null);
  const [flyoutOffset, setFlyoutOffset] = useState(0);

  const recomputeOffset = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const row = grid.querySelector<HTMLElement>('[data-selected="true"]');
    if (!row) {
      setFlyoutOffset(0);
      return;
    }
    const flyout = grid.querySelector<HTMLElement>('[data-flyout="true"]');
    const flyoutHeight = flyout?.offsetHeight ?? 0;
    const rowRect = row.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    const rowTop = rowRect.top - gridRect.top;
    const rowBottom = rowRect.bottom - gridRect.top;

    setFlyoutOffset((prev) => {
      if (flyoutHeight === 0) return prev;
      // Require the row's full height to overlap the flyout — i.e., the row's entire vertical
      // extent must lie inside the flyout's extent. That keeps the row's right edge fully
      // bordered by the flyout's color (no portion of the row hangs above or below).
      // With k = rowHeight:
      //   minOffset = rowTop + rowHeight - H = rowBottom - H
      //   maxOffset = rowBottom - rowHeight = rowTop
      // Clamp both ends at 0 so we never push the flyout above the top of the right pane.
      const minOffset = Math.max(0, rowBottom - flyoutHeight);
      const maxOffset = Math.max(0, rowTop);
      if (minOffset > maxOffset) return maxOffset;
      // If prev already keeps the row fully inside the flyout, no movement.
      return Math.max(minOffset, Math.min(maxOffset, prev));
    });
  }, []);

  useLayoutEffect(() => {
    recomputeOffset();
  }, [selection, stages, recomputeOffset]);

  useEffect(() => {
    const pane = leftPaneRef.current;
    if (!pane) return;
    pane.addEventListener('scroll', recomputeOffset, { passive: true });
    return () => pane.removeEventListener('scroll', recomputeOffset);
  }, [recomputeOffset]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => recomputeOffset());
    ro.observe(grid);
    return () => ro.disconnect();
  }, [recomputeOffset]);

  return (
    <div ref={gridRef} className="tw:grid tw:grid-cols-[minmax(220px,1fr)_2fr] tw:gap-0">
      <div ref={leftPaneRef} className="tw:overflow-auto">
        <StagesTasksList
          stages={stages}
          selection={selection}
          onSelectionChange={onSelectionChange}
          onStagesChange={onStagesChange}
        />
      </div>
      <div className="tw:overflow-auto">
        {selectedStage ? (
          <div
            data-flyout="true"
            className="tw:rounded-e-md tw:bg-[#ECF2F9] tw:p-3 tw:transition-[margin-top] tw:duration-150"
            style={{ marginTop: flyoutOffset }}
          >
            <TaskDetail
              stage={selectedStage}
              task={selectedTask}
              onStageChange={onStageChange}
              onTaskChange={onTaskChange}
            />
          </div>
        ) : (
          <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:border-s tw:text-sm tw:text-muted-foreground">
            Select a stage or task to edit its details.
          </div>
        )}
      </div>
    </div>
  );
}

export default StagesTasksTab;
