export const gracefulShutdownMessage = 'gracefulShutdown';
export const heartbeatMessage = 'heartbeat';

/**
 * Exit code the extension host uses when it ends itself because its connection to main died. Main
 * reads it off the child process `exit` event to tell "lost its link" from any other unexpected
 * exit, which it reports as a crash.
 *
 * 12 is outside the codes Node itself uses (1–10 and 12 is "Invalid Debug Argument" only when
 * `--inspect` parsing fails at startup, which cannot happen once the process is running).
 */
export const EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE = 12;
