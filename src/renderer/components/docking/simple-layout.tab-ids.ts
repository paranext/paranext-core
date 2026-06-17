// Shared tab-ID constants for the simple layout. Kept in this dependency-free module so both
// `simple-layout.data` (static layout) and `simple-layout.builder` (project-bound clone) can import
// the same IDs without re-introducing the cycle into `web-view.service-host`.
const MODEL_TEXT_TAB_ID = '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2';
const SCRIPTURE_EDITOR_TAB_ID = '3cf575f0-2cc2-464b-8765-b588f216dfce';
const BIBLE_TEXTS_TAB_ID = '27616073-bf60-4f2b-9518-922d1a7d3601';
const COMMENTARIES_TAB_ID = '6c950d23-f8d7-4482-a384-93ea0481698b';

export const SIMPLE_LAYOUT_TAB_ID = {
  modelText: MODEL_TEXT_TAB_ID,
  scriptureEditor: SCRIPTURE_EDITOR_TAB_ID,
  bibleTexts: BIBLE_TEXTS_TAB_ID,
  commentaries: COMMENTARIES_TAB_ID,
} as const;

/**
 * The four stable UUIDs used for the simple-mode tabs. Exposed so callers driving the power →
 * simple transition can poll for tab readiness (e.g. wait until each tab's title has resolved
 * before hiding the workspace-updating overlay).
 */
export const SIMPLE_LAYOUT_TAB_IDS: readonly string[] = [
  MODEL_TEXT_TAB_ID,
  SCRIPTURE_EDITOR_TAB_ID,
  BIBLE_TEXTS_TAB_ID,
  COMMENTARIES_TAB_ID,
];
