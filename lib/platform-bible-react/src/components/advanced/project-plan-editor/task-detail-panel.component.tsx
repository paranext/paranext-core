import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn-ui/tabs';
import { IconTrash } from '@tabler/icons-react';
import { useMemo } from 'react';
import { NameAndDescriptionEditor } from './name-and-description-editor.component';
import { usePlanEditorAdmin } from './plan-editor-admin-context';
import type {
  AvailabilityType,
  EditorSelection,
  PlanStage,
  PlanTask,
  ProjectPlanData,
  ProjectPlanEditorViewOptions,
  TaskType,
} from './types';

export interface TaskDetailPanelProps {
  plan: ProjectPlanData;
  selection: EditorSelection;
  viewOptions: ProjectPlanEditorViewOptions;
  onPatchTask: (stageId: string, taskIndex: number, patch: Partial<PlanTask>) => void;
  onPatchStage: (stageIndex: number, patch: Partial<PlanStage>) => void;
  onRequestDelete: () => void;
  onOpenCopyEfforts: () => void;
}

const MARK_COMPLETE_OPTIONS = [
  { value: 'ManualByBook', label: 'By book' },
  { value: 'ManualByChapter', label: 'By chapter' },
  { value: 'ManualByProject', label: 'By project' },
] as const;

type MarkCompleteValue = (typeof MARK_COMPLETE_OPTIONS)[number]['value'];

function isMarkCompleteValue(value: string): value is MarkCompleteValue {
  return MARK_COMPLETE_OPTIONS.some((option) => option.value === value);
}

const AVAILABILITY_OPTIONS: Array<{ value: AvailabilityType; label: string }> = [
  { value: 'WhenBookStarts', label: 'When the book starts' },
  { value: 'AfterPreviousTaskForBook', label: 'After previous task for the book' },
  { value: 'AfterPreviousTaskForChapter', label: 'After previous task for the chapter' },
  { value: 'WhenStageIsComplete', label: 'When previous stage completes' },
  { value: 'WhenStageIsCompleteByChapter', label: 'When previous stage completes by chapter' },
  { value: 'WhenProjectStarts', label: 'When the project starts' },
];

function isAvailabilityValue(value: string): value is AvailabilityType {
  return AVAILABILITY_OPTIONS.some((option) => option.value === value);
}

type EditingTargetKind = 'None' | 'ScriptureText' | 'BackTranslation';
function isEditingKind(value: string): value is EditingTargetKind {
  return value === 'None' || value === 'ScriptureText' || value === 'BackTranslation';
}

export function TaskDetailPanel({
  plan,
  selection,
  viewOptions,
  onPatchTask,
  onPatchStage,
  onRequestDelete,
  onOpenCopyEfforts,
}: TaskDetailPanelProps) {
  if (selection.kind === 'none') {
    return (
      <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-6 tw:text-sm tw:text-muted-foreground">
        Select a stage or task to edit its details.
      </div>
    );
  }
  if (selection.kind === 'stage') {
    return (
      <StagePanel
        plan={plan}
        selection={selection}
        viewOptions={viewOptions}
        onPatchStage={onPatchStage}
        onRequestDelete={onRequestDelete}
      />
    );
  }
  return (
    <TaskPanel
      plan={plan}
      selection={selection}
      viewOptions={viewOptions}
      onPatchTask={onPatchTask}
      onRequestDelete={onRequestDelete}
      onOpenCopyEfforts={onOpenCopyEfforts}
    />
  );
}

function StagePanel({
  plan,
  selection,
  viewOptions,
  onPatchStage,
  onRequestDelete,
}: {
  plan: ProjectPlanData;
  selection: Extract<EditorSelection, { kind: 'stage' }>;
  viewOptions: ProjectPlanEditorViewOptions;
  onPatchStage: (stageIndex: number, patch: Partial<PlanStage>) => void;
  onRequestDelete: () => void;
}) {
  const isAdmin = usePlanEditorAdmin();
  const stage = plan.stages[selection.stageIndex];
  if (!stage) return undefined;
  const stageName = stage.names.en ?? stage.id;
  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:p-3">
      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="tw:flex tw:flex-col tw:gap-4 tw:pt-2">
          <NameAndDescriptionEditor
            plan={plan}
            item={stage}
            languages={viewOptions.availableLanguages}
            onChange={(patch) =>
              onPatchStage(selection.stageIndex, {
                names: patch.names,
                descriptions: patch.descriptions,
                sourceUpdatedAt: patch.sourceUpdatedAt,
              })
            }
          />
          <div className="tw:flex tw:justify-end">
            <Button
              variant="outline"
              size="sm"
              disabled={!isAdmin}
              aria-label={`Delete stage ${stageName}`}
              className="tw:border-destructive/60 tw:text-destructive tw:hover:bg-destructive/10 tw:hover:text-destructive"
              onClick={onRequestDelete}
            >
              <IconTrash data-icon="inline-start" />
              Remove stage
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TaskPanel({
  plan,
  selection,
  viewOptions,
  onPatchTask,
  onRequestDelete,
  onOpenCopyEfforts,
}: {
  plan: ProjectPlanData;
  selection: Extract<EditorSelection, { kind: 'task' }>;
  viewOptions: ProjectPlanEditorViewOptions;
  onPatchTask: (stageId: string, taskIndex: number, patch: Partial<PlanTask>) => void;
  onRequestDelete: () => void;
  onOpenCopyEfforts: () => void;
}) {
  const isAdmin = usePlanEditorAdmin();
  const stage = plan.stages[selection.stageIndex];
  const task: PlanTask | undefined = stage?.tasks[selection.taskIndex];

  const effortInvalid = useMemo(() => {
    if (!task) return false;
    return !(
      task.easiestBooksVpd >= task.easyBooksVpd &&
      task.easyBooksVpd >= task.moderateBooksVpd &&
      task.moderateBooksVpd >= task.difficultBooksVpd
    );
  }, [task]);

  if (!stage || !task) return undefined;

  const stageId = stage.id;
  const requiresEditingDisabled = task.type === 'ManualByProject';
  const taskName = task.names.en ?? task.id;

  return (
    <div className="tw:flex tw:flex-col tw:gap-4 tw:p-3">
      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="effort">Effort</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="tw:flex tw:flex-col tw:gap-4 tw:pt-2">
          <NameAndDescriptionEditor
            plan={plan}
            item={task}
            languages={viewOptions.availableLanguages}
            onChange={(patch) =>
              onPatchTask(stageId, selection.taskIndex, {
                names: patch.names,
                descriptions: patch.descriptions,
                sourceUpdatedAt: patch.sourceUpdatedAt,
              })
            }
          />

          <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:sm:grid-cols-3">
            <div className="tw:flex tw:flex-col tw:gap-1">
              <Label htmlFor="task-mark-complete">Mark task as complete</Label>
              <Select
                value={task.type}
                onValueChange={(value) => {
                  if (!isMarkCompleteValue(value)) return;
                  const next: TaskType = value;
                  onPatchTask(stageId, selection.taskIndex, {
                    type: next,
                    editingRequiredList:
                      next === 'ManualByProject'
                        ? [{ targetKind: 'None', projectName: undefined }]
                        : task.editingRequiredList,
                  });
                }}
                disabled={!isAdmin}
              >
                <SelectTrigger id="task-mark-complete">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MARK_COMPLETE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="tw:flex tw:flex-col tw:gap-1">
              <Label htmlFor="task-start">When can this task start?</Label>
              <Select
                value={task.availability}
                onValueChange={(value) => {
                  if (!isAvailabilityValue(value)) return;
                  onPatchTask(stageId, selection.taskIndex, { availability: value });
                }}
                disabled={!isAdmin}
              >
                <SelectTrigger id="task-start">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="tw:flex tw:flex-col tw:gap-1">
              <Label htmlFor="task-requires-editing">Requires editing</Label>
              <Select
                value={task.editingRequiredList[0]?.targetKind ?? 'None'}
                onValueChange={(value) => {
                  if (!isEditingKind(value)) return;
                  onPatchTask(stageId, selection.taskIndex, {
                    editingRequiredList: [
                      {
                        targetKind: value,
                        projectName:
                          value === 'None' ? undefined : task.editingRequiredList[0]?.projectName,
                      },
                    ],
                  });
                }}
                disabled={!isAdmin || requiresEditingDisabled}
              >
                <SelectTrigger id="task-requires-editing">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">No</SelectItem>
                  <SelectItem value="ScriptureText">Scripture text</SelectItem>
                </SelectContent>
              </Select>
              {requiresEditingDisabled && (
                <span className="tw:text-xs tw:text-muted-foreground">
                  Disabled because &ldquo;Mark task as complete&rdquo; is set to &ldquo;By
                  project&rdquo;.
                </span>
              )}
            </div>
          </div>

          <div className="tw:flex tw:justify-end">
            <Button
              variant="outline"
              size="sm"
              disabled={!isAdmin}
              aria-label={`Delete task ${taskName}`}
              className="tw:border-destructive/60 tw:text-destructive tw:hover:bg-destructive/10 tw:hover:text-destructive"
              onClick={onRequestDelete}
            >
              <IconTrash data-icon="inline-start" />
              Remove task
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="effort" className="tw:flex tw:flex-col tw:gap-4 tw:pt-2">
          <div className="tw:text-sm tw:text-muted-foreground">
            Set the expected progress rate (verses per day) for this task at each difficulty level.
            Values should not increase as difficulty rises.
          </div>
          <div className="tw:font-medium">Task: {taskName}</div>
          <div className="tw:grid tw:grid-cols-1 tw:gap-3 tw:sm:grid-cols-2">
            <EffortRow
              label={`Easiest (${viewOptions.bookCountsByDifficulty.easiest} books)`}
              value={task.easiestBooksVpd}
              onChange={(v) => onPatchTask(stageId, selection.taskIndex, { easiestBooksVpd: v })}
              disabled={!isAdmin}
            />
            <EffortRow
              label={`Easy (${viewOptions.bookCountsByDifficulty.easy} books)`}
              value={task.easyBooksVpd}
              onChange={(v) => onPatchTask(stageId, selection.taskIndex, { easyBooksVpd: v })}
              disabled={!isAdmin}
            />
            <EffortRow
              label={`Moderate (${viewOptions.bookCountsByDifficulty.moderate} books)`}
              value={task.moderateBooksVpd}
              onChange={(v) => onPatchTask(stageId, selection.taskIndex, { moderateBooksVpd: v })}
              disabled={!isAdmin}
            />
            <EffortRow
              label={`Difficult (${viewOptions.bookCountsByDifficulty.difficult} books)`}
              value={task.difficultBooksVpd}
              onChange={(v) => onPatchTask(stageId, selection.taskIndex, { difficultBooksVpd: v })}
              disabled={!isAdmin}
            />
          </div>
          {effortInvalid && (
            <div className="tw:rounded-md tw:border tw:border-destructive/60 tw:bg-destructive/5 tw:p-2 tw:text-sm tw:text-destructive">
              Verses per day must not increase as book difficulty rises.
            </div>
          )}
          <div>
            <Button variant="outline" size="sm" disabled={!isAdmin} onClick={onOpenCopyEfforts}>
              Copy efforts…
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EffortRow({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  disabled: boolean;
}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <Label>{label}</Label>
      <Input
        type="number"
        min={1}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (!Number.isNaN(next) && next > 0) onChange(next);
        }}
      />
    </div>
  );
}
