import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { LanguageStrings, usfmMarkers } from 'platform-bible-utils';
import { MutableRefObject } from 'react';
import { MarkerMenuItem } from '../marker-menu.component';

/**
 * Function that generates the inline marker menu items that will update as the cursor location
 * changes.
 *
 * TODO(PT-4199): The menu is built from the static `usfmMarkers` table, so a project's custom.sty
 * markers are missing from it and a marker the project redefined is described by the stock entry.
 * Take the marker set from the project's stylesheet instead.
 *
 * @param editorRef The ref for the editor component to be able to insert markers
 * @param parentMarker The current parent marker which is used to determine which markers to include
 * @param noteMarker The marker of the note being edited (`f`, `fe`, `x`), used when the caret's own
 *   marker defines no children of its own
 * @returns The list of inline marker menu items
 */
export function generateInlineMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  closeMarkersMenu: () => void,
  localizedStrings: LanguageStrings,
  parentMarker?: string,
  noteMarker?: string,
): MarkerMenuItem[] {
  // Makes it so that if the parent marker is a paragraph, won't show the marker menu
  if (!parentMarker || parentMarker === 'p') return [];

  // A caret inside a character run reports that run's marker (`ft`, `fq`, …), and those define no
  // children. What a user can insert there is what the enclosing note allows, so fall back to it.
  const markerDetails = usfmMarkers[parentMarker]?.children
    ? usfmMarkers[parentMarker]
    : usfmMarkers[noteMarker ?? parentMarker];
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
