// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { UsjReaderWriter } from 'platform-bible-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import SearchResult, { HidableFindResult } from './search-result.component';

const MARKER = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`;
const VERSE_REF = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const USFM = 'In the beginning God created';
const RESULT: HidableFindResult = {
  text: 'beginning',
  start: { verseRef: VERSE_REF, offset: 7 },
  end: { verseRef: VERSE_REF, offset: 16 },
};

// The card only computes its verse context once visible; report it as visible at once.
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

// A reader that maps the result's start and end to fixed offsets in `USFM`. Only these two methods
// are reached; building a real UsjReaderWriter needs a whole book of USJ.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const READER = {
  usfmVerseLocationToIndexInUsfm: (location: { offset?: number }) => location.offset ?? 0,
  toUsfm: () => USFM,
} as unknown as UsjReaderWriter;

function renderCard(overrides: Partial<Parameters<typeof SearchResult>[0]> = {}) {
  return render(
    <SearchResult
      searchResult={RESULT}
      globalResultsIndex={0}
      isSelected
      usjReaderWriter={READER}
      cachedUsfm={USFM}
      localizedBookData={new Map([['GEN', { localizedId: 'GEN', localizedName: 'Genesis' }]])}
      onResultClick={vi.fn()}
      onHideResult={vi.fn()}
      onReplace={vi.fn()}
      isReplaceMode={false}
      isReplacing={false}
      isReplaceBlocked={false}
      replaceBlockedTooltipText=""
      localizedStrings={{
        '%webView_find_loadingVerseText%': 'Loading verse text…',
        '%webView_find_replace%': 'Replace',
      }}
      {...overrides}
    />,
  );
}

describe('SearchResult content zoom', () => {
  it('marks the snippet and the verse context, but not the reference button', () => {
    const { container, getByRole } = renderCard();
    // Exact name: the card's own role="button" wrapper also contains the reference text.
    const referenceButton = getByRole('button', { name: 'Genesis 1:1' });
    expect(referenceButton.closest(MARKER)).toBeNull();
    expect(referenceButton.nextElementSibling).toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE, '');
    // The expanded verse context, with its highlighted match, is one marked span.
    const match = container.querySelector('mark');
    expect(match?.closest(MARKER)).toHaveTextContent('In the beginning God created');
  });

  it('leaves the loading message at interface size', () => {
    const { getByText } = renderCard({ usjReaderWriter: undefined });
    expect(getByText('Loading verse text…').closest(MARKER)).toBeNull();
  });

  it('marks the replace preview text but not its arrow icon', () => {
    const { container } = renderCard({
      isReplaceMode: true,
      replaceConfig: { term: 'start', preserveCase: false },
      previewOptions: {
        layout: 'arrow',
        highlightShape: 'rounded',
        color: 'red-green',
        monospace: false,
        showInvisible: false,
      },
    });
    const markedTexts = [...container.querySelectorAll(MARKER)].map((m) => m.textContent);
    expect(markedTexts).toEqual(expect.arrayContaining(['beginning', 'start']));
    container.querySelectorAll('svg').forEach((icon) => expect(icon.closest(MARKER)).toBeNull());
    container.querySelectorAll(MARKER).forEach((marker) => {
      expect(marker.parentElement?.closest(MARKER)).toBeNull();
    });
  });
});
