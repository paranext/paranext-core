import { BookOpen } from 'lucide-react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import type {
  LocationFilter,
  ParallelPassageFilter,
  ParallelPassageViewType,
  PassageFilterType,
  SourceDisplayMode,
} from '../types/parallel-passages';

export interface ParallelPassagesToolbarProps {
  sourceDisplayMode: SourceDisplayMode;
  onSourceDisplayModeChange: (mode: SourceDisplayMode) => void;
  sourceLanguageAvailable: boolean;
  passageFilter: PassageFilterType;
  onPassageFilterChange: (filter: PassageFilterType) => void;
  typeFilter: ParallelPassageFilter;
  onTypeFilterChange: (filter: ParallelPassageFilter) => void;
  viewType: ParallelPassageViewType;
  onViewTypeChange: (viewType: ParallelPassageViewType) => void;
  onComparativeTextsClick: () => void;
  locationFilter: LocationFilter;
  onLocationFilterChange: (filter: LocationFilter) => void;
  guideActive: boolean;
  onGuideToggle: () => void;
}

const SOURCE_DISPLAY_OPTIONS: { value: string; label: string }[] = [
  { value: '0', label: 'No Hebrew/Greek Text' },
  { value: '1', label: 'Hebrew/Greek Text' },
  { value: '2', label: 'Hebrew/Greek Text and Gloss' },
];

const PASSAGE_FILTER_OPTIONS: { value: PassageFilterType; label: string }[] = [
  { value: 'All', label: 'All references' },
  { value: 'Unchecked', label: 'Unapproved references' },
  { value: 'ChangedText', label: 'Changed text' },
  { value: 'MissingText', label: 'Not yet drafted' },
];

const TYPE_FILTER_OPTIONS: { value: ParallelPassageFilter; label: string }[] = [
  { value: 'All', label: 'All parallels' },
  { value: 'NTtoNT', label: 'NT/NT' },
  { value: 'NTtoOT', label: 'NT/OT' },
  { value: 'OTtoOT', label: 'OT/OT' },
  { value: 'Gospels', label: 'Synoptic Gospels' },
];

const VIEW_TYPE_OPTIONS: { value: ParallelPassageViewType; label: string }[] = [
  { value: 'RowView', label: 'Approve sets of parallels' },
  { value: 'ColumnView', label: 'Approve passages individually' },
  { value: 'Dynamic', label: 'Approve by set or individually' },
];

export default function ParallelPassagesToolbar({
  sourceDisplayMode,
  onSourceDisplayModeChange,
  sourceLanguageAvailable,
  passageFilter,
  onPassageFilterChange,
  typeFilter,
  onTypeFilterChange,
  viewType,
  onViewTypeChange,
  onComparativeTextsClick,
  locationFilter,
  onLocationFilterChange,
  guideActive,
  onGuideToggle,
}: ParallelPassagesToolbarProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-1">
      {/* Toolbar Row 1: Source text + Comparative texts + Guide toggle */}
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 tw-items-center">
        <Select
          value={String(sourceDisplayMode)}
          onValueChange={(val: string) =>
            onSourceDisplayModeChange(Number(val) as SourceDisplayMode)
          }
          disabled={!sourceLanguageAvailable}
        >
          <SelectTrigger className="tw-min-w-40" aria-label="Source text display">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SOURCE_DISPLAY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onComparativeTextsClick}>
          Comparative Texts...
        </Button>

        <div className="tw-flex-1" />

        <Button
          variant={guideActive ? 'default' : 'outline'}
          size="sm"
          onClick={onGuideToggle}
          aria-label="Show guide"
          aria-pressed={guideActive}
        >
          <BookOpen className="tw-h-4 tw-w-4" />
        </Button>
      </div>

      {/* Toolbar Row 2: Filters + View type */}
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-gap-1 tw-items-center">
        <Select
          value={passageFilter}
          onValueChange={(val: string) => onPassageFilterChange(val as PassageFilterType)}
        >
          <SelectTrigger className="tw-min-w-40" aria-label="Passage filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PASSAGE_FILTER_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={locationFilter.type}
          onValueChange={(val: string) =>
            onLocationFilterChange({ ...locationFilter, type: val as LocationFilter['type'] })
          }
        >
          <SelectTrigger className="tw-min-w-40" aria-label="Verses filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-book">Current book</SelectItem>
            <SelectItem value="custom-range">Custom range</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(val: string) => onTypeFilterChange(val as ParallelPassageFilter)}
        >
          <SelectTrigger className="tw-min-w-32" aria-label="Type of parallel passage">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TYPE_FILTER_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={viewType}
          onValueChange={(val: string) => onViewTypeChange(val as ParallelPassageViewType)}
        >
          <SelectTrigger className="tw-min-w-48" aria-label="Approval view mode">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VIEW_TYPE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
