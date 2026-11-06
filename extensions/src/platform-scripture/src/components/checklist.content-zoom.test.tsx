// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { ChecklistTool } from './checklist.component';
import type { ChecklistData } from './checklist.types';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: false,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
});

const MARKER = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`;
const REF = { start: { book: 'EXO', chapterNum: 20, verseNum: 2 } };

const DATA: ChecklistData = {
  columnHeaders: ['TST', 'CMP'],
  columnProjectIds: ['p1', 'p2'],
  excludedCount: 0,
  rows: [
    {
      isMatch: false,
      includeEditLink: false,
      firstRef: REF,
      cells: [
        {
          reference: REF,
          language: 'en',
          paragraphs: [
            {
              marker: 'q2',
              items: [
                { type: 'verse', verseNumber: '2' },
                { type: 'text', text: 'I am the LORD' },
                { type: 'text', text: 'your God', characterStyle: 'nd' },
                { type: 'link', reference: REF, displayText: 'Exo 20:2' },
                { type: 'error', message: 'Backend error text' },
                { type: 'message', message: 'Backend message text' },
              ],
            },
          ],
        },
        { reference: REF, language: 'en', paragraphs: [], error: 'Cell error text' },
      ],
    },
  ],
};

describe('ChecklistTool content zoom', () => {
  it('marks the marker token and the project text, not backend messages or placeholders', () => {
    const { container, getByText } = render(
      <ChecklistTool data={DATA} isLoading={false} hideMatches={false} showVerseText />,
    );
    const marked = [...container.querySelectorAll(MARKER)].map((m) => m.textContent);
    expect(marked).toEqual(['\\q2', '2', 'I am the LORD', '(\\nd your God)', 'Exo 20:2']);
    ['Backend error text', 'Backend message text', 'Cell error text'].forEach((text) =>
      expect(getByText(text).closest(MARKER)).toBeNull(),
    );
    // The indent sits on the unmarked row, so it does not scale with the text.
    const row = container.querySelector('[data-marker="q2"]');
    expect(row).not.toHaveAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE);
    container.querySelectorAll(MARKER).forEach((marker) => {
      expect(marker.getAttribute(CONTENT_ZOOM_ROOT_ATTRIBUTE)).toBe('');
      expect(marker.parentElement?.closest(MARKER)).toBeNull();
    });
  });
});
