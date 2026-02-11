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
        // Clear the entire book cache when any book changes
        // A more sophisticated approach could track which book changed
        this.#bookCache.clear();
        // Also clear chapter cache since chapter data derives from book data
        this.#chapterCache.clear();
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
        // Clear the entire chapter cache when any chapter changes
        // A more sophisticated approach could track which chapter changed
        this.#chapterCache.clear();
        // Also clear book cache since book data includes chapter data
        this.#bookCache.clear();
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

    // Convert locations, validate, and group ranges by book
    const rangesByBook = new Map<
      string,
      Array<{
        originalIndex: number;
        startLocation: UsfmVerseRefVerseLocation;
        endLocation: UsfmVerseRefVerseLocation;
      }>
    >();

    await Promise.all(
      rangesToReplace.map(async (range, i) => {
        // Convert both start and end to USFM locations
        const [startLocation, endLocation] = await Promise.all([
          this.#convertToUsfmVerseRefVerseLocation(range.start),
          this.#convertToUsfmVerseRefVerseLocation(range.end),
        ]);

        // Validate both endpoints are in the same book
        if (startLocation.verseRef.book !== endLocation.verseRef.book) {
          throw new Error(
            `Range at index ${i} spans multiple books (${startLocation.verseRef.book} to ${endLocation.verseRef.book}). Cross-book replacements are not supported.`,
          );
        }

        // Group converted ranges by book
        const bookId = startLocation.verseRef.book;
        if (!rangesByBook.has(bookId)) {
          rangesByBook.set(bookId, []);
        }
        // We validated above that bookId exists in the map
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        rangesByBook.get(bookId)!.push({ originalIndex: i, startLocation, endLocation });
      }),
    );

    // Process each book to compute modified USFM, then add the modified USFM to pendingWrites to
    // write at the end to avoid cache busting inefficiencies
    const pendingWrites: Array<{
      verseRef: SerializedVerseRef;
      modifiedUsfm: string;
      isChapterLevel: boolean;
    }> = [];

    await Promise.all(
      [...rangesByBook.entries()].map(async ([bookId, bookRanges]) => {
        // Determine if all ranges are within a single chapter
        const chapterNums = new Set<number>();
        bookRanges.forEach((rangeInfo) => {
          chapterNums.add(rangeInfo.startLocation.verseRef.chapterNum);
          chapterNums.add(rangeInfo.endLocation.verseRef.chapterNum);
        });

        // Use chapter-level reader writer if all ranges are in one chapter
        const singleChapter = chapterNums.size === 1 ? [...chapterNums][0] : undefined;
        const usjReaderWriter = await this.#getOrCreateCachedReaderWriter(bookId, singleChapter);

        // Convert all ranges to USFM indices and sort in descending order
        const rangesWithIndices = bookRanges
          .map((rangeInfo) => ({
            ...rangeInfo,
            startIndex: usjReaderWriter.usfmVerseLocationToIndexInUsfm(rangeInfo.startLocation),
            endIndex: usjReaderWriter.usfmVerseLocationToIndexInUsfm(rangeInfo.endLocation),
          }))
          .sort((a, b) => b.startIndex - a.startIndex);

        // Perform string replacements in reverse index order
        let modifiedUsfm = usjReaderWriter.toUsfm();
        rangesWithIndices.forEach((rangeWithIndex) => {
          const replacement = replacements[rangeWithIndex.originalIndex];
          modifiedUsfm =
            modifiedUsfm.substring(0, rangeWithIndex.startIndex) +
            replacement +
            modifiedUsfm.substring(rangeWithIndex.endIndex);
        });

        // Set up the USFM to be written for this book/chapter
        pendingWrites.push({
          verseRef: { book: bookId, chapterNum: singleChapter ?? 1, verseNum: 0 },
          modifiedUsfm,
          isChapterLevel: singleChapter !== undefined,
        });
      }),
    );

    // Write all modified USFM together at the end
    await Promise.all(
      pendingWrites.map(async (write) => {
        if (write.isChapterLevel) {
          await this.#pdps['platformScripture.USFM_Chapter'].setChapterUSFM(
            write.verseRef,
            write.modifiedUsfm,
          );
        } else {
          await this.#pdps['platformScripture.USFM_Book'].setBookUSFM(
            write.verseRef,
            write.modifiedUsfm,
          );
        }
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

    return unsubscriberList.runAllUnsubscribers();
  }

  /**
   * Converts a UsjChapterLocation or UsfmVerseLocation to a standardized UsfmVerseRefVerseLocation.
   *
   * For UsjChapterLocation, uses the chapter-level UsjReaderWriter to convert the document location
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

      // Must ask USX PDPs for the data for now then transform to USJ ourselves instead of asking
      // USJ PDPs for the data because of the following layering PDP wait bug. Turtles all the way
      // down. https://paratextstudio.atlassian.net/browse/PT-3233
      const usx = isChapterLevel
        ? await this.#pdps['platformScripture.USX_Chapter'].getChapterUSX(verseRef)
        : await this.#pdps['platformScripture.USX_Book'].getBookUSX(verseRef);
      if (!usx)
        throw new Error(
          `No scripture found for: ${JSON.stringify({ bookId, chapter: chapter ?? 'entire book' })}`,
        );

      const scripture: Usj | undefined = correctUsjVersion(usxStringToUsj(usx));
      const usjReaderWriter = new UsjReaderWriter(scripture, {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      });

      cache.set(cacheKey, usjReaderWriter);
      return usjReaderWriter;
    });
  }
}
