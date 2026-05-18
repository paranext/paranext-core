import { useEffect, useMemo, useState } from 'react';
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
import { StagesTasksTab } from '@/components/advanced/project-plan-dialog/stages-tasks-tab.component';
import { ChecksTab } from '@/components/advanced/project-plan-dialog/checks-tab.component';
import type {
  CheckSetting,
  OrgProvidedPlan,
  PlanStage,
  PlanTask,
  ProjectPlan,
  Selection,
} from '@/components/advanced/project-plan-dialog/types';

export interface ProjectPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  plan: ProjectPlan;
  orgProvidedPlans: OrgProvidedPlan[];
  onSubmit: (plan: ProjectPlan) => void;
  onCancel?: () => void;
  defaultTab?: 'stages-tasks' | 'checks';
}

export function ProjectPlanDialog({
  open,
  onOpenChange,
  projectName,
  plan,
  orgProvidedPlans,
  onSubmit,
  onCancel,
  defaultTab = 'stages-tasks',
}: ProjectPlanDialogProps) {
  const [workingPlan, setWorkingPlan] = useState<ProjectPlan>(plan);
  const [selection, setSelection] = useState<Selection>(() => {
    const firstStage = plan.stages[0];
    if (!firstStage) return {};
    const firstTask = firstStage.tasks[0];
    return firstTask
      ? { stageId: firstStage.id, taskId: firstTask.id }
      : { stageId: firstStage.id };
  });
  const [activeTab, setActiveTab] = useState<'stages-tasks' | 'checks'>(defaultTab);

  useEffect(() => {
    if (open) {
      setWorkingPlan(plan);
    }
  }, [open, plan]);

  const stages = workingPlan.stages;

  const updateStages = (updater: (prev: PlanStage[]) => PlanStage[]) => {
    setWorkingPlan((prev) => ({ ...prev, stages: updater(prev.stages) }));
  };

  const isDirty = useMemo(
    () => JSON.stringify(workingPlan) !== JSON.stringify(plan),
    [workingPlan, plan],
  );

  const handleOrgPlanReplace = (selected: OrgProvidedPlan) => {
    setWorkingPlan({
      ...workingPlan,
      basePlanRef: selected.id,
      name: selected.name,
      stages: structuredClone(selected.stages),
      checks: structuredClone(selected.checks),
    });
    const first = selected.stages[0];
    setSelection(
      first?.tasks[0]
        ? { stageId: first.id, taskId: first.tasks[0].id }
        : first
          ? { stageId: first.id }
          : {},
    );
  };

  const handleStageOrTaskSelect = (next: Selection) => setSelection(next);

  const handleTaskChange = (next: PlanTask) => {
    updateStages((prev) =>
      prev.map((stage) =>
        stage.id === selection.stageId
          ? { ...stage, tasks: stage.tasks.map((t) => (t.id === next.id ? next : t)) }
          : stage,
      ),
    );
  };

  const handleStageChange = (next: PlanStage) => {
    updateStages((prev) => prev.map((stage) => (stage.id === next.id ? next : stage)));
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  const handleSubmit = () => {
    onSubmit(workingPlan);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:flex tw:max-w-4xl tw:flex-col tw:p-0 tw:sm:max-h-[80vh]">
        <DialogHeader className="tw:border-b tw:p-4 tw:pb-3">
          <DialogTitle>Project Plan: {projectName}</DialogTitle>
        </DialogHeader>

        <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:border-b tw:px-4 tw:py-3">
          <div className="tw:flex tw:items-center tw:gap-2">
            <span className="tw:text-sm tw:text-muted-foreground">Project Plan:</span>
            <span className="tw:text-sm tw:font-medium">{workingPlan.name}</span>
          </div>
          <OrgPlanPicker
            orgProvidedPlans={orgProvidedPlans}
            currentBasePlanRef={workingPlan.basePlanRef}
            isDirty={isDirty}
            onReplaceWith={handleOrgPlanReplace}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'stages-tasks' | 'checks')}
          className="tw:flex tw:flex-1 tw:flex-col tw:overflow-hidden"
        >
          <TabsList className="tw:mx-4 tw:mt-3 tw:w-fit">
            <TabsTrigger value="stages-tasks">Stages / Tasks</TabsTrigger>
            <TabsTrigger value="checks">Checks</TabsTrigger>
          </TabsList>

          <TabsContent value="stages-tasks" className="tw:flex-1 tw:overflow-auto tw:px-4 tw:py-3">
            <StagesTasksTab
              stages={stages}
              selection={selection}
              onSelectionChange={handleStageOrTaskSelect}
              onStagesChange={updateStages}
              onStageChange={handleStageChange}
              onTaskChange={handleTaskChange}
            />
          </TabsContent>

          <TabsContent value="checks" className="tw:flex-1 tw:overflow-auto tw:px-4 tw:py-3">
            <ChecksTab
              stages={stages}
              checks={workingPlan.checks}
              onChecksChange={(checks: CheckSetting[]) =>
                setWorkingPlan((p) => ({ ...p, checks }))
              }
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="tw:border-t tw:p-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectPlanDialog;
