import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useQuickNavButtons } from './book-chapter-control.navigation';

// Real English-canon chapter counts (getChaptersForBook, no mock): the buttons pass no
// ScriptureBounds, so navigation falls back to these.
const lastChapters: Record<string, number> = {
  GEN: 50,
  EXO: 40,
  LEV: 27,
  MAT: 28,
  MRK: 16,
  REV: 22,
};

describe('useQuickNavButtons', () => {
  const mockHandleSubmit = vi.fn();
  const availableBooks = ['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'REV'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

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

      expect(mockHandleSubmit).toHaveBeenCalledWith({ book: 'GEN', chapterNum: 1, verseNum: 1 });
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

      expect(mockHandleSubmit).toHaveBeenCalledWith({ book: 'GEN', chapterNum: 2, verseNum: 1 });
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

      expect(mockHandleSubmit).toHaveBeenCalledWith({ book: 'EXO', chapterNum: 1, verseNum: 1 });
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

      expect(mockHandleSubmit).toHaveBeenCalledWith({ book: 'GEN', chapterNum: 1, verseNum: 4 });
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

      expect(mockHandleSubmit).toHaveBeenCalledWith({ book: 'GEN', chapterNum: 1, verseNum: 0 });
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

      expect(mockHandleSubmit).toHaveBeenCalledWith({ book: 'GEN', chapterNum: 1, verseNum: 2 });
    });

    test('Is never disabled within a present book', () => {
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

      expect(mockHandleSubmit).toHaveBeenCalledWith({ book: 'GEN', chapterNum: 1, verseNum: 1 });
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
          { book: 'GEN', chapterNum: 1, verseNum: 0 },
          availableBooks,
          'rtl',
          mockHandleSubmit,
        ),
      );

      expect(result.current[1].disabled).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('Handles empty available books array - all buttons disabled', () => {
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

      // With no present books, every step is a no-op, so all buttons are disabled
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

    test('Rolls a book not in availableBooks to the nearest present book', () => {
      // ROM is not in availableBooks; previous chapter must roll back to the nearest present book
      // (MRK) rather than stepping within ROM
      const { result } = renderHook(() =>
        useQuickNavButtons(
          { book: 'ROM', chapterNum: 1, verseNum: 1 }, // ROM not in availableBooks
          availableBooks,
          'ltr',
          mockHandleSubmit,
        ),
      );

      expect(result.current).toHaveLength(4);

      act(() => {
        result.current[0].onClick(); // Previous chapter
      });

      expect(mockHandleSubmit).toHaveBeenCalledWith({
        book: 'MRK',
        chapterNum: lastChapters.MRK,
        verseNum: 1,
      });
    });
  });
});
