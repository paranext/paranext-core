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

/**
 * Looks up a quick-nav button by its title rather than its position in the array, so tests keep
 * working across reorders of the returned button list.
 */
function findButton(buttons: ReturnType<typeof useQuickNavButtons>, title: string) {
  const button = buttons.find((candidate) => candidate.title === title);
  if (!button) throw new Error(`No quick-nav button titled "${title}"`);
  return button;
}

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
    expect(result.current.map((button) => button.title).sort()).toEqual([
      'Next chapter',
      'Next verse',
      'Previous chapter',
      'Previous verse',
    ]);
  });

  test('groups chapter buttons before verse buttons', () => {
    const { result } = renderHook(() =>
      useQuickNavButtons(
        { book: 'MAT', chapterNum: 5, verseNum: 1 },
        ['MAT'],
        'ltr',
        mockHandleSubmit,
      ),
    );

    expect(result.current.map((button) => button.title)).toEqual([
      'Previous chapter',
      'Next chapter',
      'Previous verse',
      'Next verse',
    ]);
    expect(result.current.map((button) => button.group)).toEqual([
      'chapter',
      'chapter',
      'verse',
      'verse',
    ]);
  });

  test('verse icons are direction-independent', () => {
    const ltr = renderHook(() =>
      useQuickNavButtons(
        { book: 'MAT', chapterNum: 5, verseNum: 1 },
        ['MAT'],
        'ltr',
        mockHandleSubmit,
      ),
    ).result;
    const rtl = renderHook(() =>
      useQuickNavButtons(
        { book: 'MAT', chapterNum: 5, verseNum: 1 },
        ['MAT'],
        'rtl',
        mockHandleSubmit,
      ),
    ).result;

    // Chapter icons flip with direction: each one takes the other's glyph in RTL.
    expect(findButton(ltr.current, 'Previous chapter').icon).toBe(
      findButton(rtl.current, 'Next chapter').icon,
    );
    expect(findButton(ltr.current, 'Next chapter').icon).toBe(
      findButton(rtl.current, 'Previous chapter').icon,
    );
    // Verse icons are vertical chevrons, so they are the same glyph in both directions.
    expect(findButton(ltr.current, 'Previous verse').icon).toBe(
      findButton(rtl.current, 'Previous verse').icon,
    );
    expect(findButton(ltr.current, 'Next verse').icon).toBe(
      findButton(rtl.current, 'Next verse').icon,
    );
  });

  test('uses localized titles when they are supplied', () => {
    const { result } = renderHook(() =>
      useQuickNavButtons(
        { book: 'MAT', chapterNum: 5, verseNum: 1 },
        ['MAT'],
        'ltr',
        mockHandleSubmit,
        { '%webView_bookChapterControl_nextChapter%': 'Capítulo siguiente' },
      ),
    );

    expect(result.current[1].title).toBe('Capítulo siguiente');
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
        findButton(result.current, 'Previous chapter').onClick();
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
        findButton(result.current, 'Previous chapter').onClick();
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

      expect(findButton(result.current, 'Previous chapter').disabled).toBe(true);
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

      expect(findButton(result.current, 'Previous chapter').disabled).toBe(false);
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
        findButton(result.current, 'Next chapter').onClick();
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
        findButton(result.current, 'Next chapter').onClick();
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

      expect(findButton(result.current, 'Next chapter').disabled).toBe(true);
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
        findButton(result.current, 'Previous verse').onClick();
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
        findButton(result.current, 'Previous verse').onClick();
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

      expect(findButton(result.current, 'Previous verse').disabled).toBe(true);
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
        findButton(result.current, 'Next verse').onClick();
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

      expect(findButton(result.current, 'Next verse').disabled).toBeFalsy();
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

      // Chapter icons flip with direction and swap positions between ltr and rtl.
      expect(findButton(ltrResult.current, 'Previous chapter').icon).not.toBe(
        findButton(rtlResult.current, 'Previous chapter').icon,
      );
      expect(findButton(ltrResult.current, 'Next chapter').icon).not.toBe(
        findButton(rtlResult.current, 'Next chapter').icon,
      );
      expect(findButton(ltrResult.current, 'Previous chapter').icon).toBe(
        findButton(rtlResult.current, 'Next chapter').icon,
      );
      expect(findButton(ltrResult.current, 'Next chapter').icon).toBe(
        findButton(rtlResult.current, 'Previous chapter').icon,
      );

      // Verse icons are vertical chevrons and do not depend on direction.
      expect(findButton(ltrResult.current, 'Previous verse').icon).toBe(
        findButton(rtlResult.current, 'Previous verse').icon,
      );
      expect(findButton(ltrResult.current, 'Next verse').icon).toBe(
        findButton(rtlResult.current, 'Next verse').icon,
      );
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
        findButton(result.current, 'Previous chapter').onClick();
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

      expect(findButton(result.current, 'Previous chapter').disabled).toBe(true);
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

      expect(findButton(result.current, 'Next chapter').disabled).toBe(true);
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

      expect(findButton(result.current, 'Previous verse').disabled).toBe(true);
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
      expect(findButton(result.current, 'Previous chapter').disabled).toBe(true);
      expect(findButton(result.current, 'Next chapter').disabled).toBe(true);
      expect(findButton(result.current, 'Previous verse').disabled).toBe(true);
      expect(findButton(result.current, 'Next verse').disabled).toBe(true);
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
      expect(findButton(result.current, 'Previous chapter').disabled).toBe(false);

      // Next chapter should be enabled (not at last chapter)
      expect(findButton(result.current, 'Next chapter').disabled).toBe(false);
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
        findButton(result.current, 'Previous chapter').onClick();
      });

      expect(mockHandleSubmit).toHaveBeenCalledWith({
        book: 'MRK',
        chapterNum: lastChapters.MRK,
        verseNum: 1,
      });
    });
  });
});
