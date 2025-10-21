import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { LocationUsfmAndUsj } from './test-data.model';

/** USFM and USJ location data for testUSFM 2SA 1-2. Used in tests in `usj-reader-writer.test.ts */
export const testUSFM2SaCh1Locations: LocationUsfmAndUsj[] = [
  // First example of the beginning of a marker (the backslash `\`)
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 0,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: '$.content[0]',
      },
    },
  },
  // First example of the beginning of the opening marker name (`id`)
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 1,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: "$.content[0]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 2,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: "$.content[0]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 3,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: "$.content[0]['marker']",
        propertyOffset: 2,
      },
    },
  },
  // First example of a leading attribute e.g. `\id 2SA Stuff` - `2SA` is `code`. `Stuff` is just text content
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 4,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: "$.content[0]['code']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 5,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: "$.content[0]['code']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 6,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: "$.content[0]['code']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 7,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: '2SA',
      },
      documentLocation: {
        jsonPath: "$.content[0]['code']",
        propertyOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 8,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 9,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 10,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 11,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 12,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 4,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 13,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 5,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 14,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 6,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 15,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 7,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 16,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 8,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 17,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 9,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 18,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 10,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 19,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 11,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 20,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 12,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 21,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 13,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 22,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 14,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 23,
    },
    usjContent: {
      node: '- TJs USFM Test',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 15,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 24,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'toc3',
      },
      documentLocation: {
        jsonPath: '$.content[1]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 25,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'toc3',
      },
      documentLocation: {
        jsonPath: "$.content[1]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 26,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'toc3',
      },
      documentLocation: {
        jsonPath: "$.content[1]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 27,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'toc3',
      },
      documentLocation: {
        jsonPath: "$.content[1]['marker']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 28,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'toc3',
      },
      documentLocation: {
        jsonPath: "$.content[1]['marker']",
        propertyOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 29,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'toc3',
      },
      documentLocation: {
        jsonPath: "$.content[1]['marker']",
        propertyOffset: 4,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 30,
    },
    usjContent: {
      node: '2Sam',
      documentLocation: {
        jsonPath: '$.content[1].content[0]',
        offset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 31,
    },
    usjContent: {
      node: '2Sam',
      documentLocation: {
        jsonPath: '$.content[1].content[0]',
        offset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 32,
    },
    usjContent: {
      node: '2Sam',
      documentLocation: {
        jsonPath: '$.content[1].content[0]',
        offset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 33,
    },
    usjContent: {
      node: '2Sam',
      documentLocation: {
        jsonPath: '$.content[1].content[0]',
        offset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 34,
    },
    usjContent: {
      node: '2Sam',
      documentLocation: {
        jsonPath: '$.content[1].content[0]',
        offset: 4,
      },
    },
  },
  // Skip to chapter 1 marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 62,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 63,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 64,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 65,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['number']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 66,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['number']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 67,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['number']",
        propertyOffset: 2,
      },
    },
  },
  // begin altnumber - first example of an attribute marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 68,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 69,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 70,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 71,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 72,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['altnumber']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 73,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['altnumber']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 74,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['altnumber']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 75,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['altnumber']",
        propertyOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 76,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyClosingMarkerOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 77,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyClosingMarkerOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 78,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyClosingMarkerOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 79,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyClosingMarkerOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 80,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'altnumber',
        keyClosingMarkerOffset: 4,
      },
    },
  },
  // Finished altnumber. Now to next attribute marker pubnumber
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 81,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'pubnumber',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 82,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'pubnumber',
        keyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 83,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'pubnumber',
        keyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 84,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: '$.content[4]',
        keyName: 'pubnumber',
        keyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 85,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['pubnumber']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 86,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['pubnumber']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 87,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['pubnumber']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 88,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['pubnumber']",
        propertyOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 89,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
        altnumber: '1 ca',
        pubnumber: '1 cp',
        sid: '2SA 1',
      },
      documentLocation: {
        jsonPath: "$.content[4]['pubnumber']",
        propertyOffset: 4,
      },
    },
  },
  // Finished pubnumber. Continue with normal markers again
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 90,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 's1',
      },
      documentLocation: {
        jsonPath: '$.content[5]',
      },
    },
  },
  // Skip to end of para before verse 1
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 0 },
      offset: 196,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'p',
      },
      documentLocation: {
        jsonPath: "$.content[6]['marker']",
        propertyOffset: 1,
      },
    },
  },
  // First example of a verse marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 0,
    },
    usjContent: {
      node: {
        type: 'verse',
        marker: 'v',
        number: '1',
        sid: '2SA 1:1',
      },
      documentLocation: {
        jsonPath: '$.content[6].content[0]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 1,
    },
    usjContent: {
      node: {
        type: 'verse',
        marker: 'v',
        number: '1',
        sid: '2SA 1:1',
      },
      documentLocation: {
        jsonPath: "$.content[6].content[0]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 2,
    },
    usjContent: {
      node: {
        type: 'verse',
        marker: 'v',
        number: '1',
        sid: '2SA 1:1',
      },
      documentLocation: {
        jsonPath: "$.content[6].content[0]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 3,
    },
    usjContent: {
      node: {
        type: 'verse',
        marker: 'v',
        number: '1',
        sid: '2SA 1:1',
      },
      documentLocation: {
        jsonPath: "$.content[6].content[0]['number']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 4,
    },
    usjContent: {
      node: {
        type: 'verse',
        marker: 'v',
        number: '1',
        sid: '2SA 1:1',
      },
      documentLocation: {
        jsonPath: "$.content[6].content[0]['number']",
        propertyOffset: 1,
      },
    },
  },
  // First example of an unclosed character marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 5,
    },
    usjContent: {
      // closed isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'bd',
        closed: 'false',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[6].content[1]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 6,
    },
    usjContent: {
      // closed isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'bd',
        closed: 'false',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[6].content[1]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 7,
    },
    usjContent: {
      // closed isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'bd',
        closed: 'false',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[6].content[1]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 8,
    },
    usjContent: {
      // closed isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'bd',
        closed: 'false',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[6].content[1]['marker']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 1 },
      offset: 9,
    },
    usjContent: {
      node: 'usfm marker',
      documentLocation: {
        jsonPath: '$.content[6].content[1].content[0]',
        offset: 0,
      },
    },
  },
  // Skip to footnote
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 2 },
      offset: 160,
    },
    usjContent: {
      node: {
        type: 'note',
        marker: 'f',
        caller: '+',
        category: 'things',
      },
      documentLocation: {
        jsonPath: '$.content[10].content[1]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 2 },
      offset: 161,
    },
    usjContent: {
      node: {
        type: 'note',
        marker: 'f',
        caller: '+',
        category: 'things',
      },
      documentLocation: {
        jsonPath: "$.content[10].content[1]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 2 },
      offset: 162,
    },
    usjContent: {
      node: {
        type: 'note',
        marker: 'f',
        caller: '+',
        category: 'things',
      },
      documentLocation: {
        jsonPath: "$.content[10].content[1]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 2 },
      offset: 163,
    },
    usjContent: {
      node: {
        type: 'note',
        marker: 'f',
        caller: '+',
        category: 'things',
      },
      documentLocation: {
        jsonPath: "$.content[10].content[1]['caller']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 2 },
      offset: 164,
    },
    usjContent: {
      node: {
        type: 'note',
        marker: 'f',
        caller: '+',
        category: 'things',
      },
      documentLocation: {
        jsonPath: "$.content[10].content[1]['caller']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 2 },
      offset: 165,
    },
    usjContent: {
      node: {
        type: 'note',
        marker: 'f',
        caller: '+',
        category: 'things',
      },
      documentLocation: {
        jsonPath: '$.content[10].content[1]',
        keyName: 'category',
      },
    },
  },
  // Skip to first example of closed character marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 33,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: '$.content[16].content[1]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 34,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: "$.content[16].content[1]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 35,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: "$.content[16].content[1]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 36,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: "$.content[16].content[1]['marker']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 37,
    },
    usjContent: {
      node: 'si',
      documentLocation: {
        jsonPath: '$.content[16].content[1].content[0]',
        offset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 38,
    },
    usjContent: {
      node: 'si',
      documentLocation: {
        jsonPath: '$.content[16].content[1].content[0]',
        offset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 39,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: '$.content[16].content[1]',
        closingMarkerOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 40,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: '$.content[16].content[1]',
        closingMarkerOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 41,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: '$.content[16].content[1]',
        closingMarkerOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 42,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'wj',
      },
      documentLocation: {
        jsonPath: '$.content[16].content[1]',
        closingMarkerOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 43,
    },
    usjContent: {
      node: 'de, ',
      documentLocation: {
        jsonPath: '$.content[16].content[2]',
        offset: 0,
      },
    },
  },
  // Skip to first example of marker with default attribute
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 156,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        lemma: 'stuff',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[18].content[1]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 157,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        lemma: 'stuff',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[18].content[1]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 158,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        lemma: 'stuff',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[18].content[1]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 159,
    },
    usjContent: {
      node: 'marker',
      documentLocation: {
        jsonPath: '$.content[18].content[1].content[0]',
        offset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 160,
    },
    usjContent: {
      node: 'marker',
      documentLocation: {
        jsonPath: '$.content[18].content[1].content[0]',
        offset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 161,
    },
    usjContent: {
      node: 'marker',
      documentLocation: {
        jsonPath: '$.content[18].content[1].content[0]',
        offset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 162,
    },
    usjContent: {
      node: 'marker',
      documentLocation: {
        jsonPath: '$.content[18].content[1].content[0]',
        offset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 163,
    },
    usjContent: {
      node: 'marker',
      documentLocation: {
        jsonPath: '$.content[18].content[1].content[0]',
        offset: 4,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 164,
    },
    usjContent: {
      node: 'marker',
      documentLocation: {
        jsonPath: '$.content[18].content[1].content[0]',
        offset: 5,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 165,
    },
    usjContent: {
      node: 'marker',
      documentLocation: {
        jsonPath: '$.content[18].content[1].content[0]',
        offset: 6,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 166,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        lemma: 'stuff',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[18].content[1]['lemma']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 167,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        lemma: 'stuff',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[18].content[1]['lemma']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 168,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        lemma: 'stuff',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[18].content[1]['lemma']",
        propertyOffset: 2,
      },
    },
  },
  // Skip to first example of non-default closing marker attribute
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 532,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 533,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 534,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 535,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 536,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 4,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 537,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 5,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 538,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 6,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 539,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[20].content[1]',
        keyName: 'strong',
        keyOffset: 7,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 540,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[20].content[1]['strong']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 541,
    },
    usjContent: {
      // lemma isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'w',
        strong: 'H1234,G1234',
        lemma: 'markerLemma',
        srcloc: 'Location',
      } as MarkerObject,
      documentLocation: {
        jsonPath: "$.content[20].content[1]['strong']",
        propertyOffset: 1,
      },
    },
  },
  // Skip to first example of nested marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 2513,
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
  },
  // Notice how the USFM offset for the + prefix for the nested character marker goes to the same
  // location in USJ because there actually is no specification for how to represent this location
  // in USJ
  {
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
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 3 },
      offset: 2515,
    },
    usjContent: {
      node: {
        type: 'char',
        marker: 'nd',
      },
      documentLocation: {
        jsonPath: "$.content[34].content[1].content[1]['marker']",
        propertyOffset: 0,
      },
    },
  },
  // Skip to first example of custom attribute on closing marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 8 },
      offset: 56,
    },
    usjContent: {
      // custom attributes can't be listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'char',
        marker: 'wj',
        'x-custom-attribute-1': 'Stuff',
        'z-custom-attribute-2': 'Things',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[65].content[1]',
        keyName: 'x-custom-attribute-1',
        keyOffset: 0,
      },
    },
  },
  // Skip to first example of optbreak
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 16 },
      offset: 121,
    },
    usjContent: {
      node: {
        type: 'optbreak',
      },
      documentLocation: {
        jsonPath: '$.content[85].content[1]',
      },
    },
  },
  // Notice how the USFM offset for the second slash in optbreak goes to the same location in USJ
  // because there actually is no specification for how to represent this location in USJ
  {
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
  },
  // Skip to first example of closed sidebar
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 370,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 371,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: "$.content[140]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 372,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: "$.content[140]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 373,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: "$.content[140]['marker']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 374,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: "$.content[140]['marker']",
        propertyOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 375,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        keyName: 'category',
      },
    },
  },
  // Skip to last character of `\cat*` closing attribute marker
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 398,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        keyName: 'category',
        keyClosingMarkerOffset: 5,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 399,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'p',
      },
      documentLocation: {
        jsonPath: '$.content[140].content[0]',
      },
    },
  },
  // Skip to second to last character before first example of closing marker for sidebar
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 636,
    },
    usjContent: {
      node: 'This is a second paragraph in the sidebar. The sidebar will end at esbe marker.',
      documentLocation: {
        jsonPath: '$.content[140].content[1].content[0]',
        offset: 78,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 637,
    },
    usjContent: {
      node: 'This is a second paragraph in the sidebar. The sidebar will end at esbe marker.',
      documentLocation: {
        jsonPath: '$.content[140].content[1].content[0]',
        offset: 79,
      },
    },
  },
  // First example of closing marker for sidebar
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 638,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        closingMarkerOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 639,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        closingMarkerOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 640,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        closingMarkerOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 641,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        closingMarkerOffset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 642,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        closingMarkerOffset: 4,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 643,
    },
    usjContent: {
      node: {
        type: 'sidebar',
        marker: 'esb',
        category: 'Test Category',
      },
      documentLocation: {
        jsonPath: '$.content[140]',
        closingMarkerOffset: 5,
      },
    },
  },
  // Skip to first example of a non-closed sidebar
  {
    usfmLocation: {
      verseRef: { book: '2SA', chapterNum: 1, verseNum: 26 },
      offset: 826,
    },
    usjContent: {
      // closed isn't listed in MarkerObject. Not loose enough types
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      node: {
        type: 'sidebar',
        marker: 'esb',
        closed: 'false',
      } as MarkerObject,
      documentLocation: {
        jsonPath: '$.content[142]',
      },
    },
  },
];
