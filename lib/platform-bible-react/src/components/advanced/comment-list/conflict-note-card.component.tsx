import { Button } from '@/components/shadcn-ui/button';
import { Label } from '@/components/shadcn-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { cn } from '@/utils/shadcn-ui/utils';
import { sanitizeHtml } from 'platform-bible-utils';
import { useId, useMemo, useState } from 'react';
import {
  ConflictNoteCardProps,
  ConflictResolution,
  ConflictResolutionOutcome,
} from './conflict-note-card.types';

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

/** Renders already-sanitized PT9 diff HTML with the shared diff coloring. */
function DiffHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(DIFF_HTML_CLASSES, className)}
      // The content is PT9 HTML; sanitized by the caller before injecting.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Presentational card body for a verseText merge conflict. Presents the resolution as a
 * direct-manipulation radio group — "Keep the current text" (accept, preselected), "Use the other
 * change" (reject), and, when the two edits are independent, "Combine both changes" (merge) — each
 * showing its inline red/green diff, plus a Save-and-Resolve button. Handles the stale state
 * (accept stays enabled and selected; reject is disabled and carries a read-only explanation) and
 * the already-resolved read-only state (the chosen outcome's text plus a derived outcome line).
 * Falls back to rendering the raw note contents for any non-verseText conflict.
 */
export function ConflictNoteCard({
  comment,
  localizedStrings,
  selectedResolution,
  onResolutionChange,
  availableActions = 'acceptOrReject',
  resolvedResolution,
  onResolve,
  isResolving = false,
}: ConflictNoteCardProps) {
  const [internalResolution, setInternalResolution] = useState<ConflictResolution>('accept');
  const resolution = selectedResolution ?? internalResolution;
  // Stable id linking the disabled accept option to its visually-hidden explanation via
  // aria-describedby, so screen readers announce why the choice is read-only (the visual Tooltip is
  // pointer-only and never reaches assistive tech).
  const staleNoticeId = useId();
  // Prefix for the per-option radio/label id pairs (Label htmlFor -> RadioGroupItem id).
  const optionIdPrefix = useId();

  // The verse was edited after the merge (stale): the choice is read-only and forced to accept.
  const isStale = availableActions === 'accept';
  // Already resolved (or no permission): show the read-only outcome rather than the radios.
  const isReadOnly = availableActions === 'none';
  // The two edits are independent, so combining them is offered as a third option.
  const showMerge = availableActions === 'acceptRejectOrMerge';

  // When reject is unavailable (stale verse) force the visible selection to 'accept' so the radio
  // group can never display a choice the disabled state would refuse.
  const effectiveResolution: ConflictResolution = isStale ? 'accept' : resolution;

  const sanitizedRejected = useMemo(
    () => trimDiffSpanWhitespace(sanitizeHtml(comment.rejectedText ?? '')),
    [comment.rejectedText],
  );
  const sanitizedAccepted = useMemo(
    () => trimDiffSpanWhitespace(sanitizeHtml(comment.acceptedText ?? '')),
    [comment.acceptedText],
  );
  const sanitizedMerged = useMemo(
    () => trimDiffSpanWhitespace(sanitizeHtml(comment.mergedText ?? '')),
    [comment.mergedText],
  );
  const sanitizedContents = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);

  const isVerseTextConflict = comment.conflictType === VERSE_TEXT_CONFLICT && !!comment.resultText;

  if (!isVerseTextConflict) {
    return <DiffHtml html={sanitizedContents} />;
  }

  const handleChange = (value: string) => {
    // RadioGroup only emits our known option values; narrow without a type assertion.
    const next: ConflictResolution = value === 'reject' || value === 'merge' ? value : 'accept';
    setInternalResolution(next);
    onResolutionChange?.(next);
  };

  // Shared between the visible Tooltip and the visually-hidden aria-describedby target so both
  // surfaces always announce the same reason.
  const staleNotice =
    localizedStrings['%conflict_note_stale_notice%'] ??
    'The verse has been edited since this conflict was recorded, so rejecting is no longer available. Accept keeps the current text.';

  // The resolution options offered, each with its inline diff. Merge is only offered when the two
  // edits are independent.
  const radioOptions: { value: ConflictResolution; label: string; html: string }[] = [
    {
      value: 'accept',
      label: localizedStrings['%conflict_note_option_keep_current%'] ?? 'Keep the current text',
      html: sanitizedAccepted,
    },
    {
      value: 'reject',
      label: localizedStrings['%conflict_note_option_use_other%'] ?? 'Use the other change',
      html: sanitizedRejected,
    },
  ];
  if (showMerge) {
    radioOptions.push({
      value: 'merge',
      label: localizedStrings['%conflict_note_option_combine%'] ?? 'Combine both changes',
      html: sanitizedMerged,
    });
  }

  // For an already-resolved conflict shown read-only (availableActions === 'none'), collapse to the
  // outcome that was actually applied plus a derived outcome line. Defaults to 'accept' (keep the
  // current text, no outcome line) when the resolution is unknown.
  const renderResolvedOutcome = () => {
    const outcome: ConflictResolutionOutcome = resolvedResolution ?? 'accept';
    if (outcome === 'merged') {
      return (
        <div className="tw:flex tw:flex-col tw:gap-1">
          <DiffHtml html={sanitizedMerged} />
          <p className="tw:text-muted-foreground">
            {localizedStrings['%conflict_note_outcome_combined%'] ?? 'Combined both changes.'}
          </p>
        </div>
      );
    }
    if (outcome === 'reject') {
      return (
        <div className="tw:flex tw:flex-col tw:gap-1">
          <p className="tw:whitespace-pre-wrap tw:text-foreground">{comment.rejectedResultText}</p>
          <p className="tw:text-muted-foreground">
            {localizedStrings['%conflict_note_outcome_used_other%'] ??
              'Used the other change instead of the current text.'}
          </p>
        </div>
      );
    }
    return (
      <div className="tw:flex tw:flex-col tw:gap-1">
        <p className="tw:whitespace-pre-wrap tw:text-foreground">{comment.resultText}</p>
      </div>
    );
  };

  return (
    <div className="tw:flex tw:flex-col tw:gap-3 tw:text-sm">
      <p>
        {localizedStrings['%conflict_note_description_verseText%'] ??
          'Conflicting changes were made to the verse text.'}
      </p>

      {isReadOnly ? (
        renderResolvedOutcome()
      ) : (
        <>
          <p>
            {localizedStrings['%conflict_note_choose_prompt%'] ?? 'Select which change to keep:'}
          </p>

          {/* The whole group is disabled while resolving. When stale, accept stays enabled
              (it's the only still-valid resolution) and only the reject option below is
              individually disabled. */}
          <RadioGroup
            value={effectiveResolution}
            onValueChange={handleChange}
            disabled={isResolving}
          >
            {radioOptions.map((option) => {
              const isSelected = effectiveResolution === option.value;
              const optionId = `${optionIdPrefix}-${option.value}`;
              // Stale forces accept and disables reject (accepting the post-merge edit is the only
              // valid choice); the reject option carries the explanation of why it's unavailable.
              const isStaleReject = isStale && option.value === 'reject';
              const radio = (
                <RadioGroupItem
                  id={optionId}
                  value={option.value}
                  disabled={isStaleReject}
                  aria-describedby={isStaleReject ? staleNoticeId : undefined}
                />
              );
              return (
                <div
                  key={option.value}
                  data-slot="conflict-resolution-option"
                  data-value={option.value}
                  // The selected option is visually boxed to reinforce the direct-manipulation choice.
                  className={cn(
                    'tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:p-2',
                    isSelected && 'tw:border tw:border-border',
                  )}
                >
                  {isStaleReject ? (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {/* span wrapper so the tooltip still receives pointer events over the
                              disabled radio */}
                          <span className="tw:flex tw:items-center tw:gap-2">
                            {radio}
                            <Label htmlFor={optionId}>{option.label}</Label>
                            {/* aria-describedby links the option to this visually-hidden notice so
                                assistive tech announces why the choice is read-only. */}
                            <span id={staleNoticeId} className="tw:sr-only">
                              {staleNotice}
                            </span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="right">{staleNotice}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div className="tw:flex tw:items-center tw:gap-2">
                      {radio}
                      <Label htmlFor={optionId}>{option.label}</Label>
                    </div>
                  )}
                  <DiffHtml html={option.html} className="tw:ps-6" />
                </div>
              );
            })}
          </RadioGroup>

          {/* Not offered in the stale (read-only) state. Stays mounted while actionable so the
              selection never shifts the layout. */}
          {!isStale && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* span wrapper so the tooltip still receives pointer events when the button is
                      disabled */}
                  <span className="tw:inline-flex tw:self-start">
                    <Button
                      size="sm"
                      disabled={isResolving || effectiveResolution === 'accept'}
                      onClick={() => onResolve?.(effectiveResolution)}
                    >
                      {localizedStrings['%conflict_note_save_and_resolve%'] ?? 'Save and Resolve'}
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {localizedStrings['%conflict_note_save_disabled_tooltip%'] ??
                    "This can't be undone."}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      )}
    </div>
  );
}

export default ConflictNoteCard;
