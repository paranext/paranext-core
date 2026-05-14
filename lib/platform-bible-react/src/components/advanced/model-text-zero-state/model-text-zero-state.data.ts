import { DblResourceData } from 'platform-bible-utils';
import { SAMPLE_RESOURCES } from '@/components/advanced/resource-picker-dialog/resource-picker-dialog.data';

/**
 * Story-only extensions of {@link SAMPLE_RESOURCES}. Adds a couple of scripture resources in
 * additional languages so the "filter by user language" stories have something to rank.
 */
const EXTRA_MODEL_TEXT_CANDIDATES: DblResourceData[] = [
  {
    dblEntryUid: 'model-tpi-1',
    displayName: 'TPI-BSB',
    fullName: 'Tok Pisin Buk Baibel',
    bestLanguageName: 'Tok Pisin',
    type: 'ScriptureResource',
    size: 7400000,
    installed: true,
    updateAvailable: false,
    projectId: 'prj-tpi-bsb',
  },
  {
    dblEntryUid: 'model-fra-1',
    displayName: 'LSG',
    fullName: 'Louis Segond 1910',
    bestLanguageName: 'French',
    type: 'ScriptureResource',
    size: 9100000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-fra-lsg',
  },
  {
    dblEntryUid: 'model-por-1',
    displayName: 'ARC',
    fullName: 'Almeida Revista e Corrigida',
    bestLanguageName: 'Portuguese',
    type: 'ScriptureResource',
    size: 8800000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj-por-arc',
  },
];

/**
 * Full pool of candidate model-text resources for stories. Combines the existing fixture (so the
 * stories share data with the resource-picker-dialog) with a handful of additional translations to
 * exercise language ranking.
 */
export const MODEL_TEXT_RESOURCES: DblResourceData[] = [
  ...SAMPLE_RESOURCES,
  ...EXTRA_MODEL_TEXT_CANDIDATES,
];

/**
 * The id of the resource Donna has pinned as the project's model text in a "populated" story.
 * Single value — model text is single-select.
 */
export const SAMPLE_MODEL_TEXT_ID = 'selected-1'; // NIV

/** Languages we pretend Saroj has configured in her preferences, for stub language ranking. */
export const SAMPLE_USER_LANGUAGES = ['English', 'Tok Pisin'];

/** Stub paragraph used by the "Populated" stories to show real text in the column. */
export const SAMPLE_MODEL_TEXT_PARAGRAPH =
  '1 In the beginning was the Word, and the Word was with God, and the Word was God. ' +
  '2 He was with God in the beginning. 3 Through him all things were made; without him ' +
  'nothing was made that has been made. 4 In him was life, and that life was the light of ' +
  'all mankind. 5 The light shines in the darkness, and the darkness has not overcome it.';
