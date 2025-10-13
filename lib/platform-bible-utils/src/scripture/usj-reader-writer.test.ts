/* eslint-disable no-useless-escape, no-irregular-whitespace, camelcase, @typescript-eslint/naming-convention */
// Need to disable no-useless-escape because there are some useless escapes in the raw USFM and USJ
// data, and it's better to do fewer manual edits.
// Need to disable no-irregular-whitespace because the test data includes irregular whitespace that
// we are testing on purpose.
// Disabling camelcase and @typescript-eslint/naming-convention so we can use 3_1 indicating USFM 3.1
import fs from 'fs';
import path from 'path';
import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import { UsjReaderWriter } from './usj-reader-writer';
import { usjMat1 } from './footnote-util-test.usj.data';
import { USFM_MARKERS_MAP } from './markers-map-3.1.model';

// #region set up file path variables

const dirPath = __dirname ?? import.meta.dirname;
const testDataPath = path.resolve(dirPath, 'usj-reader-writer-test-data');

/** Read a test data file's utf-8 contents */
function readTestDataFile(fileName: string) {
  return fs.readFileSync(path.resolve(testDataPath, fileName), 'utf-8');
}

// #endregion set up file path variables

// #region Matthew 1-2 test data

/**
 * WEB Matthew 1-2 in USFM. (When copied from the file, had to replace `\` with `\\`)
 *
 * Also includes the chapter marker for chapter 3 but no contents of chapter 3.
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const matthew1And2Usfm = readTestDataFile('web-matthew-1-and-2.usfm');

/**
 * WEB Matthew 1-2 output in USJ from Paratext 10 Studio 0.3.0-rc.0 (version 3.1 replaced with 3.0
 * in the USJ marker because that is more accurate. The USJ version handling isn't great yet).
 *
 * Also includes the chapter marker for chapter 3 but no contents of chapter 3.
 */
const matthew1And2Usj: Usj = JSON.parse(readTestDataFile('web-matthew-1-and-2.json'));

/**
 * Small portion of WEB Matthew 2 output in USJ from Paratext 10 Studio 0.3.0-rc.0 and modified by
 * hand.
 *
 * Includes the first paragraph and last two paragraphs of chapter 2 with verses 21 and 22 combined.
 */
const matthew2verseRangeUsj = JSON.parse(readTestDataFile('web-matthew-2-verse-range.json'));

// #endregion Matthew 1-2 test data

// #region testUSFM test data - Paratext 9 USFM 3.0

/**
 * TestUSFM 2 Samuel 1 in USFM. Output from Platform.Bible; had to change `\\"` to `"` to unescape
 * quotes then `\\r\\n` to `\n` to unescape newlines then `\\\\` to `\\` to unescape markers
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const testUSFM2SACh1Usfm = readTestDataFile('testUSFM-2SA-1.usfm');

/**
 * TestUSFM 2 Samuel 2 in USFM. Output from Platform.Bible; had to change `\\"` to `"` to unescape
 * quotes then `\\r\\n` to `\n` to unescape newlines then `\\\\` to `\\` to unescape markers
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const testUSFM2SACh2Usfm = readTestDataFile('testUSFM-2SA-2.usfm');

/**
 * TestUSFM 2 Samuel 3 in USFM. Output from Platform.Bible; had to change `\\"` to `"` to unescape
 * quotes then `\\r\\n` to `\n` to unescape newlines then `\\\\` to `\\` to unescape markers
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const testUSFM2SACh3Usfm = readTestDataFile('testUSFM-2SA-3.usfm');

/**
 * TestUSFM 2 Samuel 1 output in USJ from Platform.Bible (version 3.1 replaced with 3.0 in the USJ
 * marker because that is more accurate. The USJ version handling isn't great yet).
 *
 * WARNING: I also had to add `" ",` to the start of the content array in the `ef` marker because it
 * seems that `usxStringToUsj` is incorrectly removing it.
 */
const testUSFM2SACh1Usj = JSON.parse(readTestDataFile('testUSFM-2SA-1.json'));

/**
 * TestUSFM 2 Samuel 2 output in USJ from Platform.Bible (version 3.1 replaced with 3.0 in the USJ
 * marker because that is more accurate. The USJ version handling isn't great yet).
 */
const testUSFM2SACh2Usj = JSON.parse(readTestDataFile('testUSFM-2SA-2.json'));

/**
 * TestUSFM 2 Samuel 3 output in USJ from Platform.Bible (version 3.1 replaced with 3.0 in the USJ
 * marker because that is more accurate. The USJ version handling isn't great yet).
 */
const testUSFM2SACh3Usj = JSON.parse(readTestDataFile('testUSFM-2SA-3.json'));

// #endregion testUSFM test data - in Paratext 9 USFM 3.0 format

// #region testUSFM test data - in canonical 3.1 format

/**
 * TestUSFM 2 Samuel 1 in USFM. Output from Platform.Bible; had to change `\\"` to `"` to unescape
 * quotes then `\\r\\n` to `\n` to unescape newlines then `\\\\` to `\\` to unescape markers
 *
 * Then aligned to canonical 3.1 output manually. Note that this means some descriptions of what
 * whitespace is where are not necessarily accurate anymore; they are written to describe the
 * Paratext 3.0 content.
 *
 * Note: this content's whitespace is hand-normalized according to 3.1 `usx.rng` rules. We will deal
 * with whitespace normalization issues later.
 */
const testUSFM2SACh1UsfmCanonical3_1 = readTestDataFile('testUSFM-2SA-1-canonical-3.1.usfm');

/**
 * TestUSFM 2 Samuel 1 output in USJ from Platform.Bible. Version 3.0 swapped back to 3.1 because
 * this is intended to be testing 3.1
 *
 * Then aligned to canonical 3.1 output manually. Note that this means some descriptions of what
 * whitespace is where are not necessarily accurate anymore; they are written to describe the
 * Paratext 3.0 content.
 */
const testUSFM2SACh1UsjCanonical3_1 = JSON.parse(
  readTestDataFile('testUSFM-2SA-1-canonical-3.1.json'),
);

/**
 * TestUSFM 2 Samuel 2 in USFM. Output from Platform.Bible; had to change `\\"` to `"` to unescape
 * quotes then `\\r\\n` to `\n` to unescape newlines then `\\\\` to `\\` to unescape markers
 *
 * Then aligned to canonical 3.1 output manually.
 *
 * Note: this content's whitespace is hand-normalized according to 3.1 `usx.rng` rules. We will deal
 * with whitespace normalization issues later.
 */
const testUSFM2SACh2UsfmCanonical3_1 = readTestDataFile('testUSFM-2SA-2-canonical-3.1.usfm');

/**
 * TestUSFM 2 Samuel 2 output in USJ from Platform.Bible. Version 3.0 swapped back to 3.1 because
 * this is intended to be testing 3.1
 */
const testUSFM2SACh2UsjCanonical3_1 = { ...testUSFM2SACh2Usj, version: '3.1' };

/**
 * TestUSFM 2 Samuel 3 in USFM. Output from Platform.Bible; had to change `\\"` to `"` to unescape
 * quotes then `\\r\\n` to `\n` to unescape newlines then `\\\\` to `\\` to unescape markers
 *
 * Then aligned to canonical 3.1 output manually.
 *
 * Note: this content's whitespace is hand-normalized according to 3.1 `usx.rng` rules. We will deal
 * with whitespace normalization issues later.
 */
const testUSFM2SACh3UsfmCanonical3_1 = readTestDataFile('testUSFM-2SA-3-canonical-3.1.usfm');

/**
 * TestUSFM 2 Samuel 3 output in USJ from Platform.Bible. Version 3.0 swapped back to 3.1 because
 * this is intended to be testing 3.1
 *
 * Then aligned to canonical 3.1 output manually. Note that this means some descriptions of what
 * whitespace is where are not necessarily accurate anymore; they are written to describe the
 * Paratext 3.0 content.
 */
const testUSFM2SACh3UsjCanonical3_1 = JSON.parse(
  readTestDataFile('testUSFM-2SA-3-canonical-3.1.json'),
);

// #endregion testUSFM test data - in canonical 3.1 format

// #region examples from USFM 3.1 docs

/**
 * Example with generated refs derived from Example 1 in the docs
 * https://docs.usfm.bible/usfm/3.1/char/features/ref.html with the following modifications:
 *
 * - Single backslash replaced with double backslash to properly escape quotes
 * - `usfm` 3.1 marker added to conform with requirements
 * - Chapter number changed to 13 to match the verse number in the example
 * - Normalized whitespace
 *
 *   - Replaced newlines with spaces in the paragraphs
 *   - Added newline at the end
 */
const exampleGeneratedRefsUsfm = `\\id MAT
\\usfm 3.1
\\c 5
\\s1 Salt and Light
\\r (Mark 9.50; Luke 14.34,35)
\\p
\\v 13 \\x - \\xo 5.13: \\xt Mk 9.50; Lk 14.34,35.\\x*“You are like salt for the whole human race. But if salt loses its saltiness, there is no way to make it salty again. It has become worthless, so it is thrown out and people trample on it.
`;

/**
 * Example with generated refs derived from Example 3 in the docs
 * https://docs.usfm.bible/usfm/3.1/char/features/ref.html with the following modifications:
 *
 * - Single backslash replaced with double backslash to properly escape quotes
 * - `s1` added to match the usfm in the previous example
 * - `r` added to match the usfm in the previous example
 */
const exampleGeneratedRefsUsj = JSON.parse(`{
  "type": "USJ",
  "version": "3.1",
  "content": [
    {
      "type": "book",
      "marker": "id",
      "code": "MAT",
      "content": []
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "5",
      "sid": "MAT 5"
    },
    {
      "type": "para",
      "marker": "s1",
      "content": [
        "Salt and Light"
      ]
    },
    {
      "type": "para",
      "marker": "r",
      "content": [
        "(Mark 9.50; Luke 14.34,35)"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "13",
          "sid": "MAT 5:13"
        },
        {
          "type": "note",
          "marker": "x",
          "caller": "-",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "content": ["5.13: "]
            },
            {
              "type": "char",
              "marker": "xt",
              "content": [
                {
                  "type": "ref",
                  "loc": "MRK 9:50",
                  "gen": "true",
                  "content": ["Mk 9.50"]
                },
                "; ",
                {
                  "type": "ref",
                  "loc": "LUK 14:34",
                  "gen": "true",
                  "content": ["Lk 14.34"]
                },
                ",",
                {
                  "type": "ref",
                  "loc": "LUK 14:35",
                  "gen": "true",
                  "content": ["35"]
                },
                "."
              ]
            }
          ]
        },
        "“You are like salt for the whole human race. But if salt loses its saltiness, there is no way to make it salty again. It has become worthless, so it is thrown out and people trample on it."
      ]
    }
  ]
}`);

/**
 * Example with provided refs derived from Example 4 in the docs
 * https://docs.usfm.bible/usfm/3.1/char/features/ref.html with the following modifications:
 *
 * - Single backslash replaced with double backslash to properly escape quotes
 * - `usfm` 3.1 marker added to conform with requirements
 * - Chapter number changed to 13 to match the verse number in the example
 * - Normalized whitespace
 *
 *   - Replaced newlines with spaces in the paragraphs
 *   - Added newline at the end
 */
const exampleProvidedRefsUsfm = `\\id MAT
\\usfm 3.1
\\c 5
\\s1 Salt and Light
\\r (Mark 9.50; Luke 14.34,35)
\\p
\\v 13 \\x - \\xo 5.13: \\xt \\ref Mk 9.50|MRK 9:50\\ref*; \\ref Lk 14.34|LUK 14:34\\ref*,\\ref 35|LUK 14:35\\ref*.\\x*“You are like salt for the whole human race. But if salt loses its saltiness, there is no way to make it salty again. It has become worthless, so it is thrown out and people trample on it.
`;

/**
 * Example with generated refs taken from Example 6 in the docs
 * https://docs.usfm.bible/usfm/3.1/char/features/ref.html with the following modifications:
 *
 * - Single backslash replaced with double backslash to properly escape quotes
 * - `s1` added to match the usfm in the previous example
 * - `r` added to match the usfm in the previous example
 */
const exampleProvidedRefsUsj = JSON.parse(`{
  "type": "USJ",
  "version": "3.1",
  "content": [
    {
      "type": "book",
      "marker": "id",
      "code": "MAT",
      "content": []
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "5",
      "sid": "MAT 5"
    },
    {
      "type": "para",
      "marker": "s1",
      "content": [
        "Salt and Light"
      ]
    },
    {
      "type": "para",
      "marker": "r",
      "content": [
        "(Mark 9.50; Luke 14.34,35)"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "13",
          "sid": "MAT 5:13"
        },
        {
          "type": "note",
          "marker": "x",
          "caller": "-",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "content": ["5.13: "]
            },
            {
              "type": "char",
              "marker": "xt",
              "content": [
                {
                  "type": "ref",
                  "loc": "MRK 9:50",
                  "content": ["Mk 9.50"]
                },
                "; ",
                {
                  "type": "ref",
                  "loc": "LUK 14:34",
                  "content": ["Lk 14.34"]
                },
                ",",
                {
                  "type": "ref",
                  "loc": "LUK 14:35",
                  "content": ["35"]
                },
                "."
              ]
            }
          ]
        },
        "“You are like salt for the whole human race. But if salt loses its saltiness, there is no way to make it salty again. It has become worthless, so it is thrown out and people trample on it."
      ]
    }
  ]
}`);

// #endregion examples from USFM 3.1 docs

describe('Translate offsets between USFM and USJ', () => {
  test('jsonPathToVerseRefAndOffset translates USJ jsonPath to USFM VerseRefs and offsets', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);
    const expectedResults = [
      { jsonPath: '$.content[0]', chapter: 1, verse: 0, offset: 0 },
      { jsonPath: '$.content[8]', chapter: 1, verse: 0, offset: 0 },
      { jsonPath: '$.content[9]', chapter: 1, verse: 0, offset: 0 },
      { jsonPath: '$.content[9].content[0]', chapter: 1, verse: 1, offset: 0 },
      { jsonPath: '$.content[9].content[1]', chapter: 1, verse: 1, offset: 0 },
      { jsonPath: '$.content[9].content[2]', chapter: 1, verse: 1, offset: 42 },
      { jsonPath: '$.content[9].content[2].content[0]', chapter: 1, verse: 1, offset: 42 },
      { jsonPath: '$.content[9].content[2].content[1]', chapter: 1, verse: 1, offset: 42 },
      { jsonPath: '$.content[9].content[3]', chapter: 1, verse: 1, offset: 42 },
      { jsonPath: '$.content[10].content[0]', chapter: 1, verse: 2, offset: 0 },
      { jsonPath: '$.content[10].content[1]', chapter: 1, verse: 2, offset: 0 },
      { jsonPath: '$.content[10].content[2]', chapter: 1, verse: 3, offset: 0 },
      { jsonPath: '$.content[10].content[3]', chapter: 1, verse: 3, offset: 0 },
      { jsonPath: '$.content[10].content[4]', chapter: 1, verse: 4, offset: 0 },
      { jsonPath: '$.content[10].content[5]', chapter: 1, verse: 4, offset: 0 },
      { jsonPath: '$.content[10].content[6]', chapter: 1, verse: 5, offset: 0 },
      { jsonPath: '$.content[10].content[7]', chapter: 1, verse: 5, offset: 0 },
      { jsonPath: '$.content[10].content[8]', chapter: 1, verse: 6, offset: 0 },
      { jsonPath: '$.content[10].content[9]', chapter: 1, verse: 6, offset: 0 },
      { jsonPath: '$.content[10].content[10]', chapter: 1, verse: 6, offset: 53 },
      { jsonPath: '$.content[10].content[10].content[0]', chapter: 1, verse: 6, offset: 53 },
      { jsonPath: '$.content[10].content[10].content[1]', chapter: 1, verse: 6, offset: 53 },
      { jsonPath: '$.content[29].content[4]', chapter: 2, verse: 15, offset: 156 },
    ];

    expectedResults.forEach((testCase) => {
      const location = usjDoc.jsonPathToVerseRefAndOffset(testCase.jsonPath);
      expect(location.verseRef.chapterNum).toBe(testCase.chapter);
      expect(location.verseRef.verseNum).toBe(testCase.verse);
      expect(location.offset).toBe(testCase.offset);
    });

    expect(() => {
      usjDoc.jsonPathToVerseRefAndOffset('$.content[9999]');
    }).toThrow('No result found for JSONPath query: $.content[9999]');

    expect(() => {
      new UsjReaderWriter({
        type: USJ_TYPE,
        version: USJ_VERSION,
        content: [],
      }).jsonPathToVerseRefAndOffset('');
    }).toThrow('Not able to determine the book ID');
  });

  test('verseRefToUsjContentLocation translates USFM VerseRefs and offsets to USJ details', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    const result0 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 1, verseNum: 0 },
      0,
    );
    expect(typeof result0.node).toBe('object');
    if (typeof result0.node !== 'object') return;
    expect(result0.node.type).toBe('chapter');
    expect(result0.node.number).toBe('1');
    expect(result0.jsonPath).toBe('$.content[8]');
    expect(result0.offset).toBe(0);

    const result1 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 1, verseNum: 2 },
      0,
    );
    expect(typeof result1.node).toBe('object');
    if (typeof result1.node !== 'object') return;
    expect(result1.node.type).toBe('verse');
    expect(result1.node.number).toBe('2');
    expect(result1.jsonPath).toBe('$.content[10].content[0]');
    expect(result1.offset).toBe(0);

    const result2 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 1, verseNum: 6 },
      3,
    );
    expect(typeof result2.node).toBe('string');
    if (typeof result2.node !== 'string') return;
    expect(result2.node === 'Jesse became the father of King David. David the king').toBe(true);
    expect(result2.jsonPath).toBe('$.content[10].content[9]');
    expect(result2.offset).toBe(3);

    const result3 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 1, verseNum: 6 },
      60,
    );
    expect(typeof result3.node).toBe('string');
    if (typeof result3.node !== 'string') return;
    expect(
      result3.node === ' became the father of Solomon by her who had been Uriah’s wife. ',
    ).toBe(true);
    expect(result3.jsonPath).toBe('$.content[10].content[11]');
    expect(result3.offset).toBe(7);

    const result4 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 2, verseNum: 6 },
      130,
    );
    expect(typeof result4.node).toBe('string');
    if (typeof result4.node !== 'string') return;
    expect(result4.node === 'who shall shepherd my people, Israel.’”').toBe(true);
    expect(result4.jsonPath).toBe('$.content[25].content[0]');
    expect(result4.offset).toBe(17);

    const result5 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 2, verseNum: 6 },
      9999999,
    );
    expect(typeof result5.node).toBe('object');
    if (typeof result5.node !== 'object') return;
    expect(result5.node.type).toBe('verse');
    expect(result5.node.number).toBe('6');
    expect(result5.jsonPath).toBe('$.content[22].content[0]');
    expect(result5.offset).toBe(0);

    expect(() => {
      usjDoc.verseRefToUsjContentLocation({ book: 'MAT', chapterNum: 99, verseNum: 1 }, 0);
    }).toThrow('Could not find MAT chapter 99');

    expect(() => {
      usjDoc.verseRefToUsjContentLocation({ book: 'MAT', chapterNum: 1, verseNum: 99 }, 0);
    }).toThrow('Verse 99 not found in MAT 1');

    expect(() => {
      usjDoc.verseRefToUsjContentLocation({ book: 'JHN', chapterNum: 1, verseNum: 1 }, 0);
    }).toThrow(`Book IDs don't match: USJ=MAT, SerializedVerseRef=JHN`);

    expect(() => {
      new UsjReaderWriter({
        type: USJ_TYPE,
        version: USJ_VERSION,
        content: [],
      }).verseRefToUsjContentLocation({ book: 'JHN', chapterNum: 1, verseNum: 1 }, 0);
    }).toThrow('Could not find JHN chapter 1');
  });

  test('verseRefToUsjContentLocation translates USFM verse ranges and offsets to USJ details', () => {
    const usjDoc = new UsjReaderWriter(matthew2verseRangeUsj);

    const result0 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 2, verseNum: 21, verse: '21-22' },
      0,
    );
    expect(typeof result0.node).toBe('object');
    if (typeof result0.node !== 'object') return;
    expect(result0.node.type).toBe('verse');
    expect(result0.node.number).toBe('21-22');
    expect(result0.jsonPath).toBe('$.content[3].content[0]');
    expect(result0.offset).toBe(0);
  });
});

describe('Find USJ details for text searches', () => {
  test('verseRefToNextTextLocation takes USJ location and finds USJ details for next text', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // Start from a verse node
    const result1 = usjDoc.verseRefToNextTextLocation({ book: 'MAT', chapterNum: 1, verseNum: 2 });
    if (typeof result1.node !== 'string') throw new Error('Expected result1 to be a string');
    expect(result1.jsonPath).toBe('$.content[10].content[1]');
    expect(result1.offset).toBe(0);
    expect(result1.node).toBe(
      'Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers. ',
    );

    const result2 = usjDoc.verseRefToNextTextLocation({ book: 'MAT', chapterNum: 2, verseNum: 19 });
    if (typeof result2.node !== 'string') throw new Error('Expected result2 to be a string');
    expect(result2.jsonPath).toBe('$.content[36].content[1]');
    expect(result2.offset).toBe(0);
    expect(result2.node).toBe(
      'But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying, ',
    );

    expect(() => {
      usjDoc.verseRefToNextTextLocation({ book: 'MAT', chapterNum: 3, verseNum: 1 });
    }).toThrow('Verse 1 not found in MAT 3');
  });

  test('findNextLocationOfMatchingText takes location and text and finds USJ details for next occurrence', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // Start from a verse node
    const startingPoint1 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 1, verseNum: 2 },
      0,
    );
    if (typeof startingPoint1.node !== 'object')
      throw new Error('Expected startingPoint1 to be an object');
    expect(startingPoint1.jsonPath).toBe('$.content[10].content[0]');
    expect(startingPoint1.offset).toBe(0);

    const result1 = usjDoc.findNextLocationOfMatchingText(startingPoint1, 'the father of Manasseh');
    expect(result1).toBeTruthy();
    if (typeof result1?.node !== 'string') throw new Error('Expected result1 node to be a string');
    expect(result1.node).toBe(
      'Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah. ',
    );
    expect(result1.jsonPath).toBe('$.content[10].content[19]');
    expect(result1.offset).toBe(16);

    // Match the text right after the verse ref
    const result5 = usjDoc.findNextLocationOfMatchingText(
      startingPoint1,
      'Abraham became the father of Isaac.',
    );
    expect(result5).toBeTruthy();
    if (typeof result5?.node !== 'string') throw new Error('Expected result5 node to be a string');
    expect(result5.node).toBe(
      'Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers. ',
    );
    expect(result5.jsonPath).toBe('$.content[10].content[1]');
    expect(result5.offset).toBe(0);

    // Get the first text you can find after the requested location (in this case, a verse ref)
    const result6 = usjDoc.findNextLocationOfMatchingText(startingPoint1, '');
    expect(result6).toBeTruthy();
    if (typeof result6?.node !== 'string') throw new Error('Expected result6 node to be a string');
    expect(result6.node).toBe(
      'Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers. ',
    );
    expect(result6.jsonPath).toBe('$.content[10].content[1]');
    expect(result6.offset).toBe(0);

    // Start from a string
    const startingPoint2 = usjDoc.verseRefToUsjContentLocation(
      { book: 'MAT', chapterNum: 1, verseNum: 6 },
      3,
    );
    if (typeof startingPoint2.node !== 'string')
      throw new Error('Expected startingPoint2 to be a string');
    expect(startingPoint2.jsonPath).toBe('$.content[10].content[9]');
    expect(startingPoint2.offset).toBe(3);

    const result2 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'the father of Manasseh');
    expect(result2).toBeTruthy();
    if (typeof result2?.node !== 'string') throw new Error('Expected result2 node to be a string');
    expect(result2.node).toBe(
      'Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah. ',
    );
    expect(result2.jsonPath).toBe('$.content[10].content[19]');
    expect(result2.offset).toBe(16);

    // Only allow scanning ahead 1 more character
    const result3 = usjDoc.findNextLocationOfMatchingText(
      startingPoint2,
      'the father of Manasse',
      1,
    );
    expect(result3).toBeFalsy();

    const result4 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'Josiah became');
    expect(result4).toBeTruthy();
    if (typeof result4?.node !== 'string') throw new Error('Expected result4 node to be a string');
    expect(result4.node).toBe(
      'Josiah became the father of Jechoniah and his brothers at the time of the exile to Babylon.',
    );
    expect(result4.jsonPath).toBe('$.content[10].content[21]');
    expect(result4.offset).toBe(0);

    // the search includes the text in the starting point location, so searching for something that
    // matches the starting location should just return the same location
    const result7 = usjDoc.findNextLocationOfMatchingText(startingPoint2, '');
    expect(result7).toBeTruthy();
    if (typeof result7?.node !== 'string') throw new Error('Expected result7 node to be a string');
    expect(result7.node).toBe('Jesse became the father of King David. David the king');
    expect(result7.jsonPath).toBe('$.content[10].content[9]');
    expect(result7.offset).toBe(3);

    // Match something that is found before and after the start offset, but the match should be the
    // occurrence after the offset
    const result8 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'e');
    expect(result8).toBeTruthy();
    if (typeof result8?.node !== 'string') throw new Error('Expected result8 node to be a string');
    expect(result8.node).toBe('Jesse became the father of King David. David the king');
    expect(result8.jsonPath).toBe('$.content[10].content[9]');
    expect(result8.offset).toBe(4);

    // Make sure that the offset is not included in the max length of text to search
    // NOTE: this max length parameter does not carefully check only the exact length specified;
    // rather, it just doesn't look at any more text nodes after it exceeds the limit.
    const startingPoint2RemainingTextLength =
      'Jesse became the father of King David. David the king'.length - startingPoint2.offset;
    const stringToSearchForInTheNextLocation = 'Solomon';
    const result9 = usjDoc.findNextLocationOfMatchingText(
      startingPoint2,
      stringToSearchForInTheNextLocation,
      // not long enough to get past the first text line
      startingPoint2RemainingTextLength - 1,
    );
    expect(result9).toBe(undefined);

    const result10 = usjDoc.findNextLocationOfMatchingText(
      startingPoint2,
      stringToSearchForInTheNextLocation,
      startingPoint2RemainingTextLength,
    ); // index of one character before "the" minus the offset
    expect(result10).toBeTruthy();
    if (typeof result10?.node !== 'string')
      throw new Error('Expected result10 node to be a string');
    expect(result10.node).toBe(' became the father of Solomon by her who had been Uriah’s wife. ');
    expect(result10.jsonPath).toBe('$.content[10].content[11]');
    expect(result10.offset).toBe(22);
  });

  test('search with various regex patterns finds USJ details for match(es)', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // Test 1: Find all occurrences of "father" with global regex
    const fatherRegex = /father/g;
    const fatherMatches = usjDoc.search(fatherRegex);
    expect(fatherMatches.length).toBe(40);

    // Verify that all matches contain the text "father"
    fatherMatches.forEach((match) => {
      expect(match.text).toBe('father');
      expect(typeof match.location.node).toBe('string');
      expect(match.location.offset).toBeGreaterThanOrEqual(0);
      expect(match.location.jsonPath).toMatch(/^\$\.content\[\d+\]\.content\[\d+\]$/);
    });

    // Test 2: Find all occurrences of "became" with case-insensitive global regex
    const becameRegex = /became/gi;
    const becameMatches = usjDoc.search(becameRegex);
    expect(becameMatches.length).toBe(39);

    // Verify that all matches contain "became" (case-insensitive)
    becameMatches.forEach((match) => {
      expect(match.text.toLowerCase()).toBe('became');
      expect(typeof match.location.node).toBe('string');
      expect(match.location.offset).toBeGreaterThanOrEqual(0);
    });

    // Test 3: Search for a pattern that should not exist
    const nonExistentRegex = /xyz123notfound/g;
    const noMatches = usjDoc.search(nonExistentRegex);
    expect(noMatches).toEqual([]);

    // Test 4: Find all occurrences of numbers with regex
    const numberRegex = /\d+/g;
    const numberMatches = usjDoc.search(numberRegex);
    expect(numberMatches.length).toBeGreaterThan(0);

    // Verify that all matches are numbers
    numberMatches.forEach((match) => {
      expect(match.text).toMatch(/^\d+$/);
      expect(typeof match.location.node).toBe('string');
    });

    // Test 5: Test word boundaries
    const theWordRegex = /\bthe\b/g;
    const theWordMatches = usjDoc.search(theWordRegex);
    expect(theWordMatches.length).toBeGreaterThan(0);

    // Verify that matches are exactly "the" (not part of other words)
    theWordMatches.forEach((match) => {
      expect(match.text).toBe('the');
    });

    // Test 6: Test complex regex pattern
    const namePatternRegex = /[A-Z][a-z]+(?:\s[A-Z][a-z]+)*/g;
    const nameMatches = usjDoc.search(namePatternRegex);
    expect(nameMatches.length).toBeGreaterThan(0);

    // Verify that matches are capitalized names/phrases
    nameMatches.forEach((match) => {
      expect(match.text).toMatch(/^[A-Z]/);
      expect(typeof match.location.node).toBe('string');
    });

    // Test 7: Regex without global flag should only return 1 match
    const nonGlobalRegex = /father/;
    const singleMatch = usjDoc.search(nonGlobalRegex);
    expect(singleMatch.length).toBe(1);

    // Test 8: Verify ordering of matches (should be in document order)
    const davidRegex = /David/g;
    const davidMatches = usjDoc.search(davidRegex);

    // Compare JSON paths to ensure they're in document order
    const firstPath = davidMatches[0].location.jsonPath;
    const secondPath = davidMatches[1].location.jsonPath;

    // Extract content indices for comparison
    const firstPathMatch = firstPath.match(/content\[(\d+)\]\.content\[(\d+)\]/);
    const secondPathMatch = secondPath.match(/content\[(\d+)\]\.content\[(\d+)\]/);

    expect(firstPathMatch).toBeTruthy();
    expect(secondPathMatch).toBeTruthy();

    if (!firstPathMatch || !secondPathMatch)
      throw new Error('Failed to match content indices in JSON paths');

    const firstOuter = parseInt(firstPathMatch[1], 10);
    const firstInner = parseInt(firstPathMatch[2], 10);
    const secondOuter = parseInt(secondPathMatch[1], 10);
    const secondInner = parseInt(secondPathMatch[2], 10);

    // First match should come before second match in document order
    expect(firstOuter <= secondOuter).toBe(true);
    expect(firstInner <= secondInner).toBe(true);

    // Test 9: Test with capturing groups
    const captureRegex = /(father)\s+of\s+(\w+)/g;
    const captureMatches = usjDoc.search(captureRegex);
    expect(captureMatches.length).toBeGreaterThan(0);

    // Verify that match.text contains the full match (not just capture groups)
    captureMatches.forEach((match) => {
      expect(match.text).toMatch(/father\s+of\s+\w+/);
      expect(typeof match.location.node).toBe('string');
    });

    // Test 10: Search finds text within a note
    const textWithinNoteRegex = /NU omits /g;
    const noteMatches = usjDoc.search(textWithinNoteRegex);
    expect(noteMatches.length).toBeGreaterThan(0);
  });
});

describe('findAllNotes', () => {
  it('should extract multiple notes from real-life data', () => {
    const usjDoc = new UsjReaderWriter(usjMat1);
    const result = usjDoc.findAllNotes();

    expect(result.length).toEqual(10);

    // Spot-check some known markers
    expect(result[0].marker).toBe('x'); // first one is cross-ref
    expect(result[1].marker).toBe('f'); // second is footnote
    expect(result[2].marker).toBe('fe'); // third is endnote
    expect(result[result.length - 1].marker).toBe('x'); // last is also cross-ref

    expect(result.every((n) => n.type === 'note')).toBe(true);

    // e.g., All notes in this test data should start with a `MarkerObject` whose type is `char`
    result.forEach((note) => {
      expect(note.type).toBe('note');
      const firstChild = note.content?.[0];
      if (firstChild === undefined) throw new Error('Expected first child to be defined');
      if (typeof firstChild === 'string') throw new Error('Expected MarkerObject, got string');
      expect(firstChild.type).toBe('char');
    });
  });
});

describe('Transform USJ 3.0 to Paratext USFM 3.0', () => {
  const paratextUsjReaderWriterOptions = {
    // TODO: Generate Paratext-specific markers map and 3.0 markers map
    markersMap: {
      ...USFM_MARKERS_MAP,
      // 3.0
      version: '3.0',
      // Paratext
      isSpaceAfterAttributeMarkersContent: true,
      shouldOptionalClosingMarkersBePresent: true,
      // 3.0
      markers: Object.fromEntries(
        Object.entries(USFM_MARKERS_MAP.markers).map(([markerName, markerInfo]) => {
          if (markerInfo && markerInfo.defaultAttribute === 'href')
            markerInfo.defaultAttribute = 'link-href';
          if (markerName === 'k' && markerInfo) delete markerInfo.defaultAttribute;
          return [markerName, markerInfo];
        }),
      ),
    },
  };

  // eslint-disable-next-line jest/no-commented-out-tests
  /* test("Ira's thing does right", () => {
    const testUSFM2SACh1Usx = `<usx version="3.0"><book code="2SA" style="id">- TJs USFM Test</book><para style="toc3">2Sam</para><para style="toc2">2 Sam</para><para style="toc1">2 Samuel</para><chapter number="1" style="c" altnumber="1 ca" pubnumber="1 cp" /><para style="s1">This chapter and the next two chapters have lots of challenging USFM test markers and such in them.</para><para style="p"><verse number="1" style="v" /><char style="bd" closed="false">usfm marker</char></para><para style="p">In USFM, the usfm marker should come right after the id marker at the top of the page. According to spec, it should only occur if the USFM version is not 3.0; usfm 3.0 should never occur, and anything else like usfm 3.1 should always be present. In USX, this USFM marker should be transformed into the top-level usx marker that contains all the content of the document including the id marker, and the version from the usfm marker should be set as the version attribute on the usx marker. However, Paratext handles this marker differently. When output to USX, the usfm marker is transformed into a para marker with style="usfm", and the version is the text content of the marker. Paratext does not remove the usfm marker, and it does not set the usx marker's version to the version specified by the usfm marker; it is always 3.0.</para><para style="b" /><para style="p"><verse number="2" style="v" /><char style="bd" closed="false">Footnotes and crossrefs:</char></para><para style="p">The footnote in this paragraph has as category without markers in its content, so it should be an attribute on the footnote<note caller="+" style="f" category="things"><char style="fr" closed="false">1:12 </char><char style="ft" closed="false">Some footnote text.</char></note> instead of its own standalone marker. There is no space after the cat marker, which is the canonical form in the spec. Note the letter before the footnote and the space after.</para><para style="p">The end footnote in this paragraph has as category without markers in its content but with a space after, so it should be an attribute on the footnote <note caller="+" style="fe" category="things"> <char style="fr" closed="false">1:12 </char><char style="ft" closed="false">More footnote text. </char><char style="fp" closed="false">Another <char style="wj">paragraph</char> in the footnote.</char></note> instead of its own standalone marker. However, Paratext seems to interpret the space after as part of the footnote text content instead of an optional space (that is not output in canonical form) on the attribute marker according to spec. Note the space before the footnote and the space after. Also note the fp marker in the footnote is a character marker that looks like a paragraph, so character markers inside it must have + in USFM 3.0.</para><para style="p">The footnote in this paragraph has a category with markers in its content, so it should be its own standalone marker <note caller="+" style="f"><char style="cat" status="unknown"><char style="wj">stuff </char></char> <char style="fr" closed="false">1:2 </char><char style="ft" closed="false">Other footnote text.</char></note>. Note the space before the footnote and the period after.</para><para style="p">The crossref in this verse has a category without markers in its content, so it should be an attribute on the crossref<note caller="-" style="x"><char style="xo">1.2</char> <char style="xt">Crossref text.</char></note>. It also has closed character markers that do not need to be closed in 3.1 even though other markers need to be closed in 3.1. Note the letter before the crossref and the period after.</para><para style="b" /><para style="p"><verse number="3" style="v" /><char style="bd" closed="false">Character markers:</char></para><para style="p">In<char style="wj">si</char>de, <char style="wj">WholeWord</char>, <char style="wj">Span Words</char>, Pa<char style="wj">rt Span wor</char>ds</para><para style="p">Empty character marker here: <char style="wj" /></para><para style="p">w <char style="w" lemma="stuff">marker</char> with default attribute (note default attribute with normal attribute syntax gets normalized to default attribute)</para><para style="p">w <char style="w" lemma="stuff ">marker</char> with a space at the end of the default attribute. Note this space is on the default attribute. With non-default attribute syntax, any space before the closing marker is removed as part of normalization.</para><para style="p">w <char style="w" strong="H1234,G1234" lemma="markerLemma" srcloc="Location">marker</char> with multiple attributes. Note they are not in the typical order of lemma, strong, srcloc</para><para style="p">jmp <link style="jmp" link-href="2SA 1:1">marker</link> with default attribute - note the default attribute name changes between 3.0 link-href and 3.1 href</para><para style="p">jmp <link style="jmp" link-href="2SA 1:2" link-title="My Title" link-id="3.0 link">marker</link> with multiple attributes with 3.0 names - note the attribute name changes between 3.0 and 3.1</para><para style="p">jmp <char style="jmp" href="2SA 1:3" id="3.1 link">marker</char> with multiple attributes with 3.1 names - note the attribute name changes between 3.0 and 3.1. For some reason, Paratext 9.5 (with USFM 3.0) is automatically removing the title attribute, so it is not present.</para><para style="p">jmp <link style="jmp" link-href="x-user-defined:thing">marker</link> with a user-defined URI prefix. Must begin with x-.</para><para style="p">jmp <link style="jmp" link-href="prj:zzz6 2SA 1:4">marker</link> with a prj URI prefix. Links to a reference in another project.</para><para style="p">jmp <link style="jmp" link-href="x-prj:zzz6 2SA 1:5">marker</link> with an x-prj URI prefix. The 3.1 docs mention that this should link to another project, but the 3.1 usx.rng doesn't seem to indicate it is allowed unlike prj: which is in the 3.1 usx.rng.</para><para style="p">jmp <link style="jmp" link-href="2SA 1:6" /> marker that has no text content.</para><para style="p">jmp <link style="jmp" link-href="figures/platform-bible-discord.png">marker</link> with a file path in it.</para><para style="p">jmp <link style="jmp" link-href="#fake-named-target-id">marker</link> with a named target in it (I do not know how to define a named target or how this differs than listing an anchor in link-id).</para><para style="p">Non-jmp wj <link style="wj" link-href="2SA 1:7">marker</link> with link-href on it. The 3.0 spec says this should be considered a link, and Paratext 9.5 treats it that way. However, the 3.1 spec does not indicate such.</para><para style="p">k <char style="k" key="something">marker</char> with key attribute (default in 3.1+; did not exist in 3.0-)</para><para style="p">Empty character marker here <char style="wj" /> has a structure space in it unlike milestones which do not.</para><para style="p">qt <char style="qt">marker</char> that is a character marker that looks like it is a milestone.</para><para style="p">Nested <char style="wj">character <char style="nd">markers</char> must</char> have + in 3.0-, but it is optional in 3.1+.</para><para style="p">Character markers <char style="wj">inside notes<note caller="+" style="f"><char style="fr" closed="false">1:3 </char><char style="ft" closed="false">Footnote text with a </char><char style="wj">character marker</char></note> inside character markers</char> are not considered nested, so it must just be the direct parent that is considered for nesting.</para><para style="p">Character <char style="wj" closed="false">markers technically must close in 3.1+, but unclosed character markers can be handled the same as in 3.0. They should automatically close at the end of the paragraph and should be labeled as not closed in USX and USJ.</char></para><para style="b" /><para style="p"><verse number="4" style="v" /><char style="bd" closed="false">Milestones:</char></para><para style="p">This line has <ms style="qt-s" status="start" /> two milestones <ms style="qt-e" status="end" /> without attributes. There are content spaces on both sides of each milestone. Note that, unlike with character markers, there is no structural space before the closing marker when there are no attributes; it is normalized out.</para><para style="p">This line has <ms style="qt-s" status="start" who="TJ " />two milestones<ms style="qt-e" status="end" />, the first of which has default who attribute. There is a content space before the first milestone only. Note that there is a structural space after the opening marker when there are attributes. Also note that the space before the closing marker is part of the default attribute as with character markers.</para><para style="p">This line has a <ms style="qt-s" status="start" sid="Some quote" who="TJ" />starting milestone with sid and who.</para><para style="p">This line has no milestone.</para><para style="p">This line has an <ms style="qt-e" status="end" eid="Some quote" />ending milestone with default eid attribute.</para><para style="p">This line has an opening ts milestone <ms style="ts-s" status="start" sid="Translator's section" /> with default sid and closing ts milestone <ms style="ts-e" status="end" eid="Translator's section" /> with default eid. Note that the default attribute can have spaces in it.</para><para style="p">This line has t-s </para><para style="t-s" status="unknown"><unmatched marker="*" /> and t-e</para><para style="p">For some reason, Paratext does not recognize the ts </para><para style="ts" status="unknown"><unmatched marker="*" />, t-s </para><para style="t-s" status="unknown"><unmatched marker="*" />, or t-e </para><para style="t-e" status="unknown"><unmatched marker="*" /> markers. ts is a standalone translator's section milestone, and I guess the others are shorthands for ts-s and ts-e. Paratext puts a structural space before the closing marker on all three even though it should not be there.</para><para style="b" /><para style="p"><verse number="5" style="v" /></para><para style="b" /><para style="p"><verse number="6" style="v" /><char style="bd" closed="false">Leading attributes</char></para><para style="p">See the id marker at the top of this book for its code leading attribute</para><para style="p">See the chapter marker at the top of this chapter for its number leading attribute.</para><para style="p">See the many verse markers in this chapter for their number leading attribute.</para><para style="p">See the Footnotes and crossrefs section for footnote and crossref caller leading attribute.</para><para style="b" /><para style="p"><verse number="7" style="v" /><char style="bd" closed="false">Text content attributes</char></para><para style="p">periph has alt as its text content attribute, but periph is unfortunately only supported in peripheral books (FRT, BAK, INT, and OTH) in Paratext 9.5. Paratext splits these peripheral books into a separate file for each peripheral when outputting to USX. Please see the OTH book for examples of periph markers. Note that periph's id attribute cannot use default attribute syntax; it must be named.</para><para style="p">usfm, usx, and USJ markers have version as their text content attribute, but the usfm marker is unfortunately not present on this document because it uses USFM 3.0, so spec indicates it should not be present.</para><para style="b" /><para style="p"><verse number="8" style="v" /><char style="bd" closed="false">Custom attributes</char></para><para style="p">This <char style="wj" x-custom-attribute-1="Stuff" z-custom-attribute-2="Things">character marker</char> has two custom attributes. Custom attributes are supposed to start with x or z according to spec.</para><para style="p">This <char style="wj" custom-attribute-no-prefix="Bad" custom-attribute-no-prefix-2="Attributes">character marker</char> has two unknown attributes that do not start with x or z. Paratext treats them just like custom attributes.</para><para style="b" /><para style="p"><verse number="9" style="v" /><char style="bd" closed="false">Attribute markers</char></para><para style="p">See the Footnotes and crossrefs section for testing the cat marker on footnotes and crossrefs.</para><para style="p">See the chapter marker at the top of this chapter for testing ca and cp being applied to the chapter marker as attribute markers.</para><para style="p">See the chapter marker at the top of chapter 2 for not closing ca which leads it to be its own separate marker. Then cp is also its own separate marker afterward and can contain other markers as content.</para><para style="p">See the chapter marker at the top of chapter 3 for testing cp after the chapter marker with content in it, which should make the cp stay as its own independent marker.</para><para style="p">Note: All remaining tests of attribute markers will also have leading attributes because v and c are the only markers left with attribute markers to test, and they both have leading attributes.</para><para style="p"><verse number="10" style="v" altnumber="10 va" pubnumber="10 vp" />This verse marker has simple va and vp with no space between or after. Paratext and the spec treat this the same way: both markers turn into attributes on the marker in USX and USJ, and there are no spaces in the text content.</para><para style="p"><verse number="11" style="v" altnumber="11 va" pubnumber="11 vp" /> This verse marker has simple va and vp with no space between but with a space after. The spec indicates there is optional whitespace after attribute markers (one space is output after attribute markers except cat in canonical form), so this space should not be in the text content. However, Paratext treats all spaces after attribute markers as text content, so Paratext will output a space after the vp.</para><para style="p"><verse number="12" style="v" altnumber="12 va" /> <char style="vp">11 vp</char>This verse marker has simple va and vp with a space between but not after. This space should be ignored as part of optional structural space according to spec, but Paratext treats it as text content. As such, Paratext will output altnumber on the verse marker, but the vp will be its own separate marker.</para><para style="p"><verse number="13" style="v" /><char style="va">13 <char style="wj">va </char></char><char style="vp">13 vp</char>This verse marker has va with marker content in it, which makes it a standalone marker. Random <char style="va">va</char> without the verse marker also becomes a standalone marker. va does not seem to be allowed to be its own standalone marker according to spec, but it works in Paratext. The vp after the va is standalone because it is no longer connected to the verse marker.</para><para style="p"><verse number="14" style="v" altnumber="14" /><char style="vp">14 <char style="wj">vp</char></char>This verse marker has vp with marker content in it, which makes it a standalone marker. Random <char style="vp">vp</char> without the verse marker also becomes a standalone marker. The va before the vp appropriately becomes altnumber on the verse marker.</para><para style="p"><verse number="15" style="v" /><char style="va" closed="false">15 va </char><char style="vp" closed="false">15 vp This verse marker has va and vp without closing markers. Neither of these markers becomes an attribute in USX or USJ because both have closed="false" and are therefore not simple markers.</char></para><para style="p">This paragraph contains a random <char style="ca">ca with an <char style="wj">inline marker inside</char></char> not after the chapter marker, which becomes a standalone marker. ca does not seem to be allowed to be its own standalone marker according to spec, but it works in Paratext.</para><para style="cp">This paragraph is a random cp with an <char style="wj">inline marker inside</char> not after the chapter marker, which becomes a standalone marker.</para><para style="b" /><para style="p"><verse number="16" style="v" /><char style="bd" closed="false">Whitespace</char></para><para style="p">Tilde should be a NBSP in USX and USJ</para><para style="p">Double slash should be an optbreak in USX and USJ. Here <optbreak /> is one with spaces around it. Here<optbreak />is one without spaces around it.</para><para style="p">Paratext 9.5's unformatted view leaves a space after the number on verse markers, but the standard view does not. This seems like a bug in the unformatted view.</para><para style="p"><verse number="17" style="v" /></para><para style="p">TODO: add some whitespace character tests</para><para style="b" /><para style="p"><verse number="18" style="v" /><char style="bd" closed="false">Figures</char></para><para style="p">There is a figure here <figure style="fig" src="platform-bible-discord.png" size="col" ref="1.13" /> . It has a space on both sides. Only the three required attributes are present and in the order in which they are listed in the spec. The attribute src in USFM should be file in USX and USJ.</para><para style="p">There is a figure here<figure style="fig" alt="Description Here" src="platform-bible-discord.png" size="span" loc="Location here" copy="Copyright here" ref="1.13">Caption Here</figure>. It has no spaces around it. All six attributes are present and are not in the order in which they are listed in the spec. The attribute src in USFM should be file in USX and USJ.</para><para style="b" /><para style="p"><verse number="19" style="v" /><char style="bd" closed="false">Lists</char></para><para style="p">Following is a normal list with a header, entries, and footer. It has – at the start of each line like in the documentation example.</para><para style="lh">Header for the <char style="wj">normal</char> list:</para><para style="li1">–First <char style="wj">list</char> item</para><para style="li2">–Subpoint on the first list item</para><para style="li3">–Subpoint on the <char style="wj">subpoint</char> on the first list item</para><para style="li1">–Second list item</para><para style="li1">–Third list item</para><para style="lf">Footer for the normal list.</para><para style="p">Following is an embedded list with just entries.</para><para style="lim1">First embedded list item</para><para style="lim1">Second embedded list item</para><para style="lim1">Third embedded list item</para><para style="lim2">Subpoint on the third embedded list item</para><para style="lim3">Subpoint on the subpoint on the third embedded list item</para><para style="b" /><para style="p"><verse number="20" style="v" /><char style="bd" closed="false">Tables</char></para><para style="p">Following is a table with various kinds of cells and a header row. Paratext only supports th1 through th12 because that is all that is in usfm.sty. Note that USFM 3.1 does not require closing markers on table cells.</para><table><row style="tr"><cell style="th1" align="start">Header 1</cell><cell style="th2" align="start">Header 2 space after </cell><cell style="thc3" align="center" colspan="2">Header 3-4 centered</cell><cell style="thr5" align="end">Header 5 right</cell></row><row style="tr"><cell style="tc1" align="start">Row 1 cell 1</cell><cell style="tc2" align="start">Row 1 cell 2 space after </cell><cell style="thc3" align="center">Row 1 cell 3 centered</cell><cell style="thr4" align="end" colspan="2">Row 1 cell 4-5 right</cell></row><row style="tr"><cell style="tcr1" align="end" colspan="4">Row 2 cell 1-4 right</cell><cell style="tc5" align="start">Row 2 cell 5</cell></row></table><para style="p">Following is a table with 6 columns but no header row. Paratext does not support tc13 or higher and therefore makes two separate tables of one row each on this line, but it interestingly allows having multiple tc5 cells in one row. The spec does not appear to impose any limits on the column number.</para><table><row style="tr"><cell style="tc1" align="start">r1c1</cell><cell style="tc2" align="start">r1c2 with closed wj <char style="wj">marker</char> space after </cell><cell style="tc3" align="start">r1c3</cell><cell style="tc4" align="start">r1c4</cell><cell style="tc5" align="start">r1c5 </cell><cell style="tc5" align="start">r1c5 again </cell></row></table><para style="tc13" status="unknown">r1c13</para><table><row style="tr"><cell style="tc1" align="start">r2c1</cell><cell style="tc2" align="start">r2c2 with unclosed wj <char style="wj" closed="false">marker space after </char></cell><cell style="tc3" align="start">r2c3</cell><cell style="tc4" align="start">r2c4</cell><cell style="tc5" align="start">r2c5</cell><cell style="tc5" align="start">r2c5 again </cell></row></table><para style="tc13" status="unknown">r2c13</para><para style="b" /><para style="p"><verse number="21" style="v" /><char style="bd" closed="false">Periphs</char></para><para style="p">periph is unfortunately only supported in peripheral books (FRT, BAK, INT, and OTH) in Paratext 9.5. Paratext splits these peripheral books into a separate file for each peripheral when outputting to USX. Please see the OTH book for examples of periph markers.</para><para style="b" /><para style="p"><verse number="22" style="v" /><char style="bd" closed="false">Custom markers</char></para><para style="p">Following is a custom marker that is unknown (not in custom.sty or markers.ext). Paratext translates unknown markers to para type markers in USX. Custom markers must start with z. </para><para style="zUnknownCustomMarker" status="unknown">This text is <char style="wj">in the custom</char> marker.</para><para style="b" /><para style="p"><verse number="23-24" style="v" /><char style="bd" closed="false">Verse range</char></para><para style="p">This is a verse range.</para><para style="b" /><para style="p"><verse number="25" style="v" /><char style="bd" closed="false">Refs</char></para><para style="p">Paratext 9.5 standard view does not support entering an independent ref marker; it just replaces the ref with its text content. However, it will allow an unclosed ref marker (the contents are all put in the text content of the marker; the default attribute loc does not work): </para><para style="ref" status="unknown">2Sam 1:1|REV 1:1</para><para style="p">Also, if you enter a ref marker in the unformatted view and don't touch it in the standard view, it will work:</para><para style="p" /><para style="ref" status="unknown">2Sam 1:1|2SA 1:1<unmatched marker="ref*" /></para><para style="p">This crossref<note caller="-" style="x"><char style="xo" closed="false">1:21 </char><char style="xt" closed="false">2Sam 1:1; 2Sam 1:2-3.</char></note> has a properly filled out xt marker. Paratext generates ref markers around each Scripture reference in the xt when outputting USX. The ref marker text content is the localized reference, and the loc attribute (default) is the canonized reference. When translated back to USFM, the refs inside the xt need to be removed; only the text content should remain.</para><para style="p">This paragraph has a properly filled out xt marker: <char style="xt">2Sam 1:2; 2Sam 1:3</char>. Paratext generates ref markers around each Scripture reference in the xt when outputting USX the same way as it does for xt markers in crossrefs as detailed in the previous paragraph.</para><para style="b" /><para style="p"><verse number="26" style="v" /><char style="bd" closed="false">Sidebars</char></para><para style="p">There is a closed sidebar after this paragraph. It has the category "Test Category". Note that Paratext's Standard view normalizes out any space before the closing cat marker, so there cannot be trailing space on the category unless you use a different view. It seems the spec allows trailing space there as part of the text content of the marker.</para><sidebar style="esb" category="Test Category"><para style="p">This paragraph is in the sidebar. The sidebar can contain many things like <char style="wj">character markers</char>, <ms style="qt1-s" status="start" /> milestones <ms style="qt1-e" status="end" />, and more paragraphs.</para><para style="p">This is a second paragraph in the sidebar. The sidebar will end at esbe marker.</para></sidebar><para style="p">There is a sidebar that is not closed after this paragraph. The entire rest of the chapter will be in this sidebar because sidebars automatically close at the end of the chapter.</para><sidebar style="esb" closed="false"><para style="p">This paragraph is in the sidebar.</para><para style="b" /><para style="p"><verse number="27" style="v" />This is <char style="wj">still</char> in the sidebar.</para></sidebar></usx>`;
    const testUSFM2SaCh1Usj3_1 = { ...testUSFM2SACh1Usj, version: '3.1' };
    // expect(usjToUsxString(testUSFM2SaCh1Usj3_1)).toEqual(testUSFM2SACh1Usx);
    const convertedUsj = usxStringToUsj(testUSFM2SACh1Usx);
    expect(convertedUsj).toEqual(testUSFM2SaCh1Usj3_1);
  }); */

  test('toUsfm properly transforms Matthew 1-2 WEB', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj, paratextUsjReaderWriterOptions);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(matthew1And2Usfm);
  });

  test('toUsfm properly transforms 2SA 1 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh1Usj, paratextUsjReaderWriterOptions);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh1Usfm);
  });

  test('toUsfm properly transforms 2SA 2 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh2Usj, paratextUsjReaderWriterOptions);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh2Usfm);
  });

  test('toUsfm properly transforms 2SA 3 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh3Usj, paratextUsjReaderWriterOptions);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh3Usfm);
  });
});

describe('Transform USJ 3.1 to spec USFM 3.1', () => {
  test('toUsfm properly transforms canonical 2SA 1 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh1UsjCanonical3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh1UsfmCanonical3_1);
  });

  test('toUsfm properly transforms canonical 2SA 2 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh2UsjCanonical3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh2UsfmCanonical3_1);
  });

  test('toUsfm properly transforms canonical 2SA 3 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh3UsjCanonical3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh3UsfmCanonical3_1);
  });

  test('toUsfm properly transforms generated refs', () => {
    const usjDoc = new UsjReaderWriter(exampleGeneratedRefsUsj);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(exampleGeneratedRefsUsfm);
  });

  test('toUsfm properly transforms provided refs', () => {
    const usjDoc = new UsjReaderWriter(exampleProvidedRefsUsj);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(exampleProvidedRefsUsfm);
  });
});
