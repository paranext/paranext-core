import React from 'react';
import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { FootnoteItemProps } from './footnotes.types';

const markerClasses = cn('marker', `marker-visible'}`);

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
        const classes = cn(`usfm_${parentMarker}`);
        return (
          <span key={key} className={classes}>
            {footnotePart}
          </span>
        );
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

  return (
    <span key={key}>
      {marker ? (
        showMarkers && <span className={markerClasses}>{`\\${marker} `}</span>
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
  footnote,
  layout = 'horizontal',
  formatCaller,
  showMarkers = true,
}: FootnoteItemProps) {
  const caller = formatCaller ? formatCaller(footnote.caller) : footnote.caller;
  const isCallerFormatted = caller !== footnote.caller;

  // Split out target reference (first top-level fr/xo, if any)
  let targetRef: MarkerContent | undefined;
  let remainingContent = footnote.content;

  if (
    Array.isArray(footnote.content) &&
    footnote.content.length > 0 &&
    typeof footnote.content[0] !== 'string' &&
    (footnote.content[0].marker === 'fr' || footnote.content[0].marker === 'xo')
  ) {
    [targetRef, ...remainingContent] = footnote.content;
  }

  const footnoteOpening = showMarkers ? (
    <span className={markerClasses}>{`\\${footnote.marker} `}</span>
  ) : undefined;

  const footnoteClosing = showMarkers ? (
    <span className={markerClasses}>{` \\${footnote.marker}*`}</span>
  ) : undefined;

  const header = (
    <>
      {caller && (
        // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
        // specific class name in case styling is needed.
        <span className={cn('note-caller', { formatted: isCallerFormatted })}>{caller} </span>
      )}
      {targetRef && <>{renderContent(footnote.marker, [targetRef], showMarkers, false)} </>}
    </>
  );

  return (
    <>
      <div
        className={cn(
          'textual-note-header tw-text-nowrap',
          layout === 'horizontal' ? 'horizontal tw-table-cell tw-pr-1' : 'vertical',
          // REVIEW: Checking with UX to see if they actually want different padding when markers are shown, as seen in Figma design
          showMarkers ? 'tw-pr-[10px]' : 'tw-pr-[22px]',
        )}
      >
        {footnoteOpening}
        {header}
      </div>
      <div
        className={cn(
          'textual-note-body',
          layout === 'horizontal' ? 'horizontal tw-table-cell' : 'vertical',
        )}
      >
        {remainingContent && remainingContent.length > 0 && (
          <>
            {renderContent(footnote.marker, remainingContent, showMarkers, true)}
            {footnoteClosing}
          </>
        )}
      </div>
    </>
  );
}

export default FootnoteItem;
