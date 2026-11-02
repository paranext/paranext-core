import { memo, ReactNode, useMemo } from 'react';
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
};

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
 * marker is a small chip in the flow of the text.
 *
 * Markers are always left-to-right, whatever direction the Scripture text around them runs.
 *
 * Renders again only when its props change: a match can hold thousands of markers.
 */
export const MatchedUsfmText = memo(function MatchedUsfmText({
  matchedUsfm,
  renderText,
  maxCharacters,
}: MatchedUsfmTextProps) {
  const { shownSegments, isCut } = useMemo(
    () => selectShownSegments(splitUsfmForMarkerDisplay(matchedUsfm), maxCharacters),
    [matchedUsfm, maxCharacters],
  );
  return (
    <>
      {shownSegments.map((segment, index) => {
        // The segments of a given span never change order, so the index is a stable key
        const key = index;
        return segment.isMarker ? (
          <span
            key={key}
            dir="ltr"
            data-usfm-marker
            className="tw:rounded tw:bg-muted tw:px-0.5 tw:font-mono tw:text-xs tw:text-muted-foreground"
          >
            {segment.text}
          </span>
        ) : (
          <span key={key}>{renderText ? renderText(segment.text) : segment.text}</span>
        );
      })}
      {isCut && '…'}
    </>
  );
});
