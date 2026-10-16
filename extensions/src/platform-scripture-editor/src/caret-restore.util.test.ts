import type { SelectionRange } from '@eten-tech-foundation/platform-editor';
import { describe, expect, it, vi } from 'vitest';
import {
  CaretRestoreEditor,
  CaretRestoreResult,
  CaretRestoreTimers,
  scheduleCaretRestore,
} from './caret-restore.util';

const TARGET: SelectionRange = { start: { jsonPath: '$.content[0].content[0]', offset: 4 } };
const ELSEWHERE: SelectionRange = { start: { jsonPath: '$.content[17].content[3]', offset: 141 } };

/**
 * A clock and timer queue the tests step by hand, so a restore that waits on a load can be driven
 * through that wait without one.
 */
function fakeTimers() {
  let now = 0;
  const queue = new Map<number, { runAtMs: number; callback: () => void }>();
  let nextHandle = 1;
  const timers: CaretRestoreTimers<number> = {
    now: () => now,
    setTimeout: (callback, delayMs) => {
      const handle = nextHandle;
      nextHandle += 1;
      queue.set(handle, { runAtMs: now + delayMs, callback });
      return handle;
    },
    clearTimeout: (handle) => {
      queue.delete(handle);
    },
  };
  /** Runs every timer due at or before `now + byMs`, as a real timer queue would. */
  const advance = (byMs: number) => {
    const until = now + byMs;
    let due = [...queue.entries()].filter(([, timer]) => timer.runAtMs <= until);
    while (due.length > 0) {
      const [handle, timer] = due[0];
      queue.delete(handle);
      now = Math.max(now, timer.runAtMs);
      timer.callback();
      due = [...queue.entries()].filter(([, entry]) => entry.runAtMs <= until);
    }
    now = until;
  };
  return { timers, advance, pendingCount: () => queue.size };
}

/**
 * An editor that reports the document as loaded only from `loadsAfterMs`, and accepts a placement
 * only then — the behaviour that makes a fixed-delay restore a race: before the load,
 * `setSelection` changes nothing and says nothing.
 */
function fakeEditor({
  loadsAfterMs = 0,
  now,
  selectionBeforeLoad = ELSEWHERE,
}: {
  loadsAfterMs?: number;
  now: () => number;
  selectionBeforeLoad?: SelectionRange | undefined;
}) {
  let selection: SelectionRange | undefined = selectionBeforeLoad;
  const isLoaded = () => now() >= loadsAfterMs;
  const editor: CaretRestoreEditor = {
    hasLoadedDocument: vi.fn(isLoaded),
    setSelection: vi.fn((next: SelectionRange) => {
      if (isLoaded()) selection = next;
    }),
    getSelection: vi.fn(() => selection),
    focus: vi.fn(),
  };
  return { editor, getSelection: () => selection };
}

describe('scheduleCaretRestore', () => {
  it('places the caret once the editor has the document, and focuses only then', () => {
    const { timers, advance } = fakeTimers();
    const { editor, getSelection } = fakeEditor({ loadsAfterMs: 300, now: timers.now });
    const settled: CaretRestoreResult[] = [];

    scheduleCaretRestore({
      target: TARGET,
      editor,
      isStillWanted: () => true,
      onSettled: (result) => settled.push(result),
      timers,
    });

    // Through the whole load, the caret is left where it was and the editor is never focused —
    // focusing an editor with no selection is what puts the caret at the end of the document.
    advance(250);
    expect(getSelection()).toBe(ELSEWHERE);
    expect(editor.focus).not.toHaveBeenCalled();
    expect(settled).toEqual([]);

    advance(100);
    expect(getSelection()).toBe(TARGET);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(settled).toEqual([{ outcome: 'restored' }]);
  });

  it('places the caret on the first attempt when the document is already loaded', () => {
    const { timers, advance } = fakeTimers();
    const { editor, getSelection } = fakeEditor({ now: timers.now });
    scheduleCaretRestore({ target: TARGET, editor, isStillWanted: () => true, timers });

    advance(50);
    expect(getSelection()).toBe(TARGET);
    expect(editor.setSelection).toHaveBeenCalledTimes(1);
  });

  // The editor reads a caret at the very start of a paragraph whose marker is shown back as that
  // paragraph's marker location, which carries no offset. Taken as a failed placement, it would be
  // re-applied every 50 ms for the whole window, snapping back any caret the user moved.
  it('accepts a paragraph-start placement the editor reads back as the marker location', () => {
    const { timers, advance, pendingCount } = fakeTimers();
    const paragraphStart: SelectionRange = { start: { jsonPath: '$.content[3]', offset: 0 } };
    const editor: CaretRestoreEditor = {
      hasLoadedDocument: () => true,
      setSelection: vi.fn(),
      getSelection: () => ({ start: { jsonPath: '$.content[3]' } }),
      focus: vi.fn(),
    };
    const settled: CaretRestoreResult[] = [];

    scheduleCaretRestore({
      target: paragraphStart,
      editor,
      isStillWanted: () => true,
      onSettled: (result) => settled.push(result),
      timers,
    });

    advance(50);
    expect(editor.setSelection).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(settled).toEqual([{ outcome: 'restored' }]);
    expect(pendingCount()).toBe(0);
  });

  it('does not take a marker location on another paragraph for the placement', () => {
    const { timers, advance } = fakeTimers();
    const editor: CaretRestoreEditor = {
      hasLoadedDocument: () => true,
      setSelection: vi.fn(),
      getSelection: () => ({ start: { jsonPath: '$.content[4]' } }),
      focus: vi.fn(),
    };

    scheduleCaretRestore({
      target: { start: { jsonPath: '$.content[3]', offset: 0 } },
      editor,
      isStillWanted: () => true,
      timers,
    });

    advance(200);
    expect(editor.focus).not.toHaveBeenCalled();
  });

  // With no target the caret belongs at the end of the document, which focusing a freshly loaded
  // editor gives it — but only once the load has happened: focused against the outgoing document,
  // the caret stays where the user was typing and is then lost to the load.
  it('with no target, only focuses, and only once the document has loaded', () => {
    const { timers, advance } = fakeTimers();
    const { editor, getSelection } = fakeEditor({ loadsAfterMs: 300, now: timers.now });
    const settled: CaretRestoreResult[] = [];

    scheduleCaretRestore({
      target: undefined,
      editor,
      isStillWanted: () => true,
      onSettled: (result) => settled.push(result),
      timers,
    });

    advance(250);
    expect(editor.focus).not.toHaveBeenCalled();

    advance(100);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.setSelection).not.toHaveBeenCalled();
    expect(getSelection()).toBe(ELSEWHERE);
    expect(settled).toEqual([{ outcome: 'restored' }]);
  });

  // The editor can report the document loaded while the placement still does not take. A single
  // attempt would then leave the caret at the end of the chapter — where the user's next Backspace
  // deletes text far from where they were working.
  it('retries a placement that does not take', () => {
    const { timers, advance } = fakeTimers();
    let accepts = false;
    let selection: SelectionRange | undefined = ELSEWHERE;
    const editor: CaretRestoreEditor = {
      hasLoadedDocument: () => true,
      setSelection: (next) => {
        if (accepts) selection = next;
      },
      getSelection: () => selection,
      focus: vi.fn(),
    };
    const settled: CaretRestoreResult[] = [];

    scheduleCaretRestore({
      target: TARGET,
      editor,
      isStillWanted: () => true,
      onSettled: (result) => settled.push(result),
      timers,
    });

    advance(200);
    expect(selection).toBe(ELSEWHERE);
    expect(editor.focus).not.toHaveBeenCalled();

    accepts = true;
    advance(50);
    expect(selection).toBe(TARGET);
    expect(settled).toEqual([{ outcome: 'restored' }]);
  });

  it('gives up rather than retrying forever, and says so', () => {
    const { timers, advance, pendingCount } = fakeTimers();
    const { editor } = fakeEditor({ loadsAfterMs: Number.MAX_SAFE_INTEGER, now: timers.now });
    const settled: CaretRestoreResult[] = [];

    scheduleCaretRestore({
      target: TARGET,
      editor,
      isStillWanted: () => true,
      onSettled: (result) => settled.push(result),
      timers,
    });

    advance(5000);
    expect(settled).toEqual([{ outcome: 'abandoned' }]);
    expect(editor.focus).not.toHaveBeenCalled();
    expect(pendingCount()).toBe(0);
  });

  // The caret must not appear in an editor the user has left: the restore focuses it, which would
  // take them back out of whatever they moved to.
  it('stops when the restore is no longer wanted', () => {
    const { timers, advance, pendingCount } = fakeTimers();
    const { editor, getSelection } = fakeEditor({ now: timers.now });
    let wanted = true;

    scheduleCaretRestore({ target: TARGET, editor, isStillWanted: () => wanted, timers });
    wanted = false;
    advance(1000);

    expect(getSelection()).toBe(ELSEWHERE);
    expect(editor.focus).not.toHaveBeenCalled();
    expect(pendingCount()).toBe(0);
  });

  it('stops when cancelled, so a second repair replaces the first', () => {
    const { timers, advance, pendingCount } = fakeTimers();
    const { editor, getSelection } = fakeEditor({ loadsAfterMs: 300, now: timers.now });

    const restore = scheduleCaretRestore({
      target: TARGET,
      editor,
      isStillWanted: () => true,
      timers,
    });
    advance(100);
    restore.cancel();
    restore.cancel();
    advance(1000);

    expect(getSelection()).toBe(ELSEWHERE);
    expect(pendingCount()).toBe(0);
  });

  it('stops on an editor that throws, and hands the error back', () => {
    const { timers, advance, pendingCount } = fakeTimers();
    const thrown = new Error('editor is gone');
    const editor: CaretRestoreEditor = {
      hasLoadedDocument: () => true,
      setSelection: () => {
        throw thrown;
      },
      getSelection: () => undefined,
      focus: vi.fn(),
    };
    const settled: CaretRestoreResult[] = [];

    scheduleCaretRestore({
      target: TARGET,
      editor,
      isStillWanted: () => true,
      onSettled: (result) => settled.push(result),
      timers,
    });
    advance(100);

    expect(settled).toEqual([{ outcome: 'abandoned', error: thrown }]);
    expect(pendingCount()).toBe(0);
  });
});
