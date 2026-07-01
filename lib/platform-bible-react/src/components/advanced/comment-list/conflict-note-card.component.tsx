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
import { useMemo, useState } from 'react';
import { ConflictNoteCardProps, ConflictResolution } from './conflict-note-card.types';

const VERSE_TEXT_CONFLICT = 'verseText';

// Mirrors CommentItem's content div so conflict diff HTML renders identically, plus theme-token
// coloring for the PT9 diff markup: <u> = inserted/newer, <s> = deleted/older. No hardcoded colors.
const DIFF_HTML_CLASSES = cn(
  'tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground',
  'tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground',
  'tw:prose-quoteless',
  'tw:[&_u]:font-medium tw:[&_u]:text-primary tw:[&_u]:no-underline',
  'tw:[&_s]:text-muted-foreground',
);

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

  const sanitizedRejected = useMemo(
    () => sanitizeHtml(comment.rejectedText ?? ''),
    [comment.rejectedText],
  );
  const sanitizedAccepted = useMemo(
    () => sanitizeHtml(comment.acceptedText ?? ''),
    [comment.acceptedText],
  );
  const sanitizedContents = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);

  const isVerseTextConflict =
    comment.conflictType === VERSE_TEXT_CONFLICT &&
    !!comment.rejectedText &&
    !!comment.acceptedText;

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

  const handleChange = (value: string) => {
    const next: ConflictResolution = value === 'reject' ? 'reject' : 'accept';
    setInternalResolution(next);
    onResolutionChange?.(next);
  };

  const resultText = resolution === 'reject' ? comment.rejectedResultText : comment.resultText;

  return (
    <div className="tw:flex tw:flex-col tw:gap-3 tw:text-sm">
      <p>
        {localizedStrings['%conflict_note_description_verseText%'] ??
          'Conflicting changes were made to the verse text.'}
      </p>

      <div className="tw:flex tw:flex-row tw:items-center tw:gap-2">
        <span>{localizedStrings['%conflict_note_choose_label%'] ?? 'Choose:'}</span>
        <Select value={resolution} onValueChange={handleChange} disabled={!canAcceptReject}>
          <SelectTrigger
            className="tw:w-32"
            aria-label={localizedStrings['%conflict_note_choose_label%'] ?? 'Choose resolution'}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accept">
              {localizedStrings['%conflict_note_accept%'] ?? 'Accept'}
            </SelectItem>
            <SelectItem value="reject">
              {localizedStrings['%conflict_note_reject%'] ?? 'Reject'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:font-medium">
          {localizedStrings['%conflict_note_rejected_label%'] ?? 'Rejected'}
        </span>
        <div
          className={DIFF_HTML_CLASSES}
          // PT9 rejected-side diff HTML; sanitized above before injecting.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizedRejected }}
        />
      </div>

      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:font-medium">
          {localizedStrings['%conflict_note_accepted_label%'] ?? 'Accepted'}
        </span>
        <div
          className={DIFF_HTML_CLASSES}
          // PT9 accepted-side diff HTML; sanitized above before injecting.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizedAccepted }}
        />
      </div>

      <Separator />

      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:font-medium">
          {localizedStrings['%conflict_note_result_label%'] ?? 'Result'}
        </span>
        <p className="tw:whitespace-pre-wrap tw:text-muted-foreground">{resultText}</p>
      </div>
    </div>
  );
}

export default ConflictNoteCard;
