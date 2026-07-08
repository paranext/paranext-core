import { Button } from '@/components/shadcn-ui/button';
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

/** One selectable resolution option (a clickable card) with its localized label and inline diff. */
type ConflictOption = { value: ConflictResolution; label: string; html: string };

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
 * Presentational card body for a verseText merge conflict. Presents the resolution as a set of
 * clickable option cards — "Keep the current text" (accept, preselected), "Use the other change"
 * (reject), and, when the two edits are independent, "Combine both changes" (merge) — each showing
 * its inline red/green diff. Clicking anywhere on an option card selects it; the cards keep radio
 * semantics (a labelled radio group with role=radio / aria-checked and arrow-key navigation) via a
 * visually-hidden radio inside each card. A Save-and-resolve button commits the choice. Handles the
 * stale state (accept stays enabled and selected; reject is disabled and carries a read-only
 * explanation; Save stays present but disabled) and the already-resolved read-only state (just the
 * chosen outcome's Result text — the outcome itself is stated in prose by CommentItem's
 * resolution-reply banner). Falls back to rendering the raw note contents for any non-verseText
 * conflict.
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
  // Prefix for the per-option radio id (used for the stale reject aria-describedby wiring).
  const optionIdPrefix = useId();

  // The verse was edited after the merge (stale): the choice is read-only and forced to accept.
  const isStale = availableActions === 'accept';
  // Already resolved (or no permission): show the read-only outcome rather than the option cards.
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
  // edits are independent (built as a spread so the array is never mutated after construction).
  // The merge entry is a typed array so its 'merge' literal is contextually a ConflictResolution.
  const mergeOption: ConflictOption[] = showMerge
    ? [
        {
          value: 'merge',
          label: localizedStrings['%conflict_note_option_combine%'] ?? 'Combine both changes',
          html: sanitizedMerged,
        },
      ]
    : [];
  const radioOptions: ConflictOption[] = [
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
    ...mergeOption,
  ];

  // Save is disabled when there is nothing to write: 'accept' keeps the current text (and stale
  // forces 'accept'). The tooltip explains the reason — a no-change disable points at the thread ✓,
  // while an enabled Save carries the irreversibility warning.
  const isNoChangeSelected = effectiveResolution === 'accept';
  const saveTooltip = isNoChangeSelected
    ? (localizedStrings['%conflict_note_save_disabled_tooltip%'] ??
      'Keeping the current text makes no change — resolve the thread with the ✓ to keep it.')
    : (localizedStrings['%conflict_note_save_warning%'] ?? "This can't be undone.");

  // For an already-resolved conflict shown read-only (availableActions === 'none'), collapse to the
  // Result text that was actually applied. Defaults to 'accept' (keep the current text) when the
  // resolution is unknown. The outcome itself is stated in prose by CommentItem's resolution-reply
  // banner, not here — this only shows the resulting text.
  const renderResolvedResult = () => {
    const outcome: ConflictResolutionOutcome = resolvedResolution ?? 'accept';
    if (outcome === 'merged') return <DiffHtml html={sanitizedMerged} />;
    if (outcome === 'reject') {
      return (
        <p className="tw:whitespace-pre-wrap tw:text-foreground">{comment.rejectedResultText}</p>
      );
    }
    return <p className="tw:whitespace-pre-wrap tw:text-foreground">{comment.resultText}</p>;
  };

  const renderOptionCard = (option: ConflictOption) => {
    const isSelected = effectiveResolution === option.value;
    const optionId = `${optionIdPrefix}-${option.value}`;
    // Stale forces accept and disables reject (accepting the post-merge edit is the only valid
    // choice); the reject option carries the explanation of why it's unavailable.
    const isStaleReject = isStale && option.value === 'reject';
    return (
      // The whole card is a label, so a click anywhere in it forwards to the visually-hidden radio
      // and selects the option (no separate click handler needed). The radio keeps role=radio /
      // aria-checked / arrow-key navigation; its aria-label names the option so the inline diff isn't
      // pulled into the accessible name. The visible label text is aria-hidden to avoid announcing it
      // twice (once as the radio's name, once as adjacent text).
      // eslint-disable-next-line jsx-a11y/label-has-associated-control -- the label wraps the RadioGroupItem control, but the plugin does not recognize that custom component as a control
      <label
        key={option.value}
        data-slot="conflict-resolution-option"
        data-value={option.value}
        className={cn(
          'tw:flex tw:flex-col tw:gap-1 tw:rounded-md tw:border tw:p-2',
          'tw:focus-within:ring-2 tw:focus-within:ring-ring tw:focus-within:ring-offset-1',
          isSelected
            ? 'tw:border-border tw:bg-accent/50'
            : 'tw:border-transparent tw:hover:bg-accent/30',
          isStaleReject ? 'tw:cursor-not-allowed tw:opacity-60' : 'tw:cursor-pointer',
        )}
      >
        <RadioGroupItem
          id={optionId}
          value={option.value}
          aria-label={option.label}
          disabled={isStaleReject}
          aria-describedby={isStaleReject ? staleNoticeId : undefined}
          className="tw:sr-only"
        />
        <span aria-hidden className="tw:font-medium">
          {option.label}
        </span>
        {isStaleReject && (
          // aria-describedby links the option to this visually-hidden notice so assistive tech
          // announces why the choice is read-only.
          <span id={staleNoticeId} className="tw:sr-only">
            {staleNotice}
          </span>
        )}
        <DiffHtml html={option.html} />
      </label>
    );
  };

  return (
    // Contain every click inside the card (selecting an option, pressing Save) so it never bubbles
    // up to toggle the enclosing CommentThread open/closed. The thread toggles on click only, so a
    // single onClick guard at the root is enough; this container is not itself an interactive control
    // and needs no keyboard handler (the thread has no keyboard toggle to intercept).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className="tw:flex tw:flex-col tw:gap-3 tw:text-sm" onClick={(e) => e.stopPropagation()}>
      <p>
        {localizedStrings['%conflict_note_description_verseText%'] ??
          'Conflicting changes were made to the verse text.'}
      </p>

      {isReadOnly ? (
        renderResolvedResult()
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
            aria-label={
              localizedStrings['%conflict_note_choose_aria_label%'] ?? 'Choose resolution'
            }
          >
            {radioOptions.map((option) => {
              const isStaleReject = isStale && option.value === 'reject';
              if (!isStaleReject) return renderOptionCard(option);
              return (
                <TooltipProvider key={option.value} delayDuration={0}>
                  <Tooltip>
                    {/* asChild so the tooltip wraps the disabled option card and still receives
                        pointer events over it */}
                    <TooltipTrigger asChild>{renderOptionCard(option)}</TooltipTrigger>
                    <TooltipContent side="right">{staleNotice}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </RadioGroup>

          {/* Stays mounted (present but disabled) even when stale, so the selection never shifts the
              layout. The tooltip message switches on whether Save is a no-op. */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* span wrapper so the tooltip still receives pointer events when the button is
                    disabled */}
                <span className="tw:inline-flex tw:self-start">
                  <Button
                    size="sm"
                    disabled={isResolving || isNoChangeSelected}
                    onClick={() => onResolve?.(effectiveResolution)}
                  >
                    {localizedStrings['%conflict_note_save_and_resolve%'] ?? 'Save and resolve'}
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>{saveTooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  );
}

export default ConflictNoteCard;
