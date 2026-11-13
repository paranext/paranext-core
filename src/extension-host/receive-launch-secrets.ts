import {
  EXTENSION_HOST_STARTUP_FAILURE_EXIT_CODE,
  isLaunchSecretsMessage,
} from '@node/models/interprocess-messages.model';
import type { EventEmitter } from 'events';
import type { LaunchCredentials } from '@client/services/launch-credentials';
import { logger } from '@shared/services/logger.service';

/** How long to wait for main to send the launch secrets before giving up on starting */
export const LAUNCH_SECRETS_TIMEOUT_MS = 10_000;

type Dependencies = {
  /** `process` in production: its `send` exists only when main forked it with an IPC channel */
  process: Pick<EventEmitter, 'on' | 'off'> & { send?: unknown };
  /** `setLaunchCredentials` from `@client/services/launch-credentials` */
  setLaunchCredentials: (credentials: LaunchCredentials) => void;
  /** Ends the process with the given code; `process.exit` in production */
  exitProcess: (code: number) => void;
};

/**
 * Waits for the launch secrets main sends a forked extension host, and hands them to the connection
 * that will present them. Must be called before anything could make the first PAPI connection, and
 * while module evaluation is still synchronous, so the message cannot arrive before the listener.
 *
 * Without an IPC channel the extension host was started on its own rather than by main, so there is
 * nothing to wait for: it connects unidentified and is refused the request types restricted to the
 * extension host.
 *
 * If main forked this process but sends no secrets in time, logs an error and exits, so main
 * reports a crash instead of an extension host that can reach nothing it needs.
 */
export function receiveLaunchSecrets({
  process: processLike,
  setLaunchCredentials,
  exitProcess,
}: Dependencies): Promise<void> {
  if (typeof processLike.send !== 'function') {
    logger.info(
      'Extension host has no IPC channel to main, so it connects without launch secrets and cannot use the request types restricted to the extension host',
    );
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    function onMessage(message: unknown) {
      if (!isLaunchSecretsMessage(message)) return;
      clearTimeout(timeout);
      processLike.off('message', onMessage);
      setLaunchCredentials({
        clientSecret: message.clientSecret,
        serverSecret: message.serverSecret,
      });
      resolve();
    }
    timeout = setTimeout(() => {
      processLike.off('message', onMessage);
      logger.error(
        `Extension host did not receive its launch secrets from main within ${LAUNCH_SECRETS_TIMEOUT_MS}ms; exiting`,
      );
      exitProcess(EXTENSION_HOST_STARTUP_FAILURE_EXIT_CODE);
    }, LAUNCH_SECRETS_TIMEOUT_MS);
    processLike.on('message', onMessage);
  });
}
