// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Entry } from 'platform-lexical-tools';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Dictionary } from './dictionary.component';

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    vi.fn(() => ({ observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() })),
  );
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.scrollTo = vi.fn();
});

const SCR_REF = { book: 'RUT', chapterNum: 1, verseNum: 2 };
const BACK_LABEL = 'Back to List';
const LOCALIZED_STRINGS = {
  '%platformLexicalTools_dictionary_allOccurrencesLabel%': 'Occurrences',
  '%platformLexicalTools_dictionary_occurrencesForSenseLabel%': 'Occurrences for {index}',
  '%platformLexicalTools_dictionary_backToList%': BACK_LABEL,
};

const entry = (id: string, lemma: string, definition: string): Entry => {
  // Only the fields these components read are filled in; the full Entry type carries many more.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    id,
    lexicalReferenceTextId: 'SDBH',
    lemma,
    strongsCodes: [],
    occurrences: {},
    domains: [],
    senses: {
      [`${id}001001000`]: {
        id: `${id}001001000`,
        lexicalReferenceTextId: 'SDBH',
        glosses: [lemma],
        definition,
        domains: [],
        occurrences: { project: [{ verseRef: SCR_REF, wordNum: 1 }] },
      },
    },
  } as unknown as Entry;
};

const ELIMELECH = entry('000421', 'אֱלִימֶלֶךְ', 'from {L:Bethlehem<SDBH:בֵּית לֶחֶם>}');
const BETHLEHEM = entry('000999', 'בֵּית לֶחֶם', 'a town in Judah');

const renderDictionary = (onSelectOccurrence = vi.fn()) => {
  const getEntryByLemma = vi.fn().mockResolvedValue(BETHLEHEM);
  render(
    <Dictionary
      localizedStrings={LOCALIZED_STRINGS}
      scrRef={SCR_REF}
      onSelectOccurrence={onSelectOccurrence}
      getEntries={vi.fn().mockResolvedValue({ entriesById: { [ELIMELECH.id]: [ELIMELECH] } })}
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

  it('scrolls a bounded container to the top when a linked entry opens', async () => {
    renderDictionary();
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    const description = await screen.findByText('a town in Judah');
    expect(description.closest('[class*="h-[100dvh]"]')).toBeInTheDocument();
    expect(Element.prototype.scrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it('leaves the linked view when an occurrence is selected', async () => {
    const onSelectOccurrence = vi.fn();
    renderDictionary(onSelectOccurrence);
    fireEvent.click(await screen.findByRole('link', { name: 'Bethlehem' }));
    await screen.findByText('a town in Judah');
    fireEvent.click(screen.getByRole('button', { name: /1:2/ }));
    expect(onSelectOccurrence).toHaveBeenCalledWith(SCR_REF);
    expect(screen.queryByRole('button', { name: BACK_LABEL })).not.toBeInTheDocument();
  });
});
