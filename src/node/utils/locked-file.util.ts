import { retryUntil } from 'platform-bible-utils';

/**
 * Error code Windows gives when another process holds a file without sharing it, such as a copy
 * still writing the file or an antivirus scan of it. Node.js opens a file to watch it as well as to
 * read it, so both can meet this on a newly added file.
 */
const LOCKED_FILE_ERROR_CODE = 'EBUSY';

/** A file-system error caused by another process holding the file at `path` */
export type LockedFileError = Error & { code: typeof LOCKED_FILE_ERROR_CODE; path: string };

/** Whether `error` is a file-system error caused by another process holding a file */
export function isLockedFileError(error: unknown): error is LockedFileError {
  if (!(error instanceof Error) || !('code' in error) || !('path' in error)) return false;
  const { code, path } = error;
  return code === LOCKED_FILE_ERROR_CODE && typeof path === 'string' && !!path;
}

export type RetryWhileFileLockedOptions = {
  /** How long to wait before trying again. Defaults to 500 ms */
  delayMs?: number;
  /**
   * How many attempts to make in all. Defaults to 20, so about 10 seconds with the default delay:
   * enough to outlast a brief hold, short enough that a file held for good does not hold up
   * whatever is waiting on it for long.
   */
  maxAttempts?: number;
  /**
   * Called once, when the first attempt finds the file locked, so the caller can say that a wait
   * has started
   */
  onLocked?: (error: LockedFileError) => void;
};

/**
 * Runs `operation`, and while it fails because another process holds a file, runs it again after a
 * delay.
 *
 * @returns What `operation` returns
 * @throws Any error other than a locked file at once, or the locked-file error once `maxAttempts`
 *   runs out
 */
export async function retryWhileFileLocked<T>(
  operation: () => Promise<T>,
  { delayMs = 500, maxAttempts = 20, onLocked }: RetryWhileFileLockedOptions = {},
): Promise<T> {
  const outcome = await retryUntil<{ value: T } | { lockedError: LockedFileError }>(
    async (attemptNumber) => {
      try {
        return { value: await operation() };
      } catch (error) {
        if (!isLockedFileError(error)) throw error;
        if (attemptNumber === 1) onLocked?.(error);
        return { lockedError: error };
      }
    },
    (result) => 'value' in result,
    { maxAttempts, delayMs },
  );
  if ('lockedError' in outcome) throw outcome.lockedError;
  return outcome.value;
}
