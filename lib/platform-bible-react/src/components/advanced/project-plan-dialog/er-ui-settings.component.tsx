import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Textarea } from '@/components/shadcn-ui/textarea';
import {
  DEFAULT_LANG,
  getLocalized,
  type LangCode,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import type {
  MarkCompleteMode,
  PlanStage,
  PlanTask,
  RequiresEditingMode,
  TaskStartCondition,
} from '@/components/advanced/project-plan-dialog/types';

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

const isMarkCompleteMode = (v: string): v is MarkCompleteMode =>
  markCompleteOptions.some((o) => o.value === v);
const isTaskStartCondition = (v: string): v is TaskStartCondition =>
  taskStartOptions.some((o) => o.value === v);
const isRequiresEditingMode = (v: string): v is RequiresEditingMode =>
  requiresEditingOptions.some((o) => o.value === v);

interface ErUiSettingsProps {
  stage: PlanStage;
  task: PlanTask | undefined;
  onStageChange: (next: PlanStage) => void;
  onTaskChange: (next: PlanTask) => void;
  onBack: () => void;
  /** Language for the heading/subheading display; falls back to English. */
  displayLang: LangCode;
}

export function ErUiSettings({
  stage,
  task,
  onStageChange,
  onTaskChange,
  onBack,
  displayLang,
}: ErUiSettingsProps) {
  const isTask = task !== undefined;
  const heading = isTask
    ? getLocalized(task.names, displayLang, DEFAULT_LANG) || '(unnamed task)'
    : getLocalized(stage.names, displayLang, DEFAULT_LANG) || '(unnamed stage)';
  const subheading = isTask
    ? `In stage: ${getLocalized(stage.names, displayLang, DEFAULT_LANG)}`
    : 'Stage';

  return (
    <div className="tw:flex tw:flex-col tw:gap-5">
      <button
        type="button"
        onClick={onBack}
        className="tw:flex tw:w-fit tw:items-center tw:gap-2 tw:rounded tw:border tw:border-border tw:bg-white tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-foreground tw:hover:bg-[#ECF2F9] tw:focus-visible:bg-[#ECF2F9] tw:focus-visible:outline-none"
      >
        <ArrowLeft className="tw:h-4 tw:w-4" />
        Back to stages/tasks
      </button>

      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:text-xs tw:font-medium tw:uppercase tw:tracking-wide tw:text-muted-foreground">
          {subheading}
        </span>
        <h2 className="tw:text-2xl tw:font-semibold tw:text-foreground">{heading}</h2>
      </div>

      {isTask && task ? (
        <TaskFields task={task} onChange={onTaskChange} displayLang={displayLang} />
      ) : (
        <StageFields stage={stage} onChange={onStageChange} displayLang={displayLang} />
      )}
    </div>
  );
}

function StageFields({
  stage,
  onChange,
  displayLang,
}: {
  stage: PlanStage;
  onChange: (next: PlanStage) => void;
  displayLang: LangCode;
}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <Field label="Name">
        <Input
          value={getLocalized(stage.names, displayLang, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({ ...stage, names: { ...stage.names, [displayLang]: e.target.value } })
          }
        />
      </Field>
      <Field label="Description">
        <Textarea
          rows={4}
          value={getLocalized(stage.descriptions, displayLang, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({
              ...stage,
              descriptions: { ...stage.descriptions, [displayLang]: e.target.value },
            })
          }
        />
      </Field>
    </div>
  );
}

function TaskFields({
  task,
  onChange,
  displayLang,
}: {
  task: PlanTask;
  onChange: (next: PlanTask) => void;
  displayLang: LangCode;
}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <Field label="Name">
        <Input
          value={getLocalized(task.names, displayLang, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({ ...task, names: { ...task.names, [displayLang]: e.target.value } })
          }
        />
      </Field>
      <Field label="Description">
        <Textarea
          rows={4}
          value={getLocalized(task.descriptions, displayLang, DEFAULT_LANG)}
          onChange={(e) =>
            onChange({
              ...task,
              descriptions: { ...task.descriptions, [displayLang]: e.target.value },
            })
          }
        />
      </Field>
      <Field label="Mark complete">
        <Select
          value={task.markComplete}
          onValueChange={(v) => {
            if (isMarkCompleteMode(v)) onChange({ ...task, markComplete: v });
          }}
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
      <Field label="Task start">
        <Select
          value={task.taskStart}
          onValueChange={(v) => {
            if (isTaskStartCondition(v)) onChange({ ...task, taskStart: v });
          }}
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
          onValueChange={(v) => {
            if (isRequiresEditingMode(v)) onChange({ ...task, requiresEditing: v });
          }}
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

      <EffortRegion task={task} onChange={onChange} />
    </div>
  );
}

const EFFORT_KEYS = ['easiest', 'easy', 'moderate', 'difficult'] as const;
const EFFORT_LABELS: Record<(typeof EFFORT_KEYS)[number], string> = {
  easiest: 'Easiest',
  easy: 'Easy',
  moderate: 'Moderate',
  difficult: 'Difficult',
};

function EffortRegion({ task, onChange }: { task: PlanTask; onChange: (next: PlanTask) => void }) {
  return (
    <details className="tw:rounded tw:border tw:bg-muted/20">
      <summary className="tw:flex tw:cursor-pointer tw:items-baseline tw:gap-3 tw:px-3 tw:py-2">
        <span className="tw:text-sm tw:font-semibold tw:text-foreground">Effort</span>
        <span className="tw:text-xs tw:text-muted-foreground">
          {EFFORT_KEYS.map((k, i) => (
            <span key={k}>
              {i > 0 ? ' · ' : ''}
              {EFFORT_LABELS[k]} {task.effort[k]}
            </span>
          ))}
        </span>
      </summary>
      <div className="tw:flex tw:flex-col tw:gap-3 tw:border-t tw:p-3">
        <p className="tw:text-xs tw:text-muted-foreground">
          Verses per day expected for each book difficulty. Typically these values decrease from
          Easiest to Difficult.
        </p>
        <div className="tw:grid tw:grid-cols-2 tw:gap-3">
          {EFFORT_KEYS.map((key) => (
            <Field key={key} label={EFFORT_LABELS[key]}>
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
            </Field>
          ))}
        </div>
      </div>
    </details>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-1.5">
      <Label className="tw:text-xs tw:text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

export default ErUiSettings;
