import { useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Button,
  Checkbox,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from 'platform-bible-react';
import type {
  DegreeOfParallelism,
  HighlightedWord,
  ParallelPassageDetail,
  PassageDetailColumn,
  PassageDetailRow,
} from '../types/parallel-passages.d';

// --- Word highlighting style map ---

const DEGREE_STYLES: Record<DegreeOfParallelism, string> = {
  None: '',
  CalculatedMatch: 'tw-text-blue-600 tw-underline',
  ExpertClose: 'tw-text-green-600 tw-underline',
  ExpertExact: 'tw-text-red-600 tw-font-bold tw-underline',
};

// --- Sub-components ---

function HighlightedWordSpan({ word }: { word: HighlightedWord }) {
  const className = DEGREE_STYLES[word.degree];
  return (
    <span className={cn('tw-inline', className)}>
      {word.gloss ? (
        <span className="tw-inline-flex tw-flex-col tw-items-center tw-mx-0.5">
          <span>{word.text}</span>
          <span className="tw-text-xs tw-text-muted-foreground">{word.gloss}</span>
        </span>
      ) : (
        <span className="tw-mx-0.5">{word.text}</span>
      )}
    </span>
  );
}

function StatusIndicator({ state, tooltip }: { state: string; tooltip: string }) {
  if (!tooltip) return null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn('tw-text-xs tw-ml-1', {
            'tw-text-green-600': state === 'Finished',
            'tw-text-yellow-600': state === 'Outdated',
            'tw-text-muted-foreground': state === 'MissingText' || state === 'IgnoredBook',
          })}
          aria-label={tooltip}
        >
          {state === 'Finished' && '\u2713'}
          {state === 'Outdated' && 'ab'}
          {state === 'MissingText' && '\u2014'}
          {state === 'IgnoredBook' && '\u2014'}
        </span>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function ColumnCell({
  column,
  row,
  effectiveViewType,
  passageIndex,
  onToggleColumnApproval,
  onEditClick,
  onDiffClick,
  onGotoReference,
}: {
  column: PassageDetailColumn;
  row: PassageDetailRow;
  effectiveViewType: 'RowView' | 'ColumnView';
  passageIndex: number;
  onToggleColumnApproval: (passageIndex: number, verseRef: string) => void;
  onEditClick: (projectId: string, verseRef: string) => void;
  onDiffClick: (projectId: string, verseRef: string) => void;
  onGotoReference: (verseRef: string) => void;
}) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1 tw-p-2 tw-border-b tw-border-border tw-min-w-0">
      {/* Column header: checkbox + verse ref + status + edit */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-flex-wrap">
        {effectiveViewType === 'ColumnView' && row.isApprovable && (
          <Checkbox
            checked={column.columnChecked}
            onCheckedChange={() => onToggleColumnApproval(passageIndex, column.verseRef)}
            aria-label={`Approve ${column.verseRef}`}
          />
        )}
        <Button
          variant="link"
          className="tw-p-0 tw-h-auto tw-text-sm tw-font-semibold"
          onClick={() => onGotoReference(column.verseRef)}
        >
          {column.verseRef}
        </Button>
        <StatusIndicator state={column.state} tooltip={column.statusTooltip} />
        {column.state === 'Outdated' && (
          <Button
            variant="link"
            className="tw-p-0 tw-h-auto tw-text-xs"
            onClick={() => onDiffClick(row.projectId, column.verseRef)}
            aria-label={`View differences for ${column.verseRef}`}
          >
            ab
          </Button>
        )}
        {column.editable && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                className="tw-p-0 tw-h-auto tw-text-xs"
                onClick={() => onEditClick(row.projectId, column.verseRef)}
              >
                Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent>{column.editTooltip}</TooltipContent>
          </Tooltip>
        )}
      </div>
      {/* Verse text: word spans */}
      <div className="tw-flex tw-flex-wrap tw-items-baseline">
        {column.words.map((word, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <HighlightedWordSpan key={i} word={word} />
        ))}
      </div>
    </div>
  );
}

function DetailRow({
  row,
  effectiveViewType,
  passageIndex,
  onToggleRowApproval,
  onToggleCollapse,
  onToggleColumnApproval,
  onEditClick,
  onDiffClick,
  onGotoReference,
}: {
  row: PassageDetailRow;
  effectiveViewType: 'RowView' | 'ColumnView';
  passageIndex: number;
  onToggleRowApproval: (passageIndex: number) => void;
  onToggleCollapse: (resourceId: string) => void;
  onToggleColumnApproval: (passageIndex: number, verseRef: string) => void;
  onEditClick: (projectId: string, verseRef: string) => void;
  onDiffClick: (projectId: string, verseRef: string) => void;
  onGotoReference: (verseRef: string) => void;
}) {
  return (
    <div className="tw-border-b tw-border-border">
      {/* Row header: project name + controls */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1 tw-bg-muted">
        {row.isCollapsible && (
          <Button
            variant="ghost"
            size="sm"
            className="tw-p-0 tw-h-6 tw-w-6"
            onClick={() => onToggleCollapse(row.projectId)}
            aria-label={
              row.isCollapsed ? `Expand ${row.projectName}` : `Collapse ${row.projectName}`
            }
            aria-expanded={!row.isCollapsed}
          >
            {row.isCollapsed ? (
              <ChevronRight className="tw-h-4 tw-w-4" />
            ) : (
              <ChevronDown className="tw-h-4 tw-w-4" />
            )}
          </Button>
        )}
        {effectiveViewType === 'RowView' && row.isApprovable && (
          <Checkbox
            checked={row.rowChecked}
            onCheckedChange={() => onToggleRowApproval(passageIndex)}
            aria-label={`Approve all verses for ${row.projectName}`}
          />
        )}
        <span className="tw-text-sm tw-font-medium">{row.projectName}</span>
      </div>
      {/* Columns (verse cells) - hidden when collapsed */}
      {!row.isCollapsed && (
        <div
          className="tw-grid tw-gap-0"
          style={{ gridTemplateColumns: `repeat(${row.columns.length}, 1fr)` }}
        >
          {row.columns.map((col) => (
            <ColumnCell
              key={col.verseRef}
              column={col}
              row={row}
              effectiveViewType={effectiveViewType}
              passageIndex={passageIndex}
              onToggleColumnApproval={onToggleColumnApproval}
              onEditClick={onEditClick}
              onDiffClick={onDiffClick}
              onGotoReference={onGotoReference}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// --- Main Component ---

export interface PassageDetailPaneProps {
  detail: ParallelPassageDetail | null;
  passageIndex: number;
  onToggleColumnApproval: (passageIndex: number, verseRef: string) => void;
  onToggleRowApproval: (passageIndex: number) => void;
  onToggleCollapse: (resourceId: string) => void;
  onEditClick: (projectId: string, verseRef: string) => void;
  onDiffClick: (projectId: string, verseRef: string) => void;
  onGotoReference: (verseRef: string) => void;
}

export default function PassageDetailPane({
  detail,
  passageIndex,
  onToggleColumnApproval,
  onToggleRowApproval,
  onToggleCollapse,
  onEditClick,
  onDiffClick,
  onGotoReference,
}: PassageDetailPaneProps) {
  const rows = useMemo(() => detail?.rows ?? [], [detail]);

  if (!detail) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground">
        Select a passage to view details
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div
        className="tw-flex tw-flex-col tw-overflow-auto"
        role="region"
        aria-label="Passage detail"
      >
        {rows.map((row) => (
          <DetailRow
            key={`${row.projectId}-${row.projectName}`}
            row={row}
            effectiveViewType={detail.effectiveViewType}
            passageIndex={passageIndex}
            onToggleRowApproval={onToggleRowApproval}
            onToggleCollapse={onToggleCollapse}
            onToggleColumnApproval={onToggleColumnApproval}
            onEditClick={onEditClick}
            onDiffClick={onDiffClick}
            onGotoReference={onGotoReference}
          />
        ))}
      </div>
    </TooltipProvider>
  );
}
