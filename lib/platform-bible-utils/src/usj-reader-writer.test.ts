import { Usj } from '@biblionexus-foundation/scripture-utilities';
import { VerseRef } from '@sillsdev/scripture';
import UsjReaderWriter from './usj-reader-writer';

const usj: Usj = JSON.parse(`{
  "type": "USJ",
  "version": "0.2.0",
  "content": [
    {
      "type": "book",
      "marker": "id",
      "content": [
        "40-MAT-web.sfm World English Bible (WEB)"
      ],
      "code": "MAT"
    },
    {
      "type": "para",
      "marker": "ide",
      "content": [
        "UTF-8"
      ]
    },
    {
      "type": "para",
      "marker": "h",
      "content": [
        "Matthew"
      ]
    },
    {
      "type": "para",
      "marker": "toc1",
      "content": [
        "The Good News According to Matthew"
      ]
    },
    {
      "type": "para",
      "marker": "toc2",
      "content": [
        "Matthew"
      ]
    },
    {
      "type": "para",
      "marker": "toc3",
      "content": [
        "Matthew"
      ]
    },
    {
      "type": "para",
      "marker": "mt2",
      "content": [
        "The Good News According to"
      ]
    },
    {
      "type": "para",
      "marker": "mt1",
      "content": [
        "Matthew"
      ]
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "1",
      "sid": "MAT 1"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1",
          "sid": "MAT 1:1"
        },
        "The book of the genealogy of Jesus Christ,",
        {
          "type": "note",
          "marker": "f",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "content": [
                "1:1"
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "content": [
                "Messiah (Hebrew) and Christ (Greek) both mean “Anointed One”"
              ]
            }
          ],
          "caller": "+"
        },
        "the son of David, the son of Abraham."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "2",
          "sid": "MAT 1:2"
        },
        "Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers.",
        {
          "type": "verse",
          "marker": "v",
          "number": "3",
          "sid": "MAT 1:3"
        },
        "Judah became the father of Perez and Zerah by Tamar. Perez became the father of Hezron. Hezron became the father of Ram.",
        {
          "type": "verse",
          "marker": "v",
          "number": "4",
          "sid": "MAT 1:4"
        },
        "Ram became the father of Amminadab. Amminadab became the father of Nahshon. Nahshon became the father of Salmon.",
        {
          "type": "verse",
          "marker": "v",
          "number": "5",
          "sid": "MAT 1:5"
        },
        "Salmon became the father of Boaz by Rahab. Boaz became the father of Obed by Ruth. Obed became the father of Jesse.",
        {
          "type": "verse",
          "marker": "v",
          "number": "6",
          "sid": "MAT 1:6"
        },
        "Jesse became the father of King David. David the king",
        {
          "type": "note",
          "marker": "f",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "content": [
                "1:6"
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "content": [
                "NU omits “the king”."
              ]
            }
          ],
          "caller": "+"
        },
        "became the father of Solomon by her who had been Uriah’s wife.",
        {
          "type": "verse",
          "marker": "v",
          "number": "7",
          "sid": "MAT 1:7"
        },
        "Solomon became the father of Rehoboam. Rehoboam became the father of Abijah. Abijah became the father of Asa.",
        {
          "type": "verse",
          "marker": "v",
          "number": "8",
          "sid": "MAT 1:8"
        },
        "Asa became the father of Jehoshaphat. Jehoshaphat became the father of Joram. Joram became the father of Uzziah.",
        {
          "type": "verse",
          "marker": "v",
          "number": "9",
          "sid": "MAT 1:9"
        },
        "Uzziah became the father of Jotham. Jotham became the father of Ahaz. Ahaz became the father of Hezekiah.",
        {
          "type": "verse",
          "marker": "v",
          "number": "10",
          "sid": "MAT 1:10"
        },
        "Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah.",
        {
          "type": "verse",
          "marker": "v",
          "number": "11",
          "sid": "MAT 1:11"
        },
        "Josiah became the father of Jechoniah and his brothers at the time of the exile to Babylon."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "12",
          "sid": "MAT 1:12"
        },
        "After the exile to Babylon, Jechoniah became the father of Shealtiel. Shealtiel became the father of Zerubbabel.",
        {
          "type": "verse",
          "marker": "v",
          "number": "13",
          "sid": "MAT 1:13"
        },
        "Zerubbabel became the father of Abiud. Abiud became the father of Eliakim. Eliakim became the father of Azor.",
        {
          "type": "verse",
          "marker": "v",
          "number": "14",
          "sid": "MAT 1:14"
        },
        "Azor became the father of Zadok. Zadok became the father of Achim. Achim became the father of Eliud.",
        {
          "type": "verse",
          "marker": "v",
          "number": "15",
          "sid": "MAT 1:15"
        },
        "Eliud became the father of Eleazar. Eleazar became the father of Matthan. Matthan became the father of Jacob.",
        {
          "type": "verse",
          "marker": "v",
          "number": "16",
          "sid": "MAT 1:16"
        },
        "Jacob became the father of Joseph, the husband of Mary, from whom was born Jesus,",
        {
          "type": "note",
          "marker": "f",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "content": [
                "1:16"
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "content": [
                "“Jesus” means “Salvation”."
              ]
            }
          ],
          "caller": "+"
        },
        "who is called Christ."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "17",
          "sid": "MAT 1:17"
        },
        "So all the generations from Abraham to David are fourteen generations; from David to the exile to Babylon fourteen generations; and from the carrying away to Babylon to the Christ, fourteen generations."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "18",
          "sid": "MAT 1:18"
        },
        "Now the birth of Jesus Christ was like this: After his mother, Mary, was engaged to Joseph, before they came together, she was found pregnant by the Holy Spirit.",
        {
          "type": "verse",
          "marker": "v",
          "number": "19",
          "sid": "MAT 1:19"
        },
        "Joseph, her husband, being a righteous man, and not willing to make her a public example, intended to put her away secretly.",
        {
          "type": "verse",
          "marker": "v",
          "number": "20",
          "sid": "MAT 1:20"
        },
        "But when he thought about these things, behold,",
        {
          "type": "note",
          "marker": "f",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "content": [
                "1:20"
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "content": [
                "“Behold”, from “ἰδοὺ”, means look at, take notice, observe, see, or gaze at. It is often used as an interjection."
              ]
            }
          ],
          "caller": "+"
        },
        "an angel of the Lord appeared to him in a dream, saying, “Joseph, son of David, don’t be afraid to take to yourself Mary as your wife, for that which is conceived in her is of the Holy Spirit.",
        {
          "type": "verse",
          "marker": "v",
          "number": "21",
          "sid": "MAT 1:21"
        },
        "She shall give birth to a son. You shall name him Jesus,",
        {
          "type": "note",
          "marker": "f",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "content": [
                "1:21"
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "content": [
                "“Jesus” means “Salvation”."
              ]
            }
          ],
          "caller": "+"
        },
        "for it is he who shall save his people from their sins.”"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "22",
          "sid": "MAT 1:22"
        },
        "Now all this has happened that it might be fulfilled which was spoken by the Lord through the prophet, saying,"
      ]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "23",
          "sid": "MAT 1:23"
        },
        "“Behold, the virgin shall be with child,"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "and shall give birth to a son."
      ]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": [
        "They shall call his name Immanuel,”"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "which is, being interpreted, “God with us.”",
        {
          "type": "note",
          "marker": "x",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "content": [
                "1:23"
              ]
            },
            {
              "type": "char",
              "marker": "xt",
              "content": [
                "Isaiah 7:14"
              ]
            }
          ],
          "caller": "+"
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "24",
          "sid": "MAT 1:24"
        },
        "Joseph arose from his sleep, and did as the angel of the Lord commanded him, and took his wife to himself;",
        {
          "type": "verse",
          "marker": "v",
          "number": "25",
          "sid": "MAT 1:25"
        },
        "and didn’t know her sexually until she had given birth to her firstborn son. He named him Jesus."
      ]
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "2",
      "sid": "MAT 2"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1",
          "sid": "MAT 2:1"
        },
        "Now when Jesus was born in Bethlehem of Judea in the days of King Herod, behold, wise men",
        {
          "type": "note",
          "marker": "f",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "content": [
                "2:1"
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "content": [
                "The word for “wise men” (magoi) can also mean teachers, scientists, physicians, astrologers, seers, interpreters of dreams, or sorcerers."
              ]
            }
          ],
          "caller": "+"
        },
        "from the east came to Jerusalem, saying,",
        {
          "type": "verse",
          "marker": "v",
          "number": "2",
          "sid": "MAT 2:2"
        },
        "“Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.”",
        {
          "type": "verse",
          "marker": "v",
          "number": "3",
          "sid": "MAT 2:3"
        },
        "When King Herod heard it, he was troubled, and all Jerusalem with him.",
        {
          "type": "verse",
          "marker": "v",
          "number": "4",
          "sid": "MAT 2:4"
        },
        "Gathering together all the chief priests and scribes of the people, he asked them where the Christ would be born.",
        {
          "type": "verse",
          "marker": "v",
          "number": "5",
          "sid": "MAT 2:5"
        },
        "They said to him, “In Bethlehem of Judea, for this is written through the prophet,"
      ]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "6",
          "sid": "MAT 2:6"
        },
        "‘You Bethlehem, land of Judah,"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "are in no way least among the princes of Judah;"
      ]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": [
        "for out of you shall come a governor"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "who shall shepherd my people, Israel.’”",
        {
          "type": "note",
          "marker": "x",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "content": [
                "2:6"
              ]
            },
            {
              "type": "char",
              "marker": "xt",
              "content": [
                "Micah 5:2"
              ]
            }
          ],
          "caller": "+"
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "7",
          "sid": "MAT 2:7"
        },
        "Then Herod secretly called the wise men, and learned from them exactly what time the star appeared.",
        {
          "type": "verse",
          "marker": "v",
          "number": "8",
          "sid": "MAT 2:8"
        },
        "He sent them to Bethlehem, and said, “Go and search diligently for the young child. When you have found him, bring me word, so that I also may come and worship him.”"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "9",
          "sid": "MAT 2:9"
        },
        "They, having heard the king, went their way; and behold, the star, which they saw in the east, went before them until it came and stood over where the young child was.",
        {
          "type": "verse",
          "marker": "v",
          "number": "10",
          "sid": "MAT 2:10"
        },
        "When they saw the star, they rejoiced with exceedingly great joy.",
        {
          "type": "verse",
          "marker": "v",
          "number": "11",
          "sid": "MAT 2:11"
        },
        "They came into the house and saw the young child with Mary, his mother, and they fell down and worshiped him. Opening their treasures, they offered to him gifts: gold, frankincense, and myrrh.",
        {
          "type": "verse",
          "marker": "v",
          "number": "12",
          "sid": "MAT 2:12"
        },
        "Being warned in a dream not to return to Herod, they went back to their own country another way."
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
          "sid": "MAT 2:13"
        },
        "Now when they had departed, behold, an angel of the Lord appeared to Joseph in a dream, saying, “Arise and take the young child and his mother, and flee into Egypt, and stay there until I tell you, for Herod will seek the young child to destroy him.”"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "14",
          "sid": "MAT 2:14"
        },
        "He arose and took the young child and his mother by night and departed into Egypt,",
        {
          "type": "verse",
          "marker": "v",
          "number": "15",
          "sid": "MAT 2:15"
        },
        "and was there until the death of Herod, that it might be fulfilled which was spoken by the Lord through the prophet, saying, “Out of Egypt I called my son.”",
        {
          "type": "note",
          "marker": "x",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "content": [
                "2:15"
              ]
            },
            {
              "type": "char",
              "marker": "xt",
              "content": [
                "Hosea 11:1"
              ]
            }
          ],
          "caller": "+"
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "16",
          "sid": "MAT 2:16"
        },
        "Then Herod, when he saw that he was mocked by the wise men, was exceedingly angry, and sent out and killed all the male children who were in Bethlehem and in all the surrounding countryside, from two years old and under, according to the exact time which he had learned from the wise men.",
        {
          "type": "verse",
          "marker": "v",
          "number": "17",
          "sid": "MAT 2:17"
        },
        "Then that which was spoken by Jeremiah the prophet was fulfilled, saying,"
      ]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "18",
          "sid": "MAT 2:18"
        },
        "“A voice was heard in Ramah,"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "lamentation, weeping and great mourning,"
      ]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": [
        "Rachel weeping for her children;"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "she wouldn’t be comforted,"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "because they are no more.”",
        {
          "type": "note",
          "marker": "x",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "content": [
                "2:18"
              ]
            },
            {
              "type": "char",
              "marker": "xt",
              "content": [
                "Jeremiah 31:15"
              ]
            }
          ],
          "caller": "+"
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "19",
          "sid": "MAT 2:19"
        },
        "But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying,",
        {
          "type": "verse",
          "marker": "v",
          "number": "20",
          "sid": "MAT 2:20"
        },
        "“Arise and take the young child and his mother, and go into the land of Israel, for those who sought the young child’s life are dead.”"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "21",
          "sid": "MAT 2:21"
        },
        "He arose and took the young child and his mother, and came into the land of Israel.",
        {
          "type": "verse",
          "marker": "v",
          "number": "22",
          "sid": "MAT 2:22"
        },
        "But when he heard that Archelaus was reigning over Judea in the place of his father, Herod, he was afraid to go there. Being warned in a dream, he withdrew into the region of Galilee,",
        {
          "type": "verse",
          "marker": "v",
          "number": "23",
          "sid": "MAT 2:23"
        },
        "and came and lived in a city called Nazareth; that it might be fulfilled which was spoken through the prophets that he will be called a Nazarene."
      ]
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "3",
      "sid": "MAT 3"
    }
  ]
}`);

test('Correct VerseRefs and offsets are found using findVerseRefAndOffset', () => {
  const usjDoc = new UsjReaderWriter(usj);
  const expectedResults = [
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
    usjDoc.jsonPathToVerseRefAndOffset('$.type');
  }).toThrow('Could not determine chapter number for "USJ"');

  expect(() => {
    new UsjReaderWriter({ type: 'USJ', version: '0.2.1', content: [] }).jsonPathToVerseRefAndOffset(
      '',
    );
  }).toThrow('Not able to determine the book ID');
});

test('Correct USJ details are found using findUsjContentAndJsonPath', () => {
  const usjDoc = new UsjReaderWriter(usj);

  const result0 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 1:0'), 0);
  expect(typeof result0.node).toBe('object');
  if (typeof result0.node !== 'object') return;
  expect(result0.node.type).toBe('chapter');
  expect(result0.node.number).toBe('1');
  expect(result0.jsonPath).toBe('$.content[8]');
  expect(result0.offset).toBe(0);

  const result1 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 1:2'), 0);
  expect(typeof result1.node).toBe('object');
  if (typeof result1.node !== 'object') return;
  expect(result1.node.type).toBe('verse');
  expect(result1.node.number).toBe('2');
  expect(result1.jsonPath).toBe('$.content[10].content[0]');
  expect(result1.offset).toBe(0);

  const result2 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 1:6'), 3);
  expect(typeof result2.node).toBe('string');
  if (typeof result2.node !== 'string') return;
  expect(result2.node === 'Jesse became the father of King David. David the king').toBe(true);
  expect(result2.jsonPath).toBe('$.content[10].content[9]');
  expect(result2.offset).toBe(3);

  const result3 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 1:6'), 60);
  expect(typeof result3.node).toBe('string');
  if (typeof result3.node !== 'string') return;
  expect(result3.node === 'became the father of Solomon by her who had been Uriah’s wife.').toBe(
    true,
  );
  expect(result3.jsonPath).toBe('$.content[10].content[11]');
  expect(result3.offset).toBe(7);

  const result4 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 2:6'), 130);
  expect(typeof result4.node).toBe('string');
  if (typeof result4.node !== 'string') return;
  expect(result4.node === 'who shall shepherd my people, Israel.’”').toBe(true);
  expect(result4.jsonPath).toBe('$.content[25].content[0]');
  expect(result4.offset).toBe(17);

  const result5 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 2:6'), 9999999);
  expect(typeof result5.node).toBe('object');
  if (typeof result5.node !== 'object') return;
  expect(result5.node.type).toBe('verse');
  expect(result5.node.number).toBe('6');
  expect(result5.jsonPath).toBe('$.content[22].content[0]');
  expect(result5.offset).toBe(0);

  expect(() => {
    usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 99:1'), 0);
  }).toThrow('Could not find MAT chapter 99');

  expect(() => {
    usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 1:99'), 0);
  }).toThrow('Verse 99 not found in MAT 1');

  expect(() => {
    usjDoc.verseRefToUsjContentLocation(new VerseRef('JHN 1:1'), 0);
  }).toThrow(`Book IDs don't match: USJ=MAT, VerseRef=JHN`);

  expect(() => {
    new UsjReaderWriter({
      type: 'USJ',
      version: '0.2.1',
      content: [],
    }).verseRefToUsjContentLocation(new VerseRef('JHN 1:1'), 0);
  }).toThrow('Could not find JHN chapter 1');
});

test('Correct USJ details are found using findNextLocationOfMatchingText', () => {
  const usjDoc = new UsjReaderWriter(usj);

  // Start from a verse node
  const startingPoint1 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 1:2'), 0);
  expect(typeof startingPoint1.node).toBe('object');
  if (typeof startingPoint1.node !== 'object') return;
  expect(startingPoint1.jsonPath).toBe('$.content[10].content[0]');
  expect(startingPoint1.offset).toBe(0);

  const result1 = usjDoc.findNextLocationOfMatchingText(startingPoint1, 'the father of Manasseh');
  expect(result1).toBeTruthy();
  expect(typeof result1?.node).toBe('string');
  if (typeof result1?.node !== 'string') return;
  expect(result1.node).toBe(
    'Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah.',
  );
  expect(result1.jsonPath).toBe('$.content[10].content[19]');
  expect(result1.offset).toBe(16);

  // Start from a string
  const startingPoint2 = usjDoc.verseRefToUsjContentLocation(new VerseRef('MAT 1:6'), 3);
  expect(typeof startingPoint2.node).toBe('string');
  if (typeof startingPoint2.node !== 'string') return;
  expect(startingPoint2.jsonPath).toBe('$.content[10].content[9]');
  expect(startingPoint2.offset).toBe(3);

  const result2 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'the father of Manasseh');
  expect(result2).toBeTruthy();
  expect(typeof result2?.node).toBe('string');
  if (typeof result2?.node !== 'string') return;
  expect(result2.node).toBe(
    'Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah.',
  );
  expect(result2.jsonPath).toBe('$.content[10].content[19]');
  expect(result2.offset).toBe(16);

  // Only allow scanning ahead 1 more character
  const result3 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'the father of Manasse', 1);
  expect(result3).toBeFalsy();

  const result4 = usjDoc.findNextLocationOfMatchingText(startingPoint2, 'Josiah became');
  expect(result4).toBeTruthy();
  expect(typeof result4?.node).toBe('string');
  if (typeof result4?.node !== 'string') return;
  expect(result4.node).toBe(
    'Josiah became the father of Jechoniah and his brothers at the time of the exile to Babylon.',
  );
  expect(result4.jsonPath).toBe('$.content[10].content[21]');
  expect(result4.offset).toBe(0);
});
