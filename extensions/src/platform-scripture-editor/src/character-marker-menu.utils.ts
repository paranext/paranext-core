/*
 * Web-view-only helpers for the character-marker menu.
 *
 * This module imports runtime UI values (a `lucide-react` icon), so it must stay out of the
 * extension host's import graph. `main.ts` runs in the extension host, where the module shim
 * rejects any `require` other than `papi` ("Requiring other than papi is not allowed in
 * extensions!"), so a UI value reachable from there makes the whole extension fail to activate and
 * no scripture editor opens. That is why these helpers live in their own module instead of in
 * `platform-scripture-editor.utils.ts`, which `main.ts` imports. Neither the build nor lint catches
 * the violation — it fails at runtime — so `extension-host-import-boundary.test.ts` enforces the
 * boundary by walking `main.ts`'s transitive value-import graph. Keeping this module out of that
 * graph is what makes the `lucide-react` import below safe.
 */

import { isCharacterMarker, LanguageStrings, LocalizeKey, usfmMarkers } from 'platform-bible-utils';
import { MutableRefObject } from 'react';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MarkerMenuItem } from 'platform-bible-react';
import { RemoveFormatting } from 'lucide-react';
import {
  CharacterMarkerCoverage,
  CharacterMarkerSelectionState,
  isMixedCoverage as getIsMixedCoverage,
} from './character-marker-coverage.utils';

const REMOVE_CHARACTER_MARKER_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerMenu_removeMarker%';
/**
 * The catch-all row's label, shown when the selection carries more than one character marker or
 * mixes marked and unmarked text.
 *
 * Deliberately NOT "Remove all character markers" — one activation peels a single nesting layer, so
 * "all" would overstate it. `adr-character-marker-removal-peels-one-layer` has the full rationale.
 */
const REMOVE_CHARACTER_MARKERS_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_characterMarkerMenu_removeMarkers%';

/**
 * Localize keys used by {@link generateCharacterMarkerMenuListItems}. Spread these into the editor
 * web view's localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const CHARACTER_MARKER_MENU_STRING_KEYS = Object.freeze([
  REMOVE_CHARACTER_MARKER_KEY,
  REMOVE_CHARACTER_MARKERS_KEY,
] as const);

/**
 * Whether a marker row's action would do nothing, so the row must render unavailable rather than
 * silently swallowing the click.
 *
 * This mirrors, condition for condition, the inert branches of the row's own action below — the two
 * are written next to each other for exactly that reason. A row goes inert because `insertMarker`
 * NESTS rather than replaces or extends, so every case where neither removal nor replacement is
 * available has no defined meaning to act on.
 *
 * @param selectionState How much of the selection this row's marker covers, or `undefined` while
 *   the menu has no coverage (it is only sampled on open).
 * @param marker This row's marker code.
 * @param currentCharacterMarker The marker the menu treats as applied, if any.
 * @param canRemove Whether a remove operation was supplied.
 * @param canChange Whether a replace operation was supplied.
 */
function isMarkerRowInert(
  selectionState: CharacterMarkerSelectionState | undefined,
  marker: string,
  currentCharacterMarker: string | undefined,
  canRemove: boolean,
  canChange: boolean,
): boolean {
  // Extending a partially-covering marker over the rest of the selection needs the editor's extend
  // operation. The editor exposes one, but nothing here reaches it: `characterMarkerOptions` has no
  // extend entry and this function takes no `canExtend`, so the row is inert unconditionally and no
  // caller can make it live.
  // TODO(PT-4394): add an extend option and a `canExtend` branch, wired to
  // `EditorRef.extendCharacterMarker`.
  if (selectionState === 'partial') return true;
  // Covers everything, so the action is a toggle-off — inert only if no remove operation was
  // supplied.
  if (selectionState === 'all') return !canRemove;
  // Nothing applied: picking a marker adds it, which always works.
  if (!currentCharacterMarker) return false;
  // A marker IS applied: picking the same one again has no defined meaning, and picking a different
  // one needs the replace operation.
  return marker === currentCharacterMarker || !canChange;
}

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
 * @param characterMarkerOptions The character marker applied at the current selection, the
 *   selection's per-marker coverage, plus the optional editor operations for acting on them. Each
 *   operation is optional so a caller can offer only the actions it supports; omit an operation to
 *   disable the actions that need it. The one production caller supplies `removeCharacterMarker`
 *   only, so with no `changeCharacterMarker`, picking a marker while one is applied does nothing —
 *   it never falls back to adding, because adding nests.
 * @returns The list of character marker menu items, sorted by marker code. Empty when
 *   `parentMarker` is absent or contributes no character markers — whether it has no children at
 *   all (e.g. `c`) or only non-character children (e.g. `mt`). That wins over the remove row, so
 *   the result is `[]` even when a marker is applied and `removeCharacterMarker` is supplied; the
 *   menu never offers "Remove" with nothing to add.
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
     * Per-marker coverage of the current selection, computed when the menu opens. Absent while the
     * menu is closed, and when the selection cannot be resolved against the editor's USJ.
     *
     * It decides both what each row DOES and what it shows: a row whose marker covers the whole
     * selection removes it, a partially-covering row is inert (extending it needs the editor's
     * extend operation, which this menu has no option for), and a mixed selection swaps the single
     * remove row for a remove-all row. Both halves of that live here rather than being stamped on
     * afterwards, so one decision is not split across two files.
     */
    coverage?: CharacterMarkerCoverage;
    /**
     * Replaces the applied character marker with the picked one. `EditorRef` exposes a
     * replace-character-marker operation, but no caller wires this to it; while this is absent,
     * every marker row is inert whenever a character marker is applied. It does **not** fall back
     * to `insertMarker`, because inserting over an existing character marker nests it rather than
     * replacing it (verified against the editor package — see the comment at the call site).
     *
     * TODO(PT-4394): wire this to `EditorRef.replaceCharacterMarker`. Note that operation throws in
     * readonly mode and on unsupported markers, so the caller needs the same error handling the
     * remove path has.
     */
    changeCharacterMarker?: (fromMarker: string, toMarker: string) => void;
    /**
     * Removes character markers, keeping their content. Called with a marker to remove that one,
     * and with no argument to peel one nesting layer from every run the selection covers
     * (`adr-character-marker-removal-peels-one-layer`). Omit to offer no remove row at all.
     */
    removeCharacterMarker?: (marker?: string) => void;
  },
): MarkerMenuItem[] {
  if (!parentMarker) return [];

  const markerDetails = usfmMarkers[parentMarker];
  if (!markerDetails?.children) return [];

  const {
    currentCharacterMarker: rawCurrentCharacterMarker,
    coverage,
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

  // See `isMixedCoverage` for what "mixed" means and why it is not read off `currentCharacterMarker`.
  // Shared with the trigger's `(mixed)` label so the label and this menu's remove row cannot
  // disagree about the same selection.
  const isMixedCoverage = !!coverage && getIsMixedCoverage(coverage);

  // Every generated item carries a marker code — `MarkerMenuItem.marker` is optional only for rows
  // like the remove rows below, which are prepended after sorting — so the sort compares codes
  // directly with no title fallback.
  const markerMenuItems: (MarkerMenuItem & { marker: string })[] = Object.values(
    markerDetails.children,
  ).flatMap((markers) =>
    markers
      .filter((marker) => isCharacterMarker(marker))
      .map((marker) => {
        // Normalized ONCE and shared by all three consumers below — the displayed state, the inert
        // test, and the action. `isMarkerRowInert` must mirror the action's branches
        // condition-for-condition, so reading the raw map in one place and the `?? 'none'` form in
        // another is how those two silently diverge the moment a `'none'`-specific branch is added.
        //
        // The `| undefined` on `coveredState` is load-bearing, not decoration. `markerStates` is a
        // `Record<string, CharacterMarkerCoverageState>`, so TypeScript types an arbitrary-key lookup
        // as always-present and would treat the `?? 'none'` below as dead code — narrowing
        // `selectionState` to `'all' | 'partial' | undefined` and rejecting the `=== 'none'` test.
        // At runtime the fallback absolutely does fire: absence from the map is exactly how coverage
        // encodes "this marker covers none of the selection".
        const coveredState: CharacterMarkerCoverage['markerStates'][string] | undefined =
          coverage?.markerStates[marker];
        // Absent coverage stays `undefined` — the menu only samples coverage on open, which is a
        // different thing from "sampled, and nothing is covered".
        const selectionState: CharacterMarkerSelectionState | undefined = coverage
          ? (coveredState ?? 'none')
          : undefined;
        return {
          marker,
          title:
            localizedStrings[usfmMarkers[marker].description] ?? usfmMarkers[marker].description,
          selectionState,
          isDisabled: isMarkerRowInert(
            selectionState,
            marker,
            currentCharacterMarker,
            !!removeCharacterMarker,
            !!changeCharacterMarker,
          ),
          action: () => {
            // Toggle off: the marker already covers the whole selection, so picking it again means
            // "take it away". Applying it again would nest an identical character marker.
            if (selectionState === 'all' && removeCharacterMarker) removeCharacterMarker(marker);
            // An ALLOWLIST, not `!== 'partial' && !== 'all'`. This is the only branch that may reach
            // `insertMarker`, so it must admit exactly the states where adding a marker is defined:
            // nothing covered, or no coverage sampled at all. Stated positively, a future fourth
            // selection state is excluded by default rather than falling into the insert path.
            //
            // The two states it excludes, and why: 'partial' — extending the marker over the rest of
            // the selection needs the editor's extend operation, which this menu has no option for,
            // and `insertMarker` would nest rather than extend. 'all' — handled above, but without a
            // `removeCharacterMarker` (the option is typed optional) it would otherwise fall through
            // here and nest a duplicate marker.
            else if (selectionState === 'none' || selectionState === undefined) {
              // Never `insertMarker` while a character marker is already applied: it *nests* rather
              // than replaces. Verified 2026-08-04 against the editor package by driving
              // `getUsjMarkerAction('bd')` over a selection inside an existing `\nd` CharNode, which
              // produced `char:nd > char:bd > "LORD"` — and `char:nd > char:nd` for the same marker
              // picked twice. `$charNodeTransform`
              // (`libs/shared-react/src/plugins/usj/CharNodePlugin.tsx`) only coalesces *sibling*
              // CharNodes, so the nesting survives into the saved USJ. So when a marker is applied,
              // change it if the editor can, and otherwise stay inert.
              if (currentCharacterMarker) {
                if (marker !== currentCharacterMarker)
                  changeCharacterMarker?.(currentCharacterMarker, marker);
              } else editorRef.current?.insertMarker(marker);
            }
            closeMarkersMenu();
          },
        };
      }),
  );
  const sortedMarkerMenuItems = markerMenuItems.sort((a, b) => a.marker.localeCompare(b.marker));

  // The remove row goes first, ahead of the sorted markers. Note this ordering only holds while the
  // menu's search box is empty: the row has no marker code to match on, so a search can only match
  // its title, and `MarkerMenu` renders title matches after every code match.
  //
  // An empty marker list suppresses the remove row too, so a parent that contributes no character
  // markers always yields `[]`. Some parents have children of which none is a character marker (e.g.
  // `mt`, `h`, `qs`), which gets past the early returns above; without this check those would offer
  // a remove row and nothing to add, while a childless parent like `c` offers nothing at all.
  const hasSomethingToRemove = isMixedCoverage || !!currentCharacterMarker;
  if (!sortedMarkerMenuItems.length || !hasSomethingToRemove || !removeCharacterMarker)
    return sortedMarkerMenuItems;

  // Neither remove row carries a `selectionState`, deliberately. `MarkerMenu` maps that prop onto
  // `aria-checked` ('all' → true, 'partial' → 'mixed', 'none' → false) and renders a matching
  // checkbox affordance, and the prop's contract is "how much of the selection THIS MARKER covers".
  // A remove row has no marker — that absence is exactly how `MarkerMenu` decides to draw an icon
  // instead of a marker code — so any value here answers a question the row does not pose. The
  // wrong answer is the common one: on a fully-marked selection the honest reading of coverage is
  // `'none'` (nothing is unmarked), which renders as `aria-checked="false"` and is announced as
  // "not checked" beside an action that is fully available and certain to remove markers.
  //
  // Removing the character markers a selection covers is ONE argument-less call, not a loop, so a
  // nested OUTER marker survives the pass and the per-marker rows are the exact path for it. See
  // `adr-character-marker-removal-peels-one-layer` for why looping was rejected.
  const removeRow: MarkerMenuItem = isMixedCoverage
    ? {
        title: localizedStrings[REMOVE_CHARACTER_MARKERS_KEY] ?? REMOVE_CHARACTER_MARKERS_KEY,
        icon: RemoveFormatting,
        // Never inert: a remove row is only emitted at all when removal exists and something is
        // covered, so it always has something to do.
        isDisabled: false,
        action: () => {
          removeCharacterMarker();
          closeMarkersMenu();
        },
      }
    : {
        title: localizedStrings[REMOVE_CHARACTER_MARKER_KEY] ?? REMOVE_CHARACTER_MARKER_KEY,
        icon: RemoveFormatting,
        // See the row above: never inert.
        isDisabled: false,
        action: () => {
          // Non-null: `hasSomethingToRemove` is true and `isMixedCoverage` is false here, so
          // `currentCharacterMarker` is set.
          removeCharacterMarker(currentCharacterMarker);
          closeMarkersMenu();
        },
      };
  return [removeRow, ...sortedMarkerMenuItems];
}
