/**
 * Real scripture USJ fixtures for the scripture-pane / footnotes-pane Storybook stories.
 *
 * These are copied VERBATIM (then lightly adapted where noted) from the well-formed sample `.usj`
 * files the platform-bible-utils USJ reader/writer tests exercise:
 * lib/platform-bible-utils/src/scripture/usj-reader-writer-test-data/
 *
 * Why copy instead of import? The library tests read those files at runtime via Node `fs`
 * (`readTestDataFile(...)`), which is not available in the extension's Storybook webpack build, and
 * a cross-package import of raw `.usj` files from `platform-bible-utils/src/...test-data` does not
 * resolve from this extension's build graph. Embedding the content as typed `Usj` objects here
 * keeps the stories on REAL, correctly-structured USFM-derived data (correct verse markers, real
 * footnote and cross-reference notes) without a fragile cross-package file import.
 *
 * Source files, exactly:
 *
 * - MATTHEW_2_USJ ← web-matthew-2-verse-range.usj (WEB Matthew 2, verses 1-5 + 19-23, one real `\f`
 *   footnote on v1). Compact, renders verse numbers well.
 * - MATTHEW_2_ANNOTATED_USJ ← MATTHEW_2_USJ with three words in v1 wrapped in `wg` char markers (the
 *   marble linked-research-term shape; see marble-converter.ts emitWg). This is the ONLY
 *   adaptation: the `wg` markers are added so the scripture pane's setAnnotation path has real
 *   tokens to anchor to. The surrounding verse text is otherwise the WEB text verbatim.
 * - MATTHEW_1_AND_2_USJ ← web-matthew-1-and-2.usj (WEB Matthew 1-2, 10 real notes: 6 `\f` footnotes +
 *   4 `\x` cross-references). Drives the footnotes list.
 * - NO_NOTES_USJ ← the first paragraph of web-matthew-2-verse-range.usj with the note stripped, for
 *   the empty-footnote-list state.
 *
 * Two faithful-typing adjustments from the raw `.usj` files (content/structure unchanged):
 *
 * - The `closed: "false"` attribute present on `fr`/`ft`/`xo`/`xt` char markers in the source files
 *   is dropped: it is a serialization hint not declared on scripture-utilities' `MarkerObject` type
 *   and irrelevant to rendering / note discovery here.
 * - `version` is normalized to "3.1" (web-matthew-1-and-2.usj declares "3.0", but the `Usj` type
 *   narrows `version` to the "3.1" literal). The marker content is identical either way.
 */

import type { MarkerContent, MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import type { MarbleAnnotation } from '../lib/marble-converter';

/**
 * WEB Matthew 2 (verse range 1-5, 19-23) with one real footnote on verse 1. Copied verbatim from
 * `web-matthew-2-verse-range.usj`.
 */
export const MATTHEW_2_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'chapter', marker: 'c', number: '2' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1' },
        'Now when Jesus was born in Bethlehem of Judea in the days of King Herod, behold, wise men',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['2:1 '] },
            {
              type: 'char',
              marker: 'ft',
              content: [
                'The word for “wise men” (magoi) can also mean teachers, scientists, physicians, astrologers, seers, interpreters of dreams, or sorcerers.',
              ],
            },
          ],
        },
        ' from the east came to Jerusalem, saying, ',
        { type: 'verse', marker: 'v', number: '2' },
        '“Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.” ',
        { type: 'verse', marker: 'v', number: '3' },
        'When King Herod heard it, he was troubled, and all Jerusalem with him. ',
        { type: 'verse', marker: 'v', number: '4' },
        'Gathering together all the chief priests and scribes of the people, he asked them where the Christ would be born. ',
        { type: 'verse', marker: 'v', number: '5' },
        'They said to him, “In Bethlehem of Judea, for this is written through the prophet,',
      ],
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '19' },
        'But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying, ',
        { type: 'verse', marker: 'v', number: '20' },
        '“Arise and take the young child and his mother, and go into the land of Israel, for those who sought the young child’s life are dead.”',
      ],
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '21-22' },
        'He arose and took the young child and his mother, and came into the land of Israel. ',
        'But when he heard that Archelaus was reigning over Judea in the place of his father, Herod, he was afraid to go there. Being warned in a dream, he withdrew into the region of Galilee, ',
        { type: 'verse', marker: 'v', number: '23' },
        'and came and lived in a city called Nazareth; that it might be fulfilled which was spoken through the prophets that he will be called a Nazarene.',
      ],
    },
  ],
};

/**
 * A `wg` (word-group) char marker carrying the marble `id`. The marble-converter emits these as
 * `MarkerObject & Record<string, unknown>` (`MarkerObject` itself has no `id` field), so we type
 * the literal the same way - the `Record<string, unknown>` half admits the extra `id` property
 * without a cast. The return widens to `MarkerContent` for placement in a USJ `content` array.
 */
function wgMarker(text: string, id: string): MarkerContent {
  const marker: MarkerObject & Record<string, unknown> = {
    type: 'char',
    marker: 'wg',
    content: [text],
    id,
  };
  return marker;
}

/**
 * WEB Matthew 2 with three linked-research-term `wg` markers added to verse 1. The verse-1 text
 * "Now when Jesus was born in Bethlehem of Judea in the days of King Herod, behold, wise men" is
 * split so that "Jesus", "Bethlehem", and "Herod" become `wg` char markers (the exact shape
 * marble-converter.ts emits for `<wg>` linked words). Everything else is the verbatim WEB text from
 * MATTHEW_2_USJ, including the real footnote.
 *
 * The matching `MarbleAnnotation`s in MATTHEW_2_ANNOTATIONS point at these markers by `usjPath`.
 */
export const MATTHEW_2_ANNOTATED_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'chapter', marker: 'c', number: '2' },
    {
      type: 'para',
      marker: 'p',
      content: [
        // content[1].content[0]
        { type: 'verse', marker: 'v', number: '1' },
        // content[1].content[1]
        'Now when ',
        // content[1].content[2] - wg "Jesus"
        wgMarker('Jesus', 'wg-mat2-1-jesus'),
        // content[1].content[3]
        ' was born in ',
        // content[1].content[4] - wg "Bethlehem"
        wgMarker('Bethlehem', 'wg-mat2-1-bethlehem'),
        // content[1].content[5]
        ' of Judea in the days of King ',
        // content[1].content[6] - wg "Herod"
        wgMarker('Herod', 'wg-mat2-1-herod'),
        // content[1].content[7]
        ', behold, wise men',
        // content[1].content[8] - real footnote (verbatim from the source fixture)
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['2:1 '] },
            {
              type: 'char',
              marker: 'ft',
              content: [
                'The word for “wise men” (magoi) can also mean teachers, scientists, physicians, astrologers, seers, interpreters of dreams, or sorcerers.',
              ],
            },
          ],
        },
        ' from the east came to Jerusalem, saying, ',
        { type: 'verse', marker: 'v', number: '2' },
        '“Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.” ',
        { type: 'verse', marker: 'v', number: '3' },
        'When King Herod heard it, he was troubled, and all Jerusalem with him. ',
        { type: 'verse', marker: 'v', number: '4' },
        'Gathering together all the chief priests and scribes of the people, he asked them where the Christ would be born. ',
        { type: 'verse', marker: 'v', number: '5' },
        'They said to him, “In Bethlehem of Judea, for this is written through the prophet,',
      ],
    },
  ],
};

/**
 * Annotations matching the `wg` markers in MATTHEW_2_ANNOTATED_USJ. `lexicalLinks` (shape
 * `NAMESPACE:LEMMA:ID`) drive the hover lemma-match grouping; each word here carries a distinct
 * lemma so they remain independent (no shared-lemma highlight cascade). Strong's numbers are
 * representative Greek values for the surface terms.
 */
export const MATTHEW_2_ANNOTATIONS: MarbleAnnotation[] = [
  {
    usjPath: '$.content[1].content[2]',
    kind: 'word',
    annotationId: 'wg-mat2-1-jesus',
    metadata: { strong: 'G2424', lexicalLinks: ['Louw-Nida:Ἰησοῦς:002001000'], verseNum: 1 },
  },
  {
    usjPath: '$.content[1].content[4]',
    kind: 'word',
    annotationId: 'wg-mat2-1-bethlehem',
    metadata: { strong: 'G0965', lexicalLinks: ['Louw-Nida:Βηθλέεμ:002002000'], verseNum: 1 },
  },
  {
    usjPath: '$.content[1].content[6]',
    kind: 'word',
    annotationId: 'wg-mat2-1-herod',
    metadata: { strong: 'G2264', lexicalLinks: ['Louw-Nida:Ἡρῴδης:002003000'], verseNum: 1 },
  },
];

/**
 * WEB Matthew 1-2 with 10 real notes (6 `\f` footnotes + 4 `\x` cross-references). Copied verbatim
 * from `web-matthew-1-and-2.usj`. Used by the footnotes pane, whose
 * `UsjReaderWriter.findAllNotes()` discovers every note in the document.
 */
export const MATTHEW_1_AND_2_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    {
      type: 'book',
      marker: 'id',
      code: 'MAT',
      content: ['40-MAT-web.sfm World English Bible (WEB)'],
    },
    { type: 'para', marker: 'ide', content: ['UTF-8'] },
    { type: 'para', marker: 'h', content: ['Matthew'] },
    { type: 'para', marker: 'toc1', content: ['The Good News According to Matthew'] },
    { type: 'para', marker: 'toc2', content: ['Matthew'] },
    { type: 'para', marker: 'toc3', content: ['Matthew'] },
    { type: 'para', marker: 'mt2', content: ['The Good News According to'] },
    { type: 'para', marker: 'mt1', content: ['Matthew'] },
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1' },
        'The book of the genealogy of Jesus Christ,',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['1:1 '] },
            {
              type: 'char',
              marker: 'ft',
              content: ['Messiah (Hebrew) and Christ (Greek) both mean “Anointed One”'],
            },
          ],
        },
        ' the son of David, the son of Abraham.',
      ],
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '6' },
        'Jesse became the father of King David. David the king',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['1:6 '] },
            { type: 'char', marker: 'ft', content: ['NU omits “the king”.'] },
          ],
        },
        ' became the father of Solomon by her who had been Uriah’s wife. ',
        { type: 'verse', marker: 'v', number: '16' },
        'Jacob became the father of Joseph, the husband of Mary, from whom was born Jesus,',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['1:16 '] },
            {
              type: 'char',
              marker: 'ft',
              content: ['“Jesus” means “Salvation”.'],
            },
          ],
        },
        ' who is called Christ.',
      ],
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '20' },
        'But when he thought about these things, behold,',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['1:20 '] },
            {
              type: 'char',
              marker: 'ft',
              content: [
                '“Behold”, from “ἰδοὺ”, means look at, take notice, observe, see, or gaze at. It is often used as an interjection.',
              ],
            },
          ],
        },
        ' an angel of the Lord appeared to him in a dream, saying, ',
        { type: 'verse', marker: 'v', number: '21' },
        'She shall give birth to a son. You shall name him Jesus,',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['1:21 '] },
            {
              type: 'char',
              marker: 'ft',
              content: ['“Jesus” means “Salvation”.'],
            },
          ],
        },
        ' for it is he who shall save his people from their sins.”',
      ],
    },
    {
      type: 'para',
      marker: 'q2',
      content: [
        'which is, being interpreted, “God with us.”',
        {
          type: 'note',
          marker: 'x',
          caller: '+',
          content: [
            { type: 'char', marker: 'xo', content: ['1:23 '] },
            { type: 'char', marker: 'xt', content: ['Isaiah 7:14'] },
          ],
        },
      ],
    },
    { type: 'chapter', marker: 'c', number: '2' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1' },
        'Now when Jesus was born in Bethlehem of Judea in the days of King Herod, behold, wise men',
        {
          type: 'note',
          marker: 'f',
          caller: '+',
          content: [
            { type: 'char', marker: 'fr', content: ['2:1 '] },
            {
              type: 'char',
              marker: 'ft',
              content: [
                'The word for “wise men” (magoi) can also mean teachers, scientists, physicians, astrologers, seers, interpreters of dreams, or sorcerers.',
              ],
            },
          ],
        },
        ' from the east came to Jerusalem, saying,',
      ],
    },
    {
      type: 'para',
      marker: 'q2',
      content: [
        'who shall shepherd my people, Israel.’”',
        {
          type: 'note',
          marker: 'x',
          caller: '+',
          content: [
            { type: 'char', marker: 'xo', content: ['2:6 '] },
            { type: 'char', marker: 'xt', content: ['Micah 5:2'] },
          ],
        },
      ],
    },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '15' },
        'and was there until the death of Herod, that it might be fulfilled which was spoken by the Lord through the prophet, saying, “Out of Egypt I called my son.”',
        {
          type: 'note',
          marker: 'x',
          caller: '+',
          content: [
            { type: 'char', marker: 'xo', content: ['2:15 '] },
            { type: 'char', marker: 'xt', content: ['Hosea 11:1'] },
          ],
        },
      ],
    },
    {
      type: 'para',
      marker: 'q2',
      content: [
        'because they are no more.”',
        {
          type: 'note',
          marker: 'x',
          caller: '+',
          content: [
            { type: 'char', marker: 'xo', content: ['2:18 '] },
            { type: 'char', marker: 'xt', content: ['Jeremiah 31:15'] },
          ],
        },
      ],
    },
  ],
};

/**
 * Marble chapter XML for a Genesis 1:1-3 excerpt with eight `<wg>` linked-research-term tokens:
 *
 * - Group "rēšīṯ-bāraʾ" (4 words sharing the SDBH:creation:001 lemma): "beginning", "created",
 *   "heavens", "earth". Hovering any of the four lights up all four.
 * - Group "laylāh" (2 words sharing SDBH:darkness:002): "darkness", "night". Hovering either lights
 *   up both.
 * - Independents (each with its own lemma): "Spirit" (SDBH:rûaḥ:003), "light" (SDBH:ʾôr:004).
 *   Hovering either only lights up that single word.
 *
 * Used by the scripture-pane `OverlayStates` story. Extended in
 * `GENESIS_OVERLAY_DEMO_WITH_EXTRA_LINKS_XML` below with two additional tokens (thematic/image link
 * types) the web-view shell story exercises.
 */
export const GENESIS_OVERLAY_DEMO_MARBLE_XML = `
  <usx_book code="GEN">
    <chapter style="c" code="GEN" chapter="1"/>
    <para style="p">
      <verse style="v" code="GEN" pubnumber="1"/>
      In the
      <wg id="1001" strong="H7225" lexical_links="SDBH:creation:001">beginning</wg>
      God
      <wg id="1002" strong="H1254" lexical_links="SDBH:creation:001">created</wg>
      the
      <wg id="1003" strong="H8064" lexical_links="SDBH:creation:001">heavens</wg>
      and the
      <wg id="1004" strong="H0776" lexical_links="SDBH:creation:001">earth</wg>.
      <verse style="v" code="GEN" pubnumber="2"/>
      And
      <wg id="1005" strong="H2822" lexical_links="SDBH:darkness:002">darkness</wg>
      was upon the face of the deep, and the
      <wg id="1006" strong="H7307" lexical_links="SDBH:ruah:003">Spirit</wg>
      of God moved upon the face of the waters.
      <verse style="v" code="GEN" pubnumber="3"/>
      And God said, Let there be
      <wg id="1007" strong="H0216" lexical_links="SDBH:or:004">light</wg>,
      and God called the
      <wg id="1008" strong="H3915" lexical_links="SDBH:darkness:002">night</wg>.
    </para>
  </usx_book>`;

/**
 * Same Genesis 1:1-3 fixture as `GENESIS_OVERLAY_DEMO_MARBLE_XML` plus two additional `<wg>` tokens
 * carrying non-lexical link types ("vessel" with thematic_links, "altar" with image_links). The
 * extras exercise the marble-converter gating contract: word annotations are only emitted for
 * tokens with at least one `lexical_links` attribute, so neither vessel nor altar produces an
 * annotation, while the shape of the source XML still flows through `convertMarbleChapterXml` as
 * the production data path. Used by the web-view shell story.
 */
export const GENESIS_OVERLAY_DEMO_WITH_EXTRA_LINKS_XML = `
  <usx_book code="GEN">
    <chapter style="c" code="GEN" chapter="1"/>
    <para style="p">
      <verse style="v" code="GEN" pubnumber="1"/>
      In the
      <wg id="1001" strong="H7225" lexical_links="SDBH:creation:001">beginning</wg>
      God
      <wg id="1002" strong="H1254" lexical_links="SDBH:creation:001">created</wg>
      the
      <wg id="1003" strong="H8064" lexical_links="SDBH:creation:001">heavens</wg>
      and the
      <wg id="1004" strong="H0776" lexical_links="SDBH:creation:001">earth</wg>.
      <verse style="v" code="GEN" pubnumber="2"/>
      And
      <wg id="1005" strong="H2822" lexical_links="SDBH:darkness:002">darkness</wg>
      was upon the face of the deep, and the
      <wg id="1006" strong="H7307" lexical_links="SDBH:ruah:003">Spirit</wg>
      of God moved upon the face of the waters.
      <verse style="v" code="GEN" pubnumber="3"/>
      And God said, Let there be
      <wg id="1007" strong="H0216" lexical_links="SDBH:or:004">light</wg>,
      and God called the
      <wg id="1008" strong="H3915" lexical_links="SDBH:darkness:002">night</wg>.
      Behold a
      <wg id="1009" strong="H0935" thematic_links="Realia:1.2.3">vessel</wg>
      on the
      <wg id="1010" strong="H0123" image_links="img:reuben">altar</wg>.
    </para>
  </usx_book>`;

/**
 * WEB Matthew 2:19-20 paragraph with no note markers - drives the empty FootnoteList state. Derived
 * from the third paragraph of web-matthew-2-verse-range.usj (note-free verses), kept as real WEB
 * text.
 */
export const NO_NOTES_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'chapter', marker: 'c', number: '2' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '19' },
        'But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying, ',
        { type: 'verse', marker: 'v', number: '20' },
        '“Arise and take the young child and his mother, and go into the land of Israel, for those who sought the young child’s life are dead.”',
      ],
    },
  ],
};
