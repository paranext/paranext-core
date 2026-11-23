import { describe, expect, it } from 'vitest';
import { getRowSyncState } from './home-sync-queue.util';

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
