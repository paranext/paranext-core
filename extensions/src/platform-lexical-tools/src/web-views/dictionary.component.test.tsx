// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Entry } from 'platform-lexical-tools';
import { useState } from 'react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { Dictionary, DictionaryProps } from './dictionary.component';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.scrollTo = vi.fn();
});

beforeEach(() => {
  vi.mocked(Element.prototype.scrollTo).mockClear();
});

const SCR_REF = { book: 'RUT', chapterNum: 1, verseNum: 2 };
const RUTH_4_11 = { book: 'RUT', chapterNum: 4, verseNum: 11 };
const BACK_LABEL = 'Back to List';
const LOCALIZED_STRINGS = {
  '%platformLexicalTools_dictionary_allOccurrencesLabel%': 'Occurrences',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%': 'Occurrences for {index}',
  '%platformLexicalTools_dictionary_backToList%': BACK_LABEL,
  '%platformLexicalTools_dictionary_hideLessRelevantSenses%': 'Hide less-relevant senses ({count})',
  '%platformLexicalTools_dictionary_occurrencesToggleChapter%': 'Chapter',
  '%platformLexicalTools_dictionary_occurrencesToggleAll%': 'All',
};

type TestSense = { gloss: string; definition: string; verseRefs: SerializedVerseRef[] };

const entry = (id: string, lemma: string, senses: TestSense[]): Entry => {
  // Only the fields these components read are filled in; the full Entry type carries many more.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    id,
    lexicalReferenceTextId: 'SDBH',
    lemma,
    strongsCodes: [],
    occurrences: {},
    domains: [],
    senses: Object.fromEntries(
      senses.map(({ gloss, definition, verseRefs }, index) => {
        const senseId = `${id}00${index + 1}001000`;
        return [
          senseId,
          {
            id: senseId,
            lexicalReferenceTextId: 'SDBH',
            glosses: [gloss],
            definition,
            domains: [],
            occurrences: { project: verseRefs.map((verseRef) => ({ verseRef, wordNum: 1 })) },
          },
        ];
      }),
    ),
  } as unknown as Entry;
};

const ELIMELECH = entry('000421', 'אֱלִימֶלֶךְ', [
  {
    gloss: 'Elimelech',
    definition: 'from {L:Bethlehem<SDBH:בֵּית לֶחֶם>}; see {S:00800400300000}',
    verseRefs: [SCR_REF],
  },
]);
const BETHLEHEM = entry('000999', 'בֵּית לֶחֶם', [
  { gloss: 'Bethlehem', definition: 'a town in Judah', verseRefs: [SCR_REF, RUTH_4_11] },
  {
    gloss: 'Ephrath',
    definition: 'the old name of the town',
    verseRefs: [{ ...SCR_REF, book: 'GEN', chapterNum: 35 }],
  },
]);
const BOAZ = entry('000888', 'בֹּעַז', [
  { gloss: 'Boaz', definition: 'a man of Bethlehem', verseRefs: [RUTH_4_11] },
]);

/** Ruth 1 holds Elimelech only; Ruth 4 holds Elimelech, Bethlehem and Boaz */
const getEntries = vi.fn(async (_scope: string, scrRef: SerializedVerseRef) => {
  const entries = scrRef.chapterNum === 4 ? [ELIMELECH, BETHLEHEM, BOAZ] : [ELIMELECH];
  return { entriesById: Object.fromEntries(entries.map((e) => [e.id, [e]])) };
});

/** The Dictionary with a reference that moves when an occurrence is selected, as in the app */
function DictionaryInScrollGroup(props: Partial<DictionaryProps>) {
  const [scrRef, setScrRef] = useState<SerializedVerseRef>(SCR_REF);
  return (
    <Dictionary
      localizedStrings={LOCALIZED_STRINGS}
      scrRef={scrRef}
      onSelectOccurrence={setScrRef}
      getEntries={getEntries}
      getFullEntry={async (e) => e}
      getEntryByLemma={async () => BETHLEHEM}
      {...props}
    />
  );
}

const renderDictionary = (onSelectOccurrence = vi.fn()) => {
  const getEntryByLemma = vi.fn().mockResolvedValue(BETHLEHEM);
  render(
    <Dictionary
      localizedStrings={LOCALIZED_STRINGS}
      scrRef={SCR_REF}
      onSelectOccurrence={onSelectOccurrence}
      getEntries={getEntries}
      getFullEntry={vi.fn().mockResolvedValue(ELIMELECH)}
      getEntryByLemma={getEntryByLemma}
    />,
  );
  return getEntryByLemma;
};

describe('Dictionary entry links', () => {
  it('opens the linked entry even when it is outside the current chapter', async () => {
    const getEntryByLemma = renderDictionary();
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    expect(await screen.findByText('a town in Judah')).toBeInTheDocument();
    expect(getEntryByLemma).toHaveBeenCalledWith('SDBH', 'בֵּית לֶחֶם');
  });

  it('returns to the original entry from the back button', async () => {
    renderDictionary();
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    fireEvent.click(await screen.findByRole('button', { name: BACK_LABEL }));
    expect(await screen.findByRole('link', { name: 'Bethlehem' })).toBeInTheDocument();
    expect(screen.queryByText('a town in Judah')).not.toBeInTheDocument();
  });

  it('scrolls to the top when a linked entry opens', async () => {
    renderDictionary();
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    await screen.findByText('a town in Judah');
    expect(Element.prototype.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it('leaves the linked view when an occurrence is selected', async () => {
    const onSelectOccurrence = vi.fn();
    renderDictionary(onSelectOccurrence);
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    await screen.findByText('a town in Judah');
    fireEvent.click(screen.getByRole('button', { name: 'Ruth 1:2' }));
    expect(onSelectOccurrence).toHaveBeenCalledWith(SCR_REF);
    expect(screen.queryByRole('button', { name: BACK_LABEL })).not.toBeInTheDocument();
  });

  it('dims the senses of a linked entry that are not in the chapter', async () => {
    renderDictionary();
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    expect(await screen.findByText('the old name of the town')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Hide less-relevant senses (1)' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Chapter (1)' })).toBeInTheDocument();
  });

  it('keeps a linked entry open after going to its occurrence in another chapter', async () => {
    render(<DictionaryInScrollGroup />);
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    await screen.findByText('a town in Judah');
    // Bethlehem's one sense in Ruth 1 is selected, so its occurrences are listed
    fireEvent.click(screen.getByRole('button', { name: 'All (2)' }));
    fireEvent.click(screen.getByRole('button', { name: 'Ruth 4:11' }));
    expect(await screen.findByText('Ruth 4:11', { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText('a town in Judah')).toBeInTheDocument();
  });

  it('keeps the entry open after following a Bible reference to another chapter', async () => {
    render(<DictionaryInScrollGroup />);
    fireEvent.click(await screen.findByRole('link', { name: 'Ruth 4:3' }));
    // Ruth 4 lists three entries; Elimelech stays open beside them
    expect(await screen.findByText('Boaz')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Bethlehem' })).toBeInTheDocument();
  });

  it('numbers senses only once the full entry has loaded', async () => {
    let resolveFullEntry: (fullEntry: Entry) => void = () => {};
    const getFullEntry = () =>
      new Promise<Entry>((resolve) => {
        resolveFullEntry = resolve;
      });
    // In Ruth 1 the list holds only the sense of Bethlehem that occurs there
    const bethlehemInRuth1 = entry(BETHLEHEM.id, BETHLEHEM.lemma, [
      { gloss: 'Bethlehem', definition: 'a town in Judah', verseRefs: [SCR_REF] },
    ]);
    render(
      <DictionaryInScrollGroup
        getEntries={async () => ({ entriesById: { [BETHLEHEM.id]: [bethlehemInRuth1] } })}
        getFullEntry={getFullEntry}
      />,
    );
    const senseCard = (await screen.findByText('a town in Judah')).closest('button');
    expect(senseCard).not.toHaveTextContent(/^\d/);

    resolveFullEntry(BETHLEHEM);
    expect(await screen.findByText('the old name of the town')).toBeInTheDocument();
    expect(screen.getByText('a town in Judah').closest('button')).toHaveTextContent(/^1/);
  });

  it('looks up nothing for a link with an empty target', async () => {
    const getEntryByLemma = vi.fn().mockResolvedValue(BETHLEHEM);
    render(
      <DictionaryInScrollGroup
        getEntries={async () => ({
          entriesById: {
            [ELIMELECH.id]: [
              entry(ELIMELECH.id, ELIMELECH.lemma, [
                { gloss: 'Elimelech', definition: 'see {L:Moab<SDBH:>}', verseRefs: [SCR_REF] },
              ]),
            ],
          },
        })}
        getEntryByLemma={getEntryByLemma}
      />,
    );
    expect(await screen.findByText(/see Moab/)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Moab' })).not.toBeInTheDocument();
    expect(getEntryByLemma).not.toHaveBeenCalled();
  });
});
