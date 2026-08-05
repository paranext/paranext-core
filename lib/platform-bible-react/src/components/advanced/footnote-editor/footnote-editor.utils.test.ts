// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  createNoteBodyTextNodeFilter,
  placeCaretAtPosition,
} from '@/components/advanced/footnote-editor/footnote-editor.utils';

function makeContainer(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

/**
 * A `.char` run as Platform Editor's `CharNode` renders it: `<span class="char usfm_<marker>"
 * data-marker="<marker>"><span data-lexical-text="true"><text></span></span>`.
 */
function charRun(marker: string, text: string): string {
  return `<span class="char usfm_${marker}" data-marker="${marker}"><span data-lexical-text="true">${text}</span></span>`;
}

/**
 * The editor's structural NBSP spacer, exactly as captured live: Lexical wraps EVERY TextNode -
 * including this one, which `NoteNodePlugin` inserts purely so the caret can enter/exit adjacent
 * top-level note children - in its own `<span data-lexical-text="true">`. This is deliberately NOT
 * a bare text/comment node: an earlier version of this fixture modeled the spacer as `<!--nbsp--> `
 * (a comment + bare text), which `Element.children` skips entirely - that fixture shape let
 * `findFirstTopLevelReferenceRun`'s original (buggy) "first non-caller ELEMENT child" lookup land
 * on the `fr` run by accident, masking a real bug: in the ACTUAL editor DOM the spacer is an
 * element too, so it - not the `fr` run - is the first non-caller element child. The lookup must
 * find the first `.char`-typed child structurally, not merely skip the caller.
 */
const NBSP_SPAN = '<span data-lexical-text="true">&nbsp;</span>';

/**
 * Builds a fabricated editor-like note DOM matching the shape verified live against the real
 * Platform Editor (Storybook `Demo/Scripture Editor/Footnotes Pane`, clicking mid-word in a
 * footnote row's "sinful" text): a non-editable caller wrapper, an optional leading `fr` reference
 * run, then `bodyRunsHtml`'s `.char` runs - each separated by {@link NBSP_SPAN}, exactly as the
 * live-captured note DOM shows: `<span class="note ..."><span class="immutable-note-caller"
 * contenteditable="false">...</span><span data-lexical-text="true">&nbsp;</span><span class="char
 * usfm_fr">...</span><span data-lexical-text="true">&nbsp;</span>...</span>`.
 */
function makeNoteContainer(bodyRunsHtml: string, includeLeadingReferenceRun = true): HTMLElement {
  const referenceRun = includeLeadingReferenceRun ? `${charRun('fr', '1:1 ')}${NBSP_SPAN}` : '';
  const callerHtml = `<span class="immutable-note-caller" contenteditable="false"><button>+</button></span>`;
  return makeContainer(
    `<p><span class="note usfm_f expanded" data-marker="f">${callerHtml}${NBSP_SPAN}${referenceRun}${bodyRunsHtml}</span></p>`,
  );
}

describe('placeCaretAtPosition', () => {
  it("places the caret at 'end' of the last text node", () => {
    const container = makeContainer('<span>abc</span><span>def</span>');
    const ok = placeCaretAtPosition(container, 'end');
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('def');
    expect(sel?.anchorOffset).toBe(3);
  });

  it('places the caret at a flat utf16 offset spanning nodes', () => {
    const container = makeContainer('<span>abc</span><span>def</span>');
    const ok = placeCaretAtPosition(container, { utf16Offset: 4 }); // between 'd' and 'e'
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('def');
    expect(sel?.anchorOffset).toBe(1);
  });

  it('keeps UTF-16 code-unit semantics for non-BMP text', () => {
    // '𝕊' is one codepoint, TWO UTF-16 code units. Offset 2 = after the surrogate pair.
    const container = makeContainer('<span>𝕊ab</span>');
    const ok = placeCaretAtPosition(container, { utf16Offset: 2 });
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorOffset).toBe(2); // caret after 𝕊, before 'a'
  });

  it("clamps an offset past the end to 'end'", () => {
    const container = makeContainer('<span>abc</span>');
    const ok = placeCaretAtPosition(container, { utf16Offset: 999 });
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorOffset).toBe(3);
  });

  it('returns false when the container has no text', () => {
    const container = makeContainer('');
    expect(placeCaretAtPosition(container, 'end')).toBe(false);
  });
});

describe('createNoteBodyTextNodeFilter (caret origin alignment)', () => {
  // Reproduces the live-verified scenario: clicking mid-word in "sinful" (offset 7 = right after
  // "sin") captures { utf16Offset: 7 } from the read-only row's BODY-only text. Without the
  // filter, walking the editor's raw DOM lands 7 code units early - inside the caller/fr prefix -
  // instead of inside "sinful".
  it('lands inside the first body run at the captured offset, skipping caller + leading fr run', () => {
    const container = makeNoteContainer(`${charRun('ft', 'Or "sinful"')}${NBSP_SPAN}`);
    const ok = placeCaretAtPosition(
      container,
      { utf16Offset: 7 },
      createNoteBodyTextNodeFilter(container),
    );
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('Or "sinful"');
    expect(sel?.anchorOffset).toBe(7); // between 'n' and 'f' of "sinful"
  });

  it('lands at the start of the body text (offset 0), not in the caller or fr run', () => {
    const container = makeNoteContainer(`${charRun('ft', 'Or "sinful"')}${NBSP_SPAN}`);
    const ok = placeCaretAtPosition(
      container,
      { utf16Offset: 0 },
      createNoteBodyTextNodeFilter(container),
    );
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('Or "sinful"');
    expect(sel?.anchorOffset).toBe(0);
  });

  it("places 'end' at the end of the body text, not the trailing structural NBSP", () => {
    const container = makeNoteContainer(`${charRun('ft', 'Or "sinful"')}${NBSP_SPAN}`);
    const ok = placeCaretAtPosition(container, 'end', createNoteBodyTextNodeFilter(container));
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('Or "sinful"');
    expect(sel?.anchorOffset).toBe('Or "sinful"'.length);
  });

  // A note with more than one body run (e.g. fq + ft) has a structural NBSP BETWEEN them too -
  // not just around the caller/fr prefix. FootnoteItem concatenates the runs with no separator,
  // so an offset landing in the second run must not be inflated by that interior NBSP.
  it('resolves an offset in a later body run, unaffected by the interior structural NBSP', () => {
    const container = makeNoteContainer(
      `${charRun('ft', 'Or "sinful"')}${NBSP_SPAN}${charRun('fq', 'quoted')}${NBSP_SPAN}`,
    );
    // Body text is 'Or "sinful"' (11) + 'quoted' (6) = 17. Offset 14 = 3 into 'quoted' ('quo|ted').
    const ok = placeCaretAtPosition(
      container,
      { utf16Offset: 14 },
      createNoteBodyTextNodeFilter(container),
    );
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('quoted');
    expect(sel?.anchorOffset).toBe(3);
  });

  // Only the FIRST top-level content item is a header when it's fr/xo (mirrors
  // footnote-item.component.tsx's targetRef destructuring, which only ever inspects index 0). A
  // later fr/xo run is body text like any other run.
  it('treats a non-first fr run as body text, not a header', () => {
    const container = makeNoteContainer(
      `${charRun('ft', 'Foo')}${NBSP_SPAN}${charRun('fr', 'Bar')}${NBSP_SPAN}`,
      false, // no leading reference run - the note's first top-level run is 'ft'
    );
    // Body text is 'Foo' (3) + 'Bar' (3) = 6. Offset 4 = 1 into the second ('fr') run's 'Bar'.
    const ok = placeCaretAtPosition(
      container,
      { utf16Offset: 4 },
      createNoteBodyTextNodeFilter(container),
    );
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('Bar');
    expect(sel?.anchorOffset).toBe(1);
  });
});
