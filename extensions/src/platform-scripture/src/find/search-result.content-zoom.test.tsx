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
    const { getByText, getByRole } = renderCard({ usjReaderWriter: undefined });
    expect(getByText('Loading verse text…').closest(MARKER)).toBeNull();
    // Positive control: the snippet next to the reference is still marked while the verse loads.
    expect(getByRole('button', { name: 'Genesis 1:1' }).nextElementSibling).toHaveAttribute(
      CONTENT_ZOOM_ROOT_ATTRIBUTE,
      '',
    );
  });

  // Each row lists every marker in DOM order: the header snippet first, then the verse context (arrow
  // only) and the preview. Inline embeds the whole preview, highlights included, in one div marker;
  // block marks each of its two lines with its own before and after context.
  it.each([
    {
      layout: 'arrow',
      marked: [
        ['SPAN', 'beginning'],
        ['SPAN', 'In the beginning God created'],
        ['SPAN', 'beginning'],
        ['SPAN', 'start'],
      ],
    },
    {
      layout: 'inline',
      marked: [
        ['SPAN', 'beginning'],
        ['DIV', 'In the beginningstart God created'],
      ],
    },
    {
      layout: 'block',
      marked: [
        ['SPAN', 'beginning'],
        ['SPAN', 'In the beginning God created'],
        ['SPAN', 'In the start God created'],
      ],
    },
  ] as const)('marks the $layout replace preview text but not its icons', ({ layout, marked }) => {
    const { container } = renderCard({
      isReplaceMode: true,
      replaceConfig: { term: 'start', preserveCase: false },
      previewOptions: {
        layout,
        highlightShape: 'rounded',
        color: 'red-green',
        monospace: false,
        showInvisible: false,
      },
    });
    const markers = [...container.querySelectorAll(MARKER)];
    expect(markers.map((m) => [m.tagName, m.textContent])).toEqual(marked);
    container.querySelectorAll('svg').forEach((icon) => expect(icon.closest(MARKER)).toBeNull());
    // No marker nests in another, so the inline layout's highlight spans stay unmarked.
    markers.forEach((marker) => {
      expect(marker.parentElement?.closest(MARKER)).toBeNull();
    });
  });
});
