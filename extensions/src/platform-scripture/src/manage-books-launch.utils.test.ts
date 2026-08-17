import { describe, expect, it, vi } from 'vitest';
import { resolveMissingBookId } from './manage-books-launch.utils';

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

  it('returns undefined when the scroll group reference is absent', async () => {
    const getScrRefForProject = vi.fn();

    const result = await resolveMissingBookId(undefined, 'project-1', getScrRefForProject);

    expect(result).toBeUndefined();
    expect(getScrRefForProject).not.toHaveBeenCalled();
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
