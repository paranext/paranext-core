import { useMemo } from 'react';
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

  return (
    <div className="tw:grid tw:grid-cols-[minmax(220px,1fr)_2fr] tw:gap-4">
      <div className="tw:overflow-auto tw:border-e tw:pe-3">
        <StagesTasksList
          stages={stages}
          selection={selection}
          onSelectionChange={onSelectionChange}
          onStagesChange={onStagesChange}
        />
      </div>
      <div className="tw:overflow-auto">
        {selectedStage ? (
          <TaskDetail
            stage={selectedStage}
            task={selectedTask}
            onStageChange={onStageChange}
            onTaskChange={onTaskChange}
          />
        ) : (
          <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:text-sm tw:text-muted-foreground">
            Select a stage or task to edit its details.
          </div>
        )}
      </div>
    </div>
  );
}

export default StagesTasksTab;
