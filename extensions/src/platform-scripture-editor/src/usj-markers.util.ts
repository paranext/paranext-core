import type { MarkerContent, Usj } from '@eten-tech-foundation/scripture-utilities';

/**
 * Collects the distinct markers actually present in a USJ document.
 *
 * The scripture editor warns "Unexpected <kind> marker" for any marker in the USJ it doesn't
 * recognize as a built-in USFM marker. Handbook/commentary resources use extra markers (e.g. `pn`,
 * `jmp`, `xtSee`) that aren't built-ins, so a consumer passes this document-derived set to the
 * editor as `options.nodes.extraValidMarkers` to suppress those warnings — scoped to the resource
 * actually being displayed, never a global list.
 *
 * The editor's `isValidMarker` is additive (a marker is valid if it is built-in OR listed in
 * `extraValidMarkers`), so returning markers that are already built-in valid is a harmless no-op;
 * we therefore don't need the editor's internal built-in list (which it doesn't export) to compute
 * a "delta". `z`-prefixed markers are omitted because the editor already treats every `z...` custom
 * marker as unconditionally valid.
 *
 * @param usj The USJ document being displayed (e.g. the chapter USJ handed to the editor).
 * @returns The distinct non-`z` markers found anywhere in the document, in first-seen order. Empty
 *   when `usj` is undefined or contains no markers, so callers can omit the option (opt-in, no
 *   behavior change) for content that needs nothing extra.
 */
export function collectUsjMarkers(usj: Usj | undefined): string[] {
  const markers: string[] = [];
  const seen = new Set<string>();

  const visit = (content: MarkerContent[] | undefined): void => {
    if (!content) return;
    content.forEach((node) => {
      // String nodes are text runs, not markers.
      if (typeof node === 'string') return;
      const { marker } = node;
      if (marker && !marker.startsWith('z') && !seen.has(marker)) {
        seen.add(marker);
        markers.push(marker);
      }
      visit(node.content);
    });
  };

  visit(usj?.content);
  return markers;
}
