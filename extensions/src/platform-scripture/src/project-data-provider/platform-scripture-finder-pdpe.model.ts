import { Usj, usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { logger, ProjectDataProviderEngine } from '@papi/backend';
import { IProjectDataProviderEngine } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import {
  AsyncVariable,
  escapeStringRegexp,
  getErrorMessage,
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
import { ReadWriteLockMap } from './read-write-lock-map';

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
  // UsjVerseRefChapterLocation, UsfmVerseRefVerseLocation
  if ('verseRef' in location)
    return { book: location.verseRef.book, chapterNum: location.verseRef.chapterNum };
  // UsfmScrRefVerseLocation (deprecated)
  if ('scrRef' in location)
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return {
      book: (location.scrRef as SerializedVerseRef).book,
      chapterNum: (location.scrRef as SerializedVerseRef).chapterNum,
    };
  // UsjFlatChapterLocation, UsjFlatTextChapterLocation, SerializedVerseRef
  if ('book' in location && 'chapterNum' in location)
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return {
      book: (location as SerializedVerseRef).book,
      chapterNum: (location as SerializedVerseRef).chapterNum,
    };
  throw new Error(`Cannot determine book and chapter from location: ${JSON.stringify(location)}`);
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

  /**
   * Per-book read-write lock for replace operations.
   *
   * - Chapter-level replaces acquire a **read** (shared) lock on the book + an exclusive per-chapter
   *   mutex. This allows chapter-level replaces on _different_ chapters to run concurrently while
   *   preventing two replaces from operating on the _same_ chapter simultaneously.
   * - Book-level replaces acquire a **write** (exclusive) lock on the book. This blocks all
   *   chapter-level and book-level replaces for the same book.
   */
  readonly #bookRWLockMap = new ReadWriteLockMap();

  /** Per-chapter mutex for serializing chapter-level replace operations on the same chapter */
  readonly #chapterMutexMap = new MutexMap();

  /**
   * Monotonically increasing version number incremented on every cache invalidation. Used to detect
   * when the cache was cleared during an in-flight USX fetch.
   */
  #cacheVersion = 0;

  /** Promise for the book USX subscription unsubscriber */
  #bookUSXUnsubscriberPromise: Promise<UnsubscriberAsync>;

  /** Promise for the chapter USX subscription unsubscriber */
  #chapterUSXUnsubscriberPromise: Promise<UnsubscriberAsync>;

  /**
   * Creates a new ScriptureFinderProjectDataProviderEngine instance.
   *
   * @param pdpsToOverlay - Underlying project data providers that provide book and chapter data.
   */
  constructor(pdpsToOverlay: ScriptureFinderOverlayPDPs) {
    super();
    this.#pdps = pdpsToOverlay;

    // Subscribe to book-level USX changes for cache invalidation
    this.#bookUSXUnsubscriberPromise = this.#pdps['platformScripture.USX_Book'].subscribeBookUSX(
      // Just picked a key for no reason in particular because we don't need anything in particular
      // here because we're listening for all updates
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
      () => {
        this.#invalidateCaches();
      },
      { whichUpdates: '*', retrieveDataImmediately: false },
    );

    // Synchronously set up an error logger because an IIFE says this.#bookUSXUnsubscriberPromise
    // is being used before it is defined (most likely because it's a separate function running
    // inside the constructor)
    // eslint-disable-next-line promise/catch-or-return
    this.#bookUSXUnsubscriberPromise.catch((e) => {
      logger.error(
        `Scripture Finder PDP failed to subscribe to BookUSX for cache invalidation! ${e}`,
      );
    });

    // Subscribe to chapter-level USX changes for cache invalidation
    this.#chapterUSXUnsubscriberPromise = this.#pdps[
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

    // Synchronously set up an error logger
    // eslint-disable-next-line promise/catch-or-return
    this.#chapterUSXUnsubscriberPromise.catch((e) => {
      logger.error(
        `Scripture Finder PDP failed to subscribe to ChapterUSX for cache invalidation! ${e}`,
      );
    });
  }

  async beginFindJob(findOptions: FindOptions): Promise<string> {
    if (!findOptions.searchString) throw new Error('Search string cannot be empty');
    if (findOptions.scope.length === 0) throw new Error('At least one scope must be provided');
    findOptions.scope.forEach((scope) => {
      if (!scope.bookId) throw new Error('Each scope must have a valid bookId');
      if (scope.chapter !== undefined && scope.chapter <= 0) throw new Error('Chapter must be > 0');
    });
    const jobId = newGuid();
    const job: FindJob = {
      jobId,
      status: 'running',
      percentComplete: 0,
      options: { ...findOptions },
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
   * Each book involved in the replacement is processed under its own book-level mutex to ensure
   * mutual exclusion with other concurrent replaces for the same book. The USFM write and cache
   * invalidation happen atomically within the mutex.
   *
   * @param rangesToReplace - Array of scripture ranges to replace
   * @param usfmToInsert - The USFM content to insert at each range (string or array of strings)
   * @throws Error if usfmToInsert array length doesn't match rangesToReplace length
   * @throws Error if any range spans multiple books
   */
  async replace(
    rangesToReplace: ScriptureRangeUsjChapterOrUsfmVerseLocation[],
    usfmToInsert: string | string[],
  ): Promise<void> {
    if (rangesToReplace.length === 0) return;

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

    // Process each book under its book-level mutex. Different books can be processed in parallel
    // since they use different mutexes.
    await Promise.all(
      [...rangesByBook.entries()].map(async ([bookId, { rangeInfos, chapters }]) => {
        const singleChapter = chapters.size === 1 ? [...chapters][0] : undefined;

        await this.#withCachedReaderWriter(
          bookId,
          singleChapter,
          async (usjReaderWriter, getChapterReaderWriter) => {
            // Convert all locations to UsfmVerseRefVerseLocations within the mutex
            const convertedRanges = await Promise.all(
              rangeInfos.map(async ({ originalIndex, range }) => {
                const [startLocation, endLocation] = await Promise.all([
                  this.#convertToUsfmVerseRefVerseLocation(range.start, (_bookId, chapterNum) =>
                    getChapterReaderWriter(chapterNum),
                  ),
                  this.#convertToUsfmVerseRefVerseLocation(range.end, (_bookId, chapterNum) =>
                    getChapterReaderWriter(chapterNum),
                  ),
                ]);
                return { originalIndex, startLocation, endLocation };
              }),
            );

            // Filter no-op ranges: same start/end position with a falsy replacement string
            const activeRanges = convertedRanges.filter(
              ({ originalIndex, startLocation, endLocation }) =>
                replacements[originalIndex] ||
                startLocation.verseRef.book !== endLocation.verseRef.book ||
                startLocation.verseRef.chapterNum !== endLocation.verseRef.chapterNum ||
                startLocation.verseRef.verseNum !== endLocation.verseRef.verseNum ||
                (startLocation.offset ?? 0) !== (endLocation.offset ?? 0),
            );

            if (activeRanges.length === 0) return false;

            // Convert all ranges to USFM indices and sort in descending order
            const rangesWithIndices = activeRanges
              .map((rangeInfo) => ({
                ...rangeInfo,
                startIndex: usjReaderWriter.usfmVerseLocationToIndexInUsfm(rangeInfo.startLocation),
                endIndex: usjReaderWriter.usfmVerseLocationToIndexInUsfm(rangeInfo.endLocation),
              }))
              .sort((a, b) => b.startIndex - a.startIndex);

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

            // Only write and invalidate if the USFM was actually changed
            if (modifiedUsfm === originalUsfm) return false;

            // Write the modified USFM within the mutex to ensure atomicity with cache
            // invalidation
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

            // Signal that caches for this book should be invalidated
            return true;
          },
        );
      }),
    );
  }

  /**
   * Disposes of this Project Data Provider Engine. Unsubscribes from listening to overlaid PDPs
   *
   * @returns `true` if successfully unsubscribed
   */
  async dispose(): Promise<boolean> {
    const unsubscriberList = new UnsubscriberAsyncList(
      'Scripture Finder PDP Engine Overlaid PDP Unsubscribers',
    );

    unsubscriberList.add(
      await this.#bookUSXUnsubscriberPromise,
      await this.#chapterUSXUnsubscriberPromise,
    );

    // Clear caches
    this.#bookCache.clear();
    this.#chapterCache.clear();

    // Dispose read-write locks to reject any pending waiters
    this.#bookRWLockMap.dispose();

    return unsubscriberList.runAllUnsubscribers();
  }

  /**
   * Converts a UsjChapterLocation or UsfmVerseLocation to a standardized UsfmVerseRefVerseLocation.
   *
   * For UsjChapterLocation, uses a chapter-level UsjReaderWriter (obtained via the provided getter)
   * to convert the document location to a UsfmVerseRefVerseLocation.
   *
   * @param location The location to convert
   * @param getReaderWriter Function to obtain a cached reader writer for a given book and chapter.
   *   This allows the caller to control how the reader writer is provided (e.g., from within a
   *   mutex-protected callback).
   * @returns The standardized UsfmVerseRefVerseLocation (contains verseRef with book, chapter,
   *   verse and an offset)
   */
  async #convertToUsfmVerseRefVerseLocation(
    location: UsjChapterLocation | UsfmVerseLocation,
    getReaderWriter: (bookId: string, chapterNum: number) => Promise<UsjReaderWriter>,
  ): Promise<UsfmVerseRefVerseLocation> {
    // If this is a UsjChapterLocation, convert to USFM verse location
    if (UsjReaderWriter.isUsjChapterLocation(location)) {
      // Get the standardized chapter location
      const chapterLocation =
        UsjReaderWriter.usjChapterLocationToUsjVerseRefChapterLocation(location);
      const { book: bookId, chapterNum } = chapterLocation.verseRef;

      // Get the chapter-level reader writer to convert the document location
      const usjReaderWriter = await getReaderWriter(bookId, chapterNum);

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

    const regexString = job.options.useRegex
      ? job.options.searchString
      : escapeStringRegexp(job.options.searchString);

    const markerStylesToInclude = job.options.verseTextOnly
      ? USFM_VERSE_TEXT_MARKERS_SET
      : undefined;

    const matches = usj.search(
      new RegExp(regexString, job.options.caseInsensitive ? 'ig' : 'g'),
      markerStylesToInclude,
    );

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
    for (const key of [...this.#chapterCache.keys()]) {
      if (key.startsWith(`${bookId}:`)) {
        this.#chapterCache.delete(key);
      }
    }
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
   * Acquires the appropriate lock(s) for the given scope, gets or creates a cached UsjReaderWriter,
   * runs the callback, and if it returns `true`, invalidates the relevant cache entries.
   *
   * Locking strategy:
   *
   * - **Chapter-level** (`chapter` is defined): acquires a shared (read) lock on the book-level
   *   read-write lock + an exclusive per-chapter mutex. This allows different chapters to be
   *   replaced concurrently while serializing same-chapter and book-level operations.
   * - **Book-level** (`chapter` is undefined): acquires an exclusive (write) lock on the book-level
   *   read-write lock. This blocks all concurrent operations for the same book.
   *
   * @param bookId The book ID (e.g., "GEN", "MAT")
   * @param chapter If provided, gets a chapter-level reader writer; otherwise a book-level one
   * @param callback Receives the UsjReaderWriter for the specified scope and a helper to get
   *   chapter-level reader writers for the same book (useful for converting UsjChapterLocations).
   *   Should return `true` if the underlying data was modified and the relevant cache entries
   *   should be removed.
   */
  async #withCachedReaderWriter(
    bookId: string,
    chapter: number | undefined,
    callback: (
      usjReaderWriter: UsjReaderWriter,
      getChapterReaderWriter: (chapterNum: number) => Promise<UsjReaderWriter>,
    ) => Promise<boolean>,
  ): Promise<void> {
    if (chapter !== undefined) {
      // Chapter-level: shared read lock on book + exclusive lock on the specific chapter
      const releaseBookRead = await this.#bookRWLockMap.get(bookId).acquireRead();
      try {
        await this.#chapterMutexMap.get(`${bookId}:${chapter}`).runExclusive(async () => {
          const usjReaderWriter = await this.#getOrCreateCachedReaderWriter(bookId, chapter);
          const modified = await callback(usjReaderWriter, (chapterNum: number) =>
            this.#getOrCreateCachedReaderWriter(bookId, chapterNum),
          );
          if (modified) {
            this.#invalidateCachesForChapter(bookId, chapter);
          }
        });
      } finally {
        releaseBookRead();
      }
    } else {
      // Book-level: exclusive write lock on the book (blocks all chapter and book operations)
      const releaseBookWrite = await this.#bookRWLockMap.get(bookId).acquireWrite();
      try {
        const usjReaderWriter = await this.#getOrCreateCachedReaderWriter(bookId);
        const modified = await callback(usjReaderWriter, (chapterNum: number) =>
          this.#getOrCreateCachedReaderWriter(bookId, chapterNum),
        );
        if (modified) {
          this.#invalidateCachesForBook(bookId);
        }
      } finally {
        releaseBookWrite();
      }
    }
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

    // If the cache is invalidated while we're fetching USX, retry up to this many times.
    // The retried USX is known to be out-of-date when the cache is cleared during the final
    // retry, but retrying indefinitely could cause an infinite loop. We can improve later.
    const MAX_RETRIES = 3;

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
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
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
          if (attempt === MAX_RETRIES)
            throw new Error(
              `Cache was invalidated ${MAX_RETRIES + 1} times while fetching USX for ` +
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
