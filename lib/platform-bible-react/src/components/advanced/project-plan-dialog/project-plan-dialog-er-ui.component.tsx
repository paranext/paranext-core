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
import {
  ErUiStagesTasksList,
  type ErUiSelection,
} from '@/components/advanced/project-plan-dialog/er-ui-stages-tasks-list.component';
import { ErUiSettings } from '@/components/advanced/project-plan-dialog/er-ui-settings.component';
import { ChecksTab } from '@/components/advanced/project-plan-dialog/checks-tab.component';
import { cn } from '@/utils/shadcn-ui/utils';
import type {
  CheckSetting,
  OrgProvidedPlan,
  PlanStage,
  PlanTask,
  ProjectPlan,
} from '@/components/advanced/project-plan-dialog/types';

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

  useEffect(() => {
    if (open) {
      setWorkingPlan(plan);
      setSelected(undefined);
      setActiveTab(defaultTab);
    }
  }, [open, plan, defaultTab]);

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

  const handleOrgPlanReplace = (selectedPlan: OrgProvidedPlan) => {
    setWorkingPlan({
      ...workingPlan,
      basePlanRef: selectedPlan.id,
      name: selectedPlan.name,
      stages: structuredClone(selectedPlan.stages),
      checks: structuredClone(selectedPlan.checks),
    });
    setSelected(undefined);
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
    </Dialog>
  );
}

export default ProjectPlanDialogErUi;
