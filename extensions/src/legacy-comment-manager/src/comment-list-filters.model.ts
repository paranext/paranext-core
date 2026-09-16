import type {
  LegacyCommentThreadSelector,
  CommentPreset,
  CommentFilters,
  ScopeFilter,
} from 'legacy-comment-manager';
import type { LocalizeKey } from 'platform-bible-utils';

export type { CommentPreset, CommentFilters, ScopeFilter };

// Filter constants, types, and the selector mapping — shared between the presentational panel (which
// renders the filter toolbar) and the web view (which uses the values to build its comment-thread
// query). Kept free of React/DOM dependencies so the mapping is unit-testable.
//
// The comment filters are ONE closed set of named presets rather than orthogonal axes: each preset
// is a combination users actually work in, offered directly instead of composed from separate
// resolved/read/type/assignment/date/author axes. A separate scope axis narrows the Scripture range
// independently of the preset. Both default to values that contribute nothing to the query, so the
// out-of-the-box view is every thread.

// --- Preset axis (the named filter combinations the toolbar offers) ---

export const presetToLabelKey = {
  all: '%comment_filter_preset_all%',
  'unresolved-assigned-to-me': '%comment_filter_preset_unresolved_assigned_to_me%',
  unresolved: '%comment_filter_preset_unresolved%',
  'unread-assigned-to-me': '%comment_filter_preset_unread_assigned_to_me%',
  unread: '%comment_filter_preset_unread%',
  'unread-and-unresolved': '%comment_filter_preset_unread_and_unresolved%',
  resolved: '%comment_filter_preset_resolved%',
  unsaved: '%comment_filter_preset_unsaved%',
  conflict: '%comment_filter_preset_conflict%',
} as const satisfies Record<CommentPreset, LocalizeKey>;

export function isCommentPreset(value: string): value is CommentPreset {
  return Object.hasOwn(presetToLabelKey, value);
}

export const DEFAULT_COMMENT_FILTERS: CommentFilters = { preset: 'all' };

// Paratext 9's literal "assigned to the whole team" token (UserFilter/CommentTags): threads assigned
// to the team carry this exact `AssignedUser` value.
export const TEAM_ASSIGNED_USER = 'Team';

// --- Scope axis (how much Scripture the list covers) ---

export const DEFAULT_SCOPE_FILTER: ScopeFilter = 'all-books';

export const scopeFilterToLabelKey = {
  'all-books': '%comment_filter_scope_all_books%',
  'current-book': '%comment_filter_scope_current_book%',
  'current-chapter': '%comment_filter_scope_current_chapter%',
  'current-verse': '%comment_filter_scope_current_verse%',
} as const satisfies Record<ScopeFilter, LocalizeKey>;

export function isScopeFilter(value: string): value is ScopeFilter {
  return Object.hasOwn(scopeFilterToLabelKey, value);
}

/** The Scripture-range granularity each scope queries at; `all-books` queries no range at all. */
const scopeToGranularity = {
  'current-book': 'book',
  'current-chapter': 'chapter',
  'current-verse': 'verse',
} as const satisfies Record<Exclude<ScopeFilter, 'all-books'>, 'book' | 'chapter' | 'verse'>;

/**
 * Which scrRef fields each scope's query granularity actually reads: `book` granularity ignores
 * chapter/verse, `chapter` granularity ignores verse, and `all-books` reads nothing (it sends no
 * scriptureRanges at all). A caller driving a live reference (e.g. the web view following the
 * window's scroll group) uses this to freeze the fields a scope doesn't need to constants, so a
 * change to an unused field can't invalidate an identity-based memo of the query and force a
 * needless PDP resubscribe. `satisfies Record<ScopeFilter, ...>` makes a scope added to the union
 * without an entry here a compile error, rather than a silent fall-through that freezes every field
 * for the new scope.
 */
export const scopeFieldsUsed = {
  'all-books': { book: false, chapterNum: false, verseNum: false },
  'current-book': { book: true, chapterNum: false, verseNum: false },
  'current-chapter': { book: true, chapterNum: true, verseNum: false },
  'current-verse': { book: true, chapterNum: true, verseNum: true },
} as const satisfies Record<ScopeFilter, { book: boolean; chapterNum: boolean; verseNum: boolean }>;

/** True when the preset is at its default, i.e. no preset filtering is applied. */
export function areCommentFiltersAtDefault(filters: CommentFilters): boolean {
  return filters.preset === DEFAULT_COMMENT_FILTERS.preset;
}

/**
 * Applies a partial filter override onto {@link DEFAULT_COMMENT_FILTERS}. An axis absent from
 * `overrides` is reset to its default rather than merged with a prior selection, so a programmatic
 * open shows exactly the requested view.
 */
export function applyFilterOverrides(overrides?: Partial<CommentFilters>): CommentFilters {
  // Built from the known axes rather than spread, so a present-but-nullish axis surviving the JSON
  // bus resets to its default instead of leaking a null. A new axis is a compile error here, which
  // is the intended safety net.
  return { preset: overrides?.preset ?? DEFAULT_COMMENT_FILTERS.preset };
}

/**
 * Builds the comment-thread query from the current selections. The preset and the scope contribute
 * independently and AND together.
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

  // Scope
  if (scopeFilter !== 'all-books') {
    selector.scriptureRanges = [
      { granularity: scopeToGranularity[scopeFilter], start: scrRef, end: scrRef },
    ];
  }

  // Preset
  switch (filters.preset) {
    case 'unresolved':
      selector.isResolved = false;
      break;
    case 'resolved':
      selector.isResolved = true;
      break;
    case 'unread':
      selector.isRead = false;
      break;
    case 'unread-and-unresolved':
      selector.isRead = false;
      selector.isResolved = false;
      break;
    case 'conflict':
      selector.type = 'Conflict';
      break;
    case 'unresolved-assigned-to-me':
      selector.isResolved = false;
      // Only filter once the name has loaded: an empty assignedTo means "unassigned" to the
      // provider, which would silently show the wrong threads rather than none.
      if (currentUserName) selector.assignedTo = currentUserName;
      break;
    case 'unread-assigned-to-me':
      selector.isRead = false;
      if (currentUserName) selector.assignedTo = currentUserName;
      break;
    case 'all':
    case 'unsaved':
      // Neither narrows the query: `all` by definition, and `unsaved` because a draft is
      // client-side state the provider has never heard of.
      break;
    default: {
      // Exhaustiveness guard: a preset added to the union without a case here fails to compile,
      // rather than silently producing an unnarrowed selector that reads as "show everything".
      const unhandled: never = filters.preset;
      throw new Error(`Unhandled comment preset: ${String(unhandled)}`);
    }
  }

  return selector;
}
