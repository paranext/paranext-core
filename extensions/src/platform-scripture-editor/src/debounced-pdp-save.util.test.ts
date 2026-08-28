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

  // The chapter keys carry the versification alongside book|chapter (see `getChapterKey`), so a
  // versification change alone is a cross-chapter fire: the same book and chapter number
  // re-selected under a different versification is a DIFFERENT chapter document, and writing the
  // pending content through the new selector would target the wrong document.
  it('treats a versification-only key change as a chapter change (captured save fn, captured content)', () => {
    const capturedSave = vi.fn();
    const latestSave = vi.fn();
    const getEditorUsj = vi.fn(() => freshEditorUsj);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1|English',
      currentChapterKey: 'GEN|1|Septuagint',
      capturedSave,
      latestSave,
      getEditorUsj,
    });

    expect(capturedSave).toHaveBeenCalledWith(scheduledUsj);
    expect(latestSave).not.toHaveBeenCalled();
    expect(getEditorUsj).not.toHaveBeenCalled();
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

// Contract pins: `usj` is the SETTLED, transient-excluded snapshot as of scheduling (captured by
// the caller, `handleEditorialUsjChange` in `platform-scripture-editor.web-view.tsx`, via
// `EditorRef.getUsj()` — not the raw `onUsjChange` payload). A caller passing the RAW,
// un-excluded snapshot — e.g. typing `\f` (a passive backslash palette session) and switching
// chapters before the 700ms debounce fired — would force one of the two paths below to write the
// bare `\f` literal to the PDP: garbage-paragraph corruption, since ParatextData tokenizes an
// unrecognized marker in body text as a paragraph. This module has no palette awareness of its
// own; these tests pin that BOTH paths that cannot re-read the editor at fire time replay the
// scheduled `usj` byte-for-byte, so a caller that upholds the settled/excluded contract can never
// have a trigger literal reappear here.
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

// An UNDO must reach the file exactly the way typing does.
//
// Reported: a milestone marker was renamed (`\qt-s` -> `\qt1-s`), the rename saved, and then Ctrl+Z
// restored the original name on screen while the FILE kept the renamed one. The cause was on the
// editor side — an undo step that changed only engine-owned display bytes produced no delta ops, so
// `onUsjChange` never fired and nothing here was ever asked to save (the editor now notifies off the
// settled document on historic commits).
//
// This module is the save path that notification lands in, and it has no notion of where a change
// came from — which is precisely the property worth pinning: an undone document must flow through
// these two decision points identically to a typed one. If either the equality guard or the
// fire-time branch ever grew a notion of "user edit" that an undo failed to satisfy, the editor-side
// fix would be silently undone from this end.
describe('resolveUsjToSaveToPdp — an authored non-breaking space is a change', () => {
  it('saves when the user types `~` between two words', () => {
    // `~` is USFM's non-breaking space, so the editor's USJ carries U+00A0 where the PDP has a
    // plain space. Regularizing that away made the edit look like nothing had changed, so it sat
    // unsaved until some unrelated edit happened to push the whole paragraph out.
    const editor = usjWith('stuff \u00a0 things');

    expect(resolveUsjToSaveToPdp(editor, usjWith('stuff things'))).toEqual(editor);
  });

  it('still skips a save when only ordinary space runs differ', () => {
    expect(
      resolveUsjToSaveToPdp(usjWith('stuff \u00a0 things'), usjWith('stuff  \u00a0   things')),
    ).toBeUndefined();
  });
});

describe('an undone document reaches the PDP the same way a typed one does', () => {
  const milestoneUsj = (marker: string): Usj => ({
    type: 'USJ',
    version: '3.1',
    content: [
      { type: 'para', marker: 'p', content: ['before ', { type: 'ms', marker }, ' after'] },
    ],
  });

  const renamed = milestoneUsj('qt1-s'); // what the last save wrote to the file
  const undone = milestoneUsj('qt-s'); // what the editor shows after Ctrl+Z

  // The guard that decides whether to write at all. A marker rename is a real content difference,
  // not whitespace, so undoing one must NOT be swallowed as "same as what's on disk".
  it('does not suppress the write when an undo restored a different marker than the PDP holds', () => {
    expect(resolveUsjToSaveToPdp(undone, renamed)).toEqual(undone);
  });

  // And the symmetric direction, so the pin above cannot pass by the guard simply never suppressing.
  it('still suppresses the write when the undo left the document the PDP already holds', () => {
    expect(resolveUsjToSaveToPdp(undone, undone)).toBeUndefined();
  });

  // The fire-time branch. An undo commonly lands AFTER the keystroke that scheduled the debounce,
  // so the scheduled snapshot is the pre-undo document; reading the live editor is what lets the
  // undone bytes overtake it. Pins that the undone document — not the stale renamed snapshot — is
  // what gets saved.
  it('saves the live undone editor content, not the pre-undo snapshot captured at schedule time', () => {
    const latestSave = vi.fn();

    performDebouncedPdpSave({
      usj: renamed,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      getEditorUsj: vi.fn(() => undone),
    });

    expect(latestSave).toHaveBeenCalledWith(undone);
    expect(JSON.stringify(latestSave.mock.calls[0][0])).not.toContain('qt1-s');
  });

  // The equivalence the defect report asks for, stated directly: hand the save path a document that
  // arrived from an undo and one that arrived from typing, and the outcome is byte-identical.
  it('treats an undo-sourced document and a typed document identically', () => {
    const fromUndo = vi.fn();
    const fromTyping = vi.fn();
    const args = {
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
    };

    performDebouncedPdpSave({
      ...args,
      usj: renamed,
      latestSave: fromUndo,
      getEditorUsj: vi.fn(() => undone),
    });
    performDebouncedPdpSave({
      ...args,
      usj: renamed,
      latestSave: fromTyping,
      getEditorUsj: vi.fn(() => undone),
    });

    expect(fromUndo.mock.calls).toEqual(fromTyping.mock.calls);
    expect(resolveUsjToSaveToPdp(fromUndo.mock.calls[0][0], renamed)).toEqual(undone);
  });
});
