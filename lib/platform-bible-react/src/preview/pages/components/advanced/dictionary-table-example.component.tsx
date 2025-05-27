import { DictionaryEntryDisplay } from '@/components/advanced/dictionary/dictionary-entry-display.component';
import { DictionaryEntry } from '@/components/advanced/dictionary/dictionary-list-item.component';
import { DictionaryTable } from '@/components/advanced/dictionary/dictionary-table.component';
import { Button } from '@/components/shadcn-ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const dictionaryData: DictionaryEntry[] = [
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

export function DictionaryTableExample() {
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | undefined>(undefined);

  const handleEntryClick = (entry: DictionaryEntry) => {
    setSelectedEntry(entry);
  };

  if (selectedEntry) {
    return (
      <DictionaryEntryDisplay
        dictionaryEntry={selectedEntry}
        backToListButton={
          <Button
            variant="ghost"
            size="sm"
            className="tw-pl-0 hover:tw-bg-transparent hover:tw-underline"
            onClick={() => setSelectedEntry(undefined)}
          >
            <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
            Back to list
          </Button>
        }
        definitionLabel="Definition"
        occurrencesLabel="Occurrences in Exodus 3"
      />
    );
  }

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <p>
        This component uses the keyboard navigable table for dictionary data and displays the data
        with DictionaryListItem and DictionaryEntryDisplay
      </p>
      <DictionaryTable dictionaryData={dictionaryData} handleEntryClick={handleEntryClick} />
    </div>
  );
}
