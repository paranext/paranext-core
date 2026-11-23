/**
 * Shared mock data for dictionary tab Storybook stories. Derived from golden masters in
 * `.context/features/enhanced-resources/golden-masters/`:
 *
 * - Gm-020-gloss-localization (Hebrew אֱלֹהִים -> "God")
 * - Gm-022-gloss-chinese-mapping (Chinese: 上帝；神)
 * - Gm-023-related-lexemes-gloss (Greek logos -> rhema, aggelia)
 * - Gm-024-related-lexemes-domain (Greek logos -> rhema, aggelia, euangelion)
 *
 * No PAPI types are imported - all shapes are local to this design phase.
 *
 * [Revised: 2026-04-29 Themes 13/15] Mock data now matches the trimmed entry surface (sourceText,
 * translit, senses) and the PT9-shaped sense surface (senseNumber, glosses string, domains array,
 * optional notes/comment/commentsAndNotes, occurrencesInAllBooksCount).
 */

import type { DictionaryDisplayItemData } from '../components/dictionary-tab/dictionary-display-item.component';

/**
 * Mock entry alias kept as a named type for story readability. `totalOccurrencesInAllBooks` is now
 * part of `DictionaryDisplayItemData` itself (revised 2026-04-30 SB#5d), so this is just a
 * re-export alias. Story call sites can use `DictionaryDisplayItemData` directly if they prefer.
 */
export type MockDictionaryEntry = DictionaryDisplayItemData;

/** Hebrew entry derived from gm-020 (אֱלֹהִים -> "God") */
export const MOCK_DICT_ENTRY_ELOHIM: MockDictionaryEntry = {
  tokenId: '00100100100008',
  entryId: 'אֱלֹהִים',
  sourceText: 'אֱלֹהִים',
  translit: 'ʾĕlōhîm',
  totalOccurrencesInAllBooks: 2602,
  relevantSenseIndices: [0, 1],
  firstRelevantSensePreview: 'The supreme deity of Israel; the one true God.',
  senses: [
    {
      id: 'elohim-1',
      senseNumber: 1,
      definition: 'The supreme deity of Israel; the one true God.',
      glosses: 'God',
      domains: [
        { id: 'sd-deity', label: 'Deity' },
        { id: 'sd-creator', label: 'Creator' },
      ],
      occurrencesInAllBooksCount: 2200,
      isRelevant: true,
    },
    {
      id: 'elohim-2',
      senseNumber: 2,
      definition: 'A general term for divine beings or judges acting on behalf of God.',
      glosses: 'gods, rulers, judges',
      domains: [{ id: 'sd-judges', label: 'Authority > Judges' }],
      notes: 'Also used in poetic contexts for angelic beings.',
      occurrencesInAllBooksCount: 402,
      isRelevant: false,
    },
  ],
};

/** Hebrew entry: bere'shiyt - "in the beginning" (from gm-001 token data) */
export const MOCK_DICT_ENTRY_BERESHIT: MockDictionaryEntry = {
  tokenId: '00100100100004',
  entryId: 'רֵאשִׁית',
  sourceText: 'רֵאשִׁית',
  translit: 'rēʾšît',
  totalOccurrencesInAllBooks: 51,
  relevantSenseIndices: [0],
  firstRelevantSensePreview: 'The starting point in time; the first instance.',
  senses: [
    {
      id: 'reshit-1',
      senseNumber: 1,
      definition: 'The starting point in time; the first instance.',
      glosses: 'beginning, start',
      domains: [{ id: 'sd-time-start', label: 'Time > Beginning' }],
      occurrencesInAllBooksCount: 30,
      isRelevant: true,
    },
    {
      id: 'reshit-2',
      senseNumber: 2,
      definition: 'The chief or best part of something.',
      glosses: 'first, chief, best',
      occurrencesInAllBooksCount: 16,
      isRelevant: true,
    },
    {
      id: 'reshit-3',
      senseNumber: 3,
      definition: 'The first fruits offered in temple worship.',
      glosses: 'firstfruits',
      domains: [{ id: 'sd-firstfruits', label: 'Sacrifice > Firstfruits' }],
      occurrencesInAllBooksCount: 5,
      isRelevant: false,
    },
  ],
};

/** Hebrew entry: yasha (verb) - basic shape */
export const MOCK_DICT_ENTRY_YASHA: MockDictionaryEntry = {
  tokenId: '01900300100008',
  entryId: 'יָשַׁע',
  sourceText: 'יָשַׁע',
  translit: 'yāšaʿ',
  totalOccurrencesInAllBooks: 205,
  relevantSenseIndices: [1],
  firstRelevantSensePreview: 'To deliver from spiritual oppression; to grant salvation.',
  senses: [
    {
      id: 'yasha-1',
      senseNumber: 1,
      definition: 'To rescue from physical danger.',
      glosses: 'rescue, save',
      domains: [{ id: 'sd-rescue', label: 'Rescue > Deliver' }],
      occurrencesInAllBooksCount: 90,
      isRelevant: true,
    },
    {
      id: 'yasha-2',
      senseNumber: 2,
      definition: 'To deliver from spiritual oppression; to grant salvation.',
      glosses: 'save, deliver',
      domains: [{ id: 'sd-salvation', label: 'Salvation' }],
      comment: 'Frequent in Psalms and the prophets in this sense.',
      occurrencesInAllBooksCount: 115,
      isRelevant: true,
    },
  ],
};

/** Greek entry: logos (derived from gm-023/024 with related lexemes) */
export const MOCK_DICT_ENTRY_LOGOS: MockDictionaryEntry = {
  tokenId: '04000100100002',
  entryId: 'λόγος',
  sourceText: 'λόγος',
  translit: 'logos',
  totalOccurrencesInAllBooks: 330,
  relevantSenseIndices: [0, 1],
  firstRelevantSensePreview: 'A spoken or written word; a unit of speech.',
  senses: [
    {
      id: 'logos-1',
      senseNumber: 1,
      definition: 'A spoken or written word; a unit of speech.',
      glosses: 'word',
      domains: [{ id: 'sd-communication', label: 'Communication' }],
      occurrencesInAllBooksCount: 175,
      isRelevant: true,
    },
    {
      id: 'logos-2',
      senseNumber: 2,
      definition: 'A communication, message, or report.',
      glosses: 'message, report',
      domains: [{ id: 'sd-communication', label: 'Communication' }],
      occurrencesInAllBooksCount: 95,
      isRelevant: true,
    },
    {
      id: 'logos-3',
      senseNumber: 3,
      definition: 'Reason, rational principle; the divine Word personified.',
      glosses: 'reason, principle',
      domains: [{ id: 'sd-divine-word', label: 'Divine Word' }],
      commentsAndNotes: 'Used by John for the pre-existent Christ; cf. John 1:1-14.',
      occurrencesInAllBooksCount: 60,
      isRelevant: false,
    },
  ],
};

/** Greek entry: agape (love) */
export const MOCK_DICT_ENTRY_AGAPE: MockDictionaryEntry = {
  tokenId: '04600130100008',
  entryId: 'ἀγάπη',
  sourceText: 'ἀγάπη',
  translit: 'agapē',
  totalOccurrencesInAllBooks: 116,
  relevantSenseIndices: [0],
  firstRelevantSensePreview: 'Self-giving love, especially divine love.',
  senses: [
    {
      id: 'agape-1',
      senseNumber: 1,
      definition: 'Self-giving love, especially divine love.',
      glosses: 'love',
      domains: [{ id: 'sd-love', label: 'Affection > Love' }],
      occurrencesInAllBooksCount: 116,
      isRelevant: true,
    },
  ],
};

/** Default Hebrew dictionary entries (Genesis 1) */
export const MOCK_DICT_ENTRIES_HEBREW: MockDictionaryEntry[] = [
  MOCK_DICT_ENTRY_BERESHIT,
  MOCK_DICT_ENTRY_ELOHIM,
  MOCK_DICT_ENTRY_YASHA,
];

/** Default Greek dictionary entries */
export const MOCK_DICT_ENTRIES_GREEK: MockDictionaryEntry[] = [
  MOCK_DICT_ENTRY_LOGOS,
  MOCK_DICT_ENTRY_AGAPE,
];
