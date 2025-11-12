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
import { USFM_MARKERS_MAP_PARATEXT as USFM_MARKERS_MAP_PARATEXT_3_0 } from './markers-maps/markers-map-3.0.model';
import { USFM_MARKERS_MAP as USFM_MARKERS_MAP_3_1 } from './markers-maps/markers-map-3.1.model';
import { matthew1And2Locations } from './usj-reader-writer-test-data/web-matthew-1-and-2-locations';
import { LocationUsfmAndUsj } from './usj-reader-writer-test-data/test-data.model';
import { testUSFM2SaCh1Locations } from './usj-reader-writer-test-data/testUSFM-2SA-1-locations';
import {
  UsjNodeAndDocumentLocation,
  UsjPropertyValueLocation,
  UsjReaderWriterOptions,
} from './usj-reader-writer.model';

// #region set up file path variables

const dirPath = __dirname ?? import.meta.dirname;
const testDataPath = path.resolve(dirPath, 'usj-reader-writer-test-data');

/** Read a test data file's utf-8 contents */
function readTestDataFile(fileName: string) {
  return fs.readFileSync(path.resolve(testDataPath, fileName), 'utf-8');
}

// #endregion set up file path variables

// #region UsjReaderWriter markers maps

const usjReaderWriterOptions3_1: UsjReaderWriterOptions = {
  markersMap: USFM_MARKERS_MAP_3_1,
};

const usjReaderWriterOptionsParatext3_0: UsjReaderWriterOptions = {
  markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
};

// #endregion UsjReaderWriter markers maps

// #region WEB Matthew 1-2 test data

/**
 * WEB Matthew 1-2 in USFM.
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
const matthew1And2Usj: Usj = JSON.parse(readTestDataFile('web-matthew-1-and-2.usj'));

/**
 * Small portion of WEB Matthew 2 output in USJ from Paratext 10 Studio 0.3.0-rc.0 and modified by
 * hand.
 *
 * Includes the first paragraph and last two paragraphs of chapter 2 with verses 21 and 22 combined.
 */
const matthew2verseRangeUsj = JSON.parse(readTestDataFile('web-matthew-2-verse-range.usj'));

// #endregion WEB Matthew 1-2 test data

// #region WEB Matthew 5 with section header test data

/**
 * WEB Matthew 5 in USFM modified by hand to have a section header right after the chapter number.
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const webMatthew5Usfm = readTestDataFile('web-matthew-5-section-header.usfm');

/**
 * WEB Matthew 1-2 output in USJ from Paratext 10 Studio 0.3.0-rc.0 (version 3.1 replaced with 3.0
 * in the USJ marker because that is more accurate. The USJ version handling isn't great yet).
 *
 * Also includes the chapter marker for chapter 3 but no contents of chapter 3.
 */
const webMatthew5Usj: Usj = JSON.parse(readTestDataFile('web-matthew-5-section-header.usj'));

// #endregion

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
const testUSFM2SACh1Usj = JSON.parse(readTestDataFile('testUSFM-2SA-1.usj'));

/**
 * TestUSFM 2 Samuel 2 output in USJ from Platform.Bible (version 3.1 replaced with 3.0 in the USJ
 * marker because that is more accurate. The USJ version handling isn't great yet).
 */
const testUSFM2SACh2Usj = JSON.parse(readTestDataFile('testUSFM-2SA-2.usj'));

/**
 * TestUSFM 2 Samuel 3 output in USJ from Platform.Bible (version 3.1 replaced with 3.0 in the USJ
 * marker because that is more accurate. The USJ version handling isn't great yet).
 */
const testUSFM2SACh3Usj = JSON.parse(readTestDataFile('testUSFM-2SA-3.usj'));

/**
 * TestUSFM 2 Samuel 3 output in USJ from Platform.Bible with the following modifications:
 *
 * - Version 3.1 replaced with 3.0 in the USJ marker because that is more accurate. The USJ version
 *   handling isn't great yet.
 * - `c`'s `pubnumber` moved to its own paragraph after the `c` marker that contains the contents up
 *   until the next `para` marker. TJ believes this is how the USJ is supposed to look, but he
 *   thinks Paratext 9 is not transforming USFM to USX properly in this case.
 */
const testUSFM2SACh3UsjCorrected = JSON.parse(readTestDataFile('testUSFM-2SA-3-corrected.usj'));

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
  readTestDataFile('testUSFM-2SA-1-canonical-3.1.usj'),
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
  readTestDataFile('testUSFM-2SA-3-canonical-3.1.usj'),
);

// #endregion testUSFM test data - in canonical 3.1 format

// #region examples from USFM 3.1 docs

/**
 * Example with generated refs derived from Example 1 in the docs
 * https://docs.usfm.bible/usfm/3.1/char/features/ref.html with the following modifications:
 *
 * - Single backslash replaced with double backslash to properly escape quotes
 * - `usfm` 3.1 marker added to conform with requirements
 * - Chapter number changed to 5 to match the chapter number in the example USJ
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
 * - Chapter number changed to 5 to match the chapter number in the example USJ
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

function test_UsfmLocationToUsjNodeAndDocumentLocation(
  usjDoc: UsjReaderWriter,
  locations: LocationUsfmAndUsj[],
) {
  locations.forEach((testCase) => {
    const location = usjDoc.usfmLocationToUsjNodeAndDocumentLocation(testCase.usfmLocation);
    // expect().toEqual() gives more detailed errors than UsjReaderWriter.areUsjDocumentLocationsEqual.
    // If this ever becomes a problem with JSONPath property format, can use that instead
    expect(location.documentLocation).toEqual(testCase.usjContent.documentLocation);
    expect(UsjReaderWriter.isUsjDocumentLocationForTextContent(location)).toBe(
      UsjReaderWriter.isUsjDocumentLocationForTextContent(testCase.usjContent),
    );
    // Disabling conditional expectations because we need to do different tests based on which
    // kinds of data we're testing
    /* eslint-disable jest/no-conditional-expect */
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(testCase.usjContent)) {
      expect(location.node).toBe(testCase.usjContent.node);
    } else {
      expect(typeof location.node).toBe('object');
      if (typeof location.node !== 'object') return;
      // Pull `content` out from the result because `content` is not in the test data. But we
      // don't need `content`, so just call it _
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content: _, ...node } = location.node;
      expect(node).toEqual(testCase.usjContent.node);
    }
    /** Eslint-enable */
  });
}

function test_UsjDocumentLocationToUsfmVerseLocation(
  usjDoc: UsjReaderWriter,
  locations: LocationUsfmAndUsj[],
) {
  locations.forEach((testCase) => {
    const location = usjDoc.usjDocumentLocationToUsfmVerseLocation(
      testCase.usjContent.documentLocation,
    );
    // expect().toEqual() gives more detailed errors than UsjReaderWriter.areUsjDocumentLocationsEqual.
    // If this ever becomes a problem with JSONPath property format, can use that instead
    expect(location).toEqual(testCase.usfmLocation);
  });
}

describe('jsonPathToUsfmVerseLocation translates USJ jsonPath to UsfmVerseLocation', () => {
  test('Matthew 1-2 WEB 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);
    const expectedResults = [
      { jsonPath: '$.content[0]', chapter: 1, verse: 0, offset: 0 },
      { jsonPath: '$.content[0].content[0]', chapter: 1, verse: 0, offset: 8 },
      { jsonPath: '$.content[8]', chapter: 1, verse: 0, offset: 185 },
      { jsonPath: '$.content[9]', chapter: 1, verse: 0, offset: 190 },
      { jsonPath: '$.content[9].content[0]', chapter: 1, verse: 1, offset: 0 },
      { jsonPath: '$.content[9].content[1]', chapter: 1, verse: 1, offset: 5 },
      { jsonPath: '$.content[9].content[2]', chapter: 1, verse: 1, offset: 47 },
      { jsonPath: '$.content[9].content[2].content[0]', chapter: 1, verse: 1, offset: 52 },
      { jsonPath: '$.content[9].content[2].content[1]', chapter: 1, verse: 1, offset: 60 },
      { jsonPath: '$.content[9].content[3]', chapter: 1, verse: 1, offset: 127 },
      { jsonPath: '$.content[10].content[0]', chapter: 1, verse: 2, offset: 0 },
      { jsonPath: '$.content[10].content[1]', chapter: 1, verse: 2, offset: 5 },
      { jsonPath: '$.content[10].content[2]', chapter: 1, verse: 3, offset: 0 },
      { jsonPath: '$.content[10].content[3]', chapter: 1, verse: 3, offset: 5 },
      { jsonPath: '$.content[10].content[4]', chapter: 1, verse: 4, offset: 0 },
      { jsonPath: '$.content[10].content[5]', chapter: 1, verse: 4, offset: 5 },
      { jsonPath: '$.content[10].content[6]', chapter: 1, verse: 5, offset: 0 },
      { jsonPath: '$.content[10].content[7]', chapter: 1, verse: 5, offset: 5 },
      { jsonPath: '$.content[10].content[8]', chapter: 1, verse: 6, offset: 0 },
      { jsonPath: '$.content[10].content[9]', chapter: 1, verse: 6, offset: 5 },
      { jsonPath: '$.content[10].content[10]', chapter: 1, verse: 6, offset: 58 },
      { jsonPath: '$.content[10].content[10].content[0]', chapter: 1, verse: 6, offset: 63 },
      { jsonPath: '$.content[10].content[10].content[1]', chapter: 1, verse: 6, offset: 71 },
      { jsonPath: '$.content[29].content[4]', chapter: 2, verse: 15, offset: 162 },
    ];

    expectedResults.forEach((testCase) => {
      const location = usjDoc.jsonPathToUsfmVerseLocation(testCase.jsonPath);
      expect(location.verseRef.chapterNum).toBe(testCase.chapter);
      expect(location.verseRef.verseNum).toBe(testCase.verse);
      expect(location.offset).toBe(testCase.offset);
    });

    expect(() => {
      usjDoc.jsonPathToUsfmVerseLocation('$.content[9999]');
    }).toThrow('No result found for JSONPath query: $.content[9999]');

    expect(() => {
      new UsjReaderWriter({
        type: USJ_TYPE,
        // testing 3.0. Usj can be any version, but the `Usj` type says only 3.1
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        version: '3.0' as typeof USJ_VERSION,
        content: [],
      }).jsonPathToUsfmVerseLocation('');
    }).toThrow('No result found for JSONPath query: ');
  });
});

describe('usjDocumentLocationToUsfmVerseLocation translates USJ document locations to USFM locations', () => {
  test('Matthew 1-2 WEB 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    test_UsjDocumentLocationToUsfmVerseLocation(usjDoc, matthew1And2Locations);

    expect(() => {
      usjDoc.usjDocumentLocationToUsfmVerseLocation({
        jsonPath: '$.content[0]',
        offset: -1,
      });
    }).toThrow(
      'Could not find fragment info at USJ document location while transforming to USFM verse location: {"jsonPath":"$.content[0]","offset":-1}',
    );
  });

  test('Matthew 2 with verse range added 3.1', () => {
    const usjDoc = new UsjReaderWriter(matthew2verseRangeUsj, usjReaderWriterOptions3_1);

    const result0 = usjDoc.usjDocumentLocationToUsfmVerseLocation(
      {
        jsonPath: '$.content[3].content[0]',
      },
      'MAT',
    );
    expect(result0.verseRef).toEqual({
      book: 'MAT',
      chapterNum: 2,
      verseNum: 21,
      verse: '21-22',
    });
    expect(result0.offset).toEqual(0);
  });

  test('Paratext 2SA 1 testUSFM 3.0', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh1Usj, usjReaderWriterOptionsParatext3_0);

    test_UsjDocumentLocationToUsfmVerseLocation(usjDoc, testUSFM2SaCh1Locations);

    expect(() => {
      usjDoc.usjDocumentLocationToUsfmVerseLocation({
        jsonPath: '$.content[0]',
        keyOffset: 1234,
      });
    }).toThrow(
      'Could not find fragment info at USJ document location while transforming to USFM verse location: {"jsonPath":"$.content[0]","keyOffset":1234}',
    );
  });

  test('Bookless USJ Document', () => {
    const booklessUsjDoc = new UsjReaderWriter({
      type: USJ_TYPE,
      // testing 3.0. Usj can be any version, but the `Usj` type says only 3.1
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      version: '3.0' as typeof USJ_VERSION,
      content: ['This USJ document has no book'],
    });

    const booklessUsfmVerseLocation = booklessUsjDoc.usjDocumentLocationToUsfmVerseLocation(
      {
        jsonPath: '$.content[0]',
        offset: 5,
      },
      'GEN',
    );
    expect(booklessUsfmVerseLocation.verseRef).toEqual({ book: 'GEN', chapterNum: 0, verseNum: 0 });
    expect(booklessUsfmVerseLocation.offset).toEqual(5);

    expect(() => {
      booklessUsjDoc.usjDocumentLocationToUsfmVerseLocation({
        jsonPath: '$.content[0]',
        offset: 5,
      });
    }).toThrow(
      'Could not find book ID and no book ID provided when finding USFM verse ref for index in USFM 0',
    );
  });
});

describe('usfmLocationToUsjNodeAndDocumentLocation translates USFM locations to USJ document locations', () => {
  test('Matthew 1-2 WEB 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    test_UsfmLocationToUsjNodeAndDocumentLocation(usjDoc, matthew1And2Locations);

    // For now, requesting an offset beyond the last fragment in a verse just finds the appropriate
    // content at that offset in USFM no matter how far away it is from the verseRef requested.
    // This is not particularly designed to be this way; can change if desired.
    // But it is helpful if someone just wants to provide chapter-based offsets or book-based
    // offsets! Like so:
    const usjLocationForOffsetTests: UsjNodeAndDocumentLocation = {
      node: 'who shall shepherd my people, Israel.’”',
      documentLocation: {
        jsonPath: '$.content[25].content[0]',
        offset: 17,
      },
    };
    const chapterBasedOffsetTestCase: LocationUsfmAndUsj = {
      usfmLocation: {
        verseRef: { book: 'MAT', chapterNum: 2, verseNum: 0 },
        offset: 850,
      },
      usjContent: usjLocationForOffsetTests,
    };
    test_UsfmLocationToUsjNodeAndDocumentLocation(usjDoc, [chapterBasedOffsetTestCase]);

    const bookBasedOffsetTestCase: LocationUsfmAndUsj = {
      usfmLocation: {
        verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
        offset: 4648,
      },
      usjContent: usjLocationForOffsetTests,
    };
    test_UsfmLocationToUsjNodeAndDocumentLocation(usjDoc, [bookBasedOffsetTestCase]);

    // It is kinda weird, though, if you exceed the length of the USFM representation of the USJ doc
    // passed in. It just sets a huge offset on the last position
    const offsetExceedsVerseTestCase: LocationUsfmAndUsj = {
      usfmLocation: {
        verseRef: { book: 'MAT', chapterNum: 2, verseNum: 6 },
        offset: 9999999,
      },
      usjContent: {
        node: {
          type: 'chapter',
          marker: 'c',
          number: '3',
        },
        documentLocation: {
          jsonPath: "$.content[38]['number']",
          propertyOffset: 9997136,
        },
      },
    };
    test_UsfmLocationToUsjNodeAndDocumentLocation(usjDoc, [offsetExceedsVerseTestCase]);

    expect(() => {
      usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
        verseRef: { book: 'MAT', chapterNum: 99, verseNum: 1 },
        offset: 0,
      });
    }).toThrow('Could not find MAT chapter 99');

    expect(() => {
      usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
        verseRef: { book: 'MAT', chapterNum: 1, verseNum: 99 },
        offset: 0,
      });
    }).toThrow('Verse 99 not found in MAT 1');

    expect(() => {
      usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
        verseRef: { book: 'JHN', chapterNum: 1, verseNum: 1 },
        offset: 0,
      });
    }).toThrow(`Book ID JHN not found in USJ! Book IDs in USJ: ["MAT"]`);

    expect(() => {
      new UsjReaderWriter({
        type: USJ_TYPE,
        // testing 3.0. Usj can be any version, but the `Usj` type says only 3.1
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        version: '3.0' as typeof USJ_VERSION,
        content: [],
      }).usfmLocationToUsjNodeAndDocumentLocation({
        verseRef: { book: 'JHN', chapterNum: 1, verseNum: 1 },
      });
    }).toThrow(
      'Book ID JHN not found in USJ! There seems to be no USJ content because there is no content in *** either',
    );
  });

  test('Matthew 2 with verse range added 3.1', () => {
    const usjDoc = new UsjReaderWriter(matthew2verseRangeUsj, usjReaderWriterOptions3_1);

    const result0 = usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
      verseRef: { book: 'MAT', chapterNum: 2, verseNum: 21, verse: '21-22' },
      offset: 0,
    });
    expect(typeof result0.node).toBe('object');
    if (typeof result0.node !== 'object') return;
    expect(result0.node.type).toBe('verse');
    if (result0.node.type !== 'verse') return;
    expect(result0.node.number).toBe('21-22');
    expect(result0.documentLocation.jsonPath).toBe('$.content[3].content[0]');
    expect(result0.documentLocation).not.toHaveProperty('offset');
  });

  test('Matthew 5 with section header added 3.0', () => {
    const usjDoc = new UsjReaderWriter(webMatthew5Usj);

    // Test offset conversion when the first marker in the document normally has a newline before it
    const result0 = usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
      verseRef: { book: 'MAT', chapterNum: 5, verseNum: 0 },
      offset: 8,
    });
    if (!UsjReaderWriter.isUsjDocumentLocationForTextContent(result0.documentLocation))
      throw new Error('Expected result0 to be a string');
    expect(result0.documentLocation.jsonPath).toBe('$.content[1].content[0]');
    expect(result0.documentLocation.offset).toBe(0);
    expect(result0.node).toBe('Test heading test test test');
  });

  test('Paratext 2SA 1 testUSFM 3.0', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh1Usj, usjReaderWriterOptionsParatext3_0);

    test_UsfmLocationToUsjNodeAndDocumentLocation(usjDoc, testUSFM2SaCh1Locations);

    // There are some locations that are not representable in USJ document locations because we
    // didn't create a spec for such locations. These locations just go back to the closest previous
    // fragment. Following are some examples:
    // The USFM offset for the + prefix for the nested character marker goes back to the start of
    // the marker in USJ
    const nestedCharPrefixTestCase: LocationUsfmAndUsj = {
      usfmLocation: {
        verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
        offset: 2514,
      },
      usjContent: {
        node: {
          type: 'char',
          marker: 'nd',
        },
        documentLocation: {
          jsonPath: '$.content[34].content[1].content[1]',
        },
      },
    };
    test_UsfmLocationToUsjNodeAndDocumentLocation(usjDoc, [nestedCharPrefixTestCase]);
    // The USFM offset for the second slash in optbreak goes back to the first optbreak slash in USJ
    const optBreakSecondSlashTestCase: LocationUsfmAndUsj = {
      usfmLocation: {
        verseRef: { book: '2SA', chapterNum: 1, verseNum: 16 },
        offset: 122,
      },
      usjContent: {
        node: {
          type: 'optbreak',
        },
        documentLocation: {
          jsonPath: '$.content[85].content[1]',
        },
      },
    };
    test_UsfmLocationToUsjNodeAndDocumentLocation(usjDoc, [optBreakSecondSlashTestCase]);

    expect(() => {
      usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
        verseRef: { book: 'JHN', chapterNum: 1, verseNum: 1 },
        offset: 0,
      });
    }).toThrow(`Book ID JHN not found in USJ! Book IDs in USJ: ["2SA"]`);
  });

  test('Bookless USJ Document', () => {
    const booklessUsjDoc = new UsjReaderWriter({
      type: USJ_TYPE,
      // testing 3.0. Usj can be any version, but the `Usj` type says only 3.1
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      version: '3.0' as typeof USJ_VERSION,
      content: ['This USJ document has no book'],
    });

    const booklessTestCase: LocationUsfmAndUsj = {
      usfmLocation: {
        verseRef: {
          book: 'GEN',
          chapterNum: 0,
          verseNum: 0,
        },
        offset: 5,
      },
      usjContent: {
        node: 'This USJ document has no book',
        documentLocation: {
          jsonPath: '$.content[0]',
          offset: 5,
        },
      },
    };
    test_UsfmLocationToUsjNodeAndDocumentLocation(booklessUsjDoc, [booklessTestCase]);

    expect(() => {
      booklessUsjDoc.usfmLocationToUsjNodeAndDocumentLocation({
        verseRef: {
          book: 'GEN',
          chapterNum: 0,
          verseNum: 0,
        },
        offset: -1,
      });
    }).toThrow('offset must be >= 0');
  });
});

describe('usjDocumentLocationToUsjVerseRefChapterLocation translates USJ document locations to USJ chapter locations', () => {
  test('Matthew 1-2 WEB 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // The very beginning
    const result0 = usjDoc.usjDocumentLocationToUsjVerseRefChapterLocation({
      jsonPath: '$.content[0]',
    });
    expect(result0.verseRef.book).toBe('MAT');
    expect(result0.verseRef.chapterNum).toBe(1);
    expect(result0.granularity === undefined || result0.granularity === 'chapter').toBe(true);
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(result0.documentLocation))
      throw new Error('Expected result0 not to be a string');
    expect(result0.documentLocation.jsonPath).toBe('$.content[0]');
    expect(result0.documentLocation).not.toHaveProperty('offset');

    // String inside the very beginning
    const result1 = usjDoc.usjDocumentLocationToUsjVerseRefChapterLocation({
      jsonPath: '$.content[0].content[0]',
      offset: 6,
    });
    expect(result1.verseRef.book).toBe('MAT');
    expect(result1.verseRef.chapterNum).toBe(1);
    expect(result1.granularity === undefined || result1.granularity === 'chapter').toBe(true);
    if (!UsjReaderWriter.isUsjDocumentLocationForTextContent(result1.documentLocation))
      throw new Error('Expected result1 to be a string');
    expect(result1.documentLocation.jsonPath).toBe('$.content[0].content[0]');
    expect(result1.documentLocation.offset).toBe(6);

    // First chapter marker
    const result2 = usjDoc.usjDocumentLocationToUsjVerseRefChapterLocation({
      jsonPath: '$.content[8]',
    });
    expect(result2.verseRef.book).toBe('MAT');
    expect(result2.verseRef.chapterNum).toBe(1);
    expect(result2.granularity === undefined || result2.granularity === 'chapter').toBe(true);
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(result2.documentLocation))
      throw new Error('Expected result2 not to be a string');
    expect(result2.documentLocation.jsonPath).toBe('$.content[8]');
    expect(result2.documentLocation).not.toHaveProperty('offset');

    // Some random spot in chapter 1
    const result3 = usjDoc.usjDocumentLocationToUsjVerseRefChapterLocation({
      jsonPath: "$.content[9].content[2]['caller']",
      propertyOffset: 3,
    });
    expect(result3.verseRef.book).toBe('MAT');
    expect(result3.verseRef.chapterNum).toBe(1);
    expect(result3.granularity === undefined || result3.granularity === 'chapter').toBe(true);
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(result3.documentLocation))
      throw new Error('Expected result3 not to be a string');
    expect(result3.documentLocation.jsonPath).toBe("$.content[9].content[2]['caller']");
    expect(result3.documentLocation).not.toHaveProperty('offset');
    expect(result3.documentLocation).toHaveProperty('propertyOffset');
    // We just checked that it has `propertyOffset`, so just casting it
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect((result3.documentLocation as UsjPropertyValueLocation).propertyOffset).toBe(3);

    // Second chapter marker
    const result4 = usjDoc.usjDocumentLocationToUsjVerseRefChapterLocation({
      jsonPath: '$.content[20]',
    });
    expect(result4.verseRef.book).toBe('MAT');
    expect(result4.verseRef.chapterNum).toBe(2);
    expect(result4.granularity === undefined || result4.granularity === 'chapter').toBe(true);
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(result4.documentLocation))
      throw new Error('Expected result4 not to be a string');
    expect(result4.documentLocation.jsonPath).toBe('$.content[0]');
    expect(result4.documentLocation).not.toHaveProperty('offset');

    // Some random spot in chapter 2
    const result5 = usjDoc.usjDocumentLocationToUsjVerseRefChapterLocation({
      jsonPath: "$.content[25].content[1].content[1]['marker']",
      propertyOffset: 1,
    });
    expect(result5.verseRef.book).toBe('MAT');
    expect(result5.verseRef.chapterNum).toBe(2);
    expect(result5.granularity === undefined || result5.granularity === 'chapter').toBe(true);
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(result5.documentLocation))
      throw new Error('Expected result5 not to be a string');
    expect(result5.documentLocation.jsonPath).toBe("$.content[5].content[1].content[1]['marker']");
    expect(result5.documentLocation).not.toHaveProperty('offset');
    expect(result5.documentLocation).toHaveProperty('propertyOffset');
    // We just checked that it has `propertyOffset`, so just casting it
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    expect((result5.documentLocation as UsjPropertyValueLocation).propertyOffset).toBe(1);
  });
});

describe('usfmLocationToIndexInUsfm translates USFM locations to indices in USFM', () => {
  test('Matthew 1-2 WEB 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // The very beginning
    const result0 = usjDoc.usfmLocationToIndexInUsfm({ book: 'MAT', chapterNum: 1, verseNum: 0 });
    expect(result0).toBe(0);

    // String inside the very beginning
    const result1 = usjDoc.usfmLocationToIndexInUsfm({
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 6,
    });
    expect(result1).toBe(6);

    // First chapter marker
    const result2 = usjDoc.usfmLocationToIndexInUsfm({
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 185,
    });
    expect(result2).toBe(185);

    // Some random spot in chapter 1
    const result3 = usjDoc.usfmLocationToIndexInUsfm({
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 },
      offset: 51,
    });
    expect(result3).toBe(244);

    // Second chapter marker
    const result4 = usjDoc.usfmLocationToIndexInUsfm({ book: 'MAT', chapterNum: 2, verseNum: 0 });
    expect(result4).toBe(3798);

    // Some random spot in chapter 2
    const result5 = usjDoc.usfmLocationToIndexInUsfm({
      verseRef: { book: 'MAT', chapterNum: 2, verseNum: 6 },
      offset: 187,
    });
    expect(result5).toBe(4685);
  });
});

describe('Find USJ details for text searches', () => {
  test('usfmLocationToNextTextLocation takes USJ location and finds USJ details for next text 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // Start from a verse node
    const result1 = usjDoc.usfmLocationToNextTextLocation({
      book: 'MAT',
      chapterNum: 1,
      verseNum: 2,
    });
    if (typeof result1.node !== 'string') throw new Error('Expected result1 to be a string');
    expect(result1.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(result1.documentLocation.offset).toBe(0);
    expect(result1.node).toBe(
      'Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers. ',
    );

    const result2 = usjDoc.usfmLocationToNextTextLocation({
      book: 'MAT',
      chapterNum: 2,
      verseNum: 19,
    });
    if (typeof result2.node !== 'string') throw new Error('Expected result2 to be a string');
    expect(result2.documentLocation.jsonPath).toBe('$.content[36].content[1]');
    expect(result2.documentLocation.offset).toBe(0);
    expect(result2.node).toBe(
      'But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying, ',
    );

    expect(() => {
      usjDoc.usfmLocationToNextTextLocation({ book: 'MAT', chapterNum: 3, verseNum: 1 });
    }).toThrow('Verse 1 not found in MAT 3');
  });

  test('findNextLocationOfMatchingText takes location and text and finds USJ details for next occurrence 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // Start from a verse node
    const startingPoint1 = usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 },
      offset: 0,
    });
    if (typeof startingPoint1.node !== 'object')
      throw new Error('Expected startingPoint1 to be an object');
    expect(startingPoint1.documentLocation.jsonPath).toBe('$.content[10].content[0]');
    expect(startingPoint1.documentLocation).not.toHaveProperty('offset');

    const result1 = usjDoc.findNextLocationOfMatchingText(startingPoint1, 'the father of Manasseh');
    expect(result1).toBeTruthy();
    if (typeof result1?.node !== 'string') throw new Error('Expected result1 node to be a string');
    expect(result1.node).toBe(
      'Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah. ',
    );
    expect(result1.documentLocation.jsonPath).toBe('$.content[10].content[19]');
    expect(result1.documentLocation.offset).toBe(16);

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
    expect(result5.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(result5.documentLocation.offset).toBe(0);

    // Get the first text you can find after the requested location (in this case, a verse ref)
    const result6 = usjDoc.findNextLocationOfMatchingText(startingPoint1, '');
    expect(result6).toBeTruthy();
    if (typeof result6?.node !== 'string') throw new Error('Expected result6 node to be a string');
    expect(result6.node).toBe(
      'Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers. ',
    );
    expect(result6.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(result6.documentLocation.offset).toBe(0);

    // Start from a string
    const startingPoint2 = usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 6 },
      offset: 8,
    });
    expect(UsjReaderWriter.isUsjDocumentLocationForTextContent(startingPoint2)).toBe(true);
    if (!UsjReaderWriter.isUsjDocumentLocationForTextContent(startingPoint2)) return;
    expect(startingPoint2.documentLocation.jsonPath).toBe('$.content[10].content[9]');
    expect(startingPoint2.documentLocation.offset).toBe(3);

    const result2 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'the father of Manasseh');
    expect(result2).toBeTruthy();
    if (typeof result2?.node !== 'string') throw new Error('Expected result2 node to be a string');
    expect(result2.node).toBe(
      'Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah. ',
    );
    expect(result2.documentLocation.jsonPath).toBe('$.content[10].content[19]');
    expect(result2.documentLocation.offset).toBe(16);

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
    expect(result4.documentLocation.jsonPath).toBe('$.content[10].content[21]');
    expect(result4.documentLocation.offset).toBe(0);

    // the search includes the text in the starting point location, so searching for something that
    // matches the starting location should just return the same location
    const result7 = usjDoc.findNextLocationOfMatchingText(startingPoint2, '');
    expect(result7).toBeTruthy();
    if (typeof result7?.node !== 'string') throw new Error('Expected result7 node to be a string');
    expect(result7.node).toBe('Jesse became the father of King David. David the king');
    expect(result7.documentLocation.jsonPath).toBe('$.content[10].content[9]');
    expect(result7.documentLocation.offset).toBe(3);

    // Match something that is found before and after the start offset, but the match should be the
    // occurrence after the offset
    const result8 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'e');
    expect(result8).toBeTruthy();
    if (typeof result8?.node !== 'string') throw new Error('Expected result8 node to be a string');
    expect(result8.node).toBe('Jesse became the father of King David. David the king');
    expect(result8.documentLocation.jsonPath).toBe('$.content[10].content[9]');
    expect(result8.documentLocation.offset).toBe(4);

    // Make sure that the offset is not included in the max length of text to search
    // NOTE: this max length parameter does not carefully check only the exact length specified;
    // rather, it just doesn't look at any more text nodes after it exceeds the limit.
    const startingPoint2RemainingTextLength =
      'Jesse became the father of King David. David the king'.length -
      startingPoint2.documentLocation.offset;
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
    expect(result10.documentLocation.jsonPath).toBe('$.content[10].content[11]');
    expect(result10.documentLocation.offset).toBe(22);

    // Start in a node that is nested in a skipped node
    const startingPoint3 = usjDoc.usfmLocationToUsjNodeAndDocumentLocation({
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 6 },
      offset: 78,
    });
    expect(UsjReaderWriter.isUsjDocumentLocationForTextContent(startingPoint3)).toBe(true);
    if (!UsjReaderWriter.isUsjDocumentLocationForTextContent(startingPoint3)) return;
    expect(startingPoint3.documentLocation.jsonPath).toBe(
      '$.content[10].content[10].content[1].content[0]',
    );
    expect(startingPoint3.documentLocation.offset).toBe(3);

    const result11 = usjDoc.findNextLocationOfMatchingText(startingPoint3, 'the');
    expect(result11).toBeTruthy();
    if (typeof result11?.node !== 'string')
      throw new Error('Expected result11 node to be a string');
    expect(result11.node).toBe(' became the father of Solomon by her who had been Uriah’s wife. ');
    expect(result11.documentLocation.jsonPath).toBe('$.content[10].content[11]');
    expect(result11.documentLocation.offset).toBe(8);
  });

  test('search with various regex patterns finds USJ details for match(es) 3.0', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // Test 1: Find all occurrences of "father" with global regex
    const fatherRegex = /father/g;
    const fatherMatches = usjDoc.search(fatherRegex);
    expect(fatherMatches.length).toBe(40);

    // Verify that all matches contain the text "father"
    fatherMatches.forEach((match) => {
      expect(match.text).toBe('father');
      expect(typeof match.start.node).toBe('string');
      expect(match.start.documentLocation.offset).toBeGreaterThanOrEqual(0);
      expect(match.start.documentLocation.jsonPath).toMatch(/^\$\.content\[\d+\]\.content\[\d+\]$/);
      expect(match.end.documentLocation.offset).toBeGreaterThanOrEqual(0);
      expect(match.end.documentLocation.jsonPath).toMatch(/^\$\.content\[\d+\]\.content\[\d+\]$/);
    });

    // Make sure the first few matches are exactly what we expect
    expect(fatherMatches[0].start.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(fatherMatches[0].start.documentLocation.offset).toBe(19);
    expect(fatherMatches[0].end.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(fatherMatches[0].end.documentLocation.offset).toBe(25);

    expect(fatherMatches[1].start.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(fatherMatches[1].start.documentLocation.offset).toBe(53);
    expect(fatherMatches[1].end.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(fatherMatches[1].end.documentLocation.offset).toBe(59);

    expect(fatherMatches[2].start.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(fatherMatches[2].start.documentLocation.offset).toBe(87);
    expect(fatherMatches[2].end.documentLocation.jsonPath).toBe('$.content[10].content[1]');
    expect(fatherMatches[2].end.documentLocation.offset).toBe(93);

    expect(fatherMatches[3].start.documentLocation.jsonPath).toBe('$.content[10].content[3]');
    expect(fatherMatches[3].start.documentLocation.offset).toBe(17);
    expect(fatherMatches[3].end.documentLocation.jsonPath).toBe('$.content[10].content[3]');
    expect(fatherMatches[3].end.documentLocation.offset).toBe(23);

    // Test 2: Find all occurrences of "became" with case-insensitive global regex
    const becameRegex = /became/gi;
    const becameMatches = usjDoc.search(becameRegex);
    expect(becameMatches.length).toBe(39);

    // Verify that all matches contain "became" (case-insensitive)
    becameMatches.forEach((match) => {
      expect(match.text.toLowerCase()).toBe('became');
      expect(typeof match.start.node).toBe('string');
      expect(match.start.documentLocation.offset).toBeGreaterThanOrEqual(0);
      expect(typeof match.end.node).toBe('string');
      expect(match.end.documentLocation.offset).toBeGreaterThanOrEqual(0);
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
      expect(typeof match.start.node).toBe('string');
      expect(typeof match.end.node).toBe('string');
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
      expect(typeof match.start.node).toBe('string');
      expect(typeof match.end.node).toBe('string');
    });

    // Test 7: Regex without global flag should only return 1 match
    const nonGlobalRegex = /father/;
    const singleMatch = usjDoc.search(nonGlobalRegex);
    expect(singleMatch.length).toBe(1);

    // Test 8: Verify ordering of matches (should be in document order)
    const davidRegex = /David/g;
    const davidMatches = usjDoc.search(davidRegex);

    // Compare JSON paths to ensure they're in document order
    const firstPath = davidMatches[0].start.documentLocation.jsonPath;
    const secondPath = davidMatches[1].start.documentLocation.jsonPath;

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
      expect(typeof match.start.node).toBe('string');
      expect(typeof match.end.node).toBe('string');
    });

    // Test 10: Search finds text within a note
    const textWithinNoteRegex = /NU omits /g;
    const noteMatches = usjDoc.search(textWithinNoteRegex);
    expect(noteMatches.length).toBeGreaterThan(0);

    // Test 11: Search finds text that spans across content nodes
    const textAcrossContent = /the father of Salmon. Salmon became the father of Boaz by Rahab/g;
    const acrossContentMatches = usjDoc.search(textAcrossContent);
    expect(acrossContentMatches.length).toBe(1);
    const acrossContentMatch = acrossContentMatches[0];
    expect(acrossContentMatch.text).toBe(
      'the father of Salmon. Salmon became the father of Boaz by Rahab',
    );
    expect(typeof acrossContentMatch.start.node).toBe('string');
    expect(acrossContentMatch.start.documentLocation.jsonPath).toBe('$.content[10].content[5]');
    expect(acrossContentMatch.start.documentLocation.offset).toBe(91);
    expect(acrossContentMatch.end.documentLocation.jsonPath).toBe('$.content[10].content[7]');
    expect(acrossContentMatch.end.documentLocation.offset).toBe(41);

    // Test 12: Search finds text at the very end of a text node and returns the same text node at
    // start and end rather than returning the next text node at the end
    const textAtEnd = / at the time of the exile to Babylon./g;
    const atEndMatches = usjDoc.search(textAtEnd);
    expect(atEndMatches.length).toBe(1);
    const atEndMatch = atEndMatches[0];
    expect(atEndMatch.text).toBe(' at the time of the exile to Babylon.');
    expect(typeof atEndMatch.start.node).toBe('string');
    expect(atEndMatch.start.documentLocation.jsonPath).toBe('$.content[10].content[21]');
    expect(atEndMatch.start.documentLocation.offset).toBe(54);
    expect(atEndMatch.end.documentLocation.jsonPath).toBe('$.content[10].content[21]');
    expect(atEndMatch.end.documentLocation.offset).toBe(91);
  });
});

describe('findAllNotes', () => {
  it('should extract multiple notes from real-life data 3.1', () => {
    const usjDoc = new UsjReaderWriter(usjMat1, usjReaderWriterOptions3_1);
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

describe('toUsfm transforms USJ 3.0 to Paratext USFM 3.0', () => {
  test('Matthew 1-2 WEB', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj, usjReaderWriterOptionsParatext3_0);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(matthew1And2Usfm);
  });

  test('Matthew 5 with Section Header WEB', () => {
    const usjDoc = new UsjReaderWriter(webMatthew5Usj, usjReaderWriterOptionsParatext3_0);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(webMatthew5Usfm);
  });

  test('2SA 1 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh1Usj, usjReaderWriterOptionsParatext3_0);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh1Usfm);
  });

  test('2SA 2 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh2Usj, usjReaderWriterOptionsParatext3_0);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh2Usfm);
  });

  // This problem is due to what TJ thinks is a bug in Paratext 9's USFM -> USX translation.
  // See https://discord.com/channels/892072317436448768/902938040362729552/1426247234621804727
  // TODO: link YouTrack case if they agree this is a bug
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('2SA 3 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh3Usj, usjReaderWriterOptionsParatext3_0);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh3Usfm);
  });

  test('2SA 3 testUSFM corrected', () => {
    const usjDoc = new UsjReaderWriter(
      testUSFM2SACh3UsjCorrected,
      usjReaderWriterOptionsParatext3_0,
    );

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh3Usfm);
  });
});

describe('toUsfm transform USJ 3.1 to spec USFM 3.1', () => {
  test('2SA 1 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh1UsjCanonical3_1, usjReaderWriterOptions3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh1UsfmCanonical3_1);
  });

  test('2SA 2 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh2UsjCanonical3_1, usjReaderWriterOptions3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh2UsfmCanonical3_1);
  });

  test('2SA 3 testUSFM', () => {
    const usjDoc = new UsjReaderWriter(testUSFM2SACh3UsjCanonical3_1, usjReaderWriterOptions3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(testUSFM2SACh3UsfmCanonical3_1);
  });

  test('Generated refs', () => {
    const usjDoc = new UsjReaderWriter(exampleGeneratedRefsUsj, usjReaderWriterOptions3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(exampleGeneratedRefsUsfm);
  });

  test('Provided refs', () => {
    const usjDoc = new UsjReaderWriter(exampleProvidedRefsUsj, usjReaderWriterOptions3_1);

    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(exampleProvidedRefsUsfm);
  });
});
