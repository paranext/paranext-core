import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
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
  onMoveStage: (stageIndex: number, dir: -1 | 1) => void;
  onMoveTask: (stageIndex: number, taskIndex: number, dir: -1 | 1) => void;
  onDeleteStage: (stageId: string) => void;
  onDeleteTask: (stageId: string, taskId: string) => void;
  /** When true, rows truncate to a single line so the list fits a narrow sidebar. */
  compact?: boolean;
}

export function ErUiStagesTasksList({
  stages,
  selected,
  onToggle,
  onMoveStage,
  onMoveTask,
  onDeleteStage,
  onDeleteTask,
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
    <TooltipProvider>
      <ul ref={listRef} className="tw:divide-y tw:divide-border tw:rounded tw:border">
        {stages.map((stage, stageIndex) => {
          const stageActive = isStageSelected(selected, stage.id);
          return (
            <li key={stage.id}>
              <Row
                active={stageActive}
                onClick={() => onToggle(stageActive ? undefined : { kind: 'stage', id: stage.id })}
                primary={`Stage ${stageIndex + 1}: ${getLocalized(stage.names, DEFAULT_LANG) || '(unnamed stage)'}`}
                secondary={
                  getLocalized(stage.descriptions, DEFAULT_LANG) ||
                  `${stage.tasks.length} task${stage.tasks.length === 1 ? '' : 's'}`
                }
                compact={compact}
              >
                <RowAction
                  label="Move stage up"
                  onClick={() => onMoveStage(stageIndex, -1)}
                  disabled={stageIndex === 0}
                >
                  <ChevronUp className="tw:h-4 tw:w-4" />
                </RowAction>
                <RowAction
                  label="Move stage down"
                  onClick={() => onMoveStage(stageIndex, 1)}
                  disabled={stageIndex === stages.length - 1}
                >
                  <ChevronDown className="tw:h-4 tw:w-4" />
                </RowAction>
                <RowAction label="Delete stage" onClick={() => onDeleteStage(stage.id)}>
                  <Trash2 className="tw:h-4 tw:w-4" />
                </RowAction>
              </Row>
              {stage.tasks.map((task, taskIndex) => {
                const taskActive = isTaskSelected(selected, stage.id, task.id);
                return (
                  <Row
                    key={task.id}
                    active={taskActive}
                    indented
                    onClick={() =>
                      onToggle(
                        taskActive
                          ? undefined
                          : { kind: 'task', stageId: stage.id, taskId: task.id },
                      )
                    }
                    primary={getLocalized(task.names, DEFAULT_LANG) || '(unnamed task)'}
                    secondary={
                      getLocalized(task.descriptions, DEFAULT_LANG) ||
                      markCompleteLabel(task.markComplete)
                    }
                    compact={compact}
                  >
                    <RowAction
                      label="Move task up"
                      onClick={() => onMoveTask(stageIndex, taskIndex, -1)}
                      disabled={stageIndex === 0 && taskIndex === 0}
                    >
                      <ChevronUp className="tw:h-4 tw:w-4" />
                    </RowAction>
                    <RowAction
                      label="Move task down"
                      onClick={() => onMoveTask(stageIndex, taskIndex, 1)}
                      disabled={
                        stageIndex === stages.length - 1 && taskIndex === stage.tasks.length - 1
                      }
                    >
                      <ChevronDown className="tw:h-4 tw:w-4" />
                    </RowAction>
                    <RowAction label="Delete task" onClick={() => onDeleteTask(stage.id, task.id)}>
                      <Trash2 className="tw:h-4 tw:w-4" />
                    </RowAction>
                  </Row>
                );
              })}
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
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
  children?: ReactNode;
}

function Row({ primary, secondary, active, indented, compact, onClick, children }: RowProps) {
  return (
    <div
      className={cn(
        'tw:group tw:flex tw:items-center tw:gap-2 tw:pe-2 tw:hover:bg-[#ECF2F9] tw:focus-within:bg-[#ECF2F9]',
        active && 'tw:bg-[#ECF2F9]',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cn(
          'tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:gap-0.5 tw:px-4 tw:py-3 tw:text-start tw:focus-visible:outline-none',
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
      <div className="tw:flex tw:shrink-0 tw:items-center tw:gap-1 tw:opacity-0 tw:transition-opacity tw:group-hover:opacity-100 tw:group-focus-within:opacity-100">
        {children}
      </div>
    </div>
  );
}

interface RowActionProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

function RowAction({ label, onClick, disabled, children }: RowActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          disabled={disabled}
          className="tw:rounded tw:p-1 tw:hover:bg-accent tw:disabled:opacity-50"
        >
          {children}
        </button>
      </TooltipTrigger>
      {/* The default tooltip z-index (Z_INDEX_ABOVE_DOCK = 250) is below the full-screen plan
          dialog (Z_INDEX_MODAL = 500), so override to sit above it. */}
      <TooltipContent style={{ zIndex: 650 }}>{label}</TooltipContent>
    </Tooltip>
  );
}

export default ErUiStagesTasksList;
