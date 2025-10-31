import React from 'react';
import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { FootnoteItemProps } from './footnotes.types';

function makeKey(parentMarker: string | undefined, content?: MarkerContent[]): string {
  if (!content || content.length === 0) return parentMarker ?? 'empty';

  const firstString = content.find((part) => typeof part === 'string');
  if (firstString) {
    return `key-${parentMarker ?? 'unknown'}-${firstString.slice(0, 10)}`;
  }

  // Fallback: combine markers
  const firstMarker =
    typeof content[0] === 'string' ? 'impossible' : (content[0].marker ?? 'unknown');
  return `key-${parentMarker ?? 'unknown'}-${firstMarker}`;
}

function renderParagraphs(
  parentMarker: string | undefined,
  content?: MarkerContent[],
  showMarkers = true,
  footnoteClosing: React.ReactNode | undefined = undefined,
): React.ReactNode {
  if (!content || content.length === 0) return undefined;

  const markerHierarchy: string[] = [];

  const paragraphs: MarkerContent[][] = [];
  let current: MarkerContent[] = [];

  content.forEach((part) => {
    if (typeof part !== 'string' && part.marker === 'fp') {
      // End current paragraph before starting new one
      if (current.length > 0) paragraphs.push(current);

      // Start new paragraph that *includes* the fp marker itself
      current = [part];
    } else {
      current.push(part);
    }
  });

  if (current.length > 0) paragraphs.push(current);

  return paragraphs.map((para, i) => {
    const isLast = i === paragraphs.length - 1;
    return (
      <p key={makeKey(parentMarker, para)} className="tw-mb-2">
        {renderContent(parentMarker, para, showMarkers, true, markerHierarchy)}
        {isLast && footnoteClosing}
      </p>
    );
  });
}

function renderContent(
  parentMarker: string | undefined,
  content?: MarkerContent[],
  showMarkers = true,
  allowUnmarkedText = true,
  markerHierarchy: string[] = [],
): React.ReactNode {
  if (!content || content.length === 0) return undefined;

  return content.map((footnotePart) => {
    if (typeof footnotePart === 'string') {
      // Build a key based on the hierarchy and text
      const key = `${parentMarker}-text-${footnotePart.slice(0, 10)}`;
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

    return renderMarkerObject(
      footnotePart,
      makeKey(`${parentMarker}\\${footnotePart.marker}`, [footnotePart]),
      showMarkers,
      [...markerHierarchy, parentMarker ?? 'unknown'],
    );
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
        showMarkers && <span className="marker">{`\\${marker} `}</span>
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
    <span className="marker">{`\\${footnote.marker} `}</span>
  ) : undefined;

  const footnoteClosing = showMarkers ? (
    <span className="marker">{` \\${footnote.marker}*`}</span>
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

  const layoutClass = layout === 'horizontal' ? 'horizontal tw-table-cell' : 'vertical';
  const markerClass = showMarkers ? 'marker-visible' : '';
  const baseClasses = cn(layoutClass, markerClass);

  return (
    <>
      <div className={cn('textual-note-header tw-text-nowrap tw-pr-2', baseClasses)}>
        {footnoteOpening}
        {header}
      </div>
      <div className={cn('textual-note-body tw-pr-0.5', baseClasses)}>
        {remainingContent && remainingContent.length > 0 && (
          <>{renderParagraphs(footnote.marker, remainingContent, showMarkers, footnoteClosing)}</>
        )}
      </div>
    </>
  );
}

export default FootnoteItem;
