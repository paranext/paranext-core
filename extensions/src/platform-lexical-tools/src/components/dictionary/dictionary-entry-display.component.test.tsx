// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Entry } from 'platform-lexical-tools';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  DictionaryEntryDisplay,
  DictionaryEntryDisplayProps,
} from './dictionary-entry-display.component';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
});

const verseRef = (book: string, chapterNum: number, verseNum = 1) => ({
  book,
  chapterNum,
  verseNum,
});

const sense = (id: string, gloss: string, book: string, chapterNum: number, verseNum = 1) => ({
  id,
  lexicalReferenceTextId: 'SDBH',
  glosses: [gloss],
  domains: [],
  occurrences: { project: [{ verseRef: verseRef(book, chapterNum, verseNum), wordNum: 1 }] },
});

// Two senses: the first occurs in Exodus 2, the second in Genesis 1. Only the fields this component
// reads are filled in; the full Entry type carries many more.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const TWO_SENSE_ENTRY = {
  id: 'e1',
  lexicalReferenceTextId: 'SDBH',
  lemma: 'דבר',
  strongsCodes: ['H1696'],
  senses: {
    s1: sense('s1', 'word', 'EXO', 2),
    s2: sense('s2', 'to speak', 'GEN', 1),
  },
} as unknown as Entry;

const LOCALIZED_STRINGS = {
  '%platformLexicalTools_dictionary_allOccurrencesLabel%': 'Occurrences',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%': 'Occurrences for {index}',
  '%platformLexicalTools_dictionary_hideLessRelevantSenses%': 'Hide less-relevant senses ({count})',
  '%platformLexicalTools_dictionary_showLessRelevantSenses%': 'Show less-relevant senses ({count})',
  '%platformLexicalTools_dictionary_occurrencesToggleChapter%': 'Chapter',
  '%platformLexicalTools_dictionary_occurrencesToggleAll%': 'All',
};

// The header repeats glosses, so pick the copy inside a sense card
const senseCard = (gloss: string) =>
  screen
    .queryAllByText(gloss)
    .map((element) => element.closest('button'))
    .find((card) => card);

const renderEntry = (
  scrRef?: ReturnType<typeof verseRef>,
  dictionaryEntry = TWO_SENSE_ENTRY,
  onSelectOccurrence = vi.fn(),
  otherProps: Partial<DictionaryEntryDisplayProps> = {},
) =>
  render(
    <DictionaryEntryDisplay
      localizedStrings={LOCALIZED_STRINGS}
      dictionaryEntry={dictionaryEntry}
      isDrawer={false}
      scriptureReferenceToFilterBy={scrRef}
      onSelectOccurrence={onSelectOccurrence}
      onClickScrollToTop={vi.fn()}
      {...otherProps}
    />,
  );

describe('DictionaryEntryDisplay senses', () => {
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

  it('dims a sense elsewhere in the chapter in verse scope', () => {
    // Only the fields this component reads are filled in; the full Entry type carries many more.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const entry = {
      ...TWO_SENSE_ENTRY,
      senses: { s1: sense('s1', 'word', 'GEN', 1, 1), s2: sense('s2', 'to speak', 'GEN', 1, 5) },
    } as unknown as Entry;
    renderEntry(verseRef('GEN', 1, 5), entry, vi.fn(), { scope: 'verse' });
    expect(senseCard('word')).toHaveAttribute('data-less-relevant', 'true');
    expect(senseCard('to speak')).toHaveAttribute('data-less-relevant', 'false');
  });

  it('counts the occurrences of every sense when none is in the chapter', () => {
    renderEntry(verseRef('LEV', 1), TWO_SENSE_ENTRY);
    expect(screen.getByRole('button', { name: 'All (2)' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Chapter (0)' })).toBeInTheDocument();
  });

  it('neither numbers nor dims senses when the entry may be missing some', () => {
    renderEntry(verseRef('GEN', 1), TWO_SENSE_ENTRY, vi.fn(), { hasAllSenses: false });
    expect(senseCard('word')).not.toHaveTextContent(/^\d/);
    expect(senseCard('word')).toHaveAttribute('data-less-relevant', 'false');
    expect(screen.queryByRole('button', { name: /less-relevant/ })).not.toBeInTheDocument();
  });

  it('offers no hide control when every sense is relevant', () => {
    renderEntry(undefined, TWO_SENSE_ENTRY);
    expect(senseCard('word')).toHaveAttribute('data-less-relevant', 'false');
    expect(screen.queryByRole('button', { name: /less-relevant/ })).not.toBeInTheDocument();
  });

  it('shows glosses without their markup', () => {
    // Only the fields this component reads are filled in; the full Entry type carries many more.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const entry = {
      ...TWO_SENSE_ENTRY,
      senses: { s1: { ...sense('s1', 'hearing{N:001}', 'GEN', 1) } },
    } as unknown as Entry;
    renderEntry(undefined, entry);
    expect(senseCard('hearing')).toBeTruthy();
    expect(screen.queryByText(/\{N:/)).not.toBeInTheDocument();
  });

  it('goes to the verse of a Bible reference in a definition', () => {
    const onSelectOccurrence = vi.fn();
    // Only the fields this component reads are filled in; the full Entry type carries many more.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const entry = {
      ...TWO_SENSE_ENTRY,
      senses: {
        s1: { ...sense('s1', 'a place', 'GEN', 1), definition: 'see {S:04200600300000}' },
      },
    } as unknown as Entry;
    renderEntry(undefined, entry, onSelectOccurrence);
    fireEvent.click(screen.getByRole('link', { name: 'Luke 6:3' }));
    expect(onSelectOccurrence).toHaveBeenCalledWith({ book: 'LUK', chapterNum: 6, verseNum: 3 });
  });
});
