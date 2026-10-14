export const gracefulShutdownMessage = 'gracefulShutdown';
export const heartbeatMessage = 'heartbeat';

/**
 * Exit code the extension host uses when it ends itself because its connection to main died. Main
 * reads it off the child process `exit` event to tell "lost its link" from any other unexpected
 * exit, which it reports as a crash.
 *
 * 70 is in neither range main could otherwise see: Node's own exit codes are 1–13, and 128 and
 * above report a signal.
 */
export const EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE = 70;
