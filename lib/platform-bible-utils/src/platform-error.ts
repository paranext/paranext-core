import { isString } from './util';

/**
 * Standard platform error codes based on gRPC status codes. These provide machine-readable,
 * cross-process error classification that survives iframe serialization boundaries.
 *
 * @see https://grpc.io/docs/guides/status-codes/ for the original gRPC specification
 */

/** The operation was cancelled, typically by the caller. */
export const CANCELLED = 'CANCELLED';
/**
 * Unknown error. This may be returned when a received error code is not recognized or is not
 * applicable in the current context.
 */
export const UNKNOWN = 'UNKNOWN';
/**
 * The client specified an invalid argument. Indicates arguments that are problematic regardless of
 * the state of the system (e.g., a malformed request, empty required field, invalid enum value).
 */
export const INVALID_ARGUMENT = 'INVALID_ARGUMENT';
/** The deadline expired before the operation could complete. */
export const DEADLINE_EXCEEDED = 'DEADLINE_EXCEEDED';
/** The requested entity (e.g., file, resource, overlay) was not found. */
export const NOT_FOUND = 'NOT_FOUND';
/** The entity that a client attempted to create already exists. */
export const ALREADY_EXISTS = 'ALREADY_EXISTS';
/**
 * The caller does not have permission to execute the specified operation. Must not be used for
 * authentication failures (use {@link UNAUTHENTICATED} instead).
 */
export const PERMISSION_DENIED = 'PERMISSION_DENIED';
/**
 * Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is
 * out of space. Also used when a rate limit or throttle rejects a request.
 */
export const RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED';
/**
 * The operation was rejected because the system is not in a state required for the operation's
 * execution. For example, a WebView must be visible to show an overlay. Unlike
 * {@link INVALID_ARGUMENT}, this error indicates a problem with the system state, not the request.
 */
export const FAILED_PRECONDITION = 'FAILED_PRECONDITION';
/**
 * The operation was aborted, typically due to a concurrency issue such as a newer request replacing
 * an in-flight one, or a transaction abort.
 */
export const ABORTED = 'ABORTED';
/**
 * The operation was attempted past the valid range. Unlike {@link INVALID_ARGUMENT}, this error
 * indicates a problem that may be fixed if the system state changes.
 */
export const OUT_OF_RANGE = 'OUT_OF_RANGE';
/** The operation is not implemented or is not supported/enabled in this service. */
export const UNIMPLEMENTED = 'UNIMPLEMENTED';
/**
 * Internal error. This means that some invariants expected by the underlying system have been
 * broken. This is a serious error; it means the system is in an unexpected state.
 */
export const INTERNAL = 'INTERNAL';
/**
 * The service is currently unavailable. This is most likely a transient condition, which can be
 * corrected by retrying with a backoff.
 */
export const UNAVAILABLE = 'UNAVAILABLE';
/** Unrecoverable data loss or corruption. */
export const DATA_LOSS = 'DATA_LOSS';
/**
 * The request does not have valid authentication credentials for the operation. Use
 * {@link PERMISSION_DENIED} for authorization failures where the caller is authenticated but not
 * permitted.
 */
export const UNAUTHENTICATED = 'UNAUTHENTICATED';

/**
 * Union of all valid platform error codes. Based on gRPC status codes.
 *
 * @see https://grpc.io/docs/guides/status-codes/
 */
export type PlatformErrorCode =
  | typeof CANCELLED
  | typeof UNKNOWN
  | typeof INVALID_ARGUMENT
  | typeof DEADLINE_EXCEEDED
  | typeof NOT_FOUND
  | typeof ALREADY_EXISTS
  | typeof PERMISSION_DENIED
  | typeof RESOURCE_EXHAUSTED
  | typeof FAILED_PRECONDITION
  | typeof ABORTED
  | typeof OUT_OF_RANGE
  | typeof UNIMPLEMENTED
  | typeof INTERNAL
  | typeof UNAVAILABLE
  | typeof DATA_LOSS
  | typeof UNAUTHENTICATED;

/** The version of the PlatformError type */
export const PLATFORM_ERROR_VERSION = 1;

/**
 * PlatformError is an error type with stronger typing of properties than `Error`. It is used to
 * represent errors that are returned by the platform.
 *
 * You can create a new PlatformError object using {@link newPlatformError}. You can check if a value
 * is a PlatformError object using {@link isPlatformError}.
 */
export type PlatformError = {
  /**
   * The underlying cause of the error, if any. Normally this will be copied from an `Error object
   * passed to {@link newPlatformError}. If a non-Error object is passed to {@link newPlatformError},
   * it will be stored here.
   */
  cause?: unknown;
  /** Machine-readable error code indicating the class of problem. See {@link PlatformErrorCode}. */
  code?: PlatformErrorCode;
  /**
   * A descriptive message explaining the error. Normally this will be copied from an `Error` object
   * passed to {@link newPlatformError}. If a string is passed to {@link newPlatformError}, it will be
   * stored here.
   */
  message: string;
  /** The version of the PlatformError type. */
  platformErrorVersion: number;
  /**
   * The stack trace of the error, if available. Normally this will be copied from an `Error` object
   * passed to {@link newPlatformError}.
   */
  stack?: string;
};

/**
 * Creates a new PlatformError object. If no argument is provided, a PlatformError object with an
 * empty `message` is returned.
 *
 * @param error The error message as a string, an Error object, or a value to assign to the `cause`
 *   property of the returned PlatformError object
 * @param code Optional machine-readable error code. See {@link PlatformErrorCode}.
 * @returns A new PlatformError object
 */
export function newPlatformError(error?: unknown, code?: PlatformErrorCode): PlatformError {
  if (!error)
    return {
      message: '',
      ...(code && { code }),
      platformErrorVersion: PLATFORM_ERROR_VERSION,
    };
  if (isString(error))
    return {
      message: error,
      ...(code && { code }),
      platformErrorVersion: PLATFORM_ERROR_VERSION,
    };
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    const platformError: PlatformError = {
      message: error.message,
      platformErrorVersion: PLATFORM_ERROR_VERSION,
    };
    Object.defineProperties(platformError, Object.getOwnPropertyDescriptors(error));
    Object.defineProperty(platformError, 'message', { enumerable: true });
    if ('stack' in error && isString(error.stack)) {
      // stack is generated lazily, and it seems this is causing some troubles with copying it into
      // another object via property descriptors as of Node 22.14.0 (no problems in 20.18.0).
      // So we shall set the value directly on the object
      Object.defineProperty(platformError, 'stack', { value: error.stack, enumerable: true });
    }
    if ('cause' in platformError)
      Object.defineProperty(platformError, 'cause', { enumerable: true });
    if (code) platformError.code = code;
    return platformError;
  }
  return {
    cause: error,
    message: '',
    ...(code && { code }),
    platformErrorVersion: PLATFORM_ERROR_VERSION,
  };
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
