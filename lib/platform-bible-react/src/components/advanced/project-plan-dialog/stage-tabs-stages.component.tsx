import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  EffortPopover,
  makeStage,
  makeTask,
  markCompleteOptions,
  moveItem,
  RowHeader,
  StageChecks,
  StageInlineForm,
  TaskInlineForm,
} from '@/components/advanced/project-plan-dialog/merged-stages-tasks-checks.component';
import {
  DEFAULT_LANG,
  getLocalized,
  type LangCode,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import type {
  CheckSetting,
  PlanStage,
  PlanTask,
} from '@/components/advanced/project-plan-dialog/types';

interface StageTabsStagesProps {
  stages: PlanStage[];
  checks: CheckSetting[];
  /**
   * Language being viewed/edited. Inline form inputs read and write THIS language's value. Row
   * headers fall back through `previousLang` and `DEFAULT_LANG` when this language is empty.
   */
  displayLang: LangCode;
  /**
   * Language the user was viewing immediately before switching to `displayLang`. Used as the
   * preferred source for reference text shown above each editable field.
   */
  previousLang?: LangCode;
  /**
   * When true, each Name/Description field shows a reference line, "Copy from <lang>" button, and
   * translation-coverage chips. When false (default), only the editable input is rendered.
   */
  translateMode?: boolean;
  onStagesChange: (updater: (prev: PlanStage[]) => PlanStage[]) => void;
  onStageChange: (next: PlanStage) => void;
  onTaskChange: (next: PlanTask) => void;
  onChecksChange: (next: CheckSetting[]) => void;
}

/**
 * Variation of {@link MergedStagesTasksChecks} where each expanded stage exposes its Description,
 * Checks, and Tasks as tabs inside the stage accordion. Collapsing a stage hides everything
 * (description, checks, and the task list) — unlike the merged variant, where the task list is
 * always visible beneath the stage header.
 */
export function StageTabsStages({
  stages,
  checks,
  displayLang,
  previousLang,
  translateMode = false,
  onStagesChange,
  onStageChange,
  onTaskChange,
  onChecksChange,
}: StageTabsStagesProps) {
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
                  <div className="tw:border-t tw:p-3">
                    <Tabs defaultValue="description">
                      <TabsList>
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="checks">
                          Checks ({requiredChecks.length + notifyChecks.length})
                        </TabsTrigger>
                        <TabsTrigger value="tasks">Tasks ({stage.tasks.length})</TabsTrigger>
                      </TabsList>

                      <TabsContent value="description" className="tw:pt-2">
                        <StageInlineForm
                          stage={stage}
                          displayLang={displayLang}
                          previousLang={previousLang}
                          translateMode={translateMode}
                          onChange={onStageChange}
                        />
                      </TabsContent>

                      <TabsContent value="checks" className="tw:pt-2">
                        <StageChecks
                          stage={stage}
                          stages={stages}
                          checks={checks}
                          onChecksChange={onChecksChange}
                          requiredChecks={requiredChecks}
                          notifyChecks={notifyChecks}
                        />
                      </TabsContent>

                      <TabsContent value="tasks" className="tw:pt-2">
                        <ul className="tw:flex tw:flex-col tw:gap-1">
                          {stage.tasks.map((task, taskIndex) => {
                            const taskOpen = !!expanded[task.id];
                            const taskIsDragging =
                              taskDragSrc?.stageIdx === stageIndex &&
                              taskDragSrc?.taskIdx === taskIndex;
                            const taskIsDropTarget =
                              taskDragOver?.stageIdx === stageIndex &&
                              taskDragOver?.taskIdx === taskIndex &&
                              taskDragSrc !== null &&
                              !(
                                taskDragSrc.stageIdx === stageIndex &&
                                taskDragSrc.taskIdx === taskIndex
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
                                  rightExtras={
                                    <EffortPopover task={task} onChange={onTaskChange} />
                                  }
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
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default StageTabsStages;
