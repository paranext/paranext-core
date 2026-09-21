import { Editor } from '@/components/advanced/editor/editor';
import {
  editorStateToHtml,
  focusContentEditable,
  handleEditorKeyNavigation,
  hasEditorContent,
  htmlToEditorState,
} from '@/components/advanced/editor/editor-utils';
import { Avatar, AvatarFallback } from '@/components/shadcn-ui/avatar';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { DisabledTooltipWrapper } from '@/components/basics/disabled-tooltip-wrapper.component';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn-ui/tooltip';
import { cn } from '@/utils/shadcn-ui/utils';
import { SerializedEditorState } from 'lexical';
import { ArrowUp, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { formatRelativeDate, formatReplacementString, sanitizeHtml } from 'platform-bible-utils';
import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CommentItemProps } from './comment-list.types';
import {
  actionToOutcome,
  COMMENT_BODY_PROSE_CLASSES,
  didPressCtrlOrCmdEnter,
  EMPTY_EDITOR_STATE,
  getAssignedUserDisplayName,
  localizeOrFallback,
} from './comment-list.utils';

/**
 * A single comment item in the comment list.
 *
 * @param CommentItemProps The properties for the CommentItem component
 */
export function CommentItem({
  comment,
  isReply = false,
  localizedStrings,
  isThreadExpanded = false,
  handleUpdateComment,
  handleDeleteComment,
  onEditingChange,
  canEditOrDelete = false,
  draftEditorState,
  onDraftEditorStateChange,
}: CommentItemProps) {
  // Sometimes-controlled: a consumer that supplies `draftEditorState` owns the in-progress edit, so
  // unmounting (a filter change) and remounting comes back showing the same edit instead of losing
  // it. `internalEditorState` is the fallback for callers that don't manage this draft.
  // `isEditing` is derived rather than tracked separately: a defined editor state is exactly what
  // "editing" means.
  const [internalEditorState, setInternalEditorState] = useState<SerializedEditorState>();
  const editorState = draftEditorState ?? internalEditorState;
  const isEditing = editorState !== undefined;
  // A restored edit (draftEditorState survives its thread collapsing/remounting) must never render
  // as an open editor while the comment's own card is collapsed — the root CommentItem always
  // mounts regardless of thread selection, so `isEditing` alone is not enough to gate the editor
  // vs. plain-text render: a collapsed card must always show its comment text.
  const showEditingUi = isEditing && isThreadExpanded;

  // A consumer that supplies `onDraftEditorStateChange` owns this state exclusively, for the whole
  // lifetime of the component — not just while `draftEditorState` happens to be defined. Gating on
  // the current value instead would seed `internalEditorState` from the first write (while
  // `draftEditorState` is still undefined) and then, once the consumer echoes that value back,
  // block every later write — including the clearing one — leaving the stale seed to resurface the
  // moment `draftEditorState` itself is cleared.
  const isControlled = onDraftEditorStateChange !== undefined;

  const setEditorState = useCallback(
    (value: SerializedEditorState | undefined) => {
      // Only write the fallback while it is actually the source of truth — see the matching guard
      // in CommentThread's `updateDraft` for why writing it while controlled would let stale
      // content resurface after the consumer drops `draftEditorState` for a reason of its own.
      if (!isControlled) setInternalEditorState(value);
      onDraftEditorStateChange?.(value);
    },
    [isControlled, onDraftEditorStateChange],
  );

  // Ref must default to null so React can attach it to the DOM element
  // eslint-disable-next-line no-null/no-null
  const editContainerRef = useRef<HTMLDivElement | null>(null);

  // Sentinel for "the user just clicked Edit Comment during this mount" — the only case the
  // dropdown-close focus workaround below should fire for. `isEditing` alone also turns true for a
  // restored edit that is already active when this component mounts (or becomes visible again via
  // `showEditingUi`), and that case must NOT steal focus from wherever the user is currently
  // typing.
  const shouldFocusOnEditRef = useRef(false);

  // Focus the editor when entering edit mode, after dropdown menu has fully closed
  useEffect(() => {
    if (!showEditingUi) return undefined;
    if (!shouldFocusOnEditRef.current) return undefined;
    shouldFocusOnEditRef.current = false;

    let isMounted = true;
    const container = editContainerRef.current;
    if (!container) return undefined;

    /**
     * The `Edit Comment` menu item is inside a dropdown that takes time to close. When the dropdown
     * closes, it brings focus back to the dropdown trigger button, which steals focus from the
     * editor. To work around this, we add a slight delay before focusing the editor. Unfortunately
     * there is no reliable way to detect when the dropdown has fully closed, which leaves us with
     * no other option than to use a timeout.
     */
    const timeoutId = setTimeout(() => {
      if (!isMounted) return;
      focusContentEditable(container);
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [showEditingUi]);

  const handleCancelEdit = useCallback(
    (e?: MouseEvent) => {
      if (e) e.stopPropagation();
      setEditorState(undefined);
      onEditingChange?.(false);
    },
    [onEditingChange, setEditorState],
  );

  const handleSaveEdit = useCallback(
    async (e?: MouseEvent) => {
      if (e) e.stopPropagation();
      if (!editorState || !handleUpdateComment) return;
      const isUpdateSuccessful = await handleUpdateComment(
        comment.id,
        editorStateToHtml(editorState),
      );
      if (isUpdateSuccessful) {
        setEditorState(undefined);
        onEditingChange?.(false);
      }
    },
    [editorState, handleUpdateComment, comment.id, onEditingChange, setEditorState],
  );

  const displayDate = useMemo(() => {
    const date = new Date(comment.date);
    const relativeDate = formatRelativeDate(
      date,
      localizedStrings['%comment_date_today%'],
      localizedStrings['%comment_date_yesterday%'],
    );
    const time = date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });
    return formatReplacementString(localizedStrings['%comment_dateAtTime%'], {
      date: relativeDate,
      time,
    });
  }, [comment.date, localizedStrings]);

  const userLabel = useMemo(() => comment.user, [comment.user]);

  // Generate initials for avatar
  const initials = useMemo(
    () =>
      comment.user
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    [comment.user],
  );

  const sanitizedContent = useMemo(() => sanitizeHtml(comment.contents), [comment.contents]);
  // Whether the body has any visible text once its PT9 blockquote/prose tags are stripped. Guards
  // the conflict-resolution outcome banner: it stands in only for an empty resolution body, never
  // hiding a resolver's typed note (see the banner below).
  const hasResolutionBodyText = useMemo(
    () => comment.contents.replace(/<[^>]*>/g, '').trim().length > 0,
    [comment.contents],
  );
  // A conflict resolution comment shows the neutral outcome banner in place of its empty body. When
  // it does, the generic "Marked as resolved" status line would stack a second italic line saying
  // the same thing, so it is suppressed and the outcome line stands alone.
  const showsConflictOutcome = !!comment.conflictResolutionAction && !hasResolutionBodyText;

  const dropdownContent = useMemo(() => {
    if (!isThreadExpanded) return undefined;
    if (!canEditOrDelete) return undefined;

    return (
      <>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            shouldFocusOnEditRef.current = true;
            // htmlToEditorState rejects empty HTML outright (a platform-created
            // conflict-resolution comment carries exactly that shape — see
            // `hasResolutionBodyText` below) — start from an empty editor state instead of
            // parsing it in that case.
            const hasBody = comment.contents.trim() !== '';
            setEditorState(hasBody ? htmlToEditorState(comment.contents) : EMPTY_EDITOR_STATE);
            onEditingChange?.(true);
          }}
        >
          <Pencil className="tw:me-2 tw:h-4 tw:w-4" />
          {localizedStrings['%comment_editComment%']}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async (e) => {
            e.stopPropagation();
            if (handleDeleteComment) {
              await handleDeleteComment(comment.id);
            }
          }}
        >
          <Trash2 className="tw:me-2 tw:h-4 tw:w-4" />
          {localizedStrings['%comment_deleteComment%']}
        </DropdownMenuItem>
      </>
    );
  }, [
    canEditOrDelete,
    isThreadExpanded,
    localizedStrings,
    comment.contents,
    comment.id,
    handleDeleteComment,
    onEditingChange,
    setEditorState,
  ]);

  // Shared with the disabled-tooltip wrapper below the button that reads it, so the tooltip
  // explanation and the actual disabled condition can never drift apart.
  const isSaveDisabled = !hasEditorContent(editorState);

  return (
    <div
      className={cn('tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-2', {
        'tw:text-sm': isReply,
      })}
    >
      <Avatar className="tw:h-8 tw:w-8">
        <AvatarFallback className="tw:text-xs tw:font-medium">{initials}</AvatarFallback>
      </Avatar>
      <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-1">
        <div className="tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2">
          <p className="tw:text-sm tw:font-medium">{userLabel}</p>
          <p className="tw:text-xs tw:font-normal tw:text-muted-foreground">{displayDate}</p>
          <div className="tw:flex-1" />
          {isReply && comment.assignedUser !== undefined && (
            <Badge variant="secondary" className="tw:text-xs tw:font-normal">
              → {getAssignedUserDisplayName(comment.assignedUser, localizedStrings)}
            </Badge>
          )}
        </div>
        {showEditingUi && (
          <div
            role="textbox"
            tabIndex={-1}
            className="tw:flex tw:flex-col tw:gap-2"
            ref={editContainerRef}
            onKeyDownCapture={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                handleCancelEdit();
              } else if (didPressCtrlOrCmdEnter(e)) {
                e.preventDefault();
                e.stopPropagation();
                if (hasEditorContent(editorState)) {
                  handleSaveEdit();
                }
              }
            }}
            onKeyDown={(e) => {
              handleEditorKeyNavigation(e);
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
            onClick={(e) => {
              // Prevent clicks inside the editor from bubbling up to the comment thread, which
              // would cause the thread to collapse when trying to edit a comment
              e.stopPropagation();
            }}
          >
            <Editor
              className={cn(
                // Don't render blockquote on the first child. All comments are wrapped in blockquote
                // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                // But we don't want it to look like there's a blockquote there. Target the
                // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                // the blockquote directly inside the editor.
                'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground',
              )}
              editorSerializedState={editorState}
              onSerializedChange={(value) => setEditorState(value)}
              actions={
                <>
                  <div className="tw:flex-1" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon-sm"
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="tw:flex tw:items-center tw:justify-center tw:rounded-md"
                        aria-label={localizedStrings['%comment_aria_cancel_edit%'] ?? 'Cancel edit'}
                      >
                        <Trash2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {localizeOrFallback(
                        '%comment_aria_cancel_edit%',
                        localizedStrings,
                        'Cancel edit',
                      )}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* Disabled buttons are removed from the tab order and don't fire the
                          pointer/focus events Tooltip listens for, so without this wrapper a
                          keyboard or screen-reader user gets no explanation for why there's
                          nothing to save. */}
                      <DisabledTooltipWrapper
                        isDisabled={isSaveDisabled}
                        disabledExplanation={localizeOrFallback(
                          '%comment_aria_save_edit%',
                          localizedStrings,
                          'Save edit',
                        )}
                        className="tw:inline-flex"
                      >
                        <Button
                          size="icon-sm"
                          onClick={handleSaveEdit}
                          className="tw:flex tw:items-center tw:justify-center tw:rounded-md"
                          disabled={isSaveDisabled}
                          aria-label={localizedStrings['%comment_aria_save_edit%'] ?? 'Save edit'}
                        >
                          <ArrowUp />
                        </Button>
                      </DisabledTooltipWrapper>
                    </TooltipTrigger>
                    <TooltipContent>
                      {localizeOrFallback(
                        '%comment_aria_save_edit%',
                        localizedStrings,
                        'Save edit',
                      )}
                    </TooltipContent>
                  </Tooltip>
                </>
              }
            />
          </div>
        )}
        {!showEditingUi && (
          <>
            {comment.status === 'Resolved' && !showsConflictOutcome && (
              <div className="tw:text-sm tw:italic">
                {localizedStrings['%comment_status_resolved%']}
              </div>
            )}
            {comment.status === 'Todo' && isReply && (
              <div className="tw:text-sm tw:italic">
                {localizedStrings['%comment_status_todo%']}
              </div>
            )}
            {showsConflictOutcome ? (
              // A platform-created conflict resolution comment carries an empty body — PT9 renders
              // its banner UI-side from conflictResolutionAction, it never stores text. So render the
              // localized, neutral outcome line here instead of the (empty) contents, styled like the
              // italic status lines above. These are the same neutral keys ConflictNoteCard's Result
              // region used to render inline. Only when the body IS empty: a resolution synced from
              // PT9 can carry the resolver's typed note alongside the action, and PT9 shows that text,
              // so the body branch below keeps it visible rather than discarding it for this banner.
              <div className="tw:text-sm tw:italic">
                {actionToOutcome(comment.conflictResolutionAction) === 'merged'
                  ? (localizedStrings['%conflict_note_outcome_combined%'] ??
                    'Combined both changes.')
                  : (localizedStrings['%conflict_note_outcome_used_other%'] ??
                    'Used the other change instead of the current text.')}
              </div>
            ) : (
              <div
                className={cn(
                  // Shared note-body prose/blockquote treatment (also used by conflict-diff's
                  // DIFF_HTML_CLASSES). Layer this comment item's own extras on top: items-start +
                  // gap-2 for layout, and line-clamp while the thread is collapsed.
                  COMMENT_BODY_PROSE_CLASSES,
                  'tw:items-start tw:gap-2',
                  {
                    'tw:line-clamp-3': !isThreadExpanded,
                  },
                )}
                // The comment content is stored in HTML so it needs to be set directly. To make sure
                // it is safe we have sanitized it first.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            )}
          </>
        )}
      </div>
      {dropdownContent && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">{dropdownContent}</DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
