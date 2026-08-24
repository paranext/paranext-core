import { Canon } from '@sillsdev/scripture';
import { Scope } from 'platform-bible-react';
import {
  escapeStringRegexp,
  isPlatformError,
  isSelectableInvisibleCharOrWhiteSpace,
  normalizeProjectId,
  PlatformError,
  ScrollGroupId,
  SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS,
} from 'platform-bible-utils';
import { getBookIdsFromBooksPresent } from 'platform-bible-utils/experimental';
import { FindJobStatusReport, FindOptions } from 'platform-scripture';
import type { OpenProjectTabWithWebView } from '../hooks/use-open-project-tabs';

/** Maps invisible/whitespace code points to visible stand-in symbols */
const INVISIBLE_CHAR_SYMBOLS: Record<string, string> = {
  '\u0020': '·', // regular space → middle dot
  '\u00a0': '[Nbsp]', // non-breaking space — distinguished from regular space
  '\u200b': '‹ZW›', // zero-width space
  '\u200c': '‹ZWN›', // zero-width non-joiner
  '\u200d': '‹ZWJ›', // zero-width joiner
  '\u200e': '‹LRM›', // left-to-right mark
  '\u200f': '‹RLM›', // right-to-left mark
  '\u2060': '‹WJ›', // word joiner
  '\u202f': '·', // narrow no-break space
  '\u2009': '·', // thin space
  '\u200a': '·', // hair space
  '\u2002': '·', // en space
  '\u2003': '·', // em space
  '\u3000': '·', // ideographic space
  // ~ is intentionally omitted here; it is added dynamically when allowInvisibleCharacters is false,
  // because in that mode ~ represents NBSP in USFM and should render as [Nbsp]. When
  // allowInvisibleCharacters is true, ~ is a literal tilde in the text and must not be substituted.
};

// The regex intentionally mixes regular spaces and Unicode zero-width/whitespace code points in one
// character class. ESLint flags this as "misleading" because some of these code points (e.g.
// \u200d ZERO WIDTH JOINER) are normally combiners that modify adjacent characters rather than
// standing alone, so grouping them with ordinary characters in `[...]` can look unintentional.
// Here it is intentional: we want a single pass that catches every invisible/whitespace variant.
/* eslint-disable no-misleading-character-class */
/** Matches all handled invisible/whitespace chars, including the USFM tilde NBSP escape. */
const INVISIBLE_CHAR_REGEX_WITH_TILDE =
  /[ \u00a0\u200b\u200c\u200d\u200e\u200f\u2060\u202f\u2009\u200a\u2002\u2003\u3000~]/g;
/** Matches all handled invisible/whitespace chars, excluding tilde (for AllowInvisibleChars=true). */
const INVISIBLE_CHAR_REGEX_WITHOUT_TILDE =
  /[ \u00a0\u200b\u200c\u200d\u200e\u200f\u2060\u202f\u2009\u200a\u2002\u2003\u3000]/g;
/* eslint-enable no-misleading-character-class */

/**
 * Replaces invisible/whitespace characters with visible stand-in symbols. Regular visible
 * characters pass through unchanged.
 *
 * @param text The text to process
 * @param allowInvisibleCharacters Whether the project has AllowInvisibleChars enabled. When `false`
 *   (the default), the USFM tilde `~` is treated as a NBSP escape and rendered as `[Nbsp]`. When
 *   `true`, `~` is a literal tilde in the project's USFM and is left unchanged.
 */
export function renderWithInvisibleChars(
  text: string,
  allowInvisibleCharacters: boolean = false,
): string {
  if (allowInvisibleCharacters) {
    return text.replace(
      INVISIBLE_CHAR_REGEX_WITHOUT_TILDE,
      (ch) => INVISIBLE_CHAR_SYMBOLS[ch] ?? ch,
    );
  }
  // In legacy mode ~ represents NBSP — render it the same as U+00A0
  return text.replace(INVISIBLE_CHAR_REGEX_WITH_TILDE, (ch) =>
    ch === '~' ? '[Nbsp]' : (INVISIBLE_CHAR_SYMBOLS[ch] ?? ch),
  );
}

/**
 * Replaces trailing spaces with non-breaking spaces so they receive background-color and
 * text-decoration styling inside the highlighted find span. Since `\u00a0` is in
 * {@link INVISIBLE_CHAR_SYMBOLS}, `renderWithInvisibleChars` will render it as `[Nbsp]` when
 * `showInvisible` is enabled. Note: trailing spaces that were originally U+0020 will appear as
 * `[Nbsp]` rather than `·` due to this substitution, which is acceptable since the key information
 * (the match ends in whitespace) is still conveyed.
 */
export function preserveTrailingSpaces(text: string): string {
  return text.replace(/ +$/, (spaces) => '\u00a0'.repeat(spaces.length));
}

/**
 * Applies preserve-case transformation to the replacement text based on the casing of the matched
 * text:
 *
 * - ALL CAPS match → ALL CAPS replacement
 * - Title Case match (first letter capital) → Title Case replacement
 * - Otherwise → replacement as-is
 */
export function applyPreserveCase(matchedText: string, replacementText: string): string {
  if (!replacementText || !matchedText) return replacementText;
  if (matchedText === matchedText.toUpperCase() && matchedText !== matchedText.toLowerCase()) {
    return replacementText.toUpperCase();
  }
  const firstChar = matchedText[0];
  if (firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase()) {
    return replacementText[0].toUpperCase() + replacementText.slice(1);
  }
  return replacementText;
}

/**
 * How often the find-job poll loop checks for an update. Exported so the give-up window below is
 * computed from (and can't silently drift from) the actual poll cadence.
 */
export const POLL_INTERVAL_MS = 100;

/**
 * How long to tolerate a stalled find-job poll (the PDP/connection blipping and returning no
 * update) or a search that can't start because the data provider isn't ready, before giving up and
 * surfacing an error. Expressed as wall-clock time — not a raw retry count — so it keeps meaning
 * the same thing if `POLL_INTERVAL_MS` ever changes, and so it's long enough to survive a slow
 * backend call (a large project, a Send/Receive in progress) without a false failure.
 */
export const GIVE_UP_AFTER_MS = 5000;

/** How many consecutive poll misses {@link GIVE_UP_AFTER_MS} allows before giving up. */
export const MAX_CONSECUTIVE_POLL_MISSES = Math.ceil(GIVE_UP_AFTER_MS / POLL_INTERVAL_MS);

/**
 * Decides whether the find-job poll loop should keep retrying after a poll comes back with no
 * update, given how many consecutive misses have already happened. A single miss is treated as a
 * transient blip and retried; only a sustained run of misses (see {@link GIVE_UP_AFTER_MS}) is
 * treated as a real failure.
 *
 * @param consecutiveMisses The number of consecutive misses before this one.
 * @returns The updated miss count, and whether it has now reached
 *   {@link MAX_CONSECUTIVE_POLL_MISSES}.
 */
export function nextPollMissState(consecutiveMisses: number): {
  consecutiveMisses: number;
  hasExceededRetryLimit: boolean;
} {
  const nextConsecutiveMisses = consecutiveMisses + 1;
  return {
    consecutiveMisses: nextConsecutiveMisses,
    hasExceededRetryLimit: nextConsecutiveMisses >= MAX_CONSECUTIVE_POLL_MISSES,
  };
}

/** What a single find-job poll attempt found, and what the poll loop should do about it. */
export type PollAttemptOutcome =
  | { kind: 'noActiveJob' }
  | { kind: 'update'; update: FindJobStatusReport }
  | { kind: 'miss'; consecutiveMisses: number; hasExceededRetryLimit: boolean };

/**
 * Classifies a single find-job poll attempt, distinguishing "there is no job to poll for right now"
 * from "there is an active job but the poll came back empty" — the exact distinction a prior
 * version of the poll loop collapsed, which caused a false "search interrupted" error on every
 * ordinary new search: `abandonFindJob` clears the active-job tracking synchronously, before its
 * own PDP round-trip resolves, so the poll loop for the _previous_ search would see "no update"
 * during that window and (wrongly) count it as a connection miss instead of recognizing there was
 * simply no job left to ask about.
 *
 * @param params.hasActiveJob Whether the caller currently believes a find job is active.
 * @param params.getUpdate Retrieves the latest job-status update; only called when `hasActiveJob`.
 * @param params.consecutiveMisses The number of consecutive misses before this attempt.
 */
export async function classifyPollAttempt(params: {
  hasActiveJob: boolean;
  getUpdate: () => Promise<FindJobStatusReport | undefined>;
  consecutiveMisses: number;
}): Promise<PollAttemptOutcome> {
  if (!params.hasActiveJob) return { kind: 'noActiveJob' };
  const update = await params.getUpdate();
  if (!update) return { kind: 'miss', ...nextPollMissState(params.consecutiveMisses) };
  return { kind: 'update', update };
}

/**
 * Whether the current search term + scope/filters combination would actually run a search: false
 * for an empty term, and false for the `selectedBooks` scope with no books selected. Shared between
 * `find.web-view.tsx` (the source of truth) and `find.stories.tsx`'s harness so the two can't
 * silently diverge — they previously each hand-rolled this rule, and the harness's copy dropped the
 * empty-term check.
 */
export function isFindQueryValid(params: {
  searchTerm: string;
  scope: Scope;
  selectedBookIds: string[];
}): boolean {
  if (params.searchTerm.trim() === '') return false;
  if (params.scope === 'selectedBooks' && params.selectedBookIds.length === 0) return false;
  return true;
}

/** The decision {@link gateStartSearch} makes for a given attempt to start a search. */
export type StartSearchGate =
  | { action: 'run' }
  | { action: 'skip'; shouldRetryWhenPdpReady: boolean };

/**
 * Decides whether an attempt to start a find-job search should actually run, and — if not — whether
 * it is worth automatically retrying once the data provider becomes available. Only a missing data
 * provider is retryable: it is a temporary condition (mount-time race, or the provider dropping
 * during a long idle period) that resolves on its own once the provider reconnects. An invalid
 * query or a search already in flight are not retryable — retrying them would either loop forever
 * (the query stays invalid until the user changes it) or duplicate work.
 */
export function gateStartSearch(params: {
  isSearchQueryValid: boolean;
  hasPdp: boolean;
  isAlreadyStarting: boolean;
}): StartSearchGate {
  if (!params.isSearchQueryValid || params.isAlreadyStarting) {
    return { action: 'skip', shouldRetryWhenPdpReady: false };
  }
  if (!params.hasPdp) {
    return { action: 'skip', shouldRetryWhenPdpReady: true };
  }
  return { action: 'run' };
}

/**
 * Arms a single bounded wait: `onTimeout` fires once after `delayMs` unless `clear()` is called
 * first. Used to bound how long a search can sit waiting for the find data provider before giving
 * up — without this, a valid term with the provider never arriving would leave the pending/loading
 * state showing forever with no error, the same class of silently-stuck-forever bug the poll loop's
 * own give-up handling (see {@link nextPollMissState}) prevents one step later.
 */
export function armBoundedWait(onTimeout: () => void, delayMs: number): { clear: () => void } {
  const timeoutId = setTimeout(onTimeout, delayMs);
  return { clear: () => clearTimeout(timeoutId) };
}

/**
 * Whether the Find panel should treat the given `platform.interfaceMode` value as "simple" — i.e.
 * hide the find/replace toggle and stay in find mode. Replace is a power-mode-only capability, so
 * this returns `false` ONLY when the mode is definitively `'power'`; a {@link PlatformError} (the
 * setting is still loading or failed to read) or any non-`'power'` value fails safe to simple.
 *
 * @param interfaceMode The `platform.interfaceMode` value (or a PlatformError) from `useSetting`.
 * @returns `true` when the replace toggle should be hidden (simple mode), `false` when it should be
 *   shown (power mode).
 */
export function isSimpleInterfaceMode(interfaceMode: 'simple' | 'power' | PlatformError): boolean {
  return isPlatformError(interfaceMode) || interfaceMode !== 'power';
}

/**
 * A currently open scripture-editor tab, as tracked by `useOpenProjectTabs`.
 *
 * Derived from the hook's own type rather than restated, so the two cannot drift. The import is
 * `import type`, which TypeScript erases entirely — so this module stays free of the runtime
 * `@papi/frontend` import `use-open-project-tabs.ts` performs, and remains importable by the
 * presentational component, its story, and this file's unit tests.
 */
export type OpenScrollGroupTab = Omit<OpenProjectTabWithWebView, 'webViewType'>;

/**
 * Runs a web-view-controller call, containing BOTH ways a controller for a CLOSED editor tab fails.
 *
 * A controller is a network object: disposing it revokes its proxy. After that, even READING a
 * method off it (`controller.runAnnotationAction`) throws `TypeError: Cannot perform 'get' on a
 * proxy that has been revoked` — **synchronously**, before any promise exists. So the
 * natural-looking `controller?.method(...).catch(() => {})` cannot contain it: `?.` only guards
 * nullish, and `.catch` only sees rejections. The escaping TypeError crashed the whole Find web
 * view whenever the selected project's editor tab closed while an annotation-cleanup ran against
 * the disposed controller.
 *
 * Wrapping the call in a thunk lets this helper own the property read too, so the sync throw and
 * the async rejection funnel into one place.
 *
 * @param call Thunk that reads the method off the controller and invokes it. May return `undefined`
 *   when there is no controller to call.
 * @param onError Optional handler for either failure mode. Omit to swallow silently (correct for
 *   best-effort cleanup, where the editor is already gone and there is nothing to report).
 */
export function callControllerSafely(
  call: () => Promise<unknown> | undefined,
  onError?: (error: unknown) => void,
): void {
  try {
    call()?.catch((error: unknown) => onError?.(error));
  } catch (error) {
    // Synchronous throw from a revoked proxy (see above) — the editor tab is gone, so there is
    // nothing to act on beyond reporting it.
    onError?.(error);
  }
}

/** A `(projectId, scrollGroupId)` pair Find's project selector has selected. */
export type SelectedProjectScrollGroup = {
  projectId: string;
  scrollGroupId: ScrollGroupId;
};

/**
 * Whether selecting `newProjectId` moves Find to a DIFFERENT project — the decision that gates
 * abandoning the running find job, clearing results, and re-running the search.
 *
 * Compared case-INSENSITIVELY on purpose. `useOpenProjectTabs` reports lowercased project ids while
 * canonical ids are UPPERCASE, so the selection can legitimately be corrected from `web` to `WEB`
 * for the very same project. Treating that casing-only correction as a switch would abandon the
 * job, wipe the results the user is reading, and start a second identical search.
 *
 * @param newProjectId The project id being selected.
 * @param currentProjectId The project Find currently operates on, or `undefined` before any initial
 *   selection has been made.
 * @returns `true` when this is a move to a different project (including the initial selection,
 *   where there is no current project); `false` for the same project, whatever its casing.
 */
export function isDifferentProjectSelection(
  newProjectId: string,
  currentProjectId: string | undefined,
): boolean {
  if (!currentProjectId) return true;
  return normalizeProjectId(newProjectId) !== normalizeProjectId(currentProjectId);
}

/**
 * Book numbers the canon classifies as extra material (GLO, FRT, INT, XXA, etc. — also called
 * extra-scriptural books). Precomputed because the set is fixed for a given canon.
 *
 * Only book numbers within the canon are considered: `Canon.bookNumberToId` returns a placeholder
 * id past the last canonical book, and `Canon.isExtraMaterial` is `false` for that placeholder, so
 * an unbounded scan would treat out-of-canon positions as scriptural for the wrong reason.
 */
const EXTRA_MATERIAL_BOOK_NUMBERS: ReadonlySet<number> = new Set(
  Canon.allBookIds
    .map((_bookId, index) => index + 1)
    .filter((bookNumber) => Canon.isExtraMaterial(Canon.bookNumberToId(bookNumber))),
);

/**
 * Clears the extra material (GLO, FRT, INT, XXA, etc.) from a `platformScripture.booksPresent` flag
 * string so Find never offers those books.
 *
 * Find resolves a result's location by walking the `\c` and `\v` markers of the book it matched in.
 * Extra material is organized by paragraph markers rather than verses, so every match in one
 * resolves to the same reference, and there is no way to open such a book to act on the result
 * anyway. Excluding them keeps Find honest until the platform can open and address them.
 *
 * Flags are cleared in place rather than removed: the flag string must keep its canonical length,
 * since consumers index into it by book number and reject a length that does not match the canon.
 *
 * This narrows what Find _searches_ and what its book picker _offers_. It does not reach the
 * `book`/`chapter` scopes, which resolve from the current scripture reference rather than from this
 * flag string; PT-4415 covers gating those.
 *
 * TODO(PT-4414): Drop this exclusion once extra material can be opened and addressed.
 *
 * @param booksPresent The `platformScripture.booksPresent` project setting value.
 * @returns The same flag string with every extra-material book flagged absent.
 */
export function excludeExtraMaterialBooks(booksPresent: string): string {
  return Array.from(booksPresent, (flag, index) =>
    EXTRA_MATERIAL_BOOK_NUMBERS.has(index + 1) ? '0' : flag,
  ).join('');
}

/**
 * Lists the books a `platformScripture.booksPresent` flag string marks present, dropping the ones
 * the canon considers obsolete.
 *
 * Obsolete books are excluded because they have no localized names to display and cannot be
 * navigated to, so offering them would only produce dead entries.
 *
 * @param booksPresent The `platformScripture.booksPresent` project setting value.
 * @returns The ids of the non-obsolete books flagged present, in canonical order.
 */
export function getPresentBookIds(booksPresent: string): string[] {
  return getBookIdsFromBooksPresent(booksPresent).filter(
    (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
  );
}

/** The book lists Find derives from a project's `platformScripture.booksPresent` setting. */
export type FindBookLists = {
  /**
   * `booksPresent` flags with extra material cleared. What the search runs over and what the scope
   * selector builds its book picker from.
   */
  searchableBooksPresent: string;
  /** Ids of the books the search covers and the book picker offers. */
  availableBookIds: string[];
  /**
   * Ids of every book the project has, extra material included. Used only to localize book names,
   * so a scope label reading from the current reference still has a name for a book the search
   * itself excludes.
   */
  localizableBookIds: string[];
};

/**
 * Derives every book list Find needs from a project's `platformScripture.booksPresent` setting.
 *
 * All of Find's book-list policy lives here rather than in the web view, so the exclusion is
 * covered by tests instead of resting on a hook body.
 *
 * TODO(PT-4414): The `availableBookIds`/`localizableBookIds` split exists only to compensate for
 * excluding extra material; collapse it back into one list when that exclusion goes away.
 *
 * @param booksPresent The `platformScripture.booksPresent` project setting value.
 * @returns The searchable flag string and the book ids derived from it.
 */
export function deriveFindBookLists(booksPresent: string): FindBookLists {
  const searchableBooksPresent = excludeExtraMaterialBooks(booksPresent);
  return {
    searchableBooksPresent,
    availableBookIds: getPresentBookIds(searchableBooksPresent),
    localizableBookIds: getPresentBookIds(booksPresent),
  };
}

/**
 * Narrows a persisted book selection to the books the currently selected project actually has.
 *
 * `selectedBookIds` is persisted per web view, so switching projects can leave it naming books the
 * new project doesn't contain. The finder engine skips absent books gracefully, so this is not a
 * crash — but with the `selectedBooks` scope the search would silently cover fewer books than the
 * checkbox list shows.
 *
 * Pass `undefined` for `availableBookIds` while the project's book list is still being read, and
 * the selection is returned untouched: pruning against a not-yet-known list would wipe the whole
 * selection instead of narrowing it. An EMPTY array is a real answer — a project with no searchable
 * books — and does empty the selection. The distinction matters because Find excludes extra
 * material, so a project holding nothing else genuinely has nothing to search, and treating that as
 * "not known yet" would leave a stale selection live.
 *
 * @param availableBookIds Book ids the selected project has, or `undefined` when not yet known.
 * @param selectedBookIds The currently selected book ids.
 * @returns The pruned ids, or the ORIGINAL `selectedBookIds` array reference when nothing needed
 *   removing — so callers can compare by identity to skip a redundant state write (which also keeps
 *   an effect that depends on this from re-triggering itself).
 */
export function prunePresentBookIds(
  availableBookIds: readonly string[] | undefined,
  selectedBookIds: string[],
): string[] {
  if (!availableBookIds) return selectedBookIds;
  const availableBookIdSet = new Set(availableBookIds);
  const prunedBookIds = selectedBookIds.filter((bookId) => availableBookIdSet.has(bookId));
  return prunedBookIds.length === selectedBookIds.length ? selectedBookIds : prunedBookIds;
}

/**
 * Resolves which `(project, scroll group)` pair Find's project selector should have selected, given
 * the currently open scripture-editor tabs. Restricting the picker to only open projects means the
 * selection can go stale the moment a tab closes, so this is re-run whenever the set of open tabs
 * changes.
 *
 * - Returns the current selection unchanged when its tab is still open.
 * - Otherwise prefers another open tab of the SAME project — trying `preferredWebViewId` (the tab
 *   that originally opened Find, so a reload/first mount resumes exactly where it was) before any
 *   other tab of that project — since the project itself hasn't changed, only which tab a result
 *   click targets.
 * - Falls back to the first remaining open tab of any project once the current project has no open
 *   tabs left at all.
 * - Returns `undefined` when no tabs are open anywhere.
 *
 * @param currentProjectId Find's current project id.
 * @param currentScrollGroupId The currently selected scroll group, or `undefined` before an initial
 *   selection has been made.
 * @param openTabs Currently open scripture-editor tabs.
 * @param preferredWebViewId A tab id to prefer when resolving a same-project fallback (typically
 *   the tab that originally opened Find).
 */
export function resolveSelectedProjectScrollGroup(
  currentProjectId: string,
  currentScrollGroupId: ScrollGroupId | undefined,
  openTabs: readonly OpenScrollGroupTab[],
  preferredWebViewId: string | undefined,
): SelectedProjectScrollGroup | undefined {
  const normalizedCurrentProjectId = normalizeProjectId(currentProjectId);
  const matchesCurrentProject = (tab: OpenScrollGroupTab) =>
    normalizeProjectId(tab.projectId) === normalizedCurrentProjectId;

  if (
    currentScrollGroupId !== undefined &&
    openTabs.some((tab) => matchesCurrentProject(tab) && tab.scrollGroupId === currentScrollGroupId)
  ) {
    return { projectId: currentProjectId, scrollGroupId: currentScrollGroupId };
  }

  const preferredTab =
    preferredWebViewId !== undefined
      ? openTabs.find((tab) => tab.webViewId === preferredWebViewId && matchesCurrentProject(tab))
      : undefined;
  if (preferredTab) {
    return { projectId: currentProjectId, scrollGroupId: preferredTab.scrollGroupId };
  }

  const sameProjectTab = openTabs.find(matchesCurrentProject);
  if (sameProjectTab) {
    return { projectId: currentProjectId, scrollGroupId: sameProjectTab.scrollGroupId };
  }

  // Cross-project fallback: the current project has no open tab left, so Find moves to another open
  // project (and re-runs the search there — see the rerun hook). Which project that is must be
  // DETERMINISTIC: `openTabs` arrives as `[...tabsMap.values()]`, i.e. in the order the web-view
  // events happened to land, so taking `openTabs[0]` made the landing project depend on event timing
  // and differ between otherwise identical sessions. Order by scroll group, then project id, so the
  // same set of open tabs always resolves to the same fallback.
  const fallbackTab = [...openTabs].sort(
    (a, b) =>
      a.scrollGroupId - b.scrollGroupId ||
      normalizeProjectId(a.projectId).localeCompare(normalizeProjectId(b.projectId)),
  )[0];
  if (!fallbackTab) return undefined;
  return { projectId: fallbackTab.projectId, scrollGroupId: fallbackTab.scrollGroupId };
}

/**
 * Resolve which open tab Find should target when the user picks a project from a picker that does
 * not surface scroll groups (simple interface mode, where `ScrollGroupSelector` is hidden from both
 * toolbars and the picker reports a project id alone).
 *
 * Wraps {@link resolveSelectedProjectScrollGroup} and rejects its cross-project fallback. That
 * fallback is correct for the reassignment effect that runs when tabs close, but wrong for a click:
 * it would retarget Find at a project the user did not pick — reachable if the picked project's
 * last tab closes between render and click. Returning `undefined` leaves the choice to the
 * reassignment effect.
 *
 * Pass the CURRENT selection through rather than `undefined`, which is what makes re-picking the
 * already-selected project keep the tab Find is already on instead of snapping to that project's
 * first tab — and keeps the result independent of the order `openTabs` happened to arrive in.
 *
 * @returns The project and scroll group to select, or `undefined` if the picked project has no open
 *   tab and the selection should be ignored.
 */
export function resolveScrollGroupForPickedProject(
  pickedProjectId: string,
  currentScrollGroupId: ScrollGroupId | undefined,
  openTabs: readonly OpenScrollGroupTab[],
  preferredWebViewId: string | undefined,
): SelectedProjectScrollGroup | undefined {
  const resolved = resolveSelectedProjectScrollGroup(
    pickedProjectId,
    currentScrollGroupId,
    openTabs,
    preferredWebViewId,
  );
  if (!resolved) return undefined;
  if (normalizeProjectId(resolved.projectId) !== normalizeProjectId(pickedProjectId))
    return undefined;
  return resolved;
}

/**
 * Character categorizer settings fetched from the project's `platformScripture.*` settings, used to
 * build project-specific find/replace regex patterns.
 */
export type CharacterCategorizer = {
  /** Content of the character class matching word-forming base characters */
  baseCharacterClassRegex: string;
  /** Content of the character class matching diacritic/combining characters */
  diacriticCharacterClassRegex: string;
  /**
   * Full regex alternation pattern for word-medial characters (characters that can appear inside a
   * word but not at a boundary). May be an empty string.
   */
  wordMedialCharacterRegex: string;
  /**
   * Full regex pattern matching one or more word-break characters, derived from Paratext 9's
   * `CharacterCategorizer.WordBreakRegex`. Defaults to `\s+`. For projects with custom word-break
   * characters the pattern is `(\s|char1|char2|...)+`. Used in surrogate-path word boundaries.
   */
  wordBreakRegex: string;
  /**
   * Whether the project preserves invisible characters (e.g. NBSP, U+00A0) literally in USFM. When
   * `false` (the Paratext default), NBSP is stored as `~` in USFM, so `~` represents a non-breaking
   * space and is treated as whitespace during find. When `true`, invisible characters are literal
   * in USFM, so `~` is just a tilde.
   */
  allowInvisibleCharacters: boolean;
};

/**
 * Code-point ranges from Paratext 9's `CharacterCategorizer.singleCharacterWords`. Characters in
 * these ranges form a word all by themselves (CJK ideographs, Hiragana, Katakana, etc.) and do not
 * rely on inter word spacing, so standard word-boundary assertions do not apply to them.
 *
 * Stored as `[start, end]` inclusive pairs.
 */
const SINGLE_CHARACTER_WORD_RANGES: readonly [number, number][] = [
  [0x2e80, 0x2fd0],
  [0x3004, 0x3006],
  [0x3012, 0x3013],
  [0x3020, 0x302f],
  [0x3031, 0x303e],
  [0x3040, 0x30ff], // Hiragana and Katakana (syllabics without inter word space)
  [0x3200, 0x9ff0],
  [0xf900, 0xfaf0],
  [0xfe30, 0xfe40],
];

/**
 * Returns true if the given Unicode code point falls within one of the single-character-word ranges
 * as defined in Paratext 9's `CharacterCategorizer.IsSingleCharacterWord`.
 */
function isSingleCharacterWord(codePoint: number): boolean {
  return SINGLE_CHARACTER_WORD_RANGES.some(
    ([start, end]) => codePoint >= start && codePoint <= end,
  );
}

/**
 * Builds a JavaScript RegExp that mirrors Paratext 9's find/replace search logic in
 * `ScrLanguage.CreateSearchRegex`
 *
 * The Unicode category classes from `CharacterCategorizer` are fetched from project settings (with
 * defaults defined in `projectSettings.json`). The following simplifications apply vs. the full P9
 * implementation:
 *
 * - `DiacriticsFollowBaseCharacters` is assumed true (standard Unicode encoding order). P9 supports
 *   false for legacy hacked fonts where diacritics precede the base character, but that encoding is
 *   outside the scope of this implementation. We don't believe there is any case where
 *   DiacriticsFollowBaseCharacters is false anymore as it is essentially hard-coded in P9.
 * - Case-insensitive search uses the JS regex `i` flag rather than P9's per-character
 *   `(?:Upper|lower)` alternations built from project-specific case mappings
 *   (`CharacterCategorizer.CreateCaseInsensitiveRegex`). Custom case mappings only exist for legacy
 *   hacked fonts, which are outside the scope of this implementation.
 *
 * This does not currently implement ignoreUsfmMarkers set to false because this search string is
 * applied over content strings in USJ generated by UsjReaderWriter and therefore doesn't have
 * markers in it.
 *
 * @param options The find options controlling search behavior
 * @param characterCategorizer The character categorizer settings for the project, used to build
 *   character classes in the regex
 * @returns A compiled RegExp ready for use in UsjReaderWriter.search
 */
export function buildSearchRegex(
  options: FindOptions,
  characterCategorizer: CharacterCategorizer,
): RegExp {
  const {
    searchString,
    useRegex,
    caseInsensitive,
    wordRestriction,
    ignoreDiacritics,
    ignoreWhitespaceDifferences: ignoreWhitespace,
  } = options;

  const {
    baseCharacterClassRegex: baseClass,
    diacriticCharacterClassRegex: diacriticClass,
    wordMedialCharacterRegex: wordMedial,
    wordBreakRegex,
    allowInvisibleCharacters,
  } = characterCategorizer;

  // Detect if the search string contains supplementary-plane characters (code points > U+FFFF). In
  // UTF-16 these are encoded as surrogate pairs, so a high surrogate in the string is the
  // reliable indicator. Mirrors P9's `isSurrogatePairSearch = searchFor.Any(char.IsHighSurrogate)`
  // in `ScrLanguage.CreateSearchRegex`. When true, word boundaries use the positive-lookaround
  // surrogate path rather than the negative-lookaround non-surrogate path: surrogate code units
  // are not word characters, so the standard negative-lookahead/lookbehind boundary logic would
  // misfire on them; the positive path avoids this by anchoring to whitespace/punctuation instead.
  const isSurrogatePairSearch = /[\uD800-\uDBFF]/.test(searchString);

  // Build the word-forming character class used in non-surrogate-path boundaries.
  const wordFormingClass = `[${baseClass}${diacriticClass}]`;

  // Punctuation/symbol class mirroring P9's `punctRegex` in `ScrLanguage.CreateSearchRegex`.
  // Uses the same explicit category list: all Punctuation (Pc Pd Ps Pe Pi Pf Po) and Symbol
  // (Sm Sc Sk So) general categories, with + to match runs — identical to P9's regex literal.
  const punctuationRegex = `[\\p{Pc}\\p{Pd}\\p{Ps}\\p{Pe}\\p{Pi}\\p{Pf}\\p{Po}\\p{Sm}\\p{Sc}\\p{Sk}\\p{So}]+`;

  // Surrogate-path word boundaries mirror P9's regex.AppendFormat calls inside isSurrogatePairSearch:
  //   start: (?<=^|WordBreakRegex|punctuationRegex)
  //   end:   (?=$|WordBreakRegex|punctuationRegex)
  const surrogateWordLookbehind = `(?<=^|${wordBreakRegex}|${punctuationRegex})`;
  const surrogateWordLookahead = `(?=$|${wordBreakRegex}|${punctuationRegex})`;

  // Non-surrogate-path word boundaries: negative lookbehind/lookahead asserting the adjacent
  // character is not a word-forming character (or word-medial if applicable).
  const wordBoundaryNegLookbehind = wordMedial
    ? `(?<!${wordFormingClass}|${wordMedial})`
    : `(?<!${wordFormingClass})`;
  const wordBoundaryNegLookahead = wordMedial
    ? `(?!${wordFormingClass}|${wordMedial})`
    : `(?!${wordFormingClass})`;

  // Build a RegExp to test individual code points for diacritics (used in ignoreDiacritics loop).
  const isDiacritic = new RegExp(`^[${diacriticClass}]$`, 'u');

  // If any code point in the search string is a single-character-word character (CJK ideograph,
  // Hiragana, Katakana, etc.), word-boundary assertions are skipped. These scripts do not delimit
  // words with spaces, so the standard non-word-char lookaround logic does not apply.
  // Similar to Paratext 9's `IsSingleCharacterWord` check in `CreateSearchRegex`.
  const containsSingleCharacterWord = [...searchString].some((char) => {
    const cp = char.codePointAt(0);
    return cp !== undefined && isSingleCharacterWord(cp);
  });

  let regexStr = '';

  // MatchAtBeginningOfWord: use positive lookaround (surrogate path) or negative lookbehind
  // (non-surrogate path) to assert we are at a word boundary.
  if (
    !containsSingleCharacterWord &&
    (wordRestriction === 'wholeWord' || wordRestriction === 'startOfWord')
  ) {
    regexStr += isSurrogatePairSearch ? surrogateWordLookbehind : wordBoundaryNegLookbehind;
  }

  regexStr += '(';

  if (useRegex) {
    // When using the search string as a regex pattern, it is assumed the user who created the regex
    // accounted for ignoreDiacritics and ignoreWhitespaceDifferences in the pattern they provided,
    // so ignoreDiacritics and ignoreWhitespaceDifferences options are not applied and the pattern
    // is used as-is
    regexStr += searchString;
  } else {
    // Normalize to NFD so accented characters (e.g. é → e + combining accent) decompose into
    // base + combining mark, enabling per-character diacritic filtering. Matches C#'s searchFor.Normalize(FormD).
    const normSearch = ignoreDiacritics ? searchString.normalize('NFD') : searchString;

    // Spread to iterate over Unicode code points (handles surrogate pairs correctly in JS,
    // equivalent to C#'s UString / UCodepoint iteration).
    const chars = [...normSearch];
    let prevWasWhiteSpace = false;

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];

      // Skip combining marks in the search string when ignoreDiacritics is set.
      if (!ignoreDiacritics || !isDiacritic.test(char)) {
        // Determine whether this code point is whitespace / invisible.
        // When AllowInvisibleChars is false (the default), NBSP is stored as ~ in USFM, so ~ is
        // treated as whitespace. When true, ~ is a literal tilde, not a whitespace substitute.
        const isTildeWhitespace = !allowInvisibleCharacters;
        const isWhiteSpace =
          isSelectableInvisibleCharOrWhiteSpace(char) || (isTildeWhitespace && char === '~');

        // Skip consecutive whitespace code points when ignoreWhitespaceDifferences is set.
        if (!(ignoreWhitespace && prevWasWhiteSpace && isWhiteSpace)) {
          let charPattern: string;
          if (ignoreWhitespace && isWhiteSpace) {
            // Collapse any whitespace run to a single lazy multi-whitespace pattern (including ~
            // when it represents NBSP, i.e., when AllowInvisibleChars is false).
            charPattern = isTildeWhitespace
              ? `([${SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS}]|~)+?`
              : `[${SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS}]+?`;
          } else {
            charPattern = escapeStringRegexp(char);
          }

          regexStr += charPattern;

          // Allow diacritics after each base character when ignoreDiacritics is set.
          // C# assumes DiacriticsFollowBaseCharacters=true (standard Unicode), so no leading [M]*
          // is emitted — only a trailing [M]* after each processed code point.
          if (ignoreDiacritics) {
            regexStr += `[${diacriticClass}]*`;
          }

          prevWasWhiteSpace = isWhiteSpace;
        }
      }
    }
  }

  regexStr += ')';

  // MatchAtEndOfWord: use positive lookahead (surrogate path) or negative lookahead (non-surrogate
  // path) to assert the match does not continue into a word.
  if (
    !containsSingleCharacterWord &&
    (wordRestriction === 'wholeWord' || wordRestriction === 'endOfWord')
  ) {
    regexStr += isSurrogatePairSearch ? surrogateWordLookahead : wordBoundaryNegLookahead;
  }

  // The `u` flag enables \p{} Unicode property escapes, which are used in word-boundary patterns
  // (for letter/diacritic classes like \p{Lu}, \p{Mn}) and diacritic-ignore suffixes. It is NOT
  // needed for the whitespace class (SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS), since that is
  // just a literal list of BMP characters with no \p{} escapes. Skipped in the useRegex path to
  // avoid silently breaking user-supplied patterns that may not be u-mode compatible.
  const needsUnicodeFlag =
    (!containsSingleCharacterWord && !!(wordRestriction && wordRestriction !== 'none')) ||
    (!!ignoreDiacritics && !useRegex);
  const flags = `${caseInsensitive ? 'i' : ''}g${needsUnicodeFlag ? 'u' : ''}`;

  return new RegExp(regexStr, flags);
}
