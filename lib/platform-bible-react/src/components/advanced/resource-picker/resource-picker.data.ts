import { ResourceItem } from './resource-picker.types';

/**
 * Sample resources shaped as `ResourceItem`. `included` items track membership only; the host
 * decides which one is "currently displayed" via its own state and passes that in for emphasis.
 *
 * The mix below covers scripture + commentary types so resource-type filtering can be exercised by
 * stories.
 */
export const SAMPLE_ITEMS: ResourceItem[] = [
  {
    data: {
      dblEntryUid: 'inc-1',
      displayName: 'NIV',
      fullName: 'New International Version',
      bestLanguageName: 'English',
      type: 'ScriptureResource',
      size: 12_000_000,
      installed: true,
      updateAvailable: false,
      projectId: 'prj-niv',
    },
    status: { kind: 'included', lockedIncluded: true },
  },
  {
    data: {
      dblEntryUid: 'inc-2',
      displayName: 'RVR60',
      fullName: 'Reina Valera 1960',
      bestLanguageName: 'Spanish',
      type: 'ScriptureResource',
      size: 9_800_000,
      installed: true,
      updateAvailable: false,
      projectId: 'prj-rvr',
    },
    status: { kind: 'included' },
  },
  {
    data: {
      dblEntryUid: 'inc-3',
      displayName: 'ESV',
      fullName: 'English Standard Version',
      bestLanguageName: 'English',
      type: 'ScriptureResource',
      size: 11_500_000,
      installed: true,
      updateAvailable: false,
      projectId: 'prj-esv',
    },
    status: { kind: 'included' },
  },
  {
    data: {
      dblEntryUid: 'inc-comm-1',
      displayName: 'MHC',
      fullName: "Matthew Henry's Commentary",
      bestLanguageName: 'English',
      type: 'CommentaryResource',
      size: 18_000_000,
      installed: true,
      updateAvailable: false,
      projectId: 'prj-mhc',
    },
    status: { kind: 'included' },
  },
  {
    data: {
      dblEntryUid: 'ins-1',
      displayName: 'KJV',
      fullName: 'King James Version',
      bestLanguageName: 'English',
      type: 'ScriptureResource',
      size: 8_200_000,
      installed: true,
      updateAvailable: true,
      projectId: 'prj-kjv',
    },
    status: { kind: 'installed' },
  },
  {
    data: {
      dblEntryUid: 'ins-2',
      displayName: 'NASB',
      fullName: 'New American Standard Bible',
      bestLanguageName: 'English',
      type: 'ScriptureResource',
      size: 9_100_000,
      installed: true,
      updateAvailable: false,
      projectId: 'prj-nasb',
    },
    status: { kind: 'installed' },
  },
  {
    data: {
      dblEntryUid: 'ins-comm-1',
      displayName: 'JFB',
      fullName: 'Jamieson-Fausset-Brown Commentary',
      bestLanguageName: 'English',
      type: 'CommentaryResource',
      size: 14_500_000,
      installed: true,
      updateAvailable: false,
      projectId: 'prj-jfb',
    },
    status: { kind: 'installed' },
  },
  {
    data: {
      dblEntryUid: 'avail-1',
      displayName: 'NLT',
      fullName: 'New Living Translation',
      bestLanguageName: 'English',
      type: 'ScriptureResource',
      size: 10_200_000,
      installed: false,
      updateAvailable: false,
      projectId: 'prj-nlt',
    },
    status: { kind: 'available' },
  },
  {
    data: {
      dblEntryUid: 'avail-2',
      displayName: 'LSG',
      fullName: 'Louis Segond 1910',
      bestLanguageName: 'French',
      type: 'ScriptureResource',
      size: 8_900_000,
      installed: false,
      updateAvailable: false,
      projectId: 'prj-lsg',
    },
    status: { kind: 'available' },
  },
  {
    data: {
      dblEntryUid: 'avail-3',
      displayName: 'ELB',
      fullName: 'Elberfelder Bibel',
      bestLanguageName: 'German',
      type: 'ScriptureResource',
      size: 7_500_000,
      installed: false,
      updateAvailable: false,
      projectId: 'prj-elb',
    },
    status: { kind: 'available' },
  },
  {
    data: {
      dblEntryUid: 'avail-4',
      displayName: 'NVI-PT',
      fullName: 'Nova Versão Internacional (Portuguese)',
      bestLanguageName: 'Portuguese',
      type: 'ScriptureResource',
      size: 9_000_000,
      installed: false,
      updateAvailable: false,
      projectId: 'prj-nvipt',
    },
    status: { kind: 'available' },
  },
  {
    data: {
      dblEntryUid: 'avail-comm-1',
      displayName: 'GILL',
      fullName: "Gill's Exposition of the Entire Bible",
      bestLanguageName: 'English',
      type: 'CommentaryResource',
      size: 22_000_000,
      installed: false,
      updateAvailable: false,
      projectId: 'prj-gill',
    },
    status: { kind: 'available' },
  },
];

/** Sparse — only one default included, mostly add-mode. */
export const SAMPLE_ITEMS_SPARSE: ResourceItem[] = SAMPLE_ITEMS.map((it) =>
  it.data.dblEntryUid === 'inc-1'
    ? it
    : {
        ...it,
        status: it.status.kind === 'included' ? { kind: 'installed' as const } : it.status,
      },
);

/** Populated — display-switcher mode. */
export const SAMPLE_ITEMS_POPULATED: ResourceItem[] = SAMPLE_ITEMS;

/**
 * Multiple preferred languages — represents the realistic case where a user has a UI language plus
 * other languages they read.
 */
export const PREFERRED_LANGUAGES = ['English', 'Spanish', 'French'];
