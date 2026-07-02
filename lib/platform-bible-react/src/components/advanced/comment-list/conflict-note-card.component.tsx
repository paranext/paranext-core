import { Button } from '@/components/shadcn-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Separator } from '@/components/shadcn-ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { cn } from '@/utils/shadcn-ui/utils';
import { sanitizeHtml } from 'platform-bible-utils';
import { useMemo, useState } from 'react';
import { ConflictNoteCardProps, ConflictResolution } from './conflict-note-card.types';

const VERSE_TEXT_CONFLICT = 'verseText';

// Renders the PT9 diff HTML the same way CommentItem renders note contents, plus theme-token coloring
// for the diff markup: <u> = inserted → green + semibold; <s> = deleted → red + strikethrough. This is
// a green/red text-color treatment (theme tokens only, no hardcoded colors) — NOT a copy of any single
// PT9 diff style: PT9's default (BlueGray) and RedGreen both use background highlights, and RedGreen has
// no strikethrough. The <u>/<s> markup itself comes from PT9's decode; only the coloring is ours (CSS).
const DIFF_HTML_CLASSES = cn(
  'tw:prose tw:max-w-none tw:break-words tw:text-sm tw:font-normal tw:text-foreground',
  'tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground',
  'tw:prose-quoteless',
  'tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline',
  'tw:[&_s]:text-destructive tw:[&_s]:line-through',
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
  availableActions = 'acceptOrReject',
  onResolve,
  isResolving = false,
}: ConflictNoteCardProps) {
  const [internalResolution, setInternalResolution] = useState<ConflictResolution>('accept');
  const resolution = selectedResolution ?? internalResolution;

  // When reject is unavailable (stale verse) force the visible selection to 'accept' so the
  // selector can never display a choice the Resolve button would be refused for.
  const effectiveResolution: ConflictResolution =
    availableActions === 'accept' ? 'accept' : resolution;

  const sanitizedRejected = useMemo(
    () => trimDiffSpanWhitespace(sanitizeHtml(comment.rejectedText ?? '')),
    [comment.rejectedText],
  );
  const sanitizedAccepted = useMemo(
    () => trimDiffSpanWhitespace(sanitizeHtml(comment.acceptedText ?? '')),
    [comment.acceptedText],
  );
  const sanitizedContents = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);

  const isVerseTextConflict = comment.conflictType === VERSE_TEXT_CONFLICT && !!comment.resultText;

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

  const resultText =
    effectiveResolution === 'reject' ? comment.rejectedResultText : comment.resultText;

  return (
    <div className="tw:flex tw:flex-col tw:gap-3 tw:text-sm">
      <p>
        {localizedStrings['%conflict_note_description_verseText%'] ??
          'Conflicting changes were made to the verse text.'}
      </p>

      {availableActions !== 'none' && (
        <div className="tw:flex tw:flex-row tw:items-center tw:gap-2">
          <span>{localizedStrings['%conflict_note_choose_label%'] ?? 'Choose:'}</span>
          <Select value={effectiveResolution} onValueChange={handleChange} disabled={isResolving}>
            <SelectTrigger
              className="tw:w-32"
              aria-label={
                localizedStrings['%conflict_note_choose_aria_label%'] ?? 'Choose resolution'
              }
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accept">
                {localizedStrings['%conflict_note_accept%'] ?? 'Accept'}
              </SelectItem>
              {availableActions === 'accept' ? (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* span wrapper so the tooltip still receives pointer events over the
                          disabled item */}
                      <span className="tw:block">
                        <SelectItem value="reject" disabled>
                          {localizedStrings['%conflict_note_reject%'] ?? 'Reject'}
                        </SelectItem>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {localizedStrings['%conflict_note_stale_notice%'] ??
                        'The verse has been edited since this conflict was recorded, so rejecting is no longer available. Accept keeps the current text.'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <SelectItem value="reject">
                  {localizedStrings['%conflict_note_reject%'] ?? 'Reject'}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button size="sm" disabled={isResolving} onClick={() => onResolve?.(effectiveResolution)}>
            {localizedStrings['%conflict_note_resolve%'] ?? 'Resolve'}
          </Button>
        </div>
      )}

      {/* Accepted region first, then Rejected — matches PT9's AppendConflictNoteDetails order
          (winning/current text leads, and Accept is the default resolution). */}
      {!!comment.acceptedText && (
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
      )}

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

      <Separator />

      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:font-medium">
          {localizedStrings['%conflict_note_result_label%'] ?? 'Result'}
        </span>
        <p className="tw:whitespace-pre-wrap tw:text-foreground">{resultText}</p>
      </div>
    </div>
  );
}

export default ConflictNoteCard;
