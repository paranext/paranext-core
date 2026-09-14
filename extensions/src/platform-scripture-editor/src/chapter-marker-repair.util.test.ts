import { describe, expect, it, vi } from 'vitest';
import {
  MarkerContent,
  MarkerObject,
  Usj,
  usxStringToUsj,
} from '@eten-tech-foundation/scripture-utilities';
import {
  applyChapterSavePreparation,
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

  /**
   * Stands in for the editor side of the call site, where one callback moves the sent-to-PDP
   * baseline and the editor's own document, so the two cannot be moved apart.
   */
  function editorStandIn() {
    const state: { usjSentToPdp?: Usj; editorUsj?: Usj } = {};
    const applyRepairToEditor = vi.fn((usj: Usj) => {
      state.usjSentToPdp = usj;
      state.editorUsj = usj;
    });
    return { state, applyRepairToEditor };
  }

  it('pushes the repaired document back when the save targets the chapter on screen', () => {
    const { state, applyRepairToEditor } = editorStandIn();
    const notifyRepair = vi.fn();

    const usjToSave = applyChapterSavePreparation({
      preparation: { repairedUsj: REPAIRED, usjToSave: TO_SAVE },
      savedChapterKey: 'GEN 3',
      currentChapterKey: 'GEN 3',
      applyRepairToEditor,
      notifyRepair,
    });

    expect(applyRepairToEditor).toHaveBeenCalledTimes(1);
    expect(applyRepairToEditor).toHaveBeenCalledWith(REPAIRED);
    expect(state.usjSentToPdp).toBe(REPAIRED);
    expect(state.editorUsj).toBe(REPAIRED);
    expect(usjToSave).toBe(TO_SAVE);
  });

  it('leaves the editor alone when the save targets a chapter the user has left', () => {
    const { state, applyRepairToEditor } = editorStandIn();
    const notifyRepair = vi.fn();

    const usjToSave = applyChapterSavePreparation({
      preparation: { repairedUsj: REPAIRED, usjToSave: TO_SAVE },
      savedChapterKey: 'GEN 3',
      currentChapterKey: 'GEN 4',
      applyRepairToEditor,
      notifyRepair,
    });

    expect(applyRepairToEditor).not.toHaveBeenCalled();
    expect(state.usjSentToPdp).toBeUndefined();
    expect(state.editorUsj).toBeUndefined();
    expect(usjToSave).toBe(TO_SAVE);
  });

  it('tells the user about the repair whether or not the editor was corrected', () => {
    const sameChapterNotify = vi.fn();
    applyChapterSavePreparation({
      preparation: { repairedUsj: REPAIRED, usjToSave: TO_SAVE },
      savedChapterKey: 'GEN 3',
      currentChapterKey: 'GEN 3',
      applyRepairToEditor: vi.fn(),
      notifyRepair: sameChapterNotify,
    });
    expect(sameChapterNotify).toHaveBeenCalledTimes(1);

    const crossChapterNotify = vi.fn();
    applyChapterSavePreparation({
      preparation: { repairedUsj: REPAIRED, usjToSave: TO_SAVE },
      savedChapterKey: 'GEN 3',
      currentChapterKey: 'GEN 4',
      applyRepairToEditor: vi.fn(),
      notifyRepair: crossChapterNotify,
    });
    expect(crossChapterNotify).toHaveBeenCalledTimes(1);
  });

  it('still corrects the editor and reports when the repair left nothing to save', () => {
    const { state, applyRepairToEditor } = editorStandIn();
    const notifyRepair = vi.fn();

    const usjToSave = applyChapterSavePreparation({
      preparation: { repairedUsj: REPAIRED, usjToSave: undefined },
      savedChapterKey: 'GEN 3',
      currentChapterKey: 'GEN 3',
      applyRepairToEditor,
      notifyRepair,
    });

    expect(state.editorUsj).toBe(REPAIRED);
    expect(notifyRepair).toHaveBeenCalledTimes(1);
    expect(usjToSave).toBeUndefined();
  });

  it('touches nothing and saves normally when no repair was needed', () => {
    const { state, applyRepairToEditor } = editorStandIn();
    const notifyRepair = vi.fn();

    const usjToSave = applyChapterSavePreparation({
      preparation: { repairedUsj: undefined, usjToSave: TO_SAVE },
      savedChapterKey: 'GEN 3',
      currentChapterKey: 'GEN 3',
      applyRepairToEditor,
      notifyRepair,
    });

    expect(applyRepairToEditor).not.toHaveBeenCalled();
    expect(notifyRepair).not.toHaveBeenCalled();
    expect(state.editorUsj).toBeUndefined();
    expect(usjToSave).toBe(TO_SAVE);
  });
});
