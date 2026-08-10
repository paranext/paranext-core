import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { describe, expect, it, vi } from 'vitest';
import { performDebouncedPdpSave, resolveUsjToSaveToPdp } from './debounced-pdp-save.util';

const usjWith = (text: string): Usj => ({
  type: 'USJ',
  version: '3.1',
  content: [{ type: 'para', marker: 'p', content: [text] }],
});

const scheduledUsj = usjWith('content typed for the scheduled chapter');
const freshEditorUsj = usjWith('post-commit editor content');

describe('performDebouncedPdpSave', () => {
  // The core Fix 2 invariant: when the active chapter changed between scheduling and firing (a
  // pending trailing save flushed during chapter navigation), the editor now holds a DIFFERENT
  // chapter. The save must go to the chapter the content was typed in — via the captured save fn
  // and captured content — and must NOT read the (now different-chapter) editor or use the current
  // chapter's save fn. This makes chapter-safety a property of the captured payload, independent of
  // React effect ordering.
  it('saves the captured content via the captured save fn when the chapter changed, without touching the editor', () => {
    const capturedSave = vi.fn();
    const latestSave = vi.fn();
    const getEditorUsj = vi.fn(() => freshEditorUsj);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|2',
      capturedSave,
      latestSave,
      getEditorUsj,
    });

    expect(capturedSave).toHaveBeenCalledWith(scheduledUsj);
    expect(latestSave).not.toHaveBeenCalled();
    expect(getEditorUsj).not.toHaveBeenCalled(); // never reads the wrong chapter's editor content
  });

  // Same chapter, no palette: save what the editor shows. The editor's getUsj() is already SETTLED,
  // so the save path never mutates the document to make it so — a pre-save commit would push an undo
  // entry and could re-settle content the user just undid.
  it('saves the settled editor content via the latest save fn on the same chapter', () => {
    const capturedSave = vi.fn();
    const latestSave = vi.fn();
    const getEditorUsj = vi.fn(() => freshEditorUsj);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave,
      latestSave,
      getEditorUsj,
    });

    expect(getEditorUsj).toHaveBeenCalled();
    expect(latestSave).toHaveBeenCalledWith(freshEditorUsj);
    expect(capturedSave).not.toHaveBeenCalled();
  });

  // Same chapter, but the editor is gone (unmount flush): fall back to the captured USJ.
  it('falls back to the scheduled content when the editor has no USJ to read', () => {
    const latestSave = vi.fn();
    const getEditorUsj = vi.fn(() => undefined);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      getEditorUsj,
    });

    expect(latestSave).toHaveBeenCalledWith(scheduledUsj);
  });
});

// Regression pins for a Critical review finding on the transient-input fix: `usj` is now
// contracted to be the SETTLED, transient-excluded snapshot as of scheduling (captured by the
// caller, `handleEditorialUsjChange` in `platform-scripture-editor.web-view.tsx`, via
// `EditorRef.getUsj()` — not the raw `onUsjChange` payload). Before that caller-side fix, typing
// `\f` (a passive backslash palette session) and switching chapters before the 700ms debounce
// fired forced one of the two paths below with the RAW, un-excluded snapshot, writing the bare
// `\f` literal to the PDP — the exact garbage-paragraph corruption (ParatextData tokenizes an
// unrecognized marker in body text as a paragraph) the deleted string-stripping used to guard
// against. This module has no palette awareness of its own; these tests pin that BOTH paths that
// cannot re-read the editor at fire time replay the scheduled `usj` byte-for-byte, so a caller that
// upholds the settled/excluded contract can never have a trigger literal reappear here.
describe('performDebouncedPdpSave — settled-snapshot replay (no re-derivation of the scheduled usj)', () => {
  // The exact repro this pins: cross-chapter flush racing an open palette session. `usj` here
  // stands in for what `EditorRef.getUsj()` returns once `EditorRef.setTransientInput` has
  // declared the session's `\f` — i.e. already settled with the trigger excluded — so the fix
  // requires this branch to pass it straight through untouched.
  it('replays the settled, transient-excluded scheduled snapshot on a cross-chapter flush — no trigger literal reaches the PDP', () => {
    const capturedSave = vi.fn();
    const settledSnapshotWithLiteralExcluded = usjWith('Den God tell, more text');

    performDebouncedPdpSave({
      usj: settledSnapshotWithLiteralExcluded,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|2',
      capturedSave,
      latestSave: vi.fn(),
      getEditorUsj: vi.fn(),
    });

    expect(capturedSave).toHaveBeenCalledWith(settledSnapshotWithLiteralExcluded);
    expect(JSON.stringify(capturedSave.mock.calls[0][0])).not.toContain('\\f');
  });

  // The second replay path that cannot re-read the editor at fire time: same chapter, but the
  // editor is gone (unmount flush). Falls back to the scheduled `usj` — which, under the same
  // fixed contract, is already the settled, transient-excluded snapshot, so this fallback carries
  // the same guarantee as the cross-chapter branch above.
  it('falls back to the settled, transient-excluded scheduled snapshot when the editor has no USJ to read — no trigger literal reaches the PDP', () => {
    const latestSave = vi.fn();
    const settledSnapshotWithLiteralExcluded = usjWith('Den God tell, more text');

    performDebouncedPdpSave({
      usj: settledSnapshotWithLiteralExcluded,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      getEditorUsj: vi.fn(() => undefined),
    });

    expect(latestSave).toHaveBeenCalledWith(settledSnapshotWithLiteralExcluded);
    expect(JSON.stringify(latestSave.mock.calls[0][0])).not.toContain('\\f');
  });

  // Ordinary same-chapter flush, editor present: unaffected by this fix — still reads the LIVE
  // editor at fire time (fresher than the scheduled snapshot), which is itself already settled and
  // transient-excluded per `EditorRef.getUsj`'s own contract. Re-asserted here alongside the two
  // replay-path pins above so all three same-chapter/cross-chapter branches are covered in one
  // place.
  it('still reads the live editor (not the scheduled snapshot) on an ordinary same-chapter flush', () => {
    const latestSave = vi.fn();
    const getEditorUsj = vi.fn(() => freshEditorUsj);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      getEditorUsj,
    });

    expect(getEditorUsj).toHaveBeenCalled();
    expect(latestSave).toHaveBeenCalledWith(freshEditorUsj);
  });
});

describe('resolveUsjToSaveToPdp', () => {
  it('returns undefined when the editor content matches the PDP except for whitespace', () => {
    expect(resolveUsjToSaveToPdp(usjWith('tell them'), usjWith('tell  them'))).toBeUndefined();
  });

  it('returns the editor content when it differs from the PDP', () => {
    expect(resolveUsjToSaveToPdp(usjWith('tell them'), usjWith('tell us'))).toEqual(
      usjWith('tell them'),
    );
  });
});
