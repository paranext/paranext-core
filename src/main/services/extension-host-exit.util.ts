import { EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE } from '@node/models/interprocess-messages.model';
import { ExtensionHostStoppedEvent } from '@shared/models/extension-host-lifecycle.model';

// The child process `exit` event reports the absent one of code and signal as null, so these types
// mirror that.
type ExtensionHostExit = {
  /** Exit code from the child process `exit` event; `null` when a signal ended it */
  // eslint-disable-next-line no-null/no-null
  code: number | null;
  /** Signal name from the child process `exit` event; `null` when it exited on its own */
  // eslint-disable-next-line no-null/no-null
  signal: string | null;
  /** Whether main asked for this stop (restart, dev-mode file watcher) */
  isStopRequested: boolean;
  /** Whether the whole app is on its way down */
  isAppShuttingDown: boolean;
};

/**
 * Decide whether an extension host exit is worth telling the user about, and why it happened.
 *
 * A stop main asked for, and any stop during app shutdown, is expected: nothing is announced. Any
 * other exit is unexpected: the dedicated exit code means the extension host ended itself because
 * its connection to main died; anything else is a crash.
 *
 * Pure, so the branches are testable without forking a process.
 *
 * @returns The event to announce, or `undefined` for an expected stop
 */
export function classifyExtensionHostExit({
  code,
  signal,
  isStopRequested,
  isAppShuttingDown,
}: ExtensionHostExit): ExtensionHostStoppedEvent | undefined {
  if (isStopRequested || isAppShuttingDown) return undefined;
  if (!signal && code === EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE)
    return { reason: 'lost-connection' };
  return { reason: 'crashed' };
}
