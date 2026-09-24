import { afterEach, describe, expect, it, vi } from 'vitest';
import { resolveMissingBookId } from './manage-books-launch.utils';

afterEach(() => {
  vi.useRealTimers();
});

describe('resolveMissingBookId', () => {
  it('reads the book directly from a SerializedVerseRef', async () => {
    const getScrRefForProject = vi.fn();

    const result = await resolveMissingBookId(
      { book: 'GEN', chapterNum: 1, verseNum: 1 },
      'project-1',
      getScrRefForProject,
    );

    expect(result).toBe('GEN');
    // A literal ref needs no lookup — hitting the service would be a wasted round-trip.
    expect(getScrRefForProject).not.toHaveBeenCalled();
  });

  it('resolves a scroll group id through the project-versification accessor', async () => {
    const getScrRefForProject = vi
      .fn()
      .mockResolvedValue({ book: 'MRK', chapterNum: 2, verseNum: 3 });

    const result = await resolveMissingBookId(0, 'project-1', getScrRefForProject);

    expect(result).toBe('MRK');
    expect(getScrRefForProject).toHaveBeenCalledWith(0, 'project-1');
  });

  it('treats an absent scroll group reference as group 0', async () => {
    const getScrRefForProject = vi
      .fn()
      .mockResolvedValue({ book: 'LUK', chapterNum: 1, verseNum: 1 });

    const result = await resolveMissingBookId(undefined, 'project-1', getScrRefForProject);

    // This is the ORDINARY case, not an edge case: the scripture editor's provider only guarantees a
    // scroll group in Simple mode (`interfaceMode === 'simple' ? 0 : savedWebView.scrollGroupScrRef`),
    // while the Manage books button that leads here is Power-only. Bailing out on undefined meant the
    // preselection silently failed in the only mode that has the button. 0 is the platform's own
    // default — `useScrollGroupScrRef` does `scrollGroupScrRef ?? 0`.
    expect(result).toBe('LUK');
    expect(getScrRefForProject).toHaveBeenCalledWith(0, 'project-1');
  });

  it('gives up on the lookup rather than stalling the launch', async () => {
    vi.useFakeTimers();
    // `papi.scrollGroups` resolves through `waitForNetworkObject(..., 30000)`, so during a re-arm
    // window this call can hang for half a minute. Serialized ahead of the dialog opening, that reads
    // as "the Manage books button did nothing at all".
    const getScrRefForProject = vi.fn().mockReturnValue(new Promise(() => {}));

    const pending = resolveMissingBookId(0, 'project-1', getScrRefForProject);
    await vi.advanceTimersByTimeAsync(30_000);

    expect(await pending).toBeUndefined();
  });

  it('returns undefined for a book outside the Manage Books grid range', async () => {
    // 3ES sits above the dialog's 1..102 canon range, so it has no pill. Preselecting it would tick a
    // book the user can neither see nor clear, above a disabled Apply with no stated cause.
    const getScrRefForProject = vi
      .fn()
      .mockResolvedValue({ book: '3ES', chapterNum: 1, verseNum: 1 });

    const result = await resolveMissingBookId(0, 'project-1', getScrRefForProject);

    expect(result).toBeUndefined();
  });

  it('returns undefined for a book id it cannot recognize', async () => {
    const getScrRefForProject = vi
      .fn()
      .mockResolvedValue({ book: 'NOPE', chapterNum: 1, verseNum: 1 });

    expect(await resolveMissingBookId(0, 'project-1', getScrRefForProject)).toBeUndefined();
  });

  it('returns undefined rather than throwing when the lookup fails', async () => {
    const getScrRefForProject = vi.fn().mockRejectedValue(new Error('no such scroll group'));

    const result = await resolveMissingBookId(7, 'project-1', getScrRefForProject);

    // The dialog must still open, just without a preselection.
    expect(result).toBeUndefined();
  });

  it('returns undefined for an empty book id so no empty preselection is sent', async () => {
    const getScrRefForProject = vi.fn().mockResolvedValue({ book: '', chapterNum: 0, verseNum: 0 });

    const result = await resolveMissingBookId(0, 'project-1', getScrRefForProject);

    expect(result).toBeUndefined();
  });
});
