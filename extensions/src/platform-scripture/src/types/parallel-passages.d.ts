// Type declarations for the Parallel Passages Tool
// Generated from data-contracts.md and ui-state-contracts.md

// --- Enum Types ---

export type PassageStates = 'Unfinished' | 'Finished' | 'Outdated' | 'MissingText' | 'IgnoredBook';

export type ParallelPassageType = 'NTtoNT' | 'NTtoOT' | 'OTtoOT';

export type PassageFilterType = 'All' | 'Unchecked' | 'ChangedText' | 'MissingText';

export type ParallelPassageFilter = 'All' | 'NTtoNT' | 'NTtoOT' | 'OTtoOT' | 'Gospels';

export type ParallelPassageViewType = 'RowView' | 'ColumnView' | 'Dynamic';

export type DegreeOfParallelism = 'None' | 'CalculatedMatch' | 'ExpertClose' | 'ExpertExact';

export type SourceDisplayMode = 0 | 1 | 2;

// --- Request Types ---

export interface PassageListRequest {
  projectId: string;
  typeFilter: ParallelPassageFilter;
  statusFilter: PassageFilterType;
  locationFilter?: LocationFilter;
}

export interface PassageDetailRequest {
  projectId: string;
  passageIndex: number;
  comparativeTextIds: string[];
  sourceDisplayMode: SourceDisplayMode;
  viewType: ParallelPassageViewType;
  collapsedResources: string[];
  numberOfWordsToMatch?: number;
}

export interface ToggleSetApprovalRequest {
  projectId: string;
  passageIndex: number;
}

export interface ToggleIndividualApprovalRequest {
  projectId: string;
  passageIndex: number;
  headVerse: string;
}

export interface LocationFilter {
  type: 'current-book' | 'custom-range';
  bookNum?: number;
  verseRange?: { start: string; end: string };
}

// --- Result Types ---

export type PassageListResult =
  | { success: true; data: PassageListData }
  | { success: false; errorCode: string; message: string };

export interface PassageListData {
  passages: FilteredPassageEntry[];
  totalCount: number;
  filteredCount: number;
}

export interface FilteredPassageEntry {
  index: number;
  passageType: ParallelPassageType;
  headVerse: string;
  references: PassageReferenceDisplay[];
  statusAggregation: StatusAggregation;
}

export interface PassageReferenceDisplay {
  verseRef: string;
  state: PassageStates;
  displayClass: 'found' | 'missing' | 'ignored';
  showDiffIcon: boolean;
  showCheckmark: boolean;
}

export interface StatusAggregation {
  allIgnored: boolean;
  allTicked: boolean;
  anyOutdated: boolean;
  allChanged: boolean;
  allUnfinished: boolean;
}

export type PassageDetailResult =
  | { success: true; data: ParallelPassageDetail }
  | { success: false; errorCode: string; message: string };

export interface ParallelPassageDetail {
  passageType: ParallelPassageType;
  headVerse: string;
  effectiveViewType: 'RowView' | 'ColumnView';
  statusFlags: StatusAggregation;
  projectApprovable: boolean;
  canApproveRow: boolean;
  rows: PassageDetailRow[];
  warning?: RibbonWarning;
}

export interface PassageDetailRow {
  projectId: string;
  projectName: string;
  isSourceLanguage: boolean;
  isCollapsible: boolean;
  isCollapsed: boolean;
  isApprovable: boolean;
  rowChecked: boolean;
  columns: PassageDetailColumn[];
}

export interface PassageDetailColumn {
  verseRef: string;
  state: PassageStates;
  columnChecked: boolean;
  editable: boolean;
  editTooltip: string;
  words: HighlightedWord[];
  statusTooltip: string;
}

export interface HighlightedWord {
  text: string;
  degree: DegreeOfParallelism;
  gloss?: string;
}

export interface RibbonWarning {
  type: 'resource-text' | 'book-not-selected' | 'book-not-in-scope' | 'missing-projects';
  message: string;
  actionLink?: { label: string; action: string };
}

export type ApprovalResult =
  | { success: true; updatedStatuses: StatusAggregation }
  | { success: false; errorCode: string; message: string };

// --- Event Types ---

export interface PassageStatusChangedEvent {
  projectId: string;
  affectedPassageIndices: number[];
}

export interface ProjectDataChangedEvent {
  projectId: string;
  changeType: 'text-changed' | 'settings-changed' | 'project-removed';
}

// --- State Management Types ---

export interface ParallelPassagesToolInput {
  projectId: string;
  scrollGroup: string;
  initialReference?: string;
  initialFilter?: PassageFilterType;
  initialBookPortion?: string;
}

export interface ParallelPassagesMemento {
  comparativeTextIds: string[];
  sourceDisplayMode: SourceDisplayMode;
  passageFilter: PassageFilterType;
  typeFilter: ParallelPassageFilter;
  locationFilter?: LocationFilter;
  viewType: ParallelPassageViewType;
  collapsedResources: string[];
  zoomUpperPane: number;
  zoomLowerPane: number;
  splitterRatio: number;
  currentReference: string;
  scrollGroup: string;
}

export interface ParallelPassagesToolState {
  // Identity
  projectId: string;
  projectName: string;
  isResourceProject: boolean;
  hasPassagesPermission: boolean;
  isAdmin: boolean;

  // Persisted (from memento)
  memento: ParallelPassagesMemento;

  // Derived/Computed
  sourceLanguageAvailable: boolean;
  filteredPassages: FilteredPassageEntry[];
  filteredCount: number;
  selectedIndex: number;
  selectedPassageDetail: ParallelPassageDetail | null;
  activeWarning: RibbonWarning | null;
  statusText: string;

  // Loading states
  isLoadingList: boolean;
  isLoadingDetail: boolean;
}

export type ParallelPassagesAction =
  | { type: 'SELECT_PASSAGE'; index: number }
  | { type: 'SET_PASSAGE_FILTER'; filter: PassageFilterType }
  | { type: 'SET_LOCATION_FILTER'; filter: LocationFilter }
  | { type: 'SET_TYPE_FILTER'; filter: ParallelPassageFilter }
  | { type: 'SET_VIEW_TYPE'; viewType: ParallelPassageViewType }
  | { type: 'SET_SOURCE_DISPLAY_MODE'; mode: SourceDisplayMode }
  | { type: 'TOGGLE_ROW_APPROVAL'; passageIndex: number }
  | { type: 'TOGGLE_COLUMN_APPROVAL'; passageIndex: number; verseRef: string }
  | { type: 'TOGGLE_COLLAPSE'; resourceId: string }
  | { type: 'OPEN_EDIT_DIALOG'; projectId: string; verseRef: string }
  | { type: 'OPEN_DIFF_DIALOG'; projectId: string; verseRef: string }
  | { type: 'GOTO_REFERENCE'; verseRef: string }
  | { type: 'OPEN_BOOK_CHOOSER' }
  | { type: 'OPEN_TEXT_SELECTION' }
  | { type: 'ADD_BOOK_TO_SCOPE'; bookNum: number }
  | { type: 'ADD_BOOK_TO_SELECTED'; bookNum: number }
  | { type: 'SET_ZOOM'; pane: 'upper' | 'lower'; level: number }
  | { type: 'SET_LOADING_LIST'; isLoading: boolean }
  | { type: 'SET_LOADING_DETAIL'; isLoading: boolean }
  | { type: 'SET_PASSAGE_LIST'; passages: FilteredPassageEntry[]; filteredCount: number }
  | { type: 'SET_PASSAGE_DETAIL'; detail: ParallelPassageDetail | null }
  | { type: 'SET_WARNING'; warning: RibbonWarning | null }
  | { type: 'SET_STATUS_TEXT'; text: string }
  | { type: 'RESTORE_MEMENTO'; memento: ParallelPassagesMemento };
