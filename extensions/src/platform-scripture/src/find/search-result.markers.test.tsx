// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsjReaderWriter } from 'platform-bible-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import SearchResult, { HidableFindResult } from './search-result.component';
import { PreviewOptions } from './replace-preview-types';

const VERSE_REF = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const USFM = 'of b\n\\p And the rest';
const RESULT_WITH_MARKER: HidableFindResult = {
  text: 'bAnd',
  start: { verseRef: VERSE_REF, offset: 3 },
  end: { verseRef: VERSE_REF, offset: 11 },
  matchedUsfm: 'b\n\\p And',
  removedMarkers: ['p'],
};
const RESULT_WITHOUT_MARKER: HidableFindResult = {
  text: 'And',
  start: { verseRef: VERSE_REF, offset: 8 },
  end: { verseRef: VERSE_REF, offset: 11 },
  matchedUsfm: 'And',
};

const COPY_VERSE_TEXT = 'Copy verse text';

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
});

// Only these two methods are reached; building a real UsjReaderWriter needs a whole book of USJ.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const READER = {
  usfmVerseLocationToIndexInUsfm: (location: { offset?: number }) => location.offset ?? 0,
  toUsfm: () => USFM,
} as unknown as UsjReaderWriter;

function renderCard(
  searchResult: HidableFindResult,
  overrides: Partial<Parameters<typeof SearchResult>[0]> = {},
) {
  return render(
    <SearchResult
      searchResult={searchResult}
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
      shouldShowMarkers
      localizedStrings={{ '%webView_find_copyVerseText%': COPY_VERSE_TEXT }}
      {...overrides}
    />,
  );
}

const markerChips = (container: HTMLElement) => [
  ...container.querySelectorAll('[data-usfm-marker]'),
];

describe('SearchResult with a match that includes markers', () => {
  it('shows the marker in the summary and in the highlighted match', () => {
    const { container } = renderCard(RESULT_WITH_MARKER);

    expect(markerChips(container).map((chip) => chip.textContent)).toEqual(['\\p', '\\p']);
    expect(container.querySelector('mark')).toHaveTextContent('b \\p And');
  });

  it('shows no marker where the markers are not to be shown', () => {
    const { container } = renderCard(RESULT_WITH_MARKER, { shouldShowMarkers: false });

    expect(markerChips(container)).toEqual([]);
    expect(container.querySelector('mark')).toHaveTextContent('b And');
  });

  it('shows no marker for a match that includes none', () => {
    const { container } = renderCard(RESULT_WITHOUT_MARKER);

    expect(markerChips(container)).toEqual([]);
    expect(container.querySelector('mark')).toHaveTextContent('And');
  });

  it.each(['arrow', 'inline', 'block'] as const)(
    'shows the marker in the %s replace preview',
    (layout) => {
      const previewOptions: PreviewOptions = {
        layout,
        highlightShape: 'rounded',
        color: 'red-green',
        monospace: false,
        showInvisible: false,
      };
      const { container } = renderCard(RESULT_WITHOUT_MARKER, {
        isReplaceMode: true,
        replaceConfig: { term: 'X', preserveCase: false },
        previewOptions,
      });
      expect(markerChips(container)).toEqual([]);

      const { container: withMarker } = renderCard(RESULT_WITH_MARKER, {
        isReplaceMode: true,
        replaceConfig: { term: 'X', preserveCase: false },
        previewOptions,
      });
      // Past the one in the summary, the preview has to show it too.
      expect(markerChips(withMarker).length).toBeGreaterThan(1);
    },
  );

  it('keeps markers out of the copied verse text', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    // `userEvent.setup` installs a stub clipboard, so this has to come after it.
    const writeText = vi.spyOn(navigator.clipboard, 'writeText');
    const { container } = renderCard(RESULT_WITH_MARKER);
    expect(markerChips(container).length).toBeGreaterThan(0);

    const trigger = container.querySelector('[aria-haspopup="menu"]');
    if (!trigger) throw new Error('Expected the result card to have a menu');
    await user.click(trigger);
    await user.click(await screen.findByText(COPY_VERSE_TEXT));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith('of b And the rest');
  });
});
