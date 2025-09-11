import React from 'react';
import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';
import { FootnoteItemProps } from './footnotes.types';

function renderContent(
  parentMarker: string | undefined,
  content?: MarkerContent[],
  showMarkers = true,
  allowUnmarkedText = true,
  path: string[] = [],
): React.ReactNode {
  if (!content || content.length === 0) return undefined;

  return content.map((c) => {
    // Build a key based on the hierarchy and marker/text
    let key = path.join('-');
    if (typeof c === 'string') {
      key += `-${c.slice(0, 10)}`; // first few chars of text
      if (allowUnmarkedText) {
        return <span key={key}> {c}</span>;
      }
      return (
        <span
          key={key}
          className="tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive"
        >
          <AlertCircle className="tw-h-4 tw-w-4 tw-fill-destructive" />
          <span>{c}</span>
          <AlertCircle className="tw-h-4 tw-w-4 tw-fill-destructive" />
        </span>
      );
    }

    // For MarkerObjects, include marker in the key and pass updated path
    key += `-${c.marker ?? 'unknown'}`;
    return renderMarkerObject(c, key, showMarkers, [...path, parentMarker ?? 'unknown']);
  });
}

function renderMarkerObject(
  markerObj: MarkerObject,
  key: React.Key,
  showMarkers: boolean,
  path: string[] = [],
): React.ReactNode {
  const { marker } = markerObj;
  const classes = clsx('footnote', marker && `usfm_${marker}`);

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
      {renderContent(marker, markerObj.content, showMarkers, true, [...path, marker ?? 'unknown'])}
    </span>
  );
}

export function FootnoteItem({
  className,
  footnote,
  formatCaller,
  showMarkers = true,
}: FootnoteItemProps & { showMarkers?: boolean }) {
  const caller = formatCaller ? formatCaller(footnote.caller) : footnote.caller;

  return (
    <p
      className={clsx('footnote-item tw-text-sm', className)}
      data-type={footnote.type}
      data-marker={footnote.marker}
    >
      {showMarkers && <span className="tw-text-muted-foreground">{`\\${footnote.marker} `}</span>}

      {caller ? (
        <span className="footnote-caller tw-text-xs tw-font-medium">{caller} </span>
      ) : undefined}

      {renderContent(footnote.marker, footnote.content, showMarkers, false)}

      {showMarkers && <span className="tw-text-muted-foreground">{` \\${footnote.marker}*`}</span>}
    </p>
  );
}
