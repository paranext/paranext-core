import { Usj, usxStringToUsj } from '@biblionexus-foundation/scripture-utilities';
import { logger, ProjectDataProviderEngine } from '@papi/backend';
import { IProjectDataProviderEngine } from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { ProjectDataProviderInterfaces } from 'papi-shared-types';
import {
  escapeStringRegexp,
  getErrorMessage,
  newGuid,
  UsjReaderWriter,
} from 'platform-bible-utils';
import {
  FindJobStatus,
  FindJobStatusReport,
  FindOptions,
  FindResult,
  FindScope,
} from 'platform-scripture';

// This interface doesn't provide any normal data types that PDPs use
export const SCRIPTURE_FINDER_PROJECT_INTERFACES = [
  'platformScripture.FindInScripture',
] as const satisfies ['platformScripture.FindInScripture'];

/** The project interfaces the Scripture Finder Layering PDPF requires */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const SCRIPTURE_FINDER_OVERLAY_PROJECT_INTERFACES = [
  'platformScripture.USX_Book',
  'platformScripture.USX_Chapter',
] as const satisfies ['platformScripture.USX_Book', 'platformScripture.USX_Chapter'];

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
  private readonly pdps: ScriptureFinderOverlayPDPs;

  // Track all running jobs
  private readonly jobs = new Map<string, FindJob>();

  /**
   * Creates a new ScriptureFinderProjectDataProviderEngine instance.
   *
   * @param pdpsToOverlay - Underlying project data providers that provide book and chapter data.
   */
  constructor(pdpsToOverlay: ScriptureFinderOverlayPDPs) {
    super();
    this.pdps = pdpsToOverlay;
  }

  /**
   * Begins an asynchronous find operation across the specified scripture scopes.
   *
   * Creates and starts a new find job that will search for the specified text or pattern across the
   * provided scripture scopes. The operation runs asynchronously and can be monitored, stopped, or
   * have results retrieved using the returned job ID.
   *
   * **Important:** All jobs should have {@link cleanUpFindJob} called after they finish to free
   * resources and remove them from tracking. Not doing so will lead to memory leaks as jobs are not
   * automatically cleaned up when they finish.
   *
   * @example
   *
   * ```typescript
   * const jobId = await engine.beginFindJob({
   *   searchString: 'Blessed',
   *   scope: [{ bookId: 'MAT', chapter: 5 }],
   *   useRegex: false,
   *   caseInsensitive: true,
   * });
   * ```
   *
   * @param findOptions - Configuration for the find operation including:
   *
   *   - `searchString`: The text or regex pattern to search for (required, cannot be empty)
   *   - `scope`: Array of scopes to search (required, cannot be empty)
   *   - `useRegex`: Whether to treat searchString as a regular expression
   *   - `caseInsensitive`: Whether to perform case-insensitive matching
   *
   * @returns Promise that resolves to a unique job ID that can be used to interact with the find
   *   operation (retrieve results, check status, stop, etc.)
   */
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
    this.jobs.set(jobId, job);
    job.promise = this.#processFindJob(job);
    return jobId;
  }

  /**
   * Attempts to gracefully stop an ongoing find operation.
   *
   * Requests the specified find job to stop processing and waits for it to finish gracefully within
   * the specified timeout period. If the job doesn't stop within the timeout, it will continue
   * running but this method will return false.
   *
   * **Important:** All jobs should have {@link cleanUpFindJob} called after they finish to free
   * resources and remove them from tracking. Not doing so will lead to memory leaks as jobs are not
   * automatically cleaned up when they finish.
   *
   * @example
   *
   * ```typescript
   * const stopped = await engine.stopFindJob(jobId, 2000);
   * if (stopped) {
   *   console.log('Job stopped successfully');
   * } else {
   *   console.log("Job didn't stop in time or doesn't exist");
   * }
   * ```
   *
   * @param jobId - The unique identifier of the find job to stop
   * @param timeoutMs - The maximum time in milliseconds to wait for the job to stop gracefully.
   *   Defaults to 1000ms (1 second).
   * @returns Promise that resolves to `true` if the job stopped gracefully within the timeout
   *   period, `false` if the job doesn't exist or didn't stop in time
   */
  async stopFindJob(jobId: string, timeoutMs: number = 1000): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (!job) return false;
    job.stopRequested = true;
    try {
      const timeoutPromise = new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error('Timeout')), timeoutMs);
      });
      await Promise.race([job.promise, timeoutPromise]);
      return true;
    } catch (error) {
      logger.warn(`Find job ${jobId} did not stop gracefully within 1s: ${getErrorMessage(error)}`);
      return false;
    }
  }

  /**
   * Removes a find job from tracking and frees its resources.
   *
   * This method should be called after a find job has finished for any reason to clean up memory
   * and remove the job from the internal tracking system.
   *
   * @example
   *
   * ```typescript
   * const status = await engine.retrieveFindJobUpdate(jobId, 0);
   * if (status.status !== 'running') {
   *   await engine.cleanUpFindJob(jobId);
   * }
   * ```
   *
   * @param jobId - The unique identifier of the find job to clean up
   * @throws Error if the job ID doesn't exist or if the job is still running. Running jobs must
   *   finish before they can be cleaned up.
   */
  async cleanUpFindJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    if (job.status === 'running')
      throw new Error(`Job with ID ${jobId} is running. It must be stopped before completing.`);
    this.jobs.delete(jobId);
  }

  /**
   * Retrieves the current status and results of a find job.
   *
   * Returns comprehensive information about the job's progress. This method can be called
   * repeatedly to poll for updates and retrieve results incrementally.
   *
   * @example
   *
   * ```typescript
   * // Poll for updates with limited results
   * const update = await engine.retrieveFindJobUpdate(jobId, 10);
   * console.log(`Status: ${update.status}, Progress: ${update.percentComplete}%`);
   * console.log(`Found ${update.totalResultsCount} total results`);
   * update.nextResults.forEach((result) => {
   *   console.log(`${result.verseRef}: ${result.text}`);
   * });
   * ```
   *
   * @param jobId - The unique identifier of the find job to check
   * @param maxResultsToInclude - The maximum number of results to include in the response. Use 0 to
   *   get status without results, or a reasonable number to paginate through large result sets.
   * @returns Promise that resolves to a {@link FindJobStatusReport} containing:
   *
   *   - `jobId`: The job identifier
   *   - `status`: Current job status ('running', 'completed', 'stopped', 'errored', 'exceeded')
   *   - `percentComplete`: Progress percentage (0-100)
   *   - `totalResultsCount`: Total number of results found so far
   *   - `nextResults`: Array of up to `maxResultsToInclude` results
   *   - `error`: Error message if status is 'errored'
   *   - `totalExecutionTimeMs`: Total time elapsed since job started
   *
   * @throws Error if the job ID doesn't exist
   */
  async retrieveFindJobUpdate(
    jobId: string,
    maxResultsToInclude: number,
  ): Promise<FindJobStatusReport> {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error(`Job with ID ${jobId} not found`);
    return {
      jobId: job.jobId,
      status: job.status,
      percentComplete: job.percentComplete,
      totalResultsCount: job.totalResultsCount,
      nextResults: job.results.slice(0, maxResultsToInclude),
      error: job.error,
      totalExecutionTimeMs: (job.endTime ?? performance.now()) - job.startTime,
    };
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
    const verseRef: SerializedVerseRef = {
      book: scope.bookId,
      chapterNum: scope.chapter ?? 1,
      verseNum: 0,
    };
    const usx =
      scope.chapter !== undefined
        ? await this.pdps['platformScripture.USX_Chapter'].getChapterUSX(verseRef)
        : await this.pdps['platformScripture.USX_Book'].getBookUSX(verseRef);
    if (!usx) throw new Error(`No scripture found for: ${JSON.stringify(scope)}`);
    const scripture: Usj | undefined = usxStringToUsj(usx);

    const usj = new UsjReaderWriter(scripture);
    const regexString = job.options.useRegex
      ? job.options.searchString
      : escapeStringRegexp(job.options.searchString);
    const matches = usj.search(new RegExp(regexString, job.options.caseInsensitive ? 'ig' : 'g'));

    return matches.map((match) => {
      return {
        verseRef: usj.jsonPathToVerseRefAndOffset(match.location.jsonPath).verseRef,
        text: match.text,
      };
    });
  }
}
