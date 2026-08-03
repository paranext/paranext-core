import type {
  LegacyCommentThreadSelector,
  ResolvedFilter,
  ReadFilter,
  TypeFilter,
  AssignmentFilter,
  CommentFilters,
  ScopeFilter,
} from 'legacy-comment-manager';
import { deepEqual } from 'platform-bible-utils';
import type { LocalizeKey } from 'platform-bible-utils';

export type {
  ResolvedFilter,
  ReadFilter,
  TypeFilter,
  AssignmentFilter,
  CommentFilters,
  ScopeFilter,
};

// Filter constants, types, and the selector mapping — shared between the presentational panel (which
// renders the filter toolbar) and the web view (which uses the values to build its comment-thread
// query). Kept free of React/DOM dependencies so the mapping is unit-testable.
//
// The comment filters are orthogonal axes (resolved status, read status, note type, assignment) that
// AND together, plus a separate scope axis. Each axis defaults to 'all' (no filtering), so the
// out-of-the-box view is every thread. This mirrors the axes of Paratext 9's "Define Filter" dialog;
// PT9's own presets are reachable by combining axes (see buildCommentThreadSelector).

// --- Scope axis (current chapter vs all books) ---

export const UNFILTERED = 'unfiltered';
export const SCOPE_FILTER_CURRENT_CHAPTER = 'current-chapter';

export const scopeFilterToLabelKey = {
  [SCOPE_FILTER_CURRENT_CHAPTER]: '%comment_filter_scope_current_chapter%',
  [UNFILTERED]: '%comment_filter_scope_all_books%',
} as const satisfies Record<ScopeFilter, LocalizeKey>;

export function isScopeFilter(value: string): value is ScopeFilter {
  return Object.hasOwn(scopeFilterToLabelKey, value);
}

/**
 * Resolves the scope value that should actually drive both the query and the toolbar display.
 *
 * "Current chapter" only makes sense when the list has a live Scripture reference to follow. When
 * it doesn't (`canScopeToCurrentChapter` is false — e.g. a cross-project list with no wired
 * editor), a `current-chapter` value — whether persisted from a prior context or set via the public
 * `setFilters` controller — is coerced back to {@link UNFILTERED}. This keeps the displayed value,
 * the offered options, and the query in agreement instead of scoping to a reference that isn't
 * there.
 *
 * Co-located with the scope-axis definitions so the single rule is testable and every caller stays
 * consistent, rather than re-deriving the coercion at each use site.
 */
export function resolveEffectiveScopeFilter(
  scopeFilter: ScopeFilter,
  canScopeToCurrentChapter: boolean,
): ScopeFilter {
  return !canScopeToCurrentChapter && scopeFilter === SCOPE_FILTER_CURRENT_CHAPTER
    ? UNFILTERED
    : scopeFilter;
}

// --- Resolved-status axis (the thread's note-lifecycle Resolved state) ---

export const resolvedFilterToLabelKey = {
  all: '%comment_filter_resolved_all%',
  unresolved: '%comment_filter_resolved_unresolved%',
  resolved: '%comment_filter_resolved_resolved%',
} as const satisfies Record<ResolvedFilter, LocalizeKey>;

export function isResolvedFilter(value: string): value is ResolvedFilter {
  return Object.hasOwn(resolvedFilterToLabelKey, value);
}

// --- Read-status axis (the current user's per-thread read state) ---

export const readFilterToLabelKey = {
  all: '%comment_filter_read_all%',
  unread: '%comment_filter_read_unread%',
  read: '%comment_filter_read_read%',
} as const satisfies Record<ReadFilter, LocalizeKey>;

export function isReadFilter(value: string): value is ReadFilter {
  return Object.hasOwn(readFilterToLabelKey, value);
}

// --- Note-type axis (conflict notes vs regular comments) ---

export const typeFilterToLabelKey = {
  all: '%comment_filter_type_all%',
  conflicts: '%comment_filter_type_conflicts%',
  comments: '%comment_filter_type_comments%',
} as const satisfies Record<TypeFilter, LocalizeKey>;

export function isTypeFilter(value: string): value is TypeFilter {
  return Object.hasOwn(typeFilterToLabelKey, value);
}

// --- Assignment axis (who the thread is assigned to) ---

export const assignmentFilterToLabelKey = {
  all: '%comment_filter_assignment_all%',
  'assigned-to-me': '%comment_filter_assignment_me%',
  team: '%comment_filter_assignment_team%',
  unassigned: '%comment_filter_assignment_unassigned%',
} as const satisfies Record<AssignmentFilter, LocalizeKey>;

export function isAssignmentFilter(value: string): value is AssignmentFilter {
  return Object.hasOwn(assignmentFilterToLabelKey, value);
}

export const DEFAULT_COMMENT_FILTERS: CommentFilters = {
  resolved: 'all',
  read: 'all',
  type: 'all',
  assignment: 'all',
};

/**
 * True when every comment-filter axis is at its `'all'` default — i.e. no axis is actively
 * filtering. Does not consider the separate scope axis. Co-locates the axis-default knowledge with
 * the axis definitions instead of duplicating the per-axis checks at call sites.
 */
export function areCommentFiltersAtDefault(filters: CommentFilters): boolean {
  return deepEqual(filters, DEFAULT_COMMENT_FILTERS);
}

/**
 * Applies partial filter overrides onto {@link DEFAULT_COMMENT_FILTERS}. Any axis not present in
 * `overrides` is reset to its `'all'` default — the overrides are NOT merged with the user's
 * current selection — so a programmatic open (e.g. the S/R conflict link) shows exactly the
 * requested view. Shared by the web view's initial state and its `setFilters` message handler so
 * both apply the same merge semantics.
 */
export function applyFilterOverrides(overrides?: Partial<CommentFilters>): CommentFilters {
  // Build from the known axes rather than spreading `overrides`, so a present-but-nullish axis
  // (e.g. `{ type: null }` surviving the JSON bus) resets to its default instead of leaking a null
  // that would blank the dropdown while the query still behaves as 'all'. A new axis on
  // CommentFilters forces a compile error here, which is the intended safety net.
  return {
    resolved: overrides?.resolved ?? DEFAULT_COMMENT_FILTERS.resolved,
    read: overrides?.read ?? DEFAULT_COMMENT_FILTERS.read,
    type: overrides?.type ?? DEFAULT_COMMENT_FILTERS.type,
    assignment: overrides?.assignment ?? DEFAULT_COMMENT_FILTERS.assignment,
  };
}

// Paratext 9's literal "assigned to the whole team" token (UserFilter/CommentTags): threads assigned
// to the team carry this exact `AssignedUser` value.
export const TEAM_ASSIGNED_USER = 'Team';

// Paratext 9's "unassigned" token (`CommentThread.unassignedUser`): threads with no assignee carry
// this exact empty-string `AssignedUser` value. Distinct from omitting the assignment filter
// entirely (an absent `assignedTo`), which the provider treats as "any assignee".
export const UNASSIGNED_USER = '';

/**
 * Builds the comment-thread query from the current filter selections. Each axis contributes at most
 * one selector clause; an axis left at `'all'` contributes nothing. All clauses AND together.
 *
 * Paratext 9's notes-filter presets are reached by composition — e.g. "Unresolved conflicts" = `{
 * type: 'conflicts', resolved: 'unresolved' }`; "Unresolved assigned to me" = `{ resolved:
 * 'unresolved', assignment: 'assigned-to-me' }`.
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
  if (filters.assignment === 'assigned-to-me') {
    // Only filter once the current user's name has loaded. While it is still empty we must NOT fall
    // through to an empty `assignedTo`, which now means "unassigned" (UNASSIGNED_USER) — the web
    // view holds a loading state during this window (see comment-list.web-view.tsx).
    if (currentUserName) selector.assignedTo = currentUserName;
  } else if (filters.assignment === 'team') selector.assignedTo = TEAM_ASSIGNED_USER;
  else if (filters.assignment === 'unassigned') selector.assignedTo = UNASSIGNED_USER;

  return selector;
}
