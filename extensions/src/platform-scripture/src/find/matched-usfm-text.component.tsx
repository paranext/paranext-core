import { ReactNode, useMemo } from 'react';
import { splitUsfmForMarkerDisplay } from './usfm-tokens.util';

type MatchedUsfmTextProps = {
  /** The USFM of the match, which holds at least one marker */
  matchedUsfm: string;
  /** Renders each piece of text between markers. Defaults to showing it as it is. */
  renderText?: (text: string) => ReactNode;
};

/**
 * Shows a match with the markers it includes, so the user can see what Replace would delete. Each
 * marker is a small chip in the flow of the text.
 *
 * Markers are always left-to-right, whatever direction the Scripture text around them runs.
 */
export function MatchedUsfmText({ matchedUsfm, renderText }: MatchedUsfmTextProps) {
  const segments = useMemo(() => splitUsfmForMarkerDisplay(matchedUsfm), [matchedUsfm]);
  return (
    <>
      {segments.map((segment, index) => {
        // The segments of a given span never change order, so the index is a stable key
        // eslint-disable-next-line react/no-array-index-key
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
    </>
  );
}
