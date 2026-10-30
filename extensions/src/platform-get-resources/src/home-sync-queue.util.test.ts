import { describe, expect, it } from 'vitest';
import {
  getRowSyncState,
  isCommandNotRegisteredError,
  isSyncRequestRemovedError,
} from './home-sync-queue.util';

describe('getRowSyncState', () => {
  const RUNNING = new Set(['RUN', 'BOTH']);
  const WAITING = new Set(['WAIT', 'BOTH']);

  it.each([
    ['idle', 'IDLE', 'idle'],
    ['running', 'RUN', 'running'],
    ['waiting', 'WAIT', 'waiting'],
    // Clicking a running project again queues it for the next run, which is what the row reports.
    ['running and waiting for the next run', 'BOTH', 'waiting'],
    ['running, spelled in another case', 'run', 'running'],
    ['waiting, spelled in another case', 'wait', 'waiting'],
  ])('row sync state: running / waiting / idle precedence — %s', (_case, projectId, expected) => {
    expect(getRowSyncState(projectId, RUNNING, WAITING)).toBe(expected);
  });
});

describe('isSyncRequestRemovedError', () => {
  it('recognizes the removed-from-queue rejection, transport prefix and all', () => {
    expect(
      isSyncRequestRemovedError(
        new Error('JSON-RPC Request error (-32000): Removed from the sync queue (SR_REMOVED)'),
      ),
    ).toBe(true);
    expect(isSyncRequestRemovedError('Removed from the sync queue (SR_REMOVED)')).toBe(true);
  });

  it('does not take any other failure for a removal', () => {
    expect(isSyncRequestRemovedError(new Error('Project is locked by another user'))).toBe(false);
    expect(isSyncRequestRemovedError(new Error('write refused (SR_EDIT_BLOCKED)'))).toBe(false);
    expect(isSyncRequestRemovedError(undefined)).toBe(false);
  });
});

describe('isCommandNotRegisteredError', () => {
  const COMMAND = 'paratextBibleSendReceive.requestSync';

  it('recognizes a method-not-found rejection that names the command', () => {
    expect(
      isCommandNotRegisteredError(
        new Error(`JSON-RPC Request error (-32601): Method not found: ${COMMAND}`),
        COMMAND,
      ),
    ).toBe(true);
  });

  it('does not take a different command, a different code, or a plain failure for it', () => {
    expect(
      isCommandNotRegisteredError(
        new Error('JSON-RPC Request error (-32601): Method not found: other.command'),
        COMMAND,
      ),
    ).toBe(false);
    expect(
      isCommandNotRegisteredError(
        new Error(`JSON-RPC Request error (-32000): ${COMMAND}`),
        COMMAND,
      ),
    ).toBe(false);
    expect(isCommandNotRegisteredError(new Error('Project is locked'), COMMAND)).toBe(false);
  });
});
