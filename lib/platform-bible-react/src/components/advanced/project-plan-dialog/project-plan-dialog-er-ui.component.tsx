import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import { OrgPlanPicker } from '@/components/advanced/project-plan-dialog/org-plan-picker.component';
import {
  ErUiStagesTasksList,
  type ErUiSelection,
} from '@/components/advanced/project-plan-dialog/er-ui-stages-tasks-list.component';
import { ErUiSettings } from '@/components/advanced/project-plan-dialog/er-ui-settings.component';
import { ChecksTab } from '@/components/advanced/project-plan-dialog/checks-tab.component';
import { MoveTaskConfirmDialog } from '@/components/advanced/project-plan-dialog/move-task-confirm-dialog.component';
import { DEFAULT_LANG } from '@/components/advanced/project-plan-dialog/localized.utils';
import { cn } from '@/utils/shadcn-ui/utils';
import type {
  CheckSetting,
  OrgProvidedPlan,
  PlanStage,
  PlanTask,
  ProjectPlan,
} from '@/components/advanced/project-plan-dialog/types';

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

export interface ProjectPlanDialogErUiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  plan: ProjectPlan;
  orgProvidedPlans: OrgProvidedPlan[];
  onSubmit: (plan: ProjectPlan) => void;
  onCancel?: () => void;
  defaultTab?: 'stages-tasks' | 'checks';
}

export function ProjectPlanDialogErUi({
  open,
  onOpenChange,
  projectName,
  plan,
  orgProvidedPlans,
  onSubmit,
  onCancel,
  defaultTab = 'stages-tasks',
}: ProjectPlanDialogErUiProps) {
  const [workingPlan, setWorkingPlan] = useState<ProjectPlan>(plan);
  const [selected, setSelected] = useState<ErUiSelection | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'stages-tasks' | 'checks'>(defaultTab);
  const [pendingMove, setPendingMove] = useState<
    { stageIndex: number; taskIndex: number; dir: -1 | 1 } | undefined
  >(undefined);
  // True only for changes the user has flagged as "customizing" the structure:
  // stage move/delete, cross-stage task move, or task delete.
  const [customized, setCustomized] = useState(false);

  useEffect(() => {
    if (open) {
      setWorkingPlan(plan);
      setSelected(undefined);
      setActiveTab(defaultTab);
      setPendingMove(undefined);
      setCustomized(false);
    }
  }, [open, plan, defaultTab]);

  const basePlanName =
    orgProvidedPlans.find((p) => p.id === workingPlan.basePlanRef)?.name ?? workingPlan.name;

  const isDirty = useMemo(
    () => JSON.stringify(workingPlan) !== JSON.stringify(plan),
    [workingPlan, plan],
  );

  const handleStageChange = (next: PlanStage) =>
    setWorkingPlan((prev) => ({
      ...prev,
      stages: prev.stages.map((s) => (s.id === next.id ? next : s)),
    }));

  const handleTaskChange = (next: PlanTask) =>
    setWorkingPlan((prev) => ({
      ...prev,
      stages: prev.stages.map((s) => ({
        ...s,
        tasks: s.tasks.map((t) => (t.id === next.id ? next : t)),
      })),
    }));

  let selectedStageId: string | undefined;
  if (selected !== undefined)
    selectedStageId = selected.kind === 'stage' ? selected.id : selected.stageId;

  const addStage = () => {
    const stage = makeStage();
    setWorkingPlan((prev) => {
      const insertAt =
        selectedStageId === undefined
          ? prev.stages.length
          : prev.stages.findIndex((s) => s.id === selectedStageId) + 1;
      const stages = [...prev.stages];
      stages.splice(insertAt, 0, stage);
      return { ...prev, stages };
    });
    setSelected({ kind: 'stage', id: stage.id });
  };

  const addTask = () => {
    const stageId = selectedStageId ?? workingPlan.stages[workingPlan.stages.length - 1]?.id;
    if (stageId === undefined) return;
    const task = makeTask();
    setWorkingPlan((prev) => ({
      ...prev,
      stages: prev.stages.map((s) => {
        if (s.id !== stageId) return s;
        const insertAt =
          selected?.kind === 'task'
            ? s.tasks.findIndex((t) => t.id === selected.taskId) + 1
            : s.tasks.length;
        const tasks = [...s.tasks];
        tasks.splice(insertAt, 0, task);
        return { ...s, tasks };
      }),
    }));
    setSelected({ kind: 'task', stageId, taskId: task.id });
  };

  const moveStage = (stageIndex: number, dir: -1 | 1) => {
    setWorkingPlan((prev) => ({
      ...prev,
      stages: moveItem(prev.stages, stageIndex, stageIndex + dir),
    }));
    setCustomized(true);
  };

  const moveTask = (stageIndex: number, taskIndex: number, dir: -1 | 1) => {
    const stage = workingPlan.stages[stageIndex];
    const crossesStage =
      (dir === -1 && taskIndex === 0) || (dir === 1 && taskIndex === stage.tasks.length - 1);
    if (crossesStage) {
      // Defer the move until the user confirms losing recorded progress.
      setPendingMove({ stageIndex, taskIndex, dir });
      return;
    }
    setWorkingPlan((prev) => ({
      ...prev,
      stages: prev.stages.map((s, i) =>
        i === stageIndex ? { ...s, tasks: moveItem(s.tasks, taskIndex, taskIndex + dir) } : s,
      ),
    }));
  };

  const executePendingMove = () => {
    if (pendingMove === undefined) return;
    const { stageIndex, taskIndex, dir } = pendingMove;
    const toStageIndex = stageIndex + dir;
    const movedTaskId = workingPlan.stages[stageIndex]?.tasks[taskIndex]?.id;
    const toStageId = workingPlan.stages[toStageIndex]?.id;
    setWorkingPlan((prev) => {
      const stages = prev.stages.map((s) => ({ ...s, tasks: [...s.tasks] }));
      const [task] = stages[stageIndex].tasks.splice(taskIndex, 1);
      // Moving up lands at the end of the previous stage; moving down lands at the start of the next.
      if (dir === -1) stages[toStageIndex].tasks.push(task);
      else stages[toStageIndex].tasks.unshift(task);
      return { ...prev, stages };
    });
    if (movedTaskId !== undefined && toStageId !== undefined)
      setSelected({ kind: 'task', stageId: toStageId, taskId: movedTaskId });
    setCustomized(true);
  };

  const deleteStage = (stageId: string) => {
    setWorkingPlan((prev) => ({ ...prev, stages: prev.stages.filter((s) => s.id !== stageId) }));
    if (selectedStageId === stageId) setSelected(undefined);
    setCustomized(true);
  };

  const deleteTask = (stageId: string, taskId: string) => {
    setWorkingPlan((prev) => ({
      ...prev,
      stages: prev.stages.map((s) =>
        s.id === stageId ? { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) } : s,
      ),
    }));
    if (selected?.kind === 'task' && selected.taskId === taskId) setSelected(undefined);
    setCustomized(true);
  };

  const handleOrgPlanReplace = (selectedPlan: OrgProvidedPlan) => {
    setWorkingPlan({
      ...workingPlan,
      basePlanRef: selectedPlan.id,
      name: selectedPlan.name,
      stages: structuredClone(selectedPlan.stages),
      checks: structuredClone(selectedPlan.checks),
    });
    setSelected(undefined);
    setCustomized(false);
  };

  const selectedStage =
    selected !== undefined
      ? workingPlan.stages.find((s) =>
          selected.kind === 'stage' ? s.id === selected.id : s.id === selected.stageId,
        )
      : undefined;
  const selectedTask =
    selected !== undefined && selected.kind === 'task'
      ? selectedStage?.tasks.find((t) => t.id === selected.taskId)
      : undefined;

  const showPanel = selected !== undefined && selectedStage !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:inset-0 tw:flex tw:h-screen tw:max-h-none tw:w-screen tw:max-w-none tw:sm:max-w-none tw:translate-x-0 tw:translate-y-0 tw:flex-col tw:gap-0 tw:rounded-none tw:p-0 tw:rtl:translate-x-0">
        <DialogHeader className="tw:border-b tw:p-4 tw:pb-3">
          <DialogTitle>Project Plan: {projectName}</DialogTitle>
        </DialogHeader>

        <div className="tw:flex tw:items-center tw:gap-3 tw:border-b tw:px-4 tw:py-3">
          <OrgPlanPicker
            orgProvidedPlans={orgProvidedPlans}
            currentBasePlanRef={workingPlan.basePlanRef}
            isDirty={isDirty}
            onReplaceWith={handleOrgPlanReplace}
          />
          {customized && <span className="tw:text-sm tw:text-muted-foreground">(customized)</span>}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            if (v === 'stages-tasks' || v === 'checks') setActiveTab(v);
          }}
          className="tw:flex tw:flex-1 tw:flex-col tw:overflow-hidden"
        >
          <TabsList className="tw:mx-4 tw:mt-3 tw:w-fit">
            <TabsTrigger value="stages-tasks">Stages / Tasks</TabsTrigger>
            <TabsTrigger value="checks">Checks</TabsTrigger>
          </TabsList>

          <TabsContent
            value="stages-tasks"
            className="tw:flex tw:flex-1 tw:flex-col tw:overflow-hidden tw:px-4 tw:py-3"
          >
            <div className="tw:mb-3 tw:flex tw:gap-2">
              <Button size="sm" variant="outline" onClick={addStage}>
                <Plus className="tw:me-1 tw:h-4 tw:w-4" />
                Add stage
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={addTask}
                disabled={workingPlan.stages.length === 0}
              >
                <Plus className="tw:me-1 tw:h-4 tw:w-4" />
                Add task
              </Button>
            </div>
            <div
              className={cn(
                'tw:grid tw:min-h-0 tw:flex-1 tw:gap-6',
                showPanel ? 'tw:grid-cols-[320px_1fr]' : 'tw:grid-cols-1',
              )}
            >
              <div className="tw:min-h-0 tw:overflow-y-auto">
                <ErUiStagesTasksList
                  stages={workingPlan.stages}
                  selected={selected}
                  onToggle={setSelected}
                  onMoveStage={moveStage}
                  onMoveTask={moveTask}
                  onDeleteStage={deleteStage}
                  onDeleteTask={deleteTask}
                  compact={showPanel}
                />
              </div>
              {showPanel && selectedStage && (
                <div className="tw:min-h-0 tw:overflow-y-auto">
                  <ErUiSettings
                    stage={selectedStage}
                    task={selectedTask}
                    onStageChange={handleStageChange}
                    onTaskChange={handleTaskChange}
                    onBack={() => setSelected(undefined)}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="checks" className="tw:flex-1 tw:overflow-auto tw:px-4 tw:py-3">
            <ChecksTab
              stages={workingPlan.stages}
              checks={workingPlan.checks}
              onChecksChange={(checks: CheckSetting[]) => setWorkingPlan((p) => ({ ...p, checks }))}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="tw:border-t tw:p-4">
          <Button
            variant="outline"
            onClick={() => {
              if (onCancel) onCancel();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit(workingPlan);
              onOpenChange(false);
            }}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>

      <MoveTaskConfirmDialog
        open={pendingMove !== undefined}
        onOpenChange={(next) => {
          if (!next) setPendingMove(undefined);
        }}
        basePlanName={basePlanName}
        onConfirm={executePendingMove}
      />
    </Dialog>
  );
}

export default ProjectPlanDialogErUi;
