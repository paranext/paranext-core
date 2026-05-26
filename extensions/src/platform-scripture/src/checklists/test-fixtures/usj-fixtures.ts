import type { Usj } from '@eten-tech-foundation/scripture-utilities';

/**
 * Hand-authored USJ documents used by the USJ-paragraph-walker unit tests. Kept small and focused
 * on the behaviors we care about — heading classification, INV-009 forward-scan, FB-35863
 * chapter-boundary stop, and the "skip nested notes/figures" invariant. Real-USJ smoke verification
 * happens in Phase 7's behavior-parity baseline diff, not here.
 */

/**
 * Minimal USJ document for a single book with one chapter containing one paragraph. Used by walker
 * tests as the "smallest sane input".
 */
export const SIMPLE_GENESIS_ONE_PARA: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'In the beginning God created the heavens and the earth.',
      ],
    },
  ],
};

/** Genesis 1 with one heading + one body paragraph. Heading should forward-scan to verse 1. */
export const GENESIS_WITH_HEADING: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 's',
      content: ['Section heading'],
    },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' }, 'Body content.'],
    },
  ],
};

/**
 * Genesis with a heading directly before a chapter boundary — FB-35863 case. The heading must NOT
 * pull forward to the next chapter's verse 1; it stays at the previous chapter's last verseRef.
 */
export const GENESIS_HEADING_BEFORE_CHAPTER: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' }, 'Chapter 1 content.'],
    },
    {
      type: 'para',
      marker: 's',
      content: ['Orphan heading at end of chapter 1'],
    },
    { type: 'chapter', marker: 'c', number: '2', sid: 'GEN 2' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1', sid: 'GEN 2:1' }, 'Chapter 2 content.'],
    },
  ],
};

/** Empty book — no paragraph nodes. Used for edge-case tests. */
export const EMPTY_BOOK: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [{ type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] }],
};

/** Paragraph containing a nested footnote — walker must NOT descend into the note. */
export const PARA_WITH_NESTED_NOTE: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'Before note. ',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            {
              type: 'para',
              marker: 'fp',
              content: ['Footnote paragraph — must NOT be walked as a top-level paragraph.'],
            },
          ],
        },
        ' After note.',
      ],
    },
  ],
};

/**
 * Paragraph containing a `\ior` character span — exercises the consumer-inventory § 3 override: the
 * walker must emit a `TextItem` with `characterStyle: 'ior'`, NOT a `LinkItem`. The plan's earlier
 * `\ior` LinkItem special-case is wrong; this fixture is the canary for that decision.
 */
export const PARA_WITH_IOR_CHAR: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'io1',
      content: [
        'Outline entry — ',
        { type: 'char', marker: 'ior', content: ['1:1'] },
        ' first reference.',
      ],
    },
  ],
};
