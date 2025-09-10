import { MarkerContent, MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteItemProps } from './footnotes.types';
import clsx from 'clsx';

function renderContent(
  content?: MarkerContent[],
  showMarkers = true,
): React.ReactNode {
  if (!content || content.length === 0) return null;
  return content.map((c, i) => {
    if (typeof c === "string") {
      // plain text node — ensure a single leading space before it
      return <span key={i}>{' '}{c}</span>;
    } else {
      return renderMarkerObject(c, `m-${i}`, showMarkers);
    }
  });
}

function renderMarkerObject(
  markerObj: MarkerObject,
  key: React.Key,
  showMarkers: boolean
): React.ReactNode {
  const marker = markerObj.marker;
  const classes = clsx("footnote", marker && `usfm_${marker}`);
  const dataAttrs = {
    "data-marker": marker,
    "data-type": markerObj.type,
    ...(markerObj.sid ? { "data-sid": markerObj.sid } : {}),
    ...(markerObj.number ? { "data-number": markerObj.number } : {}),
  };

  return (
    <span key={key} className={classes} {...(dataAttrs as any)}>
      {showMarkers && (
        <span className="tw-text-muted-foreground">{'\\' + marker + ' '}</span>
      )}
      {renderContent(markerObj.content, showMarkers)}
    </span>
  );
}

export function FootnoteItem({
  className,
  footnote,
  formatCaller,
  showMarkers = true,
}: FootnoteItemProps & { showMarkers?: boolean }) {
  const caller = (formatCaller ? formatCaller(footnote.caller) : footnote.caller);

  return (
    <p
      className={clsx("footnote-item tw-text-sm", className)}
      data-type={footnote.type}
      data-marker={footnote.marker}
    >
      {showMarkers && (
        <span className="tw-text-muted-foreground">{'\\' + footnote.marker + ' '}</span>
      )}

      {caller ? <span className="footnote-caller tw-text-xs tw-font-medium">{caller} </span> : undefined}

      {renderContent(footnote.content, showMarkers)}

      {showMarkers && (
        <span className="tw-text-muted-foreground">{' \\'+ footnote.marker +'*'}</span>
      )}

    </p>
  );
}
