/**
 * Shared mock data for Storybook stories. Derived from golden masters in
 * `.context/features/enhanced-resources/golden-masters/` (gm-001 token shape) and
 * ui-state-contracts.md.
 *
 * No PAPI types are imported - all shapes are local to this design phase.
 */

export type MockMarbleTokenType =
  | 'Book'
  | 'Chapter'
  | 'Verse'
  | 'ParagraphStart'
  | 'ParagraphEnd'
  | 'CharacterStart'
  | 'CharacterEnd'
  | 'PlainText'
  | 'TextLink'
  | 'Note'
  | 'Reference';

export interface MockMarbleToken {
  type: MockMarbleTokenType;
  text: string;
  index: number;
  strongNumber?: string;
  targetLinks?: string[];
  thematicLinks?: string[];
  lexicalLinks?: string[];
  imageLinks?: string[];
  mapLinks?: string[];
  style?: string;
}

export interface MockVerseRef {
  book: number;
  chapter: number;
  verse: number;
}

export interface MockSerializedVerseRef {
  bookNum: number;
  chapterNum: number;
  verseNum: number;
  book?: string;
}

export interface MockTooltipData {
  lemma: string;
  gloss: string | undefined;
  partOfSpeech: string | undefined;
  strongNumber: string | undefined;
  notes: string[];
  morphology: string | undefined;
}

export interface MockNoteData {
  callerType: 'footnote' | 'endnote' | 'cross-reference';
  callerMarker: string;
  body: string;
  references: MockSerializedVerseRef[];
}

export interface MockRibbonStates {
  missingBook: boolean;
  reviewStatus: { visible: boolean; dismissed: boolean };
  imageWarning: boolean;
  copyright: { visible: boolean; dismissed: boolean };
  updateRequiredData: boolean;
  updateAvailable: { visible: boolean; dismissed: boolean };
}

/** Default reference for stories: Genesis 1:1 (matches gm-001) */
export const MOCK_GEN_1_1: MockVerseRef = { book: 1, chapter: 1, verse: 1 };

/** Mock tokens patterned after gm-001-usx-token-parsing/expected-output.json */
export const MOCK_GEN_1_TOKENS: MockMarbleToken[] = [
  { type: 'Book', text: 'GEN', index: 0 },
  { type: 'Chapter', text: '1', index: 1 },
  { type: 'ParagraphStart', text: '', index: 2, style: 's1' },
  { type: 'PlainText', text: 'The Creation of the World', index: 3 },
  { type: 'ParagraphEnd', text: '', index: 4, style: 's1' },
  { type: 'ParagraphStart', text: '', index: 5, style: 'p' },
  { type: 'Verse', text: '1', index: 6 },
  { type: 'PlainText', text: 'In the ', index: 7 },
  {
    type: 'TextLink',
    text: 'beginning,',
    index: 8,
    strongNumber: 'H7225',
    lexicalLinks: ['SDBH:רֵאשִׁית:001001000'],
    targetLinks: ['00100100100004'],
  },
  {
    type: 'TextLink',
    text: 'God',
    index: 9,
    strongNumber: 'H0430',
    lexicalLinks: ['SDBH:אֱלֹהִים:001003000'],
    targetLinks: ['00100100100008'],
  },
  {
    type: 'TextLink',
    text: 'created',
    index: 10,
    strongNumber: 'H1254a',
    lexicalLinks: ['SDBH:ברא:001002000'],
    targetLinks: ['00100100100006'],
  },
  { type: 'PlainText', text: 'the ', index: 11 },
  {
    type: 'TextLink',
    text: 'heavens',
    index: 12,
    strongNumber: 'H8064',
    lexicalLinks: ['SDBH:שָׁמַיִם:002001000'],
    targetLinks: ['00100100100012'],
  },
  { type: 'PlainText', text: 'and the ', index: 13 },
  {
    type: 'TextLink',
    text: 'earth',
    index: 14,
    strongNumber: 'H0776',
    lexicalLinks: ['SDBH:אֶרֶץ:003001000'],
    targetLinks: ['00100100100016'],
  },
  { type: 'PlainText', text: '.', index: 15 },
];

/** Token id of "beginning" - used for filter stories */
export const MOCK_FILTERED_TOKEN_ID = '00100100100004';

export const MOCK_TOOLTIP_DEFAULT: MockTooltipData = {
  lemma: 'rēʾšît',
  gloss: 'beginning, first, chief',
  partOfSpeech: 'noun (feminine)',
  strongNumber: 'H7225',
  notes: [],
  morphology: undefined,
};

export const MOCK_TOOLTIP_MULTIPLE_SENSES: MockTooltipData = {
  lemma: 'bārāʾ',
  gloss: 'to create, shape, form (sense 1 of 3)',
  partOfSpeech: 'verb (qal stem)',
  strongNumber: 'H1254a',
  notes: [
    'Sense 1: To create as a divine act of bringing into being.',
    'Sense 2: To shape or fashion from existing material.',
    'Sense 3: To choose; to select for a particular purpose.',
  ],
  morphology: 'qal perfect 3ms',
};

export const MOCK_TOOLTIP_MISSING_STRONGS: MockTooltipData = {
  lemma: 'tehôm',
  gloss: 'deep, abyss',
  partOfSpeech: 'noun',
  strongNumber: undefined,
  notes: [],
  morphology: undefined,
};

export const MOCK_NOTE_DEFAULT: MockNoteData = {
  callerType: 'cross-reference',
  callerMarker: '+',
  body: 'Job 38:4-7; Ps. 33:6; 136:5; Isa. 42:5; 45:18; John 1:1-3; Acts 14:15; 17:24; Col. 1:16, 17; Heb. 1:10; 11:3; Rev. 4:11',
  references: [
    { bookNum: 18, chapterNum: 38, verseNum: 4, book: 'JOB' },
    { bookNum: 19, chapterNum: 33, verseNum: 6, book: 'PSA' },
    { bookNum: 23, chapterNum: 42, verseNum: 5, book: 'ISA' },
    { bookNum: 43, chapterNum: 1, verseNum: 1, book: 'JHN' },
  ],
};

export const MOCK_NOTE_LONG: MockNoteData = {
  callerType: 'footnote',
  callerMarker: 'a',
  body: 'The Hebrew word translated as "earth" can also refer to land, ground, or country. In ancient Near Eastern cosmology this term encompasses the inhabited dry land in contrast to the heavens above and the waters below. The phrase "the heavens and the earth" (hashshamayim weʾeṯ haʾareṣ) is a merism meaning "the entire created order." See further discussion in J. Walton, Genesis 1 as Ancient Cosmology (2011), pp. 178-184; G. Wenham, Genesis 1-15, Word Biblical Commentary (1987), pp. 14-15.',
  references: [],
};

export const MOCK_NOTE_EMPTY: MockNoteData = {
  callerType: 'footnote',
  callerMarker: '-',
  body: '',
  references: [],
};

export const MOCK_RIBBONS_NONE: MockRibbonStates = {
  missingBook: false,
  reviewStatus: { visible: false, dismissed: false },
  imageWarning: false,
  copyright: { visible: false, dismissed: false },
  updateRequiredData: false,
  updateAvailable: { visible: false, dismissed: false },
};

export const MOCK_RIBBONS_ALL: MockRibbonStates = {
  missingBook: true,
  reviewStatus: { visible: true, dismissed: false },
  imageWarning: true,
  copyright: { visible: true, dismissed: false },
  updateRequiredData: true,
  updateAvailable: { visible: true, dismissed: false },
};

export const MOCK_COPYRIGHT_TEXT =
  'This Enhanced Resource includes lexical content from the Semantic Dictionary of Biblical Hebrew (SDBH) © United Bible Societies. All rights reserved. Used by permission. The associated Marble images and maps are © Bible Societies and may not be redistributed.';
