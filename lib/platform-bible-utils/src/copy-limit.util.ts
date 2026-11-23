import { graphemeSegments } from 'unicode-segmenter/grapheme';

/**
 * Shortens `text` to at most `copyLimit` UTF-16 code units without splitting a grapheme cluster: a
 * character outside the Basic Multilingual Plane, a base letter with its combining marks, or a
 * conjunct. Clusters come from `unicode-segmenter`, as for the rest of this package. The result is
 * the longest start of `text` that fits and ends at a cluster boundary, so it can be shorter than
 * `copyLimit`.
 *
 * Segmentation contract: cuts only at grapheme-cluster boundaries as `unicode-segmenter` finds
 * them, measured in UTF-16 code units, the same contract `EditorOptions.copyLimit` follows, so a
 * copy cut here and one the editor cuts end at the same place.
 *
 * @param text The text to shorten.
 * @param copyLimit The most UTF-16 code units the result may have, or `undefined` for no limit.
 * @returns `text` itself when it fits or there is no limit, otherwise its longest start that fits.
 */
export function truncateToCopyLimit(text: string, copyLimit: number | undefined): string {
  if (copyLimit === undefined || text.length <= copyLimit) return text;
  // Walk the clusters lazily and stop at the first one past the limit, rather than splitting the
  // whole text. `index` and `segment.length` are both in UTF-16 code units, the same index space as
  // `slice`.
  const segments = graphemeSegments(text);
  let next = segments.next();
  while (!next.done) {
    const { index, segment } = next.value;
    if (index + segment.length > copyLimit) return text.slice(0, index);
    next = segments.next();
  }
  return text;
}
