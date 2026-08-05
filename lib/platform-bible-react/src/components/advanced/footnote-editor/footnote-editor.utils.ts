import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { LanguageStrings, usfmMarkers } from 'platform-bible-utils';
import { MutableRefObject } from 'react';
import { MarkerMenuItem } from '../marker-menu.component';
import { FootnoteCaretPosition } from '../footnotes/footnotes.types';

/**
 * Function that generates the inline marker menu items that will update as the cursor location
 * changes. In the future this function will take data from an `.sty` file so that users can define
 * their own markers.
 *
 * @param editorRef The ref for the editor component to be able to insert markers
 * @param parentMarker The current parent marker which is used to determine which markers to include
 * @returns The list of inline marker menu items
 */
export function generateInlineMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  closeMarkersMenu: () => void,
  localizedStrings: LanguageStrings,
  parentMarker?: string,
): MarkerMenuItem[] {
  // Makes it so that if the parent marker is a paragraph, won't show the marker menu
  if (!parentMarker || parentMarker === 'p') return [];

  const markerDetails = usfmMarkers[parentMarker];
  if (!markerDetails?.children) return [];

  const markerMenuItems: MarkerMenuItem[] = [];
  Object.entries(markerDetails.children).forEach(([, markers]) => {
    markerMenuItems.push(
      ...markers.map((marker) => {
        return {
          marker,
          title:
            localizedStrings[usfmMarkers[marker].description] ?? usfmMarkers[marker].description,
          action: () => {
            editorRef.current?.insertMarker(marker);
            closeMarkersMenu();
          },
        };
      }),
    );
  });
  return markerMenuItems.sort((a, b) => (a.marker ?? a.title).localeCompare(b.marker ?? b.title));
}

/**
 * Text-node filter for {@link placeCaretAtPosition}: nodes for which this returns `false` are
 * excluded from both the offset accumulation and the caret-landing candidates, as if they weren't
 * part of `container`'s text at all.
 */
export type CaretTextNodeFilter = (node: Text) => boolean;

/**
 * Collapse the window selection at a position within `container`'s visible text, walking text nodes
 * in document order and accumulating UTF-16 code-unit lengths.
 *
 * @param container Element whose text content the position refers to (e.g. the editor input).
 * @param position Target position; offsets past the available text clamp to the end of the filtered
 *   text (see `isEligibleTextNode`).
 * @param isEligibleTextNode Optional filter; text nodes for which this returns `false` are skipped
 *   entirely (not counted, never landed on). Defaults to accepting every text node. Pass
 *   {@link createNoteBodyTextNodeFilter}'s result to align with a footnote row's captured
 *   `FootnoteCaretPosition`, whose offset origin is the note's displayed BODY text only.
 * @returns `true` if a caret was placed; `false` if the container has no eligible text nodes.
 */
export function placeCaretAtPosition(
  container: HTMLElement,
  position: FootnoteCaretPosition,
  isEligibleTextNode: CaretTextNodeFilter = () => true,
): boolean {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      // TreeWalker with SHOW_TEXT only yields Text nodes
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      isEligibleTextNode(node as Text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
  });
  let lastTextNode: Text | undefined;
  let accumulated = 0;
  const target = position === 'end' ? Number.POSITIVE_INFINITY : position.utf16Offset;

  let node = walker.nextNode();
  while (node) {
    // TreeWalker with SHOW_TEXT only yields Text nodes
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const textNode = node as Text;
    const { length } = textNode.data;
    if (accumulated + length >= target) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      const range = document.createRange();
      range.setStart(textNode, target - accumulated);
      range.collapse(true);
      selection?.addRange(range);
      return true;
    }
    accumulated += length;
    lastTextNode = textNode;
    node = walker.nextNode();
  }

  if (!lastTextNode) return false;
  const selection = window.getSelection();
  selection?.removeAllRanges();
  const range = document.createRange();
  range.setStart(lastTextNode, lastTextNode.data.length);
  range.collapse(true);
  selection?.addRange(range);
  return true;
}

/**
 * Finds the note's first top-level reference-run element (a `fr`/`xo` `.char` child of the note),
 * if any - the editor-DOM equivalent of `FootnoteItem`'s `targetRef` split, which pulls the FIRST
 * top-level content item out of the body only when it's a `fr`/`xo` marker (see
 * `footnote-item.component.tsx`'s `targetRef` destructuring). Only the true first top-level child
 * (excluding the rendered caller) is considered - a later `fr`/`xo` run is body text, not a
 * header.
 *
 * @param noteElement The note's root element (Platform Editor's `NoteNode`, class `note`).
 */
function findFirstTopLevelReferenceRun(noteElement: Element): Element | undefined {
  const firstContentChild = Array.from(noteElement.children).find(
    (child) => !child.classList.contains('immutable-note-caller'),
  );
  if (!firstContentChild || !firstContentChild.classList.contains('char')) return undefined;

  const marker = firstContentChild.getAttribute('data-marker');
  return marker === 'fr' || marker === 'xo' ? firstContentChild : undefined;
}

/**
 * Builds a {@link placeCaretAtPosition} text-node filter that restricts caret placement to the same
 * text `FootnoteItem` renders in a footnote row's `.textual-note-body` - the note's BODY text, as
 * loaded live into the editor. Without this filter, a `FootnoteCaretPosition` captured from the
 * read-only row (via `getCaretPositionFromClick`) lands early in the editor by the length of every
 * excluded run, because the editor's flat text includes content the read-only row never renders.
 *
 * Verified against the real Platform Editor note DOM (Storybook `Demo/Scripture Editor/Footnotes
 * Pane`): a loaded note renders as `<span class="note usfm_<marker>"><span
 * class="immutable-note-caller" contenteditable="false"><button>…</button></span><!--NBSP--><span
 * class="char usfm_fr">…</span><!--NBSP--><span class="char usfm_ft">…</span><!--NBSP--></span>`.
 * This excludes:
 *
 * - Text inside a non-editable decorator wrapper (the rendered note caller button). Lexical's
 *   `DecoratorNode` reconciler sets `contenteditable="false"` on the wrapper, never on the button
 *   itself, so the check must walk ancestors rather than the immediate parent.
 * - Text inside the note's first top-level `fr`/`xo` reference-run `.char` element (see
 *   {@link findFirstTopLevelReferenceRun}).
 * - Text that isn't inside any `.char` element at all. `NoteNodePlugin`'s
 *   `$noteCharNodeTransform`/`$noteCallerNodeTransform` insert a zero-width NBSP text node directly
 *   between each pair of top-level note children (caller/char runs) purely so the caret can
 *   enter/exit them; these are editor-DOM structural artifacts with no counterpart in the read-only
 *   row's flattened text, and would otherwise silently inflate offsets for any note with more than
 *   one body run (e.g. `fr` + `fq` + `ft`).
 *
 * @param container The note's rendered root (e.g. the editor's `.editor-input`).
 */
export function createNoteBodyTextNodeFilter(container: HTMLElement): CaretTextNodeFilter {
  const noteElement = container.querySelector('.note');
  const excludedRun = noteElement ? findFirstTopLevelReferenceRun(noteElement) : undefined;

  return (node: Text): boolean => {
    let insideCharElement = false;
    let ancestor = node.parentElement;
    while (ancestor && ancestor !== container) {
      if (ancestor.getAttribute('contenteditable') === 'false') return false;
      if (ancestor === excludedRun) return false;
      if (ancestor.classList.contains('char')) insideCharElement = true;
      ancestor = ancestor.parentElement;
    }
    return insideCharElement;
  };
}
