import { memo, ReactNode, useMemo } from 'react';
import { extractGuardedMarkers, getIsMarkerLost } from './structure-protection.util';
import { splitUsfmForMarkerDisplay, UsfmDisplaySegment } from './usfm-tokens.util';

type MatchedUsfmTextProps = {
  /** The USFM of the match, which holds at least one marker */
  matchedUsfm: string;
  /**
   * Renders each piece of text between markers. Defaults to showing it as it is. Pass a stable
   * function, or every render of the parent renders every marker again.
   */
  renderText?: (text: string) => ReactNode;
  /**
   * Stops after about this many characters, text and markers counted alike, and ends with `…`.
   * Shows the whole match when `undefined`. For a view that cannot show more than this anyway, such
   * as one truncated line, so that a long match does not render thousands of hidden markers.
   */
  maxCharacters?: number;
} & (
  | { replacementUsfm?: undefined; deletedMarkerLabel?: undefined }
  | {
      /**
       * What Replace would write in place of the match. Each marker it does not put back is marked
       * as deleted; the others are shown as kept.
       */
      replacementUsfm: string;
      /** Read after each deleted marker, so a screen reader hears what the marking shows */
      deletedMarkerLabel: string;
    }
);

/** Marker chips as kept markers and plain results show them. */
const MARKER_CLASS_NAME =
  'tw:rounded tw:bg-muted tw:px-0.5 tw:font-mono tw:text-xs tw:text-muted-foreground';
/** Marker chips for markers the replacement deletes, struck through so color is not the only cue. */
const DELETED_MARKER_CLASS_NAME =
  'tw:rounded tw:bg-destructive/10 tw:px-0.5 tw:font-mono tw:text-xs tw:text-destructive tw:line-through tw:dark:bg-destructive/20';

/**
 * For each segment, whether it is a marker that `replacementUsfm` does not put back, decided by
 * {@link getIsMarkerLost}, the rule the marker check uses.
 */
function findDeletedMarkerSegments(
  segments: UsfmDisplaySegment[],
  replacementUsfm: string,
): boolean[] {
  // A marker segment holds exactly one marker, with its verse number or milestone closer. Exactly
  // one entry per marker segment keeps `isLost` lined up with the segments below.
  const markers = segments
    .filter((segment) => segment.isMarker)
    .map((segment) => extractGuardedMarkers(segment.text)[0] ?? segment.text);
  const isLost = getIsMarkerLost(markers, replacementUsfm);
  let markerIndex = 0;
  return segments.map((segment) => {
    if (!segment.isMarker) return false;
    const isDeleted = isLost[markerIndex];
    markerIndex += 1;
    return isDeleted;
  });
}

/**
 * The segments to show: all of them, or those that fit in `maxCharacters`, with whether any were
 * left out. A text segment that crosses the limit is shown whole, since it is one text node however
 * long it is; cutting it would also risk splitting a character.
 */
function selectShownSegments(
  segments: UsfmDisplaySegment[],
  maxCharacters: number | undefined,
): { shownSegments: UsfmDisplaySegment[]; isCut: boolean } {
  if (maxCharacters === undefined) return { shownSegments: segments, isCut: false };
  let characterCount = 0;
  const cutIndex = segments.findIndex((segment) => {
    if (characterCount >= maxCharacters) return true;
    characterCount += segment.text.length;
    return false;
  });
  if (cutIndex < 0) return { shownSegments: segments, isCut: false };
  return { shownSegments: segments.slice(0, cutIndex), isCut: true };
}

/**
 * Shows a match with the markers it includes, so the user can see what Replace would delete. Each
 * marker is a small chip in the flow of the text. Given the replacement, it marks the chips of the
 * markers the replacement deletes.
 *
 * Markers are always left-to-right, whatever direction the Scripture text around them runs.
 *
 * Renders again only when its props change: a match can hold thousands of markers.
 */
export const MatchedUsfmText = memo(function MatchedUsfmText({
  matchedUsfm,
  renderText,
  maxCharacters,
  replacementUsfm,
  deletedMarkerLabel,
}: MatchedUsfmTextProps) {
  const { shownSegments, isCut } = useMemo(
    () => selectShownSegments(splitUsfmForMarkerDisplay(matchedUsfm), maxCharacters),
    [matchedUsfm, maxCharacters],
  );
  const deletedSegments = useMemo(
    () =>
      replacementUsfm === undefined
        ? undefined
        : findDeletedMarkerSegments(shownSegments, replacementUsfm),
    [replacementUsfm, shownSegments],
  );
  return (
    <>
      {shownSegments.map((segment, index) => {
        if (!segment.isMarker)
          return (
            // The segments of a given span never change order, so the index is a stable key, and
            // a key built from offsets would add work for no benefit
            // eslint-disable-next-line react/no-array-index-key
            <span key={index}>{renderText ? renderText(segment.text) : segment.text}</span>
          );
        if (deletedSegments?.[index])
          return (
            // Index key for the same reason as above
            // eslint-disable-next-line react/no-array-index-key
            <del key={index} dir="ltr" data-usfm-marker className={DELETED_MARKER_CLASS_NAME}>
              {segment.text}
              <span className="tw:sr-only"> {deletedMarkerLabel}</span>
            </del>
          );
        return (
          // Index key for the same reason as above
          // eslint-disable-next-line react/no-array-index-key
          <span key={index} dir="ltr" data-usfm-marker className={MARKER_CLASS_NAME}>
            {segment.text}
          </span>
        );
      })}
      {isCut && '…'}
    </>
  );
});
