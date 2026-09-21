import { logger } from '@papi/frontend';
import type {
  LegacyCommentThreadSelector,
  CommentPreset,
  CommentFilters,
  ScopeFilter,
  LegacyCommentFilters,
  LegacyScopeFilter,
} from 'legacy-comment-manager';
import type { LocalizeKey } from 'platform-bible-utils';

export type { CommentPreset, CommentFilters, ScopeFilter, LegacyCommentFilters, LegacyScopeFilter };

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

/**
 * English fallback text for each preset, shown via `localizeOrFallback` in place of a
 * `presetToLabelKey` lookup that has not resolved to translated text yet (either still loading, or
 * permanently on a `PlatformError`). `satisfies Record<CommentPreset, string>` keeps this in
 * lockstep with `presetToLabelKey` — a preset added to the union without a row here is a compile
 * error.
 */
export const presetToFallbackLabel = {
  all: 'All comments',
  'unresolved-assigned-to-me': 'Unresolved comments assigned to me',
  unresolved: 'Unresolved comments',
  'unread-assigned-to-me': 'Unread comments assigned to me',
  unread: 'Unread comments',
  'unread-and-unresolved': 'Unread and unresolved comments',
  resolved: 'Resolved comments',
  unsaved: 'Unsaved comments',
  conflict: 'Conflicts',
} as const satisfies Record<CommentPreset, string>;

export const DEFAULT_COMMENT_FILTERS: CommentFilters = { preset: 'all' };

/**
 * Whether a preset's query needs the current user's name before it can run (see
 * `buildCommentThreadSelector`'s `currentUserName` branches, which only add `assignedTo` once the
 * name has loaded — an empty `assignedTo` means "unassigned" to the provider, not "not yet known").
 * Carried on the preset itself, keyed alongside every other preset via `satisfies
 * Record<CommentPreset, boolean>`, rather than left as a hardcoded name check off in the web view:
 * that hardcoding is exactly what let a future "assigned to me"-shaped preset compile cleanly and
 * ship with a blank `assignedTo` live, caught by neither `buildCommentThreadSelector`'s
 * exhaustiveness guard (which only checks that every preset has SOME case, not that a
 * current-user-dependent one flags itself here) nor any test. Adding a preset without a row here is
 * now a compile error instead.
 */
export const presetRequiresCurrentUser = {
  all: false,
  'unresolved-assigned-to-me': true,
  unresolved: false,
  'unread-assigned-to-me': true,
  unread: false,
  'unread-and-unresolved': false,
  resolved: false,
  unsaved: false,
  conflict: false,
} as const satisfies Record<CommentPreset, boolean>;

/**
 * Whether a preset's membership must be frozen at entry and only ever grown while it stays active,
 * the same treatment `'unsaved'` already gets (see `useFrozenPresetThreadIds`'s doc). True for
 * every preset whose displayed set depends on live read state: `buildCommentThreadSelector`
 * deliberately does not send `isRead` to the provider for these, because a thread marked read (the
 * auto-read timer fires ~5 seconds after selection) would otherwise leave the query result and
 * unmount its card mid-visit. Carried alongside every other preset via `satisfies
 * Record<CommentPreset, boolean>` so a future preset that also narrows by `isRead` can't be added
 * without deciding this, the same way `presetRequiresCurrentUser` above guards against a silent
 * `assignedTo` gap.
 */
export const presetNeedsFrozenReadMembership = {
  all: false,
  'unresolved-assigned-to-me': false,
  unresolved: false,
  'unread-assigned-to-me': true,
  unread: true,
  'unread-and-unresolved': true,
  resolved: false,
  unsaved: false,
  conflict: false,
} as const satisfies Record<CommentPreset, boolean>;

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

/**
 * English fallback text for each scope, shown via `localizeOrFallback` in place of a
 * `scopeFilterToLabelKey` lookup that has not resolved to translated text yet. `satisfies
 * Record<ScopeFilter, string>` keeps this in lockstep with `scopeFilterToLabelKey` — a scope added
 * to the union without a row here is a compile error.
 */
export const scopeFilterToFallbackLabel = {
  'all-books': 'All books',
  'current-book': 'Current book',
  'current-chapter': 'Current chapter',
  'current-verse': 'Current verse',
} as const satisfies Record<ScopeFilter, string>;

/**
 * Resolves a scope value arriving at any filter boundary (the `openCommentList` command's
 * `scopeFilterToSet`, the web view's `initialScopeFilter` seed, or a `setFilters` message) onto a
 * valid {@link ScopeFilter}. This is the one place all three boundaries route through, so the
 * mapping/validation lives here rather than being repeated at each call site.
 *
 * Maps the deprecated {@link LegacyScopeFilter} `'unfiltered'` onto its exact replacement,
 * `'all-books'` — both mean "no Scripture-range restriction". Anything else this build doesn't
 * recognize — a scope from a newer build, or a malformed value crossing the command/message bus —
 * resolves to the default rather than reaching `scopeFieldsUsed`, which throws on an unrecognized
 * key.
 */
export function resolveScopeFilter(candidate?: ScopeFilter | LegacyScopeFilter): ScopeFilter {
  if (candidate === 'unfiltered') return DEFAULT_SCOPE_FILTER;
  return typeof candidate === 'string' && isScopeFilter(candidate)
    ? candidate
    : DEFAULT_SCOPE_FILTER;
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
 * True when neither filter axis is narrowing the view: the preset is at its default AND the scope
 * covers every book. Shared by two readers that must never disagree:
 *
 * - The web view uses it to decide which comment-thread drafts are safe to prune (see
 *   `useCommentDrafts`'s `isShowingAllCommentThreads` parameter). Only the complete, unfiltered
 *   thread list can be trusted for pruning -- a narrowed preset or scope would otherwise make every
 *   thread it merely hides look deleted, permanently discarding that thread's draft.
 * - The panel uses the identical fact to choose the empty-state copy (an empty project vs. a filter
 *   that matched nothing).
 *
 * Two independently written copies of this expression could drift; keeping one definition here
 * means a change to either axis is reflected at both call sites at once.
 */
export function isShowingAllThreads({
  filters,
  scopeFilter,
}: {
  filters: CommentFilters;
  scopeFilter: ScopeFilter;
}): boolean {
  return areCommentFiltersAtDefault(filters) && scopeFilter === DEFAULT_SCOPE_FILTER;
}

/**
 * Legacy four-axis combinations that have an exact counterpart among the current presets, keyed by
 * `${resolved}|${read}|${type}|${assignment}` with each axis defaulted to `'all'` when absent from
 * the input. A combination not listed here has no EXACT preset match; {@link presetFromLegacyAxes}
 * narrows it as closely as it can rather than guessing which axis to drop to force an exact fit —
 * see that function's doc for the `type: 'conflicts'` special case and the generic fallback. See
 * {@link LegacyCommentFilters}'s TSDoc for the same table with the reasoning per row.
 */
const LEGACY_AXES_TO_PRESET: Partial<Record<string, CommentPreset>> = {
  'all|all|all|all': 'all',
  'all|all|conflicts|all': 'conflict',
  'unresolved|all|all|all': 'unresolved',
  'all|unread|all|all': 'unread',
  'unresolved|unread|all|all': 'unread-and-unresolved',
  'resolved|all|all|all': 'resolved',
  'unresolved|all|all|assigned-to-me': 'unresolved-assigned-to-me',
  'all|unread|all|assigned-to-me': 'unread-assigned-to-me',
};

/**
 * Maps a legacy four-axis filter selection onto the {@link CommentPreset} with matching meaning.
 *
 * Tries an exact match against {@link LEGACY_AXES_TO_PRESET} first. Failing that, a combination
 * naming `type: 'conflicts'` alongside another active axis — e.g. `resolved: 'unresolved'` + `type:
 * 'conflicts'`, the Send/Receive "unresolved conflicts" view — narrows to `'conflict'` rather than
 * the generic `'all'` fallback: `'conflict'` still honors the one constraint the current preset set
 * CAN express (only conflict-type threads), dropping just the other axis, while `'all'` would drop
 * the conflict constraint too and hand back the complete unfiltered list — the opposite of what a
 * user clicking "merge conflicts occurred" asked for.
 *
 * Any other combination with no counterpart at all — e.g. `assignment: 'team'`/`'unassigned'`
 * (dropped entirely by the new model), `type: 'comments'` (no preset excludes conflicts), or a mix
 * of active axes the table doesn't recognize — widens to `'all'` rather than throw or guess which
 * axis to drop. Either fallback logs, naming the combination: this is the direction nobody notices
 * without one, since a silent widen just shows extra rows rather than failing loudly.
 */
function presetFromLegacyAxes(legacy: LegacyCommentFilters): CommentPreset {
  const key = [
    legacy.resolved ?? 'all',
    legacy.read ?? 'all',
    legacy.type ?? 'all',
    legacy.assignment ?? 'all',
  ].join('|');

  const exactMatch = LEGACY_AXES_TO_PRESET[key];
  if (exactMatch) return exactMatch;

  if (legacy.type === 'conflicts') {
    logger.warn(
      `Legacy comment filter combination "${key}" has no exact preset match; narrowing to ` +
        `'conflict' (dropping the other axis) rather than widening to 'all' (which would also ` +
        `drop the conflict constraint).`,
    );
    return 'conflict';
  }

  logger.warn(
    `Legacy comment filter combination "${key}" has no matching preset; widening to 'all'.`,
  );
  return DEFAULT_COMMENT_FILTERS.preset;
}

/**
 * Distinguishes the two shapes {@link applyFilterOverrides} accepts. A plain `in` check on the union
 * would leave `Partial<CommentFilters>` in both branches after narrowing — every field on both
 * shapes is optional, so TS can't prove `{}` couldn't be either — so this is written as an explicit
 * type predicate to force the negative branch to `LegacyCommentFilters`.
 *
 * Guards with `typeof overrides === 'object'` before the `in` check: `overrides` is typed as an
 * object here, but malformed input crossing the command/message bus can be any truthy primitive (a
 * string, a number), and `in` throws a `TypeError` on a non-object operand.
 */
function isNewCommentFiltersShape(
  overrides: Partial<CommentFilters> | LegacyCommentFilters,
): overrides is Partial<CommentFilters> {
  return typeof overrides === 'object' && 'preset' in overrides;
}

/**
 * Applies a partial filter override onto {@link DEFAULT_COMMENT_FILTERS}. An axis absent from
 * `overrides` is reset to its default rather than merged with a prior selection, so a programmatic
 * open shows exactly the requested view.
 *
 * This is the one place all three filter boundaries (the `openCommentList` command's
 * `filtersToSet`, the web view's `initialFilters` seed, and a `setFilters` message) route through,
 * so both kinds of untrusted input are handled here rather than repeated at each call site:
 *
 * - The deprecated {@link LegacyCommentFilters} four-axis shape (detected by the absence of a `preset`
 *   key) is mapped onto its matching preset via {@link presetFromLegacyAxes}.
 * - A `preset` this build doesn't recognize — from a newer build, or a malformed value crossing the
 *   command/message bus — resolves to the default rather than reaching
 *   {@link buildCommentThreadSelector}, whose exhaustiveness guard throws on an unhandled preset.
 */
export function applyFilterOverrides(
  overrides?: Partial<CommentFilters> | LegacyCommentFilters,
): CommentFilters {
  if (!overrides) return { ...DEFAULT_COMMENT_FILTERS };

  if (isNewCommentFiltersShape(overrides)) {
    const { preset } = overrides;
    const resolvedPreset =
      typeof preset === 'string' && isCommentPreset(preset)
        ? preset
        : DEFAULT_COMMENT_FILTERS.preset;
    return { preset: resolvedPreset };
  }

  return { preset: presetFromLegacyAxes(overrides) };
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
      // isRead is deliberately NOT sent to the provider -- see presetNeedsFrozenReadMembership's
      // doc: an unread preset's membership is instead frozen and narrowed client-side, so a thread
      // marked read while the user is looking at it doesn't leave the query result and unmount.
      break;
    case 'unread-and-unresolved':
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
      // See the 'unread' case above: isRead is deliberately not sent.
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
