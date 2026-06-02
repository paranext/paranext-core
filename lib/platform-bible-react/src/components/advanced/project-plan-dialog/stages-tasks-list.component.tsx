import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  DEFAULT_LANG,
  getLocalized,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import { MoveTaskConfirmDialog } from '@/components/advanced/project-plan-dialog/move-task-confirm-dialog.component';
import type {
  PlanStage,
  PlanTask,
  Selection,
} from '@/components/advanced/project-plan-dialog/types';

interface StagesTasksListProps {
  stages: PlanStage[];
  selection: Selection;
  onSelectionChange: (next: Selection) => void;
  onStagesChange: (updater: (prev: PlanStage[]) => PlanStage[]) => void;
  basePlanName: string;
}

const newId = () => `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

const moveItem = <T,>(arr: T[], from: number, to: number): T[] => {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

const makeStage = (): PlanStage => ({
  id: newId(),
  names: { [DEFAULT_LANG]: 'New stage' },
  descriptions: {},
  tasks: [],
});

const makeTask = (): PlanTask => ({
  id: newId(),
  names: { [DEFAULT_LANG]: 'New task' },
  descriptions: {},
  markComplete: 'by-chapter',
  taskStart: 'after-previous-task-on-same-book',
  requiresEditing: 'no',
  effort: { easiest: 10, easy: 8, moderate: 5, difficult: 3 },
});

export function StagesTasksList({
  stages,
  selection,
  onSelectionChange,
  onStagesChange,
  basePlanName,
}: StagesTasksListProps) {
  const [pendingMove, setPendingMove] = useState<
    { stageIndex: number; taskIndex: number; dir: -1 | 1 } | undefined
  >(undefined);

  const addStage = () => {
    const stage = makeStage();
    onStagesChange((prev) => [...prev, stage]);
    onSelectionChange({ stageId: stage.id });
  };

  const addTask = () => {
    const stageId = selection.stageId ?? stages[stages.length - 1]?.id;
    if (!stageId) return;
    const task = makeTask();
    onStagesChange((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, tasks: [...s.tasks, task] } : s)),
    );
    onSelectionChange({ stageId, taskId: task.id });
  };

  const moveStage = (index: number, dir: -1 | 1) => {
    onStagesChange((prev) => moveItem(prev, index, index + dir));
  };

  const moveTask = (stageIndex: number, taskIndex: number, dir: -1 | 1) => {
    const stage = stages[stageIndex];
    const crossesStage =
      (dir === -1 && taskIndex === 0) || (dir === 1 && taskIndex === stage.tasks.length - 1);
    if (crossesStage) {
      // Defer the move until the user confirms losing recorded progress.
      setPendingMove({ stageIndex, taskIndex, dir });
      return;
    }
    onStagesChange((prev) =>
      prev.map((s, i) =>
        i === stageIndex ? { ...s, tasks: moveItem(s.tasks, taskIndex, taskIndex + dir) } : s,
      ),
    );
  };

  const executePendingMove = () => {
    if (pendingMove === undefined) return;
    const { stageIndex, taskIndex, dir } = pendingMove;
    const toStageIndex = stageIndex + dir;
    const movedTaskId = stages[stageIndex]?.tasks[taskIndex]?.id;
    const toStageId = stages[toStageIndex]?.id;
    onStagesChange((prev) => {
      const next = prev.map((s) => ({ ...s, tasks: [...s.tasks] }));
      const [task] = next[stageIndex].tasks.splice(taskIndex, 1);
      // Moving up lands at the end of the previous stage; moving down lands at the start of the next.
      if (dir === -1) next[toStageIndex].tasks.push(task);
      else next[toStageIndex].tasks.unshift(task);
      return next;
    });
    if (movedTaskId !== undefined && toStageId !== undefined)
      onSelectionChange({ stageId: toStageId, taskId: movedTaskId });
  };

  const removeStage = (id: string) => {
    onStagesChange((prev) => prev.filter((s) => s.id !== id));
    if (selection.stageId === id) onSelectionChange({});
  };

  const removeTask = (stageId: string, taskId: string) => {
    onStagesChange((prev) =>
      prev.map((s) =>
        s.id === stageId ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) } : s,
      ),
    );
    if (selection.taskId === taskId) onSelectionChange({ stageId });
  };

  const canAddTask = !!selection.stageId || stages.length > 0;

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <div className="tw:flex tw:gap-2">
        <Button size="sm" variant="outline" onClick={addStage}>
          <Plus className="tw:me-1 tw:h-4 tw:w-4" />
          Add Stage
        </Button>
        <Button size="sm" variant="outline" onClick={addTask} disabled={!canAddTask}>
          <Plus className="tw:me-1 tw:h-4 tw:w-4" />
          Add Task
        </Button>
      </div>

      {stages.length === 0 ? (
        <div className="tw:rounded tw:border tw:border-dashed tw:p-4 tw:text-center tw:text-sm tw:text-muted-foreground">
          This plan has no stages yet. Pick a template from the dropdown above or add a stage.
        </div>
      ) : (
        <ul className="tw:flex tw:flex-col tw:gap-1">
          {stages.map((stage, stageIndex) => {
            const stageSelected = selection.stageId === stage.id && !selection.taskId;
            return (
              <li key={stage.id}>
                <Row
                  selected={stageSelected}
                  onClick={() => onSelectionChange({ stageId: stage.id })}
                  label={getLocalized(stage.names, DEFAULT_LANG) || '(unnamed stage)'}
                  bold
                >
                  <RowAction
                    label="Move stage up"
                    onClick={() => moveStage(stageIndex, -1)}
                    disabled={stageIndex === 0}
                  >
                    <ChevronUp className="tw:h-4 tw:w-4" />
                  </RowAction>
                  <RowAction
                    label="Move stage down"
                    onClick={() => moveStage(stageIndex, 1)}
                    disabled={stageIndex === stages.length - 1}
                  >
                    <ChevronDown className="tw:h-4 tw:w-4" />
                  </RowAction>
                  <RowAction label="Delete stage" onClick={() => removeStage(stage.id)}>
                    <Trash2 className="tw:h-4 tw:w-4" />
                  </RowAction>
                </Row>

                <ul className="tw:ms-6 tw:mt-1 tw:flex tw:flex-col tw:gap-1">
                  {stage.tasks.map((task, taskIndex) => {
                    const taskSelected = selection.taskId === task.id;
                    return (
                      <li key={task.id}>
                        <Row
                          selected={taskSelected}
                          onClick={() => onSelectionChange({ stageId: stage.id, taskId: task.id })}
                          label={getLocalized(task.names, DEFAULT_LANG) || '(unnamed task)'}
                        >
                          <RowAction
                            label="Move task up"
                            onClick={() => moveTask(stageIndex, taskIndex, -1)}
                            disabled={stageIndex === 0 && taskIndex === 0}
                          >
                            <ChevronUp className="tw:h-4 tw:w-4" />
                          </RowAction>
                          <RowAction
                            label="Move task down"
                            onClick={() => moveTask(stageIndex, taskIndex, 1)}
                            disabled={
                              stageIndex === stages.length - 1 &&
                              taskIndex === stage.tasks.length - 1
                            }
                          >
                            <ChevronDown className="tw:h-4 tw:w-4" />
                          </RowAction>
                          <RowAction
                            label="Delete task"
                            onClick={() => removeTask(stage.id, task.id)}
                          >
                            <Trash2 className="tw:h-4 tw:w-4" />
                          </RowAction>
                        </Row>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}

      <MoveTaskConfirmDialog
        open={pendingMove !== undefined}
        onOpenChange={(next) => {
          if (!next) setPendingMove(undefined);
        }}
        basePlanName={basePlanName}
        onConfirm={executePendingMove}
      />
    </div>
  );
}

interface RowProps {
  selected: boolean;
  bold?: boolean;
  label: string;
  onClick: () => void;
  children?: ReactNode;
}

function Row({ selected, bold, label, onClick, children }: RowProps) {
  return (
    <div
      data-selected={selected ? 'true' : undefined}
      className={cn(
        'tw:group tw:flex tw:items-center tw:justify-between tw:gap-2 tw:rounded tw:px-2 tw:py-1 tw:hover:bg-accent/40 tw:focus-within:bg-accent/40',
        selected &&
          'tw:rounded-s-md tw:rounded-e-none tw:bg-[#ECF2F9] tw:hover:bg-[#ECF2F9] tw:focus-within:bg-[#ECF2F9]',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'tw:flex-1 tw:text-left tw:text-sm tw:outline-none',
          bold && 'tw:font-semibold',
        )}
      >
        {label}
      </button>
      <div className="tw:flex tw:items-center tw:gap-1 tw:opacity-0 tw:transition-opacity tw:group-hover:opacity-100 tw:group-focus-within:opacity-100">
        {children}
      </div>
    </div>
  );
}

interface RowActionProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

function RowAction({ label, onClick, disabled, children }: RowActionProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      disabled={disabled}
      className="tw:rounded tw:p-1 tw:hover:bg-accent disabled:tw:opacity-30"
    >
      {children}
    </button>
  );
}

export default StagesTasksList;
