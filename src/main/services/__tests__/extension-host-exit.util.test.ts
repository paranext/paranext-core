import { describe, expect, it } from 'vitest';
import { EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE } from '@node/models/interprocess-messages.model';
import { classifyExtensionHostExit } from '@main/services/extension-host-exit.util';

// The child process `exit` event reports an absent signal as null.
// eslint-disable-next-line no-null/no-null
const NO_SIGNAL = null;
// The child process `exit` event reports an absent exit code as null.
// eslint-disable-next-line no-null/no-null
const NO_CODE = null;

const notRequested = { isStopRequested: false, isAppShuttingDown: false };

describe('classifyExtensionHostExit', () => {
  it('reports lost-connection for the dedicated exit code', () => {
    expect(
      classifyExtensionHostExit({
        code: EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
        signal: NO_SIGNAL,
        ...notRequested,
      }),
    ).toEqual({ reason: 'lost-connection' });
  });

  it('reports crashed for any other exit code', () => {
    expect(classifyExtensionHostExit({ code: 1, signal: NO_SIGNAL, ...notRequested })).toEqual({
      reason: 'crashed',
    });
    expect(classifyExtensionHostExit({ code: 0, signal: NO_SIGNAL, ...notRequested })).toEqual({
      reason: 'crashed',
    });
  });

  it('reports crashed for a signal', () => {
    expect(
      classifyExtensionHostExit({ code: NO_CODE, signal: 'SIGKILL', ...notRequested }),
    ).toEqual({ reason: 'crashed' });
  });

  // Only an exit the extension host chose itself carries meaning in its code.
  it('reports crashed for a signal even when the code equals the lost-connection code', () => {
    expect(
      classifyExtensionHostExit({
        code: EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
        signal: 'SIGTERM',
        ...notRequested,
      }),
    ).toEqual({ reason: 'crashed' });
  });

  it('reports nothing when main requested the stop', () => {
    expect(
      classifyExtensionHostExit({
        code: 0,
        signal: NO_SIGNAL,
        isStopRequested: true,
        isAppShuttingDown: false,
      }),
    ).toBeUndefined();
  });

  // A loss that lands while a requested restart is already tearing the process down is still a
  // requested stop; the user asked for a restart and is about to get one.
  it('a stop requested before the exit is classified as requested even if the code is the lost-connection code', () => {
    expect(
      classifyExtensionHostExit({
        code: EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
        signal: NO_SIGNAL,
        isStopRequested: true,
        isAppShuttingDown: false,
      }),
    ).toBeUndefined();
  });

  it('reports nothing while the app is shutting down', () => {
    expect(
      classifyExtensionHostExit({
        code: EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
        signal: NO_SIGNAL,
        isStopRequested: false,
        isAppShuttingDown: true,
      }),
    ).toBeUndefined();
  });
});
