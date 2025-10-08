import { usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';

const usxMat1 = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.0">
  <book code="MAT" style="id">Reina Valera 1960</book>
  <para style="h">SAN MATEO</para>
  <para style="mt2">EL SANTO EVANGELIO SEGÚN</para>
  <para style="mt">SAN MATEO</para>
  <para style="toc1">El santo evangelio según</para>
  <para style="toc2">San Mateo</para>
  <para style="toc3">Mt</para>
  <chapter number="1" style="c" sid="MAT 1" />
  <para style="s">Genealogía de Jesucristo</para>
  <para style="r">(Lc. 3.23-38)</para>
  <para style="p">
    <verse number="1" style="v" sid="MAT 1:1" />Libro de la genealogía de Jesucristo, hijo de David, hijo de Abraham.<verse eid="MAT 1:1" /></para>
  <para style="p">
    <verse number="2" style="v" sid="MAT 1:2" />Abraham engendró a Isaac, Isaac a Jacob, y Jacob a Judá y a sus hermanos. <verse eid="MAT 1:2" /><verse number="3" style="v" sid="MAT 1:3" />Judá engendró de Tamar a Fares y a Zara, Fares a Esrom, y Esrom a Aram. <verse eid="MAT 1:3" /><verse number="4" style="v" sid="MAT 1:4" />Aram engendró a Aminadab, Aminadab a Naasón, y Naasón a Salmón. <verse eid="MAT 1:4" /><verse number="5" style="v" sid="MAT 1:5" />Salmón engendró de Rahab a Booz, Booz engendró de Rut a Obed, y Obed a Isaí. <verse eid="MAT 1:5" /><verse number="6" style="v" sid="MAT 1:6" />Isaí engendró al rey David, y el rey David engendró a Salomón de la que fue mujer de Urías. <verse eid="MAT 1:6" /><verse number="7" style="v" sid="MAT 1:7" />Salomón engendró a Roboam, Roboam a Abías, y Abías a Asa. <verse eid="MAT 1:7" /><verse number="8" style="v" sid="MAT 1:8" />Asa engendró a Josafat, Josafat a Joram, y Joram a Uzías. <verse eid="MAT 1:8" /><verse number="9" style="v" sid="MAT 1:9" />Uzías engendró a Jotam, Jotam a Acaz, y Acaz a Ezequías. <verse eid="MAT 1:9" /><verse number="10" style="v" sid="MAT 1:10" />Ezequías engendró a Manasés, Manasés a Amón, y Amón a Josías. <verse eid="MAT 1:10" /><verse number="11" style="v" sid="MAT 1:11" />Josías engendró a Jeconías y a sus hermanos, en el tiempo de la deportación a Babilonia.<note caller="-" style="x"><char style="xo" closed="false">1:11 </char><char style="xt" closed="false">2 R. 24.14-15; 2 Cr. 36.10; Jer. 27.20.</char></note><verse eid="MAT 1:11" /></para>
  <para style="p">
    <verse number="12" style="v" sid="MAT 1:12" />Después de la deportación a Babilonia, Jeconías engendró a Salatiel, y Salatiel a Zorobabel. <verse eid="MAT 1:12" /><verse number="13" style="v" sid="MAT 1:13" />Zorobabel engendró a Abiud, Abiud a Eliaquim, y Eliaquim a Azor. <verse eid="MAT 1:13" /><verse number="14" style="v" sid="MAT 1:14" />Azor engendró a Sadoc, Sadoc a Aquim, y Aquim a Eliud. <verse eid="MAT 1:14" /><verse number="15" style="v" sid="MAT 1:15" />Eliud engendró a Eleazar, Eleazar a Matán, Matán a Jacob; <verse eid="MAT 1:15" /><verse number="16" style="v" sid="MAT 1:16" />y Jacob engendró a José, marido de María, de la cual nació Jesús, llamado el Cristo.<verse eid="MAT 1:16" /></para>
  <para style="p">
    <verse number="17" style="v" sid="MAT 1:17" />De manera que todas las generaciones<note caller="+" style="f"><char style="fr" closed="false">1.17</char><char style="fq" closed="false">generaciones</char><char style="ft" closed="false">Some manuscripts say </char><char style="fqa">epocas</char> <char style="fp" closed="false">or put the word in </char><char style="fv">18</char> for emphasis </note> desde Abraham hasta David son catorce; desde<note caller="+" style="fe"><char style="fr" closed="false">1.17 </char><char style="ft" closed="false">How are end-notes used in Scripture?</char></note> David hasta la deportación a Babilonia, catorce; y desde la deportación a Babilonia hasta Cristo, catorce.<verse eid="MAT 1:17" /></para>
  <para style="s">Nacimiento de Jesucristo</para>
  <para style="r">(Lc. 2.1-7)</para>
  <para style="p">
    <verse number="18" style="v" sid="MAT 1:18" />El nacimiento de Jesucristo fue así: Estando desposada María su madre con José,<note caller="-" style="x"><char style="xo" closed="false">1:18 </char><char style="xt" closed="false">Lc. 1.27.</char></note> antes que se juntasen, se halló que había concebido del Espíritu Santo. <verse eid="MAT 1:18" /><verse number="19" style="v" sid="MAT 1:19" />José su marido, como era justo, y no quería infamarla, quiso dejarla secretamente. <verse eid="MAT 1:19" /><verse number="20" style="v" sid="MAT 1:20" />Y pensando él en esto, he aquí un ángel del Señor le apareció en sueños y le dijo: José, hijo de David, no temas recibir a María tu mujer, porque lo que en ella es engendrado, del Espíritu Santo es. <verse eid="MAT 1:20" /><verse number="21" style="v" sid="MAT 1:21" />Y dará a luz un hijo, y llamarás su nombre<note caller="-" style="x"><char style="xo" closed="false">1:21 </char><char style="xt" closed="false">Lc. 1.31.</char></note> JESÚS,<note caller="+" style="f"><char style="ft" closed="false">Esto es,</char></note> <char style="it" closed="false">Salvador. </char><unmatched marker="f*" /> porque él salvará a su pueblo de sus pecados.<note caller="-" style="x"><char style="xo" closed="false">1:21 </char><char style="xt" closed="false">Sal. 130.8.</char></note> <verse eid="MAT 1:21" /><verse number="22" style="v" sid="MAT 1:22" />Todo esto aconteció para que se cumpliese lo dicho por el Señor por medio del profeta, cuando dijo:<verse eid="MAT 1:22" /></para>
  <para style="q1">
    <verse number="23" style="v" sid="MAT 1:23" />He aquí, una virgen concebirá y dará a luz un hijo,</para>
  <para style="q1" vid="MAT 1:23">Y llamarás su nombre Emanuel,<note caller="-" style="x"><char style="xo" closed="false">1:23 </char><char style="xt" closed="false">Is. 7.14.</char></note></para>
  <para style="m" vid="MAT 1:23">que traducido es: Dios con nosotros.<verse eid="MAT 1:23" /></para>
  <para style="p">
    <verse number="24" style="v" sid="MAT 1:24" />Y despertando José del sueño, hizo como el ángel del Señor le había mandado<note caller="+" style="f"><char style="fr" closed="false">1.24 </char><char style="fq" closed="false">mandado </char><char style="ft" closed="false" /></note>, y recibió a su mujer. <verse eid="MAT 1:24" /><verse number="25" style="v" sid="MAT 1:25" />Pero no la conoció hasta que dio a luz a su hijo primogénito; y le puso por nombre JESÚS.<note caller="-" style="x"><char style="xo" closed="false">1:25 </char><char style="xt" closed="false">Lc. 2.21.</char></note><verse eid="MAT 1:25" /></para>
  <chapter eid="MAT 1" />
</usx>
`;
export const usjMat1 = usxStringToUsj(usxMat1);
