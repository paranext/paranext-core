/*
 * Mock catalog shared by the unified Home, project picker, and full-app design-ideas stories, so
 * every surface renders the same projects and resources.
 */

import type { UnifiedItem, UnifiedItemType } from './home-unified.component';

const daysAgo = (days: number) => new Date(Date.now() - days * 1000 * 60 * 60 * 24).toISOString();
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 1000 * 60 * 60).toISOString();

// Long language list so the language-filter dropdown demonstrates scrolling. If any DBL bundle in
// production has a language not in this set, add it here so the filter shows its full inventory.
const LANGUAGES: readonly string[] = [
  'Amharic',
  'Arabic',
  'Assamese',
  'Aymara',
  'Bengali',
  'Bulgarian',
  'Burmese',
  'Catalan',
  'Cebuano',
  'Chinese',
  'Chichewa',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Estonian',
  'Farsi',
  'Filipino',
  'Finnish',
  'French',
  'Georgian',
  'German',
  'Greek (Ancient)',
  'Greek (Modern)',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Indonesian',
  'Italian',
  'Japanese',
  'Kannada',
  'Kazakh',
  'Khmer',
  'Kinyarwanda',
  'Korean',
  'Kurdish (Sorani)',
  'Lao',
  'Latvian',
  'Lithuanian',
  'Luganda',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Marathi',
  'Mongolian',
  'Nepali',
  'Norwegian (Bokmål)',
  'Norwegian (Nynorsk)',
  'Odia',
  'Pashto',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Quechua',
  'Romanian',
  'Russian',
  'Serbian',
  'Sesotho',
  'Shona',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tagalog',
  'Tamil',
  'Telugu',
  'Thai',
  'Tigrinya',
  'Tongan',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Vietnamese',
  'Welsh',
  'Wolof',
  'Xhosa',
  'Yoruba',
  'Zulu',
];

const DBL_TYPES: UnifiedItemType[] = [
  'ScriptureResource',
  'CommentaryResource',
  'EnhancedResource',
  'SourceLanguageResource',
  'XmlResource',
];

// Reasonable-looking short-name letters. Enough distinct combinations for hundreds of rows.
const shortNameFor = (i: number): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const a = letters[i % letters.length];
  const b = letters[Math.floor(i / letters.length) % letters.length];
  const c = letters[Math.floor(i / (letters.length * letters.length)) % letters.length];
  return `${a}${b}${c}`;
};

// `hasTeamLayout` marks the projects whose administrator set a team layout (an icon in the title bar
// picker); `isReadOnly` the projects the user cannot edit (a monochrome Paratext logo); `isAdmin`
// the ones the user administers (a wrench) and `isLocalOnly` one not on the Send/Receive server
// (wifi off).
// `teamProjectIds` / `isUserChoice` drive Home's context grouping: a resource a project's team
// shares, one the user picked, both, or neither (BDAG: installed but on no list). Team resources
// come from a team layout, so `teamProjectIds` names only projects with `hasTeamLayout` — never a
// local-only one, which has no team.
// Sample: NNB (ESV, OHB), MRSYR (NTComm) and SW-OBT (ESV, WEB-A) have team layouts; the user
// administers NNB, MRSYR, HNF and the read-only TPTS, but not SW-OBT; WEB is local-only.
// A representative selection of locally-installed rows (mix of projects, resources, sync-needed and
// update-available) plus a couple of S/R-server-only projects. These always come first in the mock
// dataset so the "recent first" behavior and the star-my-languages behavior are visible without
// scrolling.
export const LOCAL_ITEMS: UnifiedItem[] = [
  {
    id: 'p-nnb',
    hasTeamLayout: true,
    isAdmin: true,
    shortName: 'NNB',
    fullName: 'New Norwegian Bible — Working Draft',
    language: 'Norwegian (Nynorsk)',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: hoursAgo(3),
    editedOnServerIso: daysAgo(4),
    editedLocallyIso: hoursAgo(2),
  },
  // The two projects Power's layout opens in editor tabs.
  {
    id: 'p-hnf',
    isAdmin: true,
    shortName: 'HNF',
    fullName: 'Hunde New Testament',
    language: 'Hunde',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: hoursAgo(1),
  },
  {
    id: 'p-tpts',
    isReadOnly: true,
    // Read-only, yet administered: Home still offers Edit team layout.
    isAdmin: true,
    shortName: 'TPTS',
    fullName: 'Tok Pisin Translation Sample',
    language: 'Tok Pisin',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: hoursAgo(5),
  },
  {
    id: 'p-web',
    isLocalOnly: true,
    shortName: 'WEB',
    fullName: 'World English Bible',
    language: 'English',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: daysAgo(2),
  },
  {
    id: 'p-mrsyr',
    hasTeamLayout: true,
    isAdmin: true,
    shortName: 'MRSYR',
    fullName: 'Marathi Working Draft',
    language: 'Marathi',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: daysAgo(1),
    // Only a local edit — this exercises the "one-line" sync tooltip branch.
    editedLocallyIso: hoursAgo(20),
  },
  {
    id: 'r-esv',
    shortName: 'ESV',
    fullName: 'English Standard Version',
    language: 'English',
    type: 'ScriptureResource',
    status: 'installedResource',
    lastUsedIso: daysAgo(5),
    teamProjectIds: ['p-nnb', 'p-sw-obt'],
  },
  {
    id: 'r-nt-comm',
    shortName: 'NTComm',
    fullName: 'New Testament Commentary (Bruce, F.F.)',
    language: 'English',
    type: 'CommentaryResource',
    status: 'installedNeedsUpdate',
    newVersionIso: daysAgo(3),
    lastUsedIso: daysAgo(30),
    teamProjectIds: ['p-mrsyr'],
    isUserChoice: true,
  },
  {
    id: 'r-ohb',
    shortName: 'OHB',
    fullName: 'Open Hebrew Bible',
    language: 'Hebrew',
    type: 'SourceLanguageResource',
    status: 'installedResource',
    teamProjectIds: ['p-nnb'],
  },
  {
    id: 'r-heb-lex',
    shortName: 'HebLex',
    fullName: 'Brown-Driver-Briggs Hebrew Lexicon',
    language: 'Hebrew',
    type: 'SourceLanguageResource',
    status: 'installedResource',
    isUserChoice: true,
  },
  // A few more "Edited" (installedNeedsSync) projects to exercise the batch Sync affordance and
  // the sync-tooltip variants (both dates, local only, server only).
  {
    id: 'p-fr-lsg-draft',
    shortName: 'LSG-Draft',
    fullName: 'Louis Segond Revision Draft',
    language: 'French',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: hoursAgo(6),
    editedOnServerIso: daysAgo(1),
    editedLocallyIso: hoursAgo(4),
  },
  {
    id: 'p-sw-obt',
    hasTeamLayout: true,
    shortName: 'SW-OBT',
    fullName: 'Swahili Old Testament Draft',
    language: 'Swahili',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: daysAgo(3),
    editedOnServerIso: daysAgo(10),
  },
  {
    id: 'p-de-nlv',
    shortName: 'DE-NLV',
    fullName: 'German New Living Version — In Progress',
    language: 'German',
    type: 'Project',
    status: 'installedNeedsSync',
    lastUsedIso: daysAgo(7),
    editedLocallyIso: daysAgo(2),
    isHidden: true,
  },
  // More up-to-date local projects, so the title bar picker has more projects than its "Recent"
  // section holds and shows both of its sections.
  {
    id: 'p-es-rvr',
    shortName: 'RVR-Rev',
    fullName: 'Reina-Valera Revision',
    language: 'Spanish',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: daysAgo(4),
  },
  {
    id: 'p-pt-nvt',
    shortName: 'NVT-PT',
    fullName: 'Nova Versão Portuguese Draft',
    language: 'Portuguese',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: daysAgo(9),
  },
  {
    id: 'p-id-tb',
    isReadOnly: true,
    shortName: 'TB-ID',
    fullName: 'Indonesian Terjemahan Baru Study Draft',
    language: 'Indonesian',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: daysAgo(21),
  },
  {
    id: 'p-am-nt',
    shortName: 'AMH-NT',
    fullName: 'Amharic New Testament Revision',
    language: 'Amharic',
    type: 'Project',
    status: 'installedProject',
    lastUsedIso: daysAgo(45),
  },
  {
    id: 'p-ko-back',
    isReadOnly: true,
    shortName: 'KOR-BT',
    fullName: 'Korean Back Translation',
    language: 'Korean',
    type: 'Project',
    status: 'installedProject',
  },
  // A few more "Updated" (installedNeedsUpdate) resources so the Updated preset is meaningful.
  {
    id: 'r-web-audio',
    shortName: 'WEB-A',
    fullName: 'World English Bible (Audio Aligned)',
    language: 'English',
    type: 'ScriptureResource',
    status: 'installedNeedsUpdate',
    newVersionIso: daysAgo(12),
    lastUsedIso: daysAgo(12),
    teamProjectIds: ['p-sw-obt'],
  },
  {
    id: 'r-net-notes',
    shortName: 'NET-N',
    fullName: 'NET Bible Translation Notes',
    language: 'English',
    type: 'EnhancedResource',
    status: 'installedNeedsUpdate',
    newVersionIso: daysAgo(6),
    lastUsedIso: daysAgo(22),
    isUserChoice: true,
  },
  {
    id: 'r-greek-lex',
    shortName: 'BDAG',
    fullName: 'Bauer-Danker Greek-English Lexicon',
    language: 'Greek (Ancient)',
    type: 'SourceLanguageResource',
    status: 'installedNeedsUpdate',
    newVersionIso: daysAgo(40),
    isHidden: true,
  },
  {
    id: 's-sw-ntb',
    shortName: 'SW-NTB',
    fullName: 'Swahili New Testament — Beta',
    language: 'Swahili',
    type: 'Project',
    status: 'sharedNotInstalled',
  },
  {
    id: 's-quechua-nt',
    shortName: 'QUE-NT',
    fullName: 'Quechua New Testament (Draft)',
    language: 'Quechua',
    type: 'Project',
    status: 'sharedNotInstalled',
  },
];

// Deterministic pseudo-random so the generated catalog is stable across renders (important for
// autodocs and side-by-side visual review).
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const RESOURCE_KIND_LABEL: Record<UnifiedItemType, string> = {
  Project: 'Working Draft',
  ScriptureResource: 'Scripture Bundle',
  CommentaryResource: 'Reference Commentary',
  EnhancedResource: 'Enhanced Resource',
  SourceLanguageResource: 'Source Language Reference',
  XmlResource: 'XML Reference',
};

export function buildDblCatalog(count: number): UnifiedItem[] {
  const rand = seededRandom(42);
  const items: UnifiedItem[] = [];
  for (let i = 0; i < count; i += 1) {
    const language = LANGUAGES[i % LANGUAGES.length];
    const type = DBL_TYPES[Math.floor(rand() * DBL_TYPES.length)];
    const sizeMb = Math.max(1, Math.round(rand() * 60));
    const shortName = shortNameFor(i);
    items.push({
      id: `d-${i}`,
      shortName,
      fullName: `${language} — ${RESOURCE_KIND_LABEL[type]} (${shortName})`,
      language,
      type,
      status: 'dblNotInstalled',
      sizeMb,
    });
  }
  return items;
}

// The full mock catalog: local rows first, then a large DBL discovery set. The initial fetch caps
// at INITIAL_PAGE items; the harness pages in the rest via onFetchMore.
export const FULL_CATALOG: UnifiedItem[] = [...LOCAL_ITEMS, ...buildDblCatalog(240)];
