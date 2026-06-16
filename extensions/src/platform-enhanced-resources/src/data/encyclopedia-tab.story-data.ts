/**
 * Shared mock data for encyclopedia tab Storybook stories. Derived from golden masters in
 * `.context/features/enhanced-resources/golden-masters/`:
 *
 * - Gm-008-encyclopedia-v1 ("Camel, dromedary" - Hebrew + Greek + Latin language sets, V1 format)
 * - Gm-009-encyclopedia-v2 (V2 format - same shape from the UI's perspective; backend reconciles)
 * - Gm-010-encyclopedia-paragraph-html (paragraph rendering test cases - we lift the input strings as
 *   paragraph text and the verse-link payloads to populate ArticleVerseLink data)
 * - Gm-011-encyclopedia-verse-link (verse reference G04300301600000 -> JHN 3:16)
 *
 * No PAPI types are imported - all shapes are local to this design phase.
 */

/** Mirrors data-contracts.md ArticleVerseLink. */
export interface MockArticleVerseLink {
  reference: { book: number; chapter: number; verse: number };
  displayText: string;
  /** Pattern: G04300301600000 = BookCode + Chapter + Verse + CharOffset. */
  rawReference: string;
}

/** Mirrors data-contracts.md ArticleCrossRef. */
export interface MockArticleCrossRef {
  targetArticleId: string;
  displayText: string;
  type: 'seealso' | 'launchViewer';
}

/** Mirrors data-contracts.md ArticleParagraph. */
export interface MockArticleParagraph {
  text: string;
  verseLinks: MockArticleVerseLink[];
  abbreviations: { abbrev: string; fullText: string }[];
  inlineImageIds: string[];
}

/** Mirrors data-contracts.md ArticleData. */
export interface MockArticleData {
  articleId: string;
  title: string;
  paragraphs: MockArticleParagraph[];
  crossReferences: MockArticleCrossRef[];
  imageIds: string[];
}

/** Mirrors data-contracts.md EncyclopediaEntryRef (post-3B reconciled shape). */
export interface MockEncyclopediaEntryRef {
  articleId: string;
  key: string;
  title: string;
  teaserText: string;
  formatVersion: 1 | 2;
  inlineImageIds?: string[];
}

/** Mirrors data-contracts.md EncyclopediaDisplayItem. */
export interface MockEncyclopediaEntry {
  tokenId: string;
  lemma: string;
  sourceText: string;
  translit: string;
  entries: MockEncyclopediaEntryRef[];
  imageIds: string[];
  collection: string;
}

// ---------------------------------------------------------------------------
// Article fixtures
// ---------------------------------------------------------------------------

/** Verse link for John 3:16, decoded from gm-011 raw reference G04300301600000. */
const VERSE_JHN_3_16: MockArticleVerseLink = {
  reference: { book: 43, chapter: 3, verse: 16 },
  displayText: 'John 3:16',
  rawReference: 'G04300301600000',
};

/** Cross reference fixture (REALIA:1.1.8.3 -> "Winnowing fork", from gm-010). */
const CROSS_REF_WINNOWING_FORK: MockArticleCrossRef = {
  targetArticleId: 'REALIA:1.1.8.3',
  displayText: 'Winnowing fork',
  type: 'seealso',
};

/** Cross reference fixture (FAUNA:2.8 -> "Camel, dromedary", related entry). */
const CROSS_REF_CAMEL_DETAIL: MockArticleCrossRef = {
  targetArticleId: 'FAUNA:2.8',
  displayText: 'Camel, dromedary',
  type: 'seealso',
};

/**
 * Cross reference fixture for inline image launch (gm-010 case 9 was skipped but the shape is
 * documented).
 */
const CROSS_REF_DROMEDARY_IMAGE: MockArticleCrossRef = {
  targetArticleId: 'Dromedary',
  displayText: 'Dromedary photograph',
  type: 'launchViewer',
};

/**
 * Article: "Camel, dromedary" (FAUNA:2.8) - sourced from gm-008. Paragraphs lifted from the
 * Discussion / Description / Translation sections of the golden master with PT9 markup stripped
 * (|s..|s* -> verse links handled separately, |i..|i* italic / |a..|a* abbreviation markers not
 * preserved here since we render plain text + structured verse links / abbreviations).
 */
export const MOCK_ARTICLE_CAMEL: MockArticleData = {
  articleId: 'FAUNA:2.8',
  title: 'Camel, dromedary',
  paragraphs: [
    {
      text: 'There were two types of camel known in Bible times the most common being the Arabian Dromedary (camelus dromedarius), which was indigenous to the area. The two-humped Bactrian Camel (camelus bactrianus) was also known and prized, but it was imported from Central Asia.',
      verseLinks: [],
      abbreviations: [{ abbrev: 'NIV', fullText: 'New International Version' }],
      inlineImageIds: ['Dromedary'],
    },
    {
      text: 'Camels belong to the same family as the South American llama, vicuna, alpaca, and guanaco, but camels are much larger and have a big fatty hump on their backs. Bactrian camels may reach a height of about two meters (6.5 feet), while dromedaries are even bigger.',
      verseLinks: [],
      abbreviations: [],
      inlineImageIds: [],
    },
    {
      text: 'In areas where camels are not known, the word is often transliterated from Hebrew or the dominant language of the area. See John 3:16 for a related teaching about the eye of a needle and a camel.',
      verseLinks: [VERSE_JHN_3_16],
      abbreviations: [],
      inlineImageIds: [],
    },
  ],
  crossReferences: [CROSS_REF_WINNOWING_FORK, CROSS_REF_DROMEDARY_IMAGE],
  imageIds: ['Dromedary', 'Bactrian'],
};

/** Article: "Contents and Introduction" (FAUNA:0) - the V1 index entry from gm-008 record 0. */
export const MOCK_ARTICLE_CONTENTS: MockArticleData = {
  articleId: 'FAUNA:0',
  title: 'Contents and Introduction',
  paragraphs: [
    {
      text: 'This volume of Animals in the Bible covers mammals, birds, reptiles, fish, and insects. Each entry includes Hebrew, Greek, and Latin terms, with verse references and translation guidance.',
      verseLinks: [],
      abbreviations: [],
      inlineImageIds: [],
    },
  ],
  crossReferences: [CROSS_REF_CAMEL_DETAIL],
  imageIds: [],
};

/** Article: V2 format example - Realia/Heaven (gm-009 shape; UI-side identical). */
export const MOCK_ARTICLE_HEAVEN: MockArticleData = {
  articleId: 'REALIA:5.2',
  title: 'Heaven',
  paragraphs: [
    {
      text: 'In ancient Near Eastern cosmology, the heavens were understood as a layered dome above the earth. The Hebrew word shamayim is grammatically plural, reflecting this multilayered conception.',
      verseLinks: [],
      abbreviations: [{ abbrev: 'ANE', fullText: 'Ancient Near Eastern' }],
      inlineImageIds: ['Cosmology'],
    },
    {
      text: 'Translators in cultures with different cosmological frames may need a footnote explaining the original conception. Compare John 3:16 for a NT use of "heaven" as the dwelling of God.',
      verseLinks: [VERSE_JHN_3_16],
      abbreviations: [],
      inlineImageIds: [],
    },
  ],
  crossReferences: [],
  imageIds: ['Cosmology'],
};

/** Minimal article (single paragraph, no images, no cross-refs) for empty-edge stories. */
export const MOCK_ARTICLE_MINIMAL: MockArticleData = {
  articleId: 'FAUNA:9',
  title: 'Selected Bibliography',
  paragraphs: [
    {
      text: 'For further reading on biblical fauna, consult the works listed in the bibliography section of the printed edition.',
      verseLinks: [],
      abbreviations: [],
      inlineImageIds: [],
    },
  ],
  crossReferences: [],
  imageIds: [],
};

// ---------------------------------------------------------------------------
// Encyclopedia entry fixtures (list rows)
// ---------------------------------------------------------------------------

/** Hebrew entry for "gamal" (camel) - sourced from gm-008 LanguageSets row "gamal". */
export const MOCK_ENC_ENTRY_GAMAL: MockEncyclopediaEntry = {
  tokenId: '00101201600003',
  lemma: 'גָּמָל',
  sourceText: 'גָּמָל',
  translit: 'gamal',
  entries: [
    {
      articleId: 'FAUNA:2.8',
      key: '2.8',
      title: 'Camel, dromedary',
      teaserText:
        'There were two types of camel known in Bible times the most common being the Arabian Dromedary...',
      formatVersion: 1,
      inlineImageIds: ['Dromedary', 'Bactrian'],
    },
  ],
  imageIds: ['Dromedary', 'Bactrian'],
  collection: 'FAUNA',
};

/** Hebrew entry for "beker" / "bikrah" - same gm-008 record but different language set row. */
export const MOCK_ENC_ENTRY_BEKER: MockEncyclopediaEntry = {
  tokenId: '02306000600002',
  lemma: 'בֵּכֶר',
  sourceText: 'בֵּכֶר, בִּכְרָה',
  translit: 'beker, bikrah',
  entries: [
    {
      articleId: 'FAUNA:2.8',
      key: '2.8',
      title: 'Camel, dromedary',
      teaserText:
        'There were two types of camel known in Bible times the most common being the Arabian Dromedary...',
      formatVersion: 1,
      inlineImageIds: ['Dromedary'],
    },
  ],
  imageIds: ['Dromedary'],
  collection: 'FAUNA',
};

/** Greek entry for "kamēlos" (camel) - sourced from gm-008 Greek language set. */
export const MOCK_ENC_ENTRY_KAMELOS: MockEncyclopediaEntry = {
  tokenId: '04001902400001',
  lemma: 'κάμηλος',
  sourceText: 'κάμηλος',
  translit: 'kamēlos',
  entries: [
    {
      articleId: 'FAUNA:2.8',
      key: '2.8',
      title: 'Camel, dromedary',
      teaserText:
        'In these passages the large size of the camel is contrasted with a small eye of a needle...',
      formatVersion: 1,
      inlineImageIds: ['Dromedary'],
    },
  ],
  imageIds: ['Dromedary'],
  collection: 'FAUNA',
};

/** Hebrew entry with multiple article references (V2 format from gm-009 shape). */
export const MOCK_ENC_ENTRY_SHAMAYIM: MockEncyclopediaEntry = {
  tokenId: '00100100100012',
  lemma: 'שָׁמַיִם',
  sourceText: 'שָׁמַיִם',
  translit: 'shamayim',
  entries: [
    {
      articleId: 'REALIA:5.2',
      key: '5.2',
      title: 'Heaven',
      teaserText:
        'In ancient Near Eastern cosmology, the heavens were understood as a layered dome above the earth...',
      formatVersion: 2,
      inlineImageIds: ['Cosmology'],
    },
    {
      articleId: 'REALIA:5.3',
      key: '5.3',
      title: 'Sky and clouds',
      teaserText:
        'The Hebrew shamayim sometimes refers to the visible sky as opposed to the divine dwelling place...',
      formatVersion: 2,
      inlineImageIds: [],
    },
  ],
  imageIds: ['Cosmology'],
  collection: 'REALIA',
};

/** Hebrew entry without thumbnail images (covers AC: thumbnails optional). */
export const MOCK_ENC_ENTRY_NO_IMAGES: MockEncyclopediaEntry = {
  tokenId: '00100100100020',
  lemma: 'בְּרֵאשִׁית',
  sourceText: 'בְּרֵאשִׁית',
  translit: 'bereʼshiyt',
  entries: [
    {
      articleId: 'FAUNA:9',
      key: '9',
      title: 'Selected Bibliography',
      teaserText:
        'For further reading on biblical fauna, consult the works listed in the bibliography section...',
      formatVersion: 1,
    },
  ],
  imageIds: [],
  collection: 'FAUNA',
};

/** Default Hebrew encyclopedia entries (Genesis 1 area). */
export const MOCK_ENC_ENTRIES_HEBREW: MockEncyclopediaEntry[] = [
  MOCK_ENC_ENTRY_GAMAL,
  MOCK_ENC_ENTRY_BEKER,
  MOCK_ENC_ENTRY_SHAMAYIM,
];

/** Default Greek encyclopedia entries. */
export const MOCK_ENC_ENTRIES_GREEK: MockEncyclopediaEntry[] = [MOCK_ENC_ENTRY_KAMELOS];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Article data map keyed by tokenId (matches the encyclopedia-tab pattern: when an entry is
 * expanded the tab looks up `articleDataMap[tokenId]` to render the detail). Phase-3-ui wires this
 * from the backend via getArticle calls.
 */
export const MOCK_ARTICLE_DATA_MAP: Record<string, MockArticleData> = {
  [MOCK_ENC_ENTRY_GAMAL.tokenId]: MOCK_ARTICLE_CAMEL,
  [MOCK_ENC_ENTRY_BEKER.tokenId]: MOCK_ARTICLE_CAMEL,
  [MOCK_ENC_ENTRY_KAMELOS.tokenId]: MOCK_ARTICLE_CAMEL,
  [MOCK_ENC_ENTRY_SHAMAYIM.tokenId]: MOCK_ARTICLE_HEAVEN,
  [MOCK_ENC_ENTRY_NO_IMAGES.tokenId]: MOCK_ARTICLE_MINIMAL,
};

/**
 * Storybook-friendly image URL resolver per FN-009. Production code injects a resolver that returns
 * `papi-er://images/{imageId}`; stories use placehold.co so they render without a backend.
 */
export function mockImageUrlResolver(imageId: string): string {
  const labels: Record<string, string> = {
    Dromedary: 'Dromedary',
    Bactrian: 'Bactrian',
    Cosmology: 'ANE+Cosmology',
  };
  const label = labels[imageId] ?? imageId;
  return `https://placehold.co/240x160?text=${encodeURIComponent(label)}`;
}

/** Thumbnail-sized resolver for the inline list view. */
export function mockThumbnailUrlResolver(imageId: string): string {
  const labels: Record<string, string> = {
    Dromedary: 'Dromedary',
    Bactrian: 'Bactrian',
    Cosmology: 'Cosmo',
  };
  const label = labels[imageId] ?? imageId;
  return `https://placehold.co/48x36?text=${encodeURIComponent(label)}`;
}
