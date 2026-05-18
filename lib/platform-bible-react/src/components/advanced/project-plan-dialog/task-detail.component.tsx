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
import { Textarea } from '@/components/shadcn-ui/textarea';
import type {
  MarkCompleteMode,
  PlanStage,
  PlanTask,
  RequiresEditingMode,
  TaskStartCondition,
} from '@/components/advanced/project-plan-dialog/types';

interface TaskDetailProps {
  stage: PlanStage;
  task?: PlanTask;
  onStageChange: (next: PlanStage) => void;
  onTaskChange: (next: PlanTask) => void;
}

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

export function TaskDetail({ stage, task, onStageChange, onTaskChange }: TaskDetailProps) {
  if (!task) {
    return <StageBasicEditor stage={stage} onStageChange={onStageChange} />;
  }
  return (
    <Tabs defaultValue="basic" className="tw:flex tw:flex-col tw:gap-3">
      <TabsList className="tw:w-fit">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="effort">Effort</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="tw:flex tw:flex-col tw:gap-3">
        <NameAndDescription
          name={task.name}
          description={task.description ?? ''}
          onChange={(name, description) => onTaskChange({ ...task, name, description })}
        />

        <FieldRow label="Mark task as complete">
          <Select
            value={task.markComplete}
            onValueChange={(v) => onTaskChange({ ...task, markComplete: v as MarkCompleteMode })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {markCompleteOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="When can this task start?">
          <Select
            value={task.taskStart}
            onValueChange={(v) => onTaskChange({ ...task, taskStart: v as TaskStartCondition })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {taskStartOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldRow>

        <FieldRow label="Requires editing">
          <Select
            value={task.requiresEditing}
            onValueChange={(v) =>
              onTaskChange({ ...task, requiresEditing: v as RequiresEditingMode })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {requiresEditingOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldRow>
      </TabsContent>

      <TabsContent value="effort" className="tw:flex tw:flex-col tw:gap-3">
        <p className="tw:text-sm tw:text-muted-foreground">
          Expected rate of progress (verses per day) for each book difficulty. Values typically
          decrease from Easiest to Difficult.
        </p>
        <div className="tw:grid tw:grid-cols-[120px_120px_1fr] tw:items-center tw:gap-2">
          {(['easiest', 'easy', 'moderate', 'difficult'] as const).map((key) => {
            const labels = {
              easiest: 'Easiest',
              easy: 'Easy',
              moderate: 'Moderate',
              difficult: 'Difficult',
            } as const;
            const count = task.bookCountsByDifficulty?.[key] ?? 0;
            return (
              <FieldRowGrid
                key={key}
                label={labels[key]}
                value={task.effort[key]}
                onChange={(value) =>
                  onTaskChange({ ...task, effort: { ...task.effort, [key]: value } })
                }
                bookCount={count}
              />
            );
          })}
        </div>
        <div>
          <Button variant="outline" size="sm" disabled>
            Copy Efforts…
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function StageBasicEditor({
  stage,
  onStageChange,
}: {
  stage: PlanStage;
  onStageChange: (next: PlanStage) => void;
}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <NameAndDescription
        name={stage.name}
        description={stage.description ?? ''}
        onChange={(name, description) => onStageChange({ ...stage, name, description })}
      />
    </div>
  );
}

function NameAndDescription({
  name,
  description,
  onChange,
}: {
  name: string;
  description: string;
  onChange: (name: string, description: string) => void;
}) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <FieldRow label="Name">
        <Input value={name} onChange={(e) => onChange(e.target.value, description)} />
      </FieldRow>
      <FieldRow label="Description">
        <Textarea
          value={description}
          onChange={(e) => onChange(name, e.target.value)}
          rows={3}
        />
      </FieldRow>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="tw:grid tw:grid-cols-[160px_1fr] tw:items-center tw:gap-2">
      <Label className="tw:text-sm">{label}</Label>
      <div>{children}</div>
    </div>
  );
}

function FieldRowGrid({
  label,
  value,
  onChange,
  bookCount,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  bookCount: number;
}) {
  return (
    <>
      <Label className="tw:text-sm">{label}</Label>
      <Input
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      <button
        type="button"
        className="tw:text-start tw:text-sm tw:text-primary tw:underline-offset-2 tw:hover:underline"
        disabled
        title="Choose books (not wired in v1)"
      >
        {label} ({bookCount} books)
      </button>
    </>
  );
}

export default TaskDetail;
