import { useCallback } from 'react';
import type { MutableRefObject } from 'react';
import { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/** Configuration options for job polling */
interface JobConfig<TStatus> {
  /** Batch size for result retrieval (default: 100) */
  batchSize?: number;
  /** Delay between polls in milliseconds (default: 10) */
  pollInterval?: number;
  /**
   * Array of status values that indicate the job has completed (terminal states). The hook will
   * stop polling when any of these statuses are received. Example: ['completed', 'stopped',
   * 'errored', 'exceeded']
   */
  terminalStatuses?: TStatus[];
  /**
   * Status value that indicates an error occurred. When this status is received, the hook will
   * throw an error. If not provided, no status will be treated as an error.
   */
  errorStatus?: TStatus;
}

/** Generic job status report structure that can work with any status type */
interface JobStatusReport<TResult, TStatus = string> {
  /** Current status of the job */
  status: TStatus;
  /** Error message if status indicates an error */
  error?: string;
  /** Batch of results from this update */
  nextResults?: TResult[];
  /** Percentage complete (0-100) */
  percentComplete?: number;
  /** Total results count */
  totalResultsCount?: number;
  /** Job ID */
  jobId?: string;
  /** Total execution time */
  totalExecutionTimeMs?: number;
}

/** Function signature for starting a job */
type JobStarter<TParams, TJobId> = (params: TParams) => Promise<TJobId>;

/** Function signature for polling job updates */
type JobPoller<TJobId, TResult, TStatus> = (
  jobId: TJobId,
  batchSize: number,
) => Promise<JobStatusReport<TResult, TStatus>>;

/** Function signature for cleaning up a job */
type JobCleaner<TJobId> = (jobId: TJobId) => Promise<void>;

/** Job execution functions */
interface JobHandlers<TParams, TJobId, TResult, TStatus> {
  /** Function to start a new job */
  startJob: JobStarter<TParams, TJobId>;
  /** Function to poll for job updates */
  pollJob: JobPoller<TJobId, TResult, TStatus>;
  /** Function to clean up/abandon a job */
  cleanupJob: JobCleaner<TJobId>;
}

/**
 * Custom hook for managing generic job polling with automatic cleanup.
 *
 * This hook provides a reusable job management solution that works with any job-based API pattern:
 *
 * - Starts background jobs with provided parameters
 * - Polls for results with configurable batching and intervals
 * - Automatically handles job cleanup on completion or error
 * - Prevents memory leaks through proper resource management
 * - Handles component unmount gracefully
 * - Supports configurable terminal statuses and error handling
 *
 * @param handlers - Job execution functions (start, poll, cleanup)
 * @param isMountedRef - Ref to track if component is still mounted
 * @param activeJobsRef - Ref to track active jobs for cleanup
 * @param config - Configuration options for polling behavior and status handling
 * @returns Function to execute a job with the given parameters
 */
export function useJob<TParams, TJobId, TResult, TStatus = string>(
  handlers: JobHandlers<TParams, TJobId, TResult, TStatus>,
  isMountedRef: MutableRefObject<boolean>,
  activeJobsRef: MutableRefObject<Set<string>>,
  config: JobConfig<TStatus> = {},
): (params: TParams) => Promise<TResult[]> {
  const { batchSize = 100, pollInterval = 10, terminalStatuses = [], errorStatus } = config;
  const { startJob, pollJob, cleanupJob } = handlers;

  const executeJob = useCallback(
    async (params: TParams): Promise<TResult[]> => {
      let jobId: TJobId | undefined;

      try {
        jobId = await startJob(params);
        const jobIdString = String(jobId);

        activeJobsRef.current.add(jobIdString);

        const pollForResults = async (
          currentJobId: TJobId,
          allResults: TResult[] = [],
        ): Promise<TResult[]> => {
          if (!isMountedRef.current) {
            return allResults;
          }

          const statusReport = await pollJob(currentJobId, batchSize);

          if (statusReport.nextResults?.length) {
            allResults.push(...statusReport.nextResults);
          }

          // Check if job has completed - use configurable terminal states
          const isComplete =
            terminalStatuses.length > 0 ? terminalStatuses.includes(statusReport.status) : false;

          // Handle error status if configured
          if (errorStatus && statusReport.status === errorStatus) {
            throw new Error(`Job failed: ${statusReport.error || 'Unknown error'}`);
          }

          if (isComplete) {
            return allResults;
          }

          // Brief delay between polls to avoid overwhelming the system
          if (pollInterval > 0) {
            await new Promise((resolve) => {
              setTimeout(resolve, pollInterval);
            });
          }

          return pollForResults(currentJobId, allResults);
        };

        return await pollForResults(jobId);
      } finally {
        // Always clean up the job, even if there was an error or component unmounted
        if (jobId) {
          try {
            await cleanupJob(jobId);
            const jobIdString = String(jobId);
            activeJobsRef.current.delete(jobIdString);
          } catch (cleanupError) {
            // Job cleanup errors are non-critical, just log them
            const jobIdString = String(jobId);
            logger.debug(`Job ${jobIdString} cleanup failed: ${getErrorMessage(cleanupError)}`);
          }
        }
      }
    },
    [
      startJob,
      pollJob,
      cleanupJob,
      batchSize,
      pollInterval,
      terminalStatuses,
      errorStatus,
      isMountedRef,
      activeJobsRef,
    ],
  );

  return executeJob;
}
