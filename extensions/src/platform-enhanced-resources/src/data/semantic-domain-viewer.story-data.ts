/**
 * Mock data for the SemanticDomainViewer Storybook stories.
 *
 * The hierarchy, lemmas, and glosses are derived from `gm-024-related-lexemes-domain` (the
 * canonical golden master for semantic-domain-based related-lexeme discovery). The "Communication"
 * branch in the mock tree is anchored on the same lemmas captured in that fixture (logos, rhema,
 * aggelia, euangelion). Surrounding branches ("Physical", "Supernatural", "Psychological") add
 * depth so the tree can demonstrate 4-5 levels of nesting per the ui-spec wireframe; their content
 * is plausible SDBG-style filler and is not asserted by behavioural tests.
 */

import type { SemanticDomainNode } from '../components/semantic-domain-viewer/semantic-domain-viewer.component';
import type { SemanticDomainFilteredEntry } from '../components/semantic-domain-viewer/semantic-domain-display-item.component';

/** Communication branch from gm-024 (logos / rhema / aggelia / euangelion). */
export const MOCK_DOMAIN_COMMUNICATION_BRANCH: SemanticDomainNode = {
  id: '5',
  label: '5. Communication',
  hasArticle: false,
  children: [
    {
      id: '5.1',
      label: '5.1 Speak',
      hasArticle: true,
      children: [
        {
          id: '5.1.1',
          label: '5.1.1 Word',
          hasArticle: true,
          children: [],
        },
        {
          id: '5.1.2',
          label: '5.1.2 Message',
          hasArticle: true,
          children: [],
        },
        {
          id: '5.1.3',
          label: '5.1.3 Gospel / good news',
          hasArticle: true,
          children: [],
        },
      ],
    },
    {
      id: '5.2',
      label: '5.2 Listen',
      hasArticle: false,
      children: [
        { id: '5.2.1', label: '5.2.1 Hear', hasArticle: true, children: [] },
        { id: '5.2.2', label: '5.2.2 Pay attention', hasArticle: true, children: [] },
      ],
    },
  ],
};

/** Sacred Texts branch from gm-024 (graphe). */
export const MOCK_DOMAIN_SACRED_TEXTS_BRANCH: SemanticDomainNode = {
  id: '7',
  label: '7. Sacred texts',
  hasArticle: false,
  children: [
    {
      id: '7.1',
      label: '7.1 Scripture',
      hasArticle: true,
      children: [],
    },
  ],
};

/** Physical branch with deep (4-5 level) nesting matching the spec wireframe. */
export const MOCK_DOMAIN_PHYSICAL_BRANCH: SemanticDomainNode = {
  id: '1',
  label: '1. Physical',
  hasArticle: false,
  children: [
    {
      id: '1.1',
      label: '1.1 Movement',
      hasArticle: false,
      children: [
        { id: '1.1.1', label: '1.1.1 Walk', hasArticle: true, children: [] },
        { id: '1.1.2', label: '1.1.2 Run', hasArticle: true, children: [] },
        {
          id: '1.1.3',
          label: '1.1.3 Carry',
          hasArticle: false,
          children: [
            {
              id: '1.1.3.1',
              label: '1.1.3.1 Carry on head',
              hasArticle: true,
              children: [],
            },
            {
              id: '1.1.3.2',
              label: '1.1.3.2 Carry on back',
              hasArticle: true,
              children: [],
            },
            {
              id: '1.1.3.3',
              label: '1.1.3.3 Carry in hand',
              hasArticle: true,
              children: [],
            },
          ],
        },
        { id: '1.1.4', label: '1.1.4 Send', hasArticle: true, children: [] },
      ],
    },
    {
      id: '1.2',
      label: '1.2 Rest / settle',
      hasArticle: true,
      children: [],
    },
  ],
};

export const MOCK_DOMAIN_SUPERNATURAL_BRANCH: SemanticDomainNode = {
  id: '2',
  label: '2. Supernatural',
  hasArticle: false,
  children: [
    { id: '2.1', label: '2.1 Deity', hasArticle: true, children: [] },
    { id: '2.2', label: '2.2 Spirits', hasArticle: true, children: [] },
  ],
};

export const MOCK_DOMAIN_PSYCHOLOGICAL_BRANCH: SemanticDomainNode = {
  id: '3',
  label: '3. Psychological',
  hasArticle: false,
  children: [
    { id: '3.1', label: '3.1 Think', hasArticle: true, children: [] },
    { id: '3.2', label: '3.2 Feel', hasArticle: true, children: [] },
  ],
};

/** Full domain tree used as the default fixture for the viewer stories. */
export const MOCK_DOMAIN_TREE: SemanticDomainNode[] = [
  MOCK_DOMAIN_PHYSICAL_BRANCH,
  MOCK_DOMAIN_SUPERNATURAL_BRANCH,
  MOCK_DOMAIN_PSYCHOLOGICAL_BRANCH,
  MOCK_DOMAIN_COMMUNICATION_BRANCH,
  MOCK_DOMAIN_SACRED_TEXTS_BRANCH,
];

/**
 * Filtered dictionary entries for the "5.1.1 Word" domain. Lemmas / glosses derived from gm-024:
 * logos and rhema both belong to "Communication" with senses glossed as "word".
 */
export const MOCK_FILTERED_ENTRIES_WORD: SemanticDomainFilteredEntry[] = [
  {
    entryId: 'logos',
    lemma: 'logos',
    sourceText: 'λόγος',
    translit: 'logos',
    gloss: 'word, message',
    senses: [
      {
        id: 'logos-1',
        definition: 'A spoken or written communication of meaning.',
        glosses: ['word'],
        partOfSpeech: 'noun',
        isRelevant: true,
      },
      {
        id: 'logos-2',
        definition: 'A communicated message or report.',
        glosses: ['message'],
        partOfSpeech: 'noun',
        isRelevant: true,
      },
    ],
  },
  {
    entryId: 'rhema',
    lemma: 'rhema',
    sourceText: 'ῥῆμα',
    translit: 'rhema',
    gloss: 'word',
    senses: [
      {
        id: 'rhema-1',
        definition: 'A specific spoken word or utterance.',
        glosses: ['word'],
        partOfSpeech: 'noun',
        isRelevant: true,
      },
    ],
  },
];

/** Filtered entries for "5.1.2 Message" - aggelia. */
export const MOCK_FILTERED_ENTRIES_MESSAGE: SemanticDomainFilteredEntry[] = [
  {
    entryId: 'aggelia',
    lemma: 'aggelia',
    sourceText: 'ἀγγελία',
    translit: 'aggelia',
    gloss: 'message',
    senses: [
      {
        id: 'aggelia-1',
        definition: 'A message communicated from one party to another.',
        glosses: ['message', 'announcement'],
        partOfSpeech: 'noun',
        isRelevant: true,
      },
    ],
  },
];

/** Filtered entries for "5.1.3 Gospel" - euangelion. */
export const MOCK_FILTERED_ENTRIES_GOSPEL: SemanticDomainFilteredEntry[] = [
  {
    entryId: 'euangelion',
    lemma: 'euangelion',
    sourceText: 'εὐαγγέλιον',
    translit: 'euangelion',
    gloss: 'gospel, good news',
    senses: [
      {
        id: 'euangelion-1',
        definition: 'Good news, especially the message about salvation through Jesus Christ.',
        glosses: ['gospel', 'good news'],
        partOfSpeech: 'noun',
        isRelevant: true,
      },
    ],
  },
];
