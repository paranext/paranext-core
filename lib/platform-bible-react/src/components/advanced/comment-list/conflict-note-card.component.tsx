import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Separator } from '@/components/shadcn-ui/separator';
import { cn } from '@/utils/shadcn-ui/utils';
import { sanitizeHtml } from 'platform-bible-utils';
import { useId, useMemo, useState } from 'react';
import { COMMENT_BODY_PROSE_CLASSES } from './comment-list.utils';
import { ConflictNoteCardProps, ConflictResolution } from './conflict-note-card.types';

const VERSE_TEXT_CONFLICT = 'verseText';

// Shares COMMENT_BODY_PROSE_CLASSES with CommentItem so conflict notes render note-body HTML the same
// way, then layers theme-token diff coloring on top: <u> = inserted → green + semibold; <s> = deleted →
// red + strikethrough. Green/red text-color treatment (theme tokens only, no hardcoded colors) — NOT a
// copy of any single PT9 diff style: PT9's default (BlueGray) and RedGreen both use background
// highlights, and RedGreen has no strikethrough. The <u>/<s> markup comes from PT9's decode; only the
// coloring is ours. Deletions use --diff-deleted (a per-scheme text-grade red), not --destructive,
// which is background-grade in the Platform dark theme and fails text contrast there.
const DIFF_HTML_CLASSES = cn(
  COMMENT_BODY_PROSE_CLASSES,
  'tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline',
  'tw:[&_s]:text-diff-deleted tw:[&_s]:line-through',
);

/**
 * Moves a diff span's trailing whitespace outside its closing tag (e.g. `<s>town </s>` →
 * `<s>town</s> `) so the strikethrough/color decoration stops at the word rather than dangling into
 * the inter-word gap. PT9 keeps each word's trailing space inside the diff token
 * (DiffToken.SplitUsfmTokens, FB-38914) and masks it with a background highlight; our text-only
 * decoration would otherwise show a stray strike over the space. Only whitespace is relocated
 * across the closing tag — no text changes. Diff spans hold plain text only, so this is safe.
 */
const trimDiffSpanWhitespace = (html: string) => html.replace(/(\s+)(<\/[us]>)/g, '$2$1');

/**
 * Presentational card body for a verseText merge conflict: an Accept/Reject selector, the Rejected
 * and Accepted diff regions, and a read-only Result preview that tracks the selection. Falls back
 * to rendering the raw note contents for any non-verseText conflict.
 */
export function ConflictNoteCard({
  comment,
  localizedStrings,
  selectedResolution,
  onResolutionChange,
  canAcceptReject = true,
}: ConflictNoteCardProps) {
  const [internalResolution, setInternalResolution] = useState<ConflictResolution>('accept');
  const resolution = selectedResolution ?? internalResolution;
  const resultLabelId = useId();

  const sanitizedRejected = useMemo(
    () => trimDiffSpanWhitespace(sanitizeHtml(comment.rejectedText ?? '')),
    [comment.rejectedText],
  );
  const sanitizedAccepted = useMemo(
    () => trimDiffSpanWhitespace(sanitizeHtml(comment.acceptedText ?? '')),
    [comment.acceptedText],
  );
  const sanitizedContents = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);

  // Gate on conflictType alone to match PT9 (AppendConflictNoteDetails shows the resolution UI for
  // every verseText root, never gating on result-emptiness). Absent fields degrade per-region below;
  // the real accept/reject gating lives in canAcceptReject (the downstream capability query).
  const isVerseTextConflict = comment.conflictType === VERSE_TEXT_CONFLICT;

  if (!isVerseTextConflict) {
    return (
      <div
        className={DIFF_HTML_CLASSES}
        // The content is PT9 HTML; sanitized above before injecting.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sanitizedContents }}
      />
    );
  }

  // Only track internal state when uncontrolled. In controlled mode the parent owns the value, so
  // writing internalResolution would let a choice the parent declined leak back into the UI if it
  // later stops passing selectedResolution.
  const isControlled = selectedResolution !== undefined;
  const handleChange = (value: string) => {
    const next: ConflictResolution = value === 'reject' ? 'reject' : 'accept';
    if (!isControlled) setInternalResolution(next);
    onResolutionChange?.(next);
  };

  const resultText = resolution === 'reject' ? comment.rejectedResultText : comment.resultText;

  return (
    <div className="tw:flex tw:flex-col tw:gap-3 tw:text-sm">
      <p>
        {localizedStrings?.['%conflictNote_description_verseText%'] ??
          'Conflicting changes were made to the verse text.'}
      </p>

      <div className="tw:flex tw:flex-row tw:items-center tw:gap-2">
        <span>{localizedStrings?.['%conflictNote_chooseLabel%'] ?? 'Choose:'}</span>
        <Select value={resolution} onValueChange={handleChange} disabled={!canAcceptReject}>
          <SelectTrigger
            // min-w so the trigger keeps a stable width but still grows for longer localized
            // Accept/Reject values rather than clipping them.
            className="tw:min-w-32"
            aria-label={localizedStrings?.['%conflictNote_chooseAriaLabel%'] ?? 'Choose resolution'}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accept">
              {localizedStrings?.['%conflictNote_accept%'] ?? 'Accept'}
            </SelectItem>
            <SelectItem value="reject">
              {localizedStrings?.['%conflictNote_reject%'] ?? 'Reject'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Accepted region first, then Rejected — matches PT9's AppendConflictNoteDetails order
          (winning/current text leads, and Accept is the default resolution). */}
      {!!comment.acceptedText && (
        <div className="tw:flex tw:flex-col tw:gap-1">
          <span className="tw:font-medium">
            {localizedStrings?.['%conflictNote_acceptedLabel%'] ?? 'Accepted'}
          </span>
          <div
            className={DIFF_HTML_CLASSES}
            // PT9 accepted-side diff HTML; sanitized above before injecting.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: sanitizedAccepted }}
          />
        </div>
      )}

      {/* Gated on rejectedText like the Accepted region above — PT9 prints the reject label only when
          the rejected side is non-null (AppendConflictNoteDetails), so no orphan heading over an
          empty body when the rejected-side diff is blank. */}
      {!!comment.rejectedText && (
        <div className="tw:flex tw:flex-col tw:gap-1">
          <span className="tw:font-medium">
            {localizedStrings?.['%conflictNote_rejectedLabel%'] ?? 'Rejected'}
          </span>
          <div
            className={DIFF_HTML_CLASSES}
            // PT9 rejected-side diff HTML; sanitized above before injecting.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: sanitizedRejected }}
          />
        </div>
      )}

      <Separator />

      <div className="tw:flex tw:flex-col tw:gap-1">
        <span id={resultLabelId} className="tw:font-medium">
          {localizedStrings?.['%conflictNote_resultLabel%'] ?? 'Result'}
        </span>
        {/* aria-live so screen readers announce the Result changing when the user switches
            Accept/Reject; on a stable wrapper (not the swapped <p>) so the update is detected. */}
        <div aria-live="polite" aria-labelledby={resultLabelId}>
          {resultText ? (
            <p className="tw:whitespace-pre-wrap tw:text-foreground">{resultText}</p>
          ) : (
            // The chosen side has no result USFM (e.g. reject deletes the verse). Show a neutral
            // empty-state rather than a blank <p>, which reads as a rendering bug.
            <p className="tw:italic tw:text-muted-foreground">
              {localizedStrings?.['%conflictNote_resultEmpty%'] ?? 'The verse will be empty.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConflictNoteCard;
