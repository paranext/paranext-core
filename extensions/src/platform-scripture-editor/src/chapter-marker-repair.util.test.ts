import { describe, expect, it } from 'vitest';
import { Usj, MarkerContent } from '@eten-tech-foundation/scripture-utilities';
import { prepareUsjForChapterSave, repairChapterMarkers } from './chapter-marker-repair.util';

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

  it('keeps a leading id marker ahead of a restored chapter marker', () => {
    const { usj, didRepair } = repairChapterMarkers(usjOf(ID_GEN, para('p', 'body')), 2);
    expect(didRepair).toBe(true);
    expect(usj.content).toEqual([ID_GEN, chapter('2'), para('p', 'body')]);
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
