import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';

const usxFootnotes = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <note caller="+" style="f"><char style="fr" closed="false">1.11</char><char style="ft" closed="false">This is a simple footnote</char></note>
  <note caller="+" style="f"><char style="fr" closed="false">1.17</char><char style="fq" closed="false">generations</char><char style="ft" closed="false">Note missing space after 'generations'. Some manuscripts say </char><char style="fqa">epochs</char> or put the word in <char style="fv">18</char> for emphasis </note>
  <note caller="-" style="x"><char style="xo" closed="false">1:21 </char><char style="xt" closed="false">Sal. 130.8.</char></note>
  <note caller="+" style="f"><char style="fr" closed="false">1.34</char><char style="ft" closed="false">The auto-incremented caller for this note should be the third letter or symbol, not the fourth</char></note>
  <note caller="+" style="f"><char style="fr" closed="false">1.35 </char><char style="ft" closed="false">Or </char><char style="fqa" closed="false">before him in love, </char><char style="fv" closed="false">5</char><char style="fqa" closed="false">having predestined us</char></note>
  <note caller="+" style="f"><char style="fr" closed="false">1.46 </char><char style="fk" closed="false">Baptism: </char>Immersion in water</note>
  <note caller="+" style="f"><char style="fr" closed="false">1.47 </char>This is the first line of the footnote.<char style="fp" closed="false">This is <char style="fk" closed="false">unusual</char>.</char></note>
  <note caller="+" style="f">No target reference and the text is not marked with ft.</note>
</usx>
`;
export const usjFootnotes = usxStringToUsj(usxFootnotes).content.filter(
  (m) => typeof m !== 'string',
);
