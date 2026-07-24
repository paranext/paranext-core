import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconBan, IconGripVertical, IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { usePlanEditorAdmin } from './plan-editor-admin-context';
import type { EditorSelection, PlanStage, ProjectPlanData } from './types';

export interface StagesAndTasksListProps {
  plan: ProjectPlanData;
  selection: EditorSelection;
  onSelect: (selection: EditorSelection) => void;
  /** Same-stage task reorder. */
  onMoveTask: (
    fromStageId: string,
    fromTaskIndex: number,
    toStageId: string,
    toTaskIndex: number,
  ) => void;
  /**
   * Cross-stage task drop. The parent should show a confirmation dialog and, on confirm, invoke
   * `onMoveTask` with the same arguments. The list does NOT perform the move directly when stages
   * differ.
   */
  onRequestCrossStageMove: (
    fromStageId: string,
    fromTaskIndex: number,
    toStageId: string,
    toTaskIndex: number,
  ) => void;
  onMoveStage: (fromIndex: number, toIndex: number) => void;
}

type SortableMeta =
  | { kind: 'stage'; stageIndex: number; stageId: string }
  | { kind: 'task'; stageId: string; taskIndex: number };

const taskItemId = (stageId: string, taskIndex: number) => `task::${stageId}::${taskIndex}`;
const stageItemId = (stageId: string) => `stage::${stageId}`;

function parseSortableId(id: string): SortableMeta | undefined {
  if (id.startsWith('stage::')) {
    return { kind: 'stage', stageIndex: -1, stageId: id.slice('stage::'.length) };
  }
  if (id.startsWith('task::')) {
    const rest = id.slice('task::'.length);
    const lastDouble = rest.lastIndexOf('::');
    if (lastDouble < 0) return undefined;
    const stageId = rest.slice(0, lastDouble);
    const taskIndex = Number(rest.slice(lastDouble + 2));
    if (Number.isNaN(taskIndex)) return undefined;
    return { kind: 'task', stageId, taskIndex };
  }
  return undefined;
}

export function StagesAndTasksList({
  plan,
  selection,
  onSelect,
  onMoveTask,
  onRequestCrossStageMove,
  onMoveStage,
}: StagesAndTasksListProps) {
  const isAdmin = usePlanEditorAdmin();
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [overId, setOverId] = useState<string | undefined>(undefined);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const stageIds = plan.stages.map((stage) => stageItemId(stage.id));

  const activeMeta = activeId ? parseSortableId(activeId) : undefined;
  const overMeta = overId ? parseSortableId(overId) : undefined;
  // Resolve the effective target stage for a task drag: dropping a task onto a stage row is
  // treated as "drop as first task of that stage". Dropping a task onto another task uses that
  // task's containing stage. Both shapes carry `stageId`, so the lookup is the same field.
  const effectiveTargetStageIdForTask = activeMeta?.kind === 'task' ? overMeta?.stageId : undefined;
  const isCrossStageDrag =
    activeMeta?.kind === 'task' &&
    effectiveTargetStageIdForTask !== undefined &&
    effectiveTargetStageIdForTask !== activeMeta.stageId;
  // Invalid only when the drag has no drop target at all (i.e., outside the list / not over a
  // droppable). Inside the list, any drop is handled by handleDragEnd — either as a real move
  // or a silent no-op.
  const isInvalidDrag = activeMeta !== undefined && overMeta === undefined;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
    setOverId(undefined);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over ? String(event.over.id) : undefined);
  };

  const resetDragState = () => {
    setActiveId(undefined);
    setOverId(undefined);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    resetDragState();
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = parseSortableId(String(active.id));
    const to = parseSortableId(String(over.id));
    if (!from || !to) return;
    if (from.kind === 'stage' && to.kind === 'stage') {
      const fromIndex = plan.stages.findIndex((s) => s.id === from.stageId);
      const toIndex = plan.stages.findIndex((s) => s.id === to.stageId);
      if (fromIndex >= 0 && toIndex >= 0) onMoveStage(fromIndex, toIndex);
      return;
    }
    if (from.kind === 'task') {
      // Resolve the target (stageId, taskIndex). Dropping on a task uses that task's slot;
      // dropping on a stage means "make it the first task of that stage".
      const toStageId = to.stageId;
      const toTaskIndex = to.kind === 'task' ? to.taskIndex : 0;
      if (from.stageId === toStageId) {
        onMoveTask(from.stageId, from.taskIndex, toStageId, toTaskIndex);
      } else {
        onRequestCrossStageMove(from.stageId, from.taskIndex, toStageId, toTaskIndex);
      }
    }
    // Stage dropped on a task: silently no-op. Stages can only be reordered among stages, and
    // the user has clear feedback because the drag overlay does NOT show the gray-out style
    // while still over a droppable.
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={resetDragState}
    >
      <div
        className="tw:flex tw:flex-col tw:gap-1 tw:overflow-auto"
        role="tree"
        aria-label="Stages and tasks"
      >
        <SortableContext items={stageIds} strategy={verticalListSortingStrategy}>
          {plan.stages.map((stage, stageIndex) => (
            <StageBlock
              key={stage.id}
              stage={stage}
              stageIndex={stageIndex}
              isAdmin={isAdmin}
              selection={selection}
              onSelect={onSelect}
            />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId ? (
          <DragOverlayPreview
            id={activeId}
            plan={plan}
            isCrossStage={isCrossStageDrag}
            isInvalid={isInvalidDrag}
            targetStageName={
              isCrossStageDrag && effectiveTargetStageIdForTask
                ? (plan.stages.find((s) => s.id === effectiveTargetStageIdForTask)?.names.en ??
                  effectiveTargetStageIdForTask)
                : undefined
            }
          />
        ) : undefined}
      </DragOverlay>
    </DndContext>
  );
}

function StageBlock({
  stage,
  stageIndex,
  isAdmin,
  selection,
  onSelect,
}: {
  stage: PlanStage;
  stageIndex: number;
  isAdmin: boolean;
  selection: EditorSelection;
  onSelect: (selection: EditorSelection) => void;
}) {
  const isSelected = selection.kind === 'stage' && selection.stageIndex === stageIndex;
  const taskIds = stage.tasks.map((_, i) => taskItemId(stage.id, i));
  return (
    <div className="tw:flex tw:flex-col tw:gap-0.5">
      <SortableRow
        id={stageItemId(stage.id)}
        rowKind="stage"
        label={stage.names.en ?? stage.id}
        sublabel={`Stage ${stageIndex + 1}`}
        isSelected={isSelected}
        onSelect={() => onSelect({ kind: 'stage', stageIndex })}
        isAdmin={isAdmin}
      />
      <div className="tw:ms-6 tw:flex tw:flex-col tw:gap-0.5">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {stage.tasks.map((task, taskIndex) => (
            <SortableRow
              key={task.id}
              id={taskItemId(stage.id, taskIndex)}
              rowKind="task"
              label={task.names.en ?? task.id}
              isSelected={
                selection.kind === 'task' &&
                selection.stageIndex === stageIndex &&
                selection.taskIndex === taskIndex
              }
              onSelect={() => onSelect({ kind: 'task', stageIndex, taskIndex })}
              isAdmin={isAdmin}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function SortableRow({
  id,
  rowKind,
  label,
  sublabel,
  isSelected,
  isAdmin,
  onSelect,
}: {
  id: string;
  rowKind: 'stage' | 'task';
  label: string;
  sublabel?: string;
  isSelected: boolean;
  isAdmin: boolean;
  onSelect: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      data-row-kind={rowKind}
      className={cn(
        'tw:group tw:flex tw:items-center tw:gap-1 tw:rounded-md tw:border tw:border-transparent tw:bg-card tw:px-2 tw:py-1.5 tw:text-sm tw:transition-colors',
        // Hover and keyboard focus give a soft muted tint so the row signals interactivity
        // without competing visually with the stronger "selected" state below.
        !isSelected && 'tw:hover:bg-muted/60 tw:focus-within:bg-muted/60',
        // Selected state uses the primary accent — clearly distinct from hover.
        isSelected &&
          'tw:border-primary/40 tw:bg-primary/10 tw:text-foreground tw:shadow-[inset_2px_0_0_0_var(--color-primary)] tw:hover:bg-primary/15',
        isDragging && 'tw:opacity-50',
        rowKind === 'stage' && 'tw:font-medium',
      )}
    >
      <Button
        variant="ghost"
        size="icon-xs"
        disabled={!isAdmin}
        aria-label={`Drag to reorder ${rowKind} "${label}"`}
        className={cn(
          'tw:cursor-grab tw:opacity-0',
          'tw:group-hover:opacity-100 tw:group-focus-within:opacity-100',
          !isAdmin && 'tw:cursor-not-allowed',
        )}
        // Spread DnD listeners onto the handle so only the handle initiates a drag.
        {...attributes}
        {...listeners}
      >
        <IconGripVertical />
      </Button>
      <button
        type="button"
        onClick={onSelect}
        className="tw:flex-1 tw:text-start tw:truncate tw:outline-none tw:focus-visible:underline"
      >
        {sublabel && (
          <span className="tw:me-2 tw:text-xs tw:text-muted-foreground">{sublabel}</span>
        )}
        {label}
      </button>
    </div>
  );
}

function DragOverlayPreview({
  id,
  plan,
  isCrossStage,
  isInvalid,
  targetStageName,
}: {
  id: string;
  plan: ProjectPlanData;
  isCrossStage: boolean;
  isInvalid: boolean;
  targetStageName: string | undefined;
}) {
  const meta = parseSortableId(id);
  if (!meta) return undefined;
  const invalidClasses =
    'tw:cursor-not-allowed tw:border-dashed tw:border-muted-foreground/40 tw:text-muted-foreground tw:opacity-60';
  if (meta.kind === 'stage') {
    const stage = plan.stages.find((s) => s.id === meta.stageId);
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'tw:flex tw:items-center tw:gap-2 tw:rounded-md tw:border tw:bg-card tw:px-2 tw:py-1.5 tw:text-sm tw:font-medium tw:shadow-md',
          isInvalid ? invalidClasses : 'tw:border-border',
        )}
      >
        {isInvalid && <IconBan aria-hidden className="tw:size-4 tw:shrink-0" />}
        <span>{stage?.names.en ?? meta.stageId}</span>
        {isInvalid && (
          <span className="tw:text-xs tw:text-muted-foreground">Drop on the list to reorder</span>
        )}
      </div>
    );
  }
  const stage = plan.stages.find((s) => s.id === meta.stageId);
  const task = stage?.tasks[meta.taskIndex];
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'tw:flex tw:items-center tw:gap-2 tw:rounded-md tw:border tw:bg-card tw:px-2 tw:py-1.5 tw:text-sm tw:shadow-md',
        isInvalid && invalidClasses,
        !isInvalid &&
          isCrossStage &&
          'tw:border-blue-500/60 tw:text-blue-700 dark:tw:text-blue-300',
        !isInvalid && !isCrossStage && 'tw:border-border',
      )}
    >
      {isInvalid && <IconBan aria-hidden className="tw:size-4 tw:shrink-0" />}
      {!isInvalid && isCrossStage && (
        <IconInfoCircle aria-hidden className="tw:size-4 tw:shrink-0" />
      )}
      <span>{task?.names.en ?? `Task ${meta.taskIndex + 1}`}</span>
      {isInvalid && (
        <span className="tw:text-xs tw:text-muted-foreground">Drop on the list to move</span>
      )}
      {!isInvalid && isCrossStage && targetStageName && (
        <span className="tw:text-xs tw:text-muted-foreground">
          → confirm move to &ldquo;{targetStageName}&rdquo;
        </span>
      )}
    </div>
  );
}
