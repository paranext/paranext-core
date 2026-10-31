import { describe, it, expect, vi } from 'vitest';
import {
  ScriptureExtenderOverlayPDPs,
  ScriptureExtenderProjectDataProviderEngine,
} from './platform-scripture-extender-pdpe.model';

const VERSE_REF = { book: 'GEN', chapterNum: 1, verseNum: 1 };

/** A chapter as ParatextData serves it, at `version`. */
function chapterUsx(version: string): string {
  return (
    `<usx version="${version}"><book code="GEN" style="id" /><para style="usfm">3.0</para>` +
    `<chapter number="1" style="c" sid="GEN 1" /><para style="p">` +
    `<verse number="1" style="v" sid="GEN 1:1" />In the beginning.<verse eid="GEN 1:1" />` +
    `</para><chapter eid="GEN 1" /></usx>`
  );
}

/**
 * A verse as `GetVerseUsx` serves it, at `version`: the verse's own nodes, with no chapter around
 * them.
 */
function verseUsx(version: string): string {
  return `<usx version="${version}"><verse number="1" style="v" />In the beginning.</usx>`;
}

function createEngine(servedUsx: string, servedVerseUsx = servedUsx) {
  const subscribe = () => vi.fn().mockResolvedValue(() => Promise.resolve(true));
  const setBookUSX = vi.fn().mockResolvedValue(true);
  const setChapterUSX = vi.fn().mockResolvedValue(true);
  // Only the members this engine calls are stubbed; casting the partial stub is intentional.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const pdps = {
    'platformScripture.USX_Book': {
      getBookUSX: vi.fn().mockResolvedValue(servedUsx),
      setBookUSX,
      subscribeBookUSX: subscribe(),
    },
    'platformScripture.USX_Chapter': {
      getChapterUSX: vi.fn().mockResolvedValue(servedUsx),
      setChapterUSX,
      subscribeChapterUSX: subscribe(),
    },
    'platformScripture.USX_Verse': {
      getVerseUSX: vi.fn().mockResolvedValue(servedVerseUsx),
      subscribeVerseUSX: subscribe(),
    },
  } as unknown as ScriptureExtenderOverlayPDPs;
  return {
    engine: new ScriptureExtenderProjectDataProviderEngine('project', pdps),
    setBookUSX,
    setChapterUSX,
  };
}

/** The `version` on the root of `usx`. */
function rootVersion(usx: string): string | undefined {
  return /^<usx version="([^"]*)"/.exec(usx)?.[1];
}

describe('ScriptureExtenderProjectDataProviderEngine USX version', () => {
  it.each(['3.0', '3.1'])(
    'serves chapter, book and verse USJ at the version %s it read',
    async (version) => {
      const { engine } = createEngine(chapterUsx(version), verseUsx(version));

      expect((await engine.getChapterUSJ(VERSE_REF))?.version).toBe(version);
      expect((await engine.getBookUSJ(VERSE_REF))?.version).toBe(version);
      expect((await engine.getVerseUSJ(VERSE_REF))?.version).toBe(version);
    },
  );

  it.each(['3.0', '3.1'])(
    'writes a chapter back at the version %s it was read at',
    async (version) => {
      const { engine, setChapterUSX } = createEngine(chapterUsx(version));

      const usj = await engine.getChapterUSJ(VERSE_REF);
      if (!usj) throw new Error('no chapter USJ');
      await engine.setChapterUSJ(VERSE_REF, usj);

      const writtenUsx: string = setChapterUSX.mock.calls[0][1];
      expect(rootVersion(writtenUsx)).toBe(version);
      expect(writtenUsx).toContain('<para style="usfm">3.0</para>');
    },
  );

  it('writes a book back at the version it was read at', async () => {
    const { engine, setBookUSX } = createEngine(chapterUsx('3.0'));

    const usj = await engine.getBookUSJ(VERSE_REF);
    if (!usj) throw new Error('no book USJ');
    await engine.setBookUSJ(VERSE_REF, usj);

    expect(rootVersion(setBookUSX.mock.calls[0][1])).toBe('3.0');
  });
});
