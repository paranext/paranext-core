import type { ChecklistData, ChecklistRow } from '../components/checklist.types';

// Mock `ChecklistData` payloads for the `ChecklistTool` Storybook stories.
//
// Rows are derived from the `expected-output.json` files under
// `.context/features/markers-checklist/golden-masters/gm-...` so the visuals reflect real backend
// output rather than fabricated shapes. The golden-master JSON uses the legacy `CLText` / `CLVerse`
// paragraph-item shape; each helper below maps those to the contract shape (`ChecklistContentItem`
// from `data-contracts.md` §3.5):
//
// - `CLText` with `marker === ""` and a leading `\p` / `\q` text -> the paragraph marker prefix
//   (emitted by the component automatically from `paragraph.marker`, so the golden-master's first
//   text item is dropped from `items` here).
// - `CLText` with non-empty text -> `{ type: "text", text, characterStyle? }`.
// - `CLVerse` -> `{ type: "verse", verseNumber }`.
//
// No `EditLinkItem`s are included by default - `DEF-UI-003` keeps the edit affordance disabled in
// this phase. Stories that exercise the edit affordance opt-in via `isEditLinkEnabled`.

/** ---------- Helpers ---------- */

function row(
  firstRef: string,
  cells: ChecklistRow['cells'],
  options: { isMatch?: boolean; includeEditLink?: boolean } = {},
): ChecklistRow {
  const { isMatch = false, includeEditLink = false } = options;
  return {
    firstRef,
    cells,
    isMatch,
    includeEditLink,
  };
}

/** ---------- Project references (column headers) ---------- */

const primaryProjectId = 'project-tstgm001';
const comparativeProjectBId = 'project-tstgm001b';
const comparativeProjectCId = 'project-tstgm001c';

export const CHECKLIST_STORY_COLUMN_PROJECT_FULL_NAMES: Record<string, string> = {
  [primaryProjectId]: 'Pidgin Translation',
  [comparativeProjectBId]: 'Reference Bible B',
  [comparativeProjectCId]: 'Reference Bible C',
};

/** ---------- Default: gm-001-single-project-markers ---------- */

export const CHECKLIST_STORY_DATA_DEFAULT: ChecklistData = {
  columnHeaders: ['TSTGM001'],
  columnProjectIds: [primaryProjectId],
  excludedCount: 0,
  rows: [
    row(
      'EXO 20:1',
      [
        {
          reference: 'EXO 20:1',
          displayedReference: 'EXO 20:1',
          language: 'en',
          paragraphs: [
            {
              marker: 'p',
              items: [
                { type: 'verse', verseNumber: '1' },
                { type: 'text', text: 'one. ' },
                { type: 'verse', verseNumber: '2' },
                { type: 'text', text: 'two, ' },
              ],
            },
          ],
        },
      ],
      { isMatch: true, includeEditLink: true },
    ),
    row(
      'EXO 20:2',
      [
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [
            {
              marker: 'q',
              items: [{ type: 'text', text: 'poetry ' }],
            },
            {
              marker: 'q2',
              items: [{ type: 'text', text: 'indented poetry ' }],
            },
          ],
        },
      ],
      { isMatch: true, includeEditLink: true },
    ),
    row(
      'EXO 20:3',
      [
        {
          reference: 'EXO 20:3',
          displayedReference: 'EXO 20:3',
          language: 'en',
          paragraphs: [
            {
              marker: 'p',
              items: [{ type: 'text', text: 'three, ' }],
            },
          ],
        },
      ],
      { isMatch: true, includeEditLink: true },
    ),
  ],
};

/** ---------- MultiColumn: gm-003-different-markers-comparison ---------- */

export const CHECKLIST_STORY_DATA_MULTI_COLUMN: ChecklistData = {
  columnHeaders: ['TSTGM003A', 'TSTGM003B', 'TSTGM003C'],
  columnProjectIds: [primaryProjectId, comparativeProjectBId, comparativeProjectCId],
  excludedCount: 1,
  rows: [
    row(
      'EXO 20:2',
      [
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [
            { marker: 'q', items: [] },
            { marker: 'q2', items: [] },
          ],
        },
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [
            { marker: 'p', items: [] },
            { marker: 'q', items: [] },
          ],
        },
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [{ marker: 'q1', items: [] }],
        },
      ],
      { isMatch: false, includeEditLink: true },
    ),
    row(
      'EXO 20:3',
      [
        {
          reference: 'EXO 20:3',
          displayedReference: 'EXO 20:3',
          language: 'en',
          paragraphs: [{ marker: 'p', items: [] }],
        },
        {
          reference: 'EXO 20:3',
          displayedReference: 'EXO 20:3',
          language: 'en',
          paragraphs: [{ marker: 'q2', items: [] }],
        },
        {
          reference: 'EXO 20:3',
          displayedReference: 'EXO 20:3',
          language: 'en',
          paragraphs: [{ marker: 'p', items: [] }],
        },
      ],
      { isMatch: false, includeEditLink: true },
    ),
  ],
};

/** ---------- HideMatches: gm-004-hide-matches-filtering (only difference rows) ---------- */

export const CHECKLIST_STORY_DATA_HIDE_MATCHES: ChecklistData = {
  columnHeaders: ['TSTGM004A', 'TSTGM004B'],
  columnProjectIds: [primaryProjectId, comparativeProjectBId],
  excludedCount: 12,
  rows: [
    row(
      'EXO 20:2',
      [
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [
            { marker: 'q', items: [] },
            { marker: 'q2', items: [] },
          ],
        },
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [
            { marker: 'p', items: [] },
            { marker: 'q', items: [] },
          ],
        },
      ],
      { isMatch: false, includeEditLink: true },
    ),
    row(
      'EXO 20:3',
      [
        {
          reference: 'EXO 20:3',
          displayedReference: 'EXO 20:3',
          language: 'en',
          paragraphs: [{ marker: 'p', items: [] }],
        },
        {
          reference: 'EXO 20:3',
          displayedReference: 'EXO 20:3',
          language: 'en',
          paragraphs: [{ marker: 'q2', items: [] }],
        },
      ],
      { isMatch: false, includeEditLink: true },
    ),
  ],
};

/** ---------- Empty: gm-002-identical-markers-message ---------- */

export const CHECKLIST_STORY_DATA_EMPTY: ChecklistData = {
  columnHeaders: ['TSTGM002A', 'TSTGM002B'],
  columnProjectIds: [primaryProjectId, comparativeProjectBId],
  excludedCount: 0,
  rows: [],
  emptyResultMessage: {
    variant: 'identical',
    message: 'Comparative texts have identical markers.',
  },
};

/** ---------- ShowVerseText: gm-016-show-verse-text-char-styles ---------- */

export const CHECKLIST_STORY_DATA_SHOW_VERSE_TEXT: ChecklistData = {
  columnHeaders: ['TSTGM016A', 'TSTGM016B'],
  columnProjectIds: [primaryProjectId, comparativeProjectBId],
  excludedCount: 2,
  rows: [
    row(
      'EXO 20:2',
      [
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [
            {
              marker: 'q',
              items: [{ type: 'text', text: 'poetry ' }],
            },
            {
              marker: 'q2',
              items: [
                { type: 'text', text: 'indented ' },
                { type: 'text', text: 'poetry', characterStyle: 'em' },
                { type: 'text', text: ' ' },
              ],
            },
          ],
        },
        {
          reference: 'EXO 20:2',
          displayedReference: 'EXO 20:2',
          language: 'en',
          paragraphs: [
            {
              marker: 'p',
              items: [
                { type: 'text', text: 'more', characterStyle: 'em' },
                { type: 'text', text: ' text ' },
              ],
            },
            {
              marker: 'q1',
              items: [{ type: 'text', text: 'prose ' }],
            },
          ],
        },
      ],
      { isMatch: false, includeEditLink: true },
    ),
  ],
};

/** ---------- Truncated: INV-012 (> 5000 rows) ---------- */

export const CHECKLIST_STORY_DATA_TRUNCATED: ChecklistData = {
  columnHeaders: ['TSTGM001'],
  columnProjectIds: [primaryProjectId],
  excludedCount: 0,
  truncated: true,
  rows: CHECKLIST_STORY_DATA_DEFAULT.rows,
};
