import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import {
  useQuickNavButtons,
  getPreviousChapterRef,
  getNextChapterRef,
  getPreviousBookRef,
  getNextBookRef,
  getPreviousVerseRef,
  getNextVerseRef,
} from './book-chapter-control.navigation';
import { fetchEndChapter } from './book-chapter-control.utils';

// Mock the fetchEndChapter function
vi.mock('./book-chapter-control.utils', () => ({
  fetchEndChapter: vi.fn(),
}));

const mockFetchEndChapter = vi.mocked(fetchEndChapter);

const lastChapters: Record<string, number> = {
  GEN: 50,
  EXO: 40,
  LEV: 27,
  MAT: 28,
  MRK: 16,
  REV: 22,
};

describe('book-chapter-control.navigation', () => {
  const mockHandleSubmit = vi.fn();
  const availableBooks = ['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'REV'];

  beforeEach(() => {
    vi.clearAllMocks();

    mockFetchEndChapter.mockImplementation((bookId: string) => {
      return lastChapters[bookId] || 1;
    });
  });

  describe('useQuickNavButtons', () => {
    test('Returns correct number of navigation buttons', () => {
      const { result } = renderHook(() =>
        useQuickNavButtons(
          { book: 'GEN', chapterNum: 1, verseNum: 1 },
          availableBooks,
          'ltr',
          mockHandleSubmit,
        ),
      );

      expect(result.current).toHaveLength(4);
      expect(result.current[0].title).toBe('Previous chapter');
      expect(result.current[1].title).toBe('Previous verse');
      expect(result.current[2].title).toBe('Next verse');
      expect(result.current[3].title).toBe('Next chapter');
    });

    describe('Previous chapter navigation', () => {
      test('Navigates to previous chapter within same book', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 2, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[0].onClick(); // Previous chapter
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 1,
        });
      });

      test('Navigates to previous book last chapter when at chapter 1', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'EXO', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[0].onClick(); // Previous chapter
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: lastChapters.GEN,
          verseNum: 1,
        });
      });

      test('Is disabled when at first chapter of first book', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        expect(result.current[0].disabled).toBe(true);
      });

      test('Is not disabled when not at first chapter of first book', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 2, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        expect(result.current[0].disabled).toBe(false);
      });
    });

    describe('Next chapter navigation', () => {
      test('Navigates to next chapter within same book', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[3].onClick(); // Next chapter
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 2,
          verseNum: 1,
        });
      });

      test('Navigates to next book first chapter when at last chapter', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: lastChapters.GEN, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[3].onClick(); // Next chapter
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'EXO',
          chapterNum: 1,
          verseNum: 1,
        });
      });

      test('Is disabled when at last chapter of last book', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'REV', chapterNum: lastChapters.REV, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        expect(result.current[3].disabled).toBe(true);
      });

      test('Is disabled when fetchEndChapter returns -1 and at last book', () => {
        mockFetchEndChapter.mockReturnValue(-1);

        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'REV', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        expect(result.current[3].disabled).toBe(true);
      });
    });

    describe('Previous verse navigation', () => {
      test('Navigates to previous verse', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 5 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[1].onClick(); // Previous verse
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 4,
        });
      });

      test('Navigates to verse 0 when at verse 1', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[1].onClick(); // Previous verse
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 0,
        });
      });

      test('Is disabled when at verse 0', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 0 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        expect(result.current[1].disabled).toBe(true);
      });
    });

    describe('Next verse navigation', () => {
      test('Navigates to next verse', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[2].onClick(); // Next verse
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 2,
        });
      });

      test('Is never disabled', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 999 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        expect(result.current[2].disabled).toBeFalsy();
      });
    });

    describe('RTL direction', () => {
      test('Uses correct icons for RTL direction', () => {
        const { result: ltrResult } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        const { result: rtlResult } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        // Icons should be different for RTL vs LTR
        expect(ltrResult.current[0].icon).not.toBe(rtlResult.current[0].icon);
        expect(ltrResult.current[1].icon).not.toBe(rtlResult.current[1].icon);
        expect(ltrResult.current[2].icon).not.toBe(rtlResult.current[2].icon);
        expect(ltrResult.current[3].icon).not.toBe(rtlResult.current[3].icon);
        expect(ltrResult.current[0].icon).toBe(rtlResult.current[3].icon);
        expect(ltrResult.current[1].icon).toBe(rtlResult.current[2].icon);
        expect(ltrResult.current[2].icon).toBe(rtlResult.current[1].icon);
        expect(ltrResult.current[3].icon).toBe(rtlResult.current[0].icon);
      });

      test('Returns correct number of navigation buttons in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        expect(result.current).toHaveLength(4);
        expect(result.current[0].title).toBe('Previous chapter');
        expect(result.current[1].title).toBe('Previous verse');
        expect(result.current[2].title).toBe('Next verse');
        expect(result.current[3].title).toBe('Next chapter');
      });

      test('Navigates to previous chapter within same book in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 2, verseNum: 1 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[0].onClick(); // Previous chapter
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 1,
        });
      });

      test('Navigates to next chapter within same book in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[3].onClick(); // Next chapter
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 2,
          verseNum: 1,
        });
      });

      test('Navigates to previous verse in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 5 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[1].onClick(); // Previous verse
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 4,
        });
      });

      test('Navigates to next verse in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        act(() => {
          result.current[2].onClick(); // Next verse
        });

        expect(mockHandleSubmit).toHaveBeenCalledWith({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 2,
        });
      });

      test('Is disabled when at first chapter of first book in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        expect(result.current[0].disabled).toBe(true);
      });

      test('Is disabled when at last chapter of last book in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'REV', chapterNum: lastChapters.REV, verseNum: 1 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        expect(result.current[3].disabled).toBe(true);
      });

      test('Is disabled when at verse 0 in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 5, verseNum: 0 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        expect(result.current[1].disabled).toBe(true);
      });

      test('Next verse is never disabled in RTL', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 999 },
            availableBooks,
            'rtl',
            mockHandleSubmit,
          ),
        );

        expect(result.current[2].disabled).toBeFalsy();
      });
    });

    describe('Edge cases', () => {
      test('Handles empty available books array - Previous chapter', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 1, verseNum: 1 },
            [],
            'ltr',
            mockHandleSubmit,
          ),
        );

        // Should still return 4 buttons
        expect(result.current).toHaveLength(4);

        // With no info available, all buttons should be disabled
        expect(result.current[0].disabled).toBe(true);
        expect(result.current[1].disabled).toBe(true);
        expect(result.current[2].disabled).toBe(true);
        expect(result.current[3].disabled).toBe(true);
      });

      test('Handles single book in available books', () => {
        const singleBook = ['GEN'];
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'GEN', chapterNum: 25, verseNum: 1 },
            singleBook,
            'ltr',
            mockHandleSubmit,
          ),
        );

        // Previous chapter should be enabled (not at chapter 1)
        expect(result.current[0].disabled).toBe(false);

        // Next chapter should be enabled (not at last chapter)
        expect(result.current[3].disabled).toBe(false);
      });

      test('Handles book not in available books list', () => {
        const { result } = renderHook(() =>
          useQuickNavButtons(
            { book: 'ROM', chapterNum: 1, verseNum: 1 }, // ROM not in availableBooks
            availableBooks,
            'ltr',
            mockHandleSubmit,
          ),
        );

        // Should handle gracefully and not crash
        expect(result.current).toHaveLength(4);
      });
    });
  });

  describe('pure navigation functions', () => {
    const BOOKS = ['GEN', 'EXO', 'LEV'];

    describe('getPreviousChapterRef', () => {
      test('returns previous chapter verse 1 within a book', () => {
        expect(getPreviousChapterRef({ book: 'EXO', chapterNum: 5, verseNum: 7 }, BOOKS)).toEqual({
          book: 'EXO',
          chapterNum: 4,
          verseNum: 1,
        });
      });

      test('rolls to previous book last chapter at chapter 1', () => {
        vi.mocked(fetchEndChapter).mockReturnValue(50);
        expect(getPreviousChapterRef({ book: 'EXO', chapterNum: 1, verseNum: 1 }, BOOKS)).toEqual({
          book: 'GEN',
          chapterNum: 50,
          verseNum: 1,
        });
      });

      test('returns undefined at chapter 1 of the first book', () => {
        expect(
          getPreviousChapterRef({ book: 'GEN', chapterNum: 1, verseNum: 1 }, BOOKS),
        ).toBeUndefined();
      });

      test('returns undefined at chapter 1 of a book not in availableBooks', () => {
        expect(
          getPreviousChapterRef({ book: 'MAT', chapterNum: 1, verseNum: 1 }, BOOKS),
        ).toBeUndefined();
      });
    });

    describe('getNextChapterRef', () => {
      test('returns next chapter verse 1 within a book', () => {
        vi.mocked(fetchEndChapter).mockReturnValue(40);
        expect(getNextChapterRef({ book: 'EXO', chapterNum: 5, verseNum: 7 }, BOOKS)).toEqual({
          book: 'EXO',
          chapterNum: 6,
          verseNum: 1,
        });
      });

      test('rolls to next book chapter 1 at the last chapter', () => {
        vi.mocked(fetchEndChapter).mockReturnValue(40);
        expect(getNextChapterRef({ book: 'EXO', chapterNum: 40, verseNum: 3 }, BOOKS)).toEqual({
          book: 'LEV',
          chapterNum: 1,
          verseNum: 1,
        });
      });

      test('returns undefined at the last chapter of the last book', () => {
        vi.mocked(fetchEndChapter).mockReturnValue(27);
        expect(
          getNextChapterRef({ book: 'LEV', chapterNum: 27, verseNum: 1 }, BOOKS),
        ).toBeUndefined();
      });

      test('returns undefined when availableBooks is empty', () => {
        vi.mocked(fetchEndChapter).mockReturnValue(1);
        expect(getNextChapterRef({ book: 'GEN', chapterNum: 1, verseNum: 1 }, [])).toBeUndefined();
      });
    });

    describe('getPreviousBookRef / getNextBookRef', () => {
      test('moves to chapter 1 verse 1 of the adjacent book', () => {
        expect(getPreviousBookRef({ book: 'EXO', chapterNum: 5, verseNum: 7 }, BOOKS)).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 1,
        });
        expect(getNextBookRef({ book: 'EXO', chapterNum: 5, verseNum: 7 }, BOOKS)).toEqual({
          book: 'LEV',
          chapterNum: 1,
          verseNum: 1,
        });
      });

      test('clamps at the ends of availableBooks', () => {
        expect(
          getPreviousBookRef({ book: 'GEN', chapterNum: 2, verseNum: 1 }, BOOKS),
        ).toBeUndefined();
        expect(getNextBookRef({ book: 'LEV', chapterNum: 2, verseNum: 1 }, BOOKS)).toBeUndefined();
      });

      test('returns undefined for a book not in availableBooks', () => {
        expect(
          getPreviousBookRef({ book: 'MAT', chapterNum: 1, verseNum: 1 }, BOOKS),
        ).toBeUndefined();
        expect(getNextBookRef({ book: 'MAT', chapterNum: 1, verseNum: 1 }, BOOKS)).toBeUndefined();
      });
    });

    describe('getPreviousVerseRef / getNextVerseRef', () => {
      test('moves verse by one, flooring at 0, when no bounds are provided', () => {
        expect(getPreviousVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 5 })).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 4,
        });
        expect(getPreviousVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 1 })).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 0,
        });
        expect(getPreviousVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 0 })).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 0,
        });
        // Without versification info there is no chapter boundary to roll across
        expect(getPreviousVerseRef({ book: 'GEN', chapterNum: 5, verseNum: 1 })).toEqual({
          book: 'GEN',
          chapterNum: 5,
          verseNum: 0,
        });
        expect(getNextVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 5 })).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 6,
        });
      });
    });

    describe('versification-aware navigation (with ScriptureBounds)', () => {
      // Non-English verse counts to prove the bounds are honored: GEN has 3 chapters with last
      // verses 8/25/24; EXO has 2 chapters with last verses 22/9. Index 0 is filler.
      const verseCounts: Record<string, number[]> = {
        GEN: [0, 8, 25, 24],
        EXO: [0, 22, 9],
      };
      const bounds = {
        getEndChapter: (book: string) =>
          verseCounts[book] ? verseCounts[book].length - 1 : undefined,
        getEndVerse: (book: string, chapterNum: number) => verseCounts[book]?.[chapterNum],
      };
      const BOUNDED_BOOKS = ['GEN', 'EXO', 'MAT', 'ROM'];

      describe('getNextVerseRef', () => {
        test('increments within the chapter below the last verse', () => {
          expect(
            getNextVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 5 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 6 });
        });

        test('rolls to the next chapter verse 1 at the last verse', () => {
          expect(
            getNextVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 8 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 2, verseNum: 1 });
        });

        test('rolls to the next chapter when the verse is already past the last verse', () => {
          expect(
            getNextVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 40 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 2, verseNum: 1 });
        });

        test('rolls into the next book at the last verse of the last chapter', () => {
          expect(
            getNextVerseRef({ book: 'GEN', chapterNum: 3, verseNum: 24 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'EXO', chapterNum: 1, verseNum: 1 });
        });

        test('returns undefined at the end of the last available book', () => {
          expect(
            getNextVerseRef({ book: 'EXO', chapterNum: 2, verseNum: 9 }, ['GEN', 'EXO'], bounds),
          ).toBeUndefined();
        });

        test('increments without an upper bound when verse counts are unknown', () => {
          expect(
            getNextVerseRef({ book: 'MAT', chapterNum: 1, verseNum: 5 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'MAT', chapterNum: 1, verseNum: 6 });
        });
      });

      describe('getPreviousVerseRef', () => {
        test('decrements within the chapter above verse 1', () => {
          expect(
            getPreviousVerseRef({ book: 'GEN', chapterNum: 2, verseNum: 5 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 2, verseNum: 4 });
        });

        test('rolls to the previous chapter last verse from verse 1 past chapter 1', () => {
          expect(
            getPreviousVerseRef({ book: 'GEN', chapterNum: 2, verseNum: 1 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 8 });
        });

        test('rolls to the previous chapter last verse from verse 0 past chapter 1', () => {
          expect(
            getPreviousVerseRef({ book: 'GEN', chapterNum: 2, verseNum: 0 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 8 });
        });

        test('goes to verse 0 from chapter 1 verse 1, matching Paratext 9', () => {
          expect(
            getPreviousVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 1 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 0 });
        });

        test('rolls into the previous book last chapter last verse from chapter 1 verse 0', () => {
          expect(
            getPreviousVerseRef({ book: 'EXO', chapterNum: 1, verseNum: 0 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'GEN', chapterNum: 3, verseNum: 24 });
        });

        test('returns undefined at chapter 1 verse 0 of the first available book', () => {
          expect(
            getPreviousVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 0 }, BOUNDED_BOOKS, bounds),
          ).toBeUndefined();
        });

        test('rolls to verse 1 of the previous chapter when its verse count is unknown', () => {
          expect(
            getPreviousVerseRef({ book: 'MAT', chapterNum: 2, verseNum: 1 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'MAT', chapterNum: 1, verseNum: 1 });
        });

        test('falls back to fetchEndChapter for the previous book when bounds do not know it', () => {
          // ROM is not in verseCounts; fetchEndChapter mock says MAT has 28 chapters
          expect(
            getPreviousVerseRef({ book: 'ROM', chapterNum: 1, verseNum: 0 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'MAT', chapterNum: 28, verseNum: 1 });
        });
      });

      describe('chapter navigation honors bounds over fetchEndChapter', () => {
        test('getNextChapterRef rolls into the next book at the bounds end chapter', () => {
          // fetchEndChapter mock says GEN has 50 chapters; bounds say 3 — bounds must win
          expect(
            getNextChapterRef({ book: 'GEN', chapterNum: 3, verseNum: 5 }, BOUNDED_BOOKS, bounds),
          ).toEqual({ book: 'EXO', chapterNum: 1, verseNum: 1 });
        });

        test('getPreviousChapterRef uses the bounds end chapter of the previous book', () => {
          expect(
            getPreviousChapterRef(
              { book: 'EXO', chapterNum: 1, verseNum: 1 },
              BOUNDED_BOOKS,
              bounds,
            ),
          ).toEqual({ book: 'GEN', chapterNum: 3, verseNum: 1 });
        });
      });
    });
  });
});
