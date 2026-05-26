import type { MarkerContent, MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import { Canon, type SerializedVerseRef } from '@sillsdev/scripture';
import type { ChecklistContentItem, WalkerParagraph } from './checklist.types';

/**
 * Walks `usj.content` top-level nodes in document order, emitting a `WalkerParagraph` per
 * qualifying paragraph node. Pure function — no PDP access, no UsfmToken state machine.
 *
 * Replaces the C# `ChecklistService.GetTokensForBook` + per-token switch (see
 * `c-sharp/Checklists/ChecklistService.cs` ~660-1099). Top-level walk semantics:
 *
 * - `{type: 'chapter'}` advances `currentVerseRef` to `(book, n, 0)`.
 * - `{type: 'verse'}` advances `currentVerseRef`'s `verseNum`.
 * - `{type: 'para'}` emits a `WalkerParagraph` (subject to `userMarkerFilter`); the paragraph's
 *   `content` is walked for items + state advancement, but its nested `note` / `figure` / etc.
 *   children are NOT descended for paragraph emission (they're nested, not top-level).
 * - All other top-level node types (`book`, stray notes, etc.) are skipped.
 *
 * INV-009 / FB-35863: heading paragraphs forward-scan to the next non-heading content paragraph for
 * their `verseRefStart`; the scan stops at a chapter boundary.
 */
export function walkParagraphMarkers(
  usj: Usj,
  bookNum: number,
  userMarkerFilter: ReadonlySet<string>,
  headingMarkers: ReadonlySet<string>,
): WalkerParagraph[] {
  const result: WalkerParagraph[] = [];
  const bookId = Canon.bookNumberToId(bookNum);

  // Initial state: chapter 1, verse 0 (introductory material is "verse 0").
  let currentVerseRef: SerializedVerseRef = { book: bookId, chapterNum: 1, verseNum: 0 };

  const topLevel = usj.content ?? [];

  topLevel.forEach((node, i) => {
    if (typeof node === 'string') return;
    if (!isMarkerObject(node)) return;

    if (node.type === 'chapter') {
      const chapterNum = parseInt(node.number ?? '0', 10);
      currentVerseRef = { book: bookId, chapterNum, verseNum: 0 };
      return;
    }

    if (node.type === 'verse') {
      const verseNum = parseInt(node.number ?? '0', 10);
      currentVerseRef = { ...currentVerseRef, verseNum };
      return;
    }

    if (node.type !== 'para') {
      // Other top-level node types (`book`, stray `note`, etc.) — don't descend, don't emit.
      return;
    }

    const { marker } = node;
    if (!marker) return;

    // User markerFilter: empty set = no filter; otherwise gate.
    if (userMarkerFilter.size > 0 && !userMarkerFilter.has(marker)) {
      // Even though we don't EMIT this paragraph, we must still advance verseRef state from its
      // content — otherwise a subsequent emitted paragraph would inherit a stale verse.
      currentVerseRef = advanceVerseRefAcrossContent(node.content ?? [], currentVerseRef);
      return;
    }

    const isHeading = headingMarkers.has(marker);
    const verseRefStart = isHeading
      ? findVerseRefForHeading(topLevel, i, currentVerseRef, headingMarkers)
      : computeBodyVerseRefStart(node, currentVerseRef);

    const items = extractItems(node.content ?? []);
    result.push({ marker, verseRefStart, isHeading, items });

    // Advance currentVerseRef state by walking the paragraph's content for verse markers, so the
    // next paragraph inherits the last-seen verse.
    currentVerseRef = advanceVerseRefAcrossContent(node.content ?? [], currentVerseRef);
  });

  return result;
}

/** True when `value` is a `MarkerObject` (has a `type` field). */
function isMarkerObject(value: unknown): value is MarkerObject {
  // USJ JSON is parsed by the platform's `JSON.parse`, which may produce `null` for explicit JSON
  // `null` values. A runtime `=== null` check is the safe way to gate a `typeof === 'object'`
  // narrowing because `typeof null === 'object'`. Using `undefined` here would not protect us.
  // eslint-disable-next-line no-null/no-null
  return typeof value === 'object' && value !== null && 'type' in value;
}

/**
 * INV-009 / FB-35863: a heading paragraph's effective verseRef is the first verse of the next
 * non-heading content paragraph. Skip `b` (blank line) and any marker starting with `i`
 * (introductory: `\ib`, `\ip`, `\im`, ...) during the scan; STOP at the next chapter boundary
 * (return the input `fallback` unchanged — the heading retains its current verseRef).
 */
function findVerseRefForHeading(
  topLevel: MarkerContent[],
  startIndex: number,
  fallback: SerializedVerseRef,
  headingMarkers: ReadonlySet<string>,
): SerializedVerseRef {
  // Slice the lookahead window, then find the first qualifying node. Using `.find` keeps us out
  // of `for-of` territory while preserving the "first match wins / chapter stops the scan"
  // semantics.
  const lookahead = topLevel.slice(startIndex + 1);
  let stopped = false;
  let foundParagraph: MarkerObject | undefined;
  lookahead.some((node) => {
    if (typeof node === 'string') return false;
    if (!isMarkerObject(node)) return false;
    if (node.type === 'chapter') {
      stopped = true; // FB-35863
      return true;
    }
    if (node.type !== 'para') return false;
    const m = node.marker;
    if (!m) return false;
    if (m === 'b' || m.startsWith('i')) return false;
    if (headingMarkers.has(m)) return false;
    foundParagraph = node;
    return true;
  });
  if (stopped || !foundParagraph) return fallback;
  return computeBodyVerseRefStart(foundParagraph, fallback);
}

/**
 * Looks into the paragraph's content for the first `{type: 'verse'}` and uses its number; otherwise
 * returns the inherited `currentVerseRef`.
 */
function computeBodyVerseRefStart(
  paraNode: MarkerObject,
  currentVerseRef: SerializedVerseRef,
): SerializedVerseRef {
  const content = paraNode.content ?? [];
  const verseNode = content.find(
    (n): n is MarkerObject => typeof n !== 'string' && isMarkerObject(n) && n.type === 'verse',
  );
  if (!verseNode) return currentVerseRef;
  const verseNum = parseInt(verseNode.number ?? '0', 10);
  return { ...currentVerseRef, verseNum };
}

/**
 * Extracts typed items from a paragraph's content array. Mirrors the C# per-token switch in
 * `ChecklistService.cs` ~1082-1095:
 *
 * - `string` → `TextItem` with `characterStyle: undefined`.
 * - `{type: 'verse'}` → `VerseItem`.
 * - `{type: 'char', marker, content}` → flatten string children into a `TextItem` with
 *   `characterStyle: marker` (see consumer-inventory § 3 — the plan's `\ior` LinkItem special-case
 *   is dropped; `LinkItem` is reserved for the CrossReferences branch, which is out of scope for
 *   the Markers checklist).
 * - `{type: 'note' | 'figure' | ...}` → SKIPPED entirely (no items emitted).
 *
 * Char-node content is assumed flat (string children only) per the USJ shape we see in practice —
 * nested chars within a char are not expected; if encountered, the nested string content is still
 * flattened into the surrounding `characterStyle` TextItem.
 */
function extractItems(content: MarkerContent[]): ChecklistContentItem[] {
  const items: ChecklistContentItem[] = [];
  content.forEach((node) => {
    if (typeof node === 'string') {
      items.push({ type: 'text', text: node, characterStyle: undefined });
      return;
    }
    if (!isMarkerObject(node)) return;

    if (node.type === 'verse') {
      items.push({ type: 'verse', verseNumber: node.number ?? '' });
      return;
    }

    if (node.type === 'char') {
      const charText = (node.content ?? [])
        .filter((c): c is string => typeof c === 'string')
        .join('');
      // Don't emit an empty TextItem if the char node has no string content (e.g. a self-closing
      // char with only nested non-string children — unusual but defensive).
      if (charText.length > 0) {
        items.push({ type: 'text', text: charText, characterStyle: node.marker });
      }
    }

    // `note`, `figure`, and any other inline marker types are NOT part of the cell's checklist
    // content — skip them entirely.
  });
  return items;
}

/**
 * Walks a paragraph's content for verse markers and returns the updated verseRef. Used both for
 * emitted paragraphs (advance state for the next paragraph) and for filtered-out paragraphs (so a
 * `markerFilter`-excluded paragraph still contributes its verse advances to following paragraphs'
 * inherited state).
 */
function advanceVerseRefAcrossContent(
  content: MarkerContent[],
  start: SerializedVerseRef,
): SerializedVerseRef {
  return content.reduce<SerializedVerseRef>((vr, node) => {
    if (typeof node === 'string') return vr;
    if (!isMarkerObject(node)) return vr;
    if (node.type !== 'verse') return vr;
    return { ...vr, verseNum: parseInt(node.number ?? '0', 10) };
  }, start);
}
