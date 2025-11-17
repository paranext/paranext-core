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
export const FootnoteItem = React.forwardRef<HTMLDivElement, FootnoteItemProps>(
  (
    {
      footnote,
      layout = 'horizontal',
      showMarkers = true,
      formatCaller,
      className,
      'aria-selected': ariaSelected,
      'data-marker': dataMarker,
      'data-state': dataState,
      onClick,
    }: FootnoteItemProps,
    ref,
  ) => {
    const caller = formatCaller ? formatCaller(footnote.caller) : footnote.caller;

    const [targetRef, ...remainingContent] =
      Array.isArray(footnote.content) &&
      footnote.content.length > 0 &&
      typeof footnote.content[0] !== 'string' &&
      ['fr', 'xo'].includes(footnote.content[0].marker ?? '')
        ? footnote.content
        : [undefined, ...(footnote.content ?? [])];

    const layoutClass =
      layout === 'horizontal'
        ? 'tw-grid tw-grid-cols-[auto_auto_1fr] tw-gap-x-2'
        : 'tw-flex tw-flex-col';

    return (
      <div
        ref={ref}
        className={cn(layoutClass, className)}
        role="option"
        tabIndex={0}
        aria-selected={ariaSelected}
        data-marker={dataMarker}
        data-state={dataState}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {layout === 'horizontal' ? (
          <>
            {showMarkers && <span className="marker">{`\\${footnote.marker} `}</span>}
            {/* Caller column */}
            <div className="textual-note-header note-caller tw-whitespace-nowrap">{caller}</div>

            {/* Reference column */}
            <div className="textual-note-header tw-whitespace-nowrap">
              {targetRef && renderContent(footnote.marker, [targetRef], showMarkers)}
            </div>
          </>
        ) : (
          <div className="textual-note-header">
            {showMarkers && <span className="marker">{`\\${footnote.marker} `}</span>}
            {caller && <span className="note-caller">{caller} </span>}
            {targetRef && <>{renderContent(footnote.marker, [targetRef], showMarkers)}</>}
          </div>
        )}

        {remainingContent.length > 0 && (
          <div className="textual-note-body">
            {renderParagraphs(
              footnote.marker,
              remainingContent.filter((c): c is MarkerContent => c !== undefined),
              showMarkers,
              showMarkers && <span className="marker">{` \\${footnote.marker}*`}</span>,
            )}
          </div>
        )}
      </div>
    );
  },
);

export default FootnoteItem;
