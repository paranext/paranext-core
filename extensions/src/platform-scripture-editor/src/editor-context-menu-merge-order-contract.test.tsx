// @vitest-environment jsdom
/**
 * Guards two behaviors this extension's right-click-menu keyboard gating and \id-line note-insert
 * depend on, but which live entirely inside the STAGED `@eten-tech-foundation/platform-editor`
 * package (whatever `dev-packages.json` currently resolves — not necessarily any particular git
 * commit of `paranext/scripture-editors`), not in this repo:
 *
 * (a) With the editor's own right-click menu open and NOTHING highlighted, Enter must be swallowed
 * rather than reaching Lexical's default paragraph split. `handleStandardViewTriggers`
 * (`platform-scripture-editor.web-view.tsx`) hands Enter DOWN to the menu whenever
 * `isEditorContextMenuOpen()` is true, on the assumption that the menu's own capture-phase listener
 * claims it either way — that assumption is untestable from this repo's own unit tests, which mock
 * the editor, and CI's `test:e2e:smoke` project does not run the isolated e2e spec that would catch
 * it either. (b) A book (`\id`) whose content is more than a single string (e.g. `[text, a note]`)
 * must survive a settle round-trip. The three insert-context-menu entry points this extension adds
 * (footnote/cross-reference/endnote) are gated only on read-only, not on "is this an `\id` line",
 * so an editor that truncates multi-item book content on settle silently loses project text the
 * moment any of them is used at the start of a book.
 *
 * Both are genuine merge-order gates, not a fixed-in-this-repo regression test: they pass today
 * because the currently staged `platform-editor` happens to carry both scripture-editors fixes, but
 * nothing in THIS repo keeps that true. If `dev-packages.json` is ever pointed at a
 * `platform-editor` build that predates either fix, this file must go red and stay red — never
 * "temporarily" skipped — until it resolves one that has both again.
 */
import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Editorial, type EditorRef } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';

// jsdom doesn't implement `getBoundingClientRect` on `Range`; moving the caret can make Lexical's
// post-commit scroll-into-view read a Range rect. Stub it (a zero rect nothing here asserts on) —
// same as the editor engine's own markerEdit tests and platform-bible-react's footnote-editor tests.
if (typeof Range.prototype.getBoundingClientRect !== 'function') {
  Range.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON() {
        return this;
      },
    };
  };
}

const PARA_TEXT = 'In the beginning';

const paragraphUsj: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN' },
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1' }, PARA_TEXT],
    },
  ],
};

/** An `\id` book line whose content is a description string followed by a footnote-shaped note. */
const bookWithNoteUsj: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    {
      type: 'book',
      marker: 'id',
      code: 'JON',
      content: [
        'some description text',
        {
          type: 'note',
          marker: 'fe',
          caller: '+',
          content: [{ type: 'char', marker: 'ft', content: ['a note'] }],
        },
      ],
    },
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1' }, PARA_TEXT],
    },
  ],
};

async function renderEditor(defaultUsj: Usj) {
  const editorRef = createRef<EditorRef | null>();
  const { container } = render(<Editorial ref={editorRef} defaultUsj={defaultUsj} />);
  await act(async () => {
    await Promise.resolve();
  });
  const editorInput = container.querySelector('.editor-input');
  if (!(editorInput instanceof HTMLElement)) throw new Error('editor-input not found');
  return { editorRef, editorInput };
}

describe('editor context-menu merge-order contract (STAGED @eten-tech-foundation/platform-editor)', () => {
  it('swallows Enter while the right-click menu is open with nothing highlighted (no paragraph split)', async () => {
    const { editorRef, editorInput } = await renderEditor(paragraphUsj);

    const paragraphCountBefore = editorRef.current?.getUsj()?.content.length;

    // Right-click a DESCENDANT of the contenteditable root, not the root itself — the plugin
    // ignores a contextmenu event whose target IS its own root.
    const paragraphElement = editorInput.querySelector('p.para');
    if (!paragraphElement) throw new Error('no paragraph element to right-click');
    await act(async () => {
      fireEvent.contextMenu(paragraphElement);
      await Promise.resolve();
    });

    // Precondition: the menu actually opened.
    expect(document.querySelector('.typeahead-popover.auto-embed-menu')).not.toBeNull();
    // Precondition: nothing is highlighted yet (a freshly opened menu never is).
    expect(document.querySelector('.typeahead-popover.auto-embed-menu li.selected')).toBeNull();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Enter', bubbles: true, cancelable: true });
      await Promise.resolve();
    });

    expect(editorRef.current?.getUsj()?.content.length).toBe(paragraphCountBefore);
  });

  // Positive control for the test above, proving it is falsifiable rather than vacuously true: with
  // no menu open, the SAME Enter press against the SAME document must still reach Lexical and split
  // the paragraph — otherwise "no split occurred" would prove nothing about the menu's Enter claim.
  it('splits the paragraph on Enter with no menu open (control)', async () => {
    const { editorRef, editorInput } = await renderEditor(paragraphUsj);
    const paragraphCountBefore = editorRef.current?.getUsj()?.content.length;

    // A real DOM caret is required — Lexical's KEY_ENTER_COMMAND handling reads the live selection,
    // and a keydown with no selection placed is a no-op regardless of what claims it.
    const paragraphElement = editorInput.querySelector('p.para');
    if (!paragraphElement) throw new Error('paragraph element not found');
    const walker = document.createTreeWalker(paragraphElement, NodeFilter.SHOW_TEXT);
    let paragraphTextNode: Text | undefined;
    while (walker.nextNode()) {
      const candidate = walker.currentNode;
      if (candidate instanceof Text && candidate.data.includes('beginning')) {
        paragraphTextNode = candidate;
      }
    }
    if (!paragraphTextNode) throw new Error('paragraph text node not found');
    await act(async () => {
      editorInput.focus();
      const selection = document.getSelection();
      const range = document.createRange();
      range.setStart(paragraphTextNode, 2);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
      await Promise.resolve();
    });

    await act(async () => {
      fireEvent.keyDown(editorInput, { key: 'Enter', bubbles: true, cancelable: true });
      await Promise.resolve();
    });

    expect(editorRef.current?.getUsj()?.content.length).toBe((paragraphCountBefore ?? 0) + 1);
  });

  it("keeps an \\id book line's non-string content (e.g. a note) through a forced settle", async () => {
    const { editorRef } = await renderEditor(bookWithNoteUsj);

    // Force the editor to settle its real Lexical tree into `editedUsjRef` before reading it back —
    // an unforced `getUsj()` right after mount returns the cached `defaultUsj` verbatim and would
    // pass trivially whether or not the adaptor actually preserves the book's content. Modeled on
    // `collab-implicit-close-round-trip.test.tsx`'s `applyAndReadUsj`: a harmless remote insertion
    // is enough to force a real read-back through the adaptor. Retaining 3 units lands the insert
    // inside the book line's own description text ("some" -> "somXe") — harmless, and it means the
    // settle genuinely touches the book node under test rather than some unrelated part of the
    // document.
    await act(async () => {
      editorRef.current?.applyUpdate([{ retain: 3 }, { insert: 'X' }], 'remote');
    });

    const usj = editorRef.current?.getUsj();
    // Falsifiability control: the settle inserted 'X' into the book line's own text, proving
    // `getUsj()` reflects the POST-settle tree rather than echoing the cached `defaultUsj`
    // unchanged — the failure mode the forced-settle comment above warns about.
    expect(JSON.stringify(usj)).toContain('somXe');

    const bookNode = usj?.content.find(
      (item): item is Exclude<typeof item, string> =>
        typeof item !== 'string' && item.marker === 'id',
    );
    if (!bookNode) throw new Error('book (\\id) node not found after settle');

    expect(bookNode.content).toBeDefined();
    const bookContentDescribed = JSON.stringify(bookNode.content);
    expect(bookContentDescribed).toContain('description text');
    expect(bookContentDescribed).toContain('a note');
  });
});
