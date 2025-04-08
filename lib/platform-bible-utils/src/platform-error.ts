import { isString } from './util';

export const PLATFORM_ERROR_VERSION = 1;

/**
 * PlatformError is an error type with stronger typing of properties than {@link Error}. It is used
 * to represent errors that are returned by the platform.
 *
 * You can create a new PlatformError object using {@link newPlatformError}. You can check if a value
 * is a PlatformError object using {@link isPlatformError}.
 */
export type PlatformError = {
  /**
   * The underlying cause of the error, if any. Normally this will be copied from an {@link Error}
   * object passed to {@link newPlatformError}. If a non-Error object is passed to
   * {@link newPlatformError}, it will be stored here.
   */
  cause?: unknown;
  /**
   * A descriptive message explaining the error. Normally this will be copied from an {@link Error}
   * object passed to {@link newPlatformError}. If a string is passed to {@link newPlatformError}, it
   * will be stored here.
   */
  message: string;
  /** The version of the PlatformError type. */
  platformErrorVersion: number;
  /**
   * The stack trace of the error, if available. Normally this will be copied from an {@link Error}
   * object passed to {@link newPlatformError}.
   */
  stack?: string;
};

/**
 * Creates a new PlatformError object. If no argument is provided, a PlatformError object with an
 * empty `message` is returned.
 *
 * @param error The error message as a string, an Error object, or a value to assign to the `cause`
 *   property of the returned PlatformError object
 * @returns A new PlatformError object
 */
export function newPlatformError(error?: unknown): PlatformError {
  if (!error) return { message: '', platformErrorVersion: PLATFORM_ERROR_VERSION };
  if (isString(error)) return { message: error, platformErrorVersion: PLATFORM_ERROR_VERSION };
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    const platformError: PlatformError = {
      message: error.message,
      platformErrorVersion: PLATFORM_ERROR_VERSION,
    };
    Object.defineProperties(platformError, Object.getOwnPropertyDescriptors(error));
    Object.defineProperty(platformError, 'message', { enumerable: true });
    if ('stack' in platformError)
      Object.defineProperty(platformError, 'stack', { enumerable: true });
    if ('cause' in platformError)
      Object.defineProperty(platformError, 'cause', { enumerable: true });
    return platformError;
  }
  return { cause: error, message: '', platformErrorVersion: PLATFORM_ERROR_VERSION };
}

/**
 * Checks if the provided value is a PlatformError object.
 *
 * @param error The value to check
 * @returns `true` if the value is a PlatformError object, otherwise `false`
 */
export function isPlatformError(error: unknown): error is PlatformError {
  return !!error && typeof error === 'object' && 'platformErrorVersion' in error;
}
