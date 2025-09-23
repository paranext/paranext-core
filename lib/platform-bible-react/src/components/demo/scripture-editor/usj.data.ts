import { AnnotationRange } from '@eten-tech-foundation/platform-editor';
import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';

const usxEmpty = '<usx version="3.1" />';
export const usjEmpty = usxStringToUsj(usxEmpty);

const usxWeb = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="PSA" style="id">World English Bible (WEB)</book>
  <para style="mt1">The Psalms</para>
  <chapter number="1" style="c" sid="PSA 1" />
  <para style="q1">
    <verse number="1" style="v" sid="PSA 1:1" />Blessed is the man who doesn’t walk in the counsel of the wicked<note caller="+" style="f"><char style="fr">1:1 </char><char style="ft">Or "sinful"</char></note>,</para>
  <para style="q2" vid="PSA 1:1">nor stand on the path<note caller="+" style="f"><char style="fr">1:1 </char><char style="ft">Hebrew: "way"</char></note> of sinners,</para>
  <para style="q2" vid="PSA 1:1">nor sit in the seat of scoffers;<verse eid="PSA 1:1" /></para>
  <para style="q1">
    <verse number="2" style="v" sid="PSA 1:2" /><note caller="+" style="f"><char style="fr" closed="false">1:2 </char><char style="ft" closed="false">After verse</char></note> but his delight is in Yahweh’s<note caller="+" style="f"><char style="fr" closed="false">1:2 </char><char style="ft" closed="false">“Yahweh” is God’s proper Name, sometimes rendered “LORD” (all caps) in other translations.</char></note> law.<note caller="+" style="f"><char style="fr" closed="false">1:2 </char><char style="ft" closed="false">End of Para</char></note></para>
  <para style="q2" vid="PSA 1:2">On his law he meditates day and night.<note caller="+" style="f"><char style="fr" closed="false">1:2 </char><char style="ft" closed="false">End of Doc</char></note><verse eid="PSA 1:2" /></para>
</usx>
`;
export const usjWeb = usxStringToUsj(usxWeb);

// Word "man" inside first q1 of WEB PSA 1:1.
export const annotationRangeWeb1: AnnotationRange = {
  start: { jsonPath: '$.content[3].content[1]', offset: 15 },
  end: { jsonPath: '$.content[3].content[1]', offset: 18 },
};

// Phrase "man who" inside first q1 of WEB PSA 1:1.
export const annotationRangeWeb2: AnnotationRange = {
  start: { jsonPath: '$.content[3].content[1]', offset: 15 },
  end: { jsonPath: '$.content[3].content[1]', offset: 22 },
};

// Public-domain Hebrew RTL snippet (Psalm 1:1-2, unpointed)
const usxHebrew = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="PSA" style="id">תהילים</book>
  <para style="mt1">תהילים</para>
  <chapter number="1" style="c" sid="PSA 1" />
  <para style="q1">
    <verse number="1" style="v" sid="PSA 1:1" />אשרי האיש אשר לא הלך בעצת רשעים,</para>
  <para style="q2" vid="PSA 1:1">ובדרך חטאים לא עמד,</para>
  <para style="q2" vid="PSA 1:1">ובמושב לצים לא ישב.<verse eid="PSA 1:1" /></para>
  <para style="q1">
    <verse number="2" style="v" sid="PSA 1:2" />כי אם בתורת יהוה חפצו,</para>
  <para style="q2" vid="PSA 1:2">ובתורתו יהגה יומם ולילה.<verse eid="PSA 1:2" /></para>
</usx>
`;
export const usjHebrew = usxStringToUsj(usxHebrew);
