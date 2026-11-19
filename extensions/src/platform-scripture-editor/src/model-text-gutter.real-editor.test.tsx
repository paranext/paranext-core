// @vitest-environment jsdom
// The Model Text panel's view, mounted in the real editor the way the panel mounts it (read-only):
// the panel's own tests stand `Editorial` in with a mock, so only this file can show what a reader
// of Column 1 actually gets from those options.
import '@testing-library/jest-dom';
import {
  Editorial,
  getDefaultViewOptions,
  type ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { join } from 'path';
import postcss from 'postcss';
import { compile } from 'sass';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getEditorViewOptions,
  getModelTextViewOptions,
  MODEL_TEXT_ROOT_CLASS_NAME,
} from './editor-view-options.util';

const PROSE_TEXT = 'Paul, a servant of Christ Jesus.';
const POETRY_TEXT = 'Grace to you and peace.';

const CHAPTER_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'ROM' },
    { type: 'para', marker: 'mt1', content: ['Romans'] },
    { type: 'chapter', marker: 'c', number: '1' },
    { type: 'para', marker: 's1', content: ['Greeting'] },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1' }, PROSE_TEXT],
    },
    {
      type: 'para',
      marker: 'q1',
      content: [{ type: 'verse', marker: 'v', number: '2' }, POETRY_TEXT],
    },
  ],
};

/**
 * Mounts the editor as the Model Text panel does: read-only, unless `isReadonly` says otherwise,
 * inside the panel's root class.
 */
function renderModelTextEditor(isReadonly = true) {
  return render(
    <div className={MODEL_TEXT_ROOT_CLASS_NAME}>
      <Editorial
        defaultUsj={CHAPTER_USJ}
        options={{ isReadonly, view: getModelTextViewOptions(false) }}
      />
    </div>,
  );
}

/** Mounts the editor read-only with `view` and no root class of the panel's. */
function renderReadOnlyEditor(view: ViewOptions) {
  return render(<Editorial defaultUsj={CHAPTER_USJ} options={{ isReadonly: true, view }} />);
}

/**
 * Every selector in the shipped `_usj-nodes.scss`, each with any pseudo-element taken off, so it
 * matches the element whose `::after` it styles; split into those jsdom can match and those its
 * selector engine cannot parse.
 */
const USJ_NODES_SELECTORS = (() => {
  const matchable: string[] = [];
  const unmatchable: string[] = [];
  postcss.parse(compile(join(__dirname, '_usj-nodes.scss')).css).walkRules((rule) => {
    const { parent } = rule;
    if (parent?.type === 'atrule' && 'name' in parent && String(parent.name).endsWith('keyframes'))
      return;
    rule.selectors.forEach((selector) => {
      const elementSelector = selector.replace(/::[\w-]+/g, '').trim();
      if (!elementSelector) return;
      try {
        document.documentElement.matches(elementSelector);
        matchable.push(elementSelector);
      } catch {
        unmatchable.push(elementSelector);
      }
    });
  });
  return { matchable, unmatchable };
})();

/**
 * The gutter's own chapter and verse number selectors: those that skip the Model Text panel's root
 * class.
 */
const GUTTER_NUMBER_SELECTORS = USJ_NODES_SELECTORS.matchable.filter((selector) =>
  selector.includes(`.${MODEL_TEXT_ROOT_CLASS_NAME} `),
);

/**
 * Whether a selector's subject (its last compound selector, after any `:not(…)`-style argument
 * lists are taken out) is a chapter or verse number.
 */
function isAimedAtNumbers(selector: string): boolean {
  const withoutArguments = selector.replace(/\((?:[^()]|\([^()]*\))*\)/g, '');
  const subject = withoutArguments.split(/[\s>+~]+/).pop() ?? '';
  return /\.(usfm_c|usfm_v|verse|chapter)\b/.test(subject);
}

/** The `_usj-nodes.scss` selectors that reach `element`. */
function selectorsReaching(element: Element): string[] {
  return USJ_NODES_SELECTORS.matchable.filter((selector) => element.matches(selector));
}

/** The `_usj-nodes.scss` selectors that reach the chapter number and the first verse number. */
function numberSelectors(root: HTMLElement): { chapter: string[]; verse: string[] } {
  const chapter = root.querySelector('.usfm_c');
  const verse = root.querySelector('.usfm_v');
  if (!chapter || !verse) throw new Error('no chapter or verse number rendered');
  return { chapter: selectorsReaching(chapter), verse: selectorsReaching(verse) };
}

/**
 * Lets Lexical apply what an event changed. It commits the update in a microtask, and a timer fires
 * only once the microtask queue is empty, so a zero-delay timer is enough however busy the machine
 * is.
 */
function afterLexicalAppliesSelection(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/** The editor's text root, once the chapter has rendered. */
async function findEditorRoot(container: HTMLElement): Promise<HTMLElement> {
  let root: HTMLElement | undefined;
  await waitFor(() => {
    root = container.querySelector<HTMLElement>('.editor-input') ?? undefined;
    expect(root?.textContent).toContain(POETRY_TEXT);
  });
  if (!root) throw new Error('the editor did not render');
  return root;
}

/** Each paragraph's gutter glyph, by the paragraph's marker. */
function gutterGlyphs(root: HTMLElement): Record<string, Element | undefined> {
  return Object.fromEntries(
    ['mt1', 's1', 'p', 'q1'].map((marker) => [
      marker,
      root.querySelector(`.usfm_${marker}`)?.querySelector(':scope > .marker') ?? undefined,
    ]),
  );
}

/** The text node holding `text`. */
function textNodeHolding(root: HTMLElement, text: string): Text {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode())
    if (node instanceof Text && node.textContent?.includes(text)) return node;
  throw new Error(`"${text}" was not rendered`);
}

/** The text node of the `\q1` paragraph's gutter glyph. */
function poetryGlyphText(root: HTMLElement): Text {
  const glyph = gutterGlyphs(root).q1;
  const text = [...(glyph?.childNodes ?? [])].find((node): node is Text => node instanceof Text);
  if (!text) throw new Error('no \\q1 glyph text');
  return text;
}

/**
 * Selects from `anchor` at `anchorOffset` to `focus` at `focusOffset` and fires a copy at the
 * editor, as Ctrl+C does. Returns the plain text it wrote.
 */
async function copySelection(
  root: HTMLElement,
  anchor: Text,
  anchorOffset: number,
  focus: Text,
  focusOffset: number,
): Promise<string> {
  const selection = window.getSelection();
  if (!selection) throw new Error('no selection');
  selection.setBaseAndExtent(anchor, anchorOffset, focus, focusOffset);
  document.dispatchEvent(new Event('selectionchange'));
  await afterLexicalAppliesSelection();

  const written = new Map<string, string>();
  const event = new Event('copy', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', {
    value: {
      setData: (format: string, data: string) => written.set(format, data),
      getData: (format: string) => written.get(format) ?? '',
      clearData: vi.fn(),
    },
  });
  root.dispatchEvent(event);
  return written.get('text/plain') ?? '';
}

/** Copies from the middle of the `\p` paragraph's text to the middle of the `\q1` paragraph's text. */
function copyAcrossParagraphBreak(root: HTMLElement): Promise<string> {
  const prose = textNodeHolding(root, PROSE_TEXT);
  return copySelection(root, prose, prose.length - 7, textNodeHolding(root, POETRY_TEXT), 5);
}

/**
 * Clicks the `\q1` paragraph's gutter glyph as a mouse does, and reports whether that selected the
 * paragraph's marker.
 */
async function clickSelectsPoetryMarker(root: HTMLElement): Promise<boolean> {
  const glyph = gutterGlyphs(root).q1;
  if (!glyph) throw new Error('no \\q1 glyph');
  fireEvent.mouseDown(glyph);
  fireEvent.mouseUp(glyph);
  fireEvent.click(glyph);
  await afterLexicalAppliesSelection();
  return Boolean(root.querySelector('.psc-para-marker-selected'));
}

/** Copies the `\` that a double-click on the `\q1` paragraph's gutter glyph selects. */
function copyGlyphBackslash(root: HTMLElement): Promise<string> {
  const glyph = poetryGlyphText(root);
  return copySelection(root, glyph, 0, glyph, 1);
}

afterEach(() => {
  window.getSelection()?.removeAllRanges();
});

describe('the Model Text view in the real editor', () => {
  it('shows each paragraph’s marker in the gutter, read-only, with no active-text outline', async () => {
    const { container } = renderModelTextEditor();
    const root = await findEditorRoot(container);

    expect(root).toHaveClass('psc-gutter-markers');
    expect(root).not.toHaveClass('psc-active-focus');
    expect(root).toHaveAttribute('contenteditable', 'false');
    const glyphs = gutterGlyphs(root);
    expect(glyphs.mt1?.textContent?.trim()).toBe('\\mt1');
    expect(glyphs.s1?.textContent?.trim()).toBe('\\s1');
    expect(glyphs.p?.textContent?.trim()).toBe('\\p');
    expect(glyphs.q1?.textContent?.trim()).toBe('\\q1');
  });

  // The control for the read-only case below: it shows these clicks do reach the marker selection,
  // so that case fails if read-only stops blocking them.
  it('selects a paragraph marker when its gutter glyph is clicked in an editable editor', async () => {
    const { container } = renderModelTextEditor(false);
    const root = await findEditorRoot(container);

    expect(await clickSelectsPoetryMarker(root)).toBe(true);
  });

  it('does not select a paragraph marker when its gutter glyph is clicked', async () => {
    const { container } = renderModelTextEditor();
    const root = await findEditorRoot(container);

    expect(await clickSelectsPoetryMarker(root)).toBe(false);
  });

  it('copies the selected text across a paragraph break', async () => {
    const { container } = renderModelTextEditor();
    const root = await findEditorRoot(container);

    const plain = await copyAcrossParagraphBreak(root);

    expect(plain).toContain('Jesus.');
    expect(plain).toContain('Grace');
  });

  // TODO(PT-4911): the editor's copy writes the next paragraph's gutter glyph (`\q1 `) into the
  // plain text. Once the hidden-marker views leave gutter glyphs out of a copy, this case turns
  // red: drop the `.fails` (do not delete the case).
  it.fails('copies across a paragraph break without the next paragraph’s marker', async () => {
    const { container } = renderModelTextEditor();
    const root = await findEditorRoot(container);

    const plain = await copyAcrossParagraphBreak(root);

    expect(plain).not.toContain('\\q1');
  });

  // In the app a double-click on a gutter glyph selects its `\`; jsdom has no layout to turn a
  // double-click into a selection, so this sets the same selection directly. It is the control for
  // the glyph-only copy case below: the selection that case copies really is inside the glyph.
  it('keeps a selection of a gutter glyph’s backslash', async () => {
    const { container } = renderModelTextEditor();
    const root = await findEditorRoot(container);

    await copyGlyphBackslash(root);

    expect(window.getSelection()?.toString()).toBe('\\');
  });

  // The number cases below compare only the selectors jsdom can match. This keeps a rule styling a
  // number from dropping out of both sides of that comparison unseen.
  it('can match every stylesheet selector aimed at a chapter or verse number', () => {
    // The control: the same filter finds the gutter's own number rules among those jsdom matches.
    expect(GUTTER_NUMBER_SELECTORS).not.toEqual([]);
    expect(USJ_NODES_SELECTORS.matchable.filter(isAimedAtNumbers)).toEqual(
      expect.arrayContaining(GUTTER_NUMBER_SELECTORS),
    );
    expect(USJ_NODES_SELECTORS.unmatchable.filter(isAimedAtNumbers)).toEqual([]);
  });

  it('styles chapter and verse numbers as the resource panels do', async () => {
    const modelText = await findEditorRoot(renderModelTextEditor().container);
    const resource = await findEditorRoot(
      renderReadOnlyEditor({ ...getDefaultViewOptions(), allowInvisibleCharacters: false })
        .container,
    );

    expect(numberSelectors(modelText)).toEqual(numberSelectors(resource));
  });

  // The control for the case above: the Scripture editor's paragraph-structure view, which carries
  // the same gutter class, keeps its own larger chapter number and accent-colored verse numbers.
  it('leaves the Scripture editor’s own chapter and verse number style alone', async () => {
    const scripture = await findEditorRoot(
      renderReadOnlyEditor(getEditorViewOptions('formatted', false, false)).container,
    );

    const { chapter, verse } = numberSelectors(scripture);
    expect(GUTTER_NUMBER_SELECTORS).not.toEqual([]);
    expect([...chapter, ...verse]).toEqual(expect.arrayContaining(GUTTER_NUMBER_SELECTORS));
  });

  // TODO(PT-4911): a copy of a selection inside a gutter glyph alone (a double-click on the glyph
  // selects its `\`) writes the glyph's label (`\q1 `) as plain text. Once the hidden-marker views
  // leave gutter glyphs out of every copy, this case turns red: drop the `.fails` (do not delete the
  // case).
  it.fails('copies no paragraph marker when only its gutter glyph is selected', async () => {
    const { container } = renderModelTextEditor();
    const root = await findEditorRoot(container);

    const plain = await copyGlyphBackslash(root);

    expect(plain).not.toContain('\\q1');
  });
});
