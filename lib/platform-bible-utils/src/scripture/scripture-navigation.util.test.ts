import {
  findAdjacentPresentBook,
  getNextBookRef,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousBookRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
  ScriptureBounds,
} from './scripture-navigation.util';

// Real getChaptersForBook (from scrBookData) is used as the English-canon fallback — no mock:
// GEN 50, EXO 40, LEV 27, MAT 28, REV 22, ROM 16.
const BOOKS = ['GEN', 'EXO', 'LEV'];

// Non-English verse counts to prove the bounds are honored: GEN has 3 chapters with last verses
// 8/25/24; EXO has 2 chapters with last verses 22/9. Index 0 is filler.
const verseCounts: Record<string, number[]> = {
  GEN: [0, 8, 25, 24],
  EXO: [0, 22, 9],
};
const bounds: ScriptureBounds = {
  getEndChapter: (book) => (verseCounts[book] ? verseCounts[book].length - 1 : undefined),
  getEndVerse: (book, chapterNum) => verseCounts[book]?.[chapterNum],
};
const BOUNDED_BOOKS = ['GEN', 'EXO', 'MAT', 'ROM'];

describe('findAdjacentPresentBook', () => {
  test('finds the adjacent present book from a present book', () => {
    expect(findAdjacentPresentBook('GEN', BOOKS, 'next')).toBe('EXO');
    expect(findAdjacentPresentBook('LEV', BOOKS, 'previous')).toBe('EXO');
  });

  test('skips absent books between present ones (current book not present)', () => {
    // EXO (book 2) is absent; it sits between GEN (1) and LEV (3)
    expect(findAdjacentPresentBook('EXO', ['GEN', 'LEV'], 'next')).toBe('LEV');
    expect(findAdjacentPresentBook('EXO', ['GEN', 'LEV'], 'previous')).toBe('GEN');
  });

  test('returns undefined when there is no present book in the direction', () => {
    expect(findAdjacentPresentBook('GEN', BOOKS, 'previous')).toBeUndefined();
    expect(findAdjacentPresentBook('LEV', BOOKS, 'next')).toBeUndefined();
    expect(findAdjacentPresentBook('GEN', [], 'next')).toBeUndefined();
  });
});

describe('getPreviousChapterRef', () => {
  test('returns previous chapter verse 1 within a book', () => {
    expect(getPreviousChapterRef({ book: 'EXO', chapterNum: 5, verseNum: 7 }, BOOKS)).toEqual({
      book: 'EXO',
      chapterNum: 4,
      verseNum: 1,
    });
  });

  test('rolls to previous book last chapter at chapter 1', () => {
    expect(getPreviousChapterRef({ book: 'EXO', chapterNum: 1, verseNum: 1 }, BOOKS)).toEqual({
      book: 'GEN',
      chapterNum: 50,
      verseNum: 1,
    });
  });

  test('returns undefined at chapter 1 of the first available book', () => {
    expect(
      getPreviousChapterRef({ book: 'GEN', chapterNum: 1, verseNum: 1 }, BOOKS),
    ).toBeUndefined();
  });

  test('rolls a book not in availableBooks back to the closest previous present book', () => {
    // MAT is after every present book, so previous chapter goes to LEV's last chapter
    expect(getPreviousChapterRef({ book: 'MAT', chapterNum: 3, verseNum: 1 }, BOOKS)).toEqual({
      book: 'LEV',
      chapterNum: 27,
      verseNum: 1,
    });
  });

  test('rolls a book absent in a gap back to the closest previous present book', () => {
    // EXO is absent; previous chapter from EXO 5 must skip to GEN (not step within absent EXO)
    expect(
      getPreviousChapterRef({ book: 'EXO', chapterNum: 5, verseNum: 1 }, ['GEN', 'LEV']),
    ).toEqual({ book: 'GEN', chapterNum: 50, verseNum: 1 });
  });

  test('uses the bounds end chapter of the previous book', () => {
    expect(
      getPreviousChapterRef({ book: 'EXO', chapterNum: 1, verseNum: 1 }, BOUNDED_BOOKS, bounds),
    ).toEqual({ book: 'GEN', chapterNum: 3, verseNum: 1 });
  });
});

describe('getNextChapterRef', () => {
  test('returns next chapter verse 1 within a book', () => {
    expect(getNextChapterRef({ book: 'EXO', chapterNum: 5, verseNum: 7 }, BOOKS)).toEqual({
      book: 'EXO',
      chapterNum: 6,
      verseNum: 1,
    });
  });

  test('rolls to next book chapter 1 at the last chapter', () => {
    expect(getNextChapterRef({ book: 'EXO', chapterNum: 40, verseNum: 3 }, BOOKS)).toEqual({
      book: 'LEV',
      chapterNum: 1,
      verseNum: 1,
    });
  });

  test('returns undefined at the last chapter of the last book', () => {
    expect(getNextChapterRef({ book: 'LEV', chapterNum: 27, verseNum: 1 }, BOOKS)).toBeUndefined();
  });

  test('returns undefined when availableBooks is empty', () => {
    expect(getNextChapterRef({ book: 'GEN', chapterNum: 1, verseNum: 1 }, [])).toBeUndefined();
  });

  test('rolls a book not in availableBooks forward to the closest next present book', () => {
    // EXO is absent; next chapter from EXO 5 must skip to LEV (not step within absent EXO)
    expect(getNextChapterRef({ book: 'EXO', chapterNum: 5, verseNum: 1 }, ['GEN', 'LEV'])).toEqual({
      book: 'LEV',
      chapterNum: 1,
      verseNum: 1,
    });
  });

  test('returns undefined for a book after every present book', () => {
    expect(getNextChapterRef({ book: 'MAT', chapterNum: 28, verseNum: 1 }, BOOKS)).toBeUndefined();
  });

  test('honors the bounds end chapter over the English canon when rolling', () => {
    // English canon says GEN has 50 chapters; bounds say 3 — bounds must win
    expect(
      getNextChapterRef({ book: 'GEN', chapterNum: 3, verseNum: 5 }, BOUNDED_BOOKS, bounds),
    ).toEqual({ book: 'EXO', chapterNum: 1, verseNum: 1 });
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
    expect(getPreviousBookRef({ book: 'GEN', chapterNum: 2, verseNum: 1 }, BOOKS)).toBeUndefined();
    expect(getNextBookRef({ book: 'LEV', chapterNum: 2, verseNum: 1 }, BOOKS)).toBeUndefined();
  });

  test('rolls a book absent in a gap to the closest present book in each direction', () => {
    // EXO absent between GEN and LEV
    expect(getPreviousBookRef({ book: 'EXO', chapterNum: 3, verseNum: 1 }, ['GEN', 'LEV'])).toEqual(
      {
        book: 'GEN',
        chapterNum: 1,
        verseNum: 1,
      },
    );
    expect(getNextBookRef({ book: 'EXO', chapterNum: 3, verseNum: 1 }, ['GEN', 'LEV'])).toEqual({
      book: 'LEV',
      chapterNum: 1,
      verseNum: 1,
    });
  });

  test('rolls a book after every present book back to the last present book (previous)', () => {
    // MAT is after every present book: previous book goes to LEV, next book has nowhere to go
    expect(getPreviousBookRef({ book: 'MAT', chapterNum: 1, verseNum: 1 }, BOOKS)).toEqual({
      book: 'LEV',
      chapterNum: 1,
      verseNum: 1,
    });
    expect(getNextBookRef({ book: 'MAT', chapterNum: 1, verseNum: 1 }, BOOKS)).toBeUndefined();
  });
});

describe('getPreviousVerseRef / getNextVerseRef without bounds', () => {
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

  test('rolls across books by absence even without bounds', () => {
    // EXO absent between GEN and LEV: verse nav from absent EXO jumps to the nearest present book
    expect(getNextVerseRef({ book: 'EXO', chapterNum: 5, verseNum: 3 }, ['GEN', 'LEV'])).toEqual({
      book: 'LEV',
      chapterNum: 1,
      verseNum: 1,
    });
    expect(
      getPreviousVerseRef({ book: 'EXO', chapterNum: 5, verseNum: 3 }, ['GEN', 'LEV']),
    ).toEqual({
      book: 'GEN',
      chapterNum: 50,
      verseNum: 1,
    });
  });
});

describe('getNextVerseRef with bounds', () => {
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

  test('rolls a book not in availableBooks forward to the closest next present book', () => {
    expect(
      getNextVerseRef({ book: 'EXO', chapterNum: 5, verseNum: 3 }, ['GEN', 'LEV'], bounds),
    ).toEqual({ book: 'LEV', chapterNum: 1, verseNum: 1 });
  });

  test('rolls to the next chapter of the same book at a chapter last verse even without availableBooks', () => {
    // Regression: a bounds-aware caller that omits availableBooks must still roll within the book
    // (symmetric with getPreviousVerseRef). GEN 1 ends at verse 8 and is not GEN's last chapter, so
    // the in-book rollover applies before the book list is ever consulted.
    expect(getNextVerseRef({ book: 'GEN', chapterNum: 1, verseNum: 8 }, undefined, bounds)).toEqual(
      {
        book: 'GEN',
        chapterNum: 2,
        verseNum: 1,
      },
    );
  });

  test('returns undefined at the last chapter last verse without availableBooks (no book list to cross with)', () => {
    // GEN 3 is GEN's last chapter (per bounds), so crossing into the next book requires the book
    // list — which is omitted here, so there is nowhere to go.
    expect(
      getNextVerseRef({ book: 'GEN', chapterNum: 3, verseNum: 24 }, undefined, bounds),
    ).toBeUndefined();
  });
});

describe('getPreviousVerseRef with bounds', () => {
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

  test('falls back to the English canon for the previous book when bounds do not know it', () => {
    // ROM is not in verseCounts; the previous book MAT has 28 chapters in the English canon
    expect(
      getPreviousVerseRef({ book: 'ROM', chapterNum: 1, verseNum: 0 }, BOUNDED_BOOKS, bounds),
    ).toEqual({ book: 'MAT', chapterNum: 28, verseNum: 1 });
  });

  test('rolls a book not in availableBooks back to the previous present book last verse', () => {
    expect(
      getPreviousVerseRef({ book: 'EXO', chapterNum: 5, verseNum: 3 }, ['GEN', 'LEV'], bounds),
    ).toEqual({ book: 'GEN', chapterNum: 3, verseNum: 24 });
  });
});
