/**
 * Shared test harness for the footnote-editor suites that mount the REAL `Editorial` (rather than
 * the mocked `@eten-tech-foundation/platform-editor` used by footnote-editor.component.test.tsx).
 *
 * Those suites exercise real Lexical reconciliation/selection behavior that a mock cannot observe,
 * and each needs the same popover mount, the same deferred-init wait, the same non-public
 * Lexical-handle extraction, and the same way of reading where the caret ended up — so those live
 * here once instead of being copied per file. (This module is not a test itself; its name is
 * intentionally outside the `*.{test,spec}.*` glob so Vitest does not collect it. Dependency-light
 * fixtures live in footnote-editor.fixtures so the Storybook story can share them without pulling
 * in `@testing-library/react`.)
 */
import { act, render } from '@testing-library/react';
import type { DeltaOpInsertNoteEmbed, EditorOptions } from '@eten-tech-foundation/platform-editor';
import { $getSelection, $isRangeSelection, LexicalEditor, LexicalNode } from 'lexical';
import FootnoteEditor, { FootnoteEditorMarkerPalette } from './footnote-editor.component';
import { buildLocalizedStrings, scrRef, sentinelNoteOp } from './footnote-editor.fixtures';

// Re-export the shared fixtures so existing importers of the harness keep working.
export * from './footnote-editor.fixtures';

/** The popover's menus observe their triggers; jsdom ships no ResizeObserver. */
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

/**
 * Installs the browser APIs the popover's Radix/cmdk menus and the focused editor reach for and
 * jsdom does not implement. Idempotent, and never replaces an API the environment already has.
 *
 * These suites assert caret position, focus and content — never layout — so no-ops are enough. Call
 * it at module scope in any suite that mounts the popover.
 */
export function installPopoverJsdomStubs() {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') Element.prototype.scrollTo = () => {};
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
  // The markers menu anchors to the caret's bounding box, and a focused editor measures its caret.
  if (typeof Range.prototype.getBoundingClientRect !== 'function') {
    Range.prototype.getBoundingClientRect = () => new DOMRect();
  }
}

/** The non-editable marker mode the scripture editor uses outside Standard view. */
export const visibleView: EditorOptions['view'] = {
  markerMode: 'visible',
  hasSpacing: true,
  isFormattedFont: true,
};

/**
 * Mounts the REAL `FootnoteEditor` (no mocked `Editorial`) for the given view, waits for its
 * deferred init, and returns the render utils, the popover's `.editor-input` element, and the
 * mounted Lexical editor instance.
 *
 * The init effect defers `applyUpdate` via `setTimeout(0)` and re-asserts the note selection a
 * frame + a macrotask later; `waitMs` must cover whichever of those a caller asserts on (the
 * default covers the re-assert; pass a smaller value to only wait for `applyUpdate`).
 *
 * `markerPalette` (optional) wires up the standard-view `\` palette driver, for suites exercising
 * the palette open/commit round-trip against the real editor.
 *
 * `onChange` (optional) receives the popover's saved note ops (the component's auto-save and Save
 * flows), for suites asserting on what the save path emits.
 */
export async function renderPopoverAndWaitForInit(
  view: EditorOptions['view'],
  {
    waitMs = 50,
    markerPalette = undefined,
    onChange = undefined,
  }: {
    waitMs?: number;
    markerPalette?: FootnoteEditorMarkerPalette;
    onChange?: (noteOps: DeltaOpInsertNoteEmbed[]) => void;
  } = {},
) {
  const utils = render(
    <FootnoteEditor
      noteOps={[sentinelNoteOp]}
      onClose={() => {}}
      scrRef={scrRef}
      noteKey={undefined}
      editorOptions={{ view }}
      defaultMarkerMenuTrigger={'\\'}
      localizedStrings={buildLocalizedStrings()}
      markerPalette={markerPalette}
      onChange={onChange}
    />,
  );
  const editorInput = utils.container.querySelector('.editor-input');
  if (!(editorInput instanceof HTMLElement)) throw new Error('popover editor-input not found');

  // Let the deferred init effects run for real rather than mocking timers, matching the effect's
  // own scheduling.
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, waitMs);
    });
  });

  // Lexical exposes its mounted editor instance on the root DOM element via this non-public,
  // underscore-prefixed property — there's no public API to reach it from outside a React ref, and
  // this is the same technique the engine's own popover round-trip tests use.
  // eslint-disable-next-line no-underscore-dangle, no-type-assertion/no-type-assertion
  const lexical = (editorInput as unknown as { __lexicalEditor?: LexicalEditor }).__lexicalEditor;
  if (!lexical) throw new Error('lexical editor handle not found on popover editor-input');
  return { utils, editorInput, lexical };
}

/**
 * The ancestry a caret has when it sits in one of the note's character runs — text the user can
 * type into, rather than the note itself, which is where a bare `focus` leaves it.
 */
export const CARET_IN_NOTE_TEXT = ['text', 'char', 'note', 'para', 'root'];

/**
 * True when the caret sits anywhere inside the note node.
 *
 * Tolerant of there being no selection at all (answering `false`), unlike {@link caretAncestry},
 * which throws — some callers are asking exactly whether a caret made it into the note.
 */
export function caretIsInsideNote(lexical: LexicalEditor): boolean {
  return lexical.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false;
    for (let node: LexicalNode | null = selection.anchor.getNode(); node; node = node.getParent())
      if (node.getType() === 'note') return true;
    return false;
  });
}

/** The type of the caret's node and of each of its ancestors, innermost first. */
export function caretAncestry(lexical: LexicalEditor): string[] {
  return lexical.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) throw new Error('expected a range selection');
    const types: string[] = [];
    let node: LexicalNode | null = selection.anchor.getNode();
    while (node) {
      types.push(node.getType());
      node = node.getParent();
    }
    return types;
  });
}
