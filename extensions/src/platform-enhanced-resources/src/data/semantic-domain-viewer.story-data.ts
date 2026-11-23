/**
 * Mock data for the SemanticDomainViewer Storybook stories.
 *
 * The hierarchy, lemmas, and glosses are derived from `gm-024-related-lexemes-domain` (the
 * canonical golden master for semantic-domain-based related-lexeme discovery). The "Communication"
 * branch in the mock tree is anchored on the same lemmas captured in that fixture (logos, rhema,
 * aggelia, euangelion). Surrounding branches ("Physical", "Supernatural", "Psychological") add
 * depth so the breadcrumb tree popover can demonstrate 4-5 levels of nesting per the ui-spec
 * wireframe; their content is plausible SDBG-style filler and is not asserted by behavioural
 * tests.
 */

import type { SemanticDomain } from 'platform-bible-react/experimental';
import type { SemanticDomainFilteredItem } from '../components/semantic-domain-viewer/semantic-domain-viewer.component';

/** Communication branch from gm-024 (logos / rhema / aggelia / euangelion). */
export const MOCK_DOMAIN_COMMUNICATION_BRANCH: SemanticDomain = {
  id: '5',
  label: '5. Communication',
  children: [
    {
      id: '5.1',
      label: '5.1 Speak',
      children: [
        { id: '5.1.1', label: '5.1.1 Word', children: [] },
        { id: '5.1.2', label: '5.1.2 Message', children: [] },
        { id: '5.1.3', label: '5.1.3 Gospel / good news', children: [] },
      ],
    },
    {
      id: '5.2',
      label: '5.2 Listen',
      children: [
        { id: '5.2.1', label: '5.2.1 Hear', children: [] },
        { id: '5.2.2', label: '5.2.2 Pay attention', children: [] },
      ],
    },
  ],
};

/** Sacred Texts branch from gm-024 (graphe). */
export const MOCK_DOMAIN_SACRED_TEXTS_BRANCH: SemanticDomain = {
  id: '7',
  label: '7. Sacred texts',
  children: [{ id: '7.1', label: '7.1 Scripture', children: [] }],
};

/** Physical branch with deep (4-5 level) nesting matching the spec wireframe. */
export const MOCK_DOMAIN_PHYSICAL_BRANCH: SemanticDomain = {
  id: '1',
  label: '1. Physical',
  children: [
    {
      id: '1.1',
      label: '1.1 Movement',
      children: [
        { id: '1.1.1', label: '1.1.1 Walk', children: [] },
        { id: '1.1.2', label: '1.1.2 Run', children: [] },
        {
          id: '1.1.3',
          label: '1.1.3 Carry',
          children: [
            { id: '1.1.3.1', label: '1.1.3.1 Carry on head', children: [] },
            { id: '1.1.3.2', label: '1.1.3.2 Carry on back', children: [] },
            { id: '1.1.3.3', label: '1.1.3.3 Carry in hand', children: [] },
          ],
        },
        { id: '1.1.4', label: '1.1.4 Send', children: [] },
      ],
    },
    { id: '1.2', label: '1.2 Rest / settle', children: [] },
  ],
};

export const MOCK_DOMAIN_SUPERNATURAL_BRANCH: SemanticDomain = {
  id: '2',
  label: '2. Supernatural',
  children: [
    { id: '2.1', label: '2.1 Deity', children: [] },
    { id: '2.2', label: '2.2 Spirits', children: [] },
  ],
};

export const MOCK_DOMAIN_PSYCHOLOGICAL_BRANCH: SemanticDomain = {
  id: '3',
  label: '3. Psychological',
  children: [
    { id: '3.1', label: '3.1 Think', children: [] },
    { id: '3.2', label: '3.2 Feel', children: [] },
  ],
};

/** Full domain tree used as the default fixture for the viewer stories. */
export const MOCK_DOMAIN_TREE: SemanticDomain[] = [
  MOCK_DOMAIN_PHYSICAL_BRANCH,
  MOCK_DOMAIN_SUPERNATURAL_BRANCH,
  MOCK_DOMAIN_PSYCHOLOGICAL_BRANCH,
  MOCK_DOMAIN_COMMUNICATION_BRANCH,
  MOCK_DOMAIN_SACRED_TEXTS_BRANCH,
];

/**
 * A 4-level breadcrumb path - "Physical > Movement > Carry > Carry in hand". Demonstrates the
 * breadcrumb's collapsing behaviour at narrow widths.
 */
const movement = MOCK_DOMAIN_PHYSICAL_BRANCH.children?.[0];
const carry = movement?.children?.[2];
const carryInHand = carry?.children?.[2];
if (!movement || !carry || !carryInHand) {
  throw new Error('MOCK_DOMAIN_PHYSICAL_BRANCH is missing the expected nested structure.');
}
export const MOCK_DOMAIN_PATH_DEEP: SemanticDomain[] = [
  MOCK_DOMAIN_PHYSICAL_BRANCH,
  movement,
  carry,
  carryInHand,
];

/**
 * Filtered dictionary entries for the deep-path story. Lemmas / glosses reuse the gm-024 logos /
 * rhema fixtures so the row body and detail panel render representative content. The shape conforms
 * to the ErDictionaryFilteredList row contract (IndexedListItem & DictionaryDisplayItemData).
 */
export const MOCK_DICT_ENTRIES_FILTERED: SemanticDomainFilteredItem[] = [
  {
    id: 'logos',
    primaryText: 'λόγος',
    sourceLanguageText: 'λόγος',
    transliteration: 'logos',
    tokenId: 'logos',
    entryId: 'λόγος',
    sourceText: 'λόγος',
    translit: 'logos',
    relevantSenseIndices: [0, 1],
    firstRelevantSensePreview: 'A spoken or written communication of meaning.',
    senses: [
      {
        id: 'logos-1',
        senseNumber: 1,
        definition: 'A spoken or written communication of meaning.',
        glosses: 'word',
        domains: [{ id: '5.1', label: '5.1 Speak' }],
        occurrencesInAllBooksCount: 5,
        isRelevant: true,
      },
      {
        id: 'logos-2',
        senseNumber: 2,
        definition: 'A communicated message or report.',
        glosses: 'message',
        domains: [{ id: '5.1', label: '5.1 Speak' }],
        occurrencesInAllBooksCount: 2,
        isRelevant: true,
      },
    ],
  },
  {
    id: 'rhema',
    primaryText: 'ῥῆμα',
    sourceLanguageText: 'ῥῆμα',
    transliteration: 'rhema',
    tokenId: 'rhema',
    entryId: 'ῥῆμα',
    sourceText: 'ῥῆμα',
    translit: 'rhema',
    relevantSenseIndices: [0],
    firstRelevantSensePreview: 'A specific spoken word or utterance.',
    senses: [
      {
        id: 'rhema-1',
        senseNumber: 1,
        definition: 'A specific spoken word or utterance.',
        glosses: 'word',
        domains: [{ id: '5.1', label: '5.1 Speak' }],
        occurrencesInAllBooksCount: 3,
        isRelevant: true,
      },
    ],
  },
  {
    id: 'aggelia',
    primaryText: 'ἀγγελία',
    sourceLanguageText: 'ἀγγελία',
    transliteration: 'aggelia',
    tokenId: 'aggelia',
    entryId: 'ἀγγελία',
    sourceText: 'ἀγγελία',
    translit: 'aggelia',
    relevantSenseIndices: [0],
    firstRelevantSensePreview: 'A message communicated from one party to another.',
    senses: [
      {
        id: 'aggelia-1',
        senseNumber: 1,
        definition: 'A message communicated from one party to another.',
        glosses: 'message, announcement',
        domains: [{ id: '5.1', label: '5.1 Speak' }],
        occurrencesInAllBooksCount: 2,
        isRelevant: true,
      },
    ],
  },
];
