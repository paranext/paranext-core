import { Usj, USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import { UsjReaderWriter } from './usj-reader-writer';
import { usjMat1 } from './footnote-util-test.usj.data';

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

describe('Transform USJ to USFM', () => {
  test('toUsfm properly transforms Matthew 1-2 WEB', () => {
    const usjDoc = new UsjReaderWriter(matthew1And2Usj);

    // Start from a verse node
    const resultingUsfm = usjDoc.toUsfm();
    expect(resultingUsfm).toBe(matthew1And2Usfm);
  });
});
