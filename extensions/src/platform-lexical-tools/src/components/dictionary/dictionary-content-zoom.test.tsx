// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { Entry } from 'platform-lexical-tools';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';
import { DictionaryListItem } from './dictionary-list-item.component';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
});

const MARKER = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`;
const SCR_REF = { book: 'GEN', chapterNum: 1, verseNum: 1 };

// Only the fields these two components read are filled in; the full Entry type carries many more.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const ENTRY = {
  id: 'e1',
  lexicalReferenceTextId: 'SDBH',
  lemma: 'בְּרֵאשִׁית',
  strongsCodes: ['H7225'],
  senses: {
    s1: {
      id: 's1',
      lexicalReferenceTextId: 'SDBH',
      glosses: ['beginning'],
      definition: 'The first part of a period of time',
      domains: [],
      occurrences: { project: [{ verseRef: SCR_REF, wordNum: 1 }] },
    },
  },
} as unknown as Entry;

describe('dictionary content zoom', () => {
  it('marks the lemma in the list item, not its counts or Strong’s codes', () => {
    const { container } = render(
      <DictionaryListItem
        entry={ENTRY}
        isSelected={false}
        localizedStrings={{}}
        scrRef={SCR_REF}
        scope="chapter"
        onClick={vi.fn()}
      />,
    );
    const marked = [...container.querySelectorAll(MARKER)].map((m) => m.textContent);
    expect(marked).toEqual(['בְּרֵאשִׁית']);
  });

  it('marks the title lemma, the gloss and the definition, and no headings or controls', () => {
    const { container, getAllByRole } = render(
      <DictionaryEntryDisplay
        localizedStrings={{
          '%platformLexicalTools_dictionary_occurrencesForSenseLabel%':
            'Occurrences for sense {index}',
        }}
        dictionaryEntry={ENTRY}
        isDrawer={false}
        scriptureReferenceToFilterBy={SCR_REF}
        onSelectOccurrence={vi.fn()}
        onClickScrollToTop={vi.fn()}
      />,
    );
    const marked = [...container.querySelectorAll(MARKER)].map((m) => m.textContent);
    expect(marked).toEqual(['בְּרֵאשִׁית', 'beginning', 'The first part of a period of time']);
    container
      .querySelectorAll('h3')
      .forEach((heading) => expect(heading.closest(MARKER)).toBeNull());
    getAllByRole('button').forEach((button) => expect(button.querySelector('h3')).toBeNull());
    container.querySelectorAll(MARKER).forEach((marker) => {
      expect(marker.parentElement?.closest(MARKER)).toBeNull();
    });
  });
});
