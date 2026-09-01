import { DblResourceData, ResourceType } from 'platform-bible-utils';

export const SAMPLE_RESOURCES: DblResourceData[] = [
  // Already Selected (IDs match SAMPLE_SELECTED_IDS)
  {
    dblEntryUid: 'selected-1',
    displayName: 'NIV',
    fullName: 'New International Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 12000000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-niv',
  },
  {
    dblEntryUid: 'selected-2',
    displayName: 'RVR60',
    fullName: 'Reina Valera 1960',
    bestLanguageName: 'Spanish',
    type: 'ScriptureResource',
    size: 9800000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-rvr',
  },
  // Installed but not selected
  {
    dblEntryUid: 'installed-1',
    displayName: 'ESV',
    fullName: 'English Standard Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 11500000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-esv',
  },
  {
    dblEntryUid: 'installed-2',
    displayName: 'KJV',
    fullName: 'King James Version',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 8200000,
    installed: true,
    updateAvailable: true,
    projectId: 'prj-kjv',
  },
  {
    dblEntryUid: 'installed-3',
    displayName: 'UBS-SLR',
    fullName: 'UBS Source Language Resource',
    bestLanguageName: 'Greek',
    type: 'SourceLanguageResource',
    size: 25000000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-ubsslr',
  },
  // Available to download
  {
    dblEntryUid: 'download-1',
    displayName: 'NLT',
    fullName: 'New Living Translation',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 10200000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-nlt',
  },
  {
    dblEntryUid: 'download-2',
    displayName: 'UBS HB',
    fullName: 'UBS Handbook',
    bestLanguageName: 'English',
    type: 'XmlResource',
    size: 5400000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-ubshb',
  },
  {
    dblEntryUid: 'download-3',
    displayName: 'SIL TNN',
    fullName: 'SIL Translation Notes and Drafts',
    bestLanguageName: 'English',
    type: 'XmlResource',
    size: 3200000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-siltnn',
  },
  {
    dblEntryUid: 'download-4',
    displayName: 'BHS',
    fullName: 'Biblia Hebraica Stuttgartensia',
    bestLanguageName: 'Hebrew',
    type: 'SourceLanguageResource',
    size: 18700000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-bhs',
  },
];

export const SAMPLE_SELECTED_IDS: string[] = ['selected-1', 'selected-2'];

const GENERATED_LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'Arabic',
  'Hindi',
  'Portuguese',
  'Swahili',
  'Mandarin',
  'Russian',
  'German',
];
const GENERATED_TYPES: ResourceType[] = [
  'ScriptureResource',
  'SourceLanguageResource',
  'XmlResource',
];

function generateResources(count: number): DblResourceData[] {
  return Array.from({ length: count }, (_, i) => ({
    dblEntryUid: `gen-${i}`,
    displayName: `RES-${i}`,
    fullName: `Generated Resource ${i}`,
    bestLanguageName: GENERATED_LANGUAGES[i % GENERATED_LANGUAGES.length],
    type: GENERATED_TYPES[i % GENERATED_TYPES.length],
    size: 5_000_000 + i * 1000,
    installed: false,
    updateAvailable: false,
    projectId: `prj-gen-${i}`,
  }));
}

export const LARGE_SAMPLE_RESOURCES: DblResourceData[] = generateResources(2500);

/**
 * A realistic spread of language names. Real DBL catalogues carry hundreds of languages, which is
 * the only regime where the language filter's scrolling, ordering, and below-the-fold behavior are
 * observable — {@link SAMPLE_RESOURCES} has 4 distinct languages and {@link LARGE_SAMPLE_RESOURCES}
 * has 10, so neither exercises any of it.
 */
const MANY_LANGUAGES = [
  'Afrikaans',
  'Akan',
  'Albanian',
  'Amharic',
  'Arabic',
  'Armenian',
  'Assamese',
  'Aymara',
  'Azerbaijani',
  'Balinese',
  'Bambara',
  'Basque',
  'Belarusian',
  'Bemba',
  'Bengali',
  'Bikol',
  'Bosnian',
  'Bulgarian',
  'Burmese',
  'Cebuano',
  'Chichewa',
  'Chin, Hakha',
  'Chuvash',
  'Coptic',
  'Croatian',
  'Czech',
  'Danish',
  'Dinka',
  'Dutch',
  'Dzongkha',
  'Efik',
  'English',
  'Estonian',
  'Ewe',
  'Faroese',
  'Fijian',
  'Finnish',
  'French',
  'Fulfulde',
  'Ga',
  "Ge'ez",
  'Georgian',
  'German',
  'Gikuyu',
  'Greek',
  'Guarani',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hebrew',
  'Hiligaynon',
  'Hindi',
  'Hmong',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Ilocano',
  'Indonesian',
  'Inuktitut',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kanuri',
  'Kazakh',
  'Khmer',
  'Kinyarwanda',
  'Kirundi',
  'Konkani',
  'Korean',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latvian',
  'Lingala',
  'Lithuanian',
  'Luganda',
  'Luo',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Mandarin',
  'Maori',
  'Marathi',
  'Mongolian',
  'Nahuatl',
  'Nepali',
  'Norwegian',
  'Odia',
  'Oromo',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Quechua',
  'Romanian',
  'Russian',
  'Samoan',
  'Sango',
  'Serbian',
  'Sesotho',
  'Shona',
  'Sindhi',
  'Sinhala',
  'Slovak',
  'Slovenian',
  'Somali',
  'Spanish',
  'Swahili',
  'Swedish',
  'Syriac',
  'Tagalog',
  'Tajik',
  'Tamil',
  'Telugu',
  'Thai',
  'Tigrinya',
  'Tongan',
  'Tsonga',
  'Turkish',
  'Ugaritic',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Vietnamese',
  'Wolof',
  'Xhosa',
  'Yoruba',
  'Zulu',
];

/**
 * Languages carrying at least one installed resource in {@link MANY_LANGUAGE_RESOURCES}. The
 * language filter is expected to promote these above the rest.
 */
export const MANY_LANGUAGE_INSTALLED_LANGUAGES = [
  'Amharic',
  'Nepali',
  'Portuguese',
  'Quechua',
  'Swahili',
  'Tagalog',
];

/**
 * Languages deliberately forced to carry only non-Scripture resources in
 * {@link MANY_LANGUAGE_RESOURCES}. A picker scoped to `ScriptureResource` must not offer these,
 * because selecting one yields zero rows.
 *
 * These are named so a test can assert against them by name; they are NOT the complete set of
 * languages without a Scripture resource — the generator's type cycle leaves many more in the same
 * position. Assert set equality against the fixture rather than using this list as a complement.
 */
export const MANY_LANGUAGE_NON_SCRIPTURE_LANGUAGES = ['Coptic', "Ge'ez", 'Syriac', 'Ugaritic'];

/**
 * A catalogue-sized resource list: 132 languages, six of them with an installed resource.
 *
 * 47 of the languages end up with no Scripture resource at all — the four named in
 * {@link MANY_LANGUAGE_NON_SCRIPTURE_LANGUAGES}, which are forced to `XmlResource`, plus every
 * language whose `step % 3 === 1` and so receives only `SourceLanguageResource` + `XmlResource`.
 * Scoping this fixture to Scripture therefore drops about a third of the list, not four entries.
 *
 * Emitted in a deliberately non-alphabetical order (a fixed coprime stride over the language list)
 * so it mimics a real DBL catalogue's arbitrary ordering. Any test asserting alphabetical ordering
 * against this fixture is therefore falsifiable — it fails if the sort is dropped.
 */
function generateManyLanguageResources(): DblResourceData[] {
  const resources: DblResourceData[] = [];
  // 37 is coprime with the language count, so this visits every language exactly once in an order
  // that is stable across runs but unrelated to alphabetical order.
  const stride = 37;
  for (let step = 0; step < MANY_LANGUAGES.length; step++) {
    const language = MANY_LANGUAGES[(step * stride) % MANY_LANGUAGES.length];
    const isNonScriptureOnly = MANY_LANGUAGE_NON_SCRIPTURE_LANGUAGES.includes(language);
    const isInstalledLanguage = MANY_LANGUAGE_INSTALLED_LANGUAGES.includes(language);
    const countForLanguage = 1 + (step % 3);
    for (let n = 0; n < countForLanguage; n++) {
      resources.push({
        dblEntryUid: `many-${step}-${n}`,
        displayName: `${language.slice(0, 3).toUpperCase()}${n + 1}`,
        fullName: `${language} Resource ${n + 1}`,
        bestLanguageName: language,
        type: isNonScriptureOnly
          ? 'XmlResource'
          : GENERATED_TYPES[(step + n) % GENERATED_TYPES.length],
        size: 4_000_000 + step * 10_000 + n * 1000,
        // Only the first resource of an installed language is installed, so the per-language
        // counts stay distinguishable from the installed flag.
        installed: isInstalledLanguage && n === 0,
        updateAvailable: false,
        projectId: `prj-many-${step}-${n}`,
      });
    }
  }
  return resources;
}

export const MANY_LANGUAGE_RESOURCES: DblResourceData[] = generateManyLanguageResources();
