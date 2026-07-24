import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { sonner } from '@/components/shadcn-ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import { IconLanguage, IconListCheck, IconStack3 } from '@tabler/icons-react';
import { useCallback, useState, type ReactNode } from 'react';
import { ChecksTab } from './checks-tab.component';
import { CopyTaskEffortDialog } from './copy-task-effort-dialog.component';
import { LocalizationTab } from './localization-tab.component';
import { PlanEditorAdminProvider } from './plan-editor-admin-context';
import { PlanEditorBanners } from './plan-editor-banners.component';
import {
  moveStage,
  moveTaskAcrossStages,
  removeStage,
  removeTask,
  restoreStage,
  restoreTask,
  updateStage,
  updateTask,
} from './plan-mutation-utils';
import { SelectBasePlan } from './select-base-plan.component';
import { StagesTasksTab } from './stages-tasks-tab.component';
import type {
  BasePlanCatalog,
  EditorMode,
  EditorSelection,
  PlanCheck,
  PlanStage,
  PlanTask,
  ProjectPlanData,
  ProjectPlanEditorViewContext,
  ProjectPlanEditorViewOptions,
  SelectedBasePlan,
} from './types';

export interface ProjectPlanEditorProps {
  /**
   * Working copy of the plan being edited. Caller owns state and receives changes via
   * `onPlanChange`.
   */
  plan: ProjectPlanData;
  basePlanCatalog: BasePlanCatalog;
  viewOptions: ProjectPlanEditorViewOptions;
  context: ProjectPlanEditorViewContext;
  /**
   * Single permission switch for the entire editor tree. When false, every edit affordance renders
   * disabled — there is no separate read-only view component.
   */
  isAdmin: boolean;
  mode?: EditorMode;
  initialSelection?: EditorSelection;
  /** Banner content; absent fields hide their banner. */
  banners?: {
    taskChanged?: { message: string };
    newPlanVersion?: { message: string; isAdminVariant: boolean };
    undoUpdate?: ReactNode;
  };
  onPlanChange: (next: ProjectPlanData) => void;
  onSubmit?: (plan: ProjectPlanData) => void;
  onCancel?: () => void;
  /**
   * Called when the user picks a base plan + version. The host is responsible for fetching that
   * plan's contents and re-rendering the editor with a fresh `plan` prop.
   */
  onSelectBasePlan?: (selection: SelectedBasePlan) => void;
}

export function ProjectPlanEditor({
  plan,
  basePlanCatalog,
  viewOptions,
  context,
  isAdmin,
  mode = 'per-project',
  initialSelection,
  banners,
  onPlanChange,
  onSubmit,
  onCancel,
  onSelectBasePlan,
}: ProjectPlanEditorProps) {
  const [selection, setSelection] = useState<EditorSelection>(
    initialSelection ??
      (plan.stages.length > 0 ? { kind: 'stage', stageIndex: 0 } : { kind: 'none' }),
  );
  const [activeTab, setActiveTab] = useState<'stages-tasks' | 'checks' | 'localization'>(
    'stages-tasks',
  );
  const [taskChangedDismissed, setTaskChangedDismissed] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [copyEffortsOpen, setCopyEffortsOpen] = useState(false);
  const [pendingCrossStageMove, setPendingCrossStageMove] = useState<
    | {
        fromStageId: string;
        fromTaskIndex: number;
        toStageId: string;
        toTaskIndex: number;
      }
    | undefined
  >(undefined);

  const apply = useCallback(
    (next: ProjectPlanData) => {
      onPlanChange(next);
    },
    [onPlanChange],
  );

  const handleMoveStage = useCallback(
    (fromIndex: number, toIndex: number) => {
      apply(moveStage(plan, fromIndex, toIndex));
      // Follow the moved stage with the selection so the toolbar buttons keep acting on it.
      if (selection.kind === 'stage' && selection.stageIndex === fromIndex) {
        setSelection({ kind: 'stage', stageIndex: toIndex });
      } else if (selection.kind === 'task' && selection.stageIndex === fromIndex) {
        setSelection({ kind: 'task', stageIndex: toIndex, taskIndex: selection.taskIndex });
      }
    },
    [plan, apply, selection],
  );

  const handleMoveTask = useCallback(
    (fromStageId: string, fromTaskIndex: number, toStageId: string, toTaskIndex: number) => {
      apply(moveTaskAcrossStages(plan, fromStageId, fromTaskIndex, toStageId, toTaskIndex));
      // Follow the moved task with the selection so repeated Move up / Move down keeps acting
      // on the same item.
      if (
        selection.kind === 'task' &&
        plan.stages[selection.stageIndex]?.id === fromStageId &&
        selection.taskIndex === fromTaskIndex
      ) {
        const toStageIndex = plan.stages.findIndex((s) => s.id === toStageId);
        if (toStageIndex >= 0) {
          setSelection({ kind: 'task', stageIndex: toStageIndex, taskIndex: toTaskIndex });
        }
      }
    },
    [plan, apply, selection],
  );

  const handleRequestCrossStageMove = useCallback(
    (fromStageId: string, fromTaskIndex: number, toStageId: string, toTaskIndex: number) => {
      setPendingCrossStageMove({ fromStageId, fromTaskIndex, toStageId, toTaskIndex });
    },
    [],
  );

  const handleDeleteTask = useCallback(
    (stageId: string, taskIndex: number) => {
      const { next, removed } = removeTask(plan, stageId, taskIndex);
      if (!removed) return;
      apply(next);
      if (
        selection.kind === 'task' &&
        plan.stages[selection.stageIndex]?.id === stageId &&
        selection.taskIndex === taskIndex
      ) {
        setSelection({ kind: 'none' });
      }
      sonner(`Task "${removed.task.names.en ?? removed.task.id}" deleted`, {
        action: {
          label: 'Undo',
          onClick: () => {
            const restored = restoreTask(next, removed);
            apply(restored);
            // Re-select the task at its original position so the user lands back where they were.
            const restoredStageIndex = restored.stages.findIndex((s) => s.id === stageId);
            if (restoredStageIndex >= 0) {
              setSelection({
                kind: 'task',
                stageIndex: restoredStageIndex,
                taskIndex,
              });
            }
          },
        },
      });
    },
    [plan, selection, apply],
  );

  const handleDeleteStage = useCallback(
    (stageIndex: number) => {
      const { next, removed } = removeStage(plan, stageIndex);
      if (!removed) return;
      apply(next);
      if (selection.kind !== 'none' && selection.stageIndex === stageIndex) {
        setSelection({ kind: 'none' });
      }
      sonner(`Stage "${removed.stage.names.en ?? removed.stage.id}" deleted`, {
        action: {
          label: 'Undo',
          onClick: () => {
            apply(restoreStage(next, removed));
            // Re-select the restored stage at its original index.
            setSelection({ kind: 'stage', stageIndex: removed.stageIndex });
          },
        },
      });
    },
    [plan, selection, apply],
  );

  const handlePatchTask = useCallback(
    (stageId: string, taskIndex: number, patch: Partial<PlanTask>) =>
      apply(updateTask(plan, stageId, taskIndex, patch)),
    [plan, apply],
  );

  const handlePatchStage = useCallback(
    (stageIndex: number, patch: Partial<PlanStage>) => apply(updateStage(plan, stageIndex, patch)),
    [plan, apply],
  );

  const handlePatchCheck = useCallback(
    (checkId: string, patch: Partial<PlanCheck>) => {
      const checks = plan.checks.map((check) =>
        check.id === checkId ? { ...check, ...patch } : check,
      );
      apply({ ...plan, checks });
    },
    [plan, apply],
  );

  const handleAddStage = useCallback(() => {
    if (!isAdmin) return;
    const newStage: PlanStage = {
      id: `stage-${Date.now()}`,
      names: { [plan.sourceLanguageId]: 'New stage' },
      descriptions: {},
      tasks: [],
      sourceUpdatedAt: Date.now(),
    };
    apply({ ...plan, stages: [...plan.stages, newStage] });
    setSelection({ kind: 'stage', stageIndex: plan.stages.length });
  }, [plan, apply, isAdmin]);

  const handleAddTask = useCallback(() => {
    if (!isAdmin) return;
    if (selection.kind === 'none') return;
    const { stageIndex } = selection;
    const stage = plan.stages[stageIndex];
    if (!stage) return;
    const newTask: PlanTask = {
      id: `task-${Date.now()}`,
      type: 'ManualByBook',
      names: { [plan.sourceLanguageId]: 'New task' },
      descriptions: {},
      availability: 'WhenBookStarts',
      prerequisiteStageId: undefined,
      editingRequiredList: [{ targetKind: 'None', projectName: undefined }],
      easiestBooksVpd: 100,
      easyBooksVpd: 75,
      moderateBooksVpd: 50,
      difficultBooksVpd: 25,
      sourceUpdatedAt: Date.now(),
    };
    const updatedStage: PlanStage = { ...stage, tasks: [...stage.tasks, newTask] };
    apply({
      ...plan,
      stages: plan.stages.map((s, i) => (i === stageIndex ? updatedStage : s)),
    });
    setSelection({ kind: 'task', stageIndex, taskIndex: updatedStage.tasks.length - 1 });
  }, [plan, selection, apply, isAdmin]);

  const handleCopyEffortsConfirm = (effort: {
    easiestVpd: number;
    easyVpd: number;
    moderateVpd: number;
    difficultVpd: number;
  }) => {
    if (selection.kind === 'task') {
      const stage = plan.stages[selection.stageIndex];
      if (stage) {
        handlePatchTask(stage.id, selection.taskIndex, {
          easiestBooksVpd: effort.easiestVpd,
          easyBooksVpd: effort.easyVpd,
          moderateBooksVpd: effort.moderateVpd,
          difficultBooksVpd: effort.difficultVpd,
        });
      }
    }
    setCopyEffortsOpen(false);
  };

  const primaryLabel = mode === 'standalone-base-plan' ? 'Save as…' : 'OK';
  const titleText =
    mode === 'standalone-base-plan'
      ? `Base project plan: ${context.basePlanName}`
      : `Project plan: ${context.projectName ?? '—'}`;

  return (
    <PlanEditorAdminProvider value={isAdmin}>
      <div className="pr-twp tw:flex tw:flex-col tw:gap-3">
        <div className="tw:flex tw:flex-row tw:items-end tw:justify-between tw:gap-3">
          <div>
            <div className="tw:text-xs tw:uppercase tw:text-muted-foreground">
              Project plan editor
            </div>
            <h2 className="tw:text-lg tw:font-semibold">{titleText}</h2>
            <div className="tw:text-sm tw:text-muted-foreground">
              Plan: <strong>{plan.basePlanName ?? 'Untitled'}</strong> · v{plan.planVersion}
              {plan.basePlanModified && (
                <span className="tw:ms-2 tw:rounded tw:bg-muted tw:px-1.5 tw:py-0.5 tw:text-xs">
                  Modified
                </span>
              )}
            </div>
          </div>
          <Button variant="outline" disabled={!isAdmin} onClick={() => setPickerOpen(true)}>
            Select base plan…
          </Button>
        </div>

        <PlanEditorBanners
          taskChanged={
            !taskChangedDismissed && banners?.taskChanged
              ? {
                  message: banners.taskChanged.message,
                  onDismiss: () => setTaskChangedDismissed(true),
                }
              : undefined
          }
          newPlanVersion={banners?.newPlanVersion}
          undoUpdate={banners?.undoUpdate}
        />

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value === 'stages-tasks' || value === 'checks' || value === 'localization') {
              setActiveTab(value);
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="stages-tasks">
              <IconStack3 data-icon="inline-start" />
              Stages / Tasks
            </TabsTrigger>
            <TabsTrigger value="checks">
              <IconListCheck data-icon="inline-start" />
              Checks
            </TabsTrigger>
            <TabsTrigger value="localization">
              <IconLanguage data-icon="inline-start" />
              Localization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stages-tasks" className="tw:pt-2">
            <StagesTasksTab
              plan={plan}
              selection={selection}
              viewOptions={viewOptions}
              onSelect={setSelection}
              onAddStage={handleAddStage}
              onAddTask={handleAddTask}
              onMoveStage={handleMoveStage}
              onMoveTask={handleMoveTask}
              onRequestCrossStageMove={handleRequestCrossStageMove}
              onDeleteStage={handleDeleteStage}
              onDeleteTask={handleDeleteTask}
              onPatchTask={handlePatchTask}
              onPatchStage={handlePatchStage}
              onOpenCopyEfforts={() => setCopyEffortsOpen(true)}
              onOpenSelectBasePlan={() => setPickerOpen(true)}
            />
          </TabsContent>

          <TabsContent value="checks" className="tw:pt-2">
            <ChecksTab
              plan={plan}
              basicCheckRows={viewOptions.basicCheckRows}
              onPatchCheck={handlePatchCheck}
            />
          </TabsContent>

          <TabsContent value="localization" className="tw:pt-2">
            <LocalizationTab
              plan={plan}
              viewOptions={viewOptions}
              onPatchStage={handlePatchStage}
              onPatchTask={handlePatchTask}
            />
          </TabsContent>
        </Tabs>

        <div className="tw:flex tw:justify-end tw:gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={!isAdmin} onClick={() => onSubmit?.(plan)}>
            {primaryLabel}
          </Button>
        </div>

        <SelectBasePlan
          open={pickerOpen}
          catalog={basePlanCatalog}
          initialSelection={
            plan.basePlanId ? { basePlanId: plan.basePlanId, version: plan.planVersion } : undefined
          }
          onOpenChange={setPickerOpen}
          onConfirm={(selectedBasePlan) => {
            setPickerOpen(false);
            onSelectBasePlan?.(selectedBasePlan);
          }}
        />

        <CopyTaskEffortDialog
          open={copyEffortsOpen}
          sourcePlans={[{ id: 'current', displayName: 'This plan', plan }]}
          currentTaskId={
            selection.kind === 'task'
              ? (plan.stages[selection.stageIndex]?.tasks[selection.taskIndex]?.id ?? '')
              : ''
          }
          onOpenChange={setCopyEffortsOpen}
          onConfirm={handleCopyEffortsConfirm}
        />

        <CrossStageMoveConfirmDialog
          pending={pendingCrossStageMove}
          plan={plan}
          onCancel={() => setPendingCrossStageMove(undefined)}
          onConfirm={(move) => {
            handleMoveTask(move.fromStageId, move.fromTaskIndex, move.toStageId, move.toTaskIndex);
            setPendingCrossStageMove(undefined);
          }}
        />
      </div>
    </PlanEditorAdminProvider>
  );
}

interface CrossStageMove {
  fromStageId: string;
  fromTaskIndex: number;
  toStageId: string;
  toTaskIndex: number;
}

function CrossStageMoveConfirmDialog({
  pending,
  plan,
  onCancel,
  onConfirm,
}: {
  pending: CrossStageMove | undefined;
  plan: ProjectPlanData;
  onCancel: () => void;
  onConfirm: (move: CrossStageMove) => void;
}) {
  const fromStage = pending ? plan.stages.find((s) => s.id === pending.fromStageId) : undefined;
  const toStage = pending ? plan.stages.find((s) => s.id === pending.toStageId) : undefined;
  const task = pending ? fromStage?.tasks[pending.fromTaskIndex] : undefined;
  const taskName = task?.names[plan.sourceLanguageId] ?? task?.id ?? '';
  const fromStageName = fromStage?.names[plan.sourceLanguageId] ?? fromStage?.id ?? '';
  const toStageName = toStage?.names[plan.sourceLanguageId] ?? toStage?.id ?? '';

  return (
    <Dialog
      open={!!pending}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent className="tw:max-w-md">
        <DialogHeader>
          <DialogTitle>Move task to a different stage?</DialogTitle>
          <DialogDescription>
            You&rsquo;re about to move <strong>{taskName}</strong> from stage{' '}
            <strong>{fromStageName}</strong> to stage <strong>{toStageName}</strong>. Cross-stage
            moves change task ordering rules and recorded-progress dependencies, so we ask before
            committing the change.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (pending) onConfirm(pending);
            }}
          >
            Move task to new stage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
