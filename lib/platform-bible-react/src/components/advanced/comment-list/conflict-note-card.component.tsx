import { Button } from '@/components/shadcn-ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn-ui/radio-group';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
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
import { isVerseTextConflictNote } from './comment-list.utils';
import { DiffHtml, sanitizeDiffHtml } from './conflict-diff';

/** One selectable resolution option (a clickable card) with its localized label and inline diff. */
type ConflictOption = { value: ConflictResolution; label: string; html: string };

/**
 * Presentational card body for a verseText merge conflict. Presents the resolution as a set of
 * clickable option cards — "Keep the current text" (accept, preselected), "Use the other change"
 * (reject), and, when the two edits are independent, "Combine both changes" (merge) — each showing
 * its inline red/green diff. Clicking anywhere on an option card selects it; the cards keep radio
 * semantics (a labelled radio group with role=radio / aria-checked and arrow-key navigation) via a
 * visible radio inline with each card's title. A Save-and-resolve button commits the choice.
 * Handles the stale state (accept stays enabled and selected; reject is disabled and carries a
 * read-only explanation; Save stays present but disabled) and the already-resolved read-only state
 * (just the chosen outcome's Result text — the outcome itself is stated in prose by CommentItem's
 * resolution-reply banner). Falls back to rendering the raw note contents for any non-verseText
 * conflict.
 */
export function ConflictNoteCard({
  comment,
  localizedStrings,
  availableActions = 'acceptOrReject',
  resolvedResolution,
  onResolve,
  isResolving = false,
  canUnresolve = false,
  isUnresolving = false,
  onUnresolve,
}: ConflictNoteCardProps) {
  const [internalResolution, setInternalResolution] = useState<ConflictResolution>('accept');
  // Stable id linking the disabled accept option to its visually-hidden explanation via
  // aria-describedby, so screen readers announce why the choice is read-only (the visual Tooltip is
  // pointer-only and never reaches assistive tech).
  const staleNoticeId = useId();
  // Prefix for the per-option radio id (used for the stale reject aria-describedby wiring).
  const optionIdPrefix = useId();

  // Options are still being fetched: render a skeleton, never the option cards or (worse) the
  // read-only "resolved" view, which would flash the accepted text before the real state lands.
  const isLoading = availableActions === 'loading';
  // The verse was edited after the merge (stale): the choice is read-only and forced to accept.
  const isStale = availableActions === 'accept';
  // Already resolved (or no permission): show the read-only outcome rather than the option cards.
  const isReadOnly = availableActions === 'none';
  // The two edits are independent, so combining them is offered as a third option.
  const showMerge = availableActions === 'acceptRejectOrMerge';

  // When reject is unavailable (stale verse) force the visible selection to 'accept' so the radio
  // group can never display a choice the disabled state would refuse.
  const effectiveResolution: ConflictResolution = isStale ? 'accept' : internalResolution;

  const sanitizedRejected = useMemo(
    () => sanitizeDiffHtml(comment.rejectedText ?? ''),
    [comment.rejectedText],
  );
  const sanitizedAccepted = useMemo(
    () => sanitizeDiffHtml(comment.acceptedText ?? ''),
    [comment.acceptedText],
  );
  const sanitizedMerged = useMemo(
    () => sanitizeDiffHtml(comment.mergedText ?? ''),
    [comment.mergedText],
  );
  const sanitizedContents = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);

  // Gate on conflictType alone (not resultText): an empty-result verseText conflict must still show
  // the resolve UI, or it is unresolvable (the backend blocks resolving it via a status change).
  if (!isVerseTextConflictNote(comment)) {
    return <DiffHtml html={sanitizedContents} />;
  }

  const handleChange = (value: string) => {
    // RadioGroup only emits our known option values; narrow without a type assertion.
    const next: ConflictResolution = value === 'reject' || value === 'merge' ? value : 'accept';
    setInternalResolution(next);
  };

  // Shared between the visible Tooltip and the visually-hidden aria-describedby target so both
  // surfaces always announce the same reason.
  const staleNotice =
    localizedStrings['%conflict_note_stale_notice%'] ??
    "The verse was edited after this conflict was recorded, so 'Use the other change' is no longer available. Keep the current text to resolve.";

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

  // Save is disabled when there is nothing to write ('accept' keeps the current text, and stale
  // forces 'accept') or while a resolve call is in flight. The tooltip explains the reason: a
  // no-change disable points at the thread ✓; an enabled Save carries the irreversibility warning;
  // and a disable caused solely by isResolving shows no tooltip at all, since the irreversibility
  // warning would be misleading over a button the user can't currently press.
  const isNoChangeSelected = effectiveResolution === 'accept';
  const isSaveDisabled = isResolving || isNoChangeSelected;
  let saveTooltip: string | undefined;
  if (isNoChangeSelected) {
    saveTooltip =
      localizedStrings['%conflict_note_save_disabled_tooltip%'] ??
      'Keeping the current text makes no change — resolve the thread with the ✓ to keep it.';
  } else if (!isResolving) {
    saveTooltip = localizedStrings['%conflict_note_save_warning%'] ?? "This can't be undone.";
  }

  // For an already-resolved conflict shown read-only (availableActions === 'none'), collapse to the
  // Result text that was actually applied. Defaults to 'accept' (keep the current text) when the
  // resolution is unknown. The outcome itself is stated in prose by CommentItem's resolution-reply
  // banner, not here — this only shows the resulting text.
  // A blank result field (e.g. a reject that decoded to an empty verse) shows a neutral notice
  // instead of an empty Result region.
  const noResultText =
    localizedStrings['%conflict_note_no_result%'] ?? 'No result preview available.';
  // The neutral placeholder shown when a resolved conflict's Result region has no text (e.g. a reject
  // that decoded to an empty verse, or a merge with no mergedText).
  const noResultPreview = <p className="tw:text-muted-foreground">{noResultText}</p>;
  const renderResolvedText = (text: string | undefined) =>
    text ? <p className="tw:whitespace-pre-wrap tw:text-foreground">{text}</p> : noResultPreview;
  const renderResolvedResult = () => {
    const outcome: ConflictResolutionOutcome = resolvedResolution ?? 'accept';
    if (outcome === 'merged')
      return comment.mergedText ? <DiffHtml html={sanitizedMerged} /> : noResultPreview;
    if (outcome === 'reject') return renderResolvedText(comment.rejectedResultText);
    return renderResolvedText(comment.resultText);
  };

  // Reject is read-only in the stale state — the verse changed after the merge, so accepting the
  // post-merge edit is the only valid choice, and the reject option carries the explanation of why
  // it's unavailable. Computed in one place so the option card and its tooltip wrapper can't
  // disagree on which option is the disabled one.
  const isStaleRejectOption = (option: ConflictOption) => isStale && option.value === 'reject';

  const renderOptionCard = (option: ConflictOption) => {
    const isSelected = effectiveResolution === option.value;
    const optionId = `${optionIdPrefix}-${option.value}`;
    const isStaleReject = isStaleRejectOption(option);
    return (
      // The whole card is a label, so a click anywhere in it forwards to the radio and selects the
      // option (no separate click handler needed). The radio keeps role=radio / aria-checked /
      // arrow-key navigation; its aria-label names the option so the inline diff isn't pulled into
      // the accessible name. The visible label text is aria-hidden to avoid announcing it twice (once
      // as the radio's name, once as adjacent text). The radio and title sit side by side on one flex
      // row (a `gap`, not a directional margin, so the browser's own RTL mirroring of `flex-row`
      // puts the radio on the correct logical side without extra dir-aware classes), with the diff
      // below as a sibling.
      <label
        key={option.value}
        htmlFor={optionId}
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
        <div className="tw:flex tw:items-center tw:gap-2">
          <RadioGroupItem
            id={optionId}
            value={option.value}
            aria-label={option.label}
            disabled={isStaleReject}
            aria-describedby={isStaleReject ? staleNoticeId : undefined}
          />
          <span aria-hidden className="tw:font-medium">
            {option.label}
          </span>
        </div>
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

      {isLoading && (
        <div className="tw:flex tw:flex-col tw:gap-2" data-slot="conflict-loading">
          <Skeleton className="tw:h-8 tw:w-full" />
          <Skeleton className="tw:h-8 tw:w-full" />
          <Skeleton className="tw:h-8 tw:w-24" />
        </div>
      )}
      {!isLoading && isReadOnly && (
        <>
          {renderResolvedResult()}
          {canUnresolve && onUnresolve && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* span wrapper so the tooltip still receives pointer events when the button is
                      disabled */}
                  <span className="tw:inline-flex tw:self-start">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isUnresolving}
                      onClick={() => onUnresolve()}
                    >
                      {localizedStrings['%conflict_note_undo_resolution%'] ?? 'Undo resolution'}
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {localizedStrings['%conflict_note_undo_tooltip%'] ??
                    'Restores the automatically merged result and reopens the conflict so you can choose again.'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      )}
      {!isLoading && !isReadOnly && (
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
              const isStaleReject = isStaleRejectOption(option);
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
                    disabled={isSaveDisabled}
                    onClick={() => onResolve?.(effectiveResolution)}
                  >
                    {localizedStrings['%conflict_note_save_and_resolve%'] ?? 'Save and resolve'}
                  </Button>
                </span>
              </TooltipTrigger>
              {saveTooltip && <TooltipContent>{saveTooltip}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  );
}

export default ConflictNoteCard;
