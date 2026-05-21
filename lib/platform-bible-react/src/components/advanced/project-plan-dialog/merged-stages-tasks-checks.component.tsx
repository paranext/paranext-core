import { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Gauge,
  GripVertical,
  Plus,
  Trash2,
  X,
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
import { CHECK_GROUPS } from '@/components/advanced/project-plan-dialog/checks-tab.component';
import {
  DEFAULT_LANG,
  getLocalized,
  langDisplayName,
  langsWithContent,
  type LangCode,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import type {
  CheckCatalogItem,
  CheckSetting,
  MarkCompleteMode,
  PlanStage,
  PlanTask,
  RequiresEditingMode,
  TaskStartCondition,
} from '@/components/advanced/project-plan-dialog/types';

interface MergedStagesTasksChecksProps {
  stages: PlanStage[];
  checks: CheckSetting[];
  /**
   * Language being viewed/edited. Inline form inputs read and write THIS language's value.
   * Row headers fall back through `previousLang` and `DEFAULT_LANG` when this language is empty.
   */
  displayLang: LangCode;
  /**
   * Language the user was viewing immediately before switching to `displayLang`. Used as the
   * preferred source for reference text shown above each editable field.
   */
  previousLang?: LangCode;
  /**
   * When true, each Name/Description field shows a reference line, "Copy from <lang>" button,
   * and translation-coverage chips. When false (default), only the editable input is rendered.
   */
  translateMode?: boolean;
  onStagesChange: (updater: (prev: PlanStage[]) => PlanStage[]) => void;
  onStageChange: (next: PlanStage) => void;
  onTaskChange: (next: PlanTask) => void;
  onChecksChange: (next: CheckSetting[]) => void;
}

const newId = () => `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const moveItem = <T,>(arr: T[], from: number, to: number): T[] => {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export const makeStage = (lang: LangCode): PlanStage => ({
  id: newId(),
  names: { [lang]: 'New stage' },
  descriptions: {},
  tasks: [],
});

export const makeTask = (lang: LangCode): PlanTask => ({
  id: newId(),
  names: { [lang]: 'New task' },
  descriptions: {},
  markComplete: 'by-chapter',
  taskStart: 'after-previous-task-on-same-book',
  requiresEditing: 'no',
  effort: { easiest: 10, easy: 8, moderate: 5, difficult: 3 },
  bookCountsByDifficulty: { easiest: 7, easy: 18, moderate: 22, difficult: 19 },
});

export const markCompleteOptions: { value: MarkCompleteMode; label: string }[] = [
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

const CATALOG_BY_ID = new Map<string, CheckCatalogItem>();
for (const group of CHECK_GROUPS) for (const item of group.items) CATALOG_BY_ID.set(item.id, item);
const checkLabel = (id: string) => CATALOG_BY_ID.get(id)?.name ?? id;

export function MergedStagesTasksChecks({
  stages,
  checks,
  displayLang,
  previousLang,
  translateMode = false,
  onStagesChange,
  onStageChange,
  onTaskChange,
  onChecksChange,
}: MergedStagesTasksChecksProps) {
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
  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

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
        if (taskDragOver?.stageIdx !== stageIdx || taskDragOver?.taskIdx !== taskIdx) {
          setTaskDragOver({ stageIdx, taskIdx });
        }
      }
    },
    onDragLeave: () => {
      if (taskDragOver?.stageIdx === stageIdx && taskDragOver?.taskIdx === taskIdx) {
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
    const stage = makeStage(displayLang);
    onStagesChange((prev) => [...prev, stage]);
    setExpanded((prev) => ({ ...prev, [stage.id]: true }));
  };

  const addTaskTo = (stageId: string) => {
    const task = makeTask(displayLang);
    onStagesChange((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, tasks: [...s.tasks, task] } : s)),
    );
    setExpanded((prev) => ({ ...prev, [task.id]: true }));
  };

  const moveStage = (index: number, dir: -1 | 1) =>
    onStagesChange((prev) => moveItem(prev, index, index + dir));

  const moveTask = (stageIndex: number, taskIndex: number, dir: -1 | 1) =>
    onStagesChange((prev) =>
      prev.map((s, i) =>
        i === stageIndex ? { ...s, tasks: moveItem(s.tasks, taskIndex, taskIndex + dir) } : s,
      ),
    );

  const removeStage = (id: string) => {
    onStagesChange((prev) => prev.filter((s) => s.id !== id));
    // Strip references to the removed stage from check settings
    onChecksChange(
      checks
        .map((c) => ({
          ...c,
          notifyOnlyInStage: c.notifyOnlyInStage === id ? null : c.notifyOnlyInStage,
          requiredInStage: c.requiredInStage === id ? null : c.requiredInStage,
        }))
        .filter((c) => c.notifyOnlyInStage !== null || c.requiredInStage !== null),
    );
  };

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
            const requiredChecks = checks.filter((c) => c.requiredInStage === stage.id);
            const notifyChecks = checks.filter((c) => c.notifyOnlyInStage === stage.id);
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
                  name={
                    getLocalized(stage.names, displayLang, [
                      ...(previousLang ? [previousLang] : []),
                      DEFAULT_LANG,
                    ]) || '(unnamed stage)'
                  }
                  subtitle={`${stage.tasks.length} task${stage.tasks.length === 1 ? '' : 's'} • ${requiredChecks.length} required check${requiredChecks.length === 1 ? '' : 's'}`}
                  onMoveUp={() => moveStage(stageIndex, -1)}
                  onMoveDown={() => moveStage(stageIndex, 1)}
                  upDisabled={stageIndex === 0}
                  downDisabled={stageIndex === stages.length - 1}
                  onDelete={() => removeStage(stage.id)}
                />

                {stageOpen && (
                  <div className="tw:flex tw:flex-col tw:gap-4 tw:border-t tw:p-3">
                    <StageInlineForm
                      stage={stage}
                      displayLang={displayLang}
                      previousLang={previousLang}
                      translateMode={translateMode}
                      onChange={onStageChange}
                    />
                    <StageChecks
                      stage={stage}
                      stages={stages}
                      checks={checks}
                      onChecksChange={onChecksChange}
                      requiredChecks={requiredChecks}
                      notifyChecks={notifyChecks}
                    />
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
                          name={
                            getLocalized(task.names, displayLang, [
                              ...(previousLang ? [previousLang] : []),
                              DEFAULT_LANG,
                            ]) || '(unnamed task)'
                          }
                          subtitle={`Mark: ${markCompleteOptions.find((o) => o.value === task.markComplete)?.label ?? task.markComplete}`}
                          onMoveUp={() => moveTask(stageIndex, taskIndex, -1)}
                          onMoveDown={() => moveTask(stageIndex, taskIndex, 1)}
                          upDisabled={taskIndex === 0}
                          downDisabled={taskIndex === stage.tasks.length - 1}
                          onDelete={() => removeTask(stage.id, task.id)}
                          rightExtras={<EffortPopover task={task} onChange={onTaskChange} />}
                        />
                        {taskOpen && (
                          <div className="tw:border-t tw:p-3">
                            <TaskInlineForm
                              task={task}
                              displayLang={displayLang}
                              previousLang={previousLang}
                              translateMode={translateMode}
                              onChange={onTaskChange}
                            />
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

interface StageChecksProps {
  stage: PlanStage;
  stages: PlanStage[];
  checks: CheckSetting[];
  onChecksChange: (next: CheckSetting[]) => void;
  requiredChecks: CheckSetting[];
  notifyChecks: CheckSetting[];
}

export function StageChecks({
  stage,
  stages,
  checks,
  onChecksChange,
  requiredChecks,
  notifyChecks,
}: StageChecksProps) {
  const upsert = (checkId: string, patch: Partial<CheckSetting>) => {
    const existing = checks.find((c) => c.checkId === checkId);
    if (existing) {
      onChecksChange(
        checks
          .map((c) => (c.checkId === checkId ? { ...c, ...patch } : c))
          .filter((c) => c.notifyOnlyInStage !== null || c.requiredInStage !== null),
      );
    } else {
      onChecksChange([
        ...checks,
        { checkId, notifyOnlyInStage: null, requiredInStage: null, ...patch },
      ]);
    }
  };

  const setRequired = (checkId: string) => upsert(checkId, { requiredInStage: stage.id });
  const unsetRequired = (checkId: string) => upsert(checkId, { requiredInStage: null });
  const setNotify = (checkId: string) => upsert(checkId, { notifyOnlyInStage: stage.id });
  const unsetNotify = (checkId: string) => upsert(checkId, { notifyOnlyInStage: null });

  return (
    <div className="tw:flex tw:flex-col tw:gap-3 tw:rounded tw:border tw:bg-muted/30 tw:p-3">
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm tw:font-semibold">Checks</span>
        <span className="tw:text-xs tw:text-muted-foreground">
          Configure which checks fire for this stage
        </span>
      </div>

      <ChecksRow
        title="Required to leave this stage"
        helpText="Checks must pass before the next stage can begin."
        items={requiredChecks}
        onRemove={unsetRequired}
        addPopover={
          <AddCheckPopover
            label="Add required check"
            stage={stage}
            stages={stages}
            checks={checks}
            slot="required"
            onPick={setRequired}
          />
        }
      />

      <ChecksRow
        title="Notify only (optional) in this stage"
        helpText="Errors surface in All Tasks / My Tasks, but do not block progression."
        items={notifyChecks}
        onRemove={unsetNotify}
        addPopover={
          <AddCheckPopover
            label="Add notify-only check"
            stage={stage}
            stages={stages}
            checks={checks}
            slot="notify"
            onPick={setNotify}
          />
        }
      />
    </div>
  );
}

interface ChecksRowProps {
  title: string;
  helpText: string;
  items: CheckSetting[];
  onRemove: (checkId: string) => void;
  addPopover: React.ReactNode;
}

function ChecksRow({ title, helpText, items, onRemove, addPopover }: ChecksRowProps) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-2">
        <div>
          <div className="tw:text-sm tw:font-medium">{title}</div>
          <div className="tw:text-xs tw:text-muted-foreground">{helpText}</div>
        </div>
        {addPopover}
      </div>
      <div className="tw:flex tw:flex-wrap tw:gap-1">
        {items.length === 0 ? (
          <span className="tw:text-xs tw:italic tw:text-muted-foreground">None</span>
        ) : (
          items.map((c) => (
            <span
              key={c.checkId}
              className="tw:inline-flex tw:items-center tw:gap-1 tw:rounded-full tw:border tw:bg-background tw:px-2 tw:py-0.5 tw:text-xs"
            >
              {checkLabel(c.checkId)}
              <button
                type="button"
                aria-label={`Remove ${checkLabel(c.checkId)}`}
                onClick={() => onRemove(c.checkId)}
                className="tw:rounded tw:p-0.5 tw:hover:bg-accent"
              >
                <X className="tw:h-3 tw:w-3" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
}

interface AddCheckPopoverProps {
  label: string;
  stage: PlanStage;
  stages: PlanStage[];
  checks: CheckSetting[];
  slot: 'required' | 'notify';
  onPick: (checkId: string) => void;
}

function AddCheckPopover({
  label,
  stage,
  stages,
  checks,
  slot,
  onPick,
}: AddCheckPopoverProps) {
  const [open, setOpen] = useState(false);
  const currentStageIdx = stages.findIndex((s) => s.id === stage.id);
  const assigned = useMemo(() => {
    const set = new Set<string>();
    for (const c of checks) {
      if (slot === 'required' && c.requiredInStage === stage.id) set.add(c.checkId);
      if (slot === 'notify' && c.notifyOnlyInStage === stage.id) set.add(c.checkId);
    }
    return set;
  }, [checks, stage.id, slot]);
  // For the notify-only slot, exclude checks whose `requiredInStage` lives in this stage or any
  // earlier stage. A notify-only assignment after-or-at the required stage adds no value: the
  // check is already required by the time you reach this stage.
  const excludedByOrdering = useMemo(() => {
    if (slot !== 'notify' || currentStageIdx < 0) return new Set<string>();
    const set = new Set<string>();
    for (const c of checks) {
      if (!c.requiredInStage) continue;
      const reqIdx = stages.findIndex((s) => s.id === c.requiredInStage);
      if (reqIdx >= 0 && reqIdx <= currentStageIdx) set.add(c.checkId);
    }
    return set;
  }, [checks, stages, currentStageIdx, slot]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" className="tw:h-7 tw:text-xs">
          <Plus className="tw:me-1 tw:h-3 tw:w-3" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        style={{ zIndex: 600 }}
        className="tw:max-h-96 tw:w-80 tw:overflow-auto"
      >
        <div className="tw:flex tw:flex-col tw:gap-3">
          {CHECK_GROUPS.map((group) => {
            const available = group.items.filter(
              (item) => !assigned.has(item.id) && !excludedByOrdering.has(item.id),
            );
            if (available.length === 0) return null;
            return (
              <div key={group.id} className="tw:flex tw:flex-col tw:gap-1">
                <div className="tw:text-xs tw:font-semibold tw:text-muted-foreground">
                  {group.label}
                </div>
                <div className="tw:flex tw:flex-col">
                  {available.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onPick(item.id);
                        setOpen(false);
                      }}
                      className="tw:rounded tw:px-2 tw:py-1 tw:text-start tw:text-sm tw:hover:bg-accent"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
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
  /**
   * When provided, the name is rendered as an inline editable input (instead of a read-only label)
   * and the chevron alone toggles expansion. `name` should be the raw value for the current
   * language so edits map directly to it.
   */
  onNameChange?: (value: string) => void;
  /** Placeholder shown in the editable name input when `name` is empty. */
  namePlaceholder?: string;
}

export function RowHeader({
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
  onNameChange,
  namePlaceholder,
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
      {onNameChange ? (
        <>
          <button
            type="button"
            onClick={onToggle}
            aria-label={open ? 'Collapse' : 'Expand'}
            aria-expanded={open}
            className="tw:rounded tw:p-1 tw:text-muted-foreground tw:hover:bg-accent"
          >
            {open ? (
              <ChevronDown className="tw:h-4 tw:w-4" />
            ) : (
              <ChevronRight className="tw:h-4 tw:w-4" />
            )}
          </button>
          <Input
            value={name}
            placeholder={namePlaceholder}
            onChange={(e) => onNameChange(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'tw:h-7 tw:flex-1 tw:border-transparent tw:bg-transparent tw:px-1 tw:text-sm tw:hover:border-input tw:focus:border-input',
              isStage && 'tw:font-semibold',
            )}
          />
          {subtitle && (
            <span className="tw:shrink-0 tw:text-xs tw:text-muted-foreground">— {subtitle}</span>
          )}
        </>
      ) : (
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
      )}
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

export function StageInlineForm({
  stage,
  displayLang,
  previousLang,
  translateMode,
  hideName,
  onChange,
}: {
  stage: PlanStage;
  displayLang: LangCode;
  previousLang?: LangCode;
  translateMode: boolean;
  /** When true, the Name field is omitted (e.g. when the name is edited inline in the row header). */
  hideName?: boolean;
  onChange: (next: PlanStage) => void;
}) {
  return (
    <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:md:grid-cols-2">
      {!hideName && (
        <LocalizedField
          label="Name"
          map={stage.names}
          displayLang={displayLang}
          previousLang={previousLang}
          translateMode={translateMode}
          onChange={(value) =>
            onChange({ ...stage, names: { ...stage.names, [displayLang]: value } })
          }
        />
      )}
      <LocalizedField
        label="Description"
        multiline
        map={stage.descriptions}
        displayLang={displayLang}
        previousLang={previousLang}
        translateMode={translateMode}
        onChange={(value) =>
          onChange({
            ...stage,
            descriptions: { ...stage.descriptions, [displayLang]: value },
          })
        }
      />
    </div>
  );
}

export function TaskInlineForm({
  task,
  displayLang,
  previousLang,
  translateMode,
  hideName,
  onChange,
}: {
  task: PlanTask;
  displayLang: LangCode;
  previousLang?: LangCode;
  translateMode: boolean;
  /** When true, the Name field is omitted (e.g. when the name is edited inline in the row header). */
  hideName?: boolean;
  onChange: (next: PlanTask) => void;
}) {
  return (
    <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:md:grid-cols-2">
      {!hideName && (
        <LocalizedField
          label="Name"
          map={task.names}
          displayLang={displayLang}
          previousLang={previousLang}
          translateMode={translateMode}
          onChange={(value) =>
            onChange({ ...task, names: { ...task.names, [displayLang]: value } })
          }
        />
      )}
      <LocalizedField
        label="Description"
        multiline
        map={task.descriptions}
        displayLang={displayLang}
        previousLang={previousLang}
        translateMode={translateMode}
        onChange={(value) =>
          onChange({ ...task, descriptions: { ...task.descriptions, [displayLang]: value } })
        }
      />
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

export function EffortPopover({
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

function pickReferenceLang(
  map: Record<string, string>,
  displayLang: LangCode,
  previousLang: LangCode | undefined,
): LangCode | undefined {
  if (previousLang && previousLang !== displayLang) {
    const v = map[previousLang];
    if (v && v.length > 0) return previousLang;
  }
  let best: LangCode | undefined;
  for (const lang of Object.keys(map)) {
    if (lang === displayLang) continue;
    const v = map[lang];
    if (!v || v.length === 0) continue;
    if (!best || v.length > (map[best]?.length ?? 0)) best = lang;
  }
  return best;
}

function LocalizedField({
  label,
  map,
  displayLang,
  previousLang,
  translateMode,
  multiline,
  onChange,
}: {
  label: string;
  map: Record<string, string>;
  displayLang: LangCode;
  previousLang?: LangCode;
  translateMode: boolean;
  multiline?: boolean;
  onChange: (value: string) => void;
}) {
  const value = map[displayLang] ?? '';
  const refLang = useMemo(
    () => (translateMode ? pickReferenceLang(map, displayLang, previousLang) : undefined),
    [map, displayLang, previousLang, translateMode],
  );
  const refValue = refLang ? map[refLang] : undefined;
  const covered = useMemo(() => langsWithContent(map), [map]);

  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <Label className="tw:text-xs tw:text-muted-foreground">
        {label}
        {translateMode && ` — editing ${langDisplayName(displayLang)}`}
      </Label>
      {translateMode &&
        (refLang && refValue ? (
          <div className="tw:flex tw:items-start tw:justify-between tw:gap-2 tw:rounded tw:bg-muted/40 tw:px-2 tw:py-1">
            <div className="tw:flex tw:flex-1 tw:items-baseline tw:gap-1 tw:min-w-0">
              <span className="tw:text-[10px] tw:font-semibold tw:uppercase tw:text-muted-foreground">
                {refLang}:
              </span>
              <span className="tw:line-clamp-3 tw:text-xs tw:italic tw:text-muted-foreground">
                {refValue}
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="tw:h-6 tw:shrink-0 tw:text-xs"
              onClick={() => onChange(refValue)}
              title={`Copy ${langDisplayName(refLang)} text into ${langDisplayName(displayLang)}`}
              type="button"
            >
              Copy from {refLang.toUpperCase()}
            </Button>
          </div>
        ) : (
          <div className="tw:rounded tw:bg-muted/40 tw:px-2 tw:py-1 tw:text-xs tw:italic tw:text-muted-foreground">
            No other translation available as reference
          </div>
        ))}
      {multiline ? (
        <Textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {translateMode && <CoverageChips covered={covered} displayLang={displayLang} />}
    </div>
  );
}

function CoverageChips({
  covered,
  displayLang,
}: {
  covered: LangCode[];
  displayLang: LangCode;
}) {
  const all = covered.includes(displayLang) ? covered : [displayLang, ...covered];
  return (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-1">
      <span className="tw:text-[10px] tw:text-muted-foreground">Translations:</span>
      {all.map((lang) => {
        const hasContent = covered.includes(lang);
        const isCurrent = lang === displayLang;
        return (
          <span
            key={lang}
            title={hasContent ? langDisplayName(lang) : `${langDisplayName(lang)} (empty)`}
            className={cn(
              'tw:rounded-full tw:border tw:px-1.5 tw:py-0 tw:text-[10px] tw:uppercase',
              isCurrent && 'tw:border-primary tw:font-semibold',
              hasContent
                ? 'tw:bg-background tw:text-foreground'
                : 'tw:bg-transparent tw:text-muted-foreground tw:border-dashed',
            )}
          >
            {lang}
          </span>
        );
      })}
    </div>
  );
}

export default MergedStagesTasksChecks;
