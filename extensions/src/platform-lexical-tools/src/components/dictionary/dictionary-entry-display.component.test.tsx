// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Entry } from 'platform-lexical-tools';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { DictionaryEntryDisplay } from './dictionary-entry-display.component';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
});

const LEXICAL_ID = '001555002001000';
const CONTEXTUAL_ID = '001555002001001';
const verseRef = (book: string, chapterNum: number) => ({ book, chapterNum, verseNum: 1 });

const sense = (id: string, gloss: string, book: string, chapterNum: number) => ({
  id,
  lexicalReferenceTextId: 'SDBH',
  glosses: [gloss],
  domains: [],
  occurrences: { project: [{ verseRef: verseRef(book, chapterNum), wordNum: 1 }] },
});

// Only the fields this component reads are filled in; the full Entry type carries many more.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const ENTRY = {
  id: 'e1',
  lexicalReferenceTextId: 'SDBH',
  lemma: 'דבר',
  strongsCodes: ['H1696'],
  senses: {
    [LEXICAL_ID]: sense(LEXICAL_ID, 'to speak', 'GEN', 1),
    [CONTEXTUAL_ID]: sense(CONTEXTUAL_ID, 'to speak to X', 'EXO', 2),
  },
} as unknown as Entry;

const LOCALIZED_STRINGS = {
  '%platformLexicalTools_dictionary_allOccurrencesLabel%': 'Occurrences',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%': 'Occurrences for {index}',
};

const renderEntry = (scrRef?: ReturnType<typeof verseRef>) =>
  render(
    <DictionaryEntryDisplay
      localizedStrings={LOCALIZED_STRINGS}
      dictionaryEntry={ENTRY}
      isDrawer={false}
      scriptureReferenceToFilterBy={scrRef}
      onSelectOccurrence={vi.fn()}
      onClickScrollToTop={vi.fn()}
    />,
  );

describe('DictionaryEntryDisplay senses', () => {
  it('numbers lexical meanings only', () => {
    renderEntry();
    expect(screen.getAllByText('to speak').length).toBeGreaterThan(0);
    expect(screen.queryByText('to speak to X')).not.toBeInTheDocument();
  });

  it('shows a lexical sense when only its contextual child occurs in the chapter', () => {
    renderEntry(verseRef('EXO', 2));
    expect(screen.queryByText('to speak to X')).not.toBeInTheDocument();
    expect(screen.getAllByText('to speak').length).toBeGreaterThan(0);
  });
});
