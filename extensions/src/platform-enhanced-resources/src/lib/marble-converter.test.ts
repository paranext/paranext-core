// Test-only file: duck-typed traversal of USJ content (string | MarkerObject)
// requires non-null assertions and Record-style casts; treating null/undefined
// as the same "absent" value is needed when walking unknown-shape input.
/* eslint-disable no-type-assertion/no-type-assertion, no-null/no-null */
import { describe, it, expect } from 'vitest';
import { convertMarbleChapterXml, type MarbleConversionResult } from './marble-converter';

/**
 * Test suite for the marble-aware USX→USJ converter (FN-014).
 *
 * Contract: takes marble chapter XML (as returned by backend M-019 `loadMarbleChapterXml`, with
 * `id="..."` already stamped on `<wg>` and `<note>` elements) and produces:
 *
 * - Clean USJ that platform-scripture-editor can render in read-only mode
 * - An annotation map keyed by JSON path, kind ('word' | 'note'), and the stable token ID
 *   round-tripped from the backend.
 *
 * The IDs round-trip back via `buildTooltipData` / `buildNoteData` PAPI commands; the backend's
 * TooltipService.FindTokenOrThrow looks them up by `int.TryParse(tokenId)`. Hence this converter
 * must NOT modify, regenerate, or namespace the IDs - it must surface them verbatim.
 */
describe('marble-converter', () => {
  describe('convertMarbleChapterXml', () => {
    describe('shape', () => {
      it('returns a USJ object with type=USJ and version=3.1', () => {
        const result = convertMarbleChapterXml(buildMinimalChapterXml());
        expect(result.usj.type).toBe('USJ');
        expect(result.usj.version).toBe('3.1');
      });

      it('returns an empty annotations array when no wg or note elements present', () => {
        const result = convertMarbleChapterXml(buildBareChapterXml());
        expect(result.annotations).toEqual([]);
      });
    });

    describe('chapter and verse markers', () => {
      it('emits a chapter MarkerObject with type=chapter, marker=c, number=N', () => {
        const result = convertMarbleChapterXml(buildMinimalChapterXml({ chapter: '3' }));
        const chapter = findFirst(result, (m) => m.type === 'chapter');
        expect(chapter).toBeTruthy();
        expect(chapter!.marker).toBe('c');
        expect(chapter!.number).toBe('3');
      });

      it('reads marble `chapter` attribute, falling back to `number`', () => {
        const xml = `
          <usx_book code="GEN">
            <chapter style="c" number="7"/>
            <para style="p"><verse number="1"/>text</para>
          </usx_book>`;
        const result = convertMarbleChapterXml(xml);
        const chapter = findFirst(result, (m) => m.type === 'chapter');
        expect(chapter!.number).toBe('7');
      });

      it('emits a verse MarkerObject with marker=v and number from pubnumber attribute', () => {
        const result = convertMarbleChapterXml(buildMinimalChapterXml({ verse: '5' }));
        const verse = findFirst(result, (m) => m.type === 'verse');
        expect(verse).toBeTruthy();
        expect(verse!.marker).toBe('v');
        expect(verse!.number).toBe('5');
      });
    });

    describe('paragraph and char passthrough', () => {
      it('emits a para MarkerObject with marker=style', () => {
        const result = convertMarbleChapterXml(buildMinimalChapterXml({ paraStyle: 'q1' }));
        const para = findFirst(result, (m) => m.type === 'para');
        expect(para).toBeTruthy();
        expect(para!.marker).toBe('q1');
      });

      it('emits a char MarkerObject for <char style="nd">God</char>', () => {
        const xml = `
          <usx_book code="GEN">
            <chapter chapter="1"/>
            <para style="p"><char style="nd">God</char></para>
          </usx_book>`;
        const result = convertMarbleChapterXml(xml);
        const charNode = findFirst(result, (m) => m.type === 'char' && m.marker === 'nd');
        expect(charNode).toBeTruthy();
        expect(charNode!.content).toEqual(['God']);
      });
    });

    describe('wg → char with marker=wg', () => {
      it('emits a char MarkerObject with marker=wg for each <wg> element', () => {
        const xml = wrapChapter(`
          <para style="p">
            <verse pubnumber="1"/>
            <wg id="7" strong="H7225">beginning</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const wg = findFirst(result, (m) => m.type === 'char' && m.marker === 'wg');
        expect(wg).toBeTruthy();
        expect(wg!.content).toEqual(['beginning']);
      });

      it('preserves marble attributes (strong) on the emitted char node', () => {
        const xml = wrapChapter(`
          <para style="p">
            <wg id="7" strong="H7225" target_links="00100100100004">beginning</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const wg = findFirst(result, (m) => m.type === 'char' && m.marker === 'wg');
        // Marble attrs surface as direct fields on the MarkerObject so the
        // editor's __unknownAttributes mechanism preserves them through round-trips.
        expect((wg as Record<string, unknown>).strong).toBe('H7225');
        expect((wg as Record<string, unknown>).target_links).toBe('00100100100004');
      });

      it('records a word-kind annotation for each <wg> with the id verbatim and at least one research-link attr', () => {
        const xml = wrapChapter(`
          <para style="p">
            <wg id="7" strong="H7225" lexical_links="SDBH:beginning:001001000">beginning</wg>
            <wg id="9" strong="H0430" thematic_links="Realia:1.2.3">God</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const wordAnns = result.annotations.filter((a) => a.kind === 'word');
        expect(wordAnns).toHaveLength(2);
        expect(wordAnns.map((a) => a.annotationId)).toEqual(['7', '9']);
      });

      it('does NOT record an annotation for a <wg> with no research-link attrs - target_links alone does not qualify', () => {
        // Research-link attrs: lexical_links, thematic_links, image_links, map_links. These are
        // what drive the tooltip / dictionary / encyclopedia / media tabs. `target_links` alone
        // is a cross-reference pointer to other verses (no gloss, no dictionary entry), so a
        // <wg> with only target_links + strong gets no marble-word overlay, no hover, no click
        // filter - matching PT9. Real-world case: Gen 26:8 "When" carries only target_links.
        // The <wg> MarkerObject is still emitted so text renders.
        const xml = wrapChapter(`
          <para style="p">
            <wg id="24321" target_links="00102600800006">When</wg>
            <wg id="7" strong="H7225">beginning</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        expect(result.annotations.filter((a) => a.kind === 'word')).toHaveLength(0);
        // The <wg> MarkerObjects are still emitted so the text renders.
        const wg = findFirst(result, (m) => m.type === 'char' && m.marker === 'wg');
        expect(wg).toBeTruthy();
      });

      it('does NOT record an annotation for a <wg> with only strong (no research links)', () => {
        // Locks in PT9-matching behavior (Matt review #5): a Strong's number alone does not make
        // a word a "research term". The dictionary/encyclopedia/media tabs key off the four
        // research-link attrs; without one of them there's no surface to point at, even if a
        // Strong's lookup could resolve a gloss in principle. If a future backend wants to expose
        // strong-only words as research terms, flip the gate AND update this test together.
        const xml = wrapChapter(`
          <para style="p">
            <wg id="100" strong="H7225">strongOnly</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        expect(result.annotations.filter((a) => a.kind === 'word')).toHaveLength(0);
      });

      it('does NOT record an annotation for a <wg> with only textual_links', () => {
        // `textual_links` is preserved on the char marker node (via WG_LINK_ATTRS) so any
        // downstream consumer can see it, but it has no MarbleAnnotationMetadata slot and no
        // research surface in PT10 today (Matt review #5). A textual_links-only <wg> is inert
        // by design; flipping this gate would require adding a metadata field + a research
        // surface that actually consumes textual variants.
        const xml = wrapChapter(`
          <para style="p">
            <wg id="200" textual_links="some-variant-pointer">textualOnly</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        expect(result.annotations.filter((a) => a.kind === 'word')).toHaveLength(0);
      });

      it('records semicolon-delimited link attributes as string arrays in annotation metadata', () => {
        const xml = wrapChapter(`
          <para style="p">
            <wg id="7" strong="H7225"
                target_links="00100100100004"
                lexical_links="SDBH:beginning:001001000;SDBH:start:002002000"
                thematic_links="">beginning</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const ann = result.annotations.find((a) => a.annotationId === '7');
        expect(ann).toBeTruthy();
        expect(ann!.metadata.strong).toBe('H7225');
        expect(ann!.metadata.targetLinks).toEqual(['00100100100004']);
        expect(ann!.metadata.lexicalLinks).toEqual([
          'SDBH:beginning:001001000',
          'SDBH:start:002002000',
        ]);
        // Empty link string yields an empty array.
        expect(ann!.metadata.thematicLinks).toEqual([]);
      });

      it('annotation usjPath points to the wg char node in the USJ tree', () => {
        const xml = wrapChapter(`
          <para style="p">
            <verse pubnumber="1"/>
            <wg id="7" strong="H7225" lexical_links="SDBH:beginning:001001000">beginning</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const ann = result.annotations.find((a) => a.kind === 'word');
        expect(ann!.usjPath).toMatch(/^\$\.content\[\d+\]\.content\[\d+\]/);
        // Resolve the path - it should land on the wg MarkerObject
        const node = resolveJsonPath(result.usj, ann!.usjPath);
        expect(node).toBeTruthy();
        expect((node as { type?: string; marker?: string }).type).toBe('char');
        expect((node as { type?: string; marker?: string }).marker).toBe('wg');
      });
    });

    describe('note → note with annotation', () => {
      it('emits a note MarkerObject with caller and inner content', () => {
        const xml = wrapChapter(`
          <para style="p">
            <note id="3" style="x" caller="+">
              <char style="xo">1:1 </char>
              <char style="xt">Job 38:4-7</char>
            </note>
            text
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const note = findFirst(result, (m) => m.type === 'note');
        expect(note).toBeTruthy();
        expect(note!.marker).toBe('x');
        expect(note!.caller).toBe('+');
        // Inner content has the two child char nodes
        const innerChars = (note!.content ?? []).filter(
          (c) => typeof c === 'object' && c !== null && (c as { type?: string }).type === 'char',
        );
        expect(innerChars).toHaveLength(2);
      });

      it('records a note-kind annotation with the id verbatim', () => {
        const xml = wrapChapter(`
          <para style="p">
            <note id="3" style="x" caller="+"><char style="xt">ref</char></note>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const noteAnns = result.annotations.filter((a) => a.kind === 'note');
        expect(noteAnns).toHaveLength(1);
        expect(noteAnns[0].annotationId).toBe('3');
        expect(noteAnns[0].metadata.caller).toBe('+');
      });

      it('captures innerXml in note annotation metadata so backend NoteService can read raw note content', () => {
        const xml = wrapChapter(`
          <para style="p">
            <note id="3" style="x" caller="+"><char style="xt">Jer. 4:23</char></note>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const ann = result.annotations.find((a) => a.kind === 'note');
        expect(ann!.metadata.innerXml).toBeTruthy();
        expect(ann!.metadata.innerXml).toContain('Jer. 4:23');
      });
    });

    describe('text content', () => {
      it('preserves inline text nodes between elements as strings in para content', () => {
        const xml = wrapChapter(`
          <para style="p">In the <wg id="7" strong="H7225">beginning</wg> God created.</para>
        `);
        const result = convertMarbleChapterXml(xml);
        const para = findFirst(result, (m) => m.type === 'para');
        expect(para).toBeTruthy();
        const textParts = (para!.content ?? []).filter((c) => typeof c === 'string');
        expect(textParts.join('')).toContain('In the');
        expect(textParts.join('')).toContain('God created.');
      });
    });

    describe('error handling', () => {
      it('throws a clear error for malformed XML', () => {
        expect(() => convertMarbleChapterXml('<not-closed')).toThrow();
      });

      it('throws a clear error when no <usx_book> root is present', () => {
        expect(() => convertMarbleChapterXml('<root><x/></root>')).toThrow(/usx_book/);
      });

      it('throws for empty input', () => {
        expect(() => convertMarbleChapterXml('')).toThrow();
      });
    });

    describe('integration: full chapter shape', () => {
      it('produces a single chapter at the top level with paragraphs nested inside', () => {
        const xml = wrapChapter(`
          <para style="s1">The Creation</para>
          <para style="p">
            <verse pubnumber="1"/>
            In the <wg id="7" strong="H7225" lexical_links="SDBH:beginning:001001000">beginning</wg>
            <wg id="9" strong="H0430" lexical_links="SDBH:god:001001001">God</wg>
            <wg id="11" strong="H1254" lexical_links="SDBH:created:001001002">created</wg>
            the
            <wg id="13" strong="H8064" lexical_links="SDBH:heavens:001001003">heavens</wg>
            and the
            <wg id="15" strong="H0776" lexical_links="SDBH:earth:001001004">earth.</wg>
          </para>
        `);
        const result = convertMarbleChapterXml(xml);
        const chapters = result.usj.content.filter(
          (c) => typeof c === 'object' && c !== null && (c as { type?: string }).type === 'chapter',
        );
        expect(chapters).toHaveLength(1);
        const paras = result.usj.content.filter(
          (c) => typeof c === 'object' && c !== null && (c as { type?: string }).type === 'para',
        );
        expect(paras).toHaveLength(2);
        // 5 wg → 5 word annotations
        expect(result.annotations.filter((a) => a.kind === 'word')).toHaveLength(5);
      });
    });
  });
});

// -- helpers ----------------------------------------------------------------

function buildBareChapterXml(): string {
  return wrapChapter('<para style="p"><verse pubnumber="1"/>just text</para>');
}

function buildMinimalChapterXml(opts?: {
  chapter?: string;
  verse?: string;
  paraStyle?: string;
}): string {
  const chapter = opts?.chapter ?? '1';
  const verse = opts?.verse ?? '1';
  const paraStyle = opts?.paraStyle ?? 'p';
  return `
    <usx_book code="GEN">
      <chapter style="c" code="GEN" chapter="${chapter}"/>
      <para style="${paraStyle}">
        <verse style="v" code="GEN" pubnumber="${verse}"/>
        text content
      </para>
    </usx_book>`;
}

function wrapChapter(innerXml: string): string {
  return `
    <usx_book code="GEN">
      <chapter style="c" code="GEN" chapter="1"/>
      ${innerXml}
    </usx_book>`;
}

type LooseMarker = {
  type?: string;
  marker?: string;
  number?: string;
  caller?: string;
  content?: unknown[];
};

/**
 * Find the first MarkerObject in a USJ tree matching a predicate. Walks `content` arrays
 * recursively. Returns undefined if no match.
 */
function findFirst(
  result: MarbleConversionResult,
  predicate: (m: LooseMarker) => boolean,
): LooseMarker | undefined {
  // Recursive duck-typed traversal: returns the first match in document order.
  function walk(node: unknown): LooseMarker | undefined {
    if (typeof node !== 'object' || node === undefined || node === null) return undefined;
    // Required for duck-typed walk over USJ content (mix of strings + markers).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const m = node as LooseMarker;
    if (m.type !== undefined && predicate(m)) return m;
    if (Array.isArray(m.content)) {
      return m.content.reduce<LooseMarker | undefined>(
        (found, child) => found ?? walk(child),
        undefined,
      );
    }
    return undefined;
  }
  return result.usj.content.reduce<LooseMarker | undefined>(
    (found, item) => found ?? walk(item),
    undefined,
  );
}

/** Resolve a USJ JSON path of the form `$.content[N].content[M]...` */
function resolveJsonPath(usj: unknown, path: string): unknown {
  if (path === '$' || path === '') return usj;
  const indexes = [...path.matchAll(/content\[(\d+)\]/g)].map((m) => Number(m[1]));
  return indexes.reduce<unknown>((node, idx) => {
    if (typeof node !== 'object' || node === undefined || node === null) return undefined;
    // Resolving a typed path through unknown document content; the cast is local.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const { content } = node as { content?: unknown[] };
    if (!Array.isArray(content)) return undefined;
    return content[idx];
  }, usj);
}
