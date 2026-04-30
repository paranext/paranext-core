import { Canon } from '@sillsdev/scripture';

/**
 * The Paratext registry-defined project scopes. See the registry's scope picker for the canonical
 * list. Each scope describes what canonical books the project is expected to contain.
 */
export type ProjectScope = {
  /** Stable identifier suitable for use as an enum value or key. */
  id: ProjectScopeId;
  /** Human-readable label, matching the registry's wording. */
  name: string;
  /**
   * Books guaranteed to be part of the scope. For flexible scopes (`portions`, `selections`,
   * `shorterBible`) this is empty because the actual book list is defined per-project.
   */
  requiredBookIds: string[];
  /**
   * Books that may optionally be part of the scope (in addition to `requiredBookIds`). For example
   * "New Testament + portions of Old Testament" has the full NT as required and the full OT as
   * optional.
   */
  optionalBookIds?: string[];
  /**
   * Optional predicate that further constrains membership — for example, "New Testament + portions
   * of Old Testament" requires at least one OT book. The predicate takes the list of book ids in
   * the current scope and returns true when the scope is satisfied.
   */
  matchesScope?: (bookIds: string[]) => boolean;
};

export type ProjectScopeId =
  | 'bibleWithoutDeuterocanon'
  | 'bibleWithDeuterocanon'
  | 'deuterocanon'
  | 'newTestament'
  | 'newTestamentPlusPortionsOfOldTestament'
  | 'oldTestament'
  | 'oldTestamentPlusPortionsOfNewTestament'
  | 'oldTestamentPlusDeuterocanon'
  | 'portions'
  | 'selections'
  | 'shorterBible';

const allBookIds: string[] = (() => {
  const ids: string[] = [];
  for (let n = 1; n <= 88; n += 1) {
    const id = Canon.bookNumberToId(n, '');
    if (id) ids.push(id);
  }
  return ids;
})();

const isBookNumber = (bookId: string, min: number, max: number) => {
  const n = Canon.bookIdToNumber(bookId);
  return n >= min && n <= max;
};

/** Canonical Old Testament book ids (1–39). */
export const OT_BOOK_IDS: string[] = allBookIds.filter((b) => isBookNumber(b, 1, 39));
/** Canonical New Testament book ids (40–66). */
export const NT_BOOK_IDS: string[] = allBookIds.filter((b) => isBookNumber(b, 40, 66));
/** Deuterocanonical book ids (67+). */
export const DC_BOOK_IDS: string[] = allBookIds.filter((b) => isBookNumber(b, 67, 88));

const hasAtLeastOneFrom = (bookIds: string[], pool: string[]) => {
  const set = new Set(bookIds);
  return pool.some((b) => set.has(b));
};

/**
 * Short, few-letter abbreviations for each scope, intended for use in tight UI surfaces (icon-only
 * sidebars, badges, etc.) where the full scope name does not fit.
 */
export const PROJECT_SCOPE_ABBREVIATIONS: Record<ProjectScopeId, string> = {
  bibleWithoutDeuterocanon: 'BIB',
  bibleWithDeuterocanon: 'B+D',
  deuterocanon: 'DC',
  newTestament: 'NT',
  newTestamentPlusPortionsOfOldTestament: 'NT+',
  oldTestament: 'OT',
  oldTestamentPlusPortionsOfNewTestament: 'OT+',
  oldTestamentPlusDeuterocanon: 'OT+D',
  portions: 'POR',
  selections: 'SEL',
  shorterBible: 'SHB',
};

/** All Paratext registry project scopes keyed by `ProjectScopeId`. */
export const PROJECT_SCOPES: Record<ProjectScopeId, ProjectScope> = {
  bibleWithoutDeuterocanon: {
    id: 'bibleWithoutDeuterocanon',
    name: 'Bible without Deuterocanon',
    requiredBookIds: [...OT_BOOK_IDS, ...NT_BOOK_IDS],
  },
  bibleWithDeuterocanon: {
    id: 'bibleWithDeuterocanon',
    name: 'Bible with Deuterocanon',
    requiredBookIds: [...OT_BOOK_IDS, ...NT_BOOK_IDS, ...DC_BOOK_IDS],
  },
  deuterocanon: {
    id: 'deuterocanon',
    name: 'Deuterocanon',
    requiredBookIds: [...DC_BOOK_IDS],
  },
  newTestament: {
    id: 'newTestament',
    name: 'New Testament',
    requiredBookIds: [...NT_BOOK_IDS],
  },
  newTestamentPlusPortionsOfOldTestament: {
    id: 'newTestamentPlusPortionsOfOldTestament',
    name: 'New Testament + portions of Old Testament',
    requiredBookIds: [...NT_BOOK_IDS],
    optionalBookIds: [...OT_BOOK_IDS],
    matchesScope: (bookIds) => hasAtLeastOneFrom(bookIds, OT_BOOK_IDS),
  },
  oldTestament: {
    id: 'oldTestament',
    name: 'Old Testament',
    requiredBookIds: [...OT_BOOK_IDS],
  },
  oldTestamentPlusPortionsOfNewTestament: {
    id: 'oldTestamentPlusPortionsOfNewTestament',
    name: 'Old Testament + portions of New Testament',
    requiredBookIds: [...OT_BOOK_IDS],
    optionalBookIds: [...NT_BOOK_IDS],
    matchesScope: (bookIds) => hasAtLeastOneFrom(bookIds, NT_BOOK_IDS),
  },
  oldTestamentPlusDeuterocanon: {
    id: 'oldTestamentPlusDeuterocanon',
    name: 'Old Testament + Deuterocanon',
    requiredBookIds: [...OT_BOOK_IDS, ...DC_BOOK_IDS],
  },
  portions: {
    id: 'portions',
    name: 'Portions (one or more whole books)',
    requiredBookIds: [],
    optionalBookIds: [...OT_BOOK_IDS, ...NT_BOOK_IDS, ...DC_BOOK_IDS],
    matchesScope: (bookIds) => bookIds.length >= 1,
  },
  selections: {
    id: 'selections',
    name: 'Selections',
    requiredBookIds: [],
    optionalBookIds: [...OT_BOOK_IDS, ...NT_BOOK_IDS, ...DC_BOOK_IDS],
  },
  shorterBible: {
    id: 'shorterBible',
    name: 'Shorter Bible',
    requiredBookIds: [],
    optionalBookIds: [...OT_BOOK_IDS, ...NT_BOOK_IDS],
  },
};

/**
 * Returns the number of books expected for a scope. For scopes with a fixed set of required books
 * that is the `requiredBookIds` length; for flexible scopes (`portions`, `selections`,
 * `shorterBible`) we fall back to the number of books currently part of that project's scope.
 */
export function getExpectedBookCountForScope(
  scope: ProjectScope,
  currentBookIds: string[],
): number {
  if (scope.requiredBookIds.length > 0) return scope.requiredBookIds.length;
  return currentBookIds.length;
}

/**
 * Returns whether a single book fits inside the scope description — i.e. whether it belongs to
 * `requiredBookIds` or `optionalBookIds`. Books that don't fit are considered "unplanned" and
 * shouldn't normally be added to the scope.
 */
export function doesBookFitScope(scope: ProjectScope, bookId: string): boolean {
  if (scope.requiredBookIds.includes(bookId)) return true;
  if (scope.optionalBookIds?.includes(bookId)) return true;
  return false;
}
