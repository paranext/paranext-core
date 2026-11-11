import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { describe, expect, it, vi } from 'vitest';
import {
  createPendingSaveSlot,
  PendingPdpSave,
  recordSentUsjForShownChapter,
  revertEditorAfterRefusedSave,
  sendPendingSaves,
} from './pending-save-slot.util';

function usjOf(text: string): Usj {
  return { type: 'USJ', version: '3.1', content: [text] };
}

async function flushMicrotasks(remainingTicks = 20): Promise<void> {
  if (remainingTicks === 0) return;
  await Promise.resolve();
  await flushMicrotasks(remainingTicks - 1);
}

/**
 * Real slot and real drain, with the pieces around them the web view supplies faked: a write that
 * takes the in-flight flag, is held when the flag is taken, and drains the slot when it settles.
 */
function createHarness(options: {
  currentChapterKey: string;
  editor: Usj | undefined;
  lastSent?: Usj;
}) {
  const state = { ...options };
  const isWritingRef = { current: false };
  const slot = createPendingSaveSlot<PendingPdpSave>(isWritingRef);
  const sent: Array<{ chapterKey: string; usj: Usj }> = [];
  const pendingSettles: Array<() => void> = [];

  function drain() {
    return sendPendingSaves({
      slot,
      getEditorUsj: () => state.editor,
      getLastSentUsj: () => state.lastSent,
      getCurrentChapterKey: () => state.currentChapterKey,
      getLatestSave: () => (usj) =>
        usj ? guardedWrite(state.currentChapterKey, usj) : Promise.resolve(false),
      logger: { debug: vi.fn(), error: vi.fn() },
    });
  }

  async function guardedWrite(chapterKey: string, usj: Usj): Promise<boolean> {
    if (isWritingRef.current) {
      slot.hold({ chapterKey, usj, write: (held) => guardedWrite(chapterKey, held) });
      return false;
    }
    isWritingRef.current = true;
    state.lastSent = usj;
    sent.push({ chapterKey, usj });
    try {
      await new Promise<void>((resolve) => {
        pendingSettles.push(resolve);
      });
    } finally {
      isWritingRef.current = false;
    }
    drain().catch(() => undefined);
    return true;
  }

  async function settleNext() {
    pendingSettles.shift()?.();
    await flushMicrotasks();
  }

  /** Starts a drain without waiting for the write it starts to settle, which the test controls. */
  async function startDrain() {
    drain().catch(() => undefined);
    await flushMicrotasks();
  }

  return { state, slot, isWritingRef, sent, guardedWrite, startDrain, settleNext };
}

describe('createPendingSaveSlot', () => {
  it('keeps one save per chapter, latest wins, and hands them out oldest chapter first', () => {
    const isWritingRef = { current: false };
    const slot = createPendingSaveSlot<PendingPdpSave>(isWritingRef);
    const write = vi.fn();
    slot.hold({ chapterKey: 'A', usj: usjOf('a1'), write });
    slot.hold({ chapterKey: 'B', usj: usjOf('b1'), write });
    slot.hold({ chapterKey: 'A', usj: usjOf('a2'), write });

    expect(slot.takeNextIfIdle()?.usj).toEqual(usjOf('b1'));
    expect(slot.takeNextIfIdle()?.usj).toEqual(usjOf('a2'));
    expect(slot.takeNextIfIdle()).toBeUndefined();
  });

  it('keeps everything it holds while a write is in flight', () => {
    const isWritingRef = { current: true };
    const slot = createPendingSaveSlot<PendingPdpSave>(isWritingRef);
    slot.hold({ chapterKey: 'A', usj: usjOf('a1'), write: vi.fn() });

    expect(slot.takeNextIfIdle()).toBeUndefined();
    isWritingRef.current = false;
    expect(slot.takeNextIfIdle()?.usj).toEqual(usjOf('a1'));
  });
});

describe('sendPendingSaves', () => {
  it('same chapter, editor newer than what was sent: sends one save carrying the last edit', async () => {
    const harness = createHarness({
      currentChapterKey: 'A',
      editor: usjOf('edit 3'),
      lastSent: usjOf('edit 1'),
    });
    harness.slot.hold({
      chapterKey: 'A',
      usj: usjOf('edit 2'),
      write: (usj) => harness.guardedWrite('A', usj),
    });

    await harness.startDrain();
    await harness.settleNext();

    expect(harness.sent).toEqual([{ chapterKey: 'A', usj: usjOf('edit 3') }]);
  });

  it('same chapter, editor back to what was last sent: sends nothing', async () => {
    const harness = createHarness({
      currentChapterKey: 'A',
      editor: usjOf('edit 1'),
      lastSent: usjOf('edit 1'),
    });
    harness.slot.hold({
      chapterKey: 'A',
      usj: usjOf('edit 2'),
      write: (usj) => harness.guardedWrite('A', usj),
    });

    await harness.startDrain();

    expect(harness.sent).toEqual([]);
  });

  it('another chapter held: sends the held document through its own bound write', async () => {
    const harness = createHarness({
      currentChapterKey: 'B',
      editor: usjOf('chapter B text'),
      lastSent: usjOf('chapter B text'),
    });
    harness.slot.hold({
      chapterKey: 'A',
      usj: usjOf('chapter A flush'),
      write: (usj) => harness.guardedWrite('A', usj),
    });

    await harness.startDrain();

    expect(harness.sent).toEqual([{ chapterKey: 'A', usj: usjOf('chapter A flush') }]);
  });

  it('two chapters held: sends both, one after the other', async () => {
    const harness = createHarness({
      currentChapterKey: 'C',
      editor: usjOf('chapter C text'),
      lastSent: usjOf('chapter C text'),
    });
    harness.slot.hold({
      chapterKey: 'A',
      usj: usjOf('a'),
      write: (usj) => harness.guardedWrite('A', usj),
    });
    harness.slot.hold({
      chapterKey: 'B',
      usj: usjOf('b'),
      write: (usj) => harness.guardedWrite('B', usj),
    });

    await harness.startDrain();
    expect(harness.sent.map((save) => save.chapterKey)).toEqual(['A']);
    await harness.settleNext();

    expect(harness.sent.map((save) => save.chapterKey)).toEqual(['A', 'B']);
  });

  it('editor gone: sends the held document', async () => {
    const harness = createHarness({
      currentChapterKey: 'A',
      editor: undefined,
      lastSent: usjOf('edit 1'),
    });
    harness.slot.hold({
      chapterKey: 'A',
      usj: usjOf('edit 2'),
      write: (usj) => harness.guardedWrite('A', usj),
    });

    await harness.startDrain();

    expect(harness.sent).toEqual([{ chapterKey: 'A', usj: usjOf('edit 2') }]);
  });

  it('ignores a zero-width no-break space the editor holds when comparing with what was sent', async () => {
    const harness = createHarness({
      currentChapterKey: 'A',
      editor: usjOf('edit﻿ 1'),
      lastSent: usjOf('edit 1'),
    });
    harness.slot.hold({
      chapterKey: 'A',
      usj: usjOf('edit 1'),
      write: (usj) => harness.guardedWrite('A', usj),
    });

    await harness.startDrain();

    expect(harness.sent).toEqual([]);
  });

  it('a follow-up that is itself blocked is held again and sent once, with no loop', async () => {
    const harness = createHarness({
      currentChapterKey: 'A',
      editor: usjOf('edit 2'),
      lastSent: usjOf('edit 1'),
    });
    // A write is in flight when edit 2 arrives, so it is held.
    harness.isWritingRef.current = true;
    harness.slot.hold({
      chapterKey: 'A',
      usj: usjOf('edit 2'),
      write: (usj) => harness.guardedWrite('A', usj),
    });
    harness.isWritingRef.current = false;

    await harness.startDrain();
    expect(harness.sent).toEqual([{ chapterKey: 'A', usj: usjOf('edit 2') }]);

    // The follow-up is in flight; the user types again and that save is blocked and held.
    harness.state.editor = usjOf('edit 3');
    await harness.guardedWrite('A', usjOf('edit 3'));
    expect(harness.sent).toHaveLength(1);

    await harness.settleNext();
    expect(harness.sent).toEqual([
      { chapterKey: 'A', usj: usjOf('edit 2') },
      { chapterKey: 'A', usj: usjOf('edit 3') },
    ]);

    await harness.settleNext();
    await flushMicrotasks();
    expect(harness.sent).toHaveLength(2);
    expect(harness.slot.takeNextIfIdle()).toBeUndefined();
  });

  it('logs and carries on when a send throws', async () => {
    const isWritingRef = { current: false };
    const slot = createPendingSaveSlot<PendingPdpSave>(isWritingRef);
    const error = vi.fn();
    const goodWrite = vi.fn().mockResolvedValue(true);
    slot.hold({
      chapterKey: 'A',
      usj: usjOf('a'),
      write: () => Promise.reject(new Error('boom')),
    });
    slot.hold({ chapterKey: 'B', usj: usjOf('b'), write: goodWrite });

    await sendPendingSaves({
      slot,
      getEditorUsj: () => undefined,
      getLastSentUsj: () => undefined,
      getCurrentChapterKey: () => 'C',
      getLatestSave: () => undefined,
      logger: { debug: vi.fn(), error },
    });

    expect(error).toHaveBeenCalledWith(expect.stringContaining('boom'));
    expect(goodWrite).toHaveBeenCalledWith(usjOf('b'));
  });
});

describe('recordSentUsjForShownChapter', () => {
  it('records the baseline for the chapter on screen', () => {
    const sentRef: { current: Usj | undefined } = { current: usjOf('old') };
    expect(recordSentUsjForShownChapter(sentRef, usjOf('new'), 'A', 'A')).toBe(true);
    expect(sentRef.current).toEqual(usjOf('new'));
  });

  it('leaves the baseline alone for a write to another chapter', () => {
    const sentRef: { current: Usj | undefined } = { current: usjOf('chapter B baseline') };
    expect(recordSentUsjForShownChapter(sentRef, usjOf('chapter A flush'), 'A', 'B')).toBe(false);
    expect(sentRef.current).toEqual(usjOf('chapter B baseline'));
  });

  it('does not treat the same chapter number in another project as the shown chapter', () => {
    const sentRef: { current: Usj | undefined } = { current: undefined };
    expect(
      recordSentUsjForShownChapter(sentRef, usjOf('x'), 'projectA:JON 3', 'projectB:JON 3'),
    ).toBe(false);
    expect(sentRef.current).toBeUndefined();
  });
});

describe('revertEditorAfterRefusedSave', () => {
  function setup(saveChapterKey: string, shownChapterKey: string) {
    const sentRef: { current: Usj | undefined } = { current: usjOf('sent') };
    const setEditorUsj = vi.fn();
    const reverted = revertEditorAfterRefusedSave({
      saveChapterKey,
      shownChapterKey,
      usjFromPdp: usjOf('from pdp'),
      hasEditor: true,
      sentRef,
      setEditorUsj,
    });
    return { sentRef, setEditorUsj, reverted };
  }

  it('puts the PDP document back for the chapter on screen', () => {
    const { sentRef, setEditorUsj, reverted } = setup('A', 'A');
    expect(reverted).toBe(true);
    expect(setEditorUsj).toHaveBeenCalledWith(usjOf('from pdp'));
    expect(sentRef.current).toEqual(usjOf('from pdp'));
  });

  it('does not touch the editor or the baseline for another chapter', () => {
    const { sentRef, setEditorUsj, reverted } = setup('A', 'B');
    expect(reverted).toBe(false);
    expect(setEditorUsj).not.toHaveBeenCalled();
    expect(sentRef.current).toEqual(usjOf('sent'));
  });

  it('does nothing without a PDP document or an editor', () => {
    const setEditorUsj = vi.fn();
    const sentRef: { current: Usj | undefined } = { current: usjOf('sent') };
    const base = { saveChapterKey: 'A', shownChapterKey: 'A', sentRef, setEditorUsj };
    expect(revertEditorAfterRefusedSave({ ...base, usjFromPdp: undefined, hasEditor: true })).toBe(
      false,
    );
    expect(
      revertEditorAfterRefusedSave({ ...base, usjFromPdp: usjOf('p'), hasEditor: false }),
    ).toBe(false);
    expect(setEditorUsj).not.toHaveBeenCalled();
  });
});
