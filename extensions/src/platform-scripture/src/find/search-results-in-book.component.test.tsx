// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { Usj, USJ_TYPE } from '@eten-tech-foundation/scripture-utilities';
import { render, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { SearchResultsInBook } from './search-results-in-book.component';
import { HidableFindResult } from './search-result.component';

const NBSP = '\u00A0';
const VERSE_REF = { book: 'MAT', chapterNum: 1, verseNum: 1 };

// `\v 1 Mr.` + NBSP is 9 code units, so "Abraham" sits at verse offsets 9 to 16
const BOOK_USJ: Usj = {
  type: USJ_TYPE,
  // Paratext serves USJ 3.0, which the markers map Find uses is for
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'MAT', content: [] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'MAT 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'MAT 1:1' },
        `Mr.${NBSP}Abraham fathered Isaac.`,
      ],
    },
  ],
};

const RESULT: HidableFindResult = {
  text: 'Abraham',
  start: { verseRef: VERSE_REF, offset: 9 },
  end: { verseRef: VERSE_REF, offset: 16 },
};

// A result card only computes its verse context once visible; report it as visible at once.
beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn((callback: (entries: { isIntersecting: boolean }[]) => void) => ({
      observe: () => callback([{ isIntersecting: true }]),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })),
  );
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = vi.fn();
});

/** Renders the book's results and returns the verse context shown around the match. */
async function verseContextShown(allowInvisibleCharacters: boolean): Promise<string> {
  const { container } = render(
    <SearchResultsInBook
      getBookUsj={() => Promise.resolve(BOOK_USJ)}
      bookId="MAT"
      results={[RESULT]}
      localizedBookData={new Map([['MAT', { localizedId: 'MAT', localizedName: 'Matthew' }]])}
      focusedResultIndex={undefined}
      onResultClick={vi.fn()}
      onHideResult={vi.fn()}
      onReplace={vi.fn()}
      isReplaceMode={false}
      isReplacing={false}
      isReplaceBlocked={false}
      replaceBlockedTooltipText=""
      allowInvisibleCharacters={allowInvisibleCharacters}
      localizedStrings={{ '%webView_find_loadingVerseText%': 'Loading verse text…' }}
    />,
  );
  const match = await waitFor(() => {
    const mark = container.querySelector('mark');
    if (!mark?.parentElement) throw new Error('The verse context has not loaded yet');
    return mark;
  });
  return match.parentElement?.textContent ?? '';
}

describe('SearchResultsInBook verse context', () => {
  // The context is cut out of the book's USFM, whose spelling of a no-break space depends on the
  // project's "Allow invisible characters" setting.
  it('setting off: shows a no-break space as ~, as the project USFM spells it', async () => {
    expect(await verseContextShown(false)).toContain('Mr.~Abraham');
  });

  it('setting on: shows a no-break space as itself, because ~ would be a literal tilde', async () => {
    const context = await verseContextShown(true);

    expect(context).toContain(`Mr.${NBSP}Abraham`);
    expect(context).not.toContain('~');
  });
});
