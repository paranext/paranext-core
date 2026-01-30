import { useCallback, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Checkbox, cn } from 'platform-bible-react';
import type {
  FilteredPassageEntry,
  ParallelPassageViewType,
  PassageReferenceDisplay,
  StatusAggregation,
} from '../types/parallel-passages';

// --- Helper: determine checkbox state from StatusAggregation ---

type CheckboxState = 'checked' | 'unchecked' | 'indeterminate' | 'hidden';

function getCheckboxState(status: StatusAggregation): CheckboxState {
  if (status.allIgnored) return 'hidden';
  if (status.allTicked) return 'checked';
  if (status.anyOutdated) return 'indeterminate';
  if (status.allUnfinished) return 'unchecked';
  // Mixed state (some finished, some not, no outdated)
  return 'indeterminate';
}

function isCheckboxDisabled(
  viewType: ParallelPassageViewType,
  isResourceProject: boolean,
  hasPassagesPermission: boolean,
): boolean {
  if (isResourceProject) return true;
  if (!hasPassagesPermission) return true;
  if (viewType === 'ColumnView') return true;
  return false;
}

// --- Reference display sub-component ---

function ReferenceDisplay({ ref: _ref, ...props }: { ref?: never } & PassageReferenceDisplay) {
  const { verseRef, displayClass, showDiffIcon, showCheckmark } = props;

  return (
    <span
      className={cn('tw-inline-flex tw-items-center tw-gap-0.5', {
        'tw-text-foreground': displayClass === 'found',
        'tw-text-muted-foreground': displayClass === 'missing' || displayClass === 'ignored',
      })}
    >
      {showDiffIcon && (
        <span
          className="tw-text-xs tw-font-bold tw-text-muted-foreground"
          title="Text changed since approved"
        >
          ab
        </span>
      )}
      {showCheckmark && <Check className="tw-h-3 tw-w-3 tw-text-green-600" />}
      <span>{verseRef}</span>
    </span>
  );
}

// --- Props ---

export interface PassageListProps {
  passages: FilteredPassageEntry[];
  selectedIndex: number | null;
  viewType: ParallelPassageViewType;
  isResourceProject: boolean;
  hasPassagesPermission: boolean;
  onSelectPassage: (index: number) => void;
  onToggleRowApproval: (passageIndex: number) => void;
}

// --- Main component ---

export default function PassageList({
  passages,
  selectedIndex,
  viewType,
  isResourceProject,
  hasPassagesPermission,
  onSelectPassage,
  onToggleRowApproval,
}: PassageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRowRef = useRef<HTMLDivElement>(null);

  const disabled = isCheckboxDisabled(viewType, isResourceProject, hasPassagesPermission);

  // Scroll selected row into view when selectedIndex changes
  useEffect(() => {
    selectedRowRef.current?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (passages.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = selectedIndex === null ? 0 : Math.min(selectedIndex + 1, passages.length - 1);
        onSelectPassage(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = selectedIndex === null ? passages.length - 1 : Math.max(selectedIndex - 1, 0);
        onSelectPassage(prev);
      } else if (e.key === ' ') {
        e.preventDefault();
        if (selectedIndex !== null && !disabled && viewType !== 'ColumnView') {
          onToggleRowApproval(selectedIndex);
        }
      }
    },
    [passages.length, selectedIndex, onSelectPassage, onToggleRowApproval, disabled, viewType],
  );

  return (
    <div
      ref={containerRef}
      className="tw-flex tw-flex-col tw-overflow-auto tw-h-full tw-text-sm"
      role="listbox"
      aria-label="Passage list"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header row */}
      <div className="tw-flex tw-gap-2 tw-px-2 tw-py-1 tw-border-b tw-border-border tw-font-semibold tw-text-xs tw-text-muted-foreground tw-sticky tw-top-0 tw-bg-background tw-z-10">
        <div className="tw-w-6 tw-shrink-0">Status</div>
        <div className="tw-w-32 tw-shrink-0">Selected passage</div>
        <div className="tw-flex-1">Parallels</div>
      </div>

      {/* Passage rows */}
      {passages.map((passage) => {
        const checkState = getCheckboxState(passage.statusAggregation);
        const isSelected = selectedIndex === passage.index;
        const matchesFilter = true; // matchesCurrentFilter would be a prop on FilteredPassageEntry if needed

        return (
          <div
            key={passage.index}
            ref={isSelected ? selectedRowRef : undefined}
            role="option"
            aria-selected={isSelected}
            className={cn(
              'tw-flex tw-gap-2 tw-px-2 tw-py-1 tw-cursor-pointer tw-items-center tw-border-b tw-border-border',
              {
                'tw-bg-primary/10': isSelected,
                'tw-bg-muted/40': !isSelected && !matchesFilter,
              },
            )}
            onClick={() => onSelectPassage(passage.index)}
          >
            {/* Status checkbox column */}
            <div className="tw-w-6 tw-shrink-0 tw-flex tw-items-center tw-justify-center">
              {checkState !== 'hidden' && (
                <Checkbox
                  checked={
                    checkState === 'checked'
                      ? true
                      : checkState === 'indeterminate'
                        ? 'indeterminate'
                        : false
                  }
                  disabled={disabled}
                  aria-label={`Approval status for ${passage.headVerse}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!disabled && viewType !== 'ColumnView') {
                      onToggleRowApproval(passage.index);
                    }
                  }}
                  onCheckedChange={() => {
                    // Handled by onClick to prevent double-fire
                  }}
                />
              )}
            </div>

            {/* Selected passage column - first reference */}
            <div className="tw-w-32 tw-shrink-0 tw-truncate">
              {passage.references.length > 0 && <ReferenceDisplay {...passage.references[0]} />}
            </div>

            {/* Parallels column - remaining references */}
            <div className="tw-flex-1 tw-flex tw-flex-wrap tw-gap-x-2 tw-gap-y-0.5">
              {passage.references.slice(1).map((ref) => (
                <ReferenceDisplay key={ref.verseRef} {...ref} />
              ))}
            </div>
          </div>
        );
      })}

      {passages.length === 0 && (
        <div className="tw-flex tw-items-center tw-justify-center tw-p-4 tw-text-muted-foreground">
          No passages match the current filter
        </div>
      )}
    </div>
  );
}
