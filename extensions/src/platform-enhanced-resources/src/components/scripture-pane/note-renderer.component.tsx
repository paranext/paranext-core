import { Card, CardContent } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in this component. Pass into the localization
 * hook in the wiring layer to obtain localized strings, then pass the result via
 * `localizedStringsWithLoadingState`.
 */
export const NOTE_RENDERER_STRING_KEYS = Object.freeze([
  '%enhancedResources_note_callerType_footnote%',
  '%enhancedResources_note_callerType_endnote%',
  '%enhancedResources_note_callerType_crossReference%',
  '%enhancedResources_note_emptyBody%',
  '%enhancedResources_note_references%',
] as const);

type NoteRendererLocalizedStringKey = (typeof NOTE_RENDERER_STRING_KEYS)[number];
type NoteRendererLocalizedStrings = {
  [key in NoteRendererLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Subset of `SerializedVerseRef` used by the note renderer. Mirrors the wire format described in
 * data-contracts.md. Local definition keeps this design-phase component free of PAPI imports.
 */
export type NoteVerseRef = {
  bookNum: number;
  chapterNum: number;
  verseNum: number;
  /** Optional 3-letter book ID (e.g. "GEN"). Display-only. */
  book?: string;
};

/** Note data shape mirroring the `NoteData` DTO defined in data-contracts.md Section 4.15. */
export type NoteData = {
  callerType: 'footnote' | 'endnote' | 'cross-reference';
  callerMarker: string;
  body: string;
  references: NoteVerseRef[];
};

export type NoteRendererProps = {
  /** Structured note data to render. */
  data: NoteData;
  /** Localized strings + loading flag. */
  localizedStringsWithLoadingState?: [NoteRendererLocalizedStrings, boolean];
};

const formatRef = (ref: NoteVerseRef) => {
  const bookLabel = ref.book ?? `Bk${ref.bookNum}`;
  return `${bookLabel} ${ref.chapterNum}:${ref.verseNum}`;
};

/**
 * Pure presentational component that renders a footnote/endnote/cross-reference note for the
 * Enhanced Resource scripture pane. Caller marker is shown in the gutter; body and references
 * follow.
 */
export function NoteRenderer({
  data,
  localizedStringsWithLoadingState = [{}, false],
}: NoteRendererProps) {
  const getLocalizedString = (key: NoteRendererLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const callerTypeLabel = (() => {
    switch (data.callerType) {
      case 'footnote':
        return getLocalizedString('%enhancedResources_note_callerType_footnote%');
      case 'endnote':
        return getLocalizedString('%enhancedResources_note_callerType_endnote%');
      case 'cross-reference':
      default:
        return getLocalizedString('%enhancedResources_note_callerType_crossReference%');
    }
  })();

  const referencesLabel = getLocalizedString('%enhancedResources_note_references%');
  const emptyBodyLabel = getLocalizedString('%enhancedResources_note_emptyBody%');

  return (
    <Card
      role="note"
      className="tw-max-w-md tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-sm"
    >
      <CardContent className="tw-flex tw-flex-col tw-gap-2 tw-p-3 tw-text-sm">
        <div className="tw-flex tw-items-baseline tw-gap-2">
          <span
            aria-hidden
            className="tw-flex tw-h-6 tw-w-6 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-muted tw-font-mono tw-text-xs tw-font-semibold"
          >
            {data.callerMarker}
          </span>
          <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
            {callerTypeLabel}
          </span>
        </div>
        {data.body ? (
          <p className="tw-whitespace-pre-line tw-leading-relaxed">{data.body}</p>
        ) : (
          <p className="tw-italic tw-text-muted-foreground">{emptyBodyLabel}</p>
        )}
        {data.references.length > 0 && (
          <div className="tw-flex tw-flex-col tw-gap-1">
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {referencesLabel}
            </span>
            <ul className="tw-flex tw-flex-wrap tw-gap-2">
              {data.references.map((ref) => (
                <li
                  key={`${ref.bookNum}-${ref.chapterNum}-${ref.verseNum}`}
                  className="tw-rounded tw-bg-muted tw-px-1.5 tw-py-0.5 tw-font-mono tw-text-xs"
                >
                  {formatRef(ref)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default NoteRenderer;
