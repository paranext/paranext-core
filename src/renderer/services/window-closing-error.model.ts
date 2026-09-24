/**
 * Error thrown when this window refuses an operation because the main process has told it that it
 * is closing.
 *
 * A refusal is an ordinary part of closing a window, not a failure: whatever was in flight is
 * simply not going to finish. Callers need to tell it apart from a real failure so an ordinary
 * close does not report one — hence a type rather than a message to match on.
 */
export class WindowClosingError extends Error {}

export default WindowClosingError;
