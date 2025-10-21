import { LocationUsfmAndUsj } from './test-data.model';

/** USFM and USJ location data for WEB Matthew 1-2. Used in tests in `usj-reader-writer.test.ts */
export const matthew1And2Locations: LocationUsfmAndUsj[] = [
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 0,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: 'MAT',
      },
      documentLocation: {
        jsonPath: '$.content[0]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 1,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: 'MAT',
      },
      documentLocation: {
        jsonPath: "$.content[0]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 2,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: 'MAT',
      },
      documentLocation: {
        jsonPath: "$.content[0]['marker']",
        propertyOffset: 1,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 3,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: 'MAT',
      },
      documentLocation: {
        jsonPath: "$.content[0]['marker']",
        propertyOffset: 2,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 4,
    },
    usjContent: {
      node: {
        type: 'book',
        marker: 'id',
        code: 'MAT',
      },
      documentLocation: {
        jsonPath: "$.content[0]['code']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 8,
    },
    usjContent: {
      node: '40-MAT-web.sfm World English Bible (WEB)',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 12,
    },
    usjContent: {
      node: '40-MAT-web.sfm World English Bible (WEB)',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 4,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 48,
    },
    usjContent: {
      node: '40-MAT-web.sfm World English Bible (WEB)',
      documentLocation: {
        jsonPath: '$.content[0].content[0]',
        offset: 40,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 49,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'ide',
      },
      documentLocation: {
        jsonPath: '$.content[1]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 50,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'ide',
      },
      documentLocation: {
        jsonPath: "$.content[1]['marker']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 54,
    },
    usjContent: {
      node: 'UTF-8',
      documentLocation: {
        jsonPath: '$.content[1].content[0]',
        offset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 71,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'toc1',
      },
      documentLocation: {
        jsonPath: '$.content[3]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 185,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
      },
      documentLocation: {
        jsonPath: '$.content[8]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 0 },
      offset: 188,
    },
    usjContent: {
      node: {
        type: 'chapter',
        marker: 'c',
        number: '1',
      },
      documentLocation: {
        jsonPath: "$.content[8]['number']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 },
      offset: 50,
    },
    usjContent: {
      node: {
        type: 'note',
        marker: 'f',
        caller: '+',
      },
      documentLocation: {
        jsonPath: "$.content[9].content[2]['caller']",
        propertyOffset: 0,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 },
      offset: 0,
    },
    usjContent: {
      node: {
        type: 'verse',
        marker: 'v',
        number: '2',
      },
      documentLocation: {
        jsonPath: '$.content[10].content[0]',
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 6 },
      offset: 8,
    },
    usjContent: {
      node: 'Jesse became the father of King David. David the king',
      documentLocation: {
        jsonPath: '$.content[10].content[9]',
        offset: 3,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 1, verseNum: 6 },
      offset: 105,
    },
    usjContent: {
      node: ' became the father of Solomon by her who had been Uriah’s wife. ',
      documentLocation: {
        jsonPath: '$.content[10].content[11]',
        offset: 7,
      },
    },
  },
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 2, verseNum: 6 },
      offset: 150,
    },
    usjContent: {
      node: 'who shall shepherd my people, Israel.’”',
      documentLocation: {
        jsonPath: '$.content[25].content[0]',
        offset: 17,
      },
    },
  },
  // For now, requesting beyond the last fragment in a verse just offsets from the last verse in
  // that verse content. This is not particularly designed to be this way; can change if desired
  {
    usfmLocation: {
      verseRef: { book: 'MAT', chapterNum: 2, verseNum: 6 },
      offset: 9999999,
    },
    usjContent: {
      node: {
        type: 'para',
        marker: 'p',
      },
      documentLocation: {
        jsonPath: "$.content[26]['marker']",
        propertyOffset: 9999796,
      },
    },
  },
];
