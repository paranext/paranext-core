/* eslint-disable no-useless-escape, no-irregular-whitespace */
// Need to disable no-useless-escape because there are some useless escapes in the raw USFM and USJ
// data, and it's better to do fewer manual edits.
// Need to disable no-irregular-whitespace because the test data includes irregular whitespace that
// we are testing on purpose.
import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import { UsjReaderWriter } from './usj-reader-writer';
import { usjMat1 } from './footnote-util-test.usj.data';
import { USFM_MARKERS_MAP } from './markers-map-3.1.model';

/**
 * WEB Matthew 1-2 in USFM. (When copied from the file, had to replace `\` with `\\`)
 *
 * Also includes the chapter marker for chapter 3 but no contents of chapter 3.
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const matthew1And2Usfm = `\\id MAT 40-MAT-web.sfm World English Bible (WEB)
\\ide UTF-8
\\h Matthew
\\toc1 The Good News According to Matthew
\\toc2 Matthew
\\toc3 Matthew
\\mt2 The Good News According to
\\mt1 Matthew
\\c 1
\\p
\\v 1 The book of the genealogy of Jesus Christ,\\f + \\fr 1:1 \\ft Messiah (Hebrew) and Christ (Greek) both mean “Anointed One”\\f* the son of David, the son of Abraham.
\\p
\\v 2 Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers.
\\v 3 Judah became the father of Perez and Zerah by Tamar. Perez became the father of Hezron. Hezron became the father of Ram.
\\v 4 Ram became the father of Amminadab. Amminadab became the father of Nahshon. Nahshon became the father of Salmon.
\\v 5 Salmon became the father of Boaz by Rahab. Boaz became the father of Obed by Ruth. Obed became the father of Jesse.
\\v 6 Jesse became the father of King David. David the king\\f + \\fr 1:6 \\ft NU omits “the king”.\\f* became the father of Solomon by her who had been Uriah’s wife.
\\v 7 Solomon became the father of Rehoboam. Rehoboam became the father of Abijah. Abijah became the father of Asa.
\\v 8 Asa became the father of Jehoshaphat. Jehoshaphat became the father of Joram. Joram became the father of Uzziah.
\\v 9 Uzziah became the father of Jotham. Jotham became the father of Ahaz. Ahaz became the father of Hezekiah.
\\v 10 Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah.
\\v 11 Josiah became the father of Jechoniah and his brothers at the time of the exile to Babylon.
\\p
\\v 12 After the exile to Babylon, Jechoniah became the father of Shealtiel. Shealtiel became the father of Zerubbabel.
\\v 13 Zerubbabel became the father of Abiud. Abiud became the father of Eliakim. Eliakim became the father of Azor.
\\v 14 Azor became the father of Zadok. Zadok became the father of Achim. Achim became the father of Eliud.
\\v 15 Eliud became the father of Eleazar. Eleazar became the father of Matthan. Matthan became the father of Jacob.
\\v 16 Jacob became the father of Joseph, the husband of Mary, from whom was born Jesus,\\f + \\fr 1:16 \\ft “Jesus” means “Salvation”.\\f* who is called Christ.
\\p
\\v 17 So all the generations from Abraham to David are fourteen generations; from David to the exile to Babylon fourteen generations; and from the carrying away to Babylon to the Christ, fourteen generations.
\\p
\\v 18 Now the birth of Jesus Christ was like this: After his mother, Mary, was engaged to Joseph, before they came together, she was found pregnant by the Holy Spirit.
\\v 19 Joseph, her husband, being a righteous man, and not willing to make her a public example, intended to put her away secretly.
\\v 20 But when he thought about these things, behold,\\f + \\fr 1:20 \\ft “Behold”, from “ἰδοὺ”, means look at, take notice, observe, see, or gaze at. It is often used as an interjection.\\f* an angel of the Lord appeared to him in a dream, saying, “Joseph, son of David, don’t be afraid to take to yourself Mary as your wife, for that which is conceived in her is of the Holy Spirit.
\\v 21 She shall give birth to a son. You shall name him Jesus,\\f + \\fr 1:21 \\ft “Jesus” means “Salvation”.\\f* for it is he who shall save his people from their sins.”
\\p
\\v 22 Now all this has happened that it might be fulfilled which was spoken by the Lord through the prophet, saying,
\\q1
\\v 23 “Behold, the virgin shall be with child,
\\q2 and shall give birth to a son.
\\q1 They shall call his name Immanuel,”
\\q2 which is, being interpreted, “God with us.”\\x + \\xo 1:23 \\xt Isaiah 7:14\\x*
\\p
\\v 24 Joseph arose from his sleep, and did as the angel of the Lord commanded him, and took his wife to himself;
\\v 25 and didn’t know her sexually until she had given birth to her firstborn son. He named him Jesus.
\\c 2
\\p
\\v 1 Now when Jesus was born in Bethlehem of Judea in the days of King Herod, behold, wise men\\f + \\fr 2:1 \\ft The word for “wise men” (magoi) can also mean teachers, scientists, physicians, astrologers, seers, interpreters of dreams, or sorcerers.\\f* from the east came to Jerusalem, saying,
\\v 2 “Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.”
\\v 3 When King Herod heard it, he was troubled, and all Jerusalem with him.
\\v 4 Gathering together all the chief priests and scribes of the people, he asked them where the Christ would be born.
\\v 5 They said to him, “In Bethlehem of Judea, for this is written through the prophet,
\\q1
\\v 6 ‘You Bethlehem, land of Judah,
\\q2 are in no way least among the princes of Judah;
\\q1 for out of you shall come a governor
\\q2 who shall shepherd my people, Israel.’”\\x + \\xo 2:6 \\xt Micah 5:2\\x*
\\p
\\v 7 Then Herod secretly called the wise men, and learned from them exactly what time the star appeared.
\\v 8 He sent them to Bethlehem, and said, “Go and search diligently for the young child. When you have found him, bring me word, so that I also may come and worship him.”
\\p
\\v 9 They, having heard the king, went their way; and behold, the star, which they saw in the east, went before them until it came and stood over where the young child was.
\\v 10 When they saw the star, they rejoiced with exceedingly great joy.
\\v 11 They came into the house and saw the young child with Mary, his mother, and they fell down and worshiped him. Opening their treasures, they offered to him gifts: gold, frankincense, and myrrh.
\\v 12 Being warned in a dream not to return to Herod, they went back to their own country another way.
\\p
\\v 13 Now when they had departed, behold, an angel of the Lord appeared to Joseph in a dream, saying, “Arise and take the young child and his mother, and flee into Egypt, and stay there until I tell you, for Herod will seek the young child to destroy him.”
\\p
\\v 14 He arose and took the young child and his mother by night and departed into Egypt,
\\v 15 and was there until the death of Herod, that it might be fulfilled which was spoken by the Lord through the prophet, saying, “Out of Egypt I called my son.”\\x + \\xo 2:15 \\xt Hosea 11:1\\x*
\\p
\\v 16 Then Herod, when he saw that he was mocked by the wise men, was exceedingly angry, and sent out and killed all the male children who were in Bethlehem and in all the surrounding countryside, from two years old and under, according to the exact time which he had learned from the wise men.
\\v 17 Then that which was spoken by Jeremiah the prophet was fulfilled, saying,
\\q1
\\v 18 “A voice was heard in Ramah,
\\q2 lamentation, weeping and great mourning,
\\q1 Rachel weeping for her children;
\\q2 she wouldn’t be comforted,
\\q2 because they are no more.”\\x + \\xo 2:18 \\xt Jeremiah 31:15\\x*
\\p
\\v 19 But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying,
\\v 20 “Arise and take the young child and his mother, and go into the land of Israel, for those who sought the young child’s life are dead.”
\\p
\\v 21 He arose and took the young child and his mother, and came into the land of Israel.
\\v 22 But when he heard that Archelaus was reigning over Judea in the place of his father, Herod, he was afraid to go there. Being warned in a dream, he withdrew into the region of Galilee,
\\v 23 and came and lived in a city called Nazareth; that it might be fulfilled which was spoken through the prophets that he will be called a Nazarene.
\\c 3
`;

/**
 * WEB Matthew 1-2 output in USJ from Paratext 10 Studio 0.3.0-rc.0 (version 3.1 replaced with 3.0
 * in the USJ marker because that is more accurate. The USJ version handling isn't great yet).
 *
 * Also includes the chapter marker for chapter 3 but no contents of chapter 3.
 */
const matthew1And2Usj: Usj = JSON.parse(`{
  "type": "USJ",
  "version": "3.0",
  "content": [
    {
      "type": "book",
      "marker": "id",
      "code": "MAT",
      "content": ["40-MAT-web.sfm World English Bible (WEB)"]
    },
    {
      "type": "para",
      "marker": "ide",
      "content": ["UTF-8"]
    },
    {
      "type": "para",
      "marker": "h",
      "content": ["Matthew"]
    },
    {
      "type": "para",
      "marker": "toc1",
      "content": ["The Good News According to Matthew"]
    },
    {
      "type": "para",
      "marker": "toc2",
      "content": ["Matthew"]
    },
    {
      "type": "para",
      "marker": "toc3",
      "content": ["Matthew"]
    },
    {
      "type": "para",
      "marker": "mt2",
      "content": ["The Good News According to"]
    },
    {
      "type": "para",
      "marker": "mt1",
      "content": ["Matthew"]
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "1"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1"
        },
        "The book of the genealogy of Jesus Christ,",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": ["1:1 "]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "Messiah (Hebrew) and Christ (Greek) both mean “Anointed One”"
              ]
            }
          ]
        },
        " the son of David, the son of Abraham."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "2"
        },
        "Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "3"
        },
        "Judah became the father of Perez and Zerah by Tamar. Perez became the father of Hezron. Hezron became the father of Ram. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "4"
        },
        "Ram became the father of Amminadab. Amminadab became the father of Nahshon. Nahshon became the father of Salmon. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "5"
        },
        "Salmon became the father of Boaz by Rahab. Boaz became the father of Obed by Ruth. Obed became the father of Jesse. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "6"
        },
        "Jesse became the father of King David. David the king",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": ["1:6 "]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": ["NU omits “the king”."]
            }
          ]
        },
        " became the father of Solomon by her who had been Uriah’s wife. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "7"
        },
        "Solomon became the father of Rehoboam. Rehoboam became the father of Abijah. Abijah became the father of Asa. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "8"
        },
        "Asa became the father of Jehoshaphat. Jehoshaphat became the father of Joram. Joram became the father of Uzziah. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "9"
        },
        "Uzziah became the father of Jotham. Jotham became the father of Ahaz. Ahaz became the father of Hezekiah. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "10"
        },
        "Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "11"
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
          "number": "12"
        },
        "After the exile to Babylon, Jechoniah became the father of Shealtiel. Shealtiel became the father of Zerubbabel. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "13"
        },
        "Zerubbabel became the father of Abiud. Abiud became the father of Eliakim. Eliakim became the father of Azor. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "14"
        },
        "Azor became the father of Zadok. Zadok became the father of Achim. Achim became the father of Eliud. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "15"
        },
        "Eliud became the father of Eleazar. Eleazar became the father of Matthan. Matthan became the father of Jacob. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "16"
        },
        "Jacob became the father of Joseph, the husband of Mary, from whom was born Jesus,",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": ["1:16 "]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": ["“Jesus” means “Salvation”."]
            }
          ]
        },
        " who is called Christ."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "17"
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
          "number": "18"
        },
        "Now the birth of Jesus Christ was like this: After his mother, Mary, was engaged to Joseph, before they came together, she was found pregnant by the Holy Spirit. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "19"
        },
        "Joseph, her husband, being a righteous man, and not willing to make her a public example, intended to put her away secretly. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "20"
        },
        "But when he thought about these things, behold,",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": ["1:20 "]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "“Behold”, from “ἰδοὺ”, means look at, take notice, observe, see, or gaze at. It is often used as an interjection."
              ]
            }
          ]
        },
        " an angel of the Lord appeared to him in a dream, saying, “Joseph, son of David, don’t be afraid to take to yourself Mary as your wife, for that which is conceived in her is of the Holy Spirit. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "21"
        },
        "She shall give birth to a son. You shall name him Jesus,",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": ["1:21 "]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": ["“Jesus” means “Salvation”."]
            }
          ]
        },
        " for it is he who shall save his people from their sins.”"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "22"
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
          "number": "23"
        },
        "“Behold, the virgin shall be with child,"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": ["and shall give birth to a son."]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": ["They shall call his name Immanuel,”"]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "which is, being interpreted, “God with us.”",
        {
          "type": "note",
          "marker": "x",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "closed": "false",
              "content": ["1:23 "]
            },
            {
              "type": "char",
              "marker": "xt",
              "closed": "false",
              "content": ["Isaiah 7:14"]
            }
          ]
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
          "number": "24"
        },
        "Joseph arose from his sleep, and did as the angel of the Lord commanded him, and took his wife to himself; ",
        {
          "type": "verse",
          "marker": "v",
          "number": "25"
        },
        "and didn’t know her sexually until she had given birth to her firstborn son. He named him Jesus."
      ]
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "2"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1"
        },
        "Now when Jesus was born in Bethlehem of Judea in the days of King Herod, behold, wise men",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": ["2:1 "]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "The word for “wise men” (magoi) can also mean teachers, scientists, physicians, astrologers, seers, interpreters of dreams, or sorcerers."
              ]
            }
          ]
        },
        " from the east came to Jerusalem, saying, ",
        {
          "type": "verse",
          "marker": "v",
          "number": "2"
        },
        "“Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.” ",
        {
          "type": "verse",
          "marker": "v",
          "number": "3"
        },
        "When King Herod heard it, he was troubled, and all Jerusalem with him. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "4"
        },
        "Gathering together all the chief priests and scribes of the people, he asked them where the Christ would be born. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "5"
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
          "number": "6"
        },
        "‘You Bethlehem, land of Judah,"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": ["are in no way least among the princes of Judah;"]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": ["for out of you shall come a governor"]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "who shall shepherd my people, Israel.’”",
        {
          "type": "note",
          "marker": "x",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "closed": "false",
              "content": ["2:6 "]
            },
            {
              "type": "char",
              "marker": "xt",
              "closed": "false",
              "content": ["Micah 5:2"]
            }
          ]
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
          "number": "7"
        },
        "Then Herod secretly called the wise men, and learned from them exactly what time the star appeared. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "8"
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
          "number": "9"
        },
        "They, having heard the king, went their way; and behold, the star, which they saw in the east, went before them until it came and stood over where the young child was. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "10"
        },
        "When they saw the star, they rejoiced with exceedingly great joy. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "11"
        },
        "They came into the house and saw the young child with Mary, his mother, and they fell down and worshiped him. Opening their treasures, they offered to him gifts: gold, frankincense, and myrrh. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "12"
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
          "number": "13"
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
          "number": "14"
        },
        "He arose and took the young child and his mother by night and departed into Egypt, ",
        {
          "type": "verse",
          "marker": "v",
          "number": "15"
        },
        "and was there until the death of Herod, that it might be fulfilled which was spoken by the Lord through the prophet, saying, “Out of Egypt I called my son.”",
        {
          "type": "note",
          "marker": "x",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "closed": "false",
              "content": ["2:15 "]
            },
            {
              "type": "char",
              "marker": "xt",
              "closed": "false",
              "content": ["Hosea 11:1"]
            }
          ]
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
          "number": "16"
        },
        "Then Herod, when he saw that he was mocked by the wise men, was exceedingly angry, and sent out and killed all the male children who were in Bethlehem and in all the surrounding countryside, from two years old and under, according to the exact time which he had learned from the wise men. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "17"
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
          "number": "18"
        },
        "“A voice was heard in Ramah,"
      ]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": ["lamentation, weeping and great mourning,"]
    },
    {
      "type": "para",
      "marker": "q1",
      "content": ["Rachel weeping for her children;"]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": ["she wouldn’t be comforted,"]
    },
    {
      "type": "para",
      "marker": "q2",
      "content": [
        "because they are no more.”",
        {
          "type": "note",
          "marker": "x",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "closed": "false",
              "content": ["2:18 "]
            },
            {
              "type": "char",
              "marker": "xt",
              "closed": "false",
              "content": ["Jeremiah 31:15"]
            }
          ]
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
          "number": "19"
        },
        "But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying, ",
        {
          "type": "verse",
          "marker": "v",
          "number": "20"
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
          "number": "21"
        },
        "He arose and took the young child and his mother, and came into the land of Israel. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "22"
        },
        "But when he heard that Archelaus was reigning over Judea in the place of his father, Herod, he was afraid to go there. Being warned in a dream, he withdrew into the region of Galilee, ",
        {
          "type": "verse",
          "marker": "v",
          "number": "23"
        },
        "and came and lived in a city called Nazareth; that it might be fulfilled which was spoken through the prophets that he will be called a Nazarene."
      ]
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "3"
    }
  ]
}`);

/**
 * Small portion of WEB Matthew 2 output in USJ from Paratext 10 Studio 0.3.0-rc.0 and modified by
 * hand.
 *
 * Includes the first paragraph and last two paragraphs of chapter 2 with verses 21 and 22 combined.
 */
const matthew2verseRangeUsj = JSON.parse(`{
  "type": "USJ",
  "version": "3.1",
  "content": [
    {
      "type": "chapter",
      "marker": "c",
      "number": "2"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1"
        },
        "Now when Jesus was born in Bethlehem of Judea in the days of King Herod, behold, wise men",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": ["2:1 "]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "The word for “wise men” (magoi) can also mean teachers, scientists, physicians, astrologers, seers, interpreters of dreams, or sorcerers."
              ]
            }
          ]
        },
        " from the east came to Jerusalem, saying, ",
        {
          "type": "verse",
          "marker": "v",
          "number": "2"
        },
        "“Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.” ",
        {
          "type": "verse",
          "marker": "v",
          "number": "3"
        },
        "When King Herod heard it, he was troubled, and all Jerusalem with him. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "4"
        },
        "Gathering together all the chief priests and scribes of the people, he asked them where the Christ would be born. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "5"
        },
        "They said to him, “In Bethlehem of Judea, for this is written through the prophet,"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "19"
        },
        "But when Herod was dead, behold, an angel of the Lord appeared in a dream to Joseph in Egypt, saying, ",
        {
          "type": "verse",
          "marker": "v",
          "number": "20"
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
          "number": "21-22"
        },
        "He arose and took the young child and his mother, and came into the land of Israel. ",
        "But when he heard that Archelaus was reigning over Judea in the place of his father, Herod, he was afraid to go there. Being warned in a dream, he withdrew into the region of Galilee, ",
        {
          "type": "verse",
          "marker": "v",
          "number": "23"
        },
        "and came and lived in a city called Nazareth; that it might be fulfilled which was spoken through the prophets that he will be called a Nazarene."
      ]
    }
  ]
}`);

/**
 * TestUSFM 2 Samuel 1 in USFM. Output from Platform.Bible; had to change `\\r\\n` to `\n`
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const testUSFM2SACh1Usfm = `\\id 2SA - TJs USFM Test
\\toc3 2Sam
\\toc2 2 Sam
\\toc1 2 Samuel
\\c 1
 \\ca 1 ca\\ca*
\\cp 1 cp
\\s1 This chapter and the next two chapters have lots of challenging USFM test markers and such in them.
\\p
\\v 1 \\bd usfm marker
\\p In USFM, the usfm marker should come right after the id marker at the top of the page. According to spec, it should only occur if the USFM version is not 3.0; usfm 3.0 should never occur, and anything else like usfm 3.1 should always be present. In USX, this USFM marker should be transformed into the top-level usx marker that contains all the content of the document including the id marker, and the version from the usfm marker should be set as the version attribute on the usx marker. However, Paratext handles this marker differently. When output to USX, the usfm marker is transformed into a para marker with style=\"usfm\", and the version is the text content of the marker. Paratext does not remove the usfm marker, and it does not set the usx marker's version to the version specified by the usfm marker; it is always 3.0.
\\b
\\p
\\v 2 \\bd Footnotes and crossrefs:
\\p The footnote in this paragraph has as category without markers in its content, so it should be an attribute on the footnote\\f + \\cat things\\cat*\\fr 1:12 \\ft Some footnote text.\\f* instead of its own standalone marker. There is no space after the cat marker, which is the canonical form in the spec. Note the letter before the footnote and the space after.
\\p The end footnote in this paragraph has as category without markers in its content but with a space after, so it should be an attribute on the footnote \\fe + \\cat things\\cat* \\fr 1:12 \\ft More footnote text. \\fp Another \\+wj paragraph\\+wj* in the footnote.\\fe* instead of its own standalone marker. However, Paratext seems to interpret the space after as part of the footnote text content instead of an optional space (that is not output in canonical form) on the attribute marker according to spec. Note the space before the footnote and the space after. Also note the fp marker in the footnote is a character marker that looks like a paragraph, so character markers inside it must have + in USFM 3.0.
\\p The footnote in this paragraph has a category with markers in its content, so it should be its own standalone marker \\f + \\cat \\+wj stuff \\+wj*\\cat* \\fr 1:2 \\ft Other footnote text.\\f*. Note the space before the footnote and the period after.
\\p The crossref in this verse has a category without markers in its content, so it should be an attribute on the crossref\\x - \\xo 1.2\\xo* \\xt Crossref text.\\xt*\\x*. It also has closed character markers that do not need to be closed in 3.1 even though other markers need to be closed in 3.1. Note the letter before the crossref and the period after.
\\b
\\p
\\v 3 \\bd Character markers:
\\p In\\wj si\\wj*de, \\wj WholeWord\\wj*, \\wj Span Words\\wj*, Pa\\wj rt Span wor\\wj*ds
\\p Empty character marker here: \\wj \\wj*
\\p w \\w marker|stuff\\w* with default attribute (note default attribute with normal attribute syntax gets normalized to default attribute)
\\p w \\w marker|stuff \\w* with a space at the end of the default attribute. Note this space is on the default attribute. With non-default attribute syntax, any space before the closing marker is removed as part of normalization.
\\p w \\w marker|strong=\"H1234,G1234\" lemma=\"markerLemma\" srcloc=\"Location\"\\w* with multiple attributes. Note they are not in the typical order of lemma, strong, srcloc
\\p jmp \\jmp marker|2SA 1:1\\jmp* with default attribute - note the default attribute name changes between 3.0 link-href and 3.1 href
\\p jmp \\jmp marker|link-href=\"2SA 1:2\" link-title=\"My Title\" link-id=\"3.0 link\"\\jmp* with multiple attributes with 3.0 names - note the attribute name changes between 3.0 and 3.1
\\p jmp \\jmp marker|href=\"2SA 1:3\" id=\"3.1 link\"\\jmp* with multiple attributes with 3.1 names - note the attribute name changes between 3.0 and 3.1. For some reason, Paratext 9.5 (with USFM 3.0) is automatically removing the title attribute, so it is not present.
\\p jmp \\jmp marker|x-user-defined:thing\\jmp* with a user-defined URI prefix. Must begin with x-.
\\p jmp \\jmp marker|prj:zzz6 2SA 1:4\\jmp* with a prj URI prefix. Links to a reference in another project.
\\p jmp \\jmp marker|x-prj:zzz6 2SA 1:5\\jmp* with an x-prj URI prefix. The 3.1 docs mention that this should link to another project, but the 3.1 usx.rng doesn't seem to indicate it is allowed unlike prj: which is in the 3.1 usx.rng.
\\p jmp \\jmp |2SA 1:6\\jmp* marker that has no text content.
\\p jmp \\jmp marker|figures/platform-bible-discord.png\\jmp* with a file path in it.
\\p jmp \\jmp marker|#fake-named-target-id\\jmp* with a named target in it (I do not know how to define a named target or how this differs than listing an anchor in link-id).
\\p Non-jmp wj \\wj marker|link-href=\"2SA 1:7\"\\wj* with link-href on it. The 3.0 spec says this should be considered a link, and Paratext 9.5 treats it that way. However, the 3.1 spec does not indicate such.
\\p k \\k marker|key=\"something\"\\k* with key attribute (default in 3.1+; did not exist in 3.0-)
\\p Empty character marker here \\wj \\wj* has a structure space in it unlike milestones which do not.
\\p qt \\qt marker\\qt* that is a character marker that looks like it is a milestone.
\\p Nested \\wj character \\+nd markers\\+nd* must\\wj* have + in 3.0-, but it is optional in 3.1+.
\\p Character markers \\wj inside notes\\f + \\fr 1:3 \\ft Footnote text with a \\wj character marker\\wj*\\f* inside character markers\\wj* are not considered nested, so it must just be the direct parent that is considered for nesting.
\\p Character \\wj markers technically must close in 3.1+, but unclosed character markers can be handled the same as in 3.0. They should automatically close at the end of the paragraph and should be labeled as not closed in USX and USJ.
\\b
\\p
\\v 4 \\bd Milestones:
\\p This line has \\qt-s\\* two milestones \\qt-e\\* without attributes. There are content spaces on both sides of each milestone. Note that, unlike with character markers, there is no structural space before the closing marker when there are no attributes; it is normalized out.
\\p This line has \\qt-s |TJ \\*two milestones\\qt-e\\*, the first of which has default who attribute. There is a content space before the first milestone only. Note that there is a structural space after the opening marker when there are attributes. Also note that the space before the closing marker is part of the default attribute as with character markers.
\\p This line has a \\qt-s |sid=\"Some quote\" who=\"TJ\"\\*starting milestone with sid and who.
\\p This line has no milestone.
\\p This line has an \\qt-e |Some quote\\*ending milestone with default eid attribute.
\\p This line has an opening ts milestone \\ts-s |Translator's section\\* with default sid and closing ts milestone \\ts-e |Translator's section\\* with default eid. Note that the default attribute can have spaces in it.
\\p This line has t-s \\t-s \\* and t-e
\\p For some reason, Paratext does not recognize the ts \\ts \\*, t-s \\t-s \\*, or t-e \\t-e \\* markers. ts is a standalone translator's section milestone, and I guess the others are shorthands for ts-s and ts-e. Paratext puts a structural space before the closing marker on all three even though it should not be there.
\\b
\\p
\\v 5
\\b
\\p
\\v 6 \\bd Leading attributes
\\p See the id marker at the top of this book for its code leading attribute
\\p See the chapter marker at the top of this chapter for its number leading attribute.
\\p See the many verse markers in this chapter for their number leading attribute.
\\p See the Footnotes and crossrefs section for footnote and crossref caller leading attribute.
\\b
\\p
\\v 7 \\bd Text content attributes
\\p periph has alt as its text content attribute, but periph is unfortunately only supported in peripheral books (FRT, BAK, INT, and OTH) in Paratext 9.5. Paratext splits these peripheral books into a separate file for each peripheral when outputting to USX. Please see the OTH book for examples of periph markers. Note that periph's id attribute cannot use default attribute syntax; it must be named.
\\p usfm, usx, and USJ markers have version as their text content attribute, but the usfm marker is unfortunately not present on this document because it uses USFM 3.0, so spec indicates it should not be present.
\\b
\\p
\\v 8 \\bd Custom attributes
\\p This \\wj character marker|x-custom-attribute-1=\"Stuff\" z-custom-attribute-2=\"Things\"\\wj* has two custom attributes. Custom attributes are supposed to start with x or z according to spec.
\\p This \\wj character marker|custom-attribute-no-prefix=\"Bad\" custom-attribute-no-prefix-2=\"Attributes\"\\wj* has two unknown attributes that do not start with x or z. Paratext treats them just like custom attributes.
\\b
\\p
\\v 9 \\bd Attribute markers
\\p See the Footnotes and crossrefs section for testing the cat marker on footnotes and crossrefs.
\\p See the chapter marker at the top of this chapter for testing ca and cp being applied to the chapter marker as attribute markers.
\\p See the chapter marker at the top of chapter 2 for not closing ca which leads it to be its own separate marker. Then cp is also its own separate marker afterward and can contain other markers as content.
\\p See the chapter marker at the top of chapter 3 for testing cp after the chapter marker with content in it, which should make the cp stay as its own independent marker.
\\p Note: All remaining tests of attribute markers will also have leading attributes because v and c are the only markers left with attribute markers to test, and they both have leading attributes.
\\p
\\v 10 \\va 10 va\\va*\\vp 10 vp\\vp*This verse marker has simple va and vp with no space between or after. Paratext and the spec treat this the same way: both markers turn into attributes on the marker in USX and USJ, and there are no spaces in the text content.
\\p
\\v 11 \\va 11 va\\va*\\vp 11 vp\\vp* This verse marker has simple va and vp with no space between but with a space after. The spec indicates there is optional whitespace after attribute markers (one space is output after attribute markers except cat in canonical form), so this space should not be in the text content. However, Paratext treats all spaces after attribute markers as text content, so Paratext will output a space after the vp.
\\p
\\v 12 \\va 12 va\\va* \\vp 11 vp\\vp*This verse marker has simple va and vp with a space between but not after. This space should be ignored as part of optional structural space according to spec, but Paratext treats it as text content. As such, Paratext will output altnumber on the verse marker, but the vp will be its own separate marker.
\\p
\\v 13 \\va 13 \\+wj va \\+wj*\\va*\\vp 13 vp\\vp*This verse marker has va with marker content in it, which makes it a standalone marker. Random \\va va\\va* without the verse marker also becomes a standalone marker. va does not seem to be allowed to be its own standalone marker according to spec, but it works in Paratext. The vp after the va is standalone because it is no longer connected to the verse marker.
\\p
\\v 14 \\va 14\\va*\\vp 14 \\+wj vp\\+wj*\\vp*This verse marker has vp with marker content in it, which makes it a standalone marker. Random \\vp vp\\vp* without the verse marker also becomes a standalone marker. The va before the vp appropriately becomes altnumber on the verse marker.
\\p
\\v 15 \\va 15 va \\vp 15 vp This verse marker has va and vp without closing markers. Neither of these markers becomes an attribute in USX or USJ because both have closed=\"false\" and are therefore not simple markers.
\\p This paragraph contains a random \\ca ca with an \\+wj inline marker inside\\+wj*\\ca* not after the chapter marker, which becomes a standalone marker. ca does not seem to be allowed to be its own standalone marker according to spec, but it works in Paratext.
\\cp This paragraph is a random cp with an \\wj inline marker inside\\wj* not after the chapter marker, which becomes a standalone marker.
\\b
\\p
\\v 16 \\bd Whitespace
\\p Tilde~should~be a NBSP in USX and USJ
\\p Double slash should be an optbreak in USX and USJ. Here // is one with spaces around it. Here//is one without spaces around it.
\\p Paratext 9.5's unformatted view leaves a space after the number on verse markers, but the standard view does not. This seems like a bug in the unformatted view.
\\p
\\v 17
\\p TODO: add some whitespace character tests
\\b
\\p
\\v 18 \\bd Figures
\\p There is a figure here \\fig |src=\"platform-bible-discord.png\" size=\"col\" ref=\"1.13\"\\fig* . It has a space on both sides. Only the three required attributes are present and in the order in which they are listed in the spec. The attribute src in USFM should be file in USX and USJ.
\\p There is a figure here\\fig Caption Here|alt=\"Description Here\" src=\"platform-bible-discord.png\" size=\"span\" loc=\"Location here\" copy=\"Copyright here\" ref=\"1.13\"\\fig*. It has no spaces around it. All six attributes are present and are not in the order in which they are listed in the spec. The attribute src in USFM should be file in USX and USJ.
\\b
\\p
\\v 19 \\bd Lists
\\p Following is a normal list with a header, entries, and footer. It has – at the start of each line like in the documentation example.
\\lh Header for the \\wj normal\\wj* list:
\\li1 –First \\wj list\\wj* item
\\li2 –Subpoint on the first list item
\\li3 –Subpoint on the \\wj subpoint\\wj* on the first list item
\\li1 –Second list item
\\li1 –Third list item
\\lf Footer for the normal list.
\\p Following is an embedded list with just entries.
\\lim1 First embedded list item
\\lim1 Second embedded list item
\\lim1 Third embedded list item
\\lim2 Subpoint on the third embedded list item
\\lim3 Subpoint on the subpoint on the third embedded list item
\\b
\\p
\\v 20 \\bd Tables
\\p Following is a table with various kinds of cells and a header row. Paratext only supports th1 through th12 because that is all that is in usfm.sty. Note that USFM 3.1 does not require closing markers on table cells.
\\tr \\th1 Header 1\\th2 Header 2 space after \\thc3-4 Header 3-4 centered\\thr5 Header 5 right
\\tr \\tc1 Row 1 cell 1\\tc2 Row 1 cell 2 space after \\thc3 Row 1 cell 3 centered\\thr4-5 Row 1 cell 4-5 right
\\tr \\tcr1-4 Row 2 cell 1-4 right\\tc5 Row 2 cell 5
\\p Following is a table with 6 columns but no header row. Paratext does not support tc13 or higher and therefore makes two separate tables of one row each on this line, but it interestingly allows having multiple tc5 cells in one row. The spec does not appear to impose any limits on the column number.
\\tr \\tc1 r1c1\\tc2 r1c2 with closed wj \\wj marker\\wj* space after \\tc3 r1c3\\tc4 r1c4\\tc5 r1c5 \\tc5 r1c5 again \\tc13 r1c13
\\tr \\tc1 r2c1\\tc2 r2c2 with unclosed wj \\wj marker space after \\tc3 r2c3\\tc4 r2c4\\tc5 r2c5\\tc5 r2c5 again \\tc13 r2c13
\\b
\\p
\\v 21 \\bd Periphs
\\p periph is unfortunately only supported in peripheral books (FRT, BAK, INT, and OTH) in Paratext 9.5. Paratext splits these peripheral books into a separate file for each peripheral when outputting to USX. Please see the OTH book for examples of periph markers.
\\b
\\p
\\v 22 \\bd Custom markers
\\p Following is a custom marker that is unknown (not in custom.sty or markers.ext). Paratext translates unknown markers to para type markers in USX. Custom markers must start with z. \\zUnknownCustomMarker This text is \\wj in the custom\\wj* marker.
\\b
\\p
\\v 23-24 \\bd Verse range
\\p This is a verse range.
\\b
\\p
\\v 25 \\bd Refs
\\p Paratext 9.5 standard view does not support entering an independent ref marker; it just replaces the ref with its text content. However, it will allow an unclosed ref marker (the contents are all put in the text content of the marker; the default attribute loc does not work): \\ref 2Sam 1:1|REV 1:1
\\p Also, if you enter a ref marker in the unformatted view and don't touch it in the standard view, it will work:
\\p \\ref 2Sam 1:1|2SA 1:1\\ref*
\\p This crossref\\x - \\xo 1:21 \\xt 2Sam 1:1; 2Sam 1:2-3.\\x* has a properly filled out xt marker. Paratext generates ref markers around each Scripture reference in the xt when outputting USX. The ref marker text content is the localized reference, and the loc attribute (default) is the canonized reference. When translated back to USFM, the refs inside the xt need to be removed; only the text content should remain.
\\p This paragraph has a properly filled out xt marker: \\xt 2Sam 1:2; 2Sam 1:3\\xt*. Paratext generates ref markers around each Scripture reference in the xt when outputting USX the same way as it does for xt markers in crossrefs as detailed in the previous paragraph.
\\b
\\p
\\v 26 \\bd Sidebars
\\p There is a closed sidebar after this paragraph. It has the category \"Test Category\". Note that Paratext's Standard view normalizes out any space before the closing cat marker, so there cannot be trailing space on the category unless you use a different view. It seems the spec allows trailing space there as part of the text content of the marker.
\\esb \\cat Test Category\\cat*
\\p This paragraph is in the sidebar. The sidebar can contain many things like \\wj character markers\\wj*, \\qt1-s\\* milestones \\qt1-e\\*, and more paragraphs.
\\p This is a second paragraph in the sidebar. The sidebar will end at esbe marker.
\\esbe
\\p There is a sidebar that is not closed after this paragraph. The entire rest of the chapter will be in this sidebar because sidebars automatically close at the end of the chapter.
\\esb
\\p This paragraph is in the sidebar.
\\b
\\p
\\v 27 This is \\wj still\\wj* in the sidebar.
`;

/**
 * TestUSFM 2 Samuel 2 in USFM. Output from Platform.Bible; had to change `\\r\\n` to `\n`.
 *
 * WARNING: I also had to add `" ",` to the start of the content array in the `ef` marker because it
 * seems that `usxStringToUsj` is incorrectly removing it.
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const testUSFM2SACh2Usfm = `\\c 2
 \\ca 2 ca
\\cp 2 cp \\f + \\fr 2.0 \\ft For some reason, Paratext's backslash menu allows you to insert a note and nothing else in a cp marker. You can add \\wj character markers\\wj* inside the note.\\f* more \\wj cp\\wj* text
\\p
\\v 1 Notice that this chapter's attribute marker ca does not apply to the chapter as the altnumber attribute because the ca is not closed and therefore has the closed=\"true\" attribute. Because ca is not translated to an attribute, attribute marker cp also follows suit and is not translated into pubnumber. This prior separation of cp from the chapter marker allows Paratext 9.5 to understand that it should make cp an independent marker that may have other marker contents in it. But see chapter 3 in which Paratext 9.5 fails to recognize that cp should be an independent marker.
\\p
\\v 2
\\v 3
\\v 4
\\v 5
\\v 6
\\v 7
\\v 8
\\v 9
\\v 10
\\v 11
\\v 12
\\v 13
\\v 14
\\v 15
\\v 16
\\v 17
\\v 18
\\v 19
\\v 20
\\v 21
\\v 22
\\v 23
\\v 24
\\v 25
\\v 26
\\v 27
\\v 28
\\v 29
\\v 30
\\v 31
\\v 32
`;

/**
 * TestUSFM 2 Samuel 3 in USFM. Output from Platform.Bible; had to change `\\r\\n` to `\n`
 *
 * Note: this content was fed into Paratext 9 so its whitespace was normalized according to Paratext
 * 9's rules. We will deal with whitespace normalization issues later.
 */
const testUSFM2SACh3Usfm = `\\c 3
 \\ca 3 ca\\ca*
\\cp 3 cp \\wj wj marker \\wj*
\\p
\\v 1 Notice that this chapter's attribute marker ca properly applies to the chapter as the altnumber attribute. However, its attribute marker cp should not be translated into pubnumber because it has markers in it. But Paratext 9.5 does not realize cp should be its own marker and improperly applies the part of cp before any markers as the pubnumber and puts the rest of the contents after the chapter marker.
\\v 2
\\v 3
\\v 4
\\v 5
\\v 6
\\v 7
\\v 8
\\v 9
\\v 10
\\v 11
\\v 12
\\v 13
\\v 14
\\v 15
\\v 16
\\v 17
\\v 18
\\v 19
\\v 20
\\v 21
\\v 22
\\v 23
\\v 24
\\v 25
\\v 26
\\v 27
\\v 28
\\v 29
\\v 30
\\v 31
\\v 32
\\v 33
\\v 34
\\v 35
\\v 36
\\v 37
\\v 38
\\v 39
`;

/**
 * TestUSFM 2 Samuel 1 output in USJ from Platform.Bible (single backslash replaced with double
 * backslash to properly escape quotes; version 3.1 replaced with 3.0 in the USJ marker because that
 * is more accurate. The USJ version handling isn't great yet).
 */
const testUSFM2SACh1Usj = JSON.parse(`{
  "type": "USJ",
  "version": "3.0",
  "content": [
    {
      "type": "book",
      "marker": "id",
      "code": "2SA",
      "content": [
        "- TJs USFM Test"
      ]
    },
    {
      "type": "para",
      "marker": "toc3",
      "content": [
        "2Sam"
      ]
    },
    {
      "type": "para",
      "marker": "toc2",
      "content": [
        "2 Sam"
      ]
    },
    {
      "type": "para",
      "marker": "toc1",
      "content": [
        "2 Samuel"
      ]
    },
    {
      "type": "chapter",
      "marker": "c",
      "number": "1",
      "altnumber": "1 ca",
      "pubnumber": "1 cp",
      "sid": "2SA 1"
    },
    {
      "type": "para",
      "marker": "s1",
      "content": [
        "This chapter and the next two chapters have lots of challenging USFM test markers and such in them."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1",
          "sid": "2SA 1:1"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "usfm marker"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "In USFM, the usfm marker should come right after the id marker at the top of the page. According to spec, it should only occur if the USFM version is not 3.0; usfm 3.0 should never occur, and anything else like usfm 3.1 should always be present. In USX, this USFM marker should be transformed into the top-level usx marker that contains all the content of the document including the id marker, and the version from the usfm marker should be set as the version attribute on the usx marker. However, Paratext handles this marker differently. When output to USX, the usfm marker is transformed into a para marker with style=\\"usfm\\", and the version is the text content of the marker. Paratext does not remove the usfm marker, and it does not set the usx marker's version to the version specified by the usfm marker; it is always 3.0."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "2",
          "sid": "2SA 1:2"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Footnotes and crossrefs:"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "The footnote in this paragraph has as category without markers in its content, so it should be an attribute on the footnote",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "category": "things",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": [
                "1:12 "
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "Some footnote text."
              ]
            }
          ]
        },
        " instead of its own standalone marker. There is no space after the cat marker, which is the canonical form in the spec. Note the letter before the footnote and the space after."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "The end footnote in this paragraph has as category without markers in its content but with a space after, so it should be an attribute on the footnote ",
        {
          "type": "note",
          "marker": "fe",
          "caller": "+",
          "category": "things",
          "content": [
            " ",
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": [
                "1:12 "
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "More footnote text. "
              ]
            },
            {
              "type": "char",
              "marker": "fp",
              "closed": "false",
              "content": [
                "Another ",
                {
                  "type": "char",
                  "marker": "wj",
                  "content": [
                    "paragraph"
                  ]
                },
                " in the footnote."
              ]
            }
          ]
        },
        " instead of its own standalone marker. However, Paratext seems to interpret the space after as part of the footnote text content instead of an optional space (that is not output in canonical form) on the attribute marker according to spec. Note the space before the footnote and the space after. Also note the fp marker in the footnote is a character marker that looks like a paragraph, so character markers inside it must have + in USFM 3.0."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "The footnote in this paragraph has a category with markers in its content, so it should be its own standalone marker ",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "cat",
              "content": [
                {
                  "type": "char",
                  "marker": "wj",
                  "content": [
                    "stuff "
                  ]
                }
              ]
            },
            " ",
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": [
                "1:2 "
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "Other footnote text."
              ]
            }
          ]
        },
        ". Note the space before the footnote and the period after."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "The crossref in this verse has a category without markers in its content, so it should be an attribute on the crossref",
        {
          "type": "note",
          "marker": "x",
          "caller": "-",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "content": [
                "1.2"
              ]
            },
            " ",
            {
              "type": "char",
              "marker": "xt",
              "content": [
                "Crossref text."
              ]
            }
          ]
        },
        ". It also has closed character markers that do not need to be closed in 3.1 even though other markers need to be closed in 3.1. Note the letter before the crossref and the period after."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "3",
          "sid": "2SA 1:3"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Character markers:"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "In",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "si"
          ]
        },
        "de, ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "WholeWord"
          ]
        },
        ", ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "Span Words"
          ]
        },
        ", Pa",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "rt Span wor"
          ]
        },
        "ds"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Empty character marker here: ",
        {
          "type": "char",
          "marker": "wj"
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "w ",
        {
          "type": "char",
          "marker": "w",
          "lemma": "stuff",
          "content": [
            "marker"
          ]
        },
        " with default attribute (note default attribute with normal attribute syntax gets normalized to default attribute)"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "w ",
        {
          "type": "char",
          "marker": "w",
          "lemma": "stuff ",
          "content": [
            "marker"
          ]
        },
        " with a space at the end of the default attribute. Note this space is on the default attribute. With non-default attribute syntax, any space before the closing marker is removed as part of normalization."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "w ",
        {
          "type": "char",
          "marker": "w",
          "strong": "H1234,G1234",
          "lemma": "markerLemma",
          "srcloc": "Location",
          "content": [
            "marker"
          ]
        },
        " with multiple attributes. Note they are not in the typical order of lemma, strong, srcloc"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "2SA 1:1",
          "content": [
            "marker"
          ]
        },
        " with default attribute - note the default attribute name changes between 3.0 link-href and 3.1 href"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "2SA 1:2",
          "link-title": "My Title",
          "link-id": "3.0 link",
          "content": [
            "marker"
          ]
        },
        " with multiple attributes with 3.0 names - note the attribute name changes between 3.0 and 3.1"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "href": "2SA 1:3",
          "id": "3.1 link",
          "content": [
            "marker"
          ]
        },
        " with multiple attributes with 3.1 names - note the attribute name changes between 3.0 and 3.1. For some reason, Paratext 9.5 (with USFM 3.0) is automatically removing the title attribute, so it is not present."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "x-user-defined:thing",
          "content": [
            "marker"
          ]
        },
        " with a user-defined URI prefix. Must begin with x-."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "prj:zzz6 2SA 1:4",
          "content": [
            "marker"
          ]
        },
        " with a prj URI prefix. Links to a reference in another project."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "x-prj:zzz6 2SA 1:5",
          "content": [
            "marker"
          ]
        },
        " with an x-prj URI prefix. The 3.1 docs mention that this should link to another project, but the 3.1 usx.rng doesn't seem to indicate it is allowed unlike prj: which is in the 3.1 usx.rng."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "2SA 1:6"
        },
        " marker that has no text content."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "figures/platform-bible-discord.png",
          "content": [
            "marker"
          ]
        },
        " with a file path in it."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "jmp ",
        {
          "type": "char",
          "marker": "jmp",
          "link-href": "#fake-named-target-id",
          "content": [
            "marker"
          ]
        },
        " with a named target in it (I do not know how to define a named target or how this differs than listing an anchor in link-id)."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Non-jmp wj ",
        {
          "type": "char",
          "marker": "wj",
          "link-href": "2SA 1:7",
          "content": [
            "marker"
          ]
        },
        " with link-href on it. The 3.0 spec says this should be considered a link, and Paratext 9.5 treats it that way. However, the 3.1 spec does not indicate such."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "k ",
        {
          "type": "char",
          "marker": "k",
          "key": "something",
          "content": [
            "marker"
          ]
        },
        " with key attribute (default in 3.1+; did not exist in 3.0-)"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Empty character marker here ",
        {
          "type": "char",
          "marker": "wj"
        },
        " has a structure space in it unlike milestones which do not."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "qt ",
        {
          "type": "char",
          "marker": "qt",
          "content": [
            "marker"
          ]
        },
        " that is a character marker that looks like it is a milestone."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Nested ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "character ",
            {
              "type": "char",
              "marker": "nd",
              "content": [
                "markers"
              ]
            },
            " must"
          ]
        },
        " have + in 3.0-, but it is optional in 3.1+."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Character markers ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "inside notes",
            {
              "type": "note",
              "marker": "f",
              "caller": "+",
              "content": [
                {
                  "type": "char",
                  "marker": "fr",
                  "closed": "false",
                  "content": [
                    "1:3 "
                  ]
                },
                {
                  "type": "char",
                  "marker": "ft",
                  "closed": "false",
                  "content": [
                    "Footnote text with a "
                  ]
                },
                {
                  "type": "char",
                  "marker": "wj",
                  "content": [
                    "character marker"
                  ]
                }
              ]
            },
            " inside character markers"
          ]
        },
        " are not considered nested, so it must just be the direct parent that is considered for nesting."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Character ",
        {
          "type": "char",
          "marker": "wj",
          "closed": "false",
          "content": [
            "markers technically must close in 3.1+, but unclosed character markers can be handled the same as in 3.0. They should automatically close at the end of the paragraph and should be labeled as not closed in USX and USJ."
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "4",
          "sid": "2SA 1:4"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Milestones:"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This line has ",
        {
          "type": "ms",
          "marker": "qt-s"
        },
        " two milestones ",
        {
          "type": "ms",
          "marker": "qt-e"
        },
        " without attributes. There are content spaces on both sides of each milestone. Note that, unlike with character markers, there is no structural space before the closing marker when there are no attributes; it is normalized out."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This line has ",
        {
          "type": "ms",
          "marker": "qt-s",
          "who": "TJ "
        },
        "two milestones",
        {
          "type": "ms",
          "marker": "qt-e"
        },
        ", the first of which has default who attribute. There is a content space before the first milestone only. Note that there is a structural space after the opening marker when there are attributes. Also note that the space before the closing marker is part of the default attribute as with character markers."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This line has a ",
        {
          "type": "ms",
          "marker": "qt-s",
          "sid": "Some quote",
          "who": "TJ"
        },
        "starting milestone with sid and who."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This line has no milestone."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This line has an ",
        {
          "type": "ms",
          "marker": "qt-e",
          "eid": "Some quote"
        },
        "ending milestone with default eid attribute."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This line has an opening ts milestone ",
        {
          "type": "ms",
          "marker": "ts-s",
          "sid": "Translator's section"
        },
        " with default sid and closing ts milestone ",
        {
          "type": "ms",
          "marker": "ts-e",
          "eid": "Translator's section"
        },
        " with default eid. Note that the default attribute can have spaces in it."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This line has t-s "
      ]
    },
    {
      "type": "para",
      "marker": "t-s",
      "content": [
        {
          "type": "unmatched",
          "marker": "*"
        },
        " and t-e"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "For some reason, Paratext does not recognize the ts "
      ]
    },
    {
      "type": "para",
      "marker": "ts",
      "content": [
        {
          "type": "unmatched",
          "marker": "*"
        },
        ", t-s "
      ]
    },
    {
      "type": "para",
      "marker": "t-s",
      "content": [
        {
          "type": "unmatched",
          "marker": "*"
        },
        ", or t-e "
      ]
    },
    {
      "type": "para",
      "marker": "t-e",
      "content": [
        {
          "type": "unmatched",
          "marker": "*"
        },
        " markers. ts is a standalone translator's section milestone, and I guess the others are shorthands for ts-s and ts-e. Paratext puts a structural space before the closing marker on all three even though it should not be there."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "5",
          "sid": "2SA 1:5"
        }
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "6",
          "sid": "2SA 1:6"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Leading attributes"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the id marker at the top of this book for its code leading attribute"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the chapter marker at the top of this chapter for its number leading attribute."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the many verse markers in this chapter for their number leading attribute."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the Footnotes and crossrefs section for footnote and crossref caller leading attribute."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "7",
          "sid": "2SA 1:7"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Text content attributes"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "periph has alt as its text content attribute, but periph is unfortunately only supported in peripheral books (FRT, BAK, INT, and OTH) in Paratext 9.5. Paratext splits these peripheral books into a separate file for each peripheral when outputting to USX. Please see the OTH book for examples of periph markers. Note that periph's id attribute cannot use default attribute syntax; it must be named."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "usfm, usx, and USJ markers have version as their text content attribute, but the usfm marker is unfortunately not present on this document because it uses USFM 3.0, so spec indicates it should not be present."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "8",
          "sid": "2SA 1:8"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Custom attributes"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This ",
        {
          "type": "char",
          "marker": "wj",
          "x-custom-attribute-1": "Stuff",
          "z-custom-attribute-2": "Things",
          "content": [
            "character marker"
          ]
        },
        " has two custom attributes. Custom attributes are supposed to start with x or z according to spec."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This ",
        {
          "type": "char",
          "marker": "wj",
          "custom-attribute-no-prefix": "Bad",
          "custom-attribute-no-prefix-2": "Attributes",
          "content": [
            "character marker"
          ]
        },
        " has two unknown attributes that do not start with x or z. Paratext treats them just like custom attributes."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "9",
          "sid": "2SA 1:9"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Attribute markers"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the Footnotes and crossrefs section for testing the cat marker on footnotes and crossrefs."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the chapter marker at the top of this chapter for testing ca and cp being applied to the chapter marker as attribute markers."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the chapter marker at the top of chapter 2 for not closing ca which leads it to be its own separate marker. Then cp is also its own separate marker afterward and can contain other markers as content."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "See the chapter marker at the top of chapter 3 for testing cp after the chapter marker with content in it, which should make the cp stay as its own independent marker."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Note: All remaining tests of attribute markers will also have leading attributes because v and c are the only markers left with attribute markers to test, and they both have leading attributes."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "10",
          "altnumber": "10 va",
          "pubnumber": "10 vp",
          "sid": "2SA 1:10"
        },
        "This verse marker has simple va and vp with no space between or after. Paratext and the spec treat this the same way: both markers turn into attributes on the marker in USX and USJ, and there are no spaces in the text content."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "11",
          "altnumber": "11 va",
          "pubnumber": "11 vp",
          "sid": "2SA 1:11"
        },
        " This verse marker has simple va and vp with no space between but with a space after. The spec indicates there is optional whitespace after attribute markers (one space is output after attribute markers except cat in canonical form), so this space should not be in the text content. However, Paratext treats all spaces after attribute markers as text content, so Paratext will output a space after the vp."
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
          "altnumber": "12 va",
          "sid": "2SA 1:12"
        },
        " ",
        {
          "type": "char",
          "marker": "vp",
          "content": [
            "11 vp"
          ]
        },
        "This verse marker has simple va and vp with a space between but not after. This space should be ignored as part of optional structural space according to spec, but Paratext treats it as text content. As such, Paratext will output altnumber on the verse marker, but the vp will be its own separate marker."
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
          "sid": "2SA 1:13"
        },
        {
          "type": "char",
          "marker": "va",
          "content": [
            "13 ",
            {
              "type": "char",
              "marker": "wj",
              "content": [
                "va "
              ]
            }
          ]
        },
        {
          "type": "char",
          "marker": "vp",
          "content": [
            "13 vp"
          ]
        },
        "This verse marker has va with marker content in it, which makes it a standalone marker. Random ",
        {
          "type": "char",
          "marker": "va",
          "content": [
            "va"
          ]
        },
        " without the verse marker also becomes a standalone marker. va does not seem to be allowed to be its own standalone marker according to spec, but it works in Paratext. The vp after the va is standalone because it is no longer connected to the verse marker."
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
          "altnumber": "14",
          "sid": "2SA 1:14"
        },
        {
          "type": "char",
          "marker": "vp",
          "content": [
            "14 ",
            {
              "type": "char",
              "marker": "wj",
              "content": [
                "vp"
              ]
            }
          ]
        },
        "This verse marker has vp with marker content in it, which makes it a standalone marker. Random ",
        {
          "type": "char",
          "marker": "vp",
          "content": [
            "vp"
          ]
        },
        " without the verse marker also becomes a standalone marker. The va before the vp appropriately becomes altnumber on the verse marker."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "15",
          "sid": "2SA 1:15"
        },
        {
          "type": "char",
          "marker": "va",
          "closed": "false",
          "content": [
            "15 va "
          ]
        },
        {
          "type": "char",
          "marker": "vp",
          "closed": "false",
          "content": [
            "15 vp This verse marker has va and vp without closing markers. Neither of these markers becomes an attribute in USX or USJ because both have closed=\\"false\\" and are therefore not simple markers."
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This paragraph contains a random ",
        {
          "type": "char",
          "marker": "ca",
          "content": [
            "ca with an ",
            {
              "type": "char",
              "marker": "wj",
              "content": [
                "inline marker inside"
              ]
            }
          ]
        },
        " not after the chapter marker, which becomes a standalone marker. ca does not seem to be allowed to be its own standalone marker according to spec, but it works in Paratext."
      ]
    },
    {
      "type": "para",
      "marker": "cp",
      "content": [
        "This paragraph is a random cp with an ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "inline marker inside"
          ]
        },
        " not after the chapter marker, which becomes a standalone marker."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "16",
          "sid": "2SA 1:16"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Whitespace"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Tilde should be a NBSP in USX and USJ"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Double slash should be an optbreak in USX and USJ. Here ",
        {
          "type": "optbreak"
        },
        " is one with spaces around it. Here",
        {
          "type": "optbreak"
        },
        "is one without spaces around it."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Paratext 9.5's unformatted view leaves a space after the number on verse markers, but the standard view does not. This seems like a bug in the unformatted view."
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
          "sid": "2SA 1:17"
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "TODO: add some whitespace character tests"
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "18",
          "sid": "2SA 1:18"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Figures"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "There is a figure here ",
        {
          "type": "figure",
          "marker": "fig",
          "file": "platform-bible-discord.png",
          "size": "col",
          "ref": "1.13"
        },
        " . It has a space on both sides. Only the three required attributes are present and in the order in which they are listed in the spec. The attribute src in USFM should be file in USX and USJ."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "There is a figure here",
        {
          "type": "figure",
          "marker": "fig",
          "alt": "Description Here",
          "file": "platform-bible-discord.png",
          "size": "span",
          "loc": "Location here",
          "copy": "Copyright here",
          "ref": "1.13",
          "content": [
            "Caption Here"
          ]
        },
        ". It has no spaces around it. All six attributes are present and are not in the order in which they are listed in the spec. The attribute src in USFM should be file in USX and USJ."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "19",
          "sid": "2SA 1:19"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Lists"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Following is a normal list with a header, entries, and footer. It has – at the start of each line like in the documentation example."
      ]
    },
    {
      "type": "para",
      "marker": "lh",
      "content": [
        "Header for the ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "normal"
          ]
        },
        " list:"
      ]
    },
    {
      "type": "para",
      "marker": "li1",
      "content": [
        "–First ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "list"
          ]
        },
        " item"
      ]
    },
    {
      "type": "para",
      "marker": "li2",
      "content": [
        "–Subpoint on the first list item"
      ]
    },
    {
      "type": "para",
      "marker": "li3",
      "content": [
        "–Subpoint on the ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "subpoint"
          ]
        },
        " on the first list item"
      ]
    },
    {
      "type": "para",
      "marker": "li1",
      "content": [
        "–Second list item"
      ]
    },
    {
      "type": "para",
      "marker": "li1",
      "content": [
        "–Third list item"
      ]
    },
    {
      "type": "para",
      "marker": "lf",
      "content": [
        "Footer for the normal list."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Following is an embedded list with just entries."
      ]
    },
    {
      "type": "para",
      "marker": "lim1",
      "content": [
        "First embedded list item"
      ]
    },
    {
      "type": "para",
      "marker": "lim1",
      "content": [
        "Second embedded list item"
      ]
    },
    {
      "type": "para",
      "marker": "lim1",
      "content": [
        "Third embedded list item"
      ]
    },
    {
      "type": "para",
      "marker": "lim2",
      "content": [
        "Subpoint on the third embedded list item"
      ]
    },
    {
      "type": "para",
      "marker": "lim3",
      "content": [
        "Subpoint on the subpoint on the third embedded list item"
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "20",
          "sid": "2SA 1:20"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Tables"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Following is a table with various kinds of cells and a header row. Paratext only supports th1 through th12 because that is all that is in usfm.sty. Note that USFM 3.1 does not require closing markers on table cells."
      ]
    },
    {
      "type": "table",
      "content": [
        {
          "type": "table:row",
          "marker": "tr",
          "content": [
            {
              "type": "table:cell",
              "marker": "th1",
              "align": "start",
              "content": [
                "Header 1"
              ]
            },
            {
              "type": "table:cell",
              "marker": "th2",
              "align": "start",
              "content": [
                "Header 2 space after "
              ]
            },
            {
              "type": "table:cell",
              "marker": "thc3",
              "align": "center",
              "colspan": "2",
              "content": [
                "Header 3-4 centered"
              ]
            },
            {
              "type": "table:cell",
              "marker": "thr5",
              "align": "end",
              "content": [
                "Header 5 right"
              ]
            }
          ]
        },
        {
          "type": "table:row",
          "marker": "tr",
          "content": [
            {
              "type": "table:cell",
              "marker": "tc1",
              "align": "start",
              "content": [
                "Row 1 cell 1"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc2",
              "align": "start",
              "content": [
                "Row 1 cell 2 space after "
              ]
            },
            {
              "type": "table:cell",
              "marker": "thc3",
              "align": "center",
              "content": [
                "Row 1 cell 3 centered"
              ]
            },
            {
              "type": "table:cell",
              "marker": "thr4",
              "align": "end",
              "colspan": "2",
              "content": [
                "Row 1 cell 4-5 right"
              ]
            }
          ]
        },
        {
          "type": "table:row",
          "marker": "tr",
          "content": [
            {
              "type": "table:cell",
              "marker": "tcr1",
              "align": "end",
              "colspan": "4",
              "content": [
                "Row 2 cell 1-4 right"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc5",
              "align": "start",
              "content": [
                "Row 2 cell 5"
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Following is a table with 6 columns but no header row. Paratext does not support tc13 or higher and therefore makes two separate tables of one row each on this line, but it interestingly allows having multiple tc5 cells in one row. The spec does not appear to impose any limits on the column number."
      ]
    },
    {
      "type": "table",
      "content": [
        {
          "type": "table:row",
          "marker": "tr",
          "content": [
            {
              "type": "table:cell",
              "marker": "tc1",
              "align": "start",
              "content": [
                "r1c1"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc2",
              "align": "start",
              "content": [
                "r1c2 with closed wj ",
                {
                  "type": "char",
                  "marker": "wj",
                  "content": [
                    "marker"
                  ]
                },
                " space after "
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc3",
              "align": "start",
              "content": [
                "r1c3"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc4",
              "align": "start",
              "content": [
                "r1c4"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc5",
              "align": "start",
              "content": [
                "r1c5 "
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc5",
              "align": "start",
              "content": [
                "r1c5 again "
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "tc13",
      "content": [
        "r1c13"
      ]
    },
    {
      "type": "table",
      "content": [
        {
          "type": "table:row",
          "marker": "tr",
          "content": [
            {
              "type": "table:cell",
              "marker": "tc1",
              "align": "start",
              "content": [
                "r2c1"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc2",
              "align": "start",
              "content": [
                "r2c2 with unclosed wj ",
                {
                  "type": "char",
                  "marker": "wj",
                  "closed": "false",
                  "content": [
                    "marker space after "
                  ]
                }
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc3",
              "align": "start",
              "content": [
                "r2c3"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc4",
              "align": "start",
              "content": [
                "r2c4"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc5",
              "align": "start",
              "content": [
                "r2c5"
              ]
            },
            {
              "type": "table:cell",
              "marker": "tc5",
              "align": "start",
              "content": [
                "r2c5 again "
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "tc13",
      "content": [
        "r2c13"
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "21",
          "sid": "2SA 1:21"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Periphs"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "periph is unfortunately only supported in peripheral books (FRT, BAK, INT, and OTH) in Paratext 9.5. Paratext splits these peripheral books into a separate file for each peripheral when outputting to USX. Please see the OTH book for examples of periph markers."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "22",
          "sid": "2SA 1:22"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Custom markers"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Following is a custom marker that is unknown (not in custom.sty or markers.ext). Paratext translates unknown markers to para type markers in USX. Custom markers must start with z. "
      ]
    },
    {
      "type": "para",
      "marker": "zUnknownCustomMarker",
      "content": [
        "This text is ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "in the custom"
          ]
        },
        " marker."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "23-24",
          "sid": "2SA 1:23-24"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Verse range"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This is a verse range."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "25",
          "sid": "2SA 1:25"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Refs"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Paratext 9.5 standard view does not support entering an independent ref marker; it just replaces the ref with its text content. However, it will allow an unclosed ref marker (the contents are all put in the text content of the marker; the default attribute loc does not work): "
      ]
    },
    {
      "type": "para",
      "marker": "ref",
      "content": [
        "2Sam 1:1|REV 1:1"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "Also, if you enter a ref marker in the unformatted view and don't touch it in the standard view, it will work:"
      ]
    },
    {
      "type": "para",
      "marker": "p"
    },
    {
      "type": "para",
      "marker": "ref",
      "content": [
        "2Sam 1:1|2SA 1:1",
        {
          "type": "unmatched",
          "marker": "ref*"
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This crossref",
        {
          "type": "note",
          "marker": "x",
          "caller": "-",
          "content": [
            {
              "type": "char",
              "marker": "xo",
              "closed": "false",
              "content": [
                "1:21 "
              ]
            },
            {
              "type": "char",
              "marker": "xt",
              "closed": "false",
              "content": [
                "2Sam 1:1; 2Sam 1:2-3."
              ]
            }
          ]
        },
        " has a properly filled out xt marker. Paratext generates ref markers around each Scripture reference in the xt when outputting USX. The ref marker text content is the localized reference, and the loc attribute (default) is the canonized reference. When translated back to USFM, the refs inside the xt need to be removed; only the text content should remain."
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "This paragraph has a properly filled out xt marker: ",
        {
          "type": "char",
          "marker": "xt",
          "content": [
            "2Sam 1:2; 2Sam 1:3"
          ]
        },
        ". Paratext generates ref markers around each Scripture reference in the xt when outputting USX the same way as it does for xt markers in crossrefs as detailed in the previous paragraph."
      ]
    },
    {
      "type": "para",
      "marker": "b"
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "26",
          "sid": "2SA 1:26"
        },
        {
          "type": "char",
          "marker": "bd",
          "closed": "false",
          "content": [
            "Sidebars"
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "There is a closed sidebar after this paragraph. It has the category \\"Test Category\\". Note that Paratext's Standard view normalizes out any space before the closing cat marker, so there cannot be trailing space on the category unless you use a different view. It seems the spec allows trailing space there as part of the text content of the marker."
      ]
    },
    {
      "type": "sidebar",
      "marker": "esb",
      "category": "Test Category",
      "content": [
        {
          "type": "para",
          "marker": "p",
          "content": [
            "This paragraph is in the sidebar. The sidebar can contain many things like ",
            {
              "type": "char",
              "marker": "wj",
              "content": [
                "character markers"
              ]
            },
            ", ",
            {
              "type": "ms",
              "marker": "qt1-s"
            },
            " milestones ",
            {
              "type": "ms",
              "marker": "qt1-e"
            },
            ", and more paragraphs."
          ]
        },
        {
          "type": "para",
          "marker": "p",
          "content": [
            "This is a second paragraph in the sidebar. The sidebar will end at esbe marker."
          ]
        }
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        "There is a sidebar that is not closed after this paragraph. The entire rest of the chapter will be in this sidebar because sidebars automatically close at the end of the chapter."
      ]
    },
    {
      "type": "sidebar",
      "marker": "esb",
      "closed": "false",
      "content": [
        {
          "type": "para",
          "marker": "p",
          "content": [
            "This paragraph is in the sidebar."
          ]
        },
        {
          "type": "para",
          "marker": "b"
        },
        {
          "type": "para",
          "marker": "p",
          "content": [
            {
              "type": "verse",
              "marker": "v",
              "number": "27",
              "sid": "2SA 1:27"
            },
            "This is ",
            {
              "type": "char",
              "marker": "wj",
              "content": [
                "still"
              ]
            },
            " in the sidebar."
          ]
        }
      ]
    }
  ]
}`);

/**
 * TestUSFM 2 Samuel 2 output in USJ from Platform.Bible (single backslash replaced with double
 * backslash to properly escape quotes; version 3.1 replaced with 3.0 in the USJ marker because that
 * is more accurate. The USJ version handling isn't great yet).
 */
const testUSFM2SACh2Usj = JSON.parse(`{
  "type": "USJ",
  "version": "3.0",
  "content": [
    {
      "type": "chapter",
      "marker": "c",
      "number": "2",
      "sid": " 2"
    },
    {
      "type": "char",
      "marker": "ca",
      "closed": "false",
      "content": [
        "2 ca"
      ]
    },
    {
      "type": "para",
      "marker": "cp",
      "content": [
        "2 cp ",
        {
          "type": "note",
          "marker": "f",
          "caller": "+",
          "content": [
            {
              "type": "char",
              "marker": "fr",
              "closed": "false",
              "content": [
                "2.0 "
              ]
            },
            {
              "type": "char",
              "marker": "ft",
              "closed": "false",
              "content": [
                "For some reason, Paratext's backslash menu allows you to insert a note and nothing else in a cp marker. You can add "
              ]
            },
            {
              "type": "char",
              "marker": "wj",
              "content": [
                "character markers"
              ]
            },
            " inside the note."
          ]
        },
        " more ",
        {
          "type": "char",
          "marker": "wj",
          "content": [
            "cp"
          ]
        },
        " text"
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1",
          "sid": ""
        },
        "Notice that this chapter's attribute marker ca does not apply to the chapter as the altnumber attribute because the ca is not closed and therefore has the closed=\\"true\\" attribute. Because ca is not translated to an attribute, attribute marker cp also follows suit and is not translated into pubnumber. This prior separation of cp from the chapter marker allows Paratext 9.5 to understand that it should make cp an independent marker that may have other marker contents in it. But see chapter 3 in which Paratext 9.5 fails to recognize that cp should be an independent marker."
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
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "3",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "4",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "5",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "6",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "7",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "8",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "9",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "10",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "11",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "12",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "13",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "14",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "15",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "16",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "17",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "18",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "19",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "20",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "21",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "22",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "23",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "24",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "25",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "26",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "27",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "28",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "29",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "30",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "31",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "32",
          "sid": ""
        }
      ]
    }
  ]
}`);

/**
 * TestUSFM 2 Samuel 3 output in USJ from Platform.Bible (single backslash replaced with double
 * backslash to properly escape quotes; version 3.1 replaced with 3.0 in the USJ marker because that
 * is more accurate. The USJ version handling isn't great yet).
 */
const testUSFM2SACh3Usj = JSON.parse(`{
  "type": "USJ",
  "version": "3.0",
  "content": [
    {
      "type": "chapter",
      "marker": "c",
      "number": "3",
      "altnumber": "3 ca",
      "pubnumber": "3 cp",
      "sid": " 3"
    },
    {
      "type": "char",
      "marker": "wj",
      "content": [
        "wj marker "
      ]
    },
    {
      "type": "para",
      "marker": "p",
      "content": [
        {
          "type": "verse",
          "marker": "v",
          "number": "1",
          "sid": ""
        },
        "Notice that this chapter's attribute marker ca properly applies to the chapter as the altnumber attribute. However, its attribute marker cp should not be translated into pubnumber because it has markers in it. But Paratext 9.5 does not realize cp should be its own marker and improperly applies the part of cp before any markers as the pubnumber and puts the rest of the contents after the chapter marker. ",
        {
          "type": "verse",
          "marker": "v",
          "number": "2",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "3",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "4",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "5",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "6",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "7",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "8",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "9",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "10",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "11",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "12",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "13",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "14",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "15",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "16",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "17",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "18",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "19",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "20",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "21",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "22",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "23",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "24",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "25",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "26",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "27",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "28",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "29",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "30",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "31",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "32",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "33",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "34",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "35",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "36",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "37",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "38",
          "sid": ""
        },
        {
          "type": "verse",
          "marker": "v",
          "number": "39",
          "sid": ""
        }
      ]
    }
  ]
}`);

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

describe('Transform USJ 3.1 to spec USFM 3.1', () => {
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
