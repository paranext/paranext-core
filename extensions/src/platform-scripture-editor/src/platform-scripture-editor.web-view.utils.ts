/**
 * WEB-VIEW-ONLY utility helpers for the platform-scripture-editor extension.
 *
 * IMPORTANT: this module imports RUNTIME VALUES (`getMarkerMenuItems`, `defaultStyleInfo`) from
 * `@eten-tech-foundation/platform-editor`, whose dist is a single, non-splittable library bundle
 * that also contains the React editor components and a top-level `react/jsx-runtime` import.
 * Importing any value from it pulls the whole bundle into the importer's webpack module graph. That
 * is fine in the web view (browser iframe, live React), but FATAL in the extension host: `main.js`
 * runs in a sandboxed Node context with no React runtime and a `require` that rejects anything but
 * `@papi/*`-family modules, so the editor bundle's eager `react/jsx-runtime` import throws during
 * `activate()` and the whole extension fails to activate (see the Phase 5 Task 15 cold-start
 * finding).
 *
 * Therefore this module must ONLY ever be imported by web-view code (and its tests) — NEVER by
 * `main.ts` or anything `main.ts` reaches. Main-bundle-safe helpers live in
 * `platform-scripture-editor.utils.ts`, which is restricted to `import type` from the editor
 * package.
 */

import type { CommandPaletteItem } from '@papi/core';
import { isBlockMarker, isLocalizeKey, LanguageStrings } from 'platform-bible-utils';
import type { MutableRefObject } from 'react';
import {
  defaultStyleInfo,
  getMarkerMenuItems,
  type EditorRef,
  type MarkerMenuItem as EditorMarkerMenuItem,
  type StyleInfo,
} from '@eten-tech-foundation/platform-editor';
import type { MarkerMenuItem } from 'platform-bible-react';

/**
 * Resolves the display title for a stylesheet-sourced marker-menu item: localizes `description`
 * when it happens to be a `LocalizeKey` (`%...%`), uses it as-is otherwise — the bundled usfm.sty's
 * descriptions are raw English text, not localization keys, so this is the common case — and falls
 * back to the marker code itself when the stylesheet gives no description at all.
 */
function resolveMarkerMenuItemTitle(
  marker: string,
  description: string | undefined,
  localizedStrings: LanguageStrings,
): string {
  if (!description) return marker;
  return isLocalizeKey(description) ? (localizedStrings[description] ?? description) : description;
}

/**
 * Function that generates the inline marker menu items that will update as the cursor location
 * changes. Sourced from the project's stylesheet (usfm.sty + custom.sty, merged and serialized by
 * the host) via the shared library's `getMarkerMenuItems` — the same PT9-derived classification
 * used by the standard-view `\`/Enter palettes — so a project's custom.sty markers are offered and
 * markers the project's stylesheet doesn't define are not, instead of walking a static built-in
 * marker list.
 *
 * @param editorRef The ref for the editor component to be able to insert markers
 * @param closeMarkersMenu Callback to close the markers menu after an action
 * @param localizedStrings The localized strings to use to localize the marker titles
 * @param isStructureProtected Whether the project's paragraph structure is currently protected;
 *   when `true`, block-level markers will be disallowed and their action will call
 *   `notifyStructureProtected` instead of inserting
 * @param notifyStructureProtected Callback to invoke when the user attempts to insert a block-level
 *   marker while structure is protected
 * @param parentMarker The current parent marker which is used to determine which markers to include
 * @param styleInfo The project's stylesheet data; falls back to the bundled default stylesheet when
 *   absent (e.g. no project stylesheet loaded yet)
 * @returns The list of inline marker menu items, in the library's PT9-derived order (basic markers
 *   first)
 */
export function generateInlineMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  closeMarkersMenu: () => void,
  localizedStrings: LanguageStrings,
  isStructureProtected: boolean,
  notifyStructureProtected: () => void,
  parentMarker?: string,
  styleInfo?: StyleInfo,
): MarkerMenuItem[] {
  if (!parentMarker) return [];

  const items = getMarkerMenuItems(styleInfo ?? defaultStyleInfo, {
    source: 'character',
    paraMarker: parentMarker,
    previousParaMarkers: [],
    openCharMarkers: [],
    hasTextSelection: false,
    inMarkerText: false,
  });

  return items.map((item): MarkerMenuItem => {
    const isDisallowed = isStructureProtected && isBlockMarker(item.marker);
    return {
      marker: item.marker,
      title: resolveMarkerMenuItemTitle(item.marker, item.description, localizedStrings),
      isDisallowed,
      action: () => {
        // Defense-in-depth: unreachable while the menu renders `isDisallowed` items as disabled
        // `CommandItem`s (a disabled cmdk item never fires `onSelect`). Kept as a second layer of
        // protection in case that disabled rendering is ever loosened or the menu wiring changes.
        if (isDisallowed) {
          notifyStructureProtected();
          closeMarkersMenu();
          return;
        }
        editorRef.current?.insertMarker(item.marker);
        closeMarkersMenu();
      },
    };
  });
}

/**
 * Maps a library marker-menu item to the overlay service's command-palette item shape (the
 * standard-view `\`/Enter palettes).
 *
 * All strings are plain (never `LocalizeKey`s): passive palettes filter and commit on RAW `label`
 * strings (see `filterPaletteItems`), and the badge shares that constraint by policy. Items are
 * mapped in the library's PT9-derived order and never regrouped — a `group` key would visually pull
 * close tags out of the PT9 basic-first interleaved ordering, so close tags are instead marked in
 * place with an `'end'` badge, and PT9's grey cue for non-basic markers maps to `muted`.
 */
export function markerMenuItemToCommandPaletteItem(item: EditorMarkerMenuItem): CommandPaletteItem {
  return {
    id: item.marker,
    label: item.marker,
    description: item.description,
    badge: item.kind === 'closeTag' ? 'end' : undefined,
    muted: !item.isBasic,
  };
}

/**
 * Clears a palette-session ref only when it still holds the session identified by `token`.
 *
 * The keydown flow ends sessions synchronously (Escape/Space/`*`/any-other-key clear the ref before
 * dismissing), but the show-promise's `.then`/`.catch` also clear it asynchronously. If the user
 * dismisses session A and immediately re-triggers session B, A's promise settles AFTER B was
 * created — an unconditional clear there would kill the live session B. Tokens are a monotonic
 * counter, so a stale session's async cleanup can never touch a newer session.
 */
export function clearPaletteSessionIfCurrent<TSession extends { token: number }>(
  sessionRef: MutableRefObject<TSession | undefined>,
  token: number,
): void {
  if (sessionRef.current?.token === token) sessionRef.current = undefined;
}
