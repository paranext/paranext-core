import { Usj, usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import papi, { logger, ProjectDataProviderEngine } from '@papi/backend';
import { IProjectDataProviderEngine } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import {
  AsyncVariable,
  escapeStringRegexp,
  getErrorMessage,
  Mutex,
  MutexMap,
  newGuid,
  UnsubscriberAsync,
  UnsubscriberAsyncList,
  UsfmVerseLocation,
  UsfmVerseRefVerseLocation,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjChapterLocation,
  UsjReaderWriter,
} from 'platform-bible-utils';
import {
  FindJobStatus,
  FindJobStatusReport,
  FindOptions,
  FindResult,
  FindScope,
  ScriptureRangeUsjChapterOrUsfmVerseLocation,
} from 'platform-scripture';
import { USFM_VERSE_TEXT_MARKERS_SET } from '../find/usfm-verse-text-markers';
import { correctUsjVersion } from './scripture.util';

/**
 * Fallback character class matching base (word-forming) characters, used when the project's
 * `CharacterCategorizer` settings cannot be loaded. Mirrors Paratext 9's
 * `CharacterCategorizer.BaseCharacterRegex` (uppercase, lowercase, title-case, and other letters).
 * `\p{Cn}` (unassigned) is intentionally excluded: it is part of P9's definition but is not a valid
 * ECMAScript Unicode property escape and would throw at regex construction time. Extra per-language
 * base characters from the project's `CharacterCategorizer` are not included here; they are fetched
 * from the project settings and used when available. Requires the `u` flag.
 */
const BASE_CHAR_CLASS = '\\p{Lu}\\p{Ll}\\p{Lt}\\p{Lo}';

/**
 * Content of a character class matching diacritic (combining) characters. Mirrors Paratext 9's
 * `CharacterCategorizer.DiacriticCharacterRegex`: non-spacing marks, spacing combining marks, and
 * modifier letters. Extra per-language diacritics are not included. Requires the `u` flag.
 */
const DIACRITIC_CLASS = '\\p{Mn}\\p{Mc}\\p{Lm}';

/**
 * Regex for detecting whitespace and invisible characters. Approximates Paratext 9's
 * `CharacterCategorizer.WhitespaceAndInvisibleRegex`. Tilde (`~`) is handled separately as Paratext
 * treats it as whitespace when `AllowInvisibleChars` is false (the default).
 */
const WHITESPACE_CHAR = /^[\s\u00A0\u00AD\u200B\uFEFF]$/;

/**
 * Whitespace/invisible character class string for use inside regex patterns. Paired with `~` to
 * cover Paratext's tilde-as-whitespace behavior.
 */
const WHITESPACE_CLASS = '[\\s\\u00A0\\u00AD\\u200B\\uFEFF]';

/**
 * Pattern that matches 0–3 USFM markers (or attribute spans) between search characters, allowing a
 * find to succeed across text that has inline markers embedded within it (e.g., Ruby markup).
 * Limited to 3 repetitions to prevent catastrophic backtracking (PT-16898). Matches the pattern in
 * Paratext 9's `CreateSearchRegex`.
 */
const USFM_MARKER_BETWEEN = String.raw`(?:\s*(\\[\+a-zA-Z0-9\-\\]+[* ])|(\|[^\\]*?\\[\+a-zA-Z0-9\-]+?\*)){0,3}`;

/**
 * Builds a JavaScript {@link RegExp} implementing Paratext 9's find/replace search semantics.
 *
 * Mirrors `CreateSearchRegex` in Paratext 9's `FindReplaceText.cs`. The exact Unicode category
 * classes from `CharacterCategorizer` are used (see {@link BASE_CHAR_CLASS} and
 * {@link DIACRITIC_CLASS}). The following simplifications apply vs. the full P9 implementation:
 *
 * - No `WordMedialRegex` (equivalent to `emptyWordMedialRegex === true`)
 * - No surrogate-pair-specific lookbehind (the JS `u` flag handles surrogate pairs natively)
 * - `IsSingleCharacterWord` always returns `false` (word boundaries always applied)
 * - `DiacriticsFollowBaseCharacters` assumed `true` (standard Unicode encoding order)
 *
 * @param options The find options controlling search behavior
 * @returns A compiled {@link RegExp} ready for use in {@link UsjReaderWriter.search}
 */
function buildSearchRegex(options: FindOptions): RegExp {
  const {
    searchString,
    useRegex,
    caseInsensitive,
    wordRestriction,
    ignoreDiacritics,
    ignoreWhitespaceDifferences: ignoreWhitespace,
    ignoreUsfmMarkers,
    characterCategorizer,
  } = options;

  // Resolve character class strings: use project-specific values when provided, otherwise fall
  // back to the built-in Unicode property approximations.
  const baseClass = characterCategorizer?.baseCharacterClassRegex ?? BASE_CHAR_CLASS;
  const diacriticClass = characterCategorizer?.diacriticCharacterClassRegex ?? DIACRITIC_CLASS;
  const wordMedial = characterCategorizer?.wordMedialCharacterRegex ?? '';

  // Build the word-char pattern used in lookbehind/lookahead.
  // If WordMedialRegex is non-empty, add it as an alternation: (?<![base][diacritic]|wordMedial)
  // (mirrors C#'s else branch when emptyWordMedialRegex is false).
  const wordCharClass = `[${baseClass}${diacriticClass}]`;
  const wordBoundaryNegLookbehind = wordMedial
    ? `(?<!${wordCharClass}|${wordMedial})`
    : `(?<!${wordCharClass})`;
  const wordBoundaryNegLookahead = wordMedial
    ? `(?!${wordCharClass}|${wordMedial})`
    : `(?!${wordCharClass})`;

  // Build a RegExp to test individual code points for diacritics (used in ignoreDiacritics loop).
  const isDiacritic = new RegExp(`^[${diacriticClass}]$`, 'u');

  let regexStr = '';

  // MatchAtBeginningOfWord: negative lookbehind asserting we are not inside a word.
  // C# path: emptyWordMedialRegex=true → (?<![BaseCharRegex][DiacriticRegex])
  if (wordRestriction === 'wholeWord' || wordRestriction === 'startOfWord') {
    regexStr += wordBoundaryNegLookbehind;
  }

  // IgnoreUsfmMarkers preamble: prevent matching text that is part of a USFM marker name
  // (e.g. the 'v' in \v should not be a hit when searching for 'v').
  if (ignoreUsfmMarkers) {
    regexStr += String.raw`(?<!\\[a-zA-Z0-9\-\+])`;
  }

  regexStr += '(';

  if (useRegex) {
    // User-supplied regex: insert as-is (mirrors C#'s "regex:" prefix behavior).
    // ignoreDiacritics / ignoreWhitespace / per-character ignoreUsfmMarkers do not apply,
    // as the user's expression is assumed to handle those concerns itself.
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
      if (ignoreDiacritics && isDiacritic.test(char)) continue;

      // Determine whether this code point is whitespace / invisible.
      // Tilde is treated as whitespace (C#: tildeIsWhitespace defaults to true).
      const isWhiteSpace = WHITESPACE_CHAR.test(char) || char === '~';

      // Skip consecutive whitespace code points when ignoreWhitespaceDifferences is set.
      if (ignoreWhitespace && prevWasWhiteSpace && isWhiteSpace) continue;

      let charPattern: string;
      if (ignoreWhitespace && isWhiteSpace) {
        // Collapse any whitespace run to a single lazy multi-whitespace pattern (including tilde).
        charPattern = `(${WHITESPACE_CLASS}|~)+?`;
      } else {
        charPattern = escapeStringRegexp(char);
      }

      regexStr += charPattern;

      // Allow 0–3 USFM markers between this character and the next.
      // C# condition: not after a leading whitespace (!(isWhiteSpace && i == 0)),
      //               not after the last code point (i < uStr.Length - 1).
      if (!(isWhiteSpace && i === 0) && ignoreUsfmMarkers && i < chars.length - 1) {
        regexStr += USFM_MARKER_BETWEEN;
      }

      // Allow diacritics after each base character when ignoreDiacritics is set.
      // C# assumes DiacriticsFollowBaseCharacters=true (standard Unicode), so no leading [M]*
      // is emitted — only a trailing [M]* after each processed code point.
      if (ignoreDiacritics) {
        regexStr += `[${diacriticClass}]*`;
      }

      prevWasWhiteSpace = isWhiteSpace;
    }
  }

  regexStr += ')';

  // MatchAtEndOfWord: negative lookahead asserting the match does not continue into a word.
  if (wordRestriction === 'wholeWord' || wordRestriction === 'endOfWord') {
    regexStr += wordBoundaryNegLookahead;
  }

  // The `u` flag is required for \p{} Unicode property escapes used in word boundaries and
  // the diacritic class.
  const needsUnicodeFlag = !!(wordRestriction && wordRestriction !== 'none') || !!ignoreDiacritics;
  const flags = `${caseInsensitive ? 'i' : ''}g${needsUnicodeFlag ? 'u' : ''}`;

  return new RegExp(regexStr, flags);
}

/**
 * Extracts the book ID and chapter number from a scripture location without needing a reader
 * writer. Works for all location type variants (UsjChapterLocation and UsfmVerseLocation).
 *
 * @param location The location to extract book and chapter from
 * @returns The book ID and chapter number
 */
function getBookAndChapterFromLocation(location: UsjChapterLocation | UsfmVerseLocation): {
  book: string;
  chapterNum: number;
} {
  const { verseRef } = UsjReaderWriter.isUsjChapterLocation(location)
    ? UsjReaderWriter.usjChapterLocationToUsjVerseRefChapterLocation(location)
    : UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(location);
  return { book: verseRef.book, chapterNum: verseRef.chapterNum };
}

// This interface doesn't provide any normal data types that PDPs use
export const SCRIPTURE_FINDER_PROJECT_INTERFACES = [
  'platformScripture.findInScripture',
  'platformScripture.replaceWithUsfm',
] as const satisfies ['platformScripture.findInScripture', 'platformScripture.replaceWithUsfm'];

/** The project interfaces the Scripture Finder Layering PDPF requires */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES = [
  'platformScripture.USX_Book',
  'platformScripture.USX_Chapter',
  'platformScripture.USFM_Book',
  'platformScripture.USFM_Chapter',
] as const satisfies [
  'platformScripture.USX_Book',
  'platformScripture.USX_Chapter',
  'platformScripture.USFM_Book',
  'platformScripture.USFM_Chapter',
];

export type ScriptureFinderOverlayPDPs = {
  [ProjectInterface in (typeof SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES)[number]]: ProjectDataProviderInterfaces[ProjectInterface];
};

/** The maximum number of results that can be returned in a single find job */
export const SCRIPTURE_FIND_MAX_RESULTS_PER_JOB = 1000;

/**
 * Maximum number of retries when cache is invalidated during an operation. Used by both
 * {@link #getOrCreateCachedReaderWriter} and {@link replace} to handle concurrent external changes.
 */
const MAX_CACHE_INVALIDATION_RETRIES = 3;

// Internal type for tracking find jobs
type FindJob = {
  jobId: string;
  status: FindJobStatus;
  percentComplete: number;
  options: FindOptions;
  results: FindResult[];
  totalResultsCount: number;
  error?: string;
  startTime: number;
  endTime?: number;
  stopRequested: boolean;
  promise: Promise<void>;
};

/**
 * A Project Data Provider Engine that enables searching for text within Scripture content.
 *
 * The engine acts as a layering PDP that requires underlying book and chapter data providers to
 * function properly.
 */
export class ScriptureFinderProjectDataProviderEngine
  extends ProjectDataProviderEngine<typeof SCRIPTURE_FINDER_PROJECT_INTERFACES>
  implements IProjectDataProviderEngine<typeof SCRIPTURE_FINDER_PROJECT_INTERFACES>
{
  /** The ID of the project this engine serves, used to fetch project settings */
  readonly #projectId: string;

  /** The PDPs this layering PDP needs to function */
  readonly #pdps: ScriptureFinderOverlayPDPs;

  // Track all running jobs
  readonly #jobs = new Map<string, FindJob>();

  /** Cache for book-level UsjReaderWriter instances. Keys are book IDs (e.g., "GEN", "MAT"). */
  readonly #bookCache = new Map<string, UsjReaderWriter>();

  /**
   * Cache for chapter-level UsjReaderWriter instances. Keys are "{bookId}:{chapter}" (e.g.,
   * "GEN:1", "MAT:5").
   */
  readonly #chapterCache = new Map<string, UsjReaderWriter>();

  /** Mutex map to prevent concurrent fetches of the same book/chapter data */
  readonly #readerWriterMutexMap = new MutexMap();

  /** Single mutex to serialize all replace operations */
  readonly #replaceMutex = new Mutex();

  /**
   * Monotonically increasing version number incremented on every cache invalidation. Used to detect
   * when the cache was cleared during an in-flight USX fetch.
   */
  #cacheVersion = 0;

  /** Flag tracking whether this PDPE has been disposed */
  #isDisposed = false;

  /**
   * Promise that resolves to the project's character categorizer settings fetched from
   * ProjectSettingTypes via the overlay PDP. Resolves to `undefined` if the settings cannot be
   * fetched (error is logged), in which case buildSearchRegex falls back to the built-in Unicode
   * property approximations. Kicked off in the constructor so the result is typically available by
   * the time beginFindJob is first called.
   */
  #characterCategorizerPromise: Promise<FindOptions['characterCategorizer']>;

  /**
   * Promise for the book USX subscription unsubscriber. Resolves to `undefined` if the subscription
   * failed (error is logged in the constructor).
   */
  #bookUsxUnsubscriberPromise: Promise<UnsubscriberAsync | undefined>;

  /**
   * Promise for the chapter USX subscription unsubscriber. Resolves to `undefined` if the
   * subscription failed (error is logged in the constructor).
   */
  #chapterUsxUnsubscriberPromise: Promise<UnsubscriberAsync | undefined>;

  /**
   * Creates a new ScriptureFinderProjectDataProviderEngine instance.
   *
   * @param pdpsToOverlay - Underlying project data providers that provide book and chapter data.
   */
  constructor(projectId: string, pdpsToOverlay: ScriptureFinderOverlayPDPs) {
    super();
    this.#projectId = projectId;
    this.#pdps = pdpsToOverlay;

    // Begin fetching character categorizer settings immediately so they're ready (or nearly so)
    // by the time beginFindJob is first called.
    this.#characterCategorizerPromise = this.#fetchCharacterCategorizer();

    // Subscribe to book-level USX changes for cache invalidation
    this.#bookUsxUnsubscriberPromise = this.#pdps['platformScripture.USX_Book'].subscribeBookUSX(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
      () => {
        this.#invalidateCaches();
      },
      { whichUpdates: '*', retrieveDataImmediately: false },
    );

    // Synchronously set up an error logger. Store the caught promise back so the
    // stored promise never rejects unhandled — this way dispose() can safely await it
    // without throwing on the subscription-failure path.
    // eslint-disable-next-line promise/catch-or-return
    this.#bookUsxUnsubscriberPromise = this.#bookUsxUnsubscriberPromise.catch((e) => {
      logger.error(
        `Scripture Finder PDP failed to subscribe to BookUSX for cache invalidation! ${e}`,
      );
      return undefined;
    });

    // Subscribe to chapter-level USX changes for cache invalidation
    this.#chapterUsxUnsubscriberPromise = this.#pdps[
      'platformScripture.USX_Chapter'
    ].subscribeChapterUSX(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
      () => {
        this.#invalidateCaches();
      },
      { whichUpdates: '*', retrieveDataImmediately: false },
    );

    // Synchronously set up an error logger. Store the caught promise back so the
    // stored promise never rejects unhandled — this way dispose() can safely await it
    // without throwing on the subscription-failure path.
    // eslint-disable-next-line promise/catch-or-return
    this.#chapterUsxUnsubscriberPromise = this.#chapterUsxUnsubscriberPromise.catch((e) => {
      logger.error(
        `Scripture Finder PDP failed to subscribe to ChapterUSX for cache invalidation! ${e}`,
      );
      return undefined;
    });
  }

  async beginFindJob(findOptions: FindOptions): Promise<string> {
    if (!findOptions.searchString) throw new Error('Search string cannot be empty');
    if (findOptions.scope.length === 0) throw new Error('At least one scope must be provided');
    findOptions.scope.forEach((scope) => {
      if (!scope.bookId) throw new Error('Each scope must have a valid bookId');
      if (scope.chapter !== undefined && scope.chapter <= 0) throw new Error('Chapter must be > 0');
    });

    // If the caller did not supply characterCategorizer, use the project's own settings so that
    // word-boundary and diacritic handling use the project-specific character classes rather than
    // the generic Unicode property approximations.
    const resolvedOptions: FindOptions = findOptions.characterCategorizer
      ? findOptions
      : { ...findOptions, characterCategorizer: await this.#characterCategorizerPromise };

    const jobId = newGuid();
    const job: FindJob = {
      jobId,
      status: 'running',
      percentComplete: 0,
      options: { ...resolvedOptions },
      results: [],
      totalResultsCount: 0,
      startTime: performance.now(),
      stopRequested: false,
      promise: Promise.resolve(),
    };
    this.#jobs.set(jobId, job);
    job.promise = this.#processFindJob(job);
    return jobId;
  }

  async stopFindJob(jobId: string, timeoutMs: number = 1000): Promise<boolean> {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    job.stopRequested = true;
    const stopFindAsyncVariable = new AsyncVariable<void>('Stop find', timeoutMs);
    // Wait for the find job to stop in an IIFE, resolving the async variable when done
    (async () => {
      await job.promise;
      stopFindAsyncVariable.resolveToValue(undefined);
    })();

    try {
      // Wait for the find job to stop or the timeout to be hit, whichever comes first
      await stopFindAsyncVariable.promise;
      return true;
    } catch (error) {
      logger.warn(
        `Find job ${jobId} did not stop gracefully within ${timeoutMs}ms: ${getErrorMessage(error)}`,
      );
      return false;
    }
  }

  async abandonFindJob(jobId: string): Promise<void> {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    job.stopRequested = true;
    this.#jobs.delete(jobId);
  }

  async retrieveFindJobUpdate(
    jobId: string,
    maxResultsToInclude: number,
  ): Promise<FindJobStatusReport> {
    const job = this.#jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    return {
      jobId: job.jobId,
      status: job.status,
      percentComplete: job.percentComplete,
      totalResultsCount: job.totalResultsCount,
      nextResults: job.results.splice(0, maxResultsToInclude),
      error: job.error,
      totalExecutionTimeMs: (job.endTime ?? performance.now()) - job.startTime,
    };
  }

  /**
   * Replaces text at specified Scripture ranges with new USFM content.
   *
   * Only one replace operation can execute at a time (serialized by a mutex). The operation
   * computes all replacements, writes all USFM at once, and then invalidates the cache for modified
   * books/chapters so subsequent operations get fresh data.
   *
   * @param rangesToReplace - Array of non-overlapping scripture ranges to replace. Overlapping
   *   ranges will cause an error.
   * @param usfmToInsert - The USFM content to insert at each range (string or array of strings)
   * @throws Error if usfmToInsert array length doesn't match rangesToReplace length
   * @throws Error if any range spans multiple books
   * @throws Error if any ranges overlap within the same book
   */
  async replace(
    rangesToReplace: ScriptureRangeUsjChapterOrUsfmVerseLocation[],
    usfmToInsert: string | string[],
  ): Promise<void> {
    if (rangesToReplace.length === 0) return;

    // Serialize all replace operations with a single mutex
    return this.#replaceMutex.runExclusive(async () => {
      // Validate and normalize replacement strings to an array
      if (Array.isArray(usfmToInsert) && usfmToInsert.length !== rangesToReplace.length) {
        throw new Error(
          `usfmToInsert array length (${usfmToInsert.length}) must match rangesToReplace length (${rangesToReplace.length})`,
        );
      }
      const replacements: string[] = Array.isArray(usfmToInsert)
        ? usfmToInsert
        : rangesToReplace.map(() => usfmToInsert);

      // Group ranges by book and collect chapter info. Book and chapter are extractable from the raw
      // location types without needing a reader writer.
      const rangesByBook = new Map<
        string,
        {
          rangeInfos: Array<{
            originalIndex: number;
            range: ScriptureRangeUsjChapterOrUsfmVerseLocation;
          }>;
          chapters: Set<number>;
        }
      >();

      rangesToReplace.forEach((range, i) => {
        const startInfo = getBookAndChapterFromLocation(range.start);
        const endInfo = getBookAndChapterFromLocation(range.end);

        // Validate both endpoints are in the same book
        if (startInfo.book !== endInfo.book) {
          throw new Error(
            `Range at index ${i} spans multiple books (${startInfo.book} to ${endInfo.book}). Cross-book replacements are not supported.`,
          );
        }

        const { book: bookId } = startInfo;
        if (!rangesByBook.has(bookId)) {
          rangesByBook.set(bookId, { rangeInfos: [], chapters: new Set() });
        }
        // We just set the entry above if it didn't exist
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const entry = rangesByBook.get(bookId)!;
        entry.rangeInfos.push({ originalIndex: i, range });
        entry.chapters.add(startInfo.chapterNum);
        entry.chapters.add(endInfo.chapterNum);
      });

      // Retry Phase 1 if the cache is invalidated during computation. Similar to the retry logic
      // in #getOrCreateCachedReaderWriter, this handles race conditions where external changes
      // occur while we're computing replacements.
      // We intentionally await inside this loop to retry Phase 1 when needed. The loop is sequential
      // by design.
      /* eslint-disable no-await-in-loop */
      for (let attempt = 0; attempt <= MAX_CACHE_INVALIDATION_RETRIES; attempt++) {
        const versionBeforePhase1 = this.#cacheVersion;

        // Track pending writes so we can execute all USFM writes together at the end
        const pendingWrites: Array<{
          bookId: string;
          singleChapter: number | undefined;
          modifiedUsfm: string;
        }> = [];

        // Shared early-exit signal: when one parallel book task errors, other tasks can
        // check this and bail out early instead of proceeding with expensive work.
        let firstError: unknown;

        // Phase 1: Compute USFM modifications for each book in parallel.
        // Use Promise.allSettled (not Promise.all) so that all tasks settle before we
        // proceed, ensuring we can properly track and re-throw errors.
        await Promise.allSettled(
          [...rangesByBook.entries()].map(async ([bookId, { rangeInfos, chapters }]) => {
            // Bail out early if another task already errored
            if (firstError) return;

            const singleChapter = chapters.size === 1 ? [...chapters][0] : undefined;

            try {
              const usjReaderWriter = await this.#getOrCreateCachedReaderWriter(
                bookId,
                singleChapter,
              );

              // Check again after the async fetch - another task may have errored while we were waiting
              if (firstError) return;

              // Convert all locations to UsfmVerseRefVerseLocations
              const convertedRanges = await Promise.all(
                rangeInfos.map(async ({ originalIndex, range }) => {
                  const [startLocation, endLocation] = await Promise.all([
                    this.#convertToUsfmVerseRefVerseLocation(range.start),
                    this.#convertToUsfmVerseRefVerseLocation(range.end),
                  ]);
                  return { originalIndex, startLocation, endLocation };
                }),
              );

              // Check again after the async range conversion - another task may have errored
              if (firstError) return;

              // Filter no-op ranges: same start/end position with a falsy replacement string
              const activeRanges = convertedRanges.filter(
                ({ originalIndex, startLocation, endLocation }) =>
                  replacements[originalIndex] ||
                  startLocation.verseRef.book !== endLocation.verseRef.book ||
                  startLocation.verseRef.chapterNum !== endLocation.verseRef.chapterNum ||
                  startLocation.verseRef.verseNum !== endLocation.verseRef.verseNum ||
                  (startLocation.offset ?? 0) !== (endLocation.offset ?? 0),
              );

              if (activeRanges.length === 0) return;

              // Convert all ranges to USFM indices and sort in descending order
              const rangesWithIndices = activeRanges
                .map((rangeInfo) => ({
                  ...rangeInfo,
                  startIndex: usjReaderWriter.usfmVerseLocationToIndexInUsfm(
                    rangeInfo.startLocation,
                  ),
                  endIndex: usjReaderWriter.usfmVerseLocationToIndexInUsfm(rangeInfo.endLocation),
                }))
                .sort((a, b) => b.startIndex - a.startIndex);

              // Validate that no ranges overlap. Since ranges are sorted descending by startIndex,
              // an overlap exists when a range's startIndex is less than the next range's endIndex.
              for (let i = 0; i < rangesWithIndices.length - 1; i++) {
                const current = rangesWithIndices[i];
                const next = rangesWithIndices[i + 1];
                if (next.endIndex > current.startIndex) {
                  throw new Error(
                    `Overlapping ranges detected in book ${bookId}: range at original index ` +
                      `${next.originalIndex} (offsets ${next.startIndex}-${next.endIndex}) overlaps ` +
                      `with range at original index ${current.originalIndex} (offsets ` +
                      `${current.startIndex}-${current.endIndex}). All ranges must be non-overlapping.`,
                  );
                }
              }

              // Perform string replacements in reverse index order
              let modifiedUsfm = usjReaderWriter.toUsfm();
              const originalUsfm = modifiedUsfm;
              rangesWithIndices.forEach((rangeWithIndex) => {
                const replacement = replacements[rangeWithIndex.originalIndex];
                modifiedUsfm =
                  modifiedUsfm.substring(0, rangeWithIndex.startIndex) +
                  replacement +
                  modifiedUsfm.substring(rangeWithIndex.endIndex);
              });

              // Collect the pending write if USFM was actually changed
              if (modifiedUsfm !== originalUsfm) {
                pendingWrites.push({ bookId, singleChapter, modifiedUsfm });
              }
            } catch (e) {
              // Signal other tasks to bail out early
              firstError ??= e;
              throw e;
            }
          }),
        );

        // Re-throw the first error from Phase 1 (if any) now that all tasks have settled
        if (firstError) throw firstError;

        // Check if the cache was invalidated during Phase 1 (after computing replacements but
        // before writing). If so, the computed modifications are based on stale data and would
        // overwrite any external changes that occurred during Phase 1. Retry Phase 1 to get
        // fresh data and re-compute the modifications.
        if (this.#cacheVersion !== versionBeforePhase1) {
          if (attempt === MAX_CACHE_INVALIDATION_RETRIES) {
            throw new Error(
              `Cache was invalidated ${MAX_CACHE_INVALIDATION_RETRIES + 1} times during replace operation. ` +
                `The computed modifications are known to be out-of-date, but retrying ` +
                'indefinitely could cause an infinite loop. Consider improving the retry strategy.',
            );
          }
          // Retry Phase 1 with fresh data
          // eslint-disable-next-line no-continue
          continue;
        }

        // Cache version is stable, proceed to Phase 2 and Phase 3

        // Check if the PDPE was disposed before writing
        if (this.#isDisposed) {
          throw new Error(
            'Cannot complete replace operation: Scripture Finder PDPE has been disposed',
          );
        }

        // Phase 2: Execute all USFM writes together
        await Promise.all(
          pendingWrites.map(async ({ bookId, singleChapter, modifiedUsfm }) => {
            if (singleChapter !== undefined) {
              await this.#pdps['platformScripture.USFM_Chapter'].setChapterUSFM(
                { book: bookId, chapterNum: singleChapter, verseNum: 0 },
                modifiedUsfm,
              );
            } else {
              await this.#pdps['platformScripture.USFM_Book'].setBookUSFM(
                { book: bookId, chapterNum: 1, verseNum: 0 },
                modifiedUsfm,
              );
            }
          }),
        );

        // Phase 3: Invalidate caches for all modified books/chapters so subsequent
        // replace operations get fresh USX data
        pendingWrites.forEach(({ bookId, singleChapter }) => {
          if (singleChapter !== undefined) {
            this.#invalidateCachesForChapter(bookId, singleChapter);
          } else {
            this.#invalidateCachesForBook(bookId);
          }
        });

        // Success - exit the retry loop
        return;
        /* eslint-enable no-await-in-loop */
      }

      // Unreachable: the loop always returns or throws, but TypeScript needs a return
      throw new Error('Unexpected: retry loop exited without returning or throwing');
    });
  }

  /**
   * Disposes of this Project Data Provider Engine. Unsubscribes from listening to overlaid PDPs
   *
   * @returns `true` if successfully unsubscribed
   */
  async dispose(): Promise<boolean> {
    // Mark as disposed to prevent new operations
    this.#isDisposed = true;

    const unsubscriberList = new UnsubscriberAsyncList(
      'Scripture Finder PDP Engine Overlaid PDP Unsubscribers',
    );

    // Await each subscription promise individually. They resolve to undefined when
    // the subscription failed (error was already logged in the constructor), so we
    // only add the unsubscriber if it exists.
    const bookUnsub = await this.#bookUsxUnsubscriberPromise;
    const chapterUnsub = await this.#chapterUsxUnsubscriberPromise;
    if (bookUnsub) unsubscriberList.add(bookUnsub);
    if (chapterUnsub) unsubscriberList.add(chapterUnsub);

    // Clear caches
    this.#bookCache.clear();
    this.#chapterCache.clear();

    // Dispose of the mutex map to cancel any pending operations
    this.#readerWriterMutexMap.dispose();

    // Cancel the replace mutex to cancel any pending replace operations
    this.#replaceMutex.cancel();

    return unsubscriberList.runAllUnsubscribers();
  }

  /**
   * Fetches the project's character categorizer settings from the overlay PDP. Called once in the
   * constructor; the result is cached in characterCategorizerPromise.
   *
   * Returns `undefined` (and logs a warning) if any setting is missing or the fetch fails, so
   * buildSearchRegex falls back to the built-in Unicode property approximations.
   *
   * @returns The project's character categorizer settings, or `undefined` on failure
   */
  async #fetchCharacterCategorizer(): Promise<FindOptions['characterCategorizer']> {
    try {
      // Use the platform.base PDP so getSetting is available with proper TypeScript typing.
      const pdp = await papi.projectDataProviders.get('platform.base', this.#projectId);
      const [baseCharacterClassRegex, diacriticCharacterClassRegex, wordMedialCharacterRegex] =
        await Promise.all([
          pdp.getSetting('platformScripture.baseCharacterClassRegex'),
          pdp.getSetting('platformScripture.diacriticCharacterClassRegex'),
          pdp.getSetting('platformScripture.wordMedialCharacterRegex'),
        ]);

      if (
        baseCharacterClassRegex === undefined ||
        diacriticCharacterClassRegex === undefined ||
        wordMedialCharacterRegex === undefined
      ) {
        logger.warn(
          'Scripture Finder PDPE: one or more character categorizer settings were undefined; ' +
            'word-boundary and diacritic handling will use Unicode property approximations.',
        );
        return undefined;
      }

      return { baseCharacterClassRegex, diacriticCharacterClassRegex, wordMedialCharacterRegex };
    } catch (e) {
      logger.warn(
        `Scripture Finder PDPE failed to fetch character categorizer settings; word-boundary and ` +
          `diacritic handling will use Unicode property approximations: ${getErrorMessage(e)}`,
      );
      return undefined;
    }
  }

  /**
   * Converts a UsjChapterLocation or UsfmVerseLocation to a standardized UsfmVerseRefVerseLocation.
   *
   * For UsjChapterLocation, uses a chapter-level UsjReaderWriter to convert the document location
   * to a UsfmVerseRefVerseLocation.
   *
   * @param location The location to convert
   * @returns The standardized UsfmVerseRefVerseLocation (contains verseRef with book, chapter,
   *   verse and an offset)
   */
  async #convertToUsfmVerseRefVerseLocation(
    location: UsjChapterLocation | UsfmVerseLocation,
  ): Promise<UsfmVerseRefVerseLocation> {
    // If this is a UsjChapterLocation, convert to USFM verse location
    if (UsjReaderWriter.isUsjChapterLocation(location)) {
      // Get the standardized chapter location
      const chapterLocation =
        UsjReaderWriter.usjChapterLocationToUsjVerseRefChapterLocation(location);
      const { book: bookId, chapterNum } = chapterLocation.verseRef;

      // Get the chapter-level reader writer to convert the document location
      const usjReaderWriter = await this.#getOrCreateCachedReaderWriter(bookId, chapterNum);

      return usjReaderWriter.usjDocumentLocationToUsfmVerseRefVerseLocation(
        chapterLocation.documentLocation,
        bookId,
      );
    }

    // It's already a UsfmVerseLocation, so normalize to UsfmVerseRefVerseLocation
    return UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(location);
  }

  /** Process a find job, one scope at a time, respecting stop requests. */
  async #processFindJob(job: FindJob): Promise<void> {
    try {
      for (let i = 0; i < job.options.scope.length; i++) {
        const scope = job.options.scope[i];
        if (job.stopRequested) {
          job.status = 'stopped';
          break;
        }
        // We are intentionally going through scopes one at a time to enable graceful stopping
        // eslint-disable-next-line no-await-in-loop
        const results = await this.#findInScope(scope, job);
        job.percentComplete = Math.round(((i + 1) / job.options.scope.length) * 100);
        job.results.push(...results);
        job.totalResultsCount += results.length;
        if (job.totalResultsCount >= SCRIPTURE_FIND_MAX_RESULTS_PER_JOB) {
          job.status = 'exceeded';
          break;
        }
      }
      if (job.status === 'running') job.status = 'completed';
    } catch (err) {
      job.status = 'errored';
      job.error = getErrorMessage(err);
    } finally {
      job.endTime = performance.now();
    }
  }

  /** Find results within a single scope. Stop requests will not stop a scope in progress. */
  async #findInScope(scope: FindScope, job: FindJob): Promise<FindResult[]> {
    // Get the cached reader writer for this scope
    const usj = await this.#getOrCreateCachedReaderWriter(scope.bookId, scope.chapter);

    const markerStylesToInclude = job.options.verseTextOnly
      ? USFM_VERSE_TEXT_MARKERS_SET
      : undefined;

    const matches = usj.search(buildSearchRegex(job.options), markerStylesToInclude);

    return matches.map((match) => {
      return {
        ...match,
        start: usj.usjDocumentLocationToUsfmVerseRefVerseLocation(
          match.start.documentLocation,
          scope.bookId,
        ),
        end: usj.usjDocumentLocationToUsfmVerseRefVerseLocation(
          match.end.documentLocation,
          scope.bookId,
        ),
      };
    });
  }

  /**
   * Invalidates all cached reader writers. Clears both caches and increments the version counter so
   * any in-flight USX fetch in {@link #getOrCreateCachedReaderWriter} can detect the invalidation
   * and retry. Called by subscribe callbacks when external changes occur.
   */
  #invalidateCaches(): void {
    this.#cacheVersion += 1;
    this.#bookCache.clear();
    this.#chapterCache.clear();
  }

  /**
   * Invalidates cached reader writers for a specific book. Removes the book cache entry and all
   * chapter cache entries for that book. Increments the version counter so any in-flight USX fetch
   * can detect the invalidation and retry.
   *
   * @param bookId The book ID whose cache entries should be removed
   */
  #invalidateCachesForBook(bookId: string): void {
    this.#cacheVersion += 1;
    this.#bookCache.delete(bookId);
    // Remove all chapter entries for this book (keys are "bookId:chapter")
    const prefix = `${bookId}:`;
    this.#chapterCache.forEach((_value, key) => {
      if (key.startsWith(prefix)) this.#chapterCache.delete(key);
    });
  }

  /**
   * Invalidates the cache for a specific chapter within a book. Removes the chapter cache entry and
   * the book-level cache entry (since the book includes all chapters and is now stale). Other
   * chapters' caches are unaffected.
   *
   * @param bookId The book ID whose chapter was modified
   * @param chapter The chapter number whose cache entry should be removed
   */
  #invalidateCachesForChapter(bookId: string, chapter: number): void {
    this.#cacheVersion += 1;
    this.#bookCache.delete(bookId);
    this.#chapterCache.delete(`${bookId}:${chapter}`);
  }

  /**
   * Gets or creates a cached UsjReaderWriter for the specified book/chapter.
   *
   * If no chapter is specified, returns the book-level reader writer. If a chapter is specified,
   * returns the chapter-level reader writer.
   *
   * @param bookId The book ID (e.g., "GEN", "MAT")
   * @param chapter Optional chapter number. If not provided, returns book-level data.
   * @returns The cached UsjReaderWriter for the specified scope
   */
  async #getOrCreateCachedReaderWriter(bookId: string, chapter?: number): Promise<UsjReaderWriter> {
    // Determine cache key and use mutex to prevent concurrent fetches for the same scope
    const isChapterLevel = chapter !== undefined;
    const cacheKey = isChapterLevel ? `${bookId}:${chapter}` : bookId;

    return this.#readerWriterMutexMap.get(cacheKey).runExclusive(async () => {
      const cache = isChapterLevel ? this.#chapterCache : this.#bookCache;

      // Check if we already have this cached
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      // Need to fetch and cache the data
      const verseRef: SerializedVerseRef = {
        book: bookId,
        chapterNum: chapter ?? 1,
        verseNum: 0,
      };

      // We intentionally await inside this loop to retry fetching USX when the cache is
      // invalidated during a fetch. The loop is sequential by design.
      /* eslint-disable no-await-in-loop */
      for (let attempt = 0; attempt <= MAX_CACHE_INVALIDATION_RETRIES; attempt++) {
        const versionBeforeFetch = this.#cacheVersion;

        // Must ask USX PDPs for the data for now then transform to USJ ourselves instead of
        // asking USJ PDPs for the data because of the following layering PDP wait bug. Turtles
        // all the way down. https://paratextstudio.atlassian.net/browse/PT-3233
        const usx = isChapterLevel
          ? await this.#pdps['platformScripture.USX_Chapter'].getChapterUSX(verseRef)
          : await this.#pdps['platformScripture.USX_Book'].getBookUSX(verseRef);
        if (!usx)
          throw new Error(
            `No scripture found for: ${JSON.stringify({ bookId, chapter: chapter ?? 'entire book' })}`,
          );

        // If the cache was invalidated during the fetch, the data we just got may be stale.
        // The retried USX is known to be out-of-date when this happens on the final retry, but
        // retrying indefinitely could cause an infinite loop. We can improve later.
        if (this.#cacheVersion !== versionBeforeFetch) {
          if (attempt === MAX_CACHE_INVALIDATION_RETRIES)
            throw new Error(
              `Cache was invalidated ${MAX_CACHE_INVALIDATION_RETRIES + 1} times while fetching USX for ` +
                `${cacheKey}. The fetched data is known to be out-of-date, but retrying ` +
                'indefinitely could cause an infinite loop. Consider improving the retry strategy.',
            );
          // eslint-disable-next-line no-continue
          continue;
        }
        /* eslint-enable no-await-in-loop */

        const scripture: Usj | undefined = correctUsjVersion(usxStringToUsj(usx));
        const usjReaderWriter = new UsjReaderWriter(scripture, {
          markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
        });

        cache.set(cacheKey, usjReaderWriter);
        return usjReaderWriter;
      }

      // Unreachable: the loop always returns or throws, but TypeScript needs a return
      throw new Error(
        `Unexpected: retry loop exited without returning or throwing for ${cacheKey}`,
      );
    });
  }
}
