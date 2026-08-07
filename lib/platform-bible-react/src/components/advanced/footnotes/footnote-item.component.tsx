import React from 'react';
import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui/utils';
import { FootnoteItemProps } from './footnotes.types';

/**
 * PT9 separates a marker from the text it introduces with a no-break space (`Standard.xslt`'s
 * `openmarker`), so a wrapping row never strands a marker at the end of a line. It is rendered
 * INSIDE the `.marker` span - unlike PT9, which emits it as a sibling - so that everything a caret
 * offset must skip as marker chrome is reachable from one selector (see `isMarkerText` in
 * `footnote-caret.utils.ts`).
 */
const MARKER_SEPARATOR = '\u00a0';

/** Placeholder PT9 renders for an empty note so its line keeps height and stays clickable. */
const ZERO_WIDTH_NO_BREAK_SPACE = '\ufeff';

/**
 * USJ carries `closed: 'false'` on character runs that the source did not explicitly close
 * (mirroring USX's `closed` attribute), but `MarkerObject` does not declare the property. PT9 shows
 * a run's closing marker only when the run is closed (`Standard.xslt`'s `closemarker`).
 */
function isRunClosed(markerObj: MarkerObject): boolean {
  // Narrow read of a property USJ produces but the published MarkerObject type omits
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (markerObj as MarkerObject & { closed?: string }).closed !== 'false';
}

function renderParagraphs(
  parentMarker: string | undefined,
  content?: MarkerContent[],
  showMarkers = true,
  footnoteClosing: React.ReactNode | undefined = undefined,
  leadingContent: React.ReactNode | undefined = undefined,
): React.ReactNode {
  const paragraphs: MarkerContent[][] = [];
  let current: MarkerContent[] = [];

  (content ?? []).forEach((part) => {
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

  // PT9 renders an empty note as a zero-width no-break space so the line keeps its height and
  // stays a click target (`StandardNotes.xslt`). Keep one paragraph so the category and the
  // closing marker still have somewhere to go.
  const hasBodyContent = paragraphs.length > 0;
  if (!hasBodyContent) paragraphs.push([]);

  return paragraphs.map((para, i) => {
    const isFirst = i === 0;
    const isLast = i === paragraphs.length - 1;
    return (
      // PT9 wraps note text in `span.notetext`, whose `unicode-bidi: embed` keeps mixed-direction
      // runs ordered as the note author wrote them. The class must sit on the element that
      // directly contains the inline runs - `unicode-bidi` does not inherit.
      //
      // The index is the key here (and for the runs inside, see `renderContent`) because no
      // content-derived key can be unique: a note may hold several runs with the same marker AND
      // the same text (two `\fqa` runs, say), and paragraphs split from those runs inherit the
      // collision. The rule guards against reordering corrupting state, which cannot happen here -
      // these paragraphs are a pure projection of an immutable USJ node, always in source order,
      // and they hold no state of their own.
      // eslint-disable-next-line react/no-array-index-key
      <p className="notetext" key={`${parentMarker ?? 'note'}-p${i}`}>
        {isFirst && !hasBodyContent && ZERO_WIDTH_NO_BREAK_SPACE}
        {isFirst && leadingContent}
        {renderContent(parentMarker, para, showMarkers)}
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
  isNestedContent = false,
): React.ReactNode {
  if (!content || content.length === 0) return undefined;

  return content.map((footnotePart, index) => {
    // Keys are the sibling index, not the run's marker or text: a note may hold several runs with
    // the same marker AND the same text (e.g. two `\fqa` runs), which any content-derived key
    // collides on. Content is rendered in source order and never reordered, so the index is stable.
    const key = `${parentMarker ?? 'note'}-${index}`;
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

    return renderMarkerObject(footnotePart, key, showMarkers, isNestedContent);
  });
}

/*
 * KNOWN GAP - TODO(PT-4322): marker attributes are dropped. A run's attributes (`\xt
 * |link-href="..."`, `\w |lemma="..."`) never reach the DOM, so the row shows the run's text with
 * no sign they exist; PT9 renders them in a `span.attribute` between the content and the closing
 * marker (`Base.xslt`'s `processAttributes`). Do NOT hand-roll the `|key="value"` list here - which
 * properties are attributes, which belong on the opening marker, which are dropped, and when the
 * `|value` default-attribute shorthand applies are all already resolved by
 * `UsjReaderWriter.closingMarkerToUsfm` in platform-bible-utils. PT-4322 extracts that as a
 * reusable helper; see the ticket for the caret-offset question this raises.
 */
function renderMarkerObject(
  markerObj: MarkerObject,
  key: React.Key,
  showMarkers: boolean,
  isNested = false,
): React.ReactNode {
  const { marker } = markerObj;
  // PT9 prefixes a character marker nested inside another character marker with `+`
  // (`Standard.xslt`'s `openmarkernospace`), matching how USFM 3.0 writes nested runs.
  const markerName = `${isNested ? '+' : ''}${marker}`;

  return (
    <span key={key}>
      {marker ? (
        showMarkers && <span className="marker">{`\\${markerName}${MARKER_SEPARATOR}`}</span>
      ) : (
        <AlertCircle
          className="tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4"
          aria-label="Missing marker"
        />
      )}
      {renderContent(marker, markerObj.content, showMarkers, true, true)}
      {marker && showMarkers && isRunClosed(markerObj) && (
        <span className="marker">{`\\${markerName}*`}</span>
      )}
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

  const footnoteOpening = showMarkers ? (
    <span className="marker">{`\\${footnote.marker}${MARKER_SEPARATOR}`}</span>
  ) : undefined;

  const footnoteClosing = showMarkers ? (
    <span className="marker">{`\\${footnote.marker}*`}</span>
  ) : undefined;

  // PT9 renders a study-Bible note's category at the head of the note text as its own marked-up
  // run (`StandardNotes.xslt`), and shows it in its formatted pane too - there as raw `\cat …\cat*`
  // text. Only the standard pane's marked-up representation is ported; it is used in both modes.
  const footnoteCategory = footnote.category ? (
    <>
      <span className="marker">{`\\cat${MARKER_SEPARATOR}`}</span>
      {footnote.category}
      <span className="marker">\cat*</span>
    </>
  ) : undefined;

  const footnoteCaller = caller && (
    // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
    // specific class name in case styling is needed.
    <span className={cn('note-caller tw:inline-block', { formatted: isCallerFormatted })}>
      {caller}
      {MARKER_SEPARATOR}
    </span>
  );

  const layoutClass = layout === 'horizontal' ? 'horizontal' : 'vertical';
  const markerClass = showMarkers ? 'marker-visible' : '';
  const footnoteBodyClass =
    layout === 'horizontal' ? 'tw:col-span-1' : 'tw:col-span-2 tw:col-start-1 tw:row-start-2';
  const baseClasses = cn(layoutClass, markerClass);

  return (
    <>
      {/* PT9's `div.leadingFloat`: the note's own marker and caller, and nothing else. Everything
          past the caller - including a leading `\fr`/`\xo` target reference - stays in the note
          text, so the line reads as one continuous USFM run the way PT9's notes pane renders it. */}
      <div className={cn('textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap', baseClasses)}>
        {footnoteOpening}
        {footnoteCaller}
      </div>
      <div
        className={cn(
          'textual-note-body tw:flex tw:flex-col tw:gap-1',
          footnoteBodyClass,
          baseClasses,
        )}
      >
        {renderParagraphs(
          footnote.marker,
          footnote.content,
          showMarkers,
          footnoteClosing,
          footnoteCategory,
        )}
      </div>
    </>
  );
}

export default FootnoteItem;
