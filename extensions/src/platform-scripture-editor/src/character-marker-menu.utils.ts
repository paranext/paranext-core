/*
 * Web-view-only helpers for the character-marker menu.
 *
 * This module imports runtime UI values (a `lucide-react` icon), so it must stay out of the
 * extension host's import graph. `main.ts` runs in the extension host, where the module shim
 * rejects any `require` other than `papi` ("Requiring other than papi is not allowed in
 * extensions!"), so a UI value reachable from there makes the whole extension fail to activate and
 * no scripture editor opens. That is why these helpers live in their own module instead of in
 * `platform-scripture-editor.utils.ts`, which `main.ts` imports. Nothing enforces the boundary at
 * build or lint time — it fails at runtime.
 */

import { isCharacterMarker, LanguageStrings, LocalizeKey, usfmMarkers } from 'platform-bible-utils';
import { MutableRefObject } from 'react';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MarkerMenuItem } from 'platform-bible-react';
import { RemoveFormatting } from 'lucide-react';

const REMOVE_CHARACTER_MARKER_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerMenu_removeMarker%';

/**
 * Localize keys used by {@link generateCharacterMarkerMenuListItems}. Spread these into the editor
 * web view's localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const CHARACTER_MARKER_MENU_STRING_KEYS = Object.freeze([
  REMOVE_CHARACTER_MARKER_KEY,
] as const);

/**
 * Function that generates the character marker menu items for the character-marker control.
 * Filtered to the character markers that are valid inside `parentMarker`, using the same
 * parent-scoped `usfmMarkers` children data the inline marker menu uses.
 *
 * Note that no item is ever marked `isDisallowed`: character markers are deliberately exempt from
 * structure protection, so this function takes no `isStructureProtected` parameter and there is no
 * code path that could disallow one.
 *
 * @param editorRef The ref for the editor component to be able to insert markers
 * @param closeMarkersMenu Callback to close the markers menu after an action
 * @param localizedStrings The localized strings to use to localize the marker titles
 * @param parentMarker The block marker containing the current selection, which determines which
 *   character markers are offered. Pass the editor's `blockMarker`, not its `contextMarker`: a
 *   character marker such as `nd` has no children in `usfmMarkers`, so passing the marker at the
 *   selection would produce an empty menu whenever the caret sits inside an existing character
 *   marker.
 * @param characterMarkerOptions The character marker applied at the current selection plus the
 *   optional editor operations for acting on it. Each operation is optional because the editor does
 *   not expose all of them yet; omit an operation to disable the actions that need it. With no
 *   `changeCharacterMarker`, picking a marker adds it instead of changing it.
 * @returns The list of character marker menu items, sorted by marker code. Empty when
 *   `parentMarker` is absent or contributes no character markers (e.g. `c`) — those early returns
 *   win over the remove row, so the result is `[]` even when a marker is applied and
 *   `removeCharacterMarker` is supplied.
 */
export function generateCharacterMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  closeMarkersMenu: () => void,
  localizedStrings: LanguageStrings,
  parentMarker?: string,
  characterMarkerOptions?: {
    /**
     * The character marker applied at the current selection, if any. Must be a character marker —
     * pass the editor's `contextMarker` filtered through `isCharacterMarker`, not the raw value
     * (the raw value is `'p'` whenever the caret sits in ordinary paragraph text). A value that is
     * not a character marker is ignored.
     */
    currentCharacterMarker?: string;
    /**
     * Replaces the applied character marker with the picked one. `EditorRef` exposes no
     * replace-character-marker operation yet, so supply this only once it does; while it is absent,
     * picking a marker adds instead of changing.
     */
    changeCharacterMarker?: (fromMarker: string, toMarker: string) => void;
    /**
     * Removes the applied character marker, leaving its content in place. `EditorRef` exposes no
     * remove-character-marker operation yet, so supply this only once it does; while it is absent,
     * the menu offers no remove row.
     */
    removeCharacterMarker?: (marker: string) => void;
  },
): MarkerMenuItem[] {
  if (!parentMarker) return [];

  const markerDetails = usfmMarkers[parentMarker];
  if (!markerDetails?.children) return [];

  const {
    currentCharacterMarker: rawCurrentCharacterMarker,
    changeCharacterMarker,
    removeCharacterMarker,
  } = characterMarkerOptions ?? {};
  // Defense-in-depth: the caller is expected to pass an already-filtered marker (the editor's
  // `contextMarker` run through `isCharacterMarker`), so this should normally already be a
  // character marker or absent. Kept as a second layer in case a caller passes the raw
  // `contextMarker` instead, which is `'p'` whenever the caret is in ordinary paragraph text.
  const currentCharacterMarker =
    rawCurrentCharacterMarker && isCharacterMarker(rawCurrentCharacterMarker)
      ? rawCurrentCharacterMarker
      : undefined;

  const markerMenuItems: MarkerMenuItem[] = [];
  Object.values(markerDetails.children).forEach((markers) => {
    markerMenuItems.push(
      ...markers
        .filter((marker) => isCharacterMarker(marker))
        .map((marker): MarkerMenuItem => {
          return {
            marker,
            title:
              localizedStrings[usfmMarkers[marker].description] ?? usfmMarkers[marker].description,
            action: () => {
              if (marker === currentCharacterMarker) {
                // This marker is already applied to the selection, and inserting it again would nest
                // an identical character marker. Doing nothing is deliberate: what a second pick
                // should do (toggle it off, or extend it over the whole selection) is a UX decision
                // that has not been made, so this stays inert rather than guessing.
                closeMarkersMenu();
                return;
              }
              if (currentCharacterMarker && changeCharacterMarker)
                changeCharacterMarker(currentCharacterMarker, marker);
              else editorRef.current?.insertMarker(marker);
              closeMarkersMenu();
            },
          };
        }),
    );
  });
  const sortedMarkerMenuItems = markerMenuItems.sort((a, b) =>
    (a.marker ?? a.title).localeCompare(b.marker ?? b.title),
  );

  // The remove row goes first, ahead of the sorted markers. Note this ordering only holds while the
  // menu's search box is empty: the row has no marker code to match on, so a search can only match
  // its title, and `MarkerMenu` renders title matches after every code match.
  if (!currentCharacterMarker || !removeCharacterMarker) return sortedMarkerMenuItems;
  return [
    {
      title: localizedStrings[REMOVE_CHARACTER_MARKER_KEY] ?? REMOVE_CHARACTER_MARKER_KEY,
      icon: RemoveFormatting,
      action: () => {
        removeCharacterMarker(currentCharacterMarker);
        closeMarkersMenu();
      },
    },
    ...sortedMarkerMenuItems,
  ];
}
