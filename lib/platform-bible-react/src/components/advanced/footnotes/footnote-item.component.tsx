import React from 'react';
import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { FootnoteItemProps } from './footnotes.types';

function renderContent(
  parentMarker: string | undefined,
  content?: MarkerContent[],
  showMarkers = true,
  allowUnmarkedText = true,
  markerHierarchy: string[] = [],
): React.ReactNode {
  if (!content || content.length === 0) return undefined;

  return content.map((footnotePart) => {
    // Build a key based on the hierarchy and marker/text
    let key = markerHierarchy.join('-');
    if (typeof footnotePart === 'string') {
      key += `-${footnotePart.slice(0, 10)}`; // first few chars of text
      if (allowUnmarkedText) {
        return <span key={key}>{footnotePart}</span>;
      }
      return (
        <span
          key={key}
          className="tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive"
        >
          <AlertCircle className="tw-h-4 tw-w-4 tw-fill-destructive" />
          <span>{footnotePart}</span>
          <AlertCircle className="tw-h-4 tw-w-4 tw-fill-destructive" />
        </span>
      );
    }

    // For MarkerObjects, include marker in the key and pass updated hierarchy
    key += `-${footnotePart.marker ?? 'unknown'}`;
    return renderMarkerObject(footnotePart, key, showMarkers, [
      ...markerHierarchy,
      parentMarker ?? 'unknown',
    ]);
  });
}

function renderMarkerObject(
  markerObj: MarkerObject,
  key: React.Key,
  showMarkers: boolean,
  markerHierarchy: string[] = [],
): React.ReactNode {
  const { marker } = markerObj;
  const classes = cn(marker && `usfm_${marker}`);

  return (
    <span key={key} className={classes}>
      {marker ? (
        showMarkers && <span className="tw-text-muted-foreground">{`\\${marker} `}</span>
      ) : (
        <AlertCircle
          className="tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4"
          aria-label="Missing marker"
        />
      )}
      {renderContent(marker, markerObj.content, showMarkers, true, [
        ...markerHierarchy,
        marker ?? 'unknown',
      ])}
    </span>
  );
}

/** `FootnoteItem` is a component that provides a read-only display of a single USFM/JSX footnote. */
export function FootnoteItem({
  className,
  footnote,
  formatCaller,
  showMarkers = true,
  useUsfmFallbackStyles = true,
}: FootnoteItemProps) {
  const caller = formatCaller ? formatCaller(footnote.caller) : footnote.caller;
  const isFormatted = caller !== footnote.caller;

  return (
    <>
      {useUsfmFallbackStyles && (
        <style>
          {`
            .usfm_fr { font-weight: bold; }
            .usfm_xo { font-weight: bold; }
            .usfm_fq { font-style: italic; }
            .usfm_fqa { font-style: italic; }
            .usfm_fv { vertical-align: super; font-size: smaller; }
            .footnote-caller.formatted {
              color: darkblue;
              vertical-align: super;
              font-size: smaller;
            }
          `}
        </style>
      )}
      <p
        className={cn('footnote-item tw-text-sm', className)}
        data-type={footnote.type}
        data-marker={footnote.marker}
      >
        {showMarkers && <span className="tw-text-muted-foreground">{`\\${footnote.marker} `}</span>}

        {caller && (
          // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
          // specific class name in case styling is needed.
          <span
            className={cn('footnote-caller tw-text-xs tw-font-medium', { formatted: isFormatted })}
          >
            {caller}{' '}
          </span>
        )}

        {renderContent(footnote.marker, footnote.content, showMarkers, false)}

        {showMarkers && (
          <span className="tw-text-muted-foreground">{` \\${footnote.marker}*`}</span>
        )}
      </p>
    </>
  );
}

export default FootnoteItem;
