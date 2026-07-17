import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { describe, expect, it, vi } from 'vitest';
import { performDebouncedPdpSave } from './debounced-pdp-save.util';

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
    const commitPendingMarkerEdits = vi.fn();
    const getEditorUsj = vi.fn(() => freshEditorUsj);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|2',
      capturedSave,
      latestSave,
      isPaletteSessionOpen: false,
      commitPendingMarkerEdits,
      getEditorUsj,
    });

    expect(capturedSave).toHaveBeenCalledWith(scheduledUsj);
    expect(latestSave).not.toHaveBeenCalled();
    expect(commitPendingMarkerEdits).not.toHaveBeenCalled();
    expect(getEditorUsj).not.toHaveBeenCalled(); // never reads the wrong chapter's editor content
  });

  // Same chapter, marker-palette session open: the palette's apply must be the one to consume the
  // typed literal, so pending marker edits are NOT settled here; the scheduled content is saved via
  // the current chapter's save fn.
  it('saves the scheduled content via the latest save fn without settling markers when a palette session is open', () => {
    const capturedSave = vi.fn();
    const latestSave = vi.fn();
    const commitPendingMarkerEdits = vi.fn();
    const getEditorUsj = vi.fn(() => freshEditorUsj);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave,
      latestSave,
      isPaletteSessionOpen: true,
      commitPendingMarkerEdits,
      getEditorUsj,
    });

    expect(latestSave).toHaveBeenCalledWith(scheduledUsj);
    expect(commitPendingMarkerEdits).not.toHaveBeenCalled();
    expect(capturedSave).not.toHaveBeenCalled();
  });

  // Same chapter, no palette: settle pending marker edits, then save what the editor shows post-commit.
  it('settles markers then saves the fresh editor content via the latest save fn on the same chapter', () => {
    const capturedSave = vi.fn();
    const latestSave = vi.fn();
    const commitPendingMarkerEdits = vi.fn();
    const getEditorUsj = vi.fn(() => freshEditorUsj);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave,
      latestSave,
      isPaletteSessionOpen: false,
      commitPendingMarkerEdits,
      getEditorUsj,
    });

    expect(commitPendingMarkerEdits).toHaveBeenCalled();
    expect(latestSave).toHaveBeenCalledWith(freshEditorUsj);
    expect(capturedSave).not.toHaveBeenCalled();
  });

  // Same chapter, no palette, but the editor is gone (unmount flush): fall back to the captured USJ.
  it('falls back to the scheduled content when the editor has no USJ to read', () => {
    const latestSave = vi.fn();
    const getEditorUsj = vi.fn(() => undefined);

    performDebouncedPdpSave({
      usj: scheduledUsj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      isPaletteSessionOpen: false,
      commitPendingMarkerEdits: vi.fn(),
      getEditorUsj,
    });

    expect(latestSave).toHaveBeenCalledWith(scheduledUsj);
  });
});

describe('performDebouncedPdpSave — palette literal stripping', () => {
  it('strips the un-settled `\\`+filter literal from a palette-open flush (last occurrence)', () => {
    // Live corruption this pins: clicking a palette entry blurs the iframe, the blur-flush saved
    // the raw literal (`...tell\f,`) to the PDP, and ParatextData tokenized the unknown marker as
    // a PARAGRAPH — a garbage paragraph echoed back into the document.
    const latestSave = vi.fn();
    performDebouncedPdpSave({
      usj: usjWith('Den God tell\\f, more text'),
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      isPaletteSessionOpen: true,
      paletteLiteralRun: '\\f',
      commitPendingMarkerEdits: vi.fn(),
      getEditorUsj: vi.fn(),
    });

    expect(latestSave).toHaveBeenCalledWith(usjWith('Den God tell, more text'));
  });

  it('saves unchanged when the literal is not present in the content', () => {
    const latestSave = vi.fn();
    const usj = usjWith('no literal here');
    performDebouncedPdpSave({
      usj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      isPaletteSessionOpen: true,
      paletteLiteralRun: '\\zz',
      commitPendingMarkerEdits: vi.fn(),
      getEditorUsj: vi.fn(),
    });
    expect(latestSave).toHaveBeenCalledWith(usj);
  });

  it('does not mutate the scheduled USJ when stripping', () => {
    const latestSave = vi.fn();
    const usj = usjWith('tell\\f,');
    performDebouncedPdpSave({
      usj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      isPaletteSessionOpen: true,
      paletteLiteralRun: '\\f',
      commitPendingMarkerEdits: vi.fn(),
      getEditorUsj: vi.fn(),
    });
    expect(usj).toEqual(usjWith('tell\\f,')); // caller's object untouched
    expect(latestSave).toHaveBeenCalledWith(usjWith('tell,'));
  });

  it('keeps the old behavior when no literal run is provided (focused sessions)', () => {
    const latestSave = vi.fn();
    const usj = usjWith('tell\\f,');
    performDebouncedPdpSave({
      usj,
      scheduledChapterKey: 'GEN|1',
      currentChapterKey: 'GEN|1',
      capturedSave: vi.fn(),
      latestSave,
      isPaletteSessionOpen: true,
      commitPendingMarkerEdits: vi.fn(),
      getEditorUsj: vi.fn(),
    });
    expect(latestSave).toHaveBeenCalledWith(usj);
  });
});
