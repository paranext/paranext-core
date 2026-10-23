import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createSelectionTracker } from './selection-tracker.utils';

describe('createSelectionTracker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the reported selection without waiting', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    tracker.report('a');

    await expect(tracker.getSelection()).resolves.toBe('a');
  });

  it('resolves a waiting caller when the first report arrives', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    const pending = tracker.getSelection();

    tracker.report('a');

    await expect(pending).resolves.toBe('a');
  });

  it('resolves a waiting caller to undefined when the first report is no selection', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    const pending = tracker.getSelection();

    expect(tracker.report(undefined)).toBe(false);

    await expect(pending).resolves.toBeUndefined();
  });

  it('answers undefined, not a stale selection, once the editor reports none', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    tracker.report('a');

    expect(tracker.report(undefined)).toBe(true);

    await expect(tracker.getSelection()).resolves.toBeUndefined();
  });

  it('does not wait once the first report was no selection', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    tracker.report(undefined);

    await expect(tracker.getSelection()).resolves.toBeUndefined();
  });

  it('resolves to undefined rather than rejecting when no report arrives in time', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    const pending = tracker.getSelection();

    await vi.advanceTimersByTimeAsync(1000);

    await expect(pending).resolves.toBeUndefined();
  });

  it('waits again for the next caller after a timeout, and then sees a late report', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    const first = tracker.getSelection();
    await vi.advanceTimersByTimeAsync(1000);
    await first;

    const second = tracker.getSelection();
    tracker.report('late');

    await expect(second).resolves.toBe('late');
  });

  it('reports only real changes', () => {
    const tracker = createSelectionTracker<{ n: number }>('test', 1000);

    expect(tracker.report({ n: 1 })).toBe(true);
    expect(tracker.report({ n: 1 })).toBe(false);
    expect(tracker.report({ n: 2 })).toBe(true);
  });

  it('rejects a caller still waiting when disposed', async () => {
    const tracker = createSelectionTracker<string>('test', 1000);
    const pending = tracker.getSelection();

    tracker.dispose();

    await expect(pending).rejects.toBe('Disposed before first selection received');
  });
});
