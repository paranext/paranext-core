export interface CheckingData {
  start: {
    bookNum: number;
    chapterNum: number;
    verseNum: number;
    jsonPath: string;
    book: string;
    offset: number;
  };
  end: {
    bookNum: number;
    chapterNum: number;
    verseNum: number;
    jsonPath: string;
    book: string;
    offset: number;
  };
  detail: string;
  source?: string;
}

export interface ResultsSource {
  id: string;
  displayName: string;
}

const books = [
  'GEN',
  'EXO',
  'LEV',
  'NUM',
  'DEU',
  'JOS',
  'JDG',
  'RUT',
  '1SA',
  '2SA',
  '1KI',
  '2KI',
  '1CH',
  '2CH',
  'EZR',
  'NEH',
  'EST',
  'JOB',
  'PSA',
  'PRO',
  'ECC',
  'SNG',
  'ISA',
  'JER',
  'LAM',
  'EZK',
  'DAN',
  'HOS',
  'JOL',
  'AMO',
  'OBA',
  'JON',
  'MIC',
  'NAM',
  'HAB',
  'ZEP',
  'HAG',
  'ZEC',
  'MAL',
  'MAT',
  'MRK',
  'LUK',
  'JHN',
  'ACT',
  'ROM',
  '1CO',
  '2CO',
  'GAL',
  'EPH',
  'PHP',
  'COL',
  '1TH',
  '2TH',
  '1TI',
  '2TI',
  'TIT',
  'PHM',
  'HEB',
  'JAS',
  '1PE',
  '2PE',
  '1JN',
  '2JN',
  '3JN',
  'JUD',
  'REV',
];

const errorMessages = [
  'Missing punctuation at end of verse',
  'Inconsistent capitalization detected',
  'Possible spelling error found',
  'Quotation marks not properly balanced',
  'Unusual word spacing detected',
  'Chapter number formatting issue',
  'Verse number out of sequence',
  'Cross-reference formatting error',
  'Footnote marker missing',
  'Paragraph break issue detected',
];

const sources = [
  'Spell Check',
  'Grammar Check',
  'Formatting Check',
  'Reference Check',
  'Consistency Check',
  'Style Check',
];

export function generateRandomCheckingData(possibleErrors: string[] | number = 20): CheckingData[] {
  const count = Array.isArray(possibleErrors) ? possibleErrors.length : possibleErrors;

  const data: CheckingData[] = [];

  for (let i = 0; i < count; i++) {
    const bookNum = Math.floor(Math.random() * 66) + 1;
    const book = books[bookNum - 1];
    const chapter = Math.floor(Math.random() * 50) + 1;
    const verse = Math.floor(Math.random() * 30) + 1;
    const message = Array.isArray(possibleErrors)
      ? possibleErrors[i % possibleErrors.length]
      : errorMessages[Math.floor(Math.random() * errorMessages.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];

    data.push({
      start: {
        bookNum,
        chapterNum: chapter,
        verseNum: verse,
        jsonPath: '',
        book,
        offset: Math.floor(Math.random() * 100), // Random offset within the verse
      },
      end: {
        bookNum,
        chapterNum: chapter,
        verseNum: verse,
        jsonPath: '',
        book,
        offset: Math.floor(Math.random() * 100) + 100, // Random offset after start
      },
      detail: message,
      source,
    });
  }

  return data;
}
