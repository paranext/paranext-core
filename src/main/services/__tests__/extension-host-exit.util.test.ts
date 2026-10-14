// The child process `exit` event reports an absent code or signal as null
/* eslint-disable no-null/no-null */
import { describe, expect, it } from 'vitest';
import { EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE } from '@node/models/interprocess-messages.model';
import { classifyExtensionHostExit } from '@main/services/extension-host-exit.util';

const notRequested = { isStopRequested: false, isAppShuttingDown: false };

describe('classifyExtensionHostExit', () => {
  it('reports lost-connection for the dedicated exit code', () => {
    expect(
      classifyExtensionHostExit({
        code: EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
        signal: null,
        ...notRequested,
      }),
    ).toEqual({ reason: 'lost-connection' });
  });

  it('reports crashed for any other exit code', () => {
    expect(classifyExtensionHostExit({ code: 1, signal: null, ...notRequested })).toEqual({
      reason: 'crashed',
    });
    expect(classifyExtensionHostExit({ code: 0, signal: null, ...notRequested })).toEqual({
      reason: 'crashed',
    });
  });

  it('reports crashed for a signal', () => {
    expect(classifyExtensionHostExit({ code: null, signal: 'SIGKILL', ...notRequested })).toEqual({
      reason: 'crashed',
    });
  });

  it('reports nothing when main requested the stop', () => {
    expect(
      classifyExtensionHostExit({
        code: 0,
        signal: null,
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
        signal: null,
        isStopRequested: true,
        isAppShuttingDown: false,
      }),
    ).toBeUndefined();
  });

  it('reports nothing while the app is shutting down', () => {
    expect(
      classifyExtensionHostExit({
        code: EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
        signal: null,
        isStopRequested: false,
        isAppShuttingDown: true,
      }),
    ).toBeUndefined();
  });
});
