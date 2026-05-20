import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { useMemo, useState } from 'react';
import type { PlanTask, ProjectPlanData } from './types';

export interface CopyTaskEffortDialogProps {
  open: boolean;
  /**
   * The plans the user can copy from. The current plan should usually be included as the first
   * entry.
   */
  sourcePlans: Array<{ id: string; displayName: string; plan: ProjectPlanData }>;
  /** The task currently being edited — excluded from "task to copy" when source equals current. */
  currentTaskId: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: (effort: {
    easiestVpd: number;
    easyVpd: number;
    moderateVpd: number;
    difficultVpd: number;
  }) => void;
}

export function CopyTaskEffortDialog({
  open,
  sourcePlans,
  currentTaskId,
  onOpenChange,
  onConfirm,
}: CopyTaskEffortDialogProps) {
  const [planId, setPlanId] = useState<string | undefined>(sourcePlans[0]?.id);
  const tasks = useMemo<PlanTask[]>(() => {
    const plan = sourcePlans.find((entry) => entry.id === planId)?.plan;
    if (!plan) return [];
    const all = plan.stages.flatMap((stage) => stage.tasks);
    return all.filter((task) => task.id !== currentTaskId);
  }, [sourcePlans, planId, currentTaskId]);
  const [taskId, setTaskId] = useState<string | undefined>(undefined);

  const task = tasks.find((t) => t.id === taskId);
  const canConfirm =
    !!task &&
    task.easiestBooksVpd > 0 &&
    task.easyBooksVpd > 0 &&
    task.moderateBooksVpd > 0 &&
    task.difficultBooksVpd > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:max-w-lg">
        <DialogHeader>
          <DialogTitle>Copy efforts</DialogTitle>
        </DialogHeader>
        <div className="tw:grid tw:grid-cols-2 tw:gap-3">
          <div className="tw:flex tw:flex-col tw:gap-1">
            <Label htmlFor="copy-plan">Plan</Label>
            <Select value={planId} onValueChange={setPlanId}>
              <SelectTrigger id="copy-plan">
                <SelectValue placeholder="Choose plan" />
              </SelectTrigger>
              <SelectContent>
                {sourcePlans.map((entry) => (
                  <SelectItem key={entry.id} value={entry.id}>
                    {entry.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="tw:flex tw:flex-col tw:gap-1">
            <Label htmlFor="copy-task">Task to copy</Label>
            <Select value={taskId} onValueChange={setTaskId} disabled={tasks.length === 0}>
              <SelectTrigger id="copy-task">
                <SelectValue
                  placeholder={tasks.length === 0 ? 'No tasks available' : 'Choose task'}
                />
              </SelectTrigger>
              <SelectContent>
                {tasks.map((entry) => (
                  <SelectItem key={entry.id} value={entry.id}>
                    {entry.names.en ?? entry.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="tw:mt-3 tw:rounded-md tw:border tw:border-border tw:p-3 tw:text-sm">
          {task ? (
            <div className="tw:grid tw:grid-cols-2 tw:gap-2">
              <div>Easiest</div>
              <div className="tw:text-end">{task.easiestBooksVpd}</div>
              <div>Easy</div>
              <div className="tw:text-end">{task.easyBooksVpd}</div>
              <div>Moderate</div>
              <div className="tw:text-end">{task.moderateBooksVpd}</div>
              <div>Difficult</div>
              <div className="tw:text-end">{task.difficultBooksVpd}</div>
            </div>
          ) : (
            <div className="tw:text-muted-foreground">
              {tasks.length === 0
                ? 'No other tasks to copy from.'
                : 'Pick a task above to preview its effort values.'}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!canConfirm}
            onClick={() => {
              if (!task) return;
              onConfirm({
                easiestVpd: task.easiestBooksVpd,
                easyVpd: task.easyBooksVpd,
                moderateVpd: task.moderateBooksVpd,
                difficultVpd: task.difficultBooksVpd,
              });
            }}
          >
            Use these efforts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
