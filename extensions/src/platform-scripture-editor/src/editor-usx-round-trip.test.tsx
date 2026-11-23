// @vitest-environment jsdom
/**
 * The editor -> file -> editor round trip, over what the editor really writes.
 *
 * Every other round-trip suite starts from the file: the provider's own USX goes into the editor
 * and back out. This one starts from the EDITOR: it makes an edit in the real editor (the version
 * this repo ships), prepares the save the way the web view does, and records the USX the provider
 * would receive in `usj-reader-writer-test-data/editor-usx/`. The C# sweep
 * (`UsfmUsxRoundTripCorpusSweepTests.EditorUsx.cs`) then writes each of those through ParatextData
 * (`SetChapterUsx`), pins every byte the write changes on disk, and records what the provider
 * serves back (`GetChapterUsx`) in `editor-usx-returned/`. The last leg here reads that back and
 * checks it is the document the editor saved.
 *
 * Both capture folders are committed, and each side checks its folder by default, so a change to
 * the editor, the converters or ParatextData that changes a byte fails a test instead of going
 * stale. `npm run test:editor-usx-round-trip:capture` regenerates all of it in order; see the
 * `editor-usx/README.md`.
 *
 * The edits use the editor's public `EditorRef` methods, the ones the web view's commands call:
 * typing has no such method, and is covered in scripture-editors. Each edit makes the editor
 * rewrite the whole chapter from its tree, as a user's first edit does, so every untouched
 * paragraph of the chapter goes through this trip too.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRef } from 'react';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  Editorial,
  type EditorOptions,
  type EditorRef,
  type ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import {
  type MarkerContent,
  type Usj,
  usjToUsxString,
  usxStringToUsj,
} from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';
import { prepareUsjForChapterSave } from './chapter-marker-repair.util';
import { getEditorViewOptions } from './editor-view-options.util';

const CAPTURE_ENV_VAR = 'EDITOR_USX_CAPTURE';
const isCapturing = process.env[CAPTURE_ENV_VAR] === '1';

const SRC_DIR = path.dirname(fileURLToPath(import.meta.url));
const CORPUS_DIR = path.join(
  SRC_DIR,
  '../../../../lib/platform-bible-utils/src/scripture/usj-reader-writer-test-data',
);
const PDP_USX_DIR = path.join(CORPUS_DIR, 'pdp-usx');
const EDITOR_USX_DIR = path.join(CORPUS_DIR, 'editor-usx');
const RETURNED_USX_DIR = path.join(CORPUS_DIR, 'editor-usx-returned');

/** The views the app edits Scripture in, with the options the web view gives each. */
const VIEWS: {
  name: string;
  view: ViewOptions;
  protection: EditorOptions['structureProtectionMode'];
}[] = [
  // Simple mode's text: the paragraph-structure preset, structural deletes guarded.
  {
    name: 'paragraph-structure',
    view: getEditorViewOptions('formatted', false, false),
    protection: 'guarded',
  },
  // Power mode's text: the editor's default view, protection off.
  { name: 'formatted', view: getEditorViewOptions('formatted', true, false), protection: 'off' },
  { name: 'standard', view: getEditorViewOptions('standard', true, false), protection: 'off' },
];

/** Where an edit goes: the first text in the chapter containing `text`, `offset` characters in. */
interface TextTarget {
  text: string;
  offset: number;
}

interface Gesture {
  name: string;
  run: (editor: EditorRef, at: (target: TextTarget, end?: TextTarget) => void) => void;
}

/** One chapter's edits. Each needs only the editor's public methods. */
interface GestureChapter {
  capture: string;
  gestures: Gesture[];
}

const insertFootnote = (target: TextTarget): Gesture => ({
  name: 'insert-footnote',
  run: (editor, at) => {
    at(target);
    editor.insertMarker('f');
  },
});
const wrapInCharMarker = (start: TextTarget, end: TextTarget): Gesture => ({
  name: 'wrap-in-nd',
  run: (editor, at) => {
    at(start, end);
    editor.insertMarker('nd');
  },
});
const splitParagraph = (target: TextTarget): Gesture => ({
  name: 'split-paragraph-q1',
  run: (editor, at) => {
    at(target);
    editor.splitParagraphWithMarker('q1');
  },
});

const GESTURE_CHAPTERS: GestureChapter[] = [
  {
    capture: 'web-matthew-1-and-2-ch1.usx',
    gestures: [
      insertFootnote({ text: 'The book of the genealogy', offset: 25 }),
      wrapInCharMarker(
        { text: 'The book of the genealogy', offset: 4 },
        { text: 'The book of the genealogy', offset: 8 },
      ),
      splitParagraph({ text: 'The book of the genealogy', offset: 12 }),
    ],
  },
  {
    // Unclosed spans, attributes, notes with categories, every char-marker edge the corpus has.
    capture: 'testUSFM-2SA-1-ch1.usx',
    gestures: [
      insertFootnote({ text: 'at the top of the page', offset: 22 }),
      wrapInCharMarker(
        { text: 'have lots of challenging', offset: 13 },
        { text: 'have lots of challenging', offset: 24 },
      ),
      splitParagraph({ text: 'According to spec', offset: 0 }),
    ],
  },
];

/** The first string in `content` (outside notes) containing `text`, with its USJ JSONPath. */
function findText(
  content: MarkerContent[] | undefined,
  text: string,
  base = '$',
): { jsonPath: string; string: string } | undefined {
  return (content ?? []).reduce<{ jsonPath: string; string: string } | undefined>(
    (found, item, index) => {
      if (found) return found;
      const jsonPath = `${base}.content[${index}]`;
      if (typeof item === 'string')
        return item.includes(text) ? { jsonPath, string: item } : undefined;
      return item.type === 'note' ? undefined : findText(item.content, text, jsonPath);
    },
    undefined,
  );
}

function locate(usj: Usj, target: TextTarget) {
  const found = findText(usj.content, target.text);
  if (!found) throw new Error(`no text containing ${JSON.stringify(target.text)}`);
  return { jsonPath: found.jsonPath, offset: found.string.indexOf(target.text) + target.offset };
}

function chapterNumOf(capture: string): number {
  const match = /-ch(\d+)\.usx$/.exec(capture);
  if (!match) throw new Error(`capture ${capture} names no chapter`);
  return Number(match[1]);
}

function readUsx(dir: string, name: string): string {
  return readFileSync(path.join(dir, name), 'utf8');
}

/** Saves an edit through the real editor: the USJ the web view would hand the provider. */
async function editAndSave(
  usjFromPdp: Usj,
  chapterNum: number,
  { view, protection }: (typeof VIEWS)[number],
  gesture: Gesture,
): Promise<Usj> {
  const editorRef = createRef<EditorRef>();
  const changes: Usj[] = [];
  const book = usjFromPdp.content.find(
    (item): item is Exclude<MarkerContent, string> =>
      typeof item !== 'string' && item.type === 'book',
  );
  render(
    <Editorial
      ref={editorRef}
      defaultUsj={usjFromPdp}
      scrRef={{ book: book?.code ?? 'GEN', chapterNum, verseNum: 1 }}
      options={{
        view,
        structureProtectionMode: protection,
        markerMenuTrigger: '\\',
        hasExternalUI: true,
      }}
      onUsjChange={(usj) => changes.push(usj)}
    />,
  );
  await waitFor(() => expect(editorRef.current).toBeTruthy());
  const editor = editorRef.current;
  if (!editor) throw new Error('editor did not mount');

  act(() => {
    gesture.run(editor, (start, end) =>
      editor.setSelection({
        start: locate(usjFromPdp, start),
        end: end && locate(usjFromPdp, end),
      }),
    );
  });
  await waitFor(() => expect(changes.length).toBeGreaterThan(0));
  const edited = editor.getUsj() ?? changes[changes.length - 1];
  const { usjToSave } = prepareUsjForChapterSave(edited, usjFromPdp, chapterNum);
  if (!usjToSave) throw new Error(`${gesture.name} changed nothing to save`);
  return usjToSave;
}

const REGENERATE = `Regenerate with \`npm run test:editor-usx-round-trip:capture\` (see editor-usx/README.md).`;

/** Writes or checks one capture, returning a problem when a committed capture is out of date. */
function checkCapture(name: string, usx: string): string | undefined {
  const file = path.join(EDITOR_USX_DIR, name);
  if (isCapturing) {
    writeFileSync(file, usx, 'utf8');
    return undefined;
  }
  if (!existsSync(file)) return `editor-usx/${name} is missing. ${REGENERATE}`;
  if (readFileSync(file, 'utf8') !== usx)
    return `editor-usx/${name} no longer matches the editor. ${REGENERATE}`;
  return undefined;
}

/** `usj` as one JSON line per node, sorted keys, so two documents compare as a readable diff. */
function canonicalLines(content: MarkerContent[] | undefined, depth = 0): string[] {
  return (content ?? []).flatMap((item) => {
    const indent = '  '.repeat(depth);
    if (typeof item === 'string') return [`${indent}${JSON.stringify(item)}`];
    const { content: children, ...rest } = item;
    const sorted = Object.fromEntries(Object.entries(rest).sort(([a], [b]) => a.localeCompare(b)));
    return [`${indent}${JSON.stringify(sorted)}`, ...canonicalLines(children, depth + 1)];
  });
}

/**
 * Where the document the provider serves back differs from the one the editor saved, by gesture.
 * Each reread line that differs must be explained by `isExpected`, and exactly `count` may differ.
 */
const KNOWN_DIVERGENCES: {
  [gesture: string]: {
    reason: string;
    count: number;
    isExpected: (saved: string, reread: string) => boolean;
  };
} = {
  'split-paragraph-q1': {
    // The editor splits `of |the` into `of ` and `the`; USFM has no trailing space before a
    // paragraph marker, so ParatextData writes `of\r\n\q1 the`. The editor goes on holding the
    // space until the chapter reloads; the web view compares the echo whitespace-insensitively, so
    // the file is not rewritten. Kept on purpose: a Backspace that rejoins the lines right away
    // keeps the words apart. Data-fidelity catalog row ER-1.
    reason: "the first half's trailing space is not written",
    count: 1,
    isExpected: (saved, reread) => saved.replace(/ "$/, '"') === reread,
  },
};

interface Case {
  name: string;
  /** The edit, if the case makes one. */
  gesture?: string;
  save: () => Promise<Usj>;
}

const CASES: Case[] = [
  // What the editor writes for a chapter it did not change: the converters alone. The editor's
  // own tree round trip is the identity on every capture (scripture-editors' composed suite).
  ...readdirSync(PDP_USX_DIR)
    .filter((name) => name.endsWith('.usx'))
    .sort()
    .map((capture) => ({
      name: `${capture.replace(/\.usx$/, '')}.resave.usx`,
      save: async () => usxStringToUsj(readUsx(PDP_USX_DIR, capture)),
    })),
  ...GESTURE_CHAPTERS.flatMap(({ capture, gestures }) =>
    VIEWS.flatMap((view) =>
      gestures.map((gesture) => ({
        name: `${capture.replace(/\.usx$/, '')}.${view.name}.${gesture.name}.usx`,
        gesture: gesture.name,
        save: () =>
          editAndSave(
            usxStringToUsj(readUsx(PDP_USX_DIR, capture)),
            chapterNumOf(capture),
            view,
            gesture,
          ),
      })),
    ),
  ),
];

afterEach(() => {
  cleanup();
});

describe('editor -> USX -> ParatextData -> USX -> editor', () => {
  it.each(CASES)('$name', async ({ name, gesture, save }) => {
    const saved = await save();
    const usx = usjToUsxString(saved);
    expect(checkCapture(name, usx)).toBeUndefined();

    // The provider's answer, once the C# sweep has written this capture through ParatextData.
    if (isCapturing) return;
    const returnedFile = path.join(RETURNED_USX_DIR, name);
    expect(
      existsSync(returnedFile)
        ? undefined
        : `editor-usx-returned/${name} is missing. ${REGENERATE}`,
    ).toBeUndefined();
    const reread = usxStringToUsj(readFileSync(returnedFile, 'utf8'));
    // The web view takes the provider's echo as its own save, rather than reloading the editor,
    // only if this comparison passes.
    expect(areUsjContentsEqualExceptWhitespace(reread, saved)).toBe(true);

    const rereadLines = canonicalLines(reread.content);
    const savedLines = canonicalLines(saved.content);
    expect(rereadLines.length).toBe(savedLines.length);
    const known = gesture ? KNOWN_DIVERGENCES[gesture] : undefined;
    const differing = savedLines.flatMap((line, index) =>
      line === rereadLines[index] ? [] : [{ saved: line, reread: rereadLines[index] }],
    );
    expect(differing.length).toBe(known?.count ?? 0);
    expect(differing.filter((pair) => !known?.isExpected(pair.saved, pair.reread))).toEqual([]);
  });

  it('has no capture without a case', () => {
    const names = new Set(CASES.map((testCase) => testCase.name));
    const strays = [EDITOR_USX_DIR, RETURNED_USX_DIR].flatMap((dir) =>
      existsSync(dir)
        ? readdirSync(dir)
            .filter((name) => name.endsWith('.usx') && !names.has(name))
            .map((name) => `${path.basename(dir)}/${name}`)
        : [],
    );
    // Remove any capture no case writes.
    expect(strays).toEqual([]);
  });
});
