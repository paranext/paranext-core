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
 */

import type { DictionarySenseDisplay } from '../components/shared/dictionary-sense-item.component';

/**
 * Display item shape used by DictionaryTab + DictionaryDisplayItem. Mirrors the
 * DictionaryDisplayItem type from ui-state-contracts.md plus the senses + translations fields.
 */
export interface MockDictionaryEntry {
  tokenId: string;
  term: string;
  /** Lemma in original script (Hebrew/Greek). */
  sourceText: string;
  /** Transliteration. */
  translit: string;
  /** Top-level glosses in user's display language. */
  glosses: string[];
  /** Translated POS (e.g., "noun", "verb"). */
  partOfSpeech: string;
  /** Number of occurrences in current scope. */
  occurrenceCount: number;
  /** Translations from tracked project (column 1 - "Translations"). */
  translations: string[];
  /** Definition text (loaded when expanded). */
  definition?: string;
  /** Senses for the expanded detail. */
  senses?: DictionarySenseDisplay[];
  /** Semantic domain refs. */
  semanticDomains?: { id: string; label: string }[];
  /** Related lexemes (from gm-023/024). */
  relatedLexemes?: {
    lemma: string;
    translit: string;
    gloss: string;
    relationType: 'Gloss' | 'SemanticDomain' | 'Lexical';
  }[];
  /** Encyclopedia article links. */
  encyclopediaLinks?: { articleId: string; title: string }[];
  /** Verse references where the term occurs. */
  verseOccurrences?: { book: number; chapter: number; verse: number; label: string }[];
}

/** Hebrew entry derived from gm-020 (אֱלֹהִים -> "God") */
export const MOCK_DICT_ENTRY_ELOHIM: MockDictionaryEntry = {
  tokenId: '00100100100008',
  term: 'God',
  sourceText: 'אֱלֹהִים',
  translit: 'ʾĕlōhîm',
  glosses: ['God'],
  partOfSpeech: 'noun (masc. plural)',
  occurrenceCount: 32,
  translations: ['God'],
  definition:
    'The Hebrew name for the supreme deity, used both as a generic term for God and as a proper name for the God of Israel.',
  senses: [
    {
      id: 'elohim-1',
      definition: 'The supreme deity of Israel; the one true God.',
      glosses: ['God'],
      partOfSpeech: 'noun',
      isRelevant: true,
    },
    {
      id: 'elohim-2',
      definition: 'A general term for divine beings or judges acting on behalf of God.',
      glosses: ['gods', 'rulers', 'judges'],
      partOfSpeech: 'noun',
      isRelevant: false,
    },
  ],
  semanticDomains: [
    { id: 'sd-deity', label: 'Deity' },
    { id: 'sd-creator', label: 'Creator' },
  ],
  relatedLexemes: [
    { lemma: 'YHWH', translit: 'yhwh', gloss: 'LORD', relationType: 'SemanticDomain' },
    { lemma: 'אֵל', translit: 'ʾēl', gloss: 'God', relationType: 'Gloss' },
    { lemma: 'אֲדֹנָי', translit: 'ʾădōnāy', gloss: 'Lord', relationType: 'Lexical' },
  ],
  encyclopediaLinks: [
    { articleId: 'enc-god', title: 'Names of God in the Old Testament' },
    { articleId: 'enc-creation', title: 'Creation Narratives' },
  ],
  verseOccurrences: [
    { book: 1, chapter: 1, verse: 1, label: 'Gen 1:1' },
    { book: 1, chapter: 1, verse: 2, label: 'Gen 1:2' },
    { book: 1, chapter: 1, verse: 3, label: 'Gen 1:3' },
  ],
};

/** Hebrew entry: bere'shiyt - "in the beginning" (from gm-001 token data) */
export const MOCK_DICT_ENTRY_BERESHIT: MockDictionaryEntry = {
  tokenId: '00100100100004',
  term: 'beginning',
  sourceText: 'רֵאשִׁית',
  translit: 'rēʾšît',
  glosses: ['beginning', 'first', 'chief'],
  partOfSpeech: 'noun (feminine)',
  occurrenceCount: 1,
  translations: ['beginning', 'in the beginning'],
  definition:
    'The first or initial part of something; a starting point. Used in temporal, spatial, and qualitative senses.',
  senses: [
    {
      id: 'reshit-1',
      definition: 'The starting point in time; the first instance.',
      glosses: ['beginning', 'start'],
      partOfSpeech: 'noun',
      isRelevant: true,
    },
    {
      id: 'reshit-2',
      definition: 'The chief or best part of something.',
      glosses: ['first', 'chief', 'best'],
      partOfSpeech: 'noun',
      isRelevant: true,
    },
    {
      id: 'reshit-3',
      definition: 'The first fruits offered in temple worship.',
      glosses: ['firstfruits'],
      partOfSpeech: 'noun',
      isRelevant: false,
    },
  ],
  semanticDomains: [{ id: 'sd-time-start', label: 'Time > Beginning' }],
  relatedLexemes: [{ lemma: 'רֹאשׁ', translit: 'rōʾš', gloss: 'head', relationType: 'Lexical' }],
  encyclopediaLinks: [],
  verseOccurrences: [{ book: 1, chapter: 1, verse: 1, label: 'Gen 1:1' }],
};

/** Hebrew entry: yasha (verb) - basic shape */
export const MOCK_DICT_ENTRY_YASHA: MockDictionaryEntry = {
  tokenId: '01900300100008',
  term: 'save',
  sourceText: 'יָשַׁע',
  translit: 'yāšaʿ',
  glosses: ['to save', 'to deliver', 'to rescue'],
  partOfSpeech: 'verb (qal)',
  occurrenceCount: 5,
  translations: ['save', 'deliver'],
  definition:
    'To rescue or deliver from danger, harm, or oppression. In biblical context, often refers to divine deliverance.',
  senses: [
    {
      id: 'yasha-1',
      definition: 'To rescue from physical danger.',
      glosses: ['rescue', 'save'],
      partOfSpeech: 'verb',
      isRelevant: true,
    },
    {
      id: 'yasha-2',
      definition: 'To deliver from spiritual oppression; to grant salvation.',
      glosses: ['save', 'deliver'],
      partOfSpeech: 'verb',
      isRelevant: true,
    },
  ],
  semanticDomains: [
    { id: 'sd-rescue', label: 'Rescue > Deliver' },
    { id: 'sd-salvation', label: 'Salvation' },
  ],
  relatedLexemes: [
    { lemma: 'גָּאַל', translit: 'gāʾal', gloss: 'redeem', relationType: 'Gloss' },
    { lemma: 'נָצַל', translit: 'nāṣal', gloss: 'deliver', relationType: 'SemanticDomain' },
    { lemma: 'פָּדָה', translit: 'pādâ', gloss: 'ransom', relationType: 'SemanticDomain' },
  ],
  encyclopediaLinks: [{ articleId: 'enc-salvation-ot', title: 'Salvation in the Old Testament' }],
  verseOccurrences: [
    { book: 19, chapter: 3, verse: 8, label: 'Psa 3:8' },
    { book: 19, chapter: 14, verse: 7, label: 'Psa 14:7' },
    { book: 19, chapter: 18, verse: 2, label: 'Psa 18:2' },
  ],
};

/** Greek entry: logos (derived from gm-023/024 with related lexemes) */
export const MOCK_DICT_ENTRY_LOGOS: MockDictionaryEntry = {
  tokenId: '04000100100002',
  term: 'word',
  sourceText: 'λόγος',
  translit: 'logos',
  glosses: ['word', 'message', 'reason', 'account'],
  partOfSpeech: 'noun (masc.)',
  occurrenceCount: 7,
  translations: ['word', 'Word'],
  definition:
    'A word, message, or rational principle. In John 1, refers to the divine pre-existent Christ.',
  senses: [
    {
      id: 'logos-1',
      definition: 'A spoken or written word; a unit of speech.',
      glosses: ['word'],
      partOfSpeech: 'noun',
      isRelevant: true,
    },
    {
      id: 'logos-2',
      definition: 'A communication, message, or report.',
      glosses: ['message', 'report'],
      partOfSpeech: 'noun',
      isRelevant: true,
    },
    {
      id: 'logos-3',
      definition: 'Reason, rational principle; the divine Word personified.',
      glosses: ['reason', 'principle'],
      partOfSpeech: 'noun',
      isRelevant: false,
    },
  ],
  semanticDomains: [
    { id: 'sd-communication', label: 'Communication' },
    { id: 'sd-divine-word', label: 'Divine Word' },
  ],
  relatedLexemes: [
    { lemma: 'ῥῆμα', translit: 'rhema', gloss: 'word', relationType: 'Gloss' },
    { lemma: 'ῥῆμα', translit: 'rhema', gloss: 'Communication', relationType: 'SemanticDomain' },
    { lemma: 'ἀγγελία', translit: 'aggelia', gloss: 'message', relationType: 'Gloss' },
    {
      lemma: 'ἀγγελία',
      translit: 'aggelia',
      gloss: 'Communication',
      relationType: 'SemanticDomain',
    },
    {
      lemma: 'εὐαγγέλιον',
      translit: 'euangelion',
      gloss: 'Communication',
      relationType: 'SemanticDomain',
    },
  ],
  encyclopediaLinks: [
    { articleId: 'enc-logos', title: 'Logos in Johannine Theology' },
    { articleId: 'enc-word-of-god', title: 'The Word of God' },
  ],
  verseOccurrences: [
    { book: 43, chapter: 1, verse: 1, label: 'John 1:1' },
    { book: 43, chapter: 1, verse: 14, label: 'John 1:14' },
  ],
};

/** Greek entry: agape (love) */
export const MOCK_DICT_ENTRY_AGAPE: MockDictionaryEntry = {
  tokenId: '04600130100008',
  term: 'love',
  sourceText: 'ἀγάπη',
  translit: 'agapē',
  glosses: ['love', 'charity'],
  partOfSpeech: 'noun (fem.)',
  occurrenceCount: 9,
  translations: ['love'],
  definition:
    "Self-giving, sacrificial love; the highest form of love in the New Testament, often used of God's love for humanity.",
  senses: [
    {
      id: 'agape-1',
      definition: 'Self-giving love, especially divine love.',
      glosses: ['love'],
      partOfSpeech: 'noun',
      isRelevant: true,
    },
  ],
  semanticDomains: [{ id: 'sd-love', label: 'Affection > Love' }],
  relatedLexemes: [{ lemma: 'φιλέω', translit: 'phileo', gloss: 'to love', relationType: 'Gloss' }],
  encyclopediaLinks: [{ articleId: 'enc-agape', title: 'Agape Love' }],
  verseOccurrences: [
    { book: 46, chapter: 13, verse: 1, label: '1Co 13:1' },
    { book: 46, chapter: 13, verse: 4, label: '1Co 13:4' },
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

/** Mock localized entry from gm-022 (Chinese mapping for אֱלֹהִים) */
export const MOCK_DICT_ENTRY_ELOHIM_ZH: MockDictionaryEntry = {
  ...MOCK_DICT_ENTRY_ELOHIM,
  glosses: ['上帝；神'],
  translations: ['上帝'],
};
