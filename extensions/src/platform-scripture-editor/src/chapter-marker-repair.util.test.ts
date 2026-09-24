import { describe, expect, it, vi } from 'vitest';
import type { SelectionRange } from '@eten-tech-foundation/platform-editor';
import {
  MarkerContent,
  MarkerObject,
  Usj,
  usxStringToUsj,
} from '@eten-tech-foundation/scripture-utilities';
import {
  applyChapterSavePreparation,
  CARET_AT_DOCUMENT_END,
  prepareUsjForChapterSave,
  repairChapterMarkers,
} from './chapter-marker-repair.util';

/** A USJ document from a flat list of content items. */
function usjOf(...content: MarkerContent[]): Usj {
  return { type: 'USJ', version: '3.1', content };
}

const ID_GEN: MarkerContent = { type: 'book', marker: 'id', code: 'GEN', content: ['GEN'] };
const chapter = (number: string, extras: Record<string, string> = {}): MarkerContent => ({
  type: 'chapter',
  marker: 'c',
  number,
  ...extras,
});
const para = (marker: string, text: string): MarkerContent => ({
  type: 'para',
  marker,
  content: [text],
});

describe('repairChapterMarkers — Paratext 9 FixChapterNumbers parity', () => {
  it('leaves a document alone when the chapter number is not valid (PT9 row 1)', () => {
    const input = usjOf(para('p', '1'), para('p', '2'));
    const { usj, didRepair } = repairChapterMarkers(input, -1);
    expect(didRepair).toBe(false);
    expect(usj.content).toEqual(input.content);
  });

  it('allows chapter 1 to carry no chapter marker at all (PT9 row 2)', () => {
    const input = usjOf(ID_GEN, para('ip', 'intro'));
    const { usj, didRepair } = repairChapterMarkers(input, 1);
    expect(didRepair).toBe(false);
    expect(usj.content).toEqual(input.content);
  });

  it('forces a chapter-1 marker to number 1 (PT9 row 3)', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(para('p', 'junk'), chapter('2')), 1);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([para('p', 'junk'), chapter('1')]);
  });

  it('keeps the first chapter-1 marker that is not followed by an introduction (PT9 row 4)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(para('ip', 'p1'), chapter('1'), para('ip', 'p2'), chapter('1'), para('p', 'p3')),
      1,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([
      para('ip', 'p1'),
      para('ip', 'p2'),
      chapter('1'),
      para('p', 'p3'),
    ]);
  });

  it('keeps an already-non-intro-followed first chapter-1 marker (PT9 row 5)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(para('ip', 'p1'), chapter('1'), para('p', 'p2'), chapter('1'), para('p', 'p3')),
      1,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([para('ip', 'p1'), chapter('1'), para('p', 'p2'), para('p', 'p3')]);
  });

  it('leaves a correct chapter 2 alone (PT9 row 6)', () => {
    const input = usjOf(chapter('2'), para('p', 'body'));
    const { usj, didRepair } = repairChapterMarkers(input, 2);
    expect(didRepair).toBe(false);
    expect(usj.content).toEqual(input.content);
  });

  it('restores a deleted chapter marker at the start (PT9 row 7)', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(para('p', 'body')), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('p', 'body')]);
  });

  it('corrects an edited chapter number (PT9 row 8)', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(chapter('3'), para('p', 'body')), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('p', 'body')]);
  });

  it('removes a chapter marker typed mid-chapter (PT9 row 9)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(chapter('2'), para('p', 'one'), chapter('2'), para('p', 'two')),
      2,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('p', 'one'), para('p', 'two')]);
  });

  it('numbers a chapter marker that lost its number (PT9 row 10)', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(chapter(''), para('s', 'Section Head')),
      2,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), para('s', 'Section Head')]);
  });
});

describe('repairChapterMarkers — USJ specifics', () => {
  it('preserves altnumber, pubnumber and sid on the marker it renumbers', () => {
    const { usj } = repairChapterMarkers(
      usjOf(chapter('7', { altnumber: '6', pubnumber: 'C', sid: 'GEN 3' }), para('p', 'body')),
      3,
    );
    expect(usj.content[0]).toEqual({
      type: 'chapter',
      marker: 'c',
      number: '3',
      altnumber: '6',
      pubnumber: 'C',
      sid: 'GEN 3',
    });
  });

  it('puts a restored chapter marker ahead of a stray leading id marker', () => {
    // Paratext refuses a chapter after the first that holds anything at all before its chapter
    // marker ("Text present before chapter marker."), so an `\id` typed into the chapter has to
    // end up behind the marker, not in front of it.
    const { usj, didRepair } = repairChapterMarkers(usjOf(ID_GEN, para('p', 'body')), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), ID_GEN, para('p', 'body')]);
  });

  it('restores the chapter marker at the start of a document holding nothing but book nodes', () => {
    // The degenerate shape of the case above: with no non-book node to fall behind, the marker
    // still leads, because Paratext judges a later chapter on what precedes its marker regardless
    // of what that content is.
    const { usj, didRepair } = repairChapterMarkers(usjOf(ID_GEN), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([chapter('2'), ID_GEN]);
  });

  it('removes a chapter marker nested inside a paragraph', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(chapter('3'), {
        type: 'para',
        marker: 'p',
        content: ['before', chapter('9'), 'after'],
      }),
      3,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([
      chapter('3'),
      { type: 'para', marker: 'p', content: ['before', 'after'] },
    ]);
  });

  it('removes a chapter marker nested inside a paragraph of an intro-only chapter 1', () => {
    const { usj, didRepair } = repairChapterMarkers(
      usjOf(ID_GEN, {
        type: 'para',
        marker: 'p',
        content: ['before', chapter('9'), 'after'],
      }),
      1,
    );
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([
      ID_GEN,
      { type: 'para', marker: 'p', content: ['before', 'after'] },
    ]);
  });

  it('does not mutate its input', () => {
    const input = usjOf(chapter('9'), para('p', 'body'));
    const snapshot = JSON.stringify(input);
    repairChapterMarkers(input, 3);
    expect(JSON.stringify(input)).toBe(snapshot);
  });
});

describe('prepareUsjForChapterSave', () => {
  it('reports the repair and the repaired document to save', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const fromEditor = usjOf(chapter('5'), para('p', 'body edited'));
    const { repairedUsj, usjToSave } = prepareUsjForChapterSave(fromEditor, fromPdp, 3);
    expect(repairedUsj?.content).toEqual([chapter('3'), para('p', 'body edited')]);
    expect(usjToSave?.content).toEqual([chapter('3'), para('p', 'body edited')]);
  });

  it('still reports the repair when the repaired document matches the PDP (nothing to save)', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const fromEditor = usjOf(chapter('5'), para('p', 'body'));
    const { repairedUsj, usjToSave } = prepareUsjForChapterSave(fromEditor, fromPdp, 3);
    expect(repairedUsj?.content).toEqual([chapter('3'), para('p', 'body')]);
    expect(usjToSave).toBeUndefined();
  });

  it('reports no repair and saves normally for an ordinary edit', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const fromEditor = usjOf(chapter('3'), para('p', 'body edited'));
    const { repairedUsj, usjToSave } = prepareUsjForChapterSave(fromEditor, fromPdp, 3);
    expect(repairedUsj).toBeUndefined();
    expect(usjToSave?.content).toEqual([chapter('3'), para('p', 'body edited')]);
  });

  // The repair exists to fix what the USER's editing produced. A document that still matches the
  // PDP byte for byte is the PDP's own content on display, so repairing it would have the editor
  // rewrite — and write back — a chapter nobody touched. A blank chapter is the case that makes
  // this more than tidiness: it carries no chapter marker at all (the state `EmptyChapterView` is
  // built around), so every chapter after the first would otherwise be turned into a bare chapter
  // marker, saved, and announced as a correction, simply by being opened.
  describe('leaves alone a document that still matches what the PDP holds', () => {
    const storedShapes: [label: string, content: MarkerContent[]][] = [
      ['a blank chapter', []],
      ['a chapter holding only an empty paragraph', [para('p', '')]],
      ['a stored chapter whose marker names another chapter', [chapter('7'), para('p', 'body')]],
    ];

    it.each(storedShapes)('%s', (_label, content) => {
      const stored = usjOf(...content);
      const preparation = prepareUsjForChapterSave(usjOf(...content), stored, 5);
      expect(preparation.repairedUsj).toBeUndefined();
      expect(preparation.usjToSave).toBeUndefined();
      expect(preparation.caretTarget).toBeUndefined();
    });
  });

  it('repairs a blank chapter once the user has actually typed into it', () => {
    const stored = usjOf();
    const { repairedUsj, usjToSave } = prepareUsjForChapterSave(
      usjOf(para('p', 'first words')),
      stored,
      5,
    );
    expect(repairedUsj?.content).toEqual([chapter('5'), para('p', 'first words')]);
    expect(usjToSave?.content).toEqual([chapter('5'), para('p', 'first words')]);
  });

  // The two ways into a restore want different carets. Typing into a chapter that never had a
  // marker leaves the caret at the end of that text; deleting the marker of a chapter with text
  // means the user was on the chapter line, so the caret goes back there.
  describe('where a restore sends the caret', () => {
    const RESTORED_CHAPTER_2_NUMBER = { start: { jsonPath: '$.content[0].content[0]', offset: 4 } };
    const stored = usjOf(chapter('2', { sid: 'GEN 2' }), para('p', 'body'), para('q1', 'poem'));

    it('to the end of the chapter line when only the marker was deleted', () => {
      const { repairedUsj, caretTarget } = prepareUsjForChapterSave(
        usjOf(para('p', 'body'), para('q1', 'poem')),
        stored,
        2,
      );
      expect(repairedUsj?.content).toEqual([chapter('2'), para('p', 'body'), para('q1', 'poem')]);
      expect(caretTarget).toEqual(RESTORED_CHAPTER_2_NUMBER);
    });

    it('to the end of the text when a chapter that never had a marker is typed into', () => {
      const { caretTarget } = prepareUsjForChapterSave(usjOf(para('p', 'typed')), usjOf(), 2);
      expect(caretTarget).toBe(CARET_AT_DOCUMENT_END);
    });

    it('to the end of the text when more than the marker changed', () => {
      const { caretTarget } = prepareUsjForChapterSave(usjOf(para('p', 'typed over')), stored, 2);
      expect(caretTarget).toBe(CARET_AT_DOCUMENT_END);
    });
  });

  it('keeps saving a SECOND edit made after a repair — the dead-save-loop regression', () => {
    const fromPdp = usjOf(chapter('3'), para('p', 'body'));
    const firstPass = prepareUsjForChapterSave(
      usjOf(chapter('5'), para('p', 'body edited')),
      fromPdp,
      3,
    );
    const pdpAfterFirstSave = firstPass.usjToSave;
    const secondPass = prepareUsjForChapterSave(
      usjOf(chapter('3'), para('p', 'body edited twice')),
      pdpAfterFirstSave,
      3,
    );
    expect(secondPass.repairedUsj).toBeUndefined();
    expect(secondPass.usjToSave?.content).toEqual([chapter('3'), para('p', 'body edited twice')]);
  });
});

// Shapes the PDP actually serves: `GetChapterUsx` output for chapter 1 (which carries the `\id`
// line and the book headers) and for a later chapter (no `\id`, `sid` present). Driven through the
// real USX parser rather than hand-built USJ, because what these guard against is a repair that
// reports `didRepair` on a document nobody edited — which toasts the user on every save of an
// ordinary typing session.
const CH1_USX = `<usx version="3.0"><book code="GEN" style="id">Genesis</book><para style="h">Genesis</para><para style="toc1">Genesis</para><para style="mt1">Genesis</para><para style="ip">Intro paragraph.</para><chapter number="1" style="c" sid="GEN 1"/><para style="p"><verse number="1" style="v" sid="GEN 1:1"/>In the beginning.</para></usx>`;
const CH3_USX = `<usx version="3.0"><chapter number="3" style="c" sid="GEN 3"/><para style="s1">A section</para><para style="p"><verse number="1" style="v" sid="GEN 3:1"/>Now the serpent.</para></usx>`;
const CH3_CA_CP_USX = `<usx version="3.0"><chapter number="3" style="c" sid="GEN 3" altnumber="2" pubnumber="C"/><para style="p"><verse number="1" style="v" sid="GEN 3:1"/>Text.</para></usx>`;

/** The document's one top-level chapter marker node. */
function chapterNodeOf(usj: Usj): MarkerObject {
  const node = usj.content.find((item) => typeof item === 'object' && item.type === 'chapter');
  if (typeof node !== 'object') throw new Error('expected a chapter node in the document');
  return node;
}

describe('repairChapterMarkers against documents shaped like the PDP serves them', () => {
  it('reports no repair for a realistic chapter 1 with id, headers and intro', () => {
    // A chapter 1 carrying NO chapter marker is a legal early return reporting no repair, so pin
    // that the parser really did produce the marker — otherwise this passes while proving nothing.
    expect(chapterNodeOf(usxStringToUsj(CH1_USX)).number).toBe('1');
    const { didRepair } = repairChapterMarkers(usxStringToUsj(CH1_USX), 1);
    expect(didRepair).toBe(false);
  });

  it('reports no repair for a realistic chapter 3', () => {
    const { didRepair } = repairChapterMarkers(usxStringToUsj(CH3_USX), 3);
    expect(didRepair).toBe(false);
  });

  it('reports no repair for a chapter carrying altnumber and pubnumber', () => {
    const { didRepair } = repairChapterMarkers(usxStringToUsj(CH3_CA_CP_USX), 3);
    expect(didRepair).toBe(false);
  });

  it('still repairs an edited number on a realistic chapter 3', () => {
    const usj = usxStringToUsj(CH3_USX);
    chapterNodeOf(usj).number = '5';
    const { usj: repaired, didRepair } = repairChapterMarkers(usj, 3);
    expect(didRepair).toBe(true);
    const repairedChapter = chapterNodeOf(repaired);
    expect(repairedChapter.number).toBe('3');
    expect(repairedChapter.sid).toBe('GEN 3');
  });
});

describe('applyChapterSavePreparation', () => {
  const REPAIRED = usjOf(chapter('3'), para('p', 'body'));
  const TO_SAVE = usjOf(chapter('3'), para('p', 'body edited'));

  /** Runs one save's application, recording what reached the editor and the user. */
  function apply(
    overrides: Partial<{
      usjToSave: Usj | undefined;
      repairedUsj: Usj | undefined;
      currentChapterKey: string;
      isUserEditing: boolean;
    }>,
  ) {
    const { usjToSave, repairedUsj, currentChapterKey, isUserEditing } = {
      usjToSave: TO_SAVE,
      repairedUsj: REPAIRED,
      currentChapterKey: 'GEN 3',
      isUserEditing: false,
      ...overrides,
    };
    const applyRepairToEditor = vi.fn();
    const notifyRepair = vi.fn();
    const result = applyChapterSavePreparation({
      preparation: { repairedUsj, usjToSave, caretTarget: undefined },
      savedChapterKey: 'GEN 3',
      currentChapterKey,
      isUserEditing,
      applyRepairToEditor,
      notifyRepair,
    });
    return { result, applyRepairToEditor, notifyRepair };
  }

  it('pushes the repaired document back when the save targets the chapter on screen', () => {
    const { result, applyRepairToEditor } = apply({});
    expect(applyRepairToEditor).toHaveBeenCalledTimes(1);
    expect(applyRepairToEditor).toHaveBeenCalledWith(REPAIRED, undefined);
    expect(result.usjToSave).toBe(TO_SAVE);
  });

  it('leaves the editor alone when the save targets a chapter the user has left', () => {
    const { result, applyRepairToEditor } = apply({ currentChapterKey: 'GEN 4' });
    expect(applyRepairToEditor).not.toHaveBeenCalled();
    expect(result.usjToSave).toBe(TO_SAVE);
  });

  // A save can run mid-typing, and replacing the document then drops the caret so the next keys
  // land at the end of the chapter. The repair is still written; the save after the pause puts it
  // on screen.
  it('does not correct the editor under a user who is still typing', () => {
    const { result, applyRepairToEditor } = apply({ isUserEditing: true });
    expect(applyRepairToEditor).not.toHaveBeenCalled();
    expect(result.usjToSave).toBe(TO_SAVE);
  });

  // A write can still be refused after this runs — its chapter may no longer be the one selected —
  // so the notice waits for the write, on screen or not.
  it.each([
    ['on screen', {}],
    ['for a chapter the user has left', { currentChapterKey: 'GEN 4' }],
    ['under a user still typing', { isUserEditing: true }],
  ])('announces a repair with something to write only once it is written (%s)', (_label, args) => {
    const { result, notifyRepair } = apply(args);
    expect(notifyRepair).not.toHaveBeenCalled();
    expect(result.shouldAnnounceRepairOnWrite).toBe(true);
  });

  // The repair put the chapter back to what the PDP already holds, so the change on screen is the
  // only one there is, and it is the user's to be told about.
  it('announces straight away a repair that only corrected the screen', () => {
    const { result, applyRepairToEditor, notifyRepair } = apply({ usjToSave: undefined });
    expect(applyRepairToEditor).toHaveBeenCalledTimes(1);
    expect(notifyRepair).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ usjToSave: undefined, shouldAnnounceRepairOnWrite: false });
  });

  it('announces nothing for a repair that was neither written nor shown', () => {
    const { result, notifyRepair } = apply({ usjToSave: undefined, isUserEditing: true });
    expect(notifyRepair).not.toHaveBeenCalled();
    expect(result.shouldAnnounceRepairOnWrite).toBe(false);
  });

  it('touches nothing and saves normally when no repair was needed', () => {
    const { result, applyRepairToEditor, notifyRepair } = apply({ repairedUsj: undefined });
    expect(applyRepairToEditor).not.toHaveBeenCalled();
    expect(notifyRepair).not.toHaveBeenCalled();
    expect(result).toEqual({ usjToSave: TO_SAVE, shouldAnnounceRepairOnWrite: false });
  });
});

describe('repairChapterMarkers — where the caret belongs after a repair', () => {
  const CHAPTER_GLYPH = '$.content[0].content[0]';

  it('reports no caret target when nothing needed repairing', () => {
    const { didRepair, caretTarget } = repairChapterMarkers(
      usjOf(chapter('2'), para('p', 'body')),
      2,
    );
    expect(didRepair).toBe(false);
    expect(caretTarget).toBeUndefined();
  });

  it('puts the caret just after a corrected chapter number', () => {
    const { caretTarget } = repairChapterMarkers(usjOf(chapter('3'), para('p', 'body')), 2);
    expect(caretTarget).toEqual({ start: { jsonPath: CHAPTER_GLYPH, offset: 4 } });
  });

  it('counts every digit of a multi-digit chapter number', () => {
    const { caretTarget } = repairChapterMarkers(usjOf(chapter('3'), para('p', 'body')), 12);
    expect(caretTarget).toEqual({ start: { jsonPath: CHAPTER_GLYPH, offset: 5 } });
  });

  // Not in the new marker: keys typed there would become part of the chapter number.
  it('sends the caret to the end of the text when the marker was restored', () => {
    const { caretTarget } = repairChapterMarkers(usjOf(para('p', 'body')), 2);
    expect(caretTarget).toBe(CARET_AT_DOCUMENT_END);
  });

  it('sends the caret to the end of the text for a restore that also removed a nested marker', () => {
    const { caretTarget } = repairChapterMarkers(
      usjOf({ type: 'para', marker: 'p', content: ['body', chapter('7')] }),
      2,
    );
    expect(caretTarget).toBe(CARET_AT_DOCUMENT_END);
  });

  it('addresses the corrected marker where the repair actually left it', () => {
    // Chapter 1 keeps its marker behind the introduction that precedes it, so the marker the
    // caret belongs in is not the first thing in the document.
    const { usj, caretTarget } = repairChapterMarkers(usjOf(para('ip', 'intro'), chapter('2')), 1);
    expect(usj.content).toEqual([para('ip', 'intro'), chapter('1')]);
    expect(caretTarget).toEqual({ start: { jsonPath: '$.content[1].content[0]', offset: 4 } });
  });

  it('puts the caret where a chapter marker typed mid-chapter was removed', () => {
    const { caretTarget } = repairChapterMarkers(
      usjOf(chapter('2'), para('p', 'one'), chapter('2'), para('p', 'two')),
      2,
    );
    expect(caretTarget).toEqual({ start: { jsonPath: '$.content[2]', offset: 0 } });
  });

  it('puts the caret where a chapter marker nested in a paragraph was removed', () => {
    const { caretTarget } = repairChapterMarkers(
      usjOf(chapter('3'), {
        type: 'para',
        marker: 'p',
        content: ['before', chapter('9'), 'after'],
      }),
      3,
    );
    expect(caretTarget).toEqual({ start: { jsonPath: '$.content[1]', offset: 1 } });
  });

  it('places a nested removal even for an intro-only chapter 1, which has no marker to fall back to', () => {
    const { caretTarget } = repairChapterMarkers(
      usjOf(ID_GEN, {
        type: 'para',
        marker: 'p',
        content: ['before', chapter('9'), 'after'],
      }),
      1,
    );
    expect(caretTarget).toEqual({ start: { jsonPath: '$.content[1]', offset: 1 } });
  });

  it('falls back to the surviving marker when the removed marker ended the document', () => {
    const { caretTarget } = repairChapterMarkers(
      usjOf(chapter('2'), para('p', 'one'), chapter('2')),
      2,
    );
    expect(caretTarget).toEqual({ start: { jsonPath: CHAPTER_GLYPH, offset: 4 } });
  });

  it('prefers the corrected number over a removal site when the repair did both', () => {
    const { caretTarget } = repairChapterMarkers(
      usjOf(chapter('9'), para('p', 'one'), chapter('9'), para('p', 'two')),
      2,
    );
    expect(caretTarget).toEqual({ start: { jsonPath: CHAPTER_GLYPH, offset: 4 } });
  });
});

describe('the caret target on the way to the editor', () => {
  it('rides along with the repaired document out of prepareUsjForChapterSave', () => {
    const { caretTarget } = prepareUsjForChapterSave(
      usjOf(chapter('5'), para('p', 'body')),
      usjOf(chapter('3'), para('p', 'body')),
      3,
    );
    expect(caretTarget).toEqual({ start: { jsonPath: '$.content[0].content[0]', offset: 4 } });
  });

  it('is absent when no repair was needed', () => {
    const { caretTarget } = prepareUsjForChapterSave(
      usjOf(chapter('3'), para('p', 'edited')),
      usjOf(chapter('3'), para('p', 'body')),
      3,
    );
    expect(caretTarget).toBeUndefined();
  });

  it('is handed to the editor alongside the repaired document', () => {
    const caretTarget: SelectionRange = {
      start: { jsonPath: '$.content[0].content[0]', offset: 4 },
    };
    const applyRepairToEditor = vi.fn();

    applyChapterSavePreparation({
      preparation: {
        repairedUsj: usjOf(chapter('3'), para('p', 'body')),
        usjToSave: undefined,
        caretTarget,
      },
      savedChapterKey: 'GEN 3',
      currentChapterKey: 'GEN 3',
      isUserEditing: false,
      applyRepairToEditor,
      notifyRepair: vi.fn(),
    });

    expect(applyRepairToEditor).toHaveBeenCalledWith(expect.anything(), caretTarget);
  });
});
