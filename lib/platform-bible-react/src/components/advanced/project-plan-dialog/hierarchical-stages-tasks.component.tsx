import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Gauge,
  GripVertical,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  DEFAULT_LANG,
  getLocalized,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import type {
  MarkCompleteMode,
  PlanStage,
  PlanTask,
  RequiresEditingMode,
  TaskStartCondition,
} from '@/components/advanced/project-plan-dialog/types';

interface HierarchicalStagesTasksProps {
  stages: PlanStage[];
  onStagesChange: (updater: (prev: PlanStage[]) => PlanStage[]) => void;
  onStageChange: (next: PlanStage) => void;
  onTaskChange: (next: PlanTask) => void;
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
  bookCountsByDifficulty: { easiest: 7, easy: 18, moderate: 22, difficult: 19 },
});

const markCompleteOptions: { value: MarkCompleteMode; label: string }[] = [
  { value: 'by-book', label: 'By book' },
  { value: 'by-chapter', label: 'By chapter' },
  { value: 'by-project', label: 'By project' },
];

const taskStartOptions: { value: TaskStartCondition; label: string }[] = [
  { value: 'after-previous-task-on-same-book', label: 'After previous task on same book' },
  { value: 'after-previous-stage-on-same-book', label: 'After previous stage on same book' },
  { value: 'after-previous-task-anywhere', label: 'After previous task (anywhere)' },
  { value: 'after-previous-stage-anywhere', label: 'After previous stage (anywhere)' },
  { value: 'manual', label: 'Manual' },
];

const requiresEditingOptions: { value: RequiresEditingMode; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'scripture-text', label: 'Scripture Text' },
];

export function HierarchicalStagesTasks({
  stages,
  onStagesChange,
  onStageChange,
  onTaskChange,
}: HierarchicalStagesTasksProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [dragSrc, setDragSrc] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [taskDragSrc, setTaskDragSrc] = useState<{ stageIdx: number; taskIdx: number } | null>(
    null,
  );
  const [taskDragOver, setTaskDragOver] = useState<{
    stageIdx: number;
    taskIdx: number;
  } | null>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const taskDragHandlers = (stageIdx: number, taskIdx: number, taskId: string) => ({
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      e.stopPropagation();
      setTaskDragSrc({ stageIdx, taskIdx });
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', taskId);
    },
    onDragOver: (e: React.DragEvent) => {
      if (
        taskDragSrc !== null &&
        !(taskDragSrc.stageIdx === stageIdx && taskDragSrc.taskIdx === taskIdx)
      ) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        if (
          taskDragOver?.stageIdx !== stageIdx ||
          taskDragOver?.taskIdx !== taskIdx
        ) {
          setTaskDragOver({ stageIdx, taskIdx });
        }
      }
    },
    onDragLeave: () => {
      if (
        taskDragOver?.stageIdx === stageIdx &&
        taskDragOver?.taskIdx === taskIdx
      ) {
        setTaskDragOver(null);
      }
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        taskDragSrc !== null &&
        !(taskDragSrc.stageIdx === stageIdx && taskDragSrc.taskIdx === taskIdx)
      ) {
        const from = taskDragSrc;
        const to = { stageIdx, taskIdx };
        onStagesChange((prev) => {
          if (from.stageIdx === to.stageIdx) {
            return prev.map((s, i) =>
              i === from.stageIdx
                ? { ...s, tasks: moveItem(s.tasks, from.taskIdx, to.taskIdx) }
                : s,
            );
          }
          const next = prev.map((s) => ({ ...s, tasks: [...s.tasks] }));
          const [task] = next[from.stageIdx].tasks.splice(from.taskIdx, 1);
          next[to.stageIdx].tasks.splice(to.taskIdx, 0, task);
          return next;
        });
      }
      setTaskDragSrc(null);
      setTaskDragOver(null);
    },
    onDragEnd: () => {
      setTaskDragSrc(null);
      setTaskDragOver(null);
    },
  });

  const stageDragHandlers = (stageIndex: number, stageId: string) => ({
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      setDragSrc(stageIndex);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', stageId);
    },
    onDragOver: (e: React.DragEvent) => {
      if (dragSrc !== null && dragSrc !== stageIndex) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOver !== stageIndex) setDragOver(stageIndex);
      }
    },
    onDragLeave: () => {
      if (dragOver === stageIndex) setDragOver(null);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      if (dragSrc !== null && dragSrc !== stageIndex) {
        onStagesChange((prev) => moveItem(prev, dragSrc, stageIndex));
      }
      setDragSrc(null);
      setDragOver(null);
    },
    onDragEnd: () => {
      setDragSrc(null);
      setDragOver(null);
    },
  });

  const addStageAtEnd = () => {
    const stage = makeStage();
    onStagesChange((prev) => [...prev, stage]);
    setExpanded((prev) => ({ ...prev, [stage.id]: true }));
  };

  const addTaskTo = (stageId: string) => {
    const task = makeTask();
    onStagesChange((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, tasks: [...s.tasks, task] } : s)),
    );
    setExpanded((prev) => ({ ...prev, [task.id]: true }));
  };

  const moveStage = (index: number, dir: -1 | 1) => {
    onStagesChange((prev) => moveItem(prev, index, index + dir));
  };

  const moveTask = (stageIndex: number, taskIndex: number, dir: -1 | 1) => {
    onStagesChange((prev) =>
      prev.map((s, i) =>
        i === stageIndex ? { ...s, tasks: moveItem(s.tasks, taskIndex, taskIndex + dir) } : s,
      ),
    );
  };

  const removeStage = (id: string) =>
    onStagesChange((prev) => prev.filter((s) => s.id !== id));

  const removeTask = (stageId: string, taskId: string) =>
    onStagesChange((prev) =>
      prev.map((s) =>
        s.id === stageId ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) } : s,
      ),
    );

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <div className="tw:flex tw:gap-2">
        <Button size="sm" variant="outline" onClick={addStageAtEnd}>
          <Plus className="tw:me-1 tw:h-4 tw:w-4" />
          Add Stage
        </Button>
      </div>

      {stages.length === 0 ? (
        <div className="tw:rounded tw:border tw:border-dashed tw:p-4 tw:text-center tw:text-sm tw:text-muted-foreground">
          This plan has no stages yet. Pick a template from the dropdown above or add a stage.
        </div>
      ) : (
        <ul className="tw:flex tw:flex-col tw:gap-1">
          {stages.map((stage, stageIndex) => {
            const stageOpen = !!expanded[stage.id];
            const isDragging = dragSrc === stageIndex;
            const isDropTarget =
              dragOver === stageIndex && dragSrc !== null && dragSrc !== stageIndex;
            return (
              <li
                key={stage.id}
                {...stageDragHandlers(stageIndex, stage.id)}
                className={cn(
                  'tw:rounded tw:border',
                  isDragging && 'tw:opacity-50',
                  isDropTarget && 'tw:ring-2 tw:ring-primary',
                )}
              >
                <RowHeader
                  isStage
                  open={stageOpen}
                  onToggle={() => toggle(stage.id)}
                  name={getLocalized(stage.names, DEFAULT_LANG) || '(unnamed stage)'}
                  subtitle={`${stage.tasks.length} task${stage.tasks.length === 1 ? '' : 's'}`}
                  onMoveUp={() => moveStage(stageIndex, -1)}
                  onMoveDown={() => moveStage(stageIndex, 1)}
                  upDisabled={stageIndex === 0}
                  downDisabled={stageIndex === stages.length - 1}
                  onDelete={() => removeStage(stage.id)}
                />

                {stageOpen && (
                  <div className="tw:border-t tw:p-3">
                    <StageInlineForm stage={stage} onChange={onStageChange} />
                  </div>
                )}

                <ul className="tw:flex tw:flex-col tw:gap-1 tw:p-2 tw:ps-8">
                  {stage.tasks.map((task, taskIndex) => {
                    const taskOpen = !!expanded[task.id];
                    const taskIsDragging =
                      taskDragSrc?.stageIdx === stageIndex && taskDragSrc?.taskIdx === taskIndex;
                    const taskIsDropTarget =
                      taskDragOver?.stageIdx === stageIndex &&
                      taskDragOver?.taskIdx === taskIndex &&
                      taskDragSrc !== null &&
                      !(
                        taskDragSrc.stageIdx === stageIndex && taskDragSrc.taskIdx === taskIndex
                      );
                    return (
                      <li
                        key={task.id}
                        {...taskDragHandlers(stageIndex, taskIndex, task.id)}
                        className={cn(
                          'tw:rounded tw:border',
                          taskIsDragging && 'tw:opacity-50',
                          taskIsDropTarget && 'tw:ring-2 tw:ring-primary',
                        )}
                      >
                        <RowHeader
                          open={taskOpen}
                          onToggle={() => toggle(task.id)}
                          name={getLocalized(task.names, DEFAULT_LANG) || '(unnamed task)'}
                          subtitle={summarizeTask(task)}
                          onMoveUp={() => moveTask(stageIndex, taskIndex, -1)}
                          onMoveDown={() => moveTask(stageIndex, taskIndex, 1)}
                          upDisabled={taskIndex === 0}
                          downDisabled={taskIndex === stage.tasks.length - 1}
                          onDelete={() => removeTask(stage.id, task.id)}
                          rightExtras={<EffortPopover task={task} onChange={onTaskChange} />}
                        />

                        {taskOpen && (
                          <div className="tw:border-t tw:p-3">
                            <TaskInlineForm task={task} onChange={onTaskChange} />
                          </div>
                        )}
                      </li>
                    );
                  })}
                  <li>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="tw:text-muted-foreground"
                      onClick={() => addTaskTo(stage.id)}
                    >
                      <Plus className="tw:me-1 tw:h-4 tw:w-4" />
                      Add Task
                    </Button>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function summarizeTask(task: PlanTask): string {
  const mc = markCompleteOptions.find((o) => o.value === task.markComplete)?.label ?? task.markComplete;
  return `Mark: ${mc}`;
}

interface RowHeaderProps {
  isStage?: boolean;
  open: boolean;
  onToggle: () => void;
  name: string;
  subtitle?: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  upDisabled: boolean;
  downDisabled: boolean;
  onDelete: () => void;
  rightExtras?: React.ReactNode;
}

function RowHeader({
  isStage,
  open,
  onToggle,
  name,
  subtitle,
  onMoveUp,
  onMoveDown,
  upDisabled,
  downDisabled,
  onDelete,
  rightExtras,
}: RowHeaderProps) {
  return (
    <div
      className={cn(
        'tw:group tw:flex tw:items-center tw:gap-2 tw:px-2 tw:py-1',
        isStage && 'tw:bg-muted/40',
      )}
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        title="Drag to reorder"
        className="tw:cursor-grab tw:rounded tw:p-1 tw:text-muted-foreground tw:hover:bg-accent"
      >
        <GripVertical className="tw:h-4 tw:w-4" />
      </button>
      <button
        type="button"
        onClick={onToggle}
        className="tw:flex tw:flex-1 tw:items-center tw:gap-2 tw:text-start"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="tw:h-4 tw:w-4 tw:text-muted-foreground" />
        ) : (
          <ChevronRight className="tw:h-4 tw:w-4 tw:text-muted-foreground" />
        )}
        <span className={cn('tw:text-sm', isStage && 'tw:font-semibold')}>{name}</span>
        {subtitle && (
          <span className="tw:text-xs tw:text-muted-foreground">— {subtitle}</span>
        )}
      </button>
      <div className="tw:flex tw:items-center tw:gap-1 tw:opacity-0 tw:transition-opacity tw:group-hover:opacity-100 tw:group-focus-within:opacity-100">
        {rightExtras}
        <RowIconButton label="Move up" onClick={onMoveUp} disabled={upDisabled}>
          <ChevronUp className="tw:h-4 tw:w-4" />
        </RowIconButton>
        <RowIconButton label="Move down" onClick={onMoveDown} disabled={downDisabled}>
          <ChevronDown className="tw:h-4 tw:w-4" />
        </RowIconButton>
        <RowIconButton label="Delete" onClick={onDelete}>
          <Trash2 className="tw:h-4 tw:w-4" />
        </RowIconButton>
      </div>
    </div>
  );
}

function RowIconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
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

function StageInlineForm({
  stage,
  onChange,
}: {
  stage: PlanStage;
  onChange: (next: PlanStage) => void;
}) {
  return (
    <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:md:grid-cols-2">
      <Field label="Name">
        <Input
          value={getLocalized(stage.names, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({ ...stage, names: { ...stage.names, [DEFAULT_LANG]: e.target.value } })
          }
        />
      </Field>
      <Field label="Description">
        <Textarea
          rows={2}
          value={getLocalized(stage.descriptions, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({
              ...stage,
              descriptions: { ...stage.descriptions, [DEFAULT_LANG]: e.target.value },
            })
          }
        />
      </Field>
    </div>
  );
}

function TaskInlineForm({
  task,
  onChange,
}: {
  task: PlanTask;
  onChange: (next: PlanTask) => void;
}) {
  return (
    <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:md:grid-cols-2">
      <Field label="Name">
        <Input
          value={getLocalized(task.names, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({ ...task, names: { ...task.names, [DEFAULT_LANG]: e.target.value } })
          }
        />
      </Field>
      <Field label="Description">
        <Textarea
          rows={2}
          value={getLocalized(task.descriptions, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({
              ...task,
              descriptions: { ...task.descriptions, [DEFAULT_LANG]: e.target.value },
            })
          }
        />
      </Field>
      <Field label="Mark task as complete">
        <Select
          value={task.markComplete}
          onValueChange={(v) => onChange({ ...task, markComplete: v as MarkCompleteMode })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="tw:z-600">
            {markCompleteOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="When can this task start?">
        <Select
          value={task.taskStart}
          onValueChange={(v) => onChange({ ...task, taskStart: v as TaskStartCondition })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="tw:z-600">
            {taskStartOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Requires editing">
        <Select
          value={task.requiresEditing}
          onValueChange={(v) =>
            onChange({ ...task, requiresEditing: v as RequiresEditingMode })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="tw:z-600">
            {requiresEditingOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}

function EffortPopover({
  task,
  onChange,
}: {
  task: PlanTask;
  onChange: (next: PlanTask) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Edit effort"
          title="Edit effort"
          onClick={(e) => e.stopPropagation()}
          className="tw:flex tw:items-center tw:gap-1 tw:rounded tw:p-1 tw:hover:bg-accent"
        >
          <Gauge className="tw:h-4 tw:w-4" />
          <span className="tw:text-xs">Effort</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" style={{ zIndex: 600 }} className="tw:w-80">
        <div className="tw:flex tw:flex-col tw:gap-3">
          <div>
            <div className="tw:text-sm tw:font-semibold">Expected rate of progress</div>
            <div className="tw:text-xs tw:text-muted-foreground">Verses per day per book difficulty</div>
          </div>
          {(['easiest', 'easy', 'moderate', 'difficult'] as const).map((key) => {
            const labels = {
              easiest: 'Easiest',
              easy: 'Easy',
              moderate: 'Moderate',
              difficult: 'Difficult',
            } as const;
            const count = task.bookCountsByDifficulty?.[key] ?? 0;
            return (
              <div
                key={key}
                className="tw:grid tw:grid-cols-[80px_80px_1fr] tw:items-center tw:gap-2"
              >
                <Label className="tw:text-sm">{labels[key]}</Label>
                <Input
                  type="number"
                  min={1}
                  value={task.effort[key]}
                  onChange={(e) =>
                    onChange({
                      ...task,
                      effort: { ...task.effort, [key]: Number(e.target.value) || 0 },
                    })
                  }
                />
                <button
                  type="button"
                  className="tw:text-start tw:text-xs tw:text-primary tw:underline-offset-2 tw:hover:underline"
                  disabled
                  title="Choose books (not wired in v1)"
                >
                  {count} books
                </button>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <Label className="tw:text-xs tw:text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export default HierarchicalStagesTasks;
