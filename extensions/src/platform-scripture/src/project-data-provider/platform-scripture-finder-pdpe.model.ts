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
  constructor(pdpsToOverlay: ScriptureFinderOverlayPDPs) {
    super();
    this.#pdps = pdpsToOverlay;

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

    // Track acquired locks and pending writes so we can execute all USFM writes together at
    // the end while holding all locks. Locks are kept held until after the writes complete to
    // ensure atomicity with cache invalidation.
    const heldLocks: Array<{
      bookId: string;
      singleChapter: number | undefined;
      releaseBookLock: () => void;
      releaseChapterMutex?: () => void;
    }> = [];
    const pendingWrites: Array<{
      bookId: string;
      singleChapter: number | undefined;
      modifiedUsfm: string;
    }> = [];

    // Shared early-exit signal: when one parallel book task errors, other tasks that
    // are still awaiting lock acquisition will release their locks immediately and bail
    // out instead of proceeding with expensive work (USX fetches, USFM computation).
    let firstError: unknown;

    try {
      // Phase 1: Acquire locks and compute USFM modifications for each book in parallel.
      // Different books can be processed in parallel since they use different locks.
      // Use Promise.allSettled (not Promise.all) so that all tasks settle before we
      // proceed. This guarantees every acquired lock is accounted for — either pushed
      // into heldLocks or released immediately by an early-exit check — preventing lock
      // leaks when one task errors while another is still awaiting lock acquisition.
      await Promise.allSettled(
        [...rangesByBook.entries()].map(async ([bookId, { rangeInfos, chapters }]) => {
          // Bail out before acquiring any locks if another task already errored
          if (firstError) return;

          const singleChapter = chapters.size === 1 ? [...chapters][0] : undefined;

          // Acquire locks manually so we can hold them across all books until after the
          // writes complete. After each lock acquisition await, check whether another
          // task errored while we were waiting — if so, release immediately and bail out.
          // Track locally-acquired locks so they can be released if something throws
          // before they are pushed to heldLocks.
          let releaseBookLock: (() => void) | undefined;
          let releaseChapterMutex: (() => void) | undefined;

          try {
            if (singleChapter !== undefined) {
              // Chapter-level: shared read lock on book + exclusive lock on the specific chapter
              releaseBookLock = await this.#bookRWLockMap.get(bookId).acquireRead();
              if (firstError) {
                releaseBookLock();
                return;
              }
              releaseChapterMutex = await this.#chapterMutexMap
                .get(`${bookId}:${singleChapter}`)
                .acquire();
              if (firstError) {
                releaseChapterMutex();
                releaseBookLock();
                return;
              }
            } else {
              // Book-level: exclusive write lock on the book (blocks all chapter and book
              // operations)
              releaseBookLock = await this.#bookRWLockMap.get(bookId).acquireWrite();
              if (firstError) {
                releaseBookLock();
                return;
              }
            }

            heldLocks.push({ bookId, singleChapter, releaseBookLock, releaseChapterMutex });

            // Clear local references now that heldLocks owns these locks. The finally
            // block on the outer try will release everything in heldLocks.
            releaseBookLock = undefined;
            releaseChapterMutex = undefined;

            const usjReaderWriter = await this.#getOrCreateCachedReaderWriter(
              bookId,
              singleChapter,
            );

            // Convert all locations to UsfmVerseRefVerseLocations within the lock
            const convertedRanges = await Promise.all(
              rangeInfos.map(async ({ originalIndex, range }) => {
                const [startLocation, endLocation] = await Promise.all([
                  this.#convertToUsfmVerseRefVerseLocation(range.start),
                  this.#convertToUsfmVerseRefVerseLocation(range.end),
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

            if (activeRanges.length === 0) return;

            // Convert all ranges to USFM indices and sort in descending order
            const rangesWithIndices = activeRanges
              .map((rangeInfo) => ({
                ...rangeInfo,
                startIndex: usjReaderWriter.usfmVerseLocationToIndexInUsfm(rangeInfo.startLocation),
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
            // Release any locally-held locks that weren't yet pushed to heldLocks
            // (e.g., if acquireRead succeeded but acquire threw)
            releaseChapterMutex?.();
            releaseBookLock?.();
            throw e;
          }
        }),
      );

      // Re-throw the first error from Phase 1 (if any) now that all tasks have settled
      // and their locks are accounted for
      if (firstError) throw firstError;

      // Phase 2: Execute all USFM writes together while locks are still held
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

      // Phase 3: Invalidate caches for all modified books/chapters
      pendingWrites.forEach(({ bookId, singleChapter }) => {
        if (singleChapter !== undefined) {
          this.#invalidateCachesForChapter(bookId, singleChapter);
        } else {
          this.#invalidateCachesForBook(bookId);
        }
      });
    } finally {
      // Phase 4: Release all locks (always, even if writes fail)
      heldLocks.forEach(({ releaseBookLock, releaseChapterMutex }) => {
        releaseChapterMutex?.();
        releaseBookLock();
      });
    }
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

    // Dispose read-write locks to reject any pending waiters
    this.#bookRWLockMap.dispose();

    return unsubscriberList.runAllUnsubscribers();
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

    const regexString = job.options.useRegex
      ? job.options.searchString
      : escapeStringRegexp(job.options.searchString);
    const matches = usj.search(new RegExp(regexString, job.options.caseInsensitive ? 'ig' : 'g'));

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
