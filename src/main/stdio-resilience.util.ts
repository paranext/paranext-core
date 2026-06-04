/**
 * Stdio resilience helpers for the main Electron process.
 *
 * Background — D-014 (idle-state triple-port-drop family, continuation of D-010 / D-011 / D-013).
 *
 * The main process is launched as a child of `electronmon` (in dev) or directly from the OS shell
 * (in prod). Its stdout/stderr pipes are owned by the parent. If the parent disconnects (terminal
 * idle-disconnect under WSL2, electronmon crash, etc.), every subsequent `console.log` from the
 * `electron-log` console transport raises a libuv EPIPE.
 *
 * The D-010 fix installed an `uncaughtException` handler that catches EPIPE-class errors and
 * downgrades them to a `[warn]`. But that warn calls `logger.warn(...)` → `console.log(...)` →
 * another EPIPE. The handler wraps the call in `try/catch`, so a _synchronous_ throw is absorbed —
 * but Node.js delivers most stdio write errors **asynchronously** via the `'error'` event on
 * `process.stdout` / `process.stderr`. Those events bubble up to a fresh `uncaughtException`, where
 * the handler logs again, which fires another async error, and so on until something eventually
 * escapes (e.g., a non-EPIPE follow-on like ERR_STREAM_DESTROYED) or the process is killed by the
 * OS for stuck stdio.
 *
 * The extension-host already has the right shape: on EPIPE, set `logger.transports.console.level =
 * false` to short-circuit the loop. This module mirrors that pattern for main and adds explicit
 * `'error'` listeners on `process.stdout` / `process.stderr` so stream-error events cannot escape
 * as uncaught exceptions in the first place.
 *
 * Pure, no side effects on import — wiring happens when `installStdioErrorListeners` is called
 * explicitly from `main.ts`. The helpers are exported individually for unit testing in
 * `stdio-resilience.util.test.ts`.
 */

import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { Writable } from 'stream';

const TRANSIENT_PIPE_ERROR_CODES = new Set(['EPIPE', 'ECONNRESET', 'ERR_STREAM_DESTROYED']);

/**
 * Classify a libuv error code as a transient-pipe error.
 *
 * Returns true for the codes that indicate the peer (parent process / terminal) closed the pipe and
 * subsequent writes will fail. False for everything else, including undefined.
 */
export function isTransientPipeErrorCode(code: string | undefined): boolean {
  if (!code) return false;
  return TRANSIENT_PIPE_ERROR_CODES.has(code);
}

/**
 * If the given error indicates a broken stdio pipe, disable the logger's console transport to stop
 * further log calls from re-entering the broken pipe and producing a cascade of uncaught
 * exceptions.
 *
 * Safe to call repeatedly: setting `transports.console.level = false` when it is already false is a
 * no-op.
 *
 * Pattern mirrors `src/extension-host/extension-host.ts` (uncaughtException EPIPE handler).
 */
export function silenceConsoleTransportOnPipeError(error: unknown): void {
  // Reading an extra `code` property off Error is a documented Node convention.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const code = (error as { code?: string } | undefined)?.code;

  // electron-log occasionally surfaces stream-write errors via 'error' events
  // whose payload is an Error with no `code` set but a `message` like
  // "EPIPE: broken pipe, write". Fall back to message inspection so neither
  // shape can slip past.
  const message = getErrorMessage(error);
  const startsWithEpipe = typeof message === 'string' && message.startsWith('EPIPE');

  const isPipe = isTransientPipeErrorCode(code) || startsWithEpipe;
  if (!isPipe) return;

  // electron-log's transport object has a `level` field accepting `LevelOption`
  // (string | false). Reading the runtime object via a structural cast keeps this
  // testable without pulling in the full electron-log types into a unit test.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const consoleTransport = (logger.transports as { console?: { level: unknown } } | undefined)
    ?.console;
  if (consoleTransport) consoleTransport.level = false;
}

/**
 * Attach `'error'` listeners to the main process's stdout and stderr so that broken-pipe errors
 * raised asynchronously by the stream do NOT bubble up as `uncaughtException`s.
 *
 * Without these listeners, every `console.log` after a parent-process disconnect can synthesize a
 * fresh uncaught exception (see D-014 root cause analysis at the top of this file). With them, the
 * first EPIPE is absorbed, the console transport is silenced, and the main process stays alive —
 * the renderer is no longer collateral damage of a broken stdio pipe.
 *
 * Idempotent: if Node has already attached internal error handlers, adding ours is harmless because
 * each event-emitter dispatch invokes all listeners.
 */
export function installStdioErrorListeners(stdout: Writable, stderr: Writable): void {
  const onStreamError = (error: unknown): void => {
    // The listener absorbs the error to keep it from bubbling to uncaughtException.
    // On a transient pipe error, also silence the console transport so subsequent
    // log calls don't reopen the wound.
    silenceConsoleTransportOnPipeError(error);
  };

  stdout.on('error', onStreamError);
  stderr.on('error', onStreamError);
}
