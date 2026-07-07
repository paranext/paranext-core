import type { LegacyCommentThreadSelector } from 'legacy-comment-manager';

// Filter constants, types, and the selector mapping — shared between the presentational panel (which
// renders the filter toolbar) and the web view (which uses the values to build its comment-thread
// query). Kept free of React/DOM dependencies so the mapping is unit-testable.
//
// The comment filters are orthogonal axes (resolved status, read status, note type, assignment) that
// AND together, plus a separate scope axis. Each axis defaults to 'all' (no filtering), so the
// out-of-the-box view is every thread. This mirrors the axes of Paratext 9's "Define Filter" dialog;
// PT9's own presets are reachable by combining axes (see buildCommentThreadSelector). PT-4027.

// --- Scope axis (current chapter vs all books) ---

export const UNFILTERED = 'unfiltered';
export const SCOPE_FILTER_CURRENT_CHAPTER = 'current-chapter';

export const scopeFilterToLabelKey = {
  [SCOPE_FILTER_CURRENT_CHAPTER]: '%comment_filter_scope_current_chapter%',
  [UNFILTERED]: '%comment_filter_scope_all_books%',
} as const;

export type ScopeFilter = keyof typeof scopeFilterToLabelKey;

export function isScopeFilter(value: string): value is ScopeFilter {
  return value in scopeFilterToLabelKey;
}

// --- Resolved-status axis (the thread's note-lifecycle Resolved state) ---

export const resolvedFilterToLabelKey = {
  all: '%comment_filter_resolved_all%',
  unresolved: '%comment_filter_resolved_unresolved%',
  resolved: '%comment_filter_resolved_resolved%',
} as const;

export type ResolvedFilter = keyof typeof resolvedFilterToLabelKey;

export function isResolvedFilter(value: string): value is ResolvedFilter {
  return value in resolvedFilterToLabelKey;
}

// --- Read-status axis (the current user's per-thread read state) ---

export const readFilterToLabelKey = {
  all: '%comment_filter_read_all%',
  unread: '%comment_filter_read_unread%',
  read: '%comment_filter_read_read%',
} as const;

export type ReadFilter = keyof typeof readFilterToLabelKey;

export function isReadFilter(value: string): value is ReadFilter {
  return value in readFilterToLabelKey;
}

// --- Note-type axis (conflict notes vs regular comments) ---

export const typeFilterToLabelKey = {
  all: '%comment_filter_type_all%',
  conflicts: '%comment_filter_type_conflicts%',
  comments: '%comment_filter_type_comments%',
} as const;

export type TypeFilter = keyof typeof typeFilterToLabelKey;

export function isTypeFilter(value: string): value is TypeFilter {
  return value in typeFilterToLabelKey;
}

// --- Assignment axis (who the thread is assigned to) ---

export const assignmentFilterToLabelKey = {
  all: '%comment_filter_assignment_all%',
  'assigned-to-me': '%comment_filter_assignment_me%',
  team: '%comment_filter_assignment_team%',
} as const;

export type AssignmentFilter = keyof typeof assignmentFilterToLabelKey;

export function isAssignmentFilter(value: string): value is AssignmentFilter {
  return value in assignmentFilterToLabelKey;
}

/** The four orthogonal comment-filter axis selections. Each defaults to `'all'` (no filtering). */
export type CommentFilters = {
  resolved: ResolvedFilter;
  read: ReadFilter;
  type: TypeFilter;
  assignment: AssignmentFilter;
};

export const DEFAULT_COMMENT_FILTERS: CommentFilters = {
  resolved: 'all',
  read: 'all',
  type: 'all',
  assignment: 'all',
};

// Paratext 9's literal "assigned to the whole team" token (UserFilter/CommentTags): threads assigned
// to the team carry this exact `AssignedUser` value.
const TEAM_ASSIGNED_USER = 'Team';

/**
 * Builds the comment-thread query from the current filter selections. Each axis contributes at most
 * one selector clause; an axis left at `'all'` contributes nothing. All clauses AND together.
 *
 * Paratext 9's notes-filter presets are reached by composition — e.g. "Unresolved conflicts" = `{
 * type: 'conflicts', resolved: 'unresolved' }`; "Unresolved assigned to me" = `{ resolved:
 * 'unresolved', assignment: 'assigned-to-me' }`. See PT-4027.
 */
export function buildCommentThreadSelector({
  filters,
  scopeFilter,
  scrRef,
  currentUserName,
}: {
  filters: CommentFilters;
  scopeFilter: ScopeFilter;
  scrRef: { book: string; chapterNum: number; verseNum: number };
  currentUserName: string;
}): LegacyCommentThreadSelector {
  const selector: LegacyCommentThreadSelector = {};

  // Scope (Scripture ranges)
  if (scopeFilter === SCOPE_FILTER_CURRENT_CHAPTER) {
    selector.scriptureRanges = [
      {
        granularity: 'chapter' as const,
        start: { book: scrRef.book, chapterNum: scrRef.chapterNum, verseNum: scrRef.verseNum },
        end: { book: scrRef.book, chapterNum: scrRef.chapterNum, verseNum: scrRef.verseNum },
      },
    ];
  }

  // Resolved status (thread status is Resolved or not)
  if (filters.resolved === 'unresolved') selector.isResolved = false;
  else if (filters.resolved === 'resolved') selector.isResolved = true;

  // Read status (current user's per-thread read state)
  if (filters.read === 'unread') selector.isRead = false;
  else if (filters.read === 'read') selector.isRead = true;

  // Note type
  if (filters.type === 'conflicts') selector.type = 'Conflict';
  else if (filters.type === 'comments') selector.type = 'Normal';

  // Assignment
  if (filters.assignment === 'assigned-to-me') selector.assignedTo = currentUserName;
  else if (filters.assignment === 'team') selector.assignedTo = TEAM_ASSIGNED_USER;

  return selector;
}
