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
 * Collapse the window selection at a position within `container`'s visible text, walking text nodes
 * in document order and accumulating UTF-16 code-unit lengths.
 *
 * @param container Element whose text content the position refers to (e.g. the editor input).
 * @param position Target position; offsets past the available text clamp to the end.
 * @returns `true` if a caret was placed; `false` if the container has no text nodes.
 */
export function placeCaretAtPosition(
  container: HTMLElement,
  position: FootnoteCaretPosition,
): boolean {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
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
