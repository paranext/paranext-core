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
  '%platformLexicalTools_dictionary_entryNotFound%': 'No entry was found for {lemma}',
  '%platformLexicalTools_dictionary_hideLessRelevantSenses%': 'Hide less-relevant senses ({count})',
  '%platformLexicalTools_dictionary_showLessRelevantSenses%': 'Show less-relevant senses ({count})',
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

/** The hide setting, for tests that never change it */
const FIXED_HIDE_SETTING = {
  areLessRelevantSensesHidden: false,
  onAreLessRelevantSensesHiddenChange: vi.fn(),
};

/**
 * The Dictionary as the web view hosts it: a reference that moves when an occurrence is selected,
 * and a hide setting that lasts. `areLessRelevantSensesHidden` sets where it starts.
 */
function DictionaryInScrollGroup({
  areLessRelevantSensesHidden: initiallyHidden = false,
  ...props
}: Partial<DictionaryProps>) {
  const [scrRef, setScrRef] = useState<SerializedVerseRef>(SCR_REF);
  const [areLessRelevantSensesHidden, setAreLessRelevantSensesHidden] = useState(initiallyHidden);
  return (
    <Dictionary
      localizedStrings={LOCALIZED_STRINGS}
      scrRef={scrRef}
      onSelectOccurrence={setScrRef}
      getEntries={getEntries}
      getFullEntry={async (e) => e}
      getEntryByLemma={async () => BETHLEHEM}
      areLessRelevantSensesHidden={areLessRelevantSensesHidden}
      onAreLessRelevantSensesHiddenChange={setAreLessRelevantSensesHidden}
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
      {...FIXED_HIDE_SETTING}
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

  it('says so when a linked entry cannot be found', async () => {
    render(<DictionaryInScrollGroup getEntryByLemma={async () => undefined} />);
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    expect(await screen.findByText('No entry was found for בֵּית לֶחֶם')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Bethlehem' })).not.toBeInTheDocument();
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

  it('shows a linked entry from outside the chapter whole, with every gloss', async () => {
    // Boaz occurs only in Ruth 4; the reader is in Ruth 1 and has hidden less-relevant senses
    render(
      <DictionaryInScrollGroup getEntryByLemma={async () => BOAZ} areLessRelevantSensesHidden />,
    );
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    const definition = await screen.findByText('a man of Bethlehem');
    expect(definition.closest('button')).toHaveAttribute('data-less-relevant', 'true');
    // The header and the sense card both show the gloss
    expect(screen.getAllByText('Boaz')).toHaveLength(2);
    expect(screen.queryByRole('button', { name: /less-relevant/ })).not.toBeInTheDocument();
  });

  it('keeps less-relevant senses hidden when the list reloads for another chapter', async () => {
    const entryInRuth1And4 = entry('000777', 'נָעֳמִי', [
      { gloss: 'Naomi', definition: 'see {S:00800400300000}', verseRefs: [SCR_REF] },
      { gloss: 'Mara', definition: 'her other name', verseRefs: [RUTH_4_11] },
      {
        gloss: 'pleasant',
        definition: 'the meaning of the name',
        verseRefs: [{ ...SCR_REF, book: 'GEN' }],
      },
    ]);
    render(
      <DictionaryInScrollGroup
        getEntries={async () => ({ entriesById: { [entryInRuth1And4.id]: [entryInRuth1And4] } })}
      />,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Hide less-relevant senses (2)' }));
    expect(screen.queryByText('her other name')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Ruth 4:3' }));
    expect(await screen.findByText('her other name')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show less-relevant senses (2)' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('the meaning of the name')).not.toBeInTheDocument();
  });

  it('keeps the Chapter/All choice when the list reloads, and starts a new entry on Chapter', async () => {
    const GEN_1_2 = { ...SCR_REF, book: 'GEN' };
    const GEN_2_1 = { book: 'GEN', chapterNum: 2, verseNum: 1 };
    const entryInRuth1And4 = entry('000777', 'נָעֳמִי', [
      { gloss: 'Naomi', definition: 'see {S:00800400300000}', verseRefs: [SCR_REF, GEN_1_2] },
      {
        gloss: 'Mara',
        definition: 'her other name; of {L:Bethlehem<SDBH:בֵּית לֶחֶם>}',
        verseRefs: [RUTH_4_11, GEN_2_1],
      },
    ]);
    render(
      <DictionaryInScrollGroup
        getEntries={async () => ({ entriesById: { [entryInRuth1And4.id]: [entryInRuth1And4] } })}
      />,
    );
    // Naomi's sense in Ruth 1 is selected; All lists its occurrence in Genesis too
    fireEvent.click(await screen.findByRole('button', { name: 'All (2)' }));
    expect(screen.getByRole('button', { name: 'Genesis 1:2' })).toBeInTheDocument();

    // In Ruth 4 the list reloads, and All still lists the other sense's occurrence in Genesis
    fireEvent.click(screen.getByRole('link', { name: 'Ruth 4:3' }));
    expect(await screen.findByRole('button', { name: 'Genesis 2:1' })).toBeInTheDocument();

    // A different entry opens on Chapter: Bethlehem's sense lists Ruth 4:11, not Ruth 1:2
    fireEvent.click(screen.getByRole('link', { name: 'Bethlehem' }));
    expect(await screen.findByText('a town in Judah')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ruth 4:11' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Ruth 1:2' })).not.toBeInTheDocument();
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

  it('still clears the selection when the reader goes elsewhere before a followed reference loads', async () => {
    const entriesByChapter: Record<number, Entry[]> = {
      1: [ELIMELECH],
      2: [BETHLEHEM, BOAZ],
      3: [ELIMELECH, BETHLEHEM],
    };
    const getEntriesByChapter = async (_scope: string, scrRef: SerializedVerseRef) => ({
      entriesById: Object.fromEntries(
        (entriesByChapter[scrRef.chapterNum] ?? []).map((e) => [e.id, [e]]),
      ),
    });
    const renderAt = (scrRef: SerializedVerseRef) => (
      <Dictionary
        localizedStrings={LOCALIZED_STRINGS}
        scrRef={scrRef}
        // The scroll group does not follow, so the list for Ruth 4 never loads
        onSelectOccurrence={vi.fn()}
        getEntries={getEntriesByChapter}
        getFullEntry={async (e) => e}
        getEntryByLemma={async () => BETHLEHEM}
        {...FIXED_HIDE_SETTING}
      />
    );
    const { rerender } = render(renderAt(SCR_REF));
    fireEvent.click(await screen.findByRole('link', { name: 'Ruth 4:3' }));

    rerender(renderAt({ ...SCR_REF, chapterNum: 2 }));
    fireEvent.click(await screen.findByText(BOAZ.lemma));
    expect(await screen.findByText('a man of Bethlehem')).toBeInTheDocument();

    // Boaz is not listed in Ruth 3, so it is no longer selected there
    rerender(renderAt({ ...SCR_REF, chapterNum: 3 }));
    expect(await screen.findByText(ELIMELECH.lemma)).toBeInTheDocument();
    expect(screen.queryByText('a man of Bethlehem')).not.toBeInTheDocument();
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
