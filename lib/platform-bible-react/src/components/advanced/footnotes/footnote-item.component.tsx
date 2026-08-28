import React from 'react';
import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui/utils';
import { FootnoteItemProps } from './footnotes.types';

// Keys below are POSITIONAL (the child's index within its own siblings), not derived from the
// content. A footnote's parts are frequently indistinguishable by content — two `\fp` paragraphs,
// or two spans sharing a marker and leading text — so a content-derived key collides, and React
// then duplicates or omits children. Position is unique among siblings by construction, which is
// the only uniqueness React requires. These lists are a read-only projection re-rendered wholesale
// from `footnote`, so there is no reordering for a positional key to lose identity across.

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
      // A footnote's paragraphs have no stable id, and keying on their CONTENT is what produced
      // duplicate keys (two `\fp` paragraphs collide). This list is a read-only projection
      // re-rendered wholesale and never reordered, so the identity the rule protects cannot be
      // lost here. See the note above.
      // eslint-disable-next-line react/no-array-index-key
      <p key={`para-${i}`}>
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

  return content.map((footnotePart, partIndex) => {
    const key = `part-${partIndex}`;
    if (typeof footnotePart === 'string') {
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
          className="tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive"
        >
          <AlertCircle className="tw:h-4 tw:w-4 tw:fill-destructive" />
          <span>{footnotePart}</span>
          <AlertCircle className="tw:h-4 tw:w-4 tw:fill-destructive" />
        </span>
      );
    }

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
        showMarkers && <span className="marker">{`\\${marker} `}</span>
      ) : (
        <AlertCircle
          className="tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4"
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
    <span className="marker">{`\\${footnote.marker}`}</span>
  ) : undefined;

  const footnoteClosing = showMarkers ? (
    <span className="marker">{` \\${footnote.marker}*`}</span>
  ) : undefined;

  const footnoteCaller = caller && (
    // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
    // specific class name in case styling is needed.
    <span className={cn('note-caller tw:inline-block', { formatted: isCallerFormatted })}>
      {caller}
    </span>
  );
  // The category is the one part of a footnote that never appears in `content`: it rides in the
  // file as a `\cat` run directly after the caller (`\f + \cat People\cat*\fr 1.1 …`), and the USJ
  // parser folds it onto the note as a field — so nothing renders it unless the note's own field
  // is read. Placed after the caller so the pane reads in the file's order. Given its own class
  // rather than a `usfm_*` one for the same reason the caller has one: `\cat` delimits the value
  // but is not a style for it.
  const footnoteCategory = footnote.category && (
    <span className="note-category tw:inline-block">
      {showMarkers && <span className="marker">{`\\cat `}</span>}
      {footnote.category}
      {showMarkers && <span className="marker">{`\\cat*`}</span>}
    </span>
  );
  const footnoteTargetRef = targetRef && (
    <>{renderContent(footnote.marker, [targetRef], showMarkers, false)} </>
  );

  // The spaces separating the header's parts belong BETWEEN them, not inside them: CSS removes a
  // collapsible space at the end of an inline-block's last line, so a trailing space in the caller
  // or category box is in the DOM and yet invisible, running the two together (`+People`). Keeping
  // them out here also draws them at the header's own size rather than the 0.7em the `.marker`
  // glyphs use, which is what makes `\f + \cat People\cat*` read as separated rather than `\f+`.
  const hasOpening = !!footnoteOpening;
  const hasCaller = !!footnoteCaller;
  const hasCategory = !!footnoteCategory;

  const layoutClass = layout === 'horizontal' ? 'horizontal' : 'vertical';
  const markerClass = showMarkers ? 'marker-visible' : '';
  const footnoteBodyClass =
    layout === 'horizontal' ? 'tw:col-span-1' : 'tw:col-span-2 tw:col-start-1 tw:row-start-2';
  const baseClasses = cn(layoutClass, markerClass);

  return (
    <>
      <div className={cn('textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap', baseClasses)}>
        {footnoteOpening}
        {hasOpening && (hasCaller || hasCategory) && ' '}
        {footnoteCaller}
        {hasCaller && hasCategory && ' '}
        {footnoteCategory}
      </div>
      <div className={cn('textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap', baseClasses)}>
        {footnoteTargetRef}
      </div>
      <div
        className={cn(
          'textual-note-body tw:flex tw:flex-col tw:gap-1',
          footnoteBodyClass,
          baseClasses,
        )}
      >
        {remainingContent && remainingContent.length > 0 && (
          <>{renderParagraphs(footnote.marker, remainingContent, showMarkers, footnoteClosing)}</>
        )}
      </div>
    </>
  );
}

export default FootnoteItem;
