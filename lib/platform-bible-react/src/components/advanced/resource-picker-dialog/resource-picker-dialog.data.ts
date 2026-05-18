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
