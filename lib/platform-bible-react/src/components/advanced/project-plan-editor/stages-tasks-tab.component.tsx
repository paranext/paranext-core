import { Button } from '@/components/shadcn-ui/button';
import { IconChevronDown, IconChevronUp, IconPlus, IconTrash } from '@tabler/icons-react';
import { usePlanEditorAdmin } from './plan-editor-admin-context';
import { StagesAndTasksList } from './stages-and-tasks-list.component';
import { TaskDetailPanel } from './task-detail-panel.component';
import type {
  EditorSelection,
  PlanStage,
  PlanTask,
  ProjectPlanData,
  ProjectPlanEditorViewOptions,
} from './types';

export interface StagesTasksTabProps {
  plan: ProjectPlanData;
  selection: EditorSelection;
  viewOptions: ProjectPlanEditorViewOptions;
  onSelect: (selection: EditorSelection) => void;
  onAddStage: () => void;
  onAddTask: () => void;
  onMoveStage: (fromIndex: number, toIndex: number) => void;
  onMoveTask: (
    fromStageId: string,
    fromTaskIndex: number,
    toStageId: string,
    toTaskIndex: number,
  ) => void;
  onRequestCrossStageMove: (
    fromStageId: string,
    fromTaskIndex: number,
    toStageId: string,
    toTaskIndex: number,
  ) => void;
  onDeleteStage: (stageIndex: number) => void;
  onDeleteTask: (stageId: string, taskIndex: number) => void;
  onPatchTask: (stageId: string, taskIndex: number, patch: Partial<PlanTask>) => void;
  onPatchStage: (stageIndex: number, patch: Partial<PlanStage>) => void;
  onOpenCopyEfforts: () => void;
  onOpenSelectBasePlan: () => void;
}

/** Capabilities of the toolbar for the current selection — drives the enable state of each button. */
interface ToolbarCapabilities {
  canMoveUp: boolean;
  canMoveDown: boolean;
  canDelete: boolean;
  moveUp: () => void;
  moveDown: () => void;
  remove: () => void;
}

function deriveToolbarCapabilities(
  plan: ProjectPlanData,
  selection: EditorSelection,
  onMoveStage: (fromIndex: number, toIndex: number) => void,
  onMoveTask: (
    fromStageId: string,
    fromTaskIndex: number,
    toStageId: string,
    toTaskIndex: number,
  ) => void,
  onDeleteStage: (stageIndex: number) => void,
  onDeleteTask: (stageId: string, taskIndex: number) => void,
): ToolbarCapabilities {
  const noop = () => undefined;
  if (selection.kind === 'stage') {
    const { stageIndex } = selection;
    return {
      canMoveUp: stageIndex > 0,
      canMoveDown: stageIndex < plan.stages.length - 1,
      canDelete: true,
      moveUp: () => onMoveStage(stageIndex, stageIndex - 1),
      moveDown: () => onMoveStage(stageIndex, stageIndex + 1),
      remove: () => onDeleteStage(stageIndex),
    };
  }
  if (selection.kind === 'task') {
    const stage = plan.stages[selection.stageIndex];
    const { taskIndex } = selection;
    return {
      canMoveUp: taskIndex > 0,
      canMoveDown: !!stage && taskIndex < stage.tasks.length - 1,
      canDelete: !!stage,
      moveUp: () => stage && onMoveTask(stage.id, taskIndex, stage.id, taskIndex - 1),
      moveDown: () => stage && onMoveTask(stage.id, taskIndex, stage.id, taskIndex + 1),
      remove: () => stage && onDeleteTask(stage.id, taskIndex),
    };
  }
  return {
    canMoveUp: false,
    canMoveDown: false,
    canDelete: false,
    moveUp: noop,
    moveDown: noop,
    remove: noop,
  };
}

export function StagesTasksTab({
  plan,
  selection,
  viewOptions,
  onSelect,
  onAddStage,
  onAddTask,
  onMoveStage,
  onMoveTask,
  onRequestCrossStageMove,
  onDeleteStage,
  onDeleteTask,
  onPatchTask,
  onPatchStage,
  onOpenCopyEfforts,
  onOpenSelectBasePlan,
}: StagesTasksTabProps) {
  const isAdmin = usePlanEditorAdmin();
  const hasStages = plan.stages.length > 0;

  const toolbar = deriveToolbarCapabilities(
    plan,
    selection,
    onMoveStage,
    onMoveTask,
    onDeleteStage,
    onDeleteTask,
  );

  let selectionLabel = '';
  if (selection.kind === 'stage') {
    const stageName = plan.stages[selection.stageIndex]?.names[plan.sourceLanguageId] ?? 'selected';
    selectionLabel = `Stage "${stageName}"`;
  } else if (selection.kind === 'task') {
    const taskName =
      plan.stages[selection.stageIndex]?.tasks[selection.taskIndex]?.names[plan.sourceLanguageId] ??
      'selected';
    selectionLabel = `Task "${taskName}"`;
  }

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <Button variant="outline" size="sm" disabled={!isAdmin} onClick={onAddStage}>
          <IconPlus data-icon="inline-start" />
          Add stage…
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!isAdmin || selection.kind === 'none'}
          onClick={onAddTask}
        >
          <IconPlus data-icon="inline-start" />
          Add task…
        </Button>
        <div className="tw:mx-1 tw:h-5 tw:w-px tw:bg-border" aria-hidden />
        <Button
          variant="outline"
          size="sm"
          disabled={!isAdmin || !toolbar.canMoveUp}
          onClick={toolbar.moveUp}
          aria-label={selectionLabel ? `Move ${selectionLabel} up` : 'Move up'}
        >
          <IconChevronUp data-icon="inline-start" />
          Move up
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!isAdmin || !toolbar.canMoveDown}
          onClick={toolbar.moveDown}
          aria-label={selectionLabel ? `Move ${selectionLabel} down` : 'Move down'}
        >
          <IconChevronDown data-icon="inline-start" />
          Move down
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!isAdmin || !toolbar.canDelete}
          onClick={toolbar.remove}
          aria-label={selectionLabel ? `Delete ${selectionLabel}` : 'Delete'}
          className="tw:border-destructive/60 tw:text-destructive tw:hover:bg-destructive/10 tw:hover:text-destructive"
        >
          <IconTrash data-icon="inline-start" />
          Delete
        </Button>
      </div>
      <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="tw:flex tw:min-h-72 tw:flex-col tw:rounded-lg tw:border tw:border-border tw:bg-card tw:p-2">
          {hasStages ? (
            <StagesAndTasksList
              plan={plan}
              selection={selection}
              onSelect={onSelect}
              onMoveTask={onMoveTask}
              onRequestCrossStageMove={onRequestCrossStageMove}
              onMoveStage={onMoveStage}
            />
          ) : (
            <EmptyPlanPlaceholder
              isAdmin={isAdmin}
              onOpenSelectBasePlan={onOpenSelectBasePlan}
              onAddStage={onAddStage}
            />
          )}
        </div>
        <div className="tw:min-h-72 tw:rounded-lg tw:border tw:border-border tw:bg-card">
          <TaskDetailPanel
            plan={plan}
            selection={selection}
            viewOptions={viewOptions}
            onPatchTask={onPatchTask}
            onPatchStage={onPatchStage}
            onRequestDelete={toolbar.remove}
            onOpenCopyEfforts={onOpenCopyEfforts}
          />
        </div>
      </div>
    </div>
  );
}

function EmptyPlanPlaceholder({
  isAdmin,
  onOpenSelectBasePlan,
  onAddStage,
}: {
  isAdmin: boolean;
  onOpenSelectBasePlan: () => void;
  onAddStage: () => void;
}) {
  if (!isAdmin) {
    return (
      <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-6 tw:text-sm tw:text-muted-foreground">
        Project administrator has not created a project plan yet.
      </div>
    );
  }
  return (
    <div className="tw:flex tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-3 tw:p-6 tw:text-center tw:text-sm tw:text-muted-foreground">
      <p>
        Click <strong>Select base plan…</strong> to use your organisation’s base plan as the
        starting point for your project plan (recommended).
      </p>
      <p>
        Or, click <strong>Add stage…</strong> to use this blank plan as the starting point.
      </p>
      <div className="tw:flex tw:flex-row tw:items-center tw:gap-2">
        <Button variant="default" size="sm" onClick={onOpenSelectBasePlan}>
          Select base plan…
        </Button>
        <Button variant="outline" size="sm" onClick={onAddStage}>
          Add stage…
        </Button>
      </div>
    </div>
  );
}
