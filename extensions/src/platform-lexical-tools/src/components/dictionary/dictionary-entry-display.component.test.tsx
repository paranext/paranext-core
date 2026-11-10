// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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

// Two lexical meanings: the first occurs in Exodus 2, the second in Genesis 1
const OTHER_LEXICAL_ID = '001555001001000';
// Only the fields this component reads are filled in, as in ENTRY
// eslint-disable-next-line no-type-assertion/no-type-assertion
const TWO_SENSE_ENTRY = {
  ...ENTRY,
  senses: {
    [OTHER_LEXICAL_ID]: sense(OTHER_LEXICAL_ID, 'word', 'EXO', 2),
    [LEXICAL_ID]: sense(LEXICAL_ID, 'to speak', 'GEN', 1),
  },
} as unknown as Entry;

const LOCALIZED_STRINGS = {
  '%platformLexicalTools_dictionary_allOccurrencesLabel%': 'Occurrences',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%': 'Occurrences for {index}',
  '%platformLexicalTools_dictionary_hideLessRelevantSenses%': 'Hide less-relevant senses ({count})',
  '%platformLexicalTools_dictionary_showLessRelevantSenses%': 'Show less-relevant senses ({count})',
};

// The header repeats glosses, so pick the copy inside a sense card
const senseCard = (gloss: string) =>
  screen
    .queryAllByText(gloss)
    .map((element) => element.closest('button'))
    .find((card) => card);

const renderEntry = (scrRef?: ReturnType<typeof verseRef>, dictionaryEntry = ENTRY) =>
  render(
    <DictionaryEntryDisplay
      localizedStrings={LOCALIZED_STRINGS}
      dictionaryEntry={dictionaryEntry}
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

  it('lists senses outside the chapter, dimmed', () => {
    renderEntry(verseRef('GEN', 1), TWO_SENSE_ENTRY);
    expect(senseCard('word')).toHaveAttribute('data-less-relevant', 'true');
    expect(senseCard('to speak')).toHaveAttribute('data-less-relevant', 'false');
  });

  it('hides and shows less-relevant senses, keeping sense numbers', () => {
    renderEntry(verseRef('GEN', 1), TWO_SENSE_ENTRY);
    fireEvent.click(screen.getByRole('button', { name: 'Hide less-relevant senses (1)' }));
    expect(screen.queryByText('word')).not.toBeInTheDocument();
    expect(senseCard('to speak')).toHaveTextContent(/^2/);

    fireEvent.click(screen.getByRole('button', { name: 'Show less-relevant senses (1)' }));
    expect(screen.getByText('word')).toBeInTheDocument();
  });

  it('deselects a selected sense when it is hidden', () => {
    renderEntry(verseRef('GEN', 1), TWO_SENSE_ENTRY);
    // Only the sense card shows this gloss; the header lists glosses of senses in the chapter
    fireEvent.click(screen.getByText('word'));
    expect(screen.getByText('Occurrences for 1')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide less-relevant senses (1)' }));
    expect(screen.queryByText('Occurrences for 1')).not.toBeInTheDocument();
  });

  it('offers no hide control when every sense is relevant', () => {
    renderEntry(undefined, TWO_SENSE_ENTRY);
    expect(senseCard('word')).toHaveAttribute('data-less-relevant', 'false');
    expect(screen.queryByRole('button', { name: /less-relevant/ })).not.toBeInTheDocument();
  });
});
