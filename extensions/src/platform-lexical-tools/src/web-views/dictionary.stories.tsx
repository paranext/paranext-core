import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { Entry, LexicalEntriesById } from 'platform-lexical-tools';
import { useCallback, useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { alertCommand, rejectingMock } from '../../../../../.storybook/story.utils';
import { Dictionary, DictionaryEntriesResult } from './dictionary.component';
import { DICTIONARY_LOCALIZED_STRING_KEYS } from '../utils/dictionary-ui.utils';
import { DictionaryScope } from '../utils/dictionary.utils';

/**
 * `Dictionary` shows lexical reference entries for the current Scripture reference. It owns the
 * orchestration (scope/search/selection and search-text filtering); the webview feeds it PAPI in
 * the app. These stories feed it from a thin in-memory service so the flow is fully interactive:
 * change scope, search, select an entry, and follow an occurrence (which announces the navigation
 * command).
 */

const localizedStrings = getLocalizedStrings([...DICTIONARY_LOCALIZED_STRING_KEYS]);

const DEFAULT_SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

const VERSION = '1.0.0';

/** Seed entries that all occur in GEN 1 (verse 1 unless noted), so the chapter scope shows them. */
const seedEntries: Entry[] = [
  {
    id: 'H7225',
    lexicalReferenceTextId: 'SDBH',
    lexicalReferenceTextVersion: VERSION,
    lemma: 'רֵאשִׁית',
    strongsCodes: ['H7225'],
    domains: [{ taxonomy: 'Lexical Semantic Domains', code: '001', label: 'Time' }],
    occurrences: {
      WLC: [{ verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, wordNum: 1 }],
    },
    senses: {
      s1: {
        id: 's1',
        entryId: 'H7225',
        lexicalReferenceTextId: 'SDBH',
        lexicalReferenceTextVersion: VERSION,
        bcp47Code: 'en',
        definition: 'The first or beginning part of something.',
        glosses: ['beginning', 'first'],
        strongsCodes: ['H7225'],
        domains: [{ taxonomy: 'Lexical Semantic Domains', code: '001', label: 'Time' }],
        occurrences: {
          WLC: [{ verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, wordNum: 1 }],
        },
      },
    },
  },
  {
    id: 'H430',
    lexicalReferenceTextId: 'SDBH',
    lexicalReferenceTextVersion: VERSION,
    lemma: 'אֱלֹהִים',
    strongsCodes: ['H430'],
    domains: [{ taxonomy: 'Lexical Semantic Domains', code: '002', label: 'Deity' }],
    occurrences: {
      WLC: [{ verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, wordNum: 3 }],
    },
    senses: {
      s1: {
        id: 's1',
        entryId: 'H430',
        lexicalReferenceTextId: 'SDBH',
        lexicalReferenceTextVersion: VERSION,
        bcp47Code: 'en',
        definition: 'The supreme deity; God.',
        glosses: ['God', 'gods'],
        strongsCodes: ['H430'],
        domains: [{ taxonomy: 'Lexical Semantic Domains', code: '002', label: 'Deity' }],
        occurrences: {
          WLC: [{ verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, wordNum: 3 }],
        },
      },
      s2: {
        id: 's2',
        entryId: 'H430',
        lexicalReferenceTextId: 'SDBH',
        lexicalReferenceTextVersion: VERSION,
        bcp47Code: 'en',
        definition: 'Members of a divine class; (other) gods.',
        glosses: ['gods (plural)'],
        strongsCodes: ['H430'],
        domains: [{ taxonomy: 'Lexical Semantic Domains', code: '002', label: 'Deity' }],
        occurrences: {
          WLC: [{ verseRef: { book: 'GEN', chapterNum: 1, verseNum: 26 }, wordNum: 5 }],
        },
      },
    },
  },
  {
    id: 'H1254',
    lexicalReferenceTextId: 'SDBH',
    lexicalReferenceTextVersion: VERSION,
    lemma: 'בָּרָא',
    strongsCodes: ['H1254'],
    domains: [{ taxonomy: 'Lexical Semantic Domains', code: '003', label: 'Creation' }],
    occurrences: {
      WLC: [{ verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, wordNum: 2 }],
    },
    senses: {
      s1: {
        id: 's1',
        entryId: 'H1254',
        lexicalReferenceTextId: 'SDBH',
        lexicalReferenceTextVersion: VERSION,
        bcp47Code: 'en',
        definition: 'To bring something into existence.',
        glosses: ['create', 'created'],
        strongsCodes: ['H1254'],
        domains: [{ taxonomy: 'Lexical Semantic Domains', code: '003', label: 'Creation' }],
        occurrences: {
          WLC: [{ verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, wordNum: 2 }],
        },
      },
    },
  },
];

/** Whether an entry has any occurrence matching the scope-filtered selector. */
function entryMatchesScope(
  entry: Entry,
  scope: DictionaryScope,
  scrRef: SerializedVerseRef,
): boolean {
  return Object.values(entry.senses).some((sense) =>
    Object.values(sense?.occurrences ?? {}).some((occurrences) =>
      occurrences?.some(
        (occurrence) =>
          occurrence.verseRef.book === scrRef.book &&
          occurrence.verseRef.chapterNum === scrRef.chapterNum &&
          (scope !== 'verse' || occurrence.verseRef.verseNum === scrRef.verseNum),
      ),
    ),
  );
}

type HarnessConfig = {
  /** Seed entries the in-memory service serves. Defaults to {@link seedEntries}. */
  entries?: Entry[];
  /** Force the loading state by never resolving the entries read. */
  neverResolve?: boolean;
  /** Force a data-load error by rejecting the entries read. */
  failLoad?: boolean;
};

/**
 * Thin in-memory service container: serves the seed entries scoped to the current reference,
 * returns the full entry on demand, and announces occurrence navigation via `alertCommand`.
 */
function DictionaryHarness({ config }: { config: HarnessConfig }) {
  const entries = config.entries ?? seedEntries;
  const [scrRef, setScrRef] = useState<SerializedVerseRef>(DEFAULT_SCR_REF);

  const getEntries = useCallback(
    async (scope: DictionaryScope, ref: SerializedVerseRef): Promise<DictionaryEntriesResult> => {
      if (config.neverResolve) {
        return new Promise<DictionaryEntriesResult>(() => {});
      }
      if (config.failLoad) {
        await rejectingMock('The lexical reference text could not be read.')();
      }
      const entriesById: LexicalEntriesById = {};
      entries
        .filter((entry) => entryMatchesScope(entry, scope, ref))
        .forEach((entry) => {
          entriesById[entry.id] = [entry];
        });
      return { entriesById };
    },
    [config.failLoad, config.neverResolve, entries],
  );

  const getFullEntry = useCallback(
    async (entry: Entry) => entries.find((e) => e.id === entry.id),
    [entries],
  );

  const onSelectOccurrence = useCallback((scrRefOfOccurrence: SerializedVerseRef) => {
    // In the app the webview navigates the scroll group; here we announce it and update local state.
    alertCommand('platformScriptureEditor.selectRange', { verseRef: scrRefOfOccurrence });
    setScrRef(scrRefOfOccurrence);
  }, []);

  return (
    <Dictionary
      localizedStrings={localizedStrings}
      scrRef={scrRef}
      onSelectOccurrence={onSelectOccurrence}
      getEntries={getEntries}
      getFullEntry={getFullEntry}
    />
  );
}

const meta: Meta<typeof Dictionary> = {
  title: 'Bundled Extensions/platform-lexical-tools/Dictionary',
  component: Dictionary,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Dictionary>;

function createDecorator(config: HarnessConfig) {
  return function DictionaryDecorator() {
    return <DictionaryHarness config={config} />;
  };
}

/** Multiple entries occur in GEN 1 — the list renders; select one to see its detail. */
export const EntryList: Story = {
  decorators: [createDecorator({})],
};

/** Exactly one entry matches — the detail view renders directly without the list. */
export const SingleEntry: Story = {
  decorators: [createDecorator({ entries: [seedEntries[0]] })],
};

/** Entries are still loading — the skeleton placeholders render. */
export const Loading: Story = {
  decorators: [createDecorator({ neverResolve: true })],
};

/** No entries match the current reference — the no-results message renders. */
export const NoResults: Story = {
  decorators: [createDecorator({ entries: [] })],
};

/** The entries read failed — the error popover surfaces the data-load error. */
export const DataError: Story = {
  decorators: [createDecorator({ failLoad: true })],
};
