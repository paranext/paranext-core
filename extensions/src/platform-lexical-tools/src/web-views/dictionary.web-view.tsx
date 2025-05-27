import { useMemo, useState } from 'react';
import {
  Button,
  DictionaryEntry,
  DictionaryEntryDisplay,
  DictionaryTable,
  Label,
  SearchBar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { ArrowLeft } from 'lucide-react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { useLocalizedStrings } from '@papi/frontend/react';
// import { WebViewProps } from '@papi/core';
// import { SerializedVerseRef } from '@sillsdev/scripture';

const DICTIONARY_DATA: DictionaryEntry[] = [
  {
    id: 'h7200',
    hebrew: 'רָאָה',
    transliteration: "ra'ah",
    strongsNumber: 'H7200',
    partOfSpeech: 'verb',
    definition: 'to see, look, view, perceive',
    usage: [
      { book: 'Exodus', chapterNum: 3, verseNum: 2 },
      { book: 'Exodus', chapterNum: 3, verseNum: 4 },
      { book: 'Exodus', chapterNum: 3, verseNum: 7 },
      { book: 'Exodus', chapterNum: 3, verseNum: 9 },
    ],
  },
  {
    id: 'h5927',
    hebrew: 'עָלָה',
    transliteration: 'alah',
    strongsNumber: 'H5927',
    partOfSpeech: 'verb',
    definition: 'to go up, ascend, climb',
    usage: [
      { book: 'Exodus', chapterNum: 3, verseNum: 1 },
      { book: 'Exodus', chapterNum: 3, verseNum: 8 },
      { book: 'Exodus', chapterNum: 3, verseNum: 17 },
    ],
  },
  {
    id: 'h784',
    hebrew: 'אֵשׁ',
    transliteration: 'esh',
    strongsNumber: 'H784',
    partOfSpeech: 'noun feminine',
    definition: 'fire',
    usage: [{ book: 'Exodus', chapterNum: 3, verseNum: 2 }],
  },
  {
    id: 'h5572',
    hebrew: 'סְנֶה',
    transliteration: 'seneh',
    strongsNumber: 'H5572',
    partOfSpeech: 'noun masculine',
    definition: 'bush, thorny bush',
    usage: [
      { book: 'Exodus', chapterNum: 3, verseNum: 2 },
      { book: 'Exodus', chapterNum: 3, verseNum: 3 },
      { book: 'Exodus', chapterNum: 3, verseNum: 4 },
    ],
  },
  {
    id: 'h1197',
    hebrew: 'בָּעַר',
    transliteration: "ba'ar",
    strongsNumber: 'H1197',
    partOfSpeech: 'verb',
    definition: 'to burn, consume, kindle',
    usage: [
      { book: 'Exodus', chapterNum: 3, verseNum: 2 },
      { book: 'Exodus', chapterNum: 3, verseNum: 3 },
    ],
  },
  {
    id: 'h430',
    hebrew: 'אֱלֹהִים',
    transliteration: 'elohim',
    strongsNumber: 'H430',
    partOfSpeech: 'noun masculine plural',
    definition: 'God, gods, judges, angels',
    usage: [
      { book: 'Exodus', chapterNum: 3, verseNum: 1 },
      { book: 'Exodus', chapterNum: 3, verseNum: 4 },
      { book: 'Exodus', chapterNum: 3, verseNum: 6 },
      { book: 'Exodus', chapterNum: 3, verseNum: 11 },
      { book: 'Exodus', chapterNum: 3, verseNum: 13 },
    ],
  },
  {
    id: 'h4872',
    hebrew: 'מֹשֶׁה',
    transliteration: 'mosheh',
    strongsNumber: 'H4872',
    partOfSpeech: 'noun proper masculine',
    definition: 'Moses',
    usage: [
      { book: 'Exodus', chapterNum: 3, verseNum: 1 },
      { book: 'Exodus', chapterNum: 3, verseNum: 4 },
      { book: 'Exodus', chapterNum: 3, verseNum: 6 },
      { book: 'Exodus', chapterNum: 3, verseNum: 11 },
      { book: 'Exodus', chapterNum: 3, verseNum: 13 },
    ],
  },
  {
    id: 'h6629',
    hebrew: 'צֹאן',
    transliteration: 'tson',
    strongsNumber: 'H6629',
    partOfSpeech: 'noun both',
    definition: 'small cattle, sheep, goats',
    usage: [{ book: 'Exodus', chapterNum: 3, verseNum: 1 }],
  },
];

const DICTIONARY_LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%platformLexicalTools_dictionary_backToList%',
  '%platformLexicalTools_dictionary_definitionLabel%',
  '%platformLexicalTools_dictionary_noResults%',
  '%platformLexicalTools_dictionary_searchDictionary%',
  '%platformLexicalTools_dictionary_scopeSelector_chapter%',
  '%platformLexicalTools_dictionary_scopeSelector_section%',
  '%platformLexicalTools_dictionary_scopeSelector_verse%',
];

type BackToListButtonProps = {
  /** Callback function to handle button click */
  handleClick: () => void;
  /** Button text */
  buttonText?: string;
};

function BackToListButton({ handleClick, buttonText }: BackToListButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="tw-pl-0 hover:tw-bg-transparent hover:tw-underline"
      onClick={handleClick}
    >
      <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
      {buttonText}
    </Button>
  );
}

globalThis.webViewComponent = function Dictionary() {
  const [scope, setScope] = useState<'chapter' | 'section' | 'verse'>('chapter');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);

  // { useWebViewScrollGroupScrRef }: WebViewProps
  // const [scrRef] = useWebViewScrollGroupScrRef();

  const dictionaryEntriesFilteredBySearchAndScope: DictionaryEntry[] = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const filteredBySearch = !query
      ? DICTIONARY_DATA
      : DICTIONARY_DATA.filter(
          (entry) =>
            entry.id.toLowerCase().includes(query) ||
            entry.hebrew.toLowerCase().includes(query) ||
            entry.transliteration.toLowerCase().includes(query) ||
            entry.definition.toLowerCase().includes(query),
        );
    return filteredBySearch;

    // Return the filtered array based on scope and scrRef
    // return filteredBySearch.filter((entry) => {
    //   return entry.usage.some((serializedScrReference: SerializedVerseRef) => {
    //     if (serializedScrReference.book && serializedScrReference.chapterNum) {
    //       if (serializedScrReference.book !== scrRef.book) return false;
    //       if (scope === 'chapter') return serializedScrReference.chapterNum === scrRef.chapterNum;
    //       if (scope === 'verse')
    //         return (
    //           serializedScrReference.chapterNum === scrRef.chapterNum &&
    //           serializedScrReference.verseNum === scrRef.verseNum
    //         );
    //     }
    //     // If usage is just a string (as in your data), skip scope filtering
    //     return true;
    //   });
    // });
  }, [searchQuery]);

  const handleEntryClick = (entry: DictionaryEntry) => {
    setSelectedEntry(entry);
  };

  // Search zero state
  if (dictionaryEntriesFilteredBySearchAndScope.length === 0)
    return (
      <div className="tw-m-4 tw-flex tw-justify-center">
        <Label>{localizedStrings['%platformLexicalTools_dictionary_no_results%']}</Label>
      </div>
    );

  return (
    <div className="tw-flex tw-flex-col tw-h-full">
      <div className="tw-flex tw-items-center tw-gap-2 tw-p-2 tw-border-b">
        <Select value={scope} onValueChange={() => setScope}>
          <SelectTrigger className="w-36 h-8">
            <SelectValue
              placeholder={
                localizedStrings['%platformLexicalTools_dictionary_scopeSelector_chapter%']
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chapter">
              {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_chapter%']}
            </SelectItem>
            <SelectItem value="section">
              {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_section%']}
            </SelectItem>
            <SelectItem value="verse">
              {localizedStrings['%platformLexicalTools_dictionary_scopeSelector_verse%']}
            </SelectItem>
          </SelectContent>
        </Select>
        <SearchBar
          value={searchQuery}
          onSearch={setSearchQuery}
          placeholder={localizedStrings['%platformLexicalTools_dictionary_searchDictionary%']}
          isFullWidth={false}
        />
      </div>
      {selectedEntry ? (
        <DictionaryEntryDisplay
          definitionLabel={localizedStrings['%platformLexicalTools_dictionary_definitionLabel%']}
          occurrencesLabel={formatReplacementString(
            localizedStrings['%platformLexicalTools_dictionary_occurrencesInLabel%'],
            { 0: selectedEntry.usage },
          )}
          dictionaryEntry={selectedEntry}
          backToListButton={
            <BackToListButton
              handleClick={() => setSelectedEntry(undefined)}
              buttonText={localizedStrings['%platformLexicalTools_dictionary_backToList%']}
            />
          }
        />
      ) : (
        <DictionaryTable
          dictionaryData={dictionaryEntriesFilteredBySearchAndScope}
          handleEntryClick={handleEntryClick}
        />
      )}
    </div>
  );
};
