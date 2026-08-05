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
 * Builds a fabricated editor-like note DOM matching the shape verified live against the real
 * Platform Editor (Storybook `Demo/Scripture Editor/Footnotes Pane`, clicking mid-word in a
 * footnote row's "sinful" text): a non-editable caller wrapper, an optional leading `fr` reference
 * run, then `bodyRunsHtml`'s `.char` runs - each separated by the editor's structural NBSP text
 * nodes (represented here with a plain space; only its exclusion-from-body behavior is under test,
 * not its literal character).
 */
function makeNoteContainer(bodyRunsHtml: string, includeLeadingReferenceRun = true): HTMLElement {
  const separator = '<!--nbsp--> ';
  const referenceRun = includeLeadingReferenceRun
    ? `<span class="char usfm_fr" data-marker="fr"><span>1:1 </span></span>${separator}`
    : '';
  const callerHtml = `<span class="immutable-note-caller" contenteditable="false"><button>+</button></span>`;
  return makeContainer(
    `<p><span class="note usfm_f expanded" data-marker="f">${callerHtml}${separator}${referenceRun}${bodyRunsHtml}</span></p>`,
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
    const container = makeNoteContainer(
      '<span class="char usfm_ft" data-marker="ft"><span>Or "sinful"</span></span><!--nbsp--> ',
    );
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
    const container = makeNoteContainer(
      '<span class="char usfm_ft" data-marker="ft"><span>Or "sinful"</span></span><!--nbsp--> ',
    );
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
    const container = makeNoteContainer(
      '<span class="char usfm_ft" data-marker="ft"><span>Or "sinful"</span></span><!--nbsp--> ',
    );
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
      '<span class="char usfm_ft" data-marker="ft"><span>Or "sinful"</span></span><!--nbsp--> ' +
        '<span class="char usfm_fq" data-marker="fq"><span>quoted</span></span><!--nbsp--> ',
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
      '<span class="char usfm_ft" data-marker="ft"><span>Foo</span></span><!--nbsp--> ' +
        '<span class="char usfm_fr" data-marker="fr"><span>Bar</span></span><!--nbsp--> ',
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
