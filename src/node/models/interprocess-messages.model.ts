export const gracefulShutdownMessage = 'gracefulShutdown';
export const heartbeatMessage = 'heartbeat';

/**
 * Sent by the extension host to main over the child-process IPC channel once it has initialized its
 * extensions, at the same moment it emits `platform.onDidStartExtensionHost` to the windows. Main
 * uses it to end a restart in flight: until it arrives, a further restart request joins the running
 * one instead of stopping the host that is still starting. It travels on the channel of one child
 * process, so main can tell which process sent it.
 */
export const extensionHostStartedMessage = 'extensionHostStarted';

/**
 * Exit code the extension host uses when it ends itself because its connection to main died. Main
 * reads it off the child process `exit` event to tell "lost its link" from any other unexpected
 * exit, which it reports as a crash.
 *
 * 70 is in neither range main could otherwise see: Node's own exit codes are 1–13, and 128 and
 * above report a signal.
 */
export const EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE = 70;

/**
 * Exit code the extension host uses when it cannot start, such as when its first connection to main
 * fails. Main classifies every unexpected exit other than
 * {@link EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE} as a crash, which is what this is reported as.
 */
export const EXTENSION_HOST_STARTUP_FAILURE_EXIT_CODE = 1;

/** `type` of the message main sends a forked extension host carrying its launch secrets */
export const LAUNCH_SECRETS_MESSAGE_TYPE = 'papiLaunchSecrets';

/**
 * Sent by main to a forked extension host over the child-process IPC channel, right after forking
 * it. The extension host presents `clientSecret` when it connects to main's PAPI WebSocket and
 * expects `serverSecret` back. Never logged.
 */
export type LaunchSecretsMessage = {
  type: typeof LAUNCH_SECRETS_MESSAGE_TYPE;
  clientSecret: string;
  serverSecret: string;
};

/** Whether an IPC message is a well-formed {@link LaunchSecretsMessage} */
export function isLaunchSecretsMessage(message: unknown): message is LaunchSecretsMessage {
  return (
    typeof message === 'object' &&
    !!message &&
    'type' in message &&
    message.type === LAUNCH_SECRETS_MESSAGE_TYPE &&
    'clientSecret' in message &&
    typeof message.clientSecret === 'string' &&
    'serverSecret' in message &&
    typeof message.serverSecret === 'string'
  );
}
