import { describe, expect, it } from 'vitest';
import { createPendingSaveSlot } from './pending-save-slot.util';
import { withWriteInFlightGuard } from './write-in-flight-guard.util';

/** A write the test settles by hand. */
function createControlledWrite() {
  let settle: () => void = () => undefined;
  const promise = new Promise<void>((resolve) => {
    settle = resolve;
  });
  return { promise, settle: () => settle() };
}

/**
 * The same wiring the editor's save uses: one write at a time under the in-flight guard, a save
 * that finds it taken is held in the slot, and the slot is drained when the write settles. The
 * follow-up reads the editor as it is then (`readEditor`), as the editor's does.
 */
function createSaver(readEditor: () => string) {
  const isWritingRef = { current: false };
  const slot = createPendingSaveSlot<string>(isWritingRef);
  const sent: string[] = [];
  const writes: Array<ReturnType<typeof createControlledWrite>> = [];
  let lastSent: string | undefined;

  async function save(content: string): Promise<void> {
    try {
      const outcome = await withWriteInFlightGuard(isWritingRef, () => {
        lastSent = content;
        sent.push(content);
        const write = createControlledWrite();
        writes.push(write);
        return write.promise;
      });
      if (!outcome.ran) slot.hold(content);
    } finally {
      const pending = slot.takeIfIdle();
      if (pending !== undefined && readEditor() !== lastSent) save(readEditor()).catch(() => {});
    }
  }

  return { save, sent, writes, isWritingRef };
}

describe('createPendingSaveSlot', () => {
  it('sends exactly one more save, carrying the last edit, when saves arrive during a write', async () => {
    let editor = 'edit 1';
    const { save, sent, writes } = createSaver(() => editor);

    const first = save(editor);
    expect(sent).toEqual(['edit 1']);

    editor = 'edit 2';
    await save(editor);
    editor = 'edit 3';
    await save(editor);
    expect(sent).toEqual(['edit 1']);

    writes[0].settle();
    await first;
    await Promise.resolve();

    expect(sent).toEqual(['edit 1', 'edit 3']);
    writes[1].settle();
    await Promise.resolve();
    expect(sent).toEqual(['edit 1', 'edit 3']);
  });

  it('sends nothing more when the editor is back to what was last sent', async () => {
    let editor = 'edit 1';
    const { save, sent, writes } = createSaver(() => editor);

    const first = save(editor);
    editor = 'edit 2';
    await save(editor);
    editor = 'edit 1';

    writes[0].settle();
    await first;
    await Promise.resolve();

    expect(sent).toEqual(['edit 1']);
  });

  it('keeps what it holds while a write is still in flight, and replaces it with the latest', () => {
    const isWritingRef = { current: true };
    const slot = createPendingSaveSlot<string>(isWritingRef);

    slot.hold('first');
    slot.hold('second');
    expect(slot.takeIfIdle()).toBeUndefined();

    isWritingRef.current = false;
    expect(slot.takeIfIdle()).toBe('second');
    expect(slot.takeIfIdle()).toBeUndefined();
  });
});
