import { DblResourceData } from 'platform-bible-utils';
import {
  SAMPLE_RESOURCES,
  SAMPLE_SELECTED_IDS,
} from '@/components/advanced/resource-picker-dialog/resource-picker-dialog.data';

/**
 * Re-export of the canonical fixture so story files can import everything they need from a single
 * neighborhood.
 */
export { SAMPLE_RESOURCES, SAMPLE_SELECTED_IDS };

/**
 * IDs that simulate "Donna (admin) added these for the team". Saroj cannot remove these — the
 * remove button should be disabled with a tooltip explaining why.
 *
 * Chosen so the populated stories show a believable mix:
 *
 * - Selected-1 (NIV) — admin-added (Donna picked the team's primary reference)
 * - Installed-2 (KJV) — admin-added
 *
 * These overlap with `userAssociatedIds` only by coincidence — the union is the effective
 * "selected" set; the partition controls who can remove what.
 */
export const ADMIN_ASSOCIATED_IDS: string[] = ['selected-1', 'installed-2'];

/** IDs that simulate "Saroj added these for himself". Saroj can remove these freely. */
export const USER_ASSOCIATED_IDS: string[] = ['selected-2', 'installed-1'];

/**
 * Union: everything Saroj currently sees on his Bible Texts tab. The populated-state stories render
 * these as the live list; the picker uses this as its `selectedResourceIds` so the same resources
 * surface as "already added" inside the picker.
 */
export const POPULATED_SELECTED_IDS: string[] = Array.from(
  new Set([...ADMIN_ASSOCIATED_IDS, ...USER_ASSOCIATED_IDS]),
);

/**
 * Scripture-only subset of SAMPLE_RESOURCES — what the Bible Texts tab is concerned with. Other
 * resource types (XmlResource, SourceLanguageResource) belong to other tabs.
 */
export const SCRIPTURE_SAMPLE_RESOURCES: DblResourceData[] = SAMPLE_RESOURCES.filter(
  (r) => r.type === 'ScriptureResource',
);

/**
 * Default story args for "Saroj's project, mid-translation" populated state. 4 resources, 2
 * admin-added, 2 user-added, NIV is active.
 */
export const DEFAULT_POPULATED_STORY_ARGS = {
  resources: SAMPLE_RESOURCES.filter((r) => POPULATED_SELECTED_IDS.includes(r.dblEntryUid)),
  activeResourceId: 'selected-1',
  adminAssociatedIds: ADMIN_ASSOCIATED_IDS,
  userAssociatedIds: USER_ASSOCIATED_IDS,
  selectedResourceIds: POPULATED_SELECTED_IDS,
};

/**
 * Saroj's known languages for stub `filterResourcesByUserLanguages` — used by the suggestions-first
 * zero state and by the picker's "Suggested for you" section.
 */
export const SAMPLE_USER_LANGUAGES: string[] = ['English', 'Spanish'];
