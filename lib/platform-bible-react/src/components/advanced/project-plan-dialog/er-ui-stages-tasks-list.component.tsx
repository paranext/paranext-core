import { useLayoutEffect, useRef } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  DEFAULT_LANG,
  getLocalized,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import type { PlanStage, PlanTask } from '@/components/advanced/project-plan-dialog/types';

export type ErUiSelection =
  | { kind: 'stage'; id: string }
  | { kind: 'task'; stageId: string; taskId: string };

export function isStageSelected(sel: ErUiSelection | undefined, stageId: string): boolean {
  return sel?.kind === 'stage' && sel.id === stageId;
}

export function isTaskSelected(
  sel: ErUiSelection | undefined,
  stageId: string,
  taskId: string,
): boolean {
  return sel?.kind === 'task' && sel.stageId === stageId && sel.taskId === taskId;
}

interface ErUiStagesTasksListProps {
  stages: PlanStage[];
  selected: ErUiSelection | undefined;
  onToggle: (next: ErUiSelection | undefined) => void;
  /** When true, rows truncate to a single line so the list fits a narrow sidebar. */
  compact?: boolean;
}

export function ErUiStagesTasksList({
  stages,
  selected,
  onToggle,
  compact = false,
}: ErUiStagesTasksListProps) {
  // React's ref typing requires `null` as the initial value, not `undefined`.
  // eslint-disable-next-line no-null/no-null
  const listRef = useRef<HTMLUListElement | null>(null);
  useLayoutEffect(() => {
    if (selected === undefined) return;
    const el = listRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected, compact]);

  if (stages.length === 0) {
    return (
      <div className="tw:rounded tw:border tw:border-dashed tw:p-4 tw:text-center tw:text-sm tw:text-muted-foreground">
        This plan has no stages yet.
      </div>
    );
  }

  return (
    <ul ref={listRef} className="tw:divide-y tw:divide-border tw:rounded tw:border">
      {stages.map((stage) => {
        const stageActive = isStageSelected(selected, stage.id);
        return (
          <li key={stage.id}>
            <Row
              active={stageActive}
              onClick={() => onToggle(stageActive ? undefined : { kind: 'stage', id: stage.id })}
              primary={getLocalized(stage.names, DEFAULT_LANG) || '(unnamed stage)'}
              secondary={
                getLocalized(stage.descriptions, DEFAULT_LANG) ||
                `${stage.tasks.length} task${stage.tasks.length === 1 ? '' : 's'}`
              }
              compact={compact}
            />
            {stage.tasks.map((task) => {
              const taskActive = isTaskSelected(selected, stage.id, task.id);
              return (
                <Row
                  key={task.id}
                  active={taskActive}
                  indented
                  onClick={() =>
                    onToggle(
                      taskActive ? undefined : { kind: 'task', stageId: stage.id, taskId: task.id },
                    )
                  }
                  primary={getLocalized(task.names, DEFAULT_LANG) || '(unnamed task)'}
                  secondary={
                    getLocalized(task.descriptions, DEFAULT_LANG) ||
                    markCompleteLabel(task.markComplete)
                  }
                  compact={compact}
                />
              );
            })}
          </li>
        );
      })}
    </ul>
  );
}

function markCompleteLabel(mode: PlanTask['markComplete']): string {
  if (mode === 'by-book') return 'Mark complete: by book';
  if (mode === 'by-chapter') return 'Mark complete: by chapter';
  return 'Mark complete: by project';
}

interface RowProps {
  primary: string;
  secondary: string;
  active: boolean;
  indented?: boolean;
  compact: boolean;
  onClick: () => void;
}

function Row({ primary, secondary, active, indented, compact, onClick }: RowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'tw:flex tw:w-full tw:flex-col tw:gap-0.5 tw:px-4 tw:py-3 tw:text-start tw:hover:bg-[#ECF2F9] tw:focus-visible:bg-[#ECF2F9] tw:focus-visible:outline-none',
        active && 'tw:bg-[#ECF2F9]',
        indented && 'tw:ps-10',
      )}
    >
      <span
        className={cn('tw:text-sm tw:font-semibold tw:text-foreground', compact && 'tw:truncate')}
      >
        {primary}
      </span>
      <span
        className={cn(
          'tw:text-xs tw:text-muted-foreground',
          compact ? 'tw:truncate' : 'tw:line-clamp-2',
        )}
      >
        {secondary}
      </span>
    </button>
  );
}

export default ErUiStagesTasksList;
